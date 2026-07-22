# ArgoCD Interview Master Guide

# Enterprise DevOps Platform

---

# Purpose

This document is a one-stop interview guide for ArgoCD.

It covers the questions most frequently asked in:

- DevOps Interviews
- Platform Engineer Interviews
- Kubernetes Interviews
- SRE Interviews
- Cloud Engineer Interviews

Experience Levels

- 2+ Years
- 3+ Years
- 5+ Years
- 8+ Years

---

# ArgoCD Introduction

ArgoCD is a declarative GitOps Continuous Delivery tool for Kubernetes.

It continuously compares the desired state stored in Git with the actual state running inside the Kubernetes cluster.

Whenever drift is detected, ArgoCD synchronizes the cluster with Git.

---

# Core Architecture

```
Developer

↓

Git Repository

↓

ArgoCD Repo Server

↓

Application Controller

↓

Kubernetes API

↓

Cluster

↓

Application
```

---

# Core Components

## argocd-server

Responsible for

- UI
- REST API
- CLI
- Authentication

---

## argocd-repo-server

Responsible for

- Cloning Git repositories
- Helm rendering
- Kustomize rendering
- Manifest generation

---

## argocd-application-controller

Responsible for

- Comparing Git and Cluster
- Detecting Drift
- Synchronization
- Self Healing

---

## Redis

Responsible for

- Caching
- Session Data

---

## Dex (Optional)

Responsible for

- SSO
- LDAP
- OAuth
- OIDC Authentication

---

# GitOps Workflow

```
Developer

↓

Git Commit

↓

Git Push

↓

ArgoCD Detects Change

↓

Manifest Generated

↓

Sync

↓

Application Updated
```

---

# Important Features

- GitOps
- Continuous Delivery
- Declarative Deployments
- Drift Detection
- Self Healing
- Rollback
- Auto Sync
- Manual Sync
- RBAC
- Multi Cluster
- ApplicationSet
- Sync Waves
- Hooks
- Notifications

---

# Frequently Asked Interview Questions

---

## Q1. What is GitOps?

### Answer

GitOps is an operational model where Git acts as the single source of truth for infrastructure and application deployment.

---

## Q2. What is ArgoCD?

### Answer

ArgoCD is a GitOps Continuous Delivery tool for Kubernetes that continuously synchronizes the cluster with the desired state stored in Git.

---

## Q3. Why is ArgoCD better than Jenkins deployment?

### Answer

Jenkins pushes deployments, while ArgoCD continuously pulls the desired state from Git and reconciles the cluster automatically, making deployments more secure, auditable and reliable.

---

## Q4. What is Sync?

### Answer

Sync is the process of applying Kubernetes manifests from Git to the cluster.

---

## Q5. What is OutOfSync?

### Answer

OutOfSync means the Kubernetes cluster no longer matches the desired state stored in Git.

---

## Q6. What is Self Healing?

### Answer

Self Healing automatically restores manually modified Kubernetes resources back to the Git-defined desired state.

---

## Q7. What is Auto Sync?

### Answer

Auto Sync automatically deploys changes whenever Git is updated.

---

## Q8. Difference between Sync and Auto Sync?

### Answer

Manual Sync requires a user to trigger deployment.

Auto Sync performs deployment automatically after Git changes.

---

## Q9. Difference between Sync Status and Health Status?

### Answer

Sync Status indicates whether Git and Kubernetes match.

Health Status indicates whether the deployed application is actually running correctly.

---

## Q10. What is a Degraded Application?

### Answer

The manifests are successfully deployed but one or more Kubernetes resources are unhealthy.

---

## Q11. What is an ApplicationSet?

### Answer

ApplicationSet automatically generates multiple ArgoCD Applications using templates.

---

## Q12. What is App of Apps?

### Answer

App of Apps is an ArgoCD design pattern where one parent application manages multiple child applications.

---

## Q13. What are Sync Waves?

### Answer

Sync Waves define deployment order using annotations.

Example

Database

↓

Backend

↓

Frontend

---

## Q14. What are Hooks?

### Answer

Hooks execute Kubernetes Jobs before, during or after synchronization.

Examples

- PreSync
- Sync
- PostSync
- SyncFail

---

## Q15. What is Drift?

### Answer

Any manual change inside Kubernetes that differs from Git is called configuration drift.

---

## Q16. Which component detects Drift?

### Answer

argocd-application-controller

---

## Q17. What happens if Git is unavailable?

### Answer

ArgoCD cannot fetch manifests and synchronization fails until repository connectivity is restored.

---

## Q18. How does Rollback work?

### Answer

ArgoCD stores deployment history and allows reverting to a previous successful revision.

---

## Q19. Which command lists applications?

```bash
argocd app list
```

---

## Q20. Which command shows application details?

```bash
argocd app get <application>
```

---

## Q21. Which command performs synchronization?

```bash
argocd app sync <application>
```

---

## Q22. Which command shows deployment history?

```bash
argocd app history <application>
```

---

## Q23. Which command performs rollback?

```bash
argocd app rollback <application> <history-id>
```

---

## Q24. Which command compares Git and Cluster?

```bash
argocd app diff <application>
```

---

## Q25. Which command lists repositories?

```bash
argocd repo list
```

---

# Production Troubleshooting Order

```
Application

↓

Sync Status

↓

Health Status

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

ConfigMap

↓

Secret

↓

Database

↓

Redis

↓

Rollback (If Required)
```

---

# Most Common Production Issues

- OutOfSync
- Degraded
- CrashLoopBackOff
- ImagePullBackOff
- Sync Failure
- RBAC Failure
- Repository Failure
- Webhook Failure
- Health Check Failure
- Secret Missing
- ConfigMap Missing
- Cluster Failure

---

# Best Practices

- Everything in Git
- Never edit Production manually
- Enable Auto Sync
- Enable Self Healing
- Protect Git Branches
- Use Pull Requests
- Monitor ArgoCD
- Enable Notifications
- Use ApplicationSets
- Implement RBAC
- Perform Disaster Recovery testing

---

# 5+ Years Interview Tips

Expected knowledge

- Complete ArgoCD Architecture
- GitOps Workflow
- Multi Cluster Deployment
- ApplicationSets
- Sync Waves
- Hooks
- RBAC
- Notifications
- Disaster Recovery
- High Availability
- Production Troubleshooting
- Security Best Practices

---

# Marathi Quick Revision

- ArgoCD = GitOps CD Tool.
- Git = Source of Truth.
- Sync = Deploy.
- OutOfSync = Git ≠ Cluster.
- Self Healing = Manual Changes Restore.
- Auto Sync = Automatic Deployment.
- Degraded = Deployment झाले पण App Unhealthy.
- Repo Server = Git Clone.
- Controller = Drift Detection.
- Server = UI/API.
- ApplicationSet = Multiple Apps.
- App of Apps = Parent Controls Child Apps.

