# GitHub Actions Interview Questions

# Purpose

This document contains frequently asked GitHub Actions interview questions with production-oriented answers.

These questions are based on real DevOps interviews ranging from Junior to Senior levels.

---

# Beginner Level

## 1. What is GitHub Actions?

GitHub Actions is GitHub's native CI/CD and automation platform that executes workflows based on repository events such as push, pull request, release, or manual execution.

---

## 2. What is a Workflow?

A Workflow is a YAML file that defines an automation process.

Workflow files are stored inside

```
.github/workflows/
```

---

## 3. What is a Runner?

A Runner is the machine that executes GitHub Actions jobs.

Types

- GitHub-hosted Runner
- Self-hosted Runner

---

## 4. What is a Job?

A Job is a collection of related Steps executed on the same Runner.

One Workflow can contain multiple Jobs.

---

## 5. What is a Step?

A Step is an individual task inside a Job.

Examples

- Execute shell command
- Run Python script
- Build Docker image
- Use Marketplace Action

---

## 6. What is an Action?

An Action is a reusable automation component.

Examples

- actions/checkout
- actions/setup-python
- docker/login-action

---

## 7. What language is used to create GitHub Actions workflows?

YAML

---

## 8. Where are Workflow files stored?

```
.github/workflows/
```

---

## 9. What triggers a Workflow?

Common triggers

- push
- pull_request
- release
- workflow_dispatch
- schedule

---

## 10. What is workflow_dispatch?

It allows a Workflow to be executed manually from the GitHub Actions UI.

---

# Intermediate Level

## 11. Difference between GitHub-hosted and Self-hosted Runner?

GitHub-hosted

- Managed by GitHub
- Automatically maintained
- Easy to use

Self-hosted

- Managed by organization
- Runs inside private infrastructure
- Supports internal deployments

---

## 12. What are GitHub Secrets?

Encrypted credentials used inside workflows.

Examples

- Tokens
- Passwords
- API Keys
- Certificates

---

## 13. Why should secrets never be hardcoded?

Because source code is version controlled and may expose sensitive credentials.

Secrets should always be stored in GitHub Secrets.

---

## 14. What are Artifacts?

Artifacts are files generated during workflow execution and stored for later download.

Examples

- Reports
- Logs
- Build packages

---

## 15. What is Cache?

Cache stores reusable dependencies to reduce workflow execution time.

Examples

- npm
- pip
- Maven
- Gradle

---

## 16. Difference between Cache and Artifact?

Cache

- Dependency reuse
- Faster builds

Artifact

- Build output
- Reports
- Downloadable files

---

## 17. What is a Matrix Build?

A Matrix Build executes one Job across multiple environments.

Example

- Ubuntu
- Windows
- macOS

or

- Python 3.10
- Python 3.11
- Python 3.12

---

## 18. What are Reusable Workflows?

Reusable Workflows allow one Workflow to be shared across multiple repositories, reducing duplicate YAML.

---

## 19. Why are Reusable Workflows important?

They

- Reduce duplication
- Improve consistency
- Simplify maintenance
- Standardize CI/CD

---

## 20. What are GitHub Environments?

Environments provide

- Deployment approvals
- Environment secrets
- Protection rules
- Deployment history

---

# Advanced Level

## 21. Why separate CI and CD?

Benefits

- Easier troubleshooting
- Better security
- Independent deployments
- Faster pipelines

---

## 22. How would you secure GitHub Actions?

- Use GitHub Secrets
- Protect branches
- Require approvals
- Pin Action versions
- Review third-party Actions
- Use least privilege

---

## 23. How do you troubleshoot a failed workflow?

- Review logs
- Identify failed Job
- Identify failed Step
- Verify Runner
- Verify Secrets
- Verify permissions
- Re-run workflow

---

## 24. Why use Self-hosted Runners?

To

- Access internal infrastructure
- Improve performance
- Meet compliance requirements
- Run custom software

---

## 25. Why use Deployment Approvals?

To prevent accidental production deployments and ensure change validation.

---

## 26. What production checks should occur before deployment?

- Build
- Tests
- Security Scan
- Docker Build
- Approval
- Health Check

---

## 27. How do you optimize workflow performance?

- Enable Cache
- Use parallel Jobs
- Remove duplicate Steps
- Use Reusable Workflows
- Optimize Docker builds

---

## 28. How do you deploy to Kubernetes using GitHub Actions?

Typical flow

```
Build

↓

Test

↓

Docker Image

↓

Push Registry

↓

kubectl apply

↓

Health Check
```

---

## 29. What happens when a workflow is triggered?

GitHub

↓

Detects Event

↓

Starts Workflow

↓

Allocates Runner

↓

Executes Jobs

↓

Executes Steps

↓

Uploads Logs

↓

Returns Status

---

## 30. Explain GitHub Actions Architecture.

```
Developer

↓

GitHub Event

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

Deployment
```

---

# Scenario-Based Questions

## Scenario 1

A workflow is stuck in the queued state.

What will you check?

Answer

- Runner availability
- Runner labels
- Organization permissions
- Repository permissions

---

## Scenario 2

Workflow cannot authenticate with GHCR.

Answer

Check

- GitHub Secret
- Token permissions
- Registry login
- Image permissions

---

## Scenario 3

Production deployment never started.

Answer

Check

- Environment approval
- Required reviewers
- Branch protection
- Deployment restrictions

---

## Scenario 4

Workflow suddenly became slow.

Answer

Investigate

- Cache
- Runner performance
- Dependency installation
- Large artifacts

---

## Scenario 5

Docker build fails only on one branch.

Answer

Review

- Dockerfile
- Branch-specific changes
- Build context
- Workflow conditions

---

# Rapid Fire Questions

- What is GitHub Actions?
- What is a Workflow?
- What is a Runner?
- What is a Job?
- What is a Step?
- What is an Action?
- What is Cache?
- What is an Artifact?
- What is Matrix Build?
- What is workflow_dispatch?
- What are GitHub Secrets?
- What are Environment Secrets?
- What is a Self-hosted Runner?
- Why use Reusable Workflows?
- Why separate CI and CD?

---

# Marathi Quick Revision

Interview मध्ये लक्षात ठेवा

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

Artifacts = Reports

Cache = Speed

Secrets = Security

Environment = Production Control

---

# Marathi Interview Memory Tips

Interview Formula

```
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

Enterprise GitHub Actions
```

---

# Key Takeaways

- GitHub Actions is a core DevOps interview topic.
- Understand architecture instead of memorizing commands.
- Focus on production use cases and troubleshooting.
- Learn security best practices and deployment strategies.
- Scenario-based questions are common in enterprise interviews.

