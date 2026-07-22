# GitHub - Introduction

# Purpose

Understand what GitHub is, why enterprises use it, and how it fits into a DevOps workflow.

---

# Introduction

GitHub is a cloud-based platform built on top of Git.

Git manages version control locally.

GitHub provides a centralized platform for:

- Source code hosting
- Team collaboration
- Code reviews
- Pull Requests
- CI/CD automation
- Security scanning
- Repository management
- Access control
- Release management

Think of it as the collaboration layer built around Git.

---

# Why GitHub Was Created

Managing code only with Git becomes difficult when multiple developers work on the same project.

Problems include:

- No centralized repository
- Difficult collaboration
- No code review process
- No automated CI/CD
- No issue tracking
- No permission management

GitHub solves all of these problems.

---

# Enterprise Usage

Large organizations use GitHub for:

- Source code management
- Team collaboration
- DevOps automation
- Infrastructure as Code
- Kubernetes deployments
- Docker image builds
- Release management
- Security compliance
- Audit logging

Examples:

- Microsoft
- Google
- Amazon
- Netflix
- Adobe
- Cisco
- Red Hat

---

# GitHub in THIS Project

Repository

```
enterprise-devops-platform
```

GitHub stores

```
Frontend

API Gateway

Auth Service

Dashboard Service

Docker

Docker Compose

Kubernetes

Helm

Terraform

Monitoring

Runbooks

Documentation

GitHub Actions
```

Developers push code.

DevOps automates everything else.

---

# High-Level Architecture

```
Developer

        │

        ▼

      Git

(Local Repository)

        │

        ▼

     GitHub Repository

        │

        ▼

Pull Request

        │

        ▼

Code Review

        │

        ▼

GitHub Actions

        │

        ▼

Docker Build

        │

        ▼

Container Registry

        │

        ▼

Kubernetes Deployment
```

---

# Internal Workflow

Developer creates feature

↓

Commit changes

↓

Push to GitHub

↓

Create Pull Request

↓

Code Review

↓

Merge into Main

↓

GitHub Actions starts

↓

Build Docker Image

↓

Push Image

↓

Deploy to Kubernetes

↓

Production

---

# Daily DevOps Activities

Typical daily work includes:

- Creating repositories
- Managing branches
- Reviewing Pull Requests
- Managing GitHub Actions
- Configuring Secrets
- Managing Teams
- Controlling permissions
- Monitoring CI/CD
- Creating Releases
- Troubleshooting pipeline failures

---

# Advantages

- Centralized code repository
- Easy collaboration
- Pull Requests
- Code Reviews
- Branch Protection
- GitHub Actions
- Issue Tracking
- Release Management
- Security Features
- Enterprise Access Control

---

# Limitations

- Requires internet access
- GitHub outage affects collaboration
- Private repositories require appropriate licensing in some enterprise setups
- Misconfigured permissions can expose repositories

---

# Production Best Practices

- Keep one repository per project
- Protect the main branch
- Require Pull Requests
- Require code reviews
- Require successful CI
- Use GitHub Actions
- Enable MFA
- Store secrets securely
- Follow least-privilege access
- Enable audit logging

---

# Security

Always

- Enable Multi-Factor Authentication
- Use SSH or Personal Access Tokens
- Protect branches
- Rotate secrets
- Restrict repository access
- Use GitHub Secrets
- Enable security scanning

Never

- Commit passwords
- Commit API keys
- Commit private certificates
- Store secrets in code

---

# Common GitHub Components

```
Repository

↓

Branch

↓

Commit

↓

Push

↓

Pull Request

↓

Code Review

↓

Merge

↓

GitHub Actions

↓

Release
```

---

# Real Production Scenario

A developer pushes code to GitHub.

A Pull Request is created.

Two senior developers review the code.

GitHub Actions automatically:

- Builds the application
- Runs unit tests
- Builds Docker images
- Pushes images to the registry

After approval, the code is merged into the main branch and deployed automatically to Kubernetes using the CI/CD pipeline.

This is a standard enterprise GitHub workflow.

---

# Interview Questions

### What is GitHub?

GitHub is a cloud platform that hosts Git repositories and provides collaboration, CI/CD, security, access control, and project management features.

---

### Is GitHub the same as Git?

No.

Git is a distributed version control system.

GitHub is a cloud platform built around Git.

---

### Why do companies use GitHub?

Because it provides:

- Collaboration
- Code Reviews
- Pull Requests
- CI/CD
- Security
- Access Control
- Release Management
- Audit Logs

---

### Can Git work without GitHub?

Yes.

Git is completely independent.

GitHub is only a hosting and collaboration platform.

---

### Can GitHub work without Git?

No.

GitHub repositories are Git repositories.

---

# Marathi Quick Revision

Git म्हणजे Version Control.

GitHub म्हणजे Git Repository Host + Team Collaboration Platform.

GitHub वर

- Code Store होतो
- Team Collaboration होते
- Pull Request येतात
- Code Review होते
- CI/CD चालते
- Deployments होतात

---

# Marathi Interview Memory Tips

Remember

Git = Local Version Control

GitHub = Collaboration Platform

Interview Formula

```
Git

+

GitHub

+

Pull Requests

+

GitHub Actions

+

Branch Protection

=

Enterprise DevOps
```

---

# Key Takeaways

- GitHub is built on Git.
- GitHub enables enterprise collaboration.
- GitHub manages repositories, permissions, reviews, and automation.
- GitHub Actions powers CI/CD.
- GitHub is a core DevOps platform used in production environments worldwide.

