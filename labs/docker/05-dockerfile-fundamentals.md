# Lab 05 - Dockerfile Fundamentals

# Objective

Learn how to write Dockerfiles and build custom Docker images.

This lab introduces Dockerfile instructions that will later be used to containerize the Enterprise DevOps Platform.

By the end of this lab you will be able to

- Create Dockerfiles
- Build custom images
- Understand Docker layers
- Run containers from custom images
- Inspect image history

---

# Enterprise Scenario

The development team has handed over the application source code.

The DevOps team must package every application into a Docker image before deploying to Kubernetes.

Applications

- Frontend
- API Gateway
- Auth Service
- Dashboard Service

Every application will have its own Dockerfile.

---

# Architecture

```
Application Source

        │

Dockerfile

        │

docker build

        │

Docker Image

        │

docker run

        │

Container
```

---

# Prerequisites

- Docker Installed
- Docker Running

Verify

```bash
docker version
```

---

# Step 1

Create a project directory.

```bash
mkdir dockerfile-lab

cd dockerfile-lab
```

---

# Step 2

Create a sample file.

```bash
echo "Welcome to Docker!" > index.html
```

---

# Step 3

Create Dockerfile.

```bash
nano Dockerfile
```

---

# Step 4

Add the following content.

```dockerfile
FROM nginx:latest

COPY index.html /usr/share/nginx/html/index.html
```

Save the file.

---

# Step 5

Verify Dockerfile.

```bash
cat Dockerfile
```

---

# Step 6

Build Docker image.

```bash
docker build -t docker-lab:v1 .
```

---

# Step 7

Verify image.

```bash
docker images
```

Expected

```
docker-lab
```

---

# Step 8

Inspect image history.

```bash
docker history docker-lab:v1
```

Observe

- Base Image
- COPY instruction
- Image Layers

---

# Step 9

Run container.

```bash
docker run -d \
--name dockerfile-demo \
-p 8080:80 \
docker-lab:v1
```

---

# Step 10

Verify running container.

```bash
docker ps
```

---

# Step 11

Access application.

```bash
curl http://localhost:8080
```

Expected

```
Welcome to Docker!
```

---

# Step 12

Inspect container.

```bash
docker inspect dockerfile-demo
```

---

# Step 13

View logs.

```bash
docker logs dockerfile-demo
```

---

# Step 14

Stop container.

```bash
docker stop dockerfile-demo
```

---

# Step 15

Remove container.

```bash
docker rm dockerfile-demo
```

---

# Understanding Dockerfile

## FROM

Specifies the base image.

Example

```dockerfile
FROM nginx:latest
```

---

## COPY

Copies files from the local machine into the image.

Example

```dockerfile
COPY index.html /usr/share/nginx/html/index.html
```

---

## docker build

Creates an image.

Example

```bash
docker build -t docker-lab:v1 .
```

---

## docker run

Creates a container from an image.

---

# Enterprise Usage

Later we will create Dockerfiles for

```
Frontend

↓

React Build

↓

Nginx Image
```

```
API Gateway

↓

Python Base Image

↓

Flask

↓

Gunicorn
```

```
Auth Service

↓

Python Image

↓

Flask

↓

Gunicorn
```

```
Dashboard Service

↓

Python Image

↓

Flask

↓

Gunicorn
```

Each service will have its own production-ready Dockerfile.

---

# Validation Checklist

Verify

- Dockerfile created
- Image built
- Container started
- Application accessible
- Image history viewed
- Container removed successfully

---

# Common Errors

## Dockerfile Not Found

Verify

```bash
ls
```

Dockerfile must exist in the current directory.

---

## Build Failed

Verify Dockerfile syntax.

```bash
cat Dockerfile
```

---

## Port Already In Use

Use another port.

Example

```bash
-p 8081:80
```

---

## Image Not Found

Verify

```bash
docker images
```

---

# Troubleshooting Commands

Images

```bash
docker images
```

Containers

```bash
docker ps -a
```

Image History

```bash
docker history docker-lab:v1
```

Inspect Image

```bash
docker inspect docker-lab:v1
```

Logs

```bash
docker logs dockerfile-demo
```

---

# Best Practices

- Keep Dockerfiles simple
- Use official base images
- Minimize image layers
- Build images locally before pushing
- Verify containers after every build

---

# Expected Result

You should successfully

- Create your first Dockerfile
- Build a custom Docker image
- Run a container from that image
- Inspect image layers
- Understand how Dockerfiles create reproducible application images

