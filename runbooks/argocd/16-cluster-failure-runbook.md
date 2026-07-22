# Kubernetes Cluster Failure Runbook

# Enterprise DevOps Platform

---

# Purpose

This runbook describes the Standard Operating Procedure (SOP) for troubleshooting Kubernetes cluster failures affecting ArgoCD-managed applications.

Cluster failures are critical production incidents that can impact all workloads, deployments and platform services.

---

# Scope

Applications

- React + Vite Frontend
- Flask API Gateway
- Flask Auth Service
- Flask Dashboard Service

Supporting Services

- PostgreSQL
- Redis

Infrastructure

- Kubernetes Control Plane
- Worker Nodes
- ArgoCD
- Ingress
- Storage
- Networking

---

# Severity

```
Severity

↓

Critical (P1)
```

Immediate response is required.

---

# Symptoms

- Applications unavailable
- Nodes NotReady
- Pods Pending
- Pods Unknown
- API Server unreachable
- ArgoCD cannot sync
- Ingress unavailable
- DNS failures

---

# Common Causes

| Cause | Example |
|--------|----------|
| Node Failure | Worker node offline |
| Control Plane Failure | API Server unavailable |
| etcd Failure | Cluster state unavailable |
| Network Failure | CNI issue |
| Storage Failure | Persistent Volumes unavailable |
| Resource Exhaustion | CPU or Memory exhausted |
| Cloud Provider Issue | Infrastructure outage |

---

# Incident Workflow

```
Alert

↓

Confirm Cluster Failure

↓

Assess Impact

↓

Identify Root Cause

↓

Restore Cluster

↓

Validate Applications

↓

Close Incident

↓

RCA
```

---

# Step 1 - Verify Cluster

```bash
kubectl cluster-info
```

Expected

```
Kubernetes control plane is running
```

---

# Step 2 - Verify Nodes

```bash
kubectl get nodes
```

Expected

```
Ready
```

Possible States

- NotReady
- Unknown
- SchedulingDisabled

---

# Step 3 - Verify System Pods

```bash
kubectl get pods -n kube-system
```

Check

- CoreDNS
- kube-proxy
- CNI
- Metrics Server

---

# Step 4 - Verify ArgoCD

```bash
kubectl get pods -n argocd
```

Ensure

- argocd-server
- repo-server
- application-controller

are Running.

---

# Step 5 - Verify Events

```bash
kubectl get events --sort-by=.metadata.creationTimestamp
```

Look for

- Node failures
- Scheduling failures
- Storage failures
- Network failures

---

# Step 6 - Verify Storage

```bash
kubectl get pv
```

```bash
kubectl get pvc --all-namespaces
```

Ensure

- PV Bound
- PVC Bound

---

# Step 7 - Verify Networking

Check

- DNS
- CNI
- Services
- Ingress
- Load Balancer

---

# Step 8 - Verify Resource Usage

```bash
kubectl top nodes
```

```bash
kubectl top pods --all-namespaces
```

Look for

- High CPU
- High Memory
- Resource starvation

---

# Step 9 - Restore Cluster

Possible actions

- Restart failed nodes
- Recover API Server
- Restore etcd
- Restart networking
- Restore storage
- Scale worker nodes

Follow your organization's disaster recovery procedures.

---

# Step 10 - Validate Applications

```bash
kubectl get pods --all-namespaces
```

Verify

- Pods Running
- Services Available
- Ingress Reachable

---

# Step 11 - Verify ArgoCD

```bash
argocd app list
```

Expected

- Applications Synced
- Health = Healthy

---

# Step 12 - Functional Testing

Verify

- Login
- Dashboard
- APIs
- Authentication
- PostgreSQL
- Redis

---

# Important Commands

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
kubectl get pods --all-namespaces
```

Events

```bash
kubectl get events
```

Resource Usage

```bash
kubectl top nodes
```

ArgoCD

```bash
argocd app list
```

---

# Success Criteria

- Cluster Healthy
- Nodes Ready
- ArgoCD Operational
- Applications Healthy
- Services Reachable
- Monitoring Stable

---

# Interview Questions

## Q1. What is the first command to verify Kubernetes cluster health?

### Answer

```bash
kubectl cluster-info
```

---

## Q2. What are the most common causes of cluster failures?

### Answer

Node failures, control plane failures, etcd issues, networking problems, storage failures, cloud infrastructure outages and resource exhaustion.

---

## Q3. How do you validate recovery after a cluster failure?

### Answer

Verify cluster health, node readiness, system pods, ArgoCD components, application status, service availability and perform functional testing.

---

# Marathi Quick Revision

- Cluster Verify करा.
- Nodes Ready आहेत का तपासा.
- kube-system Pods Verify करा.
- ArgoCD Pods Verify करा.
- Storage आणि Network तपासा.
- Resource Usage तपासा.
- Restore → Validate → Healthy.

