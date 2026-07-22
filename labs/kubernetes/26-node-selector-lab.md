# Lab 26 - Node Selector

# 1. Objective

The objective of this lab is to understand how Kubernetes schedules Pods onto specific worker nodes using nodeSelector.

By the end of this lab you will be able to

- View node labels
- Add custom node labels
- Schedule Pods using nodeSelector
- Verify Pod placement
- Troubleshoot scheduling failures
- Understand enterprise workload placement
- Explain node selection architecture

Node Selector is the simplest mechanism for controlling where Pods are scheduled.

---

# 2. Prerequisites

Complete

- Lab 01 - Lab 25

Verify

```bash
kubectl get nodes

kubectl get pods

kubectl get nodes --show-labels
```

---

# 3. Enterprise Usage

In enterprise environments different nodes serve different workloads.

Example

```
Application Nodes

↓

Frontend

↓

API

↓

Background Jobs
```

```
Database Nodes

↓

PostgreSQL

↓

MySQL
```

```
GPU Nodes

↓

Machine Learning

↓

AI Models
```

```
Monitoring Nodes

↓

Prometheus

↓

Grafana
```

Node Selector ensures workloads are deployed only on intended nodes.

---

# 4. Usage in THIS Project

Future architecture

```
Frontend

↓

Application Node
```

```
API Gateway

↓

Application Node
```

```
Prometheus

↓

Monitoring Node
```

```
Grafana

↓

Monitoring Node
```

```
Jenkins

↓

CI Node
```

---

# 5. Architecture

```
Pod

↓

nodeSelector

↓

Scheduler

↓

Matching Node Label

↓

Worker Node
```

---

# 6. Step-by-Step Implementation

## Step 1

View Nodes

```bash
kubectl get nodes
```

---

## Step 2

View Node Labels

```bash
kubectl get nodes --show-labels
```

Observe

- kubernetes.io/hostname
- kubernetes.io/os
- kubernetes.io/arch

---

## Step 3

Label the Node

For Kind

```bash
kubectl label node kind-control-plane node-type=application
```

Verify

```bash
kubectl get nodes --show-labels
```

Expected

```
node-type=application
```

---

## Step 4

Create Pod

```bash
cat > node-selector-pod.yaml <<EOF
apiVersion: v1
kind: Pod
metadata:
  name: node-selector-demo
spec:
  nodeSelector:
    node-type: application

  containers:
  - name: nginx
    image: nginx:stable
