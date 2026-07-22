# Docker Images vs Containers

## Purpose

This document explains the difference between Docker Images and Docker Containers from an Enterprise DevOps perspective.

This is one of the most frequently asked Docker interview topics and one of the most important concepts to understand before working with Dockerfiles, Docker Compose, Kubernetes, and CI/CD.

For our Enterprise DevOps Platform, every service will first become a Docker Image and then run as one or more Docker Containers.

---

# Introduction

Many beginners confuse Docker Images with Docker Containers.

Remember

> Image = Blueprint

> Container = Running Application

A Docker Image is a template.

A Docker Container is a running instance created from that template.

---

# What is a Docker Image?

A Docker Image is a

- Read-only template
- Immutable artifact
- Packaged application
- Versioned object

It contains

- Application code
- Runtime
- Libraries
- Dependencies
- Environment configuration
- Metadata

An image cannot execute by itself.

It must be started as a container.

---

# What is a Docker Container?

A Docker Container is

- A running process
- Created from an image
- Isolated from other applications
- Lightweight
- Temporary by default

Containers execute the application packaged inside an image.

---

# Image vs Container

| Docker Image | Docker Container |
|--------------|------------------|
| Template | Running Instance |
| Read-only | Read/Write Layer |
| Immutable | Mutable while running |
| Stored on disk | Executes in memory |
| Can create many containers | Created from one image |
| Cannot run by itself | Runs application |

---

# Simple Analogy

Blueprint

↓

House

Blueprint

↓

House

Blueprint

↓

House

One blueprint

↓

Many houses

Similarly

Docker Image

↓

Container

Docker Image

↓

Container

Docker Image

↓

Container

One image

↓

Many containers

---

# Architecture

```text
Dockerfile

↓

Docker Build

↓

Docker Image

↓

docker run

↓

Container

↓

Application Running
```

Images are produced during the build process.

Containers are created during runtime.

---

# Image Lifecycle

```text
Dockerfile

↓

Build

↓

Image

↓

Store in Registry

↓

Pull

↓

Run Container
```

Images move between environments.

Containers execute workloads.

---

# Container Lifecycle

```text
Create

↓

Start

↓

Running

↓

Stop

↓

Remove
```

Containers are temporary.

Images remain available until deleted.

---

# Image Characteristics

Images are

- Immutable
- Portable
- Versioned
- Reusable
- Shareable

Example

```text
frontend:v1.0

api-gateway:v1.0

auth-service:v1.0

dashboard-service:v1.0
```

---

# Container Characteristics

Containers are

- Running processes
- Isolated
- Lightweight
- Fast to start
- Disposable

Multiple containers may execute simultaneously from the same image.

---

# Multiple Containers from One Image

Example

```text
nginx Image

↓

Container 1

Container 2

Container 3

Container 4
```

The same image serves many workloads.

---

# Images in Our Project

Our project will create

```text
frontend-image

↓

frontend-container
```

```text
api-gateway-image

↓

api-gateway-container
```

```text
auth-service-image

↓

auth-service-container
```

```text
dashboard-service-image

↓

dashboard-service-container
```

Each service receives its own image.

---

# Enterprise Workflow

Developer

↓

Code

↓

Docker Build

↓

Docker Image

↓

Container Registry

↓

Docker Run

↓

Container

↓

Kubernetes Pod

Images become deployment artifacts.

Containers become running workloads.

---

# Internal Workflow

Developer executes

```bash
docker build
```

↓

Docker Image Created

↓

Developer executes

```bash
docker run
```

↓

Container Created

↓

Application Starts

---

# Daily DevOps Activities

DevOps Engineers regularly

- Build images
- Tag images
- Push images
- Pull images
- Start containers
- Stop containers
- Restart containers
- Remove containers

Images are managed.

Containers are operated.

---

# Production Best Practices

