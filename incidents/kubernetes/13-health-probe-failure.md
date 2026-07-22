# Kubernetes Production Incident 13 - Health Probe Failure During Production

# 1. Incident Overview

## Incident ID

INC-K8S-013

## Severity

SEV-1

## Environment

Production

## Reported By

Prometheus Alertmanager

## Incident Time

09:12 AM

## Resolved Time

09:54 AM

## Duration

42 Minutes

## Affected Component

Kubernetes Health Probes

## Affected Service

API Gateway

## Impacted Application

Enterprise DevOps Platform

```
Frontend

↓

Ingress

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

- Login requests intermittently failed
- Dashboard unavailable
- APIs returned HTTP 503
- Frequent request timeouts

Business Impact

- Customer sessions interrupted
- Increased API failures
- SLA degradation
- Support ticket volume increased

Estimated Revenue Impact

High

---

# 3. Alert Received

Prometheus Alert

```
KubePodCrashLooping

Severity

Critical

Namespace

enterprise-devops

Deployment

api-gateway
```

Grafana Dashboard

```
Pod Restarts ↑

Availability ↓

Probe Failures ↑
```

Application Logs

```
Application Started

Listening on Port 8080
```

Kubernetes Events

```
Readiness probe failed

HTTP probe failed with statuscode: 503
```

---

# 4. Production Architecture

```
GitHub Actions

↓

Argo CD

↓

Deployment

↓

Liveness Probe

↓

Readiness Probe

↓

API Gateway Pods
```

---

# 5. Symptoms

Observed

- Pods continuously restarting
- Readiness probe failures
- Liveness probe failures
- Application logs appeared healthy

Users observed

- HTTP 503
- Login failures
- API unavailable
- Dashboard inaccessible

---

# 6. Initial Investigation

Objective

Determine whether issue is related to

- Health probes
- Application
- Deployment
- Node
- Recent release

Commands

```bash
kubectl get pods

kubectl describe pod

kubectl logs

kubectl get events
```

Observation

```
Readiness Probe Failed
```

---

# 7. Investigation Timeline

## 09:12

Critical alert received.

---

## 09:15

Verified Pods.

```bash
kubectl get pods
```

Observed

```
Running

0/1 Ready

Restart Count Increasing
```

---

## 09:19

Reviewed Events.

```bash
kubectl describe pod api-gateway-pod
```

Observed

```
Readiness probe failed

HTTP 503
```

---

## 09:23

Reviewed application logs.

```bash
kubectl logs api-gateway-pod
```

Observed

```
Application started successfully.
```

Application appeared healthy.

---

## 09:28

Compared Deployment manifest.

Observed

```
Initial Delay

5 Seconds
```

Application startup required

```
35 Seconds
```

---

## 09:33

Verified probe configuration.

Readiness probe executed before application initialization completed.

---

## 09:37

Root Cause confirmed.

---

## 09:42

Updated Deployment.

```bash
kubectl edit deployment api-gateway
```

Updated

```
initialDelaySeconds

5

↓

40
```

Also increased

```
failureThreshold
```

Applied rollout.

---

## 09:49

Pods became Ready.

---

## 09:54

Business validation completed.

Incident closed.

---

# 8. Commands Executed

Pods

```bash
kubectl get pods

kubectl describe pod

kubectl logs
```

Deployment

```bash
kubectl describe deployment

kubectl edit deployment

kubectl rollout status deployment/api-gateway
```

Events

```bash
kubectl get events \
--sort-by=.metadata.creationTimestamp
```

Probe Verification

```bash
kubectl get deployment -o yaml
```

---

# 9. Findings

Infrastructure

Healthy

Cluster

Healthy

Application

Healthy

Probe Configuration

Incorrect

Root Issue

Readiness probe executed before application startup completed.

---

# 10. Root Cause

A recent deployment reduced the Readiness Probe `initialDelaySeconds` from 40 seconds to 5 seconds.

The application required approximately 35 seconds to initialize database connections and caches.

Kubernetes repeatedly marked the Pods as Unready and restarted them.

---

# 11. Resolution

Updated probe configuration.

Restarted Deployment.

Validated application readiness.

Verified customer functionality.

---

# 12. Validation

Pods

```bash
kubectl get pods

