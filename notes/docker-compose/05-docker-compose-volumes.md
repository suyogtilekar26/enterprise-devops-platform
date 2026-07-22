# Docker Compose Volumes

# 1. Purpose

Docker Compose Volumes provide persistent storage for containers.

Containers are temporary by nature. If a container is deleted, all data stored inside the container filesystem is also removed.

Volumes ensure important application data survives:

- Container restart
- Container recreation
- Docker upgrades
- Image updates
- Application deployment

Persistent storage is mandatory in production environments.

---

# 2. Introduction

Without volumes

```
Container Deleted

↓

Application Data Lost
```

With volumes

```
Container Deleted

↓

Volume Remains

↓

New Container Uses Existing Data
```

Volumes separate application lifecycle from data lifecycle.

---

# 3. Enterprise Usage

Production applications store persistent data inside Docker volumes.

Examples

```
PostgreSQL Database

MySQL Database

Redis Persistence

Grafana Dashboards

Prometheus Metrics

Application Uploads

Log Storage
```

Every production database must use persistent storage.

---

# 4. Usage in THIS Project

Our project will eventually use volumes for

```
Grafana

↓

Dashboard Storage

Prometheus

↓

Time Series Database

Future PostgreSQL

↓

Database Storage
```

Frontend and Flask services remain mostly stateless.

Monitoring components require persistent storage.

---

# 5. Architecture

```
Container

│

▼

Docker Volume

│

▼

Host Storage

│

▼

Persistent Data
```

Even if the container is removed

```
Volume

↓

Still Exists
```

---

# 6. Internal Workflow

Compose Starts

↓

Checks Volume

↓

If Missing

↓

Creates Volume

↓

Mounts Volume

↓

Starts Container

↓

Application Reads Existing Data

---

# 7. Volume Types

## Named Volume

Recommended

Example

```yaml
volumes:

  grafana-data:
```

Mounted as

```yaml
volumes:
  - grafana-data:/var/lib/grafana
```

---

## Bind Mount

Maps host directory.

Example

```yaml
volumes:
  - ./config:/app/config
```

Useful for development.

---

## Anonymous Volume

Automatically created.

Usually avoided in production because management becomes difficult.

---

# 8. Why Named Volumes are Preferred

Advantages

- Managed by Docker
- Easier backup
- Easier restore
- Portable
- Cleaner deployments
- Better production practice

---

# 9. Daily DevOps Activities

- Create volumes
- Inspect volumes
- Backup data
- Restore data
- Remove unused volumes
- Verify mount points
- Check disk usage
- Validate persistence
- Monitor storage consumption

---

# 10. Production Best Practices

- Always use named volumes.
- Never store databases inside containers.
- Backup production volumes regularly.
- Monitor disk utilization.
- Test restore procedures.
- Document every persistent volume.
- Protect production volumes during deployments.

---

# 11. Security

Never

- Store secrets inside volumes.
- Expose volume directories publicly.
- Mount sensitive host directories.

Always

- Restrict permissions.
- Encrypt backups.
- Verify ownership.
- Backup before upgrades.

---

# 12. Troubleshooting

List volumes

```bash
docker volume ls
```

Inspect volume

```bash
docker volume inspect grafana-data
```

Inspect mounts

```bash
docker inspect grafana
```

Check disk usage

```bash
docker system df
```

Verify mount inside container

```bash
docker compose exec grafana ls /var/lib/grafana
```

---

# 13. Real Production Scenarios

## Scenario 1

After deployment

All Grafana dashboards disappeared.

Investigation

```bash
docker volume ls

docker volume inspect grafana-data

docker inspect grafana
```

Root Cause

Compose created a new empty volume because of an incorrect volume name.

---

## Scenario 2

Database starts empty.

Investigation

```bash
docker inspect postgres

docker volume ls

docker compose config
```

Root Cause

Wrong mount path.

Database initialized a fresh data directory.

---

## Scenario 3

Server disk reaches 100%.

Investigation

```bash
docker system df

df -h

docker volume ls
```

Root Cause

Old unused volumes consuming storage.

---

## Scenario 4

Container recreated.

Application data missing.

Investigation

```bash
docker inspect

docker compose config

docker volume inspect
```

Root Cause

Persistent volume accidentally removed during deployment.

---

# 14. Scenario Interview Q&A

**Q1. Why are Docker volumes required?**

A:

Because containers are ephemeral. Volumes preserve important application data beyond the lifecycle of containers.

---

**Q2. Can deleting a container delete the volume?**

No.

Volumes remain unless explicitly removed.

---

**Q3. What should always use volumes?**

- Databases
- Monitoring data
- Uploaded files
- Persistent application data

---

# 15. Architecture Interview Q&A

**Q1. Why not store data inside containers?**

Because containers are recreated frequently during deployments and scaling.

---

**Q2. Why are named volumes preferred over bind mounts?**

Named volumes are Docker-managed, portable, cleaner, and easier to backup and restore.

---

# 16. Production Support Interview Q&A

**Q1. Application restarted and all data disappeared. Investigation order?**

1.

```bash
docker volume ls
```

2.

```bash
docker volume inspect
```

3.

```bash
docker inspect
```

4.

```bash
docker compose config
```

5.

Verify mount path

6.

Verify backup

7.

Restore if necessary

---

**Q2. Volume exists but application still cannot access data. Why?**

Possible reasons

- Wrong mount path
- Permission issue
- Wrong container user
- Incorrect compose configuration
- Read-only mount
- Application configuration error

---

# 17. Related Runbooks

- docker-volume-data-loss.md
- docker-disk-space-exhausted.md
- docker-compose-service-failure.md

---

# 18. Common Incidents

- Volume Data Loss
- Wrong Mount Path
- Disk Space Exhausted
- Permission Denied
- Volume Recreation

---

# 19. Commands

List volumes

```bash
docker volume ls
```

Inspect volume

```bash
docker volume inspect grafana-data
```

Inspect mounts

```bash
docker inspect grafana
```

Disk usage

```bash
docker system df
```

Remove unused volumes

```bash
docker volume prune
```

---

# 20. Marathi Quick Revision

- Volume म्हणजे Persistent Storage.
- Container delete झाला तरी Volume delete होत नाही.
- Database साठी Volume आवश्यक आहे.
- Named Volume production मध्ये best practice आहे.
- Backup आणि Restore नियमित करावेत.

---

# 21. Marathi Summary (5+ Experience Revision)

## Interview Summary

Docker Volume म्हणजे container च्या बाहेर असलेली persistent storage.

Production मध्ये Database, Grafana, Prometheus आणि uploads साठी volumes अनिवार्य असतात.

### Production Investigation Flow

```
Application Data Missing

↓

docker volume ls

↓

docker volume inspect

↓

docker inspect

↓

docker compose config

↓

Verify Mount Path

↓

Verify Permissions

↓

Restore Backup

↓

Root Cause Analysis

↓

Permanent Fix
```

### 5+ Years Interview Tip

जर interviewer म्हणाला,

**"Deployment नंतर Database रिकामी दिसते."**

नेहमी investigation sequence सांगा:

Volume Exists? → Mount Path Correct? → Container Using Correct Volume? → Permissions? → Backup Available? → RCA → Preventive Action.

हे उत्तर production experience स्पष्टपणे दर्शवते.

