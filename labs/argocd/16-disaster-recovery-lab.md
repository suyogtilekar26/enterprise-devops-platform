# Lab 16 - Disaster Recovery using ArgoCD

# Enterprise DevOps Platform

---

# Lab Objective

In this lab you will learn how to:

- Understand Disaster Recovery (DR)
- Recover applications using GitOps
- Restore deleted Kubernetes resources
- Recover ArgoCD Applications
- Verify cluster recovery
- Follow enterprise DR best practices

---

# Prerequisites

- Labs 01 to 15 Completed
- ArgoCD Installed
- Kubernetes Cluster
- Git Repository
- Automated Sync Enabled
- Self Heal Enabled

---

# What is Disaster Recovery?

Disaster Recovery (DR) is the process of restoring applications and infrastructure after failures.

Failures may include:

- Cluster Failure
- Node Failure
- Namespace Deletion
- Application Deletion
- Human Error
- Cloud Region Failure

---

# Why GitOps Helps in Disaster Recovery

Traditional Recovery

```
Failure

↓

Manual Deployment

↓

Manual Configuration

↓

Human Errors

↓

Long Recovery Time
```

GitOps Recovery

```
Failure

↓

Git Repository

↓

ArgoCD

↓

Automatic Recovery

↓

Healthy Cluster
```

---

# Disaster Recovery Architecture

```
Git Repository

↓

ArgoCD

↓

Kubernetes Cluster

↓

Application

↓

Failure

↓

ArgoCD Detects Drift

↓

Automatic Recovery
```

---

# Scenario 1 - Pod Failure

Delete a Pod

```bash
kubectl delete pod <pod-name>
```

Expected

```
ReplicaSet

↓

Creates New Pod

↓

Application Healthy
```

---

# Scenario 2 - Deployment Deleted

Delete Deployment

```bash
kubectl delete deployment guestbook
```

---

# Verify ArgoCD

```bash
argocd app get guestbook
```

Expected

```
OutOfSync
```

Shortly after

```
Syncing

↓

Healthy

↓

Synced
```

---

# Scenario 3 - Namespace Deleted

Delete Namespace

```bash
kubectl delete namespace guestbook
```

---

# Verify Recovery

```bash
argocd app sync guestbook
```

Expected

Namespace recreated

Resources deployed

Application Healthy

---

# Scenario 4 - Manual Configuration Drift

Scale Deployment manually

```bash
kubectl scale deployment guestbook \
--replicas=10
```

---

# Verify

```bash
argocd app get guestbook
```

Expected

```
OutOfSync
```

ArgoCD restores

```
Desired Replica Count
```

---

# Scenario 5 - Cluster Recovery

Provision a new Kubernetes Cluster.

Register Cluster

```bash
argocd cluster add new-cluster
```

Deploy Application

```bash
argocd app sync guestbook
```

Application recreated from Git.

---

# Scenario 6 - Restore from Git

Delete Application Resources

```bash
kubectl delete all --all -n guestbook
```

Synchronize

```bash
argocd app sync guestbook
```

Everything is recreated automatically.

---

# Verify Recovery

Applications

```bash
argocd app list
```

Pods

```bash
kubectl get pods -n guestbook
```

Deployments

```bash
kubectl get deployment -n guestbook
```

Services

```bash
kubectl get svc -n guestbook
```

---

# Commands Used

Application Status

```bash
argocd app get guestbook
```

Application Sync

```bash
argocd app sync guestbook
```

Application History

```bash
argocd app history guestbook
```

List Applications

```bash
argocd app list
```

---

# Expected Output

```
Failure

↓

Git Repository

↓

ArgoCD

↓

Synchronization

↓

Resources Recreated

↓

Application Healthy
```

---

# Disaster Recovery Checklist

Before Disaster

- Git Repository Updated
- Auto Sync Enabled
- Self Heal Enabled
- Notifications Enabled
- Backups Verified
- Monitoring Enabled

After Disaster

- Cluster Available
- ArgoCD Running
- Git Repository Accessible
- Applications Synced
- Pods Running
- Services Available
- Smoke Tests Passed

---

# Troubleshooting

## Recovery Failed

Verify

```bash
argocd app get guestbook
```

---

## Git Repository Unreachable

Verify

- Repository URL
- Credentials
- Network Connectivity

---

## Application Stuck

Force Sync

```bash
argocd app sync guestbook --force
```

---

## Resources Not Recreated

Verify

- Auto Sync
- Self Heal
- Application Status

---

## Cluster Not Reachable

```bash
kubectl cluster-info
```

---

# Best Practices

- Git must always be the Single Source of Truth.
- Enable Auto Sync.
- Enable Self Heal.
- Store manifests in Git.
- Backup ArgoCD configuration.
- Test Disaster Recovery regularly.
- Monitor recovery time (RTO).
- Define acceptable data loss (RPO).

---

# Enterprise DR Workflow

```
Production Failure

↓

Monitoring Alert

↓

Engineer Investigation

↓

ArgoCD Detects Drift

↓

Automatic Recovery

↓

Health Verification

↓

Incident Closed
```

---

# Interview Questions

## 1. What is Disaster Recovery?

The process of restoring applications and infrastructure after failures.

---

## 2. How does ArgoCD help in Disaster Recovery?

ArgoCD recreates the desired Kubernetes resources from Git.

---

## 3. What enables automatic recovery?

- Auto Sync
- Self Heal
- Git as Source of Truth

---

## 4. What happens if a Deployment is deleted manually?

ArgoCD detects the drift and recreates the Deployment from Git.

---

## 5. What are RTO and RPO?

RTO (Recovery Time Objective) is the maximum acceptable recovery time.

RPO (Recovery Point Objective) is the maximum acceptable amount of data loss.

---

# Lab Success Criteria

You have successfully completed this lab if:

- Deleted resources are restored.
- Configuration drift is corrected.
- Namespace recovery works.
- Cluster recovery is understood.
- Applications return to Healthy and Synced state.

---

# Marathi Quick Revision

- Disaster Recovery म्हणजे Failure नंतर Application पुन्हा चालू करणे.
- Git हा Single Source of Truth असतो.
- ArgoCD Auto Sync आणि Self Heal वापरून Resources पुन्हा तयार करतो.
- Manual Changes Drift म्हणून ओळखले जातात.
- Production मध्ये DR नियमितपणे Test करणे आवश्यक आहे.
- RTO आणि RPO हे Disaster Recovery मधील महत्त्वाचे Metrics आहेत.

