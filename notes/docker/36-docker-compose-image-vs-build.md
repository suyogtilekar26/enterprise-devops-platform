# Docker Compose Image vs Build

## Purpose

This document explains the difference between the `image` and `build` directives in Docker Compose from an Enterprise DevOps perspective.

Understanding when to use `image` versus `build` is essential for creating maintainable development environments and production deployment workflows.

For our Enterprise DevOps Platform, we will primarily use the `build` directive during local development and CI pipelines, while production deployments will consume pre-built images using the `image` directive.

---

# Introduction

Every Docker Compose service needs a container image.

Docker Compose provides two ways to obtain that image:

- image
- build

Understanding the difference is critical for Enterprise DevOps workflows.

---

# High-Level Architecture

```text
                Docker Compose

             /                  \

         image                 build

          ↓                     ↓

  Pull Existing Image     Build New Image

          ↓                     ↓

      Run Container       Run Container
```

---

# What is image?

The `image` directive tells Docker Compose to use an existing image.

Example

```yaml
services:
  frontend:
    image: nginx:latest
```

Compose will

- Pull the image if necessary
- Start the container

No build process occurs.

---

# Image Workflow

```text
Compose

↓

Registry

↓

Download Image

↓

Run Container
```

---

# Advantages of image

- Fast startup
- Consistent deployments
- No local build required
- Production friendly
- CI/CD compatible

---

# Disadvantages of image

- Cannot modify application code
- Requires image to exist
- Image must be rebuilt elsewhere

---

# What is build?

The `build` directive instructs Docker Compose to build an image locally.

Example

```yaml
services:
  frontend:
    build: ./frontend
```

Compose

- Reads Dockerfile
- Builds image
- Starts container

---

# Build Workflow

```text
Compose

↓

Dockerfile

↓

docker build

↓

Docker Image

↓

Container
```

---

# Advantages of build

- Ideal for development
- Uses latest source code
- No need to manually build images
- Easy local testing

---

# Disadvantages of build

- Slower startup
- Consumes CPU
- Consumes disk space
- Build failures delay startup

---

# image vs build

| Feature | image | build |
|----------|-------|--------|
| Uses existing image | Yes | No |
| Builds image | No | Yes |
| Requires Dockerfile | No | Yes |
| Faster startup | Yes | No |
| Local development | Limited | Excellent |
| Production deployments | Excellent | Rare |

---

# Using Both Together

Example

```yaml
services:
  frontend:
    build: ./frontend
    image: enterprise/frontend:v1
```

Compose

- Builds image
- Tags image
- Uses tagged image

This is common in CI/CD pipelines.

---

# Build Context

When using

```yaml
build: ./frontend
```

Compose sends

```text
frontend/

↓

Docker Build Context

↓

Docker Engine
```

The Dockerfile and required files must exist inside the build context.

---

# image in Our Project

Production

```yaml
image: ghcr.io/company/frontend:v1.0.0
```

The image is built in CI and stored in the registry.

Compose simply downloads it.

---

# build in Our Project

Development

```yaml
build: ./frontend
```

Every developer builds the latest code locally.

---

# Enterprise Workflow

Development

```text
Developer

↓

Source Code

↓

Docker Compose

↓

build

↓

Local Container
```

Production

```text
CI Pipeline

↓

Docker Build

↓

Registry

↓

Docker Compose

↓

image

↓

Production Container
```

---

# Internal Workflow

Using image

```text
Registry

↓

Image

↓

Container
```

Using build

```text
Dockerfile

↓

Build

↓

Image

↓

Container
```

---

# Daily DevOps Activities

DevOps Engineers

- Update image tags
- Build images
- Push images
- Maintain registries
- Optimize Dockerfiles
- Support developers using build

---

# Production Best Practices

- Use `build` for development.
- Use `image` for production.
- Use immutable version tags.
- Never deploy `latest` to production.
- Store production images in trusted registries.
- Build images through CI/CD.

---

# Security Considerations

- Build from trusted source code.
- Scan built images.
- Sign production images.
- Avoid downloading untrusted images.
- Use official base images.

---

# Troubleshooting

Build image

```bash
docker compose build
```

Start application

```bash
docker compose up
```

Pull images

```bash
docker compose pull
```

List images

```bash
docker images
```

---

# Real Production Scenario

Scenario

Developers accidentally deploy locally built images into production.

Investigation

Production Compose file contains

```yaml
build:
```

instead of

```yaml
image:
```

Resolution

- CI builds images.
- Images pushed to registry.
- Production Compose updated to use image tags.

Result

Production deployments become repeatable and controlled.

---

# Scenario-Based Interview Questions

## Question 1

What is the difference between `image` and `build`?

Answer

`image` uses an existing image from a registry, while `build` creates a new image locally from a Dockerfile.

---

## Question 2

When should you use `build`?

Answer

During development and testing when application code changes frequently.

---

## Question 3

When should you use `image`?

Answer

During production deployments where pre-built, tested, and signed images are stored in a registry.

---

# Architecture Interview Questions

## Question

Why do enterprise production environments prefer `image` over `build`?

Answer

Production environments should deploy immutable artifacts that have already passed testing, scanning, and signing through CI/CD pipelines rather than building code during deployment.

---

# Production Support Interview Questions

## Question

Production deployment is unexpectedly rebuilding images.

What should you investigate?

Answer

Review

- Compose configuration
- Presence of `build`
- Image tags
- Registry access
- CI/CD pipeline

---

# Related Runbooks

Future runbooks

- Build Images with Docker Compose
- Pull Images from Registry
- Troubleshoot Compose Builds

---

# Common Incidents

- Build failure
- Missing Dockerfile
- Invalid build context
- Image not found
- Wrong image tag
- Registry authentication failure

---

# Commands

Build

```bash
docker compose build
```

Start

```bash
docker compose up
```

Pull

```bash
docker compose pull
```

Images

```bash
docker images
```

---

# Marathi Quick Revision

image

- Existing image वापरते
- Registry मधून pull करते
- Production साठी योग्य

build

- Dockerfile वापरते
- Local image तयार करते
- Development साठी योग्य

---

# Marathi Interview Memory Tip

Interview मध्ये जर विचारलं:

"`image` आणि `build` मध्ये काय फरक आहे?"

असं सांगा:

"`build` Dockerfile वापरून नवीन image तयार करते, त्यामुळे development मध्ये ती जास्त वापरली जाते. `image` आधीपासून registry मध्ये असलेली image वापरते, त्यामुळे production मध्ये CI/CD ने build केलेली verified image deploy करण्यासाठी `image` directive वापरली जाते."

---

# Key Takeaways

The `image` and `build` directives serve different purposes in Docker Compose. `build` is intended for local development and image creation, while `image` is used to deploy immutable, pre-built artifacts from trusted registries. Our Enterprise DevOps Platform will use `build` during development and CI image creation, and `image` for controlled production deployments.

