# GitHub Secrets

# Purpose

Understand GitHub Secrets, why they are used, how they are managed, and how they secure CI/CD pipelines in enterprise environments.

GitHub Secrets are one of the most commonly asked GitHub Actions interview topics.

---

# Introduction

GitHub Secrets are encrypted values stored securely inside a GitHub repository or organization.

They are used to store sensitive information such as

- API Keys
- Personal Access Tokens (PAT)
- AWS Credentials
- Azure Credentials
- GCP Credentials
- Docker Registry Credentials
- Kubernetes Kubeconfig
- SSH Private Keys
- Database Passwords

Instead of storing secrets in code, GitHub injects them securely into workflows during execution.

---

# Why GitHub Secrets are Needed

Without GitHub Secrets

- Passwords may be committed to Git
- API keys become publicly visible
- Credentials leak into repositories
- Security incidents increase
- Compliance requirements fail

GitHub Secrets solve these problems.

---

# Secret Workflow

```
Administrator

↓

Create Secret

↓

GitHub Repository

↓

GitHub Actions

↓

Workflow

↓

Deployment
```

Secrets never appear in source code.

---

# Types of GitHub Secrets

## Repository Secrets

Available only to one repository.

Example

```
AWS_ACCESS_KEY_ID

AWS_SECRET_ACCESS_KEY

DOCKER_USERNAME

DOCKER_PASSWORD
```

---

## Organization Secrets

Shared across multiple repositories.

Useful for

- Common AWS Account
- Shared Docker Registry
- Shared Kubernetes Cluster

---

## Environment Secrets

Used for specific deployment environments.

Example

```
Development

Staging

Production
```

Each environment can have different credentials.

---

# GitHub Secrets in THIS Project

Repository

```
enterprise-devops-platform
```

Secrets

```
DOCKER_USERNAME

DOCKER_PASSWORD

GHCR_TOKEN

KUBECONFIG

AWS_ACCESS_KEY_ID

AWS_SECRET_ACCESS_KEY

ARGOCD_TOKEN
```

---

# Using Secrets in GitHub Actions

Example

```yaml
env:
  USERNAME: ${{ secrets.DOCKER_USERNAME }}
```

Example

```yaml
- name: Login to Docker Hub
  run: docker login -u ${{ secrets.DOCKER_USERNAME }} -p ${{ secrets.DOCKER_PASSWORD }}
```

---

# Secret Lifecycle

```
Create Secret

↓

Store Securely

↓

Workflow Uses Secret

↓

Deployment

↓

Rotate Secret

↓

Update GitHub Secret
```

---

# Daily DevOps Activities

DevOps Engineers

- Create repository secrets
- Create organization secrets
- Rotate credentials
- Remove unused secrets
- Update expired tokens
- Troubleshoot authentication failures
- Audit secret usage

---

# Common Problems

Problem

Workflow authentication failed.

Reason

Incorrect secret value.

---

Problem

Workflow cannot access secret.

Reason

Secret not configured.

---

Problem

Deployment failed.

Reason

Expired cloud credentials.

---

Problem

Secret appears empty.

Reason

Incorrect secret name referenced.

---

# Troubleshooting

Verify

- Secret exists
- Secret name matches workflow
- Credentials are valid
- Repository has permission
- Environment secret configured correctly
- Workflow syntax correct

---

# Production Best Practices

Always

- Store secrets in GitHub Secrets
- Rotate secrets regularly
- Use least privilege
- Use Environment Secrets for production
- Audit credential usage
- Remove unused secrets

Never

- Commit passwords
- Store credentials in YAML
- Print secrets in workflow logs
- Share production credentials

---

# Security

GitHub automatically masks secret values in workflow logs.

Example

Instead of

```
mypassword123
```

Logs display

```
***
```

This prevents accidental exposure.

---

# Real Production Scenario

A GitHub Actions workflow failed while deploying to AWS.

Error

```
InvalidAccessKeyId
```

Investigation showed the AWS access key stored in GitHub Secrets had expired.

The DevOps Engineer generated a new IAM access key, updated the repository secrets, reran the workflow, and successfully deployed the application.

---

# Interview Questions

### What are GitHub Secrets?

Encrypted values used to securely store sensitive information for GitHub Actions workflows.

---

### Why use GitHub Secrets?

To prevent passwords, tokens, and API keys from being stored in source code.

---

### Can GitHub Secrets be viewed after creation?

No.

They can only be updated or replaced.

---

### Where can GitHub Secrets be created?

- Repository level
- Organization level
- Environment level

---

### Are GitHub Secrets encrypted?

Yes.

GitHub encrypts secrets and masks them in workflow logs.

---

### Should AWS credentials be stored in Git?

Never.

Store them in GitHub Secrets or use cloud-native identity solutions such as OIDC where available.

---

# Marathi Quick Revision

GitHub Secrets म्हणजे

Password, Token, API Key सुरक्षित ठेवण्याची GitHub ची सुविधा.

Workflow मध्ये

```
${{ secrets.SECRET_NAME }}
```

ने वापरतात.

Code मध्ये Secret कधीही लिहायचा नाही.

---

# Marathi Interview Memory Tips

Remember

```
Secrets

↓

GitHub

↓

Workflow

↓

Deployment
```

Interview Formula

```
GitHub Secrets

+

GitHub Actions

+

Credential Rotation

=

Secure CI/CD
```

---

# Key Takeaways

- GitHub Secrets securely store sensitive credentials.
- Secrets are encrypted and masked in workflow logs.
- Repository, Organization, and Environment Secrets serve different scopes.
- Never hardcode credentials in repositories or workflows.
- Proper secret management is essential for secure enterprise CI/CD.

