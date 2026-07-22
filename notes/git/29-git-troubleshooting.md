# Git Troubleshooting

## Purpose

This document explains common Git issues encountered in enterprise environments and how DevOps Engineers investigate and resolve them.

Troubleshooting Git requires understanding

- Repository state
- Branch history
- Remote synchronization
- Merge conflicts
- Authentication
- CI/CD integration

A systematic approach minimizes downtime and prevents data loss.

---

# Introduction

Git problems generally fall into the following categories

- Authentication
- Merge Conflicts
- Push Failures
- Pull Failures
- Detached HEAD
- Repository Corruption
- Incorrect Commits
- Branch Issues
- Large Repository Problems
- CI/CD Failures

Understanding the root cause is more important than memorizing commands.

---

# Enterprise Troubleshooting Workflow

```text
Problem Reported

↓

Identify Error

↓

Collect Information

↓

Verify Repository State

↓

Identify Root Cause

↓

Apply Fix

↓

Validate Solution

↓

Document Resolution
```

Never apply random Git commands without understanding the current repository state.

---

# Investigation Checklist

Before making any changes, collect

- Current branch
- Git status
- Recent commits
- Remote configuration
- Error message
- Repository history

Useful commands

```bash
git status
```

```bash
git branch
```

```bash
git log --oneline --graph --decorate --all
```

```bash
git remote -v
```

---

# Common Problem 1

## Authentication Failed

Example

```text
remote: Permission denied
fatal: Authentication failed
```

Possible Causes

- Invalid Personal Access Token
- Expired Token
- Incorrect SSH Key
- Repository Permissions
- MFA Requirement

Investigation

```bash
git remote -v
```

Verify

- Remote URL
- Authentication method
- User permissions

Resolution

- Generate new PAT
- Verify SSH key
- Update credentials
- Confirm repository access

---

# Common Problem 2

## Merge Conflict

Example

```text
CONFLICT (content)
```

Cause

Two developers modified the same lines.

Investigation

```bash
git status
```

Resolution

Open conflicted files.

Resolve conflicts manually.

Then

```bash
git add .
```

```bash
git commit
```

---

# Common Problem 3

## Push Rejected

Example

```text
failed to push
```

Cause

Remote repository contains commits missing from local repository.

Investigation

```bash
git status
```

```bash
git log --oneline
```

Resolution

```bash
git pull --rebase
```

Resolve conflicts if necessary.

Push again.

---

# Common Problem 4

## Detached HEAD

Example

```text
HEAD detached
```

Cause

Repository checked out to a commit instead of a branch.

Investigation

```bash
git branch
```

Resolution

Return to a branch

```bash
git checkout main
```

Or create a new branch

```bash
git checkout -b recovery-branch
```

---

# Common Problem 5

## Wrong Commit

Investigation

```bash
git log --oneline
```

Possible Resolution

Undo last commit

```bash
git reset --soft HEAD~1
```

or

```bash
git revert <commit>
```

Choose the method based on repository policy.

---

# Common Problem 6

## Wrong Branch

Investigation

```bash
git branch
```

Move work

```bash
git checkout correct-branch
```

Cherry-pick commits if necessary.

---

# Common Problem 7

## Repository Behind Remote

Example

```text
Your branch is behind
```

Resolution

```bash
git pull
```

or

```bash
git pull --rebase
```

depending on team standards.

---

# Common Problem 8

## Repository Ahead of Remote

Example

```text
Your branch is ahead
```

Resolution

```bash
git push
```

---

# Common Problem 9

## Accidentally Deleted Branch

Investigation

```bash
git reflog
```

Recovery

Locate commit

```bash
git checkout -b recovered-branch <commit>
```

---

# Common Problem 10

## CI/CD Pipeline Failed

Possible Causes

- Build error
- Test failure
- Incorrect branch
- Invalid workflow
- Missing secrets
- Dependency issue

Investigation

Review

- GitHub Actions logs
- Recent commits
- Pipeline configuration
- Repository history

---

# Git Troubleshooting in Our Project

Future troubleshooting may involve

