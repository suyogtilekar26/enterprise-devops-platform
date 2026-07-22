# Helm Incident 08 - Readiness Probe Failure After Helm Deployment

# Enterprise DevOps Platform

---

# Purpose

This incident simulates a production outage where a Helm deployment completes successfully, but the application Pods fail the Kubernetes Readiness Probe, preventing traffic from reaching the application.

The objective is to investigate the failure, identify the root cause, restore production service and implement preventive measures using Enterprise Incident Management practices.

---

# Incident Summary

| Field | Value |
|-------|-------|
| Incident ID | INC-HLM-008 |
| Severity | SEV-1 |
| Environment | Production |
| Application | API Gateway |
| Cluster | production-cluster |
| Namespace | api-prod |
| Reported By | Prometheus Alertmanager |
| Status | Resolved |

---

# Business Impact

A scheduled Helm deployment completed successfully.

Although the Pods were running, Kubernetes never marked them as Ready.

Business impact included

- Customer API requests failed
- Service endpoints unavailable
- Internal Dashboard inaccessible
- Increased deployment duration
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

Pods Running

        │

        ▼

Readiness Probe Failed

        │

        ▼

Service Endpoints Empty

        │

        ▼

Production Outage
```

---

# Symptoms

Deployment pipeline reported

```
Deployment completed successfully.
```

Production monitoring reported

- APIs unavailable
- Load Balancer returning HTTP 503
- No Ready Pods
- Readiness probe failures

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

0/1 Ready
```

---

Describe Pod.

```bash
kubectl describe pod <POD_NAME> \
-n api-prod
```

Observed

```
Readiness probe failed

HTTP probe failed with statuscode: 404
```

---

Review Deployment.

```bash
kubectl describe deployment api-gateway-api-gateway \
-n api-prod
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
Readiness probe failed
```

---

Review Helm values.

```bash
helm get values api-gateway \
-n api-prod
```

Observed

```yaml
readinessProbe:
  path: /ready
```

Application actually exposed

```
/health
```

---

Verify application endpoints.

```bash
kubectl exec -it <POD_NAME> \
-n api-prod -- curl localhost:5000/health
```

Output

```
HTTP/1.1 200 OK
```

---

# Root Cause

The Helm chart configured an incorrect Readiness Probe path.

Kubernetes continuously checked

```
/ready
```

The application only exposed

```
/health
```

Pods remained NotReady even though the application was functioning correctly.

---

# Resolution

Update the Helm values file.

```yaml
readinessProbe:
  path: /health
```

Deploy the updated configuration.

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
1/1 Running
```

---

Verify endpoints.

```bash
kubectl get endpoints \
-n api-prod
```

Endpoints successfully created.

---

Verify Service.

```bash
kubectl get svc \
-n api-prod
```

---

Business Validation

- Login successful
- APIs accessible
- Dashboard operational
- Load Balancer returned HTTP 200

---

# Incident Timeline

| Time | Activity |
|------|----------|
| 09:00 | Deployment started |
| 09:03 | Helm deployment completed |
| 09:05 | Readiness failures detected |
| 09:08 | Monitoring alerts triggered |
| 09:12 | Incident declared |
| 09:20 | Pod investigation completed |
| 09:28 | Incorrect probe path identified |
| 09:34 | Helm values updated |
| 09:40 | Deployment successful |
| 09:45 | Incident resolved |

---

# Root Cause Analysis (5 Whys)

### Why were Pods unavailable?

They never became Ready.

---

### Why?

Readiness Probe continuously failed.

---

### Why?

Probe path was incorrect.

---

### Why?

Helm values referenced an outdated endpoint.

---

### Why?

Application health endpoint changes were not reflected in the Helm chart.

---

# Corrective Actions

- Update readiness probe configuration.
- Deploy corrected Helm values.
- Validate application health endpoints.
- Review deployment documentation.
- Update release checklist.

---

# Preventive Actions

- Validate probe endpoints during CI/CD.
- Perform smoke testing after deployment.
- Review application release notes.
- Automate health endpoint verification.
- Include probe validation in Helm testing.

---

# Lessons Learned

- Running Pods are not necessarily Ready.
- Incorrect readiness probes prevent Service routing.
- Helm values must match application behavior.
- Health endpoint validation should be automated.
- Deployment success must include readiness verification.

---

# Production Best Practices

- Standardize application health endpoints.
- Validate readiness probes before deployment.
- Use automated deployment verification.
- Monitor Ready Pod counts.
- Review probe configuration during code reviews.
- Test health endpoints in staging.
- Keep Helm values synchronized with application releases.

---

# Interview Questions

## Q1. What happens when a Readiness Probe fails?

### Answer

The Pod continues running, but Kubernetes does not send production traffic to it because it is not considered Ready.

---

## Q2. Why did Helm report success while the application remained unavailable?

### Answer

Helm successfully deployed Kubernetes resources, but the Pods never passed the Readiness Probe, so no Service endpoints were created.

---

## Q3. Which command helps identify Readiness Probe failures?

### Answer

```bash
kubectl describe pod <POD_NAME> -n api-prod
```

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

Events

```bash
kubectl get events -n api-prod --sort-by=.lastTimestamp
```

Endpoints

```bash
kubectl get endpoints -n api-prod
```

Rollout

```bash
kubectl rollout status deployment/api-gateway-api-gateway -n api-prod
```

Upgrade

```bash
helm upgrade api-gateway \
helm/charts/api-gateway \
-f values-prod.yaml \
-n api-prod
```

---

# Marathi Quick Revision

- Helm deployment successful झाला.
- Pods Ready झाले नाहीत.
- Pod describe करा.
- Readiness Probe तपासा.
- Health endpoint verify करा.
- Helm values अपडेट करा.
- Validation करा.

---

# Marathi Summary (5+ Experience Revision)

या Incident मध्ये Helm deployment यशस्वी झाला, परंतु चुकीच्या Readiness Probe path मुळे Kubernetes ने Pods Ready म्हणून स्वीकारले नाहीत. त्यामुळे Service endpoints तयार झाले नाहीत आणि API Gateway ला production traffic मिळाला नाही. Investigation मध्ये `kubectl describe pod`, events आणि Helm values तपासून चुकीचा probe path हा root cause असल्याचे आढळले. योग्य health endpoint वापरून Helm upgrade पुन्हा execute करण्यात आला आणि Pods Ready होऊन application पुन्हा उपलब्ध झाले. या Incident मधून Readiness Probe validation, health endpoint consistency आणि automated deployment verification यांचे Production वातावरणातील महत्त्व स्पष्ट होते.

