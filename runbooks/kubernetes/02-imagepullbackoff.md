# Kubernetes Runbook 02 - Recovering ImagePullBackOff Pods

# 1. Purpose

This runbook explains how to investigate and recover Kubernetes Pods that fail to pull container images and enter the **ImagePullBackOff** state.

The objective is to identify the exact image pull failure, restore the workload safely and document the Root Cause Analysis (RCA).

---

# 2. Scope

Applicable to

- Kubernetes Deployments
- StatefulSets
- DaemonSets
- Jobs
- CronJobs

Supported environments

- Kind
- EKS
- AKS
- GKE
- On-Prem Kubernetes

---

# 3. Symptoms

Users may report

- Application unavailable
- New release failed
- Deployment stuck
- APIs returning errors

Monitoring may report

- ImagePullBackOff
- ErrImagePull
- Replica availability reduced

Verify

```bash
kubectl get pods -A
```

Example

```
NAME                         READY   STATUS

frontend-7b79f89df8-5fd8m    0/1     ImagePullBackOff
```

---

# 4. Business Impact

Critical

- New application deployment unavailable
- Zero available replicas
- Production outage

Medium

- Partial deployment failure
- One microservice unavailable

Low

- Non-production deployment failure

---

# 5. Possible Root Causes

Most common causes

- Wrong image name
- Wrong image tag
- Private registry authentication failure
- Missing imagePullSecret
- Image deleted from registry
- Registry unavailable
- Network issue
- Docker Hub rate limiting
- Typographical error
- Incorrect Helm values
- Incorrect CI/CD pipeline configuration

---

# 6. Prerequisites

Required access

- kubectl
- Namespace access
- Deployment read access
- Registry access (if required)

Useful commands

```bash
kubectl auth can-i get deployments

kubectl auth can-i get pods
```

---

# 7. Initial Investigation

## Step 1

Locate affected Pods

```bash
kubectl get pods -A
```

Expected

```
STATUS

ImagePullBackOff
```

---

## Step 2

Describe Pod

```bash
kubectl describe pod <pod-name> \
-n <namespace>
```

This is the most important investigation step.

---

## Step 3

Review Events

Look for

```
Failed to pull image

ErrImagePull

ImagePullBackOff
```

Example

```
Failed to pull image

manifest unknown
```

or

```
unauthorized
```

---

# 8. Detailed Investigation

## Step 1

Verify Image Name

```bash
kubectl describe deployment <deployment> \
-n <namespace>
```

Example

Wrong

```
ngnix:latest
```

Correct

```
nginx:latest
```

---

## Step 2

Verify Image Tag

Wrong

```
myapp:v100
```

Correct

```
myapp:v1.0.0
```

---

## Step 3

Verify Registry Access

Private registries require authentication.

Verify

```bash
kubectl get secrets \
-n <namespace>
```

Look for

```
docker-registry

imagePullSecret
```

---

## Step 4

Verify imagePullSecrets

```bash
kubectl describe serviceaccount default \
-n <namespace>
```

or

```bash
kubectl describe pod <pod-name>
```

Ensure

```
imagePullSecrets
```

is configured.

---

## Step 5

Verify Registry Availability

Check whether

- Docker Hub
- Harbor
- ECR
- GCR
- ACR

is reachable.

---

## Step 6

Verify Deployment YAML

```bash
kubectl get deployment <deployment> \
-o yaml \
-n <namespace>
```

Confirm

```
image:
```

contains the correct repository and tag.

---

## Step 7

Review CI/CD

Confirm

- Correct image built
- Correct tag pushed
- Registry upload successful

---

# 9. Resolution Steps

Wrong image

```bash
kubectl set image deployment/<deployment> \
<container>=<correct-image> \
-n <namespace>
```

Wrong tag

Update deployment.

Missing imagePullSecret

Create Secret

Attach Secret

Restart deployment.

Registry unavailable

Restore registry connectivity.

Pipeline issue

Rebuild image.

Push image again.

---

# 10. Validation Steps

Verify

```bash
kubectl get pods \
-n <namespace>
```

Expected

```
Running
```

Verify rollout

```bash
kubectl rollout status deployment/<deployment>
```

Verify logs

```bash
kubectl logs <pod>
```

Business Validation

- Login
- APIs
- Dashboard
- Monitoring

---

# 11. Rollback Procedure

If incorrect image was deployed

```bash
kubectl rollout undo deployment/<deployment>
```

Verify

```bash
kubectl rollout history deployment/<deployment>
```

Confirm production recovery.

---

# 12. Escalation Matrix

L1

- Collect Pod description
- Collect Events

↓

L2

- Verify deployment
- Verify registry
- Verify Secrets

↓

Platform Team

- Registry issues
- Network issues

↓

CI/CD Team

- Build failure
- Image publishing failure

---

# 13. Production Best Practices

