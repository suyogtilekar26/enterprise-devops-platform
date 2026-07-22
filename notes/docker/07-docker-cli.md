# Docker CLI (Command Line Interface)

## Purpose

This document explains the Docker Command Line Interface (CLI), which is the primary tool used by developers and DevOps engineers to interact with Docker.

In our Enterprise DevOps Platform, every Docker operation—from building images to managing containers—will be performed using the Docker CLI.

---

# Introduction

Docker CLI (Command Line Interface) is the user-facing component of Docker.

Whenever you execute a Docker command, the CLI sends a request to the Docker Daemon through the Docker API.

The CLI itself does not build images or run containers.

Instead, it acts as the communication interface between the user and Docker Engine.

---

# Docker CLI Architecture

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
```

Every Docker command follows this flow.

---

# Verify Docker CLI

Check Docker version

```bash
docker --version
```

Example output

```text
Docker version 28.x.x
```

Display Docker system information

```bash
docker info
```

---

# Docker CLI Help

Show general help

```bash
docker --help
```

Show help for a specific command

```bash
docker run --help
```

```bash
docker build --help
```

```bash
docker image --help
```

The help system is useful during troubleshooting and interviews.

---

# Docker CLI Command Categories

Docker commands are grouped into categories.

Major categories include

- Container Commands
- Image Commands
- Network Commands
- Volume Commands
- Build Commands
- System Commands
- Registry Commands
- Compose Commands

---

# Container Commands

List running containers

```bash
docker ps
```

List all containers

```bash
docker ps -a
```

Run a container

```bash
docker run nginx
```

Stop a container

```bash
docker stop <container>
```

Start a container

```bash
docker start <container>
```

Restart a container

```bash
docker restart <container>
```

Remove a container

```bash
docker rm <container>
```

---

# Image Commands

List images

```bash
docker images
```

Build image

```bash
docker build -t app:v1 .
```

Remove image

```bash
docker rmi app:v1
```

Inspect image

```bash
docker image inspect app:v1
```

Pull image

```bash
docker pull nginx
```

Push image

```bash
docker push myrepo/app:v1
```

---

# Network Commands

List networks

```bash
docker network ls
```

Create network

```bash
docker network create app-network
```

Inspect network

```bash
docker network inspect app-network
```

Remove network

```bash
docker network rm app-network
```

---

# Volume Commands

List volumes

```bash
docker volume ls
```

Create volume

```bash
docker volume create app-data
```

Inspect volume

```bash
docker volume inspect app-data
```

Remove volume

```bash
docker volume rm app-data
```

---

# System Commands

Display Docker information

```bash
docker info
```

View disk usage

```bash
docker system df
```

Remove unused resources

```bash
docker system prune
```

Remove everything unused

```bash
docker system prune -a
```

---

# Build Commands

Build image

```bash
docker build .
```

Build with tag

```bash
docker build -t frontend:v1 .
```

Build without cache

```bash
docker build --no-cache .
```

---

# Registry Commands

Login

```bash
docker login
```

Logout

```bash
docker logout
```

Push image

```bash
docker push image-name
```

Pull image

```bash
docker pull image-name
```

---

# Docker CLI in Our Project

We will use Docker CLI to

```text
Build Frontend Image

↓

Build API Gateway Image

↓

Build Auth Service Image

↓

Build Dashboard Image

↓

Run Containers

↓

Docker Compose

↓

Kind Kubernetes

↓

Helm

↓

