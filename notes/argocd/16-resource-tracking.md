# Resource Tracking

# Enterprise DevOps Platform

---

# Purpose

This document explains Resource Tracking in ArgoCD from beginner to enterprise level.

Resource Tracking enables ArgoCD to identify which Kubernetes resources belong to which Application. It is the foundation for synchronization, health monitoring, pruning, self-healing, and rollback.

---

# Introduction

When ArgoCD deploys an application, it creates multiple Kubernetes resources.

Example

```
Frontend Application

↓

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

ArgoCD must know

- Which resources belong to this application
- Which resources belong to another application
- Which resources should be synchronized
- Which resources should be deleted

This is achieved through Resource Tracking.

---

# Simple Definition

Resource Tracking means

> ArgoCD keeps track of every Kubernetes resource that belongs to an Application.

---

# Why Resource Tracking?

Imagine two applications.

```
Frontend

Gateway
```

Both deploy

```
Deployment

Service

ConfigMap
```

Without tracking,

ArgoCD cannot determine

- Which Deployment belongs to Frontend
- Which Service belongs to Gateway
- Which ConfigMap should be pruned

Resource Tracking solves this problem.

---

# Architecture

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

Kubernetes Resources

        │

        ▼

Tracking Information
```

---

# Resource Ownership

Each Application owns its deployed resources.

Example

```
frontend-app

↓

frontend Deployment

frontend Service

frontend ConfigMap
```

Another application

```
gateway-app

↓

gateway Deployment

gateway Service

gateway ConfigMap
```

Ownership remains separate.

---

# Tracking Methods

ArgoCD supports multiple tracking methods.

- Label
- Annotation
- Annotation + Label

Modern ArgoCD versions commonly use annotations for tracking.

---

# Label Tracking

Example

```yaml
metadata:
  labels:
    app.kubernetes.io/instance: frontend
```

ArgoCD identifies resources using this label.

---

# Annotation Tracking

Example

```yaml
metadata:
  annotations:
    argocd.argoproj.io/tracking-id: frontend
```

This uniquely identifies resources.

---

# Tracking Workflow

```
Git

↓

Manifest

↓

Resource Created

↓

Tracking Metadata Added

↓

Application Controller

↓

Health Monitoring

↓

Synchronization

↓

Self Healing

↓

Pruning
```

---

# Enterprise Example

Our Enterprise DevOps Platform

```
Frontend

↓

Deployment

Service

Ingress

ConfigMap

Secret
```

Gateway

```
Deployment

Service

ConfigMap
```

Auth

```
Deployment

Service

Secret
```

Dashboard

```
Deployment

Service

ConfigMap
```

ArgoCD knows exactly which resources belong to each application.

---

# Why Tracking is Important

Resource Tracking enables

- Synchronization
- Health Checks
- Rollback
- Pruning
- Self Healing
- Drift Detection
- Application Deletion

Without tracking, these features cannot function correctly.

---

# Resource Deletion

Suppose

```
Frontend Application

Deleted
```

ArgoCD identifies all tracked resources.

```
Deployment

Service

Ingress

ConfigMap

Secret
```

Then removes them safely.

Resources belonging to other applications remain untouched.

---

# Drift Detection

Tracked resources are continuously compared.

```
Git

↓

Desired Deployment

↓

Cluster

↓

Tracked Deployment

↓

Compare

↓

OutOfSync?
```

Tracking enables accurate drift detection.

---

# Health Monitoring

Tracked resources are monitored individually.

```
Deployment

Healthy

↓

ReplicaSet

Healthy

↓

Pods

Healthy

↓

Application

Healthy
```

---

# Rollback

During rollback,

ArgoCD restores only tracked resources.

Example

```
Frontend

↓

Rollback

↓

Frontend Resources Updated

↓

Gateway Unchanged
```

---

# Common Problems

Resource not tracked

Possible causes

- Resource created manually
- Incorrect labels
- Incorrect annotations
- Resource belongs to another Application

---

Duplicate ownership

Two Applications attempt to manage the same resource.

Possible results

- Sync failures
- OutOfSync status
- Resource conflicts
- Unexpected pruning

---

Manual resource creation

Example

```bash
kubectl apply -f deployment.yaml
```

If the resource is outside Git,

ArgoCD may not track it correctly.

---

# Best Practices

- Let ArgoCD create managed resources.
- Avoid manually modifying tracked resources.
- Keep one owner per resource.
- Do not share resources across multiple Applications.
- Use meaningful Application names.
- Monitor OutOfSync resources.
- Regularly audit resource ownership.

---

# Interview Questions

## Q1. What is Resource Tracking in ArgoCD?

### Answer

Resource Tracking allows ArgoCD to identify which Kubernetes resources belong to each Application, enabling synchronization, health monitoring, pruning and rollback.

---

## Q2. Why is Resource Tracking important?

### Answer

Without Resource Tracking, ArgoCD cannot correctly manage deployments, detect configuration drift, perform rollbacks or safely delete application resources.

---

## Q3. Can multiple Applications manage the same Kubernetes resource?

### Answer

No.

A Kubernetes resource should have only one owning ArgoCD Application to avoid conflicts and unexpected behavior.

---

# Marathi Quick Revision

- Resource Tracking म्हणजे Ownership.
- प्रत्येक Resource एका Application ची असते.
- Tracking मुळे Sync होते.
- Drift Detection होते.
- Pruning होते.
- Rollback होते.
- Multiple Applications ने एकच Resource Manage करू नये.

---

# Marathi Summary (5+ Experience Revision)

Resource Tracking हे ArgoCD मधील मूलभूत feature आहे ज्यामुळे प्रत्येक Kubernetes resource कोणत्या Application ची आहे हे ArgoCD ला समजते. याच tracking मुळे synchronization, health monitoring, drift detection, self-healing, pruning आणि rollback योग्य प्रकारे कार्य करतात. Enterprise environments मध्ये एका resource साठी एकच Application owner असणे, manual resource creation टाळणे आणि ownership conflicts टाळणे या सर्वोत्तम पद्धती आहेत.

