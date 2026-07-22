# Git Branching Strategy

## Purpose

This document explains the Git branching strategy used in the Enterprise DevOps Platform.

Branching strategy is one of the most important topics in enterprise software development.

A good branching strategy enables:

- Parallel development
- Stable releases
- Safe deployments
- Easy rollback
- Team collaboration
- CI/CD automation

---

# Why Branches Exist

Imagine ten developers working on the same project.

Without branches,

everyone modifies the same code simultaneously.

Result

- Broken builds
- Frequent conflicts
- Production instability

Branches isolate work until it is ready.

---

# Branching Strategy Used in Our Project

Repository

enterprise-devops-platform

Main Branches

```text
main
develop
```

Temporary Branches

```text
feature/*
bugfix/*
release/*
hotfix/*
```

---

# Branch Architecture

```text
                     main
                      ▲
                      │
                 release/v1.0
                      ▲
                      │
                   develop
          ┌───────────┼────────────┐
          │           │            │
feature/auth   feature/docker   feature/ui
          │           │            │
          └───────────┼────────────┘
                      │
                   develop
                      │
                  release/v1.0
                      │
                     main
```

Emergency Fix

```text
main
 │
 └──── hotfix/login
          │
          ▼
        main
```

---

# Main Branch

Purpose

Production-ready code only.

Rules

- Never commit directly.
- Protected branch.
- Pull Request required.
- CI must pass.
- Code review mandatory.

Production deployments always originate from this branch.

---

# Develop Branch

Purpose

Integration branch.

All completed feature branches merge here first.

Develop should always remain deployable to lower environments.

---

# Feature Branch

Naming Convention

```text
feature/login
feature/auth-api
feature/docker-compose
feature/kubernetes
```

Purpose

Develop a single feature.

Created from

develop

Merged into

develop

Deleted after merge.

---

# Bugfix Branch

Naming

```text
bugfix/login-error
bugfix/jwt-expiry
bugfix/dashboard-api
```

Purpose

Fix non-production defects.

Created from

develop

Merged back into

develop

---

# Release Branch

Naming

```text
release/v1.0
release/v1.1
release/v2.0
```

Purpose

Prepare production release.

Typical Activities

- Version updates
- Final testing
- Documentation review
- Deployment validation

Only critical fixes are allowed.

---

# Hotfix Branch

Naming

```text
hotfix/login
hotfix/auth
hotfix/security
```

Purpose

Fix production issues immediately.

Created from

main

Merged into

main

Also merged back into

develop

to keep both branches synchronized.

---

# Complete Workflow

Developer

↓

Create feature branch

↓

Develop feature

↓

Commit

↓

Push

↓

Pull Request

↓

Code Review

↓

GitHub Actions

↓

Merge into develop

↓

Release branch

↓

Testing

↓

Merge into main

↓

Production Deployment

↓

Tag Release

This is the workflow we will implement in this repository.

---

# Branch Protection Rules

main

- No direct push
- Pull Request required
- Review required
- CI required

develop

- Pull Request required
- CI required

release

- Limited write access

hotfix

- Platform team approval

---

# Why Enterprises Protect Branches

Protection prevents

- Accidental commits
- Force pushes
- Unauthorized deployments
- Broken production releases

Branch protection is mandatory in most organizations.

---

# Real Project Example

Task

Dockerize API Gateway.

Developer creates

```text
feature/docker-api-gateway
```

Work completed

↓

Push branch

↓

Pull Request

↓

GitHub Actions validates build

↓

Review approved

↓

Merge into develop

↓

Included in next release

Exactly this workflow will be followed in our project.

---

# Real Production Scenario

Scenario

A developer accidentally pushes directly to main.

Impact

- CI pipeline starts.
- Production deployment begins.
- Unreviewed code reaches production.

Resolution

- Revert commit.
- Restore production.
- Enable branch protection.
- Educate team.

Lesson

Production branches should never allow direct pushes.

---

# Scenario-Based Interview Questions

## Question 1

A developer says:

"I've completed my feature."

What should happen next?

Expected Discussion

- Push feature branch
- Create Pull Request
- CI pipeline runs
- Code review
- Merge into develop
- Delete feature branch

---

## Question 2

Production is down.

A one-line fix is required.

Would you create a feature branch?

Answer

No.

Use

```text
hotfix/*
```

Hotfix branches are designed for urgent production fixes.

---

## Question 3

A release branch has already been created.

Can developers continue building new features?

Answer

Yes.

New features continue on

develop

The release branch only receives critical fixes.

---

# Architecture-Level Interview Questions

## Question

Why not let developers work directly on main?

Answer

Because it bypasses

- Code review
- Automated testing
- CI validation
- Release process

Direct commits increase production risk.

---

## Question

Why merge a hotfix into both main and develop?

Answer

If merged only into main,

develop misses the production fix.

Future releases could reintroduce the same bug.

Synchronizing both branches prevents regression.

---

## Question

Would you use Git Flow for every organization?

Answer

No.

Choice depends on

- Team size
- Deployment frequency
- Release model
- Business requirements

Many modern teams prefer Trunk-Based Development for continuous delivery.

---

# Production Support Questions

Q.

A deployment contains code that was never reviewed.

Where do you investigate?

Answer

Check

- Branch history
- Pull Request history
- Branch protection rules
- Merge commits
- CI logs

---

Q.

A production bug appears after a hotfix.

What should be verified?

Answer

- Hotfix merged into develop?
- Correct release tag?
- Deployment artifact?
- Merge conflicts?
- CI pipeline?

---

# Common Mistakes

- Working directly on main
- Long-lived feature branches
- Force pushing shared branches
- Forgetting to delete merged branches
- Merging unfinished work
- Skipping Pull Requests

---

# Enterprise Best Practices

- Keep feature branches small.
- Merge frequently.
- Protect main.
- Require code reviews.
- Require successful CI.
- Delete merged branches.
- Use meaningful branch names.
- Tag production releases.

---

# Key Takeaways

Our Branch Strategy

```text
main
│
├── release/*
│
├── develop
│
├── feature/*
│
├── bugfix/*
│
└── hotfix/*
```

Every production deployment starts from a controlled and reviewed branch.

---

# Marathi Quick Revision

आपल्या project मध्ये आपण खालील branches वापरणार आहोत.

main

Production

↓

develop

Development Integration

↓

feature/*

नवीन feature

↓

bugfix/*

Development bug

↓

release/*

Production release तयारी

↓

hotfix/*

Production emergency fix

प्रत्येक branch ची जबाबदारी वेगळी आहे.

---

# Marathi Interview Memory Tip

Interview मध्ये जर विचारलं:

"Which Git branching strategy have you implemented?"

असं उत्तर द्या:

"आमच्या Enterprise DevOps Platform मध्ये आम्ही Git Flow सारखी controlled branching strategy वापरतो. Developers feature branches वर काम करतात, develop integration branch म्हणून वापरतो, release branches production preparation साठी आणि hotfix branches emergency production fixes साठी वापरतो. Main branch पूर्णपणे protected आहे आणि प्रत्येक deployment CI/CD validation नंतरच production मध्ये जातो."

