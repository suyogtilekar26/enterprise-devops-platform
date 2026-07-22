# Docker Compose Common Errors

## Purpose

This document explains the most common Docker Compose errors encountered in Enterprise DevOps environments, their root causes, troubleshooting process, and resolution.

Understanding these common failures enables DevOps Engineers to quickly diagnose issues during development, CI/CD, testing, and production support.

For our Enterprise DevOps Platform, these scenarios are based on the Frontend, API Gateway, Auth Service, and Dashboard Service architecture.

---

# Introduction

Even a correctly designed Docker Compose application can fail due to

- Configuration mistakes
- Network issues
- Image problems
- Missing environment variables
- Port conflicts
- Volume issues
- Startup ordering
- Health check failures

A systematic troubleshooting approach is essential.

---

# Enterprise Troubleshooting Workflow

```text
Issue Report

↓

Identify Error

↓

Collect Logs

↓

Inspect Container

↓

Verify Configuration

↓

Identify Root Cause

↓

Apply Fix

↓

Validate

↓

Document
```

---

# Error 1 — Port Already Allocated

Example

```text
Bind for 0.0.0.0:8080 failed:
port is already allocated
```

Cause

Another process or container is already using the host port.

Investigation

```bash
docker ps
```

```bash
docker compose ps
```

```bash
lsof -i :8080
```

Resolution

- Stop conflicting process
- Stop conflicting container
- Change host port

Example

```yaml
ports:
  - "8081:8080"
```

---

# Error 2 — Image Not Found

Example

```text
pull access denied
```

Cause

- Wrong image name
- Wrong tag
- Registry authentication issue
- Image does not exist

Investigation

```bash
docker images
```

Resolution

- Verify image
- Login to registry
- Build image
- Update tag

---

# Error 3 — Build Failed

Example

```text
failed to solve
```

Cause

- Dockerfile syntax
- Missing files
- Wrong build context
- Dependency failure

Investigation

```bash
docker compose build
```

Resolution

- Verify Dockerfile
- Verify build context
- Rebuild image

---

# Error 4 — Container Exits Immediately

Example

```text
Exited (1)
```

Cause

- Application crash
- Missing dependency
- Invalid configuration
- Missing environment variable

Investigation

```bash
docker compose logs
```

Resolution

Fix application startup issue.

---

# Error 5 — Service Cannot Reach Another Service

Example

```text
Connection Refused
```

Cause

- Wrong service name
- Wrong port
- Different network
- Service not running

Investigation

```bash
docker network inspect
```

```bash
docker exec -it api-gateway sh
```

```bash
curl http://auth-service:5000/health
```

Resolution

- Verify service name
- Verify ports
- Verify network

---

# Error 6 — Health Check Failed

Example

```text
unhealthy
```

Cause

- Wrong endpoint
- Slow startup
- Application failure
- Wrong health check command

Investigation

```bash
docker inspect <container>
```

Resolution

- Fix application
- Correct endpoint
- Increase start_period

---

# Error 7 — Missing Environment Variables

Example

```text
KeyError

JWT_SECRET not found
```

Cause

- Missing .env
- Missing env_file
- Wrong variable name

Investigation

```bash
docker compose config
```

```bash
docker exec <container> env
```

Resolution

Add required variables.

---

# Error 8 — Volume Mount Failure

Example

```text
Permission denied
```

Cause

- Wrong mount path
- Host permissions
- Incorrect ownership

Investigation

```bash
docker volume ls
```

```bash
docker inspect <container>
```

Resolution

Correct permissions and mount paths.

---

# Error 9 — YAML Parsing Error

Example

```text
mapping values are not allowed
```

Cause

- Invalid indentation
- Missing colon
- Invalid YAML syntax

Investigation

```bash
docker compose config
```

Resolution

Fix YAML formatting.

---

# Error 10 — Restart Loop

Example

```text
Restarting (1)
```

Cause

- Startup failure
- Health check failure
- Invalid configuration

Investigation

```bash
docker compose logs
```

Resolution

Fix application startup before restarting.

---

# Common Debugging Commands

Validate Compose

```bash
docker compose config
```

View logs

```bash
docker compose logs
```

Follow logs

```bash
docker compose logs -f
```

Inspect

```bash
docker inspect <container>
```

Container shell

```bash
docker exec -it <container> sh
```

List containers

```bash
docker ps
```

List networks

```bash
docker network ls
```

List volumes

```bash
docker volume ls
```

---

# Daily DevOps Activities

DevOps Engineers

- Review logs
- Resolve startup failures
- Verify networking
- Validate images
- Maintain Compose files
- Assist developers

---

# Production Best Practices

- Validate Compose before deployment.
- Version Docker images.
- Monitor health checks.
- Keep logs centralized.
- Use structured troubleshooting.
- Document recurring issues.

---

# Security Considerations

- Never expose secrets in logs.
- Restrict debug access.
- Scan images regularly.
- Protect registry credentials.
- Remove unused containers and volumes.

---

# Real Production Scenario

Scenario

Developers report that the application starts successfully, but login fails.

Investigation

- Frontend healthy
- API Gateway healthy
- Auth Service unhealthy

Logs reveal

```text
JWT_SECRET missing
```

Resolution

- Add missing environment variable
- Restart Auth Service

Result

Authentication restored.

---

# Scenario-Based Interview Questions

## Question 1

What is your first troubleshooting step when Docker Compose fails?

Answer

Run

```bash
docker compose ps
```

to verify the status of all services.

---

## Question 2

How do you identify why a container exited?

Answer

Review

```bash
docker compose logs
```

and inspect the container configuration.

---

## Question 3

Why should you use `docker compose config`?

Answer

It validates the Compose configuration, resolves variables, and detects YAML errors before deployment.

---

# Architecture Interview Questions

## Question

Why are service names preferred over IP addresses?

Answer

Docker Compose provides automatic DNS resolution. Service names remain stable even when container IP addresses change.

---

# Production Support Interview Questions

## Question

Users receive HTTP 502 after deployment.

What do you investigate?

Answer

Review

- Container status
- Logs
- Health checks
- API connectivity
- Environment variables
- Reverse proxy configuration

---

# Related Runbooks

Future runbooks

- Resolve Port Conflicts
- Troubleshoot Startup Failures
- Recover Unhealthy Containers
- Diagnose Docker Networking

---

# Common Incidents

- Port conflicts
- Image pull failures
- Startup crashes
- Health check failures
- Missing environment variables
- Network communication failures
- Volume permission issues
- YAML syntax errors

---

# Marathi Quick Revision

Common Errors

- Port conflict
- Build failed
- Image not found
- Connection refused
- Health check failed
- Restart loop
- Missing environment variables
- YAML errors

---

# Marathi Interview Memory Tip

Interview मध्ये विचारलं:

"Docker Compose troubleshoot कसे करता?"

असं सांगा:

"मी प्रथम `docker compose ps` वापरून container status तपासतो. त्यानंतर `docker compose logs`, `docker inspect`, `docker compose config`, networking, environment variables आणि health checks तपासून root cause शोधतो."

---

# Key Takeaways

Most Docker Compose issues fall into a small set of categories: configuration, networking, images, ports, environment variables, volumes, and application startup. A structured troubleshooting methodology—combined with logs, inspection commands, and configuration validation—allows DevOps Engineers to resolve incidents quickly and consistently in enterprise environments.

