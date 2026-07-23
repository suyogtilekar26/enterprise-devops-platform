# Docker Quick Revision Notes
# Enterprise DevOps Platform
# Sprint-1

=========================================================
DOCKER IN ONE MINUTE
=========================================================

Docker is a containerization platform that packages an application along with its dependencies, ensuring consistent execution across Development, QA, UAT, and Production environments.

=========================================================
DOCKER ARCHITECTURE
=========================================================

Developer
      |
Docker CLI
      |
Docker Engine (Daemon)
      |
Images --> Containers

=========================================================
IMPORTANT COMPONENTS
=========================================================

Docker Engine

Runs Docker services.

Docker Image

Read-only template used to create containers.

Docker Container

Running instance of an image.

Docker Registry

Stores Docker images.

Docker Hub

Public image registry.

=========================================================
DOCKERFILE INSTRUCTIONS
=========================================================

FROM

Defines the base image.

RUN

Executes commands during image build.

WORKDIR

Sets the working directory.

COPY

Copies files from the host.

ADD

Copies files and supports archive extraction and URLs.

CMD

Provides the default command.

ENTRYPOINT

Defines the main executable.

EXPOSE

Documents the application port.

ENV

Defines environment variables.

ARG

Defines build-time variables.

=========================================================
BEST PRACTICES
=========================================================

✔ Use lightweight base images.

✔ Use Multi-stage Builds.

✔ Keep one process per container.

✔ Use specific image tags.

✔ Avoid latest in Production.

✔ Keep images immutable.

✔ Use .dockerignore.

✔ Scan images for vulnerabilities.

✔ Remove unnecessary packages.

✔ Minimize image layers.

=========================================================
SECURITY CHECKLIST
=========================================================

✔ Never store passwords inside Dockerfile.

✔ Never commit secrets to Git.

✔ Run containers as non-root users.

✔ Scan images regularly.

✔ Use trusted base images.

✔ Keep dependencies updated.

✔ Rotate exposed credentials immediately.

=========================================================
COMMON MISTAKES
=========================================================

Using latest tag

Running everything as root

Large Docker images

Ignoring .dockerignore

Hardcoding credentials

Copying unnecessary files

Restarting containers without investigation

Ignoring logs

=========================================================
PRODUCTION GOLDEN RULES
=========================================================

Collect evidence first.

Never assume.

Read logs before restarting.

Validate configuration.

Understand the root cause.

Implement a permanent fix.

Validate after deployment.

Document RCA.

=========================================================
MOST IMPORTANT COMMANDS
=========================================================

docker build

docker run

docker ps

docker logs

docker exec

docker inspect

docker stats

docker images

docker network ls

docker volume ls

docker compose up -d

docker compose down

docker compose logs

docker system df

=========================================================
INTERVIEW GOLDEN RULES
=========================================================

Always explain the reason behind every action.

Speak using production examples.

Mention troubleshooting steps before giving the solution.

Differentiate between temporary fixes and permanent fixes.

Never guess the root cause.

Use structured answers.

=========================================================
REAL PROJECT LEARNINGS
=========================================================

Frontend was inaccessible after deployment.

Investigation:

docker compose ps

docker compose logs

sudo lsof -i :3000

Root Cause:

Grafana was already using port 3000.

Resolution:

Updated Docker Compose to expose the frontend on port 3001.

Learning:

Never stop another production service without validating the impact.

Always identify the actual root cause before making changes.

=========================================================
SPRINT-1 KEY LEARNINGS
=========================================================

✔ Docker Fundamentals

✔ Docker Architecture

✔ Dockerfile

✔ Docker Images

✔ Containers

✔ Networking

✔ Volumes

✔ Multi-stage Builds

✔ Docker Compose

✔ Troubleshooting

✔ Production Scenarios

✔ Interview Preparation

=========================================================
END OF DOCUMENT
=========================================================

