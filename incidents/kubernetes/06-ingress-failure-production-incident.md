# Kubernetes Production Incident 06 - Ingress Failure During Production

# 1. Incident Overview

## Incident ID

INC-K8S-006

## Severity

SEV-1

## Environment

Production

## Reported By

Prometheus Alertmanager

## Incident Time

08:42 AM

## Resolved Time

09:21 AM

## Duration

39 Minutes

## Affected Component

NGINX Ingress Controller

## Affected Service

Frontend

## Impacted Application

Enterprise DevOps Platform

```
Users

↓

Load Balancer

↓

NGINX Ingress ❌

↓

API Gateway

↓

Backend Services
```

---

# 2. Business Impact

Customer Impact

- Website inaccessible
- APIs unreachable
- Login unavailable
- Dashboard inaccessible

Business Impact

- Complete customer outage
- Revenue-generating transactions interrupted
- Customer support volume increased
- SLA breach

Estimated Revenue Impact

Critical

---

# 3. Alert Received

Prometheus Alert

```
IngressDown

Severity

Critical

Namespace

ingress-nginx
```

Grafana Dashboard

```
HTTP 502 ↑

HTTP 504 ↑

Ingress Availability ↓
```

External Monitoring

```
https://portal.company.com

HTTP 502
```

---

# 4. Production Architecture

```
Internet

↓

DNS

↓

Load Balancer

↓

NGINX Ingress Controller

↓

API Gateway Service

↓

Application Pods
```

---

# 5. Symptoms

Observed

- Website unavailable
- HTTP 502
- HTTP 504
- Backend Pods healthy
- Services healthy

Users observed

- Login failure
- Website timeout
- API timeout

---

# 6. Initial Investigation

Objective

Determine whether the issue is related to

- DNS
- Load Balancer
- Ingress Controller
- Ingress Rules
- Services
- Backend Pods

Commands

```bash
kubectl get ingress -A

kubectl get pods -n ingress-nginx

kubectl get svc -A
```

Observation

```
Ingress Controller Running

Backend Unreachable
```

---

# 7. Investigation Timeline

## 08:42

Critical alert received.

---

## 08:45

Verified cluster.

```bash
kubectl get nodes
```

Healthy.

---

## 08:47

Verified Ingress Controller Pods.

```bash
kubectl get pods \
-n ingress-nginx
```

Pods

```
Running
```

---

## 08:50

Verified Ingress.

```bash
kubectl describe ingress enterprise-ingress
```

Rules existed.

---

## 08:53

Verified Services.

```bash
kubectl get svc
```

Services healthy.

---

## 08:56

Checked Ingress Controller logs.

```bash
kubectl logs \
deployment/ingress-nginx-controller \
-n ingress-nginx
```

Observed

```
Service

api-gateway-service

not found
```

---

## 08:59

Reviewed latest Git commit.

Deployment renamed Service

```
api-gateway

↓

gateway-service
```

Ingress backend still referenced

```
api-gateway-service
```

---

## 09:03

Root Cause confirmed.

---

## 09:06

Updated Ingress backend.

```bash
kubectl apply \
-f ingress.yaml
```

---

## 09:12

Ingress reloaded.

---

## 09:16

HTTP 200 responses restored.

---

## 09:21

Business validation completed.

Incident closed.

---

# 8. Commands Executed

Ingress

```bash
kubectl get ingress

kubectl describe ingress
```

Ingress Controller

```bash
kubectl get pods \
-n ingress-nginx

kubectl logs \
deployment/ingress-nginx-controller \
-n ingress-nginx
```

Services

```bash
kubectl get svc

kubectl describe svc
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

Load Balancer

Healthy

Ingress Controller

Healthy

Pods

Healthy

Root Issue

Ingress backend referenced a non-existent Service.

---

# 10. Root Cause

A recent deployment renamed the API Gateway Service.

The Ingress resource still referenced the previous Service name.

NGINX Ingress could not route traffic to any backend.

---

# 11. Resolution

Updated Ingress backend configuration.

Applied corrected manifest.

Verified Ingress reload.

Confirmed HTTP 200 responses.

---

# 12. Validation

Ingress

```bash
kubectl get ingress
```

Services

```bash
kubectl get svc
```

Business

- Website accessible
- Login successful
- Dashboard available
- APIs responding normally

Monitoring

- HTTP 502 cleared
- Ingress alerts resolved
- Availability restored

---

# 13. Rollback

Rollback previous Ingress manifest.

```bash
kubectl apply \
-f previous-ingress.yaml
```

or

Rollback GitOps deployment.

Validate routing after rollback.

---

# 14. Customer Communication

Initial Update

> We are investigating an issue affecting customer access to the platform.

Progress Update

> Root cause has been identified within the Kubernetes ingress routing configuration. Recovery is underway.

Resolution

> Customer access has been fully restored. Monitoring will continue to ensure platform stability.

---

# 15. Incident Timeline

```
08:42

