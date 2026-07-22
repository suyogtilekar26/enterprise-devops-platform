# GitHub Pull Requests (PR)

# Purpose

Understand how Pull Requests work, why they are essential in enterprise software development, and how they fit into the DevOps workflow.

Pull Requests are one of the most frequently asked GitHub interview topics.

---

# Introduction

A Pull Request (PR) is a request to merge changes from one branch into another.

It allows team members to

- Review code
- Discuss changes
- Run automated tests
- Approve or reject changes
- Merge safely

Without Pull Requests, developers could directly push unstable code into production branches.

---

# Enterprise Workflow

```
Feature Branch

↓

Commit Changes

↓

Push to GitHub

↓

Create Pull Request

↓

Code Review

↓

GitHub Actions

↓

Approval

↓

Merge

↓

Delete Feature Branch
```

---

# Why Pull Requests are Important

Pull Requests provide

- Code review
- Team collaboration
- Automated validation
- Audit history
- Safe merging
- Quality assurance

---

# Pull Request Components

A PR usually contains

- Title
- Description
- Source Branch
- Target Branch
- Changed Files
- Reviewers
- Comments
- CI/CD Status
- Merge Button

---

# Pull Request Lifecycle

```
Developer Creates Branch

↓

Developer Commits Code

↓

Developer Pushes Branch

↓

Pull Request Created

↓

Automated CI Runs

↓

Reviewers Review Code

↓

Changes Requested (Optional)

↓

Developer Updates PR

↓

Approvals Received

↓

Merge

↓

Branch Deleted
```

---

# Types of Merge

## Create Merge Commit

Maintains complete branch history.

```
Feature Branch

 \

  Merge Commit

 /

Main
```

---

## Squash Merge

Combines all commits into one.

Useful for keeping history clean.

---

## Rebase Merge

Replays commits onto the target branch.

Creates a linear commit history.

---

# Pull Requests in THIS Project

Example

```
main

↓

feature/docker-compose

↓

Pull Request

↓

GitHub Actions

↓

Review

↓

Merge
```

Every feature in this project should reach the **main** branch through a Pull Request.

---

# Daily DevOps Activities

DevOps Engineers

- Review Pull Requests
- Verify CI/CD status
- Resolve merge conflicts
- Enforce branch protection
- Monitor failed builds
- Approve infrastructure changes
- Audit production changes

---

# Production Best Practices

Always

- Create small Pull Requests
- Write meaningful descriptions
- Link related issues
- Require approvals
- Pass all CI checks
- Resolve review comments
- Delete merged branches

Never

- Merge failing builds
- Merge without review
- Merge directly into protected branches

---

# Common Pull Request Statuses

```
Open

Closed

Merged

Draft
```

---

# Common Problems

Problem

Merge button disabled.

Reason

CI pipeline failed.

---

Problem

Review required.

Reason

Approval missing.

---

Problem

Cannot merge.

Reason

Merge conflict.

---

Problem

Branch outdated.

Reason

Target branch changed.

---

# Troubleshooting

Verify

- CI passed
- Required approvals received
- No merge conflicts
- Branch updated with target branch
- Branch protection requirements satisfied

---

# Real Production Scenario

A developer completed a Kubernetes deployment update.

Instead of pushing directly to **main**, the developer created a Pull Request.

GitHub Actions automatically

- Validated YAML
- Built Docker images
- Executed tests

A senior DevOps engineer reviewed the infrastructure changes.

After approval, the Pull Request was merged and the deployment pipeline executed successfully.

---

# Interview Questions

### What is a Pull Request?

A Pull Request is a request to merge code from one branch into another after review and validation.

---

### Why are Pull Requests used?

They enable

- Code review
- Collaboration
- CI/CD validation
- Safe merging
- Audit history

---

### What happens before a Pull Request is merged?

Typically

- CI passes
- Code review completed
- Required approvals received
- Merge conflicts resolved

---

### Can a Pull Request fail?

Yes.

Common reasons

- Build failure
- Failed tests
- Merge conflicts
- Missing approvals
- Branch protection rules

---

### Who approves Pull Requests?

Usually

- Senior Developers
- Tech Leads
- DevOps Engineers
- Repository Maintainers

---

### What happens after merging?

Typically

- Feature branch deleted
- GitHub Actions triggered
- Deployment pipeline starts
- Release process continues

---

# Marathi Quick Revision

Pull Request म्हणजे

एका Branch मधील Code दुसऱ्या Branch मध्ये Merge करण्याची Request.

त्यामध्ये

- Review
- Approval
- CI
- Discussion
- Merge

होते.

---

# Marathi Interview Memory Tips

Remember

```
Feature Branch

↓

Pull Request

↓

Review

↓

CI

↓

Approval

↓

Merge

↓

Deployment
```

Interview Formula

```
Pull Request

+

Code Review

+

GitHub Actions

+

Branch Protection

=

Enterprise Development Workflow
```

---

# Key Takeaways

- Pull Requests are the standard method for merging code in enterprise environments.
- They enforce reviews, automated testing, and collaboration.
- Pull Requests improve code quality and reduce production risks.
- Most enterprise repositories require Pull Requests before merging into protected branches.
- Understanding the Pull Request lifecycle is essential for DevOps interviews.

