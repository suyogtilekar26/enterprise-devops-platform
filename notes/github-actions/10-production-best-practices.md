# GitHub Actions Production Best Practices

# Purpose

Understand the best practices followed by enterprise DevOps teams when designing, securing, maintaining, and optimizing GitHub Actions workflows for production environments.

These practices improve

- Reliability
- Security
- Performance
- Scalability
- Maintainability

---

# Introduction

A workflow that works in a lab is not necessarily suitable for production.

Enterprise CI/CD pipelines must be

- Secure
- Reliable
- Reusable
- Auditable
- Easy to troubleshoot

Following production best practices reduces operational risk and improves software delivery.

---

# Enterprise Usage

Organizations implement best practices for

- CI pipelines
- CD pipelines
- Infrastructure deployments
- Docker builds
- Kubernetes deployments
- Security automation
- Compliance
- Disaster recovery

---

# GitHub Actions in THIS Project

```
Developer

↓

Pull Request

↓

Code Review

↓

Protected Branch

↓

CI Workflow

↓

Security Scan

↓

Docker Build

↓

Push GHCR

↓

Deployment Approval

↓

Production Deployment

↓

Health Check
```

---

# Production Architecture

```
Developer

↓

GitHub Repository

↓

Protected Branch

↓

Workflow

↓

Runner

↓

Security Checks

↓

Deployment Approval

↓

Production
```

---

# Best Practice 1

## Separate CI and CD

Do not combine everything into one workflow.

Recommended

```
CI Workflow

↓

Build

↓

Test

↓

Docker Build

-------------------

CD Workflow

↓

Deploy

↓

Health Check
```

Benefits

- Easier troubleshooting
- Better security
- Faster execution

---

# Best Practice 2

## Keep Workflows Small

Each workflow should have one responsibility.

Examples

- ci.yml
- docker.yml
- deploy.yml
- security.yml

Avoid one massive workflow.

---

# Best Practice 3

## Protect the Main Branch

Require

- Pull Requests
- Code Reviews
- Status Checks
- Approval

Never deploy directly from feature branches.

---

# Best Practice 4

## Use GitHub Secrets

Store

- API Keys
- Tokens
- Passwords
- Certificates

Never store secrets in

- YAML
- Source code
- Shell scripts

---

# Best Practice 5

## Pin Action Versions

Good

```yaml
uses: actions/checkout@v4
```

Avoid

```yaml
uses: actions/checkout@main
```

Pinned versions improve stability and security.

---

# Best Practice 6

## Use Reusable Workflows

Avoid copying the same YAML across repositories.

Create one reusable workflow and share it.

Benefits

- Consistency
- Easier maintenance
- Centralized updates

---

# Best Practice 7

## Use Dependency Cache

Cache

- npm
- pip
- Maven
- Gradle

Benefits

- Faster builds
- Lower bandwidth usage
- Reduced execution time

---

# Best Practice 8

## Upload Important Artifacts

Store

- Test reports
- Coverage reports
- Build packages
- Deployment logs

Artifacts assist with debugging and auditing.

---

# Best Practice 9

## Require Production Approval

Production deployments should require

- Manual approval
- Environment protection
- Change validation

Never allow unrestricted production deployments.

---

# Best Practice 10

## Use Self-hosted Runners Carefully

Use Self-hosted Runners only when

- Internal infrastructure access is required
- Compliance requires private execution
- Custom software is needed

Otherwise, use GitHub-hosted Runners.

---

# Best Practice 11

## Monitor Workflow Performance

Track

- Build duration
- Queue time
- Failure rate
- Runner utilization

Continuously optimize slow pipelines.

---

# Best Practice 12

## Enable Security Scanning

Include

- Dependency scanning
- Secret scanning
- Code scanning
- Container scanning

Security should be part of every pipeline.

---

# Daily DevOps Activities

DevOps Engineers

- Review workflow execution
- Rotate secrets
- Update Actions
- Optimize cache
- Remove duplicate workflows
- Patch Self-hosted Runners
- Audit deployments
- Review security reports

---

# Security

Always

- Use least privilege
- Rotate credentials
- Protect workflow files
- Require approvals
- Pin Action versions
- Audit workflow changes

Never

- Hardcode secrets
- Skip code reviews
- Deploy directly to production
- Trust unverified Actions
- Ignore failed security scans

---

# Common Problems

Problem

Pipeline too slow.

Cause

No cache configured.

---

Problem

Production deployed accidentally.

Cause

Missing approval.

---

Problem

Workflow duplicated.

Cause

Reusable workflows not implemented.

---

Problem

Security vulnerability.

Cause

Outdated Action version.

---

# Troubleshooting

Verify

- Workflow structure
- Branch protection
- Secrets
- Runner health
- Cache usage
- Artifact uploads
- Deployment approvals

---

# Real Production Scenario

An enterprise manages 250 microservices.

Every Pull Request automatically

- Executes unit tests
- Performs security scanning
- Builds Docker images

Production deployments require

- Approved Pull Request
- Successful CI
- Manual approval
- Health verification

This process significantly reduces deployment failures.

---

# Scenario Interview Q&A

### Scenario

Your organization experiences frequent deployment failures.

How would you improve the pipeline?

Answer

- Separate CI and CD
- Introduce deployment approvals
- Add health checks
- Enable caching
- Upload artifacts
- Implement reusable workflows
- Improve monitoring

---

# Architecture Interview Q&A

### What makes an enterprise GitHub Actions pipeline different from a basic pipeline?

Enterprise pipelines include

- Protected branches
- Reusable workflows
- Deployment approvals
- Environment-specific secrets
- Security scanning
- Auditability
- Monitoring

---

# Production Support Interview Q&A

### What production practices would you recommend before enabling automatic deployments?

- Protected branches
- Code reviews
- Environment approvals
- Security scans
- Health checks
- Rollback strategy
- Monitoring
- Secrets management

---

# Related Runbooks

- Workflow Failure Recovery
- Secret Rotation
- Deployment Rollback
- Runner Offline Recovery

---

# Common Incidents

- Deployment Without Approval
- Secret Exposure
- Slow Pipeline
- Workflow Failure
- Security Scan Failure

---

# Commands

Commit changes

```bash
git add .

git commit -m "Implement GitHub Actions production best practices"
```

Push changes

```bash
git push origin main
```

---

# Marathi Quick Revision

Production Pipeline मध्ये नेहमी

- Branch Protection
- Secrets
- Approval
- Cache
- Artifacts
- Security Scan
- Health Check

असणे आवश्यक आहे.

---

# Marathi Interview Memory Tips

Remember

```
Secure

↓

Build

↓

Test

↓

Approve

↓

Deploy

↓

Verify
```

Interview Formula

```
Security

+

Automation

+

Approval

+

Monitoring

=

Production CI/CD
```

---

# Key Takeaways

- Enterprise pipelines prioritize security, reliability, and maintainability.
- Separate CI and CD workflows.
- Protect production deployments with approvals.
- Use reusable workflows and dependency caching.
- Regularly review, monitor, and optimize workflows for production.

