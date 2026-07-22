# Helm Incident 14 - Helm Dependency Resolution Failure

# Enterprise DevOps Platform

---

# Purpose

This incident simulates a production deployment failure caused by unresolved Helm chart dependencies.

The objective is to investigate why the deployment failed, restore the deployment pipeline and implement preventive controls for future releases.

---

# Incident Summary

| Field | Value |
|-------|-------|
| Incident ID | INC-HLM-014 |
| Severity | SEV-2 |
| Environment | Production |
| Application | API Gateway |
| Cluster | production-cluster |
| Namespace | api-prod |
| Reported By | GitHub Actions Deployment Pipeline |
| Status | Resolved |

---

# Business Impact

A scheduled production deployment failed before Kubernetes resources were created.

Business impact included

- Production release delayed
- Emergency bug fixes blocked
- CI/CD deployment failed
- Release window exceeded
- Change approval extended

---

# Enterprise Architecture

```
GitHub Actions

        │

        ▼

Helm Chart

        │

        ▼

Chart Dependencies

        │

        ▼

Redis Chart

        │

        ▼

PostgreSQL Chart

        │

        ▼

Kubernetes Cluster
```

Deployment Flow

```
GitHub Actions

        │

        ▼

helm dependency build

        │

        ▼

FAILED

        │

        ▼

Deployment Blocked
```

---

# Symptoms

Deployment pipeline failed.

Observed

```
Error:

found in Chart.yaml, but missing in charts/ directory
```

Pipeline stopped before Helm Upgrade.

---

# Initial Investigation

Verify chart dependencies.

```bash
cat helm/charts/api-gateway/Chart.yaml
```

Observed

```yaml
dependencies:
  - name: redis
  - name: postgresql
```

---

Verify dependency directory.

```bash
ls helm/charts/api-gateway/charts
```

Output

```
postgresql-12.1.9.tgz
```

Redis dependency missing.

---

Verify dependency status.

```bash
helm dependency list \
helm/charts/api-gateway
```

Observed

```
redis

Missing
```

---

Attempt dependency build.

```bash
helm dependency build \
helm/charts/api-gateway
```

Output

```
Error

repository not found
```

---

Verify repositories.

```bash
helm repo list
```

Observed

```
Bitnami repository missing
```

---

Verify Chart.lock.

```bash
cat helm/charts/api-gateway/Chart.lock
```

Lock file referenced Redis dependency.

---

# Root Cause

The Helm repository containing the Redis dependency had not been configured in the deployment environment.

As a result

- Dependency download failed.
- Required chart package was unavailable.
- Deployment pipeline terminated.

---

# Resolution

Add the missing repository.

```bash
helm repo add bitnami https://charts.bitnami.com/bitnami
```

Update repositories.

```bash
helm repo update
```

Build dependencies.

```bash
helm dependency build \
helm/charts/api-gateway
```

Verify downloaded packages.

```bash
ls helm/charts/api-gateway/charts
```

Retry deployment.

```bash
helm upgrade api-gateway \
helm/charts/api-gateway \
-f values-prod.yaml \
-n api-prod
```

---

# Validation

Verify dependency list.

```bash
helm dependency list \
helm/charts/api-gateway
```

Expected

```
STATUS

ok
```

---

Verify dependency directory.

```bash
ls helm/charts/api-gateway/charts
```

Expected

```
postgresql-*.tgz

redis-*.tgz
```

---

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

Business Validation

- Deployment pipeline completed
- API Gateway operational
- Dependencies deployed
- Monitoring healthy

---

# Incident Timeline

| Time | Activity |
|------|----------|
| 09:00 | Deployment started |
| 09:02 | Dependency build failed |
| 09:05 | Incident declared |
| 09:12 | Chart investigation started |
| 09:18 | Missing repository identified |
| 09:24 | Repository added |
| 09:28 | Dependencies downloaded |
| 09:35 | Deployment executed |
| 09:42 | Validation completed |
| 09:45 | Incident closed |

---

# Root Cause Analysis (5 Whys)

### Why did deployment fail?

Helm dependency build failed.

---

### Why?

A required dependency was unavailable.

---

### Why?

The dependency repository was missing.

---

### Why?

The deployment environment was not initialized.

---

### Why?

CI/CD pipeline did not validate Helm repositories before deployment.

---

# Corrective Actions

- Add required Helm repositories.
- Download dependencies.
- Verify Chart.lock.
- Retry deployment.
- Update deployment documentation.

---

# Preventive Actions

- Execute `helm dependency build` in CI.
- Validate repositories before deployment.
- Store dependency versions in Chart.lock.
- Cache dependencies in build pipelines.
- Review dependency updates during pull requests.
- Standardize deployment environments.

---

# Lessons Learned

- Helm dependencies must be available before deployment.
- Repository configuration is part of deployment readiness.
- Dependency validation should be automated.
- Chart.lock improves deployment consistency.
- CI/CD should validate dependency resolution.

---

# Production Best Practices

- Maintain approved Helm repositories.
- Commit Chart.lock to version control.
- Validate dependencies in CI/CD.
- Pin dependency versions.
- Use internal artifact repositories where possible.
- Automate dependency downloads.
- Monitor repository availability.

---

# Interview Questions

## Q1. Why does Helm dependency resolution fail?

### Answer

Because one or more required chart dependencies cannot be downloaded due to missing repositories, unavailable packages or incorrect dependency definitions.

---

## Q2. Which command downloads chart dependencies?

### Answer

```bash
helm dependency build helm/charts/api-gateway
```

---

## Q3. How can enterprises prevent dependency-related deployment failures?

### Answer

By maintaining approved repositories, validating dependencies in CI/CD, committing Chart.lock, caching dependencies and using internal chart repositories.

---

# Commands Reference

Dependency List

```bash
helm dependency list \
helm/charts/api-gateway
```

Dependency Build

```bash
helm dependency build \
helm/charts/api-gateway
```

Repository List

```bash
helm repo list
```

Repository Add

```bash
helm repo add bitnami https://charts.bitnami.com/bitnami
```

Repository Update

```bash
helm repo update
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

- Deployment fail झाला.
- Chart dependencies तपासा.
- helm dependency list करा.
- Missing repository शोधा.
- helm repo add करा.
- helm dependency build करा.
- Deployment पुन्हा करा.
- Validation करा.

---

# Marathi Summary (5+ Experience Revision)

या Incident मध्ये Production Helm deployment आवश्यक chart dependency उपलब्ध नसल्यामुळे अयशस्वी झाला. Investigation दरम्यान `Chart.yaml`, `Chart.lock`, `helm dependency list` आणि `helm repo list` वापरून Redis chart repository उपलब्ध नसल्याचे आढळले. आवश्यक Helm repository जोडून `helm dependency build` पुन्हा execute करण्यात आले आणि deployment यशस्वीरीत्या पूर्ण झाले. या Incident मधून Helm dependency management, Chart.lock, repository validation आणि CI/CD dependency checks यांचे Enterprise Production deployments मध्ये असलेले महत्त्व स्पष्ट होते.

