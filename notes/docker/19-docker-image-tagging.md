# Docker Image Tagging

## Purpose

This document explains Docker Image Tagging from an Enterprise DevOps perspective.

Image tagging is critical for version control, CI/CD automation, rollback strategies, Kubernetes deployments, and production release management.

For our Enterprise DevOps Platform, every Docker image will follow a consistent tagging strategy to ensure traceability and reliable deployments.

---

# Introduction

A Docker Image Tag is a human-readable identifier attached to an image.

An image name consists of

```text
Repository : Tag
```

Example

```text
api-gateway:v1.0.0
```

Here

- Repository → api-gateway
- Tag → v1.0.0

Without a tag, Docker automatically uses

```text
latest
```

---

# Image Naming Structure

General format

```text
[Registry]/[Repository]:[Tag]
```

Example

```text
docker.io/library/nginx:1.27
```

Private registry example

```text
registry.company.com/api-gateway:v1.0.0
```

---

# Image Tag Architecture

```text
Docker Image

↓

Repository

↓

Tag

↓

Registry

↓

Deployment
```

The tag identifies exactly which version should be deployed.

---

# Why Image Tagging Matters

Benefits

- Version control
- Repeatable deployments
- Easy rollbacks
- CI/CD automation
- Traceability
- Release management
- Environment consistency

Enterprise deployments should never rely solely on `latest`.

---

# Default Tag

Example

```bash
docker build -t frontend .
```

Docker stores

```text
frontend:latest
```

Docker automatically assigns the `latest` tag when no tag is specified.

---

# Creating Tagged Images

Example

```bash
docker build -t frontend:v1 .
```

Another example

```bash
docker build -t auth-service:v2 .
```

---

# Listing Images

```bash
docker images
```

Example Output

```text
REPOSITORY       TAG

frontend         v1

frontend         v2

frontend         latest
```

---

# Tagging an Existing Image

Example

```bash
docker tag frontend:v1 frontend:production
```

Now both tags reference the same image.

---

# Multiple Tags

One image may have multiple tags.

Example

```text
frontend:v1

frontend:stable

frontend:production
```

All can point to the same image ID.

---

# Tagging Workflow

```text
Docker Build

↓

Image ID

↓

Assign Tag

↓

Push Registry

↓

Deploy Kubernetes
```

---

# Semantic Versioning

Common format

```text
Major.Minor.Patch
```

Example

```text
1.0.0

1.0.1

1.1.0

2.0.0
```

Meaning

Major

Breaking changes

Minor

New features

Patch

Bug fixes

---

# Environment Tags

Development

```text
dev
```

Testing

```text
test
```

Staging

```text
staging
```

Production

```text
prod
```

Example

```text
api-gateway:dev

api-gateway:test

api-gateway:prod
```

---

# Release Tags

Examples

```text
v1.0.0

v1.0.1

v1.2.0

v2.0.0
```

Release tags provide predictable deployments.

---

# Git Commit Tags

Many organizations use Git commit hashes.

Example

```text
frontend:8b2c741
```

Advantages

- Complete traceability
- Easy rollback
- Exact source mapping

---

# CI/CD Tags

Pipeline example

```text
Build Number

↓

Image Tag

↓

Registry

↓

Deployment
```

Examples

```text
frontend:build-245

api-gateway:20250718

dashboard:release-31
```

---

# Image Tagging in Our Project

Frontend

```text
frontend:v1.0.0
```

API Gateway

```text
api-gateway:v1.0.0
```

Auth Service

```text
auth-service:v1.0.0
```

Dashboard Service

```text
dashboard-service:v1.0.0
```

Future CI/CD pipelines will automatically generate image tags.

---

# Enterprise Workflow

Developer

↓

Git Commit

↓

GitHub Actions

↓

Docker Build

↓

Assign Version Tag

↓

Security Scan

↓

Push Registry

↓

Kubernetes Deployment

Image tags identify exactly what version is running.

---

# Internal Workflow

Docker Build

↓

Generate Image

↓

Assign Tag

↓

Store Image

↓

Push Registry

↓

Deployment

---

# latest Tag

Example

```text
frontend:latest
```

Problems

- Changes over time
- Difficult rollback
- No version history
- Unpredictable deployments

Enterprise Recommendation

Avoid relying on `latest` in production.

Use explicit version tags.

---

# Daily DevOps Activities

DevOps Engineers

- Build tagged images
- Push versioned images
- Verify registry tags
- Remove unused tags
- Support production rollbacks
- Maintain release history

