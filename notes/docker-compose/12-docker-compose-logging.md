# Docker Compose Logging

# 1. Purpose

Logging is the primary method for understanding what happens inside a container.

Logs help DevOps engineers monitor application behavior, troubleshoot production incidents, investigate failures, and perform Root Cause Analysis (RCA).

Without logs, diagnosing application problems becomes nearly impossible.

---

# 2. Introduction

Every container continuously generates logs.

Examples

- Application startup
- User requests
- Authentication events
- Database connections
- Errors
- Warnings
- Exceptions

Docker captures stdout and stderr streams from containers and makes them available using Docker logging commands.

---

# 3. Enterprise Usage

Enterprise environments rely heavily on centralized logging.

Typical flow

```
Application

↓

Container

↓

Docker Logs

↓

Log Collector

↓

Elasticsearch / Loki / Splunk

↓

Grafana / Kibana

↓

Alerts

↓

DevOps Team
```

Logs are retained for auditing, compliance, troubleshooting, and security investigations.

---

# 4. Usage in THIS Project

Our project logs will include

Frontend

- Nginx Access Logs
- Nginx Error Logs

API Gateway

- Request Logs
- Authentication Logs
- API Errors

Auth Service

- Login Attempts
- JWT Validation
- Authentication Errors

Dashboard Service

- API Requests
- Internal Errors

Future

- Promtail
- Loki
- Grafana

---

# 5. Architecture

```
Application

        │

stdout / stderr

        │

Docker Engine

        │

docker logs

        │

Centralized Logging

        │

Monitoring Dashboard

        │

DevOps Investigation
```

---

# 6. Internal Workflow

Application Generates Logs

↓

Container Writes stdout/stderr

↓

Docker Captures Logs

↓

Developer Executes

```
docker compose logs
```

↓

Issue Investigation

↓

Root Cause Analysis

---

# 7. Viewing Logs

View logs for all services

```bash
docker compose logs
```

View logs for one service

```bash
docker compose logs api-gateway
```

Follow logs

```bash
docker compose logs -f
```

Show recent logs

```bash
docker compose logs --tail=100
```

Show timestamps

```bash
docker compose logs -t
```

Combine options

```bash
docker compose logs -f --tail=50 api-gateway
```

---

# 8. Logging Drivers

Docker supports multiple logging drivers.

Examples

- json-file (default)
- local
- journald
- syslog
- fluentd
- gelf
- awslogs
- splunk

Example

```yaml
logging:
  driver: json-file
```

Example with options

```yaml
logging:
  driver: json-file
  options:
    max-size: "10m"
    max-file: "5"
```

---

# 9. Daily DevOps Activities

- Review application logs
- Investigate production failures
- Verify deployment logs
- Monitor authentication failures
- Analyze API errors
- Rotate logs
- Check logging driver configuration

---

# 10. Production Best Practices

- Never disable logging.
- Centralize logs.
- Rotate log files.
- Avoid logging secrets.
- Use structured logs (JSON) where possible.
- Synchronize server time using NTP.
- Retain logs according to compliance requirements.

---

# 11. Security

Never log

- Passwords
- JWT Secrets
- API Keys
- Database Passwords
- Personal Information
- Credit Card Details

Always

- Mask sensitive data.
- Control log access.
- Encrypt centralized log storage.
- Review audit logs regularly.

---

# 12. Troubleshooting

View logs

```bash
docker compose logs
```

View one service

```bash
docker compose logs auth-service
```

Follow logs

```bash
docker compose logs -f api-gateway
```

Inspect container

```bash
docker inspect api-gateway
```

View running containers

```bash
docker ps
```

---

# 13. Real Production Scenarios

## Scenario 1

Users report HTTP 500 errors.

Investigation

```bash
docker compose logs api-gateway
```

Root Cause

Database connection timeout caused API failures.

---

## Scenario 2

Authentication failures increase suddenly.

Investigation

```bash
docker compose logs auth-service
```

Root Cause

JWT secret mismatch after deployment.

---

## Scenario 3

Disk usage reaches 100%.

Investigation

```bash
du -sh /var/lib/docker

docker system df
```

