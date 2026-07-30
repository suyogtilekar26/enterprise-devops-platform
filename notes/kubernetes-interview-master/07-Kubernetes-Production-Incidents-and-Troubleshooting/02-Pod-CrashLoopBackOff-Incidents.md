# Kubernetes Interview Master Handbook

# Section 07 - Kubernetes Production Incidents & Troubleshooting

# Chapter 02 - Pod CrashLoopBackOff Incidents

---

# Objective

Learn how to investigate, troubleshoot, recover and permanently prevent Kubernetes CrashLoopBackOff incidents using a structured production methodology.

This is one of the most frequently asked interview topics for DevOps, SRE and Platform Engineering roles.

---

# Interview Scenario

Time: 10:30 AM

PagerDuty Alert

"Checkout Service Pods Entering CrashLoopBackOff"

Impact

- Customers cannot place orders.
- API returns HTTP 503.
- Revenue is affected.

You are the on-call SRE.

Investigate and restore production.

---

# What is CrashLoopBackOff?

CrashLoopBackOff means

A container starts successfully but exits repeatedly.

Kubernetes continuously restarts the container.

After every failed restart Kubernetes increases the delay before attempting another restart.

---

# How CrashLoopBackOff Works

Pod Starts

↓

Container Starts

↓

Application Crashes

↓

Restart

↓

Application Crashes Again

↓

Restart Delay Increases

↓

CrashLoopBackOff

---

# Common Root Causes

Application Bug

Incorrect Environment Variables

Database Connection Failure

Missing Secret

Missing ConfigMap

Port Conflict

Startup Script Failure

Invalid Command

OOMKilled

Permission Issues

Readiness/Liveness Probe Failure

Dependency Failure

Certificate Expired

---

# Initial Investigation

Never restart the pod immediately.

Collect evidence first.

---

# Step 1 - Check Pod Status

```bash
kubectl get pods -A
```

Example

```
NAME                     READY   STATUS             RESTARTS
checkout-65d9            0/1     CrashLoopBackOff   12
```

---

# Step 2 - Describe the Pod

```bash
kubectl describe pod checkout-65d9
```

Look for

- Events
- Restart Count
- Exit Code
- Probe Failures
- Image
- Environment Variables

---

# Step 3 - Check Container Logs

Current container

```bash
kubectl logs checkout-65d9
```

Previous crashed container

```bash
kubectl logs checkout-65d9 --previous
```

Always check previous logs.

---

# Step 4 - Check Events

```bash
kubectl get events -A --sort-by=.metadata.creationTimestamp
```

Look for

- Failed Mount
- Failed Scheduling
- Killing Container
- OOMKilled

---

# Step 5 - Check Deployment

```bash
kubectl describe deployment checkout
```

Verify

- Image
- Replica Count
- Environment Variables
- Resources

---

# Step 6 - Verify Resource Usage

```bash
kubectl top pods
```

```bash
kubectl top nodes
```

Check

CPU

Memory

OOMKilled

---

# Step 7 - Verify Recent Deployment

```bash
kubectl rollout history deployment checkout
```

Identify

- Recent release
- Image change
- Configuration update

---

# Troubleshooting Flow

Pod

↓

Describe

↓

Logs

↓

Events

↓

Deployment

↓

Resources

↓

Dependencies

↓

Root Cause

↓

Recovery

---

# Scenario 1

Application Bug

Logs

```
panic: nil pointer dereference
```

Root Cause

Application defect.

Resolution

Rollback deployment.

---

# Scenario 2

Wrong Environment Variable

Logs

```
DATABASE_URL not found
```

Root Cause

Missing environment variable.

Resolution

Update Deployment.

Restart pods.

---

# Scenario 3

Missing Secret

Logs

```
secret not found
```

Verify

```bash
kubectl get secrets
```

Resolution

Restore missing Secret.

---

# Scenario 4

Database Unavailable

Logs

```
connection refused
```

Verify

```bash
kubectl get svc
```

```bash
kubectl get endpoints
```

Resolution

Recover database.

---

# Scenario 5

OOMKilled

Describe output

```
Reason: OOMKilled
```

Verify

```bash
kubectl top pod
```

Resolution

Increase memory limit.

Optimize application.

