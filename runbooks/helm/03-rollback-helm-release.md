# Helm Runbook 03 - Rollback a Helm Release

# Enterprise DevOps Platform

---

# Purpose

This runbook explains the standard operating procedure (SOP) for rolling back a failed Helm Release to a previously known stable revision.

Rollback is one of the most critical production operations because it minimizes downtime and restores application availability after a failed deployment.

---

# Introduction

Production deployments do not always succeed.

Common causes include:

- Incorrect Docker Image
- Application Bug
- Configuration Error
- Resource Misconfiguration
- Failed Database Connectivity
- Incorrect Environment Variables
- Failed Health Checks

Helm maintains release history, allowing engineers to restore a previous stable revision with minimal effort.

---

# Production Scenario

Company

ABC Bank

The Platform Team upgraded the API Gateway to version **2.0.0**.

Within minutes, monitoring systems reported:

- Increased 5xx Errors
- Health Check Failures
- Login Failures
- Pod Restarts

The previous deployment (Revision 8) was stable.

The engineering team decides to rollback immediately.

---

# Enterprise Architecture

```
Revision 8

Stable

        │

        ▼

Revision 9

Deployment

        │

        ▼

Application Failure

        │

        ▼

Helm Rollback

        │

        ▼

Revision 8 Restored

        │

        ▼

Application Healthy
```

---

# Investigation

Before initiating rollback verify the following.

## Kubernetes Context

```bash
kubectl config current-context
```

Expected

```
production-cluster
```

---

## Verify Release

```bash
helm list -n api-prod
```

Expected

```
api-gateway
```

---

## Check Release Status

```bash
helm status api-gateway \
-n api-prod
```

Verify

- Status
- Revision
- Namespace

---

## View Release History

```bash
helm history api-gateway \
-n api-prod
```

Example

```
REVISION

7

SUPERSEDED

8

DEPLOYED

9

FAILED
```

Identify the last successful revision.

---

## Verify Application Health

Check Pods.

```bash
kubectl get pods \
-n api-prod
```

Look for

```
CrashLoopBackOff

ImagePullBackOff

Error

Pending
```

---

## Check Rollout Status

```bash
kubectl rollout status deployment/api-gateway-api-gateway \
-n api-prod
```

---

## Review Logs

```bash
kubectl logs deployment/api-gateway-api-gateway \
-n api-prod
```

Confirm the deployment issue before rollback.

---

# Resolution

Rollback to the previous stable revision.

Example

```bash
helm rollback api-gateway 8 \
-n api-prod
```

Expected

```
Rollback was a success.
```

---

# Validation

## Verify Release Status

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

## Verify History

```bash
helm history api-gateway \
-n api-prod
```

Notice

A new revision is created representing the rollback operation.

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

## Verify Services

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

- No startup failures
- No application exceptions
- No configuration errors

---

## Verify Business Functionality

Validate

- Login
- API Responses
- Dashboard
- Health Endpoint

Confirm monitoring alerts have cleared.

---

# Rollback Verification Checklist

Verify

- Helm Release
- Revision Number
- Deployment
- Pods
- Service
- Endpoints
- Logs
- Monitoring Dashboard
- Application Availability

---

# Post Incident Activities

Document

- Failed Revision
- Rolled Back Revision
- Root Cause
- Deployment Time
- Recovery Time
- Engineer
- Incident Number

Schedule

- Root Cause Analysis (RCA)
- Corrective Actions
- Preventive Actions

---

# Production Best Practices

- Rollback only after confirming the deployment caused the issue.
- Record the stable revision before every production upgrade.
- Validate rollback in a staging environment whenever possible.
- Monitor the application after rollback.
- Perform RCA before attempting another deployment.
- Never delete release history.

---

# Common Mistakes

- Rolling back to the wrong revision.
- Ignoring release history.
- Declaring success without verifying application health.
- Performing another upgrade before identifying the root cause.
- Forgetting to monitor the application after rollback.

---

# Interview Questions

## Q1. What does `helm rollback` do?

### Answer

It restores a Helm Release to a previously deployed revision while preserving deployment history.

---

## Q2. How do you identify the correct revision for rollback?

### Answer

Use `helm history` to identify the last stable deployed revision before the failed upgrade.

---

## Q3. Does a rollback remove release history?

### Answer

No.

Helm creates a new revision representing the rollback operation while preserving all previous revisions.

---

# Commands Reference

View Release

```bash
helm status api-gateway -n api-prod
```

History

```bash
helm history api-gateway -n api-prod
```

Rollback

```bash
helm rollback api-gateway 8 -n api-prod
```

Verify Rollout

```bash
kubectl rollout status deployment/api-gateway-api-gateway \
-n api-prod
```

Verify Pods

```bash
kubectl get pods -n api-prod
```

Verify Logs

```bash
kubectl logs deployment/api-gateway-api-gateway \
-n api-prod
```

---

# Marathi Quick Revision

- helm history तपासा.
- Stable revision शोधा.
- helm rollback करा.
- Pods verify करा.
- Rollout verify करा.
- Logs तपासा.
- Application health verify करा.
- RCA करा.

---

# Marathi Summary (5+ Experience Revision)

या Runbook मध्ये Production Helm Release rollback करण्याची Enterprise SOP समजावली आहे. Failed deployment झाल्यानंतर `helm history` वापरून शेवटचा stable revision ओळखला जातो आणि `helm rollback` द्वारे application पूर्वस्थितीत आणली जाते. Rollback नंतर Pods, Deployment, rollout status, logs, monitoring आणि business functionality verify करणे अत्यावश्यक असते. Incident बंद करण्यापूर्वी Root Cause Analysis (RCA) आणि corrective actions निश्चित करणे ही Enterprise DevOps आणि SRE टीमची standard practice आहे.

