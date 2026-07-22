# Multi-Stage Builds

## Purpose

This document explains Docker Multi-Stage Builds from an Enterprise DevOps perspective.

Multi-stage builds are one of the most important Docker optimization techniques. They help create smaller, more secure, and production-ready Docker images by separating the build environment from the runtime environment.

For our Enterprise DevOps Platform, production images will use multi-stage builds to minimize image size and reduce security risks.

---

# Introduction

During application development, many tools are required only to build the application.

Examples include

- Compilers
- Package managers
- Build tools
- Testing frameworks
- Source code

These tools are **not required** after the application has been built.

Multi-stage builds ensure that only the final application and its runtime dependencies are included in the production image.

---

# Traditional Docker Build

```text
Source Code

↓

Install Build Tools

↓

Compile Application

↓

Install Runtime

↓

Docker Image
```

Everything remains inside the final image.

Result

- Large image
- More vulnerabilities
- Slower deployments

---

# Multi-Stage Build

```text
Build Stage

↓

Compile Application

↓

Copy Build Output

↓

Runtime Stage

↓

Final Docker Image
```

Only the required runtime files remain.

---

# Why Multi-Stage Builds Matter

Benefits

- Smaller images
- Better security
- Faster deployments
- Lower storage usage
- Faster image downloads
- Fewer vulnerabilities
- Cleaner Dockerfiles

---

# Basic Multi-Stage Example

```dockerfile
FROM node:22 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
```

Two stages exist

- Builder
- Runtime

Only the runtime image is deployed.

---

# Build Stage

Purpose

- Install dependencies
- Compile application
- Execute build commands

Example

```dockerfile
FROM node:22 AS builder
```

Everything required for compilation exists only here.

---

# Runtime Stage

Purpose

Run the application.

Example

```dockerfile
FROM nginx:alpine
```

Only compiled files are copied.

No build tools remain.

---

# COPY --from

Purpose

Copy files from another build stage.

Example

```dockerfile
COPY --from=builder /app/dist /usr/share/nginx/html
```

Docker copies only the compiled application.

---

# Multi-Stage Build Workflow

```text
Application Source

↓

Builder Stage

↓

Compile

↓

Artifacts

↓

Runtime Stage

↓

Final Image
```

---

# Python Example

```dockerfile
FROM python:3.12-slim AS builder

WORKDIR /app

COPY requirements.txt .

RUN pip install --prefix=/install -r requirements.txt

FROM python:3.12-slim

COPY --from=builder /install /usr/local

COPY . .

CMD ["gunicorn","app:app"]
```

Dependencies are prepared in the builder stage and copied into the runtime stage.

---

# React Example

```dockerfile
FROM node:22 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
```

Only static files remain.

Node.js is not included in the runtime image.

---

# Multi-Stage Build in Our Project

Frontend

```text
React Source

↓

Node Builder

↓

Compiled Assets

↓

Nginx Runtime
```

Backend

```text
Python Builder

↓

Install Dependencies

↓

Runtime Image

↓

Gunicorn
```

Each service can use multiple stages depending on build complexity.

---

# Image Size Comparison

Traditional Build

```text
Node

+

npm

+

Source

+

Cache

+

Build Tools

↓

850 MB
```

Multi-Stage Build

```text
Nginx

+

Compiled Files

↓

70 MB
```

Large reductions are common.

---

# Enterprise Workflow

Developer

↓

Git Push

↓

GitHub Actions

↓

Multi-Stage Build

↓

Security Scan

↓

Registry

↓

Kubernetes Deployment

Smaller images reduce deployment time across environments.

---

# Internal Workflow

Docker

↓

Stage 1

↓

Compile

↓

Generate Artifacts

↓

Stage 2

↓

Copy Artifacts

↓

Discard Builder

↓

Create Final Image

---

# Daily DevOps Activities

DevOps Engineers

- Optimize Dockerfiles
- Reduce image size
- Remove build dependencies
- Improve deployment speed
- Scan runtime images
- Review build stages

