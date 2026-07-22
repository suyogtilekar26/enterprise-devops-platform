# GitHub Branch Protection Rules

# Purpose

Understand how Branch Protection Rules secure important branches and prevent accidental or unauthorized changes in an enterprise GitHub repository.

Branch Protection is one of the most frequently asked GitHub interview topics for DevOps Engineers.

---

# Introduction

A Branch Protection Rule is a GitHub feature that protects critical branches such as:

- main
- master
- develop
- release/*

It prevents developers from making direct or unsafe changes.

Instead of pushing directly, developers must follow the approved development workflow.

---

# Why Branch Protection is Required

Without protection, developers can

- Push directly to production
- Force push
- Delete important branches
- Merge unreviewed code
- Bypass CI/CD
- Introduce production bugs

Branch Protection eliminates these risks.

---

# Enterprise Workflow

```
Developer

↓

Feature Branch

↓

Push Feature Branch

↓

Pull Request

↓

Code Review

↓

GitHub Actions

↓

Approval

↓

Merge

↓

Production
```

Direct pushes to **main** are blocked.

---

# Common Branch Protection Rules

## Require Pull Requests

Developers cannot merge directly.

All changes must go through a Pull Request.

---

## Require Approvals

Example

Minimum approvals required

```
2
```

At least two reviewers must approve before merging.

---

## Require Status Checks

Examples

- Build Successful
- Unit Tests Passed
- Security Scan Passed

If CI fails

Merge is blocked.

---

## Require Conversation Resolution

All review comments must be resolved before merging.

---

## Require Linear History

Prevents merge commits.

Only allows

- Rebase
- Squash

Keeps history clean.

---

## Restrict Who Can Push

Only selected users or teams can push.

Example

```
Release Team

DevOps Team
```

---

## Prevent Force Push

Force pushes are blocked.

Example

```
git push --force
```

Rejected.

---

## Prevent Branch Deletion

Protected branches cannot be deleted accidentally.

---

# Branch Protection in THIS Project

Protected branches

```
main

develop

release/*
```

Workflow

```
Developer

↓

Feature Branch

↓

Pull Request

↓

Code Review

↓

GitHub Actions

↓

Approval

↓

Merge into main
```

No direct pushes are allowed.

---

# Daily DevOps Activities

DevOps Engineers

- Create protection rules
- Review branch settings
- Configure required reviewers
- Configure CI checks
- Restrict branch access
- Investigate blocked merges
- Audit protection policies

---

# Production Best Practices

Always

- Protect main branch
- Protect release branches
- Require Pull Requests
- Require approvals
- Require successful CI
- Disable force pushes
- Disable branch deletion
- Restrict administrator bypass where appropriate

---

# Security Benefits

Branch Protection

- Prevents accidental deployments
- Prevents unauthorized code
- Protects production history
- Enforces peer review
- Enforces CI/CD validation
- Improves compliance
- Reduces production incidents

---

# Example Enterprise Configuration

Protected Branch

```
main
```

Settings

```
✓ Require Pull Request

✓ Require 2 Approvals

✓ Require Successful CI

✓ Dismiss Stale Reviews

✓ Resolve Conversations

✓ Block Force Push

✓ Block Branch Deletion

✓ Restrict Push Access
```

---

# Common Problems

Problem

Developer cannot push.

Reason

Branch is protected.

---

Problem

Merge button disabled.

Reason

CI pipeline failed.

---

Problem

Cannot delete branch.

Reason

Branch protection enabled.

---

Problem

Pull Request waiting.

Reason

Required approvals missing.

---

# Troubleshooting

Verify

- Pull Request exists
- Required approvals received
- GitHub Actions successful
- No unresolved conversations
- Branch up to date
- User has required permissions

---

# Real Production Scenario

A developer attempted to push directly to the **main** branch after fixing a production bug.

GitHub rejected the push because the branch was protected.

The developer created a hotfix branch, opened a Pull Request, received approval from the senior engineer, GitHub Actions completed successfully, and the Pull Request was merged safely.

Branch Protection prevented an unreviewed production change.

---

# Interview Questions

### What is Branch Protection?

Branch Protection is a GitHub feature that prevents unsafe changes to important branches by enforcing rules such as Pull Requests, approvals, and CI checks.

---

### Why do companies protect the main branch?

To prevent

- Direct pushes
- Force pushes
- Unreviewed code
- Failed builds
- Accidental deletion

---

### Can developers push directly to a protected branch?

Normally no.

They must create a Pull Request unless explicitly granted permission.

---

### Why require Pull Request approvals?

To ensure peer review and reduce production defects.

---

### Why require status checks?

To ensure builds, tests, and security scans pass before code is merged.

---

### Can force push be blocked?

Yes.

Branch Protection can completely disable force pushes.

---

### Which branches should be protected?

Typically

- main
- develop
- release/*
- production branches

---

# Marathi Quick Revision

Branch Protection म्हणजे Important Branch सुरक्षित ठेवण्याची GitHub ची सुविधा.

यामुळे

- Direct Push बंद
- Force Push बंद
- Delete बंद
- Pull Request आवश्यक
- Approval आवश्यक
- CI Pass आवश्यक

---

# Marathi Interview Memory Tips

Remember

```
Protected Branch

↓

Pull Request

↓

Review

↓

CI

↓

Merge
```

Interview Formula

```
Branch Protection

+

Pull Request

+

Approval

+

GitHub Actions

=

Safe Production Deployment
```

---

# Key Takeaways

- Branch Protection secures critical branches.
- Direct pushes to production branches should be disabled.
- Pull Requests, approvals, and successful CI should be mandatory.
- Force pushes and branch deletion should be blocked.
- Branch Protection is a core enterprise GitHub security practice and a favorite DevOps interview topic.

