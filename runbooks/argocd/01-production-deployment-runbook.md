# Production Deployment Runbook

# Enterprise DevOps Platform

---

# Purpose

This runbook describes the standard operating procedure (SOP) for deploying applications to a Production Kubernetes cluster using ArgoCD.

It should be followed for every production deployment.

---

# Scope

Applications

- React + Vite Frontend
- Flask API Gateway
- Flask Auth Service
- Flask Dashboard Service
- Redis
- PostgreSQL

---

# Deployment Workflow

```
Developer

↓

Pull Request

↓

Approval

↓

CI Pipeline

↓

Docker Image

↓

Manifest Update

↓

Git Repository

↓

ArgoCD

↓

Production Kubernetes
```

---

# Prerequisites

Verify

- Pull Request approved
- CI pipeline passed
- Image scanned
- Manifest updated
- Sync Window open
- Rollback plan available
- Monitoring active

---

# Step 1 - Verify Repository

```bash
argocd repo list
```

Expected

```
Successful
```

---

# Step 2 - Verify Cluster

```bash
argocd cluster list
```

Expected

```
Healthy
```

---

# Step 3 - Verify Application

```bash
argocd app list
```

```bash
argocd app get frontend
```

Check

- Repository
- Revision
- Namespace
- Destination Cluster
- Sync Status
- Health Status

---

# Step 4 - Verify Current Health

Expected

```
Sync Status

Synced

Health

Healthy
```

If application is already unhealthy,

STOP deployment.

Investigate first.

---

# Step 5 - Start Deployment

Manual Sync

```bash
argocd app sync frontend
```

Monitor

```bash
argocd app get frontend
```

---

# Step 6 - Monitor Deployment

Watch

```
Progressing

↓

Healthy

↓

Synced
```

If status becomes

```
Degraded
```

Stop and investigate.

---

# Step 7 - Verify Kubernetes

```bash
kubectl get pods
```

```bash
kubectl get deployment
```

```bash
kubectl get svc
```

```bash
kubectl get ingress
```

Expected

- Pods Running
- Deployments Available
- Services Active
- Ingress Healthy

---

# Step 8 - Verify Logs

```bash
kubectl logs <pod-name>
```

Ensure

- No Exceptions
- Database Connected
- Redis Connected
- Startup Successful

---

# Step 9 - Functional Testing

Verify

- Login
- Dashboard
- APIs
- Authentication
- Database
- Cache

---

# Step 10 - Monitoring

Verify

- Prometheus Targets
- Grafana Dashboards
- Alertmanager
- Application Metrics

No Critical Alerts should exist.

---

# Rollback Criteria

Rollback immediately if

- Production outage
- Login failure
- Database migration failed
- Critical API unavailable
- Continuous CrashLoopBackOff
- Severe performance degradation

---

# Rollback Command

History

```bash
argocd app history frontend
```

Rollback

```bash
argocd app rollback frontend <history-id>
```

Verify

```bash
argocd app get frontend
```

Expected

```
Healthy

Synced
```

---

# Success Criteria

Deployment is successful only if

- Application Healthy
- Application Synced
- Pods Running
- APIs Responding
- Monitoring Healthy
- No Critical Alerts

---

# Post Deployment Checklist

- Inform stakeholders.
- Monitor for 30 minutes.
- Record deployment version.
- Update deployment log.
- Close change request.

---

# Emergency Contacts

Notify

- DevOps Team
- Platform Team
- Application Team
- Database Team (if required)

---

# Interview Questions

## Q1. What checks do you perform before a production deployment?

### Answer

Verify Git approvals, CI success, image availability, repository connectivity, cluster health, application health, monitoring and rollback readiness.

---

## Q2. When should a deployment be rolled back?

### Answer

Rollback immediately if production availability, customer experience or critical business functionality is impacted.

---

# Marathi Quick Revision

- PR Approved.
- CI Passed.
- Repo Verify.
- Cluster Verify.
- Sync.
- Health Verify.
- Functional Testing.
- Monitoring.
- आवश्यक असल्यास Rollback.

