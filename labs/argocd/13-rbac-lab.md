# Lab 13 - ArgoCD RBAC

# Enterprise DevOps Platform

---

# Lab Objective

In this lab you will learn how to:

- Understand ArgoCD RBAC
- Create Roles
- Create Users
- Configure Policies
- Restrict Access
- Verify Authorization
- Troubleshoot RBAC issues

---

# Prerequisites

- Labs 01 to 12 Completed
- ArgoCD Installed
- Kubernetes Cluster Running
- Admin Access

---

# What is RBAC?

RBAC (Role-Based Access Control) controls who can access ArgoCD resources and what operations they can perform.

RBAC improves security by enforcing the principle of least privilege.

---

# Why RBAC?

Without RBAC

```
Everyone

↓

Can Deploy

↓

Can Delete

↓

Can Rollback

↓

High Risk
```

With RBAC

```
Admin

↓

Developer

↓

QA

↓

Read Only
```

Each user has only the permissions required for their role.

---

# Enterprise Architecture

```
                ArgoCD

                   │

        ┌──────────┼──────────┐

        │          │          │

     Admin     Developer    Viewer

     Full      Deploy Only  Read Only
```

---

# Default Roles

| Role | Permission |
|------|------------|
| admin | Full Access |
| readonly | Read Only |

---

# Step 1 - View RBAC ConfigMap

```bash
kubectl get configmap argocd-rbac-cm -n argocd -o yaml
```

---

# Step 2 - Edit RBAC ConfigMap

```bash
kubectl edit configmap argocd-rbac-cm -n argocd
```

---

# Step 3 - Create Developer Role

Example

```yaml
data:

  policy.csv: |

    p, role:developer, applications, get, *, allow

    p, role:developer, applications, sync, *, allow

    p, role:developer, applications, create, *, allow

    p, role:developer, applications, update, *, allow
```

---

# Step 4 - Create ReadOnly Role

```yaml
p, role:viewer, applications, get, *, allow
```

No Sync

No Delete

No Update

---

# Step 5 - Map User

Example

```yaml
g, john, role:developer
```

---

# Step 6 - Restart ArgoCD Server

```bash
kubectl rollout restart deployment argocd-server -n argocd
```

---

# Step 7 - Verify Login

Login as

```
john
```

Verify

- Application List
- Sync
- Update

---

# Step 8 - Verify ReadOnly User

Login as Viewer.

Expected

```
View Applications

✓

Sync

✗

Delete

✗

Update

✗
```

---

# Step 9 - Verify Permissions

Developer

```bash
argocd app sync guestbook
```

Expected

Success

---

Viewer

```bash
argocd app sync guestbook
```

Expected

```
Permission Denied
```

---

# Step 10 - Verify Policies

```bash
kubectl get configmap argocd-rbac-cm \
-n argocd -o yaml
```

---

# Commands Used

View ConfigMap

```bash
kubectl get configmap argocd-rbac-cm -n argocd
```

Edit ConfigMap

```bash
kubectl edit configmap argocd-rbac-cm -n argocd
```

Restart Server

```bash
kubectl rollout restart deployment argocd-server -n argocd
```

Applications

```bash
argocd app list
```

---

# Expected Output

Developer

```
Login

↓

View

↓

Sync

↓

Deploy
```

Viewer

```
Login

↓

View

↓

Cannot Sync

↓

Cannot Delete
```

---

# Troubleshooting

## Permission Denied

Verify

```
policy.csv
```

---

## User Cannot Login

Verify

- Dex
- LDAP
- OIDC
- Local User Configuration

---

## RBAC Changes Not Applied

Restart

```bash
kubectl rollout restart deployment argocd-server -n argocd
```

---

## Wrong Permissions

Verify

```
Role Mapping
```

---

# Best Practices

- Follow Least Privilege Principle.
- Avoid sharing Admin accounts.
- Use SSO with LDAP/OIDC.
- Audit Role Changes.
- Separate Developer and Production permissions.
- Review RBAC policies regularly.

---

# Real Production Example

| Team | Role |
|------|------|
| Platform Team | Admin |
| Dev Team | Developer |
| QA Team | Sync Only |
| Auditors | ReadOnly |
| Security Team | ReadOnly |

---

# Interview Questions

## 1. What is RBAC?

Role-Based Access Control restricts access based on user roles.

---

## 2. Where is RBAC configured?

```
argocd-rbac-cm
```

ConfigMap.

---

## 3. What is policy.csv?

It defines RBAC policies and permissions.

---

## 4. Why restart argocd-server?

To reload updated RBAC configuration.

---

## 5. What is the principle of least privilege?

Users receive only the permissions necessary to perform their job.

---

# Lab Success Criteria

You have successfully completed this lab if:

- RBAC policies are configured.
- Developer can deploy applications.
- Viewer has read-only access.
- Unauthorized operations are denied.
- You understand enterprise RBAC implementation.

---

# Marathi Quick Revision

- RBAC म्हणजे Role-Based Access Control.
- `argocd-rbac-cm` मध्ये Policies लिहिल्या जातात.
- `policy.csv` मध्ये Roles Define करतात.
- Developer ला Deploy Permission असू शकते.
- Viewer ला फक्त Read Permission असते.
- Production मध्ये Least Privilege Principle नेहमी Follow करा.

