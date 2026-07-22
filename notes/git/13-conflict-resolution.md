# Git Conflict Resolution

## Purpose

This document explains Git merge conflicts, why they occur, and how they are resolved in an enterprise environment.

Merge conflicts are a normal part of collaborative software development.

A DevOps Engineer should understand how to identify, investigate, resolve, verify, and prevent merge conflicts without affecting production stability.

---

# What is a Merge Conflict?

A merge conflict occurs when Git cannot automatically combine changes from two branches.

Git pauses the merge and asks the user to manually resolve the conflicting changes.

A conflict is not an error.

It is Git asking for human decision-making.

---

# Why Merge Conflicts Occur

Common reasons

- Two developers modify the same file
- Two developers modify the same lines
- File deleted in one branch and modified in another
- Branches remain out of sync for a long time
- Large Pull Requests
- Long-lived feature branches

---

# Enterprise Usage

Merge conflicts occur during

- Pull Requests
- Feature merges
- Release preparation
- Hotfix integration
- Infrastructure changes
- Kubernetes manifest updates
- Terraform module updates

Every engineering team encounters merge conflicts.

---

# Example Conflict

Developer A changes

```python
timeout = 30
```

Developer B changes

```python
timeout = 60
```

Git cannot determine which value should be kept.

Manual resolution is required.

---

# Conflict Markers

Git marks conflicts like this

```text
<<<<<<< HEAD
timeout = 30
=======
timeout = 60
>>>>>>> feature/api-update
```

Meaning

HEAD

Current branch

=======

Separator

feature/api-update

Incoming branch

Remove these markers after resolving the conflict.

---

# Merge Conflict Workflow

Feature Branch

↓

Merge

↓

Conflict Detected

↓

Resolve Conflict

↓

Stage File

↓

Commit Merge

↓

Push

↓

Pull Request Completed

---

# Detecting Conflicts

Attempt merge

```bash
git merge feature/docker-api-gateway
```

If Git reports

```text
CONFLICT
```

Run

```bash
git status
```

Example

```text
both modified:
docker-compose.yml
```

Git identifies conflicting files.

---

# Resolving a Conflict

Step 1

Open the conflicting file.

---

Step 2

Review both versions.

---

Step 3

Choose

- Current version
- Incoming version
- Combination of both

---

Step 4

Remove conflict markers.

---

Step 5

Save the file.

---

Step 6

Stage the resolved file.

```bash
git add docker-compose.yml
```

---

Step 7

Complete the merge.

```bash
git commit
```

Git creates a merge commit.

---

# Abort a Merge

If you decide not to continue

```bash
git merge --abort
```

Repository returns to the state before the merge.

---

# Conflict Resolution During Rebase

Start rebase

```bash
git rebase develop
```

Conflict occurs.

Resolve the file.

Stage it.

```bash
git add .
```

Continue

```bash
git rebase --continue
```

Abort if necessary

```bash
git rebase --abort
```

---

# Merge Conflict in Our Project

Example

Developer A

Updates

```text
kubernetes/deployment.yaml
```

Developer B

Updates the same deployment.

Pull Request

↓

Merge Conflict

↓

Review

↓

Combine required configuration

↓

Merge

↓

Deploy

---

# Daily DevOps Activities

DevOps Engineers commonly resolve conflicts in

- Kubernetes manifests
- Helm charts
- GitHub Actions workflows
- Docker Compose files
- Terraform modules
- Monitoring configuration
- Documentation

---

# Production Best Practices

- Pull frequently.
- Keep feature branches short.
- Merge often.
- Create small Pull Requests.
- Resolve conflicts carefully.
- Test after resolving conflicts.
- Never guess during conflict resolution.

---

# Security Considerations

Conflicts involving

- Secrets
- Certificates
- Environment variables
- Security policies

should receive additional review.

Incorrect conflict resolution can introduce security vulnerabilities.

---

# Troubleshooting

Check repository state

```bash
git status
```

View conflicting changes

```bash
git diff
```

Abort merge

```bash
git merge --abort
```

Abort rebase

```bash
git rebase --abort
```

Continue rebase

```bash
git rebase --continue
```

Review history

```bash
git log --graph --oneline --decorate
```

---

# Real Production Scenario

Scenario

Two DevOps engineers update

```text
helm/values.yaml
```

One changes

- Image tag

Another changes

- Resource limits

Merge conflict occurs.

Resolution

Review both modifications.

Retain both valid changes.

Deploy to test environment.

Validate deployment before production.

---

# Scenario-Based Interview Questions

## Question 1

Why does Git create merge conflicts?

Answer

Because Git cannot automatically determine which conflicting change should be preserved.

---

## Question 2

How do you resolve a merge conflict?

Expected Discussion

- Identify conflicting files
- Review both versions
- Decide correct content
- Remove markers
- Stage files
- Complete merge
- Test changes

---

## Question 3

Would you always choose your own changes?

Answer

No.

Conflict resolution should preserve the correct business and technical behavior, not personal preference.

---

# Architecture-Level Interview Questions

## Question

Why do long-lived branches create more conflicts?

Answer

Because more changes accumulate over time, increasing the probability that multiple developers modify the same files.

---

## Question

How can teams reduce merge conflicts?

Answer

- Smaller Pull Requests
- Frequent merges
- Short-lived branches
- Regular synchronization with develop
- Better communication

---

## Question

Why should conflict resolution always be tested?

Answer

Because manual editing may introduce

- Syntax errors
- Configuration mistakes
- Logical bugs

Testing verifies correctness before deployment.

---

# Production Support Questions

Q.

A deployment fails immediately after a merge.

Possible cause?

Answer

An incorrectly resolved merge conflict may have introduced an invalid configuration or broken code.

---

Q.

Why investigate merge history during incident response?

Answer

Recent merges often introduce configuration or application changes that may explain the incident.

---

# Related Runbooks

Future runbooks

- Resolve Merge Conflict
- Recover Failed Merge
- Validate Deployment After Merge
- Emergency Rollback

---

# Common Incidents

- Incorrect conflict resolution
- Deleted configuration
- Duplicate configuration
- Invalid Kubernetes manifest
- Broken GitHub Actions workflow
- Failed production deployment

---

# Commands

Merge branch

```bash
git merge feature/docker-api-gateway
```

Repository status

```bash
git status
```

View differences

```bash
git diff
```

Abort merge

```bash
git merge --abort
```

Continue rebase

```bash
git rebase --continue
```

Abort rebase

```bash
git rebase --abort
```

---

# Key Takeaways

Merge conflicts are a normal part of collaborative development.

Enterprise engineers should

- Understand conflict markers
- Resolve conflicts carefully
- Test after resolution
- Keep branches synchronized
- Use small Pull Requests

Correct conflict resolution improves deployment reliability and reduces production incidents.

---

# Marathi Quick Revision

Merge conflict तेव्हा होतो जेव्हा दोन branches मध्ये एकाच file किंवा line वर वेगवेगळे changes असतात.

Flow

Conflict

↓

Review

↓

Resolve

↓

git add

↓

git commit

↓

Merge Complete

Conflict झाल्यावर घाईने निर्णय घेऊ नये.

---

# Marathi Interview Memory Tip

Interview मध्ये जर विचारलं:

"How do you resolve Git merge conflicts?"

असं सांगा:

"मी प्रथम git status वापरून conflicting files ओळखतो. दोन्ही changes समजून घेतो, योग्य final version तयार करतो, conflict markers काढतो, file stage करतो आणि merge पूर्ण करतो. त्यानंतर application आणि infrastructure validate करूनच deployment करतो."

