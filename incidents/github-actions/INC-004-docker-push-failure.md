# Incident ID

INC-004

# Incident Title

Docker Image Push to GitHub Container Registry Failed

---

# Severity

SEV-2

---

# Status

Resolved

---

# Date

2026-02-18

---

# Reported By

GitHub Actions

---

# Environment

Development

---

# Services Impacted

- GitHub Actions
- Docker
- GitHub Container Registry (GHCR)

---

# Business Impact

The CI pipeline successfully built the Docker image but failed while pushing it to GitHub Container Registry.

Deployment could not proceed because the required container image was unavailable.

No production outage occurred.

---

# Detection

GitHub Actions failed during the Docker Push step.

Workflow logs displayed

```
denied: permission_denied
```

---

# Timeline

## 11:00

Developer pushed changes to the main branch.

---

## 11:02

Build job completed successfully.

---

## 11:05

Docker image built successfully.

---

## 11:06

Docker Push failed.

---

## 11:10

DevOps engineer reviewed workflow logs.

---

## 11:18

Registry permissions reviewed.

---

## 11:24

Workflow permissions updated.

---

## 11:28

Workflow re-run initiated.

---

## 11:34

Docker image successfully pushed.

---

# Symptoms

- Docker Push failed
- Image unavailable in GHCR
- Deployment skipped
- Registry authentication error

---

# Investigation

Reviewed workflow logs.

Verified login step.

```yaml
- uses: docker/login-action@v3
```

Reviewed workflow permissions.

Found

```yaml
permissions:
  contents: read
```

Missing

```yaml
packages: write
```

Verified authentication.

Confirmed Docker login completed successfully.

Reviewed repository package permissions.

---

# Root Cause

The workflow lacked

```yaml
packages: write
```

permission.

Although authentication succeeded, GitHub Actions was not authorized to publish packages to GitHub Container Registry.

---

# Resolution

Updated workflow permissions.

```yaml
permissions:
  contents: read
  packages: write
```

Committed changes.

Re-ran workflow.

Docker Push completed successfully.

---

# Verification

Confirmed

- Workflow successful
- Docker image built
- Docker image pushed
- Image visible in GHCR
- Deployment resumed successfully

Verified image.

```bash
docker pull ghcr.io/<owner>/<repository>/demo:latest
```

---

# Recovery Time

34 Minutes

---

# Preventive Actions

- Standardize workflow permissions
- Validate GHCR access during repository setup
- Review workflow changes during code reviews
- Document required GitHub permissions
- Include registry validation in CI testing

---

# Lessons Learned

- Successful authentication does not guarantee authorization.
- GitHub Actions requires explicit package permissions.
- Registry permissions should be validated before deployment.
- Permission reviews should be part of workflow maintenance.

---

# Related Runbooks

- failed-docker-build.md
- workflow-failure.md
- secret-rotation.md

