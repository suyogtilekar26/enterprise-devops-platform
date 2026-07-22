# Lab 04 - Using GitHub Actions

# Objective

Learn how to use reusable GitHub Actions from the GitHub Marketplace instead of writing every task manually.

After completing this lab, you will be able to

- Use Marketplace Actions
- Configure reusable Actions
- Understand the `uses` keyword
- Combine Actions with shell commands
- Read Action documentation

---

# Lab Architecture

```
Developer

↓

Push Code

↓

Workflow

↓

GitHub Runner

↓

Checkout Action

↓

Setup Python Action

↓

Run Commands

↓

Workflow Complete
```

---

# Prerequisites

- Lab 01 completed
- Lab 02 completed
- Lab 03 completed
- GitHub repository
- GitHub Actions enabled

---

# Step 1: Create Workflow

```bash
nano .github/workflows/using-actions.yml
```

---

# Step 2: Add Workflow

```yaml
name: Using GitHub Actions

on:
  push:
    branches:
      - main

jobs:

  demo-actions:

    runs-on: ubuntu-latest

    steps:

      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Setup Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.12'

      - name: Display Python Version
        run: python --version

      - name: Display Git Version
        run: git --version

      - name: Display Current Directory
        run: pwd

      - name: List Repository Files
        run: ls -la

      - name: Print Success Message
        run: echo "GitHub Actions executed successfully."
```

Save the file.

---

# Step 3: Verify Workflow

```bash
cat .github/workflows/using-actions.yml
```

---

# Step 4: Commit Changes

```bash
git add .

git commit -m "Add GitHub Actions marketplace demo"
```

---

# Step 5: Push Changes

```bash
git push origin main
```

---

# Step 6: Open GitHub

Navigate to

```
Repository

↓

Actions

↓

Using GitHub Actions
```

---

# Step 7: Observe Workflow Execution

You should see

```
Checkout Repository

↓

Setup Python

↓

Display Python Version

↓

Display Git Version

↓

Display Current Directory

↓

List Repository Files

↓

Print Success Message
```

---

# Step 8: Verify Logs

Expected Output

Python Version

```
Python 3.12.x
```

Git Version

```
git version 2.x.x
```

Working Directory

```
/home/runner/work/enterprise-devops-platform
```

Repository Files

```
README.md

.github

frontend

api-gateway

auth-service

dashboard-service
```

Success Message

```
GitHub Actions executed successfully.
```

---

# Understanding "uses"

The keyword

```yaml
uses:
```

executes an existing GitHub Action.

Example

```yaml
uses: actions/checkout@v4
```

downloads your repository into the Runner.

---

Another Example

```yaml
uses: actions/setup-python@v5
```

installs Python automatically.

Without this Action, you would need to install Python manually.

---

# Understanding "run"

The keyword

```yaml
run:
```

executes shell commands.

Example

```yaml
run: python --version
```

Example

```yaml
run: ls -la
```

---

# Difference

```
uses

↓

Runs a reusable Action
```

```
run

↓

Executes shell commands
```

---

# Workflow Execution

```
Push

↓

Runner Created

↓

Checkout Action

↓

Setup Python Action

↓

Execute Shell Commands

↓

Workflow Completed
```

---

# Validation Checklist

Verify

- Workflow starts automatically
- Checkout Action succeeds
- Python installs successfully
- Python version displayed
- Git version displayed
- Repository files listed
- Workflow completes successfully

---

# Common Errors

## Action Not Found

Cause

Incorrect Action name.

Correct

```yaml
uses: actions/checkout@v4
```

---

## Invalid Version

Cause

Incorrect version tag.

Always use supported versions.

---

## Python Command Failed

Cause

Setup Action missing.

Verify

```yaml
uses: actions/setup-python@v5
```

appears before

```yaml
python --version
```

---

## YAML Syntax Error

Cause

Incorrect indentation.

YAML is space-sensitive.

---

# Troubleshooting

View workflow

```bash
cat .github/workflows/using-actions.yml
```

Check repository status

```bash
git status
```

View commit history

```bash
git log --oneline
```

List workflow files

```bash
ls .github/workflows
```

---

# Enterprise Example

A production workflow commonly uses

```
actions/checkout

↓

actions/setup-node

↓

actions/cache

↓

docker/login-action

↓

docker/build-push-action

↓

actions/upload-artifact
```

Instead of writing everything manually.

---

# Expected Result

You should successfully

- Use Marketplace Actions
- Install Python automatically
- Execute shell commands
- Understand uses vs run
- Read workflow logs

---

# Lab Summary

In this lab you learned

- GitHub Marketplace Actions
- uses keyword
- run keyword
- Checkout Action
- Setup Python Action
- Combining Actions and shell commands
- Enterprise Action usage

