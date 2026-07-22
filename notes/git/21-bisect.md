# Git Bisect

## Purpose

This document explains Git Bisect from an Enterprise DevOps perspective.

Git Bisect is a debugging tool that helps identify the exact commit that introduced a bug.

Instead of manually checking every commit, Git Bisect uses a binary search algorithm to quickly locate the problematic commit.

In enterprise environments, Git Bisect is invaluable during production incident investigations, regression analysis, and release troubleshooting.

---

# Introduction

Imagine a production application worked correctly last week but fails today.

Between those two points,

hundreds of commits were merged.

Finding the exact commit manually can be slow.

Git Bisect automates this investigation.

---

# What is Git Bisect?

Git Bisect performs a binary search through commit history.

Rather than checking every commit,

Git repeatedly selects the middle commit.

You simply tell Git whether that commit is

- Good
- Bad

Git continues narrowing the search until the faulty commit is identified.

---

# Why Git Bisect is Important

Git Bisect

- Reduces investigation time
- Finds regression commits
- Supports production troubleshooting
- Improves release quality
- Assists root cause analysis

Instead of checking 500 commits,

Bisect may require fewer than 10 tests.

---

# Enterprise Usage

Git Bisect is commonly used for

- Production regressions
- Deployment failures
- Performance degradation
- Infrastructure issues
- Configuration mistakes
- Application bugs

It is frequently used during incident investigations.

---

# How Git Bisect Works

```text
Good Commit

↓

Many Commits

↓

Bad Commit

↓

Git Selects Middle Commit

↓

Engineer Tests

↓

Good or Bad?

↓

Repeat

↓

Faulty Commit Found
```

Binary search dramatically reduces the number of commits to investigate.

---

# Start Bisect

Begin the process

```bash
git bisect start
```

---

# Mark Current Commit as Bad

```bash
git bisect bad
```

Current commit contains the bug.

---

# Mark Known Good Commit

Example

```bash
git bisect good 4c2d1e9
```

Git now begins the binary search.

---

# Test Each Commit

Git checks out a commit.

Run

- Application
- Unit Tests
- Integration Tests
- Deployment Validation

If successful

```bash
git bisect good
```

If failed

```bash
git bisect bad
```

Repeat until Git identifies the first bad commit.

---

# Finish Bisect

After investigation

```bash
git bisect reset
```

Repository returns to the original branch.

---

# Automating Git Bisect

If automated tests exist

```bash
git bisect run ./test.sh
```

Git automatically executes the test script for every selected commit.

This significantly speeds up investigations.

---

# Git Bisect in Our Project

Example

Production reports

API Gateway returns HTTP 500 errors.

Recent work included

- Docker
- Terraform
- Helm
- Flask API updates

Known Good Release

```text
v1.2.0
```

Current Release

```text
v1.3.0
```

Git Bisect identifies the exact commit that introduced the regression.

---

# Enterprise Workflow

Production Issue

↓

Incident Created

↓

Identify Good Release

↓

Identify Bad Release

↓

Git Bisect

↓

Locate Faulty Commit

↓

Fix

↓

CI/CD

↓

Production Deployment

---

# Daily DevOps Activities

Git Bisect is used when

- Production failures occur
- Release regression appears
- Infrastructure breaks unexpectedly
- Performance decreases
- Automated tests begin failing

Although not used every day,

it is one of the most valuable troubleshooting tools.

---

# Production Best Practices

- Know a stable release before starting.
- Use automated tests whenever possible.
- Record investigation findings.
- Verify the identified commit.
- Link the faulty commit to the incident report.

---

# Security Considerations

Bisect may check out historical versions containing

- Older configurations
- Deprecated dependencies
- Previous secrets (if improperly committed)

Perform investigations in controlled development environments.

---

# Troubleshooting

Start

```bash
git bisect start
```

Mark bad

```bash
git bisect bad
```

Mark good

```bash
git bisect good <commit-id>
```

Automated testing

```bash
git bisect run ./test.sh
```

Reset

```bash
git bisect reset
```

---

# Real Production Scenario

Scenario

After deploying version

```text
v2.4.0
```

users cannot log in.

Version

```text
v2.3.0
```

worked correctly.

Instead of reviewing hundreds of commits,

the DevOps Engineer runs Git Bisect.

After several iterations,

Git identifies a JWT authentication commit that introduced the regression.

The faulty change is reverted and production is restored.

---

# Scenario-Based Interview Questions

## Question 1

What problem does Git Bisect solve?

Answer

It quickly identifies the commit that introduced a bug using binary search.

---

## Question 2

Why is Git Bisect faster than manual investigation?

Answer

Because it checks only a small number of commits instead of reviewing every commit sequentially.

---

## Question 3

Can Git Bisect be automated?

Answer

Yes.

Using

```bash
git bisect run
```

Git automatically executes a test script for each selected commit.

---

# Architecture-Level Interview Questions

## Question

Why is Git Bisect valuable in enterprise environments?

Answer

Large repositories contain thousands of commits.

Binary search dramatically reduces investigation time during production incidents.

---

## Question

What is required before starting Git Bisect?

Answer

At least one known good commit and one known bad commit.

---

## Question

Can Git Bisect investigate infrastructure repositories?

Answer

Yes.

It works with any Git repository, including Docker, Kubernetes, Terraform, Helm, and application code.

---

# Production Support Questions

Q.

Production regression appears after a release.

How would you locate the responsible commit?

Answer

Identify the last working release, the failing release, and use Git Bisect to locate the first bad commit.

---

Q.

Why should Git Bisect investigations be documented?

Answer

Because the identified commit becomes part of the incident timeline, root cause analysis, and future prevention strategy.

---

# Related Runbooks

Future runbooks

- Investigate Production Regression
- Use Git Bisect During Incident
- Recover After Faulty Deployment
- Root Cause Analysis

---

# Common Incidents

- Regression after deployment
- Incorrect configuration introduced
- Performance degradation
- Authentication failure
- Infrastructure regression
- Unknown faulty commit

---

# Commands

Start

```bash
git bisect start
```

Mark bad

```bash
git bisect bad
```

Mark good

```bash
git bisect good <commit-id>
```

Run automated tests

```bash
git bisect run ./test.sh
```

Finish

```bash
git bisect reset
```

---

# Key Takeaways

Git Bisect uses binary search to locate the commit that introduced a problem.

It is one of the fastest ways to investigate

- Production regressions
- Deployment failures
- Performance issues
- Infrastructure bugs

Every DevOps Engineer should understand Git Bisect as part of production incident response and root cause analysis.

---

# Marathi Quick Revision

Git Bisect म्हणजे bug आणणारा commit शोधण्याची Git ची smart पद्धत.

तो binary search वापरतो.

Process

Known Good Commit

↓

Known Bad Commit

↓

Git मध्ये test

↓

Good / Bad

↓

Faulty Commit सापडतो

---

# Marathi Interview Memory Tip

Interview मध्ये जर विचारलं:

"Git Bisect कधी वापरता?"

असं सांगा:

"Production regression किंवा deployment नंतर bug आला आणि कोणत्या commit मुळे आला हे माहित नसेल तर Git Bisect वापरतो. तो binary search वापरून कमी steps मध्ये faulty commit शोधतो, त्यामुळे incident investigation आणि root cause analysis खूप जलद होते."

