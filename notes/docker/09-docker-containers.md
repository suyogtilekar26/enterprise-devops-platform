# Docker Containers

## Purpose

This document explains Docker Containers from an Enterprise DevOps perspective.

Docker Containers are the runtime units of Docker. Every application packaged as a Docker Image eventually executes inside a Docker Container.

For our Enterprise DevOps Platform, each service will run as an independent Docker Container before being orchestrated by Docker Compose and Kubernetes.

---

# Introduction

A Docker Container is a running instance of a Docker Image.

Think of it this way

```text
Docker Image

↓

docker run

↓

Docker Container

↓

Running Application
```

Images are static.

Containers are dynamic.

Containers execute the application.

---

# Container Architecture

```text
Docker Image

↓

Container Runtime

↓

Docker Container

↓

Application Process

↓

Linux Kernel
```

Containers share the host operating system kernel while remaining isolated from one another.

---

# Characteristics of Docker Containers

Docker Containers are

- Lightweight
- Portable
- Isolated
- Fast to start
- Ephemeral
- Reproducible
- Easy to replace

Containers provide application isolation without requiring a full virtual machine.

---

# Container Lifecycle

```text
Create

↓

Start

↓

Running

↓

Pause

↓

Resume

↓

Stop

↓

Restart

↓

Remove
```

Containers move through these states during their lifecycle.

---

# Container States

Common states include

- Created
- Running
- Paused
- Restarting
- Exited
- Dead

Use Docker CLI commands to inspect the current state.

---

# Create a Container

Create without starting

```bash
docker create nginx
```

A container is created but remains stopped.

---

# Run a Container

Create and start

```bash
docker run nginx
```

This performs

- Create
- Start
- Execute application

in a single command.

---

# Run in Detached Mode

Run in the background

```bash
docker run -d nginx
```

The terminal remains available while the container continues running.

---

# Name a Container

Assign a meaningful name

```bash
docker run --name frontend nginx
```

Named containers are easier to manage than using randomly generated names.

---

# List Containers

Running containers

```bash
docker ps
```

All containers

```bash
docker ps -a
```

Example

```text
CONTAINER ID

NAME

STATUS
```

---

# Start a Container

```bash
docker start frontend
```

---

# Stop a Container

```bash
docker stop frontend
```

Docker gracefully stops the running process.

---

# Restart a Container

```bash
docker restart frontend
```

Useful after configuration changes.

---

# Pause a Container

Temporarily suspend execution

```bash
docker pause frontend
```

Resume

```bash
docker unpause frontend
```

---

# Remove a Container

Delete a stopped container

```bash
docker rm frontend
```

Force removal

```bash
docker rm -f frontend
```

---

# Inspect a Container

Display detailed information

```bash
docker inspect frontend
```

Information includes

- Network
- Mounts
- Environment Variables
- IP Address
- Labels
- State

---

# View Container Logs

Display application logs

```bash
docker logs frontend
```

Follow logs

```bash
docker logs -f frontend
```

Logs are essential during troubleshooting.

---

# Execute Commands Inside a Container

Open a shell

```bash
docker exec -it frontend /bin/bash
```

For Alpine images

```bash
docker exec -it frontend /bin/sh
```

Useful for debugging.

---

# Container Resource Isolation

Docker isolates

- Processes
- Networking
- Filesystems
- CPU
- Memory
- Users

This isolation allows multiple applications to run safely on the same host.

---

# Containers in Our Project

Frontend

```text
frontend-image

↓

frontend-container
```

API Gateway

```text
api-gateway-image

↓

api-gateway-container
```

Auth Service

```text
auth-service-image

↓

auth-service-container
```

Dashboard Service

```text
dashboard-service-image

↓

dashboard-service-container
```

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

Build Image

↓

Push Registry

↓

Pull Image

↓

Run Container

↓

Health Check

↓

Production

Containers are the runtime workloads deployed into every environment.

---

# Internal Workflow

Developer executes

```bash
docker run frontend:v1
```

Docker

↓

Checks image

↓

Creates container

↓

Allocates network

↓

Allocates filesystem

↓

Starts application

↓

Container enters Running state

---

# Daily DevOps Activities

DevOps Engineers regularly

- Start containers
- Stop containers
- Restart containers
- View logs
- Inspect containers
- Execute debugging commands
- Remove failed containers
- Monitor container health

