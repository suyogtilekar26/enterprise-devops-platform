# Docker Compose Override & Multiple Compose Files

# 1. Purpose

Large enterprise applications rarely use a single Docker Compose file.

Different environments require different configurations.

Examples

- Development
- QA
- UAT
- Staging
- Production

Docker Compose supports multiple compose files so each environment can have its own configuration while sharing the same application definition.

---

# 2. Introduction

Instead of maintaining separate applications, enterprises maintain separate configuration.

Example

```
compose.yml

↓

Shared Configuration
```

```
compose.dev.yml

↓

Development Settings
```

```
compose.staging.yml

↓

Staging Settings
```

```
compose.prod.yml

↓

Production Settings
```

Docker merges these files during deployment.

---

# 3. Enterprise Usage

Real enterprise repositories

```
compose.yml

compose.dev.yml

compose.qa.yml

compose.uat.yml

compose.staging.yml

compose.prod.yml
```

Development

- Debug enabled
- Source code mounted
- Verbose logging

Production

- Optimized images
- Health checks
- Restart policies
- No bind mounts
- Production secrets

---

# 4. Usage in THIS Project

Our project will eventually contain

```
compose.yml

compose.dev.yml

compose.prod.yml

.env
```

Development

```
React Hot Reload

Debug Logging

Bind Mounts
```

Production

```
Optimized Images

Health Checks

Named Volumes

Production Environment Variables

Restart Policies
```

---

# 5. Architecture

```
compose.yml

        │

        ├──────── compose.dev.yml

        │

        ├──────── compose.prod.yml

        │

        ▼

Docker Compose

        │

Merged Configuration

        │

Application Deployment
```

---

# 6. Internal Workflow

Base Compose File

↓

Environment Override File

↓

Docker Compose Merge

↓

Configuration Validation

↓

Application Deployment

↓

Environment Ready

---

# 7. Common Compose Files

## Base File

```
compose.yml
```

Contains

- Services
- Networks
- Volumes

---

## Development

```
compose.dev.yml
```

Contains

- Debugging
- Bind Mounts
- Development Variables

---

## Production

```
compose.prod.yml
```

Contains

- Production Images
- Health Checks
- Restart Policies
- Production Environment Variables

---

# 8. Running Multiple Files

Development

```bash
docker compose \
-f compose.yml \
-f compose.dev.yml \
up -d
```

Production

```bash
docker compose \
-f compose.yml \
-f compose.prod.yml \
up -d
```

Docker automatically merges configurations.

---

# 9. Daily DevOps Activities

- Maintain environment-specific compose files
- Review configuration changes
- Validate merged configuration
- Test production deployment
- Verify environment variables
- Compare Dev and Production configurations
- Remove deprecated overrides

---

# 10. Production Best Practices

- Keep base compose file generic.
- Override only what changes.
- Never duplicate the complete configuration.
- Store production compose files in Git.
- Review production overrides carefully.
- Validate merged configuration before deployment.
- Keep environment variables external.

---

# 11. Security

Never

- Commit production secrets
- Hardcode passwords
- Store API keys inside compose files

Always

- Use Secret Managers
- Use GitHub Secrets
- Restrict compose file permissions
- Encrypt production credentials

---

# 12. Troubleshooting

Validate merged configuration

```bash
docker compose \
-f compose.yml \
-f compose.prod.yml \
config
```

Deploy

```bash
docker compose \
-f compose.yml \
-f compose.prod.yml \
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

---

# 13. Real Production Scenarios

## Scenario 1

Production deployment succeeded.

Application connected to Development database.

Investigation

```bash
docker compose \
-f compose.yml \
-f compose.prod.yml \
config
```

Root Cause

Production override file missing.

Default environment variables were used.

---

## Scenario 2

Frontend shows debug mode in Production.

Investigation

```bash
docker compose config

docker compose exec frontend env
```

Root Cause

compose.dev.yml accidentally included in production deployment.

---

## Scenario 3

Application crashes after deployment.

Investigation

```bash
docker compose config

docker compose logs
```

Root Cause

Production override replaced a required environment variable.

---

## Scenario 4

Deployment works locally but fails in CI/CD.

Investigation

```bash
docker compose config

docker compose ps
```

Root Cause

CI pipeline referenced the wrong compose override file.

---

# 14. Scenario Interview Q&A

**Q1. Why use multiple compose files?**

A:

To maintain environment-specific configuration while avoiding duplication.

---

**Q2. Which file should contain common configuration?**

The base compose file.

Environment-specific changes belong in override files.

---

**Q3. Can Docker Compose merge multiple files?**

Yes.

Later files override earlier configurations.

---

# 15. Architecture Interview Q&A

**Q1. Why not maintain completely separate compose files?**

Because duplicate configuration increases maintenance effort and configuration drift.

---

**Q2. Which configuration should be overridden?**

Only values that differ between environments, such as:

- Images
- Environment Variables
- Logging
- Debug Settings
- Health Checks

---

# 16. Production Support Interview Q&A

**Q1. Production application connected to the wrong database. Investigation order?**

1.

```bash
docker compose config
```

2.

```bash
docker compose exec api-gateway env
```

3.

Verify override files

4.

Review deployment pipeline

5.

Review Git changes

6.

Root Cause Analysis

---

**Q2. Local deployment works but production fails. Why?**

Possible reasons

- Wrong compose override
- Missing production variables
- Incorrect image tag
- Missing secrets
- CI/CD configuration issue

---

# 17. Related Runbooks

- docker-compose-service-failure.md
- docker-registry-authentication-failure.md
- docker-health-check-failures.md

---

# 18. Common Incidents

- Wrong Compose Override
- Production Misconfiguration
- Incorrect Environment Variables
- CI/CD Deployment Failure
- Configuration Drift

---

# 19. Commands

Development

```bash
docker compose \
-f compose.yml \
-f compose.dev.yml \
up -d
```

Production

```bash
docker compose \
-f compose.yml \
-f compose.prod.yml \
up -d
```

Validate merged configuration

```bash
docker compose \
-f compose.yml \
-f compose.prod.yml \
config
```

View services

```bash
docker compose ps
```

View logs

```bash
docker compose logs -f
```

---

# 20. Marathi Quick Revision

- एक compose file सर्व environments साठी पुरेशी नसते.
- Base file + Override file हा enterprise standard आहे.
- Production मध्ये dev compose file वापरू नये.
- `docker compose config` ने merged configuration verify करावी.
- Secrets compose file मध्ये ठेवू नयेत.

---

# 21. Marathi Summary (5+ Experience Revision)

## Interview Summary

Enterprise मध्ये एकच compose file वापरली जात नाही.

Base compose file मध्ये common configuration असते.

Development, QA, Staging आणि Production साठी स्वतंत्र override files असतात.

Docker Compose deployment वेळी या files merge करतो.

### Production Investigation Flow

```
Deployment Failed

↓

docker compose config

↓

Verify Override File

↓

Verify Environment Variables

↓

Review CI/CD Pipeline

↓

Compare Dev vs Production

↓

Root Cause Analysis

↓

Permanent Fix
```

### 5+ Years Interview Tip

जर interviewer म्हणाला,

**"Production deployment नंतर application wrong database ला connect झाली."**

नेहमी उत्तर द्या:

"First I'll validate the merged compose configuration using `docker compose config`, verify which override file was used during deployment, compare environment variables with the intended production configuration, review the CI/CD pipeline, identify the configuration drift, and implement a permanent fix to prevent incorrect compose overrides in future deployments."

