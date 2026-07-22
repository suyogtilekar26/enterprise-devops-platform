# GitHub Actions Jobs, Steps and Actions

# Purpose

Understand the three core building blocks of every GitHub Actions workflow:

- Jobs
- Steps
- Actions

These components define how a workflow executes and are essential for building enterprise CI/CD pipelines.

---

# Introduction

Every GitHub Actions Workflow is composed of one or more Jobs.

Each Job contains multiple Steps.

Each Step either

- Executes a shell command, or
- Uses a reusable Action.

Understanding the relationship between these three components is fundamental for designing production workflows.

---

# Enterprise Usage

Organizations use Jobs, Steps, and Actions to automate

- Application builds
- Unit testing
- Code quality checks
- Docker image creation
- Container registry authentication
- Kubernetes deployment
- Security scanning
- Release creation
- Notifications

---

# GitHub Actions in THIS Project

```
Workflow

↓

Build Job

↓

Checkout Code

↓

Install Dependencies

↓

Run Tests

↓

Build Docker Image

↓

Push Image

↓

Deploy Job

↓

Deploy Kubernetes

↓

Health Check
```

---

# Architecture

```
Workflow

↓

Jobs

↓

Steps

↓

Actions / Commands

↓

Result
```

---

# Relationship

```
Workflow

↓

Job 1

↓

Step 1

↓

Step 2

↓

Step 3

↓

Job 2

↓

Step 1

↓

Step 2
```

---

# What is a Job?

A Job is a collection of related Steps that execute on the same Runner.

Each Job has

- Name
- Runner
- Steps

Example

```yaml
jobs:

  build:

    runs-on: ubuntu-latest
```

---

# Job Characteristics

- Runs on one Runner
- Contains multiple Steps
- Can execute sequentially
- Can execute in parallel with other Jobs
- Has its own execution environment

---

# What is a Step?

A Step is an individual task inside a Job.

Examples

- Checkout repository
- Install packages
- Run tests
- Build application
- Execute scripts

Example

```yaml
steps:

  - run: echo "Hello World"
```

---

# Step Types

Shell Command

```yaml
- run: python app.py
```

Reusable Action

```yaml
- uses: actions/checkout@v4
```

---

# What is an Action?

An Action is a reusable automation component.

Instead of writing everything from scratch, developers reuse existing Actions.

Examples

```
actions/checkout

actions/setup-python

actions/setup-node

docker/login-action

docker/build-push-action
```

---

# Marketplace Actions

GitHub provides thousands of reusable Actions through GitHub Marketplace.

Examples

- Checkout source code
- Install Python
- Install Node.js
- Authenticate Docker
- Publish packages
- Deploy Kubernetes

---

# Workflow Execution

```
Workflow

↓

Build Job

↓

Checkout Action

↓

Install Dependencies

↓

Run Tests

↓

Build Docker Image

↓

Complete Job

↓

Deploy Job

↓

Deploy Kubernetes

↓

Health Check
```

---

# Job Dependencies

Jobs can depend on other Jobs.

Example

```
Build

↓

Test

↓

Deploy
```

Deployment should only begin after Build and Test complete successfully.

---

# Multiple Jobs

Enterprise workflows commonly contain

```
Build Job

↓

Test Job

↓

Security Scan Job

↓

Docker Build Job

↓

Deployment Job
```

Each Job has a specific responsibility.

---

# Daily DevOps Activities

DevOps Engineers

- Create Jobs
- Optimize Steps
- Reuse Marketplace Actions
- Review execution logs
- Improve pipeline speed
- Maintain reusable workflows

---

# Production Best Practices

- Keep Jobs independent
- Keep Steps small
- Reuse Marketplace Actions
- Avoid duplicate logic
- Use descriptive Job names
- Separate Build and Deploy Jobs
- Review third-party Actions

---

# Security

Always

- Pin Action versions
- Review Marketplace Actions
- Store credentials in GitHub Secrets
- Use least privilege permissions

Never

- Execute untrusted Actions
- Hardcode credentials
- Expose secrets in logs

---

# Common Problems

Problem

Job failed.

Cause

Step execution failed.

---

Problem

Action not found.

Cause

Incorrect Action name or version.

---

Problem

Deployment Job executed before Build.

Cause

Missing Job dependency.

---

Problem

Runner error.

Cause

Runner unavailable.

---

# Troubleshooting

Verify

- Job logs
- Step logs
- Action version
- Runner status
- Workflow syntax
- GitHub Secrets

---

# Real Production Scenario

A developer pushes code.

The workflow starts.

The Build Job

- Checks out the repository
- Installs dependencies
- Executes tests
- Builds Docker image

After successful completion,

The Deployment Job

- Authenticates to GitHub Container Registry
- Pulls deployment manifests
- Deploys to Kubernetes
- Performs health verification

---

# Scenario Interview Q&A

### Scenario

The Build Job completed successfully, but the Deployment Job never started.

How would you investigate?

Answer

- Check Job dependencies
- Review workflow logs
- Verify deployment conditions
- Validate workflow syntax
- Check Runner availability

---

# Architecture Interview Q&A

### Explain the relationship between Workflow, Job, Step, and Action.

A Workflow contains one or more Jobs.

Each Job contains multiple Steps.

Each Step executes either a shell command or a reusable Action.

---

# Production Support Interview Q&A

### Why do enterprises split workflows into multiple Jobs?

Because it

- Improves readability
- Allows parallel execution
- Simplifies troubleshooting
- Reduces execution time
- Improves scalability

---

# Related Runbooks

- Workflow Failure Recovery
- Runner Offline Recovery
- Failed Docker Build
- Deployment Failure Recovery

---

# Common Incidents

- Job Failure
- Action Version Error
- Runner Failure
- Deployment Job Failure

---

# Commands

View workflow

```bash
cat .github/workflows/ci.yml
```

Validate repository status

```bash
git status
```

Commit workflow changes

```bash
git add .

git commit -m "Configure jobs and steps"
```

Push changes

```bash
git push origin main
```

---

# Marathi Quick Revision

Workflow मध्ये अनेक Jobs असतात.

Job मध्ये अनेक Steps असतात.

Step मध्ये

- Command
किंवा
- Action

असतो.

---

# Marathi Interview Memory Tips

Remember

```
Workflow

↓

Job

↓

Step

↓

Action
```

Interview Formula

```
Workflow

+

Jobs

+

Steps

+

Actions

=

Complete CI/CD Pipeline
```

---

# Key Takeaways

- A Workflow contains one or more Jobs.
- A Job contains multiple Steps.
- Steps execute shell commands or reusable Actions.
- Marketplace Actions reduce development effort.
- Proper Job design improves scalability, maintainability, and production reliability.

