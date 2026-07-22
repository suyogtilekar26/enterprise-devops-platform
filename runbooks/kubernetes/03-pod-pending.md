# Kubernetes Runbook 03 - Recovering Pending Pods

# 1. Purpose

This runbook explains how to investigate and recover Kubernetes Pods that remain in the **Pending** state.

A Pod in Pending state has been accepted by the Kubernetes API Server but has not yet been scheduled onto a worker node or cannot start because one or more required resources are unavailable.

The objective is to quickly identify the scheduling bottleneck, restore application availability and document the Root Cause Analysis (RCA).

---

# 2. Scope

Applicable to

- Deployments
- StatefulSets
- DaemonSets
- Jobs
- CronJobs

Supported Platforms

- Kind
- EKS
- AKS
- GKE
- OpenShift
- On-Prem Kubernetes

---

# 3. Symptoms

Users may report

- Application unavailable
- Deployment never completes
- New Pods never start
- Auto Scaling failed

Monitoring may report

- Pending Pods
- Deployment Progress Deadline Exceeded
- Replica mismatch

Verify

```bash
kubectl get pods -A
```

Example

```
NAME                     READY   STATUS

api-gateway-7d5b4        0/1     Pending
```

---

# 4. Business Impact

Critical

- Production deployment blocked
- No available application replicas
- Customer-facing outage

Medium

- Delayed rollout
- Auto-scaling unavailable

Low

- Development environment affected

---

# 5. Possible Root Causes

Most common causes

- Insufficient CPU
- Insufficient Memory
- No available Nodes
- Node NotReady
- Taints
- Missing Tolerations
- Node Affinity mismatch
- Node Selector mismatch
- PVC Pending
- StorageClass unavailable
- PodDisruptionBudget restrictions
- Cluster Autoscaler delay
- ResourceQuota exceeded
- LimitRange restrictions

---

# 6. Prerequisites

Required access

- kubectl
- Namespace access
- Node read access

Verify permissions

```bash
kubectl auth can-i get pods

kubectl auth can-i get nodes

kubectl auth can-i get events
```

---

# 7. Initial Investigation

## Step 1

Locate Pending Pods

```bash
kubectl get pods -A
```

Example

```
STATUS

Pending
```

---

## Step 2

Describe Pod

```bash
kubectl describe pod <pod-name> \
-n <namespace>
```

This is the most important command.

Review

- Events
- Scheduling messages
- Requested resources
- Volumes
- Node selectors

---

## Step 3

Review Events

Typical messages

```
0/3 nodes available

Insufficient cpu

Insufficient memory

Node(s) didn't match node selector

Node(s) had taints

PersistentVolumeClaim is not bound
```

---

# 8. Detailed Investigation

## Step 1

Verify Cluster Nodes

```bash
kubectl get nodes
```

Expected

```
STATUS

Ready
```

If a node is

```
NotReady
```

Follow

```
04-node-notready.md
```

---

## Step 2

Verify Node Capacity

```bash
kubectl describe node <node-name>
```

Review

- CPU
- Memory
- Allocated Resources

---

## Step 3

Verify Resource Usage

```bash
kubectl top nodes

kubectl top pods -A
```

Look for

- High CPU
- High Memory

---

## Step 4

Verify Resource Requests

```bash
kubectl describe pod <pod-name>
```

Review

```
Requests

Limits
```

Large resource requests may prevent scheduling.

---

## Step 5

Verify Taints

```bash
kubectl describe node <node-name>
```

Look for

```
Taints
```

Example

```
NoSchedule
```

---

## Step 6

Verify Tolerations

```bash
kubectl describe pod <pod-name>
```

Compare Pod tolerations with Node taints.

---

## Step 7

Verify Node Affinity

```bash
kubectl get pod <pod-name> \
-o yaml
```

Review

```
affinity

nodeSelector
```

---

## Step 8

Verify PVC

```bash
kubectl get pvc

kubectl describe pvc <pvc-name>
```

Expected

```
Bound
```

If PVC is

```
Pending
```

Storage investigation is required.

---

## Step 9

Verify ResourceQuota

```bash
kubectl get resourcequota \
-n <namespace>

kubectl describe resourcequota \
-n <namespace>
```

---

## Step 10

Verify LimitRange

```bash
kubectl get limitrange \
-n <namespace>

kubectl describe limitrange \
-n <namespace>
```

---

# 9. Resolution Steps

Depending on root cause

Insufficient CPU

- Add worker nodes
- Reduce Requests
- Scale cluster

Insufficient Memory

- Add capacity
- Reduce memory requests

Node NotReady

Recover worker node.

PVC Pending

Recover StorageClass or PV.

Taints

Add toleration

or

Remove taint.

Node Selector

Correct deployment configuration.

ResourceQuota

Increase quota.

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

Verify endpoints

```bash
kubectl get endpoints
```

Business Validation

- Login
- API
- Dashboard
- Monitoring

---

# 11. Rollback Procedure

If Pending started after deployment

Rollback

```bash
kubectl rollout undo deployment/<deployment>
```

Validate rollout

```bash
kubectl rollout history deployment/<deployment>
```

---

# 12. Escalation Matrix

L1

- Collect Pod description
- Collect Events

↓

L2

- Verify Nodes
- Verify Resources
- Verify Storage

↓

Platform Team

- Capacity issue
- Storage issue
- Scheduler issue

↓

Infrastructure Team

