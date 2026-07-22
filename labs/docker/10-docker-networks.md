# Lab 10 - Docker Networks

# Objective

Learn how Docker networking enables communication between containers.

By the end of this lab you will understand

- Bridge Networks
- Host Network
- None Network
- User-defined Networks
- Container Communication
- Network Inspection

This knowledge is essential before connecting multiple services in the Enterprise DevOps Platform.

---

# Enterprise Scenario

The Enterprise DevOps Platform consists of multiple services.

```
Frontend

↓

API Gateway

↓

Auth Service

↓

Dashboard Service
```

Each service runs inside its own Docker container.

These containers must communicate securely using Docker networks before being deployed to Kubernetes.

---

# Architecture

```
                Docker Network

        ┌──────────┼──────────┐

        │          │          │

 Frontend    API Gateway   Auth Service

                     │

              Dashboard Service
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

List available networks.

```bash
docker network ls
```

Expected

```
bridge

host

none
```

---

# Step 2

Inspect default bridge network.

```bash
docker network inspect bridge
```

Observe

- Driver
- Subnet
- Gateway
- Connected Containers

---

# Step 3

Create a custom network.

```bash
docker network create enterprise-network
```

---

# Step 4

Verify network.

```bash
docker network ls
```

Expected

```
enterprise-network
```

---

# Step 5

Inspect custom network.

```bash
docker network inspect enterprise-network
```

Initially

```
Containers
{}
```

---

# Step 6

Run first container.

```bash
docker run -d \
--name frontend \
--network enterprise-network \
nginx
```

---

# Step 7

Run second container.

```bash
docker run -dit \
--name backend \
--network enterprise-network \
ubuntu bash
```

---

# Step 8

Verify containers.

```bash
docker ps
```

---

# Step 9

Inspect network again.

```bash
docker network inspect enterprise-network
```

Observe

- frontend
- backend

---

# Step 10

Connect to backend container.

```bash
docker exec -it backend bash
```

---

# Step 11

Install ping utility.

```bash
apt update

apt install iputils-ping -y
```

---

# Step 12

Ping frontend container.

```bash
ping frontend
```

Expected

```
PING frontend
```

Stop

```
Ctrl + C
```

Exit.

```bash
exit
```

---

# Step 13

Disconnect frontend.

```bash
docker network disconnect enterprise-network frontend
```

---

# Step 14

Verify network.

```bash
docker network inspect enterprise-network
```

Observe frontend is disconnected.

---

# Step 15

Reconnect frontend.

```bash
docker network connect enterprise-network frontend
```

---

# Step 16

Verify connection.

```bash
docker network inspect enterprise-network
```

---

# Step 17

Remove containers.

```bash
docker rm -f frontend backend
```

---

# Step 18

Remove network.

```bash
docker network rm enterprise-network
```

---

# Docker Network Types

## Bridge

Default Docker network.

Suitable for most standalone containers.

---

## Host

Container shares the host network.

Example

```bash
docker run --network host nginx
```

---

## None

No network connectivity.

Example

```bash
docker run --network none ubuntu
```

---

## User-defined Bridge

Recommended for enterprise applications.

Provides

- DNS resolution
- Better isolation
- Easier container communication

---

# Enterprise Usage

Future architecture

```
Frontend

↓

API Gateway

↓

Auth Service

↓

Dashboard Service

↓

Docker Network

↓

Kind Kubernetes
```

Each service communicates using container names instead of IP addresses.

---

# Validation Checklist

Verify

- Network created
- Network inspected
- Containers connected
- Container communication successful
- Network disconnect tested
- Network reconnect tested
- Network removed

---

# Common Errors

## Network Not Found

Verify

```bash
docker network ls
```

---

## Container Not Found

Verify

```bash
docker ps -a
```

---

## Ping Failed

Ensure both containers are attached to the same network.

---

## Cannot Remove Network

Containers are still attached.

Remove them first.

```bash
docker rm -f frontend backend
```

---

# Troubleshooting Commands

Networks

```bash
docker network ls
```

Inspect

```bash
docker network inspect enterprise-network
```

Containers

```bash
docker ps
```

Container Details

```bash
docker inspect frontend
```

---

# Best Practices

- Use user-defined bridge networks
- Avoid using the default bridge for production workloads
- Use container names for service discovery
- Isolate applications using separate networks
- Remove unused networks regularly

---

# Expected Result

You should successfully

- Create Docker networks
- Connect containers
- Verify container communication
- Understand Docker networking
- Prepare for multi-container deployments

