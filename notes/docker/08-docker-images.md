# Docker Images

## Purpose

This document explains Docker Images in detail from an Enterprise DevOps perspective.

Docker Images are one of the most fundamental concepts in containerization. Every application that runs inside Docker starts as an image.

For our Enterprise DevOps Platform, each microservice will have its own Docker image which will later be deployed using Docker Compose, Kubernetes, Helm, Argo CD, and AWS EKS.

---

# Introduction

A Docker Image is a packaged application.

It contains everything required to run an application.

This includes

- Application code
- Runtime
- Libraries
- Dependencies
- Configuration
- Metadata

A Docker Image is immutable.

Once built, it does not change.

If changes are required, a new image is built.

---

# Docker Image Architecture

```text
Application Source Code

↓

Dockerfile

↓

docker build

↓

Docker Image

↓

Docker Registry

↓

docker pull

↓

docker run

↓

Docker Container
```

Images are build artifacts.

Containers are runtime instances.

---

# Characteristics of Docker Images

Docker Images are

- Immutable
- Read-only
- Portable
- Versioned
- Lightweight
- Reusable

Images are designed to be deployed consistently across multiple environments.

---

# Image Structure

A Docker Image consists of multiple layers.

```text
Application Files

↓

Dependencies

↓

Runtime

↓

Operating System Libraries

↓

Base Image
```

Each layer is cached independently.

This makes image builds faster and more efficient.

---

# Image Layers

Docker Images use layered filesystems.

Example

```text
Layer 5

Application Code

↓

Layer 4

Python Packages

↓

Layer 3

System Libraries

↓

Layer 2

Ubuntu

↓

Layer 1

Base Filesystem
```

Only modified layers are rebuilt.

This improves build performance.

---

# Base Images

Every Docker Image starts from a base image.

Examples

```dockerfile
FROM ubuntu:24.04
```

```dockerfile
FROM python:3.12-slim
```

```dockerfile
FROM node:22-alpine
```

Common enterprise base images include

- Ubuntu
- Debian
- Alpine
- Python
- Node
- OpenJDK
- Nginx

---

# Image Tags

Images are identified using tags.

Example

```text
frontend:v1.0
```

```text
frontend:v1.1
```

```text
frontend:v2.0
```

Without a tag,

Docker automatically uses

```text
latest
```

Example

```bash
docker pull nginx
```

actually means

```text
nginx:latest
```

---

# Image Naming Convention

General format

```text
repository/image:tag
```

Examples

```text
nginx:latest
```

```text
python:3.12
```

```text
company/frontend:v1.0
```

```text
company/auth-service:2.1.4
```

---

# Build an Image

Command

```bash
docker build -t frontend:v1 .
```

Explanation

- docker build → Build an image
- -t → Assign tag
- frontend → Image name
- v1 → Version
- . → Current directory

---

# List Images

```bash
docker images
```

Example

```text
REPOSITORY          TAG

frontend            v1

auth-service        v1

dashboard-service   v1
```

---

# Inspect Image

```bash
docker image inspect frontend:v1
```

Displays

- Image ID
- Metadata
- Environment
- Layers
- Labels
- Configuration

---

# Remove Image

Remove one image

```bash
docker rmi frontend:v1
```

Force removal

```bash
docker rmi -f frontend:v1
```

---

# Pull Image

Download from registry

```bash
docker pull nginx
```

```bash
docker pull python:3.12
```

---

# Push Image

Upload image

```bash
docker push company/frontend:v1
```

Images must exist locally before they can be pushed.

---

# Image Workflow

```text
Developer

↓

Dockerfile

↓

docker build

↓

Docker Image

↓

docker push

↓

Registry

↓

docker pull

↓

docker run

↓

Container
```

This is the standard enterprise workflow.

---

# Docker Images in Our Project

Each application becomes an image.

```text
Frontend

↓

frontend:v1
```

```text
API Gateway

↓

api-gateway:v1
```

```text
Auth Service

↓

auth-service:v1
```

```text
Dashboard Service

↓

dashboard-service:v1
```

Later

Images

↓

GitHub Container Registry

↓

Kind

↓

Helm

↓

Argo CD

↓

AWS

---

# Enterprise Workflow

Developer

↓

Git Push

↓

GitHub Actions

↓

Docker Build

↓

Image Scan

↓

Push Registry

↓

Deploy Kubernetes

Docker Images are the deployment artifact throughout the pipeline.

---

# Internal Workflow

Developer executes

```bash
docker build
```

↓

Docker reads Dockerfile

↓

Creates layers

