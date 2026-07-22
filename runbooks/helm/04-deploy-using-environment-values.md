# Helm Runbook 04 - Deploy Using Environment Values

# Enterprise DevOps Platform

---

# Purpose

This runbook explains the standard operating procedure (SOP) for deploying a Helm Release using environment-specific values files.

It ensures that the same Helm Chart can be safely deployed across Development, QA, UAT and Production environments without modifying application templates.

---

# Introduction

Enterprise organizations maintain a single reusable Helm Chart.

Environment-specific configurations are stored separately in values files.

Typical files include

```
values.yaml

values-dev.yaml

values-qa.yaml

values-uat.yaml

values-prod.yaml
```

This approach minimizes duplication and ensures consistent deployments.

---

# Production Scenario

Company

ABC Bank

The Platform Team is deploying API Gateway version **2.1.0**.

The same Helm Chart must be deployed into multiple environments.

```
Development

↓

QA

↓

UAT

↓

Production
```

Each environment has different

- Replica Count
- Resource Limits
- Image Tag
- Hostname
- Environment Variables

---

# Enterprise Architecture

```
Single Helm Chart

        │

        ├────────────┐

        │            │

        ▼            ▼

values-dev     values-qa

        │            │

        ▼            ▼

Development     QA

        │

        ▼

values-prod

        │

        ▼

Production
```

---

# Investigation

Before deployment verify the following.

## Kubernetes Context

```bash
kubectl config current-context
```

Expected

```
production-cluster
```

---

## Verify Namespace

```bash
kubectl get namespace api-prod
```

Expected

```
api-prod
```

---

## Verify Helm Chart

```bash
helm lint helm/charts/api-gateway
```

Expected

```
0 chart(s) failed
```

---

## Verify Available Values Files

```bash
ls helm/charts/api-gateway
```

Expected

```
values.yaml

values-dev.yaml

values-qa.yaml

values-uat.yaml

values-prod.yaml
```

---

## Review Production Configuration

```bash
cat helm/charts/api-gateway/values-prod.yaml
```

Verify

- Replica Count
- Image
- Resources
- Service
- Environment Variables

---

## Validate Templates

```bash
helm template api-gateway \
helm/charts/api-gateway \
-f helm/charts/api-gateway/values-prod.yaml
```

Review

- Deployment
- Service
- Labels
- Resources
- Image Tag

---

## Dry Run

```bash
helm upgrade \
--install api-gateway \
helm/charts/api-gateway \
-f helm/charts/api-gateway/values-prod.yaml \
-n api-prod \
--dry-run \
--debug
```

Deployment should complete without validation errors.

---

# Resolution

Deploy using the Production values file.

```bash
helm upgrade \
--install api-gateway \
helm/charts/api-gateway \
-f helm/charts/api-gateway/values-prod.yaml \
-n api-prod
```

Expected

```
STATUS

deployed
```

---

# Validation

## Verify Helm Release

```bash
helm status api-gateway \
-n api-prod
```

---

## Verify Applied Values

```bash
helm get values api-gateway \
-n api-prod
```

Confirm that the deployed configuration matches the production values file.

---

## Verify Deployment

```bash
kubectl get deployment \
-n api-prod
```

---

## Verify Pods

```bash
kubectl get pods \
-n api-prod
```

Expected

```
Running
```

---

## Verify Services

```bash
kubectl get svc \
-n api-prod
```

---

## Verify Rollout

```bash
kubectl rollout status deployment/api-gateway-api-gateway \
-n api-prod
```

---

## Verify Logs

```bash
kubectl logs deployment/api-gateway-api-gateway \
-n api-prod
```

Ensure there are no

- Startup Errors
- Configuration Errors
- Resource Failures

---

# Rollback

View release history.

```bash
helm history api-gateway \
-n api-prod
```

Rollback if required.

```bash
helm rollback api-gateway <REVISION> \
-n api-prod
```

Verify rollout.

```bash
kubectl rollout status deployment/api-gateway-api-gateway \
-n api-prod
```

---

# Environment Deployment Examples

Development

```bash
helm upgrade \
--install api-gateway \
helm/charts/api-gateway \
-f helm/charts/api-gateway/values-dev.yaml \
-n api-dev
```

---

QA

```bash
helm upgrade \
--install api-gateway \
helm/charts/api-gateway \
-f helm/charts/api-gateway/values-qa.yaml \
-n api-qa
```

---

UAT

```bash
helm upgrade \
--install api-gateway \
helm/charts/api-gateway \
-f helm/charts/api-gateway/values-uat.yaml \
-n api-uat
```

---

Production

```bash
helm upgrade \
--install api-gateway \
helm/charts/api-gateway \
-f helm/charts/api-gateway/values-prod.yaml \
-n api-prod
```

---

# Validation Checklist

Verify

- Correct Kubernetes Context
- Correct Namespace
- Correct Values File
- Helm Release
- Pods
- Deployment
- Rollout
- Logs
- Monitoring Dashboard
- Application Health

---

# Production Best Practices

- Maintain one Helm Chart for all environments.
- Store only environment-specific configuration in values files.
- Use meaningful values file names.
- Never modify templates for environment-specific settings.
- Validate production values before deployment.
- Use version control for all values files.
- Review configuration changes during code reviews.

---

# Common Mistakes

- Using the wrong values file.
- Deploying Production with Development configuration.
- Editing templates instead of values files.
- Skipping dry-run validation.
- Forgetting to verify applied values after deployment.

---

# Interview Questions

## Q1. Why use environment-specific values files?

### Answer

They allow the same Helm Chart to be reused across multiple environments while keeping configuration separate from application templates.

---

## Q2. Which option specifies a custom values file?

```bash
-f values-prod.yaml
```

---

## Q3. How can you verify which values were applied to a release?

```bash
helm get values api-gateway
```

---

# Commands Reference

Validate

```bash
helm lint helm/charts/api-gateway
```

Render Templates

```bash
helm template api-gateway \
helm/charts/api-gateway \
-f helm/charts/api-gateway/values-prod.yaml
```

Deploy

```bash
helm upgrade \
--install api-gateway \
helm/charts/api-gateway \
-f helm/charts/api-gateway/values-prod.yaml \
-n api-prod
```

Verify Values

```bash
helm get values api-gateway \
-n api-prod
```

Rollback

```bash
helm rollback api-gateway <REVISION> \
-n api-prod
```

---

# Marathi Quick Revision

- योग्य values file निवडा.
- helm lint करा.
- helm template verify करा.
- Dry Run करा.
- helm upgrade --install वापरा.
- helm get values verify करा.
- Rollback तयार ठेवा.

---

# Marathi Summary (5+ Experience Revision)

या Runbook मध्ये environment-specific values files वापरून Helm deployment करण्याची Enterprise SOP समजावली आहे. एकच Helm Chart Development, QA, UAT आणि Production मध्ये वापरला जातो, तर प्रत्येक environment साठी स्वतंत्र values file ठेवली जाते. Deployment पूर्वी values validation, template rendering आणि dry-run करणे आवश्यक आहे. Deployment नंतर `helm get values`, rollout status, Pods आणि application health verify करून योग्य configuration लागू झाल्याची खात्री करणे ही Enterprise DevOps best practice आहे.

