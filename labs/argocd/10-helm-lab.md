# Lab 10 - Deploy Applications using Helm

# Enterprise DevOps Platform

---

# Lab Objective

In this lab you will learn how to:

- Understand Helm integration with ArgoCD
- Deploy a Helm Chart
- Override Helm values
- Synchronize Helm applications
- Upgrade Helm releases using GitOps
- Troubleshoot Helm deployments

---

# Prerequisites

- Labs 01 to 09 Completed
- ArgoCD Installed
- Kubernetes Cluster Running
- Git Repository
- Basic Helm Knowledge

---

# What is Helm?

Helm is the package manager for Kubernetes.

It packages Kubernetes manifests into reusable Charts.

---

# Why Helm with ArgoCD?

Instead of managing hundreds of YAML files,

Helm provides

- Templates
- Variables
- Reusability
- Versioning

ArgoCD deploys Helm charts directly from Git.

---

# Architecture

```
Git Repository

↓

Helm Chart

↓

ArgoCD Repo Server

↓

Manifest Rendering

↓

Application Controller

↓

Kubernetes Cluster
```

---

# Helm Repository Structure

```
guestbook/

├── Chart.yaml
├── values.yaml
├── templates/
│   ├── deployment.yaml
│   ├── service.yaml
│   └── ingress.yaml
└── charts/
```

---

# Step 1 - Verify Helm Chart

Repository Structure

```bash
tree guestbook
```

Expected

```
Chart.yaml

values.yaml

templates/
```

---

# Step 2 - Create ArgoCD Application

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application

metadata:
  name: guestbook-helm

spec:

  project: default

  source:

    repoURL: https://github.com/example/gitops.git

    targetRevision: HEAD

    path: guestbook

    helm:

      valueFiles:

      - values.yaml

  destination:

    server: https://kubernetes.default.svc

    namespace: guestbook

  syncPolicy:

    automated:

      prune: true

      selfHeal: true
```

---

# Step 3 - Apply Application

```bash
kubectl apply -f application.yaml
```

---

# Step 4 - Verify Application

```bash
argocd app list
```

Expected

```
guestbook-helm
```

---

# Step 5 - Synchronize

```bash
argocd app sync guestbook-helm
```

---

# Step 6 - Verify Deployment

```bash
kubectl get deployment -n guestbook
```

Expected

```
guestbook
```

---

# Step 7 - Override Values

Example

```yaml
replicaCount: 3

image:

  repository: nginx

  tag: "1.27"
```

Commit

```bash
git add .
```

```bash
git commit -m "Updated Helm values"
```

```bash
git push origin main
```

---

# Step 8 - Observe Auto Sync

ArgoCD detects

```
Git Change

↓

Helm Render

↓

Deployment Update
```

---

# Step 9 - Verify Replicas

```bash
kubectl get deployment guestbook -n guestbook
```

Expected

```
READY

3/3
```

---

# Step 10 - View Application

```bash
argocd app get guestbook-helm
```

Expected

```
Synced

Healthy
```

---

# Commands Used

Application List

```bash
argocd app list
```

Application Details

```bash
argocd app get guestbook-helm
```

Synchronize

```bash
argocd app sync guestbook-helm
```

Deployment

```bash
kubectl get deployment -n guestbook
```

Pods

```bash
kubectl get pods -n guestbook
```

---

# Expected Output

```
Git

↓

Helm Chart

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

## Chart Not Found

Verify

```
Chart.yaml
```

exists.

---

## values.yaml Error

Validate YAML syntax.

---

## Repository Error

```bash
argocd repo list
```

---

## Deployment Failed

Check

```bash
kubectl describe deployment guestbook
```

---

## Pods Failed

```bash
kubectl logs <pod>
```

---

# Best Practices

- Keep charts reusable.
- Store values in Git.
- Separate values for Dev, QA and Production.
- Never edit generated manifests.
- Use Helm version control.
- Test charts before Production deployment.

---

# Real Production Example

Enterprise Platform

```
Git

↓

Helm Charts

↓

Frontend

↓

API Gateway

↓

Auth Service

↓

Dashboard

↓

PostgreSQL

↓

Redis

↓

Kubernetes
```

All deployments are managed using GitOps.

---

# Interview Questions

## 1. Can ArgoCD deploy Helm charts?

Yes.

ArgoCD natively supports Helm.

---

## 2. Does ArgoCD install Helm releases?

No.

ArgoCD renders Helm templates and applies Kubernetes manifests.

---

## 3. Where are Helm values stored?

Usually in

```
values.yaml
```

or environment-specific values files.

---

## 4. Why use Helm?

- Reusable templates
- Parameterization
- Easier maintenance
- Version control

---

## 5. Can Helm and ArgoCD work together?

Yes.

Helm handles templating.

ArgoCD handles GitOps deployment and reconciliation.

---

# Lab Success Criteria

You have successfully completed this lab if:

- Helm application is created.
- Helm chart is deployed.
- Values are overridden from Git.
- Deployment updates automatically.
- Application remains Synced and Healthy.

---

# Marathi Quick Revision

- Helm म्हणजे Kubernetes Package Manager.
- ArgoCD Helm Charts Deploy करू शकतो.
- values.yaml मधून Configuration बदलता येते.
- Git मध्ये बदल केल्यावर ArgoCD आपोआप Deploy करतो.
- Enterprise मध्ये Helm + ArgoCD ही सर्वात लोकप्रिय GitOps Combination आहे.

