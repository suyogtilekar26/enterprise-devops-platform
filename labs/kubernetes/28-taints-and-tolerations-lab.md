# Lab 28 - Taints and Tolerations

# 1. Objective

The objective of this lab is to understand how Kubernetes Taints and Tolerations control which Pods are allowed to run on specific worker nodes.

By the end of this lab you will be able to

- Apply taints to nodes
- Configure tolerations
- Verify scheduling behavior
- Understand taint effects
- Troubleshoot scheduling failures
- Implement enterprise workload isolation
- Explain taints and tolerations architecture

Taints repel Pods from nodes, while tolerations allow Pods to be scheduled onto tainted nodes.

---

# 2. Prerequisites

Complete

- Lab 01 - Lab 27

Verify

```bash
kubectl get nodes

kubectl get pods

kubectl describe node kind-control-plane
```

---

# 3. Enterprise Usage

Large Kubernetes clusters separate workloads using dedicated node pools.

Example

```
Application Nodes

↓

Business Applications
```

```
Monitoring Nodes

↓

Prometheus

↓

Grafana
```

```
GPU Nodes

↓

AI

↓

Machine Learning
```

```
Database Nodes

↓

PostgreSQL

↓

MongoDB
```

Taints prevent unwanted workloads from consuming specialized resources.

---

# 4. Usage in THIS Project

Future enterprise architecture

```
Application Pods

↓

Application Nodes
```

```
Prometheus

↓

Monitoring Nodes
```

```
Grafana

↓

Monitoring Nodes
```

```
Future AI Services

↓

GPU Nodes
```

Dedicated workloads require dedicated nodes.

---

# 5. Architecture

```
Node

↓

Taint

↓

Scheduler

↓

Pod

↓

Toleration

↓

Pod Scheduled
```

---

# 6. Step-by-Step Implementation

## Step 1

View Current Nodes

```bash
kubectl get nodes
```

---

## Step 2

Apply Taint

```bash
kubectl taint node kind-control-plane \
workload=monitoring:NoSchedule
```

Verify

```bash
kubectl describe node kind-control-plane
```

Expected

```
Taints:

workload=monitoring:NoSchedule
```

---

## Step 3

Create Pod Without Toleration

```bash
cat > pod-without-toleration.yaml <<EOF
apiVersion: v1
kind: Pod
metadata:
  name: nginx-no-toleration
spec:
  containers:
  - name: nginx
    image: nginx:stable
