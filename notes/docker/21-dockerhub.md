# Docker Hub

## Purpose

This document explains Docker Hub from an Enterprise DevOps perspective.

Docker Hub is the default public Docker Image Registry. It allows developers and organizations to store, distribute, version, and share Docker images.

For our Enterprise DevOps Platform, Docker Hub will initially be used to understand registry concepts before moving to enterprise-grade registries such as GitHub Container Registry (GHCR), Amazon ECR, or Harbor.

---

# Introduction

Docker Hub is Docker's official cloud-based image registry.

It hosts millions of public container images and also provides private repositories for authenticated users.

Whenever Docker pulls an image without specifying a registry, it uses Docker Hub by default.

Example

```bash
docker pull nginx
```

Docker automatically interprets it as

```text
docker.io/library/nginx
```

---

# Docker Hub Architecture

```text
Developer

↓

docker build

↓

Docker Image

↓

docker push

↓

Docker Hub

↓

docker pull

↓

Servers

↓

Containers
```

Docker Hub acts as a centralized repository.

---

# Why Docker Hub is Important

Benefits

- Central image repository
- Public image hosting
- Private repositories
- Image versioning
- Team collaboration
- CI/CD integration
- Official images

---

# Docker Hub Components

Docker Hub contains

- Repositories
- Tags
- Image Layers
- Manifests
- Organizations
- Teams
- Automated Builds
- Access Control

---

# Docker Hub Workflow

```text
Build Image

↓

Tag Image

↓

Login

↓

Push Image

↓

Docker Hub

↓

Pull Image

↓

Run Container
```

---

# Repository Structure

Example

```text
username/frontend:v1.0.0
```

Where

```text
username
```

is the Docker Hub account.

```text
frontend
```

is the repository.

```text
v1.0.0
```

is the image tag.

---

# Official Images

Official images are maintained by Docker and trusted partners.

Examples

```text
nginx

python

ubuntu

redis

mysql

postgres

node
```

They are generally preferred over unofficial community images.

---

# Public Repository

Anyone can

- Pull images
- View repository information
- Use published tags

Example

```bash
docker pull nginx
```

No authentication is required for public repositories in most cases.

---

# Private Repository

Private repositories require

- Authentication
- Appropriate permissions

Only authorized users can pull or push images.

---

# Creating a Docker Hub Account

Typical steps

1. Create an account.
2. Verify the email address.
3. Create a repository.
4. Authenticate using Docker CLI.
5. Push images.

---

# Logging In

Command

```bash
docker login
```

Docker prompts for

- Username
- Password or Access Token

Successful authentication allows image pushes.

---

# Logging Out

Command

```bash
docker logout
```

Removes locally stored registry credentials.

---

# Building an Image

Example

```bash
docker build -t frontend:v1 .
```

Image exists locally.

---

# Tagging an Image

Docker Hub requires

```text
username/repository:tag
```

Example

```bash
docker tag frontend:v1 johndoe/frontend:v1
```

---

# Pushing an Image

Example

```bash
docker push johndoe/frontend:v1
```

Workflow

```text
Local Image

↓

Docker Hub

↓

Repository

↓

Version Available
```

---

# Pulling an Image

Example

```bash
docker pull johndoe/frontend:v1
```

Docker downloads only missing layers.

---

# Image Versioning

Example

```text
frontend:v1.0.0

frontend:v1.1.0

frontend:v2.0.0
```

Each version represents a unique image.

---

# Image Layers

Docker Hub stores shared layers only once.

Example

```text
python:3.12-slim

↓

Auth Service

↓

API Gateway

↓

Dashboard Service
```

Duplicate layers are reused.

---

# Docker Hub in Our Project

Initially

```text
GitHub Actions

↓

Docker Build

↓

Docker Hub

↓

Kind Kubernetes
```

Later

```text
GitHub Actions

↓

GHCR / Amazon ECR

↓

Production Kubernetes
```

Docker Hub serves as the learning platform before enterprise registries.

---

# Enterprise Workflow

Developer

↓

Git Push

↓

GitHub Actions

↓

Docker Build

↓

Image Scan

↓

Docker Hub

↓

Development Kubernetes

Production environments typically use private enterprise registries.

---

# Internal Workflow

Docker Build

↓

Generate Image

↓

Assign Tag

↓

Authenticate

↓

Push Image

↓

Docker Hub Stores Layers

↓

Clients Pull Image

---

# Docker Hub Limits

Free accounts may have

- Pull rate limits
- Repository limits
- Collaboration limitations

Large enterprises generally use private enterprise registries.

---

# Daily DevOps Activities

DevOps Engineers

- Build images
- Tag images
- Push images
- Pull images
- Review repositories
- Remove outdated tags
- Verify image versions

---

# Production Best Practices

