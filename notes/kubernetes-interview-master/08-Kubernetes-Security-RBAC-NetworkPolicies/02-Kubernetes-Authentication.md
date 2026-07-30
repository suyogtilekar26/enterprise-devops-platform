# Kubernetes Interview Master Handbook

# Section 08 - Kubernetes Security, RBAC & NetworkPolicies

# Chapter 02 - Kubernetes Authentication

---

# Objective

Learn Kubernetes Authentication from a production and interview perspective.

Understand how users, applications and components prove their identity before accessing the Kubernetes API Server.

---

# Interview Scenario

Time: 09:30 AM

Security Alert

Multiple developers suddenly receive

```text
Unauthorized
```

when executing kubectl commands.

Production deployments are blocked.

You are the Platform Engineer responsible for restoring authentication.

---

# What is Authentication?

Authentication answers the question

"Who are you?"

Before allowing any request, the Kubernetes API Server verifies the identity of the requester.

Authentication happens before Authorization (RBAC).

---

# Authentication Workflow

User

↓

kubectl

↓

API Server

↓

Authentication

↓

Identity Verified

↓

Authorization (RBAC)

↓

Admission Controllers

↓

API Request Executed

---

# Authentication Methods

## Client Certificates

Most common for cluster administrators.

Example

```bash
kubectl config view
```

Certificate stored in kubeconfig.

---

## Service Accounts

Used by

- Pods
- Controllers
- Applications

Each Pod receives a ServiceAccount token unless configured otherwise.

---

## OpenID Connect (OIDC)

Enterprise Identity Providers

Examples

- Azure AD
- Okta
- Google
- Keycloak

---

## IAM Authentication

Cloud Providers

Examples

- Amazon EKS IAM
- Azure AKS Entra ID
- Google GKE IAM

---

## Webhook Authentication

External authentication systems validate requests.

---

# kubeconfig

Stores

- Cluster
- User
- Certificate
- Token
- Context

View configuration

```bash
kubectl config view
```

Current context

```bash
kubectl config current-context
```

Available contexts

```bash
kubectl config get-contexts
```

---

# Service Accounts

View Service Accounts

```bash
kubectl get serviceaccounts -A
```

Describe

```bash
kubectl describe serviceaccount default
```

---

# Authentication Failure Symptoms

Unauthorized

Forbidden

Certificate Expired

Token Expired

Invalid Context

Invalid kubeconfig

IAM Failure

OIDC Failure

---

# Production Investigation

## Step 1

Verify kubeconfig

```bash
kubectl config current-context
```

---

## Step 2

Verify API Access

```bash
kubectl cluster-info
```

---

## Step 3

Check Authentication

```bash
kubectl auth whoami
```

---

## Step 4

Verify Certificates

```bash
kubeadm certs check-expiration
```

---

## Step 5

Verify Service Accounts

```bash
kubectl get serviceaccounts -A
```

---

## Step 6

Verify Context

```bash
kubectl config get-contexts
```

---

# Production Incident

Issue

Platform team cannot deploy applications.

Error

```text
Unauthorized
```

Investigation

Current context incorrect.

Engineer connected to old cluster.

Root Cause

Wrong kubeconfig context.

Resolution

Switch context.

```bash
kubectl config use-context production
```

Deployment successful.

---

# Common Authentication Errors

Unauthorized

Meaning

Identity could not be verified.

---

Forbidden

Meaning

Identity verified but insufficient permissions.

---

Certificate Expired

Meaning

Client certificate no longer valid.

---

Invalid Token

Meaning

Expired or incorrect ServiceAccount token.

---

# Investigation Commands

Current Context

```bash
kubectl config current-context
```

---

All Contexts

```bash
kubectl config get-contexts
```

---

View Config

```bash
kubectl config view
```

---

Authentication Check

```bash
kubectl auth whoami
```

---

Cluster Info

```bash
kubectl cluster-info
```

---

Certificates

```bash
kubeadm certs check-expiration
```

---

# Validation Checklist

Correct Context

Authentication Successful

API Server Reachable

Certificates Valid

Service Accounts Healthy

Applications Deploy Successfully

---

# RCA Template

Incident

Authentication Failure

Root Cause

Incorrect kubeconfig Context

Business Impact

Production Deployments Blocked

Resolution

Switched Context

Preventive Action

Context Validation Before Deployment

---

# Interview Questions

## Q1. What is Authentication?

Answer

Authentication verifies the identity of the user, application or service before allowing access to the Kubernetes API Server.

---

## Q2. What comes after Authentication?

Answer

Authorization using RBAC.

---

## Q3. What is stored inside kubeconfig?

Answer

Cluster information, users, credentials and contexts.

---

## Q4. Difference between Unauthorized and Forbidden?

Answer

Unauthorized means identity verification failed.

Forbidden means authentication succeeded but authorization denied access.

---

## Q5. Name common Kubernetes authentication methods.

Answer

Client Certificates, Service Accounts, OIDC, IAM and Webhook Authentication.

---

# Assignment

Investigate a production authentication failure where developers receive

```text
Unauthorized
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

Verify kubeconfig.

---

## Step 2

Verify current context.

---

## Step 3

Verify authentication.

---

## Step 4

Check certificates or tokens.

---

## Step 5

Restore correct authentication.

---

## Step 6

Validate API access.

---

## Step 7

Complete RCA.

---

# Production Best Practices

✔ Use Enterprise Identity Providers

✔ Rotate Certificates Regularly

✔ Use Short-Lived Tokens

✔ Secure kubeconfig Files

✔ Disable Anonymous Access

✔ Use MFA Where Supported

✔ Audit Authentication Logs

✔ Regularly Review Contexts

✔ Use Dedicated Service Accounts

✔ Monitor Authentication Failures

---

# Runbook Checklist

□ kubeconfig Verified

□ Current Context Verified

□ Authentication Successful

□ Certificates Valid

□ Tokens Valid

□ API Server Reachable

□ Root Cause Confirmed

□ Recovery Completed

□ Validation Successful

□ RCA Completed

---

# Common Mistakes

❌ Sharing kubeconfig Files

❌ Using cluster-admin for Daily Work

❌ Ignoring Certificate Expiry

❌ Using Default Service Accounts

❌ Hardcoding Tokens

❌ Not Rotating Credentials

❌ Ignoring Authentication Logs

❌ Skipping Validation

