# Incident Report - INC-005 - Repository Permission Issue

## Incident ID

INC-005

---

# Title

Developer Lost Write Access to GitHub Repository

---

# Severity

P2 - High

---

# Status

Resolved

---

# Date

2026-05-21

---

# Environment

GitHub Enterprise

---

# Affected Repository

enterprise-devops-platform

---

# Reported By

Developer

---

# Impact

A developer was unable to push changes to the production repository after being removed from the required GitHub team.

As a result

- Feature development stopped
- Pull Requests could not be updated
- CI/CD pipeline received no new commits
- Release preparation delayed

---

# Detection

Developer reported

```text
remote: Permission to organization/enterprise-devops-platform.git denied to developer.
fatal: unable to access repository.
```

Another attempt using SSH returned

```text
ERROR: Repository not found.
```

GitHub audit logs showed permission changes shortly before the incident.

---

# Timeline

09:00 AM

Developer attempted to push code.

---

09:01 AM

Push failed with permission error.

---

09:05 AM

Developer contacted DevOps team.

---

09:10 AM

Incident declared as P2.

---

09:18 AM

Repository permissions reviewed.

---

09:30 AM

Root cause identified.

---

09:40 AM

GitHub team membership restored.

---

09:45 AM

Developer verified access.

---

09:50 AM

CI/CD pipeline resumed.

---

# Investigation

Verify remote repository

```bash
git remote -v
```

Verify SSH authentication

```bash
ssh -T git@github.com
```

Verify repository access

```bash
git ls-remote origin
```

Review GitHub organization

- Team membership
- Repository permissions
- Branch protection
- Audit logs

Verify user role.

---

# Root Cause

During a GitHub organization cleanup, the developer was accidentally removed from the engineering team responsible for write access to the repository.

Authentication was functioning correctly, but repository authorization was no longer available.

---

# Resolution

Verified SSH authentication.

Reviewed GitHub organization permissions.

Re-added developer to the appropriate GitHub team.

Confirmed repository write permissions.

Developer executed

```bash
git push
```

Successfully.

Verified Pull Request updates and CI/CD execution.

---

# Validation

Verify repository access

```bash
git ls-remote origin
```

Verify push

```bash
git push
```

Verify pull

```bash
git pull
```

Verify CI/CD

- Workflow triggered
- Build successful
- Deployment pipeline operational

---

# Business Impact

- Development blocked for one engineer
- Release preparation delayed
- Increased support effort

Duration

Approximately 50 minutes.

---

# Preventive Actions

- Use GitHub Teams instead of individual permissions
- Review access changes before applying
- Enable audit logging
- Automate user provisioning
- Conduct quarterly permission reviews
- Follow least-privilege access principles

---

# Lessons Learned

Authentication and authorization are separate processes.

A valid GitHub login does not guarantee repository access.

Repository permissions should always be managed through standardized GitHub Teams to reduce the risk of accidental access removal.

---

# Related Runbooks

- github-access-issue.md
- rollback-commit.md
- recover-deleted-branch.md

---

# Commands Used

Verify SSH

```bash
ssh -T git@github.com
```

Verify remote

```bash
git remote -v
```

Verify repository access

```bash
git ls-remote origin
```

Push changes

```bash
git push
```

---

# Incident Closure

Root Cause

Developer was unintentionally removed from the GitHub team that granted repository write access.

Resolution

Team membership restored, repository permissions verified, CI/CD confirmed operational, and organization access review procedures updated.

Incident closed.

