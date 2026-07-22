# GitHub Actions Events and Triggers

# Purpose

Understand how GitHub Actions Workflows are started, what Events are, how Triggers work, and how enterprise DevOps teams use them to automate CI/CD pipelines.

Without Events and Triggers, a Workflow will never execute.

---

# Introduction

A Workflow does not continuously run.

Instead, GitHub waits for a specific event.

When that event occurs, GitHub automatically starts the associated Workflow.

This mechanism is called a Trigger.

---

# Enterprise Usage

Organizations trigger workflows for

- Code Push
- Pull Requests
- Release Creation
- Scheduled Tasks
- Manual Deployments
- Issue Management
- Branch Creation
- Tag Creation
- Repository Dispatch
- Workflow Chaining

---

# GitHub Actions in THIS Project

```
Developer Pushes Code

↓

Push Event

↓

CI Workflow Starts

↓

Build

↓

Test

↓

Docker Build

↓

Push GHCR

↓

Deploy Kind

↓

Health Check
```

---

# Architecture

```
GitHub Event

↓

Trigger

↓

Workflow

↓

Runner

↓

Jobs

↓

Steps

↓

Result
```

---

# What is an Event?

An Event is an activity that occurs inside a GitHub repository.

Examples

- Push
- Pull Request
- Release
- Tag
- Issue
- Schedule
- Manual Execution

An Event tells GitHub something has happened.

---

# What is a Trigger?

A Trigger tells GitHub

"When this event occurs, execute this workflow."

Example

```
Push Event

↓

Start Workflow
```

---

# Common Events

## Push

Occurs whenever commits are pushed.

Example

```yaml
on:
  push:
```

Enterprise Usage

- Build application
- Execute tests
- Build Docker images

---

## Pull Request

Occurs when a Pull Request is opened, synchronized or merged.

Example

```yaml
on:
  pull_request:
```

Enterprise Usage

- Code Review
- Unit Testing
- Security Checks

---

## Workflow Dispatch

Manual execution.

Example

```yaml
on:
  workflow_dispatch:
```

Enterprise Usage

- Manual deployment
- Emergency fixes
- Production releases

---

## Release

Triggered when a GitHub Release is created.

Example

```yaml
on:
  release:
    types:
      - published
```

Enterprise Usage

- Package software
- Publish release artifacts

---

## Schedule

Runs automatically based on time.

Example

```yaml
on:
  schedule:
    - cron: '0 2 * * *'
```

Enterprise Usage

- Backup
- Cleanup
- Security Scan
- Dependency Updates

---

# Multiple Triggers

One Workflow can have multiple triggers.

Example

```yaml
on:

  push:

  pull_request:

  workflow_dispatch:
```

---

# Branch Filters

Trigger only for specific branches.

Example

```yaml
on:

  push:

    branches:

      - main

      - develop
```

---

# Ignore Branches

```yaml
on:

  push:

    branches-ignore:

      - experimental
```

---

# Tag Trigger

```yaml
on:

  push:

    tags:

      - "v*"
```

Enterprise Usage

Deploy only version releases.

---

# Path Filters

Trigger only when specific files change.

Example

```yaml
on:

  push:

    paths:

      - frontend/**
```

Useful for monorepositories.

---

# Workflow Lifecycle

```
Developer Action

↓

GitHub Event

↓

Trigger Matches

↓

Workflow Starts

↓

Runner Created

↓

Jobs Execute

↓

Workflow Complete
```

---

# Daily DevOps Activities

DevOps Engineers

- Configure triggers
- Restrict branch execution
- Configure release automation
- Create scheduled workflows
- Debug trigger failures
- Optimize workflow execution

---

# Production Best Practices

- Trigger only when necessary
- Restrict deployment to protected branches
- Use manual approval for production
- Use path filters
- Use tag-based releases
- Separate CI and CD triggers
- Avoid unnecessary executions

---

# Security

Always

- Restrict production workflows
- Protect deployment branches
- Require Pull Requests
- Use approval gates
- Validate release tags

Never

- Deploy production from feature branches
- Allow unrestricted manual deployments

---

# Common Problems

Problem

Workflow not starting.

Cause

Incorrect trigger.

---

Problem

Workflow starts unexpectedly.

Cause

Broad trigger configuration.

---

Problem

Production deployment executed accidentally.

Cause

Missing branch restriction.

---

Problem

Scheduled workflow never runs.

Cause

Invalid cron expression.

---

# Troubleshooting

Verify

- Event configuration
- Branch filters
- Tag filters
- Path filters
- Workflow syntax
- Repository Actions settings

---

# Real Production Scenario

Developers work on feature branches.

Only Pull Requests merged into the **main** branch trigger the deployment workflow.

Feature branches execute CI only.

Production deployment occurs only after

- Code Review
- Approval
- Merge into main

This prevents accidental production deployments.

---

# Scenario Interview Q&A

### Scenario

A developer pushes code, but the workflow does not execute.

How do you investigate?

Answer

- Verify trigger configuration
- Check branch filters
- Validate workflow syntax
- Confirm workflow exists in `.github/workflows`
- Review GitHub Actions history

---

# Architecture Interview Q&A

### Explain how Events and Triggers work.

GitHub continuously monitors repository activities.

When a configured Event occurs, GitHub evaluates the Trigger.

If the Trigger matches, the Workflow starts and executes on a Runner.

---

# Production Support Interview Q&A

### Why do enterprises use branch filters?

To

- Protect production
- Reduce unnecessary builds
- Separate development from production
- Control deployments

---

# Related Runbooks

- Workflow Failure Recovery
- Deployment Approval
- Runner Offline Recovery

---

# Common Incidents

- Workflow Not Triggered
- Incorrect Branch Trigger
- Scheduled Workflow Failure
- Production Deployment Triggered Accidentally

---

# Commands

Commit workflow

```bash
git add .

git commit -m "Configure workflow triggers"
```

Push workflow

```bash
git push origin main
```

---

# Marathi Quick Revision

Event म्हणजे GitHub मध्ये घडणारी Activity.

Trigger म्हणजे

"हा Event झाला की Workflow चालू करा."

Common Events

- Push
- Pull Request
- Release
- Schedule
- Manual

---

# Marathi Interview Memory Tips

Remember

```
Event

↓

Trigger

↓

Workflow

↓

Runner

↓

Deployment
```

Interview Formula

```
Event

+

Trigger

=

Workflow Execution
```

---

# Key Takeaways

- Events represent repository activities.
- Triggers determine when a Workflow starts.
- Multiple triggers can be configured for a single Workflow.
- Branch, tag, and path filters provide better control.
- Proper trigger configuration improves security, performance, and deployment reliability.

