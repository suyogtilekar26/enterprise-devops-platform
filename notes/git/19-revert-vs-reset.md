# Git Revert vs Reset

## Purpose

This document explains the difference between Git Revert and Git Reset from an Enterprise DevOps perspective.

Although both commands can undo changes, they work in fundamentally different ways.

Understanding when to use each command is essential for maintaining a safe and auditable Git history.

---

# Introduction

Mistakes happen during software development.

Examples

- Wrong commit
- Bug introduced
- Configuration mistake
- Deployment issue
- Accidental file deletion

Git provides two major ways to recover

- Revert
- Reset

Choosing the correct command is critical.

---

# What is Git Revert?

Git Revert creates a new commit that reverses the changes introduced by an earlier commit.

Original History

```text
A --- B --- C
```

Revert Commit C

↓

```text
A --- B --- C --- D
```

Commit D undoes C.

The original history remains intact.

---

# What is Git Reset?

Git Reset moves the current branch pointer to a previous commit.

Original History

```text
A --- B --- C
```

Reset to B

↓

```text
A --- B
```

Commit C is removed from the current branch history.

---

# Why the Difference Matters

Revert

- Preserves history
- Safe for shared branches
- Creates a new commit

Reset

- Rewrites history
- Removes commits
- Dangerous on shared branches

---

# Enterprise Usage

Git Revert

Used for

- Production fixes
- Shared branches
- Audit compliance
- Rollback after deployment

Git Reset

Used for

- Local development
- Cleaning mistakes
- Removing local commits
- Reorganizing work before pushing

---

# Types of Git Reset

## Soft Reset

```bash
git reset --soft HEAD~1
```

Moves HEAD

Keeps

- Changes
- Staging area

Useful for modifying recent commits.

---

## Mixed Reset

Default behavior

```bash
git reset HEAD~1
```

Moves HEAD

Keeps

- Working directory

Removes

- Staging area

---

## Hard Reset

```bash
git reset --hard HEAD~1
```

Moves HEAD

Deletes

- Commit
- Staged changes
- Working directory changes

Use with extreme caution.

---

# Using Git Revert

Revert one commit

```bash
git revert <commit-id>
```

Git automatically creates a new commit that undoes the selected commit.

---

# Using Git Reset

Move one commit back

```bash
git reset --soft HEAD~1
```

or

```bash
git reset HEAD~1
```

or

```bash
git reset --hard HEAD~1
```

Each mode behaves differently.

---

# Revert vs Reset Comparison

| Feature | Revert | Reset |
|----------|---------|--------|
| Removes History | No | Yes |
| Creates New Commit | Yes | No |
| Safe for Shared Branches | Yes | No |
| Rewrites History | No | Yes |
| Production Safe | Yes | No |
| Local Cleanup | Limited | Excellent |

---

# Revert vs Reset in Our Project

Production

Use

```text
Git Revert
```

Development

Use

```text
Git Reset
```

Reason

Production history must remain complete for auditing and incident investigations.

---

# Enterprise Workflow

Production Issue

↓

Identify Bad Commit

↓

Git Revert

↓

New Revert Commit

↓

CI/CD

↓

Deployment

↓

Production Restored

No history is lost.

---

# Daily DevOps Activities

DevOps Engineers use

Revert

- Failed deployment
- Bad configuration
- Production rollback
- Infrastructure mistake

Reset

- Local cleanup
- Removing test commits
- Rewriting local history
- Preparing commits before push

---

# Production Best Practices

- Never use Hard Reset on shared branches.
- Prefer Revert for production repositories.
- Always verify the target commit.
- Test after reverting.
- Document production reversions.

---

# Security Considerations

Rewriting Git history can

- Hide audit records
- Complicate investigations
- Disrupt collaboration

Production repositories should preserve complete history whenever possible.

---

# Troubleshooting

View history

```bash
git log --oneline
```

Revert commit

```bash
git revert <commit-id>
```

Soft reset

```bash
git reset --soft HEAD~1
```

Mixed reset

```bash
git reset HEAD~1
```

Hard reset

```bash
git reset --hard HEAD~1
```

Recover deleted commits

```bash
git reflog
```

---

# Real Production Scenario

Scenario

A Kubernetes deployment introduces an incorrect configuration.

The deployment has already been merged into

```text
main
```

Instead of rewriting history,

DevOps executes

```bash
git revert <commit-id>
```

A new commit removes the faulty configuration.

CI/CD deploys the corrected version.

Audit history remains complete.

---

# Scenario-Based Interview Questions

## Question 1

When should Git Revert be used?

Answer

When undoing changes in shared or production branches while preserving commit history.

---

## Question 2

When should Git Reset be used?

Answer

During local development before commits are shared with other engineers.

---

## Question 3

Why is Hard Reset considered dangerous?

Answer

Because it permanently removes commits and local changes that may be difficult to recover.

---

# Architecture-Level Interview Questions

## Question

Why is Git Revert preferred in enterprise production environments?

Answer

Because it preserves the complete audit trail while safely undoing unwanted changes.

---

## Question

Why should Reset not be used on shared branches?

Answer

Reset rewrites branch history, causing conflicts and synchronization issues for other team members.

---

## Question

Can a Hard Reset be recovered?

Answer

Sometimes.

If the commit still exists in the reflog, it may be recoverable.

Otherwise, recovery may not be possible.

---

# Production Support Questions

Q.

A bad deployment has already reached production.

Should you use Reset?

Answer

No.

Use

```bash
git revert
```

to safely undo the change while preserving history.

---

Q.

A developer accidentally committed debug code locally but has not pushed it.

What should they use?

Answer

A suitable Git Reset option to remove or modify the local commit before pushing.

---

# Related Runbooks

Future runbooks

- Rollback Production Deployment
- Recover Deleted Commit
- Revert Faulty Infrastructure Change
- Restore Repository After Reset

---

# Common Incidents

- Hard Reset on shared branch
- Wrong commit reverted
- Force push after reset
- Lost local changes
- Missing audit history
- Accidental history rewrite

---

# Commands

Revert commit

```bash
git revert <commit-id>
```

Soft reset

```bash
git reset --soft HEAD~1
```

Mixed reset

```bash
git reset HEAD~1
```

Hard reset

```bash
git reset --hard HEAD~1
```

View history

```bash
git log --oneline
```

Recover commits

```bash
git reflog
```

---

# Key Takeaways

Git Revert

- Preserves history
- Creates a new commit
- Safe for production
- Best for shared repositories

Git Reset

- Rewrites history
- Useful for local cleanup
- Should be avoided on shared production branches

In the Enterprise DevOps Platform, Revert is the preferred method for undoing production changes, while Reset is reserved for local development before code is shared.

---

# Marathi Quick Revision

Git Revert

- नवीन commit तयार करून जुना commit undo करतो.
- History delete होत नाही.
- Production साठी सुरक्षित.

Git Reset

- Branch मागे नेतो.
- History rewrite करतो.
- Local development साठी योग्य.

Production मध्ये Revert वापरा.

---

# Marathi Interview Memory Tip

Interview मध्ये जर विचारलं:

"Git Revert आणि Git Reset मध्ये काय फरक आहे?"

असं सांगा:

"Git Revert नवीन commit तयार करून आधीचा commit undo करतो आणि history सुरक्षित ठेवतो, त्यामुळे production मध्ये तो वापरला जातो. Git Reset branch मागे नेतो आणि history rewrite करतो, त्यामुळे तो मुख्यतः local development मध्येच वापरावा."

