# Kubernetes Interview Master Handbook

# Section 08 - Kubernetes Security, RBAC & NetworkPolicies

# Chapter 05 - RoleBindings and ClusterRoleBindings

---

# Objective

Learn RoleBindings and ClusterRoleBindings from a production and interview perspective.

Understand how Kubernetes grants permissions by binding Roles or ClusterRoles to Users, Groups and ServiceAccounts.

---

# Interview Scenario

Time: 10:20 AM

A developer reports

"I have a Role with all required permissions, but I still receive 'Forbidden' errors."

Investigation reveals

- Role exists
- Permissions are correct
- No RoleBinding exists

You are asked to resolve the issue.

---

# What is a RoleBinding?

A RoleBinding grants permissions inside a namespace.

It connects

User / Group / ServiceAccount

↓

Role

↓

Namespace

Without a RoleBinding, the Role has no effect.

---

# RoleBinding Architecture

Developer

↓

RoleBinding

↓

Role

↓

Development Namespace

---

# Example RoleBinding

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: developer-binding
  namespace: development

subjects:
- kind: User
  name: developer@example.com
  apiGroup: rbac.authorization.k8s.io

roleRef:
  kind: Role
  name: developer-role
  apiGroup: rbac.authorization.k8s.io
```

---

# What is a ClusterRoleBinding?

A ClusterRoleBinding grants permissions across the entire cluster.

It connects

User / Group / ServiceAccount

↓

ClusterRole

↓

Entire Cluster

---

# ClusterRoleBinding Architecture

Administrator

↓

ClusterRoleBinding

↓

ClusterRole

↓

Entire Kubernetes Cluster

---

# Example ClusterRoleBinding

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: platform-admin

subjects:
- kind: User
  name: admin@example.com
  apiGroup: rbac.authorization.k8s.io

roleRef:
  kind: ClusterRole
  name: cluster-admin
  apiGroup: rbac.authorization.k8s.io
```

---

# RoleBinding vs ClusterRoleBinding

| Feature | RoleBinding | ClusterRoleBinding |
|----------|-------------|--------------------|
| Scope | Namespace | Entire Cluster |
| Uses Role | Yes | No |
| Uses ClusterRole | Yes | Yes |
| Namespace Required | Yes | No |
| Typical Usage | Developers | Platform Administrators |

---

# Important Interview Point

A RoleBinding can reference

- Role
- ClusterRole

When a RoleBinding references a ClusterRole, its permissions are limited to the namespace where the RoleBinding exists.

---

# Production Example

Development Team

↓

RoleBinding

↓

ClusterRole (Read Only)

↓

Development Namespace Only

Production remains protected.

---

# View RoleBindings

```bash
kubectl get rolebindings -A
```

---

# View ClusterRoleBindings

```bash
kubectl get clusterrolebindings
```

---

# Describe RoleBinding

```bash
kubectl describe rolebinding developer-binding -n development
```

---

# Describe ClusterRoleBinding

```bash
kubectl describe clusterrolebinding platform-admin
```

---

# Production Incident

Issue

Developer cannot deploy applications.

Error

```text
Error from server (Forbidden)
```

Investigation

Role exists.

No RoleBinding.

Root Cause

Permissions never assigned.

Resolution

Create RoleBinding.

Validate permissions.

---

# Investigation Workflow

Authentication

↓

Authorization

↓

Role

↓

RoleBinding

↓

Permission Validation

↓

Recovery

---

# Permission Validation

Check access

```bash
kubectl auth can-i create deployments \
--as developer@example.com \
-n development
```

---

Check Secret access

```bash
kubectl auth can-i get secrets \
--as developer@example.com \
-n production
```

Expected

```text
no
```

---

# Recovery Commands

List RoleBindings

```bash
kubectl get rolebindings -A
```

---

List ClusterRoleBindings

```bash
kubectl get clusterrolebindings
```

---

Delete Incorrect Binding

```bash
kubectl delete clusterrolebinding developer-admin
```

---

Verify Access

```bash
kubectl auth can-i create deployments \
--as developer@example.com \
-n development
```

---

# Validation Checklist

Correct RoleBinding Created

ClusterRoleBindings Reviewed

Least Privilege Maintained

Permissions Validated

Unauthorized Access Prevented

Audit Logs Reviewed

---

# RCA Template

Incident

RBAC Permission Failure

Root Cause

Missing RoleBinding

Business Impact

Developer Unable to Deploy

Resolution

Created RoleBinding

Preventive Action

RBAC Validation During User Onboarding

---

# Interview Questions

## Q1. What is a RoleBinding?

Answer

A RoleBinding grants permissions within a namespace by binding a Role or ClusterRole to a User, Group or ServiceAccount.

---

## Q2. What is a ClusterRoleBinding?

Answer

A ClusterRoleBinding grants cluster-wide permissions by binding a ClusterRole to a User, Group or ServiceAccount.

---

## Q3. Can a Role exist without a RoleBinding?

Answer

Yes.

However, the permissions are never granted until the Role is bound.

---

## Q4. Can a RoleBinding reference a ClusterRole?

Answer

Yes.

The ClusterRole permissions are limited to the namespace where the RoleBinding exists.

---

## Q5. Which command verifies permissions?

Answer

```bash
kubectl auth can-i <verb> <resource>
```

---

# Assignment

A QA team needs

- Read access to Pods
- Read access to Services

inside the qa namespace only.

Prepare

- RBAC Design
- Binding Strategy
- Validation Commands
- Security Considerations
- Recovery Plan

---

# Assignment Solution

## Step 1

Create a namespace Role.

---

## Step 2

Bind it using a RoleBinding.

---

## Step 3

Validate permissions using

kubectl auth can-i.

---

## Step 4

Ensure no ClusterRoleBinding exists.

---

## Step 5

Review audit logs.

---

## Step 6

Document the RBAC configuration.

---

# Production Best Practices

✔ Prefer RoleBindings Over ClusterRoleBindings

✔ Apply Least Privilege

✔ Avoid cluster-admin Assignments

✔ Review Bindings Regularly

✔ Validate Permissions Before Production Access

✔ Use Groups Instead of Individual Users

✔ Audit RBAC Frequently

✔ Remove Unused Bindings

✔ Monitor Authorization Failures

✔ Document Access Policies

---

# Runbook Checklist

□ RoleBinding Verified

□ ClusterRoleBinding Reviewed

□ Permissions Validated

□ Least Privilege Applied

□ Unauthorized Access Prevented

□ Audit Logs Reviewed

□ Root Cause Confirmed

□ Recovery Completed

□ Validation Successful

□ Documentation Updated

---

# Common Mistakes

❌ Creating Roles Without RoleBindings

❌ Excessive ClusterRoleBindings

❌ Granting cluster-admin to Application Teams

❌ Forgetting Permission Validation

❌ Using Wildcard Permissions

❌ Never Auditing Bindings

❌ Ignoring Forbidden Errors

❌ Missing RBAC Documentation

