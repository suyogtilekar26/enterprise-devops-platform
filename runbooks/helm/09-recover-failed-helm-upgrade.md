# Helm Runbook 09 - Recover Failed Helm Upgrade

# Enterprise DevOps Platform

---

# Purpose

This runbook explains the standard operating procedure (SOP) for recovering from a failed Helm Upgrade in a production Kubernetes cluster.

It covers investigation, recovery, validation and rollback activities performed by Enterprise DevOps, Platform Engineering and SRE teams.

---

# Introduction

A Helm Upgrade may fail even after extensive validation.

Common reasons include

- Invalid Docker Image
- Kubernetes Resource Limits
- Readiness Probe Failures
- Liveness Probe Failures
- Configuration Errors
- Secret or ConfigMap Issues
- Missing Dependencies
- Application Startup Failures
- Kubernetes API Errors

A failed upgrade should never be retried immediately.

The root cause must first be identified.

---

# Production Scenario

Company

ABC Bank

The Platform Team upgraded API Gateway from

```
Version

2.1.0

↓

2.2.0
```

Deployment pipeline completed with

```
STATUS

FAILED
```

Customers are reporting intermittent API failures.

The engineering team must restore production service immediately.

---

# Enterprise Architecture

```
GitHub Actions

        │

        ▼

Helm Upgrade

        │

        ▼

FAILED

        │

        ▼

Investigation

        │

        ▼

Recovery

        │

        ▼

Validation

        │

        ▼

Rollback (If Required)

        │

        ▼

Healthy Production
```

---

# Investigation

Perform the following checks.

---

## Step 1

Verify Kubernetes Context.

```bash
kubectl config current-context
```

Expected

```
production-cluster
```

---

## Step 2

Verify Release Status.

```bash
helm status api-gateway \
-n api-prod
```

Example

```
STATUS

failed
```

---

## Step 3

Review Release History.

```bash
helm history api-gateway \
-n api-prod
```

Identify

- Failed Revision
- Previous Stable Revision

---

## Step 4

Review Deployment.

```bash
kubectl describe deployment api-gateway-api-gateway \
-n api-prod
```

Check

- Events
- Replica Status
- Progress Deadline
- Failed Scheduling

---

## Step 5

Verify Pods.

```bash
kubectl get pods \
-n api-prod
```

Look for

```
CrashLoopBackOff

ImagePullBackOff

Pending

Error

CreateContainerConfigError
```

---

## Step 6

Describe Failed Pod.

```bash
kubectl describe pod <POD_NAME> \
-n api-prod
```

Review

- Events
- Environment Variables
- Mounted Volumes
- Image
- Scheduling Details

---

## Step 7

Review Application Logs.

```bash
kubectl logs <POD_NAME> \
-n api-prod
```

Look for

- Stack Traces
- Startup Failures
- Missing Configuration
- Database Connection Errors
- Authentication Errors

---

## Step 8

Verify Rollout Status.

```bash
kubectl rollout status deployment/api-gateway-api-gateway \
-n api-prod
```

---

## Step 9

Verify Kubernetes Events.

```bash
kubectl get events \
-n api-prod \
--sort-by=.lastTimestamp
```

Review

- Scheduling Failures
- Image Pull Errors
- Probe Failures
- Resource Errors

---

## Step 10

Verify Applied Values.

```bash
helm get values api-gateway \
-n api-prod
```

Confirm

- Image
- Resources
- Replica Count
- Environment Variables

---

## Step 11

Validate Chart.

```bash
helm lint helm/charts/api-gateway
```

---

## Step 12

Render Templates.

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

---

# Resolution

Choose the appropriate recovery method.

---

## Scenario 1

Incorrect Image

Correct

```yaml
image:
  repository:
  tag:
```

Run

```bash
helm upgrade api-gateway \
helm/charts/api-gateway \
-f helm/charts/api-gateway/values-prod.yaml \
-n api-prod
```

---

## Scenario 2

Configuration Error

Correct

- ConfigMap
- Secret
- Environment Variables
- values.yaml

Validate

```bash
helm lint
```

Deploy again.

---

## Scenario 3

Resource Issue

Increase

```yaml
resources:
```

