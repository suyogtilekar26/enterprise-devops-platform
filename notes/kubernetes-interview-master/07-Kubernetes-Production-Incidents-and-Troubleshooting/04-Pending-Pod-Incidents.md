# Kubernetes Interview Master Handbook

# Section 07 - Kubernetes Production Incidents & Troubleshooting

# Chapter 04 - Pending Pod Incidents

---

# Objective

Learn how to investigate, troubleshoot, recover and permanently prevent Kubernetes Pending Pod incidents in production environments.

Pending Pods are one of the most common Kubernetes scheduling failures and are frequently discussed in DevOps, SRE and Platform Engineering interviews.

---

# Interview Scenario

Time: 9:20 AM

PagerDuty Alert

"Production Deployment Not Scaling"

Impact

- New Pods remain in Pending state.
- Application cannot handle increasing traffic.
- Customers experience slow response times.

You are the on-call SRE.

Restore production capacity.

---

# What is Pending?

Pending means

The Pod has been accepted by Kubernetes but has not yet been scheduled onto any worker node.

No container has started.

---

# Scheduling Workflow

Deployment

↓

ReplicaSet

↓

Pod Created

↓

Scheduler

↓

Worker Node Selected

↓

Resources Reserved

↓

Container Starts

OR

↓

Scheduling Failed

↓

Pending

---

# Common Root Causes

Insufficient CPU

Insufficient Memory

No Available Nodes

Node NotReady

Node Taints

Missing Tolerations

Node Selector Mismatch

Affinity Rules

Persistent Volume Not Available

StorageClass Issues

Resource Quotas

LimitRanges

Unschedulable Nodes

---

# Step 1 - Check Pod Status

```bash
kubectl get pods -A
```

Example

```
checkout-67f4b6   0/1   Pending
```

---

# Step 2 - Describe Pod

```bash
kubectl describe pod checkout-67f4b6
```

Focus on

Events

Scheduling

Node Selection

Resource Errors

---

# Step 3 - Check Events

```bash
kubectl get events -A --sort-by=.metadata.creationTimestamp
```

Typical Event

```
0/4 nodes are available:
Insufficient memory.
```

---

# Step 4 - Check Nodes

```bash
kubectl get nodes
```

Verify

Ready

Scheduling Enabled

Worker Status

---

# Step 5 - Describe Node

```bash
kubectl describe node worker-01
```

Check

Allocated Resources

CPU

Memory

Taints

Conditions

---

# Step 6 - Resource Usage

```bash
kubectl top nodes
```

```bash
kubectl top pods -A
```

---

# Step 7 - Verify Resource Requests

```bash
kubectl describe deployment checkout
```

Example

```
requests

cpu: 8

memory: 32Gi
```

Cluster only has

```
4 CPU

16Gi Memory
```

Root Cause

Impossible Scheduling

---

# Step 8 - Check PVC

```bash
kubectl get pvc
```

Verify

Bound

Pending

Lost

---

# Step 9 - Verify StorageClass

```bash
kubectl get storageclass
```

---

# Investigation Flow

Pod

↓

Describe

↓

Events

↓

Scheduler

↓

Node

↓

Resources

↓

Storage

↓

Affinity

↓

Recovery

---

# Scenario 1

Insufficient CPU

Event

```
0/5 nodes available

Insufficient cpu
```

Resolution

Scale cluster.

Reduce requests.

---

# Scenario 2

Insufficient Memory

Event

```
Insufficient memory
```

Resolution

Increase node capacity.

Reduce memory requests.

---

# Scenario 3

Node Selector

Deployment

```
nodeSelector:

zone=west
```

Cluster

No node contains

```
zone=west
```

Resolution

Correct nodeSelector.

---

# Scenario 4

Node Taint

Node

```
NoSchedule
```

Deployment

No toleration.

Resolution

Add toleration.

OR

Remove taint.

---

# Scenario 5

Affinity Rules

Deployment

Strict Pod AntiAffinity.

Cluster too small.

