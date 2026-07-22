# GitOps Foundation

## Purpose

This document explains GitOps from an Enterprise DevOps perspective.

GitOps is an operational model where Git becomes the single source of truth for both application code and infrastructure.

Instead of manually deploying changes, automated systems continuously synchronize infrastructure with the desired state stored in Git.

For our Enterprise DevOps Platform, GitOps will later be implemented using GitHub, Kubernetes, Helm, and Argo CD.

---

# Introduction

Traditional deployments often involve

- Manual commands
- Manual configuration changes
- Direct server access
- Human intervention

GitOps replaces these manual operations with automated reconciliation.

Desired state is stored in Git.

Automation ensures the running environment always matches that state.

---

# What is GitOps?

GitOps is a deployment methodology based on four principles.

- Git stores the desired state.
- Changes are made through Git.
- Automation continuously compares desired and actual states.
- Differences are automatically reconciled.

Git becomes the operational control plane.

---

# Why GitOps is Important

GitOps provides

- Declarative infrastructure
- Version control
- Automated deployments
- Rollback capability
- Auditability
- Consistency
- Reduced manual errors

Everything is managed through Git.

---

# Enterprise Usage

GitOps is commonly used for

- Kubernetes Deployments
- Helm Releases
- Infrastructure as Code
- Configuration Management
- Multi-Cluster Deployments
- Disaster Recovery

Many enterprises implement GitOps using Argo CD or Flux.

---

# GitOps Architecture

```text
Developer

↓

Git Commit

↓

GitHub Repository

↓

Argo CD

↓

Kubernetes Cluster

↓

Application Running
```

Argo CD continuously compares Git with the cluster.

If differences exist,

Argo CD reconciles them.

---

# GitOps Principles

## Declarative Configuration

Infrastructure is described using files.

Examples

- Kubernetes YAML
- Helm Charts
- Terraform

Desired state is written, not manually configured.

---

## Version Controlled

Every infrastructure change is

- Committed
- Reviewed
- Approved
- Audited

Git records the complete history.

---

## Automated Deployment

Deployment occurs automatically after approved Git changes.

Manual production deployments become unnecessary.

---

## Continuous Reconciliation

Automation constantly checks

Desired State

↓

Git

Actual State

↓

Cluster

If they differ,

automation restores the desired state.

---

# GitOps Workflow

Developer

↓

Feature Branch

↓

Commit

↓

Pull Request

↓

Review

↓

Merge

↓

GitHub

↓

Argo CD Detects Change

↓

Cluster Updated

↓

Application Running

No engineer logs into production servers.

---

# GitOps in Our Project

Current Repository

```text
frontend/

api-gateway/

auth-service/

dashboard-service/

docker/

helm/

kubernetes/

terraform/
```

Future GitOps Flow

GitHub

↓

GitHub Actions

↓

Container Registry

↓

Helm

↓

Argo CD

↓

Kind Cluster

↓

Future AWS EKS

Git remains the source of truth throughout the pipeline.

---

# Infrastructure as Code

GitOps manages

- Kubernetes Manifests
- Helm Charts
- Terraform
- ConfigMaps
- Secrets References
- Application Versions

Infrastructure changes follow the same review process as application code.

---

# Drift Detection

Configuration Drift

Occurs when the running environment differs from Git.

Example

Administrator manually changes

```text
kubectl edit deployment
```

Cluster

↓

Different from Git

↓

Argo CD Detects Drift

↓

Automatic Synchronization

↓

Cluster Restored

Git always wins.

---

# Rollback

GitOps simplifies rollback.

Example

```text
Current Version

v2.0.0
```

Rollback

↓

Git

↓

Previous Commit

↓

Argo CD

↓

Cluster Updated

Rollback becomes a Git operation.

---

# Daily DevOps Activities

DevOps Engineers

- Review Pull Requests
- Approve infrastructure changes
- Monitor Argo CD
- Investigate synchronization failures
- Resolve configuration drift
- Manage production releases

Direct production changes are avoided.

---

# Production Best Practices

- Store all infrastructure in Git.
- Never manually edit production resources.
- Protect production branches.
- Require Pull Requests.
- Use automated synchronization.
- Monitor synchronization health.
- Deploy immutable versions.

