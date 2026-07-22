# Docker Compose Cheat Sheet (Production Quick Reference)

# 1. Purpose

This document is a one-stop production reference for Docker Compose commands, troubleshooting steps, deployment workflow, and interview revision.

It is intended for daily DevOps operations and rapid interview preparation.

---

# 2. Introduction

Instead of remembering dozens of commands individually, this cheat sheet groups them by activity.

- Deployment
- Troubleshooting
- Monitoring
- Cleanup
- Scaling
- Networking
- Volumes
- Images
- Logs

---

# 3. Enterprise Usage

Production engineers commonly use this during

- Deployments
- Incident response
- RCA
- Health verification
- Production support
- Disaster recovery
- On-call activities

---

# 4. Usage in THIS Project

Commands apply to

- Frontend
- API Gateway
- Auth Service
- Dashboard Service
- Future PostgreSQL
- Future Redis
- Monitoring Stack

---

# 5. Deployment Commands

Start all services

```bash
docker compose up -d
```

Build and start

```bash
docker compose up --build -d
```

Stop services

```bash
docker compose stop
```

Start stopped services

```bash
docker compose start
```

Restart services

```bash
docker compose restart
```

Destroy deployment

```bash
docker compose down
```

Destroy with volumes

```bash
docker compose down -v
```

---

# 6. Validation Commands

Validate configuration

```bash
docker compose config
```

List services

```bash
docker compose ps
```

List all containers

```bash
docker ps -a
```

---

# 7. Logging Commands

View logs

```bash
docker compose logs
```

Follow logs

```bash
docker compose logs -f
```

Single service logs

```bash
docker compose logs api-gateway
```

Last 100 lines

```bash
docker compose logs --tail=100
```

---

# 8. Image Commands

Build images

```bash
docker compose build
```

Pull images

```bash
docker compose pull
```

Push images

```bash
docker compose push
```

List images

```bash
docker images
```

---

# 9. Container Commands

Inspect container

```bash
docker inspect api-gateway
```

Execute shell

```bash
docker exec -it api-gateway sh
```

View processes

```bash
docker top api-gateway
```

Container statistics

```bash
docker stats
```

---

# 10. Network Commands

List networks

```bash
docker network ls
```

Inspect network

```bash
docker network inspect enterprise-devops-platform_default
```

---

# 11. Volume Commands

List volumes

```bash
docker volume ls
```

Inspect volume

```bash
docker volume inspect volume_name
```

---

# 12. Scaling Commands

Scale API

```bash
docker compose up --scale api-gateway=3 -d
```

Scale Auth

```bash
docker compose up --scale auth-service=2 -d
```

---

# 13. Cleanup Commands

Remove unused resources

```bash
docker system prune
```

Remove unused images

```bash
docker image prune
```

Remove unused volumes

```bash
docker volume prune
```

Disk usage

```bash
docker system df
```

---

# 14. Production Troubleshooting Flow

```
Incident

↓

docker compose ps

↓

docker compose logs

↓

docker inspect

↓

Health Check

↓

docker stats

↓

Network

↓

Environment Variables

↓

Root Cause Analysis
```

---

# 15. Production Best Practices

- Use immutable image tags.
- Always validate compose files.
- Configure health checks.
- Enable restart policies.
- Store secrets externally.
- Monitor every service.
- Centralize logs.
- Keep compose files under version control.
- Use CI/CD for deployments.
- Document every production change.

---

# 16. Interview Rapid Fire

**Q:** Compose or Docker?

**A:** Docker runs containers. Compose manages multi-container applications.

---

**Q:** Running vs Healthy?

**A:** Running means process exists. Healthy means application is operational.

---

**Q:** Why health checks?

**A:** Detect application readiness and failures.

---

**Q:** Why restart policies?

**A:** Automatic recovery from crashes.

---

**Q:** Why avoid latest tag?

**A:** Predictable deployments and easy rollback.

---

**Q:** When move to Kubernetes?

**A:** When HA, orchestration, auto-scaling and self-healing become requirements.

---

# 17. Related Runbooks

- docker-compose-service-failure.md
- docker-container-crash-loop.md
- docker-health-check-failures.md
- docker-log-disk-full.md
- docker-resource-exhaustion.md

---

# 18. Common Incidents

- Container Exit
- Restart Loop
- Wrong Image
- Missing Secrets
- Health Check Failure
- High CPU
- OOM
- Disk Full
- Network Failure
- Deployment Failure

---

# 19. Daily DevOps Checklist

- Validate compose file
- Pull latest approved images
- Deploy
- Verify health
- Review logs
- Check CPU and memory
- Confirm monitoring
- Verify backups
- Update documentation
- Close deployment ticket

---

# 20. Marathi Quick Revision

- `docker compose config` नेहमी चालवा.
- Logs हा पहिला investigation point आहे.
- Running म्हणजे Healthy नाही.
- `latest` image tag टाळा.
- CI/CD मधून deployment करा.

---

# 21. Marathi Summary (5+ Experience Revision)

## Interview Summary

ही Cheat Sheet production support, deployment आणि interview preparation साठी जलद reference आहे.

Senior DevOps Engineer commands पाठ करत नाही; योग्य investigation order लक्षात ठेवतो.

### Production Investigation Flow

```
Alert

↓

docker compose ps

↓

docker compose logs

↓

docker inspect

↓

Health Check

↓

docker stats

↓

Infrastructure

↓

RCA

↓

Permanent Fix
```

### Production Story

एका production deployment नंतर monitoring ने API latency alert दिला.

`docker compose ps` मध्ये सर्व containers Running होते.

`docker compose logs` मध्ये कोणतीही error नव्हती.

`docker stats` मध्ये PostgreSQL CPU 100% दिसला.

समस्या Docker Compose मध्ये नव्हती; bottleneck database layer मध्ये होता.

### 5+ Years Memory Trick

जर interviewer विचारेल,

**"Production issue आला तर Docker Compose मध्ये पहिल्या 5 commands कोणत्या?"**

उत्तर:

1. `docker compose ps`
2. `docker compose logs`
3. `docker inspect`
4. `docker stats`
5. `docker compose config`

हे पाच commands बहुतेक Docker Compose production incidents ची सुरुवातीची investigation पूर्ण करतात.

