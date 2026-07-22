# Kubernetes Pod Security Standards (PSS)

# 1. Purpose

The purpose of Pod Security Standards (PSS) is to enforce security best practices for Pods before they are deployed.

PSS helps protect Kubernetes clusters by preventing insecure Pod configurations.

It reduces the attack surface and ensures workloads follow enterprise security policies.

---

# 2. Introduction

Imagine a Developer deploys the following Pod.

```
Pod

↓

Runs as Root

↓

Privileged Container

↓

Host Network Enabled

↓

Host Filesystem Mounted
```

This Pod has unrestricted access to the Kubernetes Node.

Without security controls

```
Compromised Container

↓

Access Worker Node

↓

Access Other Pods

↓

Production Security Breach
```

Pod Security Standards prevent such insecure deployments.

---

# 3. Enterprise Usage

Pod Security Standards are widely used in

- AWS EKS
- Azure AKS
- Google GKE
- OpenShift

Industries

- Banking
- Healthcare
- Government
- Insurance
- FinTech
- E-Commerce

Security teams use PSS to enforce secure Pod configurations.

---

# 4. Usage in THIS Project

Our Enterprise DevOps Platform

```
Frontend

↓

Run as Non-Root

-------------------------

API Gateway

↓

Read Only Filesystem

-------------------------

Auth Service

↓

No Privileged Mode

-------------------------

Dashboard Service

↓

Drop Linux Capabilities
```

Every Production workload will follow Pod Security Standards.

---

# 5. Architecture

```
Developer

↓

kubectl apply

↓

Authentication

↓

RBAC

↓

Admission Controller

↓

Pod Security Standards

↓

Approved?

↓

YES

↓

Pod Created

-------------------------

NO

↓

Rejected
```

---

# 6. Internal Workflow

```
Deployment Request

↓

API Server

↓

Authentication

↓

Authorization

↓

Pod Security Validation

↓

Policy Satisfied?

↓

YES

↓

Store in etcd

↓

Scheduler

↓

Pod Running

------------------------

NO

↓

Reject Deployment
```

---

# 7. Pod Security Levels

Kubernetes defines three security levels.

```
Privileged

↓

Baseline

↓

Restricted
```

---

## Privileged

Provides minimal restrictions.

Suitable only for

- Infrastructure Components
- CNI Plugins
- Storage Drivers

Not recommended for normal applications.

---

## Baseline

Blocks known privilege escalation techniques.

Allows most standard applications.

Enterprise Development environments commonly use this level.

---

## Restricted

Highest security level.

Requires

- Non-root containers
- Read-only filesystem where applicable
- No privileged containers
- Restricted capabilities
- Secure Security Context

Production workloads should aim for Restricted.

---

# 8. Common Security Checks

Examples

```
Run As Root

↓

Blocked

-------------------------

Privileged Container

↓

Blocked

-------------------------

Host PID

↓

Blocked

-------------------------

Host Network

↓

Blocked

-------------------------

HostPath Volume

↓

Restricted
```

---

# 9. Why Pod Security Standards?

Without PSS

```
Developer

↓

Privileged Pod

↓

Node Compromise

↓

Cluster Compromise
```

With PSS

```
Developer

↓

Security Validation

↓

Reject Deployment

↓

Cluster Protected
```

---

# 10. Daily DevOps Activities

- Review Security Context
- Verify Namespace Security Level
- Investigate Rejected Pods
- Monitor Audit Logs
- Review Security Policies
- Validate Production Deployments

---

# 11. Production Best Practices

- Use Restricted profile for Production.
- Run containers as non-root.
- Disable privileged containers.
- Drop unnecessary Linux capabilities.
- Use read-only root filesystem where possible.
- Avoid HostPath volumes.

---

# 12. Security

- Follow Zero Trust principles.
- Prevent privilege escalation.
- Enable Audit Logs.
- Protect Node filesystem.
- Restrict Linux capabilities.
- Review security policies regularly.

---

# 13. Troubleshooting

View Events

```bash
kubectl get events
```

Describe Pod

```bash
kubectl describe pod <pod-name>
```

Describe Namespace

```bash
kubectl describe namespace <namespace>
```

Review Security Context

```bash
kubectl get pod <pod-name> -o yaml
```

---

# 14. Real Production Scenarios

## Scenario 1

### Privileged Container Blocked

Developer deployed

```
privileged: true
```

Admission Controller rejected the Pod.

