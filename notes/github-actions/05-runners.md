# GitHub Actions Runners

# Purpose

Understand what GitHub Actions Runners are, how they execute workflows, the differences between GitHub-hosted and Self-hosted Runners, and how enterprise organizations use them in production.

Runners are the execution engines of GitHub Actions.

Without a Runner, a Workflow cannot execute.

---

# Introduction

A Runner is a machine that executes the Jobs defined in a GitHub Actions Workflow.

Whenever a Workflow is triggered, GitHub allocates a Runner.

The Runner

- Downloads the repository
- Executes workflow steps
- Runs scripts
- Executes Actions
- Uploads logs
- Reports results back to GitHub

---

# Enterprise Usage

Organizations use Runners for

- Application builds
- Unit testing
- Docker image creation
- Kubernetes deployment
- Security scanning
- Infrastructure automation
- Release automation
- Performance testing

---

# GitHub Actions in THIS Project

```
Developer

↓

Push Code

↓

GitHub Workflow

↓

Runner

↓

Checkout Repository

↓

Build React

↓

Run Flask Tests

↓

Build Docker Images

↓

Push GHCR

↓

Deploy Kind Kubernetes

↓

Health Verification
```

---

# Runner Architecture

```
Workflow

↓

Runner

↓

Job

↓

Steps

↓

Actions

↓

Logs

↓

Status
```

---

# Types of Runners

GitHub provides two types of Runners

- GitHub-hosted Runner
- Self-hosted Runner

---

# GitHub-hosted Runner

GitHub automatically creates and manages virtual machines.

Examples

- Ubuntu
- Windows
- macOS

Example

```yaml
runs-on: ubuntu-latest
```

Advantages

- No maintenance
- Automatically updated
- Easy to configure
- Secure by default
- Fast setup

Limitations

- Limited execution time
- Internet dependency
- Less customization

---

# Self-hosted Runner

A Runner installed on infrastructure managed by your organization.

It can run on

- Physical Server
- Virtual Machine
- Cloud Instance
- Kubernetes Node

Example

```yaml
runs-on: self-hosted
```

Advantages

- Full control
- Internal network access
- Custom software
- Better performance
- Private infrastructure

Limitations

- Requires maintenance
- Patch management
- Monitoring
- Security hardening

---

# Runner Lifecycle

```
Workflow Triggered

↓

Runner Allocated

↓

Repository Downloaded

↓

Job Executes

↓

Logs Uploaded

↓

Runner Released
```

---

# Runner Labels

Labels allow workflows to select the correct Runner.

Example

```yaml
runs-on:

- self-hosted

- linux

- docker
```

GitHub searches for a Runner that matches all specified labels.

---

# Runner Selection

Example

```
Workflow

↓

runs-on: ubuntu-latest

↓

GitHub-hosted Ubuntu Runner
```

Another example

```
Workflow

↓

runs-on: self-hosted

↓

Internal Linux Server
```

---

# Enterprise Runner Architecture

```
GitHub

↓

Workflow

↓

Self-hosted Runner

↓

Internal Network

↓

Docker

↓

Kubernetes

↓

Production
```

This architecture allows workflows to access internal systems that are not publicly accessible.

---

# Daily DevOps Activities

DevOps Engineers

- Install Self-hosted Runners
- Upgrade Runner software
- Monitor Runner health
- Configure Runner labels
- Remove offline Runners
- Troubleshoot Runner failures
- Scale Runner infrastructure

---

# Production Best Practices

- Use GitHub-hosted Runners for public workloads
- Use Self-hosted Runners for private infrastructure
- Monitor Runner availability
- Patch Runner operating systems
- Restrict Runner permissions
- Use dedicated Runners for production deployments
- Remove unused Runners regularly

---

# Security

Always

- Restrict Runner access
- Patch operating systems
- Rotate Runner credentials
- Monitor Runner logs
- Use least privilege permissions

Never

- Expose Self-hosted Runners publicly
- Install unnecessary software
- Store credentials locally
- Share production Runners across unrelated projects

---

# Common Problems

Problem

Workflow remains queued.

Cause

No Runner available.

---

Problem

Runner Offline.

Cause

Service stopped.

---

Problem

Runner Busy.

Cause

Another Job is executing.

---

Problem

Workflow cannot connect.

Cause

Network issue.

---

# Troubleshooting

Verify

- Runner status
- Runner service
- Network connectivity
- Labels
- Repository permissions
- Organization permissions

---

# Real Production Scenario

A financial organization deploys applications to a private Kubernetes cluster.

GitHub-hosted Runners cannot access the internal network.

The organization installs Self-hosted Runners inside the corporate network.

Deployment workflows execute on these Runners and successfully deploy applications to the internal Kubernetes cluster.

---

# Scenario Interview Q&A

### Scenario

Your workflow is waiting indefinitely.

How do you investigate?

Answer

- Check Runner availability
- Verify Runner is online
- Confirm Runner labels
- Review Runner logs
- Verify repository access
- Check workflow configuration

---

# Architecture Interview Q&A

### Why do enterprises use Self-hosted Runners?

Because they

- Access internal infrastructure
- Support custom software
- Improve security
- Provide better performance
- Allow complete administrative control

---

# Production Support Interview Q&A

### When would you choose GitHub-hosted Runners instead of Self-hosted Runners?

GitHub-hosted Runners are preferred for

- Public repositories
- Standard CI pipelines
- Small projects
- Quick setup
- Temporary workloads

---

# Related Runbooks

- Runner Offline Recovery
- Workflow Failure Recovery
- Deployment Failure Recovery

---

# Common Incidents

- Runner Offline
- Runner Busy
- Workflow Queued
- Network Connectivity Failure

---

# Commands

View Runner configuration

```bash
cat .github/workflows/ci.yml
```

Check Runner service (Linux)

```bash
sudo systemctl status actions.runner.*
```

Restart Runner service

```bash
sudo systemctl restart actions.runner.*
```

---

# Marathi Quick Revision

Runner म्हणजे Workflow execute करणारी Machine.

Types

- GitHub-hosted
- Self-hosted

Workflow मधील सर्व Jobs Runner वर execute होतात.

---

# Marathi Interview Memory Tips

Remember

```
Workflow

↓

Runner

↓

Job

↓

Step

↓

Result
```

Interview Formula

```
Workflow

+

Runner

=

Execution
```

---

# Key Takeaways

- A Runner executes Workflow Jobs.
- GitHub-hosted Runners are managed by GitHub.
- Self-hosted Runners are managed by the organization.
- Enterprises commonly use Self-hosted Runners for internal deployments.
- Proper Runner management improves security, scalability, and pipeline reliability.

