# Daily DevOps Workflow Using Git

## Purpose

This document explains the daily Git workflow followed by a DevOps Engineer in the Enterprise DevOps Platform.

This is not a developer-only workflow.

It reflects how Platform Engineers and DevOps Engineers interact with Git every day.

---

# Daily Responsibilities

As a DevOps Engineer, Git is used for much more than source code.

Daily work includes:

- Reviewing Pull Requests
- Managing release branches
- Investigating deployment failures
- Updating Infrastructure as Code
- Reviewing GitHub Actions
- Managing Kubernetes manifests
- Updating Helm Charts
- Reviewing Terraform changes
- Writing Runbooks
- Updating Documentation
- Supporting production releases

Almost every task begins with Git.

---

# Morning Workflow

A typical day starts by synchronizing the local repository.

```bash
git checkout develop

git pull origin develop
```

Why?

To ensure your local repository contains the latest approved changes.

Never begin work using outdated code.

---

# Creating a New Feature Branch

Example

We are adding Docker support for the API Gateway.

Create a feature branch.

```bash
git checkout -b feature/docker-api-gateway
```

Branch naming should clearly describe the work.

Good

```text
feature/docker-api-gateway
```

Bad

```text
feature/test

feature/new

feature/update
```

---

# Making Changes

Example

Update

docker/

Dockerfile

docker-compose.yml

README.md

Review modified files.

```bash
git status
```

Expected Output

Shows

Modified

New

Deleted

Files

Always review before staging.

---

# Staging Changes

Stage specific files.

```bash
git add Dockerfile

git add docker-compose.yml
```

Or stage everything.

```bash
git add .
```

Enterprise recommendation

Avoid blindly using

git add .

Review every change first.

---

# Reviewing Staged Changes

Before committing.

```bash
git diff --cached
```

This confirms exactly what will be committed.

---

# Creating a Commit

Good Commit

```bash
git commit -m "Add Dockerfile for API Gateway"
```

Bad Commit

```bash
git commit -m "update"

git commit -m "changes"

git commit -m "fix"
```

Commit messages should explain

What changed

Why

---

# Push Branch

```bash
git push origin feature/docker-api-gateway
```

Branch now exists on GitHub.

---

# Pull Request Workflow

Developer

↓

Push Branch

↓

Open Pull Request

↓

CI Starts

↓

Review

↓

Approval

↓

Merge

↓

Delete Branch

The DevOps Engineer monitors this process.

---

# Updating Your Branch

If develop changes.

```bash
git checkout develop

git pull

git checkout feature/docker-api-gateway

git merge develop
```

Alternative

```bash
git rebase develop
```

We will discuss merge vs rebase later.

---

# Reviewing Commit History

Daily command

```bash
git log --oneline --graph --decorate --all
```

Useful during

- Production investigations
- Release reviews
- Merge analysis

---

# Switching Branches

```bash
git checkout develop

git checkout feature/docker-api-gateway
```

Modern alternative

```bash
git switch develop
```

---

# Cleaning Merged Branches

After merge

Delete local branch.

```bash
git branch -d feature/docker-api-gateway
```

Delete remote branch.

```bash
git push origin --delete feature/docker-api-gateway
```

Keeps repository clean.

---

# Daily DevOps Example

Task

Deploy Dashboard Service update.

Workflow

Pull latest develop

↓

Create feature branch

↓

Modify Kubernetes manifest

↓

Update Helm values

↓

Commit

↓

Push

↓

Open Pull Request

↓

GitHub Actions

↓

Review

↓

Merge

↓

Deployment

Git tracks every step.

---

# Enterprise Workflow

Developer

↓

Feature Branch

↓

Commit

↓

Push

↓

GitHub

↓

Pull Request

↓

GitHub Actions

↓

Docker Build

↓

Image Scan

↓

Kind Cluster

↓

Testing

↓

Release

↓

Production

This is the workflow we will implement.

---

# Daily Git Commands

Check status

```bash
git status
```

Check branch

```bash
git branch
```

View history

```bash
git log --oneline
```

Create branch

```bash
git checkout -b feature/new-feature
```

Push

```bash
git push origin feature/new-feature
```

Pull

```bash
git pull
```

---

# Real Production Scenario

Scenario

A deployment failed.

The application worked yesterday.

Investigation

Review

```bash
git log

git diff

git show

git status
```

Identify

- Last successful commit
- Current deployment commit
- Pull Request
- Pipeline execution

Git provides the timeline of events.

---

# Scenario-Based Interview Questions

## Question 1

You arrive at work and a deployment failed overnight.

What are your first five checks?

Expected Answer

- Check Git commit history.
- Verify latest Pull Request.
- Review GitHub Actions.
- Compare deployed version.
- Review release tag.

---

## Question 2

A developer says

"My feature disappeared."

How do you investigate?

Expected Discussion

- Branch exists?
- Commit exists?
- Merge completed?
- Branch deleted?
- Check reflog.

---

## Question 3

A developer force-pushed develop.

CI started failing.

What do you do?

Expected Discussion

- Freeze merges.
- Compare history.
- Recover commits if needed.
- Restore branch.
- Enable stronger protections.

---

# Architecture-Level Interview Questions

## Question

Why should DevOps Engineers understand Git deeply?

Answer

Because Git drives

- CI/CD
- GitOps
- Infrastructure as Code
- Deployment history
- Rollback
- Auditing

Git is operational infrastructure.

---

## Question

Why review commits before pushing?

Answer

Because once pushed,

CI/CD may start automatically.

Bad commits can

- Build images
- Deploy applications
- Break production

---

# Production Support Questions

Q.

Production deployment succeeded.

Application still behaves incorrectly.

Where do you investigate?

Answer

Compare

- Current Git commit
- Previous release
- Kubernetes manifests
- Helm values
- Deployment pipeline

Git provides deployment traceability.

---

# Common Mistakes

- Forgetting git pull
- Large commits
- Poor commit messages
- Working on wrong branch
- Force pushing shared branches
- Ignoring Pull Requests

---

# Enterprise Best Practices

- Pull before work.
- Keep branches short-lived.
- Commit often.
- Push regularly.
- Review changes before commit.
- Review staged files.
- Delete merged branches.
- Keep history clean.

---

# Key Takeaways

Daily Git workflow is predictable.

Pull

↓

Branch

↓

Develop

↓

Review

↓

Commit

↓

Push

↓

Pull Request

↓

CI

↓

Merge

↓

Deploy

This flow minimizes production risk.

---

# Marathi Quick Revision

DevOps Engineer चा रोजचा Git flow

Pull

↓

Feature Branch

↓

Code बदल

↓

git status

↓

git add

↓

git commit

↓

git push

↓

Pull Request

↓

CI/CD

↓

Merge

↓

Deployment

हा flow दररोज वापरला जातो.

---

# Marathi Interview Memory Tip

Interview मध्ये जर विचारलं:

"What is your daily Git workflow as a DevOps Engineer?"

असं सांगा:

"मी दिवसाची सुरुवात develop branch pull करून करतो. Feature branch तयार करतो, infrastructure किंवा application changes commit करतो, Pull Request तयार करतो, CI/CD validate झाल्यावर merge करतो. Production deployment पर्यंत प्रत्येक step Git द्वारे trace करता येतो."

हे उत्तर Senior DevOps Engineer interview साठी योग्य आहे.