- Build immutable images.
- Version images correctly.
- Never modify running containers manually.
- Rebuild images instead of patching containers.
- Use containers as disposable workloads.
- Keep images small.
- Scan images for vulnerabilities.

---

# Security Considerations

Image Security

- Scan images
- Use trusted base images
- Remove unnecessary packages
- Keep dependencies updated

Container Security

- Run as non-root
- Limit capabilities
- Restrict resources
- Avoid privileged containers

Security begins during image creation.

---

# Troubleshooting

View images

```bash
docker images
```

View running containers

```bash
docker ps
```

View all containers

```bash
docker ps -a
```

Inspect image

```bash
docker image inspect <image>
```

Inspect container

```bash
docker inspect <container>
```

Remove image

```bash
docker rmi <image>
```

Remove container

```bash
docker rm <container>
```

---

# Real Production Scenario

Scenario

A new application version is released.

CI/CD builds

```text
frontend:v2.0
```

The image is pushed to the registry.

Kubernetes downloads the new image.

New containers start using

```text
frontend:v2.0
```

Old containers are removed.

The image remains stored in the registry for future deployments or rollbacks.

---

# Scenario-Based Interview Questions

## Question 1

What is the difference between a Docker Image and a Docker Container?

Answer

A Docker Image is a read-only template containing the application and its dependencies.

A Docker Container is a running instance created from that image.

---

## Question 2

Can multiple containers use the same image?

Answer

Yes.

One Docker Image can create many independent containers.

---

## Question 3

Can a container exist without an image?

Answer

No.

Every container must be created from an image.

---

# Architecture-Level Interview Questions

## Question

Why are Docker Images immutable?

Answer

Immutable images provide consistency, reproducibility, reliable deployments, and simpler rollbacks.

---

## Question

Why should production updates use new images instead of modifying running containers?

Answer

Building a new image ensures deployments remain repeatable, version-controlled, and auditable.

---

## Question

Why are containers considered ephemeral?

Answer

Containers are designed to be created, replaced, and removed easily without storing persistent application state.

---

# Production Support Questions

Q.

A container was accidentally deleted.

Has the application image been lost?

Answer

No.

If the image still exists locally or in the registry, a new container can be created immediately.

---

Q.

A running container contains manual changes.

Should it be backed up?

Answer

No.

Those changes should be added to the Dockerfile and a new immutable image should be built.

---

# Related Runbooks

Future runbooks

- Build Docker Image
- Tag Docker Image
- Push Image to Registry
- Run Docker Container
- Replace Running Container

---

# Common Incidents

- Image not found
- Container exited unexpectedly
- Wrong image version
- Image pull failure
- Container startup failure
- Manual container modifications
- Registry synchronization failure

---

# Commands

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

Inspect image

```bash
docker image inspect <image>
```

Inspect container

```bash
docker inspect <container>
```

Remove image

```bash
docker rmi <image>
```

Remove container

```bash
docker rm <container>
```

---

# Key Takeaways

Docker Images are immutable templates used to package applications.

Docker Containers are running instances created from those images.

In our Enterprise DevOps Platform

- Each microservice will have its own Docker Image.
- Docker Compose will run multiple containers together.
- Kubernetes will later orchestrate those containers.
- CI/CD pipelines will build new images for every approved release.

Understanding this distinction is fundamental to every Docker and Kubernetes workflow.

---

# Marathi Quick Revision

Image म्हणजे

- Template
- Immutable
- Read-only

Container म्हणजे

- Running Application
- Image ची instance
- Temporary workload

एक Image पासून अनेक Containers तयार होऊ शकतात.

---

# Marathi Interview Memory Tip

Interview मध्ये जर विचारलं:

"Image आणि Container मध्ये काय फरक आहे?"

असं सांगा:

"Docker Image ही application, libraries आणि dependencies असलेली immutable template असते. Docker Container ही त्या image ची running instance असते. एका image पासून अनेक containers तयार होऊ शकतात. Image build केली जाते, तर container run केला जातो."

