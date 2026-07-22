# Docker Compose Interview Questions

## Purpose

This document contains the most frequently asked Docker Compose interview questions from Enterprise DevOps, SRE, Platform Engineering, and Cloud Engineer interviews.

These questions are based on real production scenarios and are intended to prepare for interviews ranging from Junior DevOps Engineer to Senior DevOps Engineer.

---

# Introduction

Docker Compose is commonly discussed in interviews because it demonstrates a candidate's understanding of:

- Multi-container applications
- Container networking
- Configuration management
- Service orchestration
- Troubleshooting
- Production workflows
- CI/CD integration

Interviewers typically expect practical answers rather than textbook definitions.

---

# Basic Interview Questions

## 1. What is Docker Compose?

Answer

Docker Compose is a tool used to define and run multi-container Docker applications using a YAML configuration file. It allows multiple services to be started, stopped, and managed together using a single command.

---

## 2. Why do we use Docker Compose?

Answer

Docker Compose simplifies the management of applications consisting of multiple containers by handling networking, volumes, environment variables, startup order, and service definitions in a single file.

---

## 3. What file does Docker Compose use?

Answer

Docker Compose primarily uses

```text
docker-compose.yml
```

or

```text
compose.yaml
```

to define application services.

---

## 4. Difference between Docker and Docker Compose?

Answer

Docker manages individual containers.

Docker Compose manages multiple related containers together.

---

## 5. Difference between image and build?

Answer

`image`

- Uses an existing image

`build`

- Builds a new image from a Dockerfile

Development commonly uses `build`, while production uses versioned `image` tags.

---

## Intermediate Interview Questions

## 6. What is depends_on?

Answer

It defines startup and shutdown order between services.

It does **not** guarantee that the application inside the container is ready.

---

## 7. How do containers communicate?

Answer

Containers communicate through Docker networks using service names.

Example

```text
http://auth-service:5000
```

instead of IP addresses.

---

## 8. What is a Docker Volume?

Answer

A Docker Volume provides persistent storage that survives container deletion and recreation.

---

## 9. Difference between Bind Mount and Named Volume?

Answer

Bind Mount

- Maps a host directory

Named Volume

- Managed by Docker
- Recommended for production

---

## 10. What are Environment Variables?

Answer

Environment Variables provide runtime configuration without modifying application code.

Examples

- PORT
- DATABASE_URL
- JWT_SECRET
- APP_ENV

---

## 11. What is env_file?

Answer

`env_file` loads environment variables from external files instead of writing them directly inside the Compose file.

---

## 12. What is a Health Check?

Answer

A Health Check verifies that the application inside the container is actually functioning rather than simply confirming that the container process is running.

---

## 13. Why are Health Checks important?

Answer

They improve reliability, startup sequencing, monitoring, and automatic recovery.

---

## Advanced Interview Questions

## 14. Explain Docker Compose Networking.

Answer

Docker Compose automatically creates a bridge network and provides built-in DNS so containers communicate using service names.

---

## 15. Why shouldn't containers communicate using IP addresses?

Answer

Container IP addresses change whenever containers are recreated.

Service names remain constant.

---

## 16. What happens when you run

```bash
docker compose up
```

Answer

Compose

- Creates network
- Creates volumes
- Builds images (if required)
- Creates containers
- Starts containers
- Executes health checks

---

## 17. What happens when you run

```bash
docker compose down
```

Answer

Compose

- Stops containers
- Removes containers
- Removes default network

Named volumes remain unless explicitly removed.

---

## 18. Difference between

```bash
docker compose stop
```

and

```bash
docker compose down
```

Answer

stop

- Stops containers

down

- Stops and removes containers and networks

---

## 19. Which command validates a Compose file?

Answer

```bash
docker compose config
```

---

## 20. How do you debug Docker Compose?

Answer

Typical workflow

- docker compose ps
- docker compose logs
- docker inspect
- docker exec
- docker compose config
- docker network inspect
- docker volume inspect

---

# Scenario-Based Questions

## 21. Frontend cannot reach API Gateway.

What will you check?

Answer

- Service names
- Docker network
- Port mapping
- Health checks
- API logs
- Environment variables

---

## 22. Container continuously restarts.

What is your approach?

Answer

- View logs
- Inspect container
- Verify environment variables
- Verify startup command
- Check health checks

---

## 23. Application works locally but fails in CI.

Answer

Investigate

- Environment variables
- Missing files
- Build context
- Image versions
- Pipeline configuration

---

## 24. Login API returns HTTP 500.

Answer

Investigate

- Auth Service logs
- JWT configuration
- Database connectivity
- Health status
- Network communication

---

## Enterprise Questions

## 25. Does Docker Compose replace Kubernetes?

Answer

No.

Docker Compose is intended for local development, testing, and smaller deployments.

Kubernetes provides

- Auto-scaling
- High availability
- Self-healing
- Multi-node orchestration

---

## 26. Where is Docker Compose used in Enterprise?

Answer

- Development
- QA
- Integration testing
- CI/CD
- Proof of Concept
- Edge deployments

---

## 27. Why use Docker Compose before Kubernetes?

Answer

Compose validates multi-container applications before they are deployed to Kubernetes.

---

## 28. Why should images be built in CI?

Answer

To ensure

- Repeatable builds
- Image scanning
- Immutable artifacts
- Consistent deployments

---

## 29. Why avoid latest tags?

Answer

Because deployments become unpredictable and rollback becomes difficult.

---

## 30. Explain your Docker Compose production workflow.

Answer

Developer

↓

Git

↓

GitHub

↓

CI Pipeline

↓

Build Images

↓

Docker Compose Testing

↓

Registry

↓

Kubernetes

↓

Production

---

# Commands Interviewers Frequently Ask

Start application

```bash
docker compose up
```

Background

```bash
docker compose up -d
```

Stop

```bash
docker compose stop
```

Remove

```bash
docker compose down
```

Logs

```bash
docker compose logs
```

Build

```bash
docker compose build
```

Validate

```bash
docker compose config
```

Restart

```bash
docker compose restart
```

---

# Rapid Fire Questions

### Docker Compose file extension?

docker-compose.yml

---

### Default network driver?

bridge

---

### Health endpoint?

Usually

```text
/health
```

---

### Persistent storage?

Volumes

---

### Service communication?

Docker Network

---

### Configuration?

Environment Variables

---

### Validate Compose?

```bash
docker compose config
```

---

### Multi-container orchestration?

Docker Compose

---

# Marathi Quick Revision

Interview Keywords

- Services
- Networks
- Volumes
- Health Check
- Environment Variables
- depends_on
- Service Names
- Bridge Network
- Build
- Image

---

# Marathi Interview Memory Tip

Interview मध्ये Docker Compose बद्दल उत्तर देताना हा flow लक्षात ठेवा:

"Compose → Services → Networks → Volumes → Environment Variables → Health Checks → CI/CD → Registry → Kubernetes."

हा flow सांगितला तर interviewer ला practical knowledge असल्याचं जाणवतं.

---

# Key Takeaways

Docker Compose interview questions focus on practical knowledge rather than memorization. Be prepared to explain service orchestration, networking, persistent storage, configuration management, debugging, production workflows, and how Docker Compose integrates with CI/CD and Kubernetes. Answering with real-world scenarios and troubleshooting steps demonstrates enterprise-level understanding.

