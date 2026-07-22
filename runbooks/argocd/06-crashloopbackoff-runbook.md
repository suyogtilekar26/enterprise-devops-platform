# CrashLoopBackOff Runbook

# Enterprise DevOps Platform

---

# Purpose

This runbook describes the Standard Operating Procedure (SOP) for troubleshooting Kubernetes Pods in the **CrashLoopBackOff** state while deployed through ArgoCD.

CrashLoopBackOff is one of the most common production incidents in Kubernetes environments.

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

# What is CrashLoopBackOff?

CrashLoopBackOff means

```
Container Starts

↓

Application Crashes

↓

Restart

↓

Crash

↓

Restart Delay

↓

CrashLoopBackOff
```

Kubernetes repeatedly attempts to restart the container because it exits unexpectedly.

---

# Common Symptoms

- Pod Status = CrashLoopBackOff
- Application Health = Degraded
- Frequent Restarts
- APIs Unavailable
- Login Failure
- High Error Rate

---

# Common Causes

| Cause | Example |
|--------|----------|
| Invalid Environment Variables | Missing ENV |
| Secret Missing | Database Password Missing |
| ConfigMap Error | Wrong Configuration |
| Database Unavailable | PostgreSQL Down |
| Redis Unavailable | Connection Timeout |
| Application Bug | Exception During Startup |
| Port Conflict | Wrong Listening Port |
| Invalid Startup Command | Container Cannot Start |

---

# Troubleshooting Workflow

```
CrashLoopBackOff

↓

Describe Pod

↓

Logs

↓

ConfigMap

↓

Secret

↓

Dependencies

↓

Fix

↓

Sync

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

---

# Step 2 - Verify Pods

```bash
kubectl get pods
```

Example

```
frontend

CrashLoopBackOff
```

---

# Step 3 - Describe Pod

```bash
kubectl describe pod <pod-name>
```

Check

- Events
- Exit Code
- Restart Count
- Mount Errors
- Probe Failures

---

# Step 4 - Review Logs

Current Container

```bash
kubectl logs <pod-name>
```

Previous Crash

```bash
kubectl logs <pod-name> --previous
```

Look for

- Python Exceptions
- Flask Errors
- Authentication Errors
- Database Connection Errors
- Redis Errors
- Missing Environment Variables

---

# Step 5 - Verify Environment Variables

```bash
kubectl describe pod <pod-name>
```

Ensure

- Required ENV variables exist
- Correct values supplied

---

# Step 6 - Verify ConfigMap

```bash
kubectl get configmap
```

Check

- Configuration
- API URLs
- Application Settings

---

# Step 7 - Verify Secret

```bash
kubectl get secret
```

Ensure

- Secret exists
- Secret mounted
- Credentials correct

---

# Step 8 - Verify Dependencies

Confirm

```
PostgreSQL

↓

Running

--------------------

Redis

↓

Running

--------------------

API Gateway

↓

Healthy
```

Application startup often depends on these services.

---

# Step 9 - Verify Image

```bash
kubectl describe pod <pod-name>
```

Confirm

- Correct image
- Correct tag
- Startup command

---

# Step 10 - Fix the Root Cause

Possible fixes

- Correct application configuration
- Restore database
- Update Secret
- Update ConfigMap
- Fix application code
- Correct Docker image

Commit the fix to Git.

---

# Step 11 - Synchronize

```bash
argocd app sync frontend
```

---

# Step 12 - Validate

```bash
kubectl get pods
```

Expected

```
Running

Ready
```

Application

```bash
argocd app get frontend
```

Expected

```
Synced

Healthy
```

---

# Functional Testing

Verify

- Login
- Dashboard
- API Gateway
- Authentication
- Redis
- PostgreSQL

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

Current Logs

```bash
kubectl logs <pod-name>
```

Previous Logs

```bash
kubectl logs <pod-name> --previous
```

Events

```bash
kubectl get events
```

---

# Success Criteria

- Pod Running
- Restart Count Stable
- Application Healthy
- Sync Successful
- APIs Working
- Monitoring Healthy

---

# Interview Questions

## Q1. What is the first command you execute for CrashLoopBackOff?

### Answer

```bash
kubectl describe pod <pod-name>
```

followed by

```bash
kubectl logs <pod-name> --previous
```

to identify why the previous container instance crashed.

---

## Q2. What are the most common causes of CrashLoopBackOff?

### Answer

Application bugs, invalid configuration, missing Secrets, database connectivity failures, Redis failures, incorrect startup commands and failed health checks.

---

## Q3. Why use the `--previous` option with kubectl logs?

### Answer

Because the current container may have already restarted. The `--previous` option displays logs from the crashed container instance, which usually contains the root cause.

---

# Marathi Quick Revision

- CrashLoopBackOff = App सतत Crash होते.
- `kubectl describe pod` चालवा.
- `kubectl logs --previous` तपासा.
- ConfigMap Verify.
- Secret Verify.
- Database आणि Redis Verify.
- Fix → Git Commit → ArgoCD Sync → Healthy.

