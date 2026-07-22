# Lab 18 - Kubernetes Network Policy

# 1. Objective

The objective of this lab is to understand how Kubernetes Network Policies secure Pod-to-Pod communication by controlling ingress and egress traffic.

By the end of this lab you will be able to

- Create Network Policies
- Restrict Pod communication
- Allow specific traffic
- Verify ingress rules
- Verify egress rules
- Troubleshoot Network Policies
- Understand enterprise network security

Network Policies are one of the most important security controls in enterprise Kubernetes clusters.

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
- Lab 13 - ClusterIP Service
- Lab 14 - NodePort Service
- Lab 15 - LoadBalancer Service
- Lab 16 - Ingress
- Lab 17 - DNS Testing

Verify

```bash
kubectl get nodes

kubectl get pods

kubectl get networkpolicy
```

---

# 3. Enterprise Usage

Without Network Policies

```
Pod A

↓

Pod B

↓

Pod C

↓

Database
```

Every Pod can communicate with every other Pod.

With Network Policies

```
Frontend

↓

API Gateway

↓

Auth Service

↓

Database
```

Only approved traffic is allowed.

Benefits

- Zero Trust Networking
- East-West Traffic Control
- Compliance
- Reduced Attack Surface
- Micro-segmentation

---

# 4. Usage in THIS Project

Future communication

```
Frontend

↓

API Gateway
```

Allowed

```
API Gateway

↓

Auth Service
```

Allowed

```
API Gateway

↓

Dashboard Service
```

Allowed

```
Frontend

↓

Auth Service
```

Blocked

```
Dashboard

↓

Frontend
```

Blocked

---

# 5. Architecture

```
Client Pod

↓

Network Policy

↓

Allowed?

↓

YES

↓

Destination Pod
```

Otherwise

```
Traffic Dropped
```

---

# 6. Step-by-Step Implementation

## Step 1

Create Namespace

```bash
kubectl create namespace security-lab
```

---

## Step 2

Create Backend Deployment

```bash
cat > backend.yaml <<EOF
apiVersion: apps/v1
kind: Deployment
metadata:
  name: backend
  namespace: security-lab
spec:
  replicas: 2
  selector:
    matchLabels:
      app: backend
  template:
    metadata:
      labels:
        app: backend
    spec:
      containers:
      - name: nginx
        image: nginx:1.27
        ports:
        - containerPort: 80
