# Docker Compose Project Name

# 1. Purpose

Docker Compose Project Name is used to logically group all resources that belong to a single deployment.

A project includes

- Containers
- Networks
- Volumes
- Images (optionally)
- Service Names

Without project names, multiple Docker Compose deployments running on the same server can conflict with each other.

---

# 2. Introduction

When Docker Compose starts an application, it automatically creates a project.

Example

Project Name

```
enterprise-devops-platform
```

Resources created

```
enterprise-devops-platform-api-gateway-1

enterprise-devops-platform-auth-service-1

enterprise-devops-platform-dashboard-service-1

enterprise-devops-platform_default

enterprise-devops-platform_postgres_data
```

Everything is grouped under one logical project.

---

# 3. Enterprise Usage

Large organizations run multiple environments on the same server.

Example

```
Development

↓

Project Name

enterprise-dev-devops
```

```
QA

↓

Project Name

enterprise-qa-devops
```

```
Staging

↓

Project Name

enterprise-stage-devops
```

```
Production

↓

Project Name

enterprise-prod-devops
```

Each deployment remains isolated.

---

# 4. Usage in THIS Project

Development

```
enterprise-devops-platform-dev
```

QA

```
enterprise-devops-platform-qa
```

Production

```
enterprise-devops-platform-prod
```

This prevents

- Network conflicts
- Volume conflicts
- Container naming conflicts

---

# 5. Architecture

```
Project Name

        │

        ├──────── Containers

        ├──────── Networks

        ├──────── Volumes

        └──────── Services

                │

        Logical Isolation
```

---

# 6. Internal Workflow

docker compose up

↓

Compose Reads Project Name

↓

Creates Project Namespace

↓

Creates Network

↓

Creates Volumes

↓

Creates Containers

↓

Application Ready

---

# 7. How Docker Determines Project Name

Priority Order

1.

```
-p
```

command-line option

Example

```bash
docker compose -p enterprise-dev up -d
```

---

2.

Environment Variable

```
COMPOSE_PROJECT_NAME
```

Example

```bash
export COMPOSE_PROJECT_NAME=enterprise-dev
```

---

3.

Compose File

```yaml
name: enterprise-devops-platform
```

---

4.

Current Directory Name

If nothing is specified, Docker uses the current folder name.

---

# 8. Example

Compose File

```yaml
name: enterprise-devops-platform

services:

  api-gateway:

    image: api-gateway
```

Container Name

```
enterprise-devops-platform-api-gateway-1
```

Network

```
enterprise-devops-platform_default
```

Volume

```
enterprise-devops-platform_postgres_data
```

---

# 9. Daily DevOps Activities

- Verify project names
- Deploy multiple environments
- Remove old projects
- Troubleshoot naming conflicts
- Review Docker resources
- Clean unused networks
- Clean unused volumes

---

# 10. Production Best Practices

- Use meaningful project names.
- Keep naming consistent across environments.
- Include environment identifier.
- Avoid generic names like "project".
- Document naming standards.
- Use project names in automation scripts.

Example

```
company-app-prod

company-app-stage

company-app-dev
```

---

# 11. Security

Project names improve operational isolation but are not security boundaries.

Always

- Separate production resources
- Use different networks
- Apply least privilege
- Avoid mixing development and production deployments

---

# 12. Troubleshooting

List projects

```bash
docker compose ls
```

View containers

```bash
docker ps
```

View networks

```bash
docker network ls
```

View volumes

```bash
docker volume ls
```

Inspect container

```bash
docker inspect enterprise-devops-platform-api-gateway-1
```

---

# 13. Real Production Scenarios

## Scenario 1

Development deployment accidentally stopped Production containers.

Investigation

```bash
docker compose ls

docker ps
```

Root Cause

Both environments used the same project name.

---

## Scenario 2

Production deployment failed.

Network already existed.

Investigation

```bash
docker network ls
```

Root Cause

Another deployment created the same project network.

---

## Scenario 3

Database data disappeared after deployment.

Investigation

```bash
docker volume ls
```

