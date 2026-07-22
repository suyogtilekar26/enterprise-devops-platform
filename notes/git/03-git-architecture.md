# Git Architecture

## Purpose

This document explains Git architecture from an Enterprise DevOps perspective.

Understanding Git architecture is important because many production issues, merge conflicts and recovery operations require knowledge of Git internals.

This is one of the most frequently asked topics in DevOps interviews for engineers with 5+ years of experience.

---

# What is Git Architecture?

Git is a Distributed Version Control System (DVCS).

Every developer has a complete copy of:

- Source Code
- Branches
- Tags
- Commit History
- Repository Metadata

Unlike centralized systems, Git does not rely on a single central server.

Every clone is a complete repository.

---

# High-Level Architecture

                    GitHub Repository
                           │
             ┌─────────────┼─────────────┐
             │             │             │
             ▼             ▼             ▼
      Developer A    Developer B   DevOps Engineer
             │             │             │
             └─────────────┼─────────────┘
                           │
                     Local Repository
                           │
                     Working Directory
                           │
                     Staging Area
                           │
                         Commit
                           │
                      Local History

Each developer owns a complete copy.

---

# Git Components

Git architecture consists of four major areas.

## 1. Working Directory

This is where files are edited.

Example

You modify:

auth-service/app.py

Nothing is tracked until Git is told to monitor the changes.

---

## 2. Staging Area (Index)

Changes move here using

```bash
git add
```

The staging area prepares changes before commit.

Think of it as a review area.

---

## 3. Local Repository

Created using

```bash
git commit
```

The commit is stored locally.

Nothing reaches GitHub yet.

---

## 4. Remote Repository

Example

GitHub

Changes are uploaded using

```bash
git push
```

Now every team member can access them.

---

# Complete Git Workflow

Developer edits code

↓

Working Directory

↓

git add

↓

Staging Area

↓

git commit

↓

Local Repository

↓

git push

↓

GitHub Repository

↓

GitHub Actions

↓

Docker Build

↓

Kind Cluster

↓

Future AWS EKS

This is exactly how our Enterprise DevOps Platform will work.

---

# Git Objects

Git stores four object types.

## Blob

Stores file contents.

Example

README.md

Dockerfile

app.py

---

## Tree

Represents directories.

Example

frontend/

auth-service/

docker/

---

## Commit

Stores

- Author
- Timestamp
- Parent Commit
- Commit Message
- Tree Reference

---

## Tag

Marks important commits.

Example

v1.0.0

v2.1.0

Production Release

---

# How Git Stores Data

Git does NOT store file differences.

Git stores snapshots.

Every commit points to a snapshot of the project.

Advantages

- Fast history
- Easy rollback
- Data integrity

---

# Git Data Flow

File Modified

↓

Working Directory

↓

git add

↓

Index

↓

git commit

↓

Commit Object

↓

Branch Pointer

↓

Remote Repository

---

# Branch Architecture

main

│

├──────── develop

│

├──────── feature/login

│

├──────── feature/dashboard

│

└──────── hotfix/auth

Every branch points to a different commit.

Branches are lightweight pointers.

---

# Enterprise Architecture

Developer

↓

Feature Branch

↓

Pull Request

↓

Code Review

↓

CI Pipeline

↓

Merge

↓

Release Branch

↓

Production

Git becomes the entry point of the entire SDLC.

---

# Git in Our Enterprise DevOps Platform

Git manages

Application

- React Frontend
- API Gateway
- Auth Service
- Dashboard Service

Infrastructure

- Dockerfiles
- Kubernetes
- Helm
- Terraform

Automation

- GitHub Actions

Documentation

- Notes
- Runbooks
- Incidents

Everything begins from Git.

---

# Real Production Scenario

Scenario

A production deployment suddenly fails.

Investigation starts from Git.

DevOps Engineer checks

- Last Commit
- Pull Request
- Merge Commit
- Release Tag
- GitHub Actions Workflow

Within minutes the problematic commit is identified.

Without Git history, investigation becomes much harder.

---

# Scenario-Based Interview Questions

## Question 1

A developer says

"My code disappeared."

How would you investigate?

Expected Discussion

- Check current branch
- Review commit history
- Inspect reflog
- Verify branch pointers
- Check remote repository
- Recover if necessary

---

## Question 2

A developer committed sensitive data.

What happens?

Expected Discussion

- Secret exists forever in history
- Remove from repository
- Rotate credentials
- Rewrite history only if approved
- Enable secret scanning

---

# Architecture-Level Interview Questions

## Question

Why are Git branches considered lightweight?

Answer

Branches are simply pointers to commits.

Git does not duplicate the entire repository.

Creating a branch is therefore extremely fast.

---

## Question

Why is Git called Distributed?

Answer

Every clone contains

- Complete history
- Branches
- Tags
- Objects

Developers can work without network connectivity.

Synchronization happens later.

---

## Question

Why are commits immutable?

Answer

Each commit is identified by a SHA hash.

Changing the commit changes its hash.

This guarantees repository integrity.

---

# Production Support Questions

Q.

A deployment pipeline used the wrong code version.

How do you investigate?

Answer

Verify

- Commit SHA
- Release Tag
- Branch
- Merge History
- CI Pipeline
- Deployment Manifest

Never assume the latest commit was deployed.

---

# Common Mistakes

- Confusing Working Directory with Staging Area
- Forgetting git add
- Force pushing shared branches
- Assuming GitHub stores the only copy
- Working directly on main

---

# Best Practices

- Commit frequently
- Use descriptive messages
- Protect main branch
- Review Pull Requests
- Tag production releases
- Never commit secrets
- Understand Git internals

---

# Key Takeaways

Git Architecture consists of

Working Directory

↓

Staging Area

↓

Local Repository

↓

Remote Repository

Understanding this flow makes troubleshooting and production support much easier.

---

# Marathi Quick Revision

Git मध्ये ४ मुख्य भाग असतात.

1. Working Directory

इथे आपण code बदलतो.

↓

2. Staging Area

git add नंतर changes इथे येतात.

↓

3. Local Repository

git commit नंतर commit local मध्ये save होतो.

↓

4. Remote Repository

git push केल्यावर GitHub वर जातो.

हा flow समजला की Git मधील ७०% concepts सहज समजतात.

---

# Marathi Interview Memory Tip

Interview मध्ये जर विचारलं:

"Explain Git Architecture."

तर फक्त Working Directory सांगू नका.

असं सांगा:

"Git मध्ये Working Directory, Staging Area, Local Repository आणि Remote Repository असे चार मुख्य components आहेत. प्रत्येक developer कडे complete repository असते. आमच्या Enterprise DevOps Platform मध्ये Git हा source of truth आहे. GitHub Actions, Docker, Kind Kubernetes, Helm आणि पुढील AWS deployment सर्व Git commit पासून सुरू होतात."

हा उत्तर Senior DevOps Engineer level साठी योग्य आहे.

