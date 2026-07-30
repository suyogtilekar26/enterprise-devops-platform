# Kubernetes Interview Master Handbook

# Section 08 - Kubernetes Security, RBAC & NetworkPolicies

# Chapter 12 - Pod Security Standards (PSS)

---

# Objective

Learn Kubernetes Pod Security Standards (PSS) from a production and interview perspective.

Understand how Kubernetes enforces security controls on Pods to reduce privilege escalation and container escape risks.

---

# Interview Scenario

Time: 10:45 AM

Security Alert

A developer deploys a Pod with

- Privileged Mode
- Host Network
- Host PID
- HostPath Volume

Security Team blocks the deployment.

You are responsible for explaining why the Pod was denied and how to deploy it securely.

---

# What are Pod Security Standards?

Pod Security Standards (PSS) define security requirements for Pods.

They help prevent workloads from running with insecure configurations.

PSS replaces the older PodSecurityPolicy (PSP).

---

# Security Levels

## Privileged

Few restrictions.

Allows highly privileged workloads.

Typical Usage

- System Components
- CNI Plugins
- Storage Drivers

---

## Baseline

Prevents known privilege escalation risks.

Allows most application workloads.

---

## Restricted

Strongest security level.

Recommended for production applications.

---

# PSS Architecture

Developer

↓

Pod Manifest

↓

API Server

↓

Pod Security Admission

↓

Validate

↓

Allow

OR

↓

Reject

---

# Pod Security Admission

Enforces Pod Security Standards using Namespace labels.

Modes

- Enforce
- Audit
- Warn

---

# Namespace Labels

```bash
kubectl label namespace production \
pod-security.kubernetes.io/enforce=restricted
```

---

Audit Mode

```bash
kubectl label namespace production \
pod-security.kubernetes.io/audit=restricted
```

---

Warn Mode

```bash
kubectl label namespace production \
pod-security.kubernetes.io/warn=restricted
```

---

# Restricted Policy Highlights

Containers should

- Run as Non-Root
- Drop Unnecessary Linux Capabilities
- Avoid Privileged Mode
- Avoid Host Network
- Avoid Host PID
- Avoid Host IPC
- Use ReadOnlyRootFilesystem when possible

---

# Production Incident

Issue

Deployment rejected.

Error

```text
violates PodSecurity "restricted"
```

Investigation

Pod manifest contained

```yaml
securityContext:
  privileged: true
```

Root Cause

Privileged container not allowed.

Resolution

Remove privileged mode.

Apply least privilege.

Redeploy application.

---

# Investigation Commands

View Namespace Labels

```bash
kubectl get namespace production --show-labels
```

---

Describe Namespace

```bash
kubectl describe namespace production
```

---

Describe Pod

```bash
kubectl describe pod app-pod
```

---

View Events

```bash
kubectl get events --sort-by=.metadata.creationTimestamp
```

---

View Pod YAML

```bash
kubectl get pod app-pod -o yaml
```

---

# Common Violations

Running as Root

Privileged Containers

HostPath Volumes

Host Network

Host PID

Host IPC

Additional Linux Capabilities

---

# Validation Checklist

Namespace Labels Correct

Restricted Policy Applied

Pod Created Successfully

Containers Running as Non-Root

No Privileged Containers

Audit Events Reviewed

---

# RCA Template

Incident

Pod Rejected

Root Cause

Violation of Restricted Pod Security Standard

Business Impact

Deployment Failed

Resolution

Updated Pod Security Context

Preventive Action

Security Review Before Deployment

---

# Interview Questions

## Q1. What replaced PodSecurityPolicy?

Answer

Pod Security Standards enforced through Pod Security Admission.

---

## Q2. Name the three Pod Security levels.

Answer

Privileged, Baseline and Restricted.

---

## Q3. Which level is recommended for production applications?

Answer

Restricted.

---

## Q4. What are the three enforcement modes?

Answer

Enforce, Audit and Warn.

---

## Q5. Why should containers avoid privileged mode?

Answer

Privileged containers have extensive access to the host and significantly increase security risk.

---

# Assignment

A team wants to deploy an application in the production namespace.

Requirements

- Non-root execution
- No privileged containers
- Restricted security policy
- Compliance with enterprise security standards

Prepare

- Security Design
- Namespace Configuration
- Validation Commands
- Recovery Plan
- Security Considerations

---

# Assignment Solution

## Step 1

Apply Restricted Pod Security Standard.

---

## Step 2

Configure Pod securityContext.

---

## Step 3

Deploy application.

---

## Step 4

Validate admission.

---

## Step 5

Review audit events.

---

## Step 6

Document security controls.

---

# Production Best Practices

✔ Use Restricted Policy for Production

✔ Run Containers as Non-Root

✔ Disable Privileged Mode

✔ Minimize Linux Capabilities

✔ Enable ReadOnlyRootFilesystem

✔ Review Namespace Labels

✔ Validate Security Before Release

✔ Monitor Admission Events

✔ Perform Regular Security Audits

✔ Follow Least Privilege

---

# Runbook Checklist

□ Namespace Configured

□ Restricted Policy Applied

□ Pod Admitted Successfully

□ No Privileged Containers

□ Non-Root Execution Verified

□ Root Cause Confirmed

□ Recovery Completed

□ Validation Successful

□ Documentation Updated

□ Security Review Completed

---

# Common Mistakes

❌ Running Containers as Root

❌ Using Privileged Mode

❌ Using HostPath Without Justification

❌ Using Host Network Unnecessarily

❌ Ignoring Admission Warnings

❌ Skipping Security Validation

❌ Not Reviewing Namespace Labels

❌ Missing Security Documentation

