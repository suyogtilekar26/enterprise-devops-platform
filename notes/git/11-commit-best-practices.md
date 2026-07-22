# Commit Best Practices

## Purpose

This document explains enterprise commit best practices used in the Enterprise DevOps Platform.

A commit is much more than saving changes.

A well-written commit becomes part of the project's permanent history and helps developers, DevOps engineers, SREs, auditors, and production support teams understand why a change was made.

Poor commits increase troubleshooting time, while good commits improve collaboration and deployment confidence.

---

# Introduction

Every Git commit should answer three questions.

- What changed?
- Why did it change?
- Is this change independent?

If these questions cannot be answered from the commit history, the commit quality should be improved.

---

# Why Commit Quality Matters

Good commits make it easier to

- Review code
- Investigate incidents
- Roll back changes
- Understand project history
- Audit production deployments
- Maintain large repositories

Large organizations may keep Git history for many years.

Today's commit may be investigated years later.

---

# Enterprise Usage

Commit history is used by

- Developers
- DevOps Engineers
- Platform Engineers
- SRE Teams
- Security Teams
- Auditors

Every production deployment references one or more commits.

Good commits reduce operational risk.

---

# Characteristics of a Good Commit

A good commit should be

- Small
- Atomic
- Logical
- Well described
- Easy to review
- Easy to revert

Each commit should represent one logical change.

---

# Atomic Commits

An atomic commit contains one purpose.

Good Example

```text
Add Dockerfile for API Gateway
```

Bad Example

```text
Update Dockerfile
Fix Login
Modify Terraform
Update README
Change Kubernetes Deployment
```

Five unrelated changes should not exist in one commit.

---

# Commit Message Structure

Recommended format

```text
Short Summary

(Optional Detailed Description)
```

Example

```text
Add Dockerfile for API Gateway

Adds a production-ready Dockerfile using a multi-stage build.
Exposes port 8080 and includes Gunicorn as the application server.
```

The first line should clearly describe the change.

---

# Conventional Commits

Many organizations use Conventional Commits.

Examples

```text
feat: add JWT authentication

fix: correct login validation

docs: update deployment guide

refactor: simplify Docker build

test: add API unit tests

ci: update GitHub Actions workflow

chore: update dependencies
```

Benefits

- Consistent history
- Automatic release notes
- Easier automation
- Better readability

---

# Good Commit Examples

```text
Add Kubernetes deployment for Auth Service

Create Helm values for Dashboard

Update Terraform networking module

Add Prometheus scrape configuration

Fix JWT token validation

Improve Docker image size
```

Each message clearly explains the change.

---

# Poor Commit Examples

```text
update

changes

test

new

fix

temp

work

misc
```

These messages provide almost no useful information.

Avoid them.

---

# Small vs Large Commits

Small Commit

- Easy review
- Easy rollback
- Easier testing
- Easier troubleshooting

Large Commit

- Hard review
- Hard rollback
- High deployment risk
- Difficult debugging

Enterprise teams prefer multiple small commits.

---

# Commit Frequency

Commit frequently.

Recommended

- After completing one logical task
- Before changing to another task
- Before large refactoring
- Before Pull Request

Avoid

Working for several days without committing.

---

# What Should Be Committed?

Commit

- Source Code
- Infrastructure Code
- Dockerfiles
- Kubernetes Manifests
- Helm Charts
- Terraform
- Documentation
- CI/CD Configuration
- Runbooks

Everything required to reproduce the project.

---

# What Should NOT Be Committed?

Do NOT commit

- Passwords
- API Keys
- Tokens
- Certificates
- Private Keys
- .env files
- Build Artifacts
- Logs
- Cache Files
- Temporary Files

Sensitive data belongs in secure secret management systems.

---

# Commit Best Practices in Our Project

Good Examples

```text
Add Dockerfile for API Gateway

Create Helm chart for Dashboard Service

Configure Kind ingress controller

Add Prometheus monitoring

Update Terraform VPC module

Document deployment architecture
```

Each commit focuses on one logical change.

---

# Daily DevOps Activities

