# Kubernetes Production Incident 08 - ConfigMap Deployment Failure During Production

# 1. Incident Overview

## Incident ID

INC-K8S-008

## Severity

SEV-2

## Environment

Production

## Reported By

Prometheus Alertmanager

## Incident Time

04:05 PM

## Resolved Time

04:36 PM

## Duration

31 Minutes

## Affected Component

ConfigMap

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
- APIs returned HTTP 500
- Dashboard partially unavailable

Business Impact

- Internal service communication degraded
- Increased API failures
- Customer support tickets increased

Estimated Revenue Impact

Medium

---

# 3. Alert Received

Prometheus Alert

```
ApplicationErrorRate

Severity

High

Namespace

enterprise-devops

Deployment

api-gateway
```

Grafana Dashboard

```
HTTP 500 ↑

Pod Restarts ↑

Availability ↓
```

Application Logs

```
FATAL

Missing configuration

DATABASE_HOST
```

---

# 4. Production Architecture

```
GitHub Actions

↓

Argo CD

↓

ConfigMap

↓

Deployment

↓

API Gateway Pods
```

---

# 5. Symptoms

Observed

- Pods repeatedly restarting
- CrashLoopBackOff
- Missing environment variables
- API unavailable

Users observed

- HTTP 500
- Login failures
- API timeout

---

# 6. Initial Investigation

Objective

Determine whether issue is related to

- ConfigMap
- Deployment
- Secret
- Application
- Recent release

Commands

```bash
kubectl get pods

kubectl describe pod

kubectl logs --previous
```

Observation

```
Configuration missing
```

---

# 7. Investigation Timeline

## 04:05

Critical alert received.

---

## 04:08

Verified Pods.

```bash
kubectl get pods
```

Observed

```
CrashLoopBackOff
```

---

## 04:11

Collected logs.

```bash
kubectl logs \
<api-gateway-pod> \
--previous
```

Observed

```
DATABASE_HOST not found
```

---

## 04:14

Reviewed Pod specification.

```bash
kubectl describe pod
```

Application expecting

```
DATABASE_HOST
```

---

## 04:17

Verified ConfigMap.

```bash
kubectl describe configmap api-gateway-config
```

Observed

```
DATABASEHOST
```

Variable name incorrectly committed.

---

## 04:20

Reviewed Git history.

Recent ConfigMap update removed underscore.

---

## 04:24

Root Cause confirmed.

---

## 04:27

Corrected ConfigMap.

```bash
kubectl apply \
-f api-gateway-config.yaml
```

Restarted deployment.

```bash
kubectl rollout restart \
deployment/api-gateway
```

---

## 04:33

Pods Running.

---

## 04:36

Business validation completed.

Incident closed.

---

# 8. Commands Executed

Pods

```bash
kubectl get pods

kubectl describe pod

kubectl logs

kubectl logs --previous
```

ConfigMap

```bash
kubectl get configmap

kubectl describe configmap

kubectl edit configmap
```

Deployment

```bash
kubectl rollout restart deployment/api-gateway

kubectl rollout status deployment/api-gateway
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

Restarting

Application

Missing configuration

Root Issue

Incorrect ConfigMap key

---

# 10. Root Cause

A configuration change renamed the environment variable

```
DATABASE_HOST

↓

DATABASEHOST
```

The application expected the original variable name and failed during startup.

Pods continuously restarted.

---

# 11. Resolution

Corrected ConfigMap.

Restarted Deployment.

Verified application startup.

Validated business functionality.

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
- APIs healthy
- Dashboard available

Monitoring

- Restart alerts cleared
- HTTP 500 resolved
- Deployment healthy

---

# 13. Rollback

Restore previous ConfigMap.

```bash
kubectl apply \
-f previous-configmap.yaml
```

Restart deployment.

```bash
kubectl rollout restart deployment/api-gateway
```

---

# 14. Customer Communication

Initial Update

> We are investigating an application configuration issue affecting API availability.

Progress Update

> Root cause has been identified. Configuration restoration is in progress.

Resolution

> Services have been restored successfully. Monitoring continues.

---

# 15. Incident Timeline

```
04:05

