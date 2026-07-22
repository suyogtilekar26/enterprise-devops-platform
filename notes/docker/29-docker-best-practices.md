# Docker Best Practices

## Purpose

This document explains Docker Best Practices from an Enterprise DevOps perspective.

Docker Best Practices ensure that containerized applications are secure, reliable, efficient, maintainable, and production-ready.

For our Enterprise DevOps Platform, every Dockerfile, image, container, and deployment will follow these best practices before progressing to Kubernetes and CI/CD implementation.

---

# Introduction

Docker makes it easy to package and deploy applications, but poorly designed containers can introduce

- Security vulnerabilities
- Performance issues
- Operational complexity
- Deployment failures
- Difficult troubleshooting

Following best practices minimizes these risks.

---

# Docker Lifecycle

```text
Application

↓

Dockerfile

↓

Docker Build

↓

Docker Image

↓

Container Registry

↓

Kubernetes

↓

Production
```

Best practices apply at every stage.

---

# Why Best Practices Matter

Benefits

- Faster builds
- Smaller images
- Better security
- Easier maintenance
- Faster deployments
- Reliable rollbacks
- Improved scalability
- Better compliance

---

# Use Official Base Images

Preferred

```dockerfile
FROM python:3.12-slim
```

Avoid

- Unknown publishers
- Unmaintained images
- Outdated images

---

# Pin Image Versions

Avoid

```dockerfile
FROM python:latest
```

Preferred

```dockerfile
FROM python:3.12-slim
```

Version pinning improves reproducibility.

---

# Keep Images Small

Use

- Slim images
- Alpine (when compatible)
- Multi-stage builds

Benefits

- Faster pull
- Lower storage
- Reduced attack surface

---

# Use Multi-Stage Builds

Builder

↓

Compile

↓

Copy Runtime Artifacts

↓

Final Image

Do not include build tools in runtime images.

---

# Optimize Layer Caching

Correct order

```dockerfile
COPY requirements.txt .

RUN pip install -r requirements.txt

COPY .
```

Frequently changing files should be copied last.

---

# Use .dockerignore

Example

```text
.git
.env
node_modules
coverage
*.log
```

Reduces build context and avoids leaking unnecessary files.

---

# Remove Temporary Files

Example

```dockerfile
RUN apt-get update && \
    apt-get install -y curl && \
    rm -rf /var/lib/apt/lists/*
```

Always clean package caches.

---

# Run as Non-Root

Bad

```dockerfile
USER root
```

Better

```dockerfile
RUN useradd appuser

USER appuser
```

Follow the principle of least privilege.

---

# Do Not Store Secrets

Never include

- Passwords
- API Keys
- SSH Keys
- Tokens
- Certificates

Use

- Environment Variables
- Kubernetes Secrets
- Secret Managers

---

# Keep Containers Stateless

Containers should not permanently store

- User uploads
- Database files
- Logs

Persistent data belongs in external storage.

---

# One Process Per Container

Good

```text
One Service

↓

One Container
```

Avoid combining multiple unrelated services in one container.

---

# Use Health Checks

Example

```dockerfile
HEALTHCHECK CMD curl -f http://localhost:8080/health || exit 1
```

Health checks improve orchestration reliability.

---

# Use Immutable Images

Never modify a running container.

Instead

```text
Update Code

↓

Build New Image

↓

Deploy New Version
```

---

# Scan Images

Every image should be scanned before deployment.

Typical tools

- Trivy
- Docker Scout
- Grype
- Snyk

---

# Sign Images

Use image signing to verify authenticity.

Examples

- Cosign
- Sigstore

Only trusted images should be deployed.

---

# Use Trusted Registries

Production registries should provide

- Authentication
- TLS
- RBAC
- Vulnerability scanning
- Audit logging

Examples

- Amazon ECR
- GHCR
- Harbor

---

# Monitor Containers

Monitor

- CPU
- Memory
- Restarts
- Health
- Logs
- Disk usage

Observability is essential in production.

---

# Docker Best Practices in Our Project

Frontend

- Multi-stage build
- Nginx runtime
- Static assets only

Backend Services

- python:3.12-slim
- Non-root user
- Health endpoints
- Minimal dependencies
- Versioned images

Deployment Flow

```text
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

Registry

↓

Kind Kubernetes

↓

Pods
```

---

# Enterprise Workflow

Developer

↓

Code Review

↓

CI Pipeline

↓

Docker Build

↓

Security Scan

↓

Image Signing

↓

Registry

↓

Deployment

Best practices are enforced automatically through CI/CD.

---

# Internal Workflow

Source Code

↓

Dockerfile

↓

Optimized Build

↓

