# Docker Runbook 02 - Docker Container Crash Loop

# Purpose

Provide a standardized procedure to investigate and recover Docker containers that repeatedly exit and restart.

---

# Severity

**Typical Severity:** SEV-2

Escalate to SEV-1 if critical production services are unavailable.

---

# Symptoms

- Container continuously restarts
- Application unavailable
- High CPU usage from repeated container restarts
- Docker Compose reports restarting containers
- Health checks continuously fail

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
docker ps -a
```

Look for

```
Restarting
Exited
Created
```

---

## Step 2 - View Logs

```bash
docker logs <container-name>
```

Or

```bash
docker logs --tail 100 <container-name>
```

---

## Step 3 - Inspect Container

```bash
docker inspect <container-name>
```

Review

- ExitCode
- RestartPolicy
- Mounts
- Environment
- Image

---

## Step 4 - Verify Restart Count

```bash
docker inspect <container-name> \
--format='{{.RestartCount}}'
```

---

## Step 5 - Check Resource Usage

```bash
docker stats
```

---

## Step 6 - Verify Image

```bash
docker images
```

---

## Step 7 - Verify Environment Variables

```bash
docker inspect <container-name> \
--format='{{json .Config.Env}}'
```

---

## Step 8 - Verify Mounted Volumes

```bash
docker inspect <container-name>
```

Review

```
Mounts
```

---

## Step 9 - Verify Network

```bash
docker network ls
```

```bash
docker inspect <network-name>
```

---

## Step 10 - Verify Health Status

```bash
docker inspect <container-name> \
--format='{{json .State.Health}}'
```

If configured.

---

# Resolution

## Stop Container

```bash
docker stop <container-name>
```

---

## Remove Container

```bash
docker rm <container-name>
```

---

## Verify Configuration

Review

- Environment variables
- Ports
- Volumes
- Startup command
- Dockerfile

---

## Recreate Container

Example

```bash
docker compose up -d
```

or

```bash
docker run ...
```

---

## Monitor Logs

```bash
docker logs -f <container-name>
```

---

# Verification

Verify

```bash
docker ps
```

Verify restart count

```bash
docker inspect <container-name> \
--format='{{.RestartCount}}'
```

Expected

```
0
```

Verify endpoints

```bash
curl http://localhost:8080
```

```bash
curl http://localhost:5000/health
```

```bash
curl http://localhost:5001/health
```

---

# Rollback

If the issue started after a deployment

Use previous image

```bash
docker images
```

Run previous version

```bash
docker run <previous-image>
```

Or

```bash
docker compose down

docker compose up -d
```

using the previous Compose configuration.

---

# Escalation

Escalate when

- Root cause cannot be identified
- Application binary is corrupted
- Container crashes immediately after startup
- Multiple services fail simultaneously
- Production outage exceeds SLA

---

# Post-Incident Tasks

- Capture container logs
- Record exit code
- Document root cause
- Review health check configuration
- Verify monitoring alerts
- Update incident documentation

---

# Common Root Causes

- Missing environment variables
- Incorrect startup command
- Missing dependencies
- Invalid application configuration
- Database connectivity failure
- Port conflicts
- Permission issues
- Failed health checks
- Out-of-memory termination

---

# Useful Commands

Containers

```bash
docker ps -a
```

Logs

```bash
docker logs <container-name>
```

Inspect

```bash
docker inspect <container-name>
```

Statistics

```bash
docker stats
```

Restart

```bash
docker restart <container-name>
```

Compose

```bash
docker compose ps
```

```bash
docker compose logs
```

