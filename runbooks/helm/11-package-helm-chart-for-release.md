# Helm Runbook 11 - Package Helm Chart for Release

# Enterprise DevOps Platform

---

# Purpose

This runbook explains the standard operating procedure (SOP) for packaging a Helm Chart before publishing it to an enterprise Helm Repository.

Packaging creates an immutable deployment artifact that can be versioned, stored, promoted across environments and deployed consistently.

---

# Introduction

Enterprise organizations never deploy Helm Charts directly from a developer's workstation.

Instead, the deployment workflow is

```
Source Chart

↓

Validation

↓

Package

↓

Artifact Repository

↓

CI/CD Pipeline

↓

Production Deployment
```

This guarantees repeatable and auditable deployments.

---

# Production Scenario

Company

ABC Bank

The Platform Engineering Team has completed development of API Gateway version **2.2.0**.

Before the release can be promoted to Production, the Helm Chart must be packaged and published to the internal Helm Repository.

---

# Enterprise Architecture

```
Developer

        │

        ▼

Git Repository

        │

        ▼

Helm Chart

        │

        ▼

helm lint

        │

        ▼

helm package

        │

        ▼

api-gateway-2.2.0.tgz

        │

        ▼

Enterprise Helm Repository

        │

        ▼

CI/CD Pipeline

        │

        ▼

Production Kubernetes
```

---

# Investigation

Perform the following validation before packaging.

---

## Step 1

Verify Kubernetes Context.

```bash
kubectl config current-context
```

---

## Step 2

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

## Step 3

Review Chart Metadata.

```bash
cat helm/charts/api-gateway/Chart.yaml
```

Verify

- Name
- Description
- Version
- App Version

Ensure the version has been updated for the new release.

---

## Step 4

Validate Chart.

```bash
helm lint helm/charts/api-gateway
```

Expected

```
0 chart(s) failed
```

---

## Step 5

Validate Templates.

```bash
helm template api-gateway \
helm/charts/api-gateway \
-f helm/charts/api-gateway/values-prod.yaml
```

Ensure all templates render successfully.

---

## Step 6

Verify Dependencies.

```bash
helm dependency list helm/charts/api-gateway
```

Confirm

- Dependency Versions
- Dependency Status

---

# Resolution

## Package the Helm Chart.

```bash
helm package helm/charts/api-gateway
```

Expected

```
Successfully packaged chart and saved it to

api-gateway-2.2.0.tgz
```

---

## Verify Package.

```bash
ls *.tgz
```

Expected

```
api-gateway-2.2.0.tgz
```

---

## Inspect Package Metadata.

```bash
helm show chart api-gateway-2.2.0.tgz
```

Verify

- Chart Name
- Version
- Description
- App Version

---

## Inspect Default Values.

```bash
helm show values api-gateway-2.2.0.tgz
```

Confirm

- Replica Count
- Image
- Resources
- Service

---

## Validate Package Rendering.

```bash
helm template api-gateway api-gateway-2.2.0.tgz
```

Verify rendered Kubernetes manifests.

---

## Test Package Installation.

```bash
helm install api-gateway-test \
api-gateway-2.2.0.tgz
```

Verify

```bash
helm status api-gateway-test
```

---

## Cleanup Test Release.

```bash
helm uninstall api-gateway-test
```

---

# Validation

Verify

```bash
helm show chart api-gateway-2.2.0.tgz
```

Verify

```bash
helm show values api-gateway-2.2.0.tgz
```

Verify

```bash
helm template api-gateway api-gateway-2.2.0.tgz
```

Verify

```bash
helm install api-gateway-test api-gateway-2.2.0.tgz
```

Confirm

- Package Integrity
- Successful Rendering
- Successful Installation

---

# Rollback

Packaging itself does not modify Kubernetes resources.

If packaging validation fails

- Correct Chart.yaml
- Correct Templates
- Resolve Dependency Issues
- Repeat Validation
- Create a new package

Do not publish invalid chart packages.

---

# Production Release Checklist

Verify

- Chart Version Updated
- App Version Updated
- Lint Passed
- Templates Render Successfully
- Dependencies Verified
- Package Created
- Test Installation Successful
- Package Ready for Repository Upload

---

# Production Best Practices

- Always increment chart versions before packaging.
- Never overwrite an existing released package.
- Validate every package before publishing.
- Use Semantic Versioning.
- Store packages in an enterprise Helm Repository.
- Keep package artifacts immutable.
- Package only from approved source code.

---

# Common Mistakes

- Forgetting to update Chart.yaml version.
- Packaging charts with lint errors.
- Publishing untested packages.
- Modifying packaged archives manually.
- Overwriting existing chart versions.
- Ignoring dependency validation.

---

# Interview Questions

## Q1. Why do enterprises package Helm Charts?

### Answer

Packaging creates immutable, versioned deployment artifacts that can be stored, promoted and deployed consistently across multiple environments.

---

## Q2. Which command packages a Helm Chart?

```bash
helm package helm/charts/api-gateway
```

---

## Q3. Why should a packaged chart be tested before publishing?

### Answer

Testing ensures the packaged artifact is valid, deployable and contains the expected templates and configuration before it is promoted to higher environments.

---

# Commands Reference

Validate

```bash
helm lint helm/charts/api-gateway
```

Template

```bash
helm template api-gateway \
helm/charts/api-gateway
```

Package

```bash
helm package helm/charts/api-gateway
```

Show Chart

```bash
helm show chart api-gateway-2.2.0.tgz
```

Show Values

```bash
helm show values api-gateway-2.2.0.tgz
```

Test Install

```bash
helm install api-gateway-test api-gateway-2.2.0.tgz
```

Cleanup

```bash
helm uninstall api-gateway-test
```

---

# Marathi Quick Revision

- Chart version अपडेट करा.
- helm lint करा.
- helm template verify करा.
- helm package करा.
- Package verify करा.
- Test install करा.
- मगच Repository मध्ये publish करा.

---

# Marathi Summary (5+ Experience Revision)

या Runbook मध्ये Enterprise Helm Chart Release Package तयार करण्याची SOP समजावली आहे. Production मध्ये source chart deploy न करता versioned `.tgz` package वापरले जाते. Package तयार करण्यापूर्वी chart metadata, lint, template rendering आणि dependencies validate करणे आवश्यक आहे. Package तयार झाल्यानंतर त्याची test installation करूनच तो Enterprise Helm Repository मध्ये publish केला जातो. Immutable artifacts, version control आणि repeatable deployments या Enterprise DevOps प्रक्रियेतील अत्यंत महत्त्वाच्या संकल्पना आहेत.

