# ArgoCD CLI

# Enterprise DevOps Platform

---

# Purpose

This document explains the ArgoCD Command Line Interface (CLI) from beginner to enterprise level.

The ArgoCD CLI allows DevOps Engineers, Platform Engineers, and SREs to manage applications, repositories, clusters, projects, synchronization, and troubleshooting directly from the terminal.

---

# Introduction

Although the ArgoCD Web UI is useful for monitoring, most production engineers prefer the CLI because it

- Is faster
- Supports automation
- Can be integrated into scripts
- Works well over SSH
- Is suitable for CI/CD pipelines

The CLI communicates with the ArgoCD API Server.

---

# CLI Architecture

```
Engineer

    │

    ▼

ArgoCD CLI

    │

    ▼

ArgoCD API Server

    │

    ▼

Application Controller

    │

    ▼

Kubernetes Cluster
```

---

# Installing the CLI

Linux

```bash
curl -sSL -o argocd \
https://github.com/argoproj/argo-cd/releases/latest/download/argocd-linux-amd64

chmod +x argocd

sudo mv argocd /usr/local/bin/
```

Verify installation

```bash
argocd version
```

---

# Login

Example

```bash
argocd login localhost:8080
```

With username

```bash
argocd login localhost:8080 \
--username admin
```

Using insecure mode

```bash
argocd login localhost:8080 \
--insecure
```

---

# Verify Login

```bash
argocd account get-user-info
```

Example

```
Logged In

Username

admin
```

---

# List Applications

```bash
argocd app list
```

Example

```
frontend

Healthy

Synced

--------------------

gateway

Healthy

Synced

--------------------

auth

Healthy

OutOfSync
```

---

# Get Application Details

```bash
argocd app get frontend
```

Displays

- Health
- Sync Status
- Repository
- Revision
- Namespace
- Resources

---

# Synchronize Application

```bash
argocd app sync frontend
```

Workflow

```
Git

↓

Manifest

↓

Cluster

↓

Synced
```

---

# Refresh Application

```bash
argocd app get frontend --refresh
```

Refresh forces ArgoCD to

- Read Git
- Compare Resources
- Refresh Status

---

# Rollback

List history

```bash
argocd app history frontend
```

Rollback

```bash
argocd app rollback frontend 3
```

Rollback returns the application to a previous revision.

---

# Delete Application

```bash
argocd app delete frontend
```

Always verify before deleting production applications.

---

# View Logs

API Server

```bash
kubectl logs deployment/argocd-server -n argocd
```

Controller

```bash
kubectl logs statefulset/argocd-application-controller -n argocd
```

---

# List Repositories

```bash
argocd repo list
```

Example

```
GitHub

Connected

GitLab

Connected
```

---

# Add Repository

```bash
argocd repo add https://github.com/company/gitops.git
```

Private repositories require authentication credentials.

---

# List Clusters

```bash
argocd cluster list
```

Example

```
Production

Healthy

Staging

Healthy

Development

Healthy
```

---

# Add Cluster

```bash
argocd cluster add production
```

This registers a Kubernetes cluster with ArgoCD.

---

# List Projects

```bash
argocd proj list
```

Example

```
Development

Staging

Production
```

---

# Get Project Details

```bash
argocd proj get production
```

Displays

- Allowed repositories
- Allowed namespaces
- Allowed clusters
- RBAC configuration

---

# Account Information

Current user

```bash
argocd account get-user-info
```

List accounts

```bash
argocd account list
```

---

# Logout

```bash
argocd logout localhost:8080
```

---

# Enterprise Example

Production deployment

```
Developer

↓

Git Commit

↓

ArgoCD Detects Change

↓

Engineer verifies

argocd app get gateway

↓

Application Healthy

↓

Deployment Complete
```

---

# Frequently Used Commands

| Command | Purpose |
|----------|----------|
| argocd version | CLI Version |
| argocd login | Login |
| argocd logout | Logout |
| argocd app list | List Applications |
| argocd app get | Application Details |
| argocd app sync | Synchronize |
| argocd app history | Deployment History |
| argocd app rollback | Rollback |
| argocd repo list | List Repositories |
| argocd cluster list | List Clusters |
| argocd proj list | List Projects |

---

# Common Mistakes

- Logging into the wrong ArgoCD server
- Synchronizing the wrong application
- Rolling back the wrong revision
- Deleting production applications
- Ignoring OutOfSync status

---

# Best Practices

- Verify the target application before Sync.
- Review deployment history before Rollback.
- Use RBAC for production access.
- Avoid using the admin account for daily operations.
- Prefer SSO authentication.
- Monitor application health after synchronization.
- Keep the CLI version compatible with the ArgoCD server.

---

# Interview Questions

## Q1. Why use the ArgoCD CLI instead of the UI?

### Answer

The CLI is faster, scriptable, automation-friendly, and commonly used in production environments and CI/CD pipelines.

---

## Q2. How do you manually synchronize an application?

### Answer

Using

```bash
argocd app sync <application-name>
```

This compares Git with the cluster and applies the desired state.

---

## Q3. How do you check deployment history?

### Answer

Using

```bash
argocd app history <application-name>
```

which displays previous revisions and deployment information.

---

# Marathi Quick Revision

- CLI Install करा.
- Login करा.
- App List पहा.
- App Details तपासा.
- Sync करा.
- Rollback करा.
- Repository आणि Cluster Manage करा.
- Production मध्ये RBAC वापरा.

---

# Marathi Summary (5+ Experience Revision)

ArgoCD CLI हे Enterprise DevOps Engineers साठी सर्वात महत्त्वाचे management tool आहे. याच्या मदतीने applications, repositories, projects आणि Kubernetes clusters व्यवस्थापित करता येतात. CLI द्वारे synchronization, rollback, deployment history, health verification आणि troubleshooting सहज करता येते. Production environments मध्ये automation, CI/CD integration, RBAC आणि SSO सोबत CLI चा मोठ्या प्रमाणावर वापर केला जातो.

