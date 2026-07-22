# Runbook - GitHub Repository Access Issue

## Runbook ID

RB-GIT-006

---

# Purpose

This runbook explains how to investigate and resolve GitHub repository access issues in an enterprise environment.

Access issues can prevent developers, DevOps engineers, and CI/CD systems from cloning, pulling, pushing, or managing repositories.

---

# Severity

- P1 – CI/CD unable to access repository
- P2 – Developer cannot push code
- P2 – Deployment blocked
- P3 – New user onboarding issue

---

# Symptoms

Examples

```text
remote: Permission to organization/repository.git denied
```

```text
fatal: Authentication failed
```

```text
ERROR: Repository not found
```

```text
Permission denied (publickey)
```

---

# Prerequisites

- Git installed
- GitHub account
- Repository URL
- Organization access
- Internet connectivity

---

# Investigation

## Verify Remote Repository

```bash
git remote -v
```

Expected

```text
origin  git@github.com:company/repository.git
```

or

```text
origin  https://github.com/company/repository.git
```

---

## Verify Current User

HTTPS

```bash
git config --global user.name
```

```bash
git config --global user.email
```

---

## Verify SSH Key

```bash
ls ~/.ssh
```

Expected

```text
id_ed25519
id_ed25519.pub
```

or

```text
id_rsa
id_rsa.pub
```

---

## Test GitHub SSH Connection

```bash
ssh -T git@github.com
```

Expected

```text
Hi username! You've successfully authenticated.
```

---

## Verify Repository Access

```bash
git ls-remote origin
```

---

## Verify Internet Connectivity

```bash
ping github.com
```

---

## Check Current Branch

```bash
git branch
```

---

# Common Causes

- Incorrect GitHub permissions
- Expired Personal Access Token (PAT)
- Missing SSH key
- Wrong remote URL
- Repository deleted
- Organization membership removed
- Firewall or proxy restrictions

---

# Resolution

## Option 1 - Verify Repository URL

```bash
git remote -v
```

Update if incorrect

HTTPS

```bash
git remote set-url origin https://github.com/company/repository.git
```

SSH

```bash
git remote set-url origin git@github.com:company/repository.git
```

---

## Option 2 - Generate SSH Key

```bash
ssh-keygen -t ed25519 -C "your-email@example.com"
```

---

## Display Public Key

```bash
cat ~/.ssh/id_ed25519.pub
```

Add the key to GitHub.

---

## Option 3 - Test Authentication

```bash
ssh -T git@github.com
```

---

## Option 4 - Update Personal Access Token

If using HTTPS

Generate a new PAT from GitHub.

Update stored credentials.

---

## Option 5 - Verify Repository Permissions

Ask the repository administrator to verify

- Read access
- Write access
- Team membership
- Organization membership

---

# Verification

Clone repository

```bash
git clone <repository-url>
```

Fetch

```bash
git fetch
```

Pull

```bash
git pull
```

Push

```bash
git push
```

Expected

Commands complete without authentication or permission errors.

---

# Rollback

If access changes caused additional issues

- Restore previous SSH configuration
- Restore previous remote URL
- Revert credential helper changes
- Contact GitHub administrator

---

# Escalation

Escalate when

- Organization permissions are incorrect
- Repository ownership changed
- GitHub outage suspected
- Enterprise SSO authentication fails
- CI/CD service account loses access

---

# Post-Incident Tasks

- Document root cause
- Verify user permissions
- Rotate compromised credentials
- Review repository access policies
- Update onboarding documentation

---

# Prevention

- Use SSH authentication where possible
- Rotate Personal Access Tokens regularly
- Enable MFA
- Audit repository permissions
- Use GitHub Teams for access management
- Remove inactive users promptly

---

# Related Commands

View remotes

```bash
git remote -v
```

Test SSH

```bash
ssh -T git@github.com
```

Generate SSH key

```bash
ssh-keygen -t ed25519
```

View public key

```bash
cat ~/.ssh/id_ed25519.pub
```

Verify remote access

```bash
git ls-remote origin
```

---

# Real Production Scenario

A GitHub Actions deployment pipeline suddenly failed with **"Permission denied (publickey)"** after the deployment server was rebuilt. Investigation revealed that the new server did not contain the required SSH private key used for repository authentication. The DevOps Engineer generated a new SSH key pair, added the public key as a deploy key in GitHub, verified repository access using `ssh -T git@github.com`, reran the pipeline, and restored automated deployments successfully.

