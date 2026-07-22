# Self-Healing Runbook

# Enterprise DevOps Platform

---

# Purpose

This runbook describes the Standard Operating Procedure (SOP) for troubleshooting **ArgoCD Self-Healing** issues.

Self-Healing is an ArgoCD feature that automatically restores Kubernetes resources to the desired state defined in Git whenever configuration drift is detected.

---

# Scope

Applications

- React + Vite Frontend
- Flask API Gateway
- Flask Auth Service
- Flask Dashboard Service

Supporting Services

- PostgreSQL
- Redis

Infrastructure

- Kubernetes
- ArgoCD
- Git Repository

---

# What is Self-Healing?

```
Git

↓

Desired State

↓

Manual Change

↓

Drift Detected

↓

ArgoCD

↓

Automatic Restore
```

Self-Healing continuously monitors the cluster and automatically corrects unauthorized or accidental changes.

---

# Symptoms

- Manual changes remain in the cluster
- Application stays OutOfSync
- Resources are not restored
- Replica count remains modified
- Deployment configuration differs from Git
- Self-Healing appears inactive

---

# Common Causes

| Cause | Example |
|--------|----------|
| Self-Heal Disabled | syncPolicy.selfHeal missing |
| Auto Sync Disabled | Automated sync not configured |
| Repository Failure | Git unreachable |
| Controller Failure | Reconciliation stopped |
| Ignore Differences Configured | Drift intentionally ignored |
| RBAC Issue | Cannot update resources |

---

# Troubleshooting Workflow

```
Manual Change

↓

Cluster Drift

↓

Verify Self-Heal

↓

Verify Auto Sync

↓

Verify Controller

↓

Verify Ignore Differences

↓

Fix

↓

Automatic Recovery
```

---

# Step 1 - Verify Application

```bash
argocd app get frontend
```

Review

- Sync Status
- Health Status
- Sync Policy

---

# Step 2 - Verify Self-Healing Configuration

Expected

```yaml
spec:
  syncPolicy:
    automated:
      selfHeal: true
```

If

```
selfHeal

↓

false
```

automatic recovery will not occur.

---

# Step 3 - Verify Auto Sync

Expected

```yaml
automated:
```

Self-Healing requires Automated Sync.

---

# Step 4 - Verify Drift

Example

```bash
kubectl scale deployment frontend --replicas=5
```

Observe

```bash
kubectl get deployment frontend
```

Expected

ArgoCD should restore the replica count to the value stored in Git.

---

# Step 5 - Verify Application Status

```bash
argocd app get frontend
```

Check

- OutOfSync
- Synced
- Operation Status

---

# Step 6 - Verify Ignore Differences

Review Application configuration.

Example

```yaml
ignoreDifferences:
```

If the modified field is listed,

ArgoCD will intentionally ignore the change.

---

# Step 7 - Verify Application Controller

```bash
kubectl get pods -n argocd
```

Locate

```
argocd-application-controller
```

Ensure

- Running
- Ready
- Healthy

---

# Step 8 - Review Controller Logs

```bash
kubectl logs -n argocd <application-controller-pod>
```

Look for

- Reconciliation errors
- Permission denied
- Repository failures
- Sync failures

---

# Step 9 - Verify Repository

```bash
argocd repo list
```

Ensure

- Repository Connected
- Authentication Successful
- Latest commit available

---

# Step 10 - Verify RBAC

Confirm ArgoCD has permission to

- Patch
- Update
- Delete
- Create

resources in the target namespace.

---

# Step 11 - Fix the Issue

Possible actions

- Enable Self-Heal
- Enable Auto Sync
- Remove unnecessary Ignore Differences
- Restore repository connectivity
- Fix RBAC permissions
- Restart controller if required

Commit configuration updates to Git.

---

# Step 12 - Validation

Make a temporary manual change.

Example

```bash
kubectl scale deployment frontend --replicas=3
```

Expected

```
Replica Changed

↓

ArgoCD Detects Drift

↓

Deployment Restored

↓

Synced

↓

Healthy
```

---

# Important Commands

Application

```bash
argocd app get frontend
```

Repositories

```bash
argocd repo list
```

Controller Pods

```bash
kubectl get pods -n argocd
```

Controller Logs

```bash
kubectl logs -n argocd <application-controller-pod>
```

Scale Deployment

```bash
kubectl scale deployment frontend --replicas=3
```

Deployment

```bash
kubectl get deployment frontend
```

---

# Success Criteria

- Self-Healing Enabled
- Auto Sync Enabled
- Drift Automatically Corrected
- Application Synced
- Health = Healthy
- No Manual Intervention Required

---

# Interview Questions

## Q1. What is Self-Healing in ArgoCD?

### Answer

Self-Healing automatically restores Kubernetes resources to the desired state stored in Git whenever configuration drift is detected.

---

## Q2. Does Self-Healing work without Auto Sync?

### Answer

No. Self-Healing is part of the Automated Sync policy and requires Auto Sync to be enabled.

---

## Q3. Why might Self-Healing fail?

### Answer

Common reasons include disabled selfHeal, disabled Auto Sync, repository connectivity issues, controller failures, Ignore Differences configuration and insufficient RBAC permissions.

---

# Marathi Quick Revision

- Self-Healing = Manual Changes आपोआप Git प्रमाणे Restore होतात.
- `argocd app get` तपासा.
- `selfHeal: true` Verify करा.
- Auto Sync Enabled आहे का ते तपासा.
- Ignore Differences तपासा.
- Controller Logs Verify करा.
- Manual Drift करून Validate करा.

