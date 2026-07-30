# Kubernetes Interview Master Handbook

# Section 08 - Kubernetes Security, RBAC & NetworkPolicies

# Chapter 04 - Roles and ClusterRoles

---

# Objective

Learn Roles and ClusterRoles in Kubernetes from a production and interview perspective.

Understand when to use each, how permissions are defined and how enterprise organizations implement least-privilege access.

---

# Interview Scenario

Time: 04:15 PM

A developer needs permission to

- View Pods
- Restart Deployments

inside the development namespace.

The security team does NOT want the developer to access

- Production
- Secrets
- Nodes
- Cluster-wide resources

How would you implement secure access?

---

# What is a Role?

A Role defines permissions within a single namespace.

A Role cannot grant permissions outside its namespace.

---

# Role Scope

Namespace

↓

Pods

Deployments

Services

ConfigMaps

Secrets

PVC

Jobs

Ingress

---

# Example Role

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: developer-role
  namespace: development

rules:
- apiGroups: [""]
  resources: ["pods"]
  verbs: ["get","list","watch"]

- apiGroups: ["apps"]
  resources: ["deployments"]
  verbs: ["get","list","watch","patch"]
```

---

# What is a ClusterRole?

A ClusterRole defines permissions across the entire cluster.

It can also grant access to cluster-scoped resources.

Examples

- Nodes
- Namespaces
- PersistentVolumes
- ClusterRoles
- StorageClasses

---

# ClusterRole Scope

Entire Cluster

↓

Namespaces

Nodes

PersistentVolumes

ClusterRoles

Custom Resources

---

# Example ClusterRole

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: node-reader

rules:
- apiGroups: [""]
  resources: ["nodes"]
  verbs: ["get","list","watch"]
```

---

# Role vs ClusterRole

| Feature | Role | ClusterRole |
|----------|------|-------------|
| Scope | Namespace | Cluster |
| Namespace Required | Yes | No |
| Access Cluster Resources | No | Yes |
| Used With | RoleBinding | ClusterRoleBinding or RoleBinding |
| Typical Usage | Developers | Administrators |

---

# Production Architecture

Developer

↓

RoleBinding

↓

Role

↓

Development Namespace

OR

Administrator

↓

ClusterRoleBinding

↓

ClusterRole

↓

Entire Cluster

---

# View Roles

```bash
kubectl get roles -A
```

---

# View ClusterRoles

```bash id="nclvv0"
kubectl get clusterroles
```

---

# Describe Role

```bash id="mw7aj8"
kubectl describe role developer-role -n development
```

---

# Describe ClusterRole

```bash id="0mqicp"
kubectl describe clusterrole cluster-admin
```

---

# Production Incident

Issue

Developer accidentally receives access to all namespaces.

Investigation

```bash id="3t8mpn"
kubectl get clusterrolebindings
```

Developer bound to

cluster-admin

Root Cause

Incorrect ClusterRoleBinding.

Resolution

Delete ClusterRoleBinding.

Create namespace-specific Role.

Bind using RoleBinding.

---

# Investigation Workflow

Authentication

↓

Authorization

↓

Role

↓

ClusterRole

↓

Bindings

↓

Permission Validation

↓

Recovery

---

# Permission Validation

Can developer view Pods?

```bash id="z3s8nq"
kubectl auth can-i get pods \
--as developer@example.com \
-n development
```

---

Can developer delete Nodes?

```bash id="5p2sfx"
kubectl auth can-i delete nodes \
--as developer@example.com
```

Expected

```text
no
```

---

# Recovery Commands

List Roles

```bash id="6qtufw"
kubectl get roles -A
```

---

List ClusterRoles

```bash id="2nfwg3"
kubectl get clusterroles
```

---

Delete Incorrect ClusterRoleBinding

```bash id="9ibvpk"
kubectl delete clusterrolebinding developer-admin
```

---

Validate Permissions

```bash id="l3lpm5"
kubectl auth can-i list pods \
--as developer@example.com \
-n development
```

---

# Validation Checklist

Roles Correct

ClusterRoles Reviewed

Least Privilege Applied

No Unnecessary ClusterRoles

Permissions Validated

Audit Logs Reviewed

---

# RCA Template

Incident

Excessive Kubernetes Permissions

Root Cause

Incorrect ClusterRole Assignment

Business Impact

Potential Unauthorized Cluster Access

Resolution

Removed ClusterRoleBinding

Created Namespace Role

Preventive Action

Quarterly RBAC Audit

---

# Interview Questions

## Q1. What is the difference between Role and ClusterRole?

Answer

A Role provides permissions within a single namespace, while a ClusterRole provides cluster-wide permissions or access to cluster-scoped resources.

---

## Q2. Can a ClusterRole be used inside a namespace?

Answer

Yes.

A ClusterRole can be referenced by a RoleBinding to grant its permissions only within a specific namespace.

---

## Q3. Which resources require ClusterRoles?

Answer

Cluster-scoped resources such as Nodes, Namespaces, PersistentVolumes, StorageClasses and ClusterRoles.

---

## Q4. Why should developers usually receive Roles instead of ClusterRoles?

Answer

Roles limit permissions to a namespace, reducing the risk of accidental or malicious changes across the cluster.

---

## Q5. Which command validates Kubernetes permissions?

Answer

```bash id="rqn7qx"
kubectl auth can-i <verb> <resource>
```

---

# Assignment

A development team needs

- Read access to Pods
- Restart Deployments

only in the development namespace.

Prepare

- RBAC Design
- Role
- Validation Commands
- Security Considerations
- Recovery Plan if Misconfigured

---

# Assignment Solution

## Step 1

Create a namespace Role.

---

## Step 2

Grant only required verbs.

---

## Step 3

Bind the Role using a RoleBinding.

---

## Step 4

Validate permissions with

kubectl auth can-i.

---

## Step 5

Review audit logs.

---

## Step 6

Perform periodic RBAC reviews.

---

# Production Best Practices

✔ Prefer Roles for Application Teams

✔ Reserve ClusterRoles for Platform Administrators

✔ Apply Least Privilege

✔ Audit ClusterRoles Regularly

✔ Avoid Wildcard Permissions

✔ Use RoleBindings Whenever Possible

✔ Validate Permissions Before Production Access

✔ Document RBAC Policies

✔ Review Access Quarterly

✔ Monitor Authorization Events

---

# Runbook Checklist

□ Role Created

□ ClusterRole Reviewed

□ Permissions Validated

□ RoleBinding Configured

□ Least Privilege Applied

□ Audit Logs Reviewed

□ Root Cause Confirmed

□ Recovery Completed

□ Validation Successful

□ Documentation Updated

---

# Common Mistakes

❌ Giving Developers ClusterRoles

❌ Using cluster-admin Unnecessarily

❌ Granting Wildcard Verbs

❌ Granting Wildcard Resources

❌ Skipping Permission Validation

❌ Ignoring Audit Logs

❌ Never Reviewing RBAC

❌ Missing Documentation

