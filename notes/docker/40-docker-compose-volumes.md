# Docker Compose Volumes

## Purpose

This document explains Docker Compose Volumes from an Enterprise DevOps perspective.

Volumes provide persistent storage for Docker containers, allowing data to survive container restarts, recreation, and image upgrades.

For our Enterprise DevOps Platform, Docker Compose Volumes will be used wherever application data needs to persist independently of the container lifecycle.

---

# Introduction

Containers are ephemeral.

This means

- Containers can be deleted.
- Containers can be recreated.
- Container filesystems are temporary.

Any data stored only inside a container is lost when the container is removed.

Docker Volumes solve this problem.

---

# High-Level Architecture

```text
Application

↓

Container

↓

Docker Volume

↓

Host Storage
```

The container can be recreated without losing application data.

---

# Why Volumes Matter

Benefits

- Persistent storage
- Data survives container recreation
- Easy backups
- Better portability
- Improved reliability
- Separation of application and data

---

# Without Volumes

```text
Container

↓

Application Data

↓

Container Deleted

↓

Data Lost
```

---

# With Volumes

```text
Container

↓

Docker Volume

↓

Persistent Data

↓

Container Deleted

↓

New Container

↓

Same Data Available
```

---

# Docker Compose Volume Workflow

```text
docker-compose.yml

↓

Volume Created

↓

Volume Mounted

↓

Application Reads Data

↓

Persistent Storage
```

---

# Declaring Volumes

Example

```yaml
volumes:
  app-data:
```

Docker creates a managed volume named

```text
app-data
```

---

# Using a Volume

Example

```yaml
services:
  app:
    volumes:
      - app-data:/data

volumes:
  app-data:
```

Docker mounts the volume inside the container.

---

# Host Path Bind Mount

Example

```yaml
volumes:
  - ./logs:/logs
```

Meaning

```text
Host Directory

↓

Container Directory
```

Useful during development.

---

# Named Volume

Example

```yaml
volumes:
  database-data:
```

Managed entirely by Docker.

Recommended for persistent application data.

---

# Bind Mount vs Named Volume

| Feature | Bind Mount | Named Volume |
|----------|------------|--------------|
| Managed by Docker | No | Yes |
| Host Directory | Yes | No |
| Persistent | Yes | Yes |
| Development | Excellent | Good |
| Production | Limited | Preferred |

---

# Anonymous Volumes

Example

```yaml
volumes:
  - /data
```

Docker creates a volume automatically.

Typically avoided in enterprise environments because lifecycle management is harder.

---

# Volumes in Our Project

Current services

- Frontend
- API Gateway
- Auth Service
- Dashboard Service

These services are mostly stateless.

Future additions such as databases will use persistent named volumes.

Example

```text
PostgreSQL

↓

database-data

↓

Persistent Storage
```

---

# Volume Lifecycle

```text
Create Volume

↓

Mount Volume

↓

Use Volume

↓

Container Deleted

↓

Volume Remains
```

Volumes must be removed separately if no longer required.

---

# Enterprise Workflow

Developer

↓

docker compose up

↓

Volume Created

↓

Container Started

↓

Application Stores Data

↓

Container Recreated

↓

Data Preserved

---

# Internal Workflow

Compose

↓

Read Volume Definition

↓

Docker Engine

↓

Create Volume

↓

Mount Into Container

↓

Application Access

---

# Daily DevOps Activities

DevOps Engineers

- Create persistent volumes
- Backup important data
- Restore volumes
- Remove unused volumes
- Monitor disk usage
- Troubleshoot storage issues

---

# Production Best Practices

- Use named volumes for persistent data.
- Keep application code outside volumes unless required.
- Back up important volumes.
- Monitor storage usage.
- Remove unused volumes regularly.
- Document volume ownership.

---

# Security Considerations

- Restrict access to host directories.
- Encrypt sensitive storage where required.
- Limit volume permissions.
- Avoid exposing confidential data through bind mounts.
- Monitor storage access.

---

# Troubleshooting

List volumes

```bash
docker volume ls
```

Inspect volume

```bash
docker volume inspect app-data
```

Remove unused volumes

```bash
docker volume prune
```

Inspect container

```bash
docker inspect <container>
```

---

# Common Volume Issues

## Data Missing

Possible causes

- Wrong mount path
- Wrong volume name
- Volume removed
- Container using different volume

---

## Permission Denied

Possible causes

- Host directory permissions
- Incorrect container user
- File ownership mismatch

---

## Disk Full

Possible causes

- Unused volumes
- Large application data
- Old backups

Resolution

- Remove unused volumes
- Archive data
- Increase storage

---

# Real Production Scenario

Scenario

A PostgreSQL container is upgraded.

Investigation

The old container is removed.

A named Docker volume is reused by the new container.

Result

Database data remains intact after the upgrade.

---

# Scenario-Based Interview Questions

## Question 1

Why are Docker Volumes needed?

Answer

Volumes provide persistent storage independent of the container lifecycle.

---

## Question 2

What happens when a container using a named volume is deleted?

Answer

The container is removed, but the volume and its data remain unless explicitly deleted.

---

## Question 3

What is the difference between a bind mount and a named volume?

Answer

A bind mount maps a host directory into a container, while a named volume is managed by Docker and is generally preferred for production data.

---

# Architecture Interview Questions

## Question

Why should application data be separated from containers?

Answer

Containers are designed to be immutable and replaceable. Persistent data should remain available even when containers are recreated or upgraded.

---

# Production Support Interview Questions

## Question

Application data disappeared after a deployment.

What should you investigate?

Answer

Review

- Volume configuration
- Mount paths
- Volume existence
- Container recreation
- Compose configuration
- Application logs

---

# Related Runbooks

Future runbooks

- Configure Docker Volumes
- Backup Docker Volumes
- Restore Docker Volumes
- Troubleshoot Volume Mount Issues

---

# Common Incidents

- Missing volume
- Wrong mount path
- Permission denied
- Volume corruption
- Disk full
- Deleted persistent storage

---

# Commands

List volumes

```bash
docker volume ls
```

Inspect volume

```bash
docker volume inspect app-data
```

Remove unused volumes

```bash
docker volume prune
```

Inspect container

```bash
docker inspect <container>
```

---

# Marathi Quick Revision

Docker Compose Volumes

- Persistent storage
- Named volume
- Bind mount
- Data survives container recreation
- Docker-managed storage
- Backup important volumes

---

# Marathi Interview Memory Tip

Interview मध्ये जर विचारलं:

"Docker Volume म्हणजे काय?"

असं सांगा:

"Docker Volume म्हणजे container च्या बाहेर असलेली persistent storage. Container delete किंवा recreate झाला तरी volume मधील data सुरक्षित राहतो. Development मध्ये bind mounts वापरले जातात, तर production मध्ये Docker-managed named volumes अधिक वापरले जातात."

---

# Key Takeaways

Docker Compose Volumes provide persistent storage independent of container lifecycles. Named volumes are the preferred solution for production workloads because they are managed by Docker and preserve application data across upgrades and container recreation. For our Enterprise DevOps Platform, volumes will become essential when stateful services such as databases are introduced.

