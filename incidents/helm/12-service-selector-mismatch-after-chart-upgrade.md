# Helm Incident 12 - Service Selector Mismatch After Chart Upgrade

# Enterprise DevOps Platform

---

# Purpose

This incident simulates a production outage where a Helm chart upgrade introduces an incorrect Kubernetes Service selector, causing production traffic to stop reaching the application Pods.

The objective is to investigate the incident, identify the root cause, restore production traffic and implement preventive controls.

---

# Incident Summary

| Field | Value |
|-------|-------|
| Incident ID | INC-HLM-012 |
| Severity | SEV-1 |
| Environment | Production |
| Application | API Gateway |
| Cluster | production-cluster |
| Namespace | api-prod |
| Reported By | Prometheus Alertmanager |
| Status | Resolved |

---

# Business Impact

A production Helm upgrade completed successfully.

The application Pods were healthy and running, but customer requests immediately started failing because the Kubernetes Service was no longer routing traffic to the Pods.

Business impact included

- Customer login failures
- API Gateway unavailable
- Dashboard inaccessible
- External API requests returned HTTP 503
- Production outage

---

# Enterprise Architecture

```
React Frontend

        │

        ▼

LoadBalancer Service

        │

        ▼

ClusterIP Service

        │

        ▼

API Gateway Pods

        │

 ┌───────────────┐
 ▼               ▼

Auth Service   Dashboard Service

        │

        ▼

PostgreSQL
```

Deployment Flow

```
GitHub Actions

        │

        ▼

Helm Upgrade

        │

        ▼

Deployment Updated

        │

        ▼

Service Selector Changed

        │

        ▼

No Matching Pods

        │

        ▼

Production Outage
```

---

# Symptoms

Deployment pipeline completed successfully.

Monitoring reported

- HTTP 503 responses
- API unavailable
- Load Balancer healthy
- Pods healthy
- No Service endpoints

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

Output

```
Running
```

---

Verify Services.

```bash
kubectl get svc \
-n api-prod
```

Service was available.

---

Verify Endpoints.

```bash
kubectl get endpoints \
-n api-prod
```

Output

```
<none>
```

---

Describe Service.

```bash
kubectl describe svc api-gateway \
-n api-prod
```

Observed selector

```yaml
Selector:

app=api-gateway-v2
```

---

Verify Pod labels.

```bash
kubectl get pods \
--show-labels \
-n api-prod
```

Observed

```yaml
app=api-gateway
```

---

Review rendered manifests.

```bash
helm get manifest api-gateway \
-n api-prod
```

Service selector

```yaml
selector:
  app: api-gateway-v2
```

Deployment labels

```yaml
labels:
  app: api-gateway
```

---

Review Helm templates.

```bash
cat templates/service.yaml
```

A recent chart modification introduced an incorrect selector.

---

# Root Cause

The Service selector and Deployment labels no longer matched.

As a result

- Pods were healthy.
- Service could not discover any Pods.
- Kubernetes created no Endpoints.
- Production traffic failed.

---

# Resolution

Correct the Service selector.

```yaml
selector:
  app: api-gateway
```

Deploy the updated chart.

```bash
helm upgrade api-gateway \
helm/charts/api-gateway \
-f values-prod.yaml \
-n api-prod
```

---

# Validation

Verify Endpoints.

```bash
kubectl get endpoints \
-n api-prod
```

Expected

```
10.244.1.12:5000
10.244.1.13:5000
```

---

Verify Service.

```bash
kubectl describe svc api-gateway \
-n api-prod
```

Confirm selector matches Pod labels.

---

Verify Pods.

```bash
kubectl get pods \
--show-labels \
-n api-prod
```

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
- APIs operational
- Dashboard accessible
- Monitoring healthy

---

# Incident Timeline

