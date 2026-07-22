# Docker Components

## Purpose

This document explains the major components of Docker from an Enterprise DevOps perspective.

Understanding Docker components helps DevOps Engineers troubleshoot container issues, optimize deployments, and understand how Docker works internally.

For our Enterprise DevOps Platform, these components will later integrate with

- Docker Compose
- GitHub Actions
- Kubernetes
- Helm
- Argo CD
- AWS EKS

---

# Introduction

Docker is composed of several independent components that work together to build, distribute, and run containerized applications.

Each component has a specific responsibility.

Understanding these responsibilities is essential for production support and troubleshooting.

---

# Major Docker Components

Docker consists of

- Docker Client (CLI)
- Docker Daemon
- Docker Engine
- Docker API
- Docker Images
- Docker Containers
- Docker Registry
- Docker Networks
- Docker Volumes
- BuildKit
- Container Runtime

---

# Component Overview

```text
Developer

↓

Docker CLI

↓

Docker API

↓

Docker Daemon

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

---

# Docker Client (CLI)

The Docker Client is the command-line interface used by developers and DevOps Engineers.

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

```bash
docker images
```

The CLI sends commands to the Docker Daemon.

It does not manage containers directly.

---

# Docker Daemon (dockerd)

The Docker Daemon is the background service responsible for managing Docker resources.

Responsibilities

- Build images
- Pull images
- Push images
- Run containers
- Stop containers
- Delete containers
- Create networks
- Manage volumes

Linux service

```bash
sudo systemctl status docker
```

---

# Docker Engine

Docker Engine is the complete Docker runtime.

It includes

- Docker CLI
- Docker API
- Docker Daemon

Docker Engine provides all container management functionality.

---

# Docker API

The Docker API allows communication between

- Docker CLI
- Docker Daemon
- External applications

Many enterprise tools communicate with Docker using the REST API.

Examples

- GitHub Actions
- Jenkins
- Kubernetes tools
- IDE plugins

---

# Docker Images

Docker Images are immutable templates.

They contain

- Application
- Runtime
- Libraries
- Dependencies
- Metadata

Images cannot execute directly.

They must first become containers.

---

# Docker Containers

Containers are running instances of Docker images.

Example

```text
Docker Image

↓

docker run

↓

Container
```

Multiple containers can be created from the same image.

Each container runs independently.

---

# Docker Registry

A Docker Registry stores Docker images.

Popular registries

- Docker Hub
- GitHub Container Registry
- Amazon Elastic Container Registry (ECR)
- Azure Container Registry (ACR)
- Google Artifact Registry
- Harbor

Workflow

```text
Build

↓

Push

↓

Registry

↓

Pull

↓

Run
```

---

# Docker Networks

Networks enable communication between containers.

Examples

```text
Frontend

↓

API Gateway

↓

Auth Service

↓

Dashboard Service
```

Docker networking provides

- DNS
- Isolation
- Service discovery

---

# Docker Volumes

Volumes provide persistent storage.

Without volumes,

data stored inside containers is typically lost when containers are removed.

Volumes keep data independent of the container lifecycle.

---

# BuildKit

BuildKit is Docker's modern image builder.

Advantages

- Faster builds
- Better caching
- Parallel execution
- Improved security
- Multi-stage optimization

BuildKit is enabled by default in modern Docker versions.

---

# Container Runtime

The container runtime

- Creates containers
- Starts processes
- Applies namespaces
- Applies cgroups
- Connects networking
- Mounts filesystems

It communicates directly with the Linux kernel.

---

# Component Relationships

```text
CLI

↓

Daemon

↓

Images

↓

Containers

↓

Networks

↓

Volumes
```

Every Docker operation involves multiple components.

---

# Docker Components in Our Project

Each application

```text
Frontend

↓

Docker Image

↓

Docker Container
```

```text
API Gateway

↓

Docker Image

↓

Docker Container
```

```text
Auth Service

↓

Docker Image

↓

Docker Container
```

```text
Dashboard Service

↓

Docker Image

↓

