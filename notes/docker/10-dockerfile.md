# Dockerfile

## Purpose

This document explains Dockerfiles from an Enterprise DevOps perspective.

A Dockerfile is the source code used to build Docker Images. Every containerized application begins with a well-designed Dockerfile.

For our Enterprise DevOps Platform, each service (Frontend, API Gateway, Auth Service, Dashboard Service) will have its own Dockerfile.

---

# Introduction

A Dockerfile is a plain text file containing instructions that Docker follows to build an image.

Think of it as a recipe.

```text
Dockerfile

↓

docker build

↓

Docker Image

↓

docker run

↓

Docker Container
```

Without a Dockerfile, Docker cannot automatically package an application into an image.

---

# Why Dockerfiles are Important

Dockerfiles provide

- Repeatable builds
- Version-controlled infrastructure
- Consistent deployments
- Automated image creation
- Portable applications

Every image built from the same Dockerfile will be identical, assuming the same dependencies.

---

# Dockerfile Architecture

```text
Application Source Code

↓

Dockerfile

↓

Docker Build

↓

Docker Image

↓

Container Registry

↓

Docker Container

↓

Kubernetes
```

The Dockerfile is the starting point of the container lifecycle.

---

# Basic Dockerfile Example

```dockerfile
FROM python:3.12-slim

WORKDIR /app

COPY . .

RUN pip install -r requirements.txt

EXPOSE 5000

CMD ["python", "app.py"]
```

Each instruction creates a new image layer.

---

# Dockerfile Instructions

Common instructions include

- FROM
- LABEL
- WORKDIR
- COPY
- ADD
- RUN
- ENV
- EXPOSE
- USER
- CMD
- ENTRYPOINT
- ARG
- VOLUME

These are the building blocks of every Dockerfile.

---

# FROM

Purpose

Defines the base image.

Example

```dockerfile
FROM python:3.12-slim
```

Every Dockerfile begins with a FROM instruction.

---

# LABEL

Purpose

Stores metadata.

Example

```dockerfile
LABEL maintainer="DevOps Team"
```

Useful for documentation and image management.

---

# WORKDIR

Purpose

Sets the working directory.

Example

```dockerfile
WORKDIR /app
```

All following commands execute from this directory.

---

# COPY

Purpose

Copies files into the image.

Example

```dockerfile
COPY . .
```

This copies the current directory into the container.

---

# ADD

Purpose

Copies files and supports remote URLs and archive extraction.

Example

```dockerfile
ADD application.tar.gz /app
```

Best Practice

Prefer COPY unless ADD features are required.

---

# RUN

Purpose

Executes commands during image build.

Example

```dockerfile
RUN apt-get update
```

Another example

```dockerfile
RUN pip install -r requirements.txt
```

RUN executes only during image creation.

---

# ENV

Purpose

Defines environment variables.

Example

```dockerfile
ENV PORT=5000
```

Applications can access these variables during runtime.

---

# EXPOSE

Purpose

Documents the listening port.

Example

```dockerfile
EXPOSE 5000
```

EXPOSE does not publish the port.

It simply documents the intended network port.

---

# USER

Purpose

Runs the application as a non-root user.

Example

```dockerfile
USER appuser
```

Running containers as non-root improves security.

---

# CMD

Purpose

Defines the default command.

Example

```dockerfile
CMD ["python","app.py"]
```

Only one CMD should exist.

The last CMD overrides previous ones.

---

# ENTRYPOINT

Purpose

Defines the executable that always runs.

Example

```dockerfile
ENTRYPOINT ["python"]
```

Combined with CMD

```dockerfile
ENTRYPOINT ["python"]

CMD ["app.py"]
```

---

# ARG

Purpose

Defines build-time variables.

Example

```dockerfile
ARG VERSION=1.0
```

Available only during image build.

---

# VOLUME

Purpose

Creates a mount point for persistent data.

Example

```dockerfile
VOLUME /data
```

Used when application data must survive container replacement.

---

# Dockerfile Build Process

```text
Dockerfile

↓

Read Instructions

↓

Create Layers

↓

Build Image

↓

Store Image

↓

Run Container
```

Each instruction typically creates a cached layer.

---

# Dockerfile for Our Project

Frontend

```dockerfile
FROM node:22-alpine
```

API Gateway

```dockerfile
FROM python:3.12-slim
```

Auth Service

```dockerfile
FROM python:3.12-slim
```

Dashboard Service

```dockerfile
FROM python:3.12-slim
```

Each microservice has its own independent Dockerfile.

---

# Enterprise Workflow

Developer

↓

Modify Dockerfile

↓

Git Commit

↓

GitHub Actions

↓

docker build

↓

Image Scan

↓

Push Registry

↓

Deploy Kubernetes

Dockerfiles are version-controlled alongside application code.

---

