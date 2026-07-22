# ArgoCD Production Interview Scenarios

# Enterprise DevOps Platform

---

# Purpose

This document contains real-world Production scenarios asked in DevOps, SRE, Platform Engineer and Kubernetes interviews.

These are scenario-based questions typically asked for engineers with 4–10 years of experience.

---

# Scenario 1

## The application is OutOfSync. How do you troubleshoot?

### Answer

Follow this order

```
Application

↓

argocd app get

↓

argocd app diff

↓

Identify Drift

↓

Check Git

↓

Check Kubernetes

↓

Sync

↓

Verify Health
```

Commands

```bash
argocd app get frontend
```

```bash
argocd app diff frontend
```

```bash
argocd app sync frontend
```

---

# Scenario 2

## Application is Synced but Health is Degraded.

### Answer

Deployment succeeded but runtime is unhealthy.

Troubleshooting

```
Pods

↓

Events

↓

Logs

↓

ConfigMap

↓

Secret

↓

Dependencies

↓

Database

↓

Redis
```

Commands

```bash
kubectl get pods
```

```bash
kubectl logs <pod>
```

```bash
kubectl describe pod <pod>
```

---

# Scenario 3

## CrashLoopBackOff after deployment.

### Answer

Check

- Previous logs
- Environment variables
- Secrets
- ConfigMaps
- Database connectivity
- Redis connectivity

Commands

```bash
kubectl logs <pod> --previous
```

---

# Scenario 4

## ImagePullBackOff

### Answer

Verify

- Image Name
- Image Tag
- Registry
- ImagePullSecret
- CI Pipeline

---

# Scenario 5

## Git repository is unavailable.

### Answer

Check

```bash
argocd repo list
```

Verify

- Repository URL
- SSH Key
- PAT Token
- Network
- Repo Server

---

# Scenario 6

## Auto Sync stopped working.

### Answer

Verify

```
Auto Sync Enabled

↓

Repository Connected

↓

Application Controller

↓

Sync Window

↓

RBAC
```

---

# Scenario 7

## Manual changes were not reverted.

### Answer

Self Healing is likely disabled.

Verify

```yaml
syncPolicy:
  automated:
    selfHeal: true
```

---

# Scenario 8

## Deployment failed because of RBAC.

### Answer

Verify

```bash
kubectl auth can-i create deployment
```

Review

- Role
- ClusterRole
- RoleBinding
- ClusterRoleBinding

---

# Scenario 9

## Application cannot connect to PostgreSQL.

### Answer

Verify

- Secret
- Service
- DNS
- Credentials
- PostgreSQL Pod
- NetworkPolicy

---

# Scenario 10

## Application cannot connect to Redis.

### Answer

Check

- Redis Service
- Secret
- ConfigMap
- DNS
- Redis Pod

---

# Scenario 11

## Webhook is not triggering deployment.

### Answer

Verify

- Webhook URL
- Secret
- argocd-server
- Ingress
- DNS
- Delivery History

---

# Scenario 12

## Sync Failed after manifest changes.

### Answer

Check

- YAML syntax
- Namespace
- CRDs
- Immutable fields
- RBAC
- Resource quotas

---

# Scenario 13

## Cluster node becomes NotReady.

### Answer

Verify

```bash
kubectl get nodes
```

Then

- kube-system
- CNI
- Storage
- Network
- Resources

---

# Scenario 14

## How do you rollback a failed deployment?

### Answer

```bash
argocd app history frontend
```

```bash
argocd app rollback frontend <history-id>
```

Validate

```
Synced

Healthy
```

---

# Scenario 15

## Complete Production Troubleshooting Flow

```
Incident

↓

Application

↓

Sync

↓

Health

↓

Pods

↓

Logs

↓

Events

↓

Deployment

↓

Service

↓

Ingress

↓

ConfigMap

↓

Secret

↓

Database

↓

Redis

↓

Rollback

↓

Validation

↓

RCA
```

---

# Top Interview Commands

Application

```bash
argocd app list
```

Application Details

```bash
argocd app get frontend
```

Sync

```bash
argocd app sync frontend
```

Rollback

```bash
argocd app rollback frontend <history-id>
```

History

```bash
argocd app history frontend
```

Diff

```bash
argocd app diff frontend
```

Repositories

```bash
argocd repo list
```

Pods

```bash
kubectl get pods
```

Logs

```bash
kubectl logs <pod>
```

Describe

```bash
kubectl describe pod <pod>
```

Events

```bash
kubectl get events
```

---

# Interview Tips

Always explain

- What happened
- How you identified it
- Commands executed
- Root cause
- Resolution
- Validation
- Preventive action

This structured approach demonstrates real production experience.

---

# Marathi Quick Revision

- प्रथम Incident समजून घ्या.
- `argocd app get` चालवा.
- Sync आणि Health तपासा.
- Pods → Logs → Events तपासा.
- ConfigMap आणि Secret Verify करा.
- Database आणि Redis तपासा.
- आवश्यक असल्यास Rollback करा.
- RCA आणि Prevention सांगा.

