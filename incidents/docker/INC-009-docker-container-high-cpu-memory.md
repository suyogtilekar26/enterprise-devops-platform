# Incident ID

INC-009

# Incident Title

API Gateway Container Experienced High CPU and Memory Utilization

---

# Severity

SEV-2

---

# Status

Resolved

---

# Date

2025-08-06

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
- Authentication Requests
- Dashboard Service

---

# Business Impact

- API response times increased significantly.
- Frontend requests experienced timeouts.
- Authentication latency increased.
- Users experienced intermittent HTTP 504 Gateway Timeout errors.

---

# Detection

Prometheus generated resource utilization alerts.

Alerts

```
Container CPU Usage > 95%
```

```
Container Memory Usage > 90%
```

Application monitoring also reported increased response latency.

---

# Timeline

## 10:02

Prometheus generated High CPU alert.

---

## 10:04

High Memory alert generated.

---

## 10:06

On-call DevOps engineer acknowledged the incident.

---

## 10:10

Verified container resource utilization.

```bash
docker stats
```

Observed

```
CPU: 280%

Memory: 2.1 GB
```

---

## 10:14

Reviewed container logs.

```bash
docker logs api-gateway
```

Large number of repeated database retry messages observed.

---

## 10:18

Verified host resource usage.

```bash
free -h
```

```bash
top
```

Host resources remained healthy.

---

## 10:22

Reviewed recent deployment.

Discovered a configuration change had disabled request caching, dramatically increasing backend requests.

---

## 10:28

Updated application configuration.

---

## 10:31

Restarted API Gateway.

```bash
docker compose restart api-gateway
```

---

## 10:35

Monitored container resources.

```bash
docker stats
```

CPU and memory utilization returned to expected levels.

---

## 10:40

Validated application endpoints.

```bash
curl http://localhost:8080/health
```

Returned

```
Healthy
```

---

## 10:44

Monitoring alerts cleared.

---

## 10:47

Incident resolved.

---

# Root Cause

A configuration change disabled API response caching, causing excessive backend requests and significantly increasing CPU and memory consumption.

---

# Investigation

Commands executed

```bash
docker stats
```

```bash
docker logs api-gateway
```

```bash
docker inspect api-gateway
```

```bash
free -h
```

```bash
top
```

Reviewed

- Application logs
- Resource utilization
- Recent deployment changes
- Monitoring dashboards

---

# Resolution

- Identified excessive backend processing.
- Restored application caching configuration.
- Restarted API Gateway.
- Verified reduced resource utilization.
- Confirmed application stability.

---

# Verification

Container statistics

```bash
docker stats
```

Application health

```bash
curl http://localhost:8080/health
```

Compose status

```bash
docker compose ps
```

Monitoring dashboards confirmed CPU and memory utilization remained within normal operating thresholds.

---

# Customer Impact

Users experienced increased response times and intermittent API failures for approximately 45 minutes.

No data loss occurred.

---

# Preventive Actions

- Add resource utilization regression testing.
- Review configuration changes during code reviews.
- Configure automatic scaling thresholds for future Kubernetes deployments.
- Improve monitoring for abnormal request rates.
- Establish performance baselines for all services.

---

# Lessons Learned

- Small configuration changes can significantly affect application performance.
- Continuous resource monitoring enables rapid detection.
- Performance validation should be included in deployment testing.
- Application caching plays a critical role in production stability.

---

# Related Runbook

- runbooks/docker/docker-container-high-cpu-memory.md

