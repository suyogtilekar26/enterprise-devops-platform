# Kubernetes Production Incident 02 - ImagePullBackOff During Production Deployment

# 1. Incident Overview

## Incident ID

INC-K8S-002

## Severity

SEV-2

## Environment

Production

## Reported By

Argo CD & Prometheus Alertmanager

## Incident Time

02:15 PM

## Resolved Time

02:42 PM

## Duration

27 Minutes

## Affected Service

API Gateway

## Impacted Application

Enterprise DevOps Platform

```
Frontend

↓

API Gateway ❌

↓

Auth Service

↓

Dashboard Service
```

---

# 2. Business Impact

Customer Impact

- Login requests failed
- API requests returned HTTP 503
- Frontend loaded but backend unavailable
- Mobile application API failures

Business Impact

- Authentication requests delayed
- Customer transactions interrupted
- New deployments blocked

Estimated Revenue Impact

Medium

---

# 3. Alert Received

Prometheus Alert

```
KubePodWaiting

Reason

ImagePullBackOff

Namespace

enterprise-devops
```

Argo CD

```
Application

Degraded

Deployment Progressing

Timeout
```

---

# 4. Production Architecture

```
GitHub Actions

↓

Docker Build

↓

Container Registry

↓

Argo CD

↓

Kubernetes

↓

API Gateway Pods
```

---

# 5. Symptoms

Observed

- Deployment stuck
- Pod Pending
- ImagePullBackOff
- No Ready Pods

Users observed

- HTTP 503
- API unavailable

Pod Status

```
ImagePullBackOff
```

---

# 6. Initial Investigation

Objective

Determine whether the problem is

- Registry
- Kubernetes
- Network
- Authentication
- Image Tag

Commands

```bash
kubectl get pods -n enterprise-devops

kubectl get events \
--sort-by=.metadata.creationTimestamp

kubectl describe pod
```

Observation

```
Failed to pull image
```

---

# 7. Investigation Timeline

## 02:15

Critical alert received.

---

## 02:17

Verified cluster.

```bash
kubectl get nodes
```

Result

```
All Ready
```

---

## 02:18

Checked Pods.

```bash
kubectl get pods
```

Result

```
ImagePullBackOff
```

---

## 02:20

Described Pod.

```bash
kubectl describe pod api-gateway-6d74f89d8f-pbkn9
```

Observed

```
Failed to pull image

manifest unknown
```

---

## 02:22

Reviewed Deployment.

```bash
kubectl describe deployment api-gateway
```

Image

```
registry.company.com/api-gateway:v2.4.7
```

---

## 02:24

Verified Container Registry.

Image

```
v2.4.7
```

did not exist.

Latest available

```
v2.4.6
```

---

## 02:26

Reviewed GitHub Actions.

Pipeline failed during image push because of registry authentication failure.

Deployment manifest referenced an image that had never been uploaded.

---

## 02:29

Root Cause confirmed.

---

## 02:31

Updated Deployment

```bash
kubectl set image deployment/api-gateway \
api-gateway=registry.company.com/api-gateway:v2.4.6
```

---

## 02:36

Pods started successfully.

---

## 02:42

Business validation completed.

Incident closed.

---

# 8. Commands Executed

Cluster

```bash
kubectl cluster-info

kubectl get nodes
```

Pods

```bash
kubectl get pods

kubectl describe pod
```

Deployment

```bash
kubectl describe deployment

kubectl rollout status deployment/api-gateway

kubectl set image deployment/api-gateway \
api-gateway=registry.company.com/api-gateway:v2.4.6
```

Events

```bash
kubectl get events \
--sort-by=.metadata.creationTimestamp
```

---

# 9. Findings

Infrastructure

Healthy

Cluster

Healthy

Registry

Healthy

Deployment

Incorrect image tag

CI Pipeline

Image push failed

---

# 10. Root Cause

The GitHub Actions pipeline failed while pushing the Docker image to the container registry.

Despite the failed push, the deployment manifest referenced the new image tag.

Since the image never existed in the registry, Kubernetes repeatedly failed to pull it.

---

# 11. Resolution

Updated Deployment to use the last verified image.

```bash
kubectl set image deployment/api-gateway \
api-gateway=registry.company.com/api-gateway:v2.4.6
```

Validated rollout.

```bash
kubectl rollout status deployment/api-gateway
```

---

# 12. Validation

Infrastructure

```bash
kubectl get nodes
```

Pods

```bash
kubectl get pods
```

Business

- Login successful
- API Gateway healthy
- Authentication working
- Dashboard operational

Monitoring

- ImagePullBackOff alert cleared
- Availability restored
- HTTP 503 resolved

