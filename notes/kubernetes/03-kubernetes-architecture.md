# Kubernetes Architecture

# 1. Purpose

The purpose of Kubernetes Architecture is to understand how the entire Kubernetes cluster works internally.

Before learning Pods, Deployments, Services or Helm, every DevOps Engineer must understand the architecture because every production issue eventually comes back to one of these components.

---

# 2. Introduction

A Kubernetes Cluster is divided into two major parts.

- Control Plane
- Worker Nodes

Think of Kubernetes as a company.

- Control Plane = Management Team
- Worker Nodes = Employees

Management decides what should happen.

Employees actually perform the work.

---

# 3. Enterprise Usage

Every enterprise Kubernetes cluster follows this architecture.

Examples

- Amazon EKS
- Azure AKS
- Google GKE
- OpenShift
- Rancher Kubernetes

Regardless of the cloud provider, the architecture remains almost the same.

---

# 4. Usage in THIS Project

Our architecture will become

```
Developer

↓

GitHub

↓

GitHub Actions

↓

GHCR

↓

Kind Kubernetes Cluster

↓

Frontend Pod

↓

API Gateway Pod

↓

Auth Pod

↓

Dashboard Pod

↓

Service

↓

Ingress

↓

Users
```

---

# 5. Architecture

```
                 Kubernetes Cluster

+------------------------------------------------------+

                 CONTROL PLANE

+------------------------------------------------------+

 API Server

 Scheduler

 Controller Manager

 etcd

+------------------------------------------------------+

                 │

      ----------------------------

      │                          │

+-------------------+     +-------------------+

 Worker Node-1           Worker Node-2

 kubelet                kubelet

 kube-proxy             kube-proxy

 containerd             containerd

 Frontend Pod           Auth Pod

 API Pod                Dashboard Pod

+-------------------+     +-------------------+
```

---

# 6. Internal Workflow

```
Developer

↓

kubectl apply

↓

API Server

↓

Store Desired State

↓

etcd

↓

Scheduler

↓

Worker Node

↓

kubelet

↓

containerd

↓

Pod Running

↓

Service

↓

Ingress

↓

Users
```

---

# 7. Architecture Components

## Control Plane

Responsible for

- Managing Cluster
- Scheduling Pods
- Monitoring Cluster
- Desired State
- API Processing

---

## Worker Node

Responsible for

- Running Pods
- Pulling Images
- Executing Containers
- Reporting Health

---

# 8. Request Flow

```
Developer

      │

kubectl apply

      │

API Server

      │

Authentication

      │

Authorization

      │

Validation

      │

Store in etcd

      │

Scheduler

      │

Worker Node

      │

kubelet

      │

containerd

      │

Pod Created
```

Remember

Every Kubernetes request first reaches the API Server.

---

# 9. Daily DevOps Activities

- Check Cluster Health
- Monitor Nodes
- Monitor Pods
- Investigate Failures
- Check Events
- Restart Deployments
- Scale Applications
- Review Logs

---

# 10. Production Best Practices

- Never access Worker Nodes manually.
- Everything should be deployed using YAML.
- Keep Control Plane highly available.
- Monitor etcd health.
- Monitor Node health continuously.
- Keep container runtime updated.
- Enable RBAC.
- Enable Audit Logging.

---

# 11. Security

Production clusters should use

- RBAC
- TLS
- Secrets
- Network Policies
- Image Scanning
- Admission Controllers
- Least Privilege Access

---

# 12. Troubleshooting

Useful Commands

Cluster

```bash
kubectl cluster-info
```

Nodes

```bash
kubectl get nodes
```

Pods

```bash
kubectl get pods -A
```

Describe

```bash
kubectl describe pod <pod-name>
```

Logs

```bash
kubectl logs <pod-name>
```

Events

```bash
kubectl get events -A
```

---

# 13. Real Production Scenarios

## Scenario 1

### Worker Node Failure

```
Worker Node

↓

Node Crash

↓

Control Plane Detects Failure

↓

Scheduler

↓

Healthy Worker Node

↓

Pod Recreated

↓

Application Available
```

Production Story

A VMware ESXi host failed during office hours.

Nearly 80 Pods were running.

The affected Worker Node became NotReady.

Scheduler automatically selected healthy Worker Nodes.

kubelet recreated the missing Pods.

Users experienced almost no downtime.

This feature is called **Self-Healing**.

---

## Scenario 2

### API Server Failure

Symptoms

- kubectl stops working
- CI/CD deployment fails

Existing Pods continue serving users.

---

## Scenario 3

### Scheduler Failure

Symptoms

Pods remain Pending.

Already running Pods continue working normally.

---

# 14. Scenario Interview Q&A

### Why does Kubernetes need a Control Plane?

Because somebody has to make decisions for the cluster.

Control Plane decides.

Worker Nodes execute.

---

### What happens if a Worker Node fails?

Control Plane detects failure.

Scheduler selects another healthy Worker Node.

kubelet recreates Pods.

---

# 15. Architecture Interview Q&A

### Explain Kubernetes Architecture.

```
Control Plane

↓

API Server

↓

Scheduler

↓

Worker Nodes

↓

kubelet

↓

Container Runtime

↓

Pods

↓

Services

↓

Ingress

↓

Users
```

---

# 16. Production Support Interview Q&A

Production Application Down

Investigation Flow

```
kubectl get nodes

↓

kubectl get pods -A

↓

kubectl describe pod

↓

kubectl logs

↓

kubectl get events

↓

Root Cause

↓

Fix

↓

Verify
```

---

# 17. Related Runbooks

- node-not-ready.md
- pod-crashloop.md
- scheduler-failure.md
- api-server-down.md

---

# 18. Common Incidents

- Node Not Ready
- Pod Pending
- CrashLoopBackOff
- ImagePullBackOff
- Failed Scheduling
- OOMKilled
- API Server Unavailable

---

# 19. Commands

```bash
kubectl cluster-info

kubectl get nodes

kubectl get pods -A

kubectl describe node <node>

kubectl describe pod <pod>

kubectl logs <pod>

kubectl get events -A

kubectl top nodes

kubectl top pods
```

---

# 20. Marathi Quick Revision

- Kubernetes मध्ये दोन भाग असतात.
- Control Plane म्हणजे Brain.
- Worker Node म्हणजे काम करणारी Machine.
- API Server प्रत्येक Request स्वीकारतो.
- Scheduler Node निवडतो.
- kubelet Pods चालवतो.
- containerd Container चालवतो.

---

# 21. Marathi Summary (5+ Experience Revision)

## Interview Summary

Kubernetes Architecture म्हणजे Control Plane आणि Worker Nodes यांच्यातील communication.

Control Plane निर्णय घेतो.

Worker Nodes application चालवतात.

## Production Investigation Flow

```
Alert

↓

kubectl get nodes

↓

kubectl get pods

↓

kubectl describe pod

↓

kubectl logs

↓

kubectl get events

↓

Node Health

↓

Root Cause
```

## Production Story

Production मध्ये एका Worker Node ची VM अचानक crash झाली.

Control Plane ने काही सेकंदात Node NotReady detect केला.

Scheduler ने दुसरा healthy Worker Node निवडला.

kubelet ने Pods recreate केले.

Users ना downtime जाणवला नाही.

## Memory Trick

Remember

**ASCKP**

A → API Server

S → Scheduler

C → Controller Manager

K → kubelet

P → Pod

Flow

Developer → API Server → Scheduler → Worker → kubelet → Pod

