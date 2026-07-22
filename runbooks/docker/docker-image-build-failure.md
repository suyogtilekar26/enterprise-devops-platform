# Docker Runbook 03 - Docker Image Build Failure

# Purpose

Provide a standardized procedure to investigate and resolve Docker image build failures in local development, CI/CD pipelines, and production build environments.

---

# Severity

**Typical Severity:** SEV-2

Escalate to SEV-1 if production deployments are blocked.

---

# Symptoms

- `docker build` fails
- GitHub Actions Docker build stage fails
- Image is not created
- Build exits with non-zero status
- Dependency installation fails
- Multi-stage build fails

---

# Prerequisites

- Docker installed
- Access to source code
- Dockerfile available
- Access to CI/CD logs (if applicable)

---

# Investigation

## Step 1 - Review Build Error

Run

```bash
docker build -t test-image .
```

Record the exact error message.

---

## Step 2 - Verify Dockerfile

```bash
cat Dockerfile
```

Review

- Base image
- COPY commands
- RUN instructions
- CMD
- ENTRYPOINT

---

## Step 3 - Validate Build Context

Verify current directory.

```bash
pwd

ls
```

Ensure required files exist.

---

## Step 4 - Verify Required Files

Example

```bash
ls

Dockerfile
requirements.txt
package.json
app.py
```

Missing files commonly cause COPY failures.

---

## Step 5 - Verify .dockerignore

```bash
cat .dockerignore
```

Ensure required files are not excluded.

---

## Step 6 - Review Base Image

```bash
docker pull python:3.12-slim
```

or

```bash
docker pull nginx:alpine
```

Verify the base image exists and is accessible.

---

## Step 7 - Verify Disk Space

```bash
df -h
```

---

## Step 8 - Review Docker Logs

If running inside CI/CD, inspect pipeline logs.

For local builds

```bash
docker events
```

if additional runtime information is required.

---

## Step 9 - Verify Docker Version

```bash
docker version
```

---

## Step 10 - Verify Network Connectivity

For dependency downloads

```bash
ping google.com
```

or

```bash
curl https://registry-1.docker.io
```

---

# Resolution

## Fix Dockerfile Errors

Correct

- Invalid instructions
- Typographical mistakes
- Wrong COPY paths
- Incorrect CMD
- Invalid WORKDIR

---

## Rebuild Without Cache

```bash
docker build --no-cache -t test-image .
```

---

## Pull Latest Base Image

```bash
docker pull python:3.12-slim
```

or

```bash
docker pull nginx:alpine
```

---

## Verify Dependencies

Python

```bash
cat requirements.txt
```

Node.js

```bash
cat package.json
```

---

## Retry Build

```bash
docker build -t test-image .
```

---

# Verification

Verify image creation.

```bash
docker images
```

Run the image.

```bash
docker run --rm test-image
```

If applicable, verify application endpoints.

```bash
curl http://localhost:8080
```

---

# Rollback

If the latest Dockerfile changes introduced failures

Restore the previous working Dockerfile.

Rebuild.

```bash
docker build -t previous-image .
```

Deploy the last known good image if required.

---

# Escalation

Escalate when

- Build fails across multiple environments
- Docker Hub or registry outage suspected
- Base image is unavailable
- CI/CD infrastructure failure
- Dependency repositories are unavailable

---

# Post-Incident Tasks

- Record build logs
- Document root cause
- Review Dockerfile changes
- Validate build pipeline
- Update build documentation
- Improve Dockerfile validation checks

---

# Common Root Causes

- Missing Dockerfile
- Incorrect build context
- Invalid COPY instruction
- Missing application files
- Syntax errors
- Network connectivity failure
- Registry authentication issues
- Disk full
- Corrupted Docker cache
- Dependency installation failure

---

# Useful Commands

Build image

```bash
docker build -t test-image .
```

Build without cache

```bash
docker build --no-cache -t test-image .
```

Images

```bash
docker images
```

Disk usage

```bash
docker system df
```

Prune unused data

```bash
docker system prune
```

Docker version

```bash
docker version
```

Docker information

```bash
docker info
```

