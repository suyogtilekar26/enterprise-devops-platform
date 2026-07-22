# Kubernetes Security Context

# 1. Purpose

The purpose of Security Context is to define the security settings for Pods and Containers.

It controls

- User Identity
- Group Identity
- File Permissions
- Linux Capabilities
- Privilege Escalation
- Read-only Filesystem

Security Context is one of the most important Kubernetes Production Security features.

---

# 2. Introduction

Imagine a Developer deploys an application.

Without Security Context

```
Container

↓

Runs as Root

↓

Can Modify Files

↓

Can Escalate Privileges

↓

High Security Risk
```

With Security Context

```
Container

↓

Non-Root User

↓

Read Only Filesystem

↓

Privilege Escalation Disabled

↓

Production Secure
```

---

# 3. Enterprise Usage

Security Context is implemented in

- Banking
- Healthcare
- Government
- Insurance
- SaaS
- Retail
- FinTech

Every Production Deployment should define an appropriate Security Context.

---

# 4. Usage in THIS Project

Enterprise DevOps Platform

```
Frontend

↓

Run As Non-Root

------------------------

API Gateway

↓

Read Only Filesystem

------------------------

Auth Service

↓

Drop Linux Capabilities

------------------------

Dashboard Service

↓

Disable Privilege Escalation
```

Every backend Deployment will include a Security Context.

---

# 5. Architecture

```
Developer

↓

Deployment YAML

↓

Security Context

↓

API Server

↓

Admission Validation

↓

Scheduler

↓

Secure Pod
```

---

# 6. Internal Workflow

```
Deployment

↓

Security Context

↓

API Validation

↓

Pod Security Standards

↓

Approved?

↓

YES

↓

Container Starts

-----------------------

NO

↓

Deployment Rejected
```

---

# 7. Pod Security Context vs Container Security Context

Pod Security Context

```
Applies To

Entire Pod
```

Examples

- fsGroup
- runAsUser
- runAsGroup

---

Container Security Context

```
Applies

Single Container
```

Examples

- privileged
- capabilities
- readOnlyRootFilesystem

---

# 8. Important Security Context Parameters

## runAsNonRoot

```
true
```

Container must not run as Root.

---

## runAsUser

Example

```
1000
```

Linux User ID used inside container.

---

## runAsGroup

Defines Linux Group ID.

---

## fsGroup

Defines filesystem ownership.

Useful for

- Persistent Volumes
- Shared Storage

---

## allowPrivilegeEscalation

```
false
```

Disables privilege escalation.

---

## privileged

```
false
```

Container cannot access host-level privileges.

---

## readOnlyRootFilesystem

```
true
```

Application cannot modify root filesystem.

---

## capabilities

Drop unnecessary Linux capabilities.

Example

```
ALL
```

---

# 9. Why Security Context?

Without Security Context

```
Container

↓

Root Access

↓

Node Compromise

↓

Cluster Risk
```

With Security Context

```
Restricted Container

↓

Least Privilege

↓

Production Secure
```

---

# 10. Daily DevOps Activities

- Review Security Context
- Validate Deployments
- Audit Production YAML
- Review Linux Capabilities
- Verify Non-Root Execution
- Monitor Security Alerts

---

# 11. Production Best Practices

- Always use runAsNonRoot.
- Disable Privilege Escalation.
- Use ReadOnly Root Filesystem.
- Drop unnecessary Linux Capabilities.
- Avoid Privileged Containers.
- Test Security Context before Production.

---

# 12. Security

- Principle of Least Privilege
- Zero Trust
- Restrict Root Access
- Restrict Host Access
- Audit Security Settings
- Review Image Security

---

# 13. Troubleshooting

Describe Pod

```bash
kubectl describe pod <pod-name>
```

View YAML

```bash
kubectl get pod <pod-name> -o yaml
```

View Events

```bash
kubectl get events
```

Describe Deployment

```bash
kubectl describe deployment <deployment-name>
```

---

# 14. Real Production Scenarios

## Scenario 1

### Root User Rejected

Application

```
runAsUser

0
```

Deployment failed.

Reason

Production Security Policy.

Resolution

Configured

```
runAsNonRoot: true
```

---

## Scenario 2

### Privileged Container

Developer enabled

```
privileged: true
```

Admission Controller rejected Deployment.

Resolution

Removed privileged mode.

---

## Scenario 3

### Read Only Filesystem

Application attempted

```
Write

/tmp/config.txt
```

Container failed.

