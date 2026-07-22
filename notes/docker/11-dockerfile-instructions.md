# Dockerfile Instructions (Complete Reference)

## Purpose

This document explains every major Dockerfile instruction used in enterprise containerized applications.

A DevOps Engineer must understand not only what each instruction does but also when to use it, when not to use it, and its impact on image size, security, caching, and production deployments.

For our Enterprise DevOps Platform, every microservice Dockerfile will use many of these instructions.

---

# Introduction

A Dockerfile is executed from top to bottom.

Each instruction creates a new image layer (except a few metadata instructions).

Docker reads one instruction at a time and builds the image incrementally.

Example

```text
FROM

↓

WORKDIR

↓

COPY

↓

RUN

↓

EXPOSE

↓

CMD
```

---

# Complete List of Common Instructions

- FROM
- LABEL
- ARG
- ENV
- WORKDIR
- COPY
- ADD
- RUN
- USER
- EXPOSE
- VOLUME
- ENTRYPOINT
- CMD
- HEALTHCHECK
- ONBUILD
- STOPSIGNAL
- SHELL

These cover nearly all enterprise Dockerfiles.

---

# FROM

Purpose

Defines the base image.

Syntax

```dockerfile
FROM python:3.12-slim
```

Example

```dockerfile
FROM ubuntu:24.04
```

Best Practices

- Always use official images.
- Pin image versions.
- Avoid latest in production.

---

# LABEL

Purpose

Adds metadata.

Example

```dockerfile
LABEL maintainer="DevOps Team"
LABEL application="Enterprise Platform"
LABEL environment="Production"
```

Used for

- Documentation
- Automation
- Image management

---

# ARG

Purpose

Defines build-time variables.

Example

```dockerfile
ARG VERSION=1.0
```

Usage

```dockerfile
FROM python:3.12

ARG APP_VERSION

RUN echo $APP_VERSION
```

Characteristics

- Available only during build
- Not available after container starts

---

# ENV

Purpose

Defines runtime environment variables.

Example

```dockerfile
ENV PORT=5000
ENV FLASK_ENV=production
```

Unlike ARG,

ENV remains available after the container starts.

---

# WORKDIR

Purpose

Changes the working directory.

Example

```dockerfile
WORKDIR /app
```

Equivalent Linux command

```bash
cd /app
```

Subsequent instructions execute from this location.

---

# COPY

Purpose

Copies local files into the image.

Example

```dockerfile
COPY . .
```

Example

```dockerfile
COPY requirements.txt .
```

Best Practice

Use COPY instead of ADD whenever possible.

---

# ADD

Purpose

Copies files with additional features.

Supports

- Local files
- URLs
- Archive extraction

Example

```dockerfile
ADD app.tar.gz /app
```

Best Practice

Avoid ADD unless archive extraction or remote URLs are required.

---

# RUN

Purpose

Executes commands while building the image.

Example

```dockerfile
RUN apt-get update
```

Example

```dockerfile
RUN pip install -r requirements.txt
```

RUN executes once during image creation.

---

# USER

Purpose

Runs the application as a non-root user.

Example

```dockerfile
RUN useradd appuser

USER appuser
```

Security Best Practice

Never run production applications as root.

---

# EXPOSE

Purpose

Documents the application's listening port.

Example

```dockerfile
EXPOSE 5000
```

Important

EXPOSE does not publish ports.

Port publishing occurs during

```bash
docker run -p
```

---

# VOLUME

Purpose

Creates persistent storage locations.

Example

```dockerfile
VOLUME /data
```

Useful for

- Database storage
- Uploads
- Persistent application data

---

# ENTRYPOINT

Purpose

Defines the executable.

Example

```dockerfile
ENTRYPOINT ["python"]
```

Often combined with CMD.

---

# CMD

Purpose

Provides default parameters or startup commands.

Example

```dockerfile
CMD ["app.py"]
```

Combined Example

```dockerfile
ENTRYPOINT ["python"]

CMD ["app.py"]
```

Result

```text
python app.py
```

---

# HEALTHCHECK

Purpose

Defines container health verification.

Example

```dockerfile
HEALTHCHECK CMD curl --fail http://localhost:5000/health || exit 1
```

Benefits

- Kubernetes readiness
- Docker health monitoring
- Automated recovery

---

# ONBUILD

Purpose

Delays execution until another image uses this image as its base.

Example

```dockerfile
ONBUILD COPY . /app
```

Used mainly for reusable base images.

---

# STOPSIGNAL

Purpose

Defines the signal sent when stopping a container.

Example

```dockerfile
STOPSIGNAL SIGTERM
```

Allows graceful application shutdown.

---

# SHELL

Purpose

Changes the default shell.

Example

```dockerfile
SHELL ["/bin/bash","-c"]
```

Useful when Bash features are required.

---

# Layer Creation

Docker processes

```dockerfile
FROM

RUN

COPY

ENV

CMD
```

↓

Layer 1

↓

Layer 2

↓

Layer 3

↓

Layer 4

↓

Layer 5

Each layer is cached independently.

---

# Instruction Order Best Practice

Recommended

```dockerfile
FROM

WORKDIR

COPY requirements.txt

RUN pip install

COPY .

EXPOSE

CMD
```

