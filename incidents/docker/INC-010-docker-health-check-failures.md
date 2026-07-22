# Incident ID

INC-010

# Incident Title

Docker Health Check Failures Caused API Gateway to Become Unhealthy

---

# Severity

SEV-2

---

# Status

Resolved

---

# Date

2025-08-21

---

# Reported By

Prometheus Alertmanager

---

# Environment

Production

---

# Services Impacted

- API Gateway
- Frontend
- Authentication Service
- Dashboard Service

---

# Business Impact

- API Gateway was marked as unhealthy.
- Frontend users experienced intermittent HTTP 503 responses.
- Internal service communication became unstable.
- Automated deployment validation failed.

---

# Detection

Prometheus generated health alerts.

Docker status

```
Up 12 minutes (unhealthy)
```

Health check output

```
curl: (7) Failed to connect to localhost port 8080
```

---

# Timeline

## 09:05

Monitoring generated an unhealthy container alert.

---

## 09:07

On-call DevOps engineer acknowledged the incident.

---

## 09:10

Verified container status.

```bash
docker ps
```

API Gateway reported

```
Up (unhealthy)
```

---

## 09:13

Reviewed health information.

```bash
docker inspect api-gateway
```

Observed repeated failed health checks.

---

## 09:18

Reviewed container logs.

```bash
docker logs api-gateway
```

Application required additional startup time after a configuration update.

---

## 09:23

Verified health endpoint manually.

```bash
curl http://localhost:8080/health
```

Endpoint responded successfully after application initialization.

---

## 09:28

Reviewed Docker health check configuration.

Detected an insufficient

```
start_period
```

value.

---

## 09:33

Updated Docker health check configuration.

Increased startup grace period.

---

## 09:37

Recreated the service.

```bash
docker compose up -d api-gateway
```

---

## 09:41

Verified container health.

```bash
docker ps
```

Container status changed to

```
Up (healthy)
```

---

## 09:45

Monitoring alerts cleared.

---

## 09:48

Incident resolved.

---

# Root Cause

The application required more startup time than the configured Docker health check allowed, causing Docker to repeatedly mark the container as unhealthy even though the application eventually became operational.

---

# Investigation

Commands executed

```bash
docker ps
```

```bash
docker inspect api-gateway
```

```bash
docker logs api-gateway
```

```bash
curl http://localhost:8080/health
```

```bash
docker compose config
```

Reviewed

- Docker health check configuration
- Application startup logs
- Monitoring alerts
- Recent deployment changes

---

# Resolution

- Identified insufficient health check startup period.
- Updated Docker health check configuration.
- Increased startup grace period.
- Recreated the API Gateway container.
- Verified successful health check execution.
- Confirmed application stability.

---

# Verification

Container status

```bash
docker ps
```

Health endpoint

```bash
curl http://localhost:8080/health
```

Compose status

```bash
docker compose ps
```

Monitoring

- Container reported healthy
- No additional health check failures
- Application responded normally

---

# Customer Impact

Users experienced intermittent API availability issues for approximately 40 minutes.

No data loss occurred.

---

# Preventive Actions

- Configure realistic health check startup periods.
- Validate health checks during performance testing.
- Include startup timing verification in deployment pipelines.
- Monitor health check failure trends.
- Standardize health check configuration across services.

---

# Lessons Learned

- Health checks must account for actual application startup time.
- Aggressive health check settings can create false failures.
- Monitoring health check trends improves operational visibility.
- Startup validation should be part of every production deployment.

---

# Related Runbook

- runbooks/docker/docker-health-check-failures.md