↓

Builds image

↓

Stores image locally

↓

Image available for deployment

---

# Daily DevOps Activities

DevOps Engineers regularly

- Build images
- Tag images
- Push images
- Pull images
- Scan images
- Delete unused images
- Verify image versions
- Promote images across environments

---

# Production Best Practices

- Keep images small.
- Use official base images.
- Pin image versions.
- Avoid using latest in production.
- Build immutable images.
- Scan images before deployment.
- Remove unnecessary packages.
- Use multi-stage builds.

---

# Security Considerations

Secure Docker Images by

- Using trusted base images
- Regular vulnerability scanning
- Updating dependencies
- Removing unused software
- Avoiding secrets inside images
- Signing images where applicable

Images should always be verified before deployment.

---

# Troubleshooting

List images

```bash
docker images
```

Inspect image

```bash
docker image inspect frontend:v1
```

View image history

```bash
docker history frontend:v1
```

Remove unused images

```bash
docker image prune
```

Remove all unused images

```bash
docker image prune -a
```

---

# Real Production Scenario

Scenario

A production deployment uses

```text
frontend:latest
```

A developer pushes a new image.

Production unexpectedly upgrades.

Root Cause

Using the mutable

```text
latest
```

tag.

Resolution

Deploy versioned images.

Example

```text
frontend:v2.3.1
```

This guarantees predictable deployments.

---

# Scenario-Based Interview Questions

## Question 1

What is a Docker Image?

Answer

A Docker Image is an immutable, read-only package containing an application, runtime, dependencies, configuration, and metadata required to run a container.

---

## Question 2

Can an image run directly?

Answer

No.

An image must be started as a Docker Container.

---

## Question 3

Why are Docker Images immutable?

Answer

Immutability ensures consistent deployments, reproducibility, version control, and easier rollbacks.

---

# Architecture-Level Interview Questions

## Question

Why are Docker Images built in layers?

Answer

Layering improves build performance through caching, reduces storage usage, and allows efficient image distribution.

---

## Question

Why should production avoid the latest tag?

Answer

The latest tag is mutable and may unexpectedly change, causing unpredictable deployments.

Version-specific tags provide stable and repeatable releases.

---

## Question

Why are images stored in registries?

Answer

Registries provide centralized storage, versioning, sharing, and deployment across multiple environments.

---

# Production Support Questions

Q.

A Kubernetes deployment cannot find an image.

What should you investigate?

Answer

Verify

- Image exists
- Correct tag
- Registry access
- Authentication
- Network connectivity

---

Q.

A deployment unexpectedly changed application behavior.

Possible cause?

Answer

The deployment may have referenced

```text
latest
```

instead of a fixed version tag.

---

# Related Runbooks

Future runbooks

- Build Docker Image
- Tag Docker Image
- Push Docker Image
- Pull Docker Image
- Scan Docker Image
- Remove Old Images

---

# Common Incidents

- Image build failure
- Wrong image version
- Missing image
- Registry authentication failure
- Image pull timeout
- Large image size
- latest tag deployment issue

---

# Commands

Build image

```bash
docker build -t app:v1 .
```

List images

```bash
docker images
```

Inspect image

```bash
docker image inspect app:v1
```

Image history

```bash
docker history app:v1
```

Pull image

```bash
docker pull nginx
```

Push image

```bash
docker push company/app:v1
```

Remove image

```bash
docker rmi app:v1
```

Prune unused images

```bash
docker image prune -a
```

---

# Key Takeaways

Docker Images are immutable deployment artifacts that package applications with all required dependencies.

Images are built from Dockerfiles, stored in registries, and used to create containers.

For our Enterprise DevOps Platform, every microservice will have a dedicated versioned image that moves through CI/CD pipelines into Kubernetes, ensuring reliable, repeatable, and secure deployments.

---

# Marathi Quick Revision

Docker Image म्हणजे

- Immutable
- Read-only
- Template
- Versioned
- Portable

Flow

Dockerfile

↓

Build

↓

Image

↓

Registry

↓

Container

Production मध्ये नेहमी versioned image वापरा.

---

# Marathi Interview Memory Tip

Interview मध्ये जर विचारलं:

"Docker Image म्हणजे काय?"

असं सांगा:

"Docker Image ही application, runtime, libraries आणि dependencies असलेली immutable package असते. ती Dockerfile पासून build केली जाते. Image registry मध्ये store होते आणि त्यापासून Docker Container तयार केला जातो. Production मध्ये latest tag ऐवजी version-specific tags वापरणे ही best practice आहे."

