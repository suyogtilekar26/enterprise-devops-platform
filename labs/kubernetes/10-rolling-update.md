# Lab 10 - Rolling Update

# 1. Objective

The objective of this lab is to understand how Kubernetes performs zero-downtime application upgrades using Rolling Updates.

By the end of this lab you will be able to

- Perform a Rolling Update
- Observe Pod replacement
- Verify zero-downtime deployment
- Monitor ReplicaSets
- Understand rollout strategy
- Verify application availability
- Troubleshoot Rolling Updates

Rolling Update is the default deployment strategy used in Kubernetes.

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

Verify

```bash
kubectl get nodes

kubectl get deployments

kubectl get pods
```

---

# 3. Enterprise Usage

Rolling Updates are the standard deployment mechanism for production applications.

Typical enterprise deployment

```
Version 1

↓

Rolling Update

↓

Version 2

↓

No Downtime
```

Benefits

- High Availability
- Minimal Risk
- Controlled Deployment
- Easy Rollback

---

# 4. Usage in THIS Project

All services

```
Frontend

API Gateway

Auth Service

Dashboard Service
```

will be upgraded using Rolling Updates.

Typical release

```
GitHub Actions

↓

Docker Image

↓

Deployment Update

↓

Rolling Update

↓

Users
```

---

# 5. Architecture

```
Deployment

↓

New ReplicaSet

↓

New Pods

↓

Readiness Check

↓

Old Pods Removed

↓

Deployment Complete
```

Deployment temporarily manages two ReplicaSets during an update.

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
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 1
      maxSurge: 1
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
        image: nginx:1.26
        ports:
        - containerPort: 80
