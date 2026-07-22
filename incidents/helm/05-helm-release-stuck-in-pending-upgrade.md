# Helm Incident 05 - Helm Release Stuck in Pending Upgrade

# Enterprise DevOps Platform

---

# Purpose

This incident simulates an enterprise production scenario where a Helm release becomes stuck in the **Pending Upgrade** state, preventing further deployments and impacting business operations.

The objective is to investigate the issue, identify the root cause, safely recover the Helm release and implement preventive controls.

---

# Incident Summary

| Field | Value |
|-------|-------|
| Incident ID | INC-HLM-005 |
| Severity | SEV-2 |
| Environment | Production |
| Application | API Gateway |
| Cluster | production-cluster |
| Namespace | api-prod |
| Reported By | GitHub Actions Deployment Pipeline |
| Status | Resolved |

---

# Business Impact

A scheduled production deployment became stuck during a Helm upgrade.

Business impact included

- New application version not deployed
- CI/CD pipeline blocked
- No further upgrades possible
- Emergency fixes delayed
- Increased deployment backlog

---

# Enterprise Architecture

```
React Frontend

        │

        ▼

API Gateway

        │

 ┌───────────────┐
 ▼               ▼

Auth Service   Dashboard Service

        │

        ▼

PostgreSQL

        │

        ▼

Redis
```

Deployment Flow

```
GitHub Actions

        │

        ▼

helm upgrade

        │

        ▼

Pending Upgrade

        │

        ▼

Deployment Blocked

        │

        ▼

Platform Engineering

        │

        ▼

Recovery
```

---

# Symptoms

Deployment pipeline reported

```
another operation (install/upgrade/rollback) is in progress
```

Engineers observed

- Upgrade pipeline failed
- Release status remained unchanged
- Subsequent deployments failed immediately

---

# Initial Investigation

Verify Helm release.

```bash
helm list \
-n api-prod
```

---

Check release status.

```bash
helm status api-gateway \
-n api-prod
```

Output

```
STATUS

pending-upgrade
```

---

Review release history.

```bash
helm history api-gateway \
-n api-prod
```

Observed

```
Revision 10

pending-upgrade
```

---

Attempt another upgrade.

```bash
helm upgrade api-gateway \
helm/charts/api-gateway \
-n api-prod
```

Output

```
another operation is in progress
```

---

Check deployment rollout.

```bash
kubectl rollout status deployment/api-gateway-api-gateway \
-n api-prod
```

Rollout never completed.

---

Verify Pods.

```bash
kubectl get pods \
-n api-prod
```

Some Pods remained

```
Pending
```

---

Review Events.

```bash
kubectl get events \
-n api-prod \
--sort-by=.lastTimestamp
```

Observed repeated scheduling delays.

---

Review Deployment.

```bash
kubectl describe deployment api-gateway-api-gateway \
-n api-prod
```

---

# Root Cause

During the upgrade

- Worker node experienced temporary failure.
- Deployment rollout never completed.
- Helm retained the release in the **pending-upgrade** state.
- Future upgrade operations were blocked because Helm considered another operation active.

---

# Resolution

Identify the last successful revision.

```bash
helm history api-gateway \
-n api-prod
```

Rollback to the previous stable release.

```bash
helm rollback api-gateway 9 \
-n api-prod
```

Verify release status.

```bash
helm status api-gateway \
-n api-prod
```

Expected

```
STATUS

deployed
```

Retry deployment after infrastructure stabilization.

```bash
helm upgrade api-gateway \
helm/charts/api-gateway \
-f values-prod.yaml \
-n api-prod
```

---

# Validation

Verify release.

```bash
helm status api-gateway \
-n api-prod
```

---

Verify revision.

```bash
helm history api-gateway \
-n api-prod
```

---

Verify rollout.

```bash
kubectl rollout status deployment/api-gateway-api-gateway \
-n api-prod
```

---

Verify Pods.

```bash
kubectl get pods \
-n api-prod
```

Expected

```
Running
```

---

Verify endpoints.

```bash
kubectl get endpoints \
-n api-prod
```

