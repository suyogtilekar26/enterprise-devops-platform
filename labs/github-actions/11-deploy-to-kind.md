# Lab 11 - Deploy to Kind Kubernetes using GitHub Actions

# Objective

Learn how to deploy a containerized application to a local Kind Kubernetes cluster using GitHub Actions.

This lab simulates the deployment stage of our Enterprise DevOps Platform.

After completing this lab, you will be able to

- Configure kubectl in GitHub Actions
- Verify Kubernetes connectivity
- Deploy application manifests
- Verify Pods and Services
- Perform basic health checks

---

# Enterprise Scenario

In our project, after Docker images are pushed to GitHub Container Registry (GHCR), the deployment pipeline will

```
Build

↓

Push Docker Image

↓

Deploy to Kubernetes

↓

Verify Deployment

↓

Health Check

↓

Application Ready
```

This lab focuses on the Kubernetes deployment phase.

---

# Lab Architecture

```
Developer

↓

Push Code

↓

GitHub Actions

↓

Self-hosted Runner

↓

kubectl

↓

Kind Cluster

↓

Deployment

↓

Pods

↓

Services
```

---

# Prerequisites

- Docker installed
- Kind cluster running
- kubectl installed
- Self-hosted Runner configured
- Kubernetes manifests available

Example directory

```
kubernetes/

├── deployment.yaml

└── service.yaml
```

---

# Step 1: Verify Kind Cluster

```bash
kind get clusters
```

Expected

```
kind
```

---

# Step 2: Verify Kubernetes Nodes

```bash
kubectl get nodes
```

Expected

```
NAME                 STATUS

kind-control-plane   Ready
```

---

# Step 3: Verify Current Context

```bash
kubectl config current-context
```

Expected

```
kind-kind
```

---

# Step 4: Create Workflow

```bash
nano .github/workflows/deploy-kind.yml
```

---

# Step 5: Add Workflow

```yaml
name: Deploy to Kind

on:
  push:
    branches:
      - main

jobs:

  deploy:

    runs-on: self-hosted

    steps:

      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Verify Kubernetes Connection
        run: kubectl get nodes

      - name: Apply Deployment
        run: kubectl apply -f kubernetes/deployment.yaml

      - name: Apply Service
        run: kubectl apply -f kubernetes/service.yaml

      - name: Verify Pods
        run: kubectl get pods

      - name: Verify Services
        run: kubectl get svc
```

Save the file.

---

# Step 6: Verify Workflow

```bash
cat .github/workflows/deploy-kind.yml
```

---

# Step 7: Commit Changes

```bash
git add .

git commit -m "Add Kind deployment workflow"
```

---

# Step 8: Push Changes

```bash
git push origin main
```

---

# Step 9: Observe Workflow

Navigate to

```
Repository

↓

Actions

↓

Deploy to Kind
```

Expected Steps

```
Checkout Repository

↓

Verify Kubernetes

↓

Apply Deployment

↓

Apply Service

↓

Verify Pods

↓

Verify Services
```

---

# Step 10: Verify Deployment

Check Deployments

```bash
kubectl get deployments
```

---

Check Pods

```bash
kubectl get pods
```

---

Check Services

```bash
kubectl get svc
```

---

Describe Deployment

```bash
kubectl describe deployment
```

---

# Workflow Execution

```
Push

↓

GitHub Actions

↓

Self-hosted Runner

↓

kubectl apply

↓

Deployment Created

↓

Pods Running

↓

Services Available
```

---

# Validation Checklist

Verify

- Workflow completed
- Self-hosted Runner used
- Kubernetes connection successful
- Deployment created
- Pods running
- Services available

---

# Common Errors

## Runner Offline

Cause

Self-hosted Runner not running.

Start

```bash
./run.sh
```

---

## kubectl Not Found

Cause

kubectl not installed on the Runner.

Verify

```bash
kubectl version --client
```

---

## Cluster Not Reachable

Cause

Kind cluster stopped.

Verify

```bash
kind get clusters
```

---

## Deployment Failed

Cause

Invalid manifest.

Validate

```bash
kubectl apply --dry-run=client -f kubernetes/deployment.yaml
```

---

## Pods Not Ready

Cause

Application startup failure.

Investigate

```bash
kubectl describe pod <pod-name>

kubectl logs <pod-name>
```

---

# Troubleshooting

Verify cluster

```bash
kubectl cluster-info
```

Verify nodes

```bash
kubectl get nodes
```

Verify deployments

```bash
kubectl get deployments
```

Verify pods

```bash
kubectl get pods
```

Verify services

```bash
kubectl get svc
```

---

# Enterprise Example

Production deployment pipeline

```
Checkout

↓

Docker Pull

↓

Helm Upgrade

↓

Rolling Update

↓

Readiness Check

↓

Health Check

↓

Deployment Successful
```

Our project will eventually replace raw manifests with Helm charts for deployment management.

---

# Best Practices

Always

- Verify cluster connectivity
- Validate manifests before deployment
- Check Pod readiness
- Review deployment events
- Perform health checks after deployment

Never

- Deploy without verification
- Ignore failed Pods
- Skip post-deployment validation
- Deploy directly to production without testing

---

# Expected Result

You should successfully

- Connect GitHub Actions to Kind
- Deploy Kubernetes manifests
- Verify Deployments, Pods, and Services
- Understand the deployment phase of CI/CD
- Prepare for Helm-based deployments

---

# Lab Summary

In this lab you learned

- GitHub Actions deployment
- Self-hosted Runner deployment
- kubectl integration
- Kind Kubernetes deployment
- Deployment verification
- Enterprise Kubernetes deployment workflow