Root Cause

Log rotation not configured.

Large json log files consumed disk space.

---

## Scenario 4

Application randomly crashes overnight.

Investigation

```bash
docker compose logs --tail=200 api-gateway
```

Root Cause

Unhandled application exception.

Logs provided stack trace for RCA.

---

# 14. Scenario Interview Q&A

**Q1. Why are logs important?**

A:

Logs provide visibility into application behavior, failures, and operational events.

Without logs, production troubleshooting becomes extremely difficult.

---

**Q2. Why should log rotation be configured?**

To prevent excessive disk usage caused by continuously growing log files.

---

**Q3. Why avoid logging secrets?**

Logs are accessible to multiple teams and may be retained for long periods.

Sensitive information must never be exposed.

---

# 15. Architecture Interview Q&A

**Q1. Why use centralized logging?**

Centralized logging allows correlation of events across multiple services from a single dashboard.

---

**Q2. What logging stack is commonly used?**

Examples

- ELK Stack
- Loki + Grafana
- Splunk
- Cloud-native logging services

---

# 16. Production Support Interview Q&A

**Q1. Application returns HTTP 500. Investigation order?**

1.

```bash
docker compose logs api-gateway
```

2.

```bash
docker compose logs auth-service
```

3.

Review recent deployment

4.

Verify dependencies

5.

Inspect health checks

6.

Perform RCA

---

**Q2. Production server disk is full. What will you check?**

- Docker logs
- Log rotation
- Large container logs
- Docker disk usage
- Old containers
- Unused images
- Volume usage

---

# 17. Related Runbooks

- docker-log-disk-full.md
- docker-compose-service-failure.md
- docker-health-check-failures.md

---

# 18. Common Incidents

- Excessive Log Growth
- Missing Log Rotation
- Authentication Errors
- API Failures
- Application Exceptions

---

# 19. Commands

View all logs

```bash
docker compose logs
```

Follow logs

```bash
docker compose logs -f
```

Recent logs

```bash
docker compose logs --tail=100
```

View timestamps

```bash
docker compose logs -t
```

Inspect container

```bash
docker inspect api-gateway
```

Docker disk usage

```bash
docker system df
```

---

# 20. Marathi Quick Revision

- Logs म्हणजे production investigation ची पहिली पायरी.
- `docker compose logs` सर्वात जास्त वापरला जाणारा command आहे.
- Secrets कधीही logs मध्ये ठेवू नयेत.
- Log rotation आवश्यक आहे.
- Centralized logging production standard आहे.

---

# 21. Marathi Summary (5+ Experience Revision)

## Interview Summary

Production मध्ये कोणतीही investigation logs पासूनच सुरू होते.

Container चालू आहे म्हणजे application व्यवस्थित आहे असे नसते.

Logs वापरून startup failures, authentication errors, database issues, deployment failures आणि unexpected exceptions शोधले जातात.

### Production Investigation Flow

```
Incident Report

↓

docker compose logs

↓

Identify Error

↓

Verify Dependencies

↓

Inspect Health

↓

Review Deployment

↓

Root Cause Analysis

↓

Permanent Fix

↓

Preventive Action
```

### Production Story

एका production deployment नंतर API Gateway सतत HTTP 500 देत होता.

Health Check healthy होता, त्यामुळे सुरुवातीला infrastructure issue वाटला नाही.

`docker compose logs api-gateway` मध्ये PostgreSQL connection timeout दिसला.

Database hostname production override file मध्ये चुकीचा configure झाला होता.

Configuration दुरुस्त करून deployment पुन्हा केल्यानंतर service restore झाली.

### 5+ Years Memory Trick

Interview मध्ये जर विचारले,

**"Production issue troubleshoot करण्यासाठी पहिली command कोणती?"**

नेहमी उत्तर द्या:

> "मी प्रथम `docker compose logs` वापरून application logs तपासेन. त्यानंतर health checks, dependencies, environment variables, recent deployment changes आणि infrastructure status verify करून Root Cause Analysis करेन."

हे उत्तर senior production troubleshooting approach दर्शवते.

