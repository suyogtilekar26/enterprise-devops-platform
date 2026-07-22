# Lab 15 - Enterprise Production GitOps Workflow

# Enterprise DevOps Platform

---

# Lab Objective

In this lab you will learn how to:

- Implement an Enterprise GitOps Workflow
- Deploy applications across environments
- Promote releases from Dev to Production
- Understand Git branching strategy
- Perform production deployment using ArgoCD
- Rollback production deployment
- Follow GitOps best practices

---

# Prerequisites

- Labs 01 to 14 Completed
- ArgoCD Installed
- Git Repository
- Multiple Kubernetes Environments
- CI Pipeline (GitHub Actions / Jenkins)

---

# Enterprise Architecture

```
Developer

↓

Feature Branch

↓

Pull Request

↓

Code Review

↓

Merge

↓

CI Pipeline

↓

Docker Image

↓

Container Registry

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
```

---

# Enterprise Repository Structure

```
gitops/

├── development/
│   └── guestbook
│
├── qa/
│   └── guestbook
│
├── uat/
│   └── guestbook
│
└── production/
    └── guestbook
```

---

# Git Branch Strategy

```
main

↓

release

↓

hotfix

↓

feature/*
```

---

# Deployment Flow

```
Developer

↓

Git Commit

↓

CI Pipeline

↓

Docker Build

↓

Push Image

↓

Update GitOps Repository

↓

ArgoCD Detects Change

↓

Deployment

↓

Health Check

↓

Production Ready
```

---

# Step 1 - Verify Current Application

```bash
argocd app list
```

Expected

```
Healthy

Synced
```

---

# Step 2 - Create Feature Branch

```bash
git checkout -b feature/login-page
```

---

# Step 3 - Modify Application

Example

```yaml
image:

  tag: v2.0.0
```

---

# Step 4 - Commit Changes

```bash
git add .
```

```bash
git commit -m "Updated application image"
```

---

# Step 5 - Push Branch

```bash
git push origin feature/login-page
```

---

# Step 6 - Create Pull Request

Review

- Code
- Security
- YAML
- Image Tag
- Helm/Kustomize Changes

Merge into

```
main
```

---

# Step 7 - CI Pipeline

Pipeline

```
Checkout

↓

Build

↓

Unit Test

↓

Security Scan

↓

Docker Build

↓

Docker Push

↓

Update GitOps Repository
```

---

# Step 8 - ArgoCD Detects Change

Application becomes

```
Refreshing

↓

Syncing

↓

Healthy
```

---

# Step 9 - Verify Deployment

```bash
argocd app get guestbook
```

Expected

```
Healthy

Synced
```

---

# Step 10 - Verify Kubernetes

```bash
kubectl get deployment
```

---

# Step 11 - Verify Pods

```bash
kubectl get pods
```

Expected

```
Running
```

---

# Step 12 - Verify Image

```bash
kubectl describe deployment guestbook
```

Check

```
Image

v2.0.0
```

---

# Step 13 - Production Promotion

```
Development

↓

QA

↓

UAT

↓

Production
```

Each promotion happens through Git.

---

# Step 14 - Rollback

View History

```bash
argocd app history guestbook
```

Rollback

```bash
argocd app rollback guestbook 2
```

---

# Commands Used

Applications

```bash
argocd app list
```

Details

```bash
argocd app get guestbook
```

History

```bash
argocd app history guestbook
```

Rollback

```bash
argocd app rollback guestbook 2
```

Deployments

```bash
kubectl get deployment
```

Pods

```bash
kubectl get pods
```

---

# Production Deployment Checklist

Before Deployment

- Code Review Completed
- CI Passed
- Security Scan Passed
- Image Built
- Image Pushed
- Git Updated
- PR Approved

After Deployment

- Application Healthy
- Pods Running
- Logs Clean
- Metrics Normal
- Alerts Normal
- Smoke Test Passed

---

# Expected Output

```
Developer

↓

Git

↓

CI

↓

Docker

↓

GitOps Repository

↓

ArgoCD

↓

Production

↓

Healthy

↓

Synced
```

---

# Troubleshooting

## Deployment Failed

```bash
argocd app get guestbook
```

---

## Application Degraded

```bash
kubectl logs <pod>
```

---

## Wrong Image

```bash
kubectl describe deployment guestbook
```

---

## Rollback Required

```bash
argocd app rollback guestbook <history-id>
```

---

# Best Practices

- Git is the Single Source of Truth.
- Never deploy manually to Production.
- Use Pull Requests.
- Protect Main Branch.
- Enable Auto Sync.
- Enable Self Heal.
- Enable Notifications.
- Monitor Deployments.
- Test before Production.
- Always maintain rollback history.

---

# Real Production Example

Enterprise Platform

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

Prometheus

↓

Grafana

↓

Ingress
```

Every deployment follows the same GitOps workflow.

---

# Interview Questions

## 1. What is a Production GitOps Workflow?

A deployment process where Git controls all production changes and ArgoCD continuously synchronizes the Kubernetes cluster.

---

## 2. Why should Production changes happen through Git?

Git provides version control, auditing, approvals and rollback capabilities.

---

## 3. What happens after a Pull Request is merged?

The CI pipeline builds the application, updates the GitOps repository and ArgoCD deploys the changes.

---

## 4. How do you rollback a failed Production deployment?

```bash
argocd app rollback guestbook <history-id>
```

---

## 5. What are the key Production GitOps best practices?

- Git as Source of Truth
- Pull Request Reviews
- Protected Branches
- Automated Testing
- Auto Sync
- Self Healing
- Rollback Strategy
- Monitoring
- Notifications

---

# Lab Success Criteria

You have successfully completed this lab if:

- Feature branch is created.
- Changes are merged through Pull Request.
- CI pipeline updates GitOps repository.
- ArgoCD deploys automatically.
- Production deployment is Healthy and Synced.
- Rollback is successfully tested.

---

# Marathi Quick Revision

- Production मध्ये Direct Deployment करू नका.
- सर्व Changes Git मधूनच करा.
- Pull Request Review आवश्यक आहे.
- CI Pipeline Image Build करते.
- ArgoCD Git मधून Deployment करतो.
- Production मध्ये Auto Sync, Self Heal आणि Notifications Enable ठेवा.
- Rollback नेहमी Test करा.

