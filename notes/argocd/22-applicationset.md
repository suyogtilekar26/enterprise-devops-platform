# ApplicationSet

# Enterprise DevOps Platform

---

# Purpose

This document explains ApplicationSet in ArgoCD from beginner to enterprise level.

ApplicationSet is one of the most important enterprise features in ArgoCD. It automatically generates and manages multiple ArgoCD Applications from a single template. It is heavily used in large organizations managing multiple clusters, environments and microservices.

---

# Introduction

Imagine you have

```
Frontend

Gateway

Auth

Dashboard
```

and each application must be deployed to

```
Development

Testing

Staging

Production
```

Without ApplicationSet

```
4 Applications

×

4 Environments

=

16 ArgoCD Applications
```

Managing all manually becomes difficult.

ApplicationSet solves this problem.

---

# Simple Definition

ApplicationSet automatically creates and manages multiple ArgoCD Applications using a single template.

---

# Why ApplicationSet?

Without ApplicationSet

```
Create App 1

Create App 2

Create App 3

...

Create App 100
```

Everything is manual.

---

With ApplicationSet

```
One Template

↓

ApplicationSet Controller

↓

100 Applications

Created Automatically
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

# Enterprise Example

Enterprise DevOps Platform

Applications

```
Frontend

Gateway

Auth

Dashboard
```

Environments

```
Dev

QA

Stage

Prod
```

ApplicationSet automatically generates

```
frontend-dev

frontend-qa

frontend-stage

frontend-prod

gateway-dev

gateway-qa

...

dashboard-prod
```

---

# Generators

ApplicationSet creates Applications using Generators.

Common Generators

- List Generator
- Git Generator
- Cluster Generator
- Matrix Generator
- Merge Generator
- SCM Provider Generator

Interview focus

- List
- Git
- Cluster
- Matrix

---

# List Generator

Used when application list is predefined.

Example

```
Frontend

Gateway

Auth

Dashboard
```

ApplicationSet creates one Application for each entry.

---

# Git Generator

Reads directories or files from Git.

Example

```
apps/

frontend

gateway

auth

dashboard
```

Each directory becomes an Application.

---

# Cluster Generator

Deploys the same application to multiple clusters.

Example

```
Cluster-1

Cluster-2

Cluster-3
```

Automatically creates

```
Frontend

↓

Cluster-1

Frontend

↓

Cluster-2

Frontend

↓

Cluster-3
```

---

# Matrix Generator

Combines two generators.

Example

Applications

```
Frontend

Gateway
```

Environments

```
Dev

QA

Prod
```

Generated Applications

```
frontend-dev

frontend-qa

frontend-prod

gateway-dev

gateway-qa

gateway-prod
```

---

# Deployment Flow

```
Git

↓

ApplicationSet

↓

ApplicationSet Controller

↓

Generate Applications

↓

ArgoCD

↓

Deploy Cluster
```

---

# Enterprise Use Cases

- Multi-environment deployment
- Multi-cluster deployment
- Hundreds of microservices
- Platform Engineering
- SaaS platforms
- Regional deployments

---

# App of Apps vs ApplicationSet

| Feature | App of Apps | ApplicationSet |
|----------|-------------|----------------|
| Parent Application | Yes | No |
| Auto Generate Apps | No | Yes |
| Multi Cluster | Limited | Excellent |
| Multi Environment | Manual | Automatic |
| Large Scale | Good | Excellent |

Interview Tip

App of Apps manages applications.

ApplicationSet creates applications.

---

# Benefits

- Eliminates repetitive work
- Easy scaling
- Centralized templates
- Automatic application generation
- Better GitOps automation
- Consistent deployments

---

# Common Problems

Incorrect Generator

↓

Applications not created.

---

Git structure changed

↓

Applications deleted or recreated.

---

Cluster registration missing

↓

Deployment fails.

---

# Best Practices

- Use Git Generator for GitOps repositories.
- Use Cluster Generator for multi-cluster deployments.
- Use Matrix Generator for large enterprise platforms.
- Keep templates reusable.
- Test generators before Production.
- Store everything in Git.

---

# Interview Questions

## Q1. What is ApplicationSet?

### Answer

ApplicationSet is an ArgoCD controller that automatically generates and manages multiple ArgoCD Applications using templates and generators.

---

## Q2. Why is ApplicationSet used?

### Answer

It reduces manual work by automatically creating applications for multiple environments, clusters and services.

---

## Q3. What are the commonly used ApplicationSet Generators?

### Answer

The most commonly used generators are List Generator, Git Generator, Cluster Generator and Matrix Generator.

---

## Q4. Difference between App of Apps and ApplicationSet?

### Answer

App of Apps manages multiple child Applications through a parent Application, whereas ApplicationSet automatically generates Applications using templates and generators.

---

# Marathi Quick Revision

- ApplicationSet Applications Auto Generate करते.
- Multi Cluster साठी सर्वोत्तम.
- Multi Environment साठी सर्वोत्तम.
- Git Generator खूप वापरतात.
- Cluster Generator Interview Favorite.
- Matrix Generator Senior Interviews मध्ये विचारतात.
- App of Apps आणि ApplicationSet मधील फरक लक्षात ठेवा.

---

# Marathi Summary (5+ Experience Revision)

ApplicationSet हे ArgoCD मधील सर्वात महत्त्वाचे enterprise automation feature आहे. एका template आणि generator च्या मदतीने अनेक ArgoCD Applications आपोआप तयार करता येतात. Multi-cluster, Multi-environment आणि मोठ्या Microservices platforms मध्ये याचा मोठ्या प्रमाणावर वापर होतो. Senior DevOps, Platform Engineer आणि SRE interviews मध्ये ApplicationSet, त्यातील Generators आणि App of Apps विरुद्ध ApplicationSet हा प्रश्न अत्यंत वारंवार विचारला जातो.