Alert

↓

08:47

Ingress Controller Verified

↓

08:50

Ingress Rules Reviewed

↓

08:56

Logs Investigated

↓

08:59

Service Rename Identified

↓

09:03

Root Cause

↓

09:06

Ingress Updated

↓

09:16

Traffic Restored

↓

09:21

Incident Closed
```

---

# 16. Root Cause Analysis (RCA)

## What Happened?

Ingress routed traffic to a Service that no longer existed.

## Why?

Ingress manifest was not updated after Service renaming.

## Why wasn't it detected?

Deployment validation did not verify Ingress backend targets.

## Customer Impact

Complete application outage.

## Preventive Action

Validate every Ingress backend during deployment.

---

# 17. Preventive Actions

- Validate Ingress backends in CI/CD.
- Add automated routing tests.
- Block deployment if referenced Services do not exist.
- Perform GitOps peer review.
- Monitor HTTP 5xx errors.
- Implement synthetic endpoint monitoring.

---

# 18. Production Best Practices

- Never rename Services without updating Ingress.
- Test routing after every deployment.
- Use automated smoke tests.
- Monitor NGINX Ingress logs.
- Validate DNS, Load Balancer and Ingress together.
- Maintain immutable naming conventions where possible.

---

# 19. Production Support Interview Questions

## Q1. Users receive HTTP 502 but Pods are healthy. What do you investigate?

### Answer

1. Verify DNS.
2. Verify Load Balancer.
3. Verify Ingress.
4. Review Ingress Controller logs.
5. Validate backend Service names.
6. Verify Endpoints.
7. Test application routing.
8. Restore configuration.
9. Validate business functionality.

---

## Q2. Which command is most useful for Ingress troubleshooting?

### Answer

```bash
kubectl describe ingress

kubectl logs deployment/ingress-nginx-controller \
-n ingress-nginx
```

---

## Q3. Why can the Ingress Controller be healthy while users receive HTTP 502?

### Answer

Because the controller itself is running correctly, but its backend Service configuration is invalid or unavailable, preventing traffic from reaching application Pods.

---

# 20. Marathi Quick Revision

- Ingress verify करा.
- Controller logs तपासा.
- Service verify करा.
- Endpoints verify करा.
- Backend नाव तपासा.
- Root Cause शोधा.
- Routing fix करा.
- Business validation करा.
- RCA तयार करा.

---

# 21. Marathi Summary (5+ Experience Revision)

## Interview Summary

Production मध्ये Ingress failure आल्यास प्रथम DNS, Load Balancer आणि Ingress Controller verify करावा. त्यानंतर `kubectl describe ingress`, controller logs, backend Services आणि Endpoints तपासावेत. Service rename, routing configuration किंवा backend mismatch शोधून दुरुस्त करावे. शेवटी business validation, monitoring validation आणि RCA पूर्ण करावी.

### Production Investigation Flow

```
Alert

↓

DNS

↓

Load Balancer

↓

Ingress

↓

Controller Logs

↓

Services

↓

Endpoints

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

एका production SaaS application मध्ये deployment नंतर सर्व users ना HTTP 502 errors येऊ लागले. Ingress Controller पूर्णपणे healthy होता आणि backend Pods देखील Running होते. Investigation दरम्यान controller logs मध्ये backend Service सापडत नसल्याचे दिसले. Deployment मध्ये Service चे नाव बदलले गेले होते, पण Ingress manifest update झाले नव्हते. योग्य backend Service configure केल्यानंतर काही मिनिटांत production traffic पूर्णपणे restore झाले. त्यानंतर CI/CD pipeline मध्ये Ingress backend validation आणि automated routing smoke tests अनिवार्य करण्यात आले.

### 5+ Years Memory Trick

Interview मध्ये जर विचारले,

**"How do you troubleshoot a Kubernetes Ingress production outage?"**

उत्तर:

"I first verify DNS, the Load Balancer and the Ingress Controller, inspect the Ingress resource and controller logs, validate backend Services and Endpoints, identify routing or configuration mismatches, apply the safest fix or rollback, validate business functionality, monitor traffic recovery, and complete the RCA."

