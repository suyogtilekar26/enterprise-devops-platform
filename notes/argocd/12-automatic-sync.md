# Automatic Sync

# Enterprise DevOps Platform

---

# Purpose

This document explains Automatic Sync in ArgoCD from beginner to enterprise level.

Automatic Sync is one of the most powerful GitOps features. It enables ArgoCD to automatically deploy Kubernetes applications whenever changes are detected in the Git repository without requiring manual intervention.

---

# Introduction

Normally, ArgoCD detects changes in Git and marks an application as

```
OutOfSync
```

An engineer must then manually click

```
SYNC
```

or execute

```bash
argocd app sync
```

With Automatic Sync enabled,

ArgoCD performs synchronization automatically.

---

# Simple Definition

Automatic Sync means

> Whenever Git changes, ArgoCD automatically deploys those changes to Kubernetes.

No manual deployment is required.

---

# Deployment Flow

Without Automatic Sync

```
Developer

↓

Git Commit

↓

Application

OutOfSync

↓

Engineer

Clicks Sync

↓

Deployment
```

---

With Automatic Sync

```
Developer

↓

Git Commit

↓

ArgoCD Detects Change

↓

Automatic Sync

↓

Deployment

↓

Healthy
```

---

# How Automatic Sync Works

Step 1

Developer updates

```
values.yaml
```

Step 2

Developer pushes changes

```
Git Commit

↓

GitHub
```

Step 3

ArgoCD Repository Server detects new revision.

Step 4

Application Controller compares

```
Desired State

↓

Git

Actual State

↓

Cluster
```

Step 5

Difference detected.

Step 6

Synchronization starts automatically.

Step 7

Application becomes

```
Synced

Healthy
```

---

# Enterprise Example

Our Enterprise DevOps Platform

```
Frontend

Gateway

Auth

Dashboard
```

Developer updates

```
Frontend Image

v1.5.0

↓

v1.6.0
```

Workflow

```
Git Commit

↓

GitHub

↓

ArgoCD

↓

Automatic Sync

↓

Frontend Updated
```

No engineer performs

```bash
kubectl apply
```

---

# Automatic Sync Configuration

Enable Automatic Sync

```yaml
spec:
  syncPolicy:
    automated: {}
```

This enables automatic deployment whenever Git changes.

---

# Automatic Sync with Self Healing

```yaml
spec:
  syncPolicy:
    automated:
      selfHeal: true
```

ArgoCD also restores manually modified resources.

---

# Automatic Sync with Pruning

```yaml
spec:
  syncPolicy:
    automated:
      prune: true
```

Unused Kubernetes resources are deleted automatically.

---

# Complete Configuration

```yaml
spec:
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
```

This is a common enterprise configuration for development environments.

---

# Deployment Timeline

```
09:00

Developer commits code

↓

09:01

Git Updated

↓

09:02

ArgoCD detects revision

↓

09:03

Synchronization starts

↓

09:04

Deployment completed

↓

09:05

Application Healthy
```

---

# Advantages

Automatic Sync provides

- Fully automated deployments
- Faster releases
- Reduced manual work
- Consistent deployments
- Improved GitOps workflow
- Better developer productivity

---

# Enterprise Environment Strategy

Development

```
Automatic Sync

Enabled
```

Testing

```
Automatic Sync

Enabled
```

Staging

```
Automatic Sync

Depends on approval policy
```

Production

```
Mostly Manual Sync

Automatic Sync only after approval in some organizations
```

---

# When to Use Automatic Sync

Recommended for

- Development
- Internal testing
- Sandbox clusters
- Demo environments

Use carefully in

- Production
- Financial systems
- Healthcare
- Government applications

---

# Common Problems

Automatic deployment after incorrect commit

Cause

```
Bug merged into Git
```

Solution

- Branch protection
- Code review
- CI testing
- Pull Request approval

---

Application repeatedly synchronizes

Possible causes

- Configuration drift
- External controllers
- Admission webhooks
- Manual cluster modifications

---

Unexpected Production deployment

Cause

Automatic Sync enabled on Production.

Solution

Use Manual Sync with approval workflows.

---

# Best Practices

- Protect the main branch.
- Require Pull Request approvals.
- Run CI before merge.
- Enable Automatic Sync for Development.
- Use Manual Sync for critical Production systems.
- Monitor deployment status after synchronization.
- Combine with Self Healing where appropriate.

---

# Interview Questions

## Q1. What is Automatic Sync?

### Answer

Automatic Sync is an ArgoCD feature that automatically synchronizes Kubernetes resources whenever changes are detected in the Git repository.

---

## Q2. Does Automatic Sync require manual approval?

### Answer

No.

Once enabled, ArgoCD automatically deploys changes after detecting updates in Git.

---

## Q3. Should Automatic Sync always be enabled in Production?

### Answer

Not necessarily.

Many enterprises use Manual Sync in Production to ensure proper approvals and controlled deployments.

---

# Marathi Quick Revision

- Automatic Sync Git changes deploy करते.
- Manual Sync लागत नाही.
- Development मध्ये जास्त वापरतात.
- Production मध्ये काळजीपूर्वक वापरा.
- Self Healing सोबत वापरू शकतो.
- Pruning सोबत वापरू शकतो.
- Pull Request Approval आवश्यक ठेवा.

---

# Marathi Summary (5+ Experience Revision)

Automatic Sync हे ArgoCD मधील GitOps automation चे मुख्य feature आहे. Git repository मध्ये नवीन commit आल्यावर ArgoCD आपोआप Kubernetes cluster synchronize करते. Development आणि Testing environments मध्ये यामुळे deployments जलद आणि पूर्णपणे automated होतात. Production मध्ये मात्र branch protection, Pull Request approvals, CI validation आणि governance लक्षात घेऊन Manual Sync किंवा नियंत्रित Automatic Sync वापरणे अधिक सुरक्षित मानले जाते.