- Use official base images.
- Use immutable version tags.
- Enable Multi-Factor Authentication.
- Use access tokens instead of passwords.
- Scan images before pushing.
- Remove vulnerable images.
- Avoid using latest in production.

---

# Security Considerations

- Enable MFA.
- Use access tokens.
- Rotate credentials.
- Scan images regularly.
- Limit repository access.
- Remove unused repositories.
- Never publish sensitive images publicly.

---

# Troubleshooting

Login

```bash
docker login
```

Logout

```bash
docker logout
```

Build image

```bash
docker build -t frontend:v1 .
```

Tag image

```bash
docker tag frontend:v1 johndoe/frontend:v1
```

Push image

```bash
docker push johndoe/frontend:v1
```

Pull image

```bash
docker pull johndoe/frontend:v1
```

List images

```bash
docker images
```

---

# Real Production Scenario

Scenario

A CI/CD pipeline successfully builds an image but fails during the push stage.

Error

```text
denied: requested access to the resource is denied
```

Investigation

- Docker login expired
- Wrong repository name
- Missing permissions
- Incorrect image tag

Resolution

- Authenticate again
- Verify repository exists
- Verify image tag
- Re-run the pipeline

The image is pushed successfully after correcting authentication.

---

# Scenario-Based Interview Questions

## Question 1

What is Docker Hub?

Answer

Docker Hub is Docker's default cloud-based container image registry used to store, manage, and distribute Docker images.

---

## Question 2

Why is Docker Hub important?

Answer

It provides centralized image storage, versioning, collaboration, and integration with CI/CD pipelines.

---

## Question 3

Why must images be tagged before pushing?

Answer

Docker Hub requires images to include the target repository name and tag so they can be stored correctly.

---

# Architecture-Level Interview Questions

## Question

Why is Docker Hub not commonly used for enterprise production environments?

Answer

Enterprises often require advanced security, compliance, access control, private networking, and tighter integration with cloud platforms, making private registries such as Amazon ECR, Azure Container Registry, Google Artifact Registry, Harbor, or GitHub Container Registry more suitable.

---

## Question

Why are official Docker Hub images preferred?

Answer

They are maintained by trusted publishers, updated regularly, and generally undergo more security review than unofficial images.

---

## Question

How does Docker Hub reduce storage requirements?

Answer

It stores image layers efficiently and reuses shared layers across multiple images.

---

# Production Support Questions

Q.

A developer cannot push an image to Docker Hub.

What should you investigate?

Answer

Review

- Authentication
- Repository name
- Repository permissions
- Image tag
- Internet connectivity
- Docker Hub availability

---

Q.

A Kubernetes deployment cannot pull an image from Docker Hub.

Possible causes?

Answer

- Incorrect image name
- Wrong tag
- Private repository
- Missing imagePullSecrets
- Pull rate limits

---

# Related Runbooks

Future runbooks

- Push Images to Docker Hub
- Authenticate with Docker Hub
- Troubleshoot Image Push Failures
- Configure Private Repositories
- Manage Docker Hub Access Tokens

---

# Common Incidents

- Authentication failure
- Push access denied
- Repository not found
- Incorrect image tag
- Image pull failure
- Pull rate limit exceeded
- Missing repository permissions

---

# Commands

Login

```bash
docker login
```

Logout

```bash
docker logout
```

Build image

```bash
docker build -t frontend:v1 .
```

Tag image

```bash
docker tag frontend:v1 johndoe/frontend:v1
```

Push image

```bash
docker push johndoe/frontend:v1
```

Pull image

```bash
docker pull johndoe/frontend:v1
```

List images

```bash
docker images
```

---

# Key Takeaways

Docker Hub is the default public container registry used to store and distribute Docker images.

It supports image versioning, collaboration, and CI/CD workflows, making it an excellent learning platform for container registries.

For our Enterprise DevOps Platform, Docker Hub will be used initially for learning and experimentation before transitioning to enterprise-grade private registries such as GitHub Container Registry or Amazon ECR for production deployments.

---

# Marathi Quick Revision

Docker Hub म्हणजे

- Docker ची default registry
- Images store करणे
- Images share करणे
- Version management
- CI/CD integration

Commands

```bash
docker login
docker build
docker tag
docker push
docker pull
docker logout
```

---

# Marathi Interview Memory Tip

Interview मध्ये जर विचारलं:

"Docker Hub म्हणजे काय?"

असं सांगा:

"Docker Hub ही Docker ची default cloud-based container image registry आहे. Docker Images build झाल्यानंतर त्या Docker Hub वर push केल्या जातात आणि इतर servers किंवा Kubernetes clusters त्या images pull करून containers चालवतात. Development साठी Docker Hub मोठ्या प्रमाणात वापरले जाते, तर production मध्ये private registries जसे Amazon ECR, GHCR किंवा Harbor अधिक वापरले जातात."

