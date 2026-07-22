# Docker Introduction

## Purpose

This document introduces Docker from an Enterprise DevOps perspective.

Docker is one of the most important technologies in modern software delivery. It allows applications to be packaged with all required dependencies into lightweight, portable containers that can run consistently across different environments.

For our Enterprise DevOps Platform, Docker is the first major implementation technology after Git and serves as the foundation for Kubernetes, Helm, Argo CD, and cloud deployments.

---

# Introduction

Before Docker,

applications were deployed directly onto servers.

Typical problems included

- Different operating systems
- Different library versions
- Missing dependencies
- Environment inconsistencies
- Difficult deployments
- Resource conflicts

Developers often heard

"It works on my machine."

Docker was created to eliminate these problems.

---

# What is Docker?

Docker is an open-source containerization platform.

It packages

- Application
- Runtime
- Libraries
- Dependencies
- Configuration

into a single portable unit called a

```text
Container
```

A container behaves the same way regardless of where it runs.

---

# Why Docker is Important

Docker provides

- Consistent environments
- Fast deployments
- Lightweight virtualization
- Better resource utilization
- Easy scaling
- Isolation
- Portability

Containers remove the dependency on the underlying operating system configuration.

---

# Enterprise Usage

Most enterprise applications today run inside Docker containers.

Examples include

- Microservices
- APIs
- Frontend Applications
- Databases
- Monitoring Tools
- CI/CD Runners
- Build Agents

Docker has become the industry standard for packaging applications.

---

# Traditional Deployment

```text
Application

↓

Server

↓

Operating System

↓

Hardware
```

Problems

- Dependency conflicts
- Manual configuration
- Difficult upgrades
- Environment mismatch

---

# Docker Deployment

```text
Application

↓

Container

↓

Docker Engine

↓

Operating System

↓

Hardware
```

Applications become isolated from each other.

---

# Virtual Machines vs Docker

Virtual Machines

```text
Application

↓

Guest OS

↓

Hypervisor

↓

Host OS
```

Containers

```text
Application

↓

Container Runtime

↓

Host OS
```

Containers share the host operating system kernel, making them much lighter and faster than traditional virtual machines.

---

# Docker in Our Project

Our Enterprise DevOps Platform contains

Frontend

- React + Vite

Backend

- API Gateway
- Auth Service
- Dashboard Service

Each application will receive its own Docker image.

Later

Docker Images

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

Docker is therefore the foundation of the entire deployment pipeline.

---

# Enterprise Workflow

Developer

↓

Code Changes

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

Kubernetes

↓

Production

Docker converts application source code into deployable artifacts.

---

# Daily DevOps Activities

DevOps Engineers regularly

- Build Docker images
- Run containers
- Debug container issues
- Push images to registries
- Optimize image sizes
- Secure container images
- Monitor container health

Docker becomes part of everyday operations.

---

# Production Best Practices

- Keep images small.
- Use official base images.
- Pin image versions.
- Avoid unnecessary packages.
- Build immutable images.
- Scan images for vulnerabilities.
- Run containers as non-root users.
- Store configuration outside the image.

---

# Security Considerations

Containers improve isolation but do not eliminate security risks.

Enterprise security includes

- Image scanning
- Least privilege
- Signed images
- Secret management
- Read-only filesystems where appropriate
- Regular image updates

Security begins during image creation.

---

# Troubleshooting

Verify Docker installation

```bash
docker --version
```

Verify Docker Engine

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

---

# Real Production Scenario

Scenario

A development team builds an application on Ubuntu.

Production servers run Amazon Linux.

Previously,

the application failed because different library versions existed on each server.

After adopting Docker,

the application and all dependencies were packaged into a Docker image.

The same image successfully ran in

- Development
- Testing
- Staging
- Production

No environment-specific modifications were required.

---

# Scenario-Based Interview Questions

## Question 1

What is Docker?

Answer

Docker is a containerization platform that packages applications and their dependencies into portable containers that run consistently across environments.

---

## Question 2

Why was Docker created?

Answer

Docker solves environment inconsistency by packaging applications with all required dependencies into isolated containers.

---

## Question 3

What is a container?

Answer

A container is a lightweight, isolated runtime environment that contains an application and everything required to run it.

---

# Architecture-Level Interview Questions

## Question

Why are containers lighter than virtual machines?

Answer

Containers share the host operating system kernel, whereas virtual machines require a complete guest operating system.

---

## Question

Why is Docker important for microservices?

Answer

Each microservice can be packaged independently, deployed consistently, and scaled separately.

---

## Question

Can Docker replace Kubernetes?

Answer

No.

Docker packages applications into containers.

Kubernetes manages and orchestrates those containers at scale.

---

# Production Support Questions

Q.

An application runs locally but fails in production.

How can Docker help?

Answer

Docker ensures the same application image is deployed across environments, reducing environment-specific differences.

---

Q.

Why do enterprises build Docker images during CI/CD instead of directly on production servers?

Answer

Building images during CI/CD ensures repeatable, tested, immutable deployment artifacts that can be promoted through environments.

---

# Related Runbooks

Future runbooks

- Install Docker
- Build Docker Image
- Run Docker Container
- Push Image to Registry
- Troubleshoot Docker Container

---

# Common Incidents

- Docker daemon not running
- Image build failure
- Container startup failure
- Port conflicts
- Missing environment variables
- Image pull failure
- Disk space exhaustion
- Permission issues

---

# Commands

Check version

```bash
docker --version
```

System information

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

---

# Key Takeaways

Docker is the industry-standard platform for containerizing applications.

It provides

- Portability
- Consistency
- Isolation
- Faster deployments
- Better resource utilization

For our Enterprise DevOps Platform, Docker is the bridge between application development and Kubernetes-based production deployments.

---

# Marathi Quick Revision

Docker म्हणजे application आणि त्याच्या सर्व dependencies एका container मध्ये package करण्याची technology.

फायदे

- Same environment
- Fast deployment
- Lightweight
- Portable
- Easy scaling

Docker हा Kubernetes चा foundation आहे.

---

# Marathi Interview Memory Tip

Interview मध्ये जर विचारलं:

"Docker म्हणजे काय?"

असं सांगा:

"Docker ही containerization platform आहे जी application आणि त्याच्या dependencies एका portable container मध्ये package करते. त्यामुळे development, testing आणि production मध्ये एकच image वापरली जाते, environment mismatch होत नाही आणि deployments consistent, fast आणि reliable होतात."

