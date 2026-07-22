# Lab 39 - Production Pod Debugging

# 1. Objective

The objective of this lab is to learn a structured, production-grade approach for troubleshooting Kubernetes Pod failures.

By the end of this lab you will be able to

- Investigate CrashLoopBackOff
- Troubleshoot ImagePullBackOff
- Investigate Pending Pods
- Troubleshoot OOMKilled
- Debug probe failures
- Identify scheduling failures
- Follow an enterprise incident workflow

This lab simulates the investigation process followed by L1, L2 and L3 DevOps engineers during production incidents.

---

# 2. Prerequisites

Complete

- Lab 01 - Lab 38

Verify

```bash
kubectl get nodes

kubectl get pods -A

kubectl version
```

---

# 3. Enterprise Usage

Typical production incident flow

```
Monitoring Alert

↓

User Complaint

↓

Identify Failed Pod

↓

Collect Events

↓

Collect Logs

↓

Validate Configuration

↓

Identify Root Cause

↓

Implement Fix

↓

Monitor Recovery
```

---

# 4. Usage in THIS Project

Typical investigations

```
Frontend

↓

Readiness Failure
```

```
API Gateway

↓

CrashLoopBackOff
```

```
Authentication Service

↓

ConfigMap Error
```

```
Dashboard

↓

OOMKilled
```

---

# 5. Architecture

```
Alert

↓

Deployment

↓

ReplicaSet

↓

Pod

↓

Container

↓

Logs

↓

Events

↓

Root Cause
```

---

# 6. Step-by-Step Implementation

## Step 1

Create Broken Deployment

```bash
cat > broken-deployment.yaml <<EOF
apiVersion: apps/v1
kind: Deployment
metadata:
  name: broken-app
spec:
  replicas: 1
  selector:
    matchLabels:
      app: broken-app
  template:
    metadata:
      labels:
        app: broken-app
    spec:
      containers:
      - name: app
        image: nginx:notfound
