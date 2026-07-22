# Kubernetes Pods

# 1. Purpose

The purpose of this document is to understand Pods, the smallest deployable unit in Kubernetes.

Applications are never deployed directly as Containers.

Applications are always deployed inside Pods.

---

# 2. Introduction

A Pod is the smallest object that Kubernetes can create and manage.

A Pod contains

- One or More Containers
- Network
- Storage
- Metadata

Most production Pods contain only one application container.

---

# 3. Enterprise Usage

Every application runs inside Pods.

Examples

- React Frontend Pod
- API Gateway Pod
- Authentication Pod
- Dashboard Pod
- Database Pod
- Redis Pod

Large Production Clusters may run thousands of Pods.

---

# 4. Usage in THIS Project

```
Kind Cluster

↓

Frontend Pod

↓

API Gateway Pod

↓

Auth Pod

↓

Dashboard Pod

↓

Users
```

Later

```
Amazon EKS

↓

Frontend Pod

↓

API Gateway Pod

↓

Auth Pod

↓

Dashboard Pod
```

---

# 5. Architecture

```
               Worker Node

------------------------------------------------

             Frontend Pod

+--------------------------------------------+

Frontend Container

Volumes

Pod IP

Shared Network

+--------------------------------------------+

------------------------------------------------

             API Gateway Pod

+--------------------------------------------+

API Container

Volumes

Pod IP

Shared Network

+--------------------------------------------+
```

---

# 6. Internal Workflow

```
Developer

↓

Deployment

↓

Scheduler

↓

Worker Node

↓

kubelet

↓

Pod Created

↓

Container Started

↓

Application Running
```

---

# 7. Pod Components

Every Pod contains

- Container
- Network Namespace
- Storage
- IP Address
- Metadata

Important

Every Pod gets its own IP Address.

Containers inside the same Pod communicate using localhost.

---

# 8. Pod Lifecycle

```
Pending

↓

ContainerCreating

↓

Running

↓

Succeeded

↓

Failed

↓

Deleted
```

Running is the normal production state.

---

# 9. Daily DevOps Activities

- Check Pod Status
- Restart Pods
- Investigate CrashLoopBackOff
- Read Logs
- Describe Pods
- Delete Failed Pods
- Monitor Pod Health

---

# 10. Production Best Practices

- One Application per Pod.
- Never SSH into Pods.
- Use Readiness Probe.
- Use Liveness Probe.
- Set CPU and Memory Limits.
- Use Deployments instead of standalone Pods.

---

# 11. Security

- Don't run containers as root.
- Use Secrets.
- Use ReadOnly filesystem where possible.
- Scan container images.
- Apply RBAC.

---

# 12. Troubleshooting

List Pods

```bash
kubectl get pods
```

Describe Pod

```bash
kubectl describe pod <pod-name>
```

Pod Logs

```bash
kubectl logs <pod-name>
```

Execute Inside Pod

```bash
kubectl exec -it <pod-name> -- bash
```

---

# 13. Real Production Scenarios

## Scenario 1

### Pod CrashLoopBackOff

```
Application Starts

↓

Application Crashes

↓

kubelet Restarts Pod

↓

Crash Again

↓

CrashLoopBackOff
```

Production Story

A developer deployed an application with an incorrect database password.

The application started but immediately exited.

kubelet continuously restarted the Pod.

Users received HTTP 500 errors.

Investigation

```bash
kubectl logs <pod-name>

kubectl describe pod <pod-name>
```

Root Cause

Wrong environment variable.

Resolution

Corrected Secret.

Redeployed application.

---

## Scenario 2

### ImagePullBackOff

Symptoms

- Pod Pending
- Container never starts

Reason

Wrong Docker image name or registry authentication failure.

---

## Scenario 3

### OOMKilled

Symptoms

Application suddenly restarts.

Reason

Container exceeded memory limit.

Resolution

Increase Memory Limit or optimize application.

---

# 14. Scenario Interview Q&A

Q. What is a Pod?

Answer

A Pod is the smallest deployable unit in Kubernetes.

---

Q. Can multiple Containers run inside one Pod?

Answer

Yes.

They share the same Network and Storage.

---

Q. Does every Pod have its own IP?

Answer

Yes.

Each Pod gets a unique IP Address.

---

# 15. Architecture Interview Q&A

Explain Pod Architecture.

```
Worker Node

↓

Pod

↓

Container

↓

Application
```

---

# 16. Production Support Interview Q&A

Production Investigation

```
Alert

↓

kubectl get pods

↓

Running?

↓

No

↓

kubectl describe pod

↓

kubectl logs

↓

Events

↓

Root Cause

↓

Fix

↓

Verify
```

---

# 17. Related Runbooks

- pod-crashloopbackoff.md
- imagepullbackoff.md
- oomkilled.md
- pod-pending.md

---

# 18. Common Incidents

- CrashLoopBackOff
- ImagePullBackOff
- OOMKilled
- Pending
- ContainerCreating
- Evicted

---

# 19. Commands

```bash
kubectl get pods

kubectl describe pod <pod-name>

kubectl logs <pod-name>

kubectl exec -it <pod-name> -- bash

kubectl delete pod <pod-name>

kubectl get pods -o wide
```

---

# 20. Marathi Quick Revision

- Pod म्हणजे Kubernetes मधील सर्वात लहान Deployable Unit.
- प्रत्येक Pod मध्ये Container असतो.
- प्रत्येक Pod ला स्वतःचा IP मिळतो.
- Production मध्ये Pods Deployment द्वारे तयार होतात.

---

# 21. Marathi Summary (5+ Experience Revision)

## Interview Summary

Pod हा Kubernetes मधील सर्वात महत्त्वाचा Object आहे.

Application नेहमी Pod मध्ये चालते.

Container थेट Kubernetes मध्ये चालत नाही.

## Production Investigation Flow

```
Alert

↓

kubectl get pods

↓

Running?

↓

kubectl describe pod

↓

kubectl logs

↓

Events

↓

Root Cause
```

## Production Story

Production मध्ये एका Application ला चुकीचा Database Password दिला.

Pod सतत Restart होत होता.

Logs मध्ये Authentication Failed दिसले.

Secret Update करून नवीन Deployment केले.

Application पुन्हा Running झाली.

## Memory Trick

**Pod = Container + Network + Storage + IP**

Remember

**Application → Container → Pod → Node → Cluster**

