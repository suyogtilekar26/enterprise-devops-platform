# Docker Image Optimization

## Purpose

This document explains Docker Image Optimization from an Enterprise DevOps perspective.

Optimizing Docker images reduces image size, improves deployment speed, lowers infrastructure costs, minimizes security vulnerabilities, and accelerates CI/CD pipelines.

For our Enterprise DevOps Platform, every production image will follow optimization best practices.

---

# Introduction

A Docker image should contain **only what is necessary** to run the application.

Anything extra

- Increases image size
- Slows builds
- Slows deployments
- Consumes storage
- Increases attack surface

Optimization focuses on making images

- Smaller
- Faster
- More secure
- Easier to maintain

---

# Why Optimize Docker Images?

Benefits

- Faster builds
- Faster downloads
- Faster Kubernetes deployments
- Lower registry storage
- Reduced network traffic
- Improved security
- Lower cloud costs

Image optimization is a standard enterprise DevOps practice.

---

# Optimization Workflow

```text
Application

↓

Dockerfile

↓

Optimize Layers

↓

Reduce Dependencies

↓

Smaller Image

↓

Registry

↓

Kubernetes
```

---

# Choose a Small Base Image

Bad

```dockerfile
FROM ubuntu
```

Better

```dockerfile
FROM python:3.12-slim
```

Better still (when compatible)

```dockerfile
FROM alpine
```

Smaller base images reduce overall image size.

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

Benefits

- Reproducible builds
- Stable deployments
- Predictable updates

---

# Use Multi-Stage Builds

Bad

```text
Builder

↓

Runtime

↓

Same Image
```

Good

```text
Builder Stage

↓

Copy Artifacts

↓

Runtime Stage
```

Only runtime artifacts remain.

---

# Optimize Layer Order

Bad

```dockerfile
COPY .

RUN pip install -r requirements.txt
```

Good

```dockerfile
COPY requirements.txt .

RUN pip install -r requirements.txt

COPY .
```

Dependency layers remain cached.

---

# Combine RUN Instructions

Bad

```dockerfile
RUN apt-get update

RUN apt-get install -y curl

RUN apt-get install -y vim
```

Better

```dockerfile
RUN apt-get update && \
    apt-get install -y curl vim
```

Fewer layers are created.

---

# Remove Temporary Files

Example

```dockerfile
RUN apt-get update && \
    apt-get install -y curl && \
    rm -rf /var/lib/apt/lists/*
```

Temporary package metadata is removed.

---

# Use .dockerignore

Example

```text
node_modules
.git
*.log
.env
coverage
```

This reduces Build Context size.

---

# Avoid Installing Unnecessary Packages

Install only required software.

Example

Bad

```text
curl
git
vim
nano
gcc
make
```

Good

Only install packages needed at runtime.

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

Improves container security.

---

# Copy Only Required Files

Bad

```dockerfile
COPY . .
```

Better

```dockerfile
COPY app.py .

COPY requirements.txt .
```

Only required files are included.

---

# Avoid Secrets

Never copy

- Passwords
- SSH keys
- API keys
- Certificates
- Tokens

Use

- Environment variables
- Secret managers
- Kubernetes Secrets

---

# Clean Package Manager Cache

Python

```dockerfile
RUN pip install --no-cache-dir -r requirements.txt
```

Node.js

```dockerfile
RUN npm ci
```

Linux

```dockerfile
rm -rf /var/lib/apt/lists/*
```

Removes unnecessary cache files.

---

# Optimization in Our Project

Frontend

- Node Builder
- Nginx Runtime
- Multi-stage build
- Ignore node_modules
- Serve static assets only

Backend

- python:3.12-slim
- Non-root user
- requirements.txt cached
- Multi-stage build where applicable
- Gunicorn runtime only

---

# Image Size Comparison

Before Optimization

```text
1.2 GB
```

After Optimization

```text
180 MB
```

Smaller images improve deployment speed significantly.

---

# Enterprise Workflow

Developer

↓

Update Dockerfile

↓

Git Push

↓

GitHub Actions

↓

Optimized Build

↓

Security Scan

↓

Registry

↓

Kubernetes Deployment

Optimization benefits every deployment stage.

---

# Internal Workflow

Docker

↓

Read Dockerfile

↓

Reuse Cached Layers

↓

Remove Temporary Files

↓

Generate Optimized Image

↓

Push Registry

---

# Daily DevOps Activities

DevOps Engineers

