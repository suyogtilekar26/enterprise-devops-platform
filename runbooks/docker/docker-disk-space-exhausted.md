# Docker Runbook 08 - Docker Disk Space Exhausted

# Purpose

Provide a standardized procedure to investigate and recover from Docker disk space exhaustion affecting image builds, container execution, and deployments.

---

# Severity

**Typical Severity:** SEV-2

Escalate to SEV-1 if production workloads are impacted or critical deployments are blocked.

---

# Symptoms

- `docker build` fails with "no space left on device"
- Containers fail to start
- Docker daemon becomes unstable
- Image pulls fail
- CI/CD pipelines fail during image build
- Host filesystem reaches 100% utilization

---

# Prerequisites

- SSH access
- Docker installed
- sudo privileges
- Access to Docker host

---

# Investigation

## Step 1 - Verify Disk Usage

```bash
df -h
```

Identify filesystems nearing or at 100% utilization.

---

## Step 2 - Review Docker Disk Usage

```bash
docker system df
```

Review

- Images
- Containers
- Volumes
- Build Cache

---

## Step 3 - List Images

```bash
docker images
```

Look for

- Large images
- Old images
- Untagged images

---

## Step 4 - List Containers

```bash
docker ps -a
```

Identify stopped containers.

---

## Step 5 - List Volumes

```bash
docker volume ls
```

Review unused volumes.

---

## Step 6 - Check Build Cache

```bash
docker builder prune --dry-run
```

---

## Step 7 - Verify Docker Root Directory

```bash
docker info
```

Review

```
Docker Root Dir
```

---

## Step 8 - Identify Large Directories

```bash
sudo du -sh /var/lib/docker/*
```

---

## Step 9 - Review System Logs

```bash
journalctl -u docker -n 100
```

Look for storage-related errors.

---

## Step 10 - Verify Running Workloads

```bash
docker ps
```

Ensure active production containers are identified before cleanup.

---

# Resolution

## Remove Stopped Containers

```bash
docker container prune
```

---

## Remove Unused Images

```bash
docker image prune
```

---

## Remove Unused Networks

```bash
docker network prune
```

---

## Remove Unused Volumes

**Use with caution.**

```bash
docker volume prune
```

---

## Remove Build Cache

```bash
docker builder prune
```

---

## Remove All Unused Docker Resources

Only after verifying nothing important will be deleted.

```bash
docker system prune
```

---

## Remove Everything Including Unused Volumes

**Production approval required.**

```bash
docker system prune -a --volumes
```

---

# Verification

Verify available disk space.

```bash
df -h
```

Verify Docker usage.

```bash
docker system df
```

Verify running containers.

```bash
docker ps
```

Verify application health.

```bash
curl http://localhost:8080/health
```

```bash
curl http://localhost:5000/health
```

```bash
curl http://localhost:5001/health
```

---

# Rollback

If required resources were accidentally removed

- Pull required images again
- Restore persistent data from backups if volumes were removed
- Redeploy the application

Example

```bash
docker compose up -d
```

---

# Escalation

Escalate when

- Filesystem remains full after cleanup
- Storage hardware failure is suspected
- Docker metadata is corrupted
- Production data may have been removed
- Host requires storage expansion

---

# Post-Incident Tasks

- Document reclaimed storage
- Record root cause
- Review image retention policy
- Review cleanup procedures
- Configure automated cleanup where appropriate
- Update monitoring thresholds

---

# Common Root Causes

- Excessive unused images
- Accumulated build cache
- Stopped containers
- Unused volumes
- Large application logs
- CI/CD build artifacts
- Oversized Docker images
- Lack of cleanup policy

---

# Useful Commands

Filesystem usage

```bash
df -h
```

Docker usage

```bash
docker system df
```

Prune containers

```bash
docker container prune
```

Prune images

```bash
docker image prune
```

Prune builder cache

```bash
docker builder prune
```

System cleanup

```bash
docker system prune
```

Docker information

```bash
docker info
```

