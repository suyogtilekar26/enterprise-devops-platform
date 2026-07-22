# Docker Lifecycle

## Purpose

This document explains the complete Docker lifecycle from an Enterprise DevOps perspective.

Understanding the lifecycle of Docker Images and Containers helps DevOps Engineers build reliable CI/CD pipelines, troubleshoot production issues, and design scalable container platforms.

For our Enterprise DevOps Platform, every application will follow this lifecycle before reaching Kubernetes.

---

# Introduction

A Docker application goes through several stages.

Developer

↓

Dockerfile

↓

Docker Image

↓

Container

↓

Registry

↓

Deployment

↓

Production

Understanding each stage is essential for enterprise operations.

---

# Docker Lifecycle Overview

```text
Source Code

↓

Dockerfile

↓

Build Image

↓

Store Image

↓

Run Container

↓

Stop Container

↓

Restart Container

↓

Remove Container

↓

Remove Image
```

This lifecycle repeats for every new application version.

---

# Phase 1 – Source Code

Applications are developed normally.

Examples in our project

- React Frontend
- API Gateway
- Auth Service
- Dashboard Service

Application code is stored in Git.

---

# Phase 2 – Dockerfile

A Dockerfile defines

- Base Image
- Dependencies
- Application Files
- Startup Command
- Environment

Example

```text
Dockerfile

↓

Build Instructions
```

The Dockerfile is the blueprint for creating an image.

---

# Phase 3 – Build Image

Command

```bash
docker build -t frontend:v1 .
```

Result

```text
Docker Image Created
```

The image contains everything required to run the application.

---

# Phase 4 – Store Image

Images may be stored

- Locally
- Docker Hub
- GitHub Container Registry
- Amazon ECR
- Harbor

Workflow

```text
Build

↓

Push

↓

Registry
```

Images become deployment artifacts.

---

# Phase 5 – Run Container

Command

```bash
docker run frontend:v1
```

Flow

```text
Image

↓

Container

↓

Application Running
```

The image itself never changes.

A container is created from it.

---

# Phase 6 – Running State

The application is now executing.

Container responsibilities

- Process execution
- Networking
- Logging
- Resource usage

The container continues running until stopped.

---

# Phase 7 – Stop Container

Command

```bash
docker stop <container>
```

Result

```text
Running

↓

Stopped
```

The container still exists.

Only the running process stops.

---

# Phase 8 – Restart Container

Command

```bash
docker start <container>
```

or

```bash
docker restart <container>
```

The existing container starts again.

No new image is required.

---

# Phase 9 – Remove Container

Command

```bash
docker rm <container>
```

Result

```text
Container Removed
```

The image still exists.

A new container can be created from the same image.

---

# Phase 10 – Remove Image

Command

```bash
docker rmi <image>
```

The image is deleted from the local system.

Containers depending on that image must be removed first.

---

# Complete Lifecycle Diagram

```text
Source Code

↓

Dockerfile

↓

docker build

↓

Image

↓

docker push

↓

Registry

↓

docker pull

↓

docker run

↓

Running Container

↓

docker stop

↓

Stopped Container

↓

docker rm

↓

Container Removed

↓

docker rmi

↓

Image Removed
```

---

# Docker Lifecycle in Our Project

Frontend

```text
React

↓

Dockerfile

↓

frontend-image

↓

frontend-container
```

API Gateway

```text
Flask

↓

Dockerfile

↓

api-gateway-image

↓

api-gateway-container
```

The same process applies to

- Auth Service
- Dashboard Service

Later

Containers

↓

Docker Compose

↓

Kind Kubernetes

↓

Helm

↓

Argo CD

↓

AWS EKS

---

# Enterprise Workflow

Developer

↓

Git Commit

↓

GitHub Actions

↓

Build Image

↓

Security Scan

↓

Push Registry

↓

Deploy Container

↓

Production

Every release follows the same lifecycle.

---

# Internal Workflow

Developer executes

```bash
docker build
```

↓

Image Created

↓

Developer executes

```bash
docker run
```

↓

Container Created

↓

Application Starts

↓

Container Stops

↓

Container Removed

The image remains reusable.

---

# Daily DevOps Activities

DevOps Engineers

- Build images
- Tag images
- Push images
- Run containers
- Restart containers
- Replace failed containers
- Remove unused images
- Clean stopped containers

Lifecycle management is part of daily operations.

---

