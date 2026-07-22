# Incident 01 - Application OutOfSync

# Enterprise DevOps Platform

---

# Incident Summary

An ArgoCD application entered the **OutOfSync** state after changes were made directly to Kubernetes instead of Git.

This is one of the most common production incidents in GitOps environments.

---

# Severity

```
SEV-3
```

Application functionality is usually unaffected, but the running cluster no longer matches the desired Git state.

---

# Business Impact

- Configuration drift
- Deployment inconsistency
- Failed compliance checks
- Unexpected application behavior
- Difficult rollbacks
- Increased operational risk

---

# Environment

- Kubernetes
- ArgoCD
- Git Repository
- Production Cluster

---

# Symptoms

ArgoCD Dashboard

```
Application

OutOfSync
```

CLI

```bash
argocd app get guestbook
```

Output

```
Sync Status

OutOfSync

Health

Healthy
```

---

# Possible Causes

- Manual kubectl apply
- Manual kubectl edit
- Manual kubectl scale
- Resource deletion
- Helm values changed manually
- ConfigMap updated directly
- Secret modified
- Admission Controller mutation

---

# Detection

Check Application

```bash
argocd app get guestbook
```

List Applications

```bash
argocd app list
```

Dashboard

```
Yellow

OutOfSync
```

---

# Investigation

## Step 1

Check Application

```bash
argocd app get guestbook
```

---

## Step 2

Compare Live and Desired State

```bash
argocd app diff guestbook
```

---

## Step 3

Check Git History

```bash
git log
```

Verify latest commit.

---

## Step 4

Check Kubernetes

```bash
kubectl get deployment guestbook -o yaml
```

Compare with Git manifest.

---

## Step 5

Review Events

```bash
kubectl get events -n guestbook
```

---

## Step 6

Check Recent Manual Changes

Review

- kubectl history
- CI logs
- Audit logs
- Change requests

---

# Root Cause Analysis

Example

A production engineer manually scaled the Deployment.

```bash
kubectl scale deployment guestbook \
--replicas=10
```

Git

```
Replicas = 3
```

Cluster

```
Replicas = 10
```

ArgoCD detected configuration drift.

---

# Resolution

If Auto Sync is enabled

Wait for reconciliation.

Or

Synchronize manually.

```bash
argocd app sync guestbook
```

---

Verify

```bash
argocd app get guestbook
```

Expected

```
Healthy

Synced
```

---

# Validation

Check

```bash
kubectl get deployment guestbook
```

Verify replica count matches Git.

---

Verify

```bash
argocd app diff guestbook
```

Expected

```
No Differences
```

---

# Prevention

- Never modify Production manually.
- Always deploy through Git.
- Enable Auto Sync.
- Enable Self Heal.
- Protect Production Cluster.
- Audit kubectl access.
- Restrict permissions using RBAC.

---

# Best Practices

- Git is the Single Source of Truth.
- Every change requires a Pull Request.
- Disable manual Production changes where possible.
- Monitor OutOfSync applications.
- Investigate repeated drift immediately.

---

# Commands Used

Application

```bash
argocd app get guestbook
```

Difference

```bash
argocd app diff guestbook
```

Synchronize

```bash
argocd app sync guestbook
```

Deployment

```bash
kubectl get deployment guestbook
```

Events

```bash
kubectl get events -n guestbook
```

---

# Timeline Example

```
09:00

Developer manually scales Deployment

↓

09:02

ArgoCD detects drift

↓

09:03

Application becomes OutOfSync

↓

09:05

Engineer investigates

↓

09:07

Application synchronized

↓

09:08

Application Healthy

↓

09:10

Incident Closed
```

---

# Lessons Learned

- Manual changes create configuration drift.
- GitOps depends on Git being the only deployment source.
- Auto Sync reduces recovery time.
- Regular auditing prevents repeated incidents.

---

# Interview Questions

## 1. What does OutOfSync mean?

The live Kubernetes resources differ from the desired state stored in Git.

---

## 2. Which command compares Git and Kubernetes resources?

```bash
argocd app diff <application>
```

---

## 3. How do you resolve an OutOfSync application?

Synchronize it using:

```bash
argocd app sync <application>
```

or allow Auto Sync to reconcile the drift.

---

## 4. What commonly causes OutOfSync?

Manual Kubernetes changes, deleted resources or Git updates that have not yet been synchronized.

---

## 5. How do you prevent this incident?

- Git-only deployments
- Auto Sync
- Self Heal
- RBAC
- Pull Request approvals

---

# Incident Success Criteria

The incident is resolved when:

- Application is Healthy.
- Application is Synced.
- Git and Kubernetes match.
- No configuration drift exists.
- Root cause is documented.
- Preventive actions are implemented.

---

# Marathi Quick Revision

- OutOfSync म्हणजे Git आणि Kubernetes मध्ये फरक आहे.
- Manual `kubectl` बदल हे सर्वात सामान्य कारण आहे.
- `argocd app diff` वापरून फरक पाहता येतो.
- `argocd app sync` वापरून समस्या सोडवता येते.
- Production मध्ये नेहमी Git मधूनच Deployment करा.

