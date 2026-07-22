# Kubernetes Production Incident 05 - Kubernetes Service Not Reachable During Production

# 1. Incident Overview

## Incident ID

INC-K8S-005

## Severity

SEV-1

## Environment

Production

## Reported By

Prometheus Alertmanager

## Incident Time

03:12 PM

## Resolved Time

03:46 PM

## Duration

34 Minutes

## Affected Component

Kubernetes Service

## Affected Service

Auth Service

## Impacted Application

Enterprise DevOps Platform

```
Frontend

↓

API Gateway

↓

Auth Service Service ❌

↓

Auth Pods
```

---

# 2. Business Impact

Customer Impact

- Login unavailable
- JWT generation failed
- Authentication APIs returning HTTP 503
- Dashboard inaccessible

Business Impact

- Customer logins failed
- Internal applications affected
- SLA breach risk
- Increased support tickets

Estimated Revenue Impact

High

---

# 3. Alert Received

Prometheus Alert

```
ServiceEndpointUnavailable

Severity

Critical

Namespace

enterprise-devops

Service

auth-service
```

Grafana Dashboard

```
Service Availability ↓

API Errors ↑

HTTP 503 ↑
```

---

# 4. Production Architecture

```
Frontend

↓

API Gateway

↓

ClusterIP Service

↓

Auth Pods
```

Deployment Pipeline

```
GitHub Actions

↓

Container Registry

↓

Argo CD

↓

Kubernetes
```

---

# 5. Symptoms

Observed

- Service reachable inside cluster
- No endpoints available
- Pods healthy
- API Gateway timeout

Users observed

- Login failure
- HTTP 503
- Authentication timeout

---

# 6. Initial Investigation

Objective

Determine whether issue is related to

- Service
- Endpoints
- Labels
- Selectors
- Pods
- Deployment

Commands

```bash
kubectl get svc

kubectl get endpoints

kubectl get pods --show-labels
```

Observation

```
Service

No Endpoints
```

---

# 7. Investigation Timeline

## 03:12

Critical alert received.

---

## 03:15

Verified Pods.

```bash
kubectl get pods -n enterprise-devops
```

Pods

```
Running
```

---

## 03:18

Verified Service.

```bash
kubectl get svc
```

Service existed.

---

## 03:20

Verified Endpoints.

```bash
kubectl get endpoints auth-service
```

Result

```
<none>
```

---

## 03:23

Reviewed Service.

```bash
kubectl describe svc auth-service
```

Selector

```
app=authentication
```

---

## 03:26

Verified Pod labels.

```bash
kubectl get pods \
--show-labels
```

Observed

```
app=auth-service
```

Label mismatch detected.

---

## 03:30

Reviewed Git history.

Latest deployment changed Pod labels but Service selector remained unchanged.

---

## 03:33

Root Cause confirmed.

---

## 03:36

Updated Service selector.

```bash
kubectl edit svc auth-service
```

Updated selector

```
app=auth-service
```

---

## 03:40

Endpoints created automatically.

```bash
kubectl get endpoints auth-service
```

Endpoints available.

---

## 03:46

Business validation successful.

Incident closed.

---

# 8. Commands Executed

Services

```bash
kubectl get svc

kubectl describe svc
```

Endpoints

```bash
kubectl get endpoints
```

Pods

```bash
kubectl get pods

kubectl get pods \
--show-labels
```

Deployment

```bash
kubectl describe deployment
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

Pods

Healthy

Service

Healthy

Endpoints

Missing

Root Issue

Service selector mismatch

---

# 10. Root Cause

During a deployment, Pod labels were modified from

```
app=authentication
```

to

```
app=auth-service
```

The Kubernetes Service selector was not updated.

As a result, the Service had no endpoints and traffic could not reach the Pods.

---

# 11. Resolution

Updated Service selector.

Verified endpoints.

Validated application.

---

# 12. Validation

Infrastructure

```bash
kubectl get nodes
```

Endpoints

```bash
kubectl get endpoints auth-service
```

Pods

```bash
kubectl get pods
```

Business

- Login successful
- JWT generated
- Dashboard available
- APIs healthy

Monitoring

- HTTP 503 cleared
- Endpoint alert resolved
- Service healthy

---

# 13. Rollback

Rollback Service manifest.

```bash
kubectl apply -f previous-service.yaml
```

or

Rollback deployment.

```bash
kubectl rollout undo deployment/auth-service
```

---

# 14. Customer Communication

Initial Update

> We are investigating an issue affecting authentication services.

Progress Update

> Root cause has been identified within Kubernetes service routing. Recovery is in progress.

Resolution

> Authentication services have been restored successfully. Monitoring continues.

---

# 15. Incident Timeline

```
03:12

