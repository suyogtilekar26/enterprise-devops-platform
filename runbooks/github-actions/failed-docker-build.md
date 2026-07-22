# Runbook - Failed Docker Build in GitHub Actions

## Purpose

This runbook provides the standard operating procedure for investigating and resolving Docker image build failures in GitHub Actions.

It applies to CI pipelines that build container images before pushing them to GitHub Container Registry (GHCR).

---

# Severity

Applicable to

- SEV-2
- SEV-3
- SEV-4

Escalate if production releases are blocked.

---

# Symptoms

Examples

- Docker build step failed
- Workflow stopped at Docker Build
- Image not created
- Dockerfile parsing error
- Build context error
- Dependency installation failure
- Image build timeout

---

# Prerequisites

Ensure access to

- GitHub Repository
- GitHub Actions
- Docker
- Dockerfile
- Self-hosted Runner (if applicable)

---

# Investigation

## Step 1

Open the failed workflow.

Navigate

```
Repository

↓

Actions

↓

Failed Workflow
```

Identify the failed Job.

---

## Step 2

Open the Docker Build step.

Review

- Complete logs
- Exit code
- Docker error message

---

## Step 3

Verify Dockerfile exists.

```bash
find . -name Dockerfile
```

Expected

```
Dockerfile
```

---

## Step 4

Validate Dockerfile locally.

```bash
docker build .
```

If local build fails, investigate the Dockerfile before re-running GitHub Actions.

---

## Step 5

Verify build context.

Example

```bash
docker build .
```

The build context should contain all required files.

---

## Step 6

Check ignored files.

```bash
cat .dockerignore
```

Ensure required files are not excluded.

---

## Step 7

Verify repository contents.

```bash
ls -la
```

Confirm

- Dockerfile
- Application source
- Configuration files

are present.

---

## Step 8

Verify disk space.

```bash
df -h
```

---

## Step 9

Verify Docker installation.

```bash
docker version
```

---

# Resolution

## Dockerfile Missing

Restore the Dockerfile.

Commit and push changes.

---

## Dockerfile Syntax Error

Correct the Dockerfile.

Validate locally.

Commit and push.

---

## Missing Build Files

Restore missing files.

Rebuild locally.

---

## Dependency Installation Failure

Verify package repositories.

Verify dependency versions.

Rebuild locally.

---

## Invalid Build Context

Correct the build path.

Example

```bash
docker build .
```

---

## Docker Engine Failure

Restart Docker.

Verify

```bash
docker version
```

---

# Verification

Confirm

- Workflow completed
- Docker image built
- No Docker errors
- Image available locally (if tested locally)

If the workflow includes image publishing, verify the image is successfully pushed after the build completes.

---

# Rollback

If a recent Dockerfile change caused the failure

Restore the previous working Dockerfile.

Commit the rollback.

Re-run the workflow.

---

# Escalation

Escalate when

- Docker build repeatedly fails
- Base image unavailable
- Docker daemon unstable
- Production release blocked

Notify

- DevOps Lead
- Platform Team
- Application Owner

---

# Post-Incident Tasks

- Document root cause
- Update Dockerfile if required
- Review dependency versions
- Update CI documentation
- Verify future builds

---

# Recovery Checklist

- Dockerfile validated
- Docker build successful
- Workflow successful
- Image available
- Deployment resumed
- Incident closed

