# Docker Compose depends_on

# 1. Purpose

The **depends_on** directive controls the startup order of services in Docker Compose.

It ensures that dependent containers are started before the application that requires them.

This helps automate multi-container application startup and reduces manual intervention.

However, **depends_on only controls container startup order, not application readiness.**

---

# 2. Introduction

Consider the following application.

```
Frontend

↓

API Gateway

↓

Auth Service

↓

PostgreSQL
```

If the API Gateway starts before Auth Service or PostgreSQL is available, startup failures may occur.

Docker Compose solves the startup sequence using **depends_on**.

---

# 3. Enterprise Usage

Most enterprise applications have dependencies.

Examples

```
Application

↓

Redis

↓

Database

↓

Message Queue
```

or

```
Frontend

↓

Backend API

↓

Authentication Service

↓

Database
```

Compose ensures containers start in a logical order.

Production Kubernetes environments achieve similar behavior using readiness probes and startup probes instead of depends_on.

---

# 4. Usage in THIS Project

Our dependency chain

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
API Gateway

↓

PostgreSQL

↓

Redis
```

Dependencies will be defined inside docker-compose.yml.

---

# 5. Architecture

```
docker-compose.yml

        │

depends_on

        │

        ▼

Auth Service

        │

        ▼

API Gateway

        │

        ▼

Frontend
```

---

# 6. Internal Workflow

Developer

↓

docker compose up

↓

Compose Reads Dependencies

↓

Starts Dependency Containers

↓

Starts Application Containers

↓

Health Verification

↓

Application Ready

---

# 7. Syntax

Basic Example

```yaml
services:

  api-gateway:

    depends_on:
      - auth-service
      - dashboard-service
```

Compose starts

```
Auth Service

↓

Dashboard Service

↓

API Gateway
```

---

# 8. Important Limitation

Many engineers misunderstand depends_on.

It only guarantees

```
Container Started
```

It does **NOT** guarantee

```
Application Ready
```

Example

```
PostgreSQL Container

↓

Running

↓

Still Initializing Database

↓

API Gateway Starts

↓

Connection Refused
```

The container is running, but the application is not yet ready.

---

# 9. Daily DevOps Activities

- Review service dependencies
- Validate startup order
- Configure health checks
- Investigate startup failures
- Verify application readiness
- Restart dependent services
- Review compose changes

---

# 10. Production Best Practices

- Use depends_on only for startup order.
- Configure health checks for every service.
- Implement retry logic inside applications.
- Never assume running means healthy.
- Validate dependencies during CI/CD.
- Document service relationships.

---

# 11. Security

Although depends_on is not directly a security feature,

Always

- Keep internal dependencies on private networks.
- Avoid exposing internal services.
- Restrict unnecessary communication.

---

# 12. Troubleshooting

List services

```bash
docker compose ps
```

View logs

```bash
docker compose logs
```

Restart dependent service

```bash
docker compose restart api-gateway
```

Inspect health

```bash
docker inspect auth-service
```

Verify health endpoint

```bash
curl http://localhost:5000/health
```

---

# 13. Real Production Scenarios

## Scenario 1

Deployment completed.

API Gateway continuously exits.

Investigation

```bash
docker compose ps

docker compose logs api-gateway

docker compose logs auth-service
```

Root Cause

Auth Service container started but Flask application was still initializing.

depends_on worked correctly.

Application readiness was the real problem.

---

## Scenario 2

Database migration takes 45 seconds.

API starts immediately.

Connection fails.

Investigation

```bash
docker compose logs postgres

docker compose logs api-gateway
```

Root Cause

Database startup completed after API initialization.

Application retry logic was missing.

---

## Scenario 3

Everything appears healthy.

Users receive HTTP 503.

Investigation

```bash
docker compose ps

docker inspect api-gateway

curl http://localhost:8080/health
```

Root Cause

Container running.

Health endpoint failing.

Application startup incomplete.

---

## Scenario 4

Developer reports

```
depends_on is not working.
```

Investigation

```bash
docker compose logs

docker inspect
```

Root Cause

depends_on worked exactly as designed.

Developer expected readiness checking instead of startup ordering.

---

# 14. Scenario Interview Q&A

**Q1. What does depends_on do?**

A:

It controls the startup order of containers.

---

**Q2. Does depends_on wait until the application becomes healthy?**

No.

It waits only until the dependency container has started.

Application readiness must be handled separately.

---

**Q3. How do enterprises solve this limitation?**

Using

- Health Checks
- Retry Logic
- Readiness Probes
- Startup Probes
- Circuit Breakers

---

# 15. Architecture Interview Q&A

**Q1. Why is depends_on insufficient for production?**

Because production systems require application readiness, not just container startup.

---

**Q2. What replaces depends_on in Kubernetes?**

- Readiness Probe
- Startup Probe
- Init Containers
- Service Discovery

---

# 16. Production Support Interview Q&A

**Q1. API container is restarting immediately after deployment. Investigation order?**

1.

```bash
docker compose ps
```

2.

```bash
docker compose logs api-gateway
```

3.

```bash
docker compose logs auth-service
```

4.

```bash
docker inspect
```

5.

Health endpoint verification

6.

Dependency validation

7.

Application retry verification

---

**Q2. Why does restarting the API container fix the issue temporarily?**

Because the dependency application finishes initialization during the restart interval.

The second startup succeeds after dependencies become ready.

---

# 17. Related Runbooks

- docker-compose-service-failure.md
- docker-health-check-failures.md
- docker-container-crash-loop.md

---

# 18. Common Incidents

- Dependency Startup Failure
- Database Initialization Delay
- Service Crash Loop
- Health Check Failure
- Application Startup Failure

---

# 19. Commands

View services

```bash
docker compose ps
```

View logs

```bash
docker compose logs
```

Restart service

```bash
docker compose restart api-gateway
```

Inspect container

```bash
docker inspect api-gateway
```

Verify health

```bash
curl http://localhost:8080/health
```

---

# 20. Marathi Quick Revision

- depends_on फक्त startup order नियंत्रित करतो.
- Application ready आहे याची खात्री करत नाही.
- Health Check आवश्यक आहे.
- Retry Logic production मध्ये महत्त्वाची आहे.
- Running म्हणजे Healthy असे नसते.

---

# 21. Marathi Summary (5+ Experience Revision)

## Interview Summary

**depends_on** म्हणजे startup dependency.

याचा अर्थ फक्त dependency container आधी start होईल.

याचा अर्थ application ready झाली आहे असा नाही.

Production मध्ये readiness verify करण्यासाठी Health Checks, Retry Logic आणि Kubernetes Readiness Probes वापरले जातात.

### Production Investigation Flow

```
docker compose ps

↓

docker compose logs

↓

docker inspect

↓

Health Check

↓

Dependency Verification

↓

Retry Logic

↓

Root Cause Analysis

↓

Permanent Fix
```

### 5+ Years Interview Tip

जर interviewer म्हणाला,

**"depends_on दिलंय तरी API startup मध्ये fail होत आहे. का?"**

उत्तर:

"depends_on only guarantees container startup order. It does not wait for the dependency application to become ready. In production, I verify health checks, application readiness, startup timing, and retry logic before concluding the issue."

हे उत्तर senior DevOps engineer level understanding दर्शवते.

