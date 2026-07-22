# Lab 27 - Node Affinity

# 1. Objective

The objective of this lab is to understand how Kubernetes Node Affinity provides advanced scheduling rules for placing Pods on worker nodes.

By the end of this lab you will be able to

- Understand Node Affinity
- Configure required node affinity
- Configure preferred node affinity
- Compare Node Selector and Node Affinity
- Troubleshoot scheduling failures
- Understand enterprise scheduling strategies
- Explain Node Affinity architecture

Node Affinity provides more flexible scheduling than nodeSelector.

---

# 2. Prerequisites

Complete

- Lab 01 - Lab 26

Verify

```bash
kubectl get nodes

kubectl get pods

kubectl get nodes --show-labels
```

---

# 3. Enterprise Usage

Enterprise node groups

```
Application Nodes

↓

Frontend

↓

Backend APIs
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

ML

↓

AI
```

```
Database Nodes

↓

Stateful Applications
```

Node Affinity enables flexible scheduling policies.

---

# 4. Usage in THIS Project

Future architecture

```
Frontend

↓

Application Nodes
```

```
API Gateway

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
Future AI Service

↓

GPU Nodes
```

---

# 5. Architecture

```
Pod

↓

Node Affinity Rules

↓

Scheduler

↓

Matching Node Labels

↓

Worker Node
```

---

# 6. Step-by-Step Implementation

## Step 1

View Node Labels

```bash
kubectl get nodes --show-labels
```

---

## Step 2

Label Node

```bash
kubectl label node kind-control-plane workload=application
```

Verify

```bash
kubectl get nodes --show-labels
```

Expected

```
workload=application
```

---

## Step 3

Create Pod Using Required Node Affinity

```bash
cat > required-affinity.yaml <<EOF
apiVersion: v1
kind: Pod
metadata:
  name: required-affinity-demo
spec:
  affinity:
    nodeAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
        nodeSelectorTerms:
        - matchExpressions:
          - key: workload
            operator: In
            values:
            - application
  containers:
  - name: nginx
    image: nginx:stable
