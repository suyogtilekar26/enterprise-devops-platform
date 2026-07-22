# Docker Compose Services

## Purpose

This document explains the **services** section of a Docker Compose file from an Enterprise DevOps perspective.

Services are the core building blocks of a Docker Compose application. Each service represents one containerized application or component.

For our Enterprise DevOps Platform, each microservice will be defined as an independent Compose service.

---

# Introduction

A Docker Compose application consists of one or more services.

Each service can represent

- Frontend
- API Gateway
- Auth Service
- Dashboard Service
- Database
- Cache
- Message Queue

Every service runs inside its own Docker container.

---

# High-Level Architecture

```text
docker-compose.yml

↓

services

↓

Frontend

↓

API Gateway

↓

Auth Service

↓

Dashboard Service

↓

Docker Network
```

---

# Why Services Matter

Benefits

- Logical separation
- Independent configuration
- Easy scaling
- Better maintenance
- Simplified deployments
- Consistent environments

---

# Services Section

Example

```yaml
services:
  frontend:
  api-gateway:
  auth-service:
  dashboard-service:
```

Each service becomes a Docker container.

---

# Service Name

Example

```yaml
services:
  frontend:
```

The service name

- Identifies the container
- Acts as the DNS hostname
- Is used for inter-service communication

---

# Service Components

A service may define

- image
- build
- container_name
- ports
- environment
- volumes
- networks
- restart
- depends_on
- healthcheck

---

# Image

Example

```yaml
image: nginx:latest
```

Uses an existing image from a registry.

---

# Build

Example

```yaml
build: ./frontend
```

Builds an image from the specified directory.

---

# Container Name

Example

```yaml
container_name: frontend
```

Assigns a fixed container name.

In enterprise environments, allowing Compose to generate names is often preferred to avoid conflicts.

---

# Ports

Example

```yaml
ports:
  - "5173:5173"
```

Maps

```text
Host Port

↓

Container Port
```

---

# Environment Variables

Example

```yaml
environment:
  APP_ENV: development
```

Used for runtime configuration.

---

# Volumes

Example

```yaml
volumes:
  - ./logs:/logs
```

Provides persistent storage.

---

# Networks

Example

```yaml
networks:
  - backend
```

Allows communication with other services.

---

# Restart Policy

Example

```yaml
restart: unless-stopped
```

Controls container restart behavior.

---

# Depends On

Example

```yaml
depends_on:
  - auth-service
```

Specifies startup dependencies.

Note

`depends_on` controls startup order but does not guarantee application readiness.

---

# Health Check

Example

```yaml
healthcheck:
```

Allows Docker to monitor service health.

---

# Compose Service Workflow

```text
Compose File

↓

Read Service

↓

Create Container

↓

Attach Network

↓

Attach Volume

↓

Start Application
```

---

# Services in Our Project

Our Compose file will define

```text
frontend

↓

api-gateway

↓

auth-service

↓

dashboard-service
```

All services communicate over an internal Docker network.

---

# Enterprise Workflow

Developer

↓

docker compose up

↓

Compose Reads Services

↓

Images Built

↓

Containers Created

↓

Application Running

---

# Internal Workflow

Service Definition

↓

Docker API

↓

Docker Engine

↓

Container

↓

Running Service

---

# Daily DevOps Activities

DevOps Engineers

- Add new services
- Update service configuration
- Modify environment variables
- Configure networking
- Review restart policies
- Maintain Compose files

---

# Production Best Practices

- Use meaningful service names.
- Keep services independent.
- Minimize exposed ports.
- Use health checks.
- Avoid unnecessary privileges.
- Document service responsibilities.
- Keep configuration consistent with Kubernetes.

---

# Security Considerations

- Avoid privileged containers.
- Restrict exposed ports.
- Do not hardcode secrets.
- Use trusted images.
- Run applications as non-root users.

---

# Troubleshooting

Validate configuration

```bash
docker compose config
```

Start services

```bash
docker compose up
```

View running services

```bash
docker compose ps
```

View logs

```bash
docker compose logs
```

Inspect containers

```bash
docker inspect <container>
```

---

# Real Production Scenario

Scenario

The Frontend cannot communicate with the API Gateway.

Investigation

- Verify service names.
- Check network configuration.
- Confirm containers are running.
- Review Compose configuration.

Resolution

- Correct service configuration.
- Restart Compose.
- Verify connectivity.

Result

Frontend communicates successfully with backend services.

---

# Scenario-Based Interview Questions

## Question 1

What is a service in Docker Compose?

Answer

A service is a container definition that specifies how an application component should be built, configured, and executed.

---

## Question 2

Can multiple services communicate automatically?

Answer

Yes. Services connected to the same Compose network can communicate using their service names.

---

## Question 3

What is the purpose of `depends_on`?

Answer

It controls container startup order but does not verify application readiness.

---

# Architecture Interview Questions

## Question

Why define each application component as a separate service?

Answer

Independent services simplify scaling, maintenance, troubleshooting, and future migration to Kubernetes.

---

# Production Support Interview Questions

## Question

One service cannot communicate with another.

What should you investigate?

Answer

Review

- Service names
- Network configuration
- Container status
- Port mappings
- Logs
- DNS resolution

---

# Related Runbooks

Future runbooks

- Configure Docker Compose Services
- Troubleshoot Service Communication
- Add New Compose Service

---

# Common Incidents

- Service startup failure
- Incorrect service name
- Missing dependency
- Network connectivity issue
- Restart loop
- Invalid configuration

---

# Commands

Validate configuration

```bash
docker compose config
```

Start services

```bash
docker compose up
```

List services

```bash
docker compose ps
```

View logs

```bash
docker compose logs
```

Inspect container

```bash
docker inspect <container>
```

---

# Marathi Quick Revision

Docker Compose Services

- प्रत्येक service = एक container
- Service name = DNS name
- image
- build
- ports
- environment
- volumes
- networks
- depends_on
- restart
- healthcheck

---

# Marathi Interview Memory Tip

Interview मध्ये जर विचारलं:

"Docker Compose मध्ये Service म्हणजे काय?"

असं सांगा:

"Compose मधील प्रत्येक Service हा एका containerized application component चे definition असते. प्रत्येक service साठी image, build, ports, environment variables, networks, volumes आणि restart policy define करता येते. Compose त्या definitions वापरून सर्व containers automate करून चालवते."

---

# Key Takeaways

The `services` section is the heart of a Docker Compose application. Each service represents a single application component with its own configuration. For our Enterprise DevOps Platform, the Frontend, API Gateway, Auth Service, and Dashboard Service will each be defined as separate services, closely mirroring the architecture that will later be deployed to Kubernetes.

