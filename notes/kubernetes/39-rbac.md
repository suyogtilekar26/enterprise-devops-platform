# Kubernetes RBAC (Role-Based Access Control)

# 1. Purpose

The purpose of Kubernetes RBAC (Role-Based Access Control) is to control who can access Kubernetes resources and what actions they are allowed to perform.

RBAC protects Kubernetes clusters by implementing the Principle of Least Privilege (PoLP).

Instead of giving every user full administrative privileges, RBAC grants only the permissions required for their job role.

This is one of the most important security features in Enterprise Kubernetes.

---

# 2. Introduction

Imagine an Enterprise Kubernetes Cluster.

Teams

```
Developers

QA Team

DevOps Team

Security Team

Platform Team
```

Without RBAC

```
Everyone

↓

Cluster Admin

↓

Delete Namespace

↓

Production Outage
```

With RBAC

```
Developer

↓

Read Pods

Create Deployment

View Logs

✓

-----------------------

Cannot

Delete Cluster

✗
```

Only authorized users can perform critical operations.

---

# 3. Enterprise Usage

RBAC is mandatory in almost every Production Kubernetes Cluster.

Used by

- Banking
- Healthcare
- Government
- Insurance
- Retail
- FinTech
- SaaS Platforms

Cloud Platforms

- AWS EKS
- Azure AKS
- Google GKE
- OpenShift

Every Production Cluster should have RBAC enabled.

---

# 4. Usage in THIS Project

Our Enterprise DevOps Platform

```
Developers

↓

Deploy Applications

------------------------

QA Team

↓

Read Logs

------------------------

DevOps Team

↓

Deploy

Scale

Upgrade

------------------------

Security Team

↓

Audit

RBAC Review

------------------------

Platform Team

↓

Cluster Administration
```

Each team receives only the permissions required for its responsibilities.

---

# 5. Architecture

```
                  User

                    │

                    ▼

             Authentication

                    │

                    ▼

                  RBAC

                    │

        ┌───────────┼───────────┐

        ▼                       ▼

     Role                 ClusterRole

        │                       │

        ▼                       ▼

    RoleBinding         ClusterRoleBinding

        │

        ▼

 Kubernetes API Server

        │

        ▼

 Allow

 or

 Deny
```

---

# 6. Internal Workflow

```
User Executes Command

↓

Authentication

↓

Authorization

↓

RBAC Check

↓

Permission Exists?

↓

YES

↓

Allow Request

------------------------

NO

↓

Forbidden
```

---

# 7. Kubernetes Authentication vs Authorization

Authentication

```
Who Are You?
```

Example

```
Developer Login
```

Authorization

```
What Can You Do?
```

Example

```
Can Create Deployment?

YES

----------------

Can Delete Namespace?

NO
```

RBAC performs Authorization.

---

# 8. RBAC Components

## Role

Permissions inside a Namespace.

Example

```
Namespace

↓

Development

↓

Read Pods

Create Deployments
```

---

## ClusterRole

Permissions across the entire Cluster.

Examples

```
Read Nodes

Manage StorageClasses

Manage Namespaces
```

---

## RoleBinding

Assigns a Role to

- User
- Group
- ServiceAccount

Inside a Namespace.

---

## ClusterRoleBinding

Assigns ClusterRole permissions across the Cluster.

---

# 9. Role vs ClusterRole

Role

```
Namespace Scope
```

ClusterRole

```
Entire Cluster
```

Simple Rule

```
Role

↓

Namespace

--------------------

ClusterRole

↓

Cluster
```

---

# 10. Daily DevOps Activities

- Review RBAC Policies
- Create Roles
- Create RoleBindings
- Audit Cluster Permissions
- Remove Unused Access
- Review Service Accounts

---

# 11. Production Best Practices

- Follow Least Privilege.
- Never give cluster-admin unnecessarily.
- Use Groups instead of individual Users.
- Audit RBAC regularly.
- Separate Development and Production permissions.
- Review ServiceAccount permissions.

---

# 12. Security

- Implement Principle of Least Privilege.
- Avoid wildcard permissions.
- Enable Kubernetes Audit Logs.
- Rotate credentials.
- Protect ServiceAccount Tokens.
- Review ClusterRoleBindings periodically.

---

# 13. Troubleshooting

List Roles

```bash
kubectl get roles
```

List ClusterRoles

```bash
kubectl get clusterroles
```

List RoleBindings

```bash
kubectl get rolebindings
```

List ClusterRoleBindings

```bash
kubectl get clusterrolebindings
```

Check Permissions

```bash
kubectl auth can-i create deployment
```

Check User Permissions

```bash
kubectl auth can-i delete namespace
```

---

# 14. Real Production Scenarios

## Scenario 1

### Developer Deleted Production Resources

A Developer accidentally received

```
cluster-admin
```

permission.

Developer deleted a Production Namespace.

Business Impact

Major Production Outage.

Resolution

Implemented proper RBAC Roles.

---

## Scenario 2

### Forbidden Error

Developer executed

```bash
kubectl delete pod
```

Error

