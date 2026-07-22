# Lab 04 - Create Your First Kubernetes Pod

# 1. Objective

The objective of this lab is to deploy your first Kubernetes Pod and understand how the Kubernetes scheduler creates and manages workloads.

By the end of this lab you will be able to

- Create a Pod
- Apply YAML manifests
- Inspect Pod lifecycle
- Verify scheduling
- View logs
- Execute commands inside a Pod
- Delete a Pod

This is the first workload deployment in Kubernetes.

---

# 2. Prerequisites

Complete

- Lab 01 - Kind Cluster Installation
- Lab 02 - kubectl Configuration
- Lab 03 - Cluster Verification

Verify

```bash
kubectl cluster-info

kubectl get nodes
```

Nodes should be

```
Ready
```

---

# 3. Enterprise Usage

Pods are the smallest deployable units in Kubernetes.

Although production engineers usually deploy Deployments instead of standalone Pods, understanding Pods is essential because every Deployment ultimately creates Pods.

Production Flow

```
Deployment

↓

ReplicaSet

↓

Pods

↓

Containers
```

---

# 4. Usage in THIS Project

Eventually our project will deploy

```
Frontend

↓

API Gateway

↓

Auth Service

↓

Dashboard Service
```

Each application will run inside one or more Pods managed by Deployments.

This lab focuses on a single Pod to understand the fundamentals.

---

# 5. Architecture

```
kubectl apply

↓

API Server

↓

Scheduler

↓

Worker Node

↓

kubelet

↓

Container Runtime

↓

Pod

↓

Container
```

---

# 6. Step-by-Step Implementation

## Step 1

Create a working directory

```bash
mkdir -p ~/devops-lab/kubernetes-labs

cd ~/devops-lab/kubernetes-labs
```

---

## Step 2

Create Pod manifest

```bash
cat > nginx-pod.yaml <<EOF
apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod
  labels:
    app: nginx
spec:
  containers:
  - name: nginx
    image: nginx:1.27
    ports:
    - containerPort: 80