Resolution

Relax affinity rule.

---

# Scenario 6

Persistent Volume

PVC

Pending

Storage unavailable.

Resolution

Provision storage.

Verify StorageClass.

---

# Scenario 7

Resource Quota

Namespace quota exceeded.

Verify

```bash
kubectl describe quota
```

Resolution

Increase quota.

---

# Production Incident

Issue

Traffic increases rapidly.

HPA creates new Pods.

Pods remain Pending.

Describe output

```
0/8 nodes available

Insufficient cpu
```

Root Cause

Cluster reached maximum capacity.

Resolution

Cluster Autoscaler provisions additional worker nodes.

Pods scheduled successfully.

Traffic restored.

---

# Recovery Commands

Check Nodes

```bash
kubectl get nodes
```

---

Describe Pod

```bash
kubectl describe pod <pod>
```

---

Check Resource Usage

```bash
kubectl top nodes
```

---

Check PVC

```bash
kubectl get pvc
```

---

Check Events

```bash
kubectl get events -A
```

---

# Validation Checklist

Pods Running

Scheduler Healthy

Nodes Ready

Storage Bound

CPU Available

Memory Available

Application Healthy

---

# RCA Template

Incident

Pending Pods

Root Cause

Insufficient CPU

Business Impact

Unable to scale application

Detection

Autoscaling Alert

Resolution

Added worker nodes

Preventive Action

Cluster Autoscaler

Capacity Planning

---

# Interview Questions

## Q1. What does Pending mean?

Answer

The Pod has been accepted but cannot yet be scheduled onto a worker node.

---

## Q2. Which command should you execute first?

Answer

```bash
kubectl describe pod <pod-name>
```

---

## Q3. What are the common causes of Pending Pods?

Answer

Insufficient resources, taints, affinity rules, node selector mismatch, PVC issues, storage failures, quotas and unschedulable nodes.

---

## Q4. How do you verify scheduler errors?

Answer

Review Pod Events using

```bash
kubectl describe pod
```

and

```bash
kubectl get events
```

---

## Q5. How do you resolve Pending Pods?

Answer

Identify the scheduling constraint, remove the bottleneck, verify scheduling and validate application recovery.

---

# Assignment

Production Pods remain Pending after HPA scales the Deployment.

Perform

- Investigation
- Commands
- Root Cause Analysis
- Recovery
- Validation
- Preventive Actions

---

# Assignment Solution

## Step 1

Check Pod status.

```bash
kubectl get pods -A
```

---

## Step 2

Describe affected Pod.

```bash
kubectl describe pod <pod>
```

---

## Step 3

Review scheduler events.

---

## Step 4

Verify

- Nodes
- Resources
- PVC
- Quotas
- Affinity
- Taints

---

## Step 5

Identify scheduling constraint.

---

## Step 6

Recover

- Add nodes
- Reduce requests
- Correct scheduling rules

---

## Step 7

Validate

Pods Running

Application Healthy

Scaling Successful

---

# Production Best Practices

✔ Enable Cluster Autoscaler

✔ Right-size CPU Requests

✔ Right-size Memory Requests

✔ Monitor Scheduler Metrics

✔ Review Resource Quotas

✔ Validate Node Labels

✔ Monitor Storage Capacity

✔ Test Autoscaling

✔ Maintain Capacity Buffers

✔ Maintain Scheduling Runbooks

---

# Runbook Checklist

□ Pod Identified

□ Events Reviewed

□ Scheduler Checked

□ Nodes Verified

□ Resources Verified

□ PVC Checked

□ Affinity Reviewed

□ Root Cause Confirmed

□ Recovery Completed

□ Validation Successful

□ RCA Completed

---

# Common Mistakes

❌ Restarting Pending Pods

❌ Ignoring Scheduler Events

❌ Oversized Resource Requests

❌ Incorrect Node Selectors

❌ Missing Tolerations

❌ Ignoring PVC Status

❌ No Capacity Planning

❌ Closing Incident Without Validation