Argo CD
```

Nearly every implementation step begins with Docker CLI commands.

---

# Enterprise Workflow

Developer

↓

Docker CLI

↓

Docker Daemon

↓

Build Image

↓

Push Registry

↓

CI/CD

↓

Deploy Kubernetes

Docker CLI initiates every stage.

---

# Internal Workflow

Example

Developer executes

```bash
docker build -t frontend:v1 .
```

Docker CLI

↓

Docker API

↓

Docker Daemon

↓

Image Created

↓

Image Stored

The CLI only sends the request.

The Docker Daemon performs the work.

---

# Daily DevOps Activities

DevOps Engineers use Docker CLI to

- Build images
- Run containers
- Stop containers
- View logs
- Inspect resources
- Push images
- Pull images
- Remove unused resources
- Troubleshoot deployments

The Docker CLI is used throughout the workday.

---

# Production Best Practices

- Use descriptive image tags.
- Use the latest supported Docker CLI version.
- Learn commonly used commands thoroughly.
- Verify commands before running destructive operations.
- Use automation instead of repetitive manual commands.
- Avoid using root when unnecessary.

---

# Security Considerations

- Restrict Docker daemon access.
- Avoid exposing the Docker socket.
- Protect registry credentials.
- Use least privilege.
- Review commands before deleting resources.
- Authenticate with trusted registries only.

---

# Troubleshooting

Docker command not found

```bash
docker --version
```

Daemon unavailable

```bash
docker info
```

Permission denied

```bash
groups
```

```bash
sudo usermod -aG docker $USER
```

Check Docker service

```bash
sudo systemctl status docker
```

---

# Real Production Scenario

Scenario

A CI/CD pipeline suddenly fails.

Error

```text
docker: command not found
```

Investigation

Docker CLI package was accidentally removed from the build server.

Resolution

Reinstall Docker CLI and verify

```bash
docker --version
```

Pipeline resumes successfully.

---

# Scenario-Based Interview Questions

## Question 1

What is Docker CLI?

Answer

Docker CLI is the command-line interface used to communicate with the Docker Daemon through the Docker API.

---

## Question 2

Does Docker CLI run containers?

Answer

No.

Docker CLI sends commands.

The Docker Daemon executes them.

---

## Question 3

How do you see all Docker commands?

Answer

```bash
docker --help
```

---

# Architecture-Level Interview Questions

## Question

Why is Docker CLI separated from Docker Daemon?

Answer

The separation allows users, automation tools, and remote systems to communicate with Docker through a standard API while the daemon performs privileged operations.

---

## Question

Can automation tools use Docker without the CLI?

Answer

Yes.

Automation tools communicate directly with the Docker API.

---

## Question

Why is Docker CLI important for DevOps?

Answer

It provides the standard interface for building images, managing containers, automating deployments, and troubleshooting production systems.

---

# Production Support Questions

Q.

A Docker command hangs indefinitely.

What should you investigate?

Answer

Check

- Docker Daemon
- Docker service status
- System resources
- Docker API responsiveness

---

Q.

A build server cannot execute Docker commands.

Possible causes?

Answer

Investigate

- Docker CLI installation
- Docker daemon
- User permissions
- PATH configuration
- Docker service

---

# Related Runbooks

Future runbooks

- Install Docker CLI
- Troubleshoot Docker CLI
- Restart Docker Service
- Build Docker Images
- Clean Docker Resources

---

# Common Incidents

- Docker CLI missing
- Docker daemon unavailable
- Permission denied
- Invalid command syntax
- Docker service stopped
- Docker API timeout
- Registry authentication failure

---

# Commands

Docker version

```bash
docker --version
```

Docker information

```bash
docker info
```

Help

```bash
docker --help
```

Containers

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

Build image

```bash
docker build -t app:v1 .
```

---

# Key Takeaways

Docker CLI is the primary interface used to communicate with Docker.

It sends commands to the Docker Daemon, which performs the actual work of building images, running containers, and managing Docker resources.

Every stage of our Enterprise DevOps Platform—from local development to Kubernetes deployment—will rely heavily on Docker CLI commands.

---

# Marathi Quick Revision

Docker CLI म्हणजे

- Command Line Interface
- User commands स्वीकारते
- Docker Daemon शी संवाद साधते
- स्वतः containers run करत नाही

CLI

↓

API

↓

Daemon

↓

Container

---

# Marathi Interview Memory Tip

Interview मध्ये जर विचारलं:

"Docker CLI म्हणजे काय?"

असं सांगा:

"Docker CLI म्हणजे Docker ची Command Line Interface आहे. User `docker build`, `docker run`, `docker ps` सारखे commands देतो. CLI हे commands Docker API मार्फत Docker Daemon कडे पाठवते. प्रत्यक्ष image build किंवा container run Docker Daemon करतो."

