# Docker Compose Ports

## Purpose

This document explains the `ports` directive in Docker Compose from an Enterprise DevOps perspective.

Port mapping allows applications running inside Docker containers to communicate with the outside world by exposing container ports to the host machine.

For our Enterprise DevOps Platform, Docker Compose will expose the Frontend, API Gateway, Auth Service, and Dashboard Service so they can communicate with developers and other services during local development.

---

# Introduction

Containers run in isolated environments.

Applications inside containers are not directly accessible from the host machine.

Docker Compose uses the `ports` directive to expose container ports.

Without port mapping

- Browser cannot access frontend
- APIs cannot be called
- Testing becomes impossible

---

# High-Level Architecture

```text
Browser

↓

Host Port

↓

Docker Engine

↓

Container Port

↓

Application
```

---

# Why Port Mapping Matters

Benefits

- Access applications from host
- API testing
- Browser access
- Local development
- Service integration
- Debugging

---

# Basic Syntax

Example

```yaml
ports:
  - "8080:80"
```

Meaning

```text
Host Port 8080

↓

Container Port 80
```

---

# Port Mapping Flow

```text
Client

↓

localhost:8080

↓

Docker Engine

↓

Container

↓

Application Port 80
```

---

# Host Port

The first number represents

```text
Host Machine Port
```

Example

```yaml
8080:80
```

Host uses

```text
8080
```

---

# Container Port

The second number represents

```text
Application Port Inside Container
```

Example

```yaml
8080:80
```

Container application listens on

```text
80
```

---

# Multiple Ports

Example

```yaml
ports:
  - "8080:80"
  - "8443:443"
```

Multiple services can expose multiple ports.

---

# Automatic Port Assignment

Example

```yaml
ports:
  - "80"
```

Docker automatically assigns an available host port.

Useful for testing environments.

---

# Port Mapping in Our Project

Frontend

```text
5173 → 5173
```

API Gateway

```text
8080 → 8080
```

Auth Service

```text
5000 → 5000
```

Dashboard Service

```text
5001 → 5001
```

---

# Project Architecture

```text
Browser

↓

Frontend
localhost:5173

↓

API Gateway
localhost:8080

↓

Auth Service
localhost:5000

↓

Dashboard Service
localhost:5001
```

---

# Internal Container Communication

Containers on the same Compose network do **not** need published ports to communicate.

Example

```text
Frontend

↓

api-gateway

↓

auth-service
```

Communication uses

```text
Service Name

NOT

localhost
```

---

# Host Access vs Container Access

Host Machine

```text
localhost:8080
```

Container

```text
http://api-gateway:8080
```

Containers communicate using service names.

---

# Exposing vs Publishing Ports

Expose

- Internal communication only

Publish

- Accessible from host machine

Compose `ports` publishes ports.

---

# Enterprise Workflow

Developer

↓

docker compose up

↓

Containers Start

↓

Ports Published

↓

Application Accessible

---

# Internal Workflow

Compose

↓

Read Ports

↓

Configure NAT

↓

Docker Network

↓

Application Available

---

# Daily DevOps Activities

DevOps Engineers

- Configure service ports
- Resolve port conflicts
- Verify connectivity
- Update documentation
- Test API endpoints
- Validate service communication

---

# Production Best Practices

- Publish only required ports.
- Minimize externally accessible services.
- Use reverse proxies where appropriate.
- Keep internal services private.
- Document all published ports.
- Avoid unnecessary host exposure.

---

# Security Considerations

- Expose only required ports.
- Restrict sensitive services.
- Use firewalls.
- Enable TLS where required.
- Monitor exposed services.
- Avoid exposing databases publicly.

---

# Troubleshooting

Start services

```bash
docker compose up
```

List services

```bash
docker compose ps
```

Inspect ports

```bash
docker port <container>
```

List containers

```bash
docker ps
```

---

# Common Port Errors

## Port Already Allocated

Example

```text
Bind for 0.0.0.0:8080 failed
```

Cause

Another process is already using the port.

Resolution

- Stop conflicting process
- Choose another host port

---

## Connection Refused

Possible causes

- Container stopped
- Wrong port
- Application not listening
- Firewall issue

---

## Service Not Reachable

Investigate

- Container status
- Port mapping
- Application logs
- Network configuration

---

# Real Production Scenario

Scenario

Developers cannot access the Frontend after starting Docker Compose.

Investigation

Compose file maps

```yaml
ports:
  - "8080:5173"
```

Developers attempt to access

```text
localhost:5173
```

Resolution

Access

```text
localhost:8080
```

or correct the mapping.

Result

Frontend becomes accessible.

---

# Scenario-Based Interview Questions

## Question 1

What does

```yaml
8080:80
```

mean?

Answer

Host port 8080 forwards traffic to port 80 inside the container.

---

## Question 2

Can containers communicate without published ports?

Answer

Yes.

Containers on the same Docker network communicate using service names without publishing ports.

---

## Question 3

Why shouldn't every service publish ports?

Answer

Publishing unnecessary ports increases the attack surface and exposes internal services that should remain private.

---

# Architecture Interview Questions

## Question

How do Docker containers communicate internally?

Answer

Containers connected to the same Docker network communicate using service names as DNS hostnames rather than localhost.

---

# Production Support Interview Questions

## Question

A service works inside the container but is inaccessible from the browser.

What should you investigate?

Answer

Review

- Port mapping
- Container status
- Application listening port
- Firewall rules
- Compose configuration

---

# Related Runbooks

Future runbooks

- Configure Docker Compose Ports
- Resolve Port Conflicts
- Troubleshoot Container Connectivity

---

# Common Incidents

- Port conflict
- Connection refused
- Wrong port mapping
- Service unavailable
- Firewall blocking traffic
- Incorrect application listening port

---

# Commands

Start services

```bash
docker compose up
```

List services

```bash
docker compose ps
```

List containers

```bash
docker ps
```

Inspect published ports

```bash
docker port <container>
```

---

# Marathi Quick Revision

Docker Compose Ports

- Host Port
- Container Port
- Browser → Host → Container
- Internal communication = Service Name
- External communication = Published Port

---

# Marathi Interview Memory Tip

Interview मध्ये जर विचारलं:

"`ports: 8080:80` म्हणजे काय?"

असं सांगा:

"`8080:80` मध्ये पहिला port हा Host Machine चा असतो आणि दुसरा container मधील application चा असतो. Browser `localhost:8080` ला request पाठवतो आणि Docker ती request container मधील port 80 वर forward करतो."

---

# Key Takeaways

The `ports` directive publishes container ports to the host machine, enabling external access to containerized applications. Internal service communication within a Docker Compose network does not require published ports and should use service names instead. For our Enterprise DevOps Platform, only the necessary application endpoints will be published while internal communication remains private.

