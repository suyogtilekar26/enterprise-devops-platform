# Helm Runbook 06 - Validate Helm Chart Before Deployment

# Enterprise DevOps Platform

---

# Purpose

This runbook explains the standard operating procedure (SOP) for validating a Helm Chart before deploying it into a Kubernetes cluster.

Chart validation is a mandatory production gate that helps identify configuration issues before they impact running workloads.

---

# Introduction

Production deployments should never begin immediately after modifying a Helm Chart.

Every deployment must pass validation checks to ensure:

- Chart Syntax
- Template Rendering
- Values Validation
- Kubernetes Manifest Generation
- Deployment Simulation

These validation steps reduce deployment failures and improve production stability.

---

# Production Scenario

Company

ABC Bank

The Platform Team has prepared API Gateway version **2.2.0** for deployment.

Before CAB approval, engineers must validate the chart.

The deployment is allowed only after all validation checks pass successfully.

---

# Enterprise Architecture

```
Developer

        │

        ▼

GitHub

        │

        ▼

Helm Chart

        │

        ▼

Validation

        │

 ┌───────────────┐

 ▼               ▼

Lint         Template

        │

        ▼

Dry Run

        │

        ▼

Production Approval

        │

        ▼

Deployment
```

---

# Investigation

Before validation verify the following.

## Kubernetes Context

```bash
kubectl config current-context
```

Expected

```
production-cluster
```

---

## Verify Helm Version

```bash
helm version
```

---

## Verify Chart Structure

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

## Verify Chart Metadata

```bash
cat helm/charts/api-gateway/Chart.yaml
```

Verify

- Chart Version
- App Version
- Description
- Name

---

## Verify Production Values

```bash
cat helm/charts/api-gateway/values-prod.yaml
```

Confirm

- Image
- Replica Count
- Resources
- Service Configuration
- Environment Variables

---

# Resolution

## Step 1

Run Helm Lint.

```bash
helm lint helm/charts/api-gateway
```

Expected

```
1 chart(s) linted

0 chart(s) failed
```

Resolve all lint warnings before continuing.

---

## Step 2

Render Kubernetes Manifests.

```bash
helm template api-gateway \
helm/charts/api-gateway \
-f helm/charts/api-gateway/values-prod.yaml
```

Verify

- Deployment
- Service
- Labels
- Selectors
- Resources

No template rendering errors should occur.

---

## Step 3

Generate Manifest File.

```bash
helm template api-gateway \
helm/charts/api-gateway \
-f helm/charts/api-gateway/values-prod.yaml \
> rendered.yaml
```

Review

```bash
cat rendered.yaml
```

---

## Step 4

Perform Installation Simulation.

```bash
helm install api-gateway \
helm/charts/api-gateway \
-f helm/charts/api-gateway/values-prod.yaml \
--dry-run
```

Expected

```
STATUS

pending-install
```

No Kubernetes resources are created.

---

## Step 5

Perform Debug Validation.

```bash
helm install api-gateway \
helm/charts/api-gateway \
-f helm/charts/api-gateway/values-prod.yaml \
--dry-run \
--debug
```

Verify

- Rendered YAML
- Values
- Release Metadata
- Hooks
- Deployment Objects

---

## Step 6

Validate Dependencies.

```bash
helm dependency list helm/charts/api-gateway
```

Confirm

- Dependencies
- Versions
- Status

---

## Step 7

Package Verification.

```bash
helm package helm/charts/api-gateway
```

Inspect

```bash
helm show chart api-gateway-*.tgz
```

Verify

- Name
- Version
- Description
- App Version

---

# Validation

Confirm

- Chart Structure
- Lint Passed
- Templates Render Successfully
- Dry Run Successful
- Debug Output Reviewed
- Dependencies Verified
- Package Created Successfully

---

# Rollback

Validation activities do not modify the Kubernetes cluster.

If validation fails

- Stop deployment.
- Fix the identified issue.
- Repeat the complete validation process.
- Obtain deployment approval before retrying.

Do not bypass validation.

---

# Production Validation Checklist

Verify

- Correct Kubernetes Context
- Chart Metadata
- Values File
- Helm Lint
- Template Rendering
- Dry Run
- Debug Output
- Dependency Status
- Package Creation

Deployment must not begin until every item is complete.

---

# Production Best Practices

- Run `helm lint` after every chart modification.
- Validate with production values.
- Review rendered manifests during peer review.
- Always perform a dry run before deployment.
- Package only validated charts.
- Automate validation inside CI/CD pipelines.
- Reject deployments with validation warnings or errors.

---

# Common Mistakes

- Skipping lint validation.
- Rendering templates with the wrong values file.
- Ignoring template warnings.
- Deploying without a dry run.
- Packaging unvalidated charts.
- Reviewing templates instead of rendered manifests.

---

# Interview Questions

## Q1. Why should a Helm Chart be validated before deployment?

### Answer

Validation detects configuration, templating and deployment issues before they affect the Kubernetes cluster, reducing production risk.

---

## Q2. Which command validates Helm Chart syntax?

```bash
helm lint helm/charts/api-gateway
```

---

## Q3. What is the purpose of `helm template`?

### Answer

It renders Kubernetes manifests locally so engineers can review the final YAML before deployment.

---

## Q4. Why use `--dry-run --debug`?

### Answer

It simulates the deployment while providing detailed execution information, allowing engineers to verify chart behavior without creating Kubernetes resources.

---

# Commands Reference

Lint

```bash
helm lint helm/charts/api-gateway
```

Template

```bash
helm template api-gateway \
helm/charts/api-gateway \
-f helm/charts/api-gateway/values-prod.yaml
```

Dry Run

```bash
helm install api-gateway \
helm/charts/api-gateway \
-f helm/charts/api-gateway/values-prod.yaml \
--dry-run
```

Debug

```bash
helm install api-gateway \
helm/charts/api-gateway \
-f helm/charts/api-gateway/values-prod.yaml \
--dry-run \
--debug
```

Dependencies

```bash
helm dependency list helm/charts/api-gateway
```

Package

```bash
helm package helm/charts/api-gateway
```

---

# Marathi Quick Revision

- Chart structure तपासा.
- helm lint करा.
- helm template verify करा.
- Dry Run करा.
- Debug output तपासा.
- Dependencies verify करा.
- Package तयार करा.
- Validation पूर्ण झाल्यावरच deploy करा.

---

# Marathi Summary (5+ Experience Revision)

या Runbook मध्ये Production deployment पूर्वी Helm Chart validate करण्याची Enterprise SOP समजावली आहे. Validation मध्ये `helm lint`, `helm template`, `--dry-run`, `--debug`, dependency verification आणि package validation यांचा समावेश असतो. या सर्व टप्प्यांमुळे deployment पूर्वीच configuration, template आणि manifest संबंधित त्रुटी शोधता येतात. Enterprise DevOps आणि Platform Engineering टीममध्ये ही validation प्रक्रिया CI/CD pipeline मधील अनिवार्य quality gate म्हणून वापरली जाते.

