# Kubernetes Interview Master Handbook

# Section 08 - Kubernetes Security, RBAC & NetworkPolicies

# Chapter 14 - Admission Controllers

---

# Objective

Learn Kubernetes Admission Controllers from a production and interview perspective.

Understand how Admission Controllers validate and modify API requests before Kubernetes stores them in etcd.

---

# Interview Scenario

Time: 04:10 PM

Production Alert

A developer attempts to deploy a Pod.

The request reaches the Kubernetes API Server.

Authentication succeeds.

RBAC authorization succeeds.

The Pod is still rejected.

Error

```text
admission webhook denied the request
```

You are responsible for identifying why the deployment failed.

---

# What are Admission Controllers?

Admission Controllers intercept API requests after

Authentication

↓

Authorization

and before the object is stored in etcd.

They can

- Validate requests
- Modify requests
- Reject requests

---

# Request Flow

kubectl

↓

API Server

↓

Authentication

↓

Authorization (RBAC)

↓

Admission Controllers

↓

etcd

↓

Scheduler

↓

Pod Running

---

# Types of Admission Controllers

## Mutating Admission Controller

Can modify requests.

Examples

- Add Labels
- Add Annotations
- Inject Sidecars
- Set Default Values

---

## Validating Admission Controller

Cannot modify requests.

Only

- Allow

or

- Reject

requests.

---

# Common Built-in Admission Controllers

NamespaceLifecycle

LimitRanger

ServiceAccount

ResourceQuota

DefaultStorageClass

PodSecurity

Priority

RuntimeClass

---

# Example Workflow

Developer Creates Pod

↓

Authentication

↓

RBAC

↓

LimitRanger

↓

ResourceQuota

↓

PodSecurity

↓

Pod Stored

---

# Production Example

Developer creates a Pod without resource limits.

LimitRanger automatically injects

```yaml
resources:

  requests:

    cpu: 100m

    memory: 128Mi

  limits:

    cpu: 500m

    memory: 512Mi
```

---

# Production Incident

Issue

Deployment rejected.

Error

```text
admission webhook denied the request
```

Investigation

Pod violates Restricted Pod Security Standard.

Security Context missing.

Root Cause

Admission Controller validation failed.

Resolution

Update Pod manifest.

Redeploy application.

---

# Investigation Commands

View Events

```bash
kubectl get events --sort-by=.metadata.creationTimestamp
```

---

Describe Pod

```bash
kubectl describe pod app-pod
```

---

Describe Namespace

```bash
kubectl describe namespace production
```

---

View API Server Configuration

```bash
ps -ef | grep kube-apiserver
```

---

Check Enabled Admission Plugins

```bash
ps -ef | grep enable-admission-plugins
```

---

View Namespace Labels

```bash
kubectl get namespace --show-labels
```

---

# Common Admission Failures

Pod Security Violation

Missing Resource Limits

Exceeded ResourceQuota

Invalid Image Policy

Missing Labels

Missing Required Annotations

Webhook Timeout

Webhook Failure

---

# Troubleshooting Workflow

Deployment Failed

↓

Authentication Successful?

↓

Yes

↓

RBAC Successful?

↓

Yes

↓

Admission Controller Error?

↓

Check Events

↓

Identify Validation Failure

↓

Update Manifest

↓

Redeploy

---

# Validation Checklist

Authentication Successful

RBAC Successful

Admission Validation Passed

Pod Created

Application Healthy

Events Reviewed

---

# RCA Template

Incident

Deployment Rejected

Root Cause

Admission Controller Validation Failure

Business Impact

Production Deployment Delayed

Resolution

Updated Deployment Manifest

Preventive Action

Validate Manifests During CI/CD

---

# Interview Questions

## Q1. What is an Admission Controller?

Answer

An Admission Controller validates or mutates Kubernetes API requests after Authentication and Authorization but before they are stored in etcd.

---

## Q2. What is the difference between Mutating and Validating Admission Controllers?

Answer

Mutating Admission Controllers modify requests.

Validating Admission Controllers only allow or reject requests.

---

## Q3. At what stage do Admission Controllers run?

Answer

After Authentication and Authorization, before objects are persisted in etcd.

---

## Q4. Name five commonly used Admission Controllers.

Answer

LimitRanger, ResourceQuota, ServiceAccount, NamespaceLifecycle and PodSecurity.

---

## Q5. Why are Admission Controllers important?

Answer

They enforce organizational security, governance and compliance policies before workloads are created.

---

# Assignment

A production deployment is rejected by an Admission Controller.

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

Review Kubernetes events.

---

## Step 2

Identify the Admission Controller that rejected the request.

---

## Step 3

Update the workload manifest.

---

## Step 4

Redeploy the application.

---

## Step 5

Validate successful deployment.

---

## Step 6

Document the root cause.

---

# Production Best Practices

✔ Enable Required Admission Controllers

✔ Use PodSecurity Admission

✔ Enforce Resource Limits

✔ Enforce Resource Quotas

✔ Validate Manifests in CI/CD

✔ Review Admission Events

✔ Monitor Admission Webhooks

✔ Document Security Policies

✔ Test Before Production

✔ Automate Compliance Checks

---

# Runbook Checklist

□ Authentication Successful

□ Authorization Successful

□ Admission Controllers Reviewed

□ Events Investigated

□ Root Cause Confirmed

□ Manifest Updated

□ Validation Successful

□ Deployment Completed

□ Documentation Updated

□ RCA Completed

---

# Common Mistakes

❌ Ignoring Admission Events

❌ Deploying Without Resource Limits

❌ Violating Pod Security Policies

❌ Assuming RBAC Is the Final Security Check

❌ Not Testing Manifests Before Production

❌ Ignoring Webhook Failures

❌ Missing Namespace Security Labels

❌ Skipping Validation

