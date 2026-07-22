# Docker Compose Networks

# 1. Purpose

Docker Compose Networks provide secure communication between multiple containers without exposing every service to the outside world.

Networks allow containers to communicate using service names instead of IP addresses.

In enterprise environments, proper network design improves security, scalability, and troubleshooting.

---

# 2. Introduction

When Docker Compose starts an application, it automatically creates a network.

Example

```
docker compose up -d
```

Docker creates

```
project_default
```

Every service joins this network unless another network is specified.

Example

```
frontend

↓

api-gateway

↓

auth-service

↓

dashboard-service
```

All services communicate over the internal Docker network.

---

# 3. Enterprise Usage

Real production environments separate applications into multiple networks.

Example

```
Internet

↓

Frontend Network

↓

API Gateway

↓

Backend Network

↓

Database Network
```

Advantages

- Better security
- Network isolation
- Easier troubleshooting
- Reduced attack surface
- Controlled communication

---

# 4. Usage in THIS Project

We will use a dedicated network.

```
enterprise-network
```

Services

```
Frontend

↓

API Gateway

↓

Auth Service

↓

Dashboard Service
```

Future

```
Prometheus

Grafana
```

All services communicate using internal DNS.

Example

```
http://auth-service:5000

http://dashboard-service:5001
```

---

# 5. Architecture

```
                  enterprise-network

        ┌────────────────────────────────┐

        │                                │

Frontend ─ API Gateway ─ Auth Service ─ Dashboard

        │                                │

        └──────── Prometheus ─ Grafana ──┘
```

---

# 6. Internal Workflow

Compose Starts

↓

Creates Network

↓

Assigns Network to Containers

↓

Creates DNS Records

↓

Services Communicate

↓

Application Ready

---

# 7. Network Types

## Default Network

Automatically created.

Example

```
project_default
```

---

## Custom Network

Created manually.

Example

```yaml
networks:

  enterprise-network:
```

Preferred in production.

---

## External Network

Uses an existing Docker network.

Useful when multiple compose projects communicate.

---

# 8. Service Communication

Example

Instead of

```
http://172.18.0.5:5000
```

Use

```
http://auth-service:5000
```

Benefits

- Stable
- Portable
- Easier maintenance

---

# 9. Daily DevOps Activities

- Create networks
- Inspect networks
- Remove unused networks
- Verify DNS resolution
- Troubleshoot connectivity
- Validate service communication
- Review exposed ports
- Update compose networking

---

# 10. Production Best Practices

- Use custom networks.
- Separate frontend and backend traffic.
- Never expose databases publicly.
- Use internal DNS.
- Remove unused networks.
- Review firewall rules.
- Document network architecture.

---

# 11. Security

Never

- Expose databases directly.
- Put every service on one public network.
- Expose monitoring tools unnecessarily.

Always

- Use internal communication.
- Restrict published ports.
- Isolate sensitive services.
- Review network access regularly.

---

# 12. Troubleshooting

List networks

```bash
docker network ls
```

Inspect network

```bash
docker network inspect enterprise-network
```

Inspect container

```bash
docker inspect api-gateway
```

Verify DNS

```bash
docker compose exec frontend ping api-gateway
```

Test application

```bash
docker compose exec frontend curl http://api-gateway:8080/health
```

---

# 13. Real Production Scenarios

## Scenario 1

Frontend returns

```
502 Bad Gateway
```

Investigation

```bash
docker compose ps

docker network inspect enterprise-network

docker compose exec frontend ping api-gateway
```

Root Cause

Frontend connected to the wrong Docker network.

---

## Scenario 2

API Gateway cannot communicate with Auth Service.

Investigation

```bash
docker compose exec api-gateway ping auth-service

docker network inspect enterprise-network
```

Root Cause

Auth Service accidentally removed from backend network.

---

## Scenario 3

Deployment successful.

Containers healthy.

Application unavailable.

Investigation

```bash
docker inspect api-gateway

docker network ls

docker compose config
```

Root Cause

Compose created a new network because of an incorrect network name.

---

## Scenario 4

Database unreachable after deployment.

Investigation

```bash
docker compose exec api-gateway ping postgres

docker network inspect
```

Root Cause

Database attached to an isolated network.

---

# 14. Scenario Interview Q&A

**Q1. Why use custom Docker networks?**

A:

They provide better isolation, improved security, predictable communication, and easier management.

---

**Q2. How do containers discover each other?**

Through Docker's built-in DNS using service names.

---

**Q3. Should applications communicate using container IP addresses?**

No.

Container IP addresses change after recreation.

Service names remain stable.

---

# 15. Architecture Interview Q&A

**Q1. Why separate frontend and backend networks?**

To reduce attack surface and isolate internal services.

---

**Q2. Can one container join multiple networks?**

Yes.

A container can communicate with services across multiple attached networks.

---

# 16. Production Support Interview Q&A

**Q1. Containers are running but communication fails. Investigation order?**

1.

```bash
docker network ls
```

2.

```bash
docker network inspect
```

3.

```bash
docker inspect
```

4.

```bash
docker compose exec
```

5.

DNS verification

6.

Health endpoint verification

---

**Q2. Ping works but API requests fail. Why?**

Possible reasons

- Application not listening
- Wrong port
- Firewall rules
- Reverse proxy issue
- Health check failure
- Incorrect environment variables

---

# 17. Related Runbooks

- docker-network-connectivity-issue.md
- docker-compose-service-failure.md
- docker-health-check-failures.md

---

# 18. Common Incidents

- Network Connectivity Failure
- Wrong Network Attachment
- Service Discovery Failure
- DNS Resolution Failure
- Incorrect Port Mapping

---

# 19. Commands

List networks

```bash
docker network ls
```

Inspect network

```bash
docker network inspect enterprise-network
```

Inspect container

```bash
docker inspect api-gateway
```

Verify DNS

```bash
docker compose exec frontend ping api-gateway
```

Verify API

```bash
docker compose exec frontend curl http://api-gateway:8080/health
```

---

# 20. Marathi Quick Revision

- Network मुळे containers एकमेकांशी communicate करतात.
- Service Name हेच DNS असते.
- IP address वापरू नये.
- Database public network वर ठेवू नये.
- Custom network production मध्ये best practice आहे.

---

# 21. Marathi Summary (5+ Experience Revision)

## Interview Summary

Docker Compose Network म्हणजे containers मधील internal communication layer.

Production मध्ये सर्व services custom network वर ठेवले जातात आणि service names वापरून communicate करतात.

### Production Investigation Flow

```
docker compose ps

↓

docker network ls

↓

docker network inspect

↓

docker inspect

↓

Ping Test

↓

Curl Health Check

↓

DNS Verification

↓

Root Cause Analysis

↓

Permanent Fix
```

### 5+ Years Interview Tip

जर interviewer म्हणाला,

**"All containers are Up, पण services communicate करत नाहीत."**

Investigation sequence सांगा:

Container Status → Network Attachments → DNS Resolution → Internal Connectivity → Application Port → Health Check → Environment Variables → RCA → Permanent Fix.

हे उत्तर production troubleshooting experience दर्शवते.

