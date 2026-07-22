# Lab 02 - Understanding Docker Architecture

# Objective

Understand the core Docker architecture by exploring the Docker Engine, Docker Client, Images, Containers, Registries, and Networks.

This lab builds the foundation required before containerizing the Enterprise DevOps Platform.

---

# Enterprise Scenario

The Enterprise DevOps Platform contains four applications.

```
Frontend

API Gateway

Auth Service

Dashboard Service
```

Before creating Dockerfiles for these services, every DevOps Engineer must understand how Docker works internally.

---

# Architecture

```
              Docker Client

                    │

          docker build / run

                    │

                    ▼

             Docker Daemon

      ┌──────────┼──────────┐

      │          │          │

   Images    Containers   Networks

      │

      ▼

 Docker Registry (GHCR)
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

Verify Docker service.

```bash
systemctl status docker
```

Expected

```
active (running)
```

---

# Step 2

Display Docker information.

```bash
docker info
```

Observe

- Storage Driver
- Cgroup Driver
- Logging Driver
- Docker Root Directory
- Number of Images
- Number of Containers

---

# Step 3

Check Docker version.

```bash
docker version
```

Notice

Client

Server

API Version

---

# Step 4

List Docker images.

```bash
docker images
```

Initially you may only see

```
hello-world
```

or no images.

---

# Step 5

List running containers.

```bash
docker ps
```

Expected

```
No running containers
```

---

# Step 6

List all containers.

```bash
docker ps -a
```

Observe exited containers.

---

# Step 7

Download Ubuntu image.

```bash
docker pull ubuntu
```

---

# Step 8

Verify downloaded image.

```bash
docker images
```

Expected

```
ubuntu
```

---

# Step 9

Run Ubuntu container.

```bash
docker run ubuntu echo "Docker Working"
```

Expected

```
Docker Working
```

---

# Step 10

Start interactive container.

```bash
docker run -it ubuntu bash
```

Inside container

```bash
hostname

pwd

ls
```

Exit

```bash
exit
```

---

# Step 11

Observe container state.

```bash
docker ps -a
```

Notice

```
Exited
```

---

# Step 12

Inspect container.

Find Container ID.

```bash
docker ps -a
```

Inspect

```bash
docker inspect <container-id>
```

Observe

- Image
- Network
- Mounts
- Environment
- State

---

# Step 13

Inspect image.

```bash
docker inspect ubuntu
```

Observe

- Layers
- Architecture
- Operating System

---

# Step 14

View Docker networks.

```bash
docker network ls
```

Expected

```
bridge

host

none
```

---

# Step 15

View Docker volumes.

```bash
docker volume ls
```

---

# Step 16

View Docker system usage.

```bash
docker system df
```

Observe

- Images
- Containers
- Volumes
- Build Cache

---

# Docker Components

## Docker Client

Runs commands like

```bash
docker run

docker build

docker pull
```

---

## Docker Daemon

Responsible for

- Building images
- Creating containers
- Managing networks
- Managing volumes

---

## Docker Image

Read-only template used to create containers.

Example

```
ubuntu

nginx

python
```

---

## Docker Container

Running instance of an image.

Example

```
ubuntu container
```

---

## Docker Registry

Stores Docker images.

Examples

- Docker Hub
- GitHub Container Registry
- Amazon ECR

Our project will use

```
GitHub Container Registry
```

---

# Enterprise Usage

Future project flow

```
Frontend Source

↓

Docker Build

↓

Frontend Image

↓

GHCR

↓

Kind Kubernetes

↓

Frontend Pod
```

Same flow applies for

- API Gateway
- Auth Service
- Dashboard Service

---

# Validation Checklist

Verify

- Docker daemon running
- Images listed
- Container created
- Container inspected
- Networks displayed
- Volumes displayed
- Docker architecture understood

---

# Common Errors

## Docker Daemon Not Running

```bash
sudo systemctl start docker
```

---

## Cannot Connect to Docker

Verify

```bash
docker version
```

---

## Image Pull Failed

Verify Internet connectivity.

Retry

```bash
docker pull ubuntu
```

---

# Troubleshooting Commands

Docker Info

```bash
docker info
```

Images

```bash
docker images
```

Containers

```bash
docker ps -a
```

Networks

```bash
docker network ls
```

Volumes

```bash
docker volume ls
```

Inspect

```bash
docker inspect <container-id>
```

---

# Best Practices

- Understand images before creating Dockerfiles
- Keep containers stateless
- Inspect resources before troubleshooting
- Use official base images
- Remove unused resources periodically

---

# Expected Result

You should successfully

- Understand Docker architecture
- Explore Docker components
- Run containers
- Inspect Docker resources
- Prepare for Dockerfile creation in upcoming labs

