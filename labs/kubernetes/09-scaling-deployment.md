# Lab 09 - Scaling a Deployment

# 1. Objective

The objective of this lab is to understand how Kubernetes Deployments can be scaled to meet application demand.

By the end of this lab you will be able to

- Scale Deployments manually
- Observe Pod creation
- Observe Pod termination
- Verify ReplicaSets
- Understand scaling behavior
- Monitor resource utilization
- Troubleshoot scaling issues

Scaling is one of the core capabilities of Kubernetes and is used daily in enterprise environments.

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

Verify

```bash
kubectl get nodes

kubectl get deployments

kubectl get pods
```

---

# 3. Enterprise Usage

Production traffic is never constant.

Typical traffic pattern

```
Morning

↓

Office Hours

↓

Peak Traffic

↓

Night

↓

Weekend
```

Applications are scaled according to business demand.

Scaling can be

- Manual
- Automatic (HPA)
- Cluster Scaling

This lab focuses on manual scaling.

---

# 4. Usage in THIS Project

Our services

```
Frontend

API Gateway

Auth Service

Dashboard Service
```

will initially run with a fixed number of replicas.

Later

```
Deployment

↓

HPA

↓

Automatic Scaling
```

Manual scaling helps us understand how Kubernetes behaves internally before introducing HPA.

---

# 5. Architecture

```
kubectl scale

↓

Deployment

↓

ReplicaSet

↓

Desired Replicas Updated

↓

Scheduler

↓

Pods Created

↓

Application Scaled
```

Scaling down

```
Desired Replicas Reduced

↓

ReplicaSet

↓

Pods Terminated
```

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
  replicas: 2
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
