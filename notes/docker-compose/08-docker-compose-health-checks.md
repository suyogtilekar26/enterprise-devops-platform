# Docker Compose Health Checks

# 1. Purpose

Health Checks allow Docker to determine whether an application inside a container is actually healthy.

A running container does not necessarily mean the application is working.

Health checks periodically verify application availability and report the container status.

Possible states

- starting
- healthy
- unhealthy

Health checks are one of the most important production features in Docker Compose.

---

# 2. Introduction

Without Health Check

```
Container Running

↓

Application Crashed

↓

Docker Still Shows "Up"

↓

Users Receive Errors
```

With Health Check

```
Container Running

↓

Health Check Executes

↓

Application Fails

↓

Container Marked Unhealthy

↓

Monitoring Alert Generated
```

---

# 3. Enterprise Usage

Almost every enterprise application has health endpoints.

Examples

```
/health

/healthz

/ready

/live

/status
```

Applications

- Spring Boot
- Flask
- Django
- Node.js
- ASP.NET
- Go Services

All expose health endpoints for monitoring.

---

# 4. Usage in THIS Project

Health endpoints

Frontend

```
Nginx Default Response
```

API Gateway

```
/health
```

Auth Service

```
/health
```

Dashboard Service

```
/health
```

Future

Prometheus and Grafana health validation.

---

# 5. Architecture

```
Docker Engine

        │

Health Check Scheduler

        │

        ▼

Container

        │

Runs

curl /health

        │

Healthy?

 │              │

Yes            No

 │              │

 ▼              ▼

Healthy    Unhealthy
```

---

# 6. Internal Workflow

Container Starts

↓

Health Check Waits

↓

Runs Test Command

↓

Receives Response

↓

Updates Health Status

↓

Docker Reports Status

↓

Monitoring Reads Status

---

# 7. Health Check Parameters

Example

```yaml
healthcheck:
  test: ["CMD","curl","-f","http://localhost:8080/health"]
  interval: 30s
  timeout: 10s
  retries: 3
  start_period: 20s
```

---

## test

Command executed.

---

## interval

How often Docker checks health.

---

## timeout

Maximum execution time.

---

## retries

Failures before unhealthy.

---

## start_period

Grace period during startup.

Very important for production.

---

# 8. Why Health Checks Matter

Without health checks

```
Container Up

↓

Application Down

↓

Deployment Appears Successful
```

With health checks

```
Application Failure

↓

Container Unhealthy

↓

Alert

↓

Investigation Begins
```

---

# 9. Daily DevOps Activities

- Verify health endpoints
- Monitor unhealthy containers
- Tune start_period
- Tune retry count
- Review health failures
- Validate deployments
- Investigate false positives

---

# 10. Production Best Practices

- Every service must expose a health endpoint.
- Keep health endpoints lightweight.
- Configure realistic timeout values.
- Configure startup grace periods.
- Never perform expensive database queries in health checks.
- Monitor unhealthy trends.

---

# 11. Security

Health endpoints should

- Return minimal information
- Avoid exposing secrets
- Avoid revealing internal implementation
- Be accessible only where required

---

# 12. Troubleshooting

View container status

```bash
docker ps
```

Inspect health

```bash
docker inspect api-gateway
```

View logs

```bash
docker compose logs api-gateway
```

Verify endpoint

```bash
curl http://localhost:8080/health
```

Check compose configuration

```bash
docker compose config
```

---

# 13. Real Production Scenarios

## Scenario 1

Deployment completed successfully.

Monitoring immediately generated alerts.

Investigation

```bash
docker ps

docker inspect api-gateway

curl http://localhost:8080/health
```

Root Cause

Health endpoint returned HTTP 500 because a required environment variable was missing.

---

## Scenario 2

Container repeatedly became

```
Unhealthy
```

every few minutes.

Investigation

```bash
docker logs api-gateway

docker inspect api-gateway
```

Root Cause

Health check timeout too aggressive.

Application required additional response time under load.

---

## Scenario 3

Application worked locally.

Production marked container unhealthy.

Investigation

```bash
docker compose config

docker inspect

curl
```

Root Cause

Health check pointed to the wrong port.

---

## Scenario 4

Every deployment produced unhealthy containers.

Investigation

```bash
docker inspect

docker compose logs
```

Root Cause

Application startup required 45 seconds.

Health check started after only 10 seconds.

Increasing

```
start_period
```

resolved the issue.

---

# 14. Scenario Interview Q&A

**Q1. Why are health checks important?**

A:

They verify application availability instead of simply checking whether the container process exists.

---

**Q2. What is the difference between Running and Healthy?**

Running means the container process exists.

Healthy means the application is responding correctly.

---

**Q3. Which health check parameter is commonly misconfigured?**

start_period.

Many applications require additional startup time.

---

# 15. Architecture Interview Q&A

**Q1. Should health checks verify database connectivity?**

Only if database connectivity is essential for serving requests.

Avoid expensive checks.

---

**Q2. Why keep health endpoints lightweight?**

Heavy health endpoints increase latency and create unnecessary load.

---

# 16. Production Support Interview Q&A

**Q1. Container shows Up (unhealthy). Investigation order?**

1.

```bash
docker ps
```

2.

```bash
docker inspect
```

3.

```bash
docker compose logs
```

4.

```bash
curl /health
```

5.

Review startup timing

6.

Review environment variables

7.

Root Cause Analysis

---

**Q2. Health endpoint returns HTTP 200 locally but unhealthy in production. Why?**

Possible reasons

- Wrong health URL
- Wrong port
- Firewall
- Reverse proxy
- Missing configuration
- Slow startup
- Timeout too low

---

# 17. Related Runbooks

- docker-health-check-failures.md
- docker-compose-service-failure.md
- docker-container-crash-loop.md

---

# 18. Common Incidents

- Health Check Failure
- Startup Delay
- Wrong Health Endpoint
- Timeout Misconfiguration
- Missing Environment Variable

---

# 19. Commands

View container status

```bash
docker ps
```

Inspect health

```bash
docker inspect api-gateway
```

View logs

```bash
docker compose logs
```

Verify endpoint

```bash
curl http://localhost:8080/health
```

Restart service

```bash
docker compose restart api-gateway
```

---

# 20. Marathi Quick Revision

- Running म्हणजे Healthy नाही.
- Health Check application verify करतो.
- start_period खूप महत्त्वाचा आहे.
- Health endpoint lightweight असावा.
- Monitoring health checks वर अवलंबून असते.

---

# 21. Marathi Summary (5+ Experience Revision)

## Interview Summary

Health Check म्हणजे Docker ला application प्रत्यक्षात चालू आहे का हे तपासण्याची पद्धत.

Production मध्ये फक्त container चालू आहे का हे पाहत नाहीत; application requests serve करू शकते का हे verify करतात.

### Production Investigation Flow

```
docker ps

↓

docker inspect

↓

docker compose logs

↓

curl /health

↓

Check start_period

↓

Check timeout

↓

Check Environment Variables

↓

Root Cause Analysis

↓

Permanent Fix
```

### 5+ Years Interview Tip

जर interviewer म्हणाला,

**"Container Running आहे पण Unhealthy दाखवत आहे."**

नेहमी उत्तर द्या:

"First I'll inspect the health status, verify the configured health check command, manually test the endpoint using curl, review startup timing, validate environment variables, and determine whether it's an application issue or an incorrectly configured health check."

हे उत्तर production incident handling experience दर्शवते.

