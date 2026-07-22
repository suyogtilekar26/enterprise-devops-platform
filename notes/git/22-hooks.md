# Git Hooks

## Purpose

This document explains Git Hooks from an Enterprise DevOps perspective.

Git Hooks are scripts that automatically execute when specific Git events occur.

In enterprise environments, Git Hooks help enforce coding standards, automate validation, improve code quality, and prevent mistakes before changes reach shared repositories.

---

# Introduction

Many development tasks are repetitive.

Examples

- Run tests
- Check formatting
- Validate commit messages
- Scan for secrets
- Verify file naming

Instead of relying on developers to perform these tasks manually,

Git Hooks automate them.

---

# What are Git Hooks?

Git Hooks are executable scripts stored inside the Git repository.

They are triggered automatically during Git operations.

Examples

- Commit
- Push
- Merge
- Checkout
- Rebase

Git executes the hook when the corresponding event occurs.

---

# Why Git Hooks are Important

Git Hooks help

- Improve code quality
- Reduce production issues
- Prevent invalid commits
- Enforce standards
- Automate repetitive tasks
- Improve security

They act as an automated checkpoint before changes move forward.

---

# Enterprise Usage

Git Hooks are commonly used for

- Code formatting
- Linting
- Unit testing
- Secret detection
- Commit message validation
- File validation
- Policy enforcement

Many organizations combine Git Hooks with CI/CD validation.

---

# Git Hook Architecture

```text
Developer

↓

Git Command

↓

Git Hook

↓

Validation

↓

Success

↓

Git Operation Continues

OR

Failure

↓

Git Operation Stops
```

---

# Location of Git Hooks

Hooks are stored in

```text
.git/hooks/
```

Example

```text
.git/hooks/pre-commit

.git/hooks/pre-push

.git/hooks/commit-msg
```

These scripts are executed automatically by Git.

---

# Common Git Hooks

| Hook | Purpose |
|-------|----------|
| pre-commit | Runs before commit |
| commit-msg | Validates commit message |
| pre-push | Runs before push |
| post-commit | Executes after commit |
| post-merge | Executes after merge |
| pre-rebase | Runs before rebase |

---

# Pre-Commit Hook

Runs before a commit is created.

Typical tasks

- Lint code
- Run unit tests
- Check formatting
- Scan for secrets

If validation fails,

the commit is rejected.

---

# Commit Message Hook

Runs after writing the commit message.

Example validation

```text
feat:

fix:

docs:

refactor:
```

Invalid commit messages can be rejected automatically.

---

# Pre-Push Hook

Runs before code is pushed.

Typical validations

- Execute tests
- Verify branch
- Check large files
- Security scan

Push proceeds only if validation succeeds.

---

# Example Pre-Commit Hook

```bash
#!/bin/sh

echo "Running tests..."

npm test
```

If the test command returns a failure,

Git stops the commit.

---

# Git Hooks in Our Project

Future Git Hooks may validate

- Dockerfiles
- Kubernetes manifests
- Helm charts
- Terraform formatting
- Python linting
- React linting
- Documentation quality

This helps prevent invalid infrastructure changes from entering the repository.

---

# Enterprise Workflow

Developer

↓

Modify Code

↓

Git Commit

↓

Pre-Commit Hook

↓

Validation

↓

Commit

↓

Push

↓

GitHub Actions

↓

Deployment

Git Hooks provide the first validation layer.

---

# Daily DevOps Activities

DevOps Engineers use Git Hooks to

- Enforce standards
- Prevent configuration mistakes
- Validate Infrastructure as Code
- Check formatting
- Detect secrets
- Improve deployment reliability

---

# Production Best Practices

- Keep hooks fast.
- Automate only meaningful checks.
- Share hook configuration across teams.
- Combine hooks with CI/CD.
- Never rely only on local hooks for production validation.

---

# Security Considerations

Git Hooks can help detect

- API keys
- Passwords
- Tokens
- Private certificates
- Large confidential files

