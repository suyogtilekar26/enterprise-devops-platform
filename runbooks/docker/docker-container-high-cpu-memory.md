# Docker Runbook 09 - Docker Container High CPU / Memory Usage

# Purpose

Provide a standardized procedure to investigate and resolve Docker containers experiencing excessive CPU or memory utilization.

---

# Severity

**Typical Severity:** SEV-2

Escalate to SEV-1 if production services become unavailable or multiple business-critical applications are impacted.

---

# Symptoms

- High CPU utilization
- High memory consumption
- Slow application response
- Container killed unexpectedly
- Out Of Memory (OOM) events
- Kubernetes pod restarts (future deployments)
- Host performance degradation

---

# Prerequisites

- SSH access
- Docker installed
- Docker Compose installed (if applicable)
- Access to application logs

---

# Investigation

## Step 1 - Verify Running Containers

```bash
docker ps
```

---

## Step 2 - Check Resource Usage

```bash
docker stats
```

Review

- CPU %
- Memory Usage
- Memory Limit
- Network I/O
- Block I/O

---

## Step 3 - Identify High Resource Container

Example

```
api-gateway

CPU: 250%

Memory: 1.8 GB
```

---

## Step 4 - Inspect Container

```bash
docker inspect <container-name>
```

Review

- Memory limits
- CPU limits
- Restart policy
- Health status

---

## Step 5 - Review Logs

```bash
docker logs --tail 200 <container-name>
```

Look for

- Exceptions
- Infinite loops
- Connection failures
- Memory allocation errors

---

## Step 6 - Check Host Resources

```bash
free -h
```

```bash
top
```

or

```bash
htop
```

---

## Step 7 - Check OOM Events

```bash
dmesg | grep -i oom
```

or

```bash
journalctl -k | grep -i oom
```

---

## Step 8 - Review Application Metrics

Verify

- Request rate
- Traffic spikes
- Background jobs
- Scheduled tasks

---

## Step 9 - Verify Container Limits

```bash
docker inspect <container-name> \
--format '{{json .HostConfig}}'
```

Review

- Memory
- NanoCpus

---

## Step 10 - Verify Recent Deployment

Determine whether

- New application version deployed
- Configuration changed
- Increased production traffic
- Background jobs introduced

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

## Scale Down Load

If applicable

Reduce incoming traffic temporarily.

---

## Increase Resource Limits

Update compose configuration.

Example

```yaml
services:
  api-gateway:
    mem_limit: 512m
    cpus: "1.0"
```

Redeploy

```bash
docker compose up -d
```

---

## Fix Application Issue

Investigate

- Memory leak
- Infinite loop
- Expensive queries
- Excessive logging
- Large file processing

---

# Verification

Monitor

```bash
docker stats
```

Verify

```bash
docker ps
```

Verify application

```bash
curl http://localhost:8080/health
```

```bash
curl http://localhost:5000/health
```

```bash
curl http://localhost:5001/health
```

Observe resource usage for several minutes.

---

# Rollback

If issue started after deployment

Restore previous image.

```bash
docker compose down

docker compose up -d
```

using the previous stable image version.

---

# Escalation

Escalate when

- Memory leak persists
- Host resources exhausted
- OOM events continue
- Multiple containers affected
- Root cause cannot be identified
- Production SLA is impacted

---

# Post-Incident Tasks

- Document resource utilization
- Capture Docker statistics
- Save application logs
- Record root cause
- Review resource limits
- Review monitoring dashboards
- Update incident documentation

---

# Common Root Causes

- Memory leak
- Infinite processing loop
- High request volume
- Unoptimized database queries
- Large file uploads
- Excessive logging
- Missing CPU limits
- Missing memory limits
- Background job failures
- Application bug

---

# Useful Commands

Running containers

```bash
docker ps
```

Resource usage

```bash
docker stats
```

Logs

```bash
docker logs <container-name>
```

Inspect

```bash
docker inspect <container-name>
```

Host memory

```bash
free -h
```

Processes

```bash
top
```

Restart

```bash
docker restart <container-name>
```

Compose restart

```bash
docker compose restart <service-name>
```