Root Cause

Production namespace enforced Restricted Pod Security Standards.

Resolution

Removed privileged mode.

Deployment succeeded.

---

## Scenario 2

### Root User

Application started with

```
runAsUser: 0
```

Deployment rejected.

Resolution

Configured

```
runAsNonRoot: true
```

Application deployed successfully.

---

## Scenario 3

### HostPath Volume

Developer mounted

```
/etc

↓

HostPath
```

Security policy rejected the deployment.

Reason

Direct access to Node filesystem was prohibited.

---

# 15. Scenario Interview Questions

Q1. What are Pod Security Standards?

Answer

Pod Security Standards define security requirements that Pods must satisfy before deployment.

---

Q2. Name the three Pod Security Standards.

Answer

- Privileged
- Baseline
- Restricted

---

Q3. Which level is recommended for Production?

Answer

Restricted.

---

Q4. Why should containers avoid running as root?

Answer

Running as root increases the impact of container compromise and violates the Principle of Least Privilege.

---

# 16. Architecture Interview Questions

Explain the request flow.

```
Developer

↓

RBAC

↓

Admission

↓

Pod Security Validation

↓

Allow

or

Reject
```

---

Q2.

What security controls are enforced by PSS?

Answer

Examples include

- Non-root execution
- No privileged containers
- Restricted capabilities
- Secure Security Context
- Host access restrictions

---

# 17. Production Support Interview Questions

Production Investigation Flow

```
Deployment Failed

↓

Events

↓

Pod Security Error

↓

Security Context

↓

Namespace Policy

↓

Update YAML

↓

Redeploy
```

Manager Question

"Our application deploys successfully in Development but fails in Production."

Expected Answer

- Check Namespace Pod Security Level
- Review Security Context
- Verify privileged mode
- Verify runAsNonRoot
- Review Events
- Update Deployment Manifest

---

# 18. Related Runbooks

- pod-security-violation.md
- privileged-container.md
- security-context-failure.md

---

# 19. Common Incidents

- Privileged Container Rejected
- Root User Blocked
- HostPath Denied
- Security Context Missing
- Namespace Security Policy Failure

---

# 20. Commands

```bash
kubectl get events

kubectl describe pod <pod-name>

kubectl describe namespace

kubectl get pod <pod-name> -o yaml

kubectl explain pod.spec.securityContext
```

---

# 21. YAML Deep Dive

Example

```yaml
securityContext:
  runAsNonRoot: true
  runAsUser: 1000
  allowPrivilegeEscalation: false
  readOnlyRootFilesystem: true
```

Explanation

```
securityContext
```

Defines container security settings.

```
runAsNonRoot
```

Ensures the container does not run as the root user.

```
runAsUser
```

Specifies the Linux user ID.

```
allowPrivilegeEscalation
```

Prevents privilege escalation inside the container.

```
readOnlyRootFilesystem
```

Mounts the container root filesystem as read-only where applicable.

---

# 22. Marathi Quick Revision

- Pod Security Standards म्हणजे Pod Security Rules.
- Production मध्ये Restricted Profile सर्वोत्तम.
- Root User टाळा.
- Privileged Containers टाळा.
- Security Context योग्य प्रकारे कॉन्फिगर करा.

---

# 23. Marathi Summary (5+ Years Experience Revision)

## Interview Summary

Pod Security Standards Kubernetes मधील Workload Security Framework आहे.

हे Pods सुरक्षित पद्धतीने चालत आहेत का ते तपासते.

Production मध्ये Restricted Profile वापरून Root Access, Privileged Containers आणि Host Access मर्यादित केला जातो.

## Production Investigation Flow

```
Deployment Failed

↓

Events

↓

Pod Security Policy

↓

Security Context

↓

Namespace

↓

Update YAML

↓

Resolved
```

## Production Story

एका Production EKS Cluster मध्ये Developer ने `privileged: true` असलेला Pod Deploy करण्याचा प्रयत्न केला.

Production Namespace मध्ये Restricted Pod Security Standard लागू होता.

Admission Validation मुळे Deployment Reject झाले.

Security Team ने Security Context अपडेट करून Privileged Mode काढला.

यानंतर Deployment यशस्वी झाले आणि Cluster Security कायम राहिली.

## Memory Trick

**Privileged = Least Secure**

**Baseline = Standard Security**

**Restricted = Production Security**

Remember

**Production = Restricted**