Container management is a daily operational task.

---

# Production Best Practices

- Use meaningful container names.
- Run one primary process per container.
- Keep containers stateless.
- Use health checks.
- Store persistent data in volumes.
- Replace containers instead of modifying them.
- Monitor container resource usage.

---

# Security Considerations

- Run containers as non-root users.
- Avoid privileged containers.
- Limit CPU and memory usage.
- Restrict Linux capabilities.
- Mount filesystems as read-only where possible.
- Remove unnecessary packages from images.

Containers should follow the principle of least privilege.

---

# Troubleshooting

List running containers

```bash
docker ps
```

List all containers

```bash
docker ps -a
```

View logs

```bash
docker logs frontend
```

Inspect container

```bash
docker inspect frontend
```

Execute shell

```bash
docker exec -it frontend /bin/bash
```

Restart container

```bash
docker restart frontend
```

Remove stopped containers

```bash
docker container prune
```

---

# Real Production Scenario

Scenario

A production API suddenly stops responding.

Investigation

```bash
docker ps
```

The container is no longer running.

Logs reveal

```text
Application crashed because of invalid configuration.
```

Resolution

- Fix configuration
- Build a new image
- Deploy a new container

The existing failed container is replaced instead of repaired.

---

# Scenario-Based Interview Questions

## Question 1

What is a Docker Container?

Answer

A Docker Container is a running instance of a Docker Image that executes an application in an isolated environment.

---

## Question 2

Can multiple containers run from the same image?

Answer

Yes.

One Docker Image can create multiple independent containers.

---

## Question 3

What happens when a container is removed?

Answer

Only the container is deleted.

The Docker Image remains available unless explicitly removed.

---

# Architecture-Level Interview Questions

## Question

Why are Docker Containers lightweight?

Answer

Containers share the host operating system kernel instead of running separate guest operating systems like virtual machines.

---

## Question

Why are containers considered ephemeral?

Answer

Containers are designed to be easily created, replaced, and removed rather than manually maintained.

---

## Question

Why should containers remain stateless?

Answer

Stateless containers simplify scaling, replacement, recovery, and orchestration.

Persistent data should be stored in external volumes or databases.

---

# Production Support Questions

Q.

A container keeps restarting continuously.

What do you investigate?

Answer

Check

- Container logs
- Application configuration
- Environment variables
- Resource limits
- Startup command
- Health checks

---

Q.

The application works locally but not inside the container.

Possible causes?

Answer

Investigate

- Missing environment variables
- Incorrect ports
- Dependency issues
- Network configuration
- Image version mismatch

---

# Related Runbooks

Future runbooks

- Start Docker Container
- Stop Docker Container
- Restart Docker Container
- Debug Docker Container
- Collect Container Logs

---

# Common Incidents

- Container crash
- CrashLoop behavior
- Incorrect startup command
- Missing environment variables
- Port conflicts
- Resource exhaustion
- Container removed accidentally

---

# Commands

Run container

```bash
docker run nginx
```

Run in background

```bash
docker run -d nginx
```

List containers

```bash
docker ps
```

List all

```bash
docker ps -a
```

Start

```bash
docker start frontend
```

Stop

```bash
docker stop frontend
```

Restart

```bash
docker restart frontend
```

Logs

```bash
docker logs frontend
```

Inspect

```bash
docker inspect frontend
```

Execute shell

```bash
docker exec -it frontend /bin/bash
```

Remove

```bash
docker rm frontend
```

---

# Key Takeaways

Docker Containers are isolated runtime environments created from Docker Images.

They execute applications consistently across development, testing, and production environments.

For our Enterprise DevOps Platform, every microservice will execute inside its own container, later managed by Docker Compose, Kubernetes, Helm, and Argo CD.

---

# Marathi Quick Revision

Container म्हणजे

- Running Application
- Image ची instance
- Lightweight
- Isolated
- Temporary

Flow

Image

↓

Run

↓

Container

↓

Application

Container delete झाला तरी Image राहते.

---

# Marathi Interview Memory Tip

Interview मध्ये जर विचारलं:

"Docker Container म्हणजे काय?"

असं सांगा:

"Docker Container ही Docker Image ची running instance असते. ती isolated environment मध्ये application execute करते. एका image पासून अनेक containers तयार होऊ शकतात. Production मध्ये containers replace केले जातात, manually modify केले जात नाहीत."