- GitHub Actions failures
- Docker build failures
- Helm deployment issues
- Kubernetes deployment problems
- Terraform errors
- Argo CD synchronization issues

Git investigation is always the first step.

---

# Daily DevOps Activities

DevOps Engineers frequently

- Investigate failed pushes
- Resolve merge conflicts
- Recover deleted branches
- Verify release tags
- Analyze commit history
- Support developers

Troubleshooting Git is a daily operational task.

---

# Production Best Practices

- Read the error completely.
- Verify repository status first.
- Never force push without approval.
- Avoid deleting history.
- Use Pull Requests.
- Protect production branches.
- Document recurring issues.

---

# Security Considerations

During troubleshooting

Never

- Disable security controls
- Share credentials
- Commit secrets
- Force push to protected branches
- Rewrite production history without approval

Troubleshooting should never compromise repository security.

---

# Real Production Scenario

Scenario

A production deployment failed because the Docker image was never built.

Investigation revealed

A developer pushed changes to the wrong branch.

GitHub Actions only monitored

```text
main
```

The deployment pipeline never started.

Resolution

The changes were merged into the correct branch.

Pipeline executed successfully.

---

# Scenario-Based Interview Questions

## Question 1

What is the first command you run during Git troubleshooting?

Answer

```bash
git status
```

It shows the current repository state.

---

## Question 2

How do you recover a deleted branch?

Answer

Use

```bash
git reflog
```

Locate the commit and recreate the branch.

---

## Question 3

Why should force push be avoided?

Answer

Force push can overwrite shared history and remove other developers' work.

---

# Architecture-Level Interview Questions

## Question

Why is Git history important during incident investigation?

Answer

Git history provides an auditable record of changes, helping identify when and how a problem was introduced.

---

## Question

Why should troubleshooting begin with repository inspection rather than corrective commands?

Answer

Understanding the current repository state prevents accidental data loss and avoids making the situation worse.

---

## Question

How does Git assist production incident response?

Answer

Git enables engineers to identify recent changes, compare versions, roll back safely, and trace deployment history.

---

# Production Support Questions

Q.

A deployment failed after yesterday's merge.

Where do you investigate first?

Answer

Review

- Recent commits
- Pull Request
- Git history
- CI/CD logs
- Release tag

---

Q.

A developer says their changes disappeared.

What should you check?

Answer

Verify

- Current branch
- Git reflog
- Commit history
- Recent reset or rebase operations

---

# Related Runbooks

Future runbooks

- Resolve Merge Conflict
- Recover Deleted Branch
- Recover Lost Commit
- Investigate Failed GitHub Actions
- Roll Back Release

---

# Common Incidents

- Authentication failure
- Merge conflict
- Push rejected
- Pull failure
- Detached HEAD
- Wrong branch
- Deleted branch
- Lost commit
- Failed pipeline
- Repository divergence

---

# Commands

Repository status

```bash
git status
```

Current branch

```bash
git branch
```

Commit history

```bash
git log --oneline --graph --decorate --all
```

Remote configuration

```bash
git remote -v
```

Recover history

```bash
git reflog
```

Pull latest

```bash
git pull
```

Push changes

```bash
git push
```

---

# Key Takeaways

Git troubleshooting should always follow a structured process.

Investigate before changing anything.

Understand

- Repository state
- Commit history
- Branch structure
- Remote synchronization
- CI/CD status

A disciplined troubleshooting approach minimizes risk and ensures reliable recovery.

---

# Marathi Quick Revision

Git troubleshooting करताना प्रथम

```bash
git status
```

नंतर

- branch
- log
- remote
- reflog

हे तपासा.

Error समजून घ्या.

Random commands चालवू नका.

---

# Marathi Interview Memory Tip

Interview मध्ये जर विचारलं:

"Git issue troubleshoot कसं करता?"

असं सांगा:

"मी प्रथम repository ची current state `git status` ने तपासतो. त्यानंतर branch, commit history, remote configuration आणि error message तपासतो. Root cause समजल्यानंतरच योग्य command वापरतो. Enterprise मध्ये investigation आधी आणि fix नंतर हा approach सर्वात सुरक्षित मानला जातो."

