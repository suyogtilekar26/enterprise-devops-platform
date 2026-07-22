# Kubernetes Service Accounts

# 1. Purpose

The purpose of Kubernetes Service Accounts is to provide an identity for Pods so they can securely communicate with the Kubernetes API Server and other Kubernetes resources.

Unlike User Accounts, which represent humans, Service Accounts represent applications running inside the cluster.

Service Accounts are one of the most important Kubernetes security concepts.

---

# 2. Introduction

Imagine our Enterprise DevOps Platform.

```
API Gateway

↓

Needs to Read ConfigMaps

↓

Kubernetes API Server
```

Without Service Account

```
Application

↓

No Identity

↓

Access Denied
```

With Service Account

```
Application

↓

Service Account

↓

RBAC Permission

↓

API Server

↓

Access Granted
```

---

# 3. Enterprise Usage

Service Accounts are used by

- CI/CD Pipelines
- Argo CD
- Prometheus
- Grafana
- Ingress Controllers
- Operators
- Kubernetes Jobs
- Monitoring Agents

Every Production Kubernetes application interacting with the API Server should use a dedicated Service Account.

---

# 4. Usage in THIS Project

Our Enterprise DevOps Platform

```
API Gateway

↓

Service Account

↓

Read ConfigMaps

------------------------

Monitoring

↓

Service Account

↓

Read Metrics

------------------------

Argo CD

↓

Service Account

↓

Deploy Applications
```

Each application will have its own Service Account with minimum required permissions.

---

# 5. Architecture

```
                Pod

                 │

                 ▼

         Service Account

                 │

                 ▼

             API Token

                 │

                 ▼

              API Server

                 │

                 ▼

                RBAC

                 │

          Allow / Deny
```

---

# 6. Internal Workflow

```
Pod Created

↓

Service Account Attached

↓

Token Mounted

↓

Application Calls API

↓

RBAC Check

↓

Permission Exists?

↓

YES

↓

Request Allowed

------------------------

NO

↓

Forbidden
```

---

# 7. What is a Service Account?

A Service Account is a Kubernetes object that provides an identity for Pods.

Example

```
API Gateway

↓

Service Account

↓

Read ConfigMaps
```

Unlike User Accounts,

Service Accounts are designed for applications.

---

# 8. Default Service Account

Every Namespace automatically contains

```
default
```

Service Account.

If a Pod does not specify one,

Kubernetes automatically assigns

```
default
```

Best Practice

Never use the default Service Account in Production.

Create dedicated Service Accounts for every application.

---

# 9. Service Account vs User Account

User Account

```
Human

↓

kubectl

↓

Developer
```

Service Account

```
Application

↓

Pod

↓

API Access
```

Simple Rule

```
Human

↓

User Account

-------------------

Application

↓

Service Account
```

---

# 10. Daily DevOps Activities

- Create Service Accounts
- Assign RBAC Roles
- Review API Permissions
- Rotate Credentials if required
- Audit Service Accounts
- Remove Unused Accounts

---

# 11. Production Best Practices

- One Service Account per application.
- Follow Least Privilege.
- Avoid using the default Service Account.
- Regularly audit RBAC permissions.
- Disable automatic token mounting if not required.
- Review Service Account usage periodically.

---

# 12. Security

- Apply Principle of Least Privilege.
- Never grant cluster-admin unnecessarily.
- Protect Service Account Tokens.
- Enable Audit Logs.
- Review ClusterRoleBindings.
- Restrict API access.

---

# 13. Troubleshooting

List Service Accounts

```bash
kubectl get serviceaccounts
```

Describe Service Account

```bash
kubectl describe serviceaccount <service-account-name>
```

Describe Pod

```bash
kubectl describe pod <pod-name>
```

Check RBAC

```bash
kubectl auth can-i get pods
```

View Events

```bash
kubectl get events
```

---

# 14. Real Production Scenarios

## Scenario 1

### Application Cannot Read ConfigMap

Application failed with

```
Forbidden
```

Investigation

```
Service Account

↓

RBAC

↓

RoleBinding
```

Root Cause

Missing RoleBinding.

Resolution

Assigned correct Role.

---

## Scenario 2

### Monitoring Failed

Prometheus could not read Nodes.

Reason

Missing ClusterRole.

Resolution

Assigned ReadOnly ClusterRole.

