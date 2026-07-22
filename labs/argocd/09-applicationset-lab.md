# Lab 09 - ArgoCD ApplicationSet

# Enterprise DevOps Platform

---

# Lab Objective

In this lab you will learn how to:

- Understand ApplicationSet
- Automatically create multiple ArgoCD Applications
- Use Git Generator
- Use List Generator
- Deploy applications to multiple environments
- Understand enterprise use cases

---

# Prerequisites

- Labs 01 to 08 Completed
- ArgoCD Installed
- Kubernetes Cluster Running
- Git Repository

---

# What is ApplicationSet?

ApplicationSet is an ArgoCD controller that automatically creates multiple Applications from a template.

Instead of writing many Application YAML files, you write one ApplicationSet manifest.

---

# Why ApplicationSet?

Imagine deploying

- frontend
- backend
- auth-service
- dashboard-service

to

- Development
- QA
- UAT
- Production

Without ApplicationSet

```
4 Applications

×

4 Environments

=

16 Application YAML files
```

With ApplicationSet

```
1 ApplicationSet

↓

Automatically Creates

↓

16 Applications
```

---

# Architecture

```
Git Repository

↓

ApplicationSet

↓

ApplicationSet Controller

↓

ArgoCD Applications

↓

Kubernetes Cluster
```

---

# Supported Generators

- List Generator
- Git Generator
- Cluster Generator
- Matrix Generator
- Merge Generator
- SCM Provider Generator
- Pull Request Generator

---

# Step 1 - Create ApplicationSet

```yaml
apiVersion: argoproj.io/v1alpha1
kind: ApplicationSet

metadata:
  name: guestbook-applications

spec:

  generators:

  - list:
      elements:

      - cluster: dev
        namespace: dev

      - cluster: qa
        namespace: qa

      - cluster: prod
        namespace: prod

  template:

    metadata:
      name: guestbook-{{cluster}}

    spec:

      project: default

      source:
        repoURL: https://github.com/argoproj/argocd-example-apps.git
        targetRevision: HEAD
        path: guestbook

      destination:
        server: https://kubernetes.default.svc
        namespace: '{{namespace}}'

      syncPolicy:
        automated:
          prune: true
          selfHeal: true
```

---

# Step 2 - Apply ApplicationSet

```bash
kubectl apply -f applicationset.yaml
```

---

# Step 3 - Verify ApplicationSet

```bash
kubectl get applicationsets -n argocd
```

Expected

```
guestbook-applications
```

---

# Step 4 - Verify Applications

```bash
argocd app list
```

Expected

```
guestbook-dev

guestbook-qa

guestbook-prod
```

Applications are created automatically.

---

# Step 5 - Verify Namespaces

```bash
kubectl get ns
```

Expected

```
dev

qa

prod
```

---

# Step 6 - Verify Deployments

```bash
kubectl get deployments -A
```

Expected

Guestbook deployment in all namespaces.

---

# Step 7 - Git Generator Example

```yaml
generators:

- git:

    repoURL: https://github.com/company/gitops.git

    revision: HEAD

    directories:

    - path: applications/*
```

ApplicationSet scans directories and creates applications automatically.

---

# Step 8 - Cluster Generator Example

```yaml
generators:

- clusters: {}
```

Applications are deployed automatically to every registered cluster.

---

# Step 9 - Verify Sync

```bash
argocd app list
```

Expected

```
Synced

Healthy
```

for every generated application.

---

# Commands Used

Create ApplicationSet

```bash
kubectl apply -f applicationset.yaml
```

ApplicationSet

```bash
kubectl get applicationsets -n argocd
```

Applications

```bash
argocd app list
```

Deployments

```bash
kubectl get deployments -A
```

Namespaces

```bash
kubectl get ns
```

---

# Expected Output

```
ApplicationSet

↓

Applications Created

↓

Deployments Created

↓

Healthy

↓

Synced
```

---

# Troubleshooting

## Applications Not Created

Check

```bash
kubectl describe applicationset guestbook-applications -n argocd
```

---

## YAML Error

Validate

```bash
kubectl apply --dry-run=client -f applicationset.yaml
```

---

## Repository Error

```bash
argocd repo list
```

---

## Namespace Missing

Create namespace

```bash
kubectl create namespace dev
```

Repeat for

- qa
- prod

---

# Best Practices

- Use ApplicationSet for multiple environments.
- Store templates in Git.
- Enable Auto Sync.
- Enable Self Heal.
- Use Git Generator for large repositories.
- Use Cluster Generator for multi-cluster deployments.
- Keep templates reusable.

---

# Real Production Example

Enterprise Platform

```
Git Repository

↓

ApplicationSet

↓

Development

↓

QA

↓

UAT

↓

Production

↓

Frontend

↓

API Gateway

↓

Auth Service

↓

Dashboard

↓

Redis

↓

PostgreSQL
```

One commit updates every environment.

---

# Interview Questions

## 1. What is ApplicationSet?

ApplicationSet automatically creates multiple ArgoCD Applications from a single template.

---

## 2. Why use ApplicationSet?

It eliminates duplicate Application manifests and simplifies large-scale deployments.

---

## 3. Name some ApplicationSet Generators.

- List
- Git
- Cluster
- Matrix
- Merge
- Pull Request
- SCM Provider

---

## 4. Difference between App of Apps and ApplicationSet?

App of Apps manages predefined child Applications.

ApplicationSet dynamically generates Applications using generators and templates.

---

## 5. Where is ApplicationSet commonly used?

- Multi-environment deployments
- Multi-cluster deployments
- Large enterprise GitOps platforms

---

# Lab Success Criteria

You have successfully completed this lab if:

- ApplicationSet is created.
- Multiple Applications are generated automatically.
- Applications are deployed successfully.
- All applications become Synced.
- All applications become Healthy.
- You understand when to use ApplicationSet in enterprise environments.

---

# Marathi Quick Revision

- ApplicationSet = अनेक Applications Automatically तयार करतो.
- एक Template वापरून अनेक Applications तयार होतात.
- Dev, QA, UAT, Production साठी सर्वोत्तम.
- Git Generator आणि Cluster Generator खूप वापरले जातात.
- Enterprise GitOps मध्ये ApplicationSet हे अत्यंत महत्त्वाचे Feature आहे.

