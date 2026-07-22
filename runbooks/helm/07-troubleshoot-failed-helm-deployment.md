# Helm Runbook 07 - Troubleshoot Failed Helm Deployment

# Enterprise DevOps Platform

---

# Purpose

This runbook explains the standard operating procedure (SOP) for investigating and resolving failed Helm deployments in a Kubernetes cluster.

It provides a structured troubleshooting process used by Enterprise DevOps, Platform Engineering and SRE teams.

---

# Introduction

A Helm deployment can fail due to multiple reasons.

Common causes include

- Invalid Helm Templates
- Incorrect values.yaml
- Missing Kubernetes Resources
- ImagePull Errors
- Failed Readiness Probe
- Failed Liveness Probe
- Resource Constraints
- RBAC Issues
- Namespace Issues
- Dependency Failures

Rather than immediately retrying the deployment, engineers should perform systematic troubleshooting.

---

# Production Scenario

Company

ABC Bank

During a Production deployment of API Gateway version **2.2.0**, the deployment pipeline reports

```
STATUS

FAILED
```

Users are unable to access APIs.

The Platform Team must identify the root cause and restore service.

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

 ┌──────────────┐

 ▼              ▼

Helm         Kubernetes

        │

        ▼

Resolution

        │

        ▼

Validation

        │

        ▼

Deployment Success
```

---

# Investigation

Follow the investigation steps in order.

---

## Step 1

Verify Kubernetes Context.

```bash
kubectl config current-context
```

---

## Step 2

Verify Release Status.

```bash
helm status api-gateway \
-n api-prod
```

Look for

```
STATUS

failed

pending-upgrade

pending-install
```

---

## Step 3

Check Release History.

```bash
helm history api-gateway \
-n api-prod
```

Identify

- Failed Revision
- Previous Stable Revision

---

## Step 4

Review Deployment Events.

```bash
kubectl describe deployment api-gateway-api-gateway \
-n api-prod
```

Look for

- Failed Scheduling
- Image Pull Errors
- Probe Failures
- Replica Failures

---

## Step 5

Verify Pods.

```bash
kubectl get pods \
-n api-prod
```

Look for

```
Pending

CrashLoopBackOff

ImagePullBackOff

ErrImagePull

CreateContainerConfigError

CreateContainerError
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
- Scheduling Messages

---

## Step 7

Review Application Logs.

```bash
kubectl logs <POD_NAME> \
-n api-prod
```

Look for

- Startup Errors
- Configuration Errors
- Connection Failures
- Stack Traces

---

## Step 8

Verify Service.

```bash
kubectl get svc \
-n api-prod
```

---

## Step 9

Verify Endpoints.

```bash
kubectl get endpoints \
-n api-prod
```

If endpoints are empty,

Pods are not Ready.

---

## Step 10

Validate Helm Chart.

```bash
helm lint helm/charts/api-gateway
```

---

## Step 11

Render Templates.

```bash
helm template api-gateway \
helm/charts/api-gateway \
-f helm/charts/api-gateway/values-prod.yaml
```

Verify

- Image
- Resources
- Labels
- Selectors
- Environment Variables

---

## Step 12

Review Applied Values.

```bash
helm get values api-gateway \
-n api-prod
```

Confirm

- Image Tag
- Replica Count
- Resources

---

## Step 13

Verify Rollout Status.

```bash
kubectl rollout status deployment/api-gateway-api-gateway \
-n api-prod
```

---

# Resolution

Depending on the identified issue

### Incorrect Image

Update

```yaml
image:
  repository:
  tag:
```

Upgrade

```bash
helm upgrade api-gateway \
helm/charts/api-gateway \
-f helm/charts/api-gateway/values-prod.yaml \
-n api-prod
```

---

### Configuration Error

Correct

- values.yaml
- ConfigMap
- Secret
- Environment Variables

Redeploy

---

### Resource Issues

Increase

```yaml
resources:
```

Redeploy

---

### Probe Failures

Correct

- readinessProbe
- livenessProbe
- startupProbe

Redeploy

---

### Template Errors

Correct template files.

Run

```bash
helm lint
```

Run

```bash
helm template
```

Deploy only after successful validation.

---

# Validation

Verify

```bash
helm status api-gateway \
-n api-prod
```

Verify

```bash
kubectl get pods \
-n api-prod
```

Verify

```bash
kubectl rollout status deployment/api-gateway-api-gateway \
-n api-prod
```

Verify

```bash
kubectl get endpoints \
-n api-prod
```

Verify

```bash
kubectl logs deployment/api-gateway-api-gateway \
-n api-prod
```

Application Health

- Login
- API
- Dashboard
- Health Endpoint

---

# Rollback

If the deployment cannot be recovered quickly

View history

```bash
helm history api-gateway \
-n api-prod
```

Rollback

```bash
helm rollback api-gateway <REVISION> \
-n api-prod
```

Verify rollout

```bash
kubectl rollout status deployment/api-gateway-api-gateway \
-n api-prod
```

Confirm application recovery before closing the incident.

---

# Root Cause Analysis Checklist

Document

- Failed Revision
- Deployment Time
- Error Message
- Root Cause
- Resolution
- Recovery Time
- Preventive Action
- Engineer
- Incident Number

---

# Production Best Practices

- Never retry deployments without investigation.
- Always collect logs before restarting Pods.
- Review Kubernetes Events before making changes.
- Validate charts before redeployment.
- Keep rollback plans ready.
- Record RCA for every production failure.
- Monitor applications after recovery.

---

# Common Mistakes

- Restarting Pods before collecting logs.
- Ignoring Kubernetes Events.
- Repeating failed deployments without fixing the issue.
- Skipping Helm validation.
- Forgetting rollback procedures.
- Closing incidents without RCA.

---

# Interview Questions

## Q1. What is the first step when a Helm deployment fails?

### Answer

Verify the Helm release status and Kubernetes Events before making any changes.

---

## Q2. Which commands are commonly used to troubleshoot failed Helm deployments?

### Answer

- helm status
- helm history
- helm get values
- kubectl describe deployment
- kubectl describe pod
- kubectl logs
- kubectl rollout status
- helm lint
- helm template

---

## Q3. Why should logs be collected before restarting Pods?

### Answer

Restarting Pods may remove valuable troubleshooting information needed to identify the root cause of the failure.

---

# Commands Reference

Release Status

```bash
helm status api-gateway -n api-prod
```

Release History

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

Pod Details

```bash
kubectl describe pod <POD_NAME> -n api-prod
```

Logs

```bash
kubectl logs <POD_NAME> -n api-prod
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
- Pods verify करा.
- describe pod करा.
- Logs घ्या.
- Events तपासा.
- helm lint करा.
- गरज असल्यास rollback करा.

---

# Marathi Summary (5+ Experience Revision)

या Runbook मध्ये Failed Helm Deployment troubleshoot करण्याची Enterprise SOP समजावली आहे. Investigation करताना Helm release status, release history, Kubernetes Events, Pod status, application logs, rendered templates आणि applied values यांची क्रमाने तपासणी केली जाते. Root cause निश्चित झाल्यानंतरच corrective action घेतली जाते. समस्या त्वरित सुटत नसल्यास मागील stable revision वर rollback करणे आणि त्यानंतर RCA तयार करणे ही Enterprise Platform Engineering आणि SRE टीमची standard practice आहे.

