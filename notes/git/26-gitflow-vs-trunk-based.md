# GitFlow vs Trunk-Based Development

## Purpose

This document explains GitFlow and Trunk-Based Development from an Enterprise DevOps perspective.

Both are Git branching strategies used to manage software development.

Choosing the correct strategy affects

- Release frequency
- Collaboration
- CI/CD
- Deployment speed
- Production stability

Enterprise organizations select a branching model based on business requirements and deployment practices.

---

# Introduction

A branching strategy defines

- How developers create branches
- How code is reviewed
- How releases are prepared
- How production deployments occur

Two of the most common strategies are

- GitFlow
- Trunk-Based Development

---

# What is GitFlow?

GitFlow is a structured branching model.

It introduces dedicated branches for

- Main
- Develop
- Feature
- Release
- Hotfix

This model is designed for controlled release cycles.

---

# GitFlow Architecture

```text
                     main
                       │
           ┌───────────┴───────────┐
           │                       │
       Release                Hotfix
           │                       │
           └───────────┬───────────┘
                       │
                    develop
                 ┌─────┴─────┐
                 │           │
          feature/A    feature/B
```

Development occurs on feature branches.

Production deployments come from the main branch.

---

# GitFlow Workflow

Developer

↓

Feature Branch

↓

Develop Branch

↓

Release Branch

↓

Testing

↓

Main

↓

Production

↓

Tag Release

This workflow emphasizes release control.

---

# Advantages of GitFlow

- Clear release process
- Stable production branch
- Structured development
- Easy hotfix management
- Suitable for scheduled releases
- Good auditability

---

# Disadvantages of GitFlow

- Many branches
- Complex workflow
- Frequent merges
- Longer release cycles
- Slower deployments

---

# What is Trunk-Based Development?

Trunk-Based Development uses a single primary branch.

Developers create short-lived feature branches or commit directly to the trunk depending on organizational policy.

Changes are integrated frequently.

---

# Trunk-Based Architecture

```text
main

│

├── Small Feature

├── Bug Fix

├── Improvement

├── Documentation

└── Infrastructure
```

Integration happens continuously.

---

# Trunk-Based Workflow

Developer

↓

Short Feature Branch

↓

Pull Request

↓

Main

↓

CI/CD

↓

Deployment

Changes reach production quickly.

---

# Advantages of Trunk-Based Development

- Continuous integration
- Fast deployments
- Simple branch structure
- Reduced merge conflicts
- Frequent releases
- Better CI/CD integration

---

# Disadvantages of Trunk-Based Development

- Requires strong automated testing
- Smaller commits required
- Fast reviews necessary
- Poor discipline can impact production

---

# GitFlow vs Trunk-Based Comparison

| Feature | GitFlow | Trunk-Based |
|----------|----------|-------------|
| Branches | Many | Few |
| Release Cycle | Scheduled | Continuous |
| Complexity | High | Low |
| Merge Frequency | Moderate | High |
| CI/CD | Good | Excellent |
| Deployment Speed | Slower | Faster |
| Hotfix Support | Excellent | Good |
| Automation Requirement | Moderate | High |

---

# Which Strategy Fits Our Project?

Current Enterprise DevOps Platform

Current Phase

Learning Enterprise DevOps

Planned Strategy

```text
GitFlow
```

Reason

The repository includes

- Docker
- Kubernetes
- Helm
- Terraform
- GitHub Actions
- Argo CD
- Monitoring

A structured branching strategy makes learning enterprise release management easier.

Future

As CI/CD automation matures,

the workflow can gradually evolve toward Trunk-Based Development.

---

# Enterprise Workflow

Feature

↓

Feature Branch

↓

Pull Request

↓

Develop

↓

Release

↓

Testing

↓

Main

↓

Git Tag

↓

GitHub Actions

↓

Docker

↓

Kind

↓

Future AWS EKS

↓

Production

---

# Daily DevOps Activities

DevOps Engineers

- Review Pull Requests
- Manage release branches
- Create hotfix branches
- Deploy tagged releases
- Merge approved changes
- Monitor CI/CD pipelines

Branching strategy directly influences deployment workflows.

---

# Production Best Practices

- Choose one branching strategy.
- Document branching rules.
- Protect production branches.
- Require Pull Requests.
- Keep feature branches short-lived.
- Automate testing.
- Tag production releases.

---

# Security Considerations

