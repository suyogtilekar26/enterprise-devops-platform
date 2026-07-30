# Kubernetes Interview Master Handbook

# Section 08 - Kubernetes Security, RBAC & NetworkPolicies

# Chapter 06 - Service Accounts

---

# Objective

Learn Kubernetes Service Accounts from a production and interview perspective.

Understand how Pods authenticate with the Kubernetes API Server and how ServiceAccounts should be securely managed in enterprise environments.

---

# Interview Scenario

Time: 03:45 PM

A production application suddenly starts failing.

Error

```text
Forbidden
```

Investigation shows

- Pod is Running
- Network is Healthy
- RBAC Roles exist

The application is using the wrong ServiceAccount.

You are responsible for restoring production.

---

# What is a ServiceAccount?

A ServiceAccount is an identity used by Pods to communicate with the Kubernetes API Server.

Unlike human users, ServiceAccounts are intended for applications and workloads.

---

# Authentication Flow

Pod

↓

ServiceAccount

↓

Authentication

↓

API Server

↓

RBAC Authorization

↓

Allowed / Denied

---

# Default ServiceAccount

Every namespace automatically contains

```text
default
```

If a Pod does not specify a ServiceAccount, Kubernetes assigns the default ServiceAccount.

Production recommendation

Avoid using the default ServiceAccount for applications.

---

# View ServiceAccounts

```bash
kubectl get serviceaccounts -A
```

---

# Describe ServiceAccount

```bash
kubectl describe serviceaccount default
```

---

# Create ServiceAccount

```bash
kubectl create serviceaccount app-sa
```

---

# Example ServiceAccount

```yaml
apiVersion: v1
kind: ServiceAccount

metadata:
  name: app-sa
  namespace: production
```

---

# Assign ServiceAccount to a Pod

```yaml
apiVersion: v1
kind: Pod

metadata:
  name: nginx

spec:
  serviceAccountName: app-sa

  containers:

  - name: nginx

    image: nginx
```

---

# ServiceAccount + RBAC

ServiceAccount

↓

RoleBinding

↓

Role

↓

Permissions

Without RBAC, the ServiceAccount has little or no useful access.

---

# Production Incident

Issue

Application cannot read ConfigMaps.

Error

```text
Forbidden
```

Investigation

```bash
kubectl describe pod app-pod
```

Pod is using

```text
default
```

ServiceAccount.

Root Cause

Incorrect ServiceAccount configured.

Resolution

Create dedicated ServiceAccount.

Assign Role.

Create RoleBinding.

Restart Deployment.

---

# Investigation Commands

View Pods

```bash
kubectl get pods -A
```

---

Check ServiceAccount Used

```bash
kubectl get pod app-pod -o yaml
```

---

Describe Pod

```bash
kubectl describe pod app-pod
```

---

List ServiceAccounts

```bash
kubectl get serviceaccounts -A
```

---

Describe ServiceAccount

```bash
kubectl describe serviceaccount app-sa
```

---

Check Permissions

```bash
kubectl auth can-i get configmaps \
--as system:serviceaccount:production:app-sa \
-n production
```

---

# Common Problems

Using default ServiceAccount

Missing RoleBinding

Incorrect Namespace

Wrong ServiceAccount Name

Insufficient RBAC Permissions

Deleted ServiceAccount

---

# Validation Checklist

Correct ServiceAccount Assigned

Dedicated ServiceAccount Used

RBAC Configured

Permissions Validated

Application Working

Audit Logs Reviewed

---

# RCA Template

Incident

Application Authentication Failure

Root Cause

Incorrect ServiceAccount

Business Impact

Application Unable to Access Kubernetes Resources

Resolution

Assigned Dedicated ServiceAccount

Created Required RoleBinding

Preventive Action

Standardize ServiceAccount Usage

---

# Interview Questions

## Q1. What is a ServiceAccount?

Answer

A ServiceAccount is an identity used by Pods and applications to authenticate with the Kubernetes API Server.

---

## Q2. Does every namespace have a ServiceAccount?

Answer

Yes.

Each namespace automatically contains a default ServiceAccount.

---

## Q3. Why should production applications avoid the default ServiceAccount?

Answer

The default ServiceAccount is shared and may not follow the principle of least privilege. Dedicated ServiceAccounts improve security and auditing.

---

## Q4. Can a ServiceAccount access the Kubernetes API without RBAC?

Answer

Authentication succeeds, but access is limited unless RBAC permissions are granted through RoleBindings or ClusterRoleBindings.

---

## Q5. How do you verify ServiceAccount permissions?

Answer

```bash
kubectl auth can-i get pods \
--as system:serviceaccount:production:app-sa
```

---

# Assignment

A monitoring application requires

- Read Pods
- Read Nodes
- Read Services

Prepare

- ServiceAccount Design
- RBAC Design
- Validation Commands
- Security Considerations
- Recovery Plan

---

# Assignment Solution

## Step 1

Create a dedicated ServiceAccount.

---

## Step 2

Grant only required permissions.

---

## Step 3

Bind permissions using RBAC.

---

## Step 4

Assign the ServiceAccount to the Deployment.

---

## Step 5

Validate access using

kubectl auth can-i.

---

## Step 6

Review audit logs.

---

# Production Best Practices

✔ Never Use the Default ServiceAccount for Production Applications

✔ Create One ServiceAccount Per Application

✔ Apply Least Privilege

✔ Rotate Credentials Where Applicable

✔ Audit ServiceAccount Usage

✔ Remove Unused ServiceAccounts

✔ Monitor Authentication Failures

✔ Review RBAC Regularly

✔ Document ServiceAccount Ownership

✔ Test Permissions Before Deployment

---

# Runbook Checklist

□ Dedicated ServiceAccount Created

□ RBAC Configured

□ RoleBinding Verified

□ Correct ServiceAccount Assigned

□ Permissions Validated

□ Application Working

□ Root Cause Confirmed

□ Recovery Completed

□ Validation Successful

□ Documentation Updated

---

# Common Mistakes

❌ Using the Default ServiceAccount

❌ Sharing One ServiceAccount Across Multiple Applications

❌ Granting cluster-admin Permissions

❌ Forgetting RoleBindings

❌ Using Wildcard Permissions

❌ Never Reviewing ServiceAccounts

❌ Ignoring Audit Logs

❌ Skipping Permission Validation

