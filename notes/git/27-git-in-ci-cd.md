# Git in CI/CD

## Purpose

This document explains how Git integrates with Continuous Integration (CI) and Continuous Deployment/Delivery (CD) from an Enterprise DevOps perspective.

Git is the central trigger for modern CI/CD pipelines.

Every code change, infrastructure update, documentation improvement, or release begins with Git.

For our Enterprise DevOps Platform, GitHub will act as the Source of Truth that triggers automated pipelines for building, testing, packaging, and deployment.

---

# Introduction

Modern software delivery is no longer a manual process.

Instead,

every approved Git change automatically triggers automation.

Typical flow

```text
Developer

↓

Git Commit

↓

Git Push

↓

Pull Request

↓

Merge

↓

CI/CD Pipeline

↓

Build

↓

Test

↓

Package

↓

Deploy
```

Git becomes the starting point of the entire software delivery lifecycle.

---

# Why Git is Central to CI/CD

Git provides

- Version Control
- Change History
- Collaboration
- Release Tracking
- Rollback Capability
- Automation Triggers

Without Git,

CI/CD has no reliable event to begin automated workflows.

---

# Enterprise Usage

Git repositories trigger

- Application Builds
- Unit Testing
- Integration Testing
- Docker Image Creation
- Security Scanning
- Infrastructure Validation
- Kubernetes Deployment
- Production Releases

Everything starts with a Git event.

---

# Git Event Triggers

Common CI/CD triggers include

- Push
- Pull Request
- Merge
- Tag Creation
- Release Creation
- Manual Workflow Dispatch
- Scheduled Workflow

Example

```text
git push

↓

GitHub Actions

↓

Pipeline Starts
```

---

# CI/CD Architecture

```text
Developer

↓

Git Commit

↓

Git Push

↓

GitHub Repository

↓

GitHub Actions

↓

Build

↓

Test

↓

Docker Build

↓

Container Registry

↓

Kind Cluster

↓

Future AWS EKS

↓

Production
```

Git is the first step in the automation pipeline.

---

# Git Workflow in Our Project

Our Enterprise DevOps Platform

Repository

↓

GitHub

↓

GitHub Actions

↓

Build React

↓

Test Flask Services

↓

Docker Images

↓

Push Images

↓

Kind Kubernetes

↓

Future Argo CD

↓

Future AWS EKS

Every deployment begins from Git.

---

# Pull Request Workflow

Developer

↓

Feature Branch

↓

Commit

↓

Push

↓

Pull Request

↓

Code Review

↓

CI Validation

↓

Approval

↓

Merge

↓

Deployment

Code should never reach production without validation.

---

# Git Tags and Releases

Production deployments should use Git Tags.

Example

```text
v1.0.0
```

Pipeline

```text
Tag Created

↓

GitHub Actions

↓

Build

↓

Docker

↓

Deploy

↓

Production
```

Tagged releases improve traceability.

---

# Infrastructure as Code

Git also stores

- Dockerfiles
- Docker Compose
- Kubernetes YAML
- Helm Charts
- Terraform

Infrastructure changes follow exactly the same review and deployment process as application code.

---

# GitHub Actions

GitHub Actions monitors Git events.

Examples

```text
Push

↓

Run Tests
```

```text
Pull Request

↓

Security Scan
```

```text
Tag

↓

Production Deployment
```

Automation removes repetitive manual work.

---

# Daily DevOps Activities

DevOps Engineers

- Review Pull Requests
- Monitor pipeline execution
- Investigate failed builds
- Create release tags
- Approve deployments
- Roll back failed releases

Git activity directly influences CI/CD.

---

# Production Best Practices

- Protect production branches.
- Require Pull Requests.
- Require successful CI checks.
- Deploy tagged releases.
- Keep pipelines automated.
- Version infrastructure using Git.
- Store pipeline definitions in Git.

---

# Security Considerations

Secure Git before enabling automation.

Implement

- Branch Protection
- Secret Management
- Least Privilege
- Signed Commits (where required)
- CI Security Scanning
- Dependency Scanning

