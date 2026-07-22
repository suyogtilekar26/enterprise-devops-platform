# Lab 07 - ReplicaSet

# 1. Objective

The objective of this lab is to understand how ReplicaSets provide self-healing by maintaining the desired number of Pod replicas.

By the end of this lab you will be able to

- Create a ReplicaSet
- Verify replica count
- Scale ReplicaSets
- Observe self-healing
- Delete Pods safely
- Understand ReplicaSet reconciliation
- Troubleshoot ReplicaSets

ReplicaSet is the first Kubernetes controller responsible for maintaining application availability.

---

# 2. Prerequisites

Complete

- Lab 01 - Kind Cluster Installation
- Lab 02 - kubectl Configuration
- Lab 03 - Cluster Verification
- Lab 04 - Create First Pod
- Lab 05 - Multi-Container Pod
- Lab 06 - Pod Debugging

Verify

```bash
kubectl get nodes

kubectl get pods
```

Cluster should be healthy.

---

# 3. Enterprise Usage

ReplicaSets ensure that applications always have the required number of Pods running.

Typical production flow

```
ReplicaSet

↓

Desired Replicas

↓

Scheduler

↓

Pods

↓

Self-Healing
```

If a Pod fails unexpectedly, ReplicaSet automatically creates a replacement.

---

# 4. Usage in THIS Project

Our Enterprise DevOps Platform services

- Frontend
- API Gateway
- Auth Service
- Dashboard Service

will eventually run as Deployments.

Internally

```
Deployment

↓

ReplicaSet

↓

Pods
```

Although engineers rarely create ReplicaSets directly in production, understanding them is essential because Deployments depend on them.

---

# 5. Architecture

```
ReplicaSet

↓

Replica Controller Loop

↓

Desired State

↓

Current State

↓

Create/Delete Pods

↓

Desired Replicas Achieved
```

---

# 6. Step-by-Step Implementation

## Step 1

Create ReplicaSet manifest

```bash
cat > replicaset.yaml <<EOF
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: nginx-rs
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.27
        ports:
        - containerPort: 80