Preventing secrets from entering Git history is much easier than removing them later.

---

# Troubleshooting

View hook directory

```bash
ls .git/hooks
```

Make a hook executable

```bash
chmod +x .git/hooks/pre-commit
```

Run manually

```bash
.git/hooks/pre-commit
```

Disable hook temporarily

Rename it

```text
pre-commit

↓

pre-commit.bak
```

---

# Real Production Scenario

Scenario

A developer accidentally includes

```text
AWS_SECRET_ACCESS_KEY
```

inside a configuration file.

The Pre-Commit Hook performs secret scanning.

The commit is rejected immediately.

The secret never reaches GitHub.

A potential security incident is avoided.

---

# Scenario-Based Interview Questions

## Question 1

What are Git Hooks?

Answer

Git Hooks are scripts automatically executed during Git operations such as commits and pushes.

---

## Question 2

Why use a Pre-Commit Hook?

Answer

To validate code before it enters the repository by running tests, formatting checks, linting or security scans.

---

## Question 3

Should Git Hooks replace CI/CD?

Answer

No.

Git Hooks provide local validation.

CI/CD provides centralized validation for the entire team.

Both should be used together.

---

# Architecture-Level Interview Questions

## Question

Why are Git Hooks considered the first quality gate?

Answer

Because they execute before code is committed or pushed, preventing many issues from entering the repository.

---

## Question

Can Git Hooks guarantee repository quality?

Answer

No.

Developers can bypass local hooks.

Central CI/CD validation remains essential.

---

## Question

Why combine Git Hooks with GitHub Actions?

Answer

Git Hooks provide immediate local feedback, while GitHub Actions enforce organization-wide validation after code reaches the remote repository.

---

# Production Support Questions

Q.

A developer committed secrets to GitHub.

How could this have been prevented?

Answer

A Pre-Commit Hook with secret scanning could have blocked the commit before it reached the repository.

---

Q.

Why did a commit fail even though Git itself reported no errors?

Answer

A Git Hook likely rejected the operation because one of its validation checks failed.

---

# Related Runbooks

Future runbooks

- Configure Git Hooks
- Secret Scanning
- Validate Commit Messages
- Troubleshoot Hook Failures

---

# Common Incidents

- Hook not executable
- Slow hook execution
- Failed unit tests
- Invalid commit message
- Secret detected
- Developer bypassed local hook

---

# Commands

View hooks

```bash
ls .git/hooks
```

Make executable

```bash
chmod +x .git/hooks/pre-commit
```

Run hook manually

```bash
.git/hooks/pre-commit
```

Rename hook

```bash
mv .git/hooks/pre-commit .git/hooks/pre-commit.bak
```

---

# Key Takeaways

Git Hooks automate validation during Git operations.

They improve

- Code quality
- Security
- Consistency
- Developer productivity

In the Enterprise DevOps Platform, Git Hooks will serve as the first validation layer before GitHub Actions and CI/CD pipelines perform centralized verification.

---

# Marathi Quick Revision

Git Hooks म्हणजे Git operations दरम्यान आपोआप चालणारे scripts.

उदाहरण

- Pre-Commit
- Commit-Message
- Pre-Push

मुख्य उपयोग

- Tests
- Linting
- Secret Scan
- Formatting
- Validation

Hooks मुळे चुकीचा code किंवा secrets repository मध्ये जाण्यापूर्वीच थांबतात.

---

# Marathi Interview Memory Tip

Interview मध्ये जर विचारलं:

"Git Hooks कशासाठी वापरतात?"

असं सांगा:

"Git Hooks हे automated scripts आहेत जे commit किंवा push सारख्या Git events दरम्यान चालतात. Enterprise मध्ये आम्ही त्यांचा वापर linting, unit tests, commit message validation आणि secret scanning साठी करतो. त्यामुळे चुकीचा code किंवा sensitive information repository मध्ये जाण्यापूर्वीच थांबते."

