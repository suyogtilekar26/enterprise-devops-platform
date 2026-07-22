# Lab 03 - Working with Docker Images

# Objective

Learn how to manage Docker images in preparation for containerizing the Enterprise DevOps Platform.

By the end of this lab you will be able to

- Search images
- Pull images
- List images
- Inspect images
- Tag images
- Remove images
- Understand image layers

---

# Enterprise Scenario

Before creating custom images for our application, the DevOps team needs to understand how Docker images are managed.

Later in this project we will create images for

- Frontend
- API Gateway
- Auth Service
- Dashboard Service

These images will eventually be pushed to GitHub Container Registry and deployed to Kubernetes.

---

# Architecture

```
Docker Hub

      │

docker pull

      │

Docker Image

      │

docker tag

      │

GitHub Container Registry

      │

Kubernetes Deployment
```

---

# Prerequisites

- Docker Installed
- Docker Service Running

Verify

```bash
docker version
```

---

# Step 1

View existing images.

```bash
docker images
```

---

# Step 2

Search for an image.

```bash
docker search nginx
```

Observe

- Image Name
- Description
- Official Image

---

# Step 3

Download nginx image.

```bash
docker pull nginx
```

---

# Step 4

Download python image.

```bash
docker pull python:3.12-slim
```

---

# Step 5

Download alpine image.

```bash
docker pull alpine
```

---

# Step 6

List downloaded images.

```bash
docker images
```

Expected

```
nginx

python

alpine

ubuntu
```

---

# Step 7

Inspect nginx image.

```bash
docker inspect nginx
```

Observe

- Image ID
- Architecture
- Operating System
- Environment Variables
- Layers

---

# Step 8

View image history.

```bash
docker history nginx
```

Observe

- Layers
- Commands
- Image Size

---

# Step 9

View image details.

```bash
docker image ls
```

---

# Step 10

Tag an image.

```bash
docker tag nginx my-nginx:v1
```

---

# Step 11

Verify new tag.

```bash
docker images
```

Expected

```
nginx

my-nginx
```

Both point to the same Image ID.

---

# Step 12

Remove tagged image.

```bash
docker rmi my-nginx:v1
```

Verify

```bash
docker images
```

Original nginx image should still exist.

---

# Step 13

Inspect image size.

```bash
docker images
```

Observe

```
SIZE
```

---

# Step 14

Remove alpine image.

```bash
docker rmi alpine
```

---

# Step 15

Download alpine again.

```bash
docker pull alpine
```

Notice Docker downloads only required layers.

---

# Understanding Image Layers

```
Application Layer

↓

Python Layer

↓

Ubuntu Layer

↓

Linux Kernel
```

Every Docker image is built using layers.

Layers are reused whenever possible.

---

# Enterprise Usage

Later we will build

```
Frontend Image

↓

React + Vite

↓

GHCR
```

```
API Gateway Image

↓

Flask

↓

GHCR
```

```
Auth Service Image

↓

Flask

↓

GHCR
```

```
Dashboard Image

↓

Flask

↓

GHCR
```

---

# Validation Checklist

Verify

- Images downloaded
- Images listed
- Images inspected
- Image history viewed
- Image tagged
- Tagged image removed
- Layers understood

---

# Common Errors

## Image Not Found

Verify image name.

Example

```bash
docker pull nginx
```

---

## Cannot Remove Image

Image may be used by a container.

Check

```bash
docker ps -a
```

Remove container first.

---

## Pull Access Denied

Verify image exists.

Use

```bash
docker search <image-name>
```

---

# Troubleshooting Commands

List Images

```bash
docker images
```

Inspect Image

```bash
docker inspect nginx
```

Image History

```bash
docker history nginx
```

Remove Image

```bash
docker rmi nginx
```

Pull Image

```bash
docker pull nginx
```

---

# Best Practices

- Use official images whenever possible
- Use lightweight base images
- Remove unused images regularly
- Tag images with versions
- Avoid relying only on the latest tag in production

---

# Expected Result

You should successfully

- Search Docker images
- Download images
- Inspect images
- Understand image layers
- Tag images
- Remove images
- Prepare for Dockerfile creation

