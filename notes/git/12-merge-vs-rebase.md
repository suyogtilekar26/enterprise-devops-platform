# Merge vs Rebase

## Purpose

This document explains the difference between Git Merge and Git Rebase from an Enterprise DevOps perspective.

Understanding when to use Merge and Rebase is essential for maintaining clean Git history, reducing conflicts, and supporting enterprise CI/CD workflows.

This topic is frequently discussed in Senior DevOps and Platform Engineering interviews.

---

# Introduction

Git provides two primary ways to integrate changes from one branch into another.

- Merge
- Rebase

Both achieve the same goal:

Combine changes from different branches.

However, they do so in different ways.

---

# Enterprise Usage

Merge is commonly used for

- Team collaboration
- Pull Requests
- Protected branches
- Production repositories

Rebase is commonly used for

- Cleaning local commit history
- Updating feature branches
- Preparing Pull Requests

Most enterprise repositories use Merge for shared branches and Rebase only on local branches.

---

# What is Merge?

Merge combines two branches by creating a new merge commit.

Example

```text
A --- B --- C  develop
       \
        D --- E feature
                 \
                  M
```

M represents the merge commit.

History remains unchanged.

---

# Merge Command

```bash
git checkout develop

git merge feature/docker-api-gateway
```

Git creates a merge commit if necessary.

---

# Advantages of Merge

- Complete history preserved
- Safe for shared branches
- Easy auditing
- Preferred for production repositories
- Works well with Pull Requests

---

# Disadvantages of Merge

- Extra merge commits
- History becomes more complex
- Busy repositories may contain many merge commits

---

# What is Rebase?

Rebase rewrites commit history.

Instead of creating a merge commit,

Git moves feature commits onto the latest branch.

Example

Before

```text
A --- B --- C develop
       \
        D --- E feature
```

After

```text
A --- B --- C --- D' --- E'
```

The commits receive new SHAs.

---

# Rebase Command

```bash
git checkout feature/docker-api-gateway

git rebase develop
```

The feature branch now starts from the latest develop commit.

---

# Advantages of Rebase

- Clean history
- Linear commit graph
- Easier navigation
- Fewer merge commits
- Better readability

---

# Disadvantages of Rebase

- Rewrites history
- Changes commit SHAs
- Dangerous on shared branches
- Can confuse team members if used incorrectly

---

# Merge vs Rebase Comparison

| Feature | Merge | Rebase |
|----------|--------|---------|
| History | Preserved | Rewritten |
| Merge Commit | Yes | No |
| Safe for Shared Branches | Yes | No |
| Clean History | Moderate | Excellent |
| Changes SHA | No | Yes |
| Preferred for Production | Yes | No |

---

# Merge in Our Project

Example

Developer completes

```text
feature/docker-api-gateway
```

Workflow

Feature Branch

↓

Pull Request

↓

Review

↓

GitHub Actions

↓

Merge into develop

↓

Release

↓

Production

Merge preserves the full development history.

---

# Rebase in Our Project

Example

Another developer merged changes into develop.

Before opening a Pull Request,

update the feature branch.

```bash
git checkout feature/docker-api-gateway

git fetch origin

git rebase origin/develop
```

Resolve conflicts if required.

Push using

```bash
git push --force-with-lease
```

Only when rebasing your own feature branch.

---

# Enterprise Workflow

Developer

↓

Feature Branch

↓

Rebase (optional)

↓

Pull Request

↓

Merge

↓

Develop

↓

Release

↓

Main

↓

Production

This workflow keeps feature branches current while protecting shared branches.

---

# Daily DevOps Activities

DevOps Engineers use Merge to

- Integrate infrastructure changes
- Merge deployment updates
- Merge Helm changes
- Merge Terraform updates

Rebase may be used before submitting a Pull Request to reduce unnecessary merge commits.

---

# Production Best Practices

- Merge shared branches.
- Rebase only local feature branches.
- Never rebase main.
- Never rebase release branches.
- Never rewrite production history.
- Review history before merging.

---

# Security Considerations

Rewriting history changes commit SHAs.

This affects

- Audit trails
- Signed commits
- Compliance records

Protected branches should never allow history rewriting.

---

# Troubleshooting

View history

```bash
git log --graph --decorate --oneline --all
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

Skip problematic commit

```bash
git rebase --skip
```

---

# Real Production Scenario

Scenario

A developer rebases the shared develop branch and force pushes it.

Impact

- Commit history changes
- Other developers cannot push
- CI pipelines fail
- Pull Requests become inconsistent

Resolution

- Restore branch
- Recover commits if required
- Disable force push
- Educate team

Lesson

Never rebase shared branches.

---

# Scenario-Based Interview Questions

## Question 1

When would you use Merge?

Answer

For integrating reviewed code into shared branches such as develop or main.

---

## Question 2

When would you use Rebase?

Answer

To update a local feature branch before opening a Pull Request and to maintain a cleaner commit history.

---

## Question 3

Can you rebase main?

Answer

No.

Shared production branches should not have rewritten history.

---

# Architecture-Level Interview Questions

## Question

Why do enterprises prefer Merge for production repositories?

Answer

Merge preserves the complete development history and supports auditing, compliance, and incident investigations.

---

## Question

Why does Rebase create new commit SHAs?

Answer

Because Git recreates the commits on a new base commit.

The commit contents remain similar, but the parent changes, resulting in new SHAs.

---

## Question

Why is force push dangerous after Rebase?

Answer

It replaces remote history.

Other developers may lose work or face synchronization issues.

---

# Production Support Questions

Q.

A deployment references a commit that disappeared after a force push.

Possible cause?

Answer

History may have been rewritten using Rebase and force push.

Investigate branch history and recover if necessary.

---

Q.

Develop suddenly shows unexpected commit history.

What should you check?

Answer

- Recent force pushes
- Rebase activity
- Branch protection rules
- Pull Request history

---

# Related Runbooks

Future runbooks

- Resolve Merge Conflict
- Recover Force Push
- Restore Deleted Branch
- Emergency Rollback

---

# Common Incidents

- Force push after Rebase
- Rebased shared branch
- Lost commits
- Merge conflicts
- Duplicate commits
- Broken Pull Requests

---

# Commands

Merge

```bash
git merge feature/docker-api-gateway
```

Rebase

```bash
git rebase develop
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

View graph

```bash
git log --graph --decorate --oneline --all
```

---

# Key Takeaways

Merge

- Safe
- Preserves history
- Preferred for shared branches

Rebase

- Creates linear history
- Rewrites commits
- Best for local feature branches

In our Enterprise DevOps Platform, Merge is the default strategy for shared branches, while Rebase is limited to keeping local feature branches up to date before creating Pull Requests.

---

# Marathi Quick Revision

Merge

- History कायम ठेवतो
- Merge commit तयार होतो
- Shared branches साठी योग्य

Rebase

- History rewrite करतो
- Commit SHA बदलतो
- फक्त local feature branch साठी वापरावा

Production branches वर Rebase करू नये.

---

# Marathi Interview Memory Tip

Interview मध्ये जर विचारलं:

"When do you use Merge vs Rebase?"

असं सांगा:

"Shared branches जसे develop आणि main साठी Merge वापरतो कारण history सुरक्षित राहते. Local feature branch update करण्यासाठी Rebase वापरतो, ज्यामुळे commit history clean राहते. Shared branches वर Rebase आणि force push टाळतो कारण त्यामुळे production history आणि collaboration वर परिणाम होऊ शकतो."

