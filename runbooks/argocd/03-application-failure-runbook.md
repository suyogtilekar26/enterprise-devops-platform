# Application Failure Runbook

# Enterprise DevOps Platform

---

# Purpose

This runbook describes the Standard Operating Procedure (SOP) for troubleshooting an ArgoCD application that has failed after deployment.

This document is intended for DevOps Engineers, SREs and Platform Engineers responsible for Production support.

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

# Incident Symptoms

Typical symptoms include

- Application unavailable
- Login failure
- APIs returning 5xx errors
- Dashboard inaccessible
- Application marked Degraded
- CrashLoopBackOff
- ImagePullBackOff
- Pods restarting continuously

---

# Incident Workflow

```
Incident Reported

↓

Verify ArgoCD

↓

Verify Kubernetes

↓

Collect Logs

↓

Identify Root Cause

↓

Apply Fix

↓

Verify Health

↓

Close Incident

↓

Perform RCA
```

---

# Step 1 - Verify Application

```bash
argocd app get frontend
```

Check

- Sync Status
- Health Status
- Revision
- Namespace
- Destination Cluster

---

# Step 2 - Verify Application Health

Expected

```
Health

↓

Healthy
```

Possible unhealthy states

```
Degraded

Missing

Progressing

Unknown
```

---

# Step 3 - Verify Pods

```bash
kubectl get pods
```

Common pod states

```
Running

CrashLoopBackOff

ImagePullBackOff

Pending

Terminating
```

---

# Step 4 - Describe Pod

```bash
kubectl describe pod <pod-name>
```

Look for

- Events
- Scheduling failures
- Volume mount errors
- Probe failures
- Image pull failures

---

# Step 5 - Review Logs

```bash
kubectl logs <pod-name>
```

Common errors

- Database connection failed
- Redis connection failed
- Secret missing
- ConfigMap error
- Invalid environment variable
- Application exception

---

# Step 6 - Verify Events

```bash
kubectl get events --sort-by=.metadata.creationTimestamp
```

Look for

- Failed Scheduling
- Failed Mount
- Image Pull Errors
- Node Issues
- Resource Constraints

---

# Step 7 - Verify Deployment

```bash
kubectl get deployment
```

```bash
kubectl describe deployment <deployment-name>
```

Verify

- Desired replicas
- Available replicas
- Updated replicas
- Deployment events

---

# Step 8 - Verify Service

```bash
kubectl get svc
```

Check

- Service exists
- Selector matches Pods
- TargetPort
- ClusterIP

Incorrect selector

↓

No traffic reaches Pods.

---

# Step 9 - Verify Ingress

```bash
kubectl get ingress
```

Verify

- Host
- Backend Service
- TLS
- Paths

---

# Step 10 - Verify ConfigMap

```bash
kubectl get configmap
```

Ensure

- Configuration exists
- Environment variables are correct
- Latest configuration applied

---

# Step 11 - Verify Secrets

```bash
kubectl get secret
```

Check

- Secret exists
- Secret mounted
- Credentials valid

---

# Step 12 - Verify Dependencies

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

Confirm all dependent services are healthy.

---

# Recovery Options

Option 1

Fix configuration

↓

Sync application

```bash
argocd app sync frontend
```

Option 2

Rollback

```bash
argocd app history frontend

argocd app rollback frontend <history-id>
```

---

# Validation

Verify

```bash
argocd app get frontend
```

Expected

```
Sync

↓

Synced

Health

↓

Healthy
```

---

# Functional Testing

Validate

- Login
- Dashboard
- API Gateway
- Authentication
- Redis Cache
- PostgreSQL
- User Transactions

---

# Monitoring

Observe

- Prometheus
- Grafana
- Alertmanager
- Application Logs
- Kubernetes Events

Monitor for at least

```
30 Minutes
```

---

# Root Cause Analysis

Document

- Incident ID
- Timeline
- Root Cause
- Resolution
- Preventive Actions
- Lessons Learned

---

# Success Criteria

- Application Healthy
- Sync Successful
- Pods Running
- APIs Responding
- Monitoring Healthy
- No Critical Alerts
- Customer impact resolved

---

# Common Root Causes

| Issue | Resolution |
|--------|------------|
| CrashLoopBackOff | Fix application configuration or code |
| ImagePullBackOff | Verify image and registry credentials |
| Secret Missing | Create or update Secret |
| ConfigMap Error | Correct configuration |
| Database Failure | Restore database connectivity |
| Service Misconfiguration | Fix selectors or ports |
| Ingress Error | Correct backend or routing |

---

# Interview Questions

## Q1. What is the first command you execute during an application failure?

### Answer

```bash
argocd app get <application-name>
```

---

## Q2. What is your troubleshooting order?

### Answer

Application → Sync Status → Health Status → Pods → Events → Logs → Deployment → Service → Ingress → ConfigMap → Secret → Dependencies → Rollback if necessary.

---

## Q3. When should rollback be preferred?

### Answer

Rollback should be performed immediately if the incident has a high production impact and restoring service is more critical than immediate debugging.

---

# Marathi Quick Revision

- App Verify.
- Sync तपासा.
- Health तपासा.
- Pods.
- Logs.
- Events.
- Service.
- Ingress.
- Secret.
- ConfigMap.
- आवश्यक असल्यास Rollback.

