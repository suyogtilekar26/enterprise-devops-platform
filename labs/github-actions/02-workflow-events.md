# Lab 02 - GitHub Actions Workflow Events

# Objective

Learn how different GitHub events trigger GitHub Actions workflows.

After completing this lab, you will understand

- Push event
- Pull Request event
- Manual workflow execution
- Multiple event triggers
- Event filtering

---

# Lab Architecture

```
Developer

↓

GitHub Event

↓

Workflow Trigger

↓

Runner

↓

Execute Jobs

↓

Workflow Complete
```

---

# Prerequisites

- Lab 01 completed
- GitHub repository available
- GitHub Actions enabled

---

# Step 1: Create a New Workflow

```bash
nano .github/workflows/workflow-events.yml
```

---

# Step 2: Add Workflow Configuration

```yaml
name: Workflow Events Demo

on:
  push:
    branches:
      - main

  pull_request:
    branches:
      - main

  workflow_dispatch:

jobs:
  event-demo:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Display Event Name
        run: echo "Triggered by ${{ github.event_name }}"

      - name: Display Branch
        run: echo "Branch is ${{ github.ref_name }}"

      - name: Display Repository
        run: echo "Repository is ${{ github.repository }}"
```

Save the file.

---

# Step 3: Verify Workflow

```bash
cat .github/workflows/workflow-events.yml
```

---

# Step 4: Commit Changes

```bash
git add .

git commit -m "Add workflow events demo"
```

---

# Step 5: Push Changes

```bash
git push origin main
```

---

# Step 6: Verify Push Event

Open GitHub

```
Repository

↓

Actions

↓

Workflow Events Demo
```

Expected Trigger

```
push
```

---

# Step 7: Review Logs

Expected Output

```
Triggered by push
```

Example

```
Branch is main
```

---

# Step 8: Create Feature Branch

```bash
git checkout -b feature/workflow-events
```

---

# Step 9: Make a Small Change

```bash
echo "# Workflow Events Lab" >> README.md
```

---

# Step 10: Commit the Change

```bash
git add README.md

git commit -m "Update README for workflow events lab"
```

---

# Step 11: Push Feature Branch

```bash
git push origin feature/workflow-events
```

---

# Step 12: Create Pull Request

On GitHub

```
Repository

↓

Pull Requests

↓

New Pull Request

↓

feature/workflow-events

↓

main

↓

Create Pull Request
```

---

# Step 13: Verify Pull Request Event

Open

```
Actions

↓

Workflow Events Demo
```

Expected Output

```
Triggered by pull_request
```

---

# Step 14: Execute Workflow Manually

Open

```
Repository

↓

Actions

↓

Workflow Events Demo

↓

Run Workflow

↓

Select Branch

↓

Run Workflow
```

---

# Step 15: Verify Manual Execution

Expected Output

```
Triggered by workflow_dispatch
```

---

# Event Flow

```
Push

↓

Workflow

↓

Runner
```

```
Pull Request

↓

Workflow

↓

Runner
```

```
Manual Run

↓

Workflow

↓

Runner
```

---

# Validation Checklist

Verify

- Push triggers workflow
- Pull Request triggers workflow
- Manual execution works
- Event name is displayed
- Branch name is displayed
- Repository name is displayed

---

# Common Errors

## Workflow Not Triggered

Cause

Incorrect event configuration.

Verify

```yaml
on:
  push:
```

---

## Manual Run Button Missing

Cause

Missing

```yaml
workflow_dispatch:
```

---

## Pull Request Not Triggered

Cause

Wrong target branch.

Verify

```yaml
pull_request:
  branches:
    - main
```

---

## YAML Syntax Error

Cause

Incorrect indentation.

Use spaces consistently.

---

# Troubleshooting

Check workflow file

```bash
cat .github/workflows/workflow-events.yml
```

Verify branch

```bash
git branch
```

Check repository status

```bash
git status
```

View latest commits

```bash
git log --oneline
```

---

# Expected Result

You should successfully

- Trigger workflow on push
- Trigger workflow on pull request
- Execute workflow manually
- Identify triggering event
- Understand GitHub event-based automation

---

# Lab Summary

In this lab you learned

- Push events
- Pull Request events
- Manual workflow execution
- Event filtering
- Workflow verification
- Event troubleshooting

