# Lab 07 - Enterprise Git Workflow

## Objective

In this lab, you will simulate the complete Enterprise Git workflow used by DevOps teams, starting from feature development through production release.

This workflow closely resembles what is followed in large organizations using GitHub, GitLab, or Bitbucket.

---

# Lab Scenario

A new feature has been requested.

As a DevOps Engineer, you must ensure the code follows the enterprise development workflow before reaching production.

The workflow includes:

- Feature Branch
- Development
- Commit
- Pull Request
- Code Review
- Merge
- Release Tag
- Production Deployment

---

# Prerequisites

- Labs 01–06 completed
- Repository is clean

Verify

```bash
git status
```

Expected

```text
nothing to commit, working tree clean
```

---

# Enterprise Git Workflow

```text
Developer

↓

Clone Repository

↓

Create Feature Branch

↓

Develop Feature

↓

Commit Changes

↓

Push Branch

↓

Open Pull Request

↓

Code Review

↓

CI/CD Pipeline

↓

Merge to Main

↓

Create Release Tag

↓

Deploy to Production
```

---

# Step 1 - Verify Current Branch

```bash
git branch
```

Expected

```text
* main
```

---

# Step 2 - Pull Latest Changes

```bash
git pull
```

If no remote is configured yet, this step can be skipped.

---

# Step 3 - Create Feature Branch

```bash
git checkout -b feature/user-profile
```

Verify

```bash
git branch
```

---

# Step 4 - Create Sample Feature

```bash
mkdir -p docs/features
```

```bash
cat > docs/features/user-profile.md <<EOF2
# User Profile Feature

Status: Development

Owner: Dev Team
EOF2
```

---

# Step 5 - Verify Changes

```bash
git status
```

---

# Step 6 - Stage Changes

```bash
git add .
```

---

# Step 7 - Commit Changes

```bash
git commit -m "Add user profile feature documentation"
```

---

# Step 8 - Verify Commit History

```bash
git log --oneline --graph
```

---

# Step 9 - Simulate Push to GitHub

In a real environment

```bash
git push origin feature/user-profile
```

This creates a remote feature branch.

---

# Step 10 - Simulate Pull Request

Enterprise Workflow

```text
Feature Branch

↓

Pull Request

↓

Automatic CI

↓

Code Review

↓

Approval

↓

Merge
```

---

# Step 11 - Switch to Main

```bash
git checkout main
```

---

# Step 12 - Merge Feature

```bash
git merge feature/user-profile
```

---

# Step 13 - Delete Feature Branch

```bash
git branch -d feature/user-profile
```

---

# Step 14 - Create Production Release

```bash
git tag -a v1.2.0 -m "Enterprise Release v1.2.0"
```

---

# Step 15 - Verify Release

```bash
git tag
```

Expected

```text
v1.0.0
v1.1.0
v1.2.0
```

---

# Step 16 - Verify Repository

```bash
git status
```

Expected

```text
nothing to commit, working tree clean
```

---

# Complete Enterprise Flow

```text
Clone Repository

↓

Feature Branch

↓

Development

↓

Commit

↓

Push

↓

Pull Request

↓

Code Review

↓

CI Pipeline

↓

Merge

↓

Tag Release

↓

Deploy

↓

Monitor

↓

Production Support
```

---

# Repository Lifecycle

```text
Developer

↓

Git

↓

GitHub

↓

GitHub Actions

↓

Docker

↓

Container Registry

↓

Kubernetes

↓

Helm

↓

Argo CD

↓

Production
```

---

# Verification Checklist

- Repository clean
- Feature branch created
- Feature committed
- Merge completed
- Release tag created
- Repository ready for deployment

---

# Troubleshooting

## Branch already exists

```bash
git branch
```

Delete

```bash
git branch -d feature/user-profile
```

---

## Merge conflict

```bash
git status
```

Resolve conflict

```bash
git add .
```

Complete merge

```bash
git commit
```

---

## Missing tag

List tags

```bash
git tag
```

Create again

```bash
git tag -a v1.2.0 -m "Enterprise Release v1.2.0"
```

---

# Production Best Practices

- Protect the main branch.
- Require Pull Requests.
- Require code reviews.
- Run CI before merging.
- Tag every production release.
- Use semantic versioning.
- Keep commit history clean.
- Delete merged branches.
- Document every release.

---

# Real Production Scenario

The Development Team completes a new feature for the Enterprise DevOps Platform.

Developers work on isolated feature branches and submit Pull Requests to GitHub. Automated CI pipelines build the application, execute tests, and run security scans. After approval, the Pull Request is merged into the protected `main` branch. The release is tagged as `v1.2.0`, triggering the deployment pipeline. The Docker image is built, pushed to the container registry, and later deployed to Kubernetes using Helm and Argo CD.

---

# Lab Completion Criteria

You have successfully completed this lab if:

- You followed the complete enterprise Git workflow.
- A feature branch was created and merged.
- A production release tag was created.
- The repository is clean.
- You understand how Git integrates with CI/CD, Docker, Kubernetes, and production deployments.

