# Incident ID

INC-005

# Incident Title

Docker Network Connectivity Failure Between API Gateway and Auth Service

---

# Severity

SEV-2

---

# Status

Resolved

---

# Date

2025-06-03

---

# Reported By

Application Monitoring

---

# Environment

Production

---

# Services Impacted

- API Gateway
- Auth Service
- Frontend Login
- User Authentication

---

# Business Impact

- User login requests failed.
- API Gateway returned HTTP 502 responses.
- Authentication service became unreachable.
- New user sessions could not be established.

---

# Detection

Application monitoring generated alerts after repeated API failures.

Application logs

```
Connection refused
```

API Gateway logs

```
Failed to connect to auth-service:5000
```

---

# Timeline

## 11:02

Monitoring detected elevated authentication failures.

---

## 11:05

On-call DevOps engineer acknowledged the alert.

---

## 11:08

Verified running containers.

```bash
docker ps
```

All containers were running.

---

## 11:11

Verified Docker networks.

```bash
docker network ls
```

---

## 11:15

Inspected application network.

```bash
docker network inspect enterprise-network
```

Discovered the Auth Service container was not attached to the expected network.

---

## 11:20

Verified Compose configuration.

```bash
docker compose config
```

---

## 11:24

Connected the Auth Service container to the application network.

```bash
docker network connect enterprise-network auth-service
```

---

## 11:28

Validated connectivity from API Gateway.

```bash
docker exec -it api-gateway sh
```

Executed

```bash
ping auth-service
```

Connectivity restored.

---

## 11:31

Validated health endpoint.

```bash
curl http://localhost:5000/health
```

Returned

```
Healthy
```

---

## 11:35

Authentication requests succeeded.

---

## 11:38

Incident resolved.

---

# Root Cause

The Auth Service container had been recreated outside the Docker Compose deployment and was not connected to the shared application network, preventing service discovery.

---

# Investigation

Commands executed

```bash
docker ps
```

```bash
docker network ls
```

```bash
docker network inspect enterprise-network
```

```bash
docker compose config
```

```bash
docker exec -it api-gateway sh
```

```bash
ping auth-service
```

---

# Resolution

- Identified missing network attachment.
- Connected the Auth Service container to the correct Docker network.
- Verified DNS resolution.
- Confirmed API Gateway connectivity.
- Validated authentication endpoint.
- Monitored application stability.

---

# Verification

Network inspection

```bash
docker network inspect enterprise-network
```

Application health

```bash
curl http://localhost:5000/health
```

API Gateway

```bash
curl http://localhost:8080/health
```

Authentication requests completed successfully.

---

# Customer Impact

Authentication services were unavailable for approximately 35 minutes.

No data loss occurred.

---

# Preventive Actions

- Deploy services only through Docker Compose.
- Add automated network validation during deployment.
- Monitor inter-service connectivity.
- Alert on failed service discovery.
- Prevent manual container creation in production.

---

# Lessons Learned

- Running containers does not guarantee service connectivity.
- Docker network membership should be validated during deployments.
- Service discovery failures should be monitored proactively.
- Docker Compose should remain the single source of truth for deployments.

---

# Related Runbook

- runbooks/docker/docker-network-connectivity-issue.md

