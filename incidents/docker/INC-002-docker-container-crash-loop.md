# Incident ID

INC-002

# Incident Title

API Gateway Container Entered Continuous Crash Loop

---

# Severity

SEV-2

---

# Status

Resolved

---

# Date

2025-04-07

---

# Reported By

Application Monitoring

---

# Environment

Production

---

# Services Impacted

- API Gateway
- Frontend
- Authentication Requests

---

# Business Impact

- Users were unable to access backend APIs.
- Frontend displayed API connection errors.
- Authentication requests failed.
- New user sessions could not be established.

---

# Detection

Monitoring generated alerts after repeated container restarts.

Application error

```
connection refused
```

Docker status

```
Restarting (1) every few seconds
```

---

# Timeline

## 14:05

Application monitoring reported API Gateway unavailable.

---

## 14:07

On-call engineer acknowledged alert.

---

## 14:10

Verified container status.

```bash
docker ps -a
```

Container repeatedly restarting.

---

## 14:13

Reviewed application logs.

```bash
docker logs api-gateway
```

Observed startup failure due to missing environment variable.

---

## 14:18

Inspected container configuration.

```bash
docker inspect api-gateway
```

Confirmed required environment variable was absent.

---

## 14:24

Updated Compose configuration with correct environment variable.

---

## 14:27

Recreated service.

```bash
docker compose up -d api-gateway
```

---

## 14:30

Verified application startup.

```bash
docker compose ps
```

---

## 14:33

Validated API endpoint.

```bash
curl http://localhost:8080/health
```

Returned

```
Healthy
```

---

## 14:36

Incident resolved.

---

# Root Cause

A required environment variable was removed during the previous deployment, causing the application to terminate immediately after startup.

---

# Investigation

Commands executed

```bash
docker ps -a
```

```bash
docker logs api-gateway
```

```bash
docker inspect api-gateway
```

```bash
docker compose config
```

```bash
docker compose ps
```

---

# Resolution

- Identified missing environment variable.
- Updated Compose configuration.
- Recreated the API Gateway container.
- Verified successful startup.
- Confirmed API health endpoint.

---

# Verification

Container status

```bash
docker ps
```

Application health

```bash
curl http://localhost:8080/health
```

Compose status

```bash
docker compose ps
```

No further container restarts observed.

---

# Customer Impact

Users experienced intermittent API failures for approximately 30 minutes.

---

# Preventive Actions

- Validate required environment variables during deployment.
- Add startup configuration validation.
- Improve container health monitoring.
- Add CI/CD configuration validation.
- Review deployment checklist.

---

# Lessons Learned

- Missing configuration can cause immediate container crashes.
- Health monitoring enables rapid detection.
- Environment validation should occur before deployment.
- Compose configuration should be validated during CI/CD.

---

# Related Runbook

- runbooks/docker/docker-container-crash-loop.md

