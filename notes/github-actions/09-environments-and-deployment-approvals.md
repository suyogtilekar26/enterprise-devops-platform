# GitHub Actions Environments and Deployment Approvals

# Purpose

Understand GitHub Environments, Deployment Approvals, Protection Rules, and how enterprise organizations safely deploy applications to production.

Environments provide an additional security layer before deployments are executed.

---

# Introduction

In enterprise environments, deployments are rarely performed immediately after a successful build.

Before deploying to Production, organizations require

- Manual approval
- Security validation
- Change management
- Environment-specific secrets
- Deployment restrictions

GitHub Environments provide these capabilities.

---

# Enterprise Usage

Organizations use Environments for

- Development
- Testing
- QA
- Staging
- Production
- Disaster Recovery

Each environment has its own

- Secrets
- Variables
- Protection Rules
- Deployment Policies

---

# GitHub Actions in THIS Project

```
Developer

↓

Push Code

↓

CI Pipeline

↓

Docker Build

↓

Push Image

↓

Deploy to Development

↓

Deploy to Staging

↓

Approval Required

↓

Deploy to Production

↓

Health Check
```

---

# What is an Environment?

An Environment is a deployment target with its own security controls.

Examples

- development
- testing
- staging
- production

Each environment can have different

- Secrets
- Variables
- Reviewers
- Deployment restrictions

---

# Environment Architecture

```
Workflow

↓

Environment

↓

Protection Rules

↓

Approval

↓

Deployment

↓

Production
```

---

# Environment Lifecycle

```
Workflow Starts

↓

Deployment Requested

↓

Environment Selected

↓

Approval Required

↓

Deployment Approved

↓

Application Deployed

↓

Deployment Completed
```

---

# Environment Secrets

Instead of using repository-wide secrets, environments can have dedicated secrets.

Example

Development

```
DEV_DATABASE_URL
```

Production

```
PROD_DATABASE_URL
```

This prevents accidental use of production credentials.

---

# Environment Variables

Examples

Development

```
APP_ENV=development
```

Production

```
APP_ENV=production
```

Each deployment automatically receives environment-specific values.

---

# Required Reviewers

Production deployments can require approval.

Example

```
Developer

↓

Deployment Requested

↓

DevOps Manager Approval

↓

Deployment Starts
```

Without approval, deployment does not begin.

---

# Wait Timer

GitHub can delay deployments.

Example

```
Deployment Requested

↓

Wait 30 Minutes

↓

Approval

↓

Deployment
```

Useful for

- Change windows
- Maintenance windows
- Risk reduction

---

# Branch Restrictions

Only approved branches should deploy.

Example

Allowed

```
main
```

Blocked

```
feature/*
```

```
bugfix/*
```

---

# Enterprise Deployment Flow

```
Developer

↓

Pull Request

↓

Code Review

↓

Merge

↓

CI Pipeline

↓

Docker Image

↓

Staging Deployment

↓

QA Validation

↓

Production Approval

↓

Production Deployment

↓

Health Verification
```

---

# Daily DevOps Activities

DevOps Engineers

- Configure environments
- Manage deployment approvals
- Rotate environment secrets
- Review deployment history
- Restrict production deployments
- Audit deployment activities

---

# Production Best Practices

- Separate Development and Production
- Require approvals for Production
- Use environment-specific secrets
- Restrict production branches
- Maintain deployment history
- Enable audit logging
- Apply least privilege

---

# Security

Always

- Require production approvals
- Store secrets per environment
- Protect production branches
- Audit deployments
- Rotate secrets regularly

Never

- Deploy directly from feature branches
- Share production credentials
- Skip approval processes
- Reuse development secrets in production

---

# Advantages

- Better security
- Controlled deployments
- Separate secrets
- Environment isolation
- Deployment history
- Compliance support

---

# Common Problems

Problem

Deployment waiting indefinitely.

Cause

Approval not completed.

---

Problem

Wrong secrets used.

Cause

Incorrect environment selected.

---

Problem

Deployment blocked.

Cause

Branch restriction.

---

Problem

Application fails after deployment.

Cause

Incorrect environment configuration.

---

# Troubleshooting

Verify

- Environment selected
- Required reviewers
- Deployment approvals
- Branch restrictions
- Environment secrets
- Workflow logs

---

# Real Production Scenario

A bank deploys software every Friday evening.

After CI completes,

GitHub pauses the Production deployment.

A Senior DevOps Engineer reviews

- Change request
- Test results
- Security scan
- Release notes

After approval, GitHub deploys automatically to Production.

This prevents accidental releases and satisfies compliance requirements.

---

# Scenario Interview Q&A

### Scenario

The workflow completed successfully, but Production deployment never started.

How would you investigate?

Answer

- Verify Environment configuration
- Check pending approvals
- Review branch restrictions
- Validate deployment permissions
- Review workflow logs

---

# Architecture Interview Q&A

### Why do enterprises use GitHub Environments?

Because they provide

- Secure deployments
- Environment isolation
- Deployment approvals
- Secret separation
- Compliance controls

---

# Production Support Interview Q&A

### Why shouldn't Production use Repository Secrets?

Repository Secrets are shared across workflows.

Environment Secrets isolate sensitive credentials for each deployment environment, reducing operational risk.

---

# Related Runbooks

- Production Deployment Approval
- Failed Production Deployment
- Secret Rotation
- Deployment Rollback

---

# Common Incidents

- Production Approval Pending
- Wrong Environment Selected
- Branch Restriction Failure
- Invalid Production Secret

---

# Commands

Commit workflow

```bash
git add .

git commit -m "Configure deployment environments"
```

Push workflow

```bash
git push origin main
```

---

# Marathi Quick Revision

Environment म्हणजे Deployment Target.

Examples

- Development
- Testing
- Staging
- Production

Production मध्ये

- Approval
- Environment Secrets
- Branch Protection

असणे आवश्यक आहे.

---

# Marathi Interview Memory Tips

Remember

```
Workflow

↓

Environment

↓

Approval

↓

Deployment

↓

Production
```

Interview Formula

```
Environment

+

Approval

+

Secrets

=

Secure Deployment
```

---

# Key Takeaways

- Environments secure deployments using protection rules.
- Production deployments should require manual approval.
- Environment-specific secrets improve security.
- Branch restrictions prevent accidental deployments.
- GitHub Environments are a core enterprise deployment feature.

