# Lab 15 - LoadBalancer Service

# 1. Objective

The objective of this lab is to understand how Kubernetes LoadBalancer Services expose applications to external users through cloud load balancers.

By the end of this lab you will be able to

- Create a LoadBalancer Service
- Understand cloud load balancer integration
- Verify Service configuration
- Compare LoadBalancer with NodePort
- Understand external traffic flow
- Troubleshoot LoadBalancer issues
- Understand enterprise production architecture

LoadBalancer is the standard Service type used by managed Kubernetes services such as EKS, AKS and GKE.

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
- Lab 14 - NodePort Service

Verify

```bash
kubectl get nodes

kubectl get deployments

kubectl get svc
```

---

# 3. Enterprise Usage

In cloud environments, Kubernetes automatically provisions an external load balancer.

Typical production architecture

```
Internet

↓

Cloud Load Balancer

↓

LoadBalancer Service

↓

ClusterIP

↓

Pods
```

Supported platforms

- AWS EKS
- Azure AKS
- Google GKE
- Oracle OKE
- DigitalOcean Kubernetes

---

# 4. Usage in THIS Project

Current learning

```
Browser

↓

NodePort
```

Future production

```
Internet

↓

AWS Load Balancer

↓

Frontend Service

↓

Frontend Pods
```

Eventually our project will expose

- Frontend
- API Gateway

through AWS Load Balancers.

---

# 5. Architecture

```
Internet

↓

Cloud Load Balancer

↓

NodePort

↓

ClusterIP

↓

Pods
```

Important

A LoadBalancer Service internally creates a NodePort unless disabled by the cloud implementation.

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
