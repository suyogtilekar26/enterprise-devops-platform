# Docker Compose depends_on

## Purpose

This document explains the `depends_on` directive in Docker Compose from an Enterprise DevOps perspective.

The `depends_on` directive controls the startup and shutdown order of services within a Docker Compose application. It helps ensure that dependent services are started before the services that rely on them.

For our Enterprise DevOps Platform, the Frontend depends on the API Gateway, and the API Gateway depends on the Auth Service and Dashboard Service. Understanding `depends_on` is essential for building reliable local development environments.

---

# Introduction

In a microservices architecture, services often rely on other services.

Example

```text
Frontend

↓

API Gateway

↓

Auth Service
```

If the API Gateway starts after the Frontend, the Frontend may fail during startup.

Docker Compose solves startup ordering using `depends_on`.

---

# High-Level Architecture

```text
Frontend

↓

API Gateway

↓

Auth Service

↓

Dashboard Service
```

Compose starts services in dependency order.

---

# Why depends_on Matters

Benefits

- Predictable startup order
- Easier local development
- Simplified service orchestration
- Reduced startup errors
- Better developer experience

---

# Basic Syntax

Example

```yaml
services:

  frontend:
    depends_on:
      - api-gateway

  api-gateway:
    depends_on:
      - auth-service
      - dashboard-service
```

---

# Startup Workflow

```text
docker compose up

↓

Auth Service

↓

Dashboard Service

↓

API Gateway

↓

Frontend
```

---

# Shutdown Workflow

Docker Compose stops services in reverse order.

```text
Frontend

↓

API Gateway

↓

Dashboard Service

↓

Auth Service
```

---

# What depends_on Does

It guarantees

- Container creation order
- Container startup order
- Container shutdown order

---

# What depends_on Does NOT Do

It does NOT guarantee

- Application readiness
- Health status
- Database availability
- API readiness

A container may be running while the application inside it is still starting.

---

# Example Problem

```text
API Gateway

↓

Starting...

↓

Frontend Starts

↓

Connection Refused
```

Even though the API Gateway container exists, the application inside may not yet be ready.

---

# Health Checks with depends_on

Modern Compose supports dependency conditions.

Example

```yaml
depends_on:
  api-gateway:
    condition: service_healthy
```

Compose waits until the service passes its health check before starting dependent services.

---

# Health Check Workflow

```text
Container Starts

↓

Health Check

↓

Healthy

↓

Dependent Service Starts
```

---

# depends_on in Our Project

```text
Frontend

↓

API Gateway

↓

Auth Service

Dashboard Service
```

The dependency hierarchy is

```text
Frontend

↓

API Gateway

↓

Auth Service
Dashboard Service
```

---

# Example Compose Structure

```yaml
services:

  frontend:
    depends_on:
      - api-gateway

  api-gateway:
    depends_on:
      - auth-service
      - dashboard-service
```

---

# Enterprise Workflow

Developer

↓

docker compose up

↓

Dependencies Created

↓

Containers Started

↓

Application Ready

---

# Internal Workflow

Compose File

↓

Read Dependencies

↓

Determine Startup Order

↓

Create Containers

↓

Start Services

---

# Daily DevOps Activities

DevOps Engineers

- Define service dependencies
- Troubleshoot startup failures
- Configure health checks
- Validate application startup
- Review service relationships

---

# Production Considerations

Docker Compose is mainly used for development.

Production orchestrators such as Kubernetes handle dependency management differently using

- Readiness Probes
- Liveness Probes
- Startup Probes

Applications should also implement retry logic instead of relying solely on startup order.

---

# Production Best Practices

- Use `depends_on` for development.
- Combine with health checks.
- Implement application retry mechanisms.
- Avoid unnecessary dependencies.
- Design loosely coupled services.
- Document service relationships.

---

# Security Considerations

- Do not expose unnecessary services.
- Restrict service communication.
- Use internal networks.
- Validate service availability securely.
- Protect health endpoints if required.

---

# Troubleshooting

Start services

```bash
docker compose up
```

View logs

```bash
docker compose logs
```

Check running containers

```bash
docker compose ps
```

Inspect health

```bash
docker inspect <container>
```

---

# Common Startup Issues

## Service Starts Too Early

Cause

Application inside dependency is still initializing.

Resolution

Use health checks and retry logic.

---

## Dependency Failure

Cause

Required service failed to start.

Resolution

Review logs and resolve the root cause before restarting dependent services.

---

## Circular Dependency

Example

```text
A

↓

B

↓

A
```

Compose cannot resolve circular dependencies.

---

# Real Production Scenario

Scenario

The Frontend reports

```text
Unable to connect to API
```

Investigation

The API Gateway container is running but still loading configuration.

The Frontend started immediately after the container was created.

Resolution

- Add health checks.
- Configure `depends_on` with `service_healthy`.
- Add retry logic in the Frontend.

Result

Reliable application startup.

---

# Scenario-Based Interview Questions

## Question 1

What is the purpose of `depends_on`?

Answer

It controls the startup and shutdown order of services in Docker Compose.

---

## Question 2

Does `depends_on` guarantee application readiness?

Answer

No.

It guarantees container startup order, not that the application inside the container is ready to accept requests.

---

## Question 3

How can you ensure a dependent service starts only after another service is ready?

Answer

Use health checks together with `depends_on` conditions and implement application retry logic.

---

# Architecture Interview Questions

## Question

Why shouldn't production applications rely only on startup ordering?

Answer

Distributed systems experience delays and failures. Applications should tolerate temporary unavailability through retries and health-based orchestration rather than assuming dependencies are immediately available.

---

# Production Support Interview Questions

## Question

A service repeatedly fails during startup because another service is still initializing.

What should you investigate?

Answer

Review

- Service dependencies
- Health checks
- Container logs
- Application retry logic
- Startup timing
- Compose configuration

---

# Related Runbooks

Future runbooks

- Configure Service Dependencies
- Implement Docker Health Checks
- Troubleshoot Service Startup Failures

---

# Common Incidents

- Dependency startup failure
- Missing health check
- Circular dependency
- Service not ready
- Connection refused
- Startup timeout

---

# Commands

Start services

```bash
docker compose up
```

View logs

```bash
docker compose logs
```

List services

```bash
docker compose ps
```

Inspect container

```bash
docker inspect <container>
```

---

# Marathi Quick Revision

Docker Compose depends_on

- Startup order
- Shutdown order
- Dependency management
- Does NOT guarantee application readiness
- Health checks improve reliability
- Retry logic is still required

---

# Marathi Interview Memory Tip

Interview मध्ये जर विचारलं:

"`depends_on` म्हणजे काय?"

असं सांगा:

"`depends_on` Docker Compose मध्ये services कोणत्या क्रमाने start आणि stop होतील हे ठरवते. पण ते application ready आहे याची हमी देत नाही. म्हणून production मध्ये health checks आणि application retry logic सोबत वापरणे ही सर्वोत्तम पद्धत आहे."

---

# Key Takeaways

The `depends_on` directive provides predictable service startup and shutdown ordering in Docker Compose but does not guarantee that applications are ready to serve requests. For reliable environments, combine `depends_on` with health checks and resilient application retry logic. In our Enterprise DevOps Platform, it ensures the Frontend starts after the API Gateway, which in turn starts after the Auth Service and Dashboard Service.

