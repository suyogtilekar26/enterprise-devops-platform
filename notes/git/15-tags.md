# Git Tags

## Purpose

This document explains Git Tags from an Enterprise DevOps perspective.

Git Tags are used to mark important points in repository history, most commonly production releases.

In enterprise environments, tags provide a reliable way to identify exactly which version of the application or infrastructure was deployed.

---

# Introduction

A Git Tag is a permanent reference to a specific commit.

Unlike branches,

tags do not move.

Once created,

a tag always points to the same commit unless it is explicitly deleted and recreated.

Tags are commonly used for

- Production Releases
- Milestones
- Rollbacks
- Auditing
- Version Tracking

---

# What are Git Tags?

A tag is a human-readable label assigned to a commit.

Instead of remembering

```text
7e4f6c91d43eab1d...
```

we can simply use

```text
v1.0.0
```

This makes deployments and investigations much easier.

---

# Why Tags are Important

Tags provide

- Release identification
- Deployment traceability
- Easy rollback
- Version history
- Compliance support
- Audit records

Production deployments should always reference a tag instead of an arbitrary commit.

---

# Types of Git Tags

Git supports two types of tags.

---

## Lightweight Tag

A lightweight tag is simply a pointer to a commit.

Example

```bash
git tag v1.0.0
```

Characteristics

- Fast
- No metadata
- No tag message

Used mainly for local or temporary references.

---

## Annotated Tag

Annotated tags contain metadata.

Example

```bash
git tag -a v1.0.0 -m "Production Release v1.0.0"
```

Stores

- Tag Name
- Creator
- Date
- Message
- Commit Reference

Enterprise environments prefer annotated tags.

---

# Semantic Versioning

Enterprise releases generally follow

```text
MAJOR.MINOR.PATCH
```

Example

```text
1.0.0
```

Meaning

Major

Breaking changes

Minor

New functionality

Patch

Bug fixes

Examples

```text
v1.0.0

v1.0.1

v1.1.0

v2.0.0
```

---

# Enterprise Usage

Tags identify

- Production Releases
- Stable Builds
- Rollback Versions
- Audit Versions
- Release Candidates

Many CI/CD pipelines trigger deployments directly from Git Tags.

---

# Tags in Our Enterprise DevOps Platform

Future production releases

```text
v1.0.0

v1.1.0

v1.2.0

v2.0.0
```

Each tag represents

- Application Version
- Docker Image Version
- Kubernetes Deployment
- Helm Chart Version
- Release Documentation

One version across the entire platform.

---

# Release Workflow with Tags

Developer

↓

Feature Branch

↓

Develop

↓

Release Branch

↓

Testing

↓

Approval

↓

Merge into Main

↓

Create Tag

↓

GitHub Actions

↓

Docker Build

↓

Container Registry

↓

Kind

↓

Future AWS EKS

↓

Production

Tags become the deployment trigger.

---

# Creating a Tag

Annotated tag

```bash
git tag -a v1.0.0 -m "Production Release v1.0.0"
```

---

# View Tags

```bash
git tag
```

Example

```text
v1.0.0

v1.0.1

v1.1.0
```

---

# View Tag Details

```bash
git show v1.0.0
```

Displays

- Tag metadata
- Commit
- Author
- Message

---

# Push Tag

Push one tag

```bash
git push origin v1.0.0
```

Push all tags

```bash
git push origin --tags
```

Remote repositories do not receive tags automatically.

---

# Delete Tag

Delete local

```bash
git tag -d v1.0.0
```

Delete remote

```bash
git push origin --delete v1.0.0
```

Deleting production tags should follow organizational approval.

---

# Daily DevOps Activities

DevOps Engineers use tags to

- Verify deployments
- Compare releases
- Trigger CI/CD
- Roll back production
- Investigate incidents
- Audit deployments

Tags simplify release management.

---

# Production Best Practices

- Use annotated tags.
- Follow Semantic Versioning.
- Tag every production release.
- Never deploy unknown commits.
- Protect release tags.
- Document every tagged release.

---

# Security Considerations

Tags should only be created by authorized engineers.

