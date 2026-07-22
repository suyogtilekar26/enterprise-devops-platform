# Lab 14 - NodePort Service

# 1. Objective

The objective of this lab is to understand how Kubernetes NodePort Services expose applications outside the cluster.

By the end of this lab you will be able to

- Create a NodePort Service
- Access applications externally
- Understand NodePort architecture
- Verify Service routing
- Test external connectivity
- Troubleshoot NodePort issues
- Compare NodePort and ClusterIP

NodePort is commonly used for development, testing, demos and small Kubernetes environments.

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

Verify

```bash
kubectl get nodes

kubectl get deployments

kubectl get svc
```

---

# 3. Enterprise Usage

NodePort exposes a Service on every Kubernetes worker node.

Traffic flow

```
Client

↓

Node IP

↓

NodePort

↓

Service

↓

Pods
```

Typical use cases

- Development clusters
- Kind
- Minikube
- Lab environments
- Internal testing

Production environments generally use

```
Ingress

or

LoadBalancer
```

instead of NodePort.

---

# 4. Usage in THIS Project

During local Kubernetes development

```
Browser

↓

NodePort

↓

Frontend Service

↓

Frontend Pods
```

Later

```
Browser

↓

Ingress

↓

Frontend Service

↓

Frontend Pods
```

NodePort will help us validate our applications before introducing Ingress.

---

# 5. Architecture

```
External Client

↓

Node IP

↓

NodePort (30000-32767)

↓

ClusterIP

↓

Pods
```

Every node listens on the allocated NodePort.

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
        image: nginx:1.27
        ports:
        - containerPort: 80