# Production Best Practices

- Build immutable images.
- Never modify running containers.
- Replace containers instead of repairing them.
- Use image versioning.
- Keep containers stateless.
- Store persistent data in volumes.
- Automate image builds.

---

# Security Considerations

Every lifecycle stage should be secured.

- Scan images before deployment.
- Use trusted registries.
- Restrict registry access.
- Sign images where applicable.
- Run containers with least privilege.
- Remove unused images regularly.

---

# Troubleshooting

List images

```bash
docker images
```

List running containers

```bash
docker ps
```

List all containers

```bash
docker ps -a
```

Start container

```bash
docker start <container>
```

Stop container

```bash
docker stop <container>
```

Restart container

```bash
docker restart <container>
```

Remove container

```bash
docker rm <container>
```

Remove image

```bash
docker rmi <image>
```

---

# Real Production Scenario

Scenario

A new API version is released.

CI/CD

↓

Builds Image

↓

Scans Image

↓

Pushes Image

↓

Kubernetes downloads the image

↓

New containers start

↓

Old containers terminate

↓

Deployment completes

No existing container is modified.

A completely new container replaces the old one.

---

# Scenario-Based Interview Questions

## Question 1

What is the Docker lifecycle?

Answer

The Docker lifecycle begins with application source code, progresses through image creation, container execution, deployment, and eventually container and image removal.

---

## Question 2

What happens after

```bash
docker build
```

Answer

A Docker Image is created.

No application is running until a container is started from that image.

---

## Question 3

Does stopping a container remove it?

Answer

No.

The container remains on the system and can be started again.

---

# Architecture-Level Interview Questions

## Question

Why are containers replaced instead of updated?

Answer

Immutable infrastructure ensures consistency, reproducibility, and easier rollback.

New images produce new containers rather than modifying existing ones.

---

## Question

Why does the image remain after a container is removed?

Answer

Images are reusable templates.

Multiple containers can be created from the same image at any time.

---

## Question

Why are image builds performed in CI/CD?

Answer

CI/CD creates consistent, versioned deployment artifacts that can be promoted safely through environments.

---

# Production Support Questions

Q.

A container was deleted accidentally.

How do you recover the application?

Answer

If the image still exists locally or in the registry, create a new container from that image.

---

Q.

A running container was manually modified.

Should the changes be preserved?

Answer

No.

Update the Dockerfile, build a new image, and deploy a new container.

Manual changes should never become the production standard.

---

# Related Runbooks

Future runbooks

- Build Docker Image
- Push Image to Registry
- Restart Container
- Replace Failed Container
- Remove Unused Docker Resources

---

# Common Incidents

- Image build failure
- Image push failure
- Container startup failure
- Container crash
- Wrong image version
- Registry unavailable
- Orphaned containers
- Disk space exhaustion

---

# Commands

Build image

```bash
docker build -t app:v1 .
```

Run container

```bash
docker run app:v1
```

List images

```bash
docker images
```

List running containers

```bash
docker ps
```

Stop container

```bash
docker stop <container>
```

Start container

```bash
docker start <container>
```

Restart container

```bash
docker restart <container>
```

Remove container

```bash
docker rm <container>
```

Remove image

```bash
docker rmi <image>
```

---

# Key Takeaways

The Docker lifecycle transforms application source code into running containers through a repeatable, automated process.

Enterprise DevOps teams build immutable images, store them in registries, deploy containers, replace them during upgrades, and automate the entire lifecycle through CI/CD pipelines.

Understanding this lifecycle is essential before learning Docker CLI, Dockerfiles, Docker Compose, and Kubernetes.

---

# Marathi Quick Revision

Docker Lifecycle

Source Code

↓

Dockerfile

↓

Build Image

↓

Push Registry

↓

Run Container

↓

Stop

↓

Restart

↓

Remove Container

↓

Remove Image

Image म्हणजे template.

Container म्हणजे running application.

---

# Marathi Interview Memory Tip

Interview मध्ये जर विचारलं:

"Docker Lifecycle समजावून सांगा."

असं सांगा:

"Application source code पासून Dockerfile तयार होते. `docker build` ने image तयार होते. ती registry मध्ये push केली जाते. `docker run` ने container तयार होतो. Container stop, restart किंवा remove करता येतो, पण image reusable राहते. Enterprise मध्ये नवीन version साठी नवीन image build करून नवीन containers deploy केले जातात."

