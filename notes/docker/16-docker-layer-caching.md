# Docker Layer Caching

## Purpose

This document explains Docker Layer Caching from an Enterprise DevOps perspective.

Layer caching is one of Docker's most powerful optimization features. Proper use of layer caching dramatically reduces build time, speeds up CI/CD pipelines, minimizes network usage, and improves developer productivity.

For our Enterprise DevOps Platform, optimized layer caching will reduce image build times for every microservice.

---

# Introduction

When Docker builds an image, it creates layers.

Instead of rebuilding every layer each time, Docker checks whether an identical layer already exists.

If a layer has not changed, Docker reuses the cached version.

This mechanism is called **Layer Caching**.

---

# High-Level Workflow

```text
Dockerfile

↓

Instruction

↓

Layer Exists?

↓

Yes

↓

Reuse Cache

↓

No

↓

Build New Layer
```

Only changed layers are rebuilt.

---

# Why Layer Caching Matters

Benefits

- Faster image builds
- Reduced CI/CD execution time
- Lower CPU usage
- Lower network usage
- Reduced registry traffic
- Better developer experience

Enterprise CI/CD pipelines rely heavily on effective cache usage.

---

# How Docker Checks Cache

Docker compares

- Dockerfile instruction
- Previous instruction
- Files used by the instruction

If everything matches

↓

Cached layer is reused.

If anything changes

↓

Docker rebuilds the current layer and every layer after it.

---

# Example Dockerfile

```dockerfile
FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY .

CMD ["gunicorn","app:app"]
```

---

# First Build

```text
FROM

↓

Build

↓

WORKDIR

↓

Build

↓

COPY requirements.txt

↓

Build

↓

RUN pip install

↓

Build

↓

COPY .

↓

Build

↓

CMD

↓

Build
```

Everything is built.

---

# Second Build (Only Source Code Changed)

Developer edits

```text
app.py
```

Docker checks cache

```text
FROM

↓

Cached

WORKDIR

↓

Cached

COPY requirements.txt

↓

Cached

RUN pip install

↓

Cached

COPY .

↓

Rebuild

CMD

↓

Rebuild
```

Dependencies are not reinstalled.

---

# Cache Invalidation

Docker cache becomes invalid when

- Dockerfile instruction changes
- File copied by COPY changes
- File copied by ADD changes
- Base image changes
- Previous layer changes

Once cache is invalidated, all following layers are rebuilt.

---

# Bad Dockerfile Example

```dockerfile
COPY .

RUN pip install -r requirements.txt
```

Problem

Every application code change causes

```text
COPY

↓

Cache Invalidated

↓

Dependencies Reinstalled

↓

Slow Build
```

---

# Optimized Dockerfile

```dockerfile
COPY requirements.txt .

RUN pip install -r requirements.txt

COPY .
```

Benefits

```text
Requirements unchanged

↓

Reuse dependency layer

↓

Only application layer rebuilt
```

Builds become much faster.

---

# Cache Visualization

Without Optimization

```text
Layer 1

↓

Layer 2

↓

Layer 3

↓

Layer 4

↓

Application Change

↓

Rebuild All Layers
```

With Optimization

```text
Layer 1

↓

Layer 2

↓

Layer 3

↓

Application Change

↓

Only Final Layer Rebuilt
```

---

# Layer Caching in Our Project

Frontend

```dockerfile
COPY package.json .

COPY package-lock.json .

RUN npm install

COPY .
```

Backend

```dockerfile
COPY requirements.txt .

RUN pip install -r requirements.txt

COPY .
```

Dependency installation remains cached until dependency files change.

---

# Enterprise Workflow

Developer

↓

Modify Source Code

↓

Git Push

↓

GitHub Actions

↓

Docker Build

↓

Reuse Cached Layers

↓

Generate Image

↓

Push Registry

This minimizes build time for every commit.

---

# Internal Workflow

Docker processes instruction

↓

Compare With Cached Layer

↓

Match?

Yes

↓

Reuse Layer

No

↓

Execute Instruction

↓

Create New Layer

↓

Continue Build

---

# Build Time Comparison

Without Layer Caching

```text
Build

↓

8 Minutes

↓

Every Commit
```

With Layer Caching

```text
Build

↓

1 Minute

↓

Most Commits
```

---

# Daily DevOps Activities

DevOps Engineers

- Optimize Dockerfiles
- Improve cache reuse
- Reduce build time
- Review dependency layers
- Monitor CI/CD performance
- Troubleshoot cache invalidation

---

