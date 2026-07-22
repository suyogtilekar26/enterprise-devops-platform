# Lab 06 - Pod Debugging

# 1. Objective

The objective of this lab is to learn how to troubleshoot Kubernetes Pods using the same investigation approach followed by Enterprise DevOps and SRE teams during production incidents.

By the end of this lab you will be able to

- Identify unhealthy Pods
- Investigate Pod failures
- Read Events
- Analyze Logs
- Execute commands inside containers
- Identify scheduling problems
- Perform structured Root Cause Analysis (RCA)

This is one of the most important production skills for a DevOps Engineer.

---

# 2. Prerequisites

Complete

- Lab 01 - Kind Cluster Installation
- Lab 02 - kubectl Configuration
- Lab 03 - Cluster Verification
- Lab 04 - Create First Pod
- Lab 05 - Multi-Container Pod

Verify

```bash
kubectl get nodes

kubectl get pods
```

---

# 3. Enterprise Usage

Every production incident involving Kubernetes begins with Pod investigation.

Typical workflow

```
Alert

↓

Pod Status

↓

Describe

↓

Events

↓

Logs

↓

Exec

↓

Application

↓

Root Cause

↓

Resolution
```

This workflow minimizes Mean Time To Resolution (MTTR).

---

# 4. Usage in THIS Project

All services in our Enterprise DevOps Platform

- Frontend
- API Gateway
- Auth Service
- Dashboard Service

will eventually run as Pods.

Every production issue will require Pod debugging before escalating to developers.

---

# 5. Architecture

```
Application Failure

↓

Pod

↓

kubectl describe

↓

Events

↓

Logs

↓

Container

↓

Application

↓

Root Cause
```

---

# 6. Step-by-Step Implementation

## Step 1

Create a faulty Pod

```bash
cat > debug-pod.yaml <<EOF
apiVersion: v1
kind: Pod
metadata:
  name: debug-pod
spec:
  containers:
  - name: app
    image: nginx:invalid-tag
