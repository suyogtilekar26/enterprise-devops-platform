# Docker Compose Container Lifecycle

# 1. Purpose

Container Lifecycle describes every stage a container goes through from creation to removal.

Understanding the lifecycle is essential for troubleshooting deployments, startup failures, crash loops, upgrades, rollbacks, and production incidents.

A senior DevOps engineer should always know where a container currently is in its lifecycle before beginning investigation.

---

# 2. Introduction

Every container follows a lifecycle.

```
Image

↓

Container Created

↓

Container Started

↓

Application Running

↓

Healthy

↓

Stopped

↓

Removed
```

At any stage, failures may occur.

Understanding each stage helps identify the exact failure point.

---

# 3. Enterprise Usage

Production deployments constantly perform lifecycle operations.

Examples

- Daily deployments
- Rolling updates
- Rollbacks
- Host reboot recovery
- Disaster recovery
- Blue-Green deployment
- Canary deployment

Every deployment moves containers through the lifecycle.

---

# 4. Usage in THIS Project

Lifecycle for our platform

```
GitHub Actions

↓

Docker Image

↓

Docker Compose

↓

Frontend Container

↓

API Gateway

↓

Auth Service

↓

Dashboard Service

↓

Healthy

↓

Serving Users
```

Future Kubernetes deployments will use the same lifecycle concepts with Pods.

---

# 5. Architecture

```
Docker Image

        │

docker compose up

        │

Container Created

        │

Container Started

        │

Health Check

        │

Healthy

        │

Serving Requests

        │

Application Stops

        │

Container Exits

        │

Restart Policy

        │

Restart or Remove
```

---

# 6. Internal Workflow

Docker Image

↓

Container Creation

↓

Network Attached

↓

Volumes Mounted

↓

Environment Variables Loaded

↓

Application Starts

↓

Health Check Runs

↓

Traffic Accepted

↓

Container Stops

↓

Restart Policy Evaluated

↓

Container Removed

---

# 7. Lifecycle States

## Created

Container exists.

Application has not started.

---

## Running

Container process is executing.

---

## Healthy

Application successfully passes health checks.

---

## Unhealthy

Container is running.

Application is not healthy.

---

## Exited

Application process finished.

---

## Restarting

Restart policy is attempting recovery.

---

## Removed

Container deleted.

Resources released.

---

# 8. Lifecycle Commands

Create and Start

```bash
docker compose up -d
```

Stop

```bash
docker compose stop
```

Start Again

```bash
docker compose start
```

Restart

```bash
docker compose restart
```

Remove

```bash
docker compose down
```

Destroy Everything

```bash
docker compose down -v
```

---

# 9. Daily DevOps Activities

- Monitor container states
- Review startup failures
- Investigate restart loops
- Verify health checks
- Restart failed services
- Remove obsolete containers
- Validate deployments

---

# 10. Production Best Practices

- Monitor every lifecycle transition.
- Investigate unexpected exits immediately.
- Never ignore restart loops.
- Use health checks.
- Use restart policies.
- Maintain deployment history.
- Automate lifecycle monitoring.

---

# 11. Security

- Remove unused containers.
- Remove orphan containers.
- Remove unused volumes.
- Audit deployment changes.
- Restrict Docker administrative access.

---

# 12. Troubleshooting

View running containers

```bash
docker ps
```

View all containers

```bash
docker ps -a
```

Inspect lifecycle

```bash
docker inspect api-gateway
```

View logs

```bash
docker compose logs api-gateway
```

Restart

```bash
docker compose restart api-gateway
```

---

# 13. Real Production Scenarios

## Scenario 1

Deployment succeeds.

Container immediately exits.

Investigation

```bash
docker ps -a

docker compose logs api-gateway
```

Root Cause

Application startup exception.

---

## Scenario 2

Container repeatedly cycles between

```
Running

↓

Restarting

↓

Exited
```

Investigation

```bash
docker inspect

docker compose logs
```

Root Cause

Missing environment variable.

---

## Scenario 3

Container remains

```
Running

↓

Unhealthy
```

Investigation

```bash
docker inspect

curl http://localhost:8080/health
```

