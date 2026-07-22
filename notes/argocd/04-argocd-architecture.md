# ArgoCD Architecture

# Enterprise DevOps Platform

---

# Purpose

This document explains the architecture of ArgoCD from beginner to enterprise level.

Understanding ArgoCD architecture is essential because troubleshooting production issues requires knowing how each component communicates and what responsibility it has.

---

# Introduction

ArgoCD follows a controller-based architecture.

It continuously compares

```
Desired State (Git)

        with

Actual State (Kubernetes Cluster)
```

If differences are found, ArgoCD synchronizes the cluster to match Git.

---

# High-Level Architecture

```
                Git Repository
                      │
                      │
                      ▼
             Repository Server
                      │
                      │
                      ▼
               Application Controller
                      │
        ┌─────────────┴─────────────┐
        │                           │
        ▼                           ▼
 Kubernetes API Server          Redis Cache
        │
        ▼
 Kubernetes Resources
        │
        ▲
        │
   ArgoCD API Server
        │
        ▼
 Web UI / CLI / API
```

---

# Main Components

ArgoCD consists of the following major components.

- API Server
- Repository Server
- Application Controller
- Redis
- Dex (Optional)
- Notifications Controller (Optional)

---

# API Server

Component

```
argocd-server
```

Responsibilities

- Web UI
- REST API
- CLI requests
- Authentication
- Authorization
- RBAC
- SSO Integration

Users interact only with this component.

Example

```
Browser

↓

ArgoCD UI

↓

API Server
```

---

# Repository Server

Component

```
argocd-repo-server
```

Responsibilities

- Clone Git repositories
- Fetch latest commits
- Render Helm charts
- Build Kustomize manifests
- Generate Kubernetes manifests

Supported sources

- Git
- Helm
- Kustomize
- Jsonnet
- Plugins

---

# Application Controller

Component

```
argocd-application-controller
```

This is the brain of ArgoCD.

Responsibilities

- Watches Applications
- Detects drift
- Compares Git and Cluster
- Performs Sync
- Performs Self-Healing
- Updates Application Status
- Executes Rollbacks

Almost every deployment decision is taken here.

---

# Redis

Component

```
argocd-redis
```

Purpose

Redis stores

- Cached repository data
- Session information
- Application state
- Performance cache

Redis improves performance by avoiding unnecessary Git operations.

---

# Dex (Optional)

Component

```
argocd-dex-server
```

Purpose

Provides

- OAuth
- OpenID Connect
- Single Sign-On

Supports

- Google
- GitHub
- Microsoft Entra ID
- Okta
- LDAP

Many enterprises integrate ArgoCD with their Identity Provider.

---

# Notifications Controller

Optional component

Used for

- Slack Notifications
- Microsoft Teams
- Email
- Webhooks

Examples

```
Deployment Successful

↓

Slack
```

or

```
Deployment Failed

↓

Email
```

---

# Application Lifecycle

```
Developer

↓

Git Commit

↓

Git Repository

↓

Repository Server

↓

Application Controller

↓

Compare Desired State

↓

Kubernetes API

↓

Cluster Updated

↓

Status Updated

↓

UI Displays Result
```

---

# Communication Flow

```
User

↓

Browser

↓

API Server

↓

Application Controller

↓

Repository Server

↓

Git Repository

↓

Kubernetes API

↓

Cluster
```

---

# Deployment Example

Developer changes

```
values-prod.yaml
```

Workflow

```
Git Commit

↓

Repository Server pulls latest code

↓

Application Controller detects change

↓

Manifest generated

↓

Compared with Cluster

↓

Resources Updated

↓

Application becomes Synced
```

---

# Enterprise Deployment

Our Enterprise DevOps Platform

```
React Frontend

↓

API Gateway

↓

Auth Service

↓

Dashboard Service

↓

PostgreSQL

↓

Redis
```

Each application is managed independently by ArgoCD.

Example

```
frontend-app

gateway-app

auth-app

dashboard-app
```

Each has its own

- Git Path
- Sync Status
- Health Status
- Deployment History

---

# High Availability Architecture

Enterprise deployments usually run multiple replicas.

```
                Load Balancer
                      │
        ┌─────────────┴─────────────┐
        ▼                           ▼
   API Server                  API Server
        │
        └─────────────┬─────────────┘
                      │
          Application Controller
                      │
                Repository Server
                      │
                    Redis HA
```

This improves

- Availability
- Scalability
- Fault Tolerance

---

# Component Responsibilities

| Component | Responsibility |
|------------|----------------|
| API Server | UI, CLI, API, Authentication |
| Repository Server | Git access and manifest generation |
| Application Controller | Sync, Drift Detection, Self-Healing |
| Redis | Cache and sessions |
| Dex | Authentication |
| Notifications | Alerts |

---

# Common Problems

- Repository Server cannot access Git
- Controller cannot reach Kubernetes API
- Redis unavailable
- API Server authentication failure
- Git credentials expired
- Controller CrashLoopBackOff

Understanding the architecture makes these issues easier to troubleshoot.

---

# Best Practices

- Deploy ArgoCD in High Availability mode.
- Protect Git repositories.
- Enable RBAC.
- Configure SSO.
- Monitor Controller health.
- Backup ArgoCD resources.
- Enable Notifications.
- Keep ArgoCD updated.

---

# Interview Questions

## Q1. What is the role of the Application Controller?

### Answer

The Application Controller continuously compares the desired state stored in Git with the actual Kubernetes cluster, detects configuration drift and performs synchronization and self-healing.

---

## Q2. What does the Repository Server do?

### Answer

The Repository Server clones Git repositories, renders Helm charts and Kustomize manifests, and generates Kubernetes manifests for deployment.

---

## Q3. Why does ArgoCD use Redis?

### Answer

Redis is used for caching repository information, application state and session data, improving overall performance and reducing repeated Git operations.

---

# Marathi Quick Revision

- API Server → UI आणि CLI.
- Repository Server → Git Clone करते.
- Controller → Sync आणि Self-Healing.
- Redis → Cache.
- Dex → SSO.
- Notifications → Alerts.
- Controller हा ArgoCD चा मुख्य component आहे.

---

# Marathi Summary (5+ Experience Revision)

ArgoCD ची architecture अनेक components वर आधारित आहे. API Server वापरकर्त्यांसाठी UI आणि CLI उपलब्ध करून देतो, Repository Server Git मधून manifests तयार करतो, Application Controller Git आणि Kubernetes cluster यांची तुलना करून synchronization, drift detection आणि self-healing करतो. Redis caching साठी वापरले जाते, तर Dex enterprise authentication आणि SSO साठी वापरले जाते. Production environments मध्ये High Availability deployment, RBAC, monitoring आणि backup या सर्वोत्तम पद्धती मानल्या जातात.

