# Self Healing

# Enterprise DevOps Platform

---

# Purpose

This document explains the Self Healing feature in ArgoCD from beginner to enterprise level.

Self Healing is one of the core GitOps capabilities of ArgoCD. It automatically restores Kubernetes resources to the desired state defined in Git whenever manual or unexpected changes occur in the cluster.

---

# Introduction

In Kubernetes environments, engineers or automated tools may accidentally modify running resources.

Example

```bash
kubectl scale deployment frontend --replicas=10
```

But Git contains

```
Replicas

3
```

Now

```
Git

≠

Cluster
```

This difference is called

Configuration Drift.

Self Healing automatically detects this drift and restores the cluster.

---

# Simple Definition

Self Healing means

> ArgoCD automatically restores Kubernetes resources to match the desired state stored in Git.

---

# Why Self Healing?

Without Self Healing

```
Git

↓

3 Replicas

Cluster

↓

10 Replicas

↓

Configuration Drift

↓

Application OutOfSync
```

Someone must manually synchronize the application.

---

With Self Healing

```
Git

↓

3 Replicas

↓

ArgoCD Detects Drift

↓

Automatic Synchronization

↓

Cluster Restored

↓

3 Replicas
```

No manual action is required.

---

# Self Healing Workflow

```
Developer

↓

Git Repository

↓

Desired State

↓

Application Controller

↓

Compare Cluster

↓

Drift Detected

↓

Automatic Sync

↓

Healthy Application
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

Frontend Deployment

Git

```
Replicas

3
```

Administrator accidentally executes

```bash
kubectl scale deployment frontend --replicas=7
```

Cluster

```
Replicas

7
```

ArgoCD

```
Detects Drift

↓

Self Healing

↓

Replicas

3
```

---

# Enabling Self Healing

Example

```yaml
spec:
  syncPolicy:
    automated:
      selfHeal: true
```

This instructs ArgoCD to automatically correct configuration drift.

---

# Self Healing Architecture

```
Git Repository

        │

        ▼

Desired State

        │

        ▼

Application Controller

        │

        ▼

Compare

        │

 ┌───────────────┐

 │               │

No Drift      Drift Found

 │               │

 ▼               ▼

Healthy     Self Healing

                 │

                 ▼

          Cluster Updated
```

---

# What Self Healing Can Restore

ArgoCD can restore

- Deployments
- Services
- ConfigMaps
- Secrets
- Ingresses
- StatefulSets
- DaemonSets
- Jobs
- CronJobs

As long as they are managed by the Application.

---

# Real Production Scenario

Production Deployment

```
Image

v2.5
```

Engineer accidentally updates

```bash
kubectl edit deployment gateway
```

Changes image to

```
v3.0
```

Git still contains

```
v2.5
```

ArgoCD detects

```
OutOfSync
```

Self Healing restores

```
v2.5
```

Production returns to the approved version.

---

# Benefits

Self Healing provides

- Automatic recovery
- Reduced manual effort
- Consistent environments
- Improved security
- Reduced configuration drift
- Better compliance
- Reliable production state

---

# Limitations

Self Healing only restores resources managed by ArgoCD.

It does not

- Fix application code bugs
- Recover failed databases
- Restore deleted Git repositories
- Repair infrastructure outside Kubernetes

---

# Common Problems

Application repeatedly becomes OutOfSync

Possible causes

- Manual kubectl changes
- Mutating Admission Webhooks
- External Kubernetes Operators
- Sidecar injection
- Automatic label injection

Investigate before repeatedly forcing synchronization.

---

Unexpected changes are reverted

Cause

```
Self Healing Enabled
```

Someone manually edits Production resources.

ArgoCD restores the Git version automatically.

---

# When to Enable Self Healing

Recommended

- Development
- Testing
- Staging
- Git-managed Production workloads

Avoid enabling when

- Resources are intentionally modified by external controllers
- Applications require temporary manual operational changes

---

# Best Practices

- Keep Git as the only source of truth.
- Avoid manual kubectl changes in Production.
- Combine Self Healing with Pull Request approvals.
- Monitor repeated drift events.
- Review audit logs for unauthorized changes.
- Test Self Healing before enabling it in Production.

---

# Interview Questions

## Q1. What is Self Healing in ArgoCD?

### Answer

Self Healing is an ArgoCD feature that automatically restores Kubernetes resources to match the desired configuration stored in Git whenever configuration drift occurs.

---

## Q2. What problem does Self Healing solve?

### Answer

It eliminates configuration drift caused by manual or unexpected changes in Kubernetes by automatically synchronizing resources with Git.

---

## Q3. Does Self Healing repair application failures?

### Answer

No.

Self Healing restores Kubernetes resource configuration. It does not fix application bugs, database failures or infrastructure issues.

---

# Marathi Quick Revision

- Self Healing Drift दुरुस्त करते.
- Git हे Source of Truth आहे.
- Manual kubectl changes परत Undo होतात.
- Configuration Git प्रमाणे Restore होते.
- Git Managed Resources वरच काम करते.
- Production मध्ये काळजीपूर्वक Enable करा.
- Drift Events Monitor करा.

---

# Marathi Summary (5+ Experience Revision)

Self Healing हे ArgoCD मधील महत्त्वाचे GitOps feature आहे जे Kubernetes cluster मधील configuration drift आपोआप दुरुस्त करते. Git मधील desired state आणि cluster मधील actual state वेगळी असल्यास ArgoCD ती पुन्हा synchronize करून approved configuration restore करते. यामुळे manual changes, unauthorized modifications आणि configuration drift कमी होतो. Enterprise environments मध्ये Self Healing मुळे production consistency, security आणि compliance सुधारते, मात्र external controllers वापरत असलेल्या resources साठी ते योग्य प्रकारे configure करणे आवश्यक असते.

