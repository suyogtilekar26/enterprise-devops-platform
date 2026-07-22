# Kubernetes Production Incident 03 - Pod Pending During Production Deployment

# 1. Incident Overview

## Incident ID

INC-K8S-003

## Severity

SEV-2

## Environment

Production

## Reported By

Prometheus Alertmanager

## Incident Time

11:10 AM

## Resolved Time

11:41 AM

## Duration

31 Minutes

## Affected Service

Dashboard Service

## Impacted Application

Enterprise DevOps Platform

```
Frontend

↓

API Gateway

↓

Dashboard Service ❌
```

---

# 2. Business Impact

Customer Impact

- Dashboard unavailable
- Users unable to view reports
- Internal analytics inaccessible

Business Impact

- Operations team unable to monitor customer activity
- Delayed reporting
- SLA warning triggered

Estimated Revenue Impact

Medium

---

# 3. Alert Received

Prometheus Alert

```
KubePodNotScheduled

Severity

Critical

Namespace

enterprise-devops

Pod

dashboard-service-77dfdb8f88-p9kxt
```

Grafana Dashboard

```
Pending Pods ↑

Available Replicas ↓
```

---

# 4. Production Architecture

```
GitHub Actions

↓

Container Registry

↓

Argo CD

↓

Kubernetes Scheduler

↓

Worker Nodes

↓

Dashboard Service
```

---

# 5. Symptoms

Observed

- Deployment stuck
- Pod remained Pending
- No container started
- Dashboard unavailable

Users observed

- HTTP 503
- Dashboard timeout

Pod Status

```
Pending
```

---

# 6. Initial Investigation

Objective

Determine whether the issue is related to

- Scheduler
- Worker Nodes
- Resources
- PVC
- Node Selector
- Taints

Commands

```bash
kubectl get pods -n enterprise-devops

kubectl get nodes

kubectl get events \
--sort-by=.metadata.creationTimestamp
```

Observation

```
Pod Pending
```

---

# 7. Investigation Timeline

## 11:10

Critical alert received.

---

## 11:12

Verified cluster health.

```bash
kubectl get nodes
```

Result

```
All Nodes Ready
```

---

## 11:14

Verified Pod.

```bash
kubectl get pod
```

Status

```
Pending
```

---

## 11:16

Collected Pod details.

```bash
kubectl describe pod dashboard-service-77dfdb8f88-p9kxt
```

Events

```
0/3 nodes available

Insufficient memory
```

---

## 11:19

Verified Node utilization.

```bash
kubectl top nodes
```

Result

```
Memory

97%
```

---

## 11:22

Verified Deployment resources.

```bash
kubectl describe deployment dashboard-service
```

Memory Request

```
4Gi
```

Cluster nodes had insufficient allocatable memory.

---

## 11:25

Reviewed HPA.

```bash
kubectl get hpa
```

No scaling issue found.

---

## 11:28

Added additional worker node.

Cluster autoscaler provisioned a new node.

---

## 11:34

Scheduler assigned Pod.

---

## 11:38

Pod became Running.

---

## 11:41

Business validation completed.

Incident closed.

---

# 8. Commands Executed

Cluster

```bash
kubectl cluster-info

kubectl get nodes

kubectl top nodes
```

Pods

```bash
kubectl get pods

kubectl describe pod
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

Autoscaling

```bash
kubectl get hpa
```

---

# 9. Findings

Infrastructure

Healthy

Scheduler

Healthy

Worker Nodes

Memory exhausted

Deployment

Valid

Root Issue

Insufficient allocatable memory

---

# 10. Root Cause

A new production release increased the Pod memory request from

```
2Gi

to

4Gi
```

Existing worker nodes did not have enough allocatable memory.

The scheduler continuously postponed Pod placement.

---

# 11. Resolution

Provisioned additional worker node.

Scheduler automatically placed the Pending Pod.

Verified deployment rollout.

```bash
kubectl rollout status deployment/dashboard-service
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

- Dashboard available
- Reports loading
- APIs healthy
- Authentication successful

Monitoring

- Pending Pod alert cleared
- Deployment healthy
- Scheduler latency normal

---

# 13. Rollback

If additional capacity cannot be added

Rollback Deployment

```bash
kubectl rollout undo deployment/dashboard-service
```

or

