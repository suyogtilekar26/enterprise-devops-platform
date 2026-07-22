# Production Deployment Workflow using ArgoCD

# Enterprise DevOps Platform

---

# Purpose

This document explains how a real enterprise production deployment flows from a developer's code commit to a successful production deployment using GitOps and ArgoCD.

This is one of the most common architecture discussions during DevOps, SRE and Platform Engineer interviews.

---

# Introduction

ArgoCD follows the Pull-based GitOps model.

Unlike traditional deployment tools that push changes to Kubernetes, ArgoCD continuously watches Git repositories and pulls changes into Kubernetes whenever the desired state changes.

---

# Enterprise Architecture

```
Developer

↓

Git Commit

↓

GitHub

↓

Pull Request

↓

Code Review

↓

Merge

↓

CI Pipeline

↓

Docker Image Build

↓

Image Scan

↓

Push Image to Registry

↓

Update Kubernetes Manifest

↓

Git Repository

↓

ArgoCD Detects Change

↓

Sync

↓

Kubernetes Cluster

↓

Application Healthy

↓

Monitoring
```

---

# Enterprise Example

Our Enterprise DevOps Platform contains

```
Frontend

↓

React + Vite

-------------------

API Gateway

↓

Flask

-------------------

Authentication Service

↓

Flask

-------------------

Dashboard Service

↓

Flask

-------------------

Redis

-------------------

PostgreSQL
```

All Kubernetes manifests are stored inside Git.

---

# Step 1

## Developer Writes Code

Example

Developer fixes

```
Login Bug
```

Developer commits

```bash
git add .

git commit -m "Fix login issue"

git push origin feature/login-fix
```

---

# Step 2

## Pull Request

Developer creates

```
Pull Request
```

Reviewers verify

- Code Quality
- Security
- Unit Tests
- Best Practices

---

# Step 3

## Merge to Main Branch

After approval

```
Feature Branch

↓

Main Branch
```

Main branch becomes the latest desired state.

---

# Step 4

## CI Pipeline

Pipeline executes

```
Checkout

↓

Install Dependencies

↓

Unit Tests

↓

Integration Tests

↓

Security Scan

↓

Build Docker Image

↓

Image Scan

↓

Push Image
```

If any stage fails,

deployment stops.

---

# Step 5

## Update Kubernetes Manifest

Example

Old

```yaml
image: frontend:v1.0.0
```

New

```yaml
image: frontend:v1.1.0
```

Manifest update is committed back to Git.

---

# Step 6

## ArgoCD Detects Change

ArgoCD continuously monitors Git.

When a new commit is detected

```
OutOfSync
```

Application status changes until synchronization occurs.

---

# Step 7

## Synchronization

Depending on configuration

Manual

```
Engineer clicks Sync
```

or

Automatic

```
ArgoCD starts deployment
```

---

# Step 8

## Apply Resources

ArgoCD applies

- Namespace
- ConfigMap
- Secret
- Deployment
- Service
- Ingress

Resources are deployed in the correct order.

---

# Step 9

## Kubernetes Schedules Pods

Kubernetes

```
Creates Pods

↓

Schedules Pods

↓

Pulls Images

↓

Starts Containers

↓

Readiness Checks

↓

Liveness Checks
```

---

# Step 10

## Health Verification

ArgoCD verifies

```
Healthy

↓

Synced
```

Deployment is considered successful only when the application is healthy.

---

# Step 11

## Monitoring

Production monitoring includes

- Prometheus
- Grafana
- Alertmanager
- Application Logs
- Kubernetes Events

Teams monitor

- CPU
- Memory
- Error Rate
- Response Time
- Availability

---

# Failure Scenario

Suppose

```
Dashboard Service

↓

CrashLoopBackOff
```

Workflow

```
Application

↓

Degraded

↓

Investigate Logs

↓

Fix Issue

↓

Commit

↓

ArgoCD Sync

↓

Healthy
```

If impact is critical,

perform rollback.

---

# Rollback Workflow

```
Production Failure

↓

Application History

↓

Select Stable Revision

↓

Rollback

↓

Healthy
```

Example

```bash
argocd app history dashboard

argocd app rollback dashboard <history-id>
```

---

# Production Best Practices

- Protect main branch.
- Require Pull Request approvals.
- Enable CI validation.
- Scan container images.
- Avoid direct kubectl changes.
- Use RBAC.
- Use Sync Windows.
- Monitor continuously.
- Keep rollback plan ready.
- Store secrets outside Git.

---

# End-to-End Workflow Summary

```
Developer

↓

Commit

↓

Pull Request

↓

Review

↓

Merge

↓

CI

↓

Docker Image

↓

Image Registry

↓

Manifest Update

↓

Git

↓

ArgoCD

↓

Kubernetes

↓

Healthy

↓

Monitoring
```

---

# Interview Questions

## Q1. Explain an end-to-end ArgoCD deployment workflow.

### Answer

A developer commits code and raises a Pull Request. After review and merge, the CI pipeline builds and scans the Docker image, pushes it to the registry and updates Kubernetes manifests in Git. ArgoCD detects the Git change, synchronizes the Kubernetes cluster, verifies application health and completes the deployment.

---

## Q2. Why is ArgoCD called a Pull-based deployment tool?

### Answer

Because ArgoCD continuously watches Git and pulls the desired state into Kubernetes instead of another system pushing changes directly to the cluster.

---

## Q3. Where should deployment failures be handled?

### Answer

CI failures should stop the deployment before manifests are updated. Runtime failures should be investigated using ArgoCD health status, Kubernetes events, logs and rollback procedures.

---

## Q4. Why should Kubernetes manifests be updated in Git instead of using kubectl?

### Answer

Updating manifests in Git preserves the GitOps workflow, enables auditing, supports rollback and prevents configuration drift.

---

# Marathi Quick Revision

- Developer → PR → Review → Merge.
- CI Image Build करते.
- Manifest Git मध्ये Update होतो.
- ArgoCD Git Watch करते.
- Sync नंतर Kubernetes Deploy करते.
- Healthy झाल्यावर Deployment Complete.
- Failure असल्यास Rollback.

---

# Marathi Summary (5+ Experience Revision)

Enterprise मध्ये Production deployment हा GitOps workflow वर आधारित असतो. Developer code commit करतो, Pull Request approve झाल्यावर CI pipeline image build करून Kubernetes manifests Git मध्ये update करते. ArgoCD Git मधील बदल detect करून Kubernetes मध्ये deployment करते आणि Health verify करते. Production failure झाल्यास logs, events आणि application history तपासून rollback केला जातो. हा end-to-end workflow Senior DevOps interviews मध्ये अत्यंत महत्त्वाचा architecture discussion असतो.

