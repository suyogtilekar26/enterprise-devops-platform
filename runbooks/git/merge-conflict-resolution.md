# Runbook - Resolve Git Merge Conflicts

## Runbook ID

RB-GIT-003

---

# Purpose

This runbook explains how to investigate, resolve, validate, and complete Git merge conflicts in an enterprise environment.

Merge conflicts commonly occur when multiple developers modify the same section of a file before merging branches.

---

# Severity

- P3 – Development blocked
- P2 – Release branch merge conflict
- P1 – Production hotfix merge conflict

---

# Symptoms

Examples

```text
CONFLICT (content): Merge conflict in app.py
```

```text
Automatic merge failed; fix conflicts and then commit the result.
```

Git status

```text
both modified
```

---

# Prerequisites

- Git installed
- Access to repository
- Merge in progress

---

# Investigation

## Verify Current Status

```bash
git status
```

Expected

```text
You have unmerged paths.
```

---

## Identify Conflicting Files

```bash
git diff --name-only --diff-filter=U
```

Example

```text
frontend/src/App.jsx

api-gateway/app.py
```

---

## View Conflict

```bash
cat <file>
```

Example

```text
<<<<<<< HEAD

Current Branch

=======

Incoming Branch

>>>>>>> feature/login
```

---

## View Branch History

```bash
git log --oneline --graph --all
```

---

## Compare Branches

```bash
git diff main..feature/login
```

---

# Resolution

## Option 1 - Manual Resolution

Open the conflicting file.

Remove

```text
<<<<<<<

=======

>>>>>>>
```

Combine the required changes.

Save the file.

---

## Stage Resolved File

```bash
git add <file>
```

---

## Complete Merge

```bash
git commit
```

---

## Option 2 - Keep Current Branch

```bash
git checkout --ours <file>
```

Stage

```bash
git add <file>
```

Commit

```bash
git commit
```

---

## Option 3 - Keep Incoming Branch

```bash
git checkout --theirs <file>
```

Stage

```bash
git add <file>
```

Commit

```bash
git commit
```

---

## Abort Merge

If necessary

```bash
git merge --abort
```

Repository returns to the previous state.

---

# Verification

Verify

```bash
git status
```

Expected

```text
nothing to commit, working tree clean
```

Verify history

```bash
git log --oneline --graph
```

Verify application

Run project-specific tests.

---

# Rollback

If the merge introduced problems

Find previous commit

```bash
git log --oneline
```

Reset

```bash
git reset --hard <commit-id>
```

Use only after confirming that local changes are no longer needed.

---

# Escalation

Escalate when

- Conflict affects production release
- Multiple developers modified the same business logic
- Merge cannot be safely resolved
- Release deadline is impacted

---

# Post-Incident Tasks

- Notify development team
- Document root cause
- Review branching strategy
- Update merge procedures
- Record lessons learned

---

# Prevention

- Pull latest changes before starting work
- Keep feature branches short-lived
- Commit frequently
- Merge regularly
- Use Pull Requests
- Perform code reviews

---

# Related Commands

Repository status

```bash
git status
```

View conflicts

```bash
git diff --name-only --diff-filter=U
```

Abort merge

```bash
git merge --abort
```

Complete merge

```bash
git commit
```

View history

```bash
git log --oneline --graph
```

---

# Real Production Scenario

Two developers modified the authentication middleware before a production release. During the release merge, Git reported conflicts in the JWT validation logic. The DevOps Engineer identified the conflicting files, reviewed both implementations with the developers, manually combined the required changes, completed the merge, validated the application through CI, and successfully deployed the release without introducing regressions.

