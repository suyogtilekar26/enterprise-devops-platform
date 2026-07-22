# GitHub Actions Interview Master Guide

# Purpose

This document serves as the final revision guide for GitHub Actions.

It summarizes the complete GitHub Actions module from an enterprise DevOps perspective and is intended for quick revision before interviews.

---

# GitHub Actions in One Line

GitHub Actions is GitHub's native CI/CD and automation platform that executes workflows based on repository events to automate software delivery.

---

# Complete Architecture

```
Developer

↓

Git Push

↓

GitHub Repository

↓

Event

↓

Workflow

↓

Runner

↓

Jobs

↓

Steps

↓

Actions

↓

Build

↓

Test

↓

Docker

↓

Deploy

↓

Health Check

↓

Production
```

---

# Complete Learning Flow

```
GitHub Actions

↓

Workflow

↓

Events

↓

Jobs

↓

Steps

↓

Actions

↓

Runners

↓

Artifacts

↓

Cache

↓

Matrix

↓

Reusable Workflows

↓

Environments

↓

Production Best Practices

↓

Troubleshooting
```

---

# Important Components

| Component | Purpose |
|-----------|---------|
| Workflow | Automation pipeline |
| Event | Starts a workflow |
| Runner | Executes jobs |
| Job | Group of related tasks |
| Step | Individual task |
| Action | Reusable automation |
| Artifact | Stores workflow output |
| Cache | Speeds up builds |
| Matrix | Multiple execution combinations |
| Environment | Secure deployment target |

---

# Workflow Lifecycle

```
Developer Push

↓

GitHub Detects Event

↓

Workflow Starts

↓

Runner Allocated

↓

Repository Checkout

↓

Dependencies Installed

↓

Tests

↓

Docker Build

↓

Artifact Upload

↓

Deployment

↓

Health Check

↓

Workflow Complete
```

---

# Enterprise CI Pipeline

```
Code Push

↓

Checkout

↓

Install Dependencies

↓

Static Analysis

↓

Unit Tests

↓

Build Application

↓

Docker Build

↓

Push Image

↓

Store Artifacts
```

---

# Enterprise CD Pipeline

```
Deployment Trigger

↓

Environment

↓

Approval

↓

Deploy Kubernetes

↓

Health Check

↓

Smoke Test

↓

Production
```

---

# GitHub-hosted vs Self-hosted Runner

| GitHub-hosted | Self-hosted |
|--------------|-------------|
| Managed by GitHub | Managed by Organization |
| Easy setup | Full control |
| Auto updates | Manual maintenance |
| Public workloads | Internal infrastructure |
| No maintenance | Requires monitoring |

---

# Artifact vs Cache

| Artifact | Cache |
|----------|-------|
| Build Output | Dependencies |
| Reports | Faster Builds |
| Downloadable | Automatically Restored |
| Workflow Result | Workflow Optimization |

---

# Workflow Best Practices

- Keep workflows modular
- Separate CI and CD
- Protect production deployments
- Use GitHub Secrets
- Pin Action versions
- Enable caching
- Upload artifacts
- Monitor workflow performance
- Use reusable workflows
- Document pipelines

---

# Security Best Practices

Always

- Use GitHub Secrets
- Protect branches
- Require approvals
- Rotate credentials
- Review third-party Actions
- Pin Action versions
- Use least privilege

Never

- Hardcode passwords
- Store secrets in YAML
- Deploy directly to production
- Ignore security scans

---

# Enterprise Deployment Flow

```
Developer

↓

Feature Branch

↓

Pull Request

↓

Code Review

↓

CI Pipeline

↓

Docker Build

↓

Security Scan

↓

Approval

↓

Production Deployment

↓

Health Verification
```

---

# Troubleshooting Checklist

Always verify

- Workflow trigger
- YAML syntax
- Runner availability
- Workflow logs
- Secrets
- Permissions
- Docker build
- Kubernetes deployment
- Health checks

---

# Frequently Asked Interview Questions

### What is GitHub Actions?

GitHub's native CI/CD platform for automating software development workflows.

---

### What is a Workflow?

A YAML file that defines automation executed when specific events occur.

---

### What is a Runner?

A machine that executes workflow jobs.

---

### What is a Job?

A collection of related steps executed on the same runner.

---

### What is a Step?

An individual command or reusable action inside a job.

---

### What is an Action?

A reusable automation component used within workflows.

---

### Difference between Artifact and Cache?

Artifacts store workflow outputs.

Cache stores reusable dependencies to improve performance.

---

### Why use Self-hosted Runners?

To access private infrastructure, improve performance, and meet compliance requirements.

---

### Why use Reusable Workflows?

To reduce duplicate YAML and standardize CI/CD across repositories.

---

### Why use Environments?

To secure deployments using approvals, environment-specific secrets, and protection rules.

---

# Scenario Questions

## Scenario 1

Workflow not triggered.

Check

- Trigger
- Branch
- YAML
- Repository settings

---

## Scenario 2

Runner Offline.

Check

- Runner service
- Network
- Labels
- Permissions

---

## Scenario 3

Docker Push Failed.

Check

- Registry login
- Token
- Image tag
- Permissions

---

## Scenario 4

Production Deployment Blocked.

Check

- Approval
- Environment
- Branch protection
- Deployment rules

---

## Scenario 5

Workflow Slow.

Check

- Cache
- Parallel jobs
- Dependency installation
- Runner performance

---

# Daily DevOps Responsibilities

- Build CI/CD pipelines
- Maintain workflows
- Rotate secrets
- Manage runners
- Review logs
- Improve build performance
- Troubleshoot failures
- Secure deployments
- Maintain documentation
- Support production releases

---

# Production Checklist

Before every deployment verify

- Build successful
- Tests passed
- Security scan completed
- Docker image created
- Image pushed successfully
- Deployment approved
- Kubernetes deployment successful
- Health checks passed
- Monitoring active

---

# Marathi Quick Revision

GitHub Actions Flow

```
Push

↓

Workflow

↓

Runner

↓

Job

↓

Step

↓

Action

↓

Deployment
```

Remember

Artifacts = Output

Cache = Speed

Secrets = Security

Environment = Production

Approval = Safe Deployment

---

# Marathi Interview Memory Tips

Master Formula

```
GitHub Actions

+

Workflow

+

Runner

+

Jobs

+

Secrets

+

Approval

+

Deployment

=

Enterprise CI/CD Engineer
```

---

# Final Key Takeaways

- GitHub Actions is GitHub's native CI/CD platform.
- Workflows automate builds, tests, and deployments.
- Runners execute workflow jobs.
- Artifacts preserve outputs, while Cache improves performance.
- Reusable Workflows reduce duplication across repositories.
- Environments secure production deployments with approvals.
- Troubleshooting begins with workflow logs and runner status.
- Production pipelines should prioritize security, reliability, and maintainability.
- Mastering GitHub Actions is essential for enterprise DevOps roles and technical interviews.

