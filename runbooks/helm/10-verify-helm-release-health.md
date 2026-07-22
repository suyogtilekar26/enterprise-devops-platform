# Helm Runbook 10 - Verify Helm Release Health

# Enterprise DevOps Platform

---

# Purpose

This runbook explains the standard operating procedure (SOP) for verifying the health of a deployed Helm Release in a Kubernetes cluster.

Health verification is performed immediately after deployment, upgrade, rollback and during routine production monitoring.

---

# Introduction

A successful Helm deployment does not always mean the application is healthy.

Enterprise teams validate

- Helm Release
- Kubernetes Resources
- Pod Health
- Rollout Status
- Service Connectivity
- Application Health
- Monitoring
- Business Functionality

Only after these checks is a deployment considered successful.

---

# Production Scenario

Company

ABC Bank

The Platform Team has deployed API Gateway version **2.2.0** into Production.

The deployment pipeline completed successfully.

Before closing the deployment window, engineers must verify the overall health of the Helm Release.

---

# Enterprise Architecture

```
Helm Release

        │

        ▼

Deployment

        │

        ▼

ReplicaSet

        │

        ▼

Pods

        │

        ▼

Service

        │

        ▼

Application

        │

        ▼

Business Users
```

---

# Investigation

Perform the following health checks.

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

Verify Helm Release.

```bash
helm list -n api-prod
```

Expected

```
api-gateway
```

---

## Step 3

Verify Release Status.

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

## Step 4

Verify Release History.

```bash
helm history api-gateway \
-n api-prod
```

Confirm

- Latest Revision
- Deployment Time
- Status

---

## Step 5

Verify Deployment.

```bash
kubectl get deployment \
-n api-prod
```

Confirm

- READY
- AVAILABLE
- UP-TO-DATE

---

## Step 6

Verify Rollout Status.

```bash
kubectl rollout status deployment/api-gateway-api-gateway \
-n api-prod
```

Expected

```
successfully rolled out
```

---

## Step 7

Verify ReplicaSets.

```bash
kubectl get rs \
-n api-prod
```

Ensure the latest ReplicaSet owns the active Pods.

---

## Step 8

Verify Pods.

```bash
kubectl get pods \
-n api-prod
```

Expected

```
Running
```

Ensure

```
READY

1/1
```

No Pods should be in

```
Pending

CrashLoopBackOff

ImagePullBackOff

Error
```

---

## Step 9

Verify Pod Details.

```bash
kubectl describe pod <POD_NAME> \
-n api-prod
```

Review

- Events
- Restarts
- Conditions
- Container Status

---

## Step 10

Verify Logs.

```bash
kubectl logs deployment/api-gateway-api-gateway \
-n api-prod
```

Confirm

- No startup failures
- No exceptions
- No authentication failures
- No database connectivity issues

---

## Step 11

Verify Service.

```bash
kubectl get svc \
-n api-prod
```

---

## Step 12

Verify Endpoints.

```bash
kubectl get endpoints \
-n api-prod
```

Endpoints should not be empty.

---

## Step 13

Verify Resource Usage.

```bash
kubectl top pods \
-n api-prod
```

Review

- CPU
- Memory

Watch for unusual spikes.

---

## Step 14

Verify Kubernetes Events.

```bash
kubectl get events \
-n api-prod \
--sort-by=.lastTimestamp
```

Ensure there are no critical warnings.

---

## Step 15

Verify Application Health.

Examples

- Health Endpoint
- Login
- API Response
- Dashboard Access

Confirm business functionality.

---

# Validation

Deployment is considered healthy only if

- Helm Release is deployed
- Deployment is Available
- Rollout completed
- Pods are Running
- Services exist
- Endpoints exist
- Logs are clean
- Monitoring is healthy
- Business validation passed

---

# Rollback

If health verification fails

View release history.

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
kubectl rollout status deployment/api-gateway-api-gateway \
-n api-prod
```

Repeat the complete health verification process.

---

# Health Verification Checklist

Verify

- Helm Release
- Revision
- Deployment
- ReplicaSet
- Pods
- Rollout
- Service
- Endpoints
- Logs
- Events
- CPU
- Memory
- Monitoring
- Business Validation

---

# Production Best Practices

- Verify every deployment before closing the change request.
- Monitor application logs immediately after deployment.
- Confirm Service endpoints.
- Review Pod restart counts.
- Validate business functionality.
- Keep rollback procedures ready.
- Record verification results in deployment documentation.

---

# Common Mistakes

- Assuming Helm deployment success means application success.
- Ignoring Pod restart counts.
- Skipping application health validation.
- Not checking Kubernetes Events.
- Closing deployment before business validation.
- Ignoring monitoring alerts after deployment.

---

# Interview Questions

## Q1. Does a successful Helm deployment guarantee a healthy application?

### Answer

No.

Helm confirms deployment completion, but engineers must also verify Pods, Services, rollout status, logs, monitoring and application functionality.

---

## Q2. Which command verifies Helm Release health?

```bash
helm status api-gateway -n api-prod
```

---

## Q3. Why should Kubernetes Events be reviewed?

### Answer

Events provide detailed information about scheduling issues, probe failures, image pull errors and other operational problems that may not be visible from Helm status alone.

---

# Commands Reference

Release

```bash
helm status api-gateway -n api-prod
```

History

```bash
helm history api-gateway -n api-prod
```

Deployment

```bash
kubectl get deployment -n api-prod
```

Rollout

```bash
kubectl rollout status deployment/api-gateway-api-gateway -n api-prod
```

Pods

```bash
kubectl get pods -n api-prod
```

Logs

```bash
kubectl logs deployment/api-gateway-api-gateway -n api-prod
```

Events

```bash
kubectl get events -n api-prod --sort-by=.lastTimestamp
```

Resource Usage

```bash
kubectl top pods -n api-prod
```

---

# Marathi Quick Revision

- helm status तपासा.
- helm history verify करा.
- Deployment तपासा.
- Rollout verify करा.
- Pods Running आहेत का तपासा.
- Logs तपासा.
- Events तपासा.
- Application health verify करा.

---

# Marathi Summary (5+ Experience Revision)

या Runbook मध्ये Helm Release ची Production Health Verification करण्याची Enterprise SOP समजावली आहे. Helm deployment यशस्वी झाला म्हणजे application पूर्णपणे healthy आहे असे गृहित धरता येत नाही. Helm Release, Deployment, ReplicaSet, Pods, Services, Endpoints, rollout status, logs, Kubernetes Events, resource usage आणि business functionality यांची पडताळणी केल्यानंतरच deployment यशस्वी मानला जातो. Enterprise DevOps आणि SRE टीममध्ये ही प्रक्रिया प्रत्येक deployment, upgrade आणि rollback नंतर अनिवार्यपणे केली जाते.

