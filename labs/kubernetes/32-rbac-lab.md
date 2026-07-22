# Lab 32 - Kubernetes RBAC (Role-Based Access Control)

# 1. Objective

The objective of this lab is to understand how Kubernetes RBAC controls access to cluster resources using Roles, ClusterRoles, RoleBindings and ClusterRoleBindings.

By the end of this lab you will be able to

- Create Roles
- Create ClusterRoles
- Create RoleBindings
- Create ClusterRoleBindings
- Verify user permissions
- Troubleshoot RBAC issues
- Explain enterprise authorization

RBAC is one of the most important Kubernetes security mechanisms and is widely used in enterprise production clusters.

---

# 2. Prerequisites

Complete

- Lab 01 - Lab 31

Verify

```bash
kubectl version

kubectl get nodes

kubectl auth can-i get pods
```

---

# 3. Enterprise Usage

Typical RBAC Architecture

```
Developer

↓

Role

↓

Read Pods
```

```
DevOps Engineer

↓

ClusterRole

↓

Manage Deployments
```

```
Monitoring Team

↓

Role

↓

Read Metrics
```

```
Security Team

↓

ClusterRole

↓

Audit Resources
```

RBAC ensures users receive only the permissions required for their job.

---

# 4. Usage in THIS Project

Future project access

```
Developer

↓

Frontend Namespace

↓

Read Only
```

```
DevOps Team

↓

Entire Cluster

↓

Deployment Access
```

```
Monitoring Team

↓

Monitoring Namespace

↓

Manage Prometheus
```

```
Argo CD

↓

Deploy Applications
```

---

# 5. Architecture

```
User / Service Account

↓

Role / ClusterRole

↓

RoleBinding / ClusterRoleBinding

↓

API Server

↓

Authorization

↓

Allow / Deny
```

---

# 6. Step-by-Step Implementation

## Step 1

Create Namespace

```bash
kubectl create namespace development
```

Verify

```bash
kubectl get ns
```

---

## Step 2

Create Role

```bash
cat > pod-reader-role.yaml <<EOF
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: development
  name: pod-reader
rules:
- apiGroups:
  - ""
  resources:
  - pods
  verbs:
  - get
  - list
  - watch
