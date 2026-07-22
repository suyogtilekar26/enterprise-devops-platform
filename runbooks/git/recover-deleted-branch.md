# Runbook - Recover Deleted Git Branch

## Runbook ID

RB-GIT-002

---

# Purpose

This runbook explains how to recover a deleted Git branch in an enterprise environment.

Deleted branches can often be recovered because Git retains commit history through the reflog until garbage collection removes unreachable commits.

---

# Severity

- P2 – Feature branch accidentally deleted
- P1 – Release branch deleted
- P1 – Production hotfix branch deleted

---

# Symptoms

- Branch missing from repository
- Developer cannot switch to branch
- Feature work appears lost

Example

```text
error: pathspec 'feature/login' did not match any file(s) known to git
```

---

# Prerequisites

- Git installed
- Access to repository
- Repository not garbage collected

---

# Investigation

## Verify Existing Branches

```bash
git branch
```

Remote branches

```bash
git branch -r
```

All branches

```bash
git branch -a
```

---

## Check Commit History

```bash
git log --oneline --all
```

---

## Search Git Reflog

```bash
git reflog
```

Example

```text
7ab91fd HEAD@{5}: commit: Add login feature
```

Locate the commit that belonged to the deleted branch.

---

## Verify Commit

```bash
git show 7ab91fd
```

---

# Resolution

## Recover Local Branch

```bash
git checkout -b feature/login 7ab91fd
```

Verify

```bash
git branch
```

---

## Recover Using Switch

```bash
git switch -c feature/login 7ab91fd
```

---

## Recover Deleted Remote Branch

Push recovered branch

```bash
git push origin feature/login
```

---

## If Branch Exists Remotely

Fetch latest references

```bash
git fetch origin
```

Checkout remote branch

```bash
git checkout -b feature/login origin/feature/login
```

---

# Verification

Verify branch

```bash
git branch
```

Verify commits

```bash
git log --oneline
```

Verify status

```bash
git status
```

Expected

```text
nothing to commit, working tree clean
```

---

# Rollback

If recovery used the wrong commit

Delete branch

```bash
git branch -D feature/login
```

Recover again using the correct commit from the reflog.

---

# Escalation

Escalate when

- Reflog no longer contains the commit
- Garbage collection removed unreachable objects
- Remote repository was force updated
- Production release branch is affected

---

# Post-Incident Tasks

- Identify why the branch was deleted
- Verify repository backups
- Educate developers on branch protection
- Update incident documentation
- Enable protected branches if required

---

# Prevention

- Enable branch protection
- Avoid force deletion
- Push feature branches regularly
- Keep remote copies of important branches
- Protect release and production branches

---

# Related Commands

View reflog

```bash
git reflog
```

Recover branch

```bash
git checkout -b feature/login <commit-id>
```

List branches

```bash
git branch -a
```

Push recovered branch

```bash
git push origin feature/login
```

---

# Real Production Scenario

A developer accidentally deleted the `feature/payment-api` branch after completing most of the implementation. The branch had not yet been merged. The DevOps Engineer used `git reflog` to locate the latest commit, recreated the branch from the recovered commit, verified the code, pushed it back to GitHub, and the development team continued work without losing any changes.

