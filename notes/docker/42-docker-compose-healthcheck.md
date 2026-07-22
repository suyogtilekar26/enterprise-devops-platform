# Docker Compose Health Check

## Purpose

This document explains Docker Compose Health Checks from an Enterprise DevOps perspective.

Health Checks allow Docker to determine whether an application running inside a container is actually healthy and ready to serve requests—not just whether the container process is running.

For our Enterprise DevOps Platform, Health Checks will ensure that the API Gateway, Auth Service, and Dashboard Service are fully operational before dependent services begin communicating with them.

---

# Introduction

Starting a container does **not** necessarily mean the application is ready.

Example

```text
Container Running

↓

Application Still Starting

↓

Database Connection Pending

↓

Application Not Ready
```

Without health checks, Docker considers this container healthy simply because it is running.

Health checks solve this problem.

---

# High-Level Architecture

```text
Container Starts

↓

Health Check Executes

↓

Healthy?

↓

YES

↓

Ready for Traffic

OR

↓

NO

↓

Keep Checking
```

---

# Why Health Checks Matter

Benefits

- Detect unhealthy containers
- Improve application reliability
- Coordinate service startup
- Support automatic recovery
- Reduce deployment failures
- Improve monitoring

---

# Health Check Workflow

```text
Container Starts

↓

Run Test Command

↓

Success?

↓

Healthy

OR

↓

Retry

↓

Eventually Healthy

OR

↓

Unhealthy
```

---

# Basic Syntax

Example

```yaml
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost:8080/health"]
```

Docker periodically runs the command.

Exit Code

```text
0

↓

Healthy
```

Non-zero Exit Code

```text
Unhealthy
```

---

# Complete Example

```yaml
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost:8080/health"]
  interval: 30s
  timeout: 10s
  retries: 3
  start_period: 20s
```

---

# Health Check Parameters

## test

Command Docker executes.

---

## interval

How often Docker runs the health check.

Example

```text
30 seconds
```

---

## timeout

Maximum time allowed for each health check.

Example

```text
10 seconds
```

---

## retries

Number of consecutive failures before marking the container unhealthy.

Example

```text
3 failures
```

---

## start_period

Grace period before health checks begin.

Useful for applications with slow startup times.

---

# Health Status

Docker reports

```text
starting
```

↓

```text
healthy
```

or

```text
unhealthy
```

---

# Health Check Timeline

```text
Container Started

↓

Starting

↓

Health Check

↓

Healthy

↓

Application Receives Traffic
```

---

# Health Checks in Our Project

Frontend

```text
No dedicated health endpoint initially
```

API Gateway

```text
GET /health
```

Auth Service

```text
GET /health
```

Dashboard Service

```text
GET /health
```

---

# Example Health Check

```yaml
healthcheck:
  test:
    [
      "CMD",
      "curl",
      "-f",
      "http://localhost:5000/health"
    ]
```

Docker repeatedly checks

```text
http://localhost:5000/health
```

---

# Health Checks with depends_on

Example

```yaml
depends_on:
  auth-service:
    condition: service_healthy
```

Startup becomes

```text
Auth Service

↓

Healthy

↓

API Gateway

↓

Healthy

↓

Frontend
```

---

# Enterprise Workflow

Developer

↓

docker compose up

↓

Containers Start

↓

Health Checks Execute

↓

Healthy

↓

Application Ready

---

# Internal Workflow

Container Starts

↓

Health Check Command

↓

Docker Engine

↓

Update Health Status

↓

Compose Uses Status

---

# Daily DevOps Activities

DevOps Engineers

- Configure health checks
- Monitor container health
- Investigate unhealthy containers
- Review startup timing
- Tune intervals
- Improve reliability

---

# Production Best Practices

- Always implement health endpoints.
- Keep health checks lightweight.
- Return HTTP 200 only when ready.
- Avoid expensive operations.
- Configure sensible retry values.
- Test health endpoints regularly.

---

# Security Considerations

- Do not expose sensitive information through health endpoints.
- Keep responses minimal.
- Restrict external access where appropriate.
- Avoid revealing infrastructure details.
- Validate dependencies carefully.

---

# Troubleshooting

List containers

```bash
docker ps
```

Inspect health

```bash
docker inspect <container>
```

View logs

```bash
docker compose logs
```

Watch status

```bash
docker compose ps
```

---

# Common Health Check Issues

## Unhealthy Container

Possible causes

- Application crashed
- Wrong endpoint
- Wrong port
- Slow startup
- Missing dependency

---

## Timeout

Possible causes

- Health endpoint too slow
- Network issue
- Application initialization

---

## Continuous Restart

Possible causes

- Failed health checks
- Application errors
- Incorrect configuration

---

# Real Production Scenario

Scenario

Deployment completes successfully, but users receive

```text
503 Service Unavailable
```

Investigation

Containers are running.

Health checks report

```text
unhealthy
```

API Gateway cannot connect to the Auth Service.

Resolution

- Fix backend connectivity.
- Verify `/health` endpoint.
- Restart deployment.

Result

Containers become healthy and traffic resumes.

---

# Scenario-Based Interview Questions

## Question 1

Why are health checks important?

Answer

They verify that the application is actually ready to serve requests instead of only confirming that the container process is running.

---

## Question 2

What does an unhealthy container indicate?

Answer

Docker successfully started the container, but the application failed the configured health check.

---

## Question 3

Can health checks improve startup sequencing?

Answer

Yes.

When combined with `depends_on`, services can wait until dependencies become healthy before starting.

---

# Architecture Interview Questions

## Question

Why should applications expose a dedicated `/health` endpoint?

Answer

A dedicated endpoint provides a lightweight and consistent method for orchestration platforms and monitoring systems to verify application readiness and health.

---

# Production Support Interview Questions

## Question

A container is running but marked unhealthy.

What should you investigate?

Answer

Review

- Application logs
- Health endpoint
- Startup timing
- Network connectivity
- Dependencies
- Health check configuration

---

# Related Runbooks

Future runbooks

- Configure Docker Health Checks
- Troubleshoot Unhealthy Containers
- Validate Application Readiness
- Investigate Failed Deployments

---

# Common Incidents

- Health endpoint failure
- Startup timeout
- Wrong health URL
- Missing dependency
- Slow application startup
- Continuous unhealthy status

---

# Commands

View running containers

```bash
docker ps
```

Inspect health

```bash
docker inspect <container>
```

View logs

```bash
docker compose logs
```

Check service status

```bash
docker compose ps
```

---

# Marathi Quick Revision

Docker Health Check

- Application ready आहे का तपासते
- Container running म्हणजे healthy असे नाही
- `/health` endpoint वापरते
- Healthy / Unhealthy status
- `depends_on` सोबत वापरल्यास startup अधिक reliable होतो

---

# Marathi Interview Memory Tip

Interview मध्ये जर विचारलं:

"Docker Health Check म्हणजे काय?"

असं सांगा:

"Health Check container चालू आहे का हे नाही, तर application प्रत्यक्षात requests serve करण्यास तयार आहे का हे तपासते. Docker ठराविक interval ने `/health` endpoint तपासतो. Health checks मुळे deployments अधिक reliable होतात आणि `depends_on` सोबत वापरल्यास dependent services योग्य वेळी सुरू होतात."

---

# Key Takeaways

Docker Compose Health Checks verify the real operational status of applications running inside containers. They provide readiness information that simple container startup cannot. Combined with `depends_on`, health checks enable reliable service orchestration and reduce startup failures. In our Enterprise DevOps Platform, every backend service will expose a lightweight `/health` endpoint to support dependable deployments and easier troubleshooting.

