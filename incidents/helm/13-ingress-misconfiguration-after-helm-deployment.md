# Helm Incident 13 - Ingress Misconfiguration After Helm Deployment

# Enterprise DevOps Platform

---

# Purpose

This incident simulates a production outage where a Helm deployment successfully updates the Kubernetes Ingress resource, but users are unable to access the application because of an incorrect Ingress configuration.

The objective is to investigate the issue, identify the root cause, restore application availability and implement preventive measures.

---

# Incident Summary

| Field | Value |
|-------|-------|
| Incident ID | INC-HLM-013 |
| Severity | SEV-1 |
| Environment | Production |
| Application | API Gateway |
| Cluster | production-cluster |
| Namespace | api-prod |
| Reported By | External Monitoring |
| Status | Resolved |

---

# Business Impact

A production deployment completed successfully.

Immediately after deployment, external customers could not access the API Gateway.

Business impact included

- Customer login failures
- Public APIs unavailable
- Dashboard inaccessible
- HTTP 404 responses
- Revenue-impacting outage

---

# Enterprise Architecture

```
Internet

     │

     ▼

Load Balancer

     │

     ▼

Ingress Controller

     │

     ▼

Ingress

     │

     ▼

API Gateway Service

     │

     ▼

API Gateway Pods
```

Deployment Flow

```
GitHub Actions

        │

        ▼

Helm Upgrade

        │

        ▼

Ingress Updated

        │

        ▼

Routing Failure

        │

        ▼

Production Outage
```

---

# Symptoms

Deployment pipeline completed successfully.

Monitoring reported

- HTTP 404 responses
- External APIs unavailable
- Internal Pods healthy
- Kubernetes Services healthy

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

Verify Service.

```bash
kubectl get svc \
-n api-prod
```

Service healthy.

---

Verify Endpoints.

```bash
kubectl get endpoints \
-n api-prod
```

Endpoints available.

---

Verify Ingress.

```bash
kubectl get ingress \
-n api-prod
```

Ingress resource exists.

---

Describe Ingress.

```bash
kubectl describe ingress api-gateway \
-n api-prod
```

Observed

```
Host

api.internal.company.com
```

Expected

```
api.company.com
```

---

Review rendered manifest.

```bash
helm get manifest api-gateway \
-n api-prod
```

Ingress manifest contained

```yaml
host: api.internal.company.com
```

---

Review Production values.

```bash
helm get values api-gateway \
-n api-prod
```

Observed

```yaml
ingress:
  host: api.internal.company.com
```

Incorrect hostname was configured.

---

Verify DNS.

```bash
nslookup api.company.com
```

DNS pointed correctly to the Load Balancer.

---

Test external access.

```bash
curl https://api.company.com/health
```

Returned

```
404 Not Found
```

---

# Root Cause

The Production values file contained an incorrect Ingress hostname.

Ingress accepted requests only for

```
api.internal.company.com
```

External customer requests for

```
api.company.com
```

did not match any routing rule.

---

# Resolution

Update the Production values.

```yaml
ingress:
  host: api.company.com
```

Deploy the corrected chart.

```bash
helm upgrade api-gateway \
helm/charts/api-gateway \
-f values-prod.yaml \
-n api-prod
```

---

# Validation

Verify Ingress.

```bash
kubectl describe ingress api-gateway \
-n api-prod
```

Expected

```
Host

api.company.com
```

---

Verify external access.

```bash
curl https://api.company.com/health
```

Expected

```
HTTP/1.1 200 OK
```

---

Verify application.

- Login successful
- APIs accessible
- Dashboard operational
- Monitoring healthy

---

# Incident Timeline

| Time | Activity |
|------|----------|
| 11:00 | Helm upgrade completed |
| 11:03 | External monitoring failed |
| 11:05 | Incident declared |
| 11:12 | Pods verified |
| 11:18 | Service verified |
| 11:25 | Ingress investigated |
| 11:32 | Incorrect hostname identified |
| 11:40 | Helm upgrade executed |
| 11:46 | External access restored |
| 11:50 | Incident closed |

---

# Root Cause Analysis (5 Whys)

### Why were customers unable to access the application?

Ingress routing failed.

---

### Why?

Ingress hostname was incorrect.

---

### Why?

Wrong Production values were deployed.

---

### Why?

Ingress configuration was not validated.

---

### Why?

Deployment checklist lacked external routing verification.

---

# Corrective Actions

- Correct Ingress hostname.
- Redeploy Helm chart.
- Validate external routing.
- Update deployment checklist.
- Review Production values.

---

# Preventive Actions

- Validate Ingress hostnames during CI/CD.
- Test external endpoints after deployment.
- Automate DNS and routing verification.
- Review Production values during pull requests.
- Include Ingress validation in deployment pipelines.

---

# Lessons Learned

- Healthy Pods do not guarantee external availability.
- Ingress configuration is critical for customer access.
- Production routing must be validated after every deployment.
- Helm values require environment-specific verification.
- Automated endpoint testing reduces production risk.

---

# Production Best Practices

- Maintain separate values files for each environment.
- Validate Ingress manifests before deployment.
- Perform external smoke tests.
- Standardize Ingress templates.
- Monitor HTTP response codes.
- Automate DNS verification.
- Include routing validation in release approvals.

---

# Interview Questions

## Q1. Why was the application unavailable even though Pods and Services were healthy?

### Answer

Because the Ingress routing rule contained an incorrect hostname. External requests never matched the Ingress rule, so traffic was not forwarded to the Service.

---

## Q2. Which command helps verify Ingress routing?

### Answer

```bash
kubectl describe ingress api-gateway -n api-prod
```

---

## Q3. How can enterprises prevent Ingress misconfiguration?

### Answer

By validating Ingress manifests during CI/CD, performing automated external health checks, reviewing Production values and standardizing Ingress templates.

---

# Commands Reference

Status

```bash
helm status api-gateway -n api-prod
```

Ingress

```bash
kubectl describe ingress api-gateway -n api-prod
```

Service

```bash
kubectl get svc -n api-prod
```

Endpoints

```bash
kubectl get endpoints -n api-prod
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
- Service healthy होती.
- Ingress verify करा.
- Hostname तपासा.
- values-prod.yaml दुरुस्त करा.
- Helm upgrade करा.
- External validation करा.

---

# Marathi Summary (5+ Experience Revision)

या Incident मध्ये Helm deployment यशस्वी झाला आणि Pods, Services तसेच Endpoints सर्व व्यवस्थित होते, परंतु Production `values.yaml` मधील चुकीच्या Ingress hostname मुळे बाहेरील ग्राहकांना API Gateway उपलब्ध नव्हता. Investigation मध्ये `kubectl describe ingress`, `helm get manifest`, `helm get values` आणि external health checks वापरून चुकीचा hostname हा root cause असल्याचे आढळले. योग्य hostname वापरून Helm upgrade पुन्हा execute करण्यात आला आणि बाहेरील routing पूर्ववत झाली. या Incident मधून Ingress validation, DNS verification, external smoke testing आणि environment-specific Helm values यांचे Enterprise Kubernetes Production deployments मध्ये असलेले महत्त्व स्पष्ट होते.

