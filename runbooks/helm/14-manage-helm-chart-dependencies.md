# Helm Runbook 14 - Manage Helm Chart Dependencies

# Enterprise DevOps Platform

---

# Purpose

This runbook explains the standard operating procedure (SOP) for managing Helm Chart dependencies in an enterprise Kubernetes environment.

It covers validating, downloading, updating and troubleshooting chart dependencies before application deployments.

---

# Introduction

Enterprise Helm Charts often depend on other charts.

Examples include

- PostgreSQL
- Redis
- NGINX Ingress
- Prometheus
- Grafana
- Cert Manager

Helm manages these dependencies through the **Chart.yaml** file.

Proper dependency management ensures

- Consistent Deployments
- Correct Versioning
- Repeatable Builds
- Reliable CI/CD Pipelines

---

# Production Scenario

Company

ABC Bank

The API Gateway Helm Chart depends on an internal Redis Helm Chart.

A deployment pipeline fails because the required dependency package is missing.

The Platform Engineering team must validate, download and package all dependencies before the release proceeds.

---

# Enterprise Architecture

```
Application Chart

        │

        ▼

Chart.yaml

        │

        ▼

Dependencies

        │

        ▼

helm dependency build

        │

        ▼

charts/

        │

        ▼

helm package

        │

        ▼

Enterprise Repository

        │

        ▼

Production Deployment
```

---

# Investigation

Perform the following validation steps.

---

## Step 1

Verify Chart Directory.

```bash
tree helm/charts/api-gateway
```

Expected

```
Chart.yaml

values.yaml

templates/

charts/
```

---

## Step 2

Review Dependencies.

```bash
cat helm/charts/api-gateway/Chart.yaml
```

Example

```yaml
dependencies:

- name: redis
  version: 18.0.0
  repository: https://charts.bitnami.com/bitnami
```

Verify

- Dependency Name
- Version
- Repository

---

## Step 3

List Dependencies.

```bash
helm dependency list helm/charts/api-gateway
```

Review

- Dependency Name
- Repository
- Version
- Status

---

## Step 4

Check Dependency Packages.

```bash
ls helm/charts/api-gateway/charts
```

Ensure dependency packages are present.

---

## Step 5

Validate Repository Access.

```bash
helm repo list
```

Verify all dependency repositories exist.

---

## Step 6

Update Repository Metadata.

```bash
helm repo update
```

Ensure all repositories are reachable.

---

# Resolution

## Download Dependencies.

```bash
helm dependency build helm/charts/api-gateway
```

Expected

```
Saving charts

Downloading dependencies
```

---

## Update Dependencies.

```bash
helm dependency update helm/charts/api-gateway
```

This downloads newer dependency packages that satisfy the version constraints.

---

## Verify Downloaded Packages.

```bash
ls helm/charts/api-gateway/charts
```

Example

```
redis-18.0.0.tgz
```

---

## Validate Chart.

```bash
helm lint helm/charts/api-gateway
```

Expected

```
0 chart(s) failed
```

---

## Render Templates.

```bash
helm template api-gateway \
helm/charts/api-gateway
```

Ensure all dependency templates render successfully.

---

## Package the Chart.

```bash
helm package helm/charts/api-gateway
```

---

# Validation

Verify

```bash
helm dependency list helm/charts/api-gateway
```

Verify

```bash
helm dependency build helm/charts/api-gateway
```

Verify

```bash
helm lint helm/charts/api-gateway
```

Verify

```bash
helm template api-gateway \
helm/charts/api-gateway
```

Verify

```bash
helm package helm/charts/api-gateway
```

Confirm

- Dependencies Downloaded
- Templates Render
- Chart Packages Successfully

---

# Rollback

If dependency updates introduce issues

Restore the previous

- Chart.yaml
- Chart.lock
- Dependency Packages

Rebuild dependencies.

```bash
helm dependency build helm/charts/api-gateway
```

Validate before packaging again.

---

# Dependency Management Checklist

Verify

- Dependency Repository
- Dependency Version
- Repository Access
- Dependency Download
- Dependency Package
- Template Rendering
- Successful Packaging
- CI/CD Compatibility

---

# Production Best Practices

- Pin dependency versions.
- Use approved Enterprise repositories.
- Commit the Chart.lock file.
- Validate dependencies before packaging.
- Keep dependencies updated through controlled release processes.
- Avoid using floating versions.
- Test dependency upgrades in lower environments.

---

# Common Mistakes

- Forgetting to download dependencies.
- Using incorrect repository URLs.
- Deleting the charts directory accidentally.
- Ignoring dependency version conflicts.
- Using untested dependency upgrades.
- Not committing Chart.lock.

---

# Interview Questions

## Q1. Why are Helm dependencies used?

### Answer

Dependencies allow applications to reuse other Helm Charts while maintaining version consistency and simplifying deployments.

---

## Q2. Which command downloads chart dependencies?

```bash
helm dependency build helm/charts/api-gateway
```

---

## Q3. What is the difference between `helm dependency build` and `helm dependency update`?

### Answer

`helm dependency build` installs dependencies based on the existing `Chart.lock` file, ensuring reproducible builds.

`helm dependency update` resolves dependency versions from repositories, downloads updated packages and regenerates the `Chart.lock` file.

---

# Commands Reference

List Dependencies

```bash
helm dependency list helm/charts/api-gateway
```

Build Dependencies

```bash
helm dependency build helm/charts/api-gateway
```

Update Dependencies

```bash
helm dependency update helm/charts/api-gateway
```

Repository Update

```bash
helm repo update
```

Validate

```bash
helm lint helm/charts/api-gateway
```

Template

```bash
helm template api-gateway helm/charts/api-gateway
```

Package

```bash
helm package helm/charts/api-gateway
```

---

# Marathi Quick Revision

- Chart.yaml तपासा.
- Dependencies verify करा.
- helm repo update करा.
- helm dependency build करा.
- helm lint करा.
- helm template verify करा.
- Package तयार करा.

---

# Marathi Summary (5+ Experience Revision)

या Runbook मध्ये Helm Chart Dependencies व्यवस्थापित करण्याची Enterprise SOP समजावली आहे. Chart.yaml मधील dependencies, repositories आणि versions validate करून `helm dependency build` किंवा `helm dependency update` वापरून आवश्यक charts डाउनलोड केले जातात. त्यानंतर lint, template rendering आणि package validation करूनच chart release केला जातो. Chart.lock वापरून reproducible builds, version consistency आणि reliable CI/CD deployments सुनिश्चित करणे ही Enterprise Platform Engineering मधील महत्त्वाची पद्धत आहे.

