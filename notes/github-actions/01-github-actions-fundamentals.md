# GitHub Actions Fundamentals

# Purpose

Understand what GitHub Actions is, why it is important, how it works internally, and how enterprise DevOps teams use it to automate software delivery.

GitHub Actions is one of the most frequently used CI/CD platforms in modern DevOps and a high-priority interview topic.

---

# Introduction

GitHub Actions is GitHub's native automation and Continuous Integration/Continuous Deployment (CI/CD) platform.

It allows developers and DevOps engineers to automate software development workflows directly from GitHub repositories.

Instead of manually building, testing, packaging, and deploying applications, GitHub Actions performs these tasks automatically whenever predefined events occur.

Everything is configured as code using YAML files.

---

# Why GitHub Actions?

Without automation, developers must

- Build applications manually
- Execute tests manually
- Create Docker images manually
- Deploy applications manually
- Verify deployments manually

This process is

- Slow
- Error-prone
- Difficult to scale

GitHub Actions solves these problems by automating the entire software delivery pipeline.

---

# Enterprise Usage

Organizations use GitHub Actions for

- Continuous Integration
- Continuous Deployment
- Docker image builds
- Kubernetes deployments
- Terraform execution
- Infrastructure Automation
- Security scanning
- Dependency updates
- Release automation
- Scheduled maintenance tasks

---

# GitHub Actions in THIS Project

```
Developer

↓

Push Code

↓

GitHub Repository

↓

GitHub Actions

↓

Frontend Build

↓

Backend Tests

↓

Docker Build

↓

Push Images to GHCR

↓

Deploy to Kind Kubernetes

↓

Health Check

↓

Production
```

---

# What is Continuous Integration (CI)?

Continuous Integration automatically validates every code change.

Typical CI activities

- Checkout source code
- Install dependencies
- Execute unit tests
- Run static code analysis
- Build application
- Generate reports

Goal

Detect problems early.

---

# What is Continuous Deployment (CD)?

Continuous Deployment automatically releases validated code.

Typical CD activities

- Build Docker images
- Push images to registry
- Deploy to Kubernetes
- Execute health checks
- Notify teams

Goal

Deliver software quickly and reliably.

---

# GitHub Actions Architecture

```
Developer

↓

Git Push

↓

GitHub Repository

↓

Workflow Trigger

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

Application Build

↓

Deployment
```

---

# Core Components

## Workflow

A Workflow is a YAML file that defines an automation process.

Location

```
.github/workflows/
```

---

## Event

An Event starts a Workflow.

Examples

- push
- pull_request
- release
- workflow_dispatch
- schedule

---

## Runner

A Runner is a machine that executes workflow jobs.

Types

- GitHub-hosted Runner
- Self-hosted Runner

---

## Job

A Job is a collection of related tasks executed on a Runner.

Example

```
Build

↓

Test

↓

Package
```

---

## Step

A Step is an individual task inside a Job.

Examples

- Checkout repository
- Install dependencies
- Execute tests
- Build Docker image

---

## Action

An Action is a reusable automation component.

Examples

```
actions/checkout
```

```
actions/setup-python
```

```
docker/login-action
```

---

# Workflow Execution

```
Developer Pushes Code

↓

GitHub Detects Event

↓

Workflow Starts

↓

Runner Allocated

↓

Jobs Execute

↓

Steps Execute

↓

Workflow Completes

↓

Logs Stored
```

---

# Daily DevOps Activities

DevOps Engineers regularly

- Create workflows
- Maintain CI/CD pipelines
- Review workflow logs
- Debug failed workflows
- Manage GitHub Secrets
- Configure runners
- Improve build performance
- Secure automation pipelines

---

# Advantages

- Native GitHub integration
- Infrastructure as Code
- Easy YAML configuration
- Marketplace Actions
- Built-in CI/CD
- Secret management
- Docker support
- Kubernetes integration
- Multi-platform execution

---

# Production Best Practices

- Keep workflows modular
- Separate CI and CD workflows
- Use reusable workflows
- Pin Action versions
- Protect workflow files
- Store secrets securely
- Review workflow changes using Pull Requests
- Minimize workflow permissions

---

# Security

Always

- Store credentials in GitHub Secrets
- Review third-party Actions
- Pin Action versions
- Rotate secrets regularly
- Restrict workflow permissions

Never

- Hardcode passwords
- Print secrets in logs
- Store API keys in repositories
- Execute untrusted Actions

---

# Common Problems

Problem

Workflow not starting.

Reason

Incorrect event trigger.

---

Problem

Workflow fails immediately.

Reason

YAML syntax error.

---

Problem

Authentication failed.

Reason

Missing GitHub Secret.

---

Problem

Deployment failed.

Reason

Invalid Kubernetes credentials.

---

# Troubleshooting

Verify

- Workflow location
- YAML syntax
- Event trigger
- Runner availability
- Repository permissions
- GitHub Secrets
- Workflow logs

---

# Real Production Scenario

A developer pushes changes to the Dashboard Service.

GitHub Actions automatically

- Checks out the repository
- Installs dependencies
- Executes unit tests
- Builds Docker image
- Pushes the image to GitHub Container Registry
- Deploys the application to Kubernetes
- Performs health checks
- Marks the deployment successful

No manual deployment is required.

---

# Scenario Interview Q&A

### Scenario

A developer pushed code but the pipeline never started.

How would you investigate?

Answer

- Verify the workflow exists in `.github/workflows/`
- Confirm the event trigger matches the action performed
- Check repository Actions settings
- Review workflow syntax
- Verify branch filters
- Review workflow execution history

---

# Architecture Interview Q&A

### Explain GitHub Actions architecture.

Developer performs an event such as a push.

GitHub detects the event and starts the configured Workflow.

A Runner is allocated.

The Runner executes Jobs.

Each Job contains multiple Steps.

Steps use reusable Actions or shell commands.

Results and logs are stored in GitHub.

---

# Production Support Interview Q&A

### What do you check first when a workflow fails?

- Workflow logs
- YAML syntax
- Runner status
- GitHub Secrets
- Repository permissions
- Recent code changes

---

# Related Runbooks

- Workflow Failure Recovery
- Runner Offline Recovery
- Secret Rotation
- Failed Deployment Recovery

---

# Common Incidents

- Workflow Not Triggered
- Runner Offline
- Secret Missing
- Docker Push Failure
- Deployment Failure

---

# Commands

View workflow files

```bash
ls .github/workflows
```

View repository status

```bash
git status
```

Commit workflow changes

```bash
git add .

git commit -m "Add GitHub Actions workflow"
```

Push workflow

```bash
git push origin main
```

---

# Marathi Quick Revision

GitHub Actions म्हणजे GitHub मधील CI/CD Platform.

मुख्य Components

- Workflow
- Event
- Runner
- Job
- Step
- Action

Workflow YAML मध्ये लिहिला जातो.

---

# Marathi Interview Memory Tips

Remember

```
Event

↓

Workflow

↓

Runner

↓

Job

↓

Step

↓

Deployment
```

Interview Formula

```
Workflow

+

Runner

+

Actions

+

Secrets

=

Enterprise CI/CD
```

---

# Key Takeaways

- GitHub Actions is GitHub's native CI/CD platform.
- Workflows automate software delivery.
- Events trigger workflows.
- Jobs run on Runners.
- Steps execute Actions or commands.
- GitHub Actions is a core enterprise DevOps skill and an essential interview topic.

