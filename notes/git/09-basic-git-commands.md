# Basic Git Commands

## Purpose

This document explains the most commonly used Git commands from an Enterprise DevOps perspective.

These commands form the foundation of daily Git operations and are used by developers, DevOps engineers, SREs, and Platform Engineers.

Mastering these commands is essential before learning advanced Git topics.

---

# Daily Git Workflow

A typical Git workflow follows this sequence.

```text
Clone Repository

↓

Create Branch

↓

Modify Files

↓

Review Changes

↓

Stage Changes

↓

Commit

↓

Push

↓

Pull Request

↓

Merge

↓

Deploy
```

Almost every Git task uses one or more of the commands explained in this document.

---

# Clone Repository

Clone downloads the complete repository.

```bash
git clone https://github.com/company/enterprise-devops-platform.git
```

Result

- Complete history
- All branches
- Tags
- Repository configuration

A clone is a complete Git repository.

---

# Check Repository Status

```bash
git status
```

Purpose

Shows

- Modified files
- New files
- Deleted files
- Current branch
- Staged changes

This is one of the most frequently used Git commands.

Example

```bash
git status
```

Review the output before every commit.

---

# View Current Branch

```bash
git branch
```

Example Output

```text
* develop
  main
```

The asterisk (*) indicates the active branch.

---

# View All Branches

Local branches

```bash
git branch
```

Remote branches

```bash
git branch -r
```

All branches

```bash
git branch -a
```

Useful when working with multiple teams.

---

# Create a Branch

```bash
git checkout -b feature/docker-api-gateway
```

Modern alternative

```bash
git switch -c feature/docker-api-gateway
```

Always create feature branches from

develop

unless following another approved workflow.

---

# Switch Branches

Traditional command

```bash
git checkout develop
```

Modern command

```bash
git switch develop
```

Verify the current branch before making changes.

---

# Stage Files

Stage one file.

```bash
git add Dockerfile
```

Stage multiple files.

```bash
git add Dockerfile docker-compose.yml
```

Stage all changes.

```bash
git add .
```

Enterprise recommendation

Review changes before using

```bash
git add .
```

---

# Review Changes

Unstaged changes

```bash
git diff
```

Staged changes

```bash
git diff --cached
```

Always verify changes before committing.

---

# Commit Changes

Example

```bash
git commit -m "Add Dockerfile for API Gateway"
```

A commit should represent one logical change.

Avoid combining unrelated modifications into a single commit.

---

# Push Changes

Push current branch.

```bash
git push origin feature/docker-api-gateway
```

Push a new branch.

```bash
git push -u origin feature/docker-api-gateway
```

The

-u

option sets the upstream branch.

---

# Pull Latest Changes

```bash
git pull
```

Specific branch

```bash
git pull origin develop
```

Always pull before starting new work.

---

# Fetch Changes

```bash
git fetch
```

Difference

Fetch

Downloads changes.

Does not merge.

Pull

Downloads

+

Merges.

Fetch is safer for reviewing incoming changes.

---

# View Commit History

Compact view

```bash
git log --oneline
```

Detailed history

```bash
git log
```

Graph view

```bash
git log --oneline --graph --decorate --all
```

Useful during troubleshooting.

---

# Show Commit Details

```bash
git show
```

Specific commit

```bash
git show <commit-id>
```

Displays

- Author
- Timestamp
- Files changed
- Exact code differences

---

# Rename Branch

Current branch

```bash
git branch -m feature/new-name
```

Useful before opening a Pull Request.

---

# Delete Branch

Delete local branch.

```bash
git branch -d feature/docker-api-gateway
```

Force delete.

```bash
git branch -D feature/docker-api-gateway
```

Delete remote branch.

```bash
git push origin --delete feature/docker-api-gateway
```

Delete branches after successful merges.

---

# Check Remote Repository

```bash
git remote -v
```

Example

```text
origin  https://github.com/company/enterprise-devops-platform.git
origin  https://github.com/company/enterprise-devops-platform.git
```

Useful for verifying repository configuration.

---

# Enterprise Workflow Example

Task

Update Kubernetes Deployment.

Workflow

```text
git pull

↓

git checkout -b feature/update-k8s

↓

Modify Files

↓

git status

↓

git diff

↓

git add

↓

git commit

↓

git push

↓

Pull Request

↓

Merge
```

This is the standard workflow followed in our project.

---

# Git Commands Used in Our Project

Application

```bash
git status
git add
git commit
git push
```

Infrastructure

```bash
git checkout
git branch
git pull
git fetch
```

Release

```bash
git tag
git log
git show
```

Investigation

```bash
git diff
git log
git show
git status
```

---

# Real Production Scenario

Scenario

Production deployment failed.

Investigation begins.

Commands used

```bash
git log

git show

git diff

git branch

git status
```

Goal

Identify

- Last deployed commit
- Changed files
- Responsible Pull Request
- Release version

Git provides the deployment history.

---

# Scenario-Based Interview Questions

## Question 1

Which Git command do you use most frequently?

Expected Discussion

Typically

```bash
git status
```

because it shows the current repository state before every operation.

---

## Question 2

Why use

```bash
git fetch
```

instead of

```bash
git pull
```

Answer

Fetch downloads changes without modifying the current branch.

It allows review before merging.

---

## Question 3

When should

```bash
git show
```

be used?

Answer

To inspect

- Commit details
- Code changes
- Author
- Timestamp

Useful during production investigations.

---

# Architecture-Level Interview Questions

## Question

Why should DevOps Engineers know Git commands beyond commit and push?

Answer

Because DevOps manages

- CI/CD
- Infrastructure
- Production deployments
- Rollbacks
- Incident investigations

Understanding Git history and repository state is essential.

---

## Question

Why should commits remain small?

Answer

Small commits

- Simplify reviews
- Improve troubleshooting
- Make rollbacks safer
- Reduce merge conflicts

---

# Production Support Questions

Q.

A deployment introduced an unexpected configuration change.

Which Git commands help investigate?

Answer

```bash
git log

git show

git diff
```

These commands identify exactly what changed and when.

---

Q.

A developer accidentally modified the wrong branch.

How do you confirm?

Answer

Use

```bash
git branch

git status
```

Verify the active branch before making corrections.

---

# Common Mistakes

- Forgetting git pull
- Working on the wrong branch
- Skipping git status
- Large commits
- Poor commit messages
- Force pushing shared branches

---

# Enterprise Best Practices

- Run git status frequently.
- Review changes before staging.
- Pull before starting work.
- Commit one logical change at a time.
- Use descriptive commit messages.
- Delete merged branches.
- Review commit history regularly.

---

# Key Takeaways

Essential Daily Commands

```text
git clone
git status
git branch
git checkout
git switch
git add
git diff
git commit
git push
git pull
git fetch
git log
git show
git remote
```

These commands form the foundation of enterprise Git workflows.

---

# Marathi Quick Revision

रोज वापरले जाणारे Git commands

```text
git clone

git status

git branch

git checkout

git add

git commit

git push

git pull

git fetch

git log

git show
```

हे commands DevOps Engineer रोज वापरतो.

---

# Marathi Interview Memory Tip

Interview मध्ये जर विचारलं:

"Which Git commands do you use daily as a DevOps Engineer?"

असं सांगा:

"मी रोज git status, git pull, git checkout, git add, git commit, git push, git log, git diff आणि git show वापरतो. Production support दरम्यान commit history, deployment investigation आणि rollback verification साठी हे commands खूप महत्त्वाचे असतात."

