# Git Reflog

## Purpose

This document explains Git Reflog from an Enterprise DevOps perspective.

Git Reflog is one of Git's most powerful recovery tools.

It records every movement of the HEAD pointer, allowing engineers to recover commits, branches, and work that may appear to be lost.

In enterprise environments, Reflog is often the last line of defense after accidental resets, deleted branches, or incorrect checkouts.

---

# Introduction

Sometimes developers accidentally

- Delete commits
- Delete branches
- Perform Hard Reset
- Checkout the wrong commit
- Force update a branch

Although these changes may disappear from normal Git history,

Git Reflog usually remembers them.

---

# What is Git Reflog?

Reflog (Reference Log) records every update to

- HEAD
- Branch references

Examples

- Commit
- Reset
- Merge
- Rebase
- Checkout
- Cherry-pick
- Branch switch

Think of Reflog as Git's activity log.

---

# Why Reflog is Important

Reflog helps recover

- Lost commits
- Deleted branches
- Hard Reset mistakes
- Incorrect rebases
- Detached HEAD commits

Many seemingly "lost" changes can be recovered using Reflog.

---

# Enterprise Usage

DevOps Engineers use Reflog during

- Production incident investigations
- Repository recovery
- Failed rebases
- Accidental resets
- Recovery after force pushes (local recovery)

It is an essential troubleshooting tool.

---

# How Reflog Works

Repository

↓

HEAD Moves

↓

Git Records Event

↓

Reflog Entry

↓

Recovery Possible

Unlike Git Log,

Reflog tracks local reference movements.

---

# View Reflog

```bash
git reflog
```

Example

```text
8f7d6c5 HEAD@{0}: commit: Update Helm chart

7a6b5c4 HEAD@{1}: reset: moving to HEAD~1

5e4d3c2 HEAD@{2}: checkout: moving from develop to main

4c3b2a1 HEAD@{3}: commit: Fix API Gateway timeout
```

Each entry represents a previous state.

---

# Recover After Hard Reset

Suppose

```bash
git reset --hard HEAD~1
```

removed a commit.

Run

```bash
git reflog
```

Locate the previous commit

Example

```text
HEAD@{1}
```

Recover it

```bash
git reset --hard HEAD@{1}
```

The lost commit is restored.

---

# Recover Deleted Branch

Find the branch's last commit

```bash
git reflog
```

Create a new branch

```bash
git checkout -b recovered-branch <commit-id>
```

The deleted branch is restored.

---

# Recover Detached HEAD Work

Find the detached commit

```bash
git reflog
```

Create a branch

```bash
git checkout -b recovered-work <commit-id>
```

Your work is preserved.

---

# Reflog in Our Project

Example

A DevOps Engineer accidentally performs

```bash
git reset --hard
```

while updating

- Terraform
- Kubernetes
- Helm

Instead of recreating hours of work,

the engineer checks

```bash
git reflog
```

finds the previous HEAD,

and restores the repository.

---

# Daily DevOps Activities

Reflog is used when

- Recovering deleted commits
- Undoing Hard Reset mistakes
- Recovering deleted branches
- Investigating repository history
- Restoring interrupted work

Although not used every day,

it is invaluable during emergencies.

---

# Production Best Practices

- Learn Reflog before using Hard Reset.
- Verify commit IDs before recovery.
- Create recovery branches before major changes.
- Avoid unnecessary force pushes.
- Recover locally before attempting remote fixes.

---

# Security Considerations

Reflog exists only in the local repository.

It is

- Not shared automatically
- Not pushed to GitHub
- Not available in other clones

Each developer has an independent Reflog.

---

# Troubleshooting

View Reflog

```bash
git reflog
```

View commit

```bash
git show HEAD@{2}
```

Recover commit

```bash
git reset --hard HEAD@{2}
```

Create recovery branch

```bash
git checkout -b recovery HEAD@{2}
```

Verify history

```bash
git log --oneline --graph
```

---

# Real Production Scenario

Scenario

A DevOps Engineer accidentally executes

```bash
git reset --hard
```

before pushing infrastructure changes.

Several hours of Kubernetes configuration appear lost.

Instead of rewriting everything,

the engineer runs

```bash
git reflog
```

finds the previous HEAD,

resets to that commit,

and recovers all work.

Production delay is avoided.

---

# Scenario-Based Interview Questions

## Question 1

What is Git Reflog?

Answer

Git Reflog records updates to local Git references, allowing recovery of commits and branches that no longer appear in normal history.

---

## Question 2

Can Reflog recover commits after Hard Reset?

Answer

Yes.

If the commit still exists in the local Reflog, it can usually be restored.

---

## Question 3

Is Reflog shared with GitHub?

Answer

No.

Reflog is stored only in the local repository.

---

# Architecture-Level Interview Questions

## Question

How is Git Log different from Git Reflog?

Answer

Git Log displays commit history.

Git Reflog displays movements of references such as HEAD, including commits that may no longer be reachable from any branch.

---

## Question

Why is Reflog considered a recovery mechanism?

Answer

Because it tracks previous repository states, allowing engineers to restore work after accidental history changes.

---

## Question

Can Reflog recover everything forever?

Answer

No.

Reflog entries expire over time and may be removed by Git's garbage collection process.

Recovery should be performed as soon as possible.

---

# Production Support Questions

Q.

A developer accidentally deleted local commits using Hard Reset.

What should they do first?

Answer

Run

```bash
git reflog
```

Locate the previous HEAD and recover the lost commit before making additional changes.

---

Q.

A deleted feature branch contained important work.

How can it be recovered?

Answer

Use

```bash
git reflog
```

identify the last commit on the deleted branch, and create a new branch from that commit.

---

# Related Runbooks

Future runbooks

- Recover Lost Commit
- Recover Deleted Branch
- Restore Repository After Hard Reset
- Recover Detached HEAD

---

# Common Incidents

- Hard Reset removed commits
- Deleted branch
- Detached HEAD work lost
- Incorrect rebase
- Accidental checkout
- Lost local changes

---

# Commands

View Reflog

```bash
git reflog
```

Show Reflog commit

```bash
git show HEAD@{1}
```

Recover previous state

```bash
git reset --hard HEAD@{1}
```

Recover using commit ID

```bash
git checkout -b recovery <commit-id>
```

View history

```bash
git log --oneline --graph
```

---

# Key Takeaways

Git Reflog is Git's recovery journal.

It helps recover

- Lost commits
- Deleted branches
- Hard Reset mistakes
- Detached HEAD work
- Repository state

Every DevOps Engineer should know Reflog before using history-rewriting commands like Reset or Rebase.

---

# Marathi Quick Revision

Git Reflog म्हणजे Git चा activity log.

तो लक्षात ठेवतो

- HEAD कुठे गेला
- Reset
- Checkout
- Rebase
- Commit

Hard Reset नंतर हरवलेले commits अनेकदा Reflog मधून परत मिळू शकतात.

---

# Marathi Interview Memory Tip

Interview मध्ये जर विचारलं:

"Git Reflog कशासाठी वापरतात?"

असं सांगा:

"Git Reflog हा Git चा recovery mechanism आहे. Hard Reset, deleted branch किंवा lost commit झाल्यास Reflog मधून previous HEAD शोधून repository restore करता येते. त्यामुळे तो DevOps troubleshooting साठी अत्यंत महत्त्वाचा command आहे."

