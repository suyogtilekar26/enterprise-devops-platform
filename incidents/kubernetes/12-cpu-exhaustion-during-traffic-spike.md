# Kubernetes Production Incident 12 - CPU Exhaustion During Production Traffic Spike

# 1. Incident Overview

## Incident ID

INC-K8S-012

## Severity

SEV-1

## Environment

Production

## Reported By

Prometheus Alertmanager

## Incident Time

02:08 PM

## Resolved Time

02:52 PM

## Duration

44 Minutes

## Affected Component

Application Pods

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

- API responses became slow
- Login requests timed out
- Dashboard loaded slowly
- HTTP 504 errors increased

Business Impact

- High request latency
- Customer transaction delays
- Increased API failures
- SLA breach risk

Estimated Revenue Impact

High

---

# 3. Alert Received

Prometheus Alert

```
ContainerCPUUsageHigh

Severity

Critical

Namespace

enterprise-devops

Deployment

api-gateway
```

Grafana Dashboard

```
CPU Usage

100%

Request Latency ↑

HTTP 504 ↑
```

Application Metrics

```
Average Response Time

250ms

↓

4.8s
```

---

# 4. Production Architecture

```
Frontend

↓

Ingress

↓

API Gateway

↓

Auth Service

↓

Dashboard Service
```

Deployment Pipeline

```
GitHub Actions

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

- CPU utilization reached 100%
- Pods remained Running
- No Pod restarts
- Increased request latency

Users observed

- Slow login
- HTTP 504
- Dashboard timeout
- Slow API responses

---

# 6. Initial Investigation

Objective

Determine whether issue is related to

- CPU exhaustion
- Traffic spike
- Infinite loop
- Resource limits
- HPA
- Recent deployment

Commands

```bash
kubectl get pods

kubectl top pods

kubectl top nodes
```

Observation

```
CPU

100%
```

---

# 7. Investigation Timeline

## 02:08

Critical alert received.

---

## 02:11

Verified Pods.

```bash
kubectl get pods
```

Pods healthy.

---

## 02:14

Checked CPU usage.

```bash
kubectl top pods
```

Observed

```
CPU

990m

Limit

1000m
```

---

## 02:17

Verified Nodes.

```bash
kubectl top nodes
```

Node CPU healthy.

Problem isolated to API Gateway Pods.

---

## 02:21

Reviewed HPA.

```bash
kubectl get hpa
```

Observed

```
Min Replicas

2

Current

2

CPU

100%
```

Autoscaling failed because maximum replicas had already been reached.

---

## 02:26

Reviewed deployment history.

Large marketing campaign began at 02:00 PM.

Traffic increased by 400%.

---

## 02:31

Reviewed application metrics.

No deployment.

No code regression.

CPU increase caused by legitimate traffic spike.

---

## 02:35

Root Cause confirmed.

---

## 02:39

Scaled Deployment.

```bash
kubectl scale deployment api-gateway \
--replicas=8
```

Updated HPA.

```bash
kubectl edit hpa api-gateway
```

Maximum replicas

```
5

↓

10
```

---

## 02:46

CPU utilization normalized.

---

## 02:52

Business validation completed.

Incident closed.

---

# 8. Commands Executed

Pods

```bash
kubectl get pods

kubectl top pods
```

Nodes

```bash
kubectl top nodes
```

Deployment

```bash
kubectl scale deployment api-gateway \
--replicas=8

kubectl rollout status deployment/api-gateway
```

Autoscaling

```bash
kubectl get hpa

kubectl describe hpa

kubectl edit hpa
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

Nodes

Healthy

Pods

Healthy

CPU

Fully utilized

Root Issue

Unexpected production traffic spike

---

# 10. Root Cause

A planned marketing campaign generated approximately four times the normal production traffic.

The Horizontal Pod Autoscaler had already reached its configured maximum replicas.

API Gateway Pods saturated CPU resources, resulting in increased latency.

---

# 11. Resolution

Scaled Deployment.

Increased HPA maximum replicas.

Validated CPU utilization.

Verified customer traffic.

---

# 12. Validation

Pods

```bash
kubectl get pods

kubectl top pods
```

Business

- Login successful
- Dashboard responsive
- APIs healthy
- Response times normalized

Monitoring

- CPU alerts cleared
- Latency normalized
- HTTP 504 resolved

---

# 13. Rollback

If scaling introduces resource pressure

Reduce replicas.

```bash
kubectl scale deployment api-gateway \
--replicas=4
```

