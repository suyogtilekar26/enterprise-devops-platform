# Lab 01 - First GitHub Actions Workflow

# Objective

Create and execute your first GitHub Actions Workflow.

After completing this lab, you will be able to

- Create a Workflow
- Trigger it automatically
- View workflow logs
- Understand Runner execution
- Troubleshoot basic workflow failures

---

# Lab Architecture

```
Developer

↓

Push Code

↓

GitHub Repository

↓

Workflow Trigger

↓

GitHub-hosted Runner

↓

Execute Steps

↓

Workflow Success
```

---

# Prerequisites

- Git Installed
- GitHub Account
- Enterprise DevOps Platform Repository
- Repository already pushed to GitHub

---

# Step 1: Navigate to Repository

```bash
cd ~/devops-lab/enterprise-devops-platform
```

---

# Step 2: Create Workflow Directory

```bash
mkdir -p .github/workflows
```

Verify

```bash
tree .github
```

Expected Output

```
.github
└── workflows
```

---

# Step 3: Create Workflow File

```bash
nano .github/workflows/first-workflow.yml
```

---

# Step 4: Add Workflow

```yaml
name: First GitHub Actions Workflow

on:
  push:

jobs:
  hello-world:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Display Welcome Message
        run: echo "Welcome to GitHub Actions"

      - name: Display Current Date
        run: date

      - name: Display Current Directory
        run: pwd
```

Save the file.

---

# Step 5: Verify Workflow

```bash
cat .github/workflows/first-workflow.yml
```

---

# Step 6: Commit Changes

```bash
git add .

git commit -m "Add first GitHub Actions workflow"
```

---

# Step 7: Push to GitHub

```bash
git push origin main
```

---

# Step 8: Open GitHub

Navigate to

```
Repository

↓

Actions
```

You should see

```
First GitHub Actions Workflow
```

---

# Step 9: View Workflow Execution

Open

```
Actions

↓

First GitHub Actions Workflow

↓

hello-world
```

Observe each step

- Checkout Repository
- Display Welcome Message
- Display Current Date
- Display Current Directory

---

# Step 10: Verify Logs

Expected Output

```
Welcome to GitHub Actions
```

Example

```
Current directory:

/home/runner/work/enterprise-devops-platform
```

---

# Workflow Execution Flow

```
Push

↓

Workflow Triggered

↓

Runner Created

↓

Repository Checked Out

↓

Commands Executed

↓

Workflow Completed
```

---

# Validation Checklist

Verify

- Workflow file detected
- Workflow started automatically
- Runner created
- All steps completed
- Workflow marked successful

---

# Common Errors

## Workflow Not Visible

Cause

Workflow not inside

```
.github/workflows/
```

---

## Workflow Not Triggered

Cause

File not committed or pushed.

---

## YAML Syntax Error

Cause

Incorrect indentation.

YAML uses spaces only.

---

## Checkout Failed

Cause

Incorrect Action version.

Use

```yaml
actions/checkout@v4
```

---

# Troubleshooting

Check workflow file

```bash
ls .github/workflows
```

Check repository status

```bash
git status
```

Check latest commit

```bash
git log --oneline
```

Verify remote

```bash
git remote -v
```

---

# Expected Result

You should successfully

- Create a Workflow
- Push it to GitHub
- Trigger automatic execution
- View logs
- Understand Runner execution

---

# Lab Summary

In this lab you learned

- Workflow location
- Workflow syntax
- Push trigger
- GitHub-hosted Runner
- Workflow execution
- Workflow logs
- Basic troubleshooting

