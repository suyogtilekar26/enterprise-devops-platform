# Kubernetes Interview Master Handbook

# Section 07 - Kubernetes Production Incidents & Troubleshooting

# Chapter 03 - ImagePullBackOff Incidents

---

# Objective

Learn how to investigate, troubleshoot, recover and permanently prevent ImagePullBackOff incidents in production Kubernetes environments.

This is one of the most common production incidents and interview questions for DevOps, SRE and Platform Engineering roles.

---

# Interview Scenario

Time: 11:45 AM

PagerDuty Alert

"Production Deployment Failed"

Impact

- New application version is not deployed.
- Existing pods are terminating.
- New pods remain in ImagePullBackOff.
- Customer traffic is decreasing.

You are the on-call SRE.

Restore production immediately.

---

# What is ImagePullBackOff?

ImagePullBackOff means Kubernetes cannot download the required container image from the container registry.

Kubernetes retries the image pull using exponential backoff.

---

# Image Pull Workflow

Deployment

↓

Scheduler

↓

Node

↓

Container Runtime

↓

Container Registry

↓

Image Pulled

↓

Container Started

OR

↓

Image Pull Failed

↓

Retry

↓

ImagePullBackOff

---

# Common Root Causes

Incorrect Image Name

Wrong Image Tag

Image Deleted

Private Registry Authentication Failure

Registry Unavailable

Network Connectivity Issue

DNS Resolution Failure

Expired Registry Credentials

Rate Limiting

Image Signature Policy Failure

---

# Step 1 - Check Pod Status

```bash
kubectl get pods -A
```

Example

```
checkout-6fd7b9   0/1   ImagePullBackOff
```

---

# Step 2 - Describe the Pod

```bash
kubectl describe pod checkout-6fd7b9
```

Look for

- Failed image pull
- Authentication errors
- Registry errors
- DNS errors
- Timeout messages

---

# Step 3 - Check Events

```bash
kubectl get events -A --sort-by=.metadata.creationTimestamp
```

Typical event

```
Failed to pull image
```

---

# Step 4 - Verify Deployment

```bash
kubectl describe deployment checkout
```

Verify

- Image Name
- Image Tag
- Registry URL

---

# Step 5 - Verify Image

```bash
kubectl get deployment checkout -o yaml
```

Example

```
image:
company/checkout:v3
```

Verify

- Repository exists
- Tag exists

---

# Step 6 - Verify Registry Secret

```bash
kubectl get secrets
```

Check

imagePullSecrets

---

Verify Deployment

```bash
kubectl describe deployment checkout
```

---

# Step 7 - Verify Secret

```bash
kubectl describe secret regcred
```

---

# Step 8 - Verify Node Connectivity

```bash
kubectl get nodes
```

Confirm

- Node Ready
- Internet Connectivity
- Registry Reachable

---

# Investigation Flow

Pod

↓

Describe

↓

Events

↓

Deployment

↓

Image

↓

Registry

↓

Secret

↓

Network

↓

Recovery

---

# Scenario 1

Incorrect Image Tag

Deployment

```
checkout:v100
```

Registry

```
checkout:v10
```

Root Cause

Invalid image tag.

Resolution

Update deployment.

---

# Scenario 2

Private Registry Authentication Failure

Describe output

```
Unauthorized
```

Root Cause

Invalid imagePullSecret.

Resolution

Create new registry secret.

Update deployment.

---

# Scenario 3

Image Deleted

Registry

Image removed accidentally.

Resolution

Restore image.

Redeploy application.

---

# Scenario 4

Registry Outage

Event

```
connection refused
```

Root Cause

Registry unavailable.

Resolution

Recover registry.

Use secondary registry.

---

# Scenario 5

DNS Failure

Event

```
lookup registry.company.com failed
```

Verify

CoreDNS

Network

DNS

---

# Scenario 6

Rate Limit

Docker Hub returns

```
Too Many Requests
```

Resolution

Authenticate registry.

Mirror images.

Use enterprise registry.

---

# Production Incident

Issue

Deployment stuck.

Pods remain in ImagePullBackOff.

Investigation

Describe shows

```
manifest unknown
```

Deployment image

```
checkout:v15
```

Registry contains

```
checkout:v14
```

Root Cause

Incorrect image tag.

Resolution

Correct image tag.

Deploy again.

Pods become Running.

---

# Recovery Commands

Update image

```bash
kubectl set image deployment/checkout app=company/checkout:v14
```

---

Restart Deployment

```bash
kubectl rollout restart deployment checkout
```

---

Rollback

```bash
kubectl rollout undo deployment checkout
```

---

Verify Rollout

```bash
kubectl rollout status deployment checkout
```

---

# Validation Checklist

Pods Running

Images Pulled

Deployment Complete

No Events

Application Healthy

Business Transactions Successful

---

# RCA Template

Incident

ImagePullBackOff

Root Cause

Incorrect image tag

Business Impact

Deployment unavailable

Detection

Deployment monitoring

Resolution

Updated deployment image

Preventive Action

CI validation

Image existence verification

---

# Interview Questions

## Q1. What is ImagePullBackOff?

Answer

It indicates Kubernetes cannot pull the required container image and retries with exponential backoff.

---

## Q2. Which command do you execute first?

Answer

```bash
kubectl describe pod <pod-name>
```

---

## Q3. What are the common causes?

Answer

Wrong image tag, invalid registry credentials, registry outage, network issues, DNS failure and deleted images.

---

## Q4. How do you verify registry authentication?

Answer

Check imagePullSecrets, verify registry credentials and confirm the deployment references the correct secret.

---

## Q5. How do you recover from ImagePullBackOff?

Answer

Correct the image reference, restore registry connectivity, update authentication or rollback to a working deployment.

---

# Assignment

Production deployment is stuck in ImagePullBackOff.

Perform

- Investigation
- Evidence Collection
- Root Cause Analysis
- Recovery
- Validation
- Preventive Actions

---

# Assignment Solution

## Step 1

Check pod status.

```bash
kubectl get pods -A
```

---

## Step 2

Describe pod.

```bash
kubectl describe pod <pod>
```

---

## Step 3

Review events.

```bash
kubectl get events -A
```

---

## Step 4

Verify

- Deployment
- Image
- Tag
- Registry
- imagePullSecret

---

## Step 5

Fix

- Image Tag
- Registry Authentication
- Network Issue

---

## Step 6

Restart rollout.

Validate deployment.

---

## Step 7

Confirm

- Pods Running
- No Events
- Successful Requests

---

# Production Best Practices

✔ Always Use Immutable Image Tags

✔ Validate Image Before Deployment

✔ Mirror Critical Images

✔ Secure Registry Credentials

✔ Monitor Registry Availability

✔ Automate Image Verification

✔ Enable Deployment Rollback

✔ Keep Registry Highly Available

✔ Validate CI/CD Pipelines

✔ Maintain Runbooks

---

# Runbook Checklist

□ Pod Identified

□ Events Reviewed

□ Deployment Verified

□ Image Tag Validated

□ Registry Reachable

□ imagePullSecret Verified

□ Network Checked

□ Root Cause Confirmed

□ Recovery Completed

□ Deployment Validated

□ RCA Completed

---

# Common Mistakes

❌ Using latest Tag in Production

❌ Forgetting imagePullSecrets

❌ Typing Incorrect Image Names

❌ Ignoring Registry Health

❌ Skipping Rollback

❌ Not Validating Image Before Release

❌ Assuming Network Is Healthy

❌ Closing Incident Without Validation

