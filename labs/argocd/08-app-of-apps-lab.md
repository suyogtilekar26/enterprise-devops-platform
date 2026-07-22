# Lab 08 - App of Apps Pattern

# Enterprise DevOps Platform

---

# Lab Objective

In this lab you will learn how to:

- Understand the App of Apps pattern
- Deploy multiple applications using one parent application
- Manage enterprise GitOps repositories
- Verify child application deployment
- Understand production use cases

---

# Prerequisites

- Labs 01 to 07 Completed
- ArgoCD Installed
- Kubernetes Cluster Running
- Git Repository

---

# What is App of Apps?

App of Apps is an ArgoCD design pattern where a single parent application manages multiple child applications.

Instead of deploying applications individually, ArgoCD deploys one parent application that automatically creates all required child applications.

---

# Why App of Apps?

Enterprise environments usually contain many applications.

Example

- Frontend
- API Gateway
- Auth Service
- Dashboard Service
- PostgreSQL
- Redis
- Monitoring
- Logging

Managing each application separately becomes difficult.

App of Apps solves this problem.

---

# Architecture

```
Git Repository

↓

Parent Application

↓

ArgoCD

↓

Child Applications

↓

Frontend

Backend

Database

Redis

Monitoring
```

---

# Enterprise Repository Structure

```
gitops/

├── parent-app/
│   └── application.yaml
│
├── frontend/
│   └── application.yaml
│
├── api-gateway/
│   └── application.yaml
│
├── auth-service/
│   └── application.yaml
│
├── dashboard-service/
│   └── application.yaml
│
├── postgres/
│   └── application.yaml
│
└── redis/
    └── application.yaml
```

---

# Step 1 - Create Parent Application

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: enterprise-platform
  namespace: argocd

spec:

  project: default

  source:
    repoURL: https://github.com/example/gitops.git
    targetRevision: HEAD
    path: applications

  destination:
    server: https://kubernetes.default.svc
    namespace: argocd

  syncPolicy:
    automated:
      prune: true
      selfHeal: true
```

---

# Step 2 - Create Child Application

Example

Frontend

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application

metadata:
  name: frontend

spec:

  project: default

  source:
    repoURL: https://github.com/example/gitops.git
    path: frontend

  destination:
    server: https://kubernetes.default.svc
    namespace: frontend
```

---

# Step 3 - Create More Child Applications

Create

- frontend
- api-gateway
- auth-service
- dashboard-service
- postgres
- redis

Each application should have its own manifest.

---

# Step 4 - Commit Changes

```bash
git add .
```

```bash
git commit -m "Added App of Apps"
```

```bash
git push origin main
```

---

# Step 5 - Deploy Parent Application

```bash
kubectl apply -f parent-application.yaml
```

---

# Step 6 - Verify Parent Application

```bash
argocd app list
```

Expected

```
enterprise-platform
```

---

# Step 7 - Observe Child Applications

After a few moments

```bash
argocd app list
```

Expected

```
enterprise-platform

frontend

api-gateway

auth-service

dashboard-service

postgres

redis
```

---

# Step 8 - Verify Kubernetes Resources

```bash
kubectl get applications -n argocd
```

Expected

All child applications should be created.

---

# Step 9 - Verify Synchronization

```bash
argocd app get enterprise-platform
```

Expected

```
Synced

Healthy
```

Repeat for child applications.

---

# Step 10 - Verify Deployments

```bash
kubectl get deployments --all-namespaces
```

Expected

Deployments for all applications should exist.

---

# Commands Used

List Applications

```bash
argocd app list
```

Application Details

```bash
argocd app get enterprise-platform
```

Deploy Parent

```bash
kubectl apply -f parent-application.yaml
```

View Applications

```bash
kubectl get applications -n argocd
```

---

# Expected Output

```
Parent Application

↓

Child Applications Created

↓

Applications Synced

↓

Applications Healthy
```

---

# Troubleshooting

## Child Applications Not Created

Verify

- Repository Path
- Repository URL
- YAML Syntax

---

## Parent Application OutOfSync

Run

```bash
argocd app sync enterprise-platform
```

---

## Child Application Failed

Check

```bash
argocd app get <application>
```

---

## Repository Error

Verify

```bash
argocd repo list
```

---

# Best Practices

- Use one parent application per platform.
- Keep each service in a separate directory.
- Enable Auto Sync.
- Enable Self Healing.
- Use Sync Waves for dependency management.
- Protect Git branches.
- Use Pull Requests.

---

# Real Production Example

Enterprise DevOps Platform

```
Parent Application

↓

Frontend

↓

API Gateway

↓

Auth Service

↓

Dashboard Service

↓

PostgreSQL

↓

Redis

↓

Prometheus

↓

Grafana

↓

Ingress Controller
```

A single Git commit can update the entire platform.

---

# Interview Questions

## 1. What is App of Apps?

A GitOps design pattern where one parent ArgoCD Application manages multiple child Applications.

---

## 2. Why use App of Apps?

To centrally manage large numbers of applications in enterprise environments.

---

## 3. What happens when the parent application is synchronized?

ArgoCD creates or updates all child applications automatically.

---

## 4. Can child applications have independent sync policies?

Yes.

Each child application can have its own configuration.

---

## 5. Difference between App of Apps and ApplicationSet?

App of Apps manages multiple applications using a parent Application.

ApplicationSet automatically generates Applications from templates and generators.

---

# Lab Success Criteria

You have successfully completed this lab if:

- Parent application is created.
- Child applications are automatically deployed.
- All applications are Synced.
- All applications are Healthy.
- You understand how App of Apps is used in enterprise GitOps.

---

# Marathi Quick Revision

- App of Apps म्हणजे Parent Application.
- Parent Application अनेक Child Applications तयार करतो.
- Enterprise मध्ये सर्व Services एकाच Parent मधून Manage होतात.
- Git Commit केल्यावर सर्व Applications Update होऊ शकतात.
- मोठ्या GitOps Projects साठी हा सर्वोत्तम Pattern आहे.

