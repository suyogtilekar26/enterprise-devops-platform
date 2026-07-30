# Kubernetes Interview Master Handbook

# Section 08 - Kubernetes Security, RBAC & NetworkPolicies

# Chapter 11 - NetworkPolicy Production Incidents

---

# Objective

Learn how to troubleshoot NetworkPolicy-related production incidents.

Understand real-world outage scenarios, investigation methodology and recovery strategies used by SRE and Platform Engineering teams.

---

# Interview Scenario

Time: 11:45 AM

Critical Production Alert

Users cannot place orders.

Application Status

Frontend

↓

Healthy

↓

Backend

↓

Healthy

↓

Database

↓

Connection Timeout

Recent Change

A new NetworkPolicy was deployed 10 minutes ago.

You are the on-call Platform Engineer.

---

# Incident Response Workflow

Alert

↓

Business Impact Assessment

↓

Review Recent Changes

↓

Check NetworkPolicies

↓

Validate Pod Labels

↓

Test Connectivity

↓

Identify Root Cause

↓

Controlled Recovery

↓

Validation

↓

RCA

---

# Incident 1

Database Connection Timeout

Symptoms

Application logs

```text
connection timed out
```

Investigation

```bash
kubectl get networkpolicies -A
```

```bash
kubectl describe networkpolicy db-policy
```

Result

Backend namespace not allowed.

Root Cause

Missing ingress rule.

Recovery

Update NetworkPolicy.

Allow backend Pods.

Validate connectivity.

---

# Incident 2

Frontend Cannot Reach Backend

Symptoms

HTTP 503

Application Timeout

Investigation

```bash
kubectl exec frontend -- curl http://backend
```

Result

Connection timed out.

Root Cause

Incorrect podSelector labels.

Recovery

Correct labels.

Apply NetworkPolicy.

---

# Incident 3

DNS Resolution Failure

Symptoms

```text
Temporary failure in name resolution
```

Investigation

```bash
kubectl exec frontend -- nslookup kubernetes.default
```

Result

DNS unreachable.

Root Cause

DNS egress traffic blocked.

Recovery

Allow UDP/TCP port 53 to CoreDNS.

---

# Incident 4

Entire Namespace Offline

Symptoms

Every Pod loses communication.

Investigation

```bash
kubectl get networkpolicies
```

Result

Default Deny Policy deployed.

No allow policies.

Root Cause

Missing application-specific NetworkPolicies.

Recovery

Create allow rules.

Validate application.

---

# Incident 5

Only One Pod Cannot Connect

Investigation

```bash
kubectl get pods --show-labels
```

Result

Incorrect labels.

Root Cause

Pod labels no longer match NetworkPolicy.

Recovery

Correct labels.

Redeploy application.

---

# Investigation Commands

List Policies

```bash
kubectl get networkpolicies -A
```

---

Describe Policy

```bash
kubectl describe networkpolicy
```

---

View YAML

```bash
kubectl get networkpolicy <policy> -o yaml
```

---

View Labels

```bash
kubectl get pods --show-labels
```

---

Describe Pod

```bash
kubectl describe pod <pod>
```

---

Connectivity Test

```bash
kubectl exec <pod> -- curl http://service
```

---

DNS Test

```bash
kubectl exec <pod> -- nslookup kubernetes.default
```

---

Ping Test

```bash
kubectl exec <pod> -- ping <destination>
```

---

# Troubleshooting Decision Tree

Application Timeout

↓

DNS Working?

↓

No

↓

Check DNS Policy

↓

Yes

↓

Pod Labels Correct?

↓

No

↓

Fix Labels

↓

Yes

↓

Ingress Rule Exists?

↓

No

↓

Create Rule

↓

Yes

↓

Egress Rule Exists?

↓

No

↓

Create Rule

↓

Validate

---

# Validation Checklist

Application Working

DNS Working

Frontend Reachable

Backend Reachable

Database Reachable

Required Traffic Allowed

Unwanted Traffic Blocked

Monitoring Green

---

# RCA Template

Incident

Application Connectivity Failure

Root Cause

Incorrect NetworkPolicy

Business Impact

Production Outage

Resolution

Updated NetworkPolicy

Validation

Application Healthy

Preventive Action

Peer Review for NetworkPolicies

---

# Interview Questions

## Q1. What is the first thing you check after a NetworkPolicy outage?

Answer

Review recent NetworkPolicy changes and determine business impact before validating Pod communication.

---

## Q2. Why do NetworkPolicies fail unexpectedly?

Answer

Common causes include incorrect labels, missing ingress or egress rules, DNS restrictions and unsupported CNI plugins.

---

## Q3. How do you verify if a NetworkPolicy is applied?

Answer

Inspect the policy, verify Pod labels and perform connectivity tests between Pods.

---

## Q4. Why is DNS commonly affected?

Answer

Because DNS traffic to CoreDNS is often forgotten when restrictive egress policies are introduced.

---

## Q5. How do you safely recover from a NetworkPolicy incident?

Answer

Restore only the minimum required traffic, validate application communication and confirm monitoring returns to normal before closing the incident.

---

# Assignment

A production payment application cannot communicate with its PostgreSQL database after a security hardening deployment.

Prepare

- Investigation Plan

- Commands

- Root Cause Analysis

- Recovery Plan

- Validation Checklist

- Preventive Actions

---

# Assignment Solution

## Step 1

Review recently deployed NetworkPolicies.

---

## Step 2

Verify Pod labels.

---

## Step 3

Test frontend-to-backend and backend-to-database connectivity.

---

## Step 4

Verify DNS resolution.

---

## Step 5

Update NetworkPolicy with the minimum required rule.

---

## Step 6

Validate application transactions.

---

## Step 7

Complete RCA and update runbooks.

---

# Production Best Practices

✔ Deploy Default Deny First

✔ Add Allow Rules Incrementally

✔ Test Policies in Lower Environments

✔ Use Consistent Labels

✔ Allow DNS Explicitly

✔ Review Every NetworkPolicy Through Code Review

✔ Monitor Connectivity Metrics

✔ Document Application Flows

✔ Perform Quarterly Security Reviews

✔ Practice Incident Drills

---

# Runbook Checklist

□ Business Impact Assessed

□ NetworkPolicies Reviewed

□ Pod Labels Verified

□ DNS Working

□ Connectivity Tested

□ Root Cause Confirmed

□ Recovery Completed

□ Validation Successful

□ RCA Completed

□ Documentation Updated

---

# Common Mistakes

❌ Deploying Default Deny Without Allow Rules

❌ Forgetting DNS Access

❌ Incorrect Pod Labels

❌ Missing Egress Rules

❌ Assuming CNI Supports NetworkPolicies

❌ Not Testing After Changes

❌ Poor Documentation

❌ Skipping Validation

