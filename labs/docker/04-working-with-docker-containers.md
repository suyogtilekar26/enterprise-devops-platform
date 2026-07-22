# Lab 04 - Working with Docker Containers

# Objective

Learn how to create, manage, inspect, monitor, stop, restart, and remove Docker containers.

By the end of this lab you will understand the complete lifecycle of Docker containers before containerizing the Enterprise DevOps Platform.

---

# Enterprise Scenario

The DevOps team has downloaded the required Docker images.

The next step is understanding how containers behave because every service in our platform will eventually run inside its own container.

Services

- Frontend
- API Gateway
- Auth Service
- Dashboard Service

Each service will become an independent Docker container.

---

# Container Lifecycle

```
Docker Image

      │

docker run

      │

Container Created

      │

Running

      │

Stopped

      │

Restarted

      │

Removed
```

---

# Prerequisites

- Docker Installed
- Docker Service Running

Verify

```bash
docker version
```

---

# Step 1

View existing containers.

```bash
docker ps -a
```

---

# Step 2

Run an Ubuntu container.

```bash
docker run ubuntu echo "Container Created Successfully"
```

---

# Step 3

View all containers.

```bash
docker ps -a
```

Observe

- Container ID
- Image
- Status
- Command

---

# Step 4

Run nginx container.

```bash
docker run -d nginx
```

---

# Step 5

View running containers.

```bash
docker ps
```

---

# Step 6

Run nginx with a custom name.

```bash
docker run -d \
--name web-server \
nginx
```

---

# Step 7

Verify running containers.

```bash
docker ps
```

---

# Step 8

Inspect container.

```bash
docker inspect web-server
```

Observe

- IP Address
- Network
- Mounts
- Environment Variables
- Image
- State

---

# Step 9

View container logs.

```bash
docker logs web-server
```

---

# Step 10

Execute commands inside the container.

```bash
docker exec -it web-server bash
```

Inside container

```bash
hostname

pwd

ls

exit
```

---

# Step 11

Monitor running processes.

```bash
docker top web-server
```

---

# Step 12

Monitor resource usage.

```bash
docker stats
```

Exit

```
Ctrl + C
```

---

# Step 13

Stop container.

```bash
docker stop web-server
```

---

# Step 14

Verify status.

```bash
docker ps -a
```

Expected

```
Exited
```

---

# Step 15

Restart container.

```bash
docker start web-server
```

---

# Step 16

Verify container.

```bash
docker ps
```

---

# Step 17

Pause container.

```bash
docker pause web-server
```

Verify

```bash
docker ps
```

STATUS

```
Paused
```

---

# Step 18

Resume container.

```bash
docker unpause web-server
```

---

# Step 19

Restart container.

```bash
docker restart web-server
```

---

# Step 20

Remove stopped Ubuntu containers.

List

```bash
docker ps -a
```

Remove

```bash
docker rm <container-id>
```

---

# Step 21

Stop nginx container.

```bash
docker stop web-server
```

---

# Step 22

Remove nginx container.

```bash
docker rm web-server
```

---

# Step 23

Verify cleanup.

```bash
docker ps -a
```

---

# Enterprise Usage

Later our project will have

```
Frontend Container

↓

API Gateway Container

↓

Auth Service Container

↓

Dashboard Container

↓

Docker Network

↓

Kubernetes Pods
```

Each application component will run as an independent container.

---

# Validation Checklist

Verify

- Container created
- Container started
- Container inspected
- Logs viewed
- Commands executed
- Resource usage monitored
- Container stopped
- Container restarted
- Container removed

---

# Common Errors

## Container Already Exists

```bash
docker rm web-server
```

or choose another container name.

---

## Container Not Running

Start it.

```bash
docker start web-server
```

---

## Cannot Remove Running Container

Stop it first.

```bash
docker stop web-server
```

Then

```bash
docker rm web-server
```

---

# Troubleshooting Commands

Running Containers

```bash
docker ps
```

All Containers

```bash
docker ps -a
```

Container Logs

```bash
docker logs web-server
```

Inspect Container

```bash
docker inspect web-server
```

Container Processes

```bash
docker top web-server
```

Container Statistics

```bash
docker stats
```

---

# Best Practices

- Give containers meaningful names
- Keep one application per container
- Monitor logs regularly
- Remove unused containers
- Stop containers gracefully before removal
- Use detached mode for long-running services

---

# Expected Result

You should successfully

- Create Docker containers
- Start and stop containers
- Restart containers
- Execute commands inside containers
- Monitor resource usage
- Inspect containers
- Remove containers
- Understand the Docker container lifecycle

