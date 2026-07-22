# Docker Compose Environment Variables

# 1. Purpose

Environment variables allow applications to receive configuration at runtime without modifying the application source code.

Instead of hardcoding values inside the application, configuration is supplied externally.

Examples

- Database Host
- Database Port
- API URLs
- JWT Secret
- Application Environment
- Log Level

This follows the Twelve-Factor App methodology and is an enterprise best practice.

---

# 2. Introduction

Without environment variables

```
Database Host

↓

Hardcoded in Code

↓

Application Rebuild Required
```

With environment variables

```
Compose File

↓

Environment Variables

↓

Container

↓

Application Reads Configuration
```

This makes deployments flexible across Development, QA, Staging, and Production.

---

# 3. Enterprise Usage

Every enterprise application uses environment variables.

Common examples

```
APP_ENV

DATABASE_HOST

DATABASE_PORT

DATABASE_NAME

DATABASE_USER

REDIS_HOST

JWT_SECRET

LOG_LEVEL

API_URL
```

Different environments use different values while the application code remains unchanged.

---

# 4. Usage in THIS Project

Our project will use environment variables for

```
Frontend

↓

API Gateway URL

↓

Auth Service URL

↓

Dashboard Service URL

↓

JWT Secret

↓

Application Environment
```

Database variables will be added when PostgreSQL is introduced.

---

# 5. Architecture

```
Compose File

        │

Environment Variables

        │

        ▼

Container

        │

Application Startup

        │

Configuration Loaded
```

---

# 6. Internal Workflow

Developer Updates Compose File

↓

Environment Variables Loaded

↓

Container Starts

↓

Application Reads Variables

↓

Application Connects to Services

↓

Application Ready

---

# 7. Ways to Define Environment Variables

## Inline

Example

```yaml
environment:
  APP_ENV: production
  LOG_LEVEL: INFO
```

---

## List Format

```yaml
environment:
  - APP_ENV=production
  - LOG_LEVEL=INFO
```

---

## .env File

Example

```
APP_ENV=production
LOG_LEVEL=INFO
DATABASE_HOST=postgres
```

Compose

```yaml
env_file:
  - .env
```

Production environments generally prefer external configuration management.

---

# 8. Why Environment Variables?

Advantages

- No code changes
- Environment-specific configuration
- Easier deployments
- Better CI/CD integration
- Easier secret rotation
- Configuration portability

---

# 9. Daily DevOps Activities

- Update environment variables
- Rotate credentials
- Validate configuration
- Verify service URLs
- Troubleshoot startup failures
- Review deployment variables
- Maintain .env files
- Validate CI/CD secrets

---

# 10. Production Best Practices

- Never hardcode secrets.
- Use separate configuration for each environment.
- Validate required variables before deployment.
- Keep secrets outside Git.
- Rotate credentials regularly.
- Document mandatory variables.
- Use secret management solutions for production.

---

# 11. Security

Never

- Commit .env files containing secrets.
- Store passwords in Git.
- Share production secrets.

Always

- Use GitHub Secrets
- Use Vault or cloud secret managers
- Rotate secrets
- Restrict access using least privilege

---

# 12. Troubleshooting

View environment variables

```bash
docker compose exec api-gateway env
```

Inspect container

```bash
docker inspect api-gateway
```

Validate compose file

```bash
docker compose config
```

Restart service

```bash
docker compose restart api-gateway
```

---

# 13. Real Production Scenarios

## Scenario 1

Application starts.

Database connection fails.

Investigation

```bash
docker compose exec api-gateway env

docker compose logs api-gateway
```

Root Cause

DATABASE_HOST was incorrect.

---

## Scenario 2

Frontend displays

```
Network Error
```

Investigation

```bash
docker compose exec frontend env

docker compose logs frontend
```

Root Cause

API Gateway URL pointed to the staging environment.

---

## Scenario 3

Authentication suddenly fails.

Investigation

```bash
docker compose exec auth-service env

docker compose logs auth-service
```

Root Cause

JWT_SECRET changed during deployment but API Gateway still used the old value.

---

## Scenario 4

Application crashes immediately.

Investigation

```bash
docker compose logs

docker compose config
```

Root Cause

Mandatory environment variable missing after CI/CD deployment.

---

# 14. Scenario Interview Q&A

**Q1. Why use environment variables instead of hardcoding configuration?**

A:

Environment variables separate configuration from code, allowing the same application image to be deployed across multiple environments without rebuilding.

---

**Q2. Where should production secrets be stored?**

Not inside Docker Compose or Git repositories.

Use secret management systems such as GitHub Secrets, HashiCorp Vault, AWS Secrets Manager, or Kubernetes Secrets.

---

**Q3. What happens if a required environment variable is missing?**

Application startup may fail or default configuration may be used, leading to unexpected production issues.

---

# 15. Architecture Interview Q&A

**Q1. Why is external configuration important in microservices?**

It allows each environment to use different settings while keeping application binaries identical.

---

**Q2. Can the same Docker image be deployed to Dev, QA, and Production?**

Yes.

Only the environment variables change.

---

# 16. Production Support Interview Q&A

**Q1. Application works locally but fails after deployment. Investigation?**

1.

```bash
docker compose exec api-gateway env
```

2.

```bash
docker compose logs
```

3.

```bash
docker inspect
```

4.

```bash
docker compose config
```

5.

Compare deployment variables

6.

Validate secrets

---

**Q2. Authentication suddenly stopped working after release. What will you check?**

- JWT Secret
- API URLs
- Environment variables
- Secret rotation
- Deployment history
- Recent configuration changes

---

# 17. Related Runbooks

- docker-compose-service-failure.md
- docker-registry-authentication-failure.md
- docker-health-check-failures.md

---

# 18. Common Incidents

- Missing Environment Variable
- Wrong Database Host
- Invalid API URL
- Secret Rotation Failure
- Authentication Failure

---

# 19. Commands

Display variables

```bash
docker compose exec api-gateway env
```

Inspect container

```bash
docker inspect api-gateway
```

Validate compose configuration

```bash
docker compose config
```

Restart service

```bash
docker compose restart api-gateway
```

View logs

```bash
docker compose logs api-gateway
```

---

# 20. Marathi Quick Revision

- Environment Variables म्हणजे runtime configuration.
- Secrets Git मध्ये ठेवू नयेत.
- .env file development साठी उपयोगी आहे.
- Production मध्ये Secret Manager वापरावा.
- Code बदलण्यापेक्षा configuration बदलणे योग्य.

---

# 21. Marathi Summary (5+ Experience Revision)

## Interview Summary

Environment Variables मुळे application आणि configuration वेगळी ठेवता येते.

Production मध्ये एकच Docker image Dev, QA आणि Production मध्ये वापरली जाते; फक्त environment variables बदलतात.

### Production Investigation Flow

```
Application Failure

↓

docker compose exec <service> env

↓

docker compose logs

↓

docker inspect

↓

docker compose config

↓

Verify Secrets

↓

Verify Service URLs

↓

Root Cause Analysis

↓

Permanent Fix
```

### 5+ Years Interview Tip

जर interviewer म्हणाला,

**"Deployment successful आहे पण application database ला connect होत नाही."**

Investigation sequence सांगा:

Environment Variables → Database Host → Secrets → Logs → Container Inspect → Deployment Configuration → RCA → Preventive Action.

Production मध्ये configuration issues हे code issues पेक्षा जास्त common असतात.

