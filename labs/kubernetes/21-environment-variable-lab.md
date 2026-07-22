# Lab 21 - Environment Variables

# 1. Objective

The objective of this lab is to understand how Kubernetes injects configuration into containers using environment variables from ConfigMaps, Secrets, and direct values.

By the end of this lab you will be able to

- Configure static environment variables
- Inject ConfigMap values
- Inject Secret values
- Use envFrom
- Verify runtime configuration
- Troubleshoot environment variable issues
- Understand enterprise configuration patterns

Environment variables are the most common method for passing runtime configuration to containerized applications.

---

# 2. Prerequisites

Complete

- Lab 01 - Lab 20

Verify

```bash
kubectl get nodes

kubectl get pods

kubectl get configmap

kubectl get secrets
```

---

# 3. Enterprise Usage

Applications should never hardcode

- URLs
- Credentials
- Environment Names
- Feature Flags
- Logging Levels

Instead

```
Deployment

↓

Environment Variables

↓

Application
```

Configuration Sources

```
Static Values

↓

ConfigMaps

↓

Secrets
```

---

# 4. Usage in THIS Project

Frontend

```
API_URL

↓

ConfigMap
```

API Gateway

```
AUTH_SERVICE_URL

↓

ConfigMap
```

```
JWT_SECRET

↓

Secret
```

Dashboard

```
LOG_LEVEL

↓

ConfigMap
```

Production deployments will inject all runtime configuration through Kubernetes environment variables.

---

# 5. Architecture

```
Deployment

↓

ConfigMap

↓

Secret

↓

Environment Variables

↓

Container

↓

Application
```

---

# 6. Step-by-Step Implementation

## Step 1

Create ConfigMap

```bash
kubectl create configmap app-config \
--from-literal=APP_NAME=EnterpriseDevOpsPlatform \
--from-literal=ENVIRONMENT=development \
--from-literal=LOG_LEVEL=INFO
```

Verify

```bash
kubectl get configmap

kubectl describe configmap app-config
```

---

## Step 2

Create Secret

```bash
kubectl create secret generic app-secret \
--from-literal=DB_PASSWORD=MyPassword123 \
--from-literal=JWT_SECRET=VerySecretKey
```

Verify

```bash
kubectl get secrets

kubectl describe secret app-secret
```

---

## Step 3

Create Deployment

```bash
cat > deployment.yaml <<EOF
apiVersion: apps/v1
kind: Deployment
metadata:
  name: env-demo
spec:
  replicas: 1
  selector:
    matchLabels:
      app: env-demo
  template:
    metadata:
      labels:
        app: env-demo
    spec:
      containers:
      - name: busybox
        image: busybox:1.36
        command:
        - sh
        - -c
        - sleep 3600

        env:

        - name: COMPANY
          value: OpenAI-Lab

        - name: APP_NAME
          valueFrom:
            configMapKeyRef:
              name: app-config
              key: APP_NAME

        - name: ENVIRONMENT
          valueFrom:
            configMapKeyRef:
              name: app-config
              key: ENVIRONMENT

        - name: LOG_LEVEL
          valueFrom:
            configMapKeyRef:
              name: app-config
              key: LOG_LEVEL

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