Alert

↓

04:11

Logs Reviewed

↓

04:17

ConfigMap Investigation

↓

04:20

Git History

↓

04:24

Root Cause

↓

04:27

ConfigMap Updated

↓

04:33

Pods Healthy

↓

04:36

Incident Closed
```

---

# 16. Root Cause Analysis (RCA)

## What Happened?

Application configuration became invalid.

## Why?

ConfigMap key renamed incorrectly.

## Why wasn't it detected?

Configuration validation was missing in CI/CD.

## Customer Impact

API unavailable.

## Preventive Action

Implement ConfigMap schema validation before deployment.

---

# 17. Preventive Actions

- Validate ConfigMap keys in CI/CD.
- Use configuration schema validation.
- Implement application startup tests.
- Peer review configuration changes.
- Use GitOps approval workflow.
- Add deployment smoke tests.

---

# 18. Production Best Practices

- Never modify configuration manually in production.
- Version all ConfigMaps.
- Validate application startup after every configuration change.
- Use immutable releases where possible.
- Keep previous ConfigMap versions available.
- Test configuration changes in staging.

---

# 19. Production Support Interview Questions

## Q1. How do you investigate ConfigMap-related failures?

### Answer

1. Check application logs.
2. Verify Pod specification.
3. Review ConfigMap values.
4. Compare expected and actual environment variables.
5. Review recent Git changes.
6. Correct configuration.
7. Restart workload.
8. Validate business functionality.

---

## Q2. Why is `kubectl logs --previous` useful?

### Answer

Because startup failures usually terminate the previous container before the new one starts.

---

## Q3. How can ConfigMap failures be prevented?

### Answer

Configuration schema validation, GitOps workflows, automated smoke tests and peer review significantly reduce production configuration failures.

---

# 20. Marathi Quick Revision

- Logs तपासा.
- ConfigMap verify करा.
- Environment variables compare करा.
- Git history तपासा.
- Root Cause शोधा.
- ConfigMap update करा.
- Deployment restart करा.
- Business validation करा.
- RCA तयार करा.

---

# 21. Marathi Summary (5+ Experience Revision)

## Interview Summary

Production मध्ये ConfigMap failure आल्यास प्रथम application logs तपासावेत. त्यानंतर Pod specification आणि ConfigMap मधील values compare कराव्यात. Recent Git changes verify करून Root Cause निश्चित करावा. योग्य ConfigMap restore करून deployment restart करावा. शेवटी business validation, monitoring validation आणि RCA पूर्ण करावी.

### Production Investigation Flow

```
Alert

↓

Logs

↓

Pod

↓

ConfigMap

↓

Git History

↓

Root Cause

↓

Fix

↓

Restart

↓

Business Validation

↓

RCA
```

### Production Story

एका production retail application मध्ये deployment नंतर API Gateway सतत CrashLoopBackOff मध्ये जात होती. Logs मध्ये `DATABASE_HOST not found` दिसले. Investigation मध्ये ConfigMap मधील key चुकून `DATABASEHOST` अशी rename झाल्याचे आढळले. योग्य ConfigMap restore करून deployment restart करण्यात आले आणि काही मिनिटांत सर्व APIs पुन्हा सुरू झाल्या. Incident नंतर CI/CD मध्ये ConfigMap schema validation आणि startup smoke tests अनिवार्य करण्यात आले.

### 5+ Years Memory Trick

Interview मध्ये जर विचारले,

**"How do you troubleshoot a ConfigMap deployment failure in production?"**

उत्तर:

"I first review application logs, inspect the Pod specification, compare ConfigMap values with application expectations, review recent configuration changes in Git, identify the root cause, restore or correct the ConfigMap, restart the workload, validate business functionality, monitor application stability, and complete the RCA."

