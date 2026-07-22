# Pruning

# Enterprise DevOps Platform

---

# Purpose

This document explains the Pruning feature in ArgoCD from beginner to enterprise level.

Pruning is an important GitOps capability that automatically removes Kubernetes resources which are no longer defined in Git. It helps keep Kubernetes clusters clean, consistent and synchronized with the desired state.

---

# Introduction

Imagine an application originally contains

- Deployment
- Service
- ConfigMap

Later, the ConfigMap is removed from Git.

Without Pruning

```
Git

Deployment

Service

Cluster

Deployment

Service

ConfigMap
```

The ConfigMap still exists inside Kubernetes.

This creates

```
Configuration Drift
```

Pruning automatically removes resources that no longer exist in Git.

---

# Simple Definition

Pruning means

> Delete Kubernetes resources that are no longer present in the Git repository.

Git always becomes the single source of truth.

---

# Why Pruning?

Without Pruning

```
Git

↓

Deployment

Service

Cluster

↓

Deployment

Service

Old ConfigMap

Unused Secret

Old Job
```

Old resources continue running.

This causes

- Configuration drift
- Security risks
- Resource waste
- Operational confusion

---

# With Pruning

```
Git

↓

Deployment

Service

↓

ArgoCD

↓

Deletes

Old ConfigMap

Old Secret

Old Job

↓

Cluster Matches Git
```

---

# How Pruning Works

Step 1

Developer removes a resource from Git.

Example

```
configmap.yaml

Deleted
```

Step 2

Git Repository updates.

Step 3

ArgoCD detects a difference.

Step 4

Pruning deletes the resource from Kubernetes.

---

# Workflow

```
Developer

↓

Git Commit

↓

Repository Updated

↓

ArgoCD Detects Difference

↓

Resource Missing in Git

↓

Prune Resource

↓

Cluster Updated
```

---

# Enterprise Example

Our Enterprise DevOps Platform

Originally

```
Frontend

Service

ConfigMap

Secret
```

Later

The ConfigMap is removed because configuration is migrated to another service.

Git now contains

```
Frontend

Service

Secret
```

Without Pruning

```
Frontend

Service

Secret

Old ConfigMap
```

With Pruning

```
Frontend

Service

Secret
```

The obsolete ConfigMap is automatically removed.

---

# Enabling Pruning

Example

```yaml
spec:
  syncPolicy:
    automated:
      prune: true
```

Pruning works together with Automatic Sync.

---

# Full Example

```yaml
spec:
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
```

This configuration

- Automatically deploys changes
- Corrects configuration drift
- Removes obsolete resources

---

# Resources That Can Be Pruned

Examples

- Deployments
- Services
- ConfigMaps
- Secrets
- Ingresses
- Jobs
- CronJobs
- StatefulSets
- DaemonSets

Only resources managed by the ArgoCD Application are pruned.

---

# Architecture

```
Git Repository

        │

        ▼

Application Controller

        │

        ▼

Compare Resources

        │

 ┌───────────────┐

 │               │

Exists       Missing in Git

 │               │

 ▼               ▼

Keep         Delete Resource

                 │

                 ▼

          Kubernetes Cluster
```

---

# Real Production Scenario

Application

```
Gateway
```

Old Ingress

```
gateway-ingress-old
```

New Ingress

```
gateway-ingress
```

Developer removes

```
gateway-ingress-old.yaml
```

Git Commit

↓

ArgoCD Sync

↓

Old Ingress Deleted

↓

Production Clean

---

# Benefits

Pruning provides

- Cleaner clusters
- Reduced configuration drift
- Better security
- Better compliance
- Automatic cleanup
- Reduced operational overhead
- Consistent environments

---

# Risks

Incorrect Git changes can remove production resources.

Example

Developer accidentally deletes

```
deployment.yaml
```

Git Commit

↓

Pruning Enabled

↓

Deployment Deleted

Production outage may occur.

---

# When to Use Pruning

Recommended

- Development
- Testing
- Stable GitOps workflows
- Mature CI/CD pipelines

Use carefully

- Production
- Shared clusters
- Critical applications

---

# Common Problems

Unexpected resource deletion

Cause

```
Resource removed from Git.
```

Solution

- Protect the main branch.
- Require Pull Request approvals.
- Review Git changes carefully.

---

Repeated resource creation and deletion

Possible causes

- Multiple Git repositories
- Conflicting Applications
- External Kubernetes Operators

Investigate ownership before enabling Pruning.

---

# Best Practices

- Always review Pull Requests.
- Protect Production branches.
- Test Pruning in Development first.
- Use Application ownership correctly.
- Enable monitoring for deleted resources.
- Keep Git repositories organized.
- Combine with Self Healing only after proper testing.

---

# Interview Questions

## Q1. What is Pruning in ArgoCD?

### Answer

Pruning is an ArgoCD feature that automatically removes Kubernetes resources that no longer exist in the Git repository.

---

## Q2. Why is Pruning useful?

### Answer

It keeps Kubernetes clusters synchronized with Git, removes obsolete resources, reduces configuration drift and improves operational consistency.

---

## Q3. What is the biggest risk of enabling Pruning?

### Answer

If resources are accidentally deleted from Git, ArgoCD may automatically delete them from the Kubernetes cluster, potentially causing production outages.

---

# Marathi Quick Revision

- Pruning जुने Resources Delete करते.
- Git म्हणजे Source of Truth.
- Git मधून Delete → Cluster मधून Delete.
- Configuration Drift कमी होते.
- Production मध्ये काळजीपूर्वक वापरा.
- Pull Request Review करा.
- Branch Protection वापरा.

---

# Marathi Summary (5+ Experience Revision)

Pruning हे ArgoCD मधील GitOps feature आहे जे Git repository मध्ये नसलेले Kubernetes resources आपोआप delete करते. त्यामुळे cluster आणि Git यांच्यातील configuration drift कमी होते आणि जुने, अनावश्यक resources हटवले जातात. मात्र Production मध्ये चुकीचा Git commit झाल्यास महत्त्वाचे resources delete होऊ शकतात, त्यामुळे branch protection, Pull Request approval आणि योग्य testing नंतरच Pruning सक्षम करणे ही Enterprise सर्वोत्तम पद्धत आहे.

