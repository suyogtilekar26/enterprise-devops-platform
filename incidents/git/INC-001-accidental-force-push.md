# Incident Report - INC-001 - Accidental Force Push to Main Branch

## Incident ID

INC-001

---

# Title

Accidental Force Push Overwrites Main Branch History

---

# Severity

P1 - Critical

---

# Status

Resolved

---

# Date

2026-01-18

---

# Environment

Production GitHub Repository

---

# Affected Repository

enterprise-devops-platform

---

# Reported By

GitHub Actions Pipeline

---

# Impact

A developer accidentally executed a force push to the protected `main` branch.

As a result

- Commit history changed
- Previous commits disappeared
- CI/CD pipeline failed
- Team members could not pull latest changes
- Deployment was blocked

---

# Detection

The CI pipeline failed immediately after the push.

Developers also reported

```text
fatal: refusing to merge unrelated histories
```

GitHub showed

```text
Forced update
```

on the main branch.

---

# Timeline

09:05 AM

Developer performed local history rewrite.

---

09:08 AM

Developer executed

```bash
git push --force
```

---

09:09 AM

GitHub Actions failed.

---

09:12 AM

Development team reported missing commits.

---

09:15 AM

DevOps team declared P1 incident.

---

09:22 AM

Repository investigation started.

---

09:35 AM

Original commit identified.

---

09:48 AM

Repository restored.

---

10:00 AM

CI/CD resumed successfully.

---

# Investigation

Verify commit history

```bash
git log --oneline --all
```

Inspect reflog

```bash
git reflog
```

Verify remote

```bash
git fetch origin
```

Review GitHub history.

---

# Root Cause

Developer executed

```bash
git push --force
```

instead of

```bash
git push
```

Branch protection rules were not enabled.

---

# Resolution

Recovered repository using Git reflog.

Created recovery branch

```bash
git checkout -b recovery <commit-id>
```

Verified missing commits.

Restored repository.

Enabled branch protection.

Disabled force push permissions.

---

# Validation

Repository

```bash
git status
```

History

```bash
git log --oneline
```

Remote

```bash
git fetch
```

Pipeline

Successful.

---

# Business Impact

- Deployment delayed
- Developers blocked
- CI unavailable
- Release postponed

Duration

Approximately 55 minutes.

---

# Preventive Actions

- Enable branch protection
- Disable force pushes
- Require Pull Requests
- Enable mandatory reviews
- Require successful CI
- Educate developers

---

# Lessons Learned

Force pushes should never be allowed on production branches.

Repository protection is mandatory for enterprise environments.

---

# Related Runbooks

- rollback-commit.md
- recover-deleted-branch.md
- github-access-issue.md

---

# Commands Used

View reflog

```bash
git reflog
```

View history

```bash
git log --oneline --all
```

Recover branch

```bash
git checkout -b recovery <commit-id>
```

Fetch remote

```bash
git fetch origin
```

---

# Incident Closure

Root Cause

Human error combined with missing branch protection.

Resolution

Repository restored successfully.

CI/CD validated.

Branch protection enabled.

Incident closed.

