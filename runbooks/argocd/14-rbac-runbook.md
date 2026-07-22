# RBAC Runbook

# Enterprise DevOps Platform

---

# Purpose

This runbook describes the Standard Operating Procedure (SOP) for troubleshooting Kubernetes RBAC (Role-Based Access Control) issues affecting ArgoCD deployments.

RBAC issues prevent ArgoCD from creating, updating, deleting or managing Kubernetes resources.

---

# Scope

Applications

- React + Vite Frontend
- Flask API Gateway
- Flask Auth Service
- Flask Dashboard Service

Supporting Services

- PostgreSQL
- Redis

Infrastructure

- Kubernetes
- ArgoCD
- Cluster Roles
- Service Accounts

---

# Symptoms

- Sync Failed
- Permission Denied
- Forbidden Errors
- Resources Not Created
- Resources Not Updated
- Application OutOfSync

---

# Common Causes

| Cause | Example |
|--------|----------|
| Missing Role | No permissions granted |
| Missing RoleBinding | Role not assigned |
| Missing ClusterRole | Cluster-level permission absent |
| Missing ClusterRoleBinding | Cluster role not bound |
| Wrong ServiceAccount | Incorrect account used |
| Namespace Restriction | Access denied in namespace |

---

# Troubleshooting Workflow

```
Permission Error

↓

Identify Resource

↓

Verify ServiceAccount

↓

Verify Role

↓

Verify RoleBinding

↓

Fix RBAC

↓

Sync

↓

Healthy
```

---

# Step 1 - Verify Application

```bash
argocd app get frontend
```

Review

- Sync Status
- Operation Status
- Error Message

Typical Error

```
Forbidden
```

---

# Step 2 - Verify Service Account

```bash
kubectl get serviceaccount -n argocd
```

Check

- ServiceAccount exists
- Correct ServiceAccount configured

---

# Step 3 - Verify Roles

```bash
kubectl get roles --all-namespaces
```

Ensure required Roles exist.

---

# Step 4 - Verify ClusterRoles

```bash
kubectl get clusterroles
```

Confirm required ClusterRoles are present.

---

# Step 5 - Verify RoleBindings

```bash
kubectl get rolebindings --all-namespaces
```

Ensure the ServiceAccount is bound to the correct Role.

---

# Step 6 - Verify ClusterRoleBindings

```bash
kubectl get clusterrolebindings
```

Check cluster-wide permissions.

---

# Step 7 - Verify Permissions

```bash
kubectl auth can-i create deployment \
--as=system:serviceaccount:argocd:argocd-application-controller
```

Repeat for

- update
- patch
- delete
- get
- list
- watch

---

# Step 8 - Review Controller Logs

```bash
kubectl logs -n argocd <application-controller-pod>
```

Look for

- Forbidden
- Unauthorized
- RBAC Denied

---

# Step 9 - Fix the Issue

Possible actions

- Create Role
- Create ClusterRole
- Create RoleBinding
- Create ClusterRoleBinding
- Assign correct ServiceAccount

Commit RBAC manifests to Git.

---

# Step 10 - Synchronize

```bash
argocd app sync frontend
```

---

# Validation

```bash
argocd app get frontend
```

Expected

```
Synced

Healthy
```

---

# Important Commands

Service Accounts

```bash
kubectl get serviceaccount -n argocd
```

Roles

```bash
kubectl get roles --all-namespaces
```

ClusterRoles

```bash
kubectl get clusterroles
```

RoleBindings

```bash
kubectl get rolebindings --all-namespaces
```

Permission Check

```bash
kubectl auth can-i create deployment
```

---

# Success Criteria

- No Forbidden errors
- RBAC permissions verified
- Sync successful
- Application Healthy

---

# Interview Questions

## Q1. What is RBAC?

### Answer

RBAC (Role-Based Access Control) controls which Kubernetes resources a user or ServiceAccount can access and what actions they can perform.

---

## Q2. Which command verifies Kubernetes permissions?

### Answer

```bash
kubectl auth can-i <verb> <resource>
```

---

## Q3. Why do ArgoCD syncs fail because of RBAC?

### Answer

ArgoCD requires permissions to create, update, patch and delete Kubernetes resources. Missing Roles or RoleBindings result in "Forbidden" errors during synchronization.

---

# Marathi Quick Revision

- Forbidden Error = RBAC Issue.
- ServiceAccount Verify करा.
- Role आणि RoleBinding तपासा.
- ClusterRole Verify करा.
- `kubectl auth can-i` वापरा.
- RBAC Fix → Git Commit → Sync → Healthy.

