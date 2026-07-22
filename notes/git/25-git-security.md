# Git Security

## Purpose

This document explains Git Security from an Enterprise DevOps perspective.

Git Security focuses on protecting source code, infrastructure, secrets, repositories, and the software supply chain.

In enterprise environments, Git repositories contain critical business assets including application source code, Kubernetes manifests, Terraform infrastructure, CI/CD pipelines, and deployment configurations.

Securing Git is therefore a fundamental DevOps responsibility.

---

# Introduction

A Git repository may contain

- Application Source Code
- Infrastructure as Code
- Kubernetes Manifests
- Dockerfiles
- Helm Charts
- Terraform Modules
- GitHub Actions
- Internal Documentation

If compromised,

an attacker could

- Steal source code
- Deploy malicious software
- Access cloud infrastructure
- Leak sensitive information

Git security protects against these risks.

---

# Why Git Security is Important

Strong Git security provides

- Source code protection
- Infrastructure protection
- Supply chain security
- Compliance
- Auditability
- Controlled deployments

Security begins with the repository.

---

# Enterprise Usage

Enterprise Git security includes

- Repository permissions
- Branch protection
- Pull Request approvals
- Secret scanning
- Commit signing
- Multi-Factor Authentication
- Least privilege access
- Audit logging

---

# Git Security Architecture

```text
Developer

↓

Authentication

↓

GitHub Repository

↓

Branch Protection

↓

Pull Request Review

↓

GitHub Actions

↓

Deployment

↓

Production
```

Security controls exist at every stage.

---

# Authentication

Developers should use

- SSH Keys
- Personal Access Tokens (PAT)
- Multi-Factor Authentication (MFA)

Passwords should never be used for Git operations where more secure alternatives are available.

---

# Repository Permissions

Use Role-Based Access Control (RBAC).

Typical roles

- Read
- Write
- Maintain
- Admin

Grant only the permissions required for each role.

---

# Branch Protection

Protect important branches such as

```text
main

develop

release/*
```

Typical rules

- No direct pushes
- Pull Requests required
- CI checks required
- Code review required
- Signed commits (optional)
- Linear history (optional)

---

# Pull Request Reviews

Every production change should be reviewed.

Review verifies

- Code quality
- Security
- Infrastructure impact
- Deployment readiness

No engineer should approve their own production changes without following organizational policy.

---

# Secret Management

Never commit

- Passwords
- API Keys
- Tokens
- Certificates
- Private Keys
- Cloud Credentials

Instead use

- GitHub Secrets
- Vault
- AWS Secrets Manager
- Kubernetes Secrets

Secrets should never exist in Git history.

---

# Secret Scanning

Use automated tools to detect

- AWS Keys
- Azure Credentials
- Google Cloud Keys
- GitHub Tokens
- SSH Keys
- Database Passwords

Scanning should occur

- Before commit
- During CI
- Inside GitHub

---

# Commit Signing

Developers can sign commits using

- GPG
- SSH Signing

Benefits

- Verify author identity
- Detect tampering
- Improve auditability

Many enterprise repositories require signed commits.

---

# Dependency Security

Monitor dependencies for

- Vulnerabilities
- Outdated packages
- Unsupported versions

Automated dependency scanning should be part of CI/CD.

---

# Git Security in Our Project

Our Enterprise DevOps Platform will secure

Application

- React
- Flask Services

Infrastructure

- Docker
- Kubernetes
- Helm
- Terraform

Automation

- GitHub Actions

Operations

- Documentation
- Runbooks
- Incident Records

GitHub will be configured with protected branches, Pull Request reviews and secret management.

---

# Enterprise Workflow

Developer

↓

Feature Branch

↓

Pre-Commit Validation

↓

Pull Request

↓

Security Review

↓

CI/CD

↓

Approval

↓

Merge

↓

Deployment

Every production change passes multiple security controls.

---

# Daily DevOps Activities

DevOps Engineers

- Review Pull Requests
- Manage repository permissions
- Rotate credentials
- Review secret scanning alerts
- Monitor branch protection
- Audit repository access

---

# Production Best Practices

