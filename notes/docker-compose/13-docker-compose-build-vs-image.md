# Docker Compose Build vs Image

# 1. Purpose

Docker Compose supports two methods for creating containers:

- Build
- Image

Understanding the difference is essential because development environments typically build images locally, while production environments deploy pre-built images from a container registry.

Choosing the correct approach is a fundamental DevOps responsibility.

---

# 2. Introduction

Docker Compose can either

```
Option 1

Application Source Code

↓

docker build

↓

Docker Image

↓

Container
```

or

```
Option 2

Docker Registry

↓

Pull Existing Image

↓

Container
```

The first approach is called **build**.

The second approach is called **image**.

---

# 3. Enterprise Usage

Development Environment

```
Developer Code

↓

docker compose build

↓

Local Image

↓

Testing
```

Production Environment

```
CI/CD Pipeline

↓

Docker Image Built

↓

GHCR / Docker Hub / ECR

↓

Production Server Pulls Image

↓

Deployment
```

Production servers should rarely build images.

They should deploy trusted images produced by CI/CD pipelines.

---

# 4. Usage in THIS Project

Development

```
React Source

↓

docker compose build

↓

Frontend Image
```

```
Flask Services

↓

docker compose build

↓

Local Images
```

Production

```
GitHub Actions

↓

Build Images

↓

Push to GHCR

↓

Docker Compose Pulls Images

↓

Deployment
```

---

# 5. Architecture

Development

```
Source Code

↓

Dockerfile

↓

docker compose build

↓

Local Image

↓

Container
```

Production

```
GitHub Actions

↓

Docker Image

↓

GitHub Container Registry

↓

docker compose pull

↓

Container
```

---

# 6. Internal Workflow

Developer Changes Code

↓

Docker Compose Reads Dockerfile

↓

Image Built

↓

Container Created

↓

Application Starts

Production

↓

CI/CD Builds Image

↓

Registry Stores Image

↓

Compose Pulls Image

↓

Container Starts

---

# 7. Using build

Example

```yaml
services:

  api-gateway:

    build:
      context: ./api-gateway
```

Compose automatically executes

```
docker build
```

before starting the container.

---

# 8. Using image

Example

```yaml
services:

  api-gateway:

    image: ghcr.io/company/api-gateway:v1.0.0
```

Compose downloads the image from the registry.

No build occurs.

---

# 9. Build vs Image Comparison

| Build | Image |
|--------|-------|
| Uses source code | Uses existing image |
| Requires Dockerfile | Pulls from registry |
| Development friendly | Production friendly |
| Slower startup | Faster deployment |
| Local changes reflected | Immutable deployment |

---

# 10. Production Best Practices

- Build images only in CI/CD.
- Tag images properly.
- Never build directly on production servers.
- Store images in a trusted registry.
- Scan images before deployment.
- Use immutable image tags for releases.
- Maintain version history.

---

# 11. Security

Never

- Deploy untrusted images.
- Pull images from unknown registries.
- Use latest tag for production releases.

Always

- Scan images
- Verify image signatures
- Use private registries
- Restrict registry permissions

---

# 12. Troubleshooting

Build image

```bash
docker compose build
```

Pull image

```bash
docker compose pull
```

View images

```bash
docker images
```

Start services

```bash
docker compose up -d
```

Inspect image

```bash
docker image inspect ghcr.io/company/api-gateway:v1.0.0
```

---

# 13. Real Production Scenarios

## Scenario 1

Production deployment takes 25 minutes.

Investigation

```bash
docker compose logs
```

Root Cause

Compose was building images on the production server instead of pulling pre-built images.

---

## Scenario 2

Production server deployed old application code.

Investigation

```bash
docker images
```

Root Cause

Local image cache contained an outdated image.

Deployment should have pulled the latest approved image from GHCR.

---

## Scenario 3

Developer says

```
My code changes aren't visible.
```

Investigation

```bash
docker compose build

docker compose up -d
```

Root Cause

Application image had not been rebuilt after source code changes.

---

## Scenario 4

Deployment failed.

Investigation

```bash
docker compose pull
```

Root Cause

Requested image tag did not exist in the container registry.

---

# 14. Scenario Interview Q&A

**Q1. When should you use build?**

A:

During development when source code changes frequently.

---

**Q2. When should you use image?**

For production deployments where images are already built and stored in a registry.

---

**Q3. Why avoid building on production servers?**

Because builds are slower, less predictable, consume server resources, and bypass CI/CD validation.

---

# 15. Architecture Interview Q&A

**Q1. What is the recommended enterprise workflow?**

Developer

↓

Git Push

↓

GitHub Actions Builds Image

↓

Security Scan

↓

Push to GHCR

↓

Production Pulls Image

↓

Deployment

---

**Q2. Why use immutable image tags?**

They guarantee that every deployment uses the exact tested application version.

---

# 16. Production Support Interview Q&A

**Q1. Production deployed the wrong application version. Investigation?**

1.

```bash
docker images
```

2.

```bash
docker compose config
```

3.

Verify image tag

4.

Verify registry

5.

Review CI/CD pipeline

6.

Perform RCA

---

**Q2. Why did production deployment suddenly become slow?**

Possible causes

- Images being built locally
- Registry unavailable
- Large image size
- Network issues
- Cache invalidation

---

# 17. Related Runbooks

- docker-image-pull-failure.md
- docker-registry-authentication-failure.md
- docker-compose-service-failure.md

---

# 18. Common Incidents

- Wrong Image Tag
- Image Pull Failure
- Local Build in Production
- Registry Authentication Failure
- Outdated Image Cache

---

# 19. Commands

Build images

```bash
docker compose build
```

Pull images

```bash
docker compose pull
```

Start services

```bash
docker compose up -d
```

List images

```bash
docker images
```

Inspect image

```bash
docker image inspect IMAGE_NAME
```

---

# 20. Marathi Quick Revision

- Development मध्ये `build` वापरतात.
- Production मध्ये `image` वापरतात.
- Production server वर image build करू नये.
- Images CI/CD pipeline मधून तयार व्हाव्यात.
- Registry मधून verified images deploy कराव्यात.

---

# 21. Marathi Summary (5+ Experience Revision)

## Interview Summary

`build` म्हणजे Dockerfile वापरून source code पासून image तयार करणे.

`image` म्हणजे आधीच registry मध्ये असलेली image वापरणे.

Enterprise मध्ये development साठी `build` आणि production साठी `image` हा standard approach आहे.

### Production Investigation Flow

```
Deployment Issue

↓

docker compose config

↓

Verify Image Tag

↓

docker compose pull

↓

docker images

↓

Review CI/CD Pipeline

↓

Verify Registry

↓

Root Cause Analysis

↓

Permanent Fix
```

### Production Story

एका production deployment मध्ये release नंतर जुनी application version चालू झाली.

`docker images` तपासल्यावर server वर जुनी cached image वापरली जात असल्याचे आढळले.

Compose file मध्ये immutable version tag ऐवजी `latest` वापरले गेले होते.

Image tagging policy बदलून semantic versioning लागू करण्यात आले आणि deployment pipeline मध्ये mandatory `docker compose pull` step जोडला गेला.

### 5+ Years Memory Trick

जर interviewer विचारेल,

**"Development मध्ये build आणि Production मध्ये image का वापरतात?"**

उत्तर:

"Development मध्ये source code सतत बदलत असल्यामुळे local build आवश्यक असतो. Production मध्ये CI/CD pipeline ने build, scan आणि test केलेली immutable image registry मधून pull केली जाते. यामुळे deployments consistent, secure आणि repeatable राहतात."

