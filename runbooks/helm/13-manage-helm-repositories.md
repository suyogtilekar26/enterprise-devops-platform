# Helm Runbook 13 - Manage Helm Repositories

# Enterprise DevOps Platform

---

# Purpose

This runbook explains the standard operating procedure (SOP) for managing Helm Repositories used across enterprise Kubernetes environments.

It covers adding, updating, validating, removing and troubleshooting Helm repositories used by CI/CD pipelines and Platform Engineering teams.

---

# Introduction

A Helm Repository stores versioned Helm Charts that are consumed by developers, CI/CD pipelines and GitOps tools.

Enterprise Helm Repositories provide

- Centralized Chart Storage
- Version Management
- Secure Access
- Auditability
- High Availability
- Artifact Promotion

Proper repository management ensures that deployments always use approved and validated chart versions.

---

# Production Scenario

Company

ABC Bank

The Platform Engineering Team has introduced a new Enterprise Helm Repository to store internal application charts.

Before GitHub Actions and Argo CD can deploy applications, engineers must configure and validate repository access across deployment environments.

---

# Enterprise Architecture

```
Platform Engineer

        │

        ▼

Enterprise Helm Repository

        │

        ▼

Harbor / Artifactory / Nexus / OCI

        │

        ▼

helm repo add

        │

        ▼

GitHub Actions

        │

        ▼

Argo CD

        │

        ▼

Production Kubernetes
```

---

# Investigation

Perform the following checks.

---

## Step 1

List Configured Repositories.

```bash
helm repo list
```

Verify

- Repository Name
- Repository URL

---

## Step 2

Verify Repository Access.

```bash
helm search repo
```

Ensure charts are returned successfully.

---

## Step 3

Update Repository Metadata.

```bash
helm repo update
```

Expected

```
Successfully got an update
```

---

## Step 4

Search for a Chart.

```bash
helm search repo api-gateway
```

Verify

- Chart Name
- Latest Version
- Repository

---

## Step 5

Inspect Chart Metadata.

```bash
helm show chart enterprise/api-gateway
```

Confirm

- Version
- Description
- App Version

---

## Step 6

Verify Repository Connectivity.

If repository updates fail

Verify

- DNS Resolution
- Network Connectivity
- Firewall Rules
- Proxy Configuration
- Authentication

---

# Resolution

## Add Repository.

```bash
helm repo add enterprise https://helm.company.com/charts
```

---

## Verify Repository.

```bash
helm repo list
```

---

## Refresh Repository.

```bash
helm repo update
```

---

## Search Charts.

```bash
helm search repo
```

---

## Remove Repository.

```bash
helm repo remove enterprise
```

---

## Re-add Repository.

```bash
helm repo add enterprise https://helm.company.com/charts
```

Update metadata.

```bash
helm repo update
```

---

## Authenticate to OCI Registry.

Example

```bash
helm registry login registry.company.com
```

---

# Validation

Verify

```bash
helm repo list
```

Verify

```bash
helm repo update
```

Verify

```bash
helm search repo api-gateway
```

Verify

```bash
helm show chart enterprise/api-gateway
```

Confirm

- Repository Reachable
- Charts Visible
- Metadata Correct
- Authentication Successful

---

# Rollback

If repository configuration is incorrect

Remove the repository.

```bash
helm repo remove enterprise
```

Reconfigure with the approved repository URL.

Update repository metadata.

```bash
helm repo update
```

Validate chart availability before resuming deployments.

---

# Repository Management Checklist

Verify

- Repository URL
- Repository Name
- Authentication
- Repository Update
- Chart Availability
- Chart Version
- Repository Accessibility
- CI/CD Integration

---

# Production Best Practices

- Use centralized Enterprise Helm Repositories.
- Protect repositories using RBAC.
- Use HTTPS for all repositories.
- Enable authentication for private repositories.
- Never deploy charts from personal repositories.
- Periodically refresh repository metadata.
- Monitor repository availability.

---

# Common Mistakes

- Using outdated repository metadata.
- Configuring incorrect repository URLs.
- Deploying from local chart copies instead of approved repositories.
- Ignoring authentication failures.
- Forgetting to refresh repository indexes.
- Using public repositories for proprietary applications.

---

# Interview Questions

## Q1. Why do enterprises use centralized Helm Repositories?

### Answer

Centralized repositories provide secure chart storage, version control, access management, auditability and enable consistent deployments across environments.

---

## Q2. Which command updates repository metadata?

```bash
helm repo update
```

---

## Q3. How do you verify that a chart exists in a repository?

### Answer

Use

```bash
helm search repo <chart-name>
```

or

```bash
helm show chart <repository>/<chart>
```

to confirm chart availability and metadata.

---

# Commands Reference

List Repositories

```bash
helm repo list
```

Add Repository

```bash
helm repo add enterprise https://helm.company.com/charts
```

Update Repository

```bash
helm repo update
```

Search Repository

```bash
helm search repo api-gateway
```

Show Chart

```bash
helm show chart enterprise/api-gateway
```

Remove Repository

```bash
helm repo remove enterprise
```

Registry Login

```bash
helm registry login registry.company.com
```

---

# Marathi Quick Revision

- helm repo list करा.
- Repository add करा.
- helm repo update करा.
- Chart search करा.
- Metadata verify करा.
- Authentication तपासा.
- Repository health verify करा.

---

# Marathi Summary (5+ Experience Revision)

या Runbook मध्ये Enterprise Helm Repository चे व्यवस्थापन करण्याची SOP समजावली आहे. Repository add, update, search, remove, authentication आणि validation या सर्व प्रक्रिया CI/CD आणि GitOps workflows साठी अत्यावश्यक आहेत. Repository मधील charts नेहमी validated आणि centrally managed असावेत. Production deployments नेहमी approved Enterprise Repository मधूनच केले पाहिजेत, ज्यामुळे version consistency, security आणि auditability कायम राहते.

