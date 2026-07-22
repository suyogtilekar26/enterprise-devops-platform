# Docker Compose Profiles

# 1. Purpose

Docker Compose Profiles allow selective startup of services.

Instead of starting every service defined in the compose file, profiles enable only the services required for a specific environment or task.

This improves development efficiency and resource utilization.

---

# 2. Introduction

Without Profiles

```
docker compose up

↓

All Services Start

↓

High Resource Usage

↓

Slower Startup
```

With Profiles

```
docker compose --profile monitoring up

↓

Only Monitoring Stack Starts

↓

Faster Startup

↓

Lower Resource Usage
```

Profiles are especially useful for optional services such as monitoring, debugging, testing, and development tools.

---

# 3. Enterprise Usage

Large enterprise projects commonly separate services into profiles.

Examples

```
default

↓

Application Services
```

```
monitoring

↓

Prometheus

Grafana

Alertmanager
```

```
logging

↓

ELK Stack

Fluent Bit
```

```
testing

↓

Mock Services

Test Database
```

```
development

↓

Hot Reload

Debug Containers
```

---

# 4. Usage in THIS Project

Our project can use profiles like

```
default

↓

Frontend

API Gateway

Auth Service

Dashboard Service
```

```
monitoring

↓

Prometheus

Grafana
```

```
development

↓

Debug Tools

Development Utilities
```

Future Kubernetes migration will replace many of these environment-specific selections.

---

# 5. Architecture

```
docker compose

        │

Profile Selected

        │

        ▼

Relevant Services Loaded

        │

Container Startup

        │

Application Ready
```

---

# 6. Internal Workflow

Compose File Loaded

↓

Selected Profile Read

↓

Matching Services Identified

↓

Dependencies Evaluated

↓

Containers Started

↓

Health Checks Executed

↓

Application Ready

---

# 7. Profile Configuration

Example

```yaml
services:

  prometheus:
    profiles:
      - monitoring

  grafana:
    profiles:
      - monitoring

  api-gateway:
    profiles:
      - default
```

---

Running monitoring

```bash
docker compose --profile monitoring up -d
```

Running default services

```bash
docker compose --profile default up -d
```

Running multiple profiles

```bash
docker compose \
--profile default \
--profile monitoring \
up -d
```

---

# 8. Advantages

- Faster startup
- Reduced CPU usage
- Lower memory usage
- Cleaner development environment
- Optional infrastructure
- Easier testing
- Better separation of concerns

---

# 9. Daily DevOps Activities

- Enable required profiles
- Disable unnecessary services
- Test profile combinations
- Validate monitoring profile
- Review compose configuration
- Update environment documentation
- Troubleshoot profile-related deployments

---

# 10. Production Best Practices

- Keep production profiles minimal.
- Separate monitoring from application services.
- Document every available profile.
- Avoid unnecessary profile complexity.
- Test every supported profile combination.
- Use profiles only for optional services.

---

# 11. Security

- Restrict debug profiles in production.
- Never expose development tools publicly.
- Disable unnecessary containers.
- Separate monitoring access.
- Keep administrative services internal.

---

# 12. Troubleshooting

View active containers

```bash
docker compose ps
```

Validate compose configuration

```bash
docker compose config
```

Start monitoring profile

```bash
docker compose --profile monitoring up -d
```

Stop services

```bash
docker compose down
```

View logs

```bash
docker compose logs
```

---

# 13. Real Production Scenarios

## Scenario 1

Developer starts every service.

Laptop becomes extremely slow.

Investigation

```bash
docker compose ps

docker stats
```

Root Cause

Monitoring stack and debugging services were unnecessarily running.

Profiles solved the issue.

---

## Scenario 2

Production deployment includes debug containers.

Investigation

```bash
docker compose config

docker compose ps
```

Root Cause

Development profile accidentally enabled during deployment.

---

## Scenario 3

Grafana unavailable after deployment.

Investigation

```bash
docker compose ps

docker compose logs grafana
```

Root Cause

Monitoring profile was not enabled.

---

## Scenario 4

CI pipeline fails.

Investigation

```bash
docker compose config
```

Root Cause

Pipeline referenced an invalid profile name.

---

# 14. Scenario Interview Q&A

**Q1. What are Docker Compose Profiles?**

A:

Profiles allow selective startup of services instead of starting every container.

---

**Q2. Why use profiles?**

To reduce resource consumption and separate optional infrastructure from mandatory application services.

---

**Q3. Are profiles required?**

No.

They are optional but extremely useful for enterprise projects.

---

# 15. Architecture Interview Q&A

**Q1. Which services should use profiles?**

Optional components such as

- Monitoring
- Logging
- Testing
- Debugging
- Development tools

---

**Q2. Should production depend on profiles?**

Production should start only required services.

Profiles should simplify deployments rather than increase complexity.

---

# 16. Production Support Interview Q&A

**Q1. Monitoring services didn't start after deployment. Investigation?**

1.

```bash
docker compose ps
```

2.

```bash
docker compose config
```

3.

Verify selected profiles

4.

Review deployment pipeline

5.

Restart deployment

---

**Q2. Production server suddenly consumes excessive memory. Investigation?**

Check

- Active profiles
- Running containers
- docker stats
- Optional services
- Debug containers

---

# 17. Related Runbooks

- docker-compose-service-failure.md
- docker-resource-exhaustion.md
- docker-monitoring-stack-down.md

---

# 18. Common Incidents

- Wrong Profile Selected
- Monitoring Services Missing
- Debug Containers Running
- High Resource Usage
- Invalid Profile Configuration

---

# 19. Commands

Start monitoring

```bash
docker compose --profile monitoring up -d
```

Start development

```bash
docker compose --profile development up -d
```

Multiple profiles

```bash
docker compose \
--profile default \
--profile monitoring \
up -d
```

View services

```bash
docker compose ps
```

View logs

```bash
docker compose logs
```

Validate configuration

```bash
docker compose config
```

---

# 20. Marathi Quick Revision

- Profiles म्हणजे specific services start करण्याची सुविधा.
- सर्व containers प्रत्येक वेळी चालू करण्याची गरज नसते.
- Monitoring आणि Debug services profile मध्ये ठेवाव्यात.
- Production मध्ये फक्त आवश्यक services चालू असाव्यात.
- Resource optimization साठी Profiles उपयुक्त आहेत.

---

# 21. Marathi Summary (5+ Experience Revision)

## Interview Summary

Docker Compose Profiles वापरून आपण environment किंवा use-case नुसार specific services चालू करू शकतो.

Enterprise मध्ये Monitoring, Logging, Testing आणि Debugging services स्वतंत्र profiles मध्ये ठेवले जातात.

यामुळे deployment cleaner, faster आणि resource efficient बनतो.

### Production Investigation Flow

```
Deployment Issue

↓

docker compose ps

↓

docker compose config

↓

Verify Active Profile

↓

Check Running Services

↓

Review Pipeline

↓

Root Cause Analysis

↓

Permanent Fix
```

### 5+ Years Interview Tip

जर interviewer म्हणाला,

**"Production server वर unnecessary containers चालू आहेत आणि memory usage वाढली आहे. Investigation कशी कराल?"**

उत्तर:

"मी प्रथम active containers आणि compose configuration verify करेन, deployment दरम्यान कोणता profile enable झाला होता ते तपासेन, `docker stats` वापरून resource usage पाहीन, optional services identify करेन, आणि production मध्ये फक्त required profiles वापरण्याची खात्री करून RCA व preventive controls implement करेन."

