# Lab 11 - Rollout Rollback

# 1. Objective

The objective of this lab is to understand how Kubernetes rollbacks restore a previous working version after a failed deployment.

By the end of this lab you will be able to

- Perform a rollout rollback
- View rollout history
- Restore a previous application version
- Verify ReplicaSets
- Understand deployment revisions
- Troubleshoot failed rollouts
- Perform production recovery

Rollback is one of the most important production recovery mechanisms in Kubernetes.

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

Verify

```bash
kubectl get nodes

kubectl get deployment

kubectl get pods
```

---

# 3. Enterprise Usage

Rollbacks are used when a production deployment introduces unexpected issues.

Typical workflow

```
Version 1

↓

Deploy Version 2

↓

Application Failure

↓

Rollback

↓

Version 1 Restored
```

Rollback minimizes production downtime and business impact.

---

# 4. Usage in THIS Project

All project services

- Frontend
- API Gateway
- Auth Service
- Dashboard Service

will be upgraded using Deployments.

If a release causes issues

```
Deployment

↓

Rollout History

↓

Rollback

↓

Stable Version Restored
```

---

# 5. Architecture

```
Deployment

↓

ReplicaSet Revision 1

↓

ReplicaSet Revision 2

↓

Rollback

↓

ReplicaSet Revision 1 Active
```

Deployment stores revision history through ReplicaSets.

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
        image: nginx:1.26
        ports:
        - containerPort: 80