A compromised repository can compromise the deployment pipeline.

---

# Troubleshooting

Check repository status

```bash
git status
```

View history

```bash
git log --oneline
```

Verify tag

```bash
git tag
```

Verify remote

```bash
git remote -v
```

Check branch

```bash
git branch
```

If pipelines fail,

verify

- Commit reached GitHub
- Correct branch
- Correct tag
- Workflow configuration

---

# Real Production Scenario

Scenario

A developer pushes an update to the API Gateway.

GitHub detects the push.

GitHub Actions automatically

- Builds the Flask service
- Runs unit tests
- Builds Docker image
- Pushes image to registry
- Updates Kubernetes deployment
- Verifies rollout

No manual deployment steps are required.

---

# Scenario-Based Interview Questions

## Question 1

How does Git trigger CI/CD?

Answer

Git events such as pushes, Pull Requests, merges, and tags trigger automated CI/CD workflows.

---

## Question 2

Why should production deployments use Git Tags?

Answer

Tags identify immutable release versions, improving traceability, rollback capability, and deployment consistency.

---

## Question 3

Why store Infrastructure as Code in Git?

Answer

It provides version control, peer review, auditability, and automated deployment of infrastructure changes.

---

# Architecture-Level Interview Questions

## Question

Why is Git called the Source of Truth in CI/CD?

Answer

Because all approved application code, infrastructure definitions, and pipeline configurations originate from the Git repository.

---

## Question

How does Git improve deployment reliability?

Answer

Git enables automated validation, repeatable deployments, rollback capability, and complete change history.

---

## Question

Can CI/CD exist without Git?

Answer

Automation can exist without Git, but modern enterprise CI/CD platforms are almost always driven by version-controlled repositories because Git provides traceability, collaboration, and reliable automation triggers.

---

# Production Support Questions

Q.

A developer pushed code but the pipeline did not start.

What should you investigate?

Answer

Verify

- Push reached GitHub
- Correct branch
- Workflow file exists
- Trigger configuration
- Repository permissions

---

Q.

Production deployed the wrong version.

Where should you investigate first?

Answer

Verify

- Git Tag
- Commit history
- CI/CD pipeline logs
- Deployment artifact version

---

# Related Runbooks

Future runbooks

- Troubleshoot GitHub Actions
- Investigate Failed Pipeline
- Deploy Tagged Release
- Rollback Failed Deployment
- Verify Production Version

---

# Common Incidents

- Pipeline not triggered
- Failed build
- Failed unit tests
- Wrong branch deployed
- Wrong Git tag
- Merge without review
- Infrastructure deployment failure

---

# Commands

Check status

```bash
git status
```

View history

```bash
git log --oneline
```

View tags

```bash
git tag
```

View branches

```bash
git branch
```

View remotes

```bash
git remote -v
```

Push changes

```bash
git push origin main
```

---

# Key Takeaways

Git is the foundation of modern CI/CD.

It provides

- Version Control
- Automation Triggers
- Deployment Traceability
- Infrastructure Management
- Release Versioning
- Rollback Capability

In our Enterprise DevOps Platform, GitHub will trigger GitHub Actions, which will build applications, create Docker images, validate infrastructure, and eventually deploy to Kubernetes, Argo CD, and AWS.

---

# Marathi Quick Revision

Git हा CI/CD चा starting point आहे.

Flow

Commit

↓

Push

↓

GitHub

↓

GitHub Actions

↓

Build

↓

Test

↓

Docker

↓

Kubernetes

↓

Production

Git शिवाय modern CI/CD workflow पूर्ण होत नाही.

---

# Marathi Interview Memory Tip

Interview मध्ये जर विचारलं:

"Git CI/CD मध्ये कसा वापरला जातो?"

असं सांगा:

"Enterprise मध्ये Git हा Source of Truth असतो. Developer commit आणि push केल्यानंतर GitHub Actions सारखी CI/CD pipeline automatically trigger होते. ती build, testing, Docker image creation, security checks आणि deployment करते. त्यामुळे संपूर्ण software delivery process automated, repeatable आणि auditable बनतो."

