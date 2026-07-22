# Lab 09 - Docker Volumes

# Objective

Learn how Docker Volumes provide persistent storage for containers.

By the end of this lab you will understand

- Named Volumes
- Anonymous Volumes
- Bind Mounts
- Persistent Storage
- Volume Inspection
- Volume Cleanup

This knowledge will later be used when deploying enterprise applications that require persistent data.

---

# Enterprise Scenario

The Enterprise DevOps Platform currently consists of

- Frontend
- API Gateway
- Auth Service
- Dashboard Service

Although these services are mostly stateless, future enterprise deployments may include

- PostgreSQL
- Redis
- Prometheus
- Grafana

These applications require persistent storage.

Docker Volumes provide that persistence.

---

# Architecture

```
Application

      │

Container

      │

Docker Volume

      │

Host Storage

      │

Persistent Data
```

---

# Prerequisites

- Docker Installed
- Docker Running

Verify

```bash
docker version
```

---

# Step 1

View existing volumes.

```bash
docker volume ls
```

---

# Step 2

Create a named volume.

```bash
docker volume create app-data
```

---

# Step 3

Verify volume.

```bash
docker volume ls
```

Expected

```
app-data
```

---

# Step 4

Inspect the volume.

```bash
docker volume inspect app-data
```

Observe

- Driver
- Mountpoint
- Labels

---

# Step 5

Run Ubuntu container using the volume.

```bash
docker run -it \
--name volume-demo \
-v app-data:/data \
ubuntu bash
```

---

# Step 6

Inside the container.

```bash
echo "Enterprise DevOps Platform" > /data/demo.txt

cat /data/demo.txt
```

Exit.

```bash
exit
```

---

# Step 7

Remove container.

```bash
docker rm volume-demo
```

---

# Step 8

Start another container using the same volume.

```bash
docker run -it \
-v app-data:/data \
ubuntu bash
```

---

# Step 9

Verify persistence.

```bash
cat /data/demo.txt
```

Expected

```
Enterprise DevOps Platform
```

Exit.

```bash
exit
```

---

# Step 10

View Docker volumes.

```bash
docker volume ls
```

---

# Step 11

Inspect the volume again.

```bash
docker volume inspect app-data
```

---

# Step 12

Create another volume.

```bash
docker volume create logs-data
```

---

# Step 13

Verify volumes.

```bash
docker volume ls
```

---

# Step 14

Remove unused volume.

```bash
docker volume rm logs-data
```

---

# Step 15

Verify cleanup.

```bash
docker volume ls
```

---

# Anonymous Volume

Run

```bash
docker run -d \
-v /usr/share/nginx/html \
nginx
```

List volumes.

```bash
docker volume ls
```

Docker creates an anonymous volume automatically.

---

# Bind Mount Example

```bash
mkdir website

echo "Docker Volume Lab" > website/index.html
```

Run

```bash
docker run -d \
--name bind-demo \
-p 8080:80 \
-v $(pwd)/website:/usr/share/nginx/html \
nginx
```

Verify

```
http://localhost:8080
```

---

# Enterprise Usage

Future architecture

```
Prometheus

↓

Docker Volume

↓

Metrics Database
```

```
Grafana

↓

Docker Volume

↓

Dashboards
```

```
PostgreSQL

↓

Docker Volume

↓

Database Files
```

```
Redis

↓

Docker Volume

↓

Persistent Cache
```

---

# Validation Checklist

Verify

- Named volume created
- Volume inspected
- Data persisted
- Container removed
- New container accessed same data
- Anonymous volume understood
- Bind mount tested

---

# Common Errors

## Volume Not Found

Verify

```bash
docker volume ls
```

---

## Cannot Remove Volume

A container is using it.

Check

```bash
docker ps -a
```

Remove dependent containers first.

---

## Data Missing

Verify correct mount point.

Inspect

```bash
docker inspect <container-id>
```

---

# Troubleshooting Commands

Volumes

```bash
docker volume ls
```

Inspect

```bash
docker volume inspect app-data
```

Containers

```bash
docker ps -a
```

System Usage

```bash
docker system df
```

---

# Best Practices

- Use named volumes for persistent data
- Avoid storing important data inside containers
- Remove unused volumes periodically
- Use bind mounts for local development
- Backup production volumes regularly

---

# Expected Result

You should successfully

- Create Docker volumes
- Mount volumes into containers
- Verify persistent storage
- Understand bind mounts
- Prepare for stateful enterprise applications