kubectl describe pod
```

Business

- Login successful
- APIs healthy
- Dashboard available
- Response times normal

Monitoring

- Probe failures cleared
- Restart alerts resolved
- Availability restored

---

# 13. Rollback

Rollback Deployment.

```bash
kubectl rollout undo deployment/api-gateway
```

Verify previous probe configuration.

---

# 14. Customer Communication

Initial Update

> We are investigating an application availability issue affecting API traffic.

Progress Update

> The issue has been isolated to application health checks. Configuration changes are in progress.

Resolution

> Services have been restored successfully. Additional monitoring has been enabled.

---

# 15. Incident Timeline

```
09:12

Alert

↓

09:19

Probe Failure Verified

↓

09:23

Application Logs Reviewed

↓

09:28

Deployment Reviewed

↓

09:33

Configuration Analysis

↓

09:37

Root Cause

↓

09:42

Probe Updated

↓

09:49

Pods Ready

↓

09:54

Incident Closed
```

---

# 16. Root Cause Analysis (RCA)

## What Happened?

Pods repeatedly failed Kubernetes health checks.

## Why?

Readiness probe started before application initialization completed.

## Why wasn't it detected?

Probe configuration was not validated during deployment testing.

## Customer Impact

Application unavailable despite healthy containers.

## Preventive Action

Implement startup testing and probe validation in CI/CD.

---

# 17. Preventive Actions

- Validate probe configuration before deployment.
- Include startup duration in performance testing.
- Configure realistic initial delays.
- Review probe settings during code review.
- Implement deployment smoke tests.
- Monitor probe failure metrics.

---

# 18. Production Best Practices

- Never copy probe settings between applications.
- Measure actual application startup time.
- Configure startupProbe for slow-starting applications.
- Separate readiness and liveness responsibilities.
- Review probe settings after major releases.
- Test deployments under production-like conditions.

---

# 19. Production Support Interview Questions

## Q1. How do you investigate health probe failures?

### Answer

1. Assess business impact.
2. Review Pod status.
3. Inspect Kubernetes Events.
4. Verify application logs.
5. Compare probe configuration with startup behavior.
6. Review recent deployments.
7. Update probe configuration.
8. Validate application recovery.
9. Complete RCA.

---

## Q2. Why can a healthy application fail Kubernetes probes?

### Answer

Because Kubernetes evaluates probe responses, not application intentions. If the application requires longer to initialize than the configured probe delay, Kubernetes may repeatedly mark healthy containers as unhealthy.

---

## Q3. When should Startup Probes be used?

### Answer

Startup Probes should be used for applications with long initialization times to prevent Liveness and Readiness Probes from executing before startup completes.

---

# 20. Marathi Quick Revision

- Events तपासा.
- Describe Pod करा.
- Logs verify करा.
- Probe configuration compare करा.
- Startup time तपासा.
- Root Cause शोधा.
- Probe update करा.
- Business validation करा.
- RCA तयार करा.

---

# 21. Marathi Summary (5+ Experience Revision)

## Interview Summary

Production मध्ये Health Probe failure आल्यास प्रथम Kubernetes Events आणि `kubectl describe pod` तपासावे. त्यानंतर application logs आणि probe configuration compare करावी. Application startup time आणि probe timing verify करून Root Cause निश्चित करावा. योग्य probe configuration update करून deployment validate करावी. शेवटी business validation, monitoring validation आणि RCA पूर्ण करावी.

### Production Investigation Flow

```
Alert

↓

Pod Status

↓

Events

↓

Application Logs

↓

Probe Configuration

↓

Startup Time

↓

Root Cause

↓

Configuration Fix

↓

Business Validation

↓

RCA
```

### Production Story

एका production fintech platform मध्ये नवीन release नंतर API Pods सतत restart होत होते. Application logs पूर्णपणे normal होते, त्यामुळे सुरुवातीला application bug असल्याचा संशय आला. Investigation मध्ये deployment दरम्यान Readiness Probe ची `initialDelaySeconds` 30 वरून 5 करण्यात आल्याचे आढळले. Application ला startup साठी 32-35 seconds लागत होते. Probe configuration दुरुस्त करून rollout केल्यानंतर सर्व Pods Ready झाले. Incident नंतर सर्व deployments मध्ये startup timing validation आणि `startupProbe` mandatory करण्यात आले.

### 5+ Years Memory Trick

Interview मध्ये जर विचारले,

**"How do you troubleshoot Kubernetes Health Probe failures in production?"**

उत्तर:

"I first assess the business impact, inspect Pod events and probe failures, verify application logs, compare startup time with probe configuration, identify configuration mismatches, update the probe settings, validate application readiness, monitor stability, and complete the RCA."

