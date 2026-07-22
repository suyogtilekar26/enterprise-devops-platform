# Git Interview Master Guide

## Purpose

This document serves as the final Git revision guide for Enterprise DevOps interviews.

It consolidates all Git topics covered in this repository into a structured reference for

- DevOps Interviews
- Production Support Interviews
- System Design Discussions
- Daily Enterprise Operations

By the end of this guide, you should understand not only Git commands but also how Git is used in real production environments.

---

# Git Learning Roadmap

Completed Topics

01. Introduction
02. Installation
03. Git Architecture
04. Repository Structure
05. Branching Strategy
06. Daily DevOps Workflow
07. Release Management
08. .gitignore
09. Basic Git Commands
10. Commit History
11. Commit Best Practices
12. Merge vs Rebase
13. Conflict Resolution
14. Stashing
15. Tags
16. Remote Repositories
17. Fork vs Clone
18. Cherry-pick
19. Revert vs Reset
20. Reflog
21. Bisect
22. Hooks
23. Submodules
24. Git LFS
25. Git Security
26. GitFlow vs Trunk-Based Development
27. Git in CI/CD
28. GitOps Foundation
29. Git Troubleshooting
30. Production Scenarios

---

# Enterprise Git Workflow

```text
Developer

↓

Feature Branch

↓

Commit

↓

Push

↓

Pull Request

↓

Code Review

↓

CI Validation

↓

Merge

↓

GitHub Actions

↓

Docker Build

↓

Container Registry

↓

Kubernetes

↓

Argo CD

↓

Production

↓

Monitoring

↓

Incident Response
```

Git is the foundation of the entire DevOps lifecycle.

---

# Most Important Git Commands

Repository Status

```bash
git status
```

Clone

```bash
git clone <repository>
```

Initialize

```bash
git init
```

Add Files

```bash
git add .
```

Commit

```bash
git commit -m "message"
```

Push

```bash
git push
```

Pull

```bash
git pull
```

Fetch

```bash
git fetch
```

Branches

```bash
git branch
```

Switch Branch

```bash
git checkout branch-name
```

Create Branch

```bash
git checkout -b feature/new-feature
```

Merge

```bash
git merge feature/new-feature
```

Rebase

```bash
git rebase main
```

Tags

```bash
git tag
```

History

```bash
git log --oneline
```

Graph

```bash
git log --graph --decorate --all
```

Recover

```bash
git reflog
```

Stash

```bash
git stash
```

Cherry Pick

```bash
git cherry-pick <commit>
```

Revert

```bash
git revert <commit>
```

Reset

```bash
git reset --soft HEAD~1
```

Remote

```bash
git remote -v
```

---

# Frequently Asked Interview Questions

## What is Git?

Answer

Git is a distributed version control system used to track source code changes, enable collaboration, maintain version history, and support modern DevOps workflows.

---

## Difference Between Git and GitHub?

Answer

Git

Version control software.

GitHub

Cloud platform that hosts Git repositories and provides collaboration features such as Pull Requests, Actions, and repository management.

---

## What is a Commit?

Answer

A commit is a snapshot of repository changes at a specific point in time.

Each commit has a unique SHA identifier.

---

## What is HEAD?

Answer

HEAD points to the currently checked-out commit or branch.

---

## Difference Between Merge and Rebase?

Answer

Merge

- Preserves branch history
- Creates merge commit

Rebase

- Creates linear history
- Rewrites commit history

---

## Difference Between Revert and Reset?

Answer

Revert

Creates a new commit that reverses previous changes.

Safe for shared repositories.

Reset

Moves branch history backward.

Usually used on local branches.

---

## What is Git Reflog?

Answer

Reflog records updates to HEAD and allows recovery of lost commits and deleted branches.

---

## What is Cherry-pick?

Answer

Cherry-pick copies a specific commit from one branch to another.

---

## What are Git Tags?

Answer

Tags identify important versions such as production releases.

Example

```text
v1.2.0
```

---

## What is Git LFS?

Answer

Git Large File Storage manages large binary files outside the normal Git object database while storing lightweight pointers in the repository.

---

## What is GitOps?

Answer

GitOps is an operational model where Git stores the desired infrastructure state and automated tools synchronize production environments with Git.

---

## Why is Git Important in CI/CD?

Answer

Git provides the events that trigger automated build, test, package, and deployment pipelines.

---

## What is Branch Protection?

Answer

Branch protection prevents unsafe changes by enforcing Pull Requests, reviews, successful CI checks, and other repository policies.

---

## Why Should Secrets Never Be Stored in Git?

Answer

Git history is permanent and distributed.

Exposed credentials can compromise production systems even if later deleted from the latest commit.