Upgrade again.

---

## Scenario 4

Probe Failure

Correct

- readinessProbe
- livenessProbe
- startupProbe

Deploy again.

---

## Scenario 5

Rollback Required

If production impact is high

Rollback immediately.

```bash
helm rollback api-gateway <REVISION> \
-n api-prod
```

---

# Validation

Verify

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

Verify

```bash
helm history api-gateway \
-n api-prod
```

---

Verify

```bash
kubectl get deployment \
-n api-prod
```

---

Verify

```bash
kubectl get pods \
-n api-prod
```

Expected

```
Running
```

---

Verify

```bash
kubectl rollout status deployment/api-gateway-api-gateway \
-n api-prod
```

---

Verify

```bash
kubectl get svc \
-n api-prod
```

---

Verify

```bash
kubectl get endpoints \
-n api-prod
```

---

Verify

```bash
kubectl logs deployment/api-gateway-api-gateway \
-n api-prod
```

---

Verify

Business functionality

- Login
- APIs
- Dashboard
- Health Endpoint

---

# Rollback

View release history.

```bash
helm history api-gateway \
-n api-prod
```

Rollback.

```bash
helm rollback api-gateway <REVISION> \
-n api-prod
```

Verify

```bash
kubectl rollout status deployment/api-gateway-api-gateway \
-n api-prod
```

Confirm

- Pods Running
- Endpoints Available
- Monitoring Green
- Customer Traffic Restored

---

# Root Cause Analysis Checklist

Document

- Failed Revision
- Stable Revision
- Root Cause
- Deployment Time
- Recovery Time
- Resolution
- Preventive Action
- Incident Number
- Change Request

---

# Production Best Practices

- Never retry upgrades without investigation.
- Always preserve Helm release history.
- Collect logs before restarting Pods.
- Validate templates before redeployment.
- Roll back immediately if customer impact is significant.
- Perform RCA after recovery.
- Update deployment documentation.

---

# Common Mistakes

- Running multiple upgrades simultaneously.
- Ignoring Helm history.
- Restarting Pods before collecting logs.
- Skipping validation after fixing the issue.
- Delaying rollback during customer impact.
- Closing the incident without preventive actions.

---

# Interview Questions

## Q1. What should be checked first after a failed Helm Upgrade?

### Answer

Verify the Helm release status, release history, deployment events and Pod status before attempting recovery.

---

## Q2. When should a rollback be preferred over another upgrade?

### Answer

Rollback should be performed when the failed upgrade causes production impact and the previous revision is known to be stable.

---

## Q3. Why should Helm release history always be preserved?

### Answer

Release history provides a complete deployment record and allows fast recovery by rolling back to a known stable revision.

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

Applied Values

```bash
helm get values api-gateway -n api-prod
```

Deployment

```bash
kubectl describe deployment api-gateway-api-gateway -n api-prod
```

Pods

```bash
kubectl get pods -n api-prod
```

Events

```bash
kubectl get events -n api-prod --sort-by=.lastTimestamp
```

Validation

```bash
helm lint helm/charts/api-gateway

helm template api-gateway helm/charts/api-gateway
```

Rollback

```bash
helm rollback api-gateway <REVISION> -n api-prod
```

---

# Marathi Quick Revision

- helm status तपासा.
- helm history तपासा.
- Deployment describe करा.
- Pod logs घ्या.
- Events तपासा.
- Root cause शोधा.
- Fix करून upgrade करा.
- गरज असल्यास rollback करा.

---

# Marathi Summary (5+ Experience Revision)

या Runbook मध्ये Failed Helm Upgrade मधून Production Recovery करण्याची Enterprise SOP समजावली आहे. Failed upgrade नंतर Helm status, release history, Deployment, Pods, Events, logs आणि applied values तपासून root cause निश्चित केला जातो. समस्या दुरुस्त करून पुन्हा upgrade करणे किंवा ग्राहकांवर परिणाम होत असल्यास त्वरित stable revision वर rollback करणे ही योग्य operational strategy आहे. Recovery पूर्ण झाल्यानंतर rollout, application health, monitoring आणि RCA पूर्ण करूनच incident बंद केला जातो.

