# Docker Architecture

## Purpose

This document explains Docker Architecture from an Enterprise DevOps perspective.

Understanding Docker Architecture is essential because every Docker command ultimately interacts with multiple components working together to build, manage, and run containers.

For our Enterprise DevOps Platform, Docker Architecture forms the foundation for

- Docker Images
- Docker Compose
- Kubernetes
- Helm
- Argo CD
- AWS EKS

---

# Introduction

Docker is not a single application.

It consists of multiple components working together.

These components are responsible for

- Building images
- Running containers
- Managing storage
- Managing networks
- Communicating with registries
- Providing APIs

Understanding how these components interact makes troubleshooting and production support much easier.

---

# High-Level Architecture

```text
Developer

↓

Docker CLI

↓

Docker API

↓

Docker Daemon (dockerd)

↓

Images
Containers
Networks
Volumes

↓

Container Runtime

↓

Linux Kernel

↓

Hardware
```

Every Docker command flows through this architecture.

---

# Docker Components

Major components include

- Docker CLI
- Docker Daemon
- Docker Engine
- Docker API
- Docker Images
- Docker Containers
- Docker Networks
- Docker Volumes
- Container Runtime
- Docker Registry

Each component has a specific responsibility.

---

# Docker CLI

The Docker CLI is the command-line interface used by developers.

Examples

```bash
docker build
```

```bash
docker run
```

```bash
docker ps
```

The CLI does not manage containers directly.

It sends requests to the Docker Daemon.

---

# Docker Daemon (dockerd)

The Docker Daemon is the core background service.

Responsibilities

- Build images
- Run containers
- Stop containers
- Remove containers
- Create networks
- Manage volumes
- Pull images
- Push images

The daemon listens for Docker API requests.

Linux service

```bash
sudo systemctl status docker
```

---

# Docker API

The Docker API allows communication between

- Docker CLI
- Docker Daemon
- External applications

Example

```text
Docker CLI

↓

REST API

↓

Docker Daemon
```

Many automation platforms communicate with Docker using this API.

---

# Docker Engine

Docker Engine includes

- Docker Daemon
- Docker CLI
- Docker API

Together they provide complete container management.

---

# Docker Images

Docker Images are

- Read-only
- Immutable
- Versioned

Images contain

- Application
- Libraries
- Runtime
- Dependencies
- Metadata

Images are templates.

Containers are created from images.

---

# Docker Containers

Containers are running instances of Docker images.

Example

```text
Docker Image

↓

docker run

↓

Running Container
```

Multiple containers can run from the same image.

---

# Container Runtime

The container runtime starts and manages containers.

Responsibilities

- Process isolation
- Resource allocation
- Namespace management
- cgroups
- Filesystem mounting

The runtime interacts directly with the Linux kernel.

---

# Docker Registry

Docker Registry stores Docker images.

Examples

- Docker Hub
- GitHub Container Registry
- Amazon ECR
- Azure Container Registry
- Harbor

Workflow

```text
docker build

↓

docker push

↓

Registry

↓

docker pull

↓

Container
```

---

# Docker Volumes

Volumes provide persistent storage.

Without volumes,

container data disappears when the container is removed.

Volumes solve this limitation.

---

# Docker Networks

Networks allow communication between containers.

Example

```text
Frontend

↓

API Gateway

↓

Auth Service
```

Containers communicate through Docker networking.

---

# Docker Architecture in Our Project

Our project architecture

```text
React Frontend

↓

API Gateway

↓

Auth Service

↓

Dashboard Service
```

Each service

↓

Docker Image

↓

Docker Container

↓

Docker Network

↓

Docker Compose

↓

Kind Kubernetes

↓

Helm

↓

Argo CD

↓

Future AWS EKS
```

Docker provides the packaging layer before orchestration.

---

# Enterprise Workflow

Developer

↓

Git Commit

↓

GitHub

↓

GitHub Actions

↓

Docker Build

↓

Docker Image

↓

Container Registry

↓

Kubernetes Deployment

↓

Production

Docker Architecture enables this workflow.

---

# Internal Workflow

Example

Developer executes

```bash
docker run nginx
```

Flow

```text
Docker CLI

↓

Docker API

↓

Docker Daemon

↓

Image Check

↓

Download Image (if required)

↓

Container Runtime

↓

Linux Kernel

↓

