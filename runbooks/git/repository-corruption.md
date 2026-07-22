# Runbook - Git Repository Corruption

## Runbook ID

RB-GIT-001

---

# Purpose

This runbook explains how to investigate and recover from a corrupted Git repository in an enterprise environment.

---

# Severity

- P2 (Developer blocked)
- P1 (Shared repository corruption)

---

# Symptoms

- Git commands fail
- Missing objects
- Invalid HEAD
- Corrupted index
- Repository cannot be cloned

Example

```text
fatal: bad object HEAD
```

or

```text
fatal: loose object is corrupt
```

---

# Prerequisites

- Git installed
- Access to repository
- Backup (if available)

---

# Investigation

## Verify Repository

```bash
git status
```

---

## Check Repository Integrity

```bash
git fsck --full
```

---

## Verify Current Branch

```bash
git branch
```

---

## Verify HEAD

```bash
cat .git/HEAD
```

---

## Verify Logs

```bash
git log --oneline
```

---

## Check Object Database

```bash
ls .git/objects
```

---

# Common Causes

- Power failure during commit
- Disk corruption
- Manual deletion of .git files
- Interrupted Git operations
- Storage failure

---

# Resolution

## Option 1 - Reset Working Tree

```bash
git reset --hard HEAD
```

---

## Option 2 - Remove Corrupted Index

```bash
rm .git/index
```

Rebuild

```bash
git reset
```

---

## Option 3 - Fetch Missing Objects

```bash
git fetch --all
```

---

## Option 4 - Clone Fresh Repository

```bash
cd ..
```

```bash
git clone <repository-url>
```

---

## Option 5 - Restore From Backup

Recover the repository from the latest verified backup.

---

# Verification

Repository status

```bash
git status
```

Verify commits

```bash
git log --oneline
```

Verify integrity

```bash
git fsck --full
```

Expected

```text
No errors
```

---

# Rollback

If recovery fails

- Restore repository backup
- Re-clone repository
- Notify repository administrator

---

# Escalation

Escalate when

- Repository cannot be recovered
- Remote repository is affected
- Object database is corrupted
- Shared production repository impacted

---

# Post-Incident Tasks

- Document root cause
- Verify repository backups
- Review storage health
- Educate users on safe Git usage
- Update incident documentation

---

# Prevention

- Avoid interrupting Git operations
- Regularly back up repositories
- Use reliable storage
- Run repository integrity checks
- Protect the `.git` directory

---

# Related Commands

```bash
git fsck --full
```

```bash
git reset --hard HEAD
```

```bash
git fetch --all
```

```bash
git status
```

```bash
git log --oneline
```

---

# Real Production Scenario

A developer's workstation crashed during a commit, leaving the local repository corrupted. The DevOps Engineer verified the repository using `git fsck`, removed the corrupted index, fetched missing objects from the remote repository, validated repository integrity, and restored normal development without data loss.

