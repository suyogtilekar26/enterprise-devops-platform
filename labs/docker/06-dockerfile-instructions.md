# Lab 06 - Dockerfile Instructions

# Objective

Learn the most commonly used Dockerfile instructions used in enterprise environments.

By the end of this lab you will understand

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

These instructions will be used later while containerizing the Enterprise DevOps Platform.

---

# Enterprise Scenario

The development team has delivered the following applications.

- Frontend
- API Gateway
- Auth Service
- Dashboard Service

The DevOps team must write production-ready Dockerfiles for each service.

Before doing that, every Dockerfile instruction must be understood individually.

---

# Dockerfile Workflow

```
Dockerfile

↓

Build Image

↓

Docker Image

↓

Run Container

↓

Application Running
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

Create lab directory.

```bash
mkdir dockerfile-instructions

cd dockerfile-instructions
```

---

# Step 2

Create application file.

```bash
echo "Enterprise DevOps Platform" > index.html
```

---

# Step 3

Create Dockerfile.

```bash
nano Dockerfile
```

---

# Step 4

Add the following Dockerfile.

```dockerfile
FROM nginx:latest

LABEL maintainer="DevOps Team"

WORKDIR /usr/share/nginx/html

COPY index.html .

ENV APP_ENV=development

EXPOSE 80

CMD ["nginx","-g","daemon off;"]
```

Save the file.

---

# Step 5

Build image.

```bash
docker build -t docker-instructions:v1 .
```

---

# Step 6

Verify image.

```bash
docker images
```

---

# Step 7

Run container.

```bash
docker run -d \
--name instruction-demo \
-p 8080:80 \
docker-instructions:v1
```

---

# Step 8

Verify application.

```bash
curl http://localhost:8080
```

Expected

```
Enterprise DevOps Platform
```

---

# Step 9

Inspect image.

```bash
docker inspect docker-instructions:v1
```

Observe

- Labels
- Environment Variables
- Working Directory

---

# Step 10

Inspect container.

```bash
docker inspect instruction-demo
```

Observe

- Port Mapping
- Environment
- Mounts

---

# Step 11

View image history.

```bash
docker history docker-instructions:v1
```

---

# Understanding Dockerfile Instructions

## FROM

Specifies the base image.

Example

```dockerfile
FROM nginx:latest
```

---

## LABEL

Adds metadata.

Example

```dockerfile
LABEL maintainer="DevOps Team"
```

Useful for

- Ownership
- Documentation
- Image Management

---

## WORKDIR

Sets the working directory.

Example

```dockerfile
WORKDIR /app
```

All subsequent commands execute inside this directory.

---

## COPY

Copies files.

Example

```dockerfile
COPY . .
```

---

## ADD

Copies files and supports archives or URLs.

Example

```dockerfile
ADD app.tar.gz /app
```

Enterprise recommendation

Prefer

```
COPY
```

unless ADD functionality is required.

---

## RUN

Executes commands during image build.

Example

```dockerfile
RUN apt update
```

Creates a new image layer.

---

## ENV

Creates environment variables.

Example

```dockerfile
ENV APP_ENV=production
```

---

## EXPOSE

Documents application ports.

Example

```dockerfile
EXPOSE 5000
```

---

## USER

Runs application using a non-root user.

Example

```dockerfile
USER appuser
```

Enterprise recommendation

Avoid running containers as root.

---

## CMD

Defines the default startup command.

Example

```dockerfile
CMD ["python","app.py"]
```

Only one CMD should exist.

---

## ENTRYPOINT

Defines the executable that always runs.

Example

```dockerfile
ENTRYPOINT ["python"]
```

Can be combined with CMD.

---

# Enterprise Usage

Future Dockerfiles

Frontend

```dockerfile
FROM node:22
```

↓

React Build

↓

Nginx Runtime

---

API Gateway

```dockerfile
FROM python:3.12-slim
```

↓

Install Flask

↓

Install Gunicorn

↓

Run Application

---

Auth Service

Uses

- FROM
- COPY
- RUN
- ENV
- CMD

---

Dashboard Service

Uses

- FROM
- COPY
- RUN
- EXPOSE
- CMD

---

# Validation Checklist

Verify

- Dockerfile created
- Image built
- Container started
- Application accessible
- Labels visible
- Environment variables present
- Working directory configured
- Dockerfile instructions understood

---

# Common Errors

## Invalid Dockerfile Syntax

Review

```bash
cat Dockerfile
```

---

## Build Failure

Verify

```bash
docker build -t docker-instructions:v1 .
```

---

## Port Already Allocated

Use another port.

Example

```bash
-p 8081:80
```

---

## Container Exits Immediately

Inspect logs.

```bash
docker logs instruction-demo
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

Inspect Image

```bash
docker inspect docker-instructions:v1
```

Inspect Container

```bash
docker inspect instruction-demo
```

Logs

```bash
docker logs instruction-demo
```

History

```bash
docker history docker-instructions:v1
```

---

# Best Practices

- Use official base images
- Prefer COPY over ADD
- Minimize RUN instructions
- Use WORKDIR instead of repeated cd commands
- Store configuration using ENV
- Run containers as non-root
- Keep Dockerfiles readable
- Use LABEL for image metadata

---

# Expected Result

You should successfully

- Understand all major Dockerfile instructions
- Build an image using multiple instructions
- Run and inspect the resulting container
- Prepare for writing production-ready Dockerfiles for the Enterprise DevOps Platform

