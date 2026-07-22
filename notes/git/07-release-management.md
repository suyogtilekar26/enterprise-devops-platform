# Git Release Management

## Purpose

This document explains how releases are managed in the Enterprise DevOps Platform.

A release is not simply a Git merge.

A release is a controlled process that transforms tested code into a production deployment.

Every enterprise follows a structured release process to reduce production risk.

---

# What is a Release?

A release is a stable version of the application that is approved for deployment.

A release includes

- Source Code
- Infrastructure Changes
- Docker Images
- Kubernetes Manifests
- Helm Charts
- Documentation
- Release Notes

Everything required to deploy a known working version.

---

# Release Lifecycle

Developer

↓

Feature Branch

↓

Develop Branch

↓

Release Branch

↓

QA Testing

↓

User Acceptance Testing (UAT)

↓

Production Approval

↓

Main Branch

↓

Production Deployment

↓

Git Tag

Every stage has approval.

---

# Why Release Branches Exist

Release branches isolate production preparation from ongoing development.

Benefits

- Stabilize release
- Continue new feature development
- Fix only critical issues
- Prevent unfinished work from entering production

---

# Release Branch Naming

Examples

```text
release/v1.0.0

release/v1.1.0

release/v2.0.0
```

Keep version numbers consistent with Semantic Versioning.

---

# Release Workflow

Step 1

Create release branch.

```bash
git checkout develop

git pull

git checkout -b release/v1.0.0
```

---

Step 2

Push release branch.

```bash
git push origin release/v1.0.0
```

---

Step 3

Deploy to QA.

GitHub Actions

↓

Docker Build

↓

Kind Cluster

↓

QA Validation

---

Step 4

Fix only release issues.

Allowed

- Documentation
- Critical Bug Fixes
- Configuration Updates

Not Allowed

- New Features
- Major Refactoring

---

Step 5

Approve Release.

Participants

- Developers
- QA
- DevOps
- Product Owner

---

Step 6

Merge into main.

```bash
git checkout main

git merge release/v1.0.0
```

---

Step 7

Create production tag.

```bash
git tag -a v1.0.0 -m "Production Release v1.0.0"
```

---

Step 8

Push tag.

```bash
git push origin v1.0.0
```

---

Step 9

Merge release back into develop.

```bash
git checkout develop

git merge release/v1.0.0
```

This keeps both branches synchronized.

---

# Our Project Release Process

Example

Enterprise DevOps Platform

Features Completed

- API Gateway
- Auth Service
- Dashboard
- Frontend

↓

Create

release/v1.0.0

↓

Deploy to Kind

↓

Testing

↓

Merge to main

↓

Git Tag

↓

Future AWS EKS Deployment

---

# Git Tags

Every production deployment must have a tag.

Example

```text
v1.0.0

v1.1.0

v2.0.0
```

Never deploy "latest" without knowing the associated tag.

Tags make rollback easy.

---

# Semantic Versioning

Format

```text
MAJOR.MINOR.PATCH
```

Example

```text
1.0.0
```

Major

Breaking Changes

Minor

New Features

Patch

Bug Fixes

---

Examples

```text
1.0.0

1.0.1

1.1.0

2.0.0
```

---

# Release Checklist

Before Production

✔ Code Reviewed

✔ CI Passed

✔ Docker Image Built

✔ Security Scan Passed

✔ Helm Updated

✔ Kubernetes Manifest Validated

✔ Documentation Updated

✔ Runbook Available

✔ Rollback Plan Ready

✔ Release Notes Prepared

---

# Enterprise Release Architecture

Developer

↓

Git Feature Branch

↓

Develop

↓

Release Branch

↓

GitHub Actions

↓

Docker Registry

↓

Kind Cluster

↓

QA

↓

Approval

↓

Main

↓

Production

↓

Git Tag

↓

Monitoring

This is the workflow we will later implement.

---

# Release Documentation

Every production release should include

- Version
- Features
- Bug Fixes
- Known Issues
- Deployment Time
- Rollback Plan
- Validation Results

Documentation is as important as the deployment.

---

# Real Production Scenario

Scenario

Release v2.4.0 is deployed.

Ten minutes later,

customers report login failures.

Investigation

Check

- Release Tag
- Merge Commit
- Docker Image Version
- Deployment Logs
- Kubernetes Pods

Decision

Rollback to

v2.3.9

Production restored.

Later

Investigate root cause.

---

# Scenario-Based Interview Questions

## Question 1

Why should a release branch not accept new features?

Answer

Because

Production stabilization requires predictable code.

Adding features introduces unnecessary risk.

---

## Question 2

Would you deploy directly from develop?

Answer

Normally no.

Develop contains ongoing work.

Production should deploy from an approved release or protected main branch.

---

## Question 3

A release passed QA but failed in production.

What do you do first?

Expected Discussion

- Check deployment logs.
- Verify release tag.
- Compare previous release.
- Decide rollback or hotfix.
- Notify stakeholders.

---

# Architecture-Level Interview Questions

## Question

Why use release branches instead of deploying directly from main?

Answer

Release branches provide

- Stabilization
- Testing
- Controlled fixes
- Approval process
- Predictable deployments

---

## Question

Why are Git tags important?

Answer

Tags uniquely identify deployed versions.

Without tags,

rollback and auditing become difficult.

Every production release should be tagged.

---

## Question

How would you design release management for multiple microservices?

Expected Discussion

Cover

- Independent versioning
- Release coordination
- Deployment sequencing
- Backward compatibility
- CI/CD automation
- Rollback strategy

---

# Production Support Questions

Q.

Operations reports that production is running version 2.3.4.

How do you verify?

Answer

Check

```bash
git tag

git show v2.3.4
```

Compare

- Docker Image
- Deployment Manifest
- Kubernetes Deployment
- Git Commit SHA

---

Q.

Deployment completed successfully.

Users still report old behavior.

Possible reasons?

Answer

- Wrong image tag
- Incorrect deployment
- Browser cache
- Rollout incomplete
- Wrong release tag

Never assume deployment equals successful release.

---

# Common Mistakes

- No release tags
- Deploying from develop
- Adding features during release
- No rollback plan
- Missing release documentation
- No approval process

---

# Enterprise Best Practices

- Use Semantic Versioning.
- Create release branches.
- Tag every production deployment.
- Prepare rollback plan.
- Maintain release notes.
- Validate before production.
- Keep releases small and predictable.

---

# Key Takeaways

Enterprise Release Flow

Feature Branch

↓

Develop

↓

Release Branch

↓

QA

↓

Approval

↓

Main

↓

Production

↓

Tag

↓

Monitoring

A controlled release process reduces production failures.

---

# Marathi Quick Revision

Release म्हणजे फक्त code merge नाही.

Release मध्ये

Testing

↓

Approval

↓

Deployment

↓

Tag

↓

Monitoring

सगळं येतं.

Production मध्ये नेहमी tagged release deploy करायची.

Develop branch वरून थेट deployment करू नये.

---

# Marathi Interview Memory Tip

Interview मध्ये जर विचारलं:

"Explain your release management process."

असं सांगा:

"आमच्या Enterprise DevOps Platform मध्ये feature branches develop मध्ये merge होतात. Release branch तयार करून QA आणि UAT validation केली जाते. Approval मिळाल्यानंतर release main मध्ये merge होते, Git tag तयार केला जातो आणि production deployment सुरू होते. प्रत्येक release साठी rollback plan आणि release documentation तयार असते."

