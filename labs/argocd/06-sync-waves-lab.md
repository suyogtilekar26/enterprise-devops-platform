# Lab 06 - Sync Waves

# Enterprise DevOps Platform

---

# Lab Objective

In this lab you will learn how to:

- Understand Sync Waves
- Control deployment order
- Deploy dependent applications
- Verify resource sequencing
- Troubleshoot deployment ordering issues

---

# Prerequisites

- Labs 01–05 Completed
- ArgoCD Installed
- Kubernetes Cluster Running
- Basic understanding of Kubernetes manifests

---

# What are Sync Waves?

Sync Waves allow ArgoCD to deploy Kubernetes resources in a predefined order.

Resources with lower wave numbers are deployed before higher wave numbers.

---

# Why Sync Waves?

Many applications have dependencies.

Example

```
Database

↓

Backend API

↓

Frontend
```

Without Sync Waves

- Frontend may start before Backend.
- Backend may start before Database.
- Application startup can fail.

With Sync Waves

Deployment happens in the correct sequence.

---

# Architecture

```
Git Repository

↓

ArgoCD

↓

Wave -1

↓

Wave 0

↓

Wave 1

↓

Wave 2

↓

Application Ready
```

---

# Sync Wave Annotation

```yaml
metadata:
  annotations:
    argocd.argoproj.io/sync-wave: "-1"
```

---

# Example Deployment Order

| Resource | Sync Wave |
|-----------|-----------|
| Namespace | -2 |
| ConfigMap | -1 |
| Secret | -1 |
| PostgreSQL | 0 |
| Redis | 0 |
| Backend API | 1 |
| Frontend | 2 |

---

# Step 1 - Create Namespace Manifest

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: enterprise-demo
  annotations:
    argocd.argoproj.io/sync-wave: "-2"
```

---

# Step 2 - Create ConfigMap

```yaml
metadata:
  name: app-config
  annotations:
    argocd.argoproj.io/sync-wave: "-1"
```

---

# Step 3 - Create Secret

```yaml
metadata:
  name: app-secret
  annotations:
    argocd.argoproj.io/sync-wave: "-1"
```

---

# Step 4 - PostgreSQL Deployment

```yaml
metadata:
  annotations:
    argocd.argoproj.io/sync-wave: "0"
```

---

# Step 5 - Redis Deployment

```yaml
metadata:
  annotations:
    argocd.argoproj.io/sync-wave: "0"
```

---

# Step 6 - Backend Deployment

```yaml
metadata:
  annotations:
    argocd.argoproj.io/sync-wave: "1"
```

---

# Step 7 - Frontend Deployment

```yaml
metadata:
  annotations:
    argocd.argoproj.io/sync-wave: "2"
```

---

# Step 8 - Commit Changes

```bash
git add .
```

```bash
git commit -m "Configure Sync Waves"
```

```bash
git push origin main
```

---

# Step 9 - Synchronize Application

```bash
argocd app sync guestbook
```

Observe deployment order in the ArgoCD UI.

---

# Step 10 - Verify Resources

```bash
kubectl get pods
```

Expected startup order

1. PostgreSQL
2. Redis
3. Backend
4. Frontend

---

# Step 11 - Verify Application

```bash
argocd app get guestbook
```

Expected

```
Synced

Healthy
```

---

# Commands Used

Synchronize

```bash
argocd app sync guestbook
```

Application Details

```bash
argocd app get guestbook
```

Pods

```bash
kubectl get pods
```

Events

```bash
kubectl get events
```

---

# Expected Output

Deployment order should follow Sync Waves.

Database starts first.

Backend starts after Database.

Frontend starts last.

Application

```
Healthy

Synced
```

---

# Troubleshooting

## Backend Starts Before Database

Verify

```yaml
argocd.argoproj.io/sync-wave
```

---

## Resources Deploy Together

Check annotation spelling.

---

## Application Degraded

Verify

```bash
kubectl logs <pod>
```

---

## Wrong Order

Check

```bash
kubectl describe deployment
```

---

# Best Practices

- Deploy Namespaces first.
- Deploy ConfigMaps and Secrets before applications.
- Deploy Databases before APIs.
- Deploy APIs before Frontend.
- Keep Sync Wave numbering simple.
- Document deployment dependencies.

---

# Real Production Example

An enterprise application contains

- PostgreSQL
- Redis
- Auth Service
- API Gateway
- Dashboard
- React Frontend

Recommended Sync Waves

| Resource | Wave |
|-----------|------|
| Namespace | -2 |
| ConfigMap | -1 |
| Secret | -1 |
| PostgreSQL | 0 |
| Redis | 0 |
| Auth Service | 1 |
| API Gateway | 2 |
| Dashboard Service | 2 |
| React Frontend | 3 |

---

# Interview Questions

## 1. What are Sync Waves?

Sync Waves define the deployment order of Kubernetes resources.

---

## 2. Which annotation is used?

```yaml
argocd.argoproj.io/sync-wave
```

---

## 3. Which wave deploys first?

The lowest numbered wave.

Example

```
-2
```

---

## 4. Why are Sync Waves important?

They ensure dependent applications start in the correct order.

---

## 5. Give a real production example.

Namespace → ConfigMap → Secret → Database → Backend → Frontend.

---

# Lab Success Criteria

You have successfully completed this lab if:

- Sync Waves are configured.
- Resources deploy in the expected order.
- Dependencies start successfully.
- Application becomes Synced and Healthy.
- You understand how Sync Waves solve deployment dependency issues.

---

# Marathi Quick Revision

- Sync Waves म्हणजे Deployment Order.
- Database आधी.
- Backend नंतर.
- Frontend शेवटी.
- Lower Number आधी Deploy होतो.
- `argocd.argoproj.io/sync-wave` Annotation वापरली जाते.
- Production मध्ये Dependency Management साठी Sync Waves खूप महत्त्वाच्या आहेत.

