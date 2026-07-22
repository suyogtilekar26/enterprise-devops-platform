# ArgoCD Cheat Sheet

# Enterprise DevOps Platform

---

# Purpose

This document is a quick revision guide for ArgoCD interviews.

Use this document one day before interviews or while revising Production concepts.

---

# What is ArgoCD?

- Kubernetes GitOps CD Tool
- Continuous Delivery Platform
- Pull-Based Deployment Model
- Git is the Single Source of Truth

---

# GitOps Flow

```
Developer

↓

Git Commit

↓

Git Repository

↓

ArgoCD

↓

Kubernetes Cluster
```

---

# Core Components

```
API Server

↓

Repository Server

↓

Application Controller

↓

Redis

↓

Dex (Optional)

↓

UI / CLI
```

---

# Important CRDs

- Application
- ApplicationSet
- AppProject

---

# Sync Status

```
Synced

OutOfSync

Unknown
```

---

# Health Status

```
Healthy

Progressing

Degraded

Missing

Suspended

Unknown
```

---

# Important Features

- GitOps
- Automatic Sync
- Manual Sync
- Self Healing
- Pruning
- Rollback
- Resource Tracking
- Health Checks
- Sync Windows
- Resource Hooks
- Sync Waves
- ApplicationSet
- Multi Cluster
- RBAC

---

# Sync Policies

Manual

```yaml
syncPolicy: {}
```

Automatic

```yaml
syncPolicy:
  automated: {}
```

Automatic + Self Healing

```yaml
syncPolicy:
  automated:
    selfHeal: true
```

Automatic + Pruning

```yaml
syncPolicy:
  automated:
    prune: true
```

Complete

```yaml
syncPolicy:
  automated:
    prune: true
    selfHeal: true
```

---

# Resource Hooks

```
PreSync

↓

Sync

↓

PostSync

↓

SyncFail
```

---

# Sync Waves

Lower number

↓

Deploy First

Example

```
-2

↓

-1

↓

0

↓

1

↓

2
```

---

# Most Used Commands

Login

```bash
argocd login <server>
```

Applications

```bash
argocd app list
```

Application Details

```bash
argocd app get frontend
```

Sync

```bash
argocd app sync frontend
```

History

```bash
argocd app history frontend
```

Rollback

```bash
argocd app rollback frontend <history-id>
```

Repositories

```bash
argocd repo list
```

Clusters

```bash
argocd cluster list
```

Register Cluster

```bash
argocd cluster add <context>
```

---

# Troubleshooting Commands

Pods

```bash
kubectl get pods
```

Describe

```bash
kubectl describe pod <pod-name>
```

Logs

```bash
kubectl logs <pod-name>
```

Events

```bash
kubectl get events
```

Deployments

```bash
kubectl get deployment
```

Services

```bash
kubectl get svc
```

Ingress

```bash
kubectl get ingress
```

---

# Interview Keywords

- GitOps
- Desired State
- Actual State
- Drift Detection
- Self Healing
- Pruning
- Sync
- Health
- Rollback
- ApplicationSet
- App of Apps
- Multi Cluster
- RBAC
- Sync Windows
- Hooks
- Sync Waves
- Production Safety

---

# Most Asked Interview Questions

- What is GitOps?
- What is ArgoCD?
- Sync vs Health?
- Self Healing?
- Pruning?
- Rollback?
- ApplicationSet?
- App of Apps?
- Multi Cluster?
- RBAC?
- Troubleshooting Approach?
- Production Best Practices?

---

# Production Flow

```
Git Commit

↓

Pull Request

↓

Review

↓

Merge

↓

CI

↓

Image

↓

Manifest Update

↓

ArgoCD

↓

Production

↓

Monitoring
```

---

# Production Troubleshooting Flow

```
Application

↓

Sync

↓

Health

↓

Pods

↓

Logs

↓

Events

↓

Deployment

↓

Service

↓

Ingress

↓

Rollback
```

---

# Golden Interview Answers

## What is ArgoCD?

A GitOps Continuous Delivery tool for Kubernetes that continuously synchronizes the cluster with the desired state stored in Git.

---

## Why GitOps?

- Version Control
- Auditability
- Rollback
- Automation
- Security
- Consistency

---

## What is Self Healing?

Automatically restores Kubernetes resources to the desired Git state when configuration drift occurs.

---

## What is Pruning?

Deletes Kubernetes resources that no longer exist in Git.

---

## What is ApplicationSet?

Automatically generates multiple ArgoCD Applications from templates using generators.

---

## App of Apps vs ApplicationSet

App of Apps

```
Manages Applications
```

ApplicationSet

```
Creates Applications
```

---

## Production Rule

Never

```
kubectl apply
```

Always

```
Git

↓

Pull Request

↓

Approval

↓

ArgoCD
```

---

# Marathi Quick Revision

- Git = Source of Truth.
- ArgoCD = GitOps CD Tool.
- Sync = Git → Cluster.
- Health = Application Status.
- Self Healing = Drift Fix.
- Pruning = Delete Old Resources.
- Rollback = Previous Version Restore.
- ApplicationSet = Auto Create Apps.
- App of Apps = Manage Apps.
- RBAC = Security.
- Multi Cluster = One ArgoCD → Many Clusters.

---

# 5-Minute Interview Revision

Remember these 10 topics:

1. GitOps
2. ArgoCD Architecture
3. Sync vs Health
4. Self Healing
5. Pruning
6. Rollback
7. ApplicationSet
8. App of Apps
9. RBAC
10. Production Troubleshooting

These topics alone cover approximately 90–95% of ArgoCD interview discussions for DevOps, SRE and Platform Engineer roles.

