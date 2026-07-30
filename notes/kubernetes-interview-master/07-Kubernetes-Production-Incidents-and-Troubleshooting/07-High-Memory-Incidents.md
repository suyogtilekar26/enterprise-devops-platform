# Kubernetes Interview Master Handbook

# Section 07 - Kubernetes Production Incidents & Troubleshooting

# Chapter 07 - High Memory Incidents

---

# Objective

Learn how to investigate, troubleshoot, recover and permanently prevent High Memory incidents in Kubernetes production environments.

High Memory incidents are among the most common production issues handled by DevOps Engineers, SREs and Platform Engineers.

---

# Interview Scenario

Time: 01:30 PM

PagerDuty Alert

"Memory Utilization Above 95%"

Impact

- Application latency increasing
- Pods restarting
- OOMKilled events
- Customers reporting failures

You are the on-call SRE.

Restore production stability.

---

# What is a High Memory Incident?

A High Memory incident occurs when one or more Pods or Nodes consume excessive memory, causing application instability, OOMKilled events and degraded performance.

---

# Common Root Causes

Memory Leak

Large Cache

Large Batch Processing

Insufficient Memory Limits

Application Bug

Traffic Spike

Database Query Returning Huge Dataset

Unreleased Objects

Misconfigured JVM Heap

Background Jobs

---

# Investigation Workflow

Alert

↓

Identify Impacted Application

↓

Identify High Memory Pod

↓

Verify Node Memory

↓

Check OOMKilled

↓

Review Logs

↓

Review Metrics

↓

Find Root Cause

↓

Recover

↓

Validate

---

# Step 1 - Check Node Memory

```bash
kubectl top nodes
```

Example

```text
worker-01   CPU 45%   Memory 97%
worker-02   CPU 32%   Memory 38%
worker-03   CPU 29%   Memory 41%
```

---

# Step 2 - Check Pod Memory

```bash
kubectl top pods -A --sort-by=memory
```

Example

```text
checkout-7867    4200Mi
payment-66ff     350Mi
cart-8845        290Mi
```

---

# Step 3 - Describe Pod

```bash
kubectl describe pod checkout-7867
```

Verify

- Memory Requests
- Memory Limits
- Restart Count
- OOMKilled Events

---

# Step 4 - Check Logs

```bash
kubectl logs checkout-7867
```

Look for

- Heap Errors
- OutOfMemoryError
- Memory Allocation Failures
- Application Exceptions

---

# Step 5 - Verify OOMKilled

```bash
kubectl describe pod checkout-7867
```

Example

```text
Last State:

Terminated

Reason: OOMKilled
```

---

# Step 6 - Verify Deployment

```bash
kubectl describe deployment checkout
```

Check

- Memory Requests
- Memory Limits
- Recent Deployment

---

# Step 7 - Verify Metrics

Review

Memory Usage

Pod Restarts

Latency

Error Rate

GC Activity

---

# Investigation Flow

Alert

↓

Node Memory

↓

Pod Memory

↓

Describe Pod

↓

Logs

↓

Deployment

↓

Metrics

↓

Application

↓

Recovery

---

# Scenario 1

Memory Leak

Memory continuously increases.

Pod eventually becomes OOMKilled.

Resolution

Fix application.

Deploy corrected version.

---

# Scenario 2

Incorrect Memory Limits

Deployment

```yaml
limits:
  memory: 256Mi
```

Application requires

```text
1Gi
```

Resolution

Increase memory limits.

---

# Scenario 3

Traffic Spike

Memory usage suddenly doubles.

Root Cause

Unexpected production traffic.

Resolution

Scale application.

---

# Scenario 4

Large Cache

Application cache consumes several GB.

Resolution

Configure cache eviction.

Reduce cache size.

---

# Scenario 5

Large Database Query

Application loads millions of records.

Memory reaches limit.

Resolution

Implement pagination.

Optimize queries.

---

# Scenario 6

