# Incident ID

INC-003

# Incident Title

Docker Image Build Failed During CI/CD Pipeline

---

# Severity

SEV-2

---

# Status

Resolved

---

# Date

2025-04-22

---

# Reported By

GitHub Actions

---

# Environment

CI/CD Pipeline

---

# Services Impacted

- GitHub Actions
- Docker Image Build
- Container Registry
- Deployment Pipeline

---

# Business Impact

- New application version could not be built.
- Image was not published to the registry.
- Deployment to staging was blocked.
- Release schedule delayed.

---

# Detection

GitHub Actions pipeline failed during Docker build stage.

Pipeline error

```
COPY failed: file not found in build context
```

---

# Timeline

## 10:02

Developer merged code into the main branch.

---

## 10:04

GitHub Actions pipeline started automatically.

---

## 10:06

Docker build stage failed.

---

## 10:08

DevOps engineer reviewed workflow logs.

---

## 10:11

Reproduced the issue locally.

```bash
docker build -t api-gateway .
```

---

## 10:15

Verified Dockerfile.

```bash
cat Dockerfile
```

---

## 10:19

Reviewed project directory.

```bash
ls -la
```

Discovered that the Dockerfile referenced a file that had been renamed during development.

---

## 10:24

Updated the COPY instruction.

---

## 10:27

Validated Docker build locally.

```bash
docker build -t api-gateway .
```

Build completed successfully.

---

## 10:31

Committed the Dockerfile fix.

---

## 10:33

GitHub Actions pipeline automatically restarted.

---

## 10:38

Docker image successfully built and pushed.

---

## 10:41

Deployment continued successfully.

---

# Root Cause

The Dockerfile contained an incorrect COPY instruction after an application file was renamed, causing the image build to fail.

---

# Investigation

Commands executed

```bash
docker build -t api-gateway .
```

```bash
cat Dockerfile
```

```bash
ls -la
```

```bash
docker images
```

Reviewed

- Dockerfile
- Build context
- GitHub Actions logs
- Repository changes

---

# Resolution

- Corrected the Dockerfile COPY instruction.
- Verified the required files existed.
- Successfully rebuilt the Docker image.
- Re-ran the GitHub Actions pipeline.
- Confirmed successful image push to the registry.

---

# Verification

Local build

```bash
docker build -t api-gateway .
```

Image verification

```bash
docker images
```

Pipeline completed successfully.

Image available in registry.

Deployment completed successfully.

---

# Customer Impact

No production outage.

Release delayed by approximately 35 minutes.

---

# Preventive Actions

- Validate Docker builds during pull requests.
- Add Dockerfile linting.
- Implement automated Dockerfile testing.
- Review build context during code reviews.
- Maintain standardized Dockerfile templates.

---

# Lessons Learned

- Small Dockerfile changes can stop the entire deployment pipeline.
- Local Docker builds should be performed before merging.
- Automated validation significantly reduces deployment failures.
- Docker build failures should be reproduced locally before investigating infrastructure.

---

# Related Runbook

- runbooks/docker/docker-image-build-failure.md

