# Lab 12 - Multi Cluster Deployment

# Enterprise DevOps Platform

---

# Lab Objective

In this lab you will learn how to:

- Understand Multi-Cluster deployments
- Register multiple Kubernetes clusters
- Deploy applications to multiple clusters
- Verify cluster synchronization
- Troubleshoot Multi-Cluster deployments
- Understand enterprise use cases

---

# Prerequisites

- Labs 01 to 11 Completed
- ArgoCD Installed
- Two or more Kubernetes Clusters
- kubectl Configured
- Git Repository

---

# What is Multi-Cluster Deployment?

Multi-Cluster Deployment allows a single ArgoCD instance to manage applications across multiple Kubernetes clusters.

Instead of installing ArgoCD in every cluster, one centralized ArgoCD manages all registered clusters.

---

# Why Multi-Cluster?

Enterprise organizations usually have multiple clusters.

Example

- Development
- QA
- UAT
- Production
- DR (Disaster Recovery)

Managing each cluster separately becomes difficult.

---

# Architecture

```
                    Git Repository
                          │
                          ▼
                     ArgoCD Server
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
        ▼                 ▼                 ▼
   Dev Cluster      QA Cluster      Production Cluster
        │                 │                 │
        ▼                 ▼                 ▼
   Applications     Applications     Applications
```

---

# Verify Existing Clusters

```bash
kubectl config get-contexts
```

Example

```
dev-cluster

qa-cluster

prod-cluster
```

---

# Step 1 - Check Current Cluster

```bash
argocd cluster list
```

Expected

```
https://kubernetes.default.svc
```

Only one cluster is registered.

---

# Step 2 - Register Development Cluster

```bash
argocd cluster add dev-cluster
```

---

# Step 3 - Register QA Cluster

```bash
argocd cluster add qa-cluster
```

---

# Step 4 - Register Production Cluster

```bash
argocd cluster add prod-cluster
```

---

# Step 5 - Verify Registered Clusters

```bash
argocd cluster list
```

Expected

```
dev-cluster

qa-cluster

prod-cluster
```

---

# Step 6 - Create Application

Example

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application

metadata:
  name: guestbook-dev

spec:

  project: default

  source:
    repoURL: https://github.com/example/gitops.git
    targetRevision: HEAD
    path: guestbook

  destination:
    server: https://dev-cluster
    namespace: guestbook

  syncPolicy:

    automated:

      prune: true

      selfHeal: true
```

---

# Step 7 - Create QA Application

Change destination

```yaml
destination:

  server: https://qa-cluster

  namespace: guestbook
```

---

# Step 8 - Create Production Application

```yaml
destination:

  server: https://prod-cluster

  namespace: guestbook
```

---

# Step 9 - Commit Changes

```bash
git add .
```

```bash
git commit -m "Added Multi Cluster Applications"
```

```bash
git push origin main
```

---

# Step 10 - Synchronize

```bash
argocd app sync guestbook-dev
```

```bash
argocd app sync guestbook-qa
```

```bash
argocd app sync guestbook-prod
```

---

# Step 11 - Verify Applications

```bash
argocd app list
```

Expected

```
guestbook-dev

guestbook-qa

guestbook-prod
```

All should be

```
Healthy

Synced
```

---

# Step 12 - Verify Deployments

Development

```bash
kubectl --context dev-cluster get deployments
```

QA

```bash
kubectl --context qa-cluster get deployments
```

Production

```bash
kubectl --context prod-cluster get deployments
```

---

# Commands Used

List Clusters

```bash
argocd cluster list
```

Add Cluster

```bash
argocd cluster add <context-name>
```

List Applications

```bash
argocd app list
```

Application Details

```bash
argocd app get guestbook-dev
```

---

# Expected Output

```
Git

↓

ArgoCD

↓

Development Cluster

↓

QA Cluster

↓

Production Cluster

↓

Healthy

↓

Synced
```

---

# Troubleshooting

## Cluster Not Registered

```bash
argocd cluster list
```

---

## Authentication Failed

Verify

```bash
kubectl config get-contexts
```

---

## Deployment Failed

```bash
argocd app get guestbook-dev
```

---

## Cluster Unreachable

```bash
kubectl cluster-info
```

---

## Permission Denied

Verify Kubernetes RBAC.

---

# Best Practices

- Use one centralized ArgoCD.
- Separate Dev, QA and Production clusters.
- Enable Auto Sync.
- Enable Self Heal.
- Use RBAC.
- Use ApplicationSet with Cluster Generator.
- Monitor cluster health.

---

# Real Production Example

Enterprise Platform

```
Central ArgoCD

↓

Development Cluster

↓

QA Cluster

↓

UAT Cluster

↓

Production Cluster

↓

Disaster Recovery Cluster
```

One Git commit deploys applications to multiple clusters automatically.

---

# Interview Questions

## 1. What is Multi-Cluster Deployment?

Managing multiple Kubernetes clusters from one ArgoCD instance.

---

## 2. Which command registers a cluster?

```bash
argocd cluster add <context-name>
```

---

## 3. Which command lists registered clusters?

```bash
argocd cluster list
```

---

## 4. Why use Multi-Cluster?

To centrally manage multiple Kubernetes environments.

---

## 5. What is the best practice for enterprise deployments?

Use a centralized ArgoCD with ApplicationSet and Cluster Generator for automated deployments across multiple clusters.

---

# Lab Success Criteria

You have successfully completed this lab if:

- Multiple clusters are registered.
- Applications are deployed successfully.
- All applications are Synced.
- All applications are Healthy.
- You understand enterprise Multi-Cluster GitOps.

---

# Marathi Quick Revision

- एक ArgoCD अनेक Kubernetes Clusters Manage करू शकतो.
- Dev, QA, UAT, Production वेगळे Clusters असू शकतात.
- `argocd cluster add` वापरून Cluster Register करतात.
- Centralized GitOps Management साठी Multi-Cluster वापरले जाते.
- Enterprise मध्ये हा खूप Common Pattern आहे.