- Never use the latest tag in production.
- Use immutable image versions.
- Verify image exists before deployment.
- Validate registry authentication.
- Monitor image pull failures.
- Scan images before release.
- Keep rollback version available.

---

# 14. Real Production Scenario

A production deployment completed successfully but all Pods entered ImagePullBackOff.

Investigation

```
kubectl describe pod
```

showed

```
manifest unknown
```

The CI pipeline pushed

```
frontend:v2.3.0
```

but Deployment referenced

```
frontend:v2.3
```

Updating the image tag resolved the issue immediately.

Root Cause

Incorrect image tag.

---

# 15. Scenario Interview Questions

## Q1. What is ImagePullBackOff?

### Answer

ImagePullBackOff indicates Kubernetes cannot download the container image.

Typical reasons

- Wrong image
- Wrong tag
- Registry authentication
- Registry unavailable

Commands

```bash
kubectl describe pod

kubectl get events
```

---

## Q2. Which command provides the most useful information?

### Answer

```bash
kubectl describe pod <pod>
```

It displays

- Image
- Events
- Registry error
- Authentication failures
- Manifest errors

---

## Q3. Why shouldn't latest be used in production?

### Answer

The latest tag is mutable.

Different deployments may pull different images, making troubleshooting and rollback difficult.

Use immutable semantic versions instead.

---

# 16. Architecture Interview Questions

## Q1. Explain ImagePullBackOff workflow.

### Answer

```
Deployment

↓

Scheduler

↓

Node

↓

kubelet

↓

Container Runtime

↓

Registry

↓

Image Pull

↓

Failure

↓

ImagePullBackOff
```

---

## Q2. Which components participate?

### Answer

- API Server
- Scheduler
- kubelet
- Container Runtime
- Registry
- Deployment

---

# 17. Production Support Interview Questions

## Q1. A deployment is stuck in ImagePullBackOff. How will you investigate?

### Answer

Commands

```bash
kubectl get pods

kubectl describe pod

kubectl describe deployment

kubectl get events
```

Verify

- Image name
- Image tag
- Registry
- imagePullSecret
- CI pipeline

---

## Q2. Registry authentication fails. What will you check?

### Answer

Verify

```bash
kubectl get secret

kubectl describe secret

kubectl describe serviceaccount
```

Confirm

- Docker credentials
- Registry URL
- Secret attachment
- Token validity

---

# 18. Commands Reference

```bash
kubectl get pods -A

kubectl describe pod <pod>

kubectl describe deployment <deployment>

kubectl get deployment -o yaml

kubectl get events

kubectl rollout undo deployment

kubectl rollout status deployment
```

---

# 19. Marathi Quick Revision

- Describe Pod करा.
- Events तपासा.
- Image name verify करा.
- Tag verify करा.
- Registry verify करा.
- imagePullSecret तपासा.
- CI/CD pipeline verify करा.

---

# 20. Related Runbooks

- 01-pod-crashloopbackoff.md
- 03-pod-pending.md
- 06-deployment-rollback.md
- 13-secret-rotation.md

---

# 21. Marathi Summary (5+ Experience Revision)

## Interview Summary

ImagePullBackOff म्हणजे Kubernetes ला container image registry मधून image डाउनलोड करता येत नाही. Production मध्ये सर्वप्रथम `kubectl describe pod` वापरून Events तपासावेत. त्यानंतर image name, image tag, registry authentication, imagePullSecret आणि CI/CD pipeline verify करावी. Pod delete केल्याने समस्या सुटत नाही; योग्य image किंवा registry समस्या दुरुस्त करणे आवश्यक असते.

### Production Investigation Flow

```
Alert

↓

Pod Status

↓

Describe Pod

↓

Events

↓

Image Name

↓

Image Tag

↓

Registry

↓

imagePullSecret

↓

CI/CD Pipeline

↓

Fix

↓

Validation

↓

RCA
```

### Production Story

एका production e-commerce application मध्ये नवीन release नंतर सर्व frontend Pods ImagePullBackOff मध्ये गेल्या. Investigation दरम्यान `kubectl describe pod` मध्ये `manifest unknown` दिसले. CI pipeline ने `frontend:v4.2.1` push केले होते, पण Deployment मध्ये `frontend:v4.2` configure केले होते. योग्य image tag update करून rollout केल्यानंतर सर्व Pods काही मिनिटांत Running झाल्या. Incident review मध्ये immutable image tagging अनिवार्य करण्यात आले.

### 5+ Years Memory Trick

Interview मध्ये जर विचारले,

**"How do you troubleshoot ImagePullBackOff in production?"**

उत्तर:

"I start with `kubectl describe pod` to identify the exact registry error. Then I verify the image name, image tag, registry accessibility, imagePullSecret configuration and CI/CD pipeline output. After correcting the root cause, I validate the rollout and perform business verification before closing the incident."

