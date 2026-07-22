# Docker Compose Real World Scenarios

## Purpose

This document covers real-world Docker Compose scenarios that DevOps Engineers commonly encounter in enterprise environments.

The scenarios presented here are inspired by production incidents, CI/CD failures, development issues, and operational challenges faced in real organizations.

For our Enterprise DevOps Platform, these scenarios apply to the Frontend, API Gateway, Auth Service, Dashboard Service, and future Kubernetes migration.

---

# Introduction

Knowing Docker Compose commands is not enough.

Enterprise DevOps Engineers are expected to

- Troubleshoot production-like issues
- Identify root causes
- Recover services quickly
- Prevent recurrence
- Explain the solution clearly

This document focuses on practical situations rather than theory.

---

# Scenario 1 — Frontend Cannot Reach API Gateway

## Problem

Frontend loads successfully.

Login API returns

```text
Failed to fetch
```

---

## Investigation

Check services

```bash
docker compose ps
```

Verify API Gateway

```bash
docker compose logs api-gateway
```

Test connectivity

```bash
docker exec -it frontend sh

curl http://api-gateway:8080/health
```

---

## Root Cause

Frontend was configured with

```text
http://localhost:8080
```

instead of

```text
http://api-gateway:8080
```

---

## Resolution

Update the application configuration to use the Docker service name.

Restart services.

---

# Scenario 2 — Auth Service Restart Loop

## Symptoms

```text
Restarting (1)
```

---

## Investigation

```bash
docker compose logs auth-service
```

Output

```text
JWT_SECRET missing
```

---

## Root Cause

Required environment variable not supplied.

---

## Resolution

Add

```text
JWT_SECRET
```

Restart the container.

---

# Scenario 3 — Health Check Failure

## Symptoms

```text
unhealthy
```

---

## Investigation

Inspect

```bash
docker inspect auth-service
```

Verify

```text
/health
```

endpoint.

---

## Root Cause

Application required 45 seconds to start.

Health check began after 10 seconds.

---

## Resolution

Increase

```yaml
start_period
```

Health checks pass successfully.

---

# Scenario 4 — Port Conflict

## Symptoms

```text
Bind for 8080 failed
```

---

## Investigation

```bash
lsof -i :8080
```

Another application occupies the port.

---

## Resolution

Stop conflicting application or modify host port.

Example

```yaml
8081:8080
```

---

# Scenario 5 — Image Pull Failure

## Symptoms

```text
pull access denied
```

---

## Investigation

Verify

- Image name
- Registry
- Authentication
- Image tag

---

## Root Cause

Incorrect image tag.

---

## Resolution

Correct the image reference.

---

# Scenario 6 — Build Failure

## Symptoms

```text
failed to solve
```

---

## Investigation

Run

```bash
docker compose build
```

---

## Root Cause

Dockerfile referenced missing application files.

---

## Resolution

Correct build context.

Rebuild images.

---

# Scenario 7 — Environment Variable Missing

## Symptoms

Application crashes.

---

## Investigation

```bash
docker exec api-gateway env
```

Variable missing.

---

## Resolution

Update

```text
.env
```

Restart containers.

---

# Scenario 8 — Docker Network Issue

## Symptoms

```text
Connection Refused
```

between services.

---

## Investigation

```bash
docker network inspect
```

One service attached to a different network.

---

## Resolution

Attach services to the same Docker Compose network.

---

# Scenario 9 — Volume Permission Error

## Symptoms

```text
Permission denied
```

---

## Investigation

Inspect

- Host directory
- Container user
- File permissions

---

## Resolution

Correct ownership and permissions.

---

# Scenario 10 — CI/CD Pipeline Failure

## Symptoms

GitHub Actions fails during integration testing.

---

## Investigation

Compose logs show

```text
API Gateway unhealthy
```

---

## Root Cause

Health endpoint path changed.

---

## Resolution

Update health check configuration.

Pipeline succeeds.

---

# Scenario 11 — Wrong Image Version

## Symptoms

New feature missing after deployment.

---

## Investigation

```bash
docker images
```

Running

