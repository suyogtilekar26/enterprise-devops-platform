# Incident 13 - Self Heal Failure

# Enterprise DevOps Platform

---

# Incident Summary

ArgoCD failed to restore Kubernetes resources after manual changes were made directly in the cluster.

Although Self Heal was expected to automatically reconcile the drift, the application remained **OutOfSync**, leaving production in an inconsistent state.

---

# Severity

```
SEV-2
```

Configuration drift affecting production consistency.

---

# Business Impact

- Configuration drift
- Production differs from Git
- Manual intervention required
- Compliance issues
- Reduced deployment reliability
- Increased operational risk

---

# Environment

- ArgoCD
- Kubernetes
- Git Repository
- Production Cluster

---

# Symptoms

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

Manual changes remain in the cluster even after several minutes.

---

# Common Causes

- Self Heal Disabled
- Auto Sync Disabled
- Sync Window Restriction
- Ignore Differences Configuration
- RBAC Permission Issue
- Controller Failure
- Resource Ownership Conflict
- Application Paused
- Repository Refresh Failure
- Kubernetes API Errors

---

# Detection

Verify Application

```bash
argocd app get guestbook
```

Look for

```
Self Heal

Disabled
```

or

```
Automated

SelfHeal: false
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

Self Heal Enabled
```

---

## Step 2

Inspect Application Manifest

```yaml
spec:
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
```

---

## Step 3

Verify Drift

Example

```bash
kubectl edit deployment guestbook \
-n guestbook
```

Modify

```
replicas

3 → 5
```

Wait several minutes.

If replicas remain

```
5
```

Self Heal is not functioning.

---

## Step 4

Review Controller Logs

```bash
kubectl logs deployment/argocd-application-controller \
-n argocd
```

Look for

```
permission denied

sync skipped

reconciliation failed
```

---

## Step 5

Verify Controller Status

```bash
kubectl get pods \
-n argocd
```

Ensure

```
argocd-application-controller

Running
```

---

## Step 6

Check Ignore Differences

Review Application manifest for

```yaml
ignoreDifferences:
```

Confirm the modified field is not intentionally ignored.

---

## Step 7

Verify Cluster Permissions

```bash
kubectl auth can-i update deployment \
--as system:serviceaccount:argocd:argocd-application-controller \
-n guestbook
```

Expected

```
yes
```

---

# Root Cause Analysis

Example

Developers enabled

```
Automated Sync
```

but

```
selfHeal: false
```

was configured.

An engineer manually scaled the Deployment.

ArgoCD detected drift but never restored the Git configuration.

---

# Resolution

Enable Self Heal.

CLI

```bash
argocd app set guestbook \
--self-heal
```

Or update Application manifest

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
git commit -m "Enabled Self Heal"
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

Modify Deployment manually

```bash
kubectl scale deployment guestbook \
--replicas=5 \
-n guestbook
```

Wait.

Expected

```bash
kubectl get deployment guestbook \
-n guestbook
```

Output

```
Replicas

3
```

ArgoCD automatically restores the desired state.

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

Enable Self Heal

```bash
argocd app set guestbook \
--self-heal
```

Refresh

```bash
argocd app refresh guestbook
```

Controller Logs

```bash
kubectl logs deployment/argocd-application-controller \
-n argocd
```

Permissions

```bash
kubectl auth can-i update deployment
```

---

# Timeline Example

```
10:00

Engineer Scales Deployment Manually

↓

10:02

Application Becomes OutOfSync

↓

10:05

Self Heal Does Not Trigger

↓

10:08

Engineer Reviews Sync Policy

↓

10:10

Self Heal Enabled

↓

10:12

Application Refreshed

↓

10:13

Deployment Restored

↓

10:15

Application Healthy
```

---

# Prevention

- Enable Self Heal for production applications.
- Restrict manual cluster changes.
- Monitor configuration drift.
- Enable audit logging.
- Validate Sync Policy during reviews.
- Test Self Heal regularly.

---

# Best Practices

- Keep Git as the single source of truth.
- Prevent manual production changes.
- Enable Auto Sync and Self Heal together.
- Review Ignore Differences configuration carefully.
- Monitor reconciliation failures.
- Validate controller permissions after upgrades.

---

# Interview Questions

## 1. What is Self Heal in ArgoCD?

Self Heal automatically restores Kubernetes resources to match the desired state stored in Git after manual changes.

---

## 2. Which command enables Self Heal?

```bash
argocd app set guestbook --self-heal
```

---

## 3. Why can Self Heal fail?

- Self Heal disabled
- RBAC issues
- Controller failure
- Sync Window restrictions
- Ignore Differences configuration

---

## 4. Which ArgoCD component performs Self Heal?

```
argocd-application-controller
```

---

## 5. How can Self Heal failures be prevented?

- Enable Self Heal
- Restrict manual changes
- Monitor drift
- Validate permissions
- Test reconciliation regularly

---

# Incident Success Criteria

The incident is resolved when:

- Self Heal is enabled.
- Manual changes are automatically reverted.
- Application becomes Healthy.
- Application becomes Synced.
- Controller is functioning correctly.
- Root cause is documented.

---

# Marathi Quick Revision

- Self Heal Failure म्हणजे ArgoCD ला Cluster मधील Manual Changes Git प्रमाणे परत Restore करता येत नाहीत.
- `argocd app get` वापरून Self Heal सक्षम आहे का ते तपासा.
- `argocd app set --self-heal` वापरून Self Heal सक्षम करता येतो.
- `argocd-application-controller` Drift Detect करून Resources Restore करतो.
- Production मध्ये Auto Sync आणि Self Heal दोन्ही सक्षम ठेवणे सर्वोत्तम पद्धत आहे.