- Enable MFA.
- Use SSH authentication.
- Protect production branches.
- Require Pull Requests.
- Scan for secrets.
- Rotate credentials regularly.
- Use least privilege.
- Enable audit logs.
- Review repository access periodically.

---

# Security Considerations

Never

- Commit secrets
- Disable branch protection
- Share SSH keys
- Share Personal Access Tokens
- Bypass Pull Request reviews
- Ignore security alerts

Repository security directly affects production security.

---

# Troubleshooting

Verify remote

```bash
git remote -v
```

Check signed commit

```bash
git log --show-signature
```

Check repository status

```bash
git status
```

Review branch

```bash
git branch
```

Inspect commit history

```bash
git log --oneline
```

---

# Real Production Scenario

Scenario

A developer accidentally commits an AWS Access Key.

GitHub Secret Scanning detects the credential.

Immediate actions

- Revoke the key
- Generate a new credential
- Remove the secret from Git history if required
- Review audit logs
- Investigate repository access

Early detection prevents cloud compromise.

---

# Scenario-Based Interview Questions

## Question 1

Why should secrets never be committed to Git?

Answer

Git history is permanent and widely distributed.

Even deleted secrets may remain recoverable from history.

---

## Question 2

What is branch protection?

Answer

Branch protection enforces rules such as Pull Requests, required reviews and successful CI checks before code reaches protected branches.

---

## Question 3

Why is Multi-Factor Authentication important?

Answer

MFA significantly reduces the risk of unauthorized repository access caused by compromised credentials.

---

# Architecture-Level Interview Questions

## Question

Why is Git security considered part of supply chain security?

Answer

Because compromised source code or CI/CD pipelines can introduce malicious software into production deployments.

---

## Question

Why should infrastructure repositories receive the same security as application repositories?

Answer

Infrastructure as Code controls production environments.

Compromising Terraform or Kubernetes manifests can be as damaging as compromising application code.

---

## Question

How does least privilege improve Git security?

Answer

Users receive only the permissions necessary for their responsibilities, reducing the impact of compromised accounts.

---

# Production Support Questions

Q.

GitHub reports that a secret has been committed.

What should you do first?

Answer

Immediately revoke or rotate the exposed credential before beginning repository cleanup.

---

Q.

A developer cannot push directly to the main branch.

Is this a problem?

Answer

No.

Protected branches intentionally prevent direct pushes to ensure all production changes are reviewed and validated.

---

# Related Runbooks

Future runbooks

- Rotate Compromised Credentials
- Remove Secret from Git History
- Configure Branch Protection
- Configure Repository Security
- Respond to Secret Scanning Alert

---

# Common Incidents

- Secret committed to Git
- Unauthorized repository access
- Branch protection disabled
- Weak authentication
- Excessive repository permissions
- Unreviewed production changes

---

# Commands

View remotes

```bash
git remote -v
```

View commit signatures

```bash
git log --show-signature
```

Repository status

```bash
git status
```

Current branch

```bash
git branch
```

View history

```bash
git log --oneline
```

---

# Key Takeaways

Git Security protects

- Source code
- Infrastructure
- CI/CD
- Secrets
- Production deployments

Enterprise Git security combines technical controls, access management, automated validation, and operational processes to reduce risk across the entire software delivery lifecycle.

---

# Marathi Quick Revision

Git Security म्हणजे repository सुरक्षित ठेवणे.

मुख्य गोष्टी

- MFA
- SSH Keys
- Branch Protection
- Pull Requests
- Secret Scanning
- Least Privilege
- Commit Signing

Git मध्ये passwords, API keys किंवा cloud credentials कधीही commit करू नयेत.

---

# Marathi Interview Memory Tip

Interview मध्ये जर विचारलं:

"Git Security मध्ये कोणत्या best practices वापरता?"

असं सांगा:

"Enterprise मध्ये आम्ही MFA, SSH authentication, protected branches, Pull Request reviews, secret scanning, least privilege access आणि GitHub Secrets वापरतो. Infrastructure as Code आणि application source code दोन्ही समान स्तरावर सुरक्षित ठेवणे आवश्यक असते कारण repository हा संपूर्ण CI/CD pipeline चा foundation असतो."

