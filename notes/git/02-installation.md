# Git Installation

## Purpose

This document explains how Git is installed and configured for our Enterprise DevOps Platform.

This is not just about installing Git.

The objective is to prepare a developer or DevOps engineer's workstation according to enterprise standards.

---

# Why Git Installation Matters

Installing Git is the first step.

Correct configuration is equally important because Git records:

- Author Name
- Email Address
- Commit History
- Repository Information

Incorrect configuration can make production auditing difficult.

---

# Supported Operating Systems

Our project supports:

- Ubuntu 24.04 LTS
- Ubuntu 22.04 LTS
- Debian
- macOS
- Windows (Git Bash)

Development environment used in this project:

Ubuntu Linux

---

# Verify Git Installation

Check Git version.

```bash
git --version
```

Expected Output

Example

```text
git version 2.43.x
```

---

# Install Git (Ubuntu)

```bash
sudo apt update

sudo apt install git -y
```

Verify

```bash
git --version
```

---

# Configure Git

Set your username.

```bash
git config --global user.name "Your Name"
```

Example

```bash
git config --global user.name "Suyog"
```

---

Set email.

```bash
git config --global user.email "your@email.com"
```

Example

```bash
git config --global user.email "suyog@example.com"
```

---

Check configuration.

```bash
git config --list
```

Expected output includes:

- user.name
- user.email

---

# Configure Default Branch

Modern repositories use:

main

Configure globally.

```bash
git config --global init.defaultBranch main
```

---

# Configure Editor

Example using VS Code.

```bash
git config --global core.editor "code --wait"
```

Or Vim

```bash
git config --global core.editor vim
```

---

# Configure Merge Tool (Optional)

Example

```bash
git config --global merge.tool vimdiff
```

Later we may use VS Code merge editor.

---

# Generate SSH Key

Enterprise repositories generally use SSH.

Generate key.

```bash
ssh-keygen -t ed25519 -C "your@email.com"
```

Default location

```text
~/.ssh/id_ed25519
```

---

Start SSH Agent

```bash
eval "$(ssh-agent -s)"
```

Add key

```bash
ssh-add ~/.ssh/id_ed25519
```

Display public key

```bash
cat ~/.ssh/id_ed25519.pub
```

Add this key to GitHub.

---

# Verify GitHub Connection

```bash
ssh -T git@github.com
```

Expected

Authentication successful.

---

# Repository Configuration

Inside repository

```bash
git config --local --list
```

Global configuration affects every repository.

Local configuration affects only this project.

---

# Enterprise Configuration

Most companies configure:

- Username
- Email
- Default Branch
- SSH Authentication
- Signed Commits (Optional)
- Credential Manager
- Pull Strategy

These settings help standardize developer workstations.

---

# How We Use Git in Our Project

Repository

enterprise-devops-platform

Git manages:

- Application source code
- Dockerfiles
- Kubernetes manifests
- Helm charts
- Terraform code
- GitHub Actions workflows
- Documentation
- Runbooks
- Incident reports

Every contributor should have Git configured before making changes.

---

# Real Production Scenario

Scenario

A developer commits code using an incorrect email address.

Problem

Git history now shows an unknown author.

Impact

- Audit reports become inaccurate.
- Pull Request ownership is confusing.
- Compliance checks may fail.

Resolution

Correct Git configuration before future commits.

Rewrite history only if approved by the team.

---

# Scenario-Based Interview Questions

## Question 1

A developer cannot push to GitHub using SSH.

What do you check?

Expected Discussion

- SSH key exists
- SSH agent running
- Public key added to GitHub
- Repository remote uses SSH URL
- Test with:

```bash
ssh -T git@github.com
```

---

## Question 2

Two developers appear as the same author in Git history.

Possible reason?

Answer

Incorrect global Git configuration.

Verify

```bash
git config --global --list
```

---

# Architecture-Level Interview Questions

## Question

Why do enterprises prefer SSH over HTTPS for Git operations?

Answer

Benefits include:

- Better automation
- No password prompts
- Easier CI/CD integration
- Strong authentication using key pairs

---

## Question

Why separate global and local Git configuration?

Answer

Global configuration applies to all repositories.

Local configuration allows project-specific overrides without affecting other repositories.

---

# Production Support Questions

Q.

A CI pipeline fails because it cannot clone a private repository.

Possible causes?

Answer

- Missing SSH key
- Incorrect repository permissions
- Wrong remote URL
- Expired credentials
- Network restrictions

---

# Best Practices

- Use SSH authentication
- Verify Git version regularly
- Use corporate email address
- Keep Git updated
- Configure default branch as main
- Review configuration before first commit

---

# Common Mistakes

- Wrong email address
- Wrong username
- Using HTTPS when SSH is required
- Forgetting to start SSH agent
- Copying incomplete public key
- Using personal account for company repositories

---

# Key Takeaways

Installing Git is only the beginning.

A correctly configured Git environment ensures:

- Secure authentication
- Accurate commit history
- Reliable collaboration
- Smooth CI/CD integration

---

# Marathi Quick Revision

Git install करणं सोपं आहे.

पण enterprise मध्ये configuration जास्त महत्त्वाचं असतं.

नेहमी:

- योग्य Name
- योग्य Email
- SSH Key
- Default Branch
- Git Version

हे verify करायचं.

यामुळे production मध्ये auditing आणि collaboration सोपं होतं.

---

# Marathi Interview Memory Tip

Interview मध्ये जर विचारलं:

"Git install केल्यावर काय configure करता?"

उत्तर:

"मी Git install केल्यानंतर user.name, user.email, init.defaultBranch, SSH authentication, editor आणि repository connectivity verify करतो. Enterprise environment मध्ये SSH-based authentication आणि योग्य Git identity खूप महत्त्वाची असते कारण त्यावर audit trail आणि CI/CD अवलंबून असतात."

