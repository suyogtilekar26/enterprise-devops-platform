# Lab 02 - Deploy Your First ArgoCD Application

# Enterprise DevOps Platform

---

# Lab Objective

In this lab you will learn how to:

- Create your first ArgoCD Application
- Connect ArgoCD with a Git repository
- Deploy an application
- Understand Sync Status
- Understand Health Status
- Verify deployment

---

# Prerequisites

- Lab 01 completed
- ArgoCD Installed
- Kubernetes Cluster Running
- GitHub Repository
- kubectl
- ArgoCD CLI

---

# Architecture

```
Developer

↓

Git Repository

↓

ArgoCD

↓

Kubernetes

↓

Deployment

↓

Pods

↓

Service
```

---

# Demo Application

We will deploy the Guestbook application provided by ArgoCD.

Repository

```
https://github.com/argoproj/argocd-example-apps.git
```

Application Path

```
guestbook
```

Destination Namespace

```
default
```

---

# Step 1 - Open ArgoCD UI

Open

```
https://localhost:8080
```

Login using

```
admin
```

---

# Step 2 - Create New Application

Click

```
NEW APP
```

Fill the details

Application Name

```
guestbook
```

Project

```
default
```

Sync Policy

```
Manual
```

Repository URL

```
https://github.com/argoproj/argocd-example-apps.git
```

Revision

```
HEAD
```

Path

```
guestbook
```

Cluster

```
https://kubernetes.default.svc
```

Namespace

```
default
```

Click

```
Create
```

---

# Step 3 - Observe Application

Initially

```
OutOfSync
```

Reason

Resources exist in Git but are not yet deployed.

---

# Step 4 - Synchronize

Click

```
SYNC
```

Select

```
Synchronize
```

Wait for deployment.

---

# Step 5 - Verify Status

Expected

```
Sync Status

Synced
```

```
Health Status

Healthy
```

---

# Step 6 - Verify Deployment

```bash
kubectl get deployment
```

Expected

```
guestbook-ui
```

---

# Step 7 - Verify Pods

```bash
kubectl get pods
```

Expected

```
Running
```

---

# Step 8 - Verify Service

```bash
kubectl get svc
```

Expected

```
guestbook-ui
```

---

# Step 9 - View Application Details

Using CLI

```bash
argocd app list
```

---

Application Details

```bash
argocd app get guestbook
```

---

# Step 10 - View Kubernetes Resources

```bash
kubectl get all
```

Expected

Deployment

Pods

ReplicaSet

Service

---

# Understanding Status

## Sync Status

Shows whether

```
Git

=

Cluster
```

Possible Values

- Synced
- OutOfSync
- Unknown

---

## Health Status

Shows application runtime.

Possible Values

- Healthy
- Progressing
- Degraded
- Suspended
- Missing

---

# Validation

Application

```bash
argocd app list
```

Deployment

```bash
kubectl get deployment
```

Pods

```bash
kubectl get pods
```

Service

```bash
kubectl get svc
```

---

# Expected Output

Application should display

```
Synced

Healthy
```

Pods

```
Running
```

No Errors

---

# Troubleshooting

## Application Stuck in OutOfSync

Run

```bash
argocd app sync guestbook
```

---

## Pods Pending

Check

```bash
kubectl describe pod <pod>
```

---

## Application Degraded

Check

```bash
kubectl logs <pod>
```

---

## Resources Not Created

Verify

Repository URL

Application Path

Namespace

---

# Best Practices

- Store manifests in Git.
- Use meaningful application names.
- Deploy to dedicated namespaces.
- Validate manifests before syncing.
- Monitor Sync and Health status.
- Avoid manual changes in Kubernetes.

---

# Interview Questions

## 1. What is an ArgoCD Application?

An ArgoCD Application is a Custom Resource that defines how an application is deployed from Git to Kubernetes.

---

## 2. Why is the application initially OutOfSync?

Because resources exist in Git but have not yet been deployed to the cluster.

---

## 3. What happens during Sync?

ArgoCD applies Kubernetes manifests from Git to the cluster.

---

## 4. Difference between Sync Status and Health Status?

Sync Status compares Git with Kubernetes.

Health Status checks whether the application is running correctly.

---

## 5. Which command displays application details?

```bash
argocd app get guestbook
```

---

# Lab Success Criteria

You have successfully completed this lab if

- Application is created.
- Sync completed successfully.
- Health is Healthy.
- Pods are Running.
- Service is created.
- CLI displays application details.

---

# Marathi Quick Revision

- Git Repository जोडा.
- Application तयार करा.
- Sync करा.
- Deployment Verify करा.
- Pods तपासा.
- Service तपासा.
- Health = Healthy पाहिजे.
- Sync = Synced पाहिजे.
- आता GitOps Deployment यशस्वी झाला.

