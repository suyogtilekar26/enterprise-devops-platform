# Git Introduction

## Purpose

This document explains Git from an Enterprise DevOps perspective.

This is NOT a beginner tutorial.

The goal is to understand why Git is one of the most important tools in modern DevOps and how it is used throughout the lifecycle of our Enterprise DevOps Platform.

---

# What is Git?

Git is a Distributed Version Control System (DVCS).

It tracks changes made to source code and configuration files over time.

Unlike centralized version control systems, every developer has a complete copy of the repository, including its full history.

Git allows teams to:

- Track every change
- Collaborate safely
- Roll back mistakes
- Review code before merging
- Support automated CI/CD pipelines
- Maintain production stability

---

# Why Git is Important in DevOps

Git is much more than a version control tool.

In modern DevOps, Git becomes the single source of truth.

Almost every automation starts from Git.

Examples:

- Source Code
- Dockerfiles
- Kubernetes Manifests
- Helm Charts
- Terraform Code
- GitHub Actions Workflows
- Argo CD Applications
- Monitoring Configuration
- Runbooks
- Documentation

Without Git, none of these can be managed safely.

---

# Git in Our Enterprise DevOps Platform

Project Components

- React Frontend
- API Gateway
- Auth Service
- Dashboard Service

Everything is stored in one repository.

Git tracks:

Application Code

↓

Infrastructure Code

↓

CI/CD Pipelines

↓

Kubernetes Configuration

↓

Terraform Infrastructure

↓

Production Documentation

↓

Runbooks

↓

Incident Reports

Git is therefore the foundation of the entire platform.

---

# Enterprise Workflow

Developer

↓

Creates Feature Branch

↓

Develops Feature

↓

Commits Changes

↓

Pushes Branch

↓

Creates Pull Request

↓

Code Review

↓

CI Pipeline Executes

↓

Merge Approved

↓

Deployment Starts

Every deployment begins with a Git commit.

---

# Why Companies Choose Git

Git provides:

- Complete change history
- Fast branching
- Easy rollback
- Distributed architecture
- Offline development
- Secure collaboration
- Integration with CI/CD
- Audit capability
- Release management
- Disaster recovery support

Large organizations depend on Git because it provides traceability for every production change.

---

# Real Project Example

Suppose we modify the authentication API.

Files Changed

auth-service/

Developer Workflow

1. Create feature branch
2. Develop feature
3. Commit changes
4. Push branch
5. Create Pull Request
6. Review
7. Merge
8. GitHub Actions builds Docker image
9. Deploy to Kind cluster
10. Later deploy to AWS EKS

Git is the trigger for every step.

---

# Daily DevOps Activities Using Git

As a DevOps Engineer you may:

- Review Pull Requests
- Merge release branches
- Create release tags
- Investigate bad commits
- Recover deleted branches
- Rollback production releases
- Compare releases
- Review commit history
- Audit production changes
- Support developers during merge conflicts

Git becomes a daily operational tool, not just a developer tool.

---

# Real Production Scenario

Scenario

A deployment to production fails immediately after a merge into the main branch.

As the DevOps engineer, your responsibilities are:

- Identify the commit that triggered the deployment.
- Review the Pull Request.
- Verify pipeline logs.
- Determine whether the issue is in application code or infrastructure.
- Decide whether to revert the commit or deploy a hotfix.
- Restore production stability.

This is a common real-world responsibility.

---

# Scenario-Based Interview Questions

## Question 1

A developer accidentally merged broken code into the main branch.

What would you do?

Expected Discussion

- Identify the merge commit.
- Review the Pull Request.
- Verify CI/CD logs.
- Roll back or revert safely.
- Investigate the root cause.
- Strengthen branch protection if needed.

---

## Question 2

A production deployment failed after today's release.

How do you determine whether Git is responsible?

Expected Discussion

- Compare commits.
- Review release tags.
- Check merge history.
- Validate deployment artifacts.
- Correlate pipeline execution with Git history.

---

# Architecture-Level Interview Questions

## Question

Why is Git considered the source of truth in GitOps?

Answer

Because every desired infrastructure and application state is stored in Git.

Automation tools such as GitHub Actions, Terraform and Argo CD continuously reconcile running environments with the version stored in Git.

Git therefore becomes the authoritative definition of the system.

---

## Question

Why do enterprises avoid direct commits to the main branch?

Answer

Direct commits bypass:

- Code Review
- CI Validation
- Security Checks
- Automated Testing
- Approval Process

Protected branches reduce production risk.

---

# Production Support Questions

Q.

A release worked yesterday but fails today.

Where do you begin?

A.

Start with Git history.

Compare:

- Last successful deployment
- Current deployment
- Merge commits
- Release tags
- Pipeline execution

Git usually provides the first clues.

---

# Common Mistakes

- Committing directly to main
- Force pushing shared branches
- Large unrelated commits
- Poor commit messages
- Ignoring Pull Requests
- Deleting branches without verification
- Skipping code reviews

---

# Key Takeaways

Git is:

- Version Control
- Collaboration Platform
- Audit System
- Deployment Trigger
- CI/CD Foundation
- GitOps Source of Truth

Understanding Git deeply is essential for every DevOps engineer.

---

# Marathi Quick Revision

Git म्हणजे फक्त code save करणारे tool नाही.

Git हा आपल्या संपूर्ण DevOps pipeline चा पाया आहे.

Developer code push करतो.

GitHub Actions build सुरू करते.

Docker image तयार होते.

Kind Kubernetes cluster मध्ये deployment होते.

पुढे AWS EKS वर production deployment होते.

म्हणून Git हा संपूर्ण automation चा starting point आहे.

---

# Marathi Interview Memory Tip

Interview मध्ये जर विचारलं:

"Git म्हणजे काय?"

फक्त "Version Control System" एवढंच सांगू नका.

असं सांगा:

"आमच्या Enterprise DevOps Platform मध्ये Git हे Source of Truth आहे. Application code, Infrastructure code, Kubernetes manifests, Terraform, Helm charts आणि CI/CD workflows सर्व Git मध्ये version control केले जातात. प्रत्येक deployment Git commit पासून सुरू होतो."

हा उत्तर 5+ वर्षांच्या DevOps Engineer कडून अपेक्षित असतो.

