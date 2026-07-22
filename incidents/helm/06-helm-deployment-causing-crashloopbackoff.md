# Helm Incident 06 - Helm Deployment Causing CrashLoopBackOff

# Enterprise DevOps Platform

---

# Purpose

This incident simulates a production outage where a Helm deployment completes successfully, but the application Pods immediately enter the **CrashLoopBackOff** state.

The objective is to investigate the issue, determine the root cause, restore production service and document preventive measures using Enterprise Incident Management practices.

---

# Incident Summary

| Field | Value |
|-------|-------|
| Incident ID | INC-HLM-006 |
| Severity | SEV-1 |
| Environment | Production |
| Application | API Gateway |
| Cluster | production-cluster |
| Namespace | api-prod |
| Reported By | Prometheus Alertmanager |
| Status | Resolved |

---

# Business Impact

A new production deployment was completed successfully through Helm.

Within minutes, all API Gateway Pods started restarting continuously.

Business impact included

- Customer login failures
- Public APIs unavailable
- Dashboard inaccessible
- Increased response failures
- Critical production outage

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

Deployment Successful

        │

        ▼

Pods Restarting

        │

        ▼

CrashLoopBackOff

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
Upgrade completed successfully.
```

Production monitoring reported

- Application unavailable
- Pod restart count increasing
- API Health Check failed
- Multiple alerts triggered

---

# Initial Investigation

Verify Helm release.

```bash
helm status api-gateway \
-n api-prod
```

Status

```
deployed
```

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

Describe affected Pod.

```bash
kubectl describe pod <POD_NAME> \
-n api-prod
```

Observed

```
Back-off restarting failed container
```

---

Review application logs.

```bash
kubectl logs <POD_NAME> \
-n api-prod
```

Observed

```
KeyError

JWT_SECRET not found
```

---

Review previous logs.

```bash
kubectl logs <POD_NAME> \
--previous \
-n api-prod
```

Same error observed.

---

Review Deployment.

```bash
kubectl describe deployment api-gateway-api-gateway \
-n api-prod
```

---

Review current Helm values.

```bash
helm get values api-gateway \
-n api-prod
```

Observed

```
JWT_SECRET

missing
```

---

Review Secret.

```bash
kubectl get secret \
-n api-prod
```

Application Secret was missing.

---

# Root Cause

During deployment

- A required Kubernetes Secret was accidentally deleted.
- Helm deployment completed successfully because resource templates were valid.
- The application failed during startup because the required environment variable could not be loaded.
- Kubernetes continuously restarted the container.

---

# Resolution

Restore the missing Secret.

```bash
kubectl apply -f jwt-secret.yaml
```

Verify Secret.

```bash
kubectl get secret \
-n api-prod
```

Restart Deployment.

```bash
kubectl rollout restart deployment/api-gateway-api-gateway \
-n api-prod
```

---

# Validation

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

Verify logs.

```bash
kubectl logs <POD_NAME> \
-n api-prod
```

No startup errors.

---

Verify endpoints.

```bash
kubectl get endpoints \
-n api-prod
```

---

Business Validation

- Login successful
- APIs operational
- Dashboard available
- Health endpoint returned HTTP 200

---

# Incident Timeline

| Time | Activity |
|------|----------|
| 10:00 | Deployment completed |
| 10:02 | Monitoring alert triggered |
| 10:05 | Incident declared |
| 10:10 | CrashLoopBackOff observed |
| 10:18 | Logs reviewed |
| 10:25 | Missing Secret identified |
| 10:32 | Secret restored |
| 10:36 | Deployment restarted |
| 10:42 | Application recovered |
| 10:45 | Incident closed |

---

# Root Cause Analysis (5 Whys)

### Why were Pods restarting?

Application startup failed.

---

### Why?

Required Secret was missing.

---

### Why?

Secret had been deleted before deployment.

---

### Why?

No deployment validation verified Secret availability.

---

### Why?

Production release checklist did not include prerequisite resource verification.

---

# Corrective Actions

- Restore Kubernetes Secret.
- Restart Deployment.
- Verify environment configuration.
- Review deployment checklist.
- Update operational documentation.

---

# Preventive Actions

- Validate Secrets before deployment.
- Automate prerequisite resource verification.
- Block deployments when mandatory Secrets are missing.
- Store Secrets using external secret management.
- Implement startup validation tests.

---

# Lessons Learned

- Successful Helm deployment does not guarantee application startup.
- Secret validation is critical.
- CrashLoopBackOff usually requires application log analysis.
- Pre-deployment validation reduces production incidents.
- Kubernetes events and logs should always be reviewed together.

---

# Production Best Practices

- Manage Secrets centrally.
- Never delete Production Secrets manually.
- Validate required Secrets before deployments.
- Use automated Secret synchronization.
- Monitor Pod restart counts.
- Enable startup health checks.
- Maintain deployment runbooks.

---

# Interview Questions

## Q1. Can Helm report a successful deployment while Pods are in CrashLoopBackOff?

### Answer

Yes.

Helm successfully deploys Kubernetes resources, but the application may still fail during startup due to missing configuration or runtime errors.

---

## Q2. Which commands are most useful for investigating CrashLoopBackOff?

### Answer

```bash
kubectl get pods

kubectl describe pod

kubectl logs

kubectl logs --previous
```

---

## Q3. How can Secret-related deployment failures be prevented?

### Answer

By validating Secret availability before deployment, automating Secret management, using external Secret stores and implementing deployment policy checks.

---

# Commands Reference

Status

```bash
helm status api-gateway -n api-prod
```

Pods

```bash
kubectl get pods -n api-prod
```

Describe Pod

```bash
kubectl describe pod <POD_NAME> -n api-prod
```

Logs

```bash
kubectl logs <POD_NAME> -n api-prod
```

Previous Logs

```bash
kubectl logs <POD_NAME> --previous -n api-prod
```

Secrets

```bash
kubectl get secret -n api-prod
```

Restart Deployment

```bash
kubectl rollout restart deployment/api-gateway-api-gateway -n api-prod
```

Rollout Status

```bash
kubectl rollout status deployment/api-gateway-api-gateway -n api-prod
```

---

# Marathi Quick Revision

- Helm deployment successful झाला.
- Pods CrashLoopBackOff मध्ये गेले.
- Pod logs तपासा.
- Secret verify करा.
- Missing Secret restore करा.
- Deployment restart करा.
- Validation करा.

---

# Marathi Summary (5+ Experience Revision)

या Incident मध्ये Helm deployment यशस्वी झाला, परंतु आवश्यक Kubernetes Secret उपलब्ध नसल्यामुळे API Gateway application startup दरम्यान fail झाला आणि Pods सतत `CrashLoopBackOff` मध्ये जात होते. Investigation मध्ये `kubectl describe pod`, `kubectl logs`, `helm get values` आणि Kubernetes Secrets तपासून missing Secret हा root cause असल्याचे आढळले. Secret restore करून Deployment restart करण्यात आला आणि application पुन्हा सुरळीत सुरू झाला. या Incident मधून Helm deployment यशस्वी असला तरी runtime configuration, Secrets validation आणि startup verification यांचे Production मध्ये अत्यंत महत्त्व असल्याचे स्पष्ट होते.