# Production Best Practices

- Copy dependency files before application code.
- Keep Dockerfile instructions stable.
- Use pinned dependency versions.
- Minimize unnecessary COPY operations.
- Avoid changing early layers frequently.
- Enable BuildKit for advanced caching.

---

# Security Considerations

- Cached layers should not contain secrets.
- Avoid copying sensitive files.
- Remove temporary artifacts.
- Scan rebuilt images regularly.
- Use trusted base images.

---

# Troubleshooting

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

Enable BuildKit

```bash
DOCKER_BUILDKIT=1 docker build .
```

---

# Real Production Scenario

Scenario

A development team reports that every CI/CD build takes over fifteen minutes despite only changing application code.

Investigation

Dockerfile

```dockerfile
COPY .

RUN pip install -r requirements.txt
```

Because the entire application is copied before dependency installation, every code change invalidates the dependency layer.

Resolution

Reorder the Dockerfile

```dockerfile
COPY requirements.txt .

RUN pip install -r requirements.txt

COPY .
```

Result

- Dependency layer reused
- Build time reduced from 15 minutes to under 3 minutes
- Faster deployments
- Lower CI/CD infrastructure cost

---

# Scenario-Based Interview Questions

## Question 1

What is Docker Layer Caching?

Answer

Layer caching allows Docker to reuse previously built image layers when instructions and inputs remain unchanged.

---

## Question 2

When is Docker cache invalidated?

Answer

When the Dockerfile instruction, copied files, or any previous layer changes.

---

## Question 3

Why should dependency files be copied before application source code?

Answer

It allows dependency installation layers to remain cached even when application code changes.

---

# Architecture-Level Interview Questions

## Question

Why does Docker rebuild every layer after a cache miss?

Answer

Each layer depends on the previous one. Once a layer changes, Docker must recreate all dependent layers to maintain image consistency.

---

## Question

How does layer caching improve CI/CD performance?

Answer

It avoids rebuilding unchanged layers, significantly reducing build time, CPU usage, and network traffic.

---

## Question

Why is Dockerfile instruction order important?

Answer

Proper ordering maximizes cache reuse and minimizes unnecessary rebuilds.

---

# Production Support Questions

Q.

Every Docker build is reinstalling dependencies.

What is the likely cause?

Answer

The dependency installation layer is being invalidated because application files are copied before dependency files.

---

Q.

A previously fast CI/CD pipeline has become slow.

What should you investigate?

Answer

Review

- Dockerfile instruction order
- Cache invalidation
- Dependency files
- Base image changes
- BuildKit configuration
- Layer history

---

# Related Runbooks

Future runbooks

- Optimize Docker Layer Caching
- Troubleshoot Slow Docker Builds
- Enable Docker BuildKit
- Reduce CI/CD Build Time
- Analyze Docker Image History

---

# Common Incidents

- Cache invalidation
- Slow Docker builds
- Dependency reinstall on every build
- Large build times
- Incorrect Dockerfile order
- Build cache disabled
- Frequent layer rebuilds

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

Enable BuildKit

```bash
DOCKER_BUILDKIT=1 docker build .
```

View image history

```bash
docker history app:v1
```

Inspect image

```bash
docker image inspect app:v1
```

---

# Key Takeaways

Docker Layer Caching allows Docker to reuse previously built image layers whenever instructions and inputs remain unchanged.

A well-structured Dockerfile maximizes cache reuse, resulting in dramatically faster builds, reduced infrastructure costs, and highly efficient CI/CD pipelines.

For our Enterprise DevOps Platform, optimized layer caching will ensure rapid image creation and scalable enterprise deployments.

---

# Marathi Quick Revision

Docker Layer Caching

- जुने layers reuse होतात
- Build जलद होते
- CI/CD pipeline वेगवान होते
- Dependency layer पुन्हा build होत नाही
- Dockerfile order खूप महत्त्वाचा आहे

Best Practice

```text
COPY requirements.txt

↓

RUN install

↓

COPY source code
```

---

# Marathi Interview Memory Tip

Interview मध्ये जर विचारलं:

"Docker Layer Caching म्हणजे काय?"

असं सांगा:

"Docker प्रत्येक Dockerfile instruction साठी layer तयार करतो. जर instruction आणि त्याचे inputs बदलले नसतील तर Docker नवीन layer तयार न करता जुना cached layer reuse करतो. यामुळे build time कमी होतो, CI/CD pipelines जलद होतात आणि dependency installation सारखी महागडी operations पुन्हा execute करावी लागत नाहीत."