This improves Docker cache efficiency.

---

# Dockerfile Instructions in Our Project

Frontend

```dockerfile
FROM node:22-alpine

WORKDIR /app

COPY .

RUN npm install

EXPOSE 5173

CMD ["npm","run","dev"]
```

Backend

```dockerfile
FROM python:3.12-slim

WORKDIR /app

COPY .

RUN pip install -r requirements.txt

EXPOSE 5000

CMD ["gunicorn","app:app"]
```

Each microservice follows the same pattern.

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

Docker Build

↓

Image Scan

↓

Push Registry

↓

Deploy Kubernetes

Dockerfile instructions determine the final deployment artifact.

---

# Internal Workflow

Docker reads

```dockerfile
FROM
```

↓

Downloads Base Image

↓

Processes each instruction

↓

Creates Layers

↓

Builds Final Image

↓

Stores Image

---

# Daily DevOps Activities

DevOps Engineers

- Update base images
- Modify Dockerfiles
- Review instructions
- Optimize image size
- Improve caching
- Scan images
- Troubleshoot build failures

---

# Production Best Practices

- Pin image versions.
- Use minimal base images.
- Use COPY instead of ADD.
- Use non-root USER.
- Keep RUN instructions optimized.
- Combine package installations.
- Remove temporary files.
- Use HEALTHCHECK.
- Implement multi-stage builds.

---

# Security Considerations

- Never store secrets.
- Avoid latest tag.
- Use official images.
- Run as non-root.
- Scan images continuously.
- Keep dependencies updated.
- Remove build tools from runtime images.

---

# Troubleshooting

Build image

```bash
docker build -t app:v1 .
```

View history

```bash
docker history app:v1
```

Inspect image

```bash
docker image inspect app:v1
```

Build without cache

```bash
docker build --no-cache .
```

---

# Real Production Scenario

Scenario

CI/CD builds take 18 minutes.

Investigation

Dockerfile copies the complete application before installing dependencies.

Every source code change invalidates Docker cache.

Resolution

Reorder instructions

```dockerfile
COPY requirements.txt .

RUN pip install

COPY .
```

Result

Build time reduced from

18 minutes

↓

4 minutes

---

# Scenario-Based Interview Questions

## Question 1

Which Dockerfile instruction should always appear first?

Answer

FROM

Every Dockerfile begins with a base image.

---

## Question 2

Difference between ARG and ENV?

Answer

ARG is available only during image build.

ENV is available during both build and container runtime.

---

## Question 3

Difference between CMD and ENTRYPOINT?

Answer

ENTRYPOINT defines the executable.

CMD provides default arguments or the default startup command.

---

# Architecture-Level Interview Questions

## Question

Why should Dockerfile instructions be ordered carefully?

Answer

Proper ordering maximizes Docker layer caching, reducing build time and network usage.

---

## Question

Why should COPY be preferred over ADD?

Answer

COPY is simpler, more predictable, and follows the principle of least surprise.

---

## Question

Why is HEALTHCHECK important?

Answer

It allows Docker and Kubernetes to detect unhealthy containers and automate recovery.

---

# Production Support Questions

Q.

A Docker image suddenly doubles in size.

Possible causes?

Answer

Investigate

- Large base image
- Unnecessary packages
- Multiple RUN layers
- Temporary files
- Missing cleanup commands

---

Q.

Why is every CI/CD build downloading dependencies again?

Answer

Docker cache is being invalidated due to incorrect instruction ordering.

---

# Related Runbooks

Future runbooks

- Optimize Dockerfile
- Build Docker Image
- Reduce Image Size
- Implement Health Checks
- Troubleshoot Docker Build Failure

---

# Common Incidents

- Build cache invalidation
- Large image size
- Missing CMD
- Wrong ENTRYPOINT
- Dependency installation failure
- Container startup failure
- Missing HEALTHCHECK

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

Image history

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

Dockerfile instructions define how Docker Images are built.

Understanding the purpose, behavior, and best practices of each instruction enables DevOps Engineers to build secure, optimized, and reproducible container images.

For our Enterprise DevOps Platform, properly designed Dockerfiles will ensure efficient CI/CD pipelines, smaller images, improved security, and reliable Kubernetes deployments.

---

# Marathi Quick Revision

महत्त्वाच्या Dockerfile Instructions

- FROM
- WORKDIR
- COPY
- ADD
- RUN
- ARG
- ENV
- USER
- EXPOSE
- CMD
- ENTRYPOINT
- HEALTHCHECK

Best Practice

FROM

↓

WORKDIR

↓

COPY dependencies

↓

RUN install

↓

COPY application

↓

EXPOSE

↓

CMD

---

# Marathi Interview Memory Tip

Interview मध्ये जर विचारलं:

"Dockerfile मधील महत्त्वाच्या instructions सांगा."

असं सांगा:

"FROM base image निवडते, WORKDIR working directory सेट करते, COPY files copy करते, RUN build-time commands execute करते, ENV runtime variables सेट करते, EXPOSE application port document करते, USER non-root user सेट करतो, आणि CMD container सुरू झाल्यावर default command execute करते."

