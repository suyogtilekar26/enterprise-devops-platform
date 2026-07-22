# GitHub Code Reviews

# Purpose

Understand the Code Review process in GitHub and why it is mandatory in enterprise software development.

Code Review is one of the most common GitHub interview topics for DevOps Engineers because it directly impacts production quality.

---

# Introduction

A Code Review is the process of examining code before it is merged into an important branch like:

- main
- develop
- release

Instead of allowing developers to merge their own code directly, another engineer reviews the changes to ensure quality, security, and maintainability.

GitHub performs Code Reviews through Pull Requests.

---

# Why Code Reviews are Required

Without reviews

- Bugs reach production
- Security issues go unnoticed
- Coding standards differ
- Poor architecture is introduced
- CI/CD failures increase

Code Reviews reduce production incidents.

---

# Enterprise Workflow

```
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

Reviewer Assigned

↓

Code Review

↓

Approve / Request Changes

↓

GitHub Actions

↓

Merge

↓

Production
```

---

# Review Process

Developer creates Pull Request

↓

Reviewer examines code

↓

Reviewer checks CI status

↓

Reviewer adds comments

↓

Developer updates code

↓

Reviewer approves

↓

Merge

---

# What Reviewers Check

## Code Quality

- Clean code
- Readability
- Naming conventions
- Proper documentation

---

## Functionality

- Feature works correctly
- Requirements met
- Edge cases handled

---

## Security

- No hardcoded passwords
- No API keys
- No secrets
- Proper authentication
- Input validation

---

## Performance

- Efficient queries
- No unnecessary loops
- Optimized logic

---

## Infrastructure

For DevOps repositories

Review

- Dockerfile
- Docker Compose
- Kubernetes YAML
- Helm Charts
- Terraform
- GitHub Actions
- Monitoring configuration

---

# Review Decisions

## Approve

Code is acceptable.

Merge allowed.

---

## Request Changes

Developer must fix issues.

Merge blocked.

---

## Comment

General feedback.

Does not block merge.

---

# Code Reviews in THIS Project

Every change to

```
Docker

Terraform

Helm

Kubernetes

GitHub Actions

Monitoring

Runbooks
```

must go through a Pull Request review before merging.

---

# Daily DevOps Activities

DevOps Engineers review

- Infrastructure changes
- CI/CD workflows
- Deployment pipelines
- Kubernetes manifests
- Dockerfiles
- Secrets management
- Security configurations

---

# Production Best Practices

Always

- Review every Pull Request
- Review infrastructure code
- Review security changes
- Verify CI passes
- Require at least two approvals for production repositories
- Review small Pull Requests

Never

- Approve without reading
- Merge failing builds
- Ignore security warnings
- Approve your own production changes

---

# Common Problems

Problem

Reviewer unavailable.

Solution

Assign another reviewer.

---

Problem

Too many comments.

Solution

Developer updates PR and requests re-review.

---

Problem

Approval removed.

Reason

New commits added after approval.

---

Problem

Merge blocked.

Reason

Required reviews missing.

---

# Troubleshooting

Verify

- Reviewer assigned
- Required approvals completed
- CI successful
- Review comments resolved
- Branch protection requirements satisfied

---

# Real Production Scenario

A developer modified the Kubernetes deployment manifest to increase application replicas.

During Code Review, the DevOps Engineer noticed that the resource limits had accidentally been removed.

Without the review, the deployment could have caused excessive resource consumption in production.

The reviewer requested changes, the developer corrected the manifest, CI passed, and the Pull Request was merged safely.

---

# Interview Questions

### What is a Code Review?

A Code Review is the process of examining code before it is merged into a shared branch to ensure quality, correctness, and security.

---

### Why are Code Reviews important?

They

- Improve code quality
- Reduce bugs
- Improve security
- Share knowledge
- Prevent production issues

---

### Who performs Code Reviews?

Typically

- Senior Developers
- Tech Leads
- DevOps Engineers
- Repository Maintainers

---

### Can GitHub enforce Code Reviews?

Yes.

Using Branch Protection Rules, GitHub can require one or more approvals before merging.

---

### What should a DevOps Engineer review?

- Dockerfiles
- Kubernetes YAML
- Terraform
- Helm Charts
- GitHub Actions
- Secrets
- Infrastructure changes
- Deployment configurations

---

# Marathi Quick Revision

Code Review म्हणजे

Merge करण्यापूर्वी दुसऱ्या Engineer ने Code तपासणे.

Review मध्ये पाहतात

- Bug
- Security
- Performance
- Standards
- CI Status

Approval मिळाल्यावरच Merge होते.

---

# Marathi Interview Memory Tips

Remember

```
Pull Request

↓

Review

↓

Comments

↓

Approval

↓

Merge
```

Interview Formula

```
Code Review

+

Branch Protection

+

GitHub Actions

=

Safe Production Deployment
```

---

# Key Takeaways

- Code Reviews are mandatory in enterprise development.
- They improve quality, security, and maintainability.
- GitHub integrates Code Reviews into Pull Requests.
- Branch Protection Rules can enforce mandatory approvals.
- DevOps Engineers review both application code and infrastructure code before deployment.

