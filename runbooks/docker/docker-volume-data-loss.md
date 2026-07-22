# Docker Runbook 06 - Docker Volume Data Loss

# Purpose

Provide a standardized procedure to investigate and recover from Docker volume data loss or missing persistent data.

---

# Severity

**Typical Severity:** SEV-1

Escalate immediately if production databases or persistent application data are affected.

---

# Symptoms

- Application data missing after container restart
- Database starts with empty data
- Grafana dashboards missing
- Prometheus metrics reset
- Files uploaded by users disappear
- Container starts successfully but application data is missing

---

# Prerequisites

- SSH access
- Docker installed
- Docker Compose installed (if applicable)
- Access to Docker host
- Access to application logs

---

# Investigation

## Step 1 - Verify Running Containers

```bash
docker ps
```

---

## Step 2 - List Volumes

```bash
docker volume ls
```

Confirm expected volumes exist.

---

## Step 3 - Inspect Volume

```bash
docker volume inspect <volume-name>
```

Verify

- Mountpoint
- Driver
- Labels
- Creation time

---

## Step 4 - Verify Container Mounts

```bash
docker inspect <container-name>
```

Review

```
Mounts
```

Ensure the expected volume is attached.

---

## Step 5 - Verify Docker Compose Configuration

```bash
docker compose config
```

Review

- volumes
- mount paths
- service configuration

---

## Step 6 - Inspect Volume Contents

Run a temporary container.

```bash
docker run --rm \
-v <volume-name>:/data \
ubuntu ls -lah /data
```

---

## Step 7 - Verify Host Storage

```bash
df -h
```

Ensure the filesystem is healthy and has available space.

---

## Step 8 - Review Application Logs

```bash
docker logs <container-name>
```

Look for

- Database initialization
- Missing file errors
- Permission denied
- Read-only filesystem

---

## Step 9 - Verify Volume Permissions

```bash
docker run --rm \
-v <volume-name>:/data \
ubuntu ls -ld /data
```

---

## Step 10 - Review Recent Changes

Determine whether

- Container recreated
- Compose file modified
- Volume removed
- Deployment performed
- Cleanup executed

---

# Resolution

## Restart Application

```bash
docker compose restart
```

or

```bash
docker restart <container-name>
```

---

## Reattach Existing Volume

Verify compose configuration.

```yaml
volumes:
  app-data:
```

Restart the application.

```bash
docker compose down

docker compose up -d
```

---

## Restore Data From Backup

Restore according to backup procedure.

Verify restored files before restarting services.

---

## Verify Correct Mount Path

Ensure the application writes to the mounted directory rather than the container filesystem.

---

## Recreate Missing Volume (Only if Empty Environment)

```bash
docker volume create <volume-name>
```

Do **not** recreate production volumes without confirming backup status.

---

# Verification

Verify volume

```bash
docker volume ls
```

Verify mounted files

```bash
docker run --rm \
-v <volume-name>:/data \
ubuntu ls -lah /data
```

Verify application

```bash
curl http://localhost:8080/health
```

Verify application data through the UI or API.

---

# Rollback

If the issue began after deployment

- Restore previous compose configuration
- Reattach original volume
- Restore latest verified backup
- Restart services

```bash
docker compose down

docker compose up -d
```

---

# Escalation

Escalate immediately when

- Production database data is missing
- Backup restoration fails
- Storage corruption is suspected
- Multiple volumes are affected
- Filesystem errors are detected

---

# Post-Incident Tasks

- Document timeline
- Preserve logs
- Verify backup integrity
- Review deployment process
- Validate monitoring alerts
- Update recovery documentation
- Perform root cause analysis

---

# Common Root Causes

- Anonymous volume recreated
- Named volume deleted
- Incorrect mount path
- Wrong compose configuration
- Container recreated without volume
- Permission issues
- Filesystem corruption
- Accidental cleanup
- Manual deletion
- Storage failure

---

# Useful Commands

List volumes

```bash
docker volume ls
```

Inspect volume

```bash
docker volume inspect <volume-name>
```

Inspect container

```bash
docker inspect <container-name>
```

List files inside volume

```bash
docker run --rm \
-v <volume-name>:/data \
ubuntu ls -lah /data
```

Compose configuration

```bash
docker compose config
```

Compose status

```bash
docker compose ps
```

Application logs

```bash
docker compose logs
```

