# Docker Compose Restart Policies

# 1. Purpose

Restart Policies define how Docker should behave when a container stops unexpectedly.

Instead of requiring manual intervention, Docker automatically attempts to recover failed containers based on the configured policy.

In production environments, restart policies improve application availability and reduce downtime.

---

# 2. Introduction

Applications may stop because of

- Application crash
- Memory issues
- Unexpected exceptions
- Host reboot
- Docker daemon restart
- Manual stop
- Dependency failures

Without restart policies

```
Application Crash

↓

Container Stops

↓

Application Down

↓

Manual Recovery Required
```

With restart policies

```
Application Crash

↓

Docker Detects Failure

↓

Container Restarted

↓

Application Available Again
```

---

# 3. Enterprise Usage

Almost every production container has a restart policy.

Common services

- API Gateway
- Authentication Service
- Dashboard Service
- Nginx
- Redis
- Prometheus
- Grafana

Critical applications should automatically recover whenever possible.

---

# 4. Usage in THIS Project

Every service will use an appropriate restart policy.

```
Frontend

↓

API Gateway

↓

Auth Service

↓

Dashboard Service

↓

Monitoring Stack
```

This ensures services recover automatically after failures or server reboots.

---

# 5. Architecture

```
Application Crash

        │

        ▼

Docker Engine

        │

Restart Policy Evaluated

        │

Restart Required?

     │             │

    Yes            No

     │             │

Restart        Container Stopped
```

---

# 6. Internal Workflow

Application Starts

↓

Application Crashes

↓

Docker Detects Exit

↓

Reads Restart Policy

↓

Restarts Container

↓

Health Check Executes

↓

Application Available

---

# 7. Restart Policy Types

## no

Default behavior.

Docker never restarts the container.

Example

```yaml
restart: "no"
```

---

## always

Docker always restarts the container.

Even after Docker daemon restart.

Example

```yaml
restart: always
```

---

## unless-stopped

Recommended for production.

Docker restarts containers unless they were intentionally stopped.

Example

```yaml
restart: unless-stopped
```

---

## on-failure

Restarts only when the application exits with a non-zero exit code.

Example

```yaml
restart: on-failure
```

---

# 8. Which Policy Should Be Used?

Development

```
no
```

Internal Utilities

```
on-failure
```

Production Applications

```
unless-stopped
```

Critical Infrastructure

```
always
```

---

# 9. Daily DevOps Activities

- Verify restart policies
- Investigate repeated restarts
- Review crash logs
- Validate application health
- Tune restart configuration
- Review deployment failures
- Monitor restart counts

---

# 10. Production Best Practices

- Use **unless-stopped** for production services.
- Combine restart policies with health checks.
- Never rely only on restart policies to fix application bugs.
- Monitor restart frequency.
- Investigate repeated crashes immediately.
- Configure proper logging.

---

# 11. Security

Restart policies improve availability but do not improve security.

Always

- Investigate repeated crashes.
- Avoid infinite restart loops.
- Review application logs after every unexpected restart.

---

# 12. Troubleshooting

View running containers

```bash
docker ps
```

View restart count

```bash
docker inspect api-gateway
```

View logs

```bash
docker compose logs api-gateway
```

Restart service manually

```bash
docker compose restart api-gateway
```

Verify compose configuration

```bash
docker compose config
```

---

# 13. Real Production Scenarios

## Scenario 1

Production server rebooted.

Containers never started.

Investigation

```bash
docker ps -a

docker inspect api-gateway
```

Root Cause

Restart policy not configured.

---

## Scenario 2

Container restarts every 30 seconds.

Investigation

```bash
docker compose logs api-gateway

docker inspect api-gateway
```

Root Cause

Application crash due to missing environment variable.

Restart policy worked correctly.

Application configuration was incorrect.

---

## Scenario 3

Application randomly stops overnight.

Investigation

```bash
docker ps -a

docker compose logs
```

Root Cause

Restart policy configured as

```
no
```

---

## Scenario 4

Container continuously restarts.

Monitoring generates alerts.

Investigation

```bash
docker inspect

docker compose logs

docker stats
```

Root Cause

Database unavailable.

API exited immediately.

Restart policy created a restart loop.

---

# 14. Scenario Interview Q&A

**Q1. Which restart policy is recommended for production?**

A:

```
unless-stopped
```

because containers recover automatically while respecting intentional administrative stops.

---

**Q2. Can restart policies fix application bugs?**

No.

They only restart containers.

They do not resolve the underlying application issue.

---

**Q3. Why monitor restart count?**

Frequent restarts usually indicate application instability, dependency failures, or resource problems.

---

# 15. Architecture Interview Q&A

**Q1. Why combine restart policies with health checks?**

Restart policies recover failed containers.

Health checks verify application availability.

Together they improve reliability.

---

**Q2. Why not use "always" for every container?**

Some maintenance operations require containers to remain intentionally stopped.

`unless-stopped` provides better operational control.

---

# 16. Production Support Interview Q&A

**Q1. Container keeps restarting. Investigation order?**

1.

```bash
docker ps -a
```

2.

```bash
docker compose logs
```

3.

```bash
docker inspect
```

4.

```bash
docker stats
```

5.

Health Check Verification

6.

Dependency Verification

7.

Root Cause Analysis

---

**Q2. Host rebooted but application didn't recover. What will you check?**

- Restart policy
- Docker service status
- Container exit code
- Compose configuration
- Docker daemon logs
- Application logs

---

# 17. Related Runbooks

- docker-container-crash-loop.md
- docker-engine-service-down.md
- docker-health-check-failures.md

---

# 18. Common Incidents

- Container Crash Loop
- Missing Restart Policy
- Application Startup Failure
- Dependency Failure
- Docker Engine Restart

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

Inspect restart configuration

```bash
docker inspect api-gateway
```

Restart service

```bash
docker compose restart api-gateway
```

View logs

```bash
docker compose logs -f
```

---

# 20. Marathi Quick Revision

- Restart Policy म्हणजे container crash झाल्यावर Docker काय करणार.
- Production मध्ये `unless-stopped` सर्वाधिक वापरले जाते.
- Restart म्हणजे issue fix झाला असे नाही.
- Logs तपासल्याशिवाय restart loop ignore करू नये.
- Health Check + Restart Policy ही best combination आहे.

---

# 21. Marathi Summary (5+ Experience Revision)

## Interview Summary

Restart Policy Docker ला सांगते की container unexpectedly बंद झाल्यास काय करायचे.

Production मध्ये `unless-stopped` हा सर्वात सामान्य पर्याय आहे.

जर container वारंवार restart होत असेल, तर restart policy नाही तर application issue investigate करणे आवश्यक असते.

### Production Investigation Flow

```
docker ps -a

↓

docker compose logs

↓

docker inspect

↓

docker stats

↓

Health Check

↓

Dependency Check

↓

Root Cause Analysis

↓

Permanent Fix
```

### 5+ Years Interview Tip

जर interviewer म्हणाला,

**"Container सतत restart होत आहे. तुम्ही काय कराल?"**

उत्तर:

"Restart policy verify करेन, पण त्यापूर्वी exit reason, application logs, health check status, dependency availability, resource usage आणि recent deployment changes तपासेन. Restart loop हा symptom आहे; root cause शोधणे हे मुख्य काम आहे."