| Time | Activity |
|------|----------|
| 14:00 | Helm upgrade completed |
| 14:03 | HTTP 503 errors detected |
| 14:05 | Monitoring alerts triggered |
| 14:08 | Incident declared |
| 14:15 | Pods verified healthy |
| 14:20 | Service endpoints investigated |
| 14:28 | Selector mismatch identified |
| 14:35 | Chart corrected |
| 14:42 | Helm upgrade executed |
| 14:48 | Service restored |
| 14:55 | Incident closed |

---

# Root Cause Analysis (5 Whys)

### Why was the application unavailable?

The Service could not forward traffic.

---

### Why?

No Endpoints existed.

---

### Why?

The Service selector matched no Pods.

---

### Why?

The Helm chart introduced an incorrect selector.

---

### Why?

Template validation did not verify selector and label consistency.

---

# Corrective Actions

- Correct Service selector.
- Redeploy chart.
- Validate Service endpoints.
- Review Helm templates.
- Update deployment checklist.

---

# Preventive Actions

- Standardize Kubernetes labels.
- Use common Helm helper templates for labels.
- Validate rendered manifests before deployment.
- Test Service connectivity during CI/CD.
- Add automated endpoint verification.
- Review template changes during pull requests.

---

# Lessons Learned

- Healthy Pods do not guarantee application availability.
- Service selectors must always match Pod labels.
- Endpoint verification is mandatory after deployments.
- Helm template reviews should include Kubernetes networking.
- Automated validation reduces configuration errors.

---

# Production Best Practices

- Define labels using Helm helper templates.
- Never hardcode selectors.
- Verify Service endpoints after every deployment.
- Include networking validation in smoke tests.
- Review rendered manifests before deployment.
- Automate Service and Endpoint checks.
- Monitor HTTP 503 responses continuously.

---

# Interview Questions

## Q1. Why can Pods be healthy while the application remains unavailable?

### Answer

Because Kubernetes Services route traffic using label selectors. If the selector does not match Pod labels, no Endpoints are created and traffic cannot reach the Pods.

---

## Q2. Which command immediately identifies a selector mismatch?

### Answer

```bash
kubectl describe svc api-gateway -n api-prod
```

combined with

```bash
kubectl get pods --show-labels -n api-prod
```

---

## Q3. How can enterprises prevent selector mismatch incidents?

### Answer

By using common Helm label helper templates, validating rendered manifests, automating endpoint verification and enforcing peer reviews for Kubernetes resource templates.

---

# Commands Reference

Status

```bash
helm status api-gateway -n api-prod
```

Service

```bash
kubectl describe svc api-gateway -n api-prod
```

Endpoints

```bash
kubectl get endpoints -n api-prod
```

Pods

```bash
kubectl get pods --show-labels -n api-prod
```

Manifest

```bash
helm get manifest api-gateway -n api-prod
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
- Pods Running होते.
- Service endpoints नव्हते.
- Service selector तपासा.
- Pod labels verify करा.
- Selector fix करा.
- Helm upgrade करा.
- Validation करा.

---

# Marathi Summary (5+ Experience Revision)

या Incident मध्ये Helm upgrade यशस्वी झाला आणि Pods व्यवस्थित चालू होते, परंतु Helm chart मधील चुकीच्या Service selector मुळे Kubernetes Service ला कोणतेही Pods सापडले नाहीत. त्यामुळे Endpoints तयार झाले नाहीत आणि सर्व ग्राहकांना HTTP 503 errors मिळू लागले. Investigation मध्ये `kubectl describe svc`, `kubectl get endpoints`, `kubectl get pods --show-labels` आणि `helm get manifest` वापरून selector mismatch हा root cause असल्याचे आढळले. Service selector दुरुस्त करून Helm upgrade पुन्हा execute करण्यात आला आणि Service ने Pods कडे traffic योग्यरित्या route करण्यास सुरुवात केली. या Incident मधून labels, selectors, Helm helper templates आणि endpoint validation यांचे Production Kubernetes वातावरणातील महत्त्व स्पष्ट होते.

