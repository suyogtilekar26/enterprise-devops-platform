# Lab 13 - ClusterIP Service

# 1. Objective

The objective of this lab is to understand how Kubernetes Services provide stable networking for Pods using the ClusterIP Service type.

By the end of this lab you will be able to

- Create a ClusterIP Service
- Understand Service discovery
- Verify internal networking
- Test Service DNS
- Verify load balancing
- Troubleshoot Service issues
- Understand enterprise service communication

ClusterIP is the default Service type in Kubernetes.

---

# 2. Prerequisites

Complete

- Lab 01 - Kind Cluster Installation
- Lab 02 - kubectl Configuration
- Lab 03 - Cluster Verification
- Lab 04 - Create First Pod
- Lab 05 - Multi-Container Pod
- Lab 06 - Pod Debugging
- Lab 07 - ReplicaSet
- Lab 08 - Deployment
- Lab 09 - Scaling Deployment
- Lab 10 - Rolling Update
- Lab 11 - Rollout Rollback
- Lab 12 - Deployment Failure Simulation

Verify

```bash
kubectl get nodes

kubectl get deployments

kubectl get pods
```

---

# 3. Enterprise Usage

Pods are temporary.

Their IP addresses change whenever Pods are recreated.

Applications should never communicate directly with Pod IPs.

Instead

```
Application

↓

ClusterIP Service

↓

Pods
```

This provides

- Stable IP
- Stable DNS
- Internal Load Balancing
- Service Discovery

---

# 4. Usage in THIS Project

Our application communication

```
Frontend

↓

API Gateway Service

↓

API Gateway Pods
```

```
API Gateway

↓

Auth Service

↓

Auth Pods
```

```
API Gateway

↓

Dashboard Service

↓

Dashboard Pods
```

All backend communication inside Kubernetes will use ClusterIP Services.

---

# 5. Architecture

```
Client Pod

↓

Service DNS

↓

ClusterIP

↓

kube-proxy

↓

Backend Pods
```

Traffic is automatically distributed across healthy Pods.

---

# 6. Step-by-Step Implementation

## Step 1

Create Deployment

```bash
cat > deployment.yaml <<EOF
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
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