```text
v1.2
```

Expected

```text
v1.3
```

---

## Resolution

Deploy correct image version.

---

# Scenario 12 — Login Failure

## Symptoms

Users cannot authenticate.

---

## Investigation

Review

- Auth logs
- JWT configuration
- Environment variables

---

## Root Cause

Incorrect JWT secret.

---

## Resolution

Update configuration and restart service.

---

# Enterprise Troubleshooting Flow

```text
User Reports Issue

↓

Check docker compose ps

↓

Check Logs

↓

Inspect Container

↓

Verify Environment

↓

Verify Network

↓

Verify Health

↓

Apply Fix

↓

Validate

↓

Document RCA
```

---

# Daily DevOps Activities

Engineers regularly

- Analyze logs
- Restart failed services
- Verify deployments
- Resolve networking issues
- Update configuration
- Improve monitoring

---

# Production Best Practices

- Never guess the root cause.
- Always collect evidence.
- Validate after every fix.
- Document recurring issues.
- Improve monitoring after incidents.
- Update runbooks.

---

# Security Considerations

- Never expose secrets during debugging.
- Restrict shell access.
- Protect production logs.
- Remove temporary debug configuration.
- Audit incident activities.

---

# Real Enterprise Lessons

Most Docker Compose issues are caused by

- Configuration mistakes
- Missing environment variables
- Networking errors
- Incorrect image versions
- Health check failures

Very few incidents are actual Docker bugs.

---

# Scenario-Based Interview Questions

## Question

Frontend works but API calls fail.

What will you investigate?

Answer

- Service names
- Docker network
- Environment variables
- API logs
- Health checks
- Port configuration

---

## Question

Container is healthy but application still fails.

Answer

Investigate

- Application logs
- Dependencies
- Database connectivity
- External APIs
- Runtime configuration

---

## Question

Compose deployment succeeds but CI fails.

Answer

Compare

- Environment variables
- Image versions
- Build context
- Pipeline configuration
- Health checks

---

# Architecture Interview Questions

## Question

Why do enterprise teams simulate production using Docker Compose?

Answer

Because Docker Compose provides a repeatable multi-container environment that closely resembles production, enabling developers and CI pipelines to detect integration issues before deployment to Kubernetes.

---

# Production Support Interview Questions

## Question

How do you approach an unknown Docker Compose issue?

Answer

Follow a structured methodology:

1. Verify container status
2. Review logs
3. Inspect configuration
4. Verify networking
5. Verify environment variables
6. Verify health
7. Identify root cause
8. Validate the fix
9. Document RCA

---

# Related Runbooks

- Recover Failed Services
- Resolve Health Check Failures
- Troubleshoot Networking
- Restore Environment Variables
- Resolve Image Issues

---

# Common Incidents

- Restart loop
- Port conflict
- Image pull failure
- Health check failure
- Missing environment variables
- Volume permissions
- Network failures
- Wrong image deployment

---

# Frequently Used Commands

```bash
docker compose ps
```

```bash
docker compose logs
```

```bash
docker compose config
```

```bash
docker inspect <container>
```

```bash
docker exec -it <container> sh
```

```bash
docker network inspect <network>
```

```bash
docker volume inspect <volume>
```

---

# Marathi Quick Revision

Real World Issues

- Port conflict
- Health check failure
- Missing variables
- Restart loop
- Network issue
- Wrong image
- Build failure
- Volume issue

---

# Marathi Interview Memory Tip

Interview मध्ये Scenario-based प्रश्न आल्यास थेट commands सांगण्याऐवजी troubleshooting flow सांगा:

**ps → logs → inspect → env → network → health → root cause → fix → validate → RCA**

हा flow सांगितल्यास interviewer ला production support experience असल्याची चांगली छाप पडते.

---

# Key Takeaways

Real-world Docker Compose troubleshooting is built on a repeatable process rather than guesswork. Most incidents involve configuration, networking, environment variables, image management, or health checks. Mastering these scenarios prepares DevOps Engineers for enterprise production support and provides a strong foundation for Kubernetes troubleshooting.