Reduce resource requests after approval.

---

# 14. Customer Communication

Initial Update

> We are investigating an issue affecting dashboard availability.

Progress Update

> Root cause identified. Additional cluster capacity is being provisioned.

Resolution

> Dashboard services have been restored successfully. Monitoring continues.

---

# 15. Incident Timeline

```
11:10

Alert

↓

11:14

Pending Pod Verified

↓

11:16

Scheduler Investigation

↓

11:19

Memory Exhaustion Confirmed

↓

11:28

New Worker Node Added

↓

11:34

Pod Scheduled

↓

11:38

Application Running

↓

11:41

Incident Closed
```

---

# 16. Root Cause Analysis (RCA)

## What Happened?

Scheduler could not assign the Pod.

## Why?

Worker nodes lacked available memory.

## Why wasn't it detected?

Capacity planning was not updated after increasing application resource requests.

## Customer Impact

Dashboard unavailable.

## Preventive Action

Automate resource validation before deployment.

---

# 17. Preventive Actions

- Capacity planning before releases
- Resource request review
- Enable Cluster Autoscaler
- Deployment admission validation
- Monitor node utilization
- Alert on Pending Pods

---

# 18. Production Best Practices

- Review resource requests during code reviews.
- Perform capacity assessment before deployment.
- Enable Cluster Autoscaler in production.
- Monitor allocatable resources continuously.
- Avoid excessive memory requests.
- Validate scheduling during staging.

---

# 19. Production Support Interview Questions

## Q1. How do you investigate a Pending Pod in production?

### Answer

1. Verify cluster health.
2. Describe the Pod.
3. Review scheduler events.
4. Check node utilization.
5. Verify requests and limits.
6. Check taints, tolerations and node selectors.
7. Review PVC binding.
8. Review recent deployments.
9. Resolve the scheduling constraint.
10. Validate business functionality.

---

## Q2. Which command usually provides the fastest Root Cause?

### Answer

```bash
kubectl describe pod <pod-name>
```

The Events section usually explains why scheduling failed.

---

## Q3. Should you delete a Pending Pod?

### Answer

No.

Deleting the Pod rarely resolves scheduling problems because Kubernetes recreates it with the same scheduling constraints.

---

# 20. Marathi Quick Revision

- Pod describe करा.
- Events तपासा.
- Node resources तपासा.
- Requests आणि Limits verify करा.
- Scheduler events पहा.
- Capacity verify करा.
- Root Cause शोधा.
- Business validation करा.
- RCA तयार करा.

---

# 21. Marathi Summary (5+ Experience Revision)

## Interview Summary

Production मध्ये Pod Pending असल्यास प्रथम `kubectl describe pod` वापरून scheduler events तपासावेत. त्यानंतर node utilization, requests/limits, taints, node selectors, PVC binding आणि recent deployments verify करावेत. Root Cause निश्चित झाल्यावरच cluster capacity वाढवावी किंवा deployment rollback करावा. शेवटी business validation, monitoring validation आणि RCA पूर्ण करावी.

### Production Investigation Flow

```
Alert

↓

Pending Pod

↓

Describe Pod

↓

Scheduler Events

↓

Node Resources

↓

Requests / Limits

↓

Scheduling Constraint

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

एका production analytics platform मध्ये नवीन release नंतर Dashboard Pods सतत Pending राहिले. `kubectl describe pod` मध्ये `Insufficient memory` scheduler event दिसला. नवीन release मध्ये memory request दुप्पट करण्यात आली होती, पण cluster capacity वाढवली नव्हती. Cluster Autoscaler ने नवीन worker node provision केल्यानंतर Pods schedule झाले आणि dashboard काही मिनिटांत पुन्हा उपलब्ध झाला. Incident नंतर deployment pipeline मध्ये capacity validation stage अनिवार्य करण्यात आली.

### 5+ Years Memory Trick

Interview मध्ये जर विचारले,

**"How do you troubleshoot a Kubernetes Pod Pending production incident?"**

उत्तर:

"I first inspect the Pod events using `kubectl describe pod`, verify scheduler messages, check node capacity and allocatable resources, validate resource requests, taints, node selectors and storage bindings, identify the scheduling constraint, resolve the infrastructure or configuration issue, validate business functionality, monitor cluster health, and complete the RCA."

