# Kubernetes Interview Master Handbook

# Section 08 - Kubernetes Security, RBAC & NetworkPolicies

# Chapter 03 - Kubernetes Authorization (RBAC)

---

# Objective

Learn Kubernetes Role-Based Access Control (RBAC) from a production and interview perspective.

Understand how Kubernetes authorizes authenticated users and ServiceAccounts to perform actions on cluster resources using Roles, ClusterRoles, RoleBindings and ClusterRoleBindings.

---

# Interview Scenario

Time: 02:15 PM

Security Alert

A developer accidentally deleted a production Deployment.

Investigation reveals the developer was granted

cluster-admin

permissions.

You are the Platform Engineer responsible for securing cluster access.

---

# What is Authorization?

Authorization answers the question

"What are you allowed to do?"

After Authentication succeeds, the Kubernetes API Server checks whether the user has permission to perform the requested action.

---

# Authorization Workflow

User

↓

Authentication

↓

Identity Verified

↓

RBAC

↓

Permission Check

↓

Allow

OR

↓

Deny

---

# What is RBAC?

RBAC (Role-Based Access Control) controls access to Kubernetes resources using permissions assigned to users, groups or ServiceAccounts.

---

# RBAC Components

## Role

Namespace-scoped permissions.

Example

Access Pods only inside the development namespace.

---

## ClusterRole

Cluster-wide permissions.

Examples

- Nodes
- Namespaces
- Cluster-wide Pod access

---

## RoleBinding

Connects

User / Group / ServiceAccount

↓

Role

within a namespace.

---

## ClusterRoleBinding

Connects

User / Group / ServiceAccount

↓

ClusterRole

across the entire cluster.

---

# RBAC Architecture

User

↓

RoleBinding

↓

Role

↓

Permissions

OR

User

↓

ClusterRoleBinding

↓

ClusterRole

↓

Cluster-wide Permissions

---

# Common Verbs

- get
- list
- watch
- create
- update
- patch
- delete
- deletecollection

---

# Common Resources

- Pods
- Deployments
- Services
- ConfigMaps
- Secrets
- PVC
- Nodes
- Namespaces

---

# View Roles

```bash
kubectl get roles -A
```

---

# View ClusterRoles

```bash id="8zthwt"
kubectl get clusterroles
```

---

# View RoleBindings

```bash id="c6xflv"
kubectl get rolebindings -A
```

---

# View ClusterRoleBindings

```bash id="9e80q9"
kubectl get clusterrolebindings
```

---

# Describe Role

```bash id="dz0q4t"
kubectl describe role <role-name>
```

---

# Describe ClusterRole

```bash id="9yqvkn"
kubectl describe clusterrole <cluster-role>
```

---

# Check User Permissions

```bash id="v5pdzt"
kubectl auth can-i create deployments
```

Example

```text
yes
```

---

Namespace Example

```bash id="u0c2po"
kubectl auth can-i delete pods -n production
```

---

Impersonation Example

```bash id="1tl0ei"
kubectl auth can-i get secrets \
--as developer@example.com
```

---

# Production Incident

Issue

Developer deleted a production Deployment.

Investigation

```bash id="3zdd8d"
kubectl auth can-i '*' '*' \
--as developer@example.com
```

Result

Full cluster access.

Root Cause

Developer assigned

cluster-admin

through ClusterRoleBinding.

Resolution

Remove ClusterRoleBinding.

Create least-privilege Role.

Assign RoleBinding only for development namespace.

---

# Investigation Workflow

Authentication

↓

RBAC

↓

Role

↓

RoleBinding

↓

ClusterRole

↓

ClusterRoleBinding

↓

Permission Validation

↓

Recovery

---

# Common Authorization Errors

Forbidden

Example

```text
Error from server (Forbidden)
```

Meaning

Authentication succeeded.

RBAC denied permission.

---

Unauthorized

Meaning

Authentication failed.

RBAC never executed.

---

# Recovery Commands

List RoleBindings

```bash id="z07hm5"
kubectl get rolebindings -A
```

---

List ClusterRoleBindings

```bash id="eqxh4q"
kubectl get clusterrolebindings
```

---

Describe ClusterRoleBinding

```bash id="9d0td5"
kubectl describe clusterrolebinding <binding>
```

---

Delete Incorrect Binding

```bash id="ydisgv"
kubectl delete clusterrolebinding <binding>
```

---

Verify Permissions

```bash id="4r3x4x"
kubectl auth can-i list pods
```

---

# Validation Checklist

Least Privilege Applied

No Unnecessary ClusterRoleBindings

No cluster-admin for Developers

RBAC Validated

Permission Tests Successful

Audit Logs Reviewed

---

# RCA Template

Incident

RBAC Misconfiguration

Root Cause

Overly Permissive ClusterRoleBinding

Business Impact

Unauthorized Production Changes

Resolution

Removed Excessive Permissions

Preventive Action

Quarterly RBAC Review

---

# Interview Questions

## Q1. Difference between Role and ClusterRole?

Answer

Role is namespace-scoped.

ClusterRole provides cluster-wide permissions or permissions for cluster-scoped resources.

---

## Q2. Difference between RoleBinding and ClusterRoleBinding?

Answer

RoleBinding grants permissions inside a namespace.

ClusterRoleBinding grants permissions across the entire cluster.

---

## Q3. Which command verifies permissions?

Answer

```bash id="s6rq4w"
kubectl auth can-i get pods
```

---

## Q4. Difference between Unauthorized and Forbidden?

Answer

Unauthorized indicates authentication failed.

Forbidden indicates authentication succeeded but authorization denied access.

---

## Q5. Why should cluster-admin rarely be assigned?

Answer

It grants unrestricted access to all Kubernetes resources and significantly increases security risk.

---

# Assignment

A developer reports

```text id="jlwmjb"
Error from server (Forbidden)
```

Prepare

- Investigation Plan
- Commands
- Root Cause
- Recovery
- Validation
- Preventive Actions

---

# Assignment Solution

## Step 1

Verify authentication.

---

## Step 2

Check permissions using

kubectl auth can-i.

---

## Step 3

Review

- Role
- ClusterRole
- RoleBinding
- ClusterRoleBinding

---

## Step 4

Grant only the required permissions.

---

## Step 5

Validate access.

---

## Step 6

Review audit logs.

---

## Step 7

Complete RCA.

---

# Production Best Practices

✔ Follow Least Privilege

✔ Prefer Roles over ClusterRoles

✔ Avoid cluster-admin

✔ Review RBAC Quarterly

✔ Audit ClusterRoleBindings

✔ Use Groups Instead of Individual Users

✔ Use Dedicated ServiceAccounts

✔ Automate RBAC Validation

✔ Monitor Authorization Failures

✔ Maintain RBAC Documentation

---

# Runbook Checklist

□ Authentication Successful

□ RBAC Verified

□ Roles Reviewed

□ ClusterRoles Reviewed

□ Bindings Verified

□ Permissions Validated

□ Root Cause Confirmed

□ Recovery Completed

□ Validation Successful

□ RCA Completed

---

# Common Mistakes

❌ Assigning cluster-admin to Developers

❌ Using ClusterRole Instead of Role

❌ Granting Wildcard Permissions

❌ Never Reviewing RBAC

❌ Sharing ServiceAccounts

❌ Ignoring Authorization Failures

❌ Not Testing Permissions

❌ Skipping Audit Reviews