---

# Scenario Questions

## Scenario 1

Developer accidentally committed a password.

Expected Answer

- Revoke credential
- Rotate secret
- Remove exposure if necessary
- Review audit logs
- Prevent future occurrences using secret scanning

---

## Scenario 2

Pipeline did not start.

Expected Investigation

- Verify push
- Verify branch
- Check workflow
- Review GitHub Actions
- Validate repository permissions

---

## Scenario 3

Deployment failed.

Expected Investigation

- Git history
- Release tag
- Pull Request
- Docker build
- CI logs

---

## Scenario 4

Merge conflict during release.

Expected Resolution

- Investigate conflict
- Resolve manually
- Test
- Merge
- Deploy

---

## Scenario 5

Developer lost commits.

Expected Resolution

```bash
git reflog
```

Recover branch.

---

# Architecture Questions

## Why is Git called the Source of Truth?

Answer

Because approved application code, infrastructure definitions, and deployment configurations originate from Git.

---

## Why should Infrastructure as Code be stored in Git?

Answer

Version control, auditability, peer review, rollback, and automated deployment all depend on Git.

---

## Why is Git essential for DevOps?

Answer

Git enables

- Collaboration
- Automation
- Versioning
- Rollback
- Release Management
- Infrastructure Management
- GitOps

---

# Production Support Questions

## A deployment failed.

What do you investigate?

Answer

- Git history
- Branch
- Tag
- Pipeline
- Docker image
- Kubernetes deployment

---

## Production is running the wrong version.

Answer

Verify

- Release tag
- Deployment artifact
- Commit history
- CI/CD logs

---

## How do you recover deleted work?

Answer

Use

```bash
git reflog
```

Recover commit.

---

# Common Enterprise Best Practices

- Protect production branches.
- Require Pull Requests.
- Enable MFA.
- Use SSH authentication.
- Never commit secrets.
- Tag production releases.
- Keep commits small.
- Use meaningful commit messages.
- Automate validation.
- Review every production change.
- Monitor CI/CD.
- Document incidents.

---

# Common Mistakes

- Direct push to main
- Force push on shared branches
- Large commits
- Long-lived feature branches
- Missing code review
- Missing release tags
- Hardcoded secrets
- Ignoring CI failures
- Poor commit messages
- Manual production changes

---

# Enterprise Git in Our Project

Git will manage

Application

- React Frontend
- API Gateway
- Auth Service
- Dashboard Service

Infrastructure

- Docker
- Docker Compose
- Kubernetes
- Helm
- Terraform

Automation

- GitHub Actions

Operations

- Documentation
- Runbooks
- Incident Records

Future

- Argo CD
- AWS
- GitOps Deployments

Git remains the single source of truth for the platform.

---

# Final Interview Summary

If asked,

"Explain how Git is used in an Enterprise DevOps environment."

A strong answer is:

"Git is much more than a version control system. In an enterprise environment it acts as the single source of truth for application code, infrastructure as code, documentation, CI/CD pipelines, and release management. Developers work on feature branches, changes are reviewed through Pull Requests, validated by automated CI pipelines, merged into protected branches, and deployed through automated workflows. Git also supports rollback, auditing, GitOps, incident investigation, compliance, and production support."

---

# Key Takeaways

After completing these Git notes you should understand

- Git fundamentals
- Repository architecture
- Branching strategies
- Enterprise workflows
- Release management
- GitHub integration
- CI/CD
- GitOps
- Security
- Troubleshooting
- Production support
- Interview preparation

This knowledge forms the Git foundation for the remaining Enterprise DevOps Platform topics including Docker, Kubernetes, Helm, Terraform, Argo CD, Monitoring, and AWS.

---

# Marathi Quick Revision

Git म्हणजे फक्त version control नाही.

Enterprise मध्ये Git वापरला जातो

- Source Code
- Infrastructure as Code
- CI/CD
- GitHub Actions
- Docker
- Kubernetes
- Helm
- Terraform
- GitOps
- Rollback
- Production Support
- Incident Investigation

Git हा संपूर्ण DevOps pipeline चा foundation आहे.

---

# Marathi Interview Memory Tip

Interview मध्ये जर शेवटी विचारलं:

"Git वर काही सांग."

असं सांगा:

"Git हा Enterprise DevOps चा backbone आहे. Source code पासून Infrastructure as Code, CI/CD, GitOps, release management, rollback, security, auditing आणि production support पर्यंत सर्व workflows Git वर आधारित असतात. त्यामुळे Git चे commands माहित असणे पुरेसे नाही; production मध्ये Git कसा वापरला जातो हे समजणे DevOps Engineer साठी अत्यंत महत्त्वाचे आहे."