---

# Production Best Practices

- Use semantic versioning.
- Avoid latest in production.
- Tag every release.
- Keep tags immutable.
- Use meaningful repository names.
- Align image tags with Git releases.
- Automate tagging in CI/CD.

---

# Security Considerations

- Never overwrite production release tags.
- Sign production images where possible.
- Scan every tagged image.
- Track image provenance.
- Remove deprecated versions from the registry.

---

# Troubleshooting

Build image

```bash
docker build -t frontend:v1 .
```

Tag existing image

```bash
docker tag frontend:v1 frontend:production
```

List images

```bash
docker images
```

Inspect image

```bash
docker image inspect frontend:v1
```

Remove tag

```bash
docker rmi frontend:production
```

---

# Real Production Scenario

Scenario

A production deployment introduces a critical bug.

Current deployment

```text
api-gateway:v2.4.0
```

Previous stable release

```text
api-gateway:v2.3.7
```

Resolution

Update Kubernetes deployment

```text
v2.4.0

↓

v2.3.7
```

Rollback completes within minutes because versioned images are available.

---

# Scenario-Based Interview Questions

## Question 1

What is a Docker Image Tag?

Answer

A tag is a version identifier attached to a Docker image that distinguishes different image versions within the same repository.

---

## Question 2

Can one Docker image have multiple tags?

Answer

Yes.

Multiple tags can reference the same image ID.

---

## Question 3

Why should production avoid using `latest`?

Answer

Because `latest` changes over time, making deployments unpredictable and rollbacks difficult.

---

# Architecture-Level Interview Questions

## Question

Why are immutable image tags recommended?

Answer

Immutable tags guarantee that a specific version always refers to the same image, ensuring reproducible deployments.

---

## Question

How do image tags support Kubernetes deployments?

Answer

Kubernetes deployments reference specific image tags, allowing controlled upgrades and reliable rollbacks.

---

## Question

Why integrate Git commit hashes into image tags?

Answer

It provides end-to-end traceability from running containers back to the exact source code revision.

---

# Production Support Questions

Q.

A production deployment is running the wrong application version.

What should you verify?

Answer

Review

- Image tag
- Kubernetes Deployment
- Container Registry
- CI/CD pipeline output
- Release version

---

Q.

Rollback is not possible after deployment.

Possible causes?

Answer

- Images overwritten
- Tags reused
- No version history
- Registry cleanup removed required images

---

# Related Runbooks

Future runbooks

- Build and Tag Docker Images
- Push Images to Registry
- Roll Back Image Versions
- Manage Image Lifecycle
- Clean Up Old Image Tags

---

# Common Incidents

- Wrong image tag deployed
- latest tag confusion
- Missing release tag
- Overwritten production tag
- Registry version mismatch
- Failed rollback
- Duplicate image tags

---

# Commands

Build tagged image

```bash
docker build -t frontend:v1.0.0 .
```

Tag existing image

```bash
docker tag frontend:v1.0.0 frontend:production
```

List images

```bash
docker images
```

Inspect image

```bash
docker image inspect frontend:v1.0.0
```

Push image

```bash
docker push registry.company.com/frontend:v1.0.0
```

Remove image tag

```bash
docker rmi frontend:production
```

---

# Key Takeaways

Docker Image Tags provide version control for container images and are essential for enterprise release management.

A well-defined tagging strategy enables reliable CI/CD automation, predictable Kubernetes deployments, quick production rollbacks, and complete traceability between running containers and source code.

For our Enterprise DevOps Platform, every image will use explicit, immutable version tags managed automatically by the CI/CD pipeline.

---

# Marathi Quick Revision

Docker Image Tag

Format

```text
repository:tag
```

उदाहरण

```text
frontend:v1.0.0
```

Best Practice

- Semantic Versioning
- Immutable tags
- latest टाळा
- CI/CD मधून auto tagging करा

---

# Marathi Interview Memory Tip

Interview मध्ये जर विचारलं:

"Docker Image Tagging म्हणजे काय?"

असं सांगा:

"Docker Image Tag म्हणजे image ची version ओळख. प्रत्येक production image ला unique tag जसे `v1.0.0` किंवा Git commit hash दिला जातो. यामुळे CI/CD pipelines मध्ये traceability मिळते, Kubernetes deployments predictable होतात आणि production rollback सहज करता येतो. Production मध्ये `latest` tag वर अवलंबून राहू नये."

