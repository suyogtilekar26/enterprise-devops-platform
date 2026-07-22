# Lab 18 - End-to-End Enterprise GitOps Project

# Enterprise DevOps Platform

---

# Lab Objective

In this capstone-style lab you will build and deploy a complete enterprise application using ArgoCD GitOps.

You will:

- Create a GitOps repository
- Deploy multiple microservices
- Configure Helm/Kustomize
- Configure ArgoCD Applications
- Enable Auto Sync
- Enable Self Heal
- Validate Production Deployment
- Simulate failures
- Recover automatically

---

# Prerequisites

- Labs 01 to 17 Completed
- Kubernetes Cluster
- ArgoCD Installed
- Git Repository
- Container Registry
- kubectl
- argocd CLI

---

# Project Overview

Deploy the Enterprise DevOps Platform.

Components

```
React Frontend

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

Ingress

↓

Prometheus

↓

Grafana
```

---

# Enterprise Architecture

```
Developer

↓

Git Repository

↓

CI Pipeline

↓

Container Registry

↓

GitOps Repository

↓

ArgoCD

↓

Kubernetes

↓

Production
```

---

# Repository Structure

```
enterprise-gitops/

├── frontend/
│
├── api-gateway/
│
├── auth-service/
│
├── dashboard-service/
│
├── postgres/
│
├── redis/
│
├── ingress/
│
├── monitoring/
│
└── applications/
```

---

# Step 1 - Verify Cluster

```bash
kubectl get nodes
```

Expected

```
Ready
```

---

# Step 2 - Verify ArgoCD

```bash
argocd app list
```

Expected

```
Healthy

Synced
```

---

# Step 3 - Create Namespace

```bash
kubectl create namespace enterprise
```

---

# Step 4 - Create Git Repository Structure

```
frontend/

api-gateway/

auth-service/

dashboard-service/

postgres/

redis/

monitoring/

ingress/
```

Commit

```bash
git add .
```

```bash
git commit -m "Initial GitOps Repository"
```

```bash
git push origin main
```

---

# Step 5 - Create Applications

Applications

```
frontend

api-gateway

auth-service

dashboard-service

postgres

redis

monitoring
```

Each service should have its own ArgoCD Application.

---

# Step 6 - Apply Applications

```bash
kubectl apply -f applications/
```

---

# Step 7 - Verify Applications

```bash
argocd app list
```

Expected

```
frontend

Healthy

Synced

----------------

api-gateway

Healthy

Synced

----------------

auth-service

Healthy

Synced

----------------

dashboard-service

Healthy

Synced

----------------

postgres

Healthy

Synced

----------------

redis

Healthy

Synced
```

---

# Step 8 - Verify Kubernetes

```bash
kubectl get all -n enterprise
```

Verify

- Pods
- Services
- Deployments
- ReplicaSets

---

# Step 9 - Verify Ingress

```bash
kubectl get ingress -n enterprise
```

Expected

```
ADDRESS

HOST

READY
```

---

# Step 10 - Verify Monitoring

```bash
kubectl get pods -n monitoring
```

Verify

```
Prometheus

Running

Grafana

Running
```

---

# Step 11 - Simulate Configuration Change

Update image tag

```yaml
image:

  tag: v2.0.0
```

Commit

```bash
git add .
```

```bash
git commit -m "Updated Frontend"
```

```bash
git push origin main
```

---

# Step 12 - Observe Auto Sync

Expected

```
Git Push

↓

ArgoCD Detects Change

↓

Sync

↓

Deployment Updated

↓

Healthy
```

---

# Step 13 - Simulate Failure

Delete Deployment

```bash
kubectl delete deployment frontend \
-n enterprise
```

---

# Step 14 - Verify Self Heal

```bash
argocd app get frontend
```

Expected

```
OutOfSync

↓

Syncing

↓

Healthy

↓

Deployment Recreated
```

---

# Step 15 - Simulate Rollback

View History

```bash
argocd app history frontend
```

Rollback

```bash
argocd app rollback frontend 1
```

Verify

```
Healthy

Synced
```