---

# 13. Rollback

Rollback Deployment

```bash
kubectl rollout undo deployment/api-gateway
```

or

Deploy previous stable image

```bash
kubectl set image deployment/api-gateway \
api-gateway=registry.company.com/api-gateway:v2.4.6
```

Validate application health.

---

# 14. Customer Communication

Initial Update

> We are investigating an issue affecting backend API availability.

Progress Update

> Root cause has been identified as a deployment image issue. Recovery is underway.

Resolution

> Production services have been restored successfully. Monitoring continues to ensure platform stability.

---

# 15. Incident Timeline

```
02:15

Alert

↓

02:18

ImagePullBackOff Verified

↓

02:20

Pod Investigation

↓

02:24

Registry Validation

↓

02:26

CI/CD Investigation

↓

02:29

Root Cause

↓

02:31

Deployment Updated

↓

02:36

Pods Running

↓

02:42

Incident Closed
```

---

# 16. Root Cause Analysis (RCA)

## What Happened?

Deployment referenced a non-existent container image.

## Why?

GitHub Actions failed to push the image.

## Why wasn't it detected?

Deployment continued despite image push failure.

## Customer Impact

API Gateway unavailable.

## Preventive Action

Block deployments when image push fails.

---

# 17. Preventive Actions

- Prevent deployment after failed image push.
- Validate image existence before deployment.
- Add registry verification step.
- Enable deployment gates in CI/CD.
- Improve registry monitoring.
- Alert on failed image uploads.

---

# 18. Production Best Practices

- Never deploy an image that hasn't been verified in the registry.
- Configure CI/CD to fail immediately if image push fails.
- Use immutable image tags.
- Avoid using `latest` in production.
- Validate rollout before approving production deployment.
- Monitor registry authentication failures.

---

# 19. Production Support Interview Questions

## Q1. How do you investigate ImagePullBackOff in production?

### Answer

1. Verify cluster health.
2. Describe the Pod.
3. Review Events.
4. Verify image name and tag.
5. Check container registry.
6. Review CI/CD pipeline.
7. Verify ImagePullSecret.
8. Apply rollback or corrected image.
9. Validate business functionality.

---

## Q2. What are the most common causes of ImagePullBackOff?

### Answer

- Wrong image tag
- Image not pushed
- Registry unavailable
- Authentication failure
- Incorrect ImagePullSecret
- Typographical error

---

## Q3. Should you restart the Pod?

### Answer

No.

Restarting does not resolve ImagePullBackOff because Kubernetes will attempt to pull the same invalid image again.

---

# 20. Marathi Quick Revision

- Pod describe करा.
- Events तपासा.
- Image tag verify करा.
- Registry तपासा.
- CI/CD तपासा.
- ImagePullSecret verify करा.
- योग्य image deploy करा.
- Business validation करा.
- RCA तयार करा.

---

# 21. Marathi Summary (5+ Experience Revision)

## Interview Summary

Production मध्ये ImagePullBackOff आल्यास प्रथम `kubectl describe pod` वापरून exact image pull error पाहावी. त्यानंतर image tag, registry, ImagePullSecret आणि CI/CD pipeline verify करावी. Image registry मध्ये उपलब्ध आहे का हे निश्चित करूनच deployment update किंवा rollback करावा. शेवटी business validation, monitoring validation आणि RCA पूर्ण करावी.

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

Image Tag

↓

Registry

↓

CI/CD

↓

ImagePullSecret

↓

Root Cause

↓

Rollback / Fix

↓

Business Validation

↓

RCA
```

### Production Story

एका production e-commerce platform मध्ये Argo CD ने नवीन deployment सुरू केला, पण API Gateway चे सर्व Pods `ImagePullBackOff` मध्ये गेले. Investigation मध्ये GitHub Actions pipeline image build नंतर registry authentication failure मुळे image push करू शकली नव्हती. Deployment मात्र नवीन tag वापरत होता. मागील verified image वर rollback केल्यानंतर 10 मिनिटांत सर्व services recover झाल्या. Incident नंतर CI/CD मध्ये "verify image exists in registry before deployment" हा mandatory quality gate जोडण्यात आला.

### 5+ Years Memory Trick

Interview मध्ये जर विचारले,

**"How do you handle an ImagePullBackOff production incident?"**

उत्तर:

"I first verify the Pod events using `kubectl describe pod`, confirm the image name and tag, validate registry availability and ImagePullSecret, review the CI/CD pipeline for image push failures, identify the root cause, deploy a verified image or perform a rollback, validate business functionality, monitor the rollout, and complete the RCA."

