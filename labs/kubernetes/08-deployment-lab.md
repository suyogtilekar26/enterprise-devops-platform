# Lab 08 - Deployment

# 1. Objective

The objective of this lab is to learn how Kubernetes Deployments manage stateless applications in production.

By the end of this lab you will be able to

- Create a Deployment
- Understand Deployment architecture
- Verify ReplicaSets
- Verify Pods
- Scale Deployments
- Perform updates
- Understand self-healing

Deployments are the most commonly used Kubernetes workload resource in enterprise environments.

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

Verify

```bash
kubectl get nodes

kubectl get pods
```

Cluster should be healthy.

---

# 3. Enterprise Usage

Almost every stateless production application is deployed using Deployments.

Examples

- React Frontend
- Spring Boot APIs
- Flask Applications
- Node.js APIs
- Nginx
- Microservices

Architecture

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

Our Enterprise DevOps Platform will deploy

```
Frontend

↓

Deployment

↓

ReplicaSet

↓

Pods
```

Similarly

```
API Gateway

↓

Deployment

↓

Pods
```

```
Auth Service

↓

Deployment

↓

Pods
```

```
Dashboard Service

↓

Deployment

↓

Pods
```

All application services in this project will use Deployments.

---

# 5. Architecture

```
kubectl apply

↓

API Server

↓

Deployment

↓

ReplicaSet

↓

Pods

↓

Scheduler

↓

Worker Node
```

Deployment continuously manages ReplicaSets.

ReplicaSets continuously manage Pods.

---

# 6. Step-by-Step Implementation

## Step 1

Create Deployment manifest

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
