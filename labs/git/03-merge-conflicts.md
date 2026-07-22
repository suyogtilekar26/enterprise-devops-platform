# Lab 03 - Resolve Git Merge Conflicts

## Objective

In this lab, you will intentionally create a Git merge conflict and learn how to investigate, resolve, and complete the merge using enterprise best practices.

---

# Lab Scenario

Two developers are working on the same file.

Developer A modifies the file on the main branch.

Developer B modifies the same line on a feature branch.

When the feature branch is merged, Git cannot automatically determine which change should be kept.

As the DevOps Engineer, you must resolve the conflict.

---

# Prerequisites

- Lab 02 completed
- Repository initialized
- Working tree clean

Verify

```bash
git status
```

Expected

```text
nothing to commit, working tree clean
```

---

# Initial Repository

Create a sample file

```bash
echo "Enterprise DevOps Platform" > project.txt
```

Stage

```bash
git add project.txt
```

Commit

```bash
git commit -m "Add project file"
```

---

# Step 1 - Create Feature Branch

```bash
git checkout -b feature/update-project
```

---

# Step 2 - Modify File

```bash
echo "Enterprise DevOps Platform - Feature Branch" > project.txt
```

Verify

```bash
cat project.txt
```

---

# Step 3 - Commit Feature Change

```bash
git add project.txt
```

```bash
git commit -m "Update project file from feature branch"
```

---

# Step 4 - Switch to Main

```bash
git checkout main
```

---

# Step 5 - Modify Same Line

```bash
echo "Enterprise DevOps Platform - Main Branch" > project.txt
```

Verify

```bash
cat project.txt
```

---

# Step 6 - Commit Main Branch Change

```bash
git add project.txt
```

```bash
git commit -m "Update project file from main branch"
```

---

# Step 7 - Merge Feature Branch

```bash
git merge feature/update-project
```

Expected

```text
CONFLICT (content)
Automatic merge failed
```

---

# Step 8 - Verify Conflict

```bash
git status
```

Expected

```text
both modified
```

---

# Step 9 - View Conflict

```bash
cat project.txt
```

Expected

```text
<<<<<<< HEAD
Enterprise DevOps Platform - Main Branch
=======
Enterprise DevOps Platform - Feature Branch
>>>>>>> feature/update-project
```

---

# Step 10 - Resolve Conflict

Edit the file

Example

```text
Enterprise DevOps Platform
Main Branch + Feature Branch Changes
```

Save the file.

---

# Step 11 - Stage Resolved File

```bash
git add project.txt
```

---

# Step 12 - Complete Merge

```bash
git commit
```

Git opens the default editor.

Save the merge commit message.

---

# Step 13 - Verify History

```bash
git log --oneline --graph --all
```

Expected

```text
Merge branch 'feature/update-project'

Update project file from feature branch

Update project file from main branch
```

---

# Step 14 - Delete Feature Branch

```bash
git branch -d feature/update-project
```

---

# Enterprise Merge Conflict Workflow

```text
Developer A

↓

Main Branch

↓

Developer B

↓

Feature Branch

↓

Merge

↓

Conflict

↓

Resolve

↓

Commit

↓

Delete Branch
```

---

# Verification Checklist

- Conflict created
- Conflict identified
- File manually resolved
- Merge commit completed
- Feature branch deleted

---

# Troubleshooting

## Merge aborted

Abort merge

```bash
git merge --abort
```

Retry merge.

---

## Wrong resolution

Restore file

```bash
git checkout --theirs project.txt
```

or

```bash
git checkout --ours project.txt
```

Edit again.

---

## Forgot to stage

```bash
git add project.txt
```

Then

```bash
git commit
```

---

# Production Best Practices

- Pull latest changes before creating a feature branch.
- Keep feature branches short-lived.
- Resolve conflicts immediately.
- Review every conflicting change carefully.
- Never blindly accept incoming changes.
- Test the application after resolving conflicts.
- Delete merged branches.

---

# Real Production Scenario

Two developers update the authentication configuration.

Developer A changes JWT validation.

Developer B changes authentication logging.

Both modify the same configuration file.

Git reports a merge conflict.

The DevOps Engineer reviews both implementations, combines the required changes, validates the application, completes the merge, and deploys the updated code.

---

# Lab Completion Criteria

You have successfully completed this lab if:

- A merge conflict was intentionally created.
- The conflict was manually resolved.
- The merge completed successfully.
- Git history contains the merge commit.
- The repository is clean and ready for further development.

