# Incident Report - INC-003 - Production Release Tag Deleted

## Incident ID

INC-003

---

# Title

Production Release Tag Accidentally Deleted

---

# Severity

P2 - High

---

# Status

Resolved

---

# Date

2026-03-14

---

# Environment

Production GitHub Repository

---

# Affected Repository

enterprise-devops-platform

---

# Reported By

Release Engineer

---

# Impact

The Git tag corresponding to the latest production release was accidentally deleted from the remote repository.

As a result

- Release history became inconsistent
- Automated deployment pipeline could not locate the release tag
- Rollback procedure was blocked
- Release audit records became incomplete

---

# Detection

Deployment pipeline reported

```text
fatal: couldn't find remote ref refs/tags/v2.5.0
```

Release automation also failed with

```text
Tag not found
```

---

# Timeline

10:15 AM

Release verification started.

---

10:18 AM

Deployment pipeline failed.

---

10:20 AM

Release engineer confirmed missing tag.

---

10:25 AM

DevOps team declared P2 incident.

---

10:35 AM

Git history investigated.

---

10:42 AM

Original release commit identified.

---

10:50 AM

Production tag recreated.

---

10:55 AM

Deployment pipeline restarted.

---

11:05 AM

Release verification completed.

---

# Investigation

List local tags

```bash
git tag
```

List remote tags

```bash
git ls-remote --tags origin
```

Locate production commit

```bash
git log --oneline
```

Verify release history

```bash
git show <commit-id>
```

Review GitHub audit logs.

---

# Root Cause

During repository cleanup, a developer mistakenly deleted the production release tag from the remote repository.

The associated commit remained intact, but deployment automation depended on the tag reference.

---

# Resolution

Identify the original production commit.

Recreate the tag

```bash
git tag v2.5.0 <commit-id>
```

Push the restored tag

```bash
git push origin v2.5.0
```

Restart deployment pipeline.

Verify release artifacts.

---

# Validation

Verify tag

```bash
git tag
```

Verify remote

```bash
git ls-remote --tags origin
```

Verify deployment

- Pipeline successful
- Release artifacts available
- Rollback capability restored

---

# Business Impact

- Production deployment delayed
- Rollback temporarily unavailable
- Release audit interrupted

Duration

Approximately 50 minutes.

---

# Preventive Actions

- Protect release tags
- Restrict tag deletion permissions
- Automate release creation
- Enable GitHub audit logging
- Document tag management procedures
- Review release governance

---

# Lessons Learned

Production tags are critical release artifacts and should be protected with the same rigor as production branches.

Deleting a tag can disrupt deployment automation even when the underlying commit still exists.

---

# Related Runbooks

- revert-production-tag.md
- rollback-commit.md
- github-access-issue.md

---

# Commands Used

List tags

```bash
git tag
```

View remote tags

```bash
git ls-remote --tags origin
```

Create tag

```bash
git tag v2.5.0 <commit-id>
```

Push tag

```bash
git push origin v2.5.0
```

---

# Incident Closure

Root Cause

Accidental deletion of a production release tag.

Resolution

Production tag recreated from the original release commit, deployment pipeline restored, and tag protection implemented.

Incident closed.

