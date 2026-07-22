# Lab 20 - Kubernetes Secrets

# 1. Objective

The objective of this lab is to understand how Kubernetes Secrets securely store and provide sensitive information to applications.

By the end of this lab you will be able to

- Create Kubernetes Secrets
- Use Secrets as Environment Variables
- Mount Secrets as Volumes
- Verify Secret consumption
- Troubleshoot Secret issues
- Understand enterprise secret management
- Compare Secrets with ConfigMaps

Secrets should always be used for sensitive information instead of ConfigMaps.

---

# 2. Prerequisites

Complete

- Lab 01 - Lab 19

Verify

```bash
kubectl get nodes

kubectl get pods

kubectl get secrets
```

---

# 3. Enterprise Usage

Instead of embedding passwords inside

- Source Code
- Docker Images
- ConfigMaps
- Deployment YAML

Applications retrieve secrets securely.

```
Application

↓

Kubernetes Secret

↓

Runtime

↓

Authentication
```

Typical Secrets

- Database Passwords
- JWT Secret Keys
- API Keys
- OAuth Credentials
- TLS Certificates
- Registry Credentials

Benefits

- Separation of Sensitive Data
- Better Access Control
- RBAC Integration
- Easier Secret Rotation

---

# 4. Usage in THIS Project

Future project

```
Frontend

↓

No Secrets
```

```
API Gateway

↓

JWT_SECRET

↓

Secret
```

```
Auth Service

↓

DATABASE_PASSWORD

↓

Secret
```

```
Dashboard Service

↓

API_KEY

↓

Secret
```

Configuration

```
ConfigMap
```

Sensitive Data

```
Secret
```

---

# 5. Architecture

```
Secret

↓

Deployment

↓

Environment Variable

or

Mounted Volume

↓

Application
```

---

# 6. Step-by-Step Implementation

## Step 1

Create Secret

```bash
kubectl create secret generic app-secret \
--from-literal=DB_USERNAME=admin \
--from-literal=DB_PASSWORD=SuperSecret123 \
--from-literal=JWT_SECRET=my-secret-key
```

---

## Step 2

Verify Secret

```bash
kubectl get secrets

kubectl describe secret app-secret
```

Observe

- Name
- Type
- Data Count

Secret values are not displayed.

---

## Step 3

View Encoded Secret

```bash
kubectl get secret app-secret -o yaml
```

Observe

```
data:
```

Values are Base64 encoded.

---

## Step 4

Decode Secret

```bash
kubectl get secret app-secret \
-o jsonpath='{.data.DB_PASSWORD}' | base64 --decode
```

Expected

```
SuperSecret123
```

---

## Step 5

Create Deployment

```bash
cat > deployment.yaml <<EOF
apiVersion: apps/v1
kind: Deployment
metadata:
  name: secret-demo
spec:
  replicas: 1
  selector:
    matchLabels:
      app: secret-demo
  template:
    metadata:
      labels:
        app: secret-demo
    spec:
      containers:
      - name: demo
        image: busybox:1.36
        command:
        - sh
        - -c
        - sleep 3600
        env:
        - name: DB_USERNAME
          valueFrom:
            secretKeyRef:
              name: app-secret
              key: DB_USERNAME
        - name: DB_PASSWORD
          valueFrom:
            secretKeyRef:
              name: app-secret
              key: DB_PASSWORD
        - name: JWT_SECRET
          valueFrom:
            secretKeyRef:
              name: app-secret
              key: JWT_SECRET
