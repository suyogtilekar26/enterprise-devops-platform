# Lab 06 - GitHub Collaboration Workflow

## Objective

In this lab, you will simulate how multiple developers collaborate on an Enterprise GitHub repository using feature branches, pull requests, code reviews, and merges.

Although this lab uses local Git commands, it follows the same workflow used in enterprise environments with GitHub, GitLab, or Bitbucket.

---

# Lab Scenario

You are part of the DevOps team maintaining the Enterprise DevOps Platform.

Developer A has been assigned a new feature.

Developer B reviews the code.

After approval, the feature is merged into the main branch.

---

# Prerequisites

- Labs 01–05 completed
- Repository clean

Verify

```bash
git status
```

Expected

```text
nothing to commit, working tree clean
```

---

# Enterprise Collaboration Workflow

```text
Developer

↓

Create Feature Branch

↓

Develop Feature

↓

Commit Changes

↓

Push Branch

↓

Pull Request

↓

Code Review

↓

Approval

↓

Merge

↓

Delete Branch
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

# Step 2 - Create Feature Branch

```bash
git checkout -b feature/github-workflow
```

---

# Step 3 - Create Sample File

```bash
cat > CONTRIBUTING.md <<EOF2
# Contribution Guide

Follow Enterprise Git Workflow.

- Create Feature Branch
- Commit Changes
- Open Pull Request
- Review Code
- Merge After Approval
EOF2
```

---

# Step 4 - Check Repository Status

```bash
git status
```

---

# Step 5 - Stage Changes

```bash
git add CONTRIBUTING.md
```

---

# Step 6 - Commit Changes

```bash
git commit -m "Add contribution guidelines"
```

---

# Step 7 - Review Commit

```bash
git log --oneline --graph
```

---

# Step 8 - Simulate Pull Request

In GitHub this would be

```text
Feature Branch

↓

Open Pull Request

↓

Automatic CI Checks

↓

Code Review

↓

Approval
```

Since this is a local lab, simply verify the branch.

```bash
git branch
```

Expected

```text
* feature/github-workflow
main
```

---

# Step 9 - Switch to Main

```bash
git checkout main
```

---

# Step 10 - Merge Feature Branch

```bash
git merge feature/github-workflow
```

Expected

```text
Fast-forward
```

or

```text
Merge made by the 'ort' strategy.
```

---

# Step 11 - Verify Merge

```bash
git log --oneline --graph
```

---

# Step 12 - Delete Feature Branch

```bash
git branch -d feature/github-workflow
```

---

# Step 13 - Verify Repository

```bash
git status
```

Expected

```text
nothing to commit, working tree clean
```

---

# Enterprise Pull Request Checklist

Before approving a Pull Request, verify:

- Code builds successfully
- CI pipeline passes
- Tests pass
- No merge conflicts
- Documentation updated
- Security review completed
- Code review approved

---

# Branch Protection Rules

Enterprise repositories typically enforce:

- No direct commits to main
- Mandatory Pull Requests
- Required code reviews
- Passing CI checks
- Signed commits (optional)
- Protected release branches

---

# Enterprise Team Workflow

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

CI Pipeline

↓

Review

↓

Approval

↓

Merge

↓

Delete Branch
```

---

# Verification Checklist

- Feature branch created
- Changes committed
- Merge completed
- Branch deleted
- Repository clean

---

# Troubleshooting

## Merge conflict

```bash
git status
```

Resolve conflicts manually.

---

## Wrong branch

```bash
git branch
```

Switch

```bash
git checkout main
```

---

## Commit missing

```bash
git log --oneline
```

---

# Production Best Practices

- Never commit directly to main.
- Create one feature per branch.
- Keep commits small and meaningful.
- Require Pull Request reviews.
- Enable CI before merging.
- Delete merged branches.
- Protect production branches.

---

# Real Production Scenario

A developer implements a new authentication feature.

Instead of committing directly to the production branch, they create a feature branch, commit their changes, push the branch to GitHub, and open a Pull Request.

The CI pipeline builds the application, executes tests, and performs security scans. After peer review and approval, the Pull Request is merged into the protected main branch, and the feature branch is deleted.

---

# Lab Completion Criteria

You have successfully completed this lab if:

- A feature branch was created.
- Changes were committed.
- The branch was merged into main.
- The feature branch was deleted.
- You understand the enterprise GitHub collaboration workflow.

