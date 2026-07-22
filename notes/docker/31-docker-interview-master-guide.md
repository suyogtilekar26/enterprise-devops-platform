# Docker Interview Master Guide

## Purpose

This document serves as the final revision guide for Docker. It consolidates the most important Docker concepts, production knowledge, troubleshooting practices, architecture discussions, and interview questions that an Enterprise DevOps Engineer is expected to know.

For our Enterprise DevOps Platform, Docker is the foundation that enables consistent application packaging before introducing Kubernetes, Helm, GitHub Actions, Argo CD, Terraform, and cloud infrastructure.

---

# Docker Learning Journey

```text
Docker Introduction

↓

Docker Installation

↓

Docker Architecture

↓

Docker Components

↓

Images

↓

Containers

↓

Dockerfile

↓

Build Process

↓

Image Optimization

↓

Registries

↓

Security

↓

Image Scanning

↓

Image Signing

↓

Supply Chain Security

↓

Best Practices

↓

Troubleshooting

↓

Enterprise Deployment
```

---

# Docker in Our Enterprise Project

Application

```text
React Frontend

↓

API Gateway

↓

Auth Service

↓

Dashboard Service
```

Container Flow

```text
Developer

↓

GitHub

↓

GitHub Actions

↓

Docker Build

↓

Image Scan

↓

Image Sign

↓

Container Registry

↓

Kind Kubernetes

↓

Pods
```

Docker is responsible for creating portable application artifacts.

---

# Docker Architecture Revision

Docker consists of

- Docker Client
- Docker Engine
- Docker Daemon
- REST API
- Images
- Containers
- Networks
- Volumes
- Registries

Workflow

```text
Docker CLI

↓

Docker Daemon

↓

Image

↓

Container
```

---

# Docker Lifecycle

```text
Source Code

↓

Dockerfile

↓

docker build

↓

Docker Image

↓

docker run

↓

Container

↓

Registry

↓

Kubernetes
```

---

# Important Docker Commands

Build image

```bash
docker build -t frontend:v1 .
```

Run container

```bash
docker run frontend:v1
```

Run in background

```bash
docker run -d frontend:v1
```

List images

```bash
docker images
```

List running containers

```bash
docker ps
```

List all containers

```bash
docker ps -a
```

Inspect image

```bash
docker image inspect frontend:v1
```

Inspect container

```bash
docker inspect container_id
```

Container logs

```bash
docker logs container_id
```

Follow logs

```bash
docker logs -f container_id
```

Container statistics

```bash
docker stats
```

List networks

```bash
docker network ls
```

List volumes

```bash
docker volume ls
```

System cleanup

```bash
docker system prune
```

---

# Dockerfile Revision

Common instructions

```dockerfile
FROM
WORKDIR
COPY
ADD
RUN
ENV
EXPOSE
USER
CMD
ENTRYPOINT
HEALTHCHECK
```

Interview Tip

Know the purpose of every Dockerfile instruction.

---

# Multi-Stage Builds

Workflow

```text
Builder Image

↓

Compile

↓

Copy Binary

↓

Runtime Image
```

Benefits

- Smaller images
- Better security
- Faster deployment

---

# Docker Networking

Types

- bridge
- host
- none
- overlay
- macvlan

Enterprise projects mostly use bridge locally and Kubernetes networking in production.

---

# Docker Volumes

Purpose

Persistent storage

Used for

- Databases
- Uploaded files
- Application data

Do not store important data inside containers.

---

# Docker Registries

Examples

- Docker Hub
- GitHub Container Registry
- Amazon ECR
- Harbor

Enterprise features

- RBAC
- Vulnerability scanning
- Audit logs
- Image signing
- Replication

---

# Docker Security

Major topics

- Non-root containers
- Slim base images
- Image scanning
- Image signing
- Trusted registries
- Secret management
- Least privilege

---

# Image Scanning

Popular tools

- Trivy
- Docker Scout
- Grype
- Snyk

Goal

Detect vulnerabilities before deployment.

---

# Image Signing

Popular tools

- Cosign
- Sigstore
- Docker Notary

Goal

Verify authenticity and integrity of images.

---

# Software Supply Chain Security

Protect

- Source code
- Dependencies
- Build pipelines
- Container images
- Registries
- Deployments

Every stage must be trusted.

---

# Docker Best Practices

Always

- Use official images.
- Pin versions.
- Keep images small.
- Use multi-stage builds.
- Run as non-root.
- Remove unnecessary packages.
- Use .dockerignore.
- Scan images.
- Sign production images.
- Use immutable deployments.

---

# Docker Troubleshooting Workflow

```text
Issue

↓

Logs

↓

Inspect

↓

Configuration

↓

Root Cause

↓

Fix

↓

Validation

↓

Documentation
```

---

# Production Workflow

```text
Developer

↓

GitHub

↓

CI Pipeline

↓

Docker Build

↓

Scan

↓

Sign

↓

Registry

↓

Kubernetes

↓

Production
```

---

# Daily Responsibilities of a DevOps Engineer

- Write Dockerfiles
- Build images
- Optimize image size
- Push images
- Maintain registries
- Troubleshoot containers
- Scan vulnerabilities
- Sign images
- Support deployments
- Resolve production incidents

---

# Top 25 Docker Interview Questions

## 1. What is Docker?

Docker is a containerization platform that packages applications and their dependencies into portable containers.

---

## 2. Difference between Virtual Machines and Containers?

Virtual Machines virtualize hardware.

Containers virtualize the operating system.

Containers are faster and lightweight.

---

## 3. What is a Docker Image?

A read-only template used to create containers.

---

## 4. What is a Docker Container?

A running instance of a Docker image.

---

## 5. Difference between Image and Container?

Image

Static template.

Container

Running process.

---

## 6. What is Dockerfile?

