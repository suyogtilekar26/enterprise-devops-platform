# Git vs GitHub

# Purpose

Understand the difference between Git and GitHub, their responsibilities, and where each is used in an enterprise DevOps environment.

---

# Introduction

Many beginners think Git and GitHub are the same.

They are not.

Git is a Version Control System.

GitHub is a cloud platform built on top of Git.

Git can work without GitHub.

GitHub cannot work without Git.

---

# Definitions

## Git

Git is a Distributed Version Control System (DVCS).

It tracks changes to source code and allows developers to collaborate without overwriting each other's work.

Created by:

**Linus Torvalds (2005)**

---

## GitHub

GitHub is a cloud-based Git repository hosting platform.

It provides collaboration, security, automation, access control, CI/CD, and repository management.

Owned by:

**Microsoft**

---

# Enterprise Usage

Git handles

- Version control
- Branching
- Merging
- Commit history
- Local repositories

GitHub handles

- Repository hosting
- Team collaboration
- Pull Requests
- Code Reviews
- GitHub Actions
- Secrets
- Organizations
- Teams
- Releases
- Security scanning

---

# Git vs GitHub Comparison

| Feature | Git | GitHub |
|----------|-----|---------|
| Version Control | Yes | Uses Git |
| Local Repository | Yes | No |
| Remote Repository | No | Yes |
| Branching | Yes | Uses Git |
| Merge | Yes | Uses Git |
| Pull Requests | No | Yes |
| Code Reviews | No | Yes |
| CI/CD | No | GitHub Actions |
| Repository Permissions | No | Yes |
| Teams | No | Yes |
| Organizations | No | Yes |
| Secrets Management | No | Yes |
| Releases | Basic Tags | Full Release Management |
| Security Scanning | No | Yes |
| Web Interface | No | Yes |

---

# Git Workflow

```
Working Directory

↓

git add

↓

Staging Area

↓

git commit

↓

Local Repository
```

Git works entirely on your local machine.

---

# GitHub Workflow

```
Local Repository

↓

git push

↓

GitHub Repository

↓

Pull Request

↓

Code Review

↓

Merge

↓

GitHub Actions

↓

Deployment
```

GitHub begins where Git ends.

---

# Git and GitHub in THIS Project

Developer

↓

Writes code

↓

Git tracks changes

↓

Commit

↓

Push

↓

GitHub Repository

↓

Pull Request

↓

Code Review

↓

GitHub Actions

↓

Docker Build

↓

Container Registry

↓

Kubernetes

↓

Production

---

# Daily DevOps Activities

Using Git

- Commit changes
- Create branches
- Merge branches
- Resolve conflicts
- Revert commits

Using GitHub

- Review Pull Requests
- Manage repositories
- Configure branch protection
- Create releases
- Configure GitHub Actions
- Store secrets
- Manage teams
- Troubleshoot CI/CD

---

# Production Best Practices

Git

- Commit frequently
- Use meaningful commit messages
- Keep feature branches small
- Pull latest changes regularly

GitHub

- Protect main branch
- Require Pull Requests
- Require approvals
- Require successful CI
- Restrict repository permissions
- Store secrets securely

---

# Security

Git

- Never commit passwords
- Never commit API keys
- Never commit certificates

GitHub

- Enable MFA
- Use SSH or PAT
- Use GitHub Secrets
- Enable branch protection
- Enable security scanning

---

# Real Production Scenario

A developer creates a new authentication feature.

Using Git

- Creates a feature branch
- Commits changes locally

Using GitHub

- Pushes branch
- Creates Pull Request
- Team reviews code
- GitHub Actions runs tests
- Docker image is built
- Image is pushed to the registry
- Deployment to Kubernetes begins

Git performs version control.

GitHub manages collaboration and automation.

---

# Common Interview Questions

### What is Git?

Git is a distributed version control system used to track changes in source code.

---

### What is GitHub?

GitHub is a cloud-based platform that hosts Git repositories and provides collaboration, CI/CD, security, and repository management features.

---

### Can Git work without GitHub?

Yes.

Git is completely independent and works locally.

---

### Can GitHub work without Git?

No.

GitHub repositories are Git repositories.

---

### Which tool performs version control?

Git.

---

### Which tool performs CI/CD?

GitHub Actions within GitHub.

---

### Which tool manages Pull Requests?

GitHub.

---

### Which tool manages repository permissions?

GitHub.

---

### Which tool tracks commit history?

Git.

---

# Common Interview Mistakes

Incorrect

"GitHub stores commits."

Correct

Git stores commits.

GitHub stores Git repositories.

---

Incorrect

"GitHub is Version Control."

Correct

Git is Version Control.

GitHub is a collaboration platform.

---

# Marathi Quick Revision

Git म्हणजे Version Control System.

GitHub म्हणजे Git Repository Hosting Platform.

Git

- Commit
- Branch
- Merge
- History

GitHub

- Repository
- Pull Request
- Code Review
- GitHub Actions
- Secrets
- Teams
- Releases

---

# Marathi Interview Memory Tips

Remember

```
Git

=

Version Control
```

```
GitHub

=

Collaboration

+

Automation

+

CI/CD

+

Security
```

Interview Formula

```
Git

+

GitHub

=

Complete DevOps Workflow
```

---

# Key Takeaways

- Git and GitHub are different technologies.
- Git performs version control.
- GitHub provides collaboration and automation.
- Git can exist without GitHub.
- GitHub relies on Git.
- Git manages code history, while GitHub manages enterprise development workflows.

