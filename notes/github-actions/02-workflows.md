# GitHub Actions Workflows

# Purpose

Understand what a GitHub Actions Workflow is, how it is structured, how it executes, and how enterprise DevOps teams design production-ready workflows for CI/CD automation.

A Workflow is the core building block of GitHub Actions.

---

# Introduction

A Workflow is an automated process defined in a YAML file.

It contains one or more Jobs that execute a series of Steps whenever a specified Event occurs.

Every automation in GitHub Actions starts with a Workflow.

Without a Workflow, GitHub Actions cannot execute any automation.

---

# Enterprise Usage

Organizations use workflows to automate

- Application builds
- Unit testing
- Integration testing
- Docker image creation
- Security scanning
- Infrastructure provisioning
- Kubernetes deployments
- Release creation
- Scheduled maintenance jobs

Large enterprises typically maintain dozens or hundreds of workflows across repositories.

---

# Workflow Location

GitHub automatically detects workflows only if they are stored inside

```
.github/workflows/
```

Example

```
enterprise-devops-platform/

.github/

└── workflows/

    ├── ci.yml

    ├── docker.yml

    ├── deploy.yml

    ├── security.yml

    └── release.yml
```

---

# GitHub Actions in THIS Project

```
Developer

↓

Push Code

↓

GitHub Repository

↓

CI Workflow

↓

Build React

↓

Run Flask Tests

↓

Build Docker Images

↓

Push Images to GHCR

↓

Deployment Workflow

↓

Deploy to Kind

↓

Health Verification

↓

Production
```

---

# Workflow Architecture

```
GitHub Event

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

Command

↓

Result
```

---

# Basic Workflow Structure

Every Workflow consists of

- Name
- Trigger
- Jobs
- Steps

Example

```yaml
name: CI Pipeline

on:
  push:

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - run: echo "Workflow Started"
```

---

# Workflow Lifecycle

```
Developer Pushes Code

↓

GitHub Detects Event

↓

Workflow Starts

↓

Runner Allocated

↓

Repository Checked Out

↓

Jobs Execute

↓

Steps Execute

↓

Logs Generated

↓

Workflow Completes
```

---

# Workflow Naming

Good examples

```
ci.yml

docker-build.yml

deploy.yml

release.yml

terraform.yml

security-scan.yml
```

Avoid names like

```
test.yml

new.yml

workflow.yml

abc.yml
```

Workflow names should clearly describe their purpose.

---

# Enterprise Workflow Strategy

Instead of one large workflow, enterprises split responsibilities.

Example

```
CI Workflow

↓

Security Workflow

↓

Docker Workflow

↓

Deployment Workflow

↓

Release Workflow
```

Benefits

- Easier maintenance
- Faster troubleshooting
- Better scalability
- Independent execution
- Improved readability

---

# Workflow Execution

When a configured event occurs

```
GitHub

↓

Reads Workflow

↓

Creates Runner

↓

Executes Jobs

↓

Executes Steps

↓

Uploads Logs

↓

Reports Status
```

---

# Daily DevOps Activities

DevOps Engineers

- Create workflows
- Update pipeline logic
- Review workflow runs
- Analyze logs
- Debug failures
- Improve performance
- Secure workflows
- Maintain deployment automation

---

# Production Best Practices

- One responsibility per workflow
- Keep workflows modular
- Use descriptive names
- Separate CI from CD
- Reuse common workflows
- Protect workflow files
- Store secrets securely
- Review changes through Pull Requests

---

# Security

Always

- Protect workflow files
- Restrict workflow permissions
- Pin Action versions
- Review third-party Actions
- Store credentials in GitHub Secrets

Never

- Hardcode passwords
- Store API keys in YAML
- Print secrets in logs
- Execute unverified Actions

---

# Common Problems

Problem

Workflow does not appear.

Cause

Incorrect directory.

---

Problem

Workflow never starts.

Cause

Wrong trigger.

---

Problem

Workflow fails immediately.

Cause

YAML syntax error.

---

Problem

Workflow remains queued.

Cause

Runner unavailable.

---

# Troubleshooting

Verify

- Workflow location
- YAML syntax
- Event configuration
- Runner status
- Branch filters
- Repository permissions
- Workflow logs

---

# Real Production Scenario

A developer merges a Pull Request into the main branch.

GitHub automatically

- Detects the push event
- Starts the CI workflow
- Builds the application
- Executes unit tests
- Builds Docker images
- Pushes images to GitHub Container Registry
- Starts the deployment workflow
- Deploys to Kubernetes
- Performs health verification

The deployment completes without manual intervention.

---

# Scenario Interview Q&A

### Scenario

A workflow is not executing after a developer pushes code.

How would you investigate?

Answer

- Verify the workflow is inside `.github/workflows/`
- Check the configured trigger
- Validate YAML syntax
- Verify the correct branch was used
- Review Actions history
- Check repository settings

---

# Architecture Interview Q&A

### Explain how a GitHub Actions Workflow executes.

GitHub detects an event.

The matching Workflow starts.

A Runner is allocated.

Jobs execute sequentially or in parallel.

Each Job executes multiple Steps.

Steps execute Actions or shell commands.

Logs and results are stored in GitHub.

---

# Production Support Interview Q&A

### Why do enterprises create multiple workflows instead of one large workflow?

Because separate workflows

- Reduce complexity
- Improve troubleshooting
- Increase reusability
- Enable independent execution
- Improve maintenance

---

# Related Runbooks

- Workflow Failure Recovery
- Runner Offline Recovery
- Failed Deployment Recovery

---

# Common Incidents

- Workflow Not Triggered
- YAML Syntax Error
- Runner Offline
- Deployment Failure

---

# Commands

Create workflow directory

```bash
mkdir -p .github/workflows
```

List workflows

```bash
ls .github/workflows
```

View workflow

```bash
cat .github/workflows/ci.yml
```

Commit changes

```bash
git add .

git commit -m "Add workflow"
```

Push changes

```bash
git push origin main
```

---

# Marathi Quick Revision

Workflow म्हणजे GitHub Actions मधील Automation Process.

Workflow मध्ये असते

- Event
- Jobs
- Steps
- Actions

Workflow फक्त `.github/workflows/` मध्येच ठेवला जातो.

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

Jobs

+

Steps

=

Automation Pipeline
```

---

# Key Takeaways

- A Workflow is the primary automation unit in GitHub Actions.
- Workflow files must be stored in `.github/workflows/`.
- Workflows are triggered by GitHub events.
- Enterprise environments use multiple workflows instead of one monolithic pipeline.
- Well-designed workflows improve scalability, security, and maintainability.

