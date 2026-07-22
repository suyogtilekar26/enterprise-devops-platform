# Incident ID

INC-007

# Incident Title

Docker Registry Authentication Failure Blocked Image Push to GitHub Container Registry

---

# Severity

SEV-2

---

# Status

Resolved

---

# Date

2025-07-09

---

# Reported By

GitHub Actions

---

# Environment

CI/CD Pipeline

---

# Services Impacted

- GitHub Actions
- GitHub Container Registry (GHCR)
- Image Publishing
- Deployment Pipeline

---

# Business Impact

- Docker images were not pushed to GHCR.
- Staging deployment failed.
- Production deployment was blocked.
- Release schedule delayed.

---

# Detection

GitHub Actions deployment pipeline failed during image push.

Pipeline error

```
denied: permission_denied: write_package
```

Another observed error

```
unauthorized: authentication required
```

---

# Timeline

## 15:03

Developer merged release branch.

---

## 15:05

GitHub Actions pipeline started.

---

## 15:08

Docker image build completed successfully.

---

## 15:09

Image push to GHCR failed.

---

## 15:12

DevOps engineer reviewed workflow logs.

---

## 15:16

Verified registry authentication locally.

```bash
docker login ghcr.io
```

Authentication failed.

---

## 15:20

Reviewed GitHub Actions secrets.

Verified the Personal Access Token.

---

## 15:24

Identified missing package write permission.

---

## 15:30

Generated a new Personal Access Token with required permissions.

---

## 15:34

Updated GitHub repository secret.

---

## 15:36

Restarted GitHub Actions workflow.

---

## 15:42

Docker image successfully pushed to GHCR.

---

## 15:47

Deployment pipeline completed successfully.

---

## 15:50

Incident resolved.

---

# Root Cause

The Personal Access Token used for GitHub Container Registry authentication did not include the required **write:packages** permission, causing Docker image push operations to fail.

---

# Investigation

Commands executed

```bash
docker login ghcr.io
```

```bash
docker info
```

Reviewed

- GitHub Actions logs
- Repository secrets
- Personal Access Token permissions
- Image name
- Registry configuration

---

# Resolution

- Generated a new Personal Access Token.
- Granted required package permissions.
- Updated GitHub Actions secret.
- Re-authenticated with GHCR.
- Re-ran the deployment pipeline.
- Successfully pushed Docker images.

---

# Verification

Registry login

```bash
docker login ghcr.io
```

Image push

```bash
docker push ghcr.io/<owner>/<image>:latest
```

Verified

- Image available in GHCR
- GitHub Actions workflow successful
- Deployment completed

---

# Customer Impact

No production outage.

Deployment delayed by approximately 45 minutes.

---

# Preventive Actions

- Rotate registry credentials regularly.
- Monitor token expiration.
- Standardize registry authentication procedures.
- Validate registry permissions during onboarding.
- Add registry authentication validation to CI/CD.

---

# Lessons Learned

- Successful image builds do not guarantee successful deployments.
- Registry authentication should be validated before image publishing.
- GitHub Actions secrets require periodic review.
- Package permissions should be documented and standardized.

---

# Related Runbook

- runbooks/docker/docker-registry-authentication-failure.md

