# Runbook - Revert Production Release Tag

## Runbook ID

RB-GIT-005

---

# Purpose

This runbook explains how to safely rollback a production release by reverting to a previously verified Git tag.

Enterprise deployments should always be versioned using Git tags. If a newly deployed release introduces issues, the fastest recovery method is often to redeploy the last stable tag.

---

# Severity

- P1 – Production outage
- P1 – Failed deployment
- P2 – Critical production bug
- P2 – Release rollback

---

# Symptoms

Examples

- Production deployment failed
- New release causing application crashes
- Login failures after deployment
- API returning HTTP 500
- Increased error rates
- Failed health checks

---

# Prerequisites

- Git installed
- Access to repository
- Production release tags available
- Deployment permissions

---

# Investigation

## Verify Current Branch

```bash
git branch
```

---

## View Recent Commits

```bash
git log --oneline
```

---

## List Available Tags

```bash
git tag
```

Example

```text
v1.0.0

v1.1.0

v1.2.0
```

---

## View Current Release

```bash
git describe --tags
```

---

## Inspect Previous Stable Release

```bash
git show v1.1.0
```

---

## Compare Releases

```bash
git diff v1.1.0 v1.2.0
```

Review changes introduced in the latest release.

---

# Resolution

## Step 1 - Checkout Stable Tag

```bash
git checkout v1.1.0
```

Repository enters detached HEAD state.

---

## Step 2 - Create Recovery Branch

```bash
git checkout -b rollback/v1.1.0
```

---

## Step 3 - Verify Application

Example

```bash
docker compose up
```

Verify application functionality.

---

## Step 4 - Deploy Stable Version

Deploy the recovered version using the organization's deployment process.

Example

```text
Git Tag

↓

CI/CD Pipeline

↓

Docker Images

↓

Kubernetes

↓

Production
```

---

## Step 5 - Notify Stakeholders

Communicate

- Rollback completed
- Stable version restored
- Root cause investigation started

---

# Verification

Repository

```bash
git status
```

Verify version

```bash
git describe --tags
```

Verify application

- Login
- Dashboard
- APIs
- Health endpoints

Verify monitoring dashboards

Confirm

- No alerts
- Healthy services
- Error rate normalized

---

# Rollback Validation Checklist

- Stable tag deployed
- Services healthy
- Monitoring normal
- Application accessible
- No critical alerts
- Users successfully using application

---

# Escalation

Escalate when

- Stable tag also fails
- Database migration prevents rollback
- Production outage continues
- Multiple services affected
- Rollback unsuccessful

---

# Post-Incident Tasks

- Perform Root Cause Analysis
- Review deployment logs
- Update incident report
- Schedule fix for failed release
- Create new release after validation

---

# Prevention

- Tag every production release
- Test releases in staging
- Require CI validation
- Maintain release notes
- Protect release branches
- Monitor immediately after deployment

---

# Related Commands

List tags

```bash
git tag
```

Current version

```bash
git describe --tags
```

View tag

```bash
git show v1.1.0
```

Compare releases

```bash
git diff v1.1.0 v1.2.0
```

Checkout release

```bash
git checkout v1.1.0
```

Create rollback branch

```bash
git checkout -b rollback/v1.1.0
```

---

# Real Production Scenario

Version **v2.4.0** of the Enterprise DevOps Platform was deployed to production. Within minutes, monitoring reported a sharp increase in authentication failures and HTTP 500 errors from the API Gateway. Investigation confirmed a regression introduced in the latest release. The DevOps Engineer identified **v2.3.2** as the last stable production tag, checked out the tagged release, created a rollback branch, triggered the deployment pipeline, and restored production service. After service recovery, the development team investigated the failed release while production continued running on the stable version.

