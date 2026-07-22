# Lab 11 - Docker Compose Fundamentals

# Objective

Learn how Docker Compose manages multiple containers as a single application.

By the end of this lab you will understand

- Docker Compose
- compose.yaml
- Services
- Networks
- Volumes
- Multi-container Applications

This knowledge prepares us for running the Enterprise DevOps Platform locally before Kubernetes deployment.

---

# Enterprise Scenario

Our application consists of multiple services.

```
Frontend

↓

API Gateway

↓

Auth Service

↓

Dashboard Service
```

Starting each container manually is inefficient.

Docker Compose allows us to manage the complete application using a single configuration file.

---

# Architecture

```
compose.yaml

        │

docker compose up

        │

────────────────────────

Frontend

API Gateway

Auth Service

Dashboard Service

────────────────────────

Docker Network

────────────────────────
```

---

# Prerequisites

- Docker Installed
- Docker Compose Plugin Installed

Verify

```bash
docker compose version
```

---

# Step 1

Create project directory.

```bash
mkdir compose-lab

cd compose-lab
```

---

# Step 2

Create compose file.

```bash
nano compose.yaml
```

---

# Step 3

Add the following configuration.

```yaml
services:

  web:

    image: nginx

    container_name: compose-nginx

    ports:
      - "8080:80"

  ubuntu:

    image: ubuntu

    container_name: compose-ubuntu

    command: sleep infinity
```

Save the file.

---

# Step 4

Validate Compose file.

```bash
docker compose config
```

---

# Step 5

Start application.

```bash
docker compose up -d
```

---

# Step 6

Verify containers.

```bash
docker compose ps
```

---

# Step 7

Verify using Docker.

```bash
docker ps
```

---

# Step 8

Access nginx.

Open

```
http://localhost:8080
```

or

```bash
curl http://localhost:8080
```

---

# Step 9

View logs.

```bash
docker compose logs
```

---

# Step 10

View logs of nginx.

```bash
docker compose logs web
```

---

# Step 11

Execute command inside Ubuntu container.

```bash
docker compose exec ubuntu bash
```

Run

```bash
hostname

pwd

exit
```

---

# Step 12

Inspect Compose resources.

```bash
docker compose ps
```

---

# Step 13

Stop services.

```bash
docker compose stop
```

---

# Step 14

Start services again.

```bash
docker compose start
```

---

# Step 15

Bring down application.

```bash
docker compose down
```

---

# Docker Compose Commands

Validate

```bash
docker compose config
```

Start

```bash
docker compose up -d
```

View Containers

```bash
docker compose ps
```

Logs

```bash
docker compose logs
```

Execute

```bash
docker compose exec
```

Stop

```bash
docker compose stop
```

Start

```bash
docker compose start
```

Shutdown

```bash
docker compose down
```

---

# Enterprise Usage

Later our Enterprise DevOps Platform will run using Compose.

```
Frontend

↓

API Gateway

↓

Auth Service

↓

Dashboard Service

↓

Shared Network

↓

Local Integration Testing
```

Compose will be used before deploying the same application into Kubernetes.

---

# Validation Checklist

Verify

- Compose file created
- Configuration validated
- Containers started
- Services accessible
- Logs available
- Commands executed
- Services stopped
- Services removed

---

# Common Errors

## compose.yaml Not Found

Verify

```bash
ls
```

---

## Port Already Allocated

Use another port.

Example

```
8081:80
```

---

## Invalid YAML

Validate.

```bash
docker compose config
```

---

## Service Not Running

Check

```bash
docker compose ps
```

---

# Troubleshooting Commands

Compose Version

```bash
docker compose version
```

Configuration

```bash
docker compose config
```

Running Services

```bash
docker compose ps
```

Logs

```bash
docker compose logs
```

Containers

```bash
docker ps
```

---

# Best Practices

- Keep Compose files readable
- Use meaningful service names
- Validate YAML before deployment
- Use Compose for local integration testing
- Mirror production architecture whenever possible

---

# Expected Result

You should successfully

- Create a Docker Compose file
- Start multiple containers
- Manage application lifecycle
- View logs
- Execute commands inside services
- Prepare for running the Enterprise DevOps Platform locally