Java Heap Misconfiguration

Heap configured larger than container memory.

Result

OOMKilled.

Resolution

Reduce JVM heap size.

---

# Production Incident

Issue

Checkout service repeatedly restarts.

Investigation

```bash
kubectl top pods
```

Shows

```text
checkout

4096Mi
```

Describe output

```text
Reason:

OOMKilled
```

Logs

```text
java.lang.OutOfMemoryError
```

Root Cause

Memory leak introduced during latest deployment.

Resolution

Rollback deployment.

Increase replicas.

Application stabilizes.

---

# Recovery Commands

Scale Deployment

```bash
kubectl scale deployment checkout --replicas=8
```

---

Rollback

```bash
kubectl rollout undo deployment checkout
```

---

Restart Deployment

```bash
kubectl rollout restart deployment checkout
```

---

Verify Rollout

```bash
kubectl rollout status deployment checkout
```

---

# Validation Checklist

Memory Usage Normal

No OOMKilled

Pods Stable

Latency Normal

Application Healthy

Business Transactions Successful

---

# RCA Template

Incident

High Memory Usage

Root Cause

Memory Leak

Business Impact

Application Restarts

Detection

Memory Alert

Resolution

Rollback Deployment

Preventive Action

Memory Profiling

Load Testing

---

# Interview Questions

## Q1. Which command identifies high memory Pods?

Answer

```bash
kubectl top pods -A --sort-by=memory
```

---

## Q2. Which command verifies OOMKilled?

Answer

```bash
kubectl describe pod <pod-name>
```

---

## Q3. What are common causes of High Memory?

Answer

Memory leaks, insufficient limits, traffic spikes, large caches, JVM heap misconfiguration, inefficient database queries and application bugs.

---

## Q4. Why does OOMKilled occur?

Answer

A container exceeds its configured memory limit and the Linux kernel terminates the process to protect the node.

---

## Q5. How do you recover?

Answer

Identify the root cause, rollback faulty deployments if required, optimize application memory usage, adjust memory limits and validate application recovery.

---

# Assignment

Production Pods are repeatedly OOMKilled.

Prepare

- Investigation Plan
- Commands
- Evidence Collection
- Root Cause Analysis
- Recovery
- Validation
- Preventive Actions

---

# Assignment Solution

## Step 1

Check Node Memory.

```bash
kubectl top nodes
```

---

## Step 2

Identify High Memory Pods.

```bash
kubectl top pods -A --sort-by=memory
```

---

## Step 3

Describe Pod.

```bash
kubectl describe pod <pod-name>
```

---

## Step 4

Review

- Logs
- Deployment
- Memory Limits
- Metrics

---

## Step 5

Identify root cause.

---

## Step 6

Recover

- Rollback
- Scale
- Increase Memory Limits
- Fix Application

---

## Step 7

Validate

- No OOMKilled
- Memory Stable
- Pods Healthy
- Application Healthy

---

# Production Best Practices

✔ Configure Memory Requests

✔ Configure Memory Limits

✔ Monitor OOMKilled Events

✔ Perform Load Testing

✔ Profile Memory Usage

✔ Monitor GC Activity

✔ Optimize Database Queries

✔ Review Cache Configuration

✔ Enable Alerting

✔ Maintain Runbooks

---

# Runbook Checklist

□ Alert Received

□ High Memory Pod Identified

□ Node Memory Verified

□ Pod Described

□ OOMKilled Verified

□ Logs Reviewed

□ Metrics Reviewed

□ Root Cause Confirmed

□ Recovery Completed

□ Validation Successful

□ RCA Completed

---

# Common Mistakes

❌ Restarting Pods Without Investigation

❌ Ignoring OOMKilled Events

❌ Setting Incorrect Memory Limits

❌ Ignoring Memory Leaks

❌ No Load Testing

❌ Ignoring JVM Heap Configuration

❌ Closing Incident Without Validation

❌ Skipping RCA

