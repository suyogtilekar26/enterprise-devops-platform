# Sync Phases and Waves

# Enterprise DevOps Platform

---

# Purpose

This document explains Sync Phases and Sync Waves in ArgoCD from beginner to enterprise level.

Sync Phases and Sync Waves help control **the order in which Kubernetes resources are deployed**. They are critical for enterprise applications where multiple components have dependencies.

---

# Introduction

In real-world applications, resources cannot always be deployed simultaneously.

Example

```
Database

↓

Backend API

↓

Frontend
```

If Frontend is deployed before Backend,

```
Application Failure
```

If Backend starts before Database,

```
Connection Failed
```

ArgoCD solves this using

- Sync Phases
- Sync Waves

---

# Simple Definition

Sync Phases define **when** resources are executed.

Sync Waves define **the order** in which resources are deployed.

---

# Why Sync Waves?

Enterprise Application

```
PostgreSQL

↓

Redis

↓

Auth Service

↓

API Gateway

↓

Dashboard

↓

Frontend
```

Correct deployment order is required.

---

Without Waves

```
Frontend

↓

Gateway

↓

Database

↓

Failure
```

---

With Waves

```
Database

↓

Redis

↓

Backend

↓

Gateway

↓

Frontend

↓

Healthy
```

---

# Sync Phases

ArgoCD supports

```
PreSync

↓

Sync

↓

PostSync

↓

SyncFail
```

These phases decide **when** resources execute.

---

# Sync Waves

Within the Sync phase,

resources are deployed in numerical order.

Example

```
Wave -2

↓

Wave -1

↓

Wave 0

↓

Wave 1

↓

Wave 2
```

Lower numbers execute first.

---

# Example

Database

```yaml
metadata:
  annotations:
    argocd.argoproj.io/sync-wave: "-2"
```

Redis

```yaml
metadata:
  annotations:
    argocd.argoproj.io/sync-wave: "-1"
```

Backend

```yaml
metadata:
  annotations:
    argocd.argoproj.io/sync-wave: "0"
```

Gateway

```yaml
metadata:
  annotations:
    argocd.argoproj.io/sync-wave: "1"
```

Frontend

```yaml
metadata:
  annotations:
    argocd.argoproj.io/sync-wave: "2"
```

Deployment Order

```
PostgreSQL

↓

Redis

↓

Backend

↓

Gateway

↓

Frontend
```

---

# Enterprise Example

Enterprise DevOps Platform

```
Wave -2

Database

------------------

Wave -1

Redis

------------------

Wave 0

Auth Service

Dashboard Service

------------------

Wave 1

API Gateway

------------------

Wave 2

Frontend
```

Everything starts in dependency order.

---

# Combining Phases and Waves

```
PreSync

↓

Backup Database

↓

Wave -2

Database

↓

Wave -1

Redis

↓

Wave 0

Backend

↓

Wave 1

Gateway

↓

Wave 2

Frontend

↓

PostSync

Smoke Test

↓

Healthy
```

---

# Benefits

- Correct deployment order
- Dependency management
- Reliable deployments
- Better production stability
- Reduced startup failures
- Automated orchestration

---

# Common Mistakes

Deploying Frontend before Backend

Result

```
503 Errors
```

Deploying Backend before Database

Result

```
Database Connection Failed
```

Using incorrect Wave numbers

Result

```
Unexpected deployment sequence
```

---

# Best Practices

- Deploy databases first.
- Deploy infrastructure before applications.
- Keep Wave numbering simple.
- Use negative Waves for infrastructure.
- Use PostSync for smoke tests.
- Test deployment order in non-production environments.
- Document dependency order.

---

# Interview Questions

## Q1. What are Sync Waves?

### Answer

Sync Waves determine the order in which Kubernetes resources are deployed during synchronization. Resources with lower wave numbers are deployed first.

---

## Q2. What is the difference between Sync Phases and Sync Waves?

### Answer

Sync Phases determine **when** a resource executes (PreSync, Sync, PostSync, SyncFail), while Sync Waves determine **the order** of resources within the synchronization process.

---

## Q3. Why are Sync Waves important?

### Answer

They ensure dependent resources such as databases, backend services and frontends are deployed in the correct order, preventing application startup failures.

---

# Marathi Quick Revision

- Sync Phase म्हणजे कधी Execute करायचे.
- Sync Wave म्हणजे कोणत्या क्रमाने Deploy करायचे.
- Lower Wave आधी Deploy होते.
- Database आधी Deploy करा.
- Backend नंतर Deploy करा.
- Frontend शेवटी Deploy करा.
- Enterprise मध्ये खूप महत्त्वाचा Topic.

---

# Marathi Summary (5+ Experience Revision)

Sync Phases आणि Sync Waves हे ArgoCD मधील production deployment orchestration features आहेत. Sync Phases deployment lifecycle मधील execution stage ठरवतात, तर Sync Waves resources चा deployment order नियंत्रित करतात. Enterprise applications मध्ये Database, Redis, Backend, Gateway आणि Frontend यांसारख्या dependent services योग्य क्रमाने deploy करण्यासाठी Sync Waves मोठ्या प्रमाणात वापरले जातात. Senior DevOps interviews मध्ये हा अत्यंत महत्त्वाचा scenario-based topic आहे.

