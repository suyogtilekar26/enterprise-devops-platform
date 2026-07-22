# Helm Lab 13 - Rollback Helm Release

# Enterprise DevOps Platform

---

# Lab Objective

In this lab, we will perform our first Helm Rollback.

Rollback is one of the most important Helm features because it allows engineers to quickly restore the previous stable application version after a failed deployment.

In enterprise production environments, rollback is often the fastest way to recover from a bad release.

---

# Production Scenario

Company

ABC Bank

A new API Gateway version (v1.1.0) was deployed to Production.

Within five minutes:

- Customers started receiving HTTP 500 errors.
- Authentication requests began failing.
- API latency increased dramatically.

Investigation revealed a bug in the latest application release.

Instead of rebuilding and redeploying immediately, the Platform Team rolled back to the previous stable Helm revision.

Service was restored within minutes.

This is a standard enterprise recovery procedure.

---

# Enterprise Architecture

```
Revision 1

↓

API Gateway v1.0.0

↓

Stable

↓

Upgrade

↓

Revision 2

↓

API Gateway v1.1.0

↓

Application Failure

↓

Helm Rollback

↓

Revision 1 Restored
```

---

# Prerequisites

Verify

```bash
kubectl get nodes
```

Deploy Revision 1

```bash
helm install api-gateway helm/charts/api-gateway
```

Upgrade to Revision 2

```bash
helm upgrade api-gateway helm/charts/api-gateway
```

Verify

```bash
helm history api-gateway
```

Expected

```
REVISION

1

REVISION

2
```

---

# Step 1

View Release History.

```bash
helm history api-gateway
```

Example

```
REVISION

1

STATUS

superseded

REVISION

2

STATUS

deployed
```

---

# Step 2

View Current Status.

```bash
helm status api-gateway
```

Notice

```
Revision

2
```

---

# Step 3

Rollback to Revision 1.

```bash
helm rollback api-gateway 1
```

Expected

```
Rollback was successful
```

---

# Step 4

Verify Release Status.

```bash
helm status api-gateway
```

Expected

```
STATUS

deployed
```

---

# Step 5

Verify History Again.

```bash
helm history api-gateway
```

Expected

```
REVISION

1

REVISION

2

REVISION

3
```

Notice

Rollback creates a **new revision**.

Revision

```
3
```

now contains the configuration from Revision

```
1
```

---

# Step 6

Verify Pods.

```bash
kubectl get pods
```

Rolling Update occurs again.

New Pods replace the failed version.

---

# Step 7

Describe Deployment.

```bash
kubectl describe deployment api-gateway-api-gateway
```

Verify

- Replica Count
- Events
- Image
- Rollout Strategy

---

# Step 8

Verify Docker Image.

```bash
kubectl describe pod
```

Locate

```
Image

enterprise-devops-platform/api-gateway:1.0.0
```

The previous stable version is now active.

---

# Step 9

Verify Release Values.

```bash
helm get values api-gateway
```

Notice

Values now match Revision 1.

---

# Step 10

View Rendered Manifest.

```bash
helm get manifest api-gateway
```

Confirm

Deployment matches the previous release.

---

# Step 11

Cleanup.

```bash
helm uninstall api-gateway
```

---

# Enterprise Rollback Workflow

```
Deployment

↓

Application Failure

↓

Alerts

↓

Investigation

↓

Decision

↓

Helm Rollback

↓

Stable Version

↓

Post Incident RCA
```

Rollback restores service quickly.

Root Cause Analysis happens afterwards.

---

# Validation Checklist

Run

```bash
helm history api-gateway
```

Run

```bash
helm status api-gateway
```

Run

```bash
kubectl get pods
```

Run

```bash
helm get values api-gateway
```

Verify

- Revision increased
- Previous image restored
- Pods recreated
- Application stable

---

# Expected Result

Successfully rolled back the API Gateway to the previous stable version.

Verified

- Rollback command
- Revision history
- Deployment update
- Restored image
- New running Pods

---

# Production Best Practices

- Keep release history intact.
- Never delete releases before investigating failures.
- Verify application health after rollback.
- Document rollback decisions in the incident report.
- Perform Root Cause Analysis after service restoration.
- Rollback only to known stable revisions.

---

# Common Mistakes

- Rolling back to the wrong revision.
- Assuming rollback deletes release history.
- Forgetting to verify Pods after rollback.
- Ignoring application health checks.
- Performing repeated upgrades without validating stability.

---

# Interview Questions

## Q1. Which command performs a Helm rollback?

```bash
helm rollback <release-name> <revision>
```

Example

```bash
helm rollback api-gateway 1
```

---

## Q2. Does Helm rollback remove release history?

### Answer

No.

Rollback creates a new revision while preserving all previous revisions, allowing complete deployment history to be maintained.

---

## Q3. Why is Helm rollback important in production?

### Answer

Rollback provides a fast recovery mechanism when a deployment introduces issues. It minimizes downtime by restoring the last known stable release without requiring a new deployment.

---

# Marathi Quick Revision

- helm history पाहा.
- योग्य Revision निवडा.
- helm rollback चालवा.
- Pods verify करा.
- Image verify करा.
- Rollback नंतर नवीन Revision तयार होते.

---

# Marathi Summary (5+ Experience Revision)

या Lab मध्ये आपण Helm Rollback वापरून API Gateway ला मागील stable release वर restore केले. Enterprise मध्ये deployment failure झाल्यास प्रथम service restore करण्यासाठी rollback केला जातो आणि त्यानंतर Root Cause Analysis केली जाते. Helm rollback जुनी revision delete करत नाही; तो नवीन revision तयार करून मागील stable configuration पुन्हा deploy करतो. त्यामुळे संपूर्ण deployment history सुरक्षित राहते.