Monitoring restored.

---

## Scenario 3

### Security Audit

Audit discovered

```
Default Service Account

↓

Cluster Admin
```

Critical Security Issue.

Resolution

Created dedicated Service Accounts.

Applied Least Privilege RBAC.

---

# 15. Scenario Interview Questions

Q1. What is a Service Account?

Answer

A Service Account provides an identity for Pods so they can securely access Kubernetes resources.

---

Q2. Difference between User Account and Service Account?

Answer

User Accounts represent humans.

Service Accounts represent applications running inside Kubernetes Pods.

---

Q3. Why should we avoid the default Service Account?

Answer

Because it often receives unnecessary permissions and increases security risk.

Dedicated Service Accounts are recommended.

---

Q4. Can Service Accounts work without RBAC?

Answer

Yes, but RBAC determines what permissions the Service Account actually has.

---

# 16. Architecture Interview Questions

Explain the complete flow.

```
Pod

↓

Service Account

↓

API Token

↓

API Server

↓

RBAC

↓

Allow / Deny
```

---

Q2.

Why does every application require a separate Service Account?

Answer

To isolate permissions, improve security and follow the Principle of Least Privilege.

---

# 17. Production Support Interview Questions

Production Investigation Flow

```
Application

↓

Forbidden

↓

Service Account

↓

Role

↓

RoleBinding

↓

kubectl auth can-i

↓

Resolved
```

Manager Question

"Our monitoring application suddenly cannot read Kubernetes Nodes."

Expected Answer

- Verify Service Account
- Check ClusterRole
- Verify ClusterRoleBinding
- Check RBAC
- Test Permissions
- Restore Access

---

# 18. Related Runbooks

- serviceaccount-forbidden.md
- serviceaccount-token.md
- rbac-access-denied.md

---

# 19. Common Incidents

- Forbidden Error
- Missing RoleBinding
- Incorrect ClusterRole
- Default Service Account Misuse
- API Access Denied

---

# 20. Commands

```bash
kubectl get serviceaccounts

kubectl describe serviceaccount <service-account-name>

kubectl get rolebindings

kubectl get clusterrolebindings

kubectl auth can-i get pods

kubectl describe pod <pod-name>
```

---

# 21. YAML Deep Dive

## Service Account Example

```yaml
apiVersion: v1
kind: ServiceAccount

metadata:
  name: api-gateway-sa
  namespace: production
```

Explanation

```
kind
```

Creates a Service Account.

```
metadata
```

Defines object information.

```
name
```

Service Account name.

```
namespace
```

Namespace where the Service Account exists.

---

## Pod Using Service Account

```yaml
spec:
  serviceAccountName: api-gateway-sa
```

Explanation

```
serviceAccountName
```

Specifies which Service Account the Pod should use.

When the Pod starts,

Kubernetes automatically associates this identity with the Pod.

---

# 22. Marathi Quick Revision

- Service Account म्हणजे Pod ची Identity.
- User Account मानवासाठी असतो.
- Service Account Application साठी असतो.
- API Server Access साठी वापरतात.
- प्रत्येक Application साठी वेगळा Service Account वापरणे ही Best Practice आहे.

---

# 23. Marathi Summary (5+ Years Experience Revision)

## Interview Summary

Service Account Kubernetes मध्ये Pods ची Identity असते.

जेव्हा Application ला Kubernetes API Server शी संवाद साधायचा असतो, तेव्हा Service Account वापरला जातो.

RBAC ठरवते की त्या Service Account ला कोणत्या Resources वर कोणती Permissions आहेत.

## Production Investigation Flow

```
Application Error

↓

Forbidden

↓

Service Account

↓

Role

↓

RoleBinding

↓

kubectl auth can-i

↓

Resolved
```

## Production Story

Production मध्ये Prometheus ला अचानक Cluster Metrics मिळणे बंद झाले.

Logs मध्ये `Forbidden` Error दिसत होती.

Investigation मध्ये Prometheus च्या Service Account ची ClusterRoleBinding चुकीने Delete झाल्याचे आढळले.

ClusterRoleBinding पुन्हा तयार केल्यानंतर Monitoring पुन्हा सुरू झाले.

## Memory Trick

**User Account = Human**

**Service Account = Pod Identity**

Remember

**Pod → Service Account → RBAC → API Server**

