# Degraded Application Runbook

# Enterprise DevOps Platform

---

# Purpose

This runbook describes the Standard Operating Procedure (SOP) for troubleshooting an ArgoCD Application in the **Degraded** state.

A Degraded application indicates that the deployment exists in Kubernetes but the application is not functioning correctly.

---

# Scope

Applications

- React + Vite Frontend
- Flask API Gateway
- Flask Auth Service
- Flask Dashboard Service

Supporting Services

- Redis
- PostgreSQL

---

# What Does Degraded Mean?

```
Git

↓

Synced

↓

Application

↓

Unhealthy
```

ArgoCD successfully deployed the manifests, but one or more Kubernetes resources are unhealthy.

---

# Common Symptoms

- Application Health = Degraded
- Pods restarting
- APIs unavailable
- Login failures
- Dashboard inaccessible
- Readiness probe failures
- Liveness probe failures

---

# Common Causes

| Cause | Example |
|--------|----------|
| CrashLoopBackOff | Application crash |
| ImagePullBackOff | Image unavailable |
| Readiness Probe Failed | Pod not ready |
| Liveness Probe Failed | Container restarting |
| Database Failure | PostgreSQL unavailable |
| Redis Failure | Cache unavailable |
| Missing Secret | Authentication failure |
| ConfigMap Error | Wrong configuration |

---

# Troubleshooting Workflow

```
Application

↓

Degraded

↓

Pods

↓

Events

↓

Logs

↓

Dependencies

↓

Fix

↓

Healthy
```

---

# Step 1 - Verify Application

```bash
argocd app get frontend
```

Expected

```
Health

↓

Degraded
```

Review

- Sync Status
- Health Status
- Resource Status

---

# Step 2 - Verify Pods

```bash
kubectl get pods
```

Check for

- CrashLoopBackOff
- ImagePullBackOff
- Pending
- Error
- Running but Not Ready

---

# Step 3 - Describe Pod

```bash
kubectl describe pod <pod-name>
```

Look for

- Scheduling Issues
- Mount Errors
- Probe Failures
- Image Pull Errors
- Events

---

# Step 4 - Review Logs

```bash
kubectl logs <pod-name>
```

Look for

- Startup failures
- Database connection errors
- Redis connection failures
- Missing environment variables
- Authentication failures
- Application exceptions

---

# Step 5 - Verify Deployment

```bash
kubectl get deployment
```

```bash
kubectl describe deployment <deployment-name>
```

Verify

- Desired Replicas
- Available Replicas
- Ready Replicas
- Updated Replicas

---

# Step 6 - Verify Service

```bash
kubectl get svc
```

Ensure

- Service exists
- Correct selector
- TargetPort
- Endpoints available

---

# Step 7 - Verify Ingress

```bash
kubectl get ingress
```

Check

- Host
- Backend Service
- TLS
- Paths

---

# Step 8 - Verify ConfigMap

```bash
kubectl get configmap
```

Confirm

- Configuration exists
- Environment variables correct
- Latest version applied

---

# Step 9 - Verify Secrets

```bash
kubectl get secret
```

Check

- Secret exists
- Credentials valid
- Mounted successfully

---

# Step 10 - Verify Dependencies

Application dependencies

```
Frontend

↓

API Gateway

↓

Auth Service

↓

Dashboard Service

↓

Redis

↓

PostgreSQL
```

Ensure all dependent services are healthy.

---

# Step 11 - Fix Issue

Possible actions

- Update ConfigMap
- Update Secret
- Fix image
- Restore database
- Restore Redis
- Correct probe configuration

Commit the fix to Git.

---

# Step 12 - Synchronize

```bash
argocd app sync frontend
```

Monitor

```bash
argocd app get frontend
```

Expected

```
Synced

Healthy
```

---

# Validation

Verify

```bash
kubectl get pods
```

All Pods should be

```
Running

Ready
```

Perform

- Login Test
- Dashboard Test
- API Test
- Database Test
- Redis Test

---

# Important Commands

Application

```bash
argocd app get frontend
```

Pods

```bash
kubectl get pods
```

Describe

```bash
kubectl describe pod <pod-name>
```

Logs

```bash
kubectl logs <pod-name>
```

Events

```bash
kubectl get events
```

Sync

```bash
argocd app sync frontend
```

---

# Success Criteria

- Health = Healthy
- Sync = Synced
- Pods Running
- Services Reachable
- APIs Working
- No Critical Alerts

---

# Interview Questions

## Q1. What does a Degraded application indicate?

### Answer

A Degraded application means the manifests have been deployed successfully, but one or more Kubernetes resources are unhealthy due to runtime issues such as pod failures, probe failures or dependency problems.

---

## Q2. What is the first thing you check when an application is Degraded?

### Answer

Start with:

```bash
argocd app get <application-name>
```

Then inspect Pods, Events and Logs to determine the root cause.

---

## Q3. Can an application be Synced and Degraded at the same time?

### Answer

Yes. "Synced" means the cluster matches Git, while "Degraded" means the deployed application is unhealthy at runtime.

---

# Marathi Quick Revision

- Degraded = Deployment झाले पण App चालत नाही.
- प्रथम `argocd app get`.
- Pods तपासा.
- Logs तपासा.
- Events तपासा.
- Service आणि Ingress Verify करा.
- Dependencies Verify करा.
- Fix → Git Commit → Sync → Healthy.

