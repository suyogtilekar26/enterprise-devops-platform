# Docker Runbook 04 - Docker Compose Service Failure

# Purpose

Provide a standardized procedure to investigate and recover one or more services that fail to start or become unhealthy in a Docker Compose deployment.

---

# Severity

**Typical Severity:** SEV-2

Escalate to SEV-1 if customer-facing services are unavailable or multiple business-critical services are impacted.

---

# Symptoms

- One or more Compose services are not running
- `docker compose up` exits with errors
- Services restart continuously
- Application endpoints are unavailable
- Dependent services fail to communicate
- Health checks fail

---

# Prerequisites

- SSH access (for remote systems)
- Docker installed
- Docker Compose installed
- Access to compose.yaml
- Access to application logs

---

# Investigation

## Step 1 - Verify Compose Services

```bash
docker compose ps
```

Look for

- Exited
- Restarting
- Unhealthy
- Created

---

## Step 2 - Review Service Logs

All services

```bash
docker compose logs
```

Specific service

```bash
docker compose logs api-gateway
```

---

## Step 3 - Validate Compose File

```bash
docker compose config
```

Ensure

- Valid YAML
- Correct indentation
- Correct service definitions
- Valid environment variables

---

## Step 4 - Verify Running Containers

```bash
docker ps -a
```

---

## Step 5 - Inspect Failed Container

```bash
docker inspect <container-name>
```

Review

- ExitCode
- RestartPolicy
- Health
- Mounts
- Networks

---

## Step 6 - Verify Images

```bash
docker images
```

Ensure required images exist.

---

## Step 7 - Verify Network

```bash
docker network ls
```

Inspect

```bash
docker network inspect <compose-network>
```

Verify all expected services are attached.

---

## Step 8 - Verify Volumes

```bash
docker volume ls
```

Inspect if required

```bash
docker volume inspect <volume-name>
```

---

## Step 9 - Verify Environment Variables

If using an environment file

```bash
cat .env
```

Verify required variables are present.

---

## Step 10 - Verify Port Usage

```bash
ss -tulpn
```

or

```bash
netstat -tulpn
```

Ensure host ports are not already in use.

---

# Resolution

## Stop Compose Application

```bash
docker compose down
```

---

## Validate Configuration

```bash
docker compose config
```

Correct any errors before continuing.

---

## Rebuild Images

```bash
docker compose build
```

---

## Start Services

```bash
docker compose up -d
```

---

## Restart Individual Service

```bash
docker compose restart api-gateway
```

---

## Verify Logs

```bash
docker compose logs api-gateway
```

---

# Verification

Verify service status

```bash
docker compose ps
```

Verify endpoints

```bash
curl http://localhost:5173
```

```bash
curl http://localhost:8080/health
```

```bash
curl http://localhost:5000/health
```

```bash
curl http://localhost:5001/health
```

Verify logs

```bash
docker compose logs
```

---

# Rollback

If the issue started after configuration changes

Restore the previous working

- compose.yaml
- Dockerfile
- Environment file

Restart

```bash
docker compose down

docker compose up -d
```

If images changed

```bash
docker compose pull
```

or deploy the previous image version.

---

# Escalation

Escalate when

- Multiple services fail simultaneously
- Root cause cannot be identified
- Persistent storage corruption is suspected
- Docker Engine is unstable
- Network communication remains broken after recovery
- Production outage exceeds SLA

---

# Post-Incident Tasks

- Capture Compose logs
- Document affected services
- Record root cause
- Verify monitoring alerts
- Review deployment procedure
- Update incident documentation
- Review preventive actions

---

# Common Root Causes

- Invalid compose.yaml
- Incorrect environment variables
- Missing Docker image
- Container crash loop
- Network configuration errors
- Volume mount issues
- Port conflicts
- Health check failures
- Dependency service unavailable
- Application startup errors

---

# Useful Commands

Compose status

```bash
docker compose ps
```

Compose logs

```bash
docker compose logs
```

Specific service logs

```bash
docker compose logs <service-name>
```

Restart service

```bash
docker compose restart <service-name>
```

Restart application

```bash
docker compose down

docker compose up -d
```

Validate configuration

```bash
docker compose config
```

Inspect container

```bash
docker inspect <container-name>
```

