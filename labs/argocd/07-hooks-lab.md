# Lab 07 - ArgoCD Hooks

# Enterprise DevOps Platform

---

# Lab Objective

In this lab you will learn how to:

- Understand ArgoCD Hooks
- Configure PreSync Hooks
- Configure Sync Hooks
- Configure PostSync Hooks
- Configure SyncFail Hooks
- Verify Hook execution
- Troubleshoot Hook failures

---

# Prerequisites

- Labs 01 to 06 Completed
- ArgoCD Installed
- Kubernetes Cluster Running
- Guestbook Application Working

---

# What are Hooks?

Hooks are Kubernetes resources that execute at different stages of deployment.

They are commonly used for:

- Database Migration
- Backup
- Smoke Testing
- Notification
- Cleanup
- Rollback Validation

---

# Hook Lifecycle

```
Git Commit

↓

PreSync Hook

↓

Application Sync

↓

Sync Hook

↓

Application Ready

↓

PostSync Hook

↓

Success

↓

SyncFail Hook (If Failure)
```

---

# Hook Types

| Hook | Purpose |
|------|----------|
| PreSync | Executes before deployment |
| Sync | Executes during deployment |
| PostSync | Executes after deployment |
| SyncFail | Executes if deployment fails |
| PostDelete | Executes after application deletion |

---

# Real Production Example

Enterprise Application

```
Git

↓

Database Backup

↓

Database Migration

↓

Deploy Backend

↓

Deploy Frontend

↓

Smoke Test

↓

Slack Notification
```

---

# Step 1 - Create PreSync Hook

Create

```
presync-job.yaml
```

```yaml
apiVersion: batch/v1
kind: Job
metadata:
  generateName: presync-
  annotations:
    argocd.argoproj.io/hook: PreSync
spec:
  template:
    spec:
      restartPolicy: Never
      containers:
      - name: migration
        image: busybox
        command:
        - sh
        - -c
        - echo "Running Database Migration"
```

---

# Step 2 - Apply to Git Repository

```bash
git add .
```

```bash
git commit -m "Added PreSync Hook"
```

```bash
git push origin main
```

---

# Step 3 - Synchronize

```bash
argocd app sync guestbook
```

Observe

```
PreSync Job

↓

Deployment
```

---

# Step 4 - Verify Job

```bash
kubectl get jobs
```

Expected

```
presync-xxxxx
```

Completed

---

# Step 5 - Create PostSync Hook

```yaml
apiVersion: batch/v1
kind: Job
metadata:
  generateName: postsync-
  annotations:
    argocd.argoproj.io/hook: PostSync
spec:
  template:
    spec:
      restartPolicy: Never
      containers:
      - name: smoke-test
        image: busybox
        command:
        - sh
        - -c
        - echo "Smoke Test Successful"
```

---

# Step 6 - Commit Changes

```bash
git add .
```

```bash
git commit -m "Added PostSync Hook"
```

```bash
git push origin main
```

---

# Step 7 - Synchronize Again

```bash
argocd app sync guestbook
```

Deployment Order

```
PreSync

↓

Deployment

↓

PostSync
```

---

# Step 8 - Verify Jobs

```bash
kubectl get jobs
```

Expected

```
presync-xxxxx

postsync-xxxxx
```

---

# Step 9 - View Job Logs

```bash
kubectl logs job/presync-xxxxx
```

Expected

```
Running Database Migration
```

---

```bash
kubectl logs job/postsync-xxxxx
```

Expected

```
Smoke Test Successful
```

---

# Step 10 - Create SyncFail Hook

```yaml
metadata:
  annotations:
    argocd.argoproj.io/hook: SyncFail
```

Typical Usage

- Send Slack Alert
- Create Incident
- Rollback
- Send Email

---

# Commands Used

Application

```bash
argocd app get guestbook
```

Sync

```bash
argocd app sync guestbook
```

Jobs

```bash
kubectl get jobs
```

Logs

```bash
kubectl logs job/<job-name>
```

---

# Expected Output

```
PreSync Job

↓

Deployment

↓

PostSync Job

↓

Healthy

↓

Synced
```

---

# Troubleshooting

## Hook Not Running

Verify

```yaml
argocd.argoproj.io/hook
```

---

## Job Failed

Check

```bash
kubectl logs job/<job-name>
```

---

## Hook Never Completes

Describe Job

```bash
kubectl describe job <job-name>
```

---

## Application Degraded

Check

```bash
kubectl get pods
```

---

# Best Practices

- Keep Hooks idempotent.
- Use Hooks only for deployment-related tasks.
- Keep execution time short.
- Log every Hook execution.
- Monitor Hook failures.
- Avoid long-running Jobs.

---

# Real Enterprise Use Cases

PreSync

- Database Backup
- Schema Migration
- Secret Validation

Sync

- Deploy Application
- Apply Configurations

PostSync

- Smoke Test
- API Health Check
- Slack Notification

SyncFail

- Incident Creation
- Rollback
- PagerDuty Alert
- Email Notification

---

# Interview Questions

## 1. What are ArgoCD Hooks?

Hooks are Kubernetes Jobs executed before, during or after application synchronization.

---

## 2. Which Hook runs before deployment?

PreSync

---

## 3. Which Hook runs after deployment?

PostSync

---

## 4. Which Hook runs when deployment fails?

SyncFail

---

## 5. Give a production example.

Database Migration → Deploy Application → Smoke Test → Notification.

---

# Lab Success Criteria

You have successfully completed this lab if:

- PreSync Hook executes.
- Application deploys successfully.
- PostSync Hook executes.
- Hook logs are verified.
- You understand Hook execution order.

---

# Marathi Quick Revision

- Hooks म्हणजे Deployment Jobs.
- PreSync = Deployment आधी.
- Sync = Deployment दरम्यान.
- PostSync = Deployment नंतर.
- SyncFail = Deployment Fail झाल्यावर.
- Production मध्ये Database Migration आणि Smoke Test साठी Hooks वापरतात.