Running Container
```

Every Docker command follows a similar sequence.

---

# Daily DevOps Activities

DevOps Engineers regularly

- Build images
- Start containers
- Stop containers
- Inspect logs
- Create networks
- Create volumes
- Push images
- Pull images
- Debug daemon issues

Understanding the architecture simplifies troubleshooting.

---

# Production Best Practices

- Keep Docker Engine updated.
- Monitor Docker daemon health.
- Use official images.
- Store images in trusted registries.
- Use immutable image tags.
- Separate application and persistent data.
- Monitor resource utilization.

---

# Security Considerations

Secure every Docker component

- Docker Daemon
- Registry
- Images
- Networks
- Volumes
- API

Best practices

- TLS for remote API
- Image scanning
- Least privilege
- Non-root containers
- Restricted daemon access

---

# Troubleshooting

Verify Docker daemon

```bash
docker info
```

Service status

```bash
sudo systemctl status docker
```

View running containers

```bash
docker ps
```

View images

```bash
docker images
```

View networks

```bash
docker network ls
```

View volumes

```bash
docker volume ls
```

---

# Real Production Scenario

Scenario

A production deployment fails because containers cannot start.

Investigation shows

Docker Daemon is running.

Images exist.

Container runtime reports insufficient memory.

Root Cause

Host resource exhaustion.

Resolution

Increase available resources and restart affected containers.

Understanding Docker Architecture allows engineers to quickly isolate whether the issue lies in

- CLI
- Daemon
- Image
- Runtime
- Registry
- Host

---

# Scenario-Based Interview Questions

## Question 1

What happens when you run

```bash
docker run nginx
```

Answer

The Docker CLI sends a request to the Docker Daemon through the Docker API.

The daemon checks for the image, downloads it if necessary, and starts a container using the container runtime.

---

## Question 2

What is the Docker Daemon?

Answer

The Docker Daemon is the background service responsible for managing images, containers, networks, volumes, and build operations.

---

## Question 3

What is the difference between an image and a container?

Answer

An image is a read-only template.

A container is a running instance created from that image.

---

# Architecture-Level Interview Questions

## Question

Why is Docker Engine considered the core of Docker?

Answer

Docker Engine combines the Docker Daemon, Docker API, and Docker CLI, providing all functionality required to build and manage containers.

---

## Question

Why does Docker require a daemon?

Answer

The daemon performs privileged operations such as creating namespaces, managing storage, networking, and interacting with the Linux kernel.

---

## Question

Can multiple containers use the same image?

Answer

Yes.

A single image can create any number of independent containers.

---

# Production Support Questions

Q.

Docker commands are hanging.

What do you investigate first?

Answer

Verify

- Docker daemon
- System resources
- Docker API responsiveness
- Container runtime status

---

Q.

A container cannot be created even though the image exists.

Possible causes?

Answer

Investigate

- Docker daemon
- Resource limits
- Storage availability
- Runtime errors
- Network configuration

---

# Related Runbooks

Future runbooks

- Restart Docker Daemon
- Troubleshoot Docker Engine
- Investigate Container Startup Failure
- Debug Docker Networking
- Verify Docker Installation

---

# Common Incidents

- Docker daemon unavailable
- Container startup failure
- Image pull failure
- Registry authentication issues
- Network creation failure
- Volume mounting issues
- Resource exhaustion

---

# Commands

Docker version

```bash
docker --version
```

System information

```bash
docker info
```

Running containers

```bash
docker ps
```

Images

```bash
docker images
```

Networks

```bash
docker network ls
```

Volumes

```bash
docker volume ls
```

Docker service

```bash
sudo systemctl status docker
```

---

# Marathi Quick Revision

Docker Architecture

Developer

↓

Docker CLI

↓

Docker API

↓

Docker Daemon

↓

Container Runtime

↓

Linux Kernel

↓

Hardware

Image म्हणजे template.

Container म्हणजे त्या image ची running instance.

---

# Marathi Interview Memory Tip

Interview मध्ये जर विचारलं:

"Docker Architecture समजावून सांगा."

असं सांगा:

"Docker मध्ये Developer Docker CLI वापरतो. CLI Docker API द्वारे Docker Daemon शी संवाद साधते. Docker Daemon images, containers, networks आणि volumes manage करतो. Container Runtime Linux Kernel वापरून container सुरू करतो. त्यामुळे Docker मध्ये CLI, Daemon, Runtime आणि Registry हे मुख्य architecture components आहेत."