---

# Production Best Practices

- Separate build and runtime stages.
- Use lightweight runtime images.
- Remove unnecessary packages.
- Copy only required artifacts.
- Keep runtime images minimal.
- Name build stages clearly.
- Scan final runtime images.

---

# Security Considerations

Multi-stage builds improve security by removing

- Compilers
- Package managers
- Source code
- Build caches
- Temporary files
- Debugging tools

A smaller runtime image has a smaller attack surface.

---

# Troubleshooting

Build image

```bash
docker build -t app:v1 .
```

View image history

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

A React application image is over 900 MB.

Investigation reveals

The runtime image contains

- Node.js
- npm
- Source code
- Build cache
- Development dependencies

Resolution

Implement a multi-stage build.

Builder stage

↓

Compile React application

Runtime stage

↓

Nginx serves static files

Result

Image size reduced

900 MB

↓

65 MB

Deployment time reduced significantly.

---

# Scenario-Based Interview Questions

## Question 1

What is a Multi-Stage Build?

Answer

A Docker build technique that uses multiple FROM instructions to separate build and runtime environments.

---

## Question 2

Why are Multi-Stage Builds important?

Answer

They reduce image size, improve security, and remove unnecessary build tools from production images.

---

## Question 3

What does `COPY --from` do?

Answer

It copies files from one build stage into another stage.

---

# Architecture-Level Interview Questions

## Question

Why should build tools not exist in production images?

Answer

They increase image size, consume storage, and expand the attack surface.

---

## Question

Why are multiple FROM instructions allowed?

Answer

Each FROM starts a new build stage, enabling separation of build and runtime environments.

---

## Question

Why are multi-stage builds common in Kubernetes deployments?

Answer

Smaller images reduce registry transfer time, pod startup time, and overall deployment duration.

---

# Production Support Questions

Q.

A production image still contains source code and build tools.

What should you investigate?

Answer

Review

- Dockerfile
- Multi-stage configuration
- COPY instructions
- Runtime stage
- Final image contents

---

Q.

A Docker image is much larger than expected.

Possible causes?

Answer

- Single-stage build
- Build cache retained
- Development dependencies included
- Source code copied unnecessarily
- Large base image

---

# Related Runbooks

Future runbooks

- Implement Multi-Stage Builds
- Reduce Docker Image Size
- Optimize Dockerfiles
- Troubleshoot Large Docker Images
- Secure Runtime Images

---

# Common Incidents

- Oversized Docker image
- Build tools present in runtime image
- Source code exposed
- Slow deployments
- Large registry storage usage
- Vulnerability scan failures

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

Inspect image

```bash
docker image inspect app:v1
```

View history

```bash
docker history app:v1
```

List images

```bash
docker images
```

---

# Key Takeaways

Multi-stage builds separate application compilation from runtime execution, resulting in smaller, faster, and more secure Docker images.

By copying only the required build artifacts into the final image, DevOps teams reduce storage costs, improve deployment speed, and minimize security risks.

For our Enterprise DevOps Platform, multi-stage builds will be the standard approach for creating production-ready container images.

---

# Marathi Quick Revision

Multi-Stage Build

Stage 1

- Build
- Compile
- Install dependencies

↓

Stage 2

- Runtime
- Copy artifacts
- Remove build tools

फायदे

- Image लहान
- Security जास्त
- Deployment जलद
- Vulnerabilities कमी

---

# Marathi Interview Memory Tip

Interview मध्ये जर विचारलं:

"Multi-Stage Build म्हणजे काय?"

असं सांगा:

"Multi-Stage Build मध्ये Dockerfile मध्ये अनेक `FROM` instructions वापरल्या जातात. पहिल्या stage मध्ये application build केली जाते आणि दुसऱ्या stage मध्ये फक्त build artifacts copy केले जातात. त्यामुळे production image मध्ये source code, compiler आणि build tools राहत नाहीत. यामुळे image लहान, सुरक्षित आणि production-ready बनते."

