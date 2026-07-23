# Sprint 1 Summary - Docker Foundation

------------------------------------------------------------

Company        : TCS
Client         : Johnson & Johnson
Project        : Enterprise DevOps Platform
Sprint         : Sprint-1
Role           : DevOps Engineer

------------------------------------------------------------

# Sprint Goal

The objective of Sprint-1 was to containerize the complete Enterprise DevOps Platform and deploy all microservices using Docker and Docker Compose by following enterprise DevOps standards.

------------------------------------------------------------

# Business Requirement

The development team had completed the application.

Our responsibility as a DevOps Engineer was to:

• Containerize every microservice
• Standardize runtime environments
• Eliminate "Works on My Machine" issues
• Deploy all services using Docker Compose
• Prepare the application for CI/CD

------------------------------------------------------------

# Services Containerized

✔ API Gateway

Technology

- Flask
- Gunicorn

Host Port

8080

------------------------------------------------------------

✔ Auth Service

Technology

- Flask
- Gunicorn

Host Port

5000

------------------------------------------------------------

✔ Dashboard Service

Technology

- Flask
- Gunicorn

Host Port

5001

------------------------------------------------------------

✔ Frontend

Technology

- React
- Vite
- Nginx

Host Port

3001

------------------------------------------------------------

# Deliverables

✔ Dockerfile created for API Gateway

✔ Dockerfile created for Auth Service

✔ Dockerfile created for Dashboard Service

✔ Multi-stage Dockerfile created for Frontend

✔ Docker Compose file created

✔ Enterprise Docker Network created

✔ Multi-container deployment completed

------------------------------------------------------------

# Docker Images Created

enterprise/api-gateway:v1

enterprise/auth-service:v1

enterprise/dashboard-service:v1

enterprise/frontend:v1

------------------------------------------------------------

# Production Issues Faced

Issue 1

Gunicorn Worker Timeout

Symptoms

Application became unresponsive.

Investigation

- docker logs
- docker inspect
- docker image inspect

Observation

Container was healthy.

Worker restarted automatically.

Resolution

Validated configuration.

Verified application startup.

------------------------------------------------------------

Issue 2

Frontend Deployment Failed

Reason

Host Port 3000 already in use.

Investigation

sudo lsof -i :3000

Root Cause

Grafana service was already using Port 3000.

Resolution

Changed Frontend Host Port to 3001.

Production Decision

Did NOT stop Grafana.

Monitoring services should never be interrupted without approval.

------------------------------------------------------------

Issue 3

Docker Compose Warning

Warning

version is obsolete

Reason

Docker Compose V2 automatically detects the Compose specification.

Resolution

Remove the version field in future Compose files.

------------------------------------------------------------

# Docker Compose Deployment

Successfully deployed

✔ Frontend

✔ API Gateway

✔ Auth Service

✔ Dashboard Service

using

docker compose up -d

------------------------------------------------------------

# Commands Used

docker build

docker run

docker ps

docker logs

docker inspect

docker image inspect

docker stop

docker start

docker rm

docker compose up -d

docker compose ps

------------------------------------------------------------

# Skills Learned

Docker Architecture

Docker Images

Docker Containers

Dockerfile

Multi-stage Build

Docker Networking

Docker Compose

Port Mapping

Container Lifecycle

Troubleshooting

Container Inspection

Enterprise Deployment

------------------------------------------------------------

# Lessons Learned

• Always keep Docker images lightweight.

• Never hardcode secrets inside Dockerfiles.

• Use .env files for configuration.

• Use Docker Compose for multi-container applications.

• Validate containers using docker logs before restarting them.

• Investigate the root cause instead of blindly restarting containers.

• Avoid stopping monitoring tools like Grafana in shared environments.

------------------------------------------------------------

# Sprint Outcome

Sprint-1 completed successfully.

All services were containerized.

Complete application deployed using Docker Compose.

Production-like issues were investigated and resolved.

The application is now ready for Sprint-2 (Git Workflow & CI/CD).

------------------------------------------------------------

Next Sprint

Sprint-2

- Git Workflow
- Feature Branches
- Pull Requests
- GitHub Actions
- CI Pipeline
- Docker Registry
- Image Tagging

