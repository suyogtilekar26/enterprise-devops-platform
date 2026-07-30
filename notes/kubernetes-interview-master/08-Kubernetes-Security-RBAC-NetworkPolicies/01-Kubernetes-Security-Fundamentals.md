# Kubernetes Interview Master Handbook

# Section 08 - Kubernetes Security, RBAC & NetworkPolicies

# Chapter 01 - Kubernetes Security Fundamentals

---

# Objective

Understand Kubernetes security from a production and interview perspective.

Learn how enterprise organizations secure Kubernetes clusters using defense-in-depth principles.

---

# Interview Scenario

Time: 11:40 AM

Security Team Alert

A developer accidentally deployed a Pod with cluster-admin privileges.

Impact

- Full cluster access exposed.
- Secrets could be accessed.
- Compliance violation detected.

You are the Platform Engineer responsible for securing the cluster.

---

# What is Kubernetes Security?

Kubernetes Security is the process of protecting

- Cluster
- Control Plane
- Worker Nodes
- Containers
- Images
- Applications
- Secrets
- Networking
- Users

from unauthorized access and attacks.

---

# Kubernetes Security Layers

Cloud Infrastructure

↓

Operating System

↓

Container Runtime

↓

Kubernetes Control Plane

↓

Authentication

↓

Authorization

↓

Admission Controllers

↓

RBAC

↓

Network Policies

↓

Secrets

↓

Applications

---

# CIA Principles

## Confidentiality

Protect sensitive information.

Examples

- Secrets
- Tokens
- Certificates

---

## Integrity

Prevent unauthorized modifications.

Examples

- RBAC
- Admission Controllers
- Image Signing

---

## Availability

Ensure production workloads remain accessible.

Examples

- High Availability
- Backups
- Disaster Recovery

---

# Authentication

Determines

"Who are you?"

Examples

- Certificates
- OIDC
- IAM
- Service Accounts

---

# Authorization

Determines

"What are you allowed to do?"

Implemented using

- RBAC
- ABAC (legacy)
- Webhooks

---

# Admission Controllers

Validate or mutate requests before they are persisted.

Examples

- NamespaceLifecycle
- LimitRanger
- ResourceQuota
- PodSecurity

---

# Principle of Least Privilege

Grant only the minimum permissions required.

Never assign

cluster-admin

unless absolutely necessary.

---

# Production Security Checklist

□ Enable RBAC

□ Disable Anonymous Access

□ Rotate Certificates

□ Scan Container Images

□ Encrypt Secrets at Rest

□ Restrict Privileged Containers

□ Enable Audit Logging

□ Use Network Policies

□ Patch Kubernetes Regularly

□ Monitor Security Events

---

# Production Incident

Issue

Developer gains excessive permissions using a ServiceAccount bound to cluster-admin.

Root Cause

Incorrect ClusterRoleBinding.

Resolution

Remove excessive permissions.

Create least-privilege Role and RoleBinding.

Audit all ServiceAccounts.

---

# Investigation Commands

Check Service Accounts

```bash
kubectl get serviceaccounts -A
```

---

Check Roles

```bash
kubectl get roles -A
```

---

Check ClusterRoles

```bash
kubectl get clusterroles
```

---

Check RoleBindings

```bash
kubectl get rolebindings -A
```

---

Check ClusterRoleBindings

```bash
kubectl get clusterrolebindings
```

---

# Interview Questions

## Q1. What are the three pillars of Kubernetes security?

Answer

Authentication, Authorization and Admission Control.

---

## Q2. What is the Principle of Least Privilege?

Answer

Users and workloads should receive only the minimum permissions required to perform their tasks.

---

## Q3. Why is RBAC important?

Answer

RBAC restricts access to Kubernetes resources based on roles, reducing the attack surface and preventing unauthorized actions.

---

## Q4. Why should cluster-admin be avoided?

Answer

It provides unrestricted access to the cluster and significantly increases security risk if misused.

---

## Q5. Name five production Kubernetes security controls.

Answer

RBAC, Network Policies, Secret Encryption, Image Scanning and Audit Logging.

---

# Assignment

Prepare a Kubernetes security hardening plan covering

- Authentication
- Authorization
- Secrets
- Networking
- Containers
- Cluster Access
- Monitoring
- Incident Response

---

# Assignment Solution

## Step 1

Enable strong authentication.

---

## Step 2

Implement RBAC with least privilege.

---

## Step 3

Secure Secrets.

---

## Step 4

Restrict network communication.

---

## Step 5

Continuously monitor and audit the cluster.

---

# Production Best Practices

✔ Follow Zero Trust Principles

✔ Enforce Least Privilege

✔ Scan Images Before Deployment

✔ Rotate Credentials Regularly

✔ Encrypt Sensitive Data

✔ Enable Audit Logs

✔ Restrict Privileged Containers

✔ Use Policy Enforcement

✔ Review RBAC Periodically

✔ Conduct Security Assessments

---

# Runbook Checklist

□ Authentication Verified

□ RBAC Reviewed

□ Secrets Protected

□ Network Policies Enabled

□ Audit Logs Enabled

□ Images Scanned

□ Security Monitoring Active

□ Compliance Validated

□ Documentation Updated

□ Security Review Completed

---

# Common Mistakes

❌ Granting cluster-admin to Developers

❌ Storing Secrets in Plain Text

❌ Running Privileged Containers

❌ Ignoring Image Vulnerabilities

❌ Disabling Audit Logs

❌ Overly Permissive RBAC

❌ Missing Network Policies

❌ Never Reviewing Access Permissions

