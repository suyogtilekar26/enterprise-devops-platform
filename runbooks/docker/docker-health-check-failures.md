# Docker Runbook 10 - Docker Health Check Failures

# Purpose

Provide a standardized procedure to investigate and resolve Docker container health check failures before they impact application availability.

---

# Severity

**Typical Severity:** SEV-2

Escalate to SEV-1 if multiple production services become unhealthy or customer-facing applications are unavailable.

---

# Symptoms

- Container status shows **unhealthy**
- Docker Compose reports unhealthy services
- Health endpoint returns HTTP 500
- Service repeatedly restarts
- Downstream services cannot communicate
- Monitoring alerts for unhealthy containers

---

# Prerequisites

- SSH access
- Docker installed
- Docker Compose installed (if applicable)
- Access to application logs

---

# Investigation

## Step 1 - Verify Container Status

```bash
docker ps
```

Look for

```
STATUS

Up 5 minutes (unhealthy)
```

---

## Step 2 - Inspect Health Information

```bash
docker inspect <container-name>
```

Review

```
State
Health
```

---

## Step 3 - Display Health Status

```bash
docker inspect \
--format='{{json .State.Health}}' \
<container-name>
```

Review

- Status
- FailingStreak
- Log

---

## Step 4 - Verify Health Endpoint

Example

```bash
curl http://localhost:8080/health
```

or

```bash
curl http://localhost:5000/health
```

---

## Step 5 - Review Container Logs

```bash
docker logs --tail 200 <container-name>
```

Look for

- Startup failures
- Exceptions
- Database connection failures
- Timeout errors

---

## Step 6 - Verify Resource Usage

```bash
docker stats
```

Ensure CPU and memory are within expected limits.

---

## Step 7 - Verify Network Connectivity

```bash
docker exec -it <container-name> sh
```

Test connectivity to dependent services.

```bash
ping auth-service
```

Exit

```bash
exit
```

---

## Step 8 - Review Health Check Configuration

Inspect the image.

```bash
docker inspect <container-name>
```

Verify

- Test
- Interval
- Timeout
- Retries
- StartPeriod

---

## Step 9 - Verify Application Startup Time

Determine whether the application requires more startup time than configured.

---

## Step 10 - Verify Dependencies

Confirm dependent services are healthy.

```bash
docker compose ps
```

---

# Resolution

## Restart Container

```bash
docker restart <container-name>
```

---

## Restart Compose Service

```bash
docker compose restart <service-name>
```

---

## Increase Health Check Start Period

Example

```yaml
healthcheck:
  test: ["CMD","curl","-f","http://localhost:8080/health"]
  interval: 30s
  timeout: 5s
  retries: 3
  start_period: 60s
```

Redeploy the application.

---

## Resolve Application Errors

Fix

- Configuration issues
- Dependency failures
- Database connectivity
- Startup exceptions

---

# Verification

Verify container status.

```bash
docker ps
```

Expected

```
Up (healthy)
```

Verify endpoint.

```bash
curl http://localhost:8080/health
```

Review health details.

```bash
docker inspect \
--format='{{json .State.Health}}' \
<container-name>
```

---

# Rollback

If the issue started after deployment

- Restore the previous image
- Restore the previous Compose configuration
- Redeploy

```bash
docker compose down

docker compose up -d
```

---

# Escalation

Escalate when

- Health checks continue failing
- Root cause cannot be identified
- Multiple services are unhealthy
- Infrastructure issues are suspected
- Production SLA is impacted

---

# Post-Incident Tasks

- Capture container logs
- Record failing health checks
- Document root cause
- Verify monitoring alerts
- Review health check configuration
- Update operational documentation

---

# Common Root Causes

- Application startup failure
- Database unavailable
- Dependency unavailable
- Incorrect health endpoint
- Startup timeout too short
- Resource exhaustion
- Network connectivity issue
- Application crash
- Invalid configuration

---

# Useful Commands

Container status

```bash
docker ps
```

Inspect

```bash
docker inspect <container-name>
```

Logs

```bash
docker logs <container-name>
```

Statistics

```bash
docker stats
```

Restart

```bash
docker restart <container-name>
```

Compose status

```bash
docker compose ps
```

Compose logs

```bash
docker compose logs
```

