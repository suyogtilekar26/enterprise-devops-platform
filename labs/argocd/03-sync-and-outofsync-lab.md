# Lab 03 - Understanding Sync and OutOfSync

# Enterprise DevOps Platform

---

# Lab Objective

In this lab you will learn how to:

- Understand GitOps synchronization
- Identify OutOfSync state
- Perform manual synchronization
- Compare Git and Kubernetes
- Verify successful deployment

---

# Prerequisites

- Lab 01 Completed
- Lab 02 Completed
- ArgoCD Installed
- Guestbook Application Deployed

---

# Architecture

```
Git Repository

↓

ArgoCD

↓

Compare

↓

Kubernetes Cluster

↓

Synced / OutOfSync
```

---

# What is Sync?

Sync means

```
Git

=

Kubernetes
```

The desired state stored in Git exactly matches the live state in the cluster.

---

# What is OutOfSync?

OutOfSync means

```
Git

≠

Kubernetes
```

This happens when:

- Git changes but Kubernetes is not updated
- Kubernetes is manually modified
- Resources are deleted manually
- Configuration drift occurs

---

# Step 1 - Verify Current Status

```bash
argocd app list
```

Expected

```
STATUS

Synced
```

---

# Step 2 - View Application Details

```bash
argocd app get guestbook
```

Observe

```
Sync Status

Synced
```

---

# Step 3 - Verify Deployment

```bash
kubectl get deployment
```

Expected

```
guestbook-ui
```

---

# Step 4 - Simulate Configuration Drift

Scale the deployment manually.

```bash
kubectl scale deployment guestbook-ui \
--replicas=5
```

Verify

```bash
kubectl get deployment guestbook-ui
```

Expected

```
READY

5/5
```

---

# Step 5 - Refresh ArgoCD

Open ArgoCD UI

Select

```
Refresh
```

or

```bash
argocd app get guestbook --refresh
```

Expected

```
OutOfSync
```

---

# Step 6 - Compare Git and Cluster

```bash
argocd app diff guestbook
```

Observe the difference.

Example

```
Git

Replicas = 1

Cluster

Replicas = 5
```

---

# Step 7 - Synchronize

```bash
argocd app sync guestbook
```

Wait until synchronization completes.

---

# Step 8 - Verify Again

```bash
argocd app get guestbook
```

Expected

```
Sync Status

Synced
```

---

# Step 9 - Verify Deployment

```bash
kubectl get deployment guestbook-ui
```

Expected

```
READY

1/1
```

The deployment has been restored to the desired state from Git.

---

# Step 10 - Observe UI

Status should now display

```
Synced

Healthy
```

---

# Commands Used

List Applications

```bash
argocd app list
```

Application Details

```bash
argocd app get guestbook
```

Compare

```bash
argocd app diff guestbook
```

Synchronize

```bash
argocd app sync guestbook
```

Scale Deployment

```bash
kubectl scale deployment guestbook-ui --replicas=5
```

Deployment

```bash
kubectl get deployment
```

---

# Expected Output

Before Scaling

```
Synced
```

After Scaling

```
OutOfSync
```

After Sync

```
Synced

Healthy
```

---

# Troubleshooting

## Application Still Synced

Refresh the application.

```bash
argocd app get guestbook --refresh
```

---

## Sync Failed

Check

```bash
argocd app get guestbook
```

Review the error message.

---

## Deployment Not Updated

Verify

```bash
kubectl get deployment
```

---

## Diff Empty

Ensure you modified the Kubernetes deployment manually.

---

# Best Practices

- Never edit production resources manually.
- Use Git as the single source of truth.
- Regularly monitor Sync Status.
- Investigate every OutOfSync condition.
- Use Git commits for all configuration changes.

---

# Interview Questions

## 1. What does Synced mean?

Git and Kubernetes have identical configurations.

---

## 2. What causes OutOfSync?

Configuration drift between Git and the Kubernetes cluster.

---

## 3. Which command compares Git and Kubernetes?

```bash
argocd app diff guestbook
```

---

## 4. Which command performs synchronization?

```bash
argocd app sync guestbook
```

---

## 5. Why should manual production changes be avoided?

Because they create configuration drift and violate GitOps principles.

---

# Lab Success Criteria

You have successfully completed this lab if:

- You created configuration drift.
- ArgoCD detected OutOfSync.
- You viewed the differences.
- Manual Sync restored the desired state.
- Application returned to Synced and Healthy.

---

# Marathi Quick Revision

- Sync म्हणजे Git = Kubernetes.
- OutOfSync म्हणजे Git ≠ Kubernetes.
- Manual Change करून Drift तयार करा.
- `argocd app diff` ने फरक पाहा.
- `argocd app sync` ने Restore करा.
- शेवटी Status = Synced आणि Healthy पाहिजे.

