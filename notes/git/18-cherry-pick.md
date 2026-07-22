# Git Cherry-Pick

## Purpose

This document explains Git Cherry-Pick from an Enterprise DevOps perspective.

Git Cherry-Pick allows a specific commit to be copied from one branch to another without merging the entire branch.

In enterprise environments, Cherry-Pick is commonly used for hotfixes, production patches, selective bug fixes, and release management.

---

# Introduction

Normally, Git moves changes between branches using

- Merge
- Rebase

However, there are situations where only one specific commit is required.

Git Cherry-Pick solves this problem.

Instead of merging every commit,

it copies only the selected commit.

---

# What is Cherry-Pick?

Cherry-Pick applies an existing commit from one branch onto another.

Example

```text
develop

A --- B --- C --- D

                 ↑
              Bug Fix
```

Production

```text
main

A --- B
```

Cherry-Pick

↓

```text
main

A --- B --- C'
```

Only the bug fix commit is copied.

---

# Why Cherry-Pick is Important

Cherry-Pick allows

- Production hotfixes
- Emergency bug fixes
- Selective feature movement
- Release stabilization
- Security patches

without merging unfinished work.

---

# Enterprise Usage

Cherry-Pick is commonly used when

- Production requires one bug fix
- Release branch needs one commit
- Security vulnerability must be patched
- Infrastructure fix is isolated
- Feature branch contains unfinished work

---

# How Cherry-Pick Works

Feature Branch

↓

Multiple Commits

↓

Select One Commit

↓

Cherry-Pick

↓

Target Branch

↓

Only Selected Commit Applied

---

# Find Commit ID

View commit history

```bash
git log --oneline
```

Example

```text
5d6e7f8 Fix API timeout

4a3b2c1 Update Helm chart

2b1c0d9 Docker improvements
```

Choose the required commit hash.

---

# Cherry-Pick a Commit

Example

```bash
git cherry-pick 5d6e7f8
```

Git applies that commit to the current branch.

---

# Cherry-Pick Multiple Commits

Example

```bash
git cherry-pick 5d6e7f8 4a3b2c1
```

Both commits are copied.

---

# Cherry-Pick a Range

Example

```bash
git cherry-pick A^..D
```

Copies all commits from A through D.

---

# Resolve Cherry-Pick Conflicts

If conflicts occur

Resolve files

↓

Stage changes

```bash
git add .
```

Continue

```bash
git cherry-pick --continue
```

Abort if necessary

```bash
git cherry-pick --abort
```

---

# Cherry-Pick in Our Project

Example

Feature branch contains

- Docker improvements
- Terraform updates
- API Gateway bug fix
- Helm experiments

Production only requires

API Gateway bug fix.

Workflow

```text
Find Commit

↓

Checkout main

↓

Cherry-Pick Bug Fix

↓

Test

↓

Deploy
```

Unfinished infrastructure work remains in the feature branch.

---

# Daily DevOps Activities

DevOps Engineers use Cherry-Pick for

- Production hotfixes
- Security patches
- Release branches
- Infrastructure fixes
- Critical bug resolution

---

# Production Best Practices

- Cherry-pick only reviewed commits.
- Test after cherry-picking.
- Avoid cherry-picking large feature sets.
- Document production hotfixes.
- Merge the fix back into development later.

---

# Security Considerations

Cherry-picking security fixes must be tracked carefully.

Ensure

- Correct commit selected
- No unrelated code included
- Patch verified before deployment

---

# Troubleshooting

View history

```bash
git log --oneline
```

Cherry-pick commit

```bash
git cherry-pick <commit-id>
```

Continue

```bash
git cherry-pick --continue
```

Abort

```bash
git cherry-pick --abort
```

Verify history

```bash
git log --oneline --graph
```

---

# Real Production Scenario

Scenario

A feature branch contains

- Five unfinished features
- One production bug fix

Production cannot wait for all features.

DevOps Engineer

Finds the bug-fix commit

↓

Cherry-picks it onto

```text
main
```

↓

Deploys production

↓

Later merges the full feature branch after testing.

---

# Scenario-Based Interview Questions

## Question 1

Why use Cherry-Pick instead of Merge?

Answer

Merge brings all commits from a branch.

Cherry-Pick copies only the required commit.

---

## Question 2

When is Cherry-Pick commonly used?

Answer

During production hotfixes, release stabilization and emergency security fixes.

---

## Question 3

Can Cherry-Pick create conflicts?

Answer

Yes.

If the target branch has conflicting changes, conflicts must be resolved before continuing.

---

# Architecture-Level Interview Questions

## Question

Does Cherry-Pick preserve the original commit hash?

Answer

No.

Git creates a new commit with a different hash because it exists in a different branch history.

---

## Question

Why should excessive Cherry-Picking be avoided?

Answer

Frequent cherry-picking can duplicate commits, complicate history and make future merges more difficult.

---

## Question

What should happen after a production hotfix is cherry-picked?

Answer

The same fix should also be merged back into the development branch so all branches remain consistent.

---

# Production Support Questions

Q.

Production needs one critical fix from a large feature branch.

What is the safest approach?

Answer

Cherry-pick only the verified bug-fix commit instead of merging the entire feature branch.

---

Q.

Cherry-Pick stopped due to conflicts.

What should you do?

Answer

Resolve conflicts, stage the resolved files and run

```bash
git cherry-pick --continue
```

---

# Related Runbooks

Future runbooks

- Apply Production Hotfix
- Cherry-Pick Security Patch
- Resolve Cherry-Pick Conflicts
- Synchronize Hotfix Back to Develop

---

# Common Incidents

- Wrong commit cherry-picked
- Merge conflicts
- Duplicate commits
- Missing hotfix in develop branch
- Production patch without documentation

---

# Commands

View commits

```bash
git log --oneline
```

Cherry-pick one commit

```bash
git cherry-pick <commit-id>
```

Cherry-pick multiple commits

```bash
git cherry-pick <commit1> <commit2>
```

Continue

```bash
git cherry-pick --continue
```

Abort

```bash
git cherry-pick --abort
```

---

# Key Takeaways

Git Cherry-Pick enables selective movement of commits between branches.

It is especially valuable for

- Production hotfixes
- Emergency patches
- Security fixes
- Release management

Use Cherry-Pick for isolated changes, not as a replacement for normal branching and merging strategies.

---

# Marathi Quick Revision

Cherry-Pick म्हणजे एका branch मधील specific commit दुसऱ्या branch मध्ये copy करणे.

पूर्ण branch merge होत नाही.

मुख्य उपयोग

- Production Hotfix
- Bug Fix
- Security Patch
- Release Branch

---

# Marathi Interview Memory Tip

Interview मध्ये जर विचारलं:

"Why do you use Git Cherry-Pick?"

असं सांगा:

"Cherry-Pick वापरून आम्ही एका branch मधील specific verified commit दुसऱ्या branch मध्ये आणू शकतो. Production मध्ये urgent hotfix किंवा security patch deploy करायचा असेल आणि पूर्ण feature branch merge करायचा नसेल, तेव्हा Cherry-Pick हा सर्वात सुरक्षित पर्याय असतो."