- Reduce image size
- Review Dockerfiles
- Optimize layers
- Enable caching
- Scan images
- Remove unnecessary packages
- Improve deployment performance

---

# Production Best Practices

- Use official minimal images.
- Pin versions.
- Use multi-stage builds.
- Combine RUN instructions.
- Remove temporary files.
- Use .dockerignore.
- Run as non-root.
- Copy only required files.
- Scan every image.
- Keep images immutable.

---

# Security Considerations

- Remove build tools.
- Avoid secrets.
- Use trusted images.
- Scan images regularly.
- Keep dependencies updated.
- Minimize installed software.
- Reduce attack surface.

---

# Troubleshooting

Check image size

```bash
docker images
```

Inspect image

```bash
docker image inspect app:v1
```

View layer history

```bash
docker history app:v1
```

Build without cache

```bash
docker build --no-cache .
```

---

# Real Production Scenario

Scenario

A Kubernetes rollout is taking too long.

Investigation reveals

Backend image

```text
1.5 GB
```

Problems

- Single-stage build
- Build tools included
- Package cache retained
- Git repository copied
- Temporary files present

Resolution

- Multi-stage build
- `.dockerignore`
- Remove package cache
- Use python:3.12-slim
- Run as non-root

Result

Image reduced

```text
1.5 GB

↓

210 MB
```

Pod startup time reduced significantly.

---

# Scenario-Based Interview Questions

## Question 1

Why should Docker images be optimized?

Answer

To reduce image size, improve build performance, accelerate deployments, reduce storage costs, and improve security.

---

## Question 2

Which optimization provides the largest image size reduction?

Answer

Multi-stage builds often provide the greatest reduction because build tools and intermediate artifacts are excluded from the final image.

---

## Question 3

Why is `.dockerignore` important for optimization?

Answer

It reduces the Build Context, improving build performance and preventing unnecessary files from being included.

---

# Architecture-Level Interview Questions

## Question

Why do enterprise organizations prefer slim runtime images?

Answer

Slim images reduce attack surface, storage usage, registry transfer time, and Kubernetes deployment time.

---

## Question

Why should package manager caches be removed?

Answer

They consume storage but provide no runtime benefit in production images.

---

## Question

Why should images be immutable?

Answer

Immutable images ensure consistency, reproducibility, reliable rollbacks, and predictable deployments.

---

# Production Support Questions

Q.

A production image is unexpectedly large.

What should you investigate?

Answer

Review

- Base image
- Multi-stage build
- Dockerfile
- Package cache
- Temporary files
- Layer history
- Build artifacts

---

Q.

Pods take several minutes to start.

Possible Docker-related causes?

Answer

- Large image
- Slow image download
- Inefficient Dockerfile
- Large dependency layer
- Unoptimized runtime image

---

# Related Runbooks

Future runbooks

- Optimize Docker Images
- Reduce Image Size
- Implement Multi-Stage Builds
- Remove Temporary Files
- Troubleshoot Large Docker Images

---

# Common Incidents

- Oversized images
- Slow deployments
- Slow image downloads
- Build cache issues
- Package cache retained
- Source code copied unnecessarily
- Runtime contains build tools

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

View image history

```bash
docker history app:v1
```

Build without cache

```bash
docker build --no-cache .
```

---

# Key Takeaways

Docker Image Optimization is the process of reducing image size while improving performance, security, and maintainability.

Techniques such as using minimal base images, multi-stage builds, proper layer ordering, `.dockerignore`, package cleanup, and non-root users create production-ready images suitable for enterprise environments.

For our Enterprise DevOps Platform, optimized images will reduce deployment time, improve Kubernetes startup performance, lower cloud costs, and strengthen security.

---

# Marathi Quick Revision

Docker Image Optimization

- Small base image
- Multi-stage build
- Slim runtime
- Layer caching
- .dockerignore
- Remove cache
- Non-root user
- Copy only required files

फायदे

- Image लहान
- Deployment जलद
- Security चांगली
- CI/CD वेगवान

---

# Marathi Interview Memory Tip

Interview मध्ये जर विचारलं:

"Docker Image Optimization कशी करता?"

असं सांगा:

"मी slim base image वापरतो, multi-stage build implement करतो, `.dockerignore` वापरून build context कमी करतो, dependency layers optimize करतो, package cache remove करतो, image non-root user ने चालवतो आणि फक्त आवश्यक runtime files final image मध्ये ठेवतो. यामुळे image लहान, सुरक्षित आणि production-ready बनते."

