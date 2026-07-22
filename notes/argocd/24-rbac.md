# Role-Based Access Control (RBAC)

# Enterprise DevOps Platform

---

# Purpose

This document explains Role-Based Access Control (RBAC) in ArgoCD from beginner to enterprise level.

RBAC is one of the most important Production and Interview topics because enterprises never allow every engineer to have full access to ArgoCD.

---

# Introduction

Imagine an organization has

- Developers
- QA Engineers
- DevOps Engineers
- SRE Team
- Platform Team
- Security Team

Should everyone be able to deploy Production?

```
No
```

Should everyone be able to delete Applications?

```
No
```

RBAC solves this problem.

---

# Simple Definition

RBAC controls

> Who can access ArgoCD and what actions they are allowed to perform.

---

# Why RBAC?

Without RBAC

```
Developer

↓

Delete Production App

↓

Production Down
```

---

With RBAC

```
Developer

↓

Read Only

-------------------

DevOps Engineer

↓

Deploy

-------------------

Admin

↓

Full Access
```

---

# RBAC Architecture

```
User

↓

Login

↓

Authentication

↓

RBAC Policy

↓

Permission Check

↓

Allow

or

Deny
```

---

# Common Roles

## Administrator

Permissions

- Create Applications
- Delete Applications
- Sync
- Rollback
- Manage Clusters
- Manage Repositories
- Manage Projects

---

## DevOps Engineer

Permissions

- Sync Applications
- Rollback
- View Logs
- Create Applications

Cannot

- Change RBAC
- Delete ArgoCD

---

## Developer

Permissions

- View Applications
- View Health
- View Logs

Cannot

- Sync Production
- Delete Applications
- Register Clusters

---

## QA Engineer

Permissions

- Deploy QA
- View Dev
- View Logs

Cannot

- Deploy Production

---

# Enterprise Example

```
Production

↓

Platform Team

Only

------------------------

Development

↓

Developers

Allowed

------------------------

QA

↓

QA Team

Allowed
```

---

# RBAC Policy File

Main configuration

```
argocd-rbac-cm
```

This ConfigMap stores RBAC rules.

---

# Example Policy

```
p, role:developer, applications, get, *, allow

p, role:developer, applications, sync, *, deny
```

Meaning

```
Developer

Can View

Cannot Sync
```

---

# Production DevOps Role

```
p, role:devops, applications, sync, *, allow

p, role:devops, applications, get, *, allow
```

DevOps Engineers

```
View

Deploy

Rollback
```

---

# Admin Role

```
role:admin

↓

Everything Allowed
```

Reserved for Platform Administrators.

---

# Project-Based RBAC

Example

```
Project

Frontend

↓

Frontend Team

Only
```

Another Project

```
Payments

↓

Payments Team
```

Teams cannot access each other's projects.

---

# Authentication + RBAC

Authentication

```
Who are you?
```

Examples

- LDAP
- SSO
- GitHub
- Google
- Microsoft Entra ID

RBAC

```
What can you do?
```

---

# Enterprise Workflow

```
Developer Login

↓

Authenticated

↓

Developer Role

↓

Permission Check

↓

View Application

↓

Allowed

--------------------

Production Sync

↓

Denied
```

---

# Benefits

- Secure Production
- Least Privilege Access
- Team Isolation
- Compliance
- Audit Friendly
- Prevents accidental deployments

---

# Common Problems

Developer cannot Sync.

Possible causes

- Missing RBAC permission
- Wrong Project
- Wrong Role Mapping

---

Production Deployment Denied.

Possible reasons

- Sync permission missing
- Project restriction
- Cluster restriction

---

# Best Practices

- Follow Least Privilege Principle.
- Separate Developer and Production access.
- Restrict Admin accounts.
- Use Groups instead of individual users.
- Integrate with SSO.
- Review RBAC policies regularly.
- Audit Production permissions.

---

# Interview Questions

## Q1. What is RBAC in ArgoCD?

### Answer

RBAC controls which users or groups can perform specific actions such as viewing, synchronizing, deleting or managing ArgoCD resources.

---

## Q2. Which ConfigMap stores RBAC policies?

### Answer

```
argocd-rbac-cm
```

---

## Q3. Why is RBAC important?

### Answer

RBAC protects Production environments by ensuring users receive only the permissions required for their role.

---

## Q4. What is the Principle of Least Privilege?

### Answer

Users should receive only the minimum permissions required to perform their work and nothing more.

---

# Marathi Quick Revision

- RBAC म्हणजे Permission Control.
- Authentication → कोण?
- Authorization → काय करू शकतो?
- `argocd-rbac-cm` मध्ये Policies असतात.
- Developers ला Production Deploy देऊ नये.
- Least Privilege Follow करा.
- Senior Interviews मध्ये नेहमी विचारतात.

---

# Marathi Summary (5+ Experience Revision)

RBAC हे ArgoCD मधील सर्वात महत्त्वाचे Production Security feature आहे. याच्या मदतीने Users आणि Groups साठी View, Sync, Rollback, Delete, Project Access आणि Cluster Access नियंत्रित करता येतो. Enterprise environments मध्ये LDAP/SSO सोबत RBAC वापरून Least Privilege Principle लागू केला जातो. `argocd-rbac-cm` हा RBAC configuration साठी मुख्य ConfigMap आहे. DevOps आणि Platform Engineer interviews मध्ये RBAC हा अत्यंत महत्त्वाचा विषय आहे.