Restore previous HPA configuration after traffic stabilizes.

---

# 14. Customer Communication

Initial Update

> We are investigating elevated response times affecting customer requests.

Progress Update

> Increased production traffic has been identified. Additional application capacity is being provisioned.

Resolution

> Platform performance has been restored successfully. Monitoring continues during the traffic event.

---

# 15. Incident Timeline

```
02:08

Alert

↓

02:14

CPU Verified

↓

02:21

HPA Investigated

↓

02:26

Traffic Analysis

↓

02:35

Root Cause

↓

02:39

Scaled Deployment

↓

02:46

CPU Normal

↓

02:52

Incident Closed
```

---

# 16. Root Cause Analysis (RCA)

## What Happened?

API Gateway CPU utilization reached 100%.

## Why?

Production traffic exceeded planned capacity.

## Why wasn't it prevented?

HPA maximum replica count was too low for peak demand.

## Customer Impact

Slow APIs and increased request latency.

## Preventive Action

Improve capacity planning and autoscaling configuration before major business events.

---

# 17. Preventive Actions

- Review HPA limits before campaigns.
- Perform production-scale load testing.
- Coordinate with business teams before promotions.
- Monitor CPU trends continuously.
- Implement predictive autoscaling.
- Maintain capacity planning documentation.

---

# 18. Production Best Practices

- Review business calendars before releases.
- Configure realistic HPA limits.
- Load test at expected peak traffic.
- Monitor CPU and latency together.
- Scale proactively for planned events.
- Review autoscaling after every major campaign.

---

# 19. Production Support Interview Questions

## Q1. How do you investigate high CPU usage in Kubernetes?

### Answer

1. Assess business impact.
2. Check Pod CPU utilization.
3. Verify node utilization.
4. Review HPA status.
5. Check recent deployments.
6. Review traffic patterns.
7. Determine whether the issue is workload or application related.
8. Scale or optimize appropriately.
9. Validate business functionality.
10. Complete RCA.

---

## Q2. Why can Pods remain Running while users experience slow responses?

### Answer

Because CPU exhaustion causes request processing delays without necessarily crashing the application.

---

## Q3. Is scaling always the correct solution?

### Answer

No.

Scaling is appropriate for legitimate traffic growth. If CPU usage is caused by inefficient code, infinite loops or resource leaks, the application must be optimized instead.

---

# 20. Marathi Quick Revision

- CPU usage तपासा.
- `kubectl top pods` चालवा.
- Nodes verify करा.
- HPA तपासा.
- Traffic pattern तपासा.
- Root Cause शोधा.
- Scale करा किंवा optimize करा.
- Business validation करा.
- RCA तयार करा.

---

# 21. Marathi Summary (5+ Experience Revision)

## Interview Summary

Production मध्ये CPU exhaustion आल्यास प्रथम `kubectl top pods` आणि `kubectl top nodes` वापरून CPU utilization तपासावी. त्यानंतर HPA, traffic pattern, recent deployments आणि application metrics verify कराव्यात. Root Cause निश्चित करून workload scale करावा किंवा application optimize करावी. शेवटी business validation, monitoring validation आणि RCA पूर्ण करावी.

### Production Investigation Flow

```
Alert

↓

CPU Usage

↓

Top Pods

↓

Top Nodes

↓

HPA

↓

Traffic Analysis

↓

Root Cause

↓

Scale / Optimize

↓

Business Validation

↓

RCA
```

### Production Story

एका production retail platform वर मोठ्या festive sale च्या सुरुवातीला API Gateway ची CPU utilization 100% झाली. Pods restart होत नव्हते, पण response time 250ms वरून जवळपास 5 seconds झाला. Investigation मध्ये कोणताही deployment किंवा application bug नव्हता; HPA ने maximum replicas गाठले होते. Deployment scale करून आणि HPA limit वाढवून काही मिनिटांत latency सामान्य झाली. Incident नंतर प्रत्येक marketing campaign पूर्वी capacity planning आणि load testing अनिवार्य करण्यात आले.

### 5+ Years Memory Trick

Interview मध्ये जर विचारले,

**"How do you troubleshoot CPU exhaustion in Kubernetes production?"**

उत्तर:

"I first assess the business impact, verify CPU utilization using `kubectl top`, compare Pod and node resource usage, review HPA status and traffic patterns, determine whether the issue is caused by workload or application behavior, apply scaling or optimization as appropriate, validate business functionality, monitor recovery, and complete the RCA."

