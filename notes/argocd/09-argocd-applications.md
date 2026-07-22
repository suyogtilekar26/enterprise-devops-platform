# ArgoCD Applications

# Enterprise DevOps Platform

---

# Purpose

This document explains ArgoCD Applications from beginner to enterprise level.

Applications are the core objects in ArgoCD. Every deployment managed by ArgoCD is represented as an Application.

Understanding Applications is essential because almost every production operation—deployment, synchronization, rollback, health monitoring, and troubleshooting—centers around them.

---

# Introduction

An ArgoCD Application defines

- What to deploy
- Where to deploy
- How to deploy
- Which Git repository to use
- Which Kubernetes cluster to use
- Which namespace to deploy into

Think of an Application as a deployment definition.

---

# Simple Definition

An ArgoCD Application is

> A Kubernetes Custom Resource (CRD) that tells ArgoCD how to deploy an application from Git to Kubernetes.

---

# Enterprise Example

Our Enterprise DevOps Platform contains

```
React Frontend

API Gateway

Auth Service

Dashboard Service
```

Instead of managing everything together, ArgoCD creates individual Applications.

```
frontend-app

gateway-app

auth-app

dashboard-app
```

Each Application has its own

- Repository
- Namespace
- Sync Status
- Health Status
- Deployment History

---

# Application Architecture

```
Git Repository

      │

      ▼

Application

      │

      ▼

Repository Server

      │

      ▼

Application Controller

      │

      ▼

Kubernetes Cluster
```

---

# Application Components

Each Application contains

- Name
- Project
- Repository URL
- Git Revision
- Path
- Destination Cluster
- Namespace
- Sync Policy

---

# Application Manifest

A simplified Application looks like

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application

metadata:
  name: frontend

spec:
  project: production

  source:
    repoURL: https://github.com/company/gitops
    path: frontend
    targetRevision: main

  destination:
    server: https://kubernetes.default.svc
    namespace: production
```

---

# Source

The Source section defines

- Git Repository
- Helm Chart
- Kustomize Directory
- Git Branch
- Git Tag
- Git Commit

Example

```
Git Repository

↓

frontend/

↓

Helm Chart
```

---

# Destination

Defines where resources will be deployed.

Destination includes

- Kubernetes Cluster
- Namespace

Example

```
Production Cluster

↓

production namespace
```

---

# Project Association

Every Application belongs to a Project.

Example

```
Production Project

↓

Frontend Application

↓

Production Namespace
```

Projects provide security boundaries.

---

# Application Lifecycle

```
Git Commit

↓

Application Detects Change

↓

Manifest Generated

↓

Compare Cluster

↓

Sync

↓

Health Check

↓

Application Healthy
```

---

# Synchronization

Applications continuously compare

```
Desired State

↓

Git
```

with

```
Actual State

↓

Cluster
```

Possible Sync Status

```
Synced

OutOfSync

Unknown
```

---

# Health Status

Applications continuously monitor deployed resources.

Possible Health States

```
Healthy

Progressing

Degraded

Missing

Suspended

Unknown
```

---

# Resource Tracking

Each Application manages

```
Deployment

↓

ReplicaSet

↓

Pods

↓

Service

↓

Ingress

↓

ConfigMap

↓

Secret
```

ArgoCD tracks every managed resource.

---

# Application History

Every deployment creates a revision.

Example

```
Revision 10

↓

Revision 11

↓

Revision 12
```

History allows easy rollback.

---

# Enterprise Deployment Example

Developer updates

```
gateway

image

v2.4.1
```

Workflow

```
Git Commit

↓

Application detects change

↓

Sync

↓

Deployment Updated

↓

Application Healthy
```

---

# Multi-Application Deployment

Enterprise Platform

```
Frontend

↓

Gateway

↓

Auth

↓

Dashboard
```

Each application

- Deploys independently
- Has independent rollback
- Has independent health checks
- Has separate deployment history

This minimizes production impact.

---

# Benefits

Applications provide

- Independent deployments
- Easy monitoring
- Automatic synchronization
- Deployment history
- Rollback capability
- Drift detection
- Self-healing

---

# Common Mistakes

- Managing multiple services in one Application
- Using incorrect namespace
- Wrong Git path
- Wrong Git branch
- Ignoring OutOfSync applications
- Not monitoring Health Status

---

# Best Practices

- Create one Application per deployable service.
- Use meaningful names.
- Associate Applications with Projects.
- Monitor Health and Sync status.
- Keep Git repositories organized.
- Enable automated synchronization where appropriate.
- Review deployment history regularly.

---

# Interview Questions

## Q1. What is an ArgoCD Application?

### Answer

An ArgoCD Application is a Custom Resource that defines how an application is deployed from a Git repository to a Kubernetes cluster.

---

## Q2. What information does an Application contain?

### Answer

It contains the Git repository, target revision, deployment path, destination cluster, namespace, project and synchronization policy.

---

## Q3. Why should each microservice have its own Application?

### Answer

Independent Applications provide isolated deployments, separate rollback history, independent health monitoring and reduced production risk.

---

# Marathi Quick Revision

- Application म्हणजे Deployment Definition.
- प्रत्येक Service साठी वेगळे Application ठेवा.
- Source म्हणजे Git.
- Destination म्हणजे Cluster आणि Namespace.
- Health आणि Sync Status Monitor करा.
- Rollback History उपलब्ध असते.
- Project सोबत Application जोडा.

---

# Marathi Summary (5+ Experience Revision)

ArgoCD Application हे GitOps deployment चे मुख्य object आहे. प्रत्येक Application मध्ये Git repository, target revision, deployment path, destination cluster, namespace आणि synchronization policy निश्चित केलेली असते. Enterprise microservices architecture मध्ये प्रत्येक service साठी स्वतंत्र Application तयार केल्यामुळे deployments, rollbacks, health monitoring आणि troubleshooting स्वतंत्रपणे करता येतात. Applications हे ArgoCD मधील सर्वात महत्त्वाचे operational resource असून Production Support मध्ये त्यांचे सखोल ज्ञान आवश्यक आहे.

