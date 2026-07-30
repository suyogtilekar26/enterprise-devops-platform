# Kubernetes Interview Master Handbook

# Section 08 - Kubernetes Security, RBAC & NetworkPolicies

# Chapter 13 - Security Contexts

---

# Objective

Learn Kubernetes Security Contexts from a production and interview perspective.

Understand how Security Contexts enforce security settings for Pods and Containers to reduce attack surface and meet enterprise security requirements.

---

# Interview Scenario

Time: 02:30 PM

Security Alert

A vulnerability scanner reports

- Containers running as root
- Writable root filesystem
- Privileged containers
- Additional Linux capabilities

The security team blocks the deployment.

You are responsible for securing the application.

---

# What is a Security Context?

A Security Context defines privilege and access control settings for

- Pods
- Containers

It controls how a workload interacts with the Linux kernel.

---

# Security Context Hierarchy

Pod

↓

Pod Security Context

↓

Container

↓

Container Security Context

↓

Linux Kernel

---

# Common Security Context Settings

Run As User

Run As Group

Run As Non Root

Read Only Root Filesystem

Allow Privilege Escalation

Linux Capabilities

Seccomp Profile

SELinux Options

Filesystem Group (fsGroup)

---

# Production Security Goals

Applications should

- Run as Non-Root
- Disable Privilege Escalation
- Use ReadOnly Root Filesystem
- Drop Unnecessary Capabilities
- Use Default Seccomp Profile

---

# Example Pod Security Context

```yaml
apiVersion: v1
kind: Pod

metadata:
  name: secure-app

spec:

  securityContext:

    runAsUser: 1000

    runAsGroup: 1000

    runAsNonRoot: true

    fsGroup: 1000

  containers:

  - name: app

    image: nginx
```

---

# Example Container Security Context

```yaml
securityContext:

  allowPrivilegeEscalation: false

  readOnlyRootFilesystem: true

  capabilities:

    drop:

    - ALL

  seccompProfile:

    type: RuntimeDefault
```

---

# Important Fields

## runAsNonRoot

Forces the container to run as a non-root user.

Recommended

true

---

## runAsUser

Specifies the Linux user ID.

Example

1000

---

## allowPrivilegeEscalation

Prevents gaining additional privileges.

Recommended

false

---

## readOnlyRootFilesystem

Makes the container filesystem read-only.

Recommended

true

---

## Capabilities

Drop unnecessary Linux capabilities.

Recommended

```yaml
capabilities:

  drop:

  - ALL
```

---

## seccompProfile

Restricts Linux system calls.

Recommended

```yaml
seccompProfile:

  type: RuntimeDefault
```

---

## fsGroup

Defines group ownership for mounted volumes.

Useful for shared storage.

---

# Production Incident

Issue

Deployment blocked by security policy.

Investigation

```yaml
securityContext:

  runAsUser: 0

  privileged: true
```

Root Cause

Application running as root with privileged mode enabled.

Resolution

Configure

- runAsNonRoot
- runAsUser
- readOnlyRootFilesystem
- allowPrivilegeEscalation=false
- Drop ALL capabilities

Redeploy application.

---

# Investigation Commands

Describe Pod

```bash
kubectl describe pod app-pod
```

---

View Pod YAML

```bash
kubectl get pod app-pod -o yaml
```

---

View Events

```bash
kubectl get events --sort-by=.metadata.creationTimestamp
```

---

Check Running User

```bash
kubectl exec app-pod -- id
```

---

Check Mounted Filesystem

```bash
kubectl exec app-pod -- mount
```

---

Check Security Context

```bash
kubectl get pod app-pod -o jsonpath='{.spec.securityContext}'
```

---

# Common Problems

Running as Root

Privileged Containers

Writable Root Filesystem

Privilege Escalation Enabled

Missing Seccomp Profile

Unnecessary Linux Capabilities

---

# Validation Checklist

Running as Non-Root

Privilege Escalation Disabled

ReadOnly Root Filesystem Enabled

Capabilities Dropped

RuntimeDefault Seccomp Enabled

Application Working

Security Scan Passed

---

# RCA Template

Incident

Deployment Failed Security Validation

Root Cause

Insecure Security Context

Business Impact

Production Deployment Blocked

Resolution

Updated Security Context

Preventive Action

Security Review During CI/CD

---

# Interview Questions

## Q1. What is a Security Context?

Answer

A Security Context defines security and privilege settings for Pods and Containers.

---

## Q2. Why should containers run as non-root?

Answer

Running as a non-root user reduces the impact of a container compromise and follows the principle of least privilege.

---

## Q3. What does allowPrivilegeEscalation control?

Answer

It determines whether a process inside the container can gain more privileges than its parent process.

---

## Q4. Why use readOnlyRootFilesystem?

Answer

It prevents applications and attackers from modifying the container's root filesystem, reducing persistence opportunities.

---

## Q5. Why should Linux capabilities be dropped?

Answer

Dropping unnecessary capabilities minimizes the attack surface and limits what a compromised process can do.

---

# Assignment

Secure a production application with the following requirements

- Run as non-root
- Read-only root filesystem
- No privilege escalation
- Default seccomp profile
- Drop all Linux capabilities

Prepare

- Security Context Design

- Validation Commands

- Security Considerations

- Recovery Plan

---

# Assignment Solution

## Step 1

Configure Pod Security Context.

---

## Step 2

Configure Container Security Context.

---

## Step 3

Deploy application.

---

## Step 4

Validate runtime user.

---

## Step 5

Review security scan results.

---

## Step 6

Document security controls.

---

# Production Best Practices

✔ Run Containers as Non-Root

✔ Disable Privilege Escalation

✔ Use ReadOnly Root Filesystem

✔ Drop Linux Capabilities

✔ Use RuntimeDefault Seccomp

✔ Define fsGroup When Required

✔ Validate Security During CI/CD

✔ Perform Security Scanning

✔ Review Security Contexts Regularly

✔ Follow Least Privilege

---

# Runbook Checklist

□ Non-Root Execution Verified

□ Privilege Escalation Disabled

□ ReadOnly Filesystem Enabled

□ Capabilities Dropped

□ Seccomp Configured

□ Application Healthy

□ Root Cause Confirmed

□ Recovery Completed

□ Validation Successful

□ Documentation Updated

---

# Common Mistakes

❌ Running Containers as Root

❌ Enabling Privileged Mode

❌ Allowing Privilege Escalation

❌ Writable Root Filesystem

❌ Keeping Default Linux Capabilities

❌ Missing Seccomp Configuration

❌ Skipping Security Validation

❌ Ignoring Vulnerability Scan Findings