- New worker nodes
- Cloud capacity
- Hardware failure

---

# 13. Production Best Practices

- Always maintain spare cluster capacity.
- Monitor Pending Pods continuously.
- Configure Cluster Autoscaler.
- Use realistic Requests and Limits.
- Monitor ResourceQuota usage.
- Avoid excessive Node Selectors.
- Test deployments before production.

---

# 14. Real Production Scenario

A production deployment failed during a Black Friday release.

Investigation

```
kubectl describe pod
```

showed

```
0/6 nodes available

Insufficient cpu
```

The cluster was already operating at 95% CPU utilization.

Platform engineers added two worker nodes.

Cluster Autoscaler completed scaling.

Pods became Running within minutes.

Root Cause

Cluster capacity exhausted.

---

# 15. Scenario Interview Questions

## Q1. What does Pending mean?

### Answer

Pending means Kubernetes has accepted the Pod but it has not yet been scheduled or cannot start because required resources are unavailable.

Production Explanation

Pending is usually a scheduling or infrastructure issue rather than an application issue.

Commands

```bash
kubectl describe pod

kubectl get events
```

---

## Q2. Which command should you run first?

### Answer

```bash
kubectl describe pod <pod>
```

This immediately identifies why scheduling failed.

---

## Q3. What are the most common reasons for Pending Pods?

### Answer

- CPU shortage
- Memory shortage
- PVC Pending
- Node NotReady
- Taints
- Affinity mismatch
- ResourceQuota exceeded

---

# 16. Architecture Interview Questions

## Q1. Explain Pod Scheduling Architecture.

### Answer

```
Deployment

↓

API Server

↓

Scheduler

↓

Worker Node

↓

kubelet

↓

Running Pod
```

If the Scheduler cannot find a suitable worker node, the Pod remains Pending.

---

## Q2. Which Kubernetes components participate?

### Answer

- API Server
- Scheduler
- Worker Nodes
- kubelet
- Storage Controller
- CSI Driver (if storage required)

---

# 17. Production Support Interview Questions

## Q1. A production deployment is stuck in Pending. How will you investigate?

### Answer

Investigation order

```bash
kubectl describe pod

kubectl get nodes

kubectl describe node

kubectl top nodes

kubectl get pvc

kubectl get events
```

Verify

- Capacity
- Storage
- Scheduling
- ResourceQuota
- Taints
- Affinity

---

## Q2. How do you determine whether the issue is storage or scheduling?

### Answer

Review Pod Events.

If Events contain

```
PersistentVolumeClaim is not bound
```

investigate storage.

If Events contain

```
Insufficient cpu

Insufficient memory

Node selector mismatch
```

investigate scheduling.

---

# 18. Commands Reference

```bash
kubectl get pods -A

kubectl describe pod <pod>

kubectl get nodes

kubectl describe node <node>

kubectl top nodes

kubectl top pods -A

kubectl get pvc

kubectl describe pvc

kubectl get events

kubectl rollout undo deployment
```

---

# 19. Marathi Quick Revision

- प्रथम Describe Pod करा.
- Events तपासा.
- Nodes Ready आहेत का तपासा.
- CPU आणि Memory verify करा.
- PVC Bound आहे का तपासा.
- Taints आणि Affinity तपासा.
- Root Cause शोधल्यावरच fix करा.

---

# 20. Related Runbooks

- 01-pod-crashloopbackoff.md
- 04-node-notready.md
- 10-pvc-pv-issues.md
- 11-storageclass-issues.md
- 14-resource-exhaustion.md

---

# 21. Marathi Summary (5+ Experience Revision)

## Interview Summary

Pending Pod म्हणजे Kubernetes ला Pod schedule करता आलेला नाही. ही application समस्या नसून सामान्यतः scheduling, infrastructure किंवा storage समस्या असते. Production मध्ये सर्वप्रथम `kubectl describe pod` वापरून Events तपासावेत. त्यानंतर Nodes, CPU, Memory, PVC, Taints, Affinity, ResourceQuota आणि Storage यांची तपासणी करावी. Root Cause ओळखूनच corrective action घ्यावी.

### Production Investigation Flow

```
Alert

↓

Pending Pod

↓

Describe Pod

↓

Events

↓

Nodes

↓

Resources

↓

Storage

↓

Taints

↓

Affinity

↓

Root Cause

↓

Fix

↓

Validation

↓

RCA
```

### Production Story

एका production banking cluster मध्ये नवीन API deployment सतत Pending राहिली. सुरुवातीला application team ला deployment मध्ये bug असल्याचा संशय होता. Platform team ने `kubectl describe pod` तपासले आणि `0/8 nodes available: Insufficient memory` असा संदेश दिसला. Black Friday traffic मुळे cluster पूर्ण भरला होता. Cluster Autoscaler ने नवीन worker nodes जोडले आणि सर्व Pending Pods Running झाल्या. Incident review नंतर capacity planning dashboards आणि proactive autoscaling thresholds सुधारण्यात आले.

### 5+ Years Memory Trick

Interview मध्ये जर विचारले,

**"How do you troubleshoot a Pending Pod in production?"**

उत्तर:

"I begin with `kubectl describe pod` to identify the scheduler message. Then I verify node health, cluster capacity, CPU and memory availability, PVC binding, taints, tolerations, affinity rules and namespace quotas. Once the scheduling constraint is identified, I resolve it, validate the rollout and document the RCA."

