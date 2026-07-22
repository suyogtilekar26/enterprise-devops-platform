# GitHub Authentication (PAT & SSH)

# Purpose

Understand how GitHub authentication works, the differences between Personal Access Tokens (PAT) and SSH keys, and which method is preferred in enterprise environments.

Authentication is one of the most frequently asked GitHub interview topics for DevOps Engineers.

---

# Introduction

GitHub requires authentication whenever a user performs operations such as

- Push
- Pull (Private Repository)
- Clone (Private Repository)
- Create Releases
- Trigger GitHub Actions
- Access APIs

Modern GitHub authentication methods are:

- Personal Access Token (PAT)
- SSH Keys

Password authentication for Git operations is no longer supported.

---

# Authentication Methods

## Personal Access Token (PAT)

A PAT is a secure token used instead of a password.

Example

```
Developer

↓

Git

↓

PAT

↓

GitHub
```

PATs are commonly used for

- HTTPS authentication
- CI/CD
- Scripts
- GitHub API
- Automation

---

## SSH Authentication

SSH uses a public/private key pair.

```
Private Key

↓

Developer Machine

↓

SSH

↓

GitHub

↓

Public Key
```

No password is required after setup.

---

# PAT vs SSH

| Feature | PAT | SSH |
|----------|-----|------|
| Uses HTTPS | Yes | No |
| Uses SSH | No | Yes |
| Password Required | No | No |
| Good for Automation | Yes | Yes |
| Good for Developers | Yes | Yes |
| Supports GitHub API | Yes | No |
| Easy to Rotate | Yes | Moderate |
| Enterprise Usage | Very Common | Very Common |

---

# PAT Workflow

```
Developer

↓

Git Push

↓

HTTPS

↓

PAT

↓

GitHub
```

---

# SSH Workflow

```
Developer

↓

SSH Key

↓

Git Push

↓

GitHub
```

---

# Authentication in THIS Project

Developers

Use SSH

```
git@github.com:company/enterprise-devops-platform.git
```

CI/CD

Uses

- GitHub Secrets
- Personal Access Tokens
- GitHub App Tokens (where applicable)

---

# Daily DevOps Activities

DevOps Engineers

- Generate SSH keys
- Configure PATs
- Rotate expired tokens
- Troubleshoot authentication failures
- Configure deploy keys
- Secure CI/CD credentials
- Audit authentication methods

---

# Common Commands

Generate SSH key

```bash
ssh-keygen -t ed25519 -C "user@example.com"
```

View public key

```bash
cat ~/.ssh/id_ed25519.pub
```

Test GitHub authentication

```bash
ssh -T git@github.com
```

Expected

```text
Hi username! You've successfully authenticated.
```

Verify remote URL

```bash
git remote -v
```

---

# Common Authentication Errors

Error

```text
Permission denied (publickey)
```

Reason

SSH key missing or not registered.

---

Error

```text
Authentication failed
```

Reason

Expired or invalid PAT.

---

Error

```text
Repository not found
```

Reason

No repository permission or incorrect remote URL.

---

# Troubleshooting

Verify

- Repository URL
- SSH key exists
- Public key added to GitHub
- PAT not expired
- Correct repository permission
- Internet connectivity

---

# Production Best Practices

Always

- Use SSH for developer machines
- Use PATs or GitHub App tokens for automation
- Rotate tokens regularly
- Store PATs in GitHub Secrets
- Enable MFA
- Remove unused SSH keys

Never

- Share PATs
- Commit PATs
- Commit SSH private keys
- Store tokens in source code

---

# Security

Authentication should follow

- Least privilege
- Token expiration
- MFA
- Regular credential rotation
- Secure secret storage

SSH private keys must never leave the developer's machine.

---

# Real Production Scenario

A GitHub Actions deployment pipeline suddenly failed with an **Authentication failed** error while pushing Docker image metadata.

Investigation revealed that the Personal Access Token stored in GitHub Secrets had expired.

The DevOps Engineer generated a new PAT with the required scopes, updated the GitHub Secret, reran the workflow, and restored the deployment pipeline.

---

# Interview Questions

### Why did GitHub remove password authentication?

Passwords are less secure and difficult to manage compared to PATs and SSH keys.

---

### What is a Personal Access Token?

A PAT is a secure token used instead of a password for HTTPS authentication and GitHub API access.

---

### What is SSH authentication?

SSH authentication uses a public/private key pair to securely authenticate users without passwords.

---

### Which is better: PAT or SSH?

For developers, SSH is generally preferred.

For automation and APIs, PATs (or GitHub App tokens) are commonly used.

---

### Where should PATs be stored?

In secure secret managers such as GitHub Secrets, never inside source code.

---

### Can GitHub use passwords for Git operations?

No.

GitHub no longer supports password authentication for Git over HTTPS.

---

# Marathi Quick Revision

GitHub Authentication चे दोन मुख्य प्रकार आहेत.

- SSH
- Personal Access Token (PAT)

Developer Machine

→ SSH

Automation / CI/CD

→ PAT

Password वापरून Git Push आता करता येत नाही.

---

# Marathi Interview Memory Tips

Remember

```
Developer

↓

SSH
```

```
CI/CD

↓

PAT
```

Interview Formula

```
SSH

+

PAT

+

GitHub Secrets

=

Secure GitHub Authentication
```

---

# Key Takeaways

- GitHub supports PAT and SSH authentication.
- Password authentication for Git is deprecated.
- SSH is preferred for developers.
- PATs are widely used for automation and APIs.
- Tokens and keys must be securely stored and regularly rotated.