Root Cause

Application incorrectly assumed writable root filesystem.

Resolution

Mount EmptyDir Volume.

---

# 15. Scenario Interview Questions

Q1. What is Security Context?

Answer

Security Context defines security settings for Pods and Containers.

---

Q2. Why use runAsNonRoot?

Answer

To prevent applications from running as Linux Root User.

---

Q3. What does allowPrivilegeEscalation do?

Answer

It prevents processes inside the container from gaining additional privileges.

---

Q4. Why use readOnlyRootFilesystem?

Answer

To prevent unauthorized modifications inside the container.

---

# 16. Architecture Interview Questions

Explain Security Context flow.

```
Deployment

↓

Security Context

↓

Validation

↓

Pod

↓

Container
```

---

Q2.

Why should privileged containers be avoided?

Answer

Because they gain host-level access and significantly increase security risks.

---

# 17. Production Support Interview Questions

Production Investigation Flow

```
Deployment Failed

↓

Events

↓

Security Context

↓

Admission Validation

↓

Security Policy

↓

Resolved
```

Manager Question

"Our deployment succeeds in Dev but fails in Production."

Expected Answer

- Review Security Context
- Verify Pod Security Standards
- Check Events
- Review Privileged Mode
- Verify runAsNonRoot
- Redeploy

---

# 18. Related Runbooks

- security-context-validation.md
- privileged-container.md
- root-user-blocked.md

---

# 19. Common Incidents

- Root User Blocked
- Privileged Container Rejected
- Read Only Filesystem Error
- Privilege Escalation Denied
- Missing fsGroup

---

# 20. Commands

```bash
kubectl describe pod <pod-name>

kubectl get pod <pod-name> -o yaml

kubectl describe deployment <deployment-name>

kubectl get events

kubectl explain pod.spec.securityContext
```

---

# 21. YAML Deep Dive

Example

```yaml
spec:
  securityContext:
    runAsNonRoot: true
    runAsUser: 1000
    runAsGroup: 1000
    fsGroup: 1000

  containers:
  - name: api-gateway

    securityContext:
      allowPrivilegeEscalation: false
      privileged: false
      readOnlyRootFilesystem: true

      capabilities:
        drop:
        - ALL
```

Explanation

```
securityContext
```

Defines security settings.

```
runAsNonRoot
```

Container must not run as root.

```
runAsUser
```

Linux User ID.

```
runAsGroup
```

Linux Group ID.

```
fsGroup
```

Shared Volume ownership.

```
allowPrivilegeEscalation
```

Disables privilege escalation.

```
privileged
```

Prevents privileged container execution.

```
readOnlyRootFilesystem
```

Makes root filesystem read-only.

```
capabilities
```

Drops unnecessary Linux capabilities.

---

# 22. Marathi Quick Revision

- Security Context म्हणजे Pod आणि Container ची Security Settings.
- runAsNonRoot = Root User वापरू नका.
- readOnlyRootFilesystem = Root Files बदलता येत नाहीत.
- privileged=false = Host Access नाही.
- allowPrivilegeEscalation=false = अतिरिक्त Privileges मिळणार नाहीत.

---

# 23. Marathi Summary (5+ Years Experience Revision)

## Interview Summary

Security Context Kubernetes मधील Container Security Configuration आहे.

Production मध्ये प्रत्येक Deployment साठी Security Context असणे आवश्यक आहे.

यामध्ये Non-Root Execution, Read Only Filesystem, Linux Capabilities आणि Privilege Escalation सारख्या Settings नियंत्रित केल्या जातात.

## Production Investigation Flow

```
Deployment Failed

↓

Events

↓

Security Context

↓

Admission Validation

↓

Security Policy

↓

Resolved
```

## Production Story

Production EKS Cluster मध्ये Security Scan दरम्यान API Gateway Container Root User म्हणून चालत असल्याचे आढळले.

Security Team ने Critical Finding Raise केली.

Deployment मध्ये Security Context अपडेट करून `runAsNonRoot: true`, `allowPrivilegeEscalation: false`, `readOnlyRootFilesystem: true` आणि `capabilities: drop: ALL` लागू करण्यात आले.

पुढील Security Audit कोणत्याही Findings शिवाय पूर्ण झाला.

## Memory Trick

**Security Context = Container Security**

Remember

**Non-Root**

↓

**No Privilege Escalation**

↓

**Read Only Filesystem**

↓

**Drop Capabilities**

↓

**Production Secure**

