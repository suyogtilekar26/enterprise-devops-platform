# Docker Troubleshooting

## Purpose

This document explains Docker Troubleshooting from an Enterprise DevOps perspective.

Docker troubleshooting is the systematic process of identifying, investigating, and resolving issues related to Docker images, containers, networking, storage, registries, and the Docker Engine.

For our Enterprise DevOps Platform, Docker troubleshooting skills are essential because Docker is the foundation for CI/CD pipelines, Kubernetes deployments, and production operations.

---

# Introduction

Docker problems generally fall into one of these categories

- Docker Engine issues
- Build failures
- Image problems
- Container failures
- Network issues
- Volume issues
- Registry issues
- Resource issues
- Security issues

A structured troubleshooting process minimizes downtime.

---

# Enterprise Troubleshooting Workflow

```text
Incident Report

↓

Identify Symptoms

↓

Collect Logs

↓

Verify Configuration

↓

Find Root Cause

↓

Implement Fix

↓

Validate Resolution

↓

Document Lessons Learned
```

---

# Common Troubleshooting Areas

- Docker daemon
- Dockerfile
- Images
- Containers
- Volumes
- Networks
- Registry
- Resource usage
- Security

---

# Step 1 – Verify Docker Service

Check Docker status

```bash
docker version
```

Check Docker information

```bash
docker info
```

Verify the daemon is running before investigating further.

---

# Step 2 – Verify Images

List images

```bash
docker images
```

Inspect image

```bash
docker image inspect frontend:v1
```

Verify

- Image exists
- Correct tag
- Expected repository

---

# Step 3 – Verify Containers

List running containers

```bash
docker ps
```

List all containers

```bash
docker ps -a
```

Check

- Status
- Exit code
- Restart count

---

# Step 4 – Inspect Container Logs

View logs

```bash
docker logs <container>
```

Follow logs

```bash
docker logs -f <container>
```

Logs usually reveal

- Startup failures
- Missing configuration
- Dependency errors
- Application crashes

---

# Step 5 – Inspect Container

Inspect metadata

```bash
docker inspect <container>
```

Review

- Environment variables
- Mounts
- Networks
- Ports
- Restart policy

---

# Step 6 – Check Resource Usage

View resource utilization

```bash
docker stats
```

Monitor

- CPU
- Memory
- Network
- Block I/O

---

# Step 7 – Verify Networks

List networks

```bash
docker network ls
```

Inspect network

```bash
docker network inspect bridge
```

Check

- Connectivity
- DNS
- Attached containers

---

# Step 8 – Verify Volumes

List volumes

```bash
docker volume ls
```

Inspect volume

```bash
docker volume inspect <volume>
```

Ensure persistent storage is mounted correctly.

---

# Step 9 – Verify Registry Access

Pull image

```bash
docker pull registry.company.com/frontend:v1
```

Push image

```bash
docker push registry.company.com/frontend:v1
```

Check

- Authentication
- Network
- Image tag
- Repository

---

# Step 10 – Verify Build

Build image

```bash
docker build .
```

Common failures

- Missing files
- Invalid Dockerfile
- Build context problems
- Package installation failures

---

# Common Docker Errors

## Docker Daemon Not Running

Example

```text
Cannot connect to the Docker daemon
```

Possible causes

- Docker service stopped
- Permission issues
- Docker Desktop not running

Resolution

- Start Docker
- Verify daemon
- Check permissions

---

## Image Not Found

Example

```text
pull access denied
```

Possible causes

- Wrong image name
- Wrong tag
- Missing repository
- Authentication failure

---

## Container Exits Immediately

Possible causes

- Application crash
- Missing environment variables
- Startup command failure
- Configuration error

Investigate

```bash
docker logs
```

---

## Port Already Allocated

Example

```text
Bind for 0.0.0.0:8080 failed
```

Cause

Another process already uses the port.

Resolution

- Stop conflicting service
- Use another port

---

## ImagePullBackOff

Common Kubernetes issue

Possible causes

- Wrong image
- Wrong tag
- Registry authentication
- Missing image

---

## CrashLoopBackOff

Possible causes

- Application crash
- Health check failure
- Startup script failure
- Missing configuration

---

## Disk Space Full

Symptoms

- Builds fail
- Pull fails
- Containers stop

Cleanup

```bash
docker system prune
```

---

## Large Image Size

Investigate

```bash
docker history image:v1
```

Possible causes

- Large base image
- Build tools included
- Missing multi-stage build

---

## Slow Builds

Possible causes

- Cache disabled
- Large build context
- Poor Dockerfile ordering

Optimize

- Layer caching
- .dockerignore
- Multi-stage builds

---

# Docker Troubleshooting in Our Project

Frontend

Verify

- Nginx
- Static assets
- Port mapping

API Gateway

Verify

- Gunicorn
- Flask
- Port 8080

Auth Service

Verify

- Port 5000
- JWT configuration

