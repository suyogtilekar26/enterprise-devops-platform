# Sync Failure Runbook

# Enterprise DevOps Platform

---

# Purpose

This runbook describes the Standard Operating Procedure (SOP) for troubleshooting ArgoCD **Sync Failures**.

A Sync Failure occurs when ArgoCD is unable to successfully apply Kubernetes manifests to the cluster.

---

# Scope

Applications

- React + Vite Frontend
- Flask API Gateway
- Flask Auth Service
- Flask Dashboard Service

Supporting Services

- Redis
- PostgreSQL

Infrastructure

- Kubernetes Cluster
- ArgoCD
- Git Repository

---

# Symptoms

- Sync Status = Failed
- Operation State = Failed
- Application OutOfSync
- Deployment Not Updated
- Resources Not Created
- Partial Deployment

---

# Common Causes

| Cause | Example |
|--------|----------|
| Invalid YAML | Syntax Error |
| Kubernetes Validation Error | Invalid Manifest |
| Missing Namespace | Namespace Not Found |
| Missing CRD | Custom Resource Missing |
| RBAC Denied | Permission Error |
| Resource Conflict | Existing Resource Conflict |
| Immutable Field Changed | Deployment Selector Modified |
| Resource Quota | Limits Exceeded |

---

# Troubleshooting Workflow

```
Sync Failed

↓

Check Error

↓

Validate Git

↓

Validate Kubernetes

↓

Fix Manifest

↓

Commit

↓

Sync Again

↓

Healthy
```

---

# Step 1 - Verify Application

```bash
argocd app get frontend
```

Expected

```
Operation

↓

Failed
```

Review

- Sync Status
- Health
- Operation State
- Error Message

---

# Step 2 - View Sync Details

```bash
argocd app history frontend
```

Review

- Failed Sync
- Deployment Revision
- Timestamp
- Error Summary

---

# Step 3 - Review Application Events

```bash
argocd app get frontend
```

Look for

- Resource Apply Failure
- Validation Error
- Permission Error
- Namespace Error

---

# Step 4 - Verify Kubernetes Events

```bash
kubectl get events --sort-by=.metadata.creationTimestamp
```

Check for

- FailedCreate
- FailedMount
- Forbidden
- Validation Failed

---

# Step 5 - Validate Namespace

```bash
kubectl get namespace
```

Ensure the target namespace exists.

If missing

```bash
kubectl create namespace frontend
```

or enable namespace creation in ArgoCD.

---

# Step 6 - Verify CRDs

```bash
kubectl get crd
```

Ensure all required Custom Resource Definitions are installed before syncing.

Examples

- ApplicationSet
- Cert-Manager
- Prometheus Operator
- Istio Resources

---

# Step 7 - Verify RBAC

Check

```bash
kubectl auth can-i create deployment
```

Verify ArgoCD Service Account permissions.

---

# Step 8 - Validate Kubernetes Manifests

Review

- Deployment
- Service
- ConfigMap
- Secret
- Ingress

Check for

- Invalid API Version
- Missing Required Fields
- YAML Syntax Errors

---

# Step 9 - Check Immutable Field Errors

Typical Error

```
field is immutable
```

Examples

- Selector Changed
- PVC Specification Changed

Resolution

Delete and recreate the resource if appropriate.

---

# Step 10 - Verify Resource Quotas

```bash
kubectl describe quota
```

Check

- CPU Limits
- Memory Limits
- Object Count
- Storage Limits

---

# Step 11 - Fix the Root Cause

Possible actions

- Correct YAML
- Install Missing CRDs
- Create Namespace
- Fix RBAC
- Correct API Version
- Resolve Resource Conflict

Commit changes to Git.

---

# Step 12 - Synchronize

```bash
argocd app sync frontend
```

Monitor

```bash
argocd app get frontend
```

Expected

```
Synced

Healthy
```

---

# Validation

Verify

```bash
kubectl get pods
```

Confirm

- Pods Running
- Services Available
- Ingress Reachable
- APIs Responding

---

# Important Commands

Application

```bash
argocd app get frontend
```

History

```bash
argocd app history frontend
```

Sync

```bash
argocd app sync frontend
```

Events

```bash
kubectl get events
```

Namespaces

```bash
kubectl get namespace
```

CRDs

```bash
kubectl get crd
```

RBAC

```bash
kubectl auth can-i create deployment
```

---

# Success Criteria

- Sync Successful
- Health = Healthy
- No Validation Errors
- Resources Created
- Application Operational

---

# Interview Questions

## Q1. What does a Sync Failure mean?

### Answer

A Sync Failure means ArgoCD could not successfully apply one or more Kubernetes manifests due to validation errors, missing resources, permission issues or Kubernetes constraints.

---

## Q2. What is the first command to troubleshoot a Sync Failure?

### Answer

```bash
argocd app get <application-name>
```

This provides the operation status, sync status and detailed error message.

---

## Q3. Name common reasons for Sync Failures.

### Answer

Invalid YAML, missing namespace, missing CRDs, RBAC permission issues, immutable field updates, resource conflicts and resource quota limitations.

---

# Marathi Quick Revision

- Sync Failed = ArgoCD Manifest Apply करू शकला नाही.
- `argocd app get` प्रथम तपासा.
- Error Message वाचा.
- Namespace Verify करा.
- CRD Verify करा.
- RBAC तपासा.
- YAML Fix करा.
- Git Commit → Sync → Healthy.

