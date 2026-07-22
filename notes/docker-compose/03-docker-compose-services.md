# Docker Compose Services

# 1. Purpose

The **services** section is the heart of a Docker Compose file.

Every application container is defined inside this section.

A service represents one running container (or multiple replicas in Docker Swarm).

Without services, Docker Compose cannot create an application.

---

# 2. Introduction

Every microservice is defined separately.

Example

```
Frontend

API Gateway

Auth Service

Dashboard Service

Redis

PostgreSQL

Prometheus

Grafana
```

Each one becomes an independent service.

Docker Compose automatically creates DNS entries so services can communicate using service names.

Example

```
http://auth-service:5000

http://dashboard-service:5001
```

No IP addresses are required.

---

# 3. Enterprise Usage

Large organizations define every application component as an independent service.

Example

```
Frontend

↓

API Gateway

↓

Authentication

↓

Users Service

↓

Orders Service

↓

Payments Service

↓

Notification Service

↓

Redis

↓

PostgreSQL

↓

RabbitMQ
```

Advantages

- Loose coupling
- Easy maintenance
- Independent deployments
- Better scalability
- Easier troubleshooting

---

# 4. Usage in THIS Project

Our services

```
frontend

api-gateway

auth-service

dashboard-service
```

Later

```
prometheus

grafana
```

Every service will have

- Image
- Build Context
- Environment Variables
- Network
- Volumes
- Health Check
- Restart Policy

---

# 5. Architecture

```
docker-compose.yml

        │

        ▼

services

│

├── frontend

├── api-gateway

├── auth-service

├── dashboard-service

├── prometheus

└── grafana

        │

        ▼

Docker Engine

        │

        ▼

Running Containers
```

---

# 6. Internal Workflow

Compose reads

↓

services section

↓

Creates containers

↓

Creates DNS records

↓

Attaches network

↓

Starts dependencies

↓

Runs health checks

↓

Application becomes available

---

# 7. Service Definition

Example

```yaml
services:

  api-gateway:
    build: .
    container_name: api-gateway
```

Each service has its own configuration.

---

# 8. Common Service Options

## image

Uses an existing image.

```yaml
image: nginx:latest
```

---

## build

Builds from Dockerfile.

```yaml
build: .
```

---

## container_name

Assigns container name.

```yaml
container_name: api-gateway
```

---

## hostname

Internal hostname.

```yaml
hostname: gateway
```

---

## ports

Maps host ports.

```yaml
ports:
  - "8080:8080"
```

---

## environment

Application configuration.

```yaml
environment:
  APP_ENV=production
```

---

## depends_on

Startup dependency.

```yaml
depends_on:
  - auth-service
```

---

## restart

Restart behavior.

```yaml
restart: unless-stopped
```

---

## healthcheck

Container health verification.

---

# 9. Daily DevOps Activities

- Add new services
- Remove deprecated services
- Update image versions
- Configure environment variables
- Review dependencies
- Verify health checks
- Restart failed services
- Analyze logs
- Validate startup order

---

# 10. Production Best Practices

- One service = one responsibility.
- Use meaningful service names.
- Never hardcode IP addresses.
- Use service discovery.
- Configure health checks.
- Configure restart policies.
- Avoid unnecessary exposed ports.
- Keep service configuration readable.

---

# 11. Security

Avoid

- Running privileged containers
- Exposing internal databases
- Running everything as root

Always

- Limit container permissions
- Use internal Docker networks
- Scan images
- Use trusted base images

---

# 12. Troubleshooting

List running services

```bash
docker compose ps
```

View logs

```bash
docker compose logs api-gateway
```

Inspect service

```bash
docker inspect api-gateway
```

Open shell

```bash
docker compose exec api-gateway sh
```

Test DNS

```bash
docker compose exec frontend ping auth-service
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

docker compose logs api-gateway

docker compose logs frontend
```

Root Cause

API Gateway container failed.

---

## Scenario 2

Application cannot reach Auth Service.

Investigation

```bash
docker network inspect

docker compose exec api-gateway ping auth-service
```

Root Cause

Service attached to wrong Docker network.

---

## Scenario 3

Deployment successful.

Containers restarting continuously.

Investigation

```bash
docker compose ps

docker compose logs

docker inspect
```

Root Cause

Missing environment variables.

---

## Scenario 4

Everything healthy.

Frontend still cannot communicate.

Investigation

```bash
docker compose exec frontend nslookup api-gateway

curl http://api-gateway:8080/health
```

Root Cause

Wrong service name configured inside frontend.

---

# 14. Scenario Interview Q&A

**Q1. Why does Docker Compose use service names instead of IP addresses?**

A:

Docker provides automatic DNS-based service discovery. Service names remain constant while container IP addresses may change.

---

**Q2. Can two services use the same container name?**

No.

Container names must be unique.

---

**Q3. Why should every microservice be a separate service?**

Because independent services improve deployment, troubleshooting, scalability, and maintenance.

---

# 15. Architecture Interview Q&A

**Q1. How do services communicate?**

Through Docker's internal bridge network using service names as DNS records.

---

**Q2. Why avoid IP addresses?**

Container IPs are dynamic and change after recreation.

Service names remain constant.

---

# 16. Production Support Interview Q&A

**Q1. Service is running but application cannot connect. Investigation order?**

1.

```bash
docker compose ps
```

2.

```bash
docker compose logs
```

3.

```bash
docker network inspect
```

4.

```bash
docker inspect
```

5.

```bash
docker compose exec
```

6.

DNS verification

7.

Health endpoint verification

---

**Q2. All services are Up but users receive errors. Why?**

Possible causes

- Wrong environment variables
- Failed health checks
- Wrong internal URLs
- Incorrect service names
- Reverse proxy configuration
- Database unavailable

---

# 17. Related Runbooks

- docker-compose-service-failure.md
- docker-network-connectivity-issue.md
- docker-health-check-failures.md

---

# 18. Common Incidents

- Service Crash Loop
- Service Discovery Failure
- Incorrect Environment Variables
- Network Misconfiguration
- Health Check Failure

---

# 19. Commands

List services

```bash
docker compose ps
```

View logs

```bash
docker compose logs
```

Restart one service

```bash
docker compose restart api-gateway
```

Execute shell

```bash
docker compose exec api-gateway sh
```

Inspect service

```bash
docker inspect api-gateway
```

---

# 20. Marathi Quick Revision

- Service म्हणजे एक container.
- प्रत्येक microservice वेगळा service म्हणून define करायचा.
- Service names हेच internal DNS असतात.
- IP address वापरायचा नाही.
- Health check आणि restart policy प्रत्येक service साठी असावी.

---

# 21. Marathi Summary (5+ Experience Revision)

## Interview Summary

Docker Compose मधील **services** section हा संपूर्ण application चा मुख्य भाग असतो.

प्रत्येक microservice स्वतंत्र service म्हणून define केली जाते.

Production मध्ये services IP address ने नाही तर service name ने communicate करतात.

### Production Investigation Flow

```
docker compose ps

↓

docker compose logs

↓

docker inspect

↓

docker network inspect

↓

docker compose exec

↓

DNS Verification

↓

Health Check

↓

Root Cause Analysis

↓

Permanent Fix
```

### Real Interview Tip

जर interviewer म्हणाला,

**"Container Up आहे पण API काम करत नाही."**

फक्त "logs पाहीन" असं उत्तर देऊ नका.

नेहमी investigation order सांगा:

Running Status → Logs → Inspect → Network → DNS → Health Check → Environment Variables → RCA → Permanent Fix.

यामुळे interviewer ला production troubleshooting experience दिसतो.

