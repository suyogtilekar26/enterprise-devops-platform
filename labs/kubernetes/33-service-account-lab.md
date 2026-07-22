# Lab 33 - Kubernetes Service Accounts

# 1. Objective

The objective of this lab is to understand Kubernetes Service Accounts, how Pods authenticate with the Kubernetes API, and how enterprise applications securely access cluster resources.

By the end of this lab you will be able to

- Create Service Accounts
- Assign Service Accounts to Pods
- Understand Service Account tokens
- Verify Pod authentication
- Troubleshoot authentication issues
- Explain enterprise workload identity
- Differentiate Users and Service Accounts

Service Accounts provide identities for applications running inside Kubernetes.

---

# 2. Prerequisites

Complete

- Lab 01 - Lab 32

Verify

```bash
kubectl get serviceaccounts

kubectl get nodes

kubectl get pods
```

---

# 3. Enterprise Usage

Enterprise workloads using Service Accounts

```
Argo CD

↓

Deploy Applications
```

```
Prometheus

↓

Read Cluster Metrics
```

```
External Secrets Operator

↓

Read Secrets
```

```
AWS Load Balancer Controller

↓

Manage Load Balancers
```

```
Cert Manager

↓

Manage Certificates
```

Every production application should run using its own Service Account.

---

# 4. Usage in THIS Project

Future project architecture

```
API Gateway

↓

Service Account

↓

Read ConfigMaps
```

```
Prometheus

↓

Service Account

↓

Read Metrics
```

```
Argo CD

↓

Service Account

↓

Deploy Applications
```

```
Dashboard

↓

Service Account

↓

Read Application Resources
```

---

# 5. Architecture

```
Pod

↓

Service Account

↓

API Server

↓

Authentication

↓

RBAC

↓

Resource Access
```

---

# 6. Step-by-Step Implementation

## Step 1

View Existing Service Accounts

```bash
kubectl get serviceaccounts
```

Expected

```
default
```

---

## Step 2

Create Service Account

```bash
kubectl create serviceaccount app-service-account
```

Verify

```bash
kubectl get serviceaccounts
```

Expected

```
default

app-service-account
```

---

## Step 3

Describe Service Account

```bash
kubectl describe serviceaccount app-service-account
```

Observe

- Name
- Namespace
- Labels
- Mountable Secrets (version dependent)

---

## Step 4

Create Pod Using Service Account

```bash
cat > service-account-pod.yaml <<EOF
apiVersion: v1
kind: Pod
metadata:
  name: sa-demo
spec:
  serviceAccountName: app-service-account

  containers:
  - name: nginx
    image: nginx:stable