Root Cause

Deployment used a different project name.

A new volume was created instead of reusing the existing one.

---

## Scenario 4

CI/CD deployment created duplicate containers.

Investigation

```bash
docker compose ls

docker ps
```

Root Cause

Pipeline generated different project names on every execution.

---

# 14. Scenario Interview Q&A

**Q1. What is a Docker Compose Project?**

A:

A logical grouping of containers, networks, and volumes managed together.

---

**Q2. Why use project names?**

To isolate deployments and avoid resource conflicts.

---

**Q3. What happens if no project name is specified?**

Docker Compose uses the current directory name.

---

# 15. Architecture Interview Q&A

**Q1. Can multiple environments run on one Docker host?**

Yes.

Using different project names keeps resources isolated.

---

**Q2. Why is project naming important in CI/CD?**

Consistent naming prevents duplicate deployments, naming conflicts, and accidental deletion of existing resources.

---

# 16. Production Support Interview Q&A

**Q1. Production deployment created duplicate containers. Investigation?**

1.

```bash
docker compose ls
```

2.

```bash
docker ps
```

3.

Review project name

4.

Review deployment pipeline

5.

Review compose configuration

6.

Perform RCA

---

**Q2. Why can't services communicate after deployment?**

Possible causes

- Wrong project name
- Wrong network
- Duplicate deployment
- Incorrect compose configuration
- Different deployment namespace

---

# 17. Related Runbooks

- docker-network-connectivity-failure.md
- docker-compose-service-failure.md
- docker-volume-data-loss.md

---

# 18. Common Incidents

- Duplicate Containers
- Network Conflict
- Volume Conflict
- Wrong Project Name
- CI/CD Naming Issue

---

# 19. Commands

List compose projects

```bash
docker compose ls
```

Deploy with project name

```bash
docker compose -p enterprise-prod up -d
```

View containers

```bash
docker ps
```

View networks

```bash
docker network ls
```

View volumes

```bash
docker volume ls
```

Inspect container

```bash
docker inspect CONTAINER_NAME
```

---

# 20. Marathi Quick Revision

- Project Name म्हणजे Docker Compose deployment ची logical identity.
- Containers, Networks आणि Volumes project नावाखाली तयार होतात.
- प्रत्येक environment साठी वेगळे project name वापरावे.
- Directory नाव default project name म्हणून वापरले जाते.
- CI/CD मध्ये consistent project naming आवश्यक आहे.

---

# 21. Marathi Summary (5+ Experience Revision)

## Interview Summary

Docker Compose Project Name मुळे एका Docker Host वर अनेक environments सुरक्षितपणे चालवता येतात.

Project Name मुळे Containers, Networks आणि Volumes वेगळे राहतात आणि resource conflicts टाळले जातात.

### Production Investigation Flow

```
Deployment Issue

↓

docker compose ls

↓

docker ps

↓

docker network ls

↓

docker volume ls

↓

Verify Project Name

↓

Review CI/CD Pipeline

↓

Root Cause Analysis

↓

Permanent Fix
```

### Production Story

एका shared Linux server वर QA आणि Production दोन्ही deployments चालू होते.

CI/CD pipeline मध्ये project name hardcode केला नव्हता.

एका deployment नंतर QA deployment ने Production containers replace केले.

Incident नंतर environment-specific project naming (`enterprise-devops-platform-dev`, `-qa`, `-prod`) लागू करण्यात आले आणि pipeline validation जोडले गेले.

### 5+ Years Memory Trick

जर interviewer विचारेल,

**"Docker Compose Project Name का महत्त्वाचा आहे?"**

उत्तर:

"Project Name हा Docker Compose चा namespace आहे. तो containers, networks आणि volumes logically isolate करतो. Enterprise environments मध्ये Dev, QA, Staging आणि Production एकाच Docker host वर चालवायचे असतील तर unique project names अत्यावश्यक असतात. CI/CD मध्ये consistent project naming नसल्यास duplicate deployments, network conflicts आणि accidental service replacement सारखे production incidents होऊ शकतात."