Production tags should

- Follow approval processes
- Match reviewed commits
- Correspond to verified artifacts

Incorrect tagging can deploy the wrong application version.

---

# Troubleshooting

List tags

```bash
git tag
```

Show tag

```bash
git show v1.0.0
```

Verify commit

```bash
git rev-list -n 1 v1.0.0
```

Compare releases

```bash
git diff v1.0.0 v1.1.0
```

These commands help during release investigations.

---

# Real Production Scenario

Scenario

Production deployment begins.

Operations asks

"Exactly which version is running?"

Instead of checking random commits,

DevOps verifies

```text
v2.3.1
```

Using

```bash
git show v2.3.1
```

The exact deployed commit is identified immediately.

---

# Scenario-Based Interview Questions

## Question 1

Why should production deployments use Git Tags?

Answer

Tags provide a permanent, human-readable reference to a specific commit, improving traceability and rollback capability.

---

## Question 2

What is the difference between a lightweight tag and an annotated tag?

Answer

Lightweight tags are simple commit references.

Annotated tags include metadata such as author, creation date and release message.

---

## Question 3

Should production deployments use commit SHAs or tags?

Answer

Commit SHAs uniquely identify commits, but tags are easier to understand, communicate and manage.

Many organizations deploy tagged releases while still recording the underlying commit SHA.

---

# Architecture-Level Interview Questions

## Question

Why are Git Tags preferred over branch names for production deployments?

Answer

Branches continue moving as new commits are added.

Tags remain fixed, ensuring deployments always reference the exact approved version.

---

## Question

How do Git Tags support GitOps?

Answer

GitOps tools can synchronize infrastructure to a tagged release, ensuring consistent and repeatable deployments.

---

## Question

Why should release tags be protected?

Answer

Changing or deleting production tags can break auditing, rollback procedures and deployment traceability.

---

# Production Support Questions

Q.

Operations reports that production is running version

```text
v2.1.0
```

How do you verify?

Answer

Use

```bash
git show v2.1.0
```

Compare the tagged commit with the deployed artifact.

---

Q.

A rollback is required.

How do Git Tags help?

Answer

Deploy the previously validated production tag instead of searching for individual commits.

---

# Related Runbooks

Future runbooks

- Create Production Release
- Rollback Using Git Tag
- Verify Deployment Version
- Emergency Production Rollback

---

# Common Incidents

- Missing release tags
- Wrong tag deployed
- Deleted production tag
- Incorrect Semantic Version
- Tag created from wrong branch
- Untagged production deployment

---

# Commands

Create annotated tag

```bash
git tag -a v1.0.0 -m "Production Release v1.0.0"
```

List tags

```bash
git tag
```

Show tag

```bash
git show v1.0.0
```

Push one tag

```bash
git push origin v1.0.0
```

Push all tags

```bash
git push origin --tags
```

Delete local tag

```bash
git tag -d v1.0.0
```

Delete remote tag

```bash
git push origin --delete v1.0.0
```

Compare tagged releases

```bash
git diff v1.0.0 v1.1.0
```

---

# Key Takeaways

Git Tags provide

- Stable release identification
- Deployment traceability
- Easy rollback
- Version management
- CI/CD integration
- Audit support

Every production deployment in the Enterprise DevOps Platform will be associated with a Git Tag.

---

# Marathi Quick Revision

Git Tag म्हणजे specific commit ला permanent नाव देणे.

उदाहरण

```text
v1.0.0
```

Tags वापरतो

- Production Release
- Rollback
- Version Tracking
- CI/CD
- Auditing

Production मध्ये नेहमी tagged release deploy करावी.

---

# Marathi Interview Memory Tip

Interview मध्ये जर विचारलं:

"Why do you use Git Tags in production?"

असं सांगा:

"आमच्या Enterprise DevOps Platform मध्ये प्रत्येक production release ला annotated Git Tag दिला जातो. Tag मुळे exact deployed version, rollback, auditing आणि CI/CD traceability सोपी होते. आम्ही Semantic Versioning वापरतो आणि production deployments नेहमी tagged releases वरूनच करतो."