# Internal Workflow

Developer executes

```bash
docker build -t api:v1 .
```

Docker

↓

Reads Dockerfile

↓

Downloads Base Image

↓

Executes Instructions

↓

Creates Layers

↓

Builds Image

↓

Stores Image

---

# Daily DevOps Activities

DevOps Engineers regularly

- Update base images
- Optimize Dockerfiles
- Reduce image size
- Build images
- Troubleshoot build failures
- Review Dockerfile security
- Scan images
- Maintain version consistency

---

# Production Best Practices

- Use official base images.
- Pin image versions.
- Use small base images.
- Minimize image layers.
- Remove unnecessary packages.
- Use COPY instead of ADD where possible.
- Run applications as non-root users.
- Use multi-stage builds.
- Keep Dockerfiles simple and readable.

---

# Security Considerations

- Avoid embedding secrets.
- Use trusted base images.
- Update dependencies regularly.
- Run as non-root.
- Remove build tools from production images.
- Scan images after every build.
- Minimize attack surface.

---

# Troubleshooting

Build image

```bash
docker build -t app:v1 .
```

View build output

```bash
docker build --progress=plain .
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

# Real Production Scenario

Scenario

A production deployment fails because the application cannot start.

Investigation

The Dockerfile copied application files before installing dependencies, causing unnecessary cache invalidation and slower builds.

Resolution

Reorder Dockerfile instructions to maximize layer caching.

Result

- Faster builds
- Smaller deployment time
- Reduced CI/CD duration

---

# Scenario-Based Interview Questions

## Question 1

What is a Dockerfile?

Answer

A Dockerfile is a text file containing instructions used to build a Docker Image automatically.

---

## Question 2

What is the difference between RUN and CMD?

Answer

RUN executes commands during image build.

CMD specifies the default command executed when a container starts.

---

## Question 3

Why should COPY usually be preferred over ADD?

Answer

COPY performs only file copying and is simpler.

ADD provides additional features like archive extraction and remote URL downloads, which are unnecessary in most cases.

---

# Architecture-Level Interview Questions

## Question

Why does each Dockerfile instruction create a layer?

Answer

Layering enables caching, reduces storage usage, speeds up builds, and allows efficient image distribution.

---

## Question

Why should Dockerfiles be version-controlled?

Answer

Version control provides traceability, reproducibility, collaboration, and rollback capability.

---

## Question

Why are multi-stage builds recommended?

Answer

Multi-stage builds remove unnecessary build dependencies from production images, reducing image size and improving security.

---

# Production Support Questions

Q.

A Docker build suddenly becomes much slower.

What should you investigate?

Answer

Review

- Dockerfile instruction order
- Cache invalidation
- Base image changes
- Dependency downloads
- Build context size

---

Q.

An application works locally but fails inside a container.

Possible Dockerfile causes?

Answer

Investigate

- Incorrect COPY instruction
- Wrong WORKDIR
- Missing dependencies
- Incorrect CMD
- Environment variables
- Base image mismatch

---

# Related Runbooks

Future runbooks

- Build Docker Image
- Optimize Dockerfile
- Troubleshoot Docker Build Failure
- Scan Docker Images
- Implement Multi-Stage Builds

---

# Common Incidents

- Docker build failure
- Missing application files
- Incorrect CMD
- Dependency installation failure
- Wrong base image
- Large image size
- Cache invalidation
- Build timeout

---

# Commands

Build image

```bash
docker build -t app:v1 .
```

Build without cache

```bash
docker build --no-cache .
```

View image history

```bash
docker history app:v1
```

Inspect image

```bash
docker image inspect app:v1
```

List images

```bash
docker images
```

---

# Key Takeaways

A Dockerfile is the blueprint used to create Docker Images.

It defines the operating system, runtime, dependencies, application files, startup commands, and configuration needed to run an application consistently.

For our Enterprise DevOps Platform, every service will have its own optimized Dockerfile, forming the foundation of our CI/CD pipeline and Kubernetes deployments.

---

# Marathi Quick Revision

Dockerfile म्हणजे

- Image build करण्याची recipe
- Text file
- Version controlled
- Repeatable build

Flow

Dockerfile

↓

Build

↓

Image

↓

Container

महत्त्वाच्या instructions

- FROM
- WORKDIR
- COPY
- RUN
- ENV
- EXPOSE
- CMD

---

# Marathi Interview Memory Tip

Interview मध्ये जर विचारलं:

"Dockerfile म्हणजे काय?"

असं सांगा:

"Dockerfile ही Docker Image तयार करण्यासाठी वापरली जाणारी text file आहे. त्यामध्ये FROM, COPY, RUN, ENV, EXPOSE आणि CMD सारख्या instructions असतात. Docker `docker build` command वापरून या instructions execute करून immutable Docker Image तयार करतो."