Docker Container
```

Containers communicate through Docker Networks.

Persistent data will later use Docker Volumes where required.

---

# Enterprise Workflow

Developer

↓

GitHub

↓

GitHub Actions

↓

Docker Build

↓

Docker Image

↓

Registry

↓

Kind Kubernetes

↓

Future AWS EKS

Docker components participate in every stage.

---

# Daily DevOps Activities

DevOps Engineers routinely

- Build images
- Pull images
- Push images
- Inspect containers
- Create networks
- Manage volumes
- Monitor Docker daemon
- Clean unused resources

Understanding components simplifies operations.

---

# Production Best Practices

- Use official images.
- Keep Docker Engine updated.
- Store images in trusted registries.
- Minimize image size.
- Use volumes for persistent data.
- Separate application and storage.
- Remove unused images and containers.

---

# Security Considerations

Secure every component.

Recommendations

- Restrict Docker daemon access.
- Scan images regularly.
- Use trusted registries.
- Limit Docker API exposure.
- Run containers as non-root users.
- Protect registry credentials.

---

# Troubleshooting

Verify Docker daemon

```bash
docker info
```

View images

```bash
docker images
```

View containers

```bash
docker ps -a
```

View networks

```bash
docker network ls
```

View volumes

```bash
docker volume ls
```

Check Docker service

```bash
sudo systemctl status docker
```

---

# Real Production Scenario

Scenario

Developers successfully build Docker images.

However,

production servers cannot start containers.

Investigation shows

Docker Daemon is healthy.

Images exist.

The required image was never pushed to the production registry.

Resolution

```text
Build

↓

Push

↓

Registry

↓

Pull

↓

Run
```

Understanding individual Docker components quickly identifies the missing step.

---

# Scenario-Based Interview Questions

## Question 1

What are the major Docker components?

Answer

Docker consists of

- CLI
- Daemon
- Engine
- API
- Images
- Containers
- Registry
- Networks
- Volumes
- Container Runtime

---

## Question 2

Which Docker component actually manages containers?

Answer

The Docker Daemon manages container lifecycle operations.

---

## Question 3

What is the purpose of a Docker Registry?

Answer

A registry stores Docker images so they can be shared and deployed across different environments.

---

# Architecture-Level Interview Questions

## Question

Why are Docker images immutable?

Answer

Immutable images ensure consistency, reproducibility, and reliable deployments by preventing changes after an image is built.

---

## Question

Why are Docker volumes separate from containers?

Answer

Separating storage from containers allows application data to persist even when containers are recreated or upgraded.

---

## Question

Why is the Docker API important?

Answer

The Docker API enables automation tools, CI/CD platforms, and orchestration systems to interact programmatically with Docker.

---

# Production Support Questions

Q.

A container starts successfully on one server but not another.

Which Docker components should you investigate?

Answer

Verify

- Docker Daemon
- Image availability
- Container runtime
- Network configuration
- Volume mounts
- Host resources

---

Q.

A deployment pipeline builds images but Kubernetes cannot deploy them.

Where might the failure exist?

Answer

Investigate whether the image was successfully pushed to the container registry and whether Kubernetes has permission to pull it.

---

# Related Runbooks

Future runbooks

- Build Docker Image
- Push Image to Registry
- Troubleshoot Docker Daemon
- Debug Container Startup
- Verify Docker Registry Access

---

# Common Incidents

- Docker daemon unavailable
- Registry authentication failure
- Image not found
- Container startup failure
- Network misconfiguration
- Volume mounting issue
- Runtime resource exhaustion

---

# Commands

Docker information

```bash
docker info
```

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

List networks

```bash
docker network ls
```

List volumes

```bash
docker volume ls
```

Check Docker service

```bash
sudo systemctl status docker
```

---

# Key Takeaways

Docker is composed of multiple components that work together to build, store, distribute, and run containers.

Understanding these components enables DevOps Engineers to

- Troubleshoot efficiently
- Design reliable deployments
- Optimize performance
- Secure container platforms
- Support production environments

This knowledge forms the foundation for Docker Compose, Kubernetes, Helm, and GitOps workflows used throughout the Enterprise DevOps Platform.

---

# Marathi Quick Revision

Docker Components

- CLI
- Daemon
- Engine
- API
- Images
- Containers
- Registry
- Networks
- Volumes
- Runtime

CLI command देते.

Daemon सर्व resources manage करतो.

Image म्हणजे template.

Container म्हणजे running application.

---

# Marathi Interview Memory Tip

Interview मध्ये जर विचारलं:

"Docker चे मुख्य components कोणते?"

असं सांगा:

"Docker मध्ये Docker CLI, Docker Daemon, Docker Engine, Docker API, Images, Containers, Registry, Networks आणि Volumes हे मुख्य components आहेत. CLI command पाठवते, Daemon त्या command execute करतो, Image पासून Container तयार होतो आणि Registry images store करण्यासाठी वापरली जाते."

