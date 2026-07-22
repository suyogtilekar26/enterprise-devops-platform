# Lab 36 - Kubernetes Health Probes

# 1. Objective

The objective of this lab is to understand Kubernetes Health Probes and how they ensure applications remain healthy and receive production traffic only when they are ready.

By the end of this lab you will be able to

- Configure Liveness Probe
- Configure Readiness Probe
- Configure Startup Probe
- Verify probe behavior
- Simulate application failures
- Troubleshoot probe failures
- Explain enterprise health monitoring

Health probes are critical for production reliability and zero-downtime deployments.

---

# 2. Prerequisites

Complete

- Lab 01 - Lab 35

Verify

```bash
kubectl get nodes

kubectl get pods

kubectl version
```

---

# 3. Enterprise Usage

Typical production architecture

```
Application

↓

Startup Probe

↓

Application Starts

↓

Readiness Probe

↓

Service Traffic

↓

Liveness Probe

↓

Restart if Hung
```

Without health probes, Kubernetes cannot determine whether an application is actually healthy.

---

# 4. Usage in THIS Project

Future production deployment

```
Frontend

↓

Readiness Probe

↓

Traffic
```

```
API Gateway

↓

Liveness Probe

↓

Auto Recovery
```

```
Auth Service

↓

Startup Probe

↓

JWT Initialization
```

```
Dashboard

↓

Readiness Probe

↓

Receive Requests
```

---

# 5. Architecture

```
Application

↓

Kubelet

↓

Health Probe

↓

Healthy?

↓

Yes

↓

Keep Running

↓

No

↓

Restart / Remove from Service
```

---

# 6. Step-by-Step Implementation

## Step 1

Create Pod

```bash
cat > probes.yaml <<EOF
apiVersion: v1
kind: Pod
metadata:
  name: nginx-probes
spec:
  containers:
  - name: nginx
    image: nginx:stable

    ports:
    - containerPort: 80

    startupProbe:
      httpGet:
        path: /
        port: 80
      failureThreshold: 30
      periodSeconds: 5

    readinessProbe:
      httpGet:
        path: /
        port: 80
      initialDelaySeconds: 5
      periodSeconds: 5

    livenessProbe:
      httpGet:
        path: /
        port: 80
      initialDelaySeconds: 10
      periodSeconds: 10
