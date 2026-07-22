# Docker Compose Debugging

## Purpose

This document explains how to debug Docker Compose applications in an Enterprise DevOps environment.

Debugging is a systematic process of identifying, analyzing, and resolving issues affecting Docker Compose services. Effective debugging minimizes downtime, accelerates incident resolution, and improves application reliability.

For our Enterprise DevOps Platform, debugging skills are essential to diagnose issues across the Frontend, API Gateway, Auth Service, Dashboard Service, networking, volumes, and container startup.

---

# Introduction

Common Docker Compose issues include:

- Container not starting
- Container exiting immediately
- Application crash
- Service unavailable
- Network communication failure
- Port conflicts
- Volume mount issues
- Health check failures
- Environment variable problems
- Image build failures

A structured debugging approach helps resolve these issues efficiently.

---

# Enterprise Debugging Workflow

```text
Issue Report

↓

Verify Container Status

↓

Inspect Logs

↓

Check Configuration

↓

Verify Network

↓

Verify Volumes

↓

Check Environment Variables

↓

Identify Root Cause

↓

Fix

↓

Validate

↓

Document
```

---

# Step 1 — Verify Running Containers

```bash
docker compose ps
```

Check

- Running
- Exited
- Restarting
- Unhealthy

---

# Step 2 — View Logs

Entire application

```bash
docker compose logs
```

Specific service

```bash
docker compose logs api-gateway
```

Follow logs

```bash
docker compose logs -f
```

---

# Step 3 — Inspect Container

```bash
docker inspect api-gateway
```

Useful information

- Environment variables
- Networks
- Mounts
- Health status
- Restart policy

---

# Step 4 — Enter Container

```bash
docker exec -it api-gateway sh
```

or

```bash
docker exec -it api-gateway bash
```

Useful checks

```bash
env
pwd
ls
cat
curl
```

---

# Step 5 — Verify Network

List networks

```bash
docker network ls
```

Inspect

```bash
docker network inspect enterprise_default
```

Test connectivity

```bash
ping auth-service
```

or

```bash
curl http://auth-service:5000/health
```

---

# Step 6 — Verify Ports

List containers

```bash
docker ps
```

Inspect ports

```bash
docker port api-gateway
```

Host verification

```bash
netstat -tuln
```

or

```bash
ss -tuln
```

---

# Step 7 — Verify Volumes

```bash
docker volume ls
```

Inspect

```bash
docker volume inspect app-data
```

---

# Step 8 — Validate Compose File

```bash
docker compose config
```

Checks

- YAML syntax
- Variable substitution
- Service definitions
- Networks
- Volumes

---

# Step 9 — Verify Images

```bash
docker images
```

Rebuild

```bash
docker compose build
```

Force rebuild

```bash
docker compose build --no-cache
```

---

# Step 10 — Restart Services

```bash
docker compose restart
```

or

```bash
docker compose down

docker compose up
```

---

# Common Debugging Commands

View logs

```bash
docker compose logs
```

Running containers

```bash
docker compose ps
```

Container details

```bash
docker inspect <container>
```

Container shell

```bash
docker exec -it <container> sh
```

Running processes

```bash
docker top <container>
```

Resource usage

```bash
docker stats
```

---

# Debugging Network Issues

Check

- Correct service name
- Same Docker network
- Container status
- Port configuration
- Health endpoint

Example

```bash
curl http://api-gateway:8080/health
```

---

# Debugging Volume Issues

Check

- Mount path
- File permissions
- Volume existence
- Application path

---

# Debugging Environment Variables

Inside container

```bash
env
```

Validate Compose

```bash
docker compose config
```

---

# Debugging Health Checks

Inspect

```bash
docker inspect <container>
```

Review

```text
Health

↓

Status

↓

Healthy / Unhealthy
```

---

# Enterprise Debugging Checklist

- Is container running?
- Is application running?
- Is port exposed?
- Is network correct?
- Are environment variables loaded?
- Are volumes mounted?
- Is image correct?
- Is health check passing?
- Are dependencies available?
- Are logs clean?

---

# Daily DevOps Activities

- Analyze logs
- Investigate incidents
- Verify deployments
- Monitor containers
- Resolve networking issues
- Improve reliability

---

# Production Best Practices

- Debug using a structured process.
- Never assume the root cause.
- Collect evidence before restarting.
- Preserve logs.
- Validate fixes.
- Update runbooks after incidents.

---

# Security

- Avoid exposing debug ports.
- Limit shell access.
- Protect logs.
- Remove temporary debug changes.
- Audit troubleshooting activities.

---

# Real Production Scenario

Issue

Frontend displays

```text
502 Bad Gateway
```

Investigation

- Frontend healthy
- API Gateway restarting
- Logs show missing environment variable

Resolution

- Add missing variable
- Restart service
- Validate health endpoint

Result

Application restored.

---

# Interview Questions

### What is your first debugging step?

Check container status using

```bash
docker compose ps
```

---

### How do you investigate failures?

Review logs, inspect containers, validate networking, verify configuration, and reproduce the issue.

---

### Which command validates a Compose file?

```bash
docker compose config
```

---

# Marathi Quick Revision

Debugging Steps

- ps
- logs
- inspect
- exec
- network
- volume
- env
- health
- restart

---

# Marathi Interview Memory Tip

Interview मध्ये Debugging विचारल्यास नेहमी सांगा:

"मी प्रथम `docker compose ps` ने container status तपासतो, त्यानंतर logs, inspect, networking, environment variables, volumes आणि health checks तपासून root cause शोधतो."

---

# Key Takeaways

Effective Docker Compose debugging follows a structured workflow: verify container status, inspect logs, validate configuration, test networking, review volumes, confirm environment variables, and identify the root cause before applying fixes. Following a consistent process reduces downtime and improves production reliability.

