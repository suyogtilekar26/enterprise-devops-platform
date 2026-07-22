# Lab 16 - Ingress

# 1. Objective

The objective of this lab is to understand how Kubernetes Ingress exposes multiple applications through a single entry point using HTTP and HTTPS routing.

By the end of this lab you will be able to

- Install an Ingress Controller (Kind)
- Create an Ingress Resource
- Configure path-based routing
- Configure host-based routing
- Verify Ingress traffic flow
- Troubleshoot Ingress issues
- Understand enterprise ingress architecture

Ingress is the standard method for exposing HTTP/HTTPS applications in production Kubernetes environments.

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

Verify

```bash
kubectl get nodes

kubectl get pods -A

kubectl get svc
```

---

# 3. Enterprise Usage

Instead of exposing every application using a separate LoadBalancer

```
Internet

↓

Load Balancer

↓

Ingress Controller

↓

Ingress

↓

Services

↓

Pods
```

Benefits

- Single Entry Point
- HTTPS Termination
- Path Routing
- Host Routing
- Lower Cloud Cost
- Centralized Traffic Management

---

# 4. Usage in THIS Project

Future architecture

```
Browser

↓

AWS Load Balancer

↓

NGINX Ingress Controller

↓

Ingress

↓

Frontend Service

↓

Frontend Pods
```

```
Browser

↓

AWS Load Balancer

↓

Ingress

↓

API Gateway Service

↓

API Gateway Pods
```

Eventually

- Frontend
- API Gateway

will be exposed using Ingress.

Auth Service and Dashboard Service remain internal ClusterIP Services.

---

# 5. Architecture

```
Client

↓

DNS

↓

Load Balancer

↓

Ingress Controller

↓

Ingress Rules

↓

ClusterIP Service

↓

Pods
```

Ingress itself does not route traffic.

The Ingress Controller implements the routing logic.

---

# 6. Step-by-Step Implementation

## Step 1

Verify Ingress Controller

```bash
kubectl get pods -n ingress-nginx
```

If not installed, install the NGINX Ingress Controller suitable for your Kind cluster before continuing.

Verify

```bash
kubectl get pods -n ingress-nginx
```

Expected

```
Running
```

---

## Step 2

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
