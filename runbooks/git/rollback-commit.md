# Runbook - Rollback a Git Commit

## Runbook ID

RB-GIT-004

---

# Purpose

This runbook explains how to safely rollback a Git commit in an enterprise environment.

Rollback procedures are commonly used when a commit introduces bugs, deployment failures, security issues, or incorrect configurations.

The objective is to restore the repository to a stable state with minimal impact.

---

# Severity

- P1 – Production deployment failure
- P1 – Security vulnerability introduced
- P2 – Application malfunction
- P3 – Incorrect feature implementation

---

# Symptoms

Examples

- Production deployment failed
- Application crashes after release
- Incorrect configuration committed
- Sensitive information committed
- Build pipeline failing

---

# Prerequisites

- Git installed
- Access to repository
- Permission to modify branch

---

# Investigation

## Verify Repository Status

```bash
git status
```

---

## View Recent Commits

```bash
git log --oneline
```

Example

```text
4f92d11 Fix authentication

9ba7d13 Add dashboard API

83ca771 Initial project
```

---

## View Commit Details

```bash
git show <commit-id>
```

---

## Check Branch

```bash
git branch
```

---

## Verify Remote Status

```bash
git remote -v
```

---

# Resolution

## Scenario 1 - Rollback Last Local Commit (Not Pushed)

Keep changes

```bash
git reset --soft HEAD~1
```

---

Discard changes

```bash
git reset --hard HEAD~1
```

---

## Scenario 2 - Revert a Pushed Commit

Recommended for shared branches.

```bash
git revert <commit-id>
```

Git creates a new commit that reverses the changes.

---

## Scenario 3 - Rollback Multiple Commits

```bash
git revert <oldest-commit>^..<latest-commit>
```

---

## Scenario 4 - Reset Branch to Previous Commit

Use only when rewriting history is acceptable.

```bash
git reset --hard <commit-id>
```

Force push if absolutely required.

```bash
git push --force-with-lease
```

---

# Verification

Verify status

```bash
git status
```

Verify history

```bash
git log --oneline
```

Verify application

- Build application
- Execute tests
- Validate deployment

---

# Rollback Validation Checklist

- Repository clean
- Correct commit reverted
- Application working
- CI pipeline successful
- No merge conflicts

---

# Rollback Strategy

```text
Issue Detected

↓

Identify Bad Commit

↓

Review Changes

↓

Choose Rollback Method

↓

Rollback

↓

Validate

↓

Deploy

↓

Monitor
```

---

# Escalation

Escalate when

- Multiple commits affected
- Production outage continues
- Security incident involved
- Shared history rewrite required
- Rollback impacts multiple teams

---

# Post-Incident Tasks

- Perform Root Cause Analysis
- Update incident ticket
- Notify stakeholders
- Improve testing
- Review deployment process
- Update documentation

---

# Prevention

- Use Pull Requests
- Require code reviews
- Execute CI/CD validation
- Deploy to staging first
- Tag production releases
- Protect main branch

---

# Related Commands

View commits

```bash
git log --oneline
```

Show commit

```bash
git show <commit-id>
```

Soft reset

```bash
git reset --soft HEAD~1
```

Hard reset

```bash
git reset --hard HEAD~1
```

Revert commit

```bash
git revert <commit-id>
```

Repository status

```bash
git status
```

---

# Real Production Scenario

A new production deployment introduced a bug that prevented users from logging in. The issue was traced to the most recent commit merged into the `main` branch. Because the commit had already been pushed and deployed, the DevOps Engineer used `git revert` to create a new commit that safely reversed the faulty changes without rewriting repository history. The CI pipeline passed, the reverted code was deployed, and service was restored within minutes.