```
Forbidden
```

Investigation

```
kubectl auth can-i delete pod
```

Result

Permission Missing.

Resolution

Updated RoleBinding.

---

## Scenario 3

### Security Audit

Security Team discovered

```
50 Users

↓

Cluster Admin
```

Resolution

Created

- Developer Role
- QA Role
- DevOps Role
- ReadOnly Role

Security posture improved significantly.

---

# 15. Scenario Interview Questions

Q1. What is RBAC?

Answer

RBAC controls access to Kubernetes resources based on Roles and Permissions.

---

Q2. Difference between Role and ClusterRole?

Answer

Role works inside a Namespace.

ClusterRole works across the entire Cluster.

---

Q3. Difference between RoleBinding and ClusterRoleBinding?

Answer

RoleBinding assigns Roles inside a Namespace.

ClusterRoleBinding assigns ClusterRoles across the entire Cluster.

---

Q4. What is Principle of Least Privilege?

Answer

Users should receive only the permissions required to perform their job.

---

# 16. Architecture Interview Questions

Explain RBAC flow.

```
User

↓

Authentication

↓

RBAC

↓

Role

↓

Permission Check

↓

Allow

or

Deny
```

---

Q2.

Why is RBAC important?

Answer

RBAC prevents unauthorized access and reduces the impact of accidental or malicious actions.

---

# 17. Production Support Interview Questions

Production Investigation Flow

```
User Gets Forbidden

↓

kubectl auth can-i

↓

Role

↓

RoleBinding

↓

Namespace

↓

Resolved
```

Manager Question

"A Developer cannot deploy to the Development Namespace."

Expected Answer

- Verify User Identity
- Check Role
- Check RoleBinding
- Verify Namespace
- Use kubectl auth can-i
- Update Permissions if approved

---

# 18. Related Runbooks

- rbac-forbidden-error.md
- serviceaccount-access.md
- namespace-access-denied.md

---

# 19. Common Incidents

- Forbidden Error
- Missing RoleBinding
- Incorrect ClusterRole
- Excessive Permissions
- ServiceAccount Permission Failure

---

# 20. Commands

```bash
kubectl get roles

kubectl get clusterroles

kubectl get rolebindings

kubectl get clusterrolebindings

kubectl auth can-i get pods

kubectl auth can-i create deployment

kubectl describe role

kubectl describe clusterrole
```

---

# 21. YAML Deep Dive

## Role Example

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role

metadata:
  name: developer-role
  namespace: development

rules:
- apiGroups: [""]

  resources:
  - pods

  verbs:
  - get
  - list
  - watch
```

Explanation

```
kind
```

Defines this object as a Role.

```
namespace
```

Role applies only inside this Namespace.

```
resources
```

Resources this Role controls.

Example

```
pods
```

```
verbs
```

Allowed actions.

Common verbs

- get
- list
- watch
- create
- update
- patch
- delete

---

## RoleBinding Example

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding

metadata:
  name: developer-binding
  namespace: development

subjects:
- kind: User
  name: developer1

roleRef:
  kind: Role
  name: developer-role
  apiGroup: rbac.authorization.k8s.io
```

Explanation

```
subjects
```

Who receives permissions.

```
roleRef
```

Which Role is assigned.

---

# 22. Marathi Quick Revision

- RBAC म्हणजे Role-Based Access Control.
- Authentication = User कोण आहे.
- Authorization = User काय करू शकतो.
- Role Namespace साठी असतो.
- ClusterRole संपूर्ण Cluster साठी असतो.
- Least Privilege हा Production Best Practice आहे.

---

# 23. Marathi Summary (5+ Years Experience Revision)

## Interview Summary

RBAC Kubernetes मधील Authorization Mechanism आहे.

Authentication नंतर RBAC तपासतो की User ला कोणत्या Resources वर कोणती Operations करण्याची परवानगी आहे.

Role Namespace Level वर काम करतो.

ClusterRole Cluster Level वर काम करतो.

RoleBinding आणि ClusterRoleBinding त्या Permissions Users, Groups किंवा ServiceAccounts ला देतात.

## Production Investigation Flow

```
Forbidden Error

↓

Authentication

↓

kubectl auth can-i

↓

Role

↓

RoleBinding

↓

Namespace

↓

Resolved
```

## Production Story

एका Enterprise EKS Cluster मध्ये Developer ला चुकून `cluster-admin` Permission देण्यात आली.

त्याने Test Namespace Delete करण्याऐवजी Production Namespace Delete केली.

Complete Production Outage झाला.

RCA मध्ये RBAC Policy चुकीची असल्याचे आढळले.

यानंतर Least Privilege Model लागू करण्यात आला, वेगवेगळ्या Teams साठी स्वतंत्र Roles तयार करण्यात आल्या आणि Quarterly RBAC Audit सुरू करण्यात आला.

## Memory Trick

**Authentication = Who Are You?**

**Authorization = What Can You Do?**

**Role = Namespace**

**ClusterRole = Cluster**

Remember

**Login → RBAC → Permission → Allow/Deny**