Regardless of branching strategy

- Protect main branch.
- Require code reviews.
- Enforce CI validation.
- Restrict force pushes.
- Enable audit logging.

Security controls should be independent of the branching model.

---

# Troubleshooting

View branches

```bash
git branch
```

View all branches

```bash
git branch -a
```

Switch branches

```bash
git checkout develop
```

Merge branch

```bash
git merge feature/api
```

View graph

```bash
git log --oneline --graph --decorate --all
```

---

# Real Production Scenario

Scenario

A banking application releases software once every month.

Multiple development teams work simultaneously.

GitFlow provides

- Feature isolation
- Controlled releases
- Dedicated testing period
- Safe hotfix process

Another organization deploys hundreds of times per day.

They use

Trunk-Based Development

with

- Automated testing
- Continuous integration
- Continuous deployment

The branching strategy matches the deployment frequency.

---

# Scenario-Based Interview Questions

## Question 1

What is GitFlow?

Answer

GitFlow is a structured branching strategy using feature, develop, release, hotfix and main branches to manage software releases.

---

## Question 2

What is Trunk-Based Development?

Answer

Trunk-Based Development integrates small changes into the main branch frequently using short-lived branches and strong CI/CD automation.

---

## Question 3

Which strategy is better?

Answer

Neither is universally better.

GitFlow is well suited for structured release cycles.

Trunk-Based Development is ideal for continuous delivery with mature automation.

---

# Architecture-Level Interview Questions

## Question

Why do organizations move from GitFlow to Trunk-Based Development?

Answer

As automated testing and CI/CD mature, shorter integration cycles improve deployment speed while reducing merge complexity.

---

## Question

Why does Trunk-Based Development require strong CI/CD?

Answer

Because frequent integration demands rapid automated validation to prevent unstable code from reaching production.

---

## Question

Can GitFlow support CI/CD?

Answer

Yes.

CI/CD pipelines can validate feature, develop, release and main branches, although release cycles are generally longer than in Trunk-Based Development.

---

# Production Support Questions

Q.

Your organization performs quarterly production releases.

Which strategy is commonly preferred?

Answer

GitFlow is often preferred because it provides structured release and hotfix management.

---

Q.

A company deploys to production several times each day.

Which strategy is commonly recommended?

Answer

Trunk-Based Development, supported by comprehensive automated testing and CI/CD.

---

# Related Runbooks

Future runbooks

- Create Feature Branch
- Create Release Branch
- Create Hotfix Branch
- Release Management Workflow
- Production Deployment Approval

---

# Common Incidents

- Long-lived feature branches
- Merge conflicts
- Incorrect release branch
- Direct commits to main
- Delayed integration
- Unreviewed production changes

---

# Commands

Create feature branch

```bash
git checkout -b feature/new-feature
```

Switch branch

```bash
git checkout develop
```

Merge feature

```bash
git merge feature/new-feature
```

View branches

```bash
git branch -a
```

View commit graph

```bash
git log --oneline --graph --decorate --all
```

---

# Key Takeaways

GitFlow

- Structured branching
- Scheduled releases
- Dedicated release and hotfix branches

Trunk-Based Development

- Continuous integration
- Fast deployments
- Simple branching
- Strong CI/CD automation

For the Enterprise DevOps Platform, GitFlow is the preferred learning strategy because it clearly demonstrates enterprise release management. As the platform evolves toward fully automated deployments, Trunk-Based Development concepts will become increasingly relevant.

---

# Marathi Quick Revision

GitFlow

- Feature Branch
- Develop
- Release
- Main
- Hotfix

मोठ्या enterprise release साठी योग्य.

Trunk-Based Development

- Short-lived branches
- Frequent merge
- Continuous Deployment

CI/CD mature असेल तर हा approach उत्तम.

---

# Marathi Interview Memory Tip

Interview मध्ये जर विचारलं:

"GitFlow आणि Trunk-Based Development मध्ये काय फरक आहे?"

असं सांगा:

"GitFlow मध्ये feature, develop, release आणि hotfix branches वापरून structured release process ठेवला जातो. Trunk-Based Development मध्ये short-lived branches वापरून changes सतत main branch मध्ये integrate केले जातात. GitFlow scheduled enterprise releases साठी योग्य आहे, तर Trunk-Based Development continuous delivery आणि mature CI/CD environments साठी सर्वोत्तम मानला जातो."

