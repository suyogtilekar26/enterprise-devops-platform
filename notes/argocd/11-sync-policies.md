# ArgoCD Sync Policies

# Enterprise DevOps Platform

---

# Purpose

This document explains ArgoCD Sync Policies from beginner to enterprise level.

Sync Policies determine how and when ArgoCD synchronizes Kubernetes resources with the desired state stored in Git.

Understanding Sync Policies is essential because they directly affect deployment automation, production stability, disaster recovery, and operational efficiency.

---

# Introduction

ArgoCD continuously compares

```
Desired State

(Git)

        with

Actual State

(Kubernetes Cluster)
```

When a difference is detected,

ArgoCD can

- Wait for manual approval
- Automatically synchronize
- Automatically recover drift

This behavior is controlled using Sync Policies.

---

# What is a Sync Policy?

A Sync Policy defines

- When synchronization occurs
- Whether synchronization is automatic
- Whether drift should be corrected
- Whether unused resources should be removed

---

# Sync Policy Types

ArgoCD supports

```
Manual Sync

Automatic Sync
```

Automatic Sync can also enable

- Self Healing
- Pruning

---

# Manual Sync

Manual Sync is the default behavior.

Workflow

```
Developer

↓

Git Commit

↓

Application becomes

OutOfSync

↓

Engineer clicks

SYNC

↓

Deployment Starts
```

No deployment happens until an engineer approves it.

---

# Automatic Sync

Automatic Sync deploys changes immediately after Git is updated.

Workflow

```
Git Commit

↓

ArgoCD Detects Change

↓

Synchronization

↓

Deployment Complete
```

No manual intervention is required.

---

# Manual vs Automatic Sync

| Manual Sync | Automatic Sync |
|-------------|----------------|
| Manual approval | Fully automated |
| More control | Faster deployment |
| Suitable for Production | Suitable for Dev/Test |
| Slower | Faster |

---

# Self Healing

Self Healing automatically fixes configuration drift.

Example

Git contains

```
Replicas

3
```

Someone manually changes

```bash
kubectl scale deployment frontend --replicas=10
```

Cluster

```
Replicas

10
```

ArgoCD detects the difference.

```
Git

↓

3 Replicas

↓

ArgoCD

↓

Cluster

↓

Restored to 3
```

---

# Pruning

Pruning removes Kubernetes resources that no longer exist in Git.

Example

Git originally contains

```
Deployment

Service

ConfigMap
```

Later

```
ConfigMap removed
```

Without pruning

```
Deployment

Service

ConfigMap

(still exists)
```

With pruning

```
Deployment

Service
```

The obsolete ConfigMap is deleted automatically.

---

# Sync Policy Architecture

```
Git Repository

        │

        ▼

Application Controller

        │

        ▼

Compare

        │

        ▼

OutOfSync

        │

        ▼

Sync Policy

        │

 ┌───────────────┐

 ▼               ▼

Manual       Automatic

        │

        ▼

Kubernetes Cluster
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

Development

```
Automatic Sync

Self Healing

Pruning
```

Production

```
Manual Sync

Manual Approval

Controlled Rollout
```

Different environments use different Sync Policies.

---

# Sync Policy Configuration

Example

```yaml
syncPolicy:
  automated: {}
```

Automatic Sync enabled.

---

Automatic Sync with Self Healing

```yaml
syncPolicy:
  automated:
    selfHeal: true
```

---

Automatic Sync with Pruning

```yaml
syncPolicy:
  automated:
    prune: true
```

---

Full Configuration

```yaml
syncPolicy:
  automated:
    prune: true
    selfHeal: true
```

---

# Deployment Workflow

```
Developer

↓

Git Commit

↓

GitHub

↓

ArgoCD

↓

Compare

↓

OutOfSync

↓

Sync Policy

↓

Deployment

↓

Healthy
```

---

# Production Recommendation

Development

```
Automatic Sync

Self Healing

Pruning
```

Testing

```
Automatic Sync

Self Healing
```

Production

```
Manual Sync

Manual Approval

Optional Self Healing
```

This reduces deployment risk.

---

# Benefits

Sync Policies provide

- Deployment automation
- Controlled releases
- Faster recovery
- Reduced manual work
- Drift correction
- Consistent deployments

---

# Common Mistakes

- Enabling Automatic Sync without testing
- Using Pruning without understanding its impact
- Ignoring OutOfSync applications
- Enabling Self Healing on manually managed resources
- Using the same Sync Policy for every environment

---

# Best Practices

- Use Manual Sync for Production.
- Use Automatic Sync for Development.
- Enable Self Healing for Git-managed resources.
- Test Pruning in non-production environments first.
- Review deployment history before synchronization.
- Monitor synchronization failures.

---

# Interview Questions

## Q1. What is a Sync Policy?

### Answer

A Sync Policy defines how and when ArgoCD synchronizes Kubernetes resources with the desired state stored in Git.

---

## Q2. What is the difference between Manual Sync and Automatic Sync?

### Answer

Manual Sync requires an engineer to initiate deployment, while Automatic Sync deploys changes automatically whenever Git changes.

---

## Q3. What is Self Healing?

### Answer

Self Healing automatically restores Kubernetes resources to match the desired state stored in Git whenever configuration drift is detected.

---

## Q4. What is Pruning?

### Answer

Pruning automatically removes Kubernetes resources that have been deleted from the Git repository.

---

# Marathi Quick Revision

- दोन Sync Policies आहेत.
- Manual Sync.
- Automatic Sync.
- Self Healing Drift दुरुस्त करते.
- Pruning जुने Resources Delete करते.
- Development मध्ये Auto Sync वापरा.
- Production मध्ये Manual Sync वापरा.

---

# Marathi Summary (5+ Experience Revision)

ArgoCD Sync Policies Git मधील desired state Kubernetes cluster मध्ये कधी आणि कशी लागू करायची हे नियंत्रित करतात. Manual Sync मध्ये deployment साठी engineer ची परवानगी आवश्यक असते, तर Automatic Sync Git मधील बदल लगेच deploy करते. Self Healing configuration drift आपोआप दुरुस्त करते आणि Pruning Git मधून काढून टाकलेले Kubernetes resources delete करते. Enterprise मध्ये Development साठी Automatic Sync आणि Production साठी Manual Sync ही सर्वाधिक वापरली जाणारी पद्धत आहे.