A DevOps Engineer should

- Review staged files
- Verify changes
- Write meaningful commit messages
- Avoid unrelated changes
- Push frequently
- Keep Pull Requests manageable

Commit quality directly affects deployment quality.

---

# Production Best Practices

- One logical change per commit
- Descriptive messages
- Small commits
- Review before commit
- Never commit secrets
- Link commits to work items if applicable
- Tag production releases

---

# Security Considerations

Before committing

Verify

```bash
git diff --cached
```

Ensure

- No passwords
- No tokens
- No API keys
- No cloud credentials
- No certificates

Review every staged file before committing.

---

# Troubleshooting

Useful Commands

Review staged changes

```bash
git diff --cached
```

View recent commits

```bash
git log --oneline
```

Inspect commit

```bash
git show <commit-sha>
```

Compare commits

```bash
git diff commit1 commit2
```

---

# Real Production Scenario

Scenario

A production deployment fails.

Recent commit message

```text
update
```

Problem

Nobody knows

- What changed
- Why it changed
- Which service changed

Investigation takes hours.

Better Commit

```text
Update Kubernetes readiness probe for Auth Service
```

Root cause becomes immediately obvious.

---

# Scenario-Based Interview Questions

## Question 1

Why should commits be small?

Answer

Small commits

- Simplify reviews
- Reduce conflicts
- Improve rollback
- Improve troubleshooting

---

## Question 2

Why are meaningful commit messages important?

Answer

They improve

- Collaboration
- Incident response
- Auditing
- Release management
- Long-term maintenance

---

## Question 3

Would you combine Docker, Terraform and Kubernetes changes into one commit?

Answer

Normally no.

Each logical change should have its own commit.

---

# Architecture-Level Interview Questions

## Question

Why are atomic commits important in enterprise environments?

Answer

Because they isolate changes.

This improves

- Review
- Testing
- Rollback
- Incident investigation

---

## Question

Should every commit build successfully?

Answer

Ideally yes.

This helps maintain repository quality and supports continuous integration.

---

## Question

Why do many companies adopt Conventional Commits?

Answer

They standardize commit history and support automation such as release notes, versioning and CI/CD workflows.

---

# Production Support Questions

Q.

A production issue started after today's deployment.

How do meaningful commits help?

Answer

They allow engineers to quickly identify the relevant change without inspecting unrelated commits.

---

Q.

A rollback is required.

Why are atomic commits useful?

Answer

Because reverting one logical change is safer than reverting a large mixed commit.

---

# Related Runbooks

Future runbooks

- Review Pull Request
- Recover from Bad Commit
- Revert Production Change
- Emergency Hotfix Deployment

---

# Common Incidents

- Large mixed commits
- Poor commit messages
- Accidental secret commit
- Missing infrastructure changes
- Incomplete commits
- Difficult rollbacks

---

# Commands

Review status

```bash
git status
```

Review staged changes

```bash
git diff --cached
```

Create commit

```bash
git commit -m "Add Helm chart for Auth Service"
```

View history

```bash
git log --oneline
```

Inspect commit

```bash
git show <commit-sha>
```

---

# Key Takeaways

Good commits are

- Small
- Atomic
- Descriptive
- Reviewable
- Reversible

Commit quality improves collaboration, deployment safety, production support and long-term maintainability.

---

# Marathi Quick Revision

चांगला commit म्हणजे

- एकच logical change
- स्पष्ट message
- छोटा commit
- review करायला सोपा
- rollback करायला सोपा

वाईट commit messages

```text
update
fix
changes
test
```

टाळावेत.

---

# Marathi Interview Memory Tip

Interview मध्ये जर विचारलं:

"What are Git commit best practices?"

असं सांगा:

"मी प्रत्येक commit मध्ये एकच logical change ठेवतो. Descriptive commit messages वापरतो, secrets commit करत नाही, commit करण्यापूर्वी staged changes review करतो आणि छोटे, atomic commits ठेवतो. यामुळे code review, rollback, production troubleshooting आणि auditing खूप सोपे होतात."

