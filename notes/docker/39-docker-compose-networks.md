# Docker Compose Networks

## Purpose

This document explains Docker Compose Networks from an Enterprise DevOps perspective.

Docker Compose Networks allow containers to communicate securely with one another using automatic DNS-based service discovery. Networks isolate applications while enabling controlled communication between services.

For our Enterprise DevOps Platform, Docker Compose Networks will connect the Frontend, API Gateway, Auth Service, and Dashboard Service into a secure internal application network.

---

# Introduction

Containers are isolated by default.

Without networking

- Frontend cannot reach API Gateway
- API Gateway cannot reach Auth Service
- Services cannot exchange requests

Docker Compose automatically creates a network and attaches every service to it.

---

# High-Level Architecture

```text
                Docker Network

        +--------------------------+

Frontend      API Gateway

        \          /

      Auth Service

           |

Dashboard Service
```

Every service communicates through the Docker network.

---

# Why Networks Matter

Benefits

- Automatic service discovery
- Secure communication
- Network isolation
- Simple configuration
- No manual IP management
- Eases microservice development

---

# Default Network

When Docker Compose starts

```bash
docker compose up
```

Compose automatically creates

```text
project_default
```

All services join this network unless configured otherwise.

---

# Network Workflow

```text
docker compose up

↓

Create Network

↓

Attach Containers

↓

Assign DNS

↓

Application Ready
```

---

# Service Discovery

Each service automatically becomes reachable by its service name.

Example

```yaml
services:
  api-gateway:
```

Other containers access it as

```text
http://api-gateway:8080
```

No IP address is required.

---

# Example Network

```yaml
services:
  frontend:

  api-gateway:

  auth-service:

  dashboard-service:
```

Compose creates

```text
enterprise_default
```

All services join this network.

---

# Custom Networks

Example

```yaml
networks:
  backend:
```

Services can explicitly join

```yaml
services:
  api-gateway:
    networks:
      - backend
```

---

# Multiple Networks

Example

```text
Frontend

↓

Frontend Network

↓

API Gateway

↓

Backend Network

↓

Auth Service
```

One container may belong to multiple networks.

---

# Internal Communication

Frontend

```text
http://api-gateway:8080
```

API Gateway

```text
http://auth-service:5000
```

Dashboard

```text
http://dashboard-service:5001
```

Communication uses service names.

---

# DNS Resolution

Docker provides an internal DNS server.

Example

```text
api-gateway

↓

172.x.x.x

↓

Container
```

Containers never need hardcoded IP addresses.

---

# Network Isolation

Different Compose projects create different networks.

Example

```text
project-a_default

project-b_default
```

Services in separate networks cannot communicate unless explicitly connected.

---

# Bridge Network

The default Docker Compose network driver is

```text
bridge
```

Suitable for

- Development
- Local testing
- Single-host deployments

---

# Network Drivers

Common drivers

- bridge
- host
- none
- overlay
- macvlan

Compose primarily uses the bridge driver during development.

---

# Networks in Our Project

```text
Frontend

↓

API Gateway

↓

Auth Service

↓

Dashboard Service
```

All services communicate using service names.

Frontend calls

```text
http://api-gateway:8080
```

NOT

```text
http://localhost:8080
```

inside containers.

---

# Enterprise Workflow

Developer

↓

docker compose up

↓

Compose Creates Network

↓

Containers Join Network

↓

DNS Created

↓

Services Communicate

---

# Internal Workflow

Compose File

↓

Network Creation

↓

Container Attachment

↓

DNS Registration

↓

Application Communication

---

# Daily DevOps Activities

DevOps Engineers

- Configure networks
- Troubleshoot connectivity
- Review service communication
- Maintain network isolation
- Validate DNS resolution
- Support developers

---

# Production Best Practices

- Use custom networks where appropriate.
- Keep internal services private.
- Minimize exposed ports.
- Use service names instead of IP addresses.
- Separate frontend and backend traffic where needed.
- Document network topology.

---

# Security Considerations

- Restrict unnecessary communication.
- Avoid exposing internal services.
- Separate environments.
- Use least privilege networking.
- Monitor network traffic where appropriate.

---

# Troubleshooting

List networks

```bash
docker network ls
```

Inspect network

```bash
docker network inspect <network>
```

List running containers

```bash
docker ps
```

Inspect container

```bash
docker inspect <container>
```

---

# Common Network Issues

## Containers Cannot Communicate

Possible causes

- Different networks
- Incorrect service name
- Container not running

---

## DNS Resolution Failure

Possible causes

- Wrong service name
- Network misconfiguration
- Container restart

---

## Connection Refused

Possible causes

- Application not listening
- Wrong container port
- Service startup failure

---

# Real Production Scenario

Scenario

Frontend reports

```text
Cannot connect to API
```

Investigation

Frontend attempts

```text
http://localhost:8080
```

Inside Docker, localhost refers to the Frontend container itself.

Resolution

Update configuration

```text
http://api-gateway:8080
```

Result

Frontend communicates successfully with the API Gateway.

---

# Scenario-Based Interview Questions

## Question 1

How do Docker Compose services communicate?

Answer

Services connected to the same Docker network communicate using their service names through Docker's built-in DNS.

---

## Question 2

Does Docker Compose automatically create a network?

Answer

Yes.

Compose automatically creates a default bridge network unless custom networks are defined.

---

## Question 3

Why should containers use service names instead of IP addresses?

Answer

Service names remain stable while container IP addresses may change whenever containers are recreated.

---

# Architecture Interview Questions

## Question

Why is automatic DNS important in Docker Compose?

Answer

Automatic DNS removes the need to manage container IP addresses manually, making applications more reliable and easier to scale.

---

# Production Support Interview Questions

## Question

Containers cannot communicate after deployment.

What should you investigate?

Answer

Review

- Network configuration
- Service names
- Container status
- DNS resolution
- Application ports
- Container logs

---

# Related Runbooks

Future runbooks

- Configure Docker Networks
- Troubleshoot Container Networking
- Inspect Docker Networks
- Resolve Service Connectivity Issues

---

# Common Incidents

- DNS resolution failure
- Network isolation issue
- Wrong service name
- Connection refused
- Container not attached to network
- Incorrect port configuration

---

# Commands

List networks

```bash
docker network ls
```

Inspect network

```bash
docker network inspect <network>
```

List containers

```bash
docker ps
```

Inspect container

```bash
docker inspect <container>
```

---

# Marathi Quick Revision

Docker Compose Networks

- Automatic network
- Service discovery
- DNS
- Service name communication
- Bridge network
- Network isolation

---

# Marathi Interview Memory Tip

Interview मध्ये जर विचारलं:

"Docker Compose मध्ये containers एकमेकांशी कसे communicate करतात?"

असं सांगा:

"Docker Compose प्रत्येक project साठी automatic bridge network तयार करते. त्या network मध्ये असलेले सर्व containers Docker च्या built-in DNS द्वारे service name वापरून एकमेकांशी communicate करतात. त्यामुळे IP address लक्षात ठेवण्याची गरज नसते."

---

# Key Takeaways

Docker Compose Networks provide secure, automatic communication between containers using built-in DNS and service discovery. Instead of relying on changing IP addresses, applications communicate through stable service names. For our Enterprise DevOps Platform, Compose networking will enable seamless communication between the Frontend, API Gateway, Auth Service, and Dashboard Service while closely mirroring Kubernetes service discovery concepts.

