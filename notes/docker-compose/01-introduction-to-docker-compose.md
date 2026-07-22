# Docker Compose

# 1. Purpose

Docker Compose is a tool used to define and manage multi-container applications using a single YAML configuration file.

Instead of manually creating networks, volumes, and multiple containers one by one, Docker Compose automates the complete application deployment with a single command.

In enterprise environments, Docker Compose is commonly used for:

- Local development
- QA environments
- Integration testing
- Staging environments
- Small production deployments
- CI/CD validation

---

# 2. Introduction

Most enterprise applications consist of multiple services.

Example

- Frontend
- API Gateway
- Authentication Service
- Dashboard Service
- PostgreSQL
- Redis
- Prometheus
- Grafana

Starting each container individually is difficult and error-prone.

Docker Compose solves this problem by allowing all services to be defined inside one configuration file.

Example

```
docker compose up -d
```

This single command can:

- Create networks
- Create volumes
- Pull images
- Build images
- Start containers
- Configure dependencies
- Configure environment variables

---

# 3. Enterprise Usage

Docker Compose is widely used for:

Development Teams

- Local application setup
- Feature testing

QA Teams

- Integration testing
- Regression testing

DevOps Teams

- Build validation
- CI pipeline testing
- Environment recreation

Production (Small Scale)

- Internal applications
- Utility services
- Monitoring stacks
- Build servers

Large production workloads generally migrate to Kubernetes.

---

# 4. Usage in THIS Project

Our Enterprise DevOps Platform contains four services.

```
Frontend (React)

↓

API Gateway

↓

Auth Service

↓

Dashboard Service
```

Docker Compose will manage

- Frontend
- API Gateway
- Auth Service
- Dashboard Service

Future additions

- Prometheus
- Grafana
- Node Exporter

Everything will be managed from a single compose file.

---

# 5. Architecture

```
docker-compose.yml

        │

        ▼

Docker Compose Engine

        │

 ┌──────┼────────┐

 ▼      ▼        ▼

Network Volume Containers

                 │

   ┌─────────────┼──────────────┐

   ▼             ▼              ▼

Frontend    API Gateway    Backend Services
```

---

# 6. Internal Workflow

Developer

↓

Runs

```
docker compose up -d
```

↓

Compose Reads YAML

↓

Creates Network

↓

Creates Volumes

↓

Builds Images

↓

Starts Containers

↓

Verifies Dependencies

↓

Application Ready

---

# 7. Daily DevOps Activities

Typical responsibilities

- Modify compose files
- Add new services
- Configure environment variables
- Configure networks
- Configure persistent volumes
- Build images
- Troubleshoot startup failures
- Validate service dependencies
- Review logs
- Restart failed services

---

# 8. Production Best Practices

- Keep compose files version controlled.
- Use environment variables.
- Never hardcode secrets.
- Use health checks.
- Define restart policies.
- Use named volumes.
- Use custom networks.
- Separate development and production compose files.
- Validate compose configuration before deployment.

---

# 9. Security

Never

- Store passwords inside compose files.
- Expose unnecessary ports.
- Run containers as root.
- Mount sensitive host directories.

Always

- Use least privilege.
- Use secrets management where applicable.
- Restrict exposed ports.
- Scan images before deployment.

---

# 10. Troubleshooting

Validate compose file

```bash
docker compose config
```

List services

```bash
docker compose ps
```

View logs

```bash
docker compose logs
```

Restart services

```bash
docker compose restart
```

Stop environment

```bash
docker compose down
```

---

# 11. Real Production Scenarios

## Scenario 1

Friday evening deployment.

Compose file updated.

API Gateway starts successfully.

Frontend returns HTTP 502.

Investigation

```bash
docker compose ps
docker compose logs api-gateway
docker network inspect enterprise-network
curl http://api-gateway:8080/health
```

Root Cause

Frontend connected to an old network.

---

## Scenario 2

Developer adds PostgreSQL.

Application cannot connect.

Investigation

```bash
docker compose logs postgres
docker compose exec api-gateway ping postgres
docker compose config
```

Root Cause

Incorrect service name in environment variables.

---

## Scenario 3

Production server rebooted.

Containers never restarted.

Investigation

```bash
docker compose ps
docker inspect api-gateway
```

Root Cause

Restart policy missing.

---

# 12. Scenario Interview Q&A

**Q1. Why use Docker Compose instead of running multiple docker run commands?**

A:

Compose provides Infrastructure as Code for multi-container applications, ensuring consistent, repeatable deployments with version-controlled configurations.

---

**Q2. Can Docker Compose be used in production?**

A:

Yes, for smaller environments and internal applications. Large-scale enterprise production environments typically use Kubernetes.

---

**Q3. What happens when docker compose up -d is executed?**

A:

Compose validates the YAML, creates networks and volumes, builds or pulls images, starts containers, applies dependencies, and launches the complete application stack.

---

# 13. Architecture Interview Q&A

**Q1. Why is Docker Compose considered Infrastructure as Code?**

Because the complete infrastructure configuration is stored declaratively in a YAML file and can be recreated consistently.

---

**Q2. How does Docker Compose manage service communication?**

By creating a dedicated Docker network where services communicate using service names as DNS hostnames.

---

# 14. Production Support Interview Q&A

**Q1. Frontend is healthy but API calls fail. Investigation order?**

1. docker compose ps
2. docker compose logs
3. docker network inspect
4. Verify environment variables
5. Test internal connectivity
6. Verify health endpoints
7. Review recent deployment changes

---

**Q2. Compose deployment succeeds but users receive 503 errors. What will you check?**

- Health checks
- Container logs
- Reverse proxy configuration
- Network connectivity
- Service dependencies
- Backend availability
- Resource utilization

---

# 15. Related Runbooks

- docker-compose-service-failure.md
- docker-network-connectivity-issue.md
- docker-health-check-failures.md

---

# 16. Common Incidents

- Docker Compose Service Failure
- Network Connectivity Failure
- Registry Authentication Failure
- Health Check Failure
- Volume Misconfiguration

---

# 17. Commands

Start services

```bash
docker compose up -d
```

Stop services

```bash
docker compose down
```

Restart service

```bash
docker compose restart api-gateway
```

View logs

```bash
docker compose logs -f
```

View running services

```bash
docker compose ps
```

Validate compose file

```bash
docker compose config
```

---

# 18. Marathi Quick Revision

- Docker Compose = Multi-container management.
- YAML file मध्ये संपूर्ण application define होते.
- Single command ने complete environment तयार होते.
- Development आणि staging मध्ये सर्वाधिक वापर.
- Kubernetes शिकण्यापूर्वी Compose मजबूत असणे आवश्यक.

---

# 19. Marathi Interview Memory Tips

लक्षात ठेवा

Compose File

↓

Network

↓

Volume

↓

Build

↓

Container

↓

Health Check

↓

Application Ready

---

# 20. Key Takeaways

- Docker Compose manages complete multi-container applications.
- It provides Infrastructure as Code for containerized environments.
- It simplifies development, testing, and CI/CD workflows.
- Proper networking, volumes, and health checks are critical.
- Strong Docker Compose knowledge is expected before moving to Kubernetes.
