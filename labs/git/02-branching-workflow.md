# Lab 02 - Enterprise Git Branching Workflow

## Objective

In this lab, you will learn how enterprise teams use Git branches to isolate development, collaborate safely, and prepare code for releases.

---

# Lab Scenario

Your team has received a new feature request.

Instead of developing directly on the main branch, you will create a feature branch, make changes, merge them back into main, and clean up the repository following enterprise Git practices.

---

# Prerequisites

- Lab 01 completed
- Git repository initialized
- Initial commit available

Verify

```bash
git status
```

Expected

```text
nothing to commit, working tree clean
```

---

# Enterprise Branch Strategy

```text
main

│

├── feature/login-page

├── feature/dashboard-api

├── bugfix/auth-token

└── hotfix/login-crash
```

---

# Step 1 - View Current Branch

```bash
git branch
```

Expected

```text
* main
```

---

# Step 2 - Create Feature Branch

```bash
git checkout -b feature/readme-update
```

Verify

```bash
git branch
```

Expected

```text
* feature/readme-update
  main
```

---

# Step 3 - Create Sample File

```bash
echo "# Enterprise DevOps Platform" > README.md
```

Verify

```bash
cat README.md
```

---

# Step 4 - Check Repository Status

```bash
git status
```

Expected

```text
modified:
README.md
```

or

```text
Untracked files:
README.md
```

---

# Step 5 - Stage Changes

```bash
git add README.md
```

Verify

```bash
git status
```

---

# Step 6 - Commit Changes

```bash
git commit -m "Add project README"
```

---

# Step 7 - View Commit History

```bash
git log --oneline --graph
```

Expected

```text
* Add project README
* Initial project structure
```

---

# Step 8 - Switch Back to Main

```bash
git checkout main
```

Verify

```bash
git branch
```

Expected

```text
* main
feature/readme-update
```

---

# Step 9 - Merge Feature Branch

```bash
git merge feature/readme-update
```

Expected

```text
Fast-forward
```

---

# Step 10 - Verify Merge

```bash
git log --oneline --graph
```

Expected

```text
* Add project README
* Initial project structure
```

---

# Step 11 - Delete Feature Branch

```bash
git branch -d feature/readme-update
```

Verify

```bash
git branch
```

Expected

```text
* main
```

---

# Step 12 - Verify Repository

```bash
git status
```

Expected

```text
nothing to commit, working tree clean
```

---

# Enterprise Workflow

```text
main

↓

Create Feature Branch

↓

Develop

↓

Commit

↓

Merge

↓

Delete Branch

↓

Continue Development
```

---

# Verification Checklist

- Feature branch created
- Changes committed
- Branch merged
- Feature branch deleted
- Working tree clean

---

# Troubleshooting

## Branch already exists

List branches

```bash
git branch
```

Delete if no longer needed

```bash
git branch -d feature/readme-update
```

---

## Merge conflict

Check status

```bash
git status
```

Resolve conflicts manually.

Stage resolved files

```bash
git add .
```

Complete merge

```bash
git commit
```

---

## Cannot delete branch

Ensure you are on another branch

```bash
git checkout main
```

Then delete

```bash
git branch -d feature/readme-update
```

---

# Production Best Practices

- Never develop directly on the main branch.
- Use descriptive branch names.
- Keep feature branches short-lived.
- Merge only tested code.
- Delete merged branches.
- Keep commit messages meaningful.

---

# Lab Completion Criteria

You have successfully completed this lab if:

- A feature branch was created.
- Changes were committed.
- The branch was merged into main.
- The feature branch was deleted.
- The repository is clean and ready for the next feature.

