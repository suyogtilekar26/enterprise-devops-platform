# Docker Runbook 01 - Docker Engine Service Down

# Purpose

Provide a standardized procedure to investigate and recover a Docker Engine outage on Linux hosts.

---

# Severity

**Typical Severity:** SEV-2

Escalate to SEV-1 if multiple production services are affected.

---

# Symptoms

- Containers cannot start
- `docker ps` fails
- CI/CD pipelines fail during Docker build
- Docker Compose deployments fail
- Kubernetes nodes using Docker (legacy environments) cannot build images

---

# Prerequisites

- SSH access to the server
- sudo privileges
- Access to system logs
- Docker installed

---

# Investigation

## Step 1 - Verify Docker Service

```bash
systemctl status docker
```

---

## Step 2 - Check Docker Version

```bash
docker version
```

If the daemon is unavailable you may see:

```
Cannot connect to the Docker daemon
```

---

## Step 3 - Check Service Logs

```bash
journalctl -u docker -n 100
```

---

## Step 4 - Check Disk Usage

```bash
df -h
```

---

## Step 5 - Verify Docker Storage

```bash
docker system df
```

If the daemon is unavailable, continue investigating the service.

---

## Step 6 - Verify Docker Socket

```bash
ls -l /var/run/docker.sock
```

---

## Step 7 - Verify Container Runtime

```bash
systemctl status containerd
```

---

# Resolution

## Restart containerd

```bash
sudo systemctl restart containerd
```

---

## Restart Docker

```bash
sudo systemctl restart docker
```

---

## Verify

```bash
systemctl status docker
```

---

## Test Docker

```bash
docker ps
```

---

## Start Required Containers

```bash
docker compose up -d
```

or

```bash
docker start <container-name>
```

---

# Verification

Verify

```bash
docker ps
```

Verify images

```bash
docker images
```

Verify Compose

```bash
docker compose ps
```

Verify application endpoints

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

If Docker fails after configuration changes

Restore previous configuration

```bash
sudo cp /etc/docker/daemon.json.bak /etc/docker/daemon.json
```

Restart

```bash
sudo systemctl restart docker
```

---

# Escalation

Escalate when

- Docker repeatedly crashes
- Filesystem corruption detected
- containerd fails to start
- Storage driver errors persist
- Production services remain unavailable

---

# Post-Incident Tasks

- Document timeline
- Capture Docker logs
- Record root cause
- Verify monitoring alerts
- Review disk utilization
- Update incident documentation if required

---

# Common Root Causes

- Docker daemon crash
- Full filesystem
- Corrupted Docker metadata
- containerd failure
- Invalid daemon configuration
- Permission issues
- Kernel upgrade requiring reboot

---

# Useful Commands

Service status

```bash
systemctl status docker
```

Restart

```bash
sudo systemctl restart docker
```

Logs

```bash
journalctl -u docker -f
```

Disk

```bash
df -h
```

Docker information

```bash
docker info
```

Processes

```bash
ps -ef | grep dockerd
```

