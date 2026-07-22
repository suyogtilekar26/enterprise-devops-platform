# Docker Compose File Structure

# 1. Purpose

The purpose of a Docker Compose file is to describe an entire multi-container application in a single YAML configuration.

Instead of manually executing multiple Docker commands, the compose file becomes the single source of truth for application deployment.

In enterprise environments, this file is version controlled and reviewed just like application code.

---

# 2. Introduction

A Docker Compose file is usually named:

```
docker-compose.yml
```

or

```
compose.yml
```

It defines:

- Services
- Networks
- Volumes
- Environment Variables
- Health Checks
- Restart Policies
- Build Instructions
- Container Names
- Dependencies

One file can recreate an entire application environment.

---

# 3. Enterprise Usage

Every enterprise project stores Docker Compose files in Git.

Common examples

Development

```
docker-compose.yml
```

Testing

```
docker-compose.test.yml
```

Staging

```
docker-compose.staging.yml
```

Production

```
docker-compose.prod.yml
```

Each environment has different configurations but follows the same structure.

---

# 4. Usage in THIS Project

Our project will contain multiple services.

```
Frontend

↓

API Gateway

↓

Auth Service

↓

Dashboard Service

↓

Prometheus

↓

Grafana
```

All services will be managed using Docker Compose.

---

# 5. Architecture

```
docker-compose.yml

│

├── Services

├── Networks

├── Volumes

└── Environment Variables

        │

        ▼

Docker Engine

        │

        ▼

Running Containers
```

---

# 6. Internal Workflow

Developer updates compose file

↓

Git Push

↓

CI Validation

↓

Compose Validation

↓

Docker Engine

↓

Network Creation

↓

Volume Creation

↓

Container Startup

↓

Application Ready

---

# 7. Basic Compose Structure

Example

```yaml
services:

  frontend:

  api-gateway:

  auth-service:

  dashboard-service:

networks:

volumes:
```

Everything starts from the **services** section.

---

# 8. Important Sections

## services

Defines all application containers.

Example

```yaml
services:
```

---

## image

Uses an existing Docker image.

Example

```yaml
image: nginx:latest
```

---

## build

Builds image from Dockerfile.

Example

```yaml
build: .
```

---

## ports

Maps host ports.

Example

```yaml
ports:
  - "8080:8080"
```

---

## environment

Defines environment variables.

Example

```yaml
environment:
  FLASK_ENV=production
```

---

## volumes

Provides persistent storage.

Example

```yaml
volumes:
  - postgres-data:/var/lib/postgresql/data
```

---

## networks

Allows containers to communicate.

Example

```yaml
networks:
  - backend-network
```

---

## depends_on

Controls startup order.

Example

```yaml
depends_on:
  - auth-service
```

---

## restart

Restart policy.

Example

```yaml
restart: unless-stopped
```

---

## healthcheck

Verifies application health.

Example

```yaml
healthcheck:
```

---

# 9. Daily DevOps Activities

- Add new services
- Update image versions
- Configure ports
- Add environment variables
- Modify networks
- Configure persistent volumes
- Add health checks
- Review compose changes
- Validate YAML
- Deploy updated services

---

# 10. Production Best Practices

- Keep compose files small and readable.
- Use YAML indentation correctly.
- Use named volumes.
- Never expose unnecessary ports.
- Store secrets outside compose files.
- Add health checks.
- Use restart policies.
- Validate configuration before deployment.
- Use environment-specific compose files.

---

# 11. Security

Never

- Store passwords
- Store API keys
- Mount entire host filesystem
- Use privileged containers

Always

- Use secrets management
- Limit exposed ports
- Use trusted images
- Run containers as non-root

---

# 12. Troubleshooting

Validate YAML

```bash
docker compose config
```

Start services

```bash
docker compose up -d
```

View services

```bash
docker compose ps
```

Logs

```bash
docker compose logs
```

Inspect network

```bash
docker network ls
```

---

# 13. Real Production Scenarios

## Scenario 1

Deployment succeeds.

Frontend works.

Backend unavailable.

Investigation

```bash
docker compose ps

docker compose logs

docker compose config
```

Root Cause

Wrong port mapping.

---

## Scenario 2

Containers start.

Database unreachable.

Investigation

```bash
docker inspect

docker network inspect

docker compose exec api-gateway ping postgres
```

Root Cause

Database service attached to a different network.

---

## Scenario 3

Compose file updated.

Application crashes immediately.

Investigation

```bash
docker compose config

docker compose logs
```

Root Cause

Invalid YAML indentation.

---

# 14. Scenario Interview Q&A

**Q1. Why is docker-compose.yml considered Infrastructure as Code?**

Because it declaratively defines the complete container infrastructure and can recreate identical environments.

---

**Q2. Which section is most important?**

The **services** section because it defines all application containers.

---

**Q3. Why should compose files be stored in Git?**

Version control, collaboration, auditing, rollback, and CI/CD integration.

---

# 15. Architecture Interview Q&A

**Q1. Can one compose file create the complete application?**

Yes. It creates containers, networks, volumes, environment variables, restart policies, and dependencies.

---

**Q2. Why separate compose files for development and production?**

Because configuration, debugging options, ports, logging, and scaling requirements differ across environments.

---

# 16. Production Support Interview Q&A

**Q1. Compose deployment succeeded but one service is missing. Investigation?**

1. docker compose ps
2. docker compose logs
3. docker compose config
4. docker inspect
5. Check restart policy
6. Verify image build
7. Review YAML syntax

---

**Q2. Compose file works locally but fails in CI. Why?**

Possible reasons

- Missing environment variables
- Incorrect relative paths
- Missing secrets
- Different Docker Compose version
- Invalid build context

---

# 17. Related Runbooks

- docker-compose-service-failure.md
- docker-network-connectivity-issue.md
- docker-container-crash-loop.md

---

# 18. Common Incidents

- Compose Service Failure
- Wrong Network Configuration
- Invalid YAML Configuration
- Missing Environment Variables
- Container Startup Failure

---

# 19. Commands

Validate compose file

```bash
docker compose config
```

Start services

```bash
docker compose up -d
```

Stop services

```bash
docker compose down
```

List services

```bash
docker compose ps
```

View logs

```bash
docker compose logs -f
```

---

# 20. Marathi Quick Revision

- Compose file म्हणजे संपूर्ण application ची blueprint.
- Services हा सर्वात महत्त्वाचा section आहे.
- Networks आणि Volumes Compose मधून तयार होतात.
- YAML formatting खूप महत्त्वाची आहे.
- Production मध्ये compose files Git मध्ये ठेवले जातात.

---

# 21. Marathi Summary (5+ Experience Revision)

## Interview Summary

Docker Compose file म्हणजे multi-container application ची Infrastructure as Code configuration.

Production मध्ये ही file review, version control आणि CI/CD validation मधून जाते.

यामध्ये services, networks, volumes, environment variables, health checks आणि restart policies define केले जातात.

### Production Investigation Flow

```
Compose File

↓

docker compose config

↓

docker compose ps

↓

docker compose logs

↓

docker inspect

↓

Network Verification

↓

Health Check

↓

Root Cause Analysis

↓

Permanent Fix
```

**5+ Years Interview Tip**

Interview मध्ये फक्त YAML syntax सांगू नका.

नेहमी explain करा की compose file production deployment मध्ये कशी validate होते, services कशा communicate करतात, आणि troubleshooting करताना investigation order काय असतो.

