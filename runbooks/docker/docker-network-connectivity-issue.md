# Docker Runbook 05 - Docker Network Connectivity Issue

# Purpose

Provide a standardized procedure to investigate and resolve network connectivity issues between Docker containers and external services.

---

# Severity

**Typical Severity:** SEV-2

Escalate to SEV-1 if customer-facing services are unavailable or critical production traffic is impacted.

---

# Symptoms

- Containers cannot communicate with each other
- API Gateway cannot reach backend services
- DNS resolution failures
- Connection timeout errors
- Service discovery failures
- Health checks fail
- Application responds with HTTP 502/503/504 errors

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

Ensure all required containers are running.

---

## Step 2 - Verify Docker Networks

```bash
docker network ls
```

---

## Step 3 - Inspect Network

```bash
docker network inspect <network-name>
```

Verify

- Connected containers
- Network driver
- IP addresses
- Subnet

---

## Step 4 - Verify Container Network Configuration

```bash
docker inspect <container-name>
```

Review

```
NetworkSettings
```

---

## Step 5 - Test DNS Resolution

Open a shell.

```bash
docker exec -it <container-name> sh
```

or

```bash
docker exec -it <container-name> bash
```

Ping another service.

```bash
ping api-gateway
```

or

```bash
ping auth-service
```

Exit.

```bash
exit
```

---

## Step 6 - Verify Port Exposure

```bash
docker ps
```

Confirm published ports.

---

## Step 7 - Test Application Endpoint

Example

```bash
curl http://localhost:8080/health
```

or

```bash
curl http://auth-service:5000/health
```

(from another container)

---

## Step 8 - Verify Compose Configuration

```bash
docker compose config
```

Review

- Networks
- Service names
- Port mappings

---

## Step 9 - Review Logs

```bash
docker compose logs
```

or

```bash
docker logs <container-name>
```

---

## Step 10 - Verify Host Firewall

Example

```bash
sudo ufw status
```

or

```bash
sudo firewall-cmd --list-all
```

Ensure required ports are permitted.

---

# Resolution

## Restart Affected Service

```bash
docker restart <container-name>
```

---

## Recreate Compose Stack

```bash
docker compose down

docker compose up -d
```

---

## Reconnect Container to Network

```bash
docker network connect <network-name> <container-name>
```

---

## Remove Incorrect Network Attachment

```bash
docker network disconnect <network-name> <container-name>
```

Reconnect if necessary.

---

## Verify DNS

From another container

```bash
ping <service-name>
```

---

# Verification

Verify containers

```bash
docker ps
```

Verify network

```bash
docker network inspect <network-name>
```

Verify application endpoints

```bash
curl http://localhost:8080/health
```

```bash
curl http://localhost:5000/health
```

```bash
curl http://localhost:5001/health
```

Verify frontend

```
http://localhost:5173
```

---

# Rollback

If the issue followed a Compose or network configuration change

Restore the previous

- compose.yaml
- Docker network configuration

Restart services

```bash
docker compose down

docker compose up -d
```

---

# Escalation

Escalate when

- Network corruption is suspected
- Docker Engine networking is unstable
- Multiple hosts are affected
- DNS resolution continues to fail
- Root cause cannot be identified
- Production SLA is at risk

---

# Post-Incident Tasks

- Document affected services
- Record timeline
- Capture Docker network configuration
- Save relevant logs
- Verify monitoring alerts
- Review preventive actions
- Update incident documentation

---

# Common Root Causes

- Containers attached to different networks
- Incorrect service name
- DNS resolution failure
- Invalid Compose configuration
- Port mapping conflict
- Firewall restrictions
- Container startup ordering issues
- Application listening on the wrong interface
- Network accidentally removed

---

# Useful Commands

List networks

```bash
docker network ls
```

Inspect network

```bash
docker network inspect <network-name>
```

Inspect container

```bash
docker inspect <container-name>
```

Running containers

```bash
docker ps
```

Compose status

```bash
docker compose ps
```

Compose logs

```bash
docker compose logs
```

Restart service

```bash
docker restart <container-name>
```

Restart application

```bash
docker compose down

docker compose up -d
```

