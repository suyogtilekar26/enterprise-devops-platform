# Docker Image Registry

## Purpose

This document explains Docker Image Registries from an Enterprise DevOps perspective.

Docker Image Registries provide centralized storage for container images and enable image sharing, version control, CI/CD automation, Kubernetes deployments, and enterprise software distribution.

For our Enterprise DevOps Platform, every Docker image will be stored in a registry before deployment to Kubernetes.

---

# Introduction

A Docker Image Registry is a repository used to store and distribute Docker images.

Instead of building images directly on every server, images are built once and stored in a registry.

Servers then download the required image.

---

# High-Level Architecture

```text
Developer

↓

Git Push

↓

GitHub Actions

↓

Docker Build

↓

Docker Image

↓

Docker Registry

↓

Kubernetes Cluster

↓

Containers
```

The registry acts as the central image repository.

---

# Why Registries are Important

Benefits

- Centralized image storage
- Version control
- Image sharing
- Production deployments
- Rollback support
- CI/CD integration
- High availability

Enterprise environments always use a container registry.

---

# Registry Components

A registry stores

- Image repository
- Image tags
- Image layers
- Image metadata
- Image manifests

Each image is uniquely identified by its repository and tag.

---

# Registry Workflow

```text
Docker Build

↓

Docker Image

↓

docker push

↓

Registry

↓

docker pull

↓

Container Runtime
```

---

# Public Registries

Examples

- Docker Hub
- GitHub Container Registry (GHCR)
- Quay.io

Public registries allow images to be shared publicly.

---

# Private Registries

Examples

- Harbor
- AWS Elastic Container Registry (ECR)
- Azure Container Registry (ACR)
- Google Artifact Registry (GAR)
- Self-hosted Docker Registry

Private registries are commonly used in enterprise environments.

---

# Image Naming Format

General format

```text
registry/repository:tag
```

Example

```text
docker.io/library/nginx:1.27
```

Private registry example

```text
registry.company.com/frontend:v1.0.0
```

---

# Docker Hub Example

Image

```text
nginx:1.27
```

Docker interprets it as

```text
docker.io/library/nginx:1.27
```

Docker Hub is the default registry.

---

# Registry Authentication

Before pushing images

```bash
docker login
```

Docker stores authentication credentials locally.

After login

```bash
docker push
```

becomes possible.

---

# Pushing Images

Example

```bash
docker push registry.company.com/frontend:v1.0.0
```

Workflow

```text
Local Image

↓

Registry

↓

Stored Image
```

---

# Pulling Images

Example

```bash
docker pull registry.company.com/frontend:v1.0.0
```

Workflow

```text
Registry

↓

Download Layers

↓

Local Image
```

Only missing layers are downloaded.

---

# Registry Layer Storage

Registries store image layers only once.

Example

```text
python:3.12-slim

↓

Frontend

↓

Backend

↓

Auth Service
```

Shared base layers reduce storage usage.

---

# Registry in Our Project

Images

```text
frontend:v1.0.0

api-gateway:v1.0.0

auth-service:v1.0.0

dashboard-service:v1.0.0
```

Workflow

```text
GitHub Actions

↓

Docker Build

↓

Security Scan

↓

Registry

↓

Kind Kubernetes

↓

Pods
```

The Kubernetes cluster always pulls images from the registry.

---

# Enterprise Workflow

Developer

↓

Git Commit

↓

GitHub Push

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

Registries are a critical part of enterprise CI/CD pipelines.

---

# Internal Workflow

Docker Build

↓

Create Image

↓

Assign Tag

↓

Authenticate

↓

Push Image

↓

Registry Stores Layers

↓

Deployment Downloads Image

---

# Image Pull Policy

Kubernetes commonly uses

```text
IfNotPresent
```

or

```text
Always
```

Depending on deployment requirements.

Proper image tagging prevents unnecessary downloads.

---

# Daily DevOps Activities

DevOps Engineers

- Push images
- Pull images
- Review repositories
- Remove unused images
- Manage image retention
- Monitor registry storage
- Verify image versions
- Support production deployments

---

# Production Best Practices

- Use private registries for production.
- Scan images before pushing.
- Use immutable tags.
- Remove unused images.
- Enable access control.
- Use HTTPS.
- Enable image signing where supported.
- Automate registry cleanup.

---

# Security Considerations

