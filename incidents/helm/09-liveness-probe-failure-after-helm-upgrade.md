# Helm Incident 09 - Liveness Probe Failure After Helm Upgrade

# Enterprise DevOps Platform

---

# Purpose

This incident simulates a production outage where a Helm upgrade completes successfully, but the application Pods continuously restart because of a failed Kubernetes Liveness Probe.

The objective is to investigate the issue, determine the root cause, restore production services and establish preventive measures for future deployments.

---

# Incident Summary

| Field | Value |
|-------|-------|
| Incident ID | INC-HLM-009 |
| Severity | SEV-1 |
| Environment | Production |
| Application | API Gateway |
| Cluster | production-cluster |
| Namespace | api-prod |
| Reported By | Prometheus Alertmanager |
| Status | Resolved |

---

# Business Impact

A production deployment completed successfully using Helm.

Within a few minutes, the API Gateway Pods repeatedly restarted because Kubernetes considered the application unhealthy.

Business impact included

- Customer authentication failures
- API requests interrupted
- Dashboard unavailable
- Increased response latency
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

Helm Upgrade

        │

        ▼

Pods Started

        │

        ▼

Liveness Probe Failed

        │

        ▼

Container Restarted

        │

        ▼

Crash Loop

        │

        ▼

Production Outage
```

---

# Symptoms

Deployment pipeline completed successfully.

Monitoring reported

- High Pod restart count
- API downtime
- Health endpoint unavailable
- Continuous application restarts

---

# Initial Investigation

Verify Helm release.

```bash
helm status api-gateway \
-n api-prod
```

Output

```
STATUS

deployed
```

---

Verify Pods.

```bash
kubectl get pods \
-n api-prod
```

Observed

```
Running

RESTARTS: 27
```

---

Describe Pod.

```bash
kubectl describe pod <POD_NAME> \
-n api-prod
```

Observed

```
Liveness probe failed

HTTP probe failed with statuscode: 500
```

---

Review Events.

```bash
kubectl get events \
-n api-prod \
--sort-by=.lastTimestamp
```

Observed

```
Killing container

Liveness probe failed
```

---

Review Deployment.

```bash
kubectl describe deployment api-gateway-api-gateway \
-n api-prod
```

---

Review Helm values.

```bash
helm get values api-gateway \
-n api-prod
```

Observed

```yaml
livenessProbe:
  initialDelaySeconds: 5
```

---

Review application startup logs.

```bash
kubectl logs <POD_NAME> \
-n api-prod
```

Observed

```
Application initialization

Loading cache...

Connecting to PostgreSQL...

Startup completed in 35 seconds
```

---

# Root Cause

The application required approximately 35 seconds to complete startup.

The Liveness Probe started after only 5 seconds.

Kubernetes assumed the application was unhealthy and restarted the container before startup completed.

The restart cycle continued indefinitely.

---

# Resolution

Increase the Liveness Probe delay.

Update Production values.

```yaml
livenessProbe:
  initialDelaySeconds: 45
```

Upgrade the release.

```bash
helm upgrade api-gateway \
helm/charts/api-gateway \
-f values-prod.yaml \
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

RESTARTS: 0
```

---

Verify Pod description.

```bash
kubectl describe pod <POD_NAME> \
-n api-prod
```

No Liveness Probe failures observed.

---

Verify application.

```bash
curl http://api.example.com/health
```

Expected

```
HTTP/1.1 200 OK
```

---

Business Validation

- Customer login successful
- API requests successful
- Dashboard operational
- Monitoring healthy

---

# Incident Timeline

| Time | Activity |
|------|----------|
| 17:00 | Deployment started |
| 17:03 | Helm upgrade completed |
| 17:05 | Pods restarted repeatedly |
| 17:08 | Monitoring alerts triggered |
| 17:10 | Incident declared |
| 17:18 | Pod investigation completed |
| 17:25 | Liveness Probe configuration identified |
| 17:32 | Helm values updated |
| 17:38 | Deployment completed |
| 17:45 | Service restored |

---

# Root Cause Analysis (5 Whys)

### Why were Pods restarting?

The Liveness Probe failed repeatedly.

---

### Why?

The application had not completed startup.

---

### Why?

The probe started too early.

---

### Why?

The Helm values contained an incorrect `initialDelaySeconds`.

---

### Why?

Production startup characteristics were not validated before deployment.

---

# Corrective Actions

- Increase Liveness Probe delay.
- Validate startup duration.
- Update Helm values.
- Verify deployment after rollout.
- Review deployment standards.

---

# Preventive Actions

- Measure application startup time.
- Tune probe parameters.
- Test production startup behavior.
- Include probe validation in CI/CD.
- Perform performance testing before releases.

---

# Lessons Learned

- Startup time changes between releases.
- Incorrect Liveness Probes cause unnecessary restarts.
- Probe configuration must match application behavior.
- Startup validation should be automated.
- Kubernetes health checks require continuous review.

---

# Production Best Practices

- Use realistic Liveness Probe timings.
- Monitor restart counts.
- Test startup under production load.
- Review probe configuration for every release.
- Validate health endpoints before deployment.
- Monitor rollout events.
- Automate health verification.

---

# Interview Questions

## Q1. What is the purpose of a Liveness Probe?

### Answer

It determines whether a running container is healthy. If the probe repeatedly fails, Kubernetes restarts the container.

---

## Q2. Why did Pods continuously restart in this incident?

### Answer

The Liveness Probe started before the application finished initializing, causing Kubernetes to restart the container repeatedly.

---

## Q3. How can Liveness Probe failures be prevented?

### Answer

By measuring application startup time, configuring appropriate probe delays, validating probe settings during testing and monitoring startup behavior in production.

---

# Commands Reference

Release Status

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

Events

```bash
kubectl get events -n api-prod --sort-by=.lastTimestamp
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

---

# Marathi Quick Revision

- Helm deployment successful झाला.
- Pods restart होत होते.
- Liveness Probe तपासा.
- Startup time verify करा.
- initialDelaySeconds वाढवा.
- Helm upgrade करा.
- Validation करा.

---

# Marathi Summary (5+ Experience Revision)

या Incident मध्ये Helm upgrade यशस्वी झाला, परंतु API Gateway application सुरू होण्यासाठी सुमारे 35 सेकंद लागत असताना Liveness Probe फक्त 5 सेकंदांनी सुरू होत होती. त्यामुळे Kubernetes ने application unhealthy समजून Pods सतत restart केले. Investigation मध्ये `kubectl describe pod`, events, logs आणि Helm values तपासून चुकीची `initialDelaySeconds` configuration हा root cause असल्याचे आढळले. Liveness Probe delay वाढवून Helm upgrade पुन्हा execute करण्यात आला आणि application स्थिरपणे चालू झाला. या Incident मधून startup profiling, probe tuning आणि production health validation यांचे Enterprise Kubernetes deployments मध्ये असलेले महत्त्व स्पष्ट होते.

