# Lab 11 - Deploy Applications using Kustomize

# Enterprise DevOps Platform

---

# Lab Objective

In this lab you will learn how to:

- Understand Kustomize
- Deploy Kustomize applications using ArgoCD
- Create Base and Overlay configurations
- Manage multiple environments
- Verify deployments
- Troubleshoot Kustomize applications

---

# Prerequisites

- Labs 01 to 10 Completed
- ArgoCD Installed
- Kubernetes Cluster Running
- Git Repository
- Basic Kubernetes Knowledge

---

# What is Kustomize?

Kustomize is a Kubernetes native configuration management tool.

It allows you to customize Kubernetes manifests without modifying the original YAML files.

---

# Why Kustomize?

Instead of maintaining separate YAML files for each environment,

Kustomize uses

- Base
- Overlay
- Patches

to create environment-specific configurations.

---

# Architecture

```
Git Repository

↓

Base Manifests

↓

Overlays

↓

ArgoCD Repo Server

↓

Manifest Rendering

↓

Kubernetes Cluster
```

---

# Repository Structure

```
guestbook/

├── base/
│   ├── deployment.yaml
│   ├── service.yaml
│   └── kustomization.yaml
│
└── overlays/
    ├── dev/
    │   └── kustomization.yaml
    │
    ├── qa/
    │   └── kustomization.yaml
    │
    └── prod/
        └── kustomization.yaml
```

---

# Step 1 - Create Base

Example

```
base/

deployment.yaml

service.yaml

kustomization.yaml
```

---

# Step 2 - Base kustomization.yaml

```yaml
resources:

- deployment.yaml
- service.yaml
```

---

# Step 3 - Create Dev Overlay

Example

```yaml
resources:

- ../../base

namePrefix: dev-

namespace: development

replicas:

- name: guestbook
  count: 2
```

---

# Step 4 - Create QA Overlay

```yaml
resources:

- ../../base

namespace: qa

namePrefix: qa-

replicas:

- name: guestbook
  count: 3
```

---

# Step 5 - Create Production Overlay

```yaml
resources:

- ../../base

namespace: production

namePrefix: prod-

replicas:

- name: guestbook
  count: 5
```

---

# Step 6 - Create ArgoCD Application

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application

metadata:
  name: guestbook-kustomize

spec:

  project: default

  source:

    repoURL: https://github.com/example/gitops.git

    targetRevision: HEAD

    path: guestbook/overlays/dev

  destination:

    server: https://kubernetes.default.svc

    namespace: development

  syncPolicy:

    automated:

      prune: true

      selfHeal: true
```

---

# Step 7 - Apply Application

```bash
kubectl apply -f application.yaml
```

---

# Step 8 - Verify Application

```bash
argocd app list
```

Expected

```
guestbook-kustomize
```

---

# Step 9 - Synchronize

```bash
argocd app sync guestbook-kustomize
```

---

# Step 10 - Verify Deployment

```bash
kubectl get deployment -n development
```

Expected

```
dev-guestbook
```

---

# Step 11 - Verify Pods

```bash
kubectl get pods -n development
```

Expected

```
Running
```

---

# Step 12 - Modify Overlay

Example

```yaml
replicas:

- name: guestbook
  count: 4
```

Commit

```bash
git add .
```

```bash
git commit -m "Updated Development Replicas"
```

```bash
git push origin main
```

---

# Step 13 - Observe Auto Sync

ArgoCD automatically

```
Detects Git Change

↓

Builds Kustomize

↓

Deploys Changes

↓

Application Healthy
```

---

# Commands Used

Application

```bash
argocd app list
```

Details

```bash
argocd app get guestbook-kustomize
```

Sync

```bash
argocd app sync guestbook-kustomize
```

Deployments

```bash
kubectl get deployment -n development
```

Pods

```bash
kubectl get pods -n development
```

---

# Expected Output

```
Git

↓

Kustomize

↓

Rendered Manifest

↓

Deployment

↓

Healthy

↓

Synced
```

---

# Troubleshooting

## Kustomization Not Found

Verify

```
kustomization.yaml
```

exists.

---

## Overlay Error

Check

```bash
kubectl apply --dry-run=client -k overlays/dev
```

---

## Deployment Failed

```bash
kubectl describe deployment dev-guestbook
```

---

## Application OutOfSync

```bash
argocd app sync guestbook-kustomize
```

---

# Best Practices

- Keep Base generic.
- Use Overlays for environment-specific changes.
- Never duplicate YAML files.
- Store everything in Git.
- Test overlays before Production.
- Use meaningful directory names.

---

# Real Production Example

```
Git Repository

↓

Base

↓

Development Overlay

↓

QA Overlay

↓

UAT Overlay

↓

Production Overlay

↓

ArgoCD

↓

Kubernetes
```

Every environment uses the same Base manifests with different configurations.

---

# Interview Questions

## 1. What is Kustomize?

A Kubernetes-native configuration management tool.

---

## 2. Why use Kustomize?

To customize Kubernetes manifests without modifying the original files.

---

## 3. What are Base and Overlay?

Base contains common manifests.

Overlay contains environment-specific customizations.

---

## 4. Can ArgoCD deploy Kustomize applications?

Yes.

ArgoCD has native support for Kustomize.

---

## 5. Difference between Helm and Kustomize?

Helm uses templates.

Kustomize uses patches and overlays.

---

# Lab Success Criteria

You have successfully completed this lab if:

- Kustomize application is deployed.
- Base and Overlay are configured.
- Environment-specific deployment works.
- Auto Sync updates the application.
- Application remains Synced and Healthy.

---

# Marathi Quick Revision

- Kustomize म्हणजे Kubernetes Native Configuration Tool.
- Base मध्ये Common YAML ठेवतात.
- Overlay मध्ये Dev, QA, Prod Configuration ठेवतात.
- YAML Duplicate करण्याची गरज नसते.
- ArgoCD Kustomize ला Native Support देतो.
- Enterprise मध्ये Multi-Environment Deployments साठी Kustomize मोठ्या प्रमाणावर वापरले जाते.