Root Cause

Health endpoint returning HTTP 500.

---

## Scenario 4

Deployment leaves dozens of stopped containers.

Investigation

```bash
docker ps -a
```

Root Cause

Old deployments were never cleaned up.

---

# 14. Scenario Interview Q&A

**Q1. What is the container lifecycle?**

A:

The sequence of states a container passes through from creation until removal.

---

**Q2. Is Running the same as Healthy?**

No.

Running means the process exists.

Healthy means the application is functioning correctly.

---

**Q3. Which lifecycle state usually requires immediate investigation?**

Restarting

because repeated restarts usually indicate an application or configuration issue.

---

# 15. Architecture Interview Q&A

**Q1. Why monitor lifecycle events?**

Lifecycle transitions help identify deployment failures, crash loops, resource issues, and unhealthy applications.

---

**Q2. Which lifecycle stages are most important during deployment?**

- Created
- Running
- Healthy

These determine whether the application is ready to serve users.

---

# 16. Production Support Interview Q&A

**Q1. Deployment completed but application is unavailable. Investigation order?**

1.

```bash
docker ps -a
```

2.

```bash
docker inspect
```

3.

```bash
docker compose logs
```

4.

Health Check

5.

Environment Variables

6.

Dependency Verification

7.

Root Cause Analysis

---

**Q2. Container continuously restarts. What should you investigate?**

- Exit code
- Logs
- Health checks
- Environment variables
- Dependencies
- Resource limits
- Recent deployment changes

---

# 17. Related Runbooks

- docker-container-crash-loop.md
- docker-health-check-failures.md
- docker-compose-service-failure.md

---

# 18. Common Incidents

- Startup Failure
- Crash Loop
- Health Check Failure
- Restart Loop
- Orphan Containers

---

# 19. Commands

View running containers

```bash
docker ps
```

View all containers

```bash
docker ps -a
```

Inspect container

```bash
docker inspect api-gateway
```

Restart service

```bash
docker compose restart api-gateway
```

Remove deployment

```bash
docker compose down
```

Remove deployment with volumes

```bash
docker compose down -v
```

---

# 20. Marathi Quick Revision

- Container ला पूर्ण lifecycle असतो.
- Running म्हणजे Healthy नाही.
- Restart Loop लगेच investigate करावा.
- docker inspect आणि docker compose logs हे सर्वात महत्त्वाचे commands आहेत.
- Production मध्ये lifecycle monitoring आवश्यक आहे.

---

# 21. Marathi Summary (5+ Experience Revision)

## Interview Summary

Container Lifecycle म्हणजे container तयार होण्यापासून ते remove होईपर्यंतचा संपूर्ण प्रवास.

Production incident मध्ये container कोणत्या lifecycle state मध्ये आहे हे ओळखणे ही investigation ची पहिली पायरी असते.

### Production Investigation Flow

```
Incident

↓

docker ps -a

↓

Container State

↓

docker inspect

↓

docker compose logs

↓

Health Check

↓

Environment Variables

↓

Dependency Check

↓

Root Cause Analysis

↓

Permanent Fix
```

### Production Story

एका production deployment नंतर monitoring मध्ये API Down alert आला.

`docker ps -a` मध्ये container सतत Restarting state मध्ये दिसत होता.

`docker compose logs` मध्ये JWT_SECRET missing असल्याचे आढळले.

CI/CD pipeline मध्ये production secret inject झाला नव्हता.

Secret configuration दुरुस्त केल्यानंतर container Healthy झाला आणि service restore झाली.

### 5+ Years Memory Trick

जर interviewer विचारेल,

**"Container deployment नंतर लगेच unavailable झाला. Investigation कुठून सुरू कराल?"**

उत्तर:

"मी प्रथम container lifecycle state (`docker ps -a`) तपासेन. त्यानंतर `docker inspect`, `docker compose logs`, health checks, environment variables, dependencies आणि restart history verify करेन. Lifecycle state मला failure कोणत्या टप्प्यावर झाला आहे हे लगेच सांगते, त्यामुळे RCA जलद करता येते."