Security Validation

↓

Registry

↓

Deployment

---

# Daily DevOps Activities

DevOps Engineers

- Review Dockerfiles
- Optimize image size
- Update base images
- Scan images
- Monitor CVEs
- Verify health checks
- Manage registries
- Improve build performance

---

# Production Best Practices

- Use official base images.
- Pin image versions.
- Keep images small.
- Use multi-stage builds.
- Run as non-root.
- Never store secrets.
- Use .dockerignore.
- Scan every image.
- Sign production images.
- Use immutable deployments.
- Enable health checks.
- Monitor containers continuously.

---

# Security Considerations

- Restrict registry access.
- Rotate credentials.
- Remove vulnerable packages.
- Protect signing keys.
- Verify image provenance.
- Enable TLS everywhere.
- Use least privilege.

---

# Troubleshooting

Inspect image

```bash
docker image inspect frontend:v1
```

View image history

```bash
docker history frontend:v1
```

List images

```bash
docker images
```

Run container

```bash
docker run frontend:v1
```

---

# Real Production Scenario

Scenario

A production deployment experiences slow startup times and repeated security findings.

Investigation

- Large image
- Root user
- Unused packages
- No image scanning
- Missing health checks

Resolution

- Multi-stage build
- Slim base image
- Remove unused software
- Add health checks
- Scan and sign images
- Deploy new version

Result

Deployment becomes faster, more secure, and easier to maintain.

---

# Scenario-Based Interview Questions

## Question 1

What are Docker Best Practices?

Answer

They are recommended approaches for building, securing, deploying, and maintaining Docker images and containers efficiently in production environments.

---

## Question 2

Why should containers be stateless?

Answer

Stateless containers are easier to scale, replace, and recover because persistent data is stored externally.

---

## Question 3

Why are health checks important?

Answer

Health checks allow orchestration platforms like Kubernetes to detect unhealthy containers and automatically recover them.

---

# Architecture-Level Interview Questions

## Question

Why are immutable images preferred?

Answer

Immutable images improve consistency, traceability, and rollback reliability by ensuring deployed artifacts never change.

---

## Question

Why is one process per container recommended?

Answer

It simplifies lifecycle management, scaling, monitoring, and troubleshooting.

---

## Question

Why automate Docker best practices in CI/CD?

Answer

Automation ensures every build consistently follows organizational standards without manual verification.

---

# Production Support Questions

Q.

Containers restart frequently after deployment.

What should you investigate?

Answer

Review

- Health checks
- Logs
- Resource limits
- Image version
- Application startup
- Configuration

---

Q.

Production images continue to fail security reviews.

Possible causes?

Answer

- Outdated base image
- Missing scans
- Embedded secrets
- Excessive packages
- Root user
- Unpatched vulnerabilities

---

# Related Runbooks

Future runbooks

- Optimize Docker Images
- Secure Docker Images
- Troubleshoot Container Restarts
- Configure Health Checks
- Build Production Docker Images

---

# Common Incidents

- Large images
- Vulnerable images
- Missing health checks
- Root user execution
- Embedded secrets
- ImagePullBackOff
- Container CrashLoopBackOff

---

# Commands

Build image

```bash
docker build -t frontend:v1 .
```

Run container

```bash
docker run frontend:v1
```

List images

```bash
docker images
```

Inspect image

```bash
docker image inspect frontend:v1
```

View history

```bash
docker history frontend:v1
```

---

# Key Takeaways

Docker Best Practices combine security, performance, maintainability, and operational excellence into a consistent approach for building production-ready containers.

Enterprise DevOps teams standardize Dockerfiles, optimize images, automate scanning and signing, use trusted registries, enforce health checks, and deploy immutable images through CI/CD pipelines.

For our Enterprise DevOps Platform, these practices form the foundation for reliable Kubernetes deployments and secure production operations.

---

# Marathi Quick Revision

Docker Best Practices

- Official base image
- Version pin करा
- Multi-stage build
- Slim image
- Non-root user
- .dockerignore वापरा
- Secrets image मध्ये ठेवू नका
- Image scan करा
- Image sign करा
- Health checks वापरा
- Stateless containers ठेवा

---

# Marathi Interview Memory Tip

Interview मध्ये जर विचारलं:

"Docker Best Practices कोणत्या?"

असं सांगा:

"Production मध्ये official minimal base images वापरतो, image versions pin करतो, multi-stage builds वापरून image size कमी करतो, containers non-root user ने चालवतो, secrets बाहेर ठेवतो, प्रत्येक image scan आणि sign करतो, health checks configure करतो आणि immutable, versioned images CI/CD pipeline मधून deploy करतो."

