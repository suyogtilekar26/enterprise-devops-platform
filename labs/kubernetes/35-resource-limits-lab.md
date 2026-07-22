# Lab 35 - Kubernetes Resource Requests and Limits

# 1. Objective

The objective of this lab is to understand how Kubernetes Resource Requests and Limits allocate CPU and Memory to Pods, prevent resource starvation, and ensure fair scheduling in enterprise clusters.

By the end of this lab you will be able to

- Configure CPU Requests
- Configure Memory Requests
- Configure CPU Limits
- Configure Memory Limits
- Observe scheduling decisions
- Simulate Out Of Memory (OOM) scenarios
- Troubleshoot resource issues
- Explain enterprise resource management

Resource Requests and Limits are fundamental for stable and predictable Kubernetes production environments.

---

# 2. Prerequisites

Complete

- Lab 01 - Lab 34

Verify

```bash
kubectl get nodes

kubectl top nodes

kubectl top pods
```

If metrics-server is unavailable in Kind

```bash
kubectl get pods -A
```

Continue with the remaining steps.

---

# 3. Enterprise Usage

Typical production resource allocation

```
Frontend

↓

200m CPU

↓

256Mi Memory
```

```
API Gateway

↓

500m CPU

↓

512Mi Memory
```

```
Auth Service

↓

500m CPU

↓

512Mi Memory
```

```
Prometheus

↓

1 CPU

↓

2Gi Memory
```

Proper sizing prevents one application from consuming all cluster resources.

---

# 4. Usage in THIS Project

Future resource allocation

```
Frontend

↓

CPU Request

↓

Memory Request
```

```
API Gateway

↓

Guaranteed Resources
```

```
Dashboard

↓

Resource Limits
```

```
Monitoring Stack

↓

Dedicated Resources
```

---

# 5. Architecture

```
Pod

↓

Resource Requests

↓

Scheduler

↓

Worker Node

↓

Resource Limits

↓

Container Runtime
```

---

# 6. Step-by-Step Implementation

## Step 1

Create Pod

```bash
cat > resource-limits.yaml <<EOF
apiVersion: v1
kind: Pod
metadata:
  name: resource-demo
spec:
  containers:
  - name: nginx
    image: nginx:stable

    resources:
      requests:
        cpu: "200m"
        memory: "128Mi"

      limits:
        cpu: "500m"
        memory: "256Mi"