A text file containing instructions used to build Docker images.

---

## 7. Difference between CMD and ENTRYPOINT?

CMD

Provides default command.

ENTRYPOINT

Defines the main executable.

---

## 8. Why use Multi-stage Builds?

Reduce image size and remove unnecessary build dependencies.

---

## 9. What is .dockerignore?

Excludes unnecessary files from the build context.

---

## 10. Why should containers run as non-root?

To reduce security risks using the principle of least privilege.

---

## 11. Why avoid latest tags?

They make deployments unpredictable because the image content can change.

---

## 12. What is a Docker Registry?

A repository that stores Docker images.

---

## 13. What is Docker Hub?

Docker's public image registry.

---

## 14. What is Amazon ECR?

AWS managed private container registry.

---

## 15. What is Docker Content Trust?

A mechanism that verifies image authenticity using digital signatures.

---

## 16. What is Image Signing?

Cryptographically verifying that an image is trusted and unchanged.

---

## 17. What is Trivy?

A vulnerability scanner for container images and filesystems.

---

## 18. What is Software Supply Chain Security?

Protection of every stage involved in software delivery.

---

## 19. What causes CrashLoopBackOff?

Application crashes repeatedly after startup.

---

## 20. What causes ImagePullBackOff?

Image cannot be pulled because of missing images, authentication failures, or incorrect tags.

---

## 21. How do you investigate container failures?

Check

- docker ps -a
- docker logs
- docker inspect
- docker stats

---

## 22. What is Docker Layer Caching?

Reusing previously built layers to reduce build time.

---

## 23. Why use Health Checks?

To detect unhealthy containers automatically.

---

## 24. What are immutable images?

Images that are never modified after being built.

---

## 25. What are Docker Best Practices?

- Official images
- Version pinning
- Multi-stage builds
- Non-root user
- Health checks
- Image scanning
- Image signing
- Minimal images
- Immutable deployments

---

# Architecture Interview Questions

## Explain Docker Architecture.

Docker consists of a Client communicating with the Docker Daemon through the Docker Engine API. The daemon manages images, containers, networks, and volumes.

---

## Explain Docker Build Process.

Docker reads the Dockerfile instruction by instruction, creates image layers, caches reusable layers, and produces a final immutable image.

---

## Explain Enterprise Docker Workflow.

Developer pushes code.

CI builds Docker image.

Security scans execute.

Image is signed.

Registry stores image.

Kubernetes deploys trusted image.

---

## Explain Why Containers are Immutable.

Instead of modifying running containers, a new image is built and redeployed, ensuring consistency and rollback capability.

---

# Production Support Interview Questions

## Production deployment failed after Docker image update.

What do you check?

Answer

- Logs
- Image version
- Registry
- Environment variables
- Health endpoint
- Startup command

---

## Container restarts continuously.

Investigation

- docker logs
- docker inspect
- Health checks
- Resource limits
- Exit code

---

## CI pipeline cannot push image.

Possible causes

- Authentication
- Permissions
- Registry outage
- Wrong repository
- Incorrect tag

---

## Registry storage fills quickly.

Possible solutions

- Remove unused images
- Enable lifecycle policies
- Delete old tags
- Compress images
- Reduce image size

---

# Docker Topics Frequently Asked in Interviews

- Docker Architecture
- Dockerfile
- Docker Images
- Containers
- Docker Networking
- Docker Volumes
- Docker Compose
- Registries
- Image Optimization
- Multi-stage Builds
- Layer Caching
- Docker Security
- Image Scanning
- Image Signing
- Docker Troubleshooting
- Supply Chain Security

---

# Related Runbooks

Future runbooks

- Build Docker Images
- Troubleshoot Containers
- Optimize Docker Images
- Scan Docker Images
- Sign Docker Images
- Push Images to Registry
- Recover Docker Engine

---

# Common Production Incidents

- Docker daemon unavailable
- Registry authentication failure
- Image pull failure
- Large image size
- Container restart loop
- Vulnerable images
- Missing secrets
- Port conflicts
- Disk full
- Failed health checks

---

# Final Revision Checklist

You should now be comfortable explaining

- Docker Architecture
- Docker Engine
- Docker Images
- Containers
- Dockerfile
- Build Context
- Layer Caching
- Multi-stage Builds
- Image Optimization
- Registries
- Docker Security
- Vulnerability Scanning
- Image Signing
- Docker Content Trust
- Supply Chain Security
- Best Practices
- Troubleshooting

---

# Key Takeaways

Docker is the foundational container platform used throughout modern DevOps workflows.

Enterprise DevOps engineers must understand not only how to build and run containers, but also how to optimize, secure, scan, sign, troubleshoot, and operate them reliably at scale.

For our Enterprise DevOps Platform, Docker provides the standardized application packaging layer that enables seamless integration with GitHub Actions, Kubernetes, Helm, Argo CD, Terraform, monitoring platforms, and cloud infrastructure.

---

# Marathi Quick Revision

Docker Interview Revision

- Architecture
- Images
- Containers
- Dockerfile
- Build
- Networking
- Volumes
- Registries
- Security
- Trivy
- Cosign
- Supply Chain
- Best Practices
- Troubleshooting

---

# Marathi Interview Memory Tip

Interview मध्ये जर विचारलं:

"Docker मध्ये सर्वात महत्त्वाच्या गोष्टी कोणत्या?"

असं सांगा:

"Docker Architecture, Images, Containers, Dockerfile, Layer Caching, Multi-stage Builds, Networking, Volumes, Registries, Security, Image Scanning, Image Signing, Supply Chain Security, Best Practices आणि Production Troubleshooting या सर्व विषयांवर चांगली समज असणे Enterprise DevOps Engineer साठी अत्यंत महत्त्वाचे आहे."

