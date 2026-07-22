# Lab 10 - Build and Push Docker Image using GitHub Actions

# Objective

Learn how to automatically build and push Docker images to GitHub Container Registry (GHCR) using GitHub Actions.

This is the first CI workflow that closely resembles our Enterprise DevOps Platform.

After completing this lab, you will be able to

- Authenticate with GHCR
- Build Docker images
- Tag Docker images
- Push Docker images
- Verify uploaded images

---

# Enterprise Scenario

In our project, every push to the main branch will eventually

```
Build Application

↓

Build Docker Image

↓

Push Image to GHCR

↓

Deploy to Kubernetes
```

This lab implements the first three stages.

---

# Project Architecture

```
Developer

↓

Git Push

↓

GitHub Actions

↓

Checkout Code

↓

Docker Login

↓

Docker Build

↓

Push Image

↓

GitHub Container Registry
```

---

# Prerequisites

- Docker installed locally
- GitHub repository
- GitHub Actions enabled
- Existing Dockerfile

---

# Step 1: Verify Dockerfile

Example

```bash
ls Dockerfile
```

or

```bash
find . -name Dockerfile
```

Expected

```
Dockerfile
```

---

# Step 2: Create Workflow

```bash
nano .github/workflows/docker-build.yml
```

---

# Step 3: Add Workflow

```yaml
name: Docker Build and Push

on:
  push:
    branches:
      - main

permissions:
  contents: read
  packages: write

jobs:

  docker:

    runs-on: ubuntu-latest

    steps:

      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Login to GitHub Container Registry
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
```

Save the file.

---

# Step 4: Verify Workflow

```bash
cat .github/workflows/docker-build.yml
```

---

# Step 5: Commit Changes

```bash
git add .

git commit -m "Add Docker build workflow"
```

---

# Step 6: Push Changes

```bash
git push origin main
```

---

# Step 7: Monitor Workflow

Navigate to

```
Repository

↓

Actions

↓

Docker Build and Push
```

Expected Steps

```
Checkout Repository

↓

Docker Login

↓

Docker Build

↓

Docker Push
```

---

# Step 8: Verify Package

Navigate to

```
Repository

↓

Packages
```

Expected

```
demo

latest
```

---

# Workflow Execution

```
Push

↓

Checkout

↓

Docker Login

↓

Docker Build

↓

Docker Push

↓

Workflow Complete
```

---

# Validation Checklist

Verify

- Workflow executed
- Docker login successful
- Image built successfully
- Image pushed successfully
- Package visible in GHCR

---

# Common Errors

## Docker Login Failed

Cause

Missing package permissions.

Verify

```yaml
permissions:
  packages: write
```

---

## Build Failed

Cause

Invalid Dockerfile.

Verify

```bash
docker build .
```

works locally.

---

## Push Failed

Cause

Authentication failure.

Verify

```
docker/login-action
```

completed successfully.

---

## Repository Not Found

Cause

Incorrect image name.

Verify

```text
ghcr.io/${{ github.repository }}/demo:latest
```

---

# Troubleshooting

View workflow

```bash
cat .github/workflows/docker-build.yml
```

Verify Docker locally

```bash
docker version
```

Verify Dockerfile

```bash
ls Dockerfile
```

View Git status

```bash
git status
```

---

# Enterprise Example

Our final project will build multiple images

```
Frontend

↓

API Gateway

↓

Auth Service

↓

Dashboard Service

↓

Push All Images

↓

Deploy Kubernetes
```

Instead of only one image.

---

# Best Practices

Always

- Use official Docker Actions
- Push tagged images
- Use immutable tags for releases
- Scan images before deployment
- Store images in a trusted registry

Never

- Push untested images
- Use latest for production releases only
- Hardcode credentials
- Skip image verification

---

# Expected Result

You should successfully

- Authenticate with GHCR
- Build a Docker image
- Push the image
- Verify it in GitHub Packages
- Understand the first stage of enterprise CI/CD

---

# Lab Summary

In this lab you learned

- Docker login
- Docker build
- Docker push
- GitHub Container Registry
- Workflow permissions
- Enterprise image publishing