Dashboard Service

Verify

- Port 5001
- Health endpoint

---

# Enterprise Workflow

Developer

↓

CI/CD

↓

Docker Build

↓

Registry

↓

Kubernetes

↓

Production

↓

Incident

↓

Troubleshooting

↓

Resolution

---

# Internal Workflow

Issue Detected

↓

Logs

↓

Inspect

↓

Root Cause

↓

Fix

↓

Rebuild

↓

Redeploy

---

# Daily DevOps Activities

DevOps Engineers

- Review logs
- Investigate failed builds
- Monitor container health
- Analyze resource usage
- Resolve registry issues
- Verify networking
- Support production deployments

---

# Production Best Practices

- Collect logs first.
- Reproduce issues safely.
- Verify configuration.
- Avoid changing multiple variables simultaneously.
- Validate the fix.
- Document root cause.
- Automate recurring checks.

---

# Security Considerations

- Never expose secrets in logs.
- Verify image integrity.
- Scan rebuilt images.
- Restrict troubleshooting access.
- Audit production changes.

---

# Real Production Scenario

Scenario

Users report that the application is unavailable after a deployment.

Investigation

- Pods continuously restart.
- Container logs show missing environment variables.
- CI/CD pipeline completed successfully.

Resolution

- Correct missing environment variables.
- Rebuild image if required.
- Redeploy application.
- Verify health endpoints.

Result

Application becomes available and incident is closed.

---

# Scenario-Based Interview Questions

## Question 1

What is your first step when a Docker container fails?

Answer

Check the container status using `docker ps -a` and inspect the container logs using `docker logs`.

---

## Question 2

How do you investigate a failed Docker build?

Answer

Review the build output, Dockerfile, build context, dependency installation, and recent code changes.

---

## Question 3

Why is `docker inspect` useful?

Answer

It provides detailed information about container configuration, networking, environment variables, mounts, and runtime settings.

---

# Architecture-Level Interview Questions

## Question

Why should troubleshooting begin with evidence collection?

Answer

Logs, metrics, and configuration provide objective evidence that helps identify the root cause without relying on assumptions.

---

## Question

Why are health checks valuable during troubleshooting?

Answer

They quickly indicate whether an application is functioning correctly and help orchestration platforms detect unhealthy containers.

---

## Question

Why document production incidents?

Answer

Documentation improves future incident response, knowledge sharing, and operational maturity.

---

# Production Support Questions

Q.

A container is repeatedly restarting.

What should you investigate?

Answer

Review

- Logs
- Exit code
- Environment variables
- Startup command
- Health checks
- Resource limits

---

Q.

Image builds suddenly begin failing in CI.

Possible causes?

Answer

- Dockerfile changes
- Dependency failures
- Registry outage
- Disk space exhaustion
- Network issues
- Base image unavailable

---

# Related Runbooks

Future runbooks

- Investigate Container Failures
- Troubleshoot Docker Builds
- Resolve Image Pull Issues
- Diagnose Docker Networking
- Recover Docker Service

---

# Common Incidents

- Docker daemon unavailable
- Build failures
- Image pull failure
- Container crash
- Network failure
- Volume mount failure
- Registry authentication failure
- Disk full

---

# Commands

Check Docker

```bash
docker version
```

Docker information

```bash
docker info
```

Running containers

```bash
docker ps
```

All containers

```bash
docker ps -a
```

Logs

```bash
docker logs <container>
```

Inspect

```bash
docker inspect <container>
```

Resource usage

```bash
docker stats
```

List networks

```bash
docker network ls
```

List volumes

```bash
docker volume ls
```

Cleanup

```bash
docker system prune
```

---

# Key Takeaways

Docker troubleshooting requires a structured approach that starts with gathering evidence, identifying the root cause, implementing a targeted fix, and validating the resolution.

Enterprise DevOps teams rely on logs, container inspection, monitoring, and standardized troubleshooting workflows to resolve issues quickly while minimizing production impact.

For our Enterprise DevOps Platform, effective Docker troubleshooting forms the operational foundation for reliable CI/CD pipelines and Kubernetes deployments.

---

# Marathi Quick Revision

Docker Troubleshooting

- Docker daemon तपासा
- Images तपासा
- Containers तपासा
- Logs तपासा
- Inspect करा
- Networks तपासा
- Volumes तपासा
- Registry तपासा
- Root Cause शोधा
- Fix validate करा

---

# Marathi Interview Memory Tip

Interview मध्ये जर विचारलं:

"Docker issue troubleshoot कशी कराल?"

असं सांगा:

"मी सर्वप्रथम `docker ps -a` आणि `docker logs` वापरून समस्या समजून घेतो. त्यानंतर `docker inspect`, networking, volumes, image tags, registry access आणि resource usage तपासतो. Root cause सापडल्यानंतर targeted fix करून container पुन्हा deploy करतो आणि health checks व logs वापरून resolution verify करतो."

