# Incident 10 - Namespace Deleted

# Enterprise DevOps Platform

---

# Incident Summary

A Kubernetes Namespace managed by ArgoCD was accidentally deleted.

As a result, all resources inside the namespace—including Deployments, Services, ConfigMaps, Secrets, Ingresses, and Pods—were removed.

ArgoCD detected the missing resources and reported the application as **Missing** or **OutOfSync**.

---

# Severity

```
SEV-1
```

Critical production outage.

---

# Business Impact

- Complete application outage
- Production traffic interrupted
- All workloads deleted
- Service unavailable
- Customer impact
- SLA violation

---

# Environment

- Kubernetes
- ArgoCD
- GitOps Repository
- Production Cluster

---

# Symptoms

Application

```
OutOfSync

Missing
```

Pods

```bash
kubectl get pods -n guestbook
```

Output

```
Error from server (NotFound)

namespaces "guestbook" not found
```

---

# Common Causes

- Manual Namespace Deletion
- Automation Script Error
- Incorrect kubectl Command
- Infrastructure Cleanup Job
- Terraform Drift
- Accidental Human Error
- Cluster Restore Failure
- Namespace Misconfiguration

---

# Detection

Verify Namespace

```bash
kubectl get ns
```

---

Verify Application

```bash
argocd app get guestbook
```

Expected

```
OutOfSync

Missing
```

---

# Investigation

## Step 1

Check Namespace

```bash
kubectl get ns
```

---

## Step 2

Verify Application

```bash
argocd app get guestbook
```

---

## Step 3

Review Events

```bash
kubectl get events \
-A \
--sort-by=.lastTimestamp
```

---

## Step 4

Check Audit Logs

Look for

```
DELETE Namespace
```

Identify

- User
- Service Account
- Automation
- Timestamp

---

## Step 5

Review ArgoCD Logs

```bash
kubectl logs deployment/argocd-application-controller \
-n argocd
```

---

## Step 6

Verify Git Repository

Ensure manifests still exist.

Example

```
namespace.yaml

deployment.yaml

service.yaml
```

---

## Step 7

Determine Deletion Source

Possible Sources

- Manual kubectl delete
- CI/CD Script
- Terraform
- Automation
- Cluster Cleanup Job

---

# Root Cause Analysis

Example

An administrator intended to delete a development namespace.

Instead,

```
kubectl delete namespace guestbook
```

was executed against the production cluster.

The namespace and all workloads were deleted.

ArgoCD detected missing resources.

---

# Resolution

Recreate Namespace

```bash
kubectl apply \
-f namespace.yaml
```

Synchronize

```bash
argocd app sync guestbook
```

If Auto Sync is enabled,

ArgoCD recreates all managed resources.

---

# Validation

Verify Namespace

```bash
kubectl get ns
```

Expected

```
guestbook

Active
```

---

Verify Pods

```bash
kubectl get pods \
-n guestbook
```

Expected

```
Running
```

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

Namespace

```bash
kubectl get ns
```

Application

```bash
argocd app get guestbook
```

Sync

```bash
argocd app sync guestbook
```

Events

```bash
kubectl get events -A
```

Controller Logs

```bash
kubectl logs deployment/argocd-application-controller \
-n argocd
```

---

# Timeline Example

```
14:00

Namespace Accidentally Deleted

↓

14:01

Pods Removed

↓

14:02

Application Missing

↓

14:05

Monitoring Alert Triggered

↓

14:08

Engineer Verified Namespace

↓

14:10

Namespace Recreated

↓

14:12

ArgoCD Sync Started

↓

14:15

Resources Restored

↓

14:17

Application Healthy
```

---

# Prevention

- Restrict Namespace deletion permissions.
- Enable Kubernetes RBAC.
- Protect production namespaces.
- Require change approvals.
- Use GitOps for all changes.
- Enable audit logging.
- Regularly back up cluster state.

---

# Best Practices

- Never manually delete production namespaces.
- Use separate production access controls.
- Monitor namespace deletion events.
- Enable ArgoCD Auto Sync where appropriate.
- Test disaster recovery procedures.
- Protect critical namespaces with admission policies.

---

# Interview Questions

## 1. What happens if a Namespace is deleted?

All resources inside the namespace are deleted.

---

## 2. Can ArgoCD recover from Namespace deletion?

Yes, if the Namespace and manifests exist in Git and synchronization is performed.

---

## 3. Which command verifies Namespace existence?

```bash
kubectl get ns
```

---

## 4. Which ArgoCD component detects missing resources?

```
argocd-application-controller
```

---

## 5. How can accidental Namespace deletion be prevented?

- RBAC
- Admission Policies
- Change Management
- Audit Logging
- Least Privilege Access

---

# Incident Success Criteria

The incident is resolved when:

- Namespace exists.
- Resources are recreated.
- Pods are Running.
- Application is Healthy.
- Application is Synced.
- Root cause is documented.

---

# Marathi Quick Revision

- Namespace Delete झाल्यास त्या Namespace मधील सर्व Kubernetes Resources Delete होतात.
- `kubectl get ns` वापरून Namespace अस्तित्वात आहे का ते तपासा.
- ArgoCD Git मधील Manifests वापरून Resources पुन्हा तयार करू शकते.
- Production Namespace वर Delete Permission मर्यादित ठेवावी.
- Namespace Deletion Events सतत Monitor करणे आवश्यक आहे.