Alert

↓

03:18

Service Verified

↓

03:20

No Endpoints

↓

03:26

Label Mismatch

↓

03:33

Root Cause

↓

03:36

Service Updated

↓

03:40

Endpoints Restored

↓

03:46

Incident Closed
```

---

# 16. Root Cause Analysis (RCA)

## What Happened?

Service had no endpoints.

## Why?

Service selector no longer matched Pod labels.

## Why wasn't it detected?

Deployment validation did not verify Service endpoints.

## Customer Impact

Authentication unavailable.

## Preventive Action

Automate Service-to-Pod selector validation after every deployment.

---

# 17. Preventive Actions

- Validate Service selectors during CI/CD.
- Add endpoint health checks.
- Block deployment when endpoints are zero.
- Implement deployment smoke tests.
- Review label changes through peer review.
- Monitor endpoint count continuously.

---

# 18. Production Best Practices

- Standardize Kubernetes labels.
- Never modify labels without updating selectors.
- Validate endpoints after every deployment.
- Use GitOps reviews for Service manifests.
- Monitor endpoint availability.
- Include Service validation in release checklist.

---

# 19. Production Support Interview Questions

## Q1. Pods are Running but Service is not working. What do you check first?

### Answer

1. Verify Service.
2. Check Endpoints.
3. Compare Service selectors with Pod labels.
4. Validate targetPort and port.
5. Review recent deployments.
6. Validate application connectivity.

---

## Q2. Which command quickly identifies a selector mismatch?

### Answer

```bash
kubectl get endpoints

kubectl describe svc

kubectl get pods --show-labels
```

---

## Q3. Why can Pods be healthy while the Service fails?

### Answer

Because Kubernetes Services route traffic using label selectors. If selectors do not match Pod labels, the Service has no endpoints even though Pods are healthy.

---

# 20. Marathi Quick Revision

- Pods Running आहेत का तपासा.
- Service verify करा.
- Endpoints तपासा.
- Labels verify करा.
- Selectors verify करा.
- Root Cause शोधा.
- Service update करा.
- Business validation करा.
- RCA तयार करा.

---

# 21. Marathi Summary (5+ Experience Revision)

## Interview Summary

Production मध्ये Service Down असल्यास प्रथम Pods healthy आहेत का ते verify करावे. त्यानंतर `kubectl get endpoints`, `kubectl describe svc` आणि Pod labels तपासावेत. Service selector आणि Pod labels जुळतात का हे निश्चित करावे. Root Cause निश्चित झाल्यानंतर Service manifest दुरुस्त करावा. शेवटी business validation, monitoring validation आणि RCA पूर्ण करावी.

### Production Investigation Flow

```
Alert

↓

Pods

↓

Service

↓

Endpoints

↓

Labels

↓

Selectors

↓

Root Cause

↓

Fix

↓

Business Validation

↓

RCA
```

### Production Story

एका production insurance platform मध्ये authentication Pods पूर्णपणे healthy होते, पण सर्व login requests HTTP 503 देत होते. Investigation मध्ये `kubectl get endpoints` ने कोणतेही endpoints नसल्याचे दिसले. Deployment दरम्यान Pod labels बदलले गेले होते, पण Service selector जुना राहिला होता. Service selector update केल्यानंतर endpoints लगेच तयार झाले आणि production traffic काही सेकंदांत पुन्हा सुरू झाली. Incident नंतर CI/CD मध्ये automated Service-to-Pod selector validation जोडण्यात आली.

### 5+ Years Memory Trick

Interview मध्ये जर विचारले,

**"Pods are Running but the Kubernetes Service is unavailable. How do you investigate?"**

उत्तर:

"I first verify that the Pods are healthy, then inspect the Service and its endpoints, compare Service selectors with Pod labels, validate ports and targetPorts, review recent deployments for label changes, identify the routing issue, restore Service connectivity, validate business functionality, monitor recovery, and complete the RCA."