---

# Step 16 - Validate Entire Platform

Frontend

```bash
kubectl get deployment frontend \
-n enterprise
```

API Gateway

```bash
kubectl get deployment api-gateway \
-n enterprise
```

Auth Service

```bash
kubectl get deployment auth-service \
-n enterprise
```

Dashboard

```bash
kubectl get deployment dashboard-service \
-n enterprise
```

Database

```bash
kubectl get deployment postgres \
-n enterprise
```

Redis

```bash
kubectl get deployment redis \
-n enterprise
```

---

# Step 17 - Validate Logs

```bash
kubectl logs deployment/frontend \
-n enterprise
```

Repeat for all services.

---

# Commands Used

Applications

```bash
argocd app list
```

Application Details

```bash
argocd app get frontend
```

History

```bash
argocd app history frontend
```

Rollback

```bash
argocd app rollback frontend 1
```

Resources

```bash
kubectl get all -n enterprise
```

Pods

```bash
kubectl get pods -n enterprise
```

Logs

```bash
kubectl logs deployment/frontend \
-n enterprise
```

---

# Expected Output

```
Developer

↓

Git Commit

↓

CI Pipeline

↓

Container Registry

↓

GitOps Repository

↓

ArgoCD

↓

Kubernetes

↓

Application Running

↓

Healthy

↓

Synced
```

---

# Production Validation Checklist

Infrastructure

- Cluster Healthy
- Nodes Ready
- Storage Available

Applications

- Frontend Running
- API Gateway Running
- Auth Running
- Dashboard Running
- PostgreSQL Running
- Redis Running

GitOps

- Auto Sync Enabled
- Self Heal Enabled
- Repository Reachable

Monitoring

- Prometheus Running
- Grafana Running

Operations

- Logs Available
- Metrics Available
- Alerts Configured

---

# Best Practices

- One Application per Service.
- Git is the Single Source of Truth.
- Never modify Production manually.
- Use Pull Requests.
- Enable Auto Sync.
- Enable Self Heal.
- Configure Notifications.
- Protect Production Branches.
- Monitor every deployment.
- Test rollback regularly.

---

# Enterprise Workflow

```
Code

↓

Pull Request

↓

Review

↓

CI

↓

Docker Image

↓

GitOps Repository

↓

ArgoCD

↓

Development

↓

QA

↓

UAT

↓

Production

↓

Monitoring

↓

Alerts

↓

Continuous Improvement
```

---

# Interview Questions

## 1. What is an end-to-end GitOps workflow?

A workflow where application changes move from Git through CI/CD into Kubernetes using ArgoCD as the deployment engine.

---

## 2. Why should every microservice have its own ArgoCD Application?

It enables independent deployment, rollback, monitoring and access control.

---

## 3. What happens when a Deployment is deleted manually?

ArgoCD detects the drift and recreates the Deployment if Auto Sync and Self Heal are enabled.

---

## 4. What validates a successful production deployment?

Healthy applications, synchronized state, successful health checks, monitoring data and passing smoke tests.

---

## 5. What are the key components of an enterprise GitOps platform?

- Git Repository
- CI Pipeline
- Container Registry
- ArgoCD
- Kubernetes
- Monitoring
- Notifications
- Rollback Strategy

---

# Lab Success Criteria

You have successfully completed this lab if:

- All platform components are deployed.
- Applications remain Healthy and Synced.
- Auto Sync works correctly.
- Self Heal restores deleted resources.
- Rollback is successful.
- Monitoring components are operational.
- You understand an end-to-end enterprise GitOps workflow.

---

# Marathi Quick Revision

- हा पूर्ण Enterprise GitOps Project आहे.
- प्रत्येक Microservice साठी स्वतंत्र ArgoCD Application तयार करा.
- Git मधूनच सर्व Deployments करा.
- Auto Sync आणि Self Heal Enable ठेवा.
- Monitoring, Rollback आणि Notifications Production साठी आवश्यक आहेत.
- Enterprise मध्ये GitOps हा पूर्ण Deployment Lifecycle नियंत्रित करतो.

