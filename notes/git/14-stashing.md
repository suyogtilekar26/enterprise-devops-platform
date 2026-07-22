# Git Stashing

## Purpose

This document explains Git Stash from an Enterprise DevOps perspective.

Git Stash allows developers and DevOps engineers to temporarily save uncommitted work without creating a commit.

Stashing is useful when you need to quickly switch tasks while preserving your current changes.

---

# What is Git Stash?

Git Stash temporarily stores uncommitted changes outside the working directory.

It allows you to

- Save current work
- Return the repository to a clean state
- Switch branches
- Apply the saved changes later

Think of Git Stash as a temporary workspace.

---

# Enterprise Usage

Git Stash is commonly used when

- Production incidents occur
- Urgent hotfixes are required
- Code review interrupts development
- Release support requires switching branches
- Infrastructure changes need to be paused

Stash prevents incomplete work from being committed.

---

# How Git Stash Works

Working Directory

↓

Modified Files

↓

Git Stash

↓

Clean Working Directory

↓

Switch Branch

↓

Complete Urgent Work

↓

Return

↓

Apply Stash

↓

Continue Development

---

# Save Changes

Save tracked files.

```bash
git stash
```

Git stores

- Modified files
- Staged files

Repository becomes clean.

---

# Save with Message

Recommended.

```bash
git stash push -m "Dockerfile optimization"
```

Meaningful messages make stashes easier to identify.

---

# View Stashes

```bash
git stash list
```

Example

```text
stash@{0}: On feature/docker: Dockerfile optimization

stash@{1}: On develop: Helm updates
```

Newest stash appears first.

---

# Show Stash Details

```bash
git stash show
```

Detailed view

```bash
git stash show -p
```

Displays the exact changes stored in the stash.

---

# Apply Latest Stash

```bash
git stash apply
```

The stash remains available after applying.

---

# Apply Specific Stash

```bash
git stash apply stash@{1}
```

Useful when multiple stashes exist.

---

# Pop a Stash

```bash
git stash pop
```

Difference

Apply

↓

Keeps stash

Pop

↓

Applies

+

Deletes stash

---

# Delete One Stash

```bash
git stash drop stash@{0}
```

Removes only the specified stash.

---

# Delete All Stashes

```bash
git stash clear
```

Use carefully.

All saved stashes are permanently removed.

---

# Stashing Untracked Files

Default stash ignores untracked files.

Include them

```bash
git stash -u
```

Include ignored files

```bash
git stash -a
```

---

# Git Stash in Our Project

Example

You are updating

```text
terraform/

Dockerfile

helm/

kubernetes/
```

Before finishing,

Production reports

API Gateway outage.

Workflow

```text
git stash

↓

git checkout hotfix/api-gateway

↓

Fix Issue

↓

Deploy

↓

git checkout feature/docker

↓

git stash pop
```

Development continues without losing work.

---

# Daily DevOps Activities

DevOps Engineers use Git Stash when

- Production incidents interrupt work
- Emergency deployments occur
- Reviewing another Pull Request
- Testing another branch
- Investigating failed deployments

---

# Production Best Practices

- Use descriptive stash messages.
- Avoid keeping stashes for long periods.
- Apply and remove completed stashes.
- Never use stash as permanent storage.
- Commit completed work instead of accumulating stashes.

---

# Security Considerations

Stashes may contain

- Secrets
- Configuration
- Infrastructure code

Although local,

stashes are still stored in the repository metadata.

Handle sensitive data carefully.

---

# Troubleshooting

View stashes

```bash
git stash list
```

Inspect stash

```bash
git stash show -p
```

Apply stash

```bash
git stash apply
```

Pop stash

```bash
git stash pop
```

Delete stash

```bash
git stash drop
```

Clear all

```bash
git stash clear
```

---

# Real Production Scenario

Scenario

A DevOps Engineer is updating Terraform modules.

A production Kubernetes outage occurs.

Instead of creating an incomplete commit,

the engineer

```bash
git stash
```

switches to

```text
hotfix/kubernetes
```

resolves the incident,

returns,

and restores work using

```bash
git stash pop
```

No unfinished code enters Git history.

---

# Scenario-Based Interview Questions

## Question 1

Why use Git Stash instead of creating a temporary commit?

Answer

Temporary commits pollute Git history.

Stash keeps unfinished work local until it is ready.

---

## Question 2

What is the difference between

apply

and

pop?

Answer

Apply restores changes but keeps the stash.

Pop restores changes and removes the stash.

---

## Question 3

When should Git Stash NOT be used?

Answer

For long-term storage.

Completed work should be committed rather than left in stashes.

---

# Architecture-Level Interview Questions

## Question

Where does Git store stashes?

Answer

Git stores them locally in the repository as special references.

They are not automatically shared with remote repositories.

---

## Question

Can Git Stash replace commits?

Answer

No.

Stash is temporary.

Commits provide permanent history.

---

## Question

Why should enterprise engineers minimize long-lived stashes?

Answer

Because forgotten stashes

- Increase confusion
- Delay integration
- Risk losing unfinished work

---

# Production Support Questions

Q.

A production incident interrupts infrastructure work.

What should you do?

Answer

Stash unfinished work,

switch to the hotfix branch,

resolve the incident,

then restore the stash afterward.

---

Q.

A developer cannot find yesterday's unfinished work.

What should you check?

Answer

Review

```bash
git stash list
```

The work may have been stashed instead of committed.

---

# Related Runbooks

Future runbooks

- Emergency Hotfix
- Switch Branch During Incident
- Recover Stashed Work
- Resume Interrupted Deployment

---

# Common Incidents

- Forgotten stashes
- Applying the wrong stash
- Stash conflicts
- Long-lived unfinished work
- Lost productivity due to unmanaged stashes

---

# Commands

Create stash

```bash
git stash
```

Create named stash

```bash
git stash push -m "message"
```

List stashes

```bash
git stash list
```

Show stash

```bash
git stash show -p
```

Apply stash

```bash
git stash apply
```

Pop stash

```bash
git stash pop
```

Delete stash

```bash
git stash drop stash@{0}
```

Clear all stashes

```bash
git stash clear
```

---

# Key Takeaways

Git Stash provides temporary storage for unfinished work.

It is ideal for

- Context switching
- Production incidents
- Hotfixes
- Branch changes

Use Stash for temporary work and commits for permanent history.

---

# Marathi Quick Revision

Git Stash म्हणजे uncommitted changes तात्पुरते save करणे.

Flow

Work सुरू

↓

git stash

↓

Hotfix

↓

Production Fix

↓

git stash pop

↓

पुन्हा काम सुरू

Incomplete work commit करण्यापेक्षा stash वापरणे चांगले.

---

# Marathi Interview Memory Tip

Interview मध्ये जर विचारलं:

"When do you use Git Stash?"

असं सांगा:

"Production incident किंवा urgent hotfix आल्यावर incomplete work commit न करता मी git stash वापरतो. Incident पूर्ण झाल्यावर git stash pop करून पूर्वीचे काम पुन्हा सुरू करतो. त्यामुळे Git history स्वच्छ राहते आणि unfinished commits टाळता येतात."