---

Business Validation

- APIs responding normally
- Authentication successful
- Dashboard operational
- Monitoring healthy

---

# Incident Timeline

| Time | Activity |
|------|----------|
| 16:00 | Production upgrade started |
| 16:03 | Upgrade became pending |
| 16:06 | Pipeline blocked |
| 16:10 | Incident declared |
| 16:18 | Release history reviewed |
| 16:24 | Pending upgrade confirmed |
| 16:35 | Rollback executed |
| 16:42 | Release recovered |
| 16:50 | Upgrade retried successfully |
| 17:00 | Incident closed |

---

# Root Cause Analysis (5 Whys)

### Why did deployment stop?

Helm release entered the pending-upgrade state.

---

### Why?

Upgrade never completed.

---

### Why?

Deployment rollout stalled because of temporary infrastructure issues.

---

### Why?

Helm retained the operation as incomplete.

---

### Why?

The deployment process lacked automatic recovery for interrupted Helm operations.

---

# Corrective Actions

- Roll back to the previous stable revision.
- Stabilize Kubernetes infrastructure.
- Retry deployment.
- Review deployment logs.
- Document incident.

---

# Preventive Actions

- Monitor rollout progress continuously.
- Configure deployment timeout alerts.
- Validate cluster health before upgrades.
- Prevent concurrent Helm operations.
- Automate recovery from interrupted deployments.

---

# Lessons Learned

- Pending Helm releases block future deployments.
- Infrastructure instability affects Helm state.
- Rollback is the safest recovery option.
- Release history is essential during recovery.
- Continuous rollout monitoring reduces recovery time.

---

# Production Best Practices

- Execute one Helm operation at a time.
- Monitor rollout until completion.
- Validate cluster health before upgrades.
- Keep rollback plans ready.
- Review Helm history before recovery.
- Automate deployment validation.
- Maintain deployment audit logs.

---

# Interview Questions

## Q1. What does the Helm status **pending-upgrade** indicate?

### Answer

It indicates that a Helm upgrade operation started but never completed successfully, leaving the release locked until recovery.

---

## Q2. Why do future Helm upgrades fail when a release is pending?

### Answer

Helm prevents concurrent operations on the same release to protect release consistency.

---

## Q3. What is the safest recovery method for a release stuck in **pending-upgrade**?

### Answer

Identify the last healthy revision using `helm history` and perform a rollback after verifying cluster health.

---

# Commands Reference

Status

```bash
helm status api-gateway -n api-prod
```

History

```bash
helm history api-gateway -n api-prod
```

Rollback

```bash
helm rollback api-gateway 9 -n api-prod
```

Upgrade

```bash
helm upgrade api-gateway \
helm/charts/api-gateway \
-f values-prod.yaml \
-n api-prod
```

Rollout

```bash
kubectl rollout status deployment/api-gateway-api-gateway -n api-prod
```

Pods

```bash
kubectl get pods -n api-prod
```

Events

```bash
kubectl get events -n api-prod --sort-by=.lastTimestamp
```

---

# Marathi Quick Revision

- Release `pending-upgrade` मध्ये अडकला.
- `helm status` तपासा.
- `helm history` पाहा.
- मागील stable revision शोधा.
- Rollback करा.
- Cluster verify करा.
- Upgrade पुन्हा execute करा.

---

# Marathi Summary (5+ Experience Revision)

या Incident मध्ये Production Helm release **pending-upgrade** स्थितीत अडकला, ज्यामुळे पुढील सर्व deployments थांबले. Investigation दरम्यान `helm status`, `helm history`, Kubernetes rollout आणि events तपासून rollout infrastructure समस्येमुळे पूर्ण न झाल्याचे आढळले. मागील stable revision वर `helm rollback` करून release recover करण्यात आला आणि infrastructure स्थिर झाल्यानंतर deployment पुन्हा यशस्वीरीत्या execute करण्यात आला. या Incident मधून concurrent Helm operations टाळणे, rollout monitoring आणि automated recovery mechanisms यांचे महत्त्व स्पष्ट होते.

