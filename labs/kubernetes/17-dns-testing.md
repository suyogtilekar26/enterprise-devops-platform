# Lab 17 - Kubernetes DNS Testing

# 1. Objective

The objective of this lab is to understand how Kubernetes DNS enables service discovery between applications running inside the cluster.

By the end of this lab you will be able to

- Verify CoreDNS
- Test Service DNS resolution
- Understand Kubernetes DNS architecture
- Test inter-service communication
- Troubleshoot DNS failures
- Verify DNS records
- Understand enterprise service discovery

Kubernetes DNS is one of the most critical components of every production cluster.

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

Verify

```bash
kubectl get nodes

kubectl get pods -A

kubectl get svc
```

---

# 3. Enterprise Usage

Applications never communicate using Pod IPs.

Instead

```
Application

↓

CoreDNS

↓

Service DNS

↓

ClusterIP

↓

Pods
```

Examples

```
auth-service.default.svc.cluster.local

api-gateway.default.svc.cluster.local

dashboard-service.default.svc.cluster.local
```

This allows applications to communicate even when Pods are recreated.

---

# 4. Usage in THIS Project

Future communication

```
Frontend

↓

api-gateway.default.svc.cluster.local

↓

API Gateway Pods
```

```
API Gateway

↓

auth-service.default.svc.cluster.local

↓

Auth Pods
```

```
API Gateway

↓

dashboard-service.default.svc.cluster.local

↓

Dashboard Pods
```

No service in this project will communicate using Pod IPs.

---

# 5. Architecture

```
Application

↓

DNS Query

↓

CoreDNS

↓

Service

↓

ClusterIP

↓

Pods
```

---

# 6. Step-by-Step Implementation

## Step 1

Verify CoreDNS

```bash
kubectl get pods -n kube-system
```

Expected

```
coredns

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
