# ImagePullBackOff Runbook

# Enterprise DevOps Platform

---

# Purpose

This runbook describes the Standard Operating Procedure (SOP) for troubleshooting Kubernetes Pods in the **ImagePullBackOff** state while deployed through ArgoCD.

ImagePullBackOff indicates that Kubernetes cannot download the container image required to start the application.

---

# Scope

Applications

- React + Vite Frontend
- Flask API Gateway
- Flask Auth Service
- Flask Dashboard Service

Supporting Services

- Redis
- PostgreSQL

---

# What is ImagePullBackOff?

```
Pod Created

↓

Pull Image

↓

Image Pull Failed

↓

Retry

↓

BackOff

↓

ImagePullBackOff
```

The Pod is created, but Kubernetes cannot retrieve the container image from the registry.

---

# Common Symptoms

- Pod Status = ImagePullBackOff
- Application Health = Degraded
- Pods Never Start
- APIs Unavailable
- Login Failure
- Deployment Stuck

---

# Common Causes

| Cause | Example |
|--------|----------|
| Wrong Image Name | Typo in image |
| Wrong Image Tag | Tag does not exist |
| Image Not Pushed | CI Pipeline Failed |
| Private Registry Authentication | Missing ImagePullSecret |
| Registry Unavailable | Docker Hub/ECR/ACR Down |
| Network Issue | Node cannot reach registry |

---

# Troubleshooting Workflow

```
ImagePullBackOff

↓

Describe Pod

↓

Events

↓

Image

↓

Registry

↓

Secret

↓

Fix

↓

Sync

↓

Healthy
```

---

# Step 1 - Verify Application

```bash
argocd app get frontend
```

Expected

```
Health

↓

Degraded
```

---

# Step 2 - Verify Pods

```bash
kubectl get pods
```

Example

```
frontend

ImagePullBackOff
```

---

# Step 3 - Describe Pod

```bash
kubectl describe pod <pod-name>
```

Review

- Events
- Image Name
- Image Tag
- Pull Errors

Typical messages

```
Image not found

authentication required

manifest unknown
```

---

# Step 4 - Verify Image Name

Check Deployment

```bash
kubectl describe deployment frontend
```

Verify

```
Image

↓

registry.company.com/frontend:v1.4.2
```

Ensure

- Repository is correct
- Image exists
- Tag exists

---

# Step 5 - Verify Registry

Check whether the image exists in

- Docker Hub
- Amazon ECR
- Azure ACR
- Google Artifact Registry
- Harbor

Verify the image was pushed successfully by the CI pipeline.

---

# Step 6 - Verify ImagePullSecret

```bash
kubectl get secrets
```

Verify

```bash
kubectl describe serviceaccount default
```

Ensure

- ImagePullSecret exists
- Secret is attached
- Credentials are valid

---

# Step 7 - Verify Namespace

Ensure the Secret exists in the same namespace.

```bash
kubectl get secret -n frontend
```

---

# Step 8 - Verify Node Connectivity

Check whether worker nodes can access the container registry.

Verify

- DNS
- Internet access
- Firewall rules
- Proxy configuration

---

# Step 9 - Verify CI Pipeline

Ensure

- Docker image built successfully
- Image pushed successfully
- Correct image tag used
- Manifest updated correctly

---

# Step 10 - Fix the Issue

Possible fixes

- Correct image name
- Correct image tag
- Push missing image
- Update ImagePullSecret
- Restore registry access

Commit the fix to Git.

---

# Step 11 - Synchronize

```bash
argocd app sync frontend
```

---

# Step 12 - Validate

```bash
kubectl get pods
```

Expected

```
Running

Ready
```

Verify

```bash
argocd app get frontend
```

Expected

```
Synced

Healthy
```

---

# Functional Testing

Verify

- Login
- Dashboard
- API Gateway
- Authentication
- Redis
- PostgreSQL

---

# Important Commands

Application

```bash
argocd app get frontend
```

Pods

```bash
kubectl get pods
```

Describe Pod

```bash
kubectl describe pod <pod-name>
```

Deployment

```bash
kubectl describe deployment frontend
```

Secrets

```bash
kubectl get secrets
```

Service Account

```bash
kubectl describe serviceaccount default
```

Events

```bash
kubectl get events
```

---

# Success Criteria

- Pod Running
- Image Pulled Successfully
- Application Healthy
- Sync Successful
- Services Reachable
- No Critical Alerts

---

# Interview Questions

## Q1. What causes ImagePullBackOff?

### Answer

ImagePullBackOff occurs when Kubernetes cannot download the container image due to an invalid image name, incorrect tag, missing image, registry authentication failure or network connectivity issue.

---

## Q2. What is the first command you run?

### Answer

```bash
kubectl describe pod <pod-name>
```

This displays image pull events and the exact reason why Kubernetes failed to retrieve the image.

---

## Q3. How do you troubleshoot ImagePullBackOff in Production?

### Answer

Verify the deployment image, confirm the image exists in the registry, check ImagePullSecrets, validate registry connectivity, review CI pipeline output and synchronize the application after fixing the issue.

---

# Marathi Quick Revision

- ImagePullBackOff = Image Download होत नाही.
- `kubectl describe pod` तपासा.
- Image Name आणि Tag Verify करा.
- Registry Verify करा.
- ImagePullSecret तपासा.
- CI Pipeline Verify करा.
- Fix → Git Commit → ArgoCD Sync → Healthy.

