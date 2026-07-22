# ArgoCD Repositories

# Enterprise DevOps Platform

---

# Purpose

This document explains ArgoCD Repositories from beginner to enterprise level.

Repositories are one of the most important components in ArgoCD because they act as the source of truth for application deployments. ArgoCD continuously watches these repositories and synchronizes Kubernetes clusters with their contents.

---

# Introduction

An ArgoCD Repository is the Git or Helm repository that stores the deployment manifests used by ArgoCD.

ArgoCD continuously monitors these repositories for changes.

Whenever a change is detected,

```
Git Repository

↓

ArgoCD

↓

Kubernetes Cluster
```

Applications are updated according to the desired state stored in Git.

---

# What Can Be a Repository?

ArgoCD supports

- GitHub
- GitLab
- Bitbucket
- Azure DevOps
- Self-hosted Git
- Helm Repositories
- OCI Helm Registries

---

# Repository Architecture

```
Developer

      │

Git Commit

      │

      ▼

Git Repository

      │

      ▼

Repository Server

      │

      ▼

Application Controller

      │

      ▼

Kubernetes Cluster
```

---

# Enterprise Example

Our Enterprise DevOps Platform

```
enterprise-devops-platform

│

├── frontend/

├── gateway/

├── auth/

├── dashboard/

├── helm/

└── kubernetes/
```

Repository

```
https://github.com/company/enterprise-devops-platform
```

ArgoCD monitors this repository continuously.

---

# Why Repositories Matter

Repositories provide

- Version Control
- Deployment History
- Rollback Capability
- Audit Trail
- Collaboration
- Disaster Recovery

Without repositories,

GitOps cannot exist.

---

# Repository Types

## Git Repository

Stores

- YAML manifests
- Helm charts
- Kustomize overlays
- Jsonnet files

Example

```
GitHub

↓

Application YAML

↓

ArgoCD
```

---

## Helm Repository

Stores packaged Helm charts.

Example

```
Helm Repository

↓

Chart

↓

ArgoCD

↓

Cluster
```

---

## OCI Repository

Stores Helm charts inside OCI registries.

Example

```
OCI Registry

↓

Helm Chart

↓

ArgoCD
```

---

# Public Repository

Example

```
https://github.com/company/gitops
```

No authentication required.

---

# Private Repository

Most enterprise repositories are private.

Authentication methods include

- Username and Password
- Personal Access Token
- SSH Key
- GitHub App
- Azure DevOps Credentials

---

# Adding a Repository

Using CLI

```bash
argocd repo add https://github.com/company/gitops.git
```

Private repository

```bash
argocd repo add https://github.com/company/gitops.git \
--username gituser \
--password token
```

---

# Listing Repositories

```bash
argocd repo list
```

Example

```
GitHub

Connected

----------------

GitLab

Connected

----------------

Helm Repo

Connected
```

---

# Repository Status

Repositories can have

```
Successful

Failed

Unknown
```

A failed repository prevents application synchronization.

---

# Repository Credentials

Credentials are securely stored as Kubernetes Secrets.

Typical information

- Repository URL
- Authentication Type
- Username
- Token
- SSH Key

Production credentials should never be hardcoded.

---

# Repository Access Flow

```
Application

↓

Repository Server

↓

Authenticate

↓

Clone Repository

↓

Generate Manifests

↓

Deploy
```

---

# Repository Updates

Developer changes

```
values.yaml
```

Workflow

```
Git Commit

↓

Repository Updated

↓

ArgoCD Detects Change

↓

Application OutOfSync

↓

Synchronization

↓

Application Healthy
```

---

# Enterprise Repository Structure

Example

```
gitops/

├── development/

├── staging/

├── production/

├── applications/

├── infrastructure/

└── monitoring/
```

Keeping repositories organized simplifies large-scale deployments.

---

# Common Repository Issues

- Wrong repository URL
- Invalid credentials
- Expired Personal Access Token
- SSH key mismatch
- Network connectivity issues
- Branch does not exist
- Repository deleted
- Repository permissions changed

---

# Best Practices

- Use private repositories for production.
- Protect the main branch.
- Use Pull Requests.
- Rotate credentials regularly.
- Use SSH keys or GitHub Apps where possible.
- Avoid storing secrets in Git.
- Separate application and infrastructure repositories.
- Monitor repository connectivity.

---

# Interview Questions

## Q1. What is an ArgoCD Repository?

### Answer

An ArgoCD Repository is a Git or Helm repository that stores the desired deployment configuration monitored and synchronized by ArgoCD.

---

## Q2. Which repository types are supported?

### Answer

ArgoCD supports Git repositories, Helm repositories and OCI-based Helm registries.

---

## Q3. How are private repositories authenticated?

### Answer

Private repositories can be authenticated using Personal Access Tokens, SSH keys, usernames and passwords, GitHub Apps or other supported credential mechanisms.

---

# Marathi Quick Revision

- Repository म्हणजे Source of Truth.
- Git आणि Helm Repository Support आहेत.
- Private Repository साठी Authentication लागते.
- Repository Server Git Clone करते.
- Credentials Secret मध्ये ठेवले जातात.
- Branch Protection वापरा.
- Secrets Git मध्ये ठेवू नका.

---

# Marathi Summary (5+ Experience Revision)

ArgoCD Repository हे GitOps deployment चे मुख्य source आहे. Git, Helm आणि OCI repositories मधील deployment manifests ArgoCD सतत monitor करून Kubernetes cluster शी synchronize करते. Enterprise environments मध्ये private repositories, secure authentication, branch protection, credential rotation आणि repository organization या सर्वोत्तम पद्धती वापरल्या जातात. Repository connectivity आणि authentication failures या Production Support मध्ये सर्वाधिक आढळणाऱ्या समस्या आहेत.

