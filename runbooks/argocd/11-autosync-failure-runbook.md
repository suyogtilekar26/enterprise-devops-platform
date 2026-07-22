# Auto Sync Failure Runbook

# Enterprise DevOps Platform

---

# Purpose

This runbook describes the Standard Operating Procedure (SOP) for troubleshooting **ArgoCD Auto Sync Failures**.

Auto Sync should automatically synchronize Kubernetes resources whenever changes are committed to the Git repository. If Auto Sync fails, deployments may not occur even though Git has been updated.

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

# Symptoms

- Git updated but deployment not triggered
- Application remains OutOfSync
- Auto Sync not executing
- Manual Sync works
- No deployment after merge
- Old application version running

---

# Common Causes

| Cause | Example |
|--------|----------|
| Auto Sync Disabled | syncPolicy missing |
| Repository Failure | Git inaccessible |
| Application Error | Invalid configuration |
| Sync Window Active | Deployment blocked |
| RBAC Restriction | Permission denied |
| Repo Server Failure | Cannot detect changes |
| Controller Failure | Auto reconciliation stopped |

---

# Troubleshooting Workflow

```
Git Updated

↓

Application OutOfSync

↓

Verify Auto Sync

↓

Verify Repository

↓

Verify Controller

↓

Fix

↓

Auto Sync

↓

Healthy
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
- Repository
- Target Revision

---

# Step 2 - Verify Auto Sync Configuration

Expected

```
Sync Policy

↓

Automated
```

If missing,

Auto Sync is disabled.

---

# Step 3 - Verify Application Manifest

Check

```yaml
spec:
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
```

Ensure automated synchronization is configured.

---

# Step 4 - Verify Repository

```bash
argocd repo list
```

Ensure

- Repository Connected
- Authentication Successful
- Repository Reachable

---

# Step 5 - Verify Target Revision

```bash
argocd app get frontend
```

Confirm

- Branch exists
- Tag exists
- Correct revision configured

---

# Step 6 - Verify Application Controller

```bash
kubectl get pods -n argocd
```

Locate

```
argocd-application-controller
```

Verify

- Running
- Ready
- No restarts

---

# Step 7 - Review Controller Logs

```bash
kubectl logs -n argocd <application-controller-pod>
```

Look for

- Sync errors
- Repository errors
- Permission issues
- Reconciliation failures

---

# Step 8 - Verify Sync Windows

Check whether deployment is blocked by Sync Windows.

Expected

```
Deployment Allowed
```

---

# Step 9 - Verify RBAC

Ensure ArgoCD has permission to

- Create
- Update
- Delete
- Patch

Kubernetes resources.

---

# Step 10 - Force Refresh

```bash
argocd app get frontend --refresh
```

Check whether ArgoCD detects the latest Git commit.

---

# Step 11 - Fix the Root Cause

Possible actions

- Enable Auto Sync
- Restore repository connectivity
- Restart controller if necessary
- Correct application manifest
- Remove Sync Window restrictions
- Fix RBAC permissions

Commit configuration updates to Git.

---

# Step 12 - Validate

Commit a small test change.

Expected workflow

```
Git Commit

↓

Repository Updated

↓

ArgoCD Detects Change

↓

Automatic Sync

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

Refresh

```bash
argocd app get frontend --refresh
```

---

# Success Criteria

- Auto Sync Enabled
- Repository Connected
- Controller Healthy
- Automatic Deployment Successful
- Application Synced
- Health = Healthy

---

# Interview Questions

## Q1. What is Auto Sync in ArgoCD?

### Answer

Auto Sync automatically synchronizes Kubernetes resources with the desired state stored in Git whenever changes are detected.

---

## Q2. Why might Auto Sync stop working?

### Answer

Common causes include disabled syncPolicy, repository connectivity issues, controller failures, Sync Windows, RBAC restrictions and application configuration errors.

---

## Q3. Which component performs automatic reconciliation?

### Answer

The **argocd-application-controller** continuously compares Git with the Kubernetes cluster and performs automatic synchronization when Auto Sync is enabled.

---

# Marathi Quick Revision

- Git Update झाले पण Deployment नाही = Auto Sync Failure.
- `argocd app get` तपासा.
- Auto Sync Enabled आहे का ते Verify करा.
- Repository तपासा.
- Application Controller तपासा.
- Controller Logs Verify करा.
- Fix → Test Commit → Auto Sync → Healthy.

