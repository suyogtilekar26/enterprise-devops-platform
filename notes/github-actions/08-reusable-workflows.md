# GitHub Actions Reusable Workflows

# Purpose

Understand what Reusable Workflows are, why they are important, and how enterprise DevOps teams eliminate duplicate CI/CD code by sharing common workflows across multiple repositories.

Reusable Workflows improve consistency, maintainability, and scalability.

---

# Introduction

As organizations grow, many repositories require identical CI/CD pipelines.

For example

- Build application
- Run tests
- Build Docker image
- Push image
- Deploy application

Instead of copying the same workflow into every repository, GitHub Actions allows one workflow to be reused by many repositories.

---

# Enterprise Usage

Organizations use Reusable Workflows for

- Standard CI pipelines
- Docker image builds
- Security scanning
- Kubernetes deployments
- Terraform deployments
- Release automation
- Compliance checks
- Notification workflows

---

# GitHub Actions in THIS Project

```
Frontend Repository

↓

Reusable Build Workflow

↓

Docker Workflow

↓

Deployment Workflow

↓

Kind Kubernetes

--------------------------------

Backend Repository

↓

Reusable Build Workflow

↓

Docker Workflow

↓

Deployment Workflow

↓

Kind Kubernetes
```

---

# Architecture

```
Repository

↓

Calls

↓

Reusable Workflow

↓

Runner

↓

Jobs

↓

Deployment
```

---

# What is a Reusable Workflow?

A Reusable Workflow is a GitHub Actions Workflow that can be called from another Workflow.

Instead of duplicating YAML code, multiple repositories reuse one central workflow.

---

# Benefits

- Less duplication
- Easier maintenance
- Standardized pipelines
- Faster development
- Centralized updates
- Improved security
- Consistent deployments

---

# Basic Structure

Caller Workflow

```
Repository

↓

Calls

↓

Reusable Workflow
```

Reusable Workflow

```
Receives Inputs

↓

Runs Jobs

↓

Returns Result
```

---

# Workflow Calling Flow

```
Developer Pushes Code

↓

Workflow Triggered

↓

Reusable Workflow Called

↓

Runner Starts

↓

Build

↓

Test

↓

Docker Build

↓

Deployment

↓

Workflow Complete
```

---

# Inputs

Reusable Workflows can receive parameters.

Examples

- Application Name
- Docker Image
- Environment
- Version
- Namespace

This allows the same workflow to be used by different projects.

---

# Outputs

Reusable Workflows can return

- Build Version
- Docker Image Tag
- Artifact Name
- Deployment Status

The calling workflow can use these outputs in later jobs.

---

# Enterprise Example

A company manages

- 150 Microservices

Every service

- Builds Docker images
- Runs security scans
- Executes unit tests

Instead of maintaining 150 identical workflows,

all repositories call one reusable CI workflow maintained by the DevOps team.

Updating the reusable workflow automatically benefits every repository.

---

# Daily DevOps Activities

DevOps Engineers

- Create reusable workflows
- Update shared workflows
- Review workflow usage
- Version reusable workflows
- Improve pipeline consistency
- Remove duplicate YAML

---

# Production Best Practices

- Keep reusable workflows generic
- Pass values through inputs
- Return useful outputs
- Version reusable workflows
- Document workflow usage
- Review workflow changes carefully
- Test reusable workflows before release

---

# Security

Always

- Restrict repository access
- Review workflow permissions
- Store secrets securely
- Validate input values
- Pin Action versions

Never

- Hardcode credentials
- Expose sensitive outputs
- Allow unrestricted workflow execution

---

# Advantages

- Centralized maintenance
- Reduced duplication
- Faster onboarding
- Consistent CI/CD
- Better governance
- Easier troubleshooting

---

# Common Problems

Problem

Workflow cannot be called.

Cause

Incorrect workflow path.

---

Problem

Inputs missing.

Cause

Required parameters not provided.

---

Problem

Unexpected failure.

Cause

Reusable workflow updated without compatibility.

---

Problem

Permission denied.

Cause

Repository access restrictions.

---

# Troubleshooting

Verify

- Workflow path
- Repository permissions
- Input parameters
- Output references
- Workflow logs
- GitHub Actions permissions

---

# Real Production Scenario

An enterprise maintains over 300 GitHub repositories.

Each repository previously contained its own CI pipeline.

Pipeline updates required editing hundreds of workflow files.

The DevOps team introduced reusable workflows.

Now, repositories simply call a centralized CI workflow.

A single update automatically improves CI pipelines across the organization.

---

# Scenario Interview Q&A

### Scenario

A reusable workflow suddenly fails across multiple repositories.

How would you investigate?

Answer

- Review recent workflow changes
- Check workflow version
- Validate inputs
- Review repository permissions
- Analyze workflow logs
- Test with a sample repository

---

# Architecture Interview Q&A

### Why do enterprises use reusable workflows?

Because they

- Reduce duplicated YAML
- Improve consistency
- Simplify maintenance
- Standardize deployments
- Reduce operational effort

---

# Production Support Interview Q&A

### When should reusable workflows be used?

Use them when multiple repositories perform identical automation such as

- Build
- Test
- Docker
- Deployment
- Security scanning

---

# Related Runbooks

- Workflow Failure Recovery
- Reusable Workflow Update
- Deployment Failure Recovery

---

# Common Incidents

- Shared Workflow Failure
- Invalid Workflow Input
- Permission Denied
- Version Compatibility Issue

---

# Commands

View workflows

```bash
ls .github/workflows
```

Commit changes

```bash
git add .

git commit -m "Add reusable workflow"
```

Push changes

```bash
git push origin main
```

---

# Marathi Quick Revision

Reusable Workflow म्हणजे

एक Workflow अनेक repositories मध्ये वापरणे.

यामुळे

- Duplicate Code कमी होते
- Maintenance सोपी होते
- Standardization वाढते

---

# Marathi Interview Memory Tips

Remember

```
One Workflow

↓

Many Repositories

↓

Same Pipeline
```

Interview Formula

```
Reusable Workflow

+

Shared Logic

=

Enterprise CI/CD
```

---

# Key Takeaways

- Reusable Workflows eliminate duplicate CI/CD code.
- They centralize workflow maintenance.
- Inputs and outputs make workflows flexible.
- Enterprises use them to standardize automation across repositories.
- Reusable Workflows improve scalability, consistency, and maintainability.

