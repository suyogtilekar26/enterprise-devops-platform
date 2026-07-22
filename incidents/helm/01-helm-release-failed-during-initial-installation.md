# Helm Incident 01 - Helm Release Failed During Initial Installation

# Enterprise DevOps Platform

---

# Purpose

This incident simulates a production scenario where the initial Helm installation of the API Gateway application fails.

The objective is to investigate the failure, identify the root cause, restore the deployment and document preventive actions using Enterprise Incident Management practices.

---

# Incident Summary

| Field | Value |
|-------|-------|
| Incident ID | INC-HLM-001 |
| Severity | SEV-2 |
| Environment | Production |
| Application | API Gateway |
| Cluster | production-cluster |
| Namespace | api-prod |
| Reported By | GitHub Actions Deployment Pipeline |
| Status | Resolved |

---

# Business Impact

The initial production deployment of the API Gateway failed.

Business impact included

- Public APIs unavailable
- Mobile application unable to authenticate users
- Internal Dashboard inaccessible
- Release window delayed
- Production deployment blocked

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

Helm Install

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
helm install

FAILED
```

Engineers observed

- Release not deployed
- Pods not created
- Deployment missing
- Service missing

Pipeline log

```
INSTALLATION FAILED
```

---

# Initial Investigation

Verify cluster.

```bash
kubectl config current-context
```

---

Verify namespace.

```bash
kubectl get ns
```

---

Check Helm releases.

```bash
helm list \
-n api-prod
```

Release not present.

---

Attempt installation again.

```bash
helm install api-gateway \
helm/charts/api-gateway \
-n api-prod
```

Returned

```
INSTALLATION FAILED
```

---

Validate chart.

```bash
helm lint helm/charts/api-gateway
```

Output

```
Error

template validation failed
```

---

Render templates.

```bash
helm template api-gateway \
helm/charts/api-gateway
```

Template rendering failed.

---

Review Chart.yaml.

```bash
cat helm/charts/api-gateway/Chart.yaml
```

Incorrect chart metadata discovered.

---

Review deployment template.

```bash
cat templates/deployment.yaml
```

Template contained an invalid reference.

---

# Root Cause

Deployment template referenced a values key that did not exist.

Example

```
.image.repositoryy
```

instead of

```
.image.repository
```

Helm template rendering failed before Kubernetes resources could be created.

---

# Resolution

Correct the template.

Validate chart.

```bash
helm lint helm/charts/api-gateway
```

Render manifests.

```bash
helm template api-gateway \
helm/charts/api-gateway
```

Install release.

```bash
helm install api-gateway \
helm/charts/api-gateway \
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

Verify deployment.

```bash
kubectl get deployment \
-n api-prod
```

---

Verify pods.

```bash
kubectl get pods \
-n api-prod
```

Expected

```
Running
```

---

Verify service.

```bash
kubectl get svc \
-n api-prod
```

---

Verify endpoints.

```bash
kubectl get endpoints \
-n api-prod
```

---

Application validation

- Login successful
- API accessible
- Dashboard working
- Health endpoint healthy

---

# Incident Timeline

| Time | Activity |
|------|----------|
| 09:00 | Deployment started |
| 09:02 | Helm install failed |
| 09:05 | Incident opened |
| 09:10 | Chart validation performed |
| 09:18 | Template issue identified |
| 09:28 | Template corrected |
| 09:32 | Installation successful |
| 09:40 | Validation completed |
| 09:45 | Incident closed |

---

# Root Cause Analysis (5 Whys)

### Why did deployment fail?

Helm installation failed.

---

### Why?

Template rendering failed.

---

### Why?

Deployment template referenced an invalid values key.

---

### Why?

Template changes were not validated.

---

### Why?

CI pipeline did not execute Helm lint and template validation before deployment.

---

# Corrective Actions

- Correct deployment template.
- Validate chart before installation.
- Execute Helm lint in CI.
- Execute Helm template in CI.
- Review chart during code review.

---

# Preventive Actions

- Make Helm lint mandatory.
- Block deployments on template validation failures.
- Add pull request review checklist.
- Introduce automated Helm testing.
- Implement chart quality gates.

---

# Lessons Learned

- Never deploy unvalidated charts.
- Helm template catches many deployment issues.
- CI/CD validation prevents production failures.
- Template reviews are essential.
- Chart testing should be automated.

---

# Production Best Practices

- Validate every chart.
- Render templates before deployment.
- Keep chart versions controlled.
- Automate chart testing.
- Deploy only through CI/CD.
- Maintain rollback procedures.
- Record deployment evidence.

---

# Interview Questions

## Q1. Why can Helm install fail before creating Kubernetes resources?

### Answer

Helm first renders templates locally. Invalid templates or incorrect values prevent Kubernetes resources from being generated.

---

## Q2. Which commands should always be executed before Helm install?

### Answer

```bash
helm lint

helm template
```

---

## Q3. How can enterprises prevent template-related deployment failures?

### Answer

By integrating Helm lint, template rendering, automated testing and peer review into the CI/CD pipeline.

---

# Commands Reference

Validate

```bash
helm lint helm/charts/api-gateway
```

Render

```bash
helm template api-gateway \
helm/charts/api-gateway
```

Install

```bash
helm install api-gateway \
helm/charts/api-gateway \
-n api-prod
```

Status

```bash
helm status api-gateway \
-n api-prod
```

Pods

```bash
kubectl get pods \
-n api-prod
```

---

# Marathi Quick Revision

- helm install fail झाला.
- helm lint करा.
- helm template verify करा.
- Template bug शोधा.
- Fix करा.
- पुन्हा install करा.
- Validation करा.

---

# Marathi Summary (5+ Experience Revision)

या Incident मध्ये API Gateway चे प्रारंभिक Helm installation template error मुळे अयशस्वी झाले. Investigation दरम्यान `helm lint` आणि `helm template` वापरून deployment template मधील चुकीचा values reference शोधण्यात आला. Template दुरुस्त करून chart पुन्हा validate करण्यात आला आणि Helm install यशस्वी झाला. या Incident मधून Production deployment पूर्वी automated chart validation, CI/CD quality gates आणि peer review यांचे महत्त्व स्पष्ट होते.

