# Lab 04 - Auto Sync

# Enterprise DevOps Platform

---

# Lab Objective

In this lab you will learn how to:

- Enable Auto Sync
- Understand automatic deployments
- Modify Git repository
- Observe automatic synchronization
- Verify deployment without manual intervention

---

# Prerequisites

- Lab 01 Completed
- Lab 02 Completed
- Lab 03 Completed
- ArgoCD Installed
- Guestbook Application Running
- Git Repository Access

---

# Architecture

```
Developer

↓

Git Commit

↓

Git Push

↓

ArgoCD

↓

Auto Sync

↓

Kubernetes

↓

Updated Application
```

---

# What is Auto Sync?

Auto Sync automatically deploys changes from Git to Kubernetes without requiring a manual Sync.

Without Auto Sync

```
Git Change

↓

Manual Sync

↓

Deployment
```

With Auto Sync

```
Git Change

↓

Automatic Deployment
```

---

# Step 1 - Verify Current Status

```bash
argocd app get guestbook
```

Expected

```
Sync Status

Synced

Health

Healthy
```

---

# Step 2 - Check Current Sync Policy

```bash
argocd app get guestbook
```

Look for

```
Sync Policy

Manual
```

---

# Step 3 - Enable Auto Sync

Using CLI

```bash
argocd app set guestbook \
--sync-policy automated
```

---

# Step 4 - Verify Auto Sync

```bash
argocd app get guestbook
```

Expected

```
Sync Policy

Automated
```

---

# Step 5 - Enable Prune

```bash
argocd app set guestbook \
--auto-prune
```

---

# Step 6 - Enable Self Heal

```bash
argocd app set guestbook \
--self-heal
```

---

# Step 7 - Verify Configuration

```bash
argocd app get guestbook
```

Expected

```
Automated

Prune

Enabled

Self Heal

Enabled
```

---

# Step 8 - Modify Git Repository

Example

Update Deployment

```yaml
replicas: 2
```

Commit

```bash
git add .
```

```bash
git commit -m "Increase replicas"
```

```bash
git push origin main
```

---

# Step 9 - Observe ArgoCD

Open UI

Watch

```
Refreshing

↓

Syncing

↓

Healthy
```

No manual Sync required.

---

# Step 10 - Verify Deployment

```bash
kubectl get deployment guestbook-ui
```

Expected

```
READY

2/2
```

---

# Step 11 - Verify Pods

```bash
kubectl get pods
```

Expected

```
2 Running Pods
```

---

# Step 12 - View History

```bash
argocd app history guestbook
```

Observe the new deployment revision.

---

# Commands Used

Enable Auto Sync

```bash
argocd app set guestbook \
--sync-policy automated
```

Enable Prune

```bash
argocd app set guestbook \
--auto-prune
```

Enable Self Heal

```bash
argocd app set guestbook \
--self-heal
```

History

```bash
argocd app history guestbook
```

Application Details

```bash
argocd app get guestbook
```

---

# Expected Output

Application

```
Synced

Healthy
```

Deployment

```
2 Replicas
```

Auto Sync

```
Enabled
```

---

# Troubleshooting

## Auto Sync Not Working

Check

```bash
argocd app get guestbook
```

Verify

```
Sync Policy

Automated
```

---

## Repository Not Updating

Verify

```bash
git push
```

---

## Application OutOfSync

Run

```bash
argocd app refresh guestbook
```

---

## Deployment Not Updated

Verify

```bash
kubectl get deployment
```

Check Events

```bash
kubectl describe deployment guestbook-ui
```

---

# Best Practices

- Enable Auto Sync only after testing.
- Protect the main branch.
- Use Pull Requests.
- Review every Git commit.
- Enable Self Heal.
- Enable Prune.
- Monitor deployment history.

---

# Interview Questions

## 1. What is Auto Sync?

Automatically deploys Git changes to Kubernetes.

---

## 2. Difference between Manual Sync and Auto Sync?

Manual Sync requires user action.

Auto Sync deploys automatically.

---

## 3. What is Auto Prune?

Removes Kubernetes resources deleted from Git.

---

## 4. Why enable Self Heal with Auto Sync?

To automatically restore manual changes and maintain Git as the source of truth.

---

## 5. Which command enables Auto Sync?

```bash
argocd app set guestbook \
--sync-policy automated
```

---

# Lab Success Criteria

You have successfully completed this lab if:

- Auto Sync is enabled.
- Git changes trigger automatic deployment.
- No manual Sync is required.
- Deployment updates successfully.
- Application remains Synced and Healthy.

---

# Marathi Quick Revision

- Auto Sync म्हणजे Git Push झाल्यावर Deployment आपोआप होतो.
- Manual Sync करण्याची गरज नसते.
- Auto Prune वापरून अनावश्यक Resources Delete होतात.
- Self Heal Manual Changes Restore करतो.
- Production मध्ये Auto Sync वापरण्यापूर्वी Testing आवश्यक आहे.

