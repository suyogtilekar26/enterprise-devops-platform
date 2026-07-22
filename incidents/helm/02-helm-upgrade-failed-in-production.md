# Helm Incident 02 - Helm Upgrade Failed in Production

# Enterprise DevOps Platform

---

# Purpose

This incident simulates a real-world enterprise production outage where a Helm Upgrade fails during deployment of a new application version.

The objective is to investigate the failure, identify the root cause, recover production service and document preventive actions using Enterprise Incident Management practices.

---

# Incident Summary

| Field | Value |
|-------|-------|
| Incident ID | INC-HLM-002 |
| Severity | SEV-1 |
| Environment | Production |
| Application | API Gateway |
| Cluster | production-cluster |
| Namespace | api-prod |
| Reported By | GitHub Actions Deployment Pipeline |
| Status | Resolved |

---

# Business Impact

During a scheduled production release, API Gateway version **2.2.0** failed to upgrade.

Business impact included

- Customer API requests failed
- Mobile application experienced authentication failures
- Internal Dashboard became partially unavailable
- Release window exceeded
- Emergency rollback considered

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

FAILED

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
helm upgrade

FAILED
```

Engineers observed

- Upgrade failed
- New Pods not Ready
- Rollout incomplete
- Service degradation

Pipeline log

```
UPGRADE FAILED
```

---

# Initial Investigation

Verify cluster.

```bash
kubectl config current-context
```

---

Verify release.

```bash
helm list \
-n api-prod
```

---

Review release status.

```bash
helm status api-gateway \
-n api-prod
```

Output

```
STATUS

failed
```

---

Review release history.

```bash
helm history api-gateway \
-n api-prod
```

Previous revision

```
Revision 5

STATUS

deployed
```

Current revision

```
Revision 6

STATUS

failed
```

---

Review deployment.

```bash
kubectl describe deployment api-gateway-api-gateway \
-n api-prod
```

---

Review rollout.

```bash
kubectl rollout status deployment/api-gateway-api-gateway \
-n api-prod
```

Deployment timed out.

---

Verify Pods.

```bash
kubectl get pods \
-n api-prod
```

Output

```
CrashLoopBackOff
```

---

Describe failed Pod.

```bash
kubectl describe pod <POD_NAME> \
-n api-prod
```

---

Review logs.

```bash
kubectl logs <POD_NAME> \
-n api-prod
```

Application failed during startup.

---

Review Events.

```bash
kubectl get events \
-n api-prod \
--sort-by=.lastTimestamp
```

Repeated container restart events observed.

---

# Root Cause

The new application version required an environment variable that was not added to the Production values file.

The application failed immediately during startup.

The readiness probe never succeeded.

The Helm Upgrade timed out and marked the release as failed.

---

# Resolution

Update the production values file.

Add the missing environment variable.

Validate chart.

```bash
helm lint helm/charts/api-gateway
```

Render templates.

```bash
helm template api-gateway \
helm/charts/api-gateway \
-f helm/charts/api-gateway/values-prod.yaml
```

Upgrade again.

```bash
helm upgrade api-gateway \
helm/charts/api-gateway \
-f helm/charts/api-gateway/values-prod.yaml \
-n api-prod
```

---

# Validation

Verify release.

```bash
helm status api-gateway \
-n api-prod
```

Expected

```
STATUS

deployed
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

Verify Service.

```bash
kubectl get svc \
-n api-prod
```

---

Verify Endpoints.

```bash
kubectl get endpoints \
-n api-prod
```

---

Business Validation

- Login successful
- API requests successful
- Dashboard operational
- Health endpoint healthy

---

# Incident Timeline

| Time | Activity |
|------|----------|
| 14:00 | Upgrade started |
| 14:02 | Helm upgrade failed |
| 14:04 | Incident declared |
| 14:10 | Pod investigation started |
| 14:18 | Missing configuration identified |
| 14:28 | Values updated |
| 14:34 | Upgrade executed |
| 14:40 | Validation completed |
| 14:45 | Incident resolved |

---

# Root Cause Analysis (5 Whys)

### Why did the upgrade fail?

The application failed to start.

---

### Why?

A required environment variable was missing.

---

### Why?

Production values.yaml was not updated.

---

### Why?

Configuration review missed the new application requirement.

---

### Why?

Release validation checklist did not include configuration comparison between application versions.

---

# Corrective Actions

- Update Production values.yaml.
- Improve configuration review.
- Validate startup configuration before deployment.
- Execute Helm template validation in CI.
- Improve deployment checklist.

---

# Preventive Actions

- Compare values files during every release.
- Introduce automated configuration validation.
- Add startup smoke tests.
- Require peer review for values changes.
- Fail CI when required configuration is missing.

---

# Lessons Learned

- Application upgrades often require configuration updates.
- Helm deployment success depends on application readiness.
- Startup validation should be automated.
- Values files require strict version control.
- Configuration drift causes production incidents.

---

# Production Best Practices

- Validate production values before every upgrade.
- Review application release notes.
- Test upgrades in lower environments.
- Automate configuration validation.
- Monitor rollout continuously.
- Keep rollback ready.
- Record RCA for every failed deployment.

---

# Interview Questions

## Q1. Why can a Helm Upgrade fail even when the chart is valid?

### Answer

Because Kubernetes resources may deploy successfully while the application itself fails due to configuration, startup or runtime issues.

---

## Q2. Which commands are commonly used to investigate a failed Helm Upgrade?

### Answer

```bash
helm status

helm history

kubectl describe deployment

kubectl describe pod

kubectl logs

kubectl rollout status
```

---

## Q3. How can configuration-related upgrade failures be prevented?

### Answer

By validating values files, comparing configuration changes, automating startup validation and testing upgrades in lower environments before production deployment.

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

Rollout

```bash
kubectl rollout status deployment/api-gateway-api-gateway -n api-prod
```

Pods

```bash
kubectl get pods -n api-prod
```

Logs

```bash
kubectl logs <POD_NAME> -n api-prod
```

Events

```bash
kubectl get events -n api-prod --sort-by=.lastTimestamp
```

Upgrade

```bash
helm upgrade api-gateway \
helm/charts/api-gateway \
-f helm/charts/api-gateway/values-prod.yaml \
-n api-prod
```

---

# Marathi Quick Revision

- helm upgrade fail झाला.
- helm status तपासा.
- helm history पाहा.
- Pod logs तपासा.
- Missing configuration शोधा.
- values.yaml अपडेट करा.
- Upgrade पुन्हा करा.
- Validation करा.

---

# Marathi Summary (5+ Experience Revision)

या Incident मध्ये Production Helm Upgrade दरम्यान API Gateway नवीन version वर upgrade होताना आवश्यक environment variable Production `values.yaml` मध्ये नसल्यामुळे application startup fail झाला. Pods `CrashLoopBackOff` मध्ये गेले आणि Helm release `failed` स्थितीत गेला. Investigation मध्ये Helm history, Pod logs, rollout status आणि Kubernetes events वापरून root cause शोधण्यात आला. Configuration दुरुस्त करून Helm upgrade पुन्हा execute करण्यात आला आणि deployment यशस्वीरीत्या restore करण्यात आला. या Incident मधून configuration validation, release readiness आणि production deployment checklists चे महत्त्व स्पष्ट होते.

