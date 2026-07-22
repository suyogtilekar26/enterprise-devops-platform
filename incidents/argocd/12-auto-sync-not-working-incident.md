# Incident 12 - Auto Sync Not Working

# Enterprise DevOps Platform

---

# Incident Summary

ArgoCD failed to automatically synchronize an application after changes were committed to the Git repository.

Although the Git repository contained the latest manifests, the Kubernetes cluster continued running the older version because Auto Sync did not trigger.

---

# Severity

```
SEV-2
```

Production deployment automation failure.

---

# Business Impact

- Production deployment delayed
- Configuration drift increases
- Manual intervention required
- CI/CD pipeline interrupted
- Slower release process
- Increased operational effort

---

# Environment

- ArgoCD
- Kubernetes
- Git Repository
- Production Cluster

---

# Symptoms

Git Repository

```
Latest Commit Present
```

Application

```bash
argocd app get guestbook
```

Output

```
Sync Status

OutOfSync
```

Health

```
Healthy
```

Application is not automatically synchronized.

---

# Common Causes

- Auto Sync Disabled
- Sync Policy Misconfigured
- Application Controller Failure
- Repository Refresh Delay
- Webhook Failure
- Repository Access Issue
- Sync Window Restriction
- Application Pause
- RBAC Restriction
- Controller Not Running

---

# Detection

Check Application

```bash
argocd app get guestbook
```

Look for

```
Sync Policy

Manual
```

or

```
Auto Sync Disabled
```

---

# Investigation

## Step 1

Verify Sync Policy

```bash
argocd app get guestbook
```

Expected

```
Automated
```

---

## Step 2

Verify Application YAML

```yaml
spec:
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
```

---

## Step 3

Check Application Controller

```bash
kubectl get pods \
-n argocd
```

Verify

```
argocd-application-controller

Running
```

---

## Step 4

Review Controller Logs

```bash
kubectl logs deployment/argocd-application-controller \
-n argocd
```

Look for

```
sync skipped

refresh failed

permission denied
```

---

## Step 5

Refresh Application

```bash
argocd app refresh guestbook
```

---

## Step 6

Check Repository Status

```bash
argocd repo list
```

Ensure

```
Successful
```

---

## Step 7

Verify Sync Windows

```bash
argocd app get guestbook
```

Check whether synchronization is blocked by a configured Sync Window.

---

# Root Cause Analysis

Example

A new application was created with

```
syncPolicy
```

removed from the manifest.

Developers assumed Auto Sync was enabled.

Git changes were detected.

ArgoCD refreshed the application but never synchronized it.

The cluster continued running the previous version.

---

# Resolution

Enable Auto Sync

CLI

```bash
argocd app set guestbook \
--sync-policy automated
```

Or update the Application manifest

```yaml
spec:
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
```

Commit

```bash
git add .
```

```bash
git commit -m "Enabled Auto Sync"
```

```bash
git push origin main
```

Refresh

```bash
argocd app refresh guestbook
```

---

# Validation

Verify Sync Policy

```bash
argocd app get guestbook
```

Expected

```
Automated
```

---

Commit a small Git change.

Verify that ArgoCD automatically synchronizes the application.

---

Verify Application

```bash
argocd app get guestbook
```

Expected

```
Healthy

Synced
```

---

# Commands Used

Application

```bash
argocd app get guestbook
```

Refresh

```bash
argocd app refresh guestbook
```

Enable Auto Sync

```bash
argocd app set guestbook \
--sync-policy automated
```

Repositories

```bash
argocd repo list
```

Controller Logs

```bash
kubectl logs deployment/argocd-application-controller \
-n argocd
```

Pods

```bash
kubectl get pods \
-n argocd
```

---

# Timeline Example

```
09:00

Developer Pushes Git Changes

↓

09:02

Repository Updated

↓

09:03

Application Refreshes

↓

09:04

No Automatic Sync

↓

09:08

Engineer Reviews Application

↓

09:12

Auto Sync Enabled

↓

09:14

Repository Refreshed

↓

09:15

Deployment Started

↓

09:17

Application Healthy
```

---

# Prevention

- Enable Auto Sync by default.
- Validate Application manifests.
- Monitor OutOfSync duration.
- Test GitOps workflows regularly.
- Configure repository webhooks correctly.
- Monitor controller health.
- Review Sync Window configurations.

---

# Best Practices

- Use Auto Sync for production GitOps applications.
- Enable Self Heal and Prune where appropriate.
- Monitor synchronization failures.
- Keep Application manifests under version control.
- Validate synchronization after every deployment.
- Document Sync Policies for every application.

---

# Interview Questions

## 1. What does Auto Sync do?

Automatically synchronizes Kubernetes resources whenever Git changes are detected.

---

## 2. Which command enables Auto Sync?

```bash
argocd app set guestbook --sync-policy automated
```

---

## 3. Which component performs synchronization?

```
argocd-application-controller
```

---

## 4. Why can an application remain OutOfSync?

- Auto Sync disabled
- Sync Window restriction
- Repository issue
- Controller failure
- Permission problems

---

## 5. How can Auto Sync failures be prevented?

- Enable Auto Sync
- Monitor controller health
- Validate manifests
- Configure webhooks
- Test GitOps pipelines regularly

---

# Incident Success Criteria

The incident is resolved when:

- Auto Sync is enabled.
- Git changes trigger automatic synchronization.
- Application becomes Healthy.
- Application becomes Synced.
- Controller is functioning normally.
- Root cause is documented.

---

# Marathi Quick Revision

- Auto Sync Not Working म्हणजे Git मध्ये बदल झाल्यानंतर ArgoCD Deployment करत नाही.
- `argocd app get` वापरून Sync Policy तपासा.
- `argocd app set --sync-policy automated` वापरून Auto Sync सक्षम करता येतो.
- `argocd-application-controller` Logs तपासणे महत्त्वाचे आहे.
- Production मध्ये Auto Sync, Self Heal आणि Prune सक्षम ठेवणे सर्वोत्तम पद्धत आहे.