---

# Scenario 6

Liveness Probe Failure

Describe output

```
Liveness probe failed
```

Verify

- Health endpoint
- Startup time
- Probe configuration

Resolution

Increase

initialDelaySeconds

or

failureThreshold

---

# Scenario 7

Image Problem

Logs

Application exits immediately.

Verify

```bash
kubectl describe deployment checkout
```

Check

Image Tag

Entrypoint

Command

---

# Production Incident

Issue

Checkout service unavailable.

Investigation

Pods in CrashLoopBackOff.

Previous logs showed

```
Unable to connect to PostgreSQL
```

Database service healthy.

DNS resolution successful.

Secret contained expired database password.

Root Cause

Database credentials rotated.

Application deployment not updated.

Resolution

Update Secret.

Restart Deployment.

Application recovered.

---

# Recovery Options

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

Scale Deployment

```bash
kubectl scale deployment checkout --replicas=6
```

---

Verify Rollout

```bash
kubectl rollout status deployment checkout
```

---

# Validation Checklist

Pods Running

Containers Ready

Logs Healthy

No Restarts

Metrics Normal

Requests Successful

Customers Confirmed

---

# RCA Template

Incident

CrashLoopBackOff

Root Cause

Expired database credentials

Business Impact

Checkout unavailable

Detection

PagerDuty

Resolution

Updated Secret

Restarted Deployment

Preventive Action

Secret rotation automation

Credential monitoring

---

# Interview Questions

## Q1. What is CrashLoopBackOff?

Answer

It indicates that a container repeatedly starts, crashes and Kubernetes applies exponential backoff before attempting another restart.

---

## Q2. Which command do you execute first?

Answer

```bash
kubectl describe pod <pod-name>
```

followed by

```bash
kubectl logs <pod-name> --previous
```

---

## Q3. Why check previous logs?

Answer

The current container may not have produced logs yet. Previous logs usually contain the actual crash message.

---

## Q4. What are the most common causes?

Answer

Application bugs, missing secrets, incorrect environment variables, OOMKilled, failed probes, dependency failures and incorrect startup commands.

---

## Q5. How do you resolve CrashLoopBackOff?

Answer

Identify the root cause using describe, logs, events and metrics, fix the underlying issue, then validate recovery. Avoid blindly restarting pods.

---

# Assignment

A production Deployment enters CrashLoopBackOff immediately after a release.

Perform

- Investigation
- Commands
- Evidence Collection
- Root Cause Analysis
- Recovery
- Validation
- Preventive Actions

---

# Assignment Solution

## Step 1

Check pod status.

```bash
kubectl get pods -A
```

---

## Step 2

Describe affected pod.

```bash
kubectl describe pod <pod>
```

---

## Step 3

Check previous logs.

```bash
kubectl logs <pod> --previous
```

---

## Step 4

Verify

- Deployment
- ConfigMaps
- Secrets
- Services
- Resources

---

## Step 5

Identify root cause.

Fix configuration or application.

---

## Step 6

Recover

Rollback or deploy corrected version.

---

## Step 7

Validate

- Pods Ready
- No Restarts
- Metrics Healthy
- Business Transactions Successful

---

# Production Best Practices

✔ Always Check Previous Logs

✔ Investigate Before Restarting

✔ Use Readiness/Liveness Probes Correctly

✔ Monitor Restart Count

✔ Automate Secret Rotation

✔ Validate Deployments Before Production

✔ Use Progressive Rollouts

✔ Keep Detailed Runbooks

✔ Perform Blameless RCA

✔ Continuously Improve Monitoring

---

# Runbook Checklist

□ Pod Identified

□ Events Reviewed

□ Describe Output Collected

□ Previous Logs Analyzed

□ Deployment Verified

□ Resource Usage Checked

□ Dependencies Validated

□ Root Cause Confirmed

□ Recovery Completed

□ Business Validated

□ RCA Completed

---

# Common Mistakes

❌ Restarting Pods Without Investigation

❌ Ignoring Previous Logs

❌ Not Checking Events

❌ Assuming Application Bug

❌ Missing Secret Validation

❌ Ignoring OOMKilled

❌ Skipping Rollback Option

❌ Closing Incident Without Validation