- Require authentication.
- Use role-based access control.
- Scan every image.
- Store only trusted images.
- Remove vulnerable versions.
- Enable TLS.
- Avoid public images without verification.

---

# Troubleshooting

Login

```bash
docker login registry.company.com
```

Push image

```bash
docker push registry.company.com/frontend:v1.0.0
```

Pull image

```bash
docker pull registry.company.com/frontend:v1.0.0
```

List local images

```bash
docker images
```

Inspect image

```bash
docker image inspect frontend:v1.0.0
```

---

# Real Production Scenario

Scenario

A Kubernetes deployment fails because pods cannot download the application image.

Investigation

Error

```text
ImagePullBackOff
```

Possible causes

- Wrong image tag
- Registry authentication failure
- Image not pushed
- Incorrect registry URL
- Missing image permissions

Resolution

- Verify image exists
- Verify registry credentials
- Confirm deployment tag
- Re-push image if necessary

Deployment succeeds after correcting the registry configuration.

---

# Scenario-Based Interview Questions

## Question 1

What is a Docker Image Registry?

Answer

A centralized repository used to store, manage, and distribute Docker images.

---

## Question 2

Why are registries required?

Answer

They allow images to be shared across environments and support CI/CD, Kubernetes deployments, and version management.

---

## Question 3

What is the difference between docker push and docker pull?

Answer

`docker push` uploads an image to a registry.

`docker pull` downloads an image from a registry.

---

# Architecture-Level Interview Questions

## Question

Why does Kubernetes use a registry instead of building images directly?

Answer

Building images inside the cluster is inefficient. Kubernetes pulls pre-built, tested, and versioned images from a registry to ensure consistent deployments.

---

## Question

Why are image layers stored separately?

Answer

Layer deduplication reduces storage requirements and speeds up image transfers by downloading only missing layers.

---

## Question

Why are private registries preferred in enterprise environments?

Answer

They provide stronger security, access control, compliance, and protection for proprietary application images.

---

# Production Support Questions

Q.

Pods are stuck in `ImagePullBackOff`.

What should you investigate?

Answer

Review

- Image name
- Image tag
- Registry URL
- Registry credentials
- Image existence
- Network connectivity
- Kubernetes imagePullSecrets

---

Q.

Developers cannot push images to the registry.

Possible causes?

Answer

- Authentication failure
- Missing permissions
- Incorrect repository
- Expired credentials
- Registry unavailable

---

# Related Runbooks

Future runbooks

- Push Docker Images
- Configure Private Registry
- Troubleshoot ImagePullBackOff
- Authenticate with Registry
- Clean Up Registry Images

---

# Common Incidents

- ImagePullBackOff
- Authentication failure
- Wrong image tag
- Missing repository
- Registry unavailable
- Permission denied
- Registry storage full

---

# Commands

Login

```bash
docker login registry.company.com
```

Push image

```bash
docker push registry.company.com/frontend:v1.0.0
```

Pull image

```bash
docker pull registry.company.com/frontend:v1.0.0
```

Tag image

```bash
docker tag frontend:v1.0.0 registry.company.com/frontend:v1.0.0
```

List images

```bash
docker images
```

Inspect image

```bash
docker image inspect frontend:v1.0.0
```

---

# Key Takeaways

Docker Image Registries provide centralized, secure, and versioned storage for container images.

They enable CI/CD pipelines, Kubernetes deployments, production rollbacks, and image sharing across environments.

For our Enterprise DevOps Platform, every image will be built in GitHub Actions, scanned for vulnerabilities, stored in a registry, and deployed to the Kubernetes cluster from that registry.

---

# Marathi Quick Revision

Docker Registry म्हणजे

- Images store करण्याची जागा
- CI/CD साठी आवश्यक
- Kubernetes image इथून pull करतो
- Version management
- Rollback support

Commands

```bash
docker login
docker push
docker pull
```

---

# Marathi Interview Memory Tip

Interview मध्ये जर विचारलं:

"Docker Registry म्हणजे काय?"

असं सांगा:

"Docker Registry ही Docker Images साठवण्यासाठी आणि वितरित करण्यासाठी वापरली जाणारी centralized repository आहे. CI/CD pipeline image build करून registry मध्ये push करते आणि Kubernetes deployment दरम्यान त्या registry मधून image pull करतो. यामुळे version control, rollback, security आणि scalable deployments शक्य होतात."

