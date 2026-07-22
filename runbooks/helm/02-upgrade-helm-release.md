# Helm Runbook 02 - Upgrade a Helm Release

# Enterprise DevOps Platform

---

# Purpose

This runbook explains the standard operating procedure (SOP) for upgrading an existing Helm Release in a Kubernetes cluster.

It covers pre-upgrade validation, deployment execution, health verification, rollback readiness and production best practices.

---

# Introduction

Application upgrades are among the most common production operations.

In enterprise environments, upgrades must be:

- Planned
- Tested
- Version Controlled
- Validated
- Monitored
- Rollback Ready

Helm provides release versioning that enables controlled application upgrades with minimal downtime.

---

# Production Scenario

Company

ABC Bank

The Platform Team needs to upgrade the API Gateway from version **1.0.0** to **2.0.0**.

Deployment Details

```
Application

API Gateway

Current Version

1.0.0

Target Version

2.0.0

Deployment Tool

Helm

Namespace

api-prod
```

The upgrade must complete with zero downtime.

---

# Enterprise Architecture

```
GitHub

        │

        ▼

Docker Image

        │

        ▼

Container Registry

        │

        ▼

Updated Helm Chart

        │

        ▼

values-prod.yaml

        │

        ▼

helm upgrade

        │

        ▼

Rolling Update

        │

        ▼

Production Pods
```

---

# Investigation

Before performing the upgrade verify the following.

## Kubernetes Context

```bash
kubectl config current-context
```

Expected

```
production-cluster
```

---

## Cluster Health

```bash
kubectl get nodes
```

Verify

```
Ready
```

---

## Existing Release

```bash
helm list -n api-prod
```

Expected

```
api-gateway
```

If the release does not exist, use the Install Runbook.

---

## Current Release Status

```bash
helm status api-gateway \
-n api-prod
```

Verify

- Status
- Revision
- Namespace

---

## Review Release History

```bash
helm history api-gateway \
-n api-prod
```

Record the latest successful revision before proceeding.

---

## Validate Updated Chart

```bash
helm lint helm/charts/api-gateway
```

Expected

```
0 chart(s) failed
```

---

## Validate Templates

```bash
helm template api-gateway \
helm/charts/api-gateway \
-f helm/charts/api-gateway/values-prod.yaml
```

Verify

- Image
- Replicas
- Resources
- Labels
- Ports

---

## Perform Dry Run

```bash
helm upgrade api-gateway \
helm/charts/api-gateway \
-f helm/charts/api-gateway/values-prod.yaml \
-n api-prod \
--dry-run \
--debug
```

Ensure no validation errors are reported.

---

# Resolution

Upgrade the release.

```bash
helm upgrade api-gateway \
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

## Verify Revision

```bash
helm history api-gateway \
-n api-prod
```

Confirm that a new revision has been created.

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

## Verify Rollout

```bash
kubectl rollout status deployment/api-gateway-api-gateway \
-n api-prod
```

Expected

```
successfully rolled out
```

---

## Verify Service

```bash
kubectl get svc \
-n api-prod
```

---

## Verify Logs

```bash
kubectl logs deployment/api-gateway-api-gateway \
-n api-prod
```

Ensure

- No startup errors
- No CrashLoopBackOff
- No ImagePullBackOff
- No configuration failures

---

## Verify Application

Perform application health checks.

Examples

- Health endpoint
- API response
- Login
- Dashboard connectivity

---

# Rollback

If the upgrade causes production issues

View revision history.

```bash
helm history api-gateway \
-n api-prod
```

Rollback to the previous stable revision.

```bash
helm rollback api-gateway <REVISION> \
-n api-prod
```

Verify

```bash
helm status api-gateway \
-n api-prod
```

Verify rollout.

```bash
kubectl rollout status deployment/api-gateway-api-gateway \
-n api-prod
```

---

# Post Upgrade Checklist

Verify

- Helm Release
- Revision Number
- Pods
- Deployments
- Services
- Endpoints
- Logs
- Monitoring Dashboard
- Alerts
- Business Validation

Document

- Previous Revision
- New Revision
- Chart Version
- Application Version
- Deployment Time
- Engineer
- Change Request Number

---

# Production Best Practices

- Always review release history before upgrading.
- Perform a dry run before every production upgrade.
- Upgrade using environment-specific values files.
- Monitor rollout progress continuously.
- Validate application functionality after deployment.
- Keep rollback commands readily available.
- Record release revisions in change management systems.

---

# Common Mistakes

- Upgrading the wrong Kubernetes cluster.
- Skipping dry-run validation.
- Ignoring release history.
- Using incorrect values files.
- Declaring success before rollout completion.
- Forgetting to validate application functionality after deployment.

---

# Interview Questions

## Q1. Which command upgrades an existing Helm Release?

```bash
helm upgrade api-gateway \
helm/charts/api-gateway
```

---

## Q2. Why should `helm history` be checked before an upgrade?

### Answer

It identifies the last known stable revision, making rollback faster if the upgrade fails.

---

## Q3. Why perform a dry run before upgrading?

### Answer

A dry run validates templates, values and deployment logic without changing Kubernetes resources, reducing production deployment risk.

---

# Commands Reference

Release Status

```bash
helm status api-gateway -n api-prod
```

History

```bash
helm history api-gateway -n api-prod
```

Dry Run

```bash
helm upgrade api-gateway \
helm/charts/api-gateway \
-f helm/charts/api-gateway/values-prod.yaml \
-n api-prod \
--dry-run \
--debug
```

Upgrade

```bash
helm upgrade api-gateway \
helm/charts/api-gateway \
-f helm/charts/api-gateway/values-prod.yaml \
-n api-prod
```

Rollback

```bash
helm rollback api-gateway <REVISION> \
-n api-prod
```

Rollout Status

```bash
kubectl rollout status deployment/api-gateway-api-gateway \
-n api-prod
```

---

# Marathi Quick Revision

- Current release verify करा.
- helm history तपासा.
- helm lint करा.
- Dry Run करा.
- helm upgrade करा.
- Rollout verify करा.
- Logs तपासा.
- Rollback तयार ठेवा.

---

# Marathi Summary (5+ Experience Revision)

या Runbook मध्ये Production Helm Release सुरक्षितपणे upgrade करण्याची Enterprise SOP समजावली आहे. Upgrade करण्यापूर्वी release history, chart validation, template rendering आणि dry-run पूर्ण करणे आवश्यक आहे. Upgrade नंतर revision, rollout status, Pods, Services, logs आणि application health verify करून deployment यशस्वी असल्याची खात्री करावी. कोणतीही समस्या आढळल्यास `helm rollback` वापरून मागील stable revision वर त्वरीत परत जाणे ही Production DevOps ची सर्वोत्तम पद्धत आहे.

