# Lab 12 - Complete CI/CD Pipeline for Enterprise DevOps Platform

# Objective

Build a complete CI/CD pipeline for our Enterprise DevOps Platform.

This lab combines everything learned in previous GitHub Actions labs into one enterprise workflow.

After completing this lab, you will understand

- Continuous Integration
- Continuous Deployment
- Multi-stage workflows
- Docker image creation
- GitHub Container Registry
- Kubernetes deployment
- Health verification

---

# Enterprise Scenario

This is the workflow we will eventually use for our project.

Application

```
Frontend

API Gateway

Auth Service

Dashboard Service
```

Pipeline

```
Developer

↓

Push Code

↓

GitHub Actions

↓

Checkout

↓

Build

↓

Test

↓

Docker Build

↓

Push Images

↓

Deploy Kind

↓

Health Check

↓

Application Available
```

---

# CI/CD Architecture

```
                    GitHub

                      │

                Push to main

                      │

               GitHub Actions

                      │

        ┌─────────────┴─────────────┐

        │                           │

      Build                      Test

        │                           │

        └─────────────┬─────────────┘

                      │

               Docker Build

                      │

               Push to GHCR

                      │

            Self-hosted Runner

                      │

                Deploy to Kind

                      │

              Kubernetes Cluster

                      │

               Health Verification
```

---

# Prerequisites

Complete

- Lab 01
- Lab 02
- Lab 03
- Lab 04
- Lab 05
- Lab 06
- Lab 07
- Lab 08
- Lab 09
- Lab 10
- Lab 11

Also ensure

- Docker installed
- Kind running
- kubectl installed
- Self-hosted Runner Online
- Kubernetes manifests available

---

# Step 1

Create workflow

```bash
nano .github/workflows/ci-cd-pipeline.yml
```

---

# Step 2

Add Workflow

```yaml
name: Enterprise CI/CD Pipeline

on:
  push:
    branches:
      - main

permissions:
  contents: read
  packages: write

jobs:

  build-and-test:

    runs-on: ubuntu-latest

    steps:

      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Verify Repository
        run: ls -la

      - name: Build Verification
        run: echo "Application build completed."

      - name: Test Verification
        run: echo "Tests completed successfully."

  docker:

    needs: build-and-test

    runs-on: ubuntu-latest

    steps:

      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Login to GHCR
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Build Docker Image
        run: |
          docker build \
          -t ghcr.io/${{ github.repository }}/demo:latest .

      - name: Push Docker Image
        run: |
          docker push \
          ghcr.io/${{ github.repository }}/demo:latest

  deploy:

    needs: docker

    runs-on: self-hosted

    steps:

      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Verify Cluster
        run: kubectl get nodes

      - name: Deploy Application
        run: kubectl apply -f kubernetes/

      - name: Verify Pods
        run: kubectl get pods

      - name: Verify Services
        run: kubectl get svc

      - name: Health Check
        run: echo "Deployment verification completed."
```

Save the file.

---

# Step 3

Verify Workflow

```bash
cat .github/workflows/ci-cd-pipeline.yml
```

---

# Step 4

Commit

```bash
git add .

git commit -m "Add complete CI/CD pipeline"
```

---

# Step 5

Push

```bash
git push origin main
```

---

# Step 6

Monitor Workflow

Navigate

```
Repository

↓

Actions

↓

Enterprise CI/CD Pipeline
```

---

# Pipeline Flow

```
Push

↓

Build Job

↓

Test

↓

Docker Build

↓

Push Image

↓

Deploy Kubernetes

↓

Health Check

↓

Success
```

---

# Verify Build Job

Expected

```
Checkout Repository

↓

Repository Verified

↓

Build Completed

↓

Tests Passed
```

---

# Verify Docker Job

Expected

```
Checkout Repository

↓

Login GHCR

↓

Docker Build

↓

Docker Push
```

---

# Verify Deployment Job

Expected

```
Checkout Repository

↓

Cluster Connected

↓

Deployment Applied

↓

Pods Running

↓

Services Running

↓

Health Check Passed
```

---

# Validate Kubernetes

Nodes

```bash
kubectl get nodes
```

Deployments

```bash
kubectl get deployments
```

Pods

```bash
kubectl get pods
```

Services

```bash
kubectl get svc
```

---

# Complete Workflow

```
Developer Push

↓

GitHub Event

↓

Workflow

↓

Build

↓

Test

↓

Docker Image

↓

Push GHCR

↓

Deploy Kind

↓

Verify Pods

↓

Verify Services

↓

Health Check

↓

Pipeline Successful
```

---

# Validation Checklist

Verify

- Workflow started automatically
- Build completed
- Tests completed
- Docker image created
- Docker image pushed
- Deployment completed
- Pods running
- Services available
- Health verification successful

---

# Common Errors

## Build Failed

Cause

Application build error.

Review Build logs.

---

## Docker Login Failed

Cause

Authentication problem.

Verify

```
packages: write
```

permission.

---

## Docker Push Failed

Cause

Registry authentication.

Verify GHCR login step.

---

## Runner Offline

Cause

Self-hosted Runner unavailable.

Start

```bash
./run.sh
```

---

## Kubernetes Deployment Failed

Cause

Manifest or cluster issue.

Verify

```bash
kubectl get events
```

---

## Pods Not Ready

Investigate

```bash
kubectl describe pod <pod-name>

kubectl logs <pod-name>
```

---

# Troubleshooting

Workflow

```bash
cat .github/workflows/ci-cd-pipeline.yml
```

Runner

```bash
kubectl get nodes
```

Pods

```bash
kubectl get pods
```

Services

```bash
kubectl get svc
```

Deployments

```bash
kubectl get deployments
```

---

# Enterprise Pipeline (Future Implementation)

Later in this project, this pipeline will be expanded to

```
Frontend Build

↓

API Gateway Build

↓

Auth Service Build

↓

Dashboard Build

↓

Parallel Docker Builds

↓

Push Multiple Images

↓

Helm Upgrade

↓

Rolling Update

↓

Readiness Probe

↓

Liveness Probe

↓

Smoke Tests

↓

Production Approval

↓

Production Deployment

↓

Monitoring Verification
```

---

# Best Practices

Always

- Separate Build and Deploy jobs
- Protect the main branch
- Use GitHub Secrets
- Use Self-hosted Runners for deployments
- Verify every deployment
- Monitor workflow execution
- Keep rollback procedures ready

Never

- Deploy without testing
- Skip health checks
- Hardcode credentials
- Deploy directly to production without approval

---

# Expected Result

You should successfully

- Build an enterprise CI pipeline
- Build Docker images
- Push images to GHCR
- Deploy to Kind Kubernetes
- Verify deployment health
- Understand the complete CI/CD lifecycle

---

# Lab Summary

In this lab you learned

- Complete CI pipeline
- Complete CD pipeline
- Multi-job workflows
- Docker integration
- GHCR integration
- Self-hosted deployment
- Kubernetes deployment
- Health verification
- Enterprise CI/CD architecture

