# Lab 12 - Deployment Failure Simulation

# 1. Objective

The objective of this lab is to simulate real-world Deployment failures and investigate them using a structured production troubleshooting methodology.

By the end of this lab you will be able to

- Simulate common Deployment failures
- Investigate Deployment issues
- Analyze Events
- Analyze ReplicaSets
- Analyze Pods
- Perform Root Cause Analysis (RCA)
- Recover the application

This lab closely resembles production incidents handled by Enterprise DevOps and SRE teams.

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

Verify

```bash
kubectl get nodes

kubectl get deployment

kubectl get pods
```

Cluster should be healthy.

---

# 3. Enterprise Usage

Deployment failures happen frequently in production due to

- Wrong image
- Configuration errors
- Secret issues
- Resource exhaustion
- Health probe failures
- Scheduling failures
- Network issues

Enterprise investigation flow

```
Alert

↓

Deployment

↓

ReplicaSet

↓

Pods

↓

Events

↓

Logs

↓

Infrastructure

↓

Application

↓

Recovery

↓

RCA
```

---

# 4. Usage in THIS Project

All project services

- Frontend
- API Gateway
- Auth Service
- Dashboard Service

will eventually be deployed using Kubernetes Deployments.

Every production deployment will follow

```
GitHub Actions

↓

Container Registry

↓

Deployment

↓

Rolling Update

↓

Production Monitoring

↓

Incident Response (if required)
```

---

# 5. Architecture

```
Deployment

↓

ReplicaSet

↓

Pods

↓

Scheduler

↓

Worker Node

↓

Container Runtime

↓

Application
```

Failures can occur at any layer.

---

# 6. Step-by-Step Implementation

## Step 1

Create Deployment

```bash
cat > deployment.yaml <<EOF
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-demo
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx-demo
  template:
    metadata:
      labels:
        app: nginx-demo
    spec:
      containers:
      - name: nginx
        image: nginx:1.27
        ports:
        - containerPort: 80
