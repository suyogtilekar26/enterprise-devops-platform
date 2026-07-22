# Incident 11 - Deployment Deleted

# Enterprise DevOps Platform

---

# Incident Summary

A Kubernetes Deployment managed by ArgoCD was accidentally deleted from the production cluster.

Although the Namespace still existed, the Deployment and its ReplicaSets and Pods were removed, causing application downtime.

ArgoCD detected the missing resource and marked the application as **OutOfSync** and **Missing**.

---

# Severity

```
SEV-1
```

Critical production incident affecting application availability.

---

# Business Impact

- Application unavailable
- Production Pods deleted
- Service requests fail
- Customer impact
- SLA violation
- Emergency recovery required

---

# Environment

- Kubernetes
- ArgoCD
- Git Repository
- Production Cluster

---

# Symptoms

Pods

```bash
kubectl get pods -n guestbook
```

Output

```
No resources found.
```

Deployment

```bash
kubectl get deployment -n guestbook
```

Output

```
No resources found.
```

ArgoCD

```
OutOfSync

Missing
```

---

# Common Causes

- Manual Deployment Deletion
- Incorrect kubectl Command
- Automation Script Error
- Infrastructure Cleanup Job
- Human Error
- Failed Disaster Recovery Test
- Incorrect Namespace Context
- CI/CD Cleanup Failure

---

# Detection

Verify Deployment

```bash
kubectl get deployment \
-n guestbook
```

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

Verify Deployment

```bash
kubectl get deployment \
-n guestbook
```

---

## Step 2

Verify ReplicaSets

```bash
kubectl get rs \
-n guestbook
```

---

## Step 3

Verify Pods

```bash
kubectl get pods \
-n guestbook
```

---

## Step 4

Review Events

```bash
kubectl get events \
-n guestbook \
--sort-by=.lastTimestamp
```

---

## Step 5

Check Kubernetes Audit Logs

Look for

```
DELETE Deployment
```

Identify

- User
- Service Account
- Automation
- Timestamp

---

## Step 6

Review ArgoCD Controller Logs

```bash
kubectl logs deployment/argocd-application-controller \
-n argocd
```

---

## Step 7

Verify Git Repository

Ensure

```
deployment.yaml
```

still exists.

---

# Root Cause Analysis

Example

An administrator executed

```bash
kubectl delete deployment guestbook \
-n guestbook
```

instead of deleting a test deployment.

The production Deployment was removed.

ReplicaSets and Pods were deleted.

ArgoCD detected the missing Deployment.

---

# Resolution

If Auto Sync is enabled,

ArgoCD automatically recreates the Deployment.

Otherwise

Synchronize manually

```bash
argocd app sync guestbook
```

If required

Apply Deployment

```bash
kubectl apply \
-f deployment.yaml
```

---

# Validation

Verify Deployment

```bash
kubectl get deployment \
-n guestbook
```

Expected

```
READY

AVAILABLE
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

Deployment

```bash
kubectl get deployment
```

ReplicaSets

```bash
kubectl get rs
```

Pods

```bash
kubectl get pods
```

Events

```bash
kubectl get events
```

Application

```bash
argocd app get guestbook
```

Sync

```bash
argocd app sync guestbook
```

Controller Logs

```bash
kubectl logs deployment/argocd-application-controller \
-n argocd
```

---

# Timeline Example

```
15:00

Deployment Accidentally Deleted

↓

15:01

ReplicaSets Deleted

↓

15:02

Pods Deleted

↓

15:03

Application Missing

↓

15:05

Monitoring Alert Triggered

↓

15:08

Engineer Reviews Events

↓

15:10

ArgoCD Sync Started

↓

15:12

Deployment Recreated

↓

15:14

Pods Running

↓

15:15

Application Healthy
```

---

# Prevention

- Restrict Deployment deletion permissions.
- Enable Kubernetes RBAC.
- Require change approvals.
- Protect production namespaces.
- Enable Kubernetes audit logs.
- Use GitOps-only deployments.
- Monitor resource deletion events.

---

# Best Practices

- Never manually delete production Deployments.
- Use ArgoCD Auto Sync for self-healing.
- Protect production access with RBAC.
- Monitor deployment deletion events.
- Regularly test disaster recovery.
- Use admission controllers to block accidental deletions.

---

# Interview Questions

## 1. What happens if a Deployment is deleted?

The Deployment, ReplicaSets and Pods managed by that Deployment are deleted.

---

## 2. Can ArgoCD recover a deleted Deployment?

Yes, if the Deployment manifest still exists in Git and synchronization is performed.

---

## 3. Which command checks whether a Deployment exists?

```bash
kubectl get deployment
```

---

## 4. Which ArgoCD component detects missing Deployments?

```
argocd-application-controller
```

---

## 5. How can Deployment deletion incidents be prevented?

- RBAC
- GitOps
- Audit Logging
- Admission Policies
- Least Privilege Access

---

# Incident Success Criteria

The incident is resolved when:

- Deployment exists.
- ReplicaSets are created.
- Pods are Running.
- Application is Healthy.
- Application is Synced.
- Root cause is documented.

---

# Marathi Quick Revision

- Deployment Delete झाल्यास त्याचे ReplicaSets आणि Pods देखील Delete होतात.
- `kubectl get deployment` वापरून Deployment अस्तित्वात आहे का ते तपासा.
- Git मध्ये Manifest असल्यास ArgoCD Deployment पुन्हा तयार करू शकते.
- Production मध्ये Manual Deployment Delete टाळावे.
- ArgoCD Auto Sync आणि RBAC वापरल्यास अशा Incident पासून संरक्षण मिळते.