---

# Security Considerations

GitOps improves security by

- Eliminating direct production access
- Providing complete audit history
- Enforcing peer review
- Supporting least privilege
- Restricting deployment paths

Production changes occur only through approved Git commits.

---

# Troubleshooting

Verify repository status

```bash
git status
```

View commit history

```bash
git log --oneline
```

Verify branch

```bash
git branch
```

Verify tags

```bash
git tag
```

Later, Argo CD will also provide

- Sync Status
- Health Status
- Drift Detection

---

# Real Production Scenario

Scenario

A Kubernetes Deployment is manually modified during troubleshooting.

The running cluster no longer matches Git.

Argo CD detects the drift.

It automatically restores the deployment from the approved Git configuration.

The production environment returns to the desired state without manual intervention.

---

# Scenario-Based Interview Questions

## Question 1

What is GitOps?

Answer

GitOps is an operational model where Git stores the desired state and automated tools continuously synchronize infrastructure with that state.

---

## Question 2

Why is Git called the Source of Truth in GitOps?

Answer

Because all approved application and infrastructure definitions are stored in Git, making it the authoritative record for deployments.

---

## Question 3

What is configuration drift?

Answer

Configuration drift occurs when the running environment differs from the configuration stored in Git.

GitOps tools detect and correct this automatically.

---

# Architecture-Level Interview Questions

## Question

Why is GitOps commonly associated with Kubernetes?

Answer

Kubernetes uses declarative resource definitions, making it well suited for GitOps tools that continuously reconcile desired and actual state.

---

## Question

How does GitOps improve auditability?

Answer

Every infrastructure change passes through Git commits, Pull Requests, reviews, and version history, creating a complete audit trail.

---

## Question

Why should production changes never bypass Git in a GitOps environment?

Answer

Manual changes create configuration drift, reduce auditability, and can be overwritten during the next synchronization cycle.

---

# Production Support Questions

Q.

A deployment was manually changed in production and later reverted automatically.

Why?

Answer

The GitOps controller detected configuration drift and reconciled the cluster back to the desired state stored in Git.

---

Q.

Why are engineers discouraged from using

```bash
kubectl edit
```

directly in production?

Answer

Because manual edits bypass Git, are not reviewed or audited, and will typically be overwritten by the GitOps reconciliation process.

---

# Related Runbooks

Future runbooks

- Configure Argo CD
- Resolve Configuration Drift
- Rollback Using Git
- Troubleshoot GitOps Synchronization
- Deploy Helm Application

---

# Common Incidents

- Configuration drift
- Failed synchronization
- Incorrect Git revision
- Manual production changes
- Out-of-sync application
- Invalid Kubernetes manifests

---

# Commands

View status

```bash
git status
```

View history

```bash
git log --oneline
```

View branches

```bash
git branch
```

View tags

```bash
git tag
```

Push changes

```bash
git push origin main
```

---

# Key Takeaways

GitOps extends Git from version control into operations.

It provides

- Declarative deployments
- Automated synchronization
- Configuration drift detection
- Reliable rollback
- Complete auditability

In our Enterprise DevOps Platform, GitHub will become the Source of Truth, GitHub Actions will build and package applications, and Argo CD will synchronize Kubernetes clusters with the desired state stored in Git.

---

# Marathi Quick Revision

GitOps म्हणजे Git मधील configuration हीच production ची desired state असते.

Flow

Commit

↓

GitHub

↓

Argo CD

↓

Kubernetes

↓

Production

Manual changes करू नयेत.

Git मधील configuration हाच अंतिम source असतो.

---

# Marathi Interview Memory Tip

Interview मध्ये जर विचारलं:

"GitOps म्हणजे काय?"

असं सांगा:

"GitOps मध्ये Git हा infrastructure आणि application configuration चा Source of Truth असतो. Developers Git मध्ये changes commit करतात, Pull Request approve झाल्यावर Argo CD सारखी tool Kubernetes cluster ला Git मधील desired state शी synchronize करते. त्यामुळे deployments automated, auditable आणि consistent होतात."

