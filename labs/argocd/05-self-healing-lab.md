# Lab 05 - Self Healing

# Enterprise DevOps Platform

---

# Lab Objective

In this lab you will learn how to:

- Enable Self Healing
- Understand Configuration Drift
- Simulate manual changes
- Observe automatic recovery
- Verify GitOps reconciliation

---

# Prerequisites

- Lab 01 Completed
- Lab 02 Completed
- Lab 03 Completed
- Lab 04 Completed
- Auto Sync Enabled
- Guestbook Application Running

---

# Architecture

```
Git Repository

↓

ArgoCD

↓

Application Controller

↓

Kubernetes Cluster

↓

Manual Change

↓

Drift Detection

↓

Automatic Restore
```

---

# What is Self Healing?

Self Healing is an ArgoCD feature that automatically restores Kubernetes resources to the desired state stored in Git.

```
Git

↓

Desired State

↓

Manual Change

↓

Drift Detection

↓

Automatic Restore
```

---

# Why Self Healing?

Without Self Healing

```
Git

↓

Kubernetes

↓

Manual Change

↓

Configuration Drift
```

Application remains inconsistent.

With Self Healing

```
Git

↓

Kubernetes

↓

Manual Change

↓

ArgoCD Detects Drift

↓

Automatically Restores
```

---

# Step 1 - Verify Current Application

```bash
argocd app get guestbook
```

Expected

```
Synced

Healthy
```

---

# Step 2 - Verify Self Heal

```bash
argocd app get guestbook
```

Expected

```
Sync Policy

Automated

Self Heal

Enabled
```

If disabled

```bash
argocd app set guestbook --self-heal
```

---

# Step 3 - Verify Deployment

```bash
kubectl get deployment guestbook-ui
```

Expected

```
READY

2/2
```

---

# Step 4 - Simulate Manual Change

Scale deployment manually.

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

# Step 5 - Wait

Wait 20–60 seconds.

ArgoCD continuously compares the live state with Git.

---

# Step 6 - Verify Deployment Again

```bash
kubectl get deployment guestbook-ui
```

Expected

```
READY

2/2
```

The deployment has automatically returned to the desired state.

---

# Step 7 - Verify ArgoCD

```bash
argocd app get guestbook
```

Expected

```
Synced

Healthy
```

---

# Step 8 - Observe Events

```bash
kubectl describe deployment guestbook-ui
```

Observe replica changes.

---

# Step 9 - Check History

```bash
argocd app history guestbook
```

Review synchronization history.

---

# Commands Used

Enable Self Heal

```bash
argocd app set guestbook --self-heal
```

Application Details

```bash
argocd app get guestbook
```

Scale Deployment

```bash
kubectl scale deployment guestbook-ui --replicas=5
```

Deployment

```bash
kubectl get deployment
```

History

```bash
argocd app history guestbook
```

---

# Expected Output

Before Manual Change

```
Replicas

2
```

After Manual Change

```
Replicas

5
```

After Self Healing

```
Replicas

2
```

Application Status

```
Synced

Healthy
```

---

# Troubleshooting

## Self Healing Not Working

Verify

```bash
argocd app get guestbook
```

Check

```
Self Heal

Enabled
```

---

## Deployment Not Restored

Verify

```bash
argocd app diff guestbook
```

---

## Application OutOfSync

Refresh

```bash
argocd app get guestbook --refresh
```

---

## Auto Sync Disabled

Enable

```bash
argocd app set guestbook \
--sync-policy automated
```

---

# Best Practices

- Enable Self Healing in production.
- Never modify production resources manually.
- Keep Git as the single source of truth.
- Protect production namespaces.
- Monitor synchronization events.
- Review deployment history regularly.

---

# Real Production Example

A production engineer accidentally scales the deployment from 4 replicas to 10 using kubectl.

Without Self Healing

- Cluster remains at 10 replicas.
- Git and Kubernetes become inconsistent.

With Self Healing

- ArgoCD detects the drift.
- Deployment is automatically restored to 4 replicas.
- Git remains the single source of truth.

---

# Interview Questions

## 1. What is Self Healing?

Self Healing automatically restores Kubernetes resources to the desired state defined in Git.

---

## 2. What causes Self Healing to trigger?

Configuration drift caused by manual changes or unexpected modifications.

---

## 3. Which component performs Self Healing?

argocd-application-controller.

---

## 4. Does Self Healing require Auto Sync?

Yes. Self Healing works with Automated Sync enabled.

---

## 5. Which command enables Self Healing?

```bash
argocd app set guestbook --self-heal
```

---

# Lab Success Criteria

You have successfully completed this lab if:

- Self Healing is enabled.
- Manual scaling creates configuration drift.
- ArgoCD detects the drift.
- Deployment is automatically restored.
- Application returns to Synced and Healthy state.

---

# Marathi Quick Revision

- Self Healing म्हणजे Manual Changes आपोआप Restore होतात.
- Git हीच Source of Truth आहे.
- Manual Scale करा.
- ArgoCD Drift Detect करतो.
- काही सेकंदात Deployment पूर्ववत होतो.
- Production मध्ये Self Healing नेहमी Enable ठेवा.

