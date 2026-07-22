# Rollback Runbook

# Enterprise DevOps Platform

---

# Purpose

This runbook describes the standard operating procedure (SOP) for rolling back an ArgoCD application to the last known stable version after a failed deployment.

This runbook should be used during production incidents where restoring service is the highest priority.

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

# When to Rollback

Perform rollback immediately if

- Production outage
- Login failure
- API failure
- Database migration failure
- Continuous CrashLoopBackOff
- ImagePullBackOff affecting production
- High customer impact
- Critical monitoring alerts
- Business functionality unavailable

---

# Rollback Decision Flow

```
Deployment Failed

↓

Customer Impact?

↓

YES

↓

Rollback

↓

Restore Service

↓

Root Cause Analysis

↓

Permanent Fix
```

---

# Prerequisites

Verify

- Previous deployment was stable.
- Rollback revision exists.
- Git repository accessible.
- Cluster healthy.
- Incident communicated.

---

# Step 1 - Verify Application

```bash
argocd app get frontend
```

Check

- Sync Status
- Health Status
- Current Revision

---

# Step 2 - View Deployment History

```bash
argocd app history frontend
```

Example

```
ID    Revision

1     v1.0.0

2     v1.1.0

3     v1.2.0
```

Identify the last stable deployment.

---

# Step 3 - Notify Team

Inform

- Platform Team
- Application Team
- DevOps Team
- Incident Manager

Reason

```
Production Rollback Initiated
```

---

# Step 4 - Execute Rollback

```bash
argocd app rollback frontend 2
```

Replace

```
2
```

with the required history ID.

---

# Step 5 - Monitor Rollback

```bash
argocd app get frontend
```

Expected

```
Sync Status

↓

Synced

Health

↓

Healthy
```

---

# Step 6 - Verify Kubernetes

```bash
kubectl get pods
```

```bash
kubectl get deployment
```

```bash
kubectl get svc
```

Ensure

- Pods Running
- Deployments Available
- Services Ready

---

# Step 7 - Verify Logs

```bash
kubectl logs <pod-name>
```

Confirm

- Startup Successful
- Database Connected
- Redis Connected
- No Exceptions

---

# Step 8 - Functional Testing

Verify

- Login
- Dashboard
- Authentication
- API Gateway
- Database
- Cache
- Business Transactions

---

# Step 9 - Monitor Production

Observe

- CPU
- Memory
- Error Rate
- API Response Time
- Grafana Dashboards
- Prometheus Alerts

Continue monitoring for at least

```
30 Minutes
```

---

# Step 10 - Close Incident

Record

- Rollback Time
- Version Restored
- Root Cause
- Incident Number
- Resolution Time

Create RCA document.

---

# Emergency Rollback Flow

```
Production Issue

↓

History

↓

Rollback

↓

Pods Running

↓

Application Healthy

↓

Customer Validation

↓

Incident Closed
```

---

# Important Commands

Application

```bash
argocd app get frontend
```

History

```bash
argocd app history frontend
```

Rollback

```bash
argocd app rollback frontend <history-id>
```

Pods

```bash
kubectl get pods
```

Logs

```bash
kubectl logs <pod-name>
```

Events

```bash
kubectl get events
```

---

# Rollback Success Criteria

Rollback is complete only if

- Application Synced
- Application Healthy
- Pods Running
- APIs Responding
- Monitoring Healthy
- No Critical Alerts
- Customer functionality restored

---

# Common Mistakes

- Rolling back without checking history.
- Rolling back to another faulty revision.
- Forgetting database compatibility.
- Skipping functional testing.
- Closing the incident before monitoring.

---

# Interview Questions

## Q1. When should you rollback instead of debugging?

### Answer

Rollback should be performed immediately when production availability or critical business functionality is impacted. Restoring service takes priority over root cause analysis.

---

## Q2. Which command is used for rollback?

### Answer

```bash
argocd app rollback <application-name> <history-id>
```

---

## Q3. What should be verified after rollback?

### Answer

Application health, Sync status, Pods, Services, Logs, Business functionality and Monitoring dashboards.

---

# Marathi Quick Revision

- Customer Impact?
- होय → Rollback.
- History तपासा.
- Rollback करा.
- Health Verify.
- Functional Testing.
- Monitoring.
- RCA नंतर करा.

