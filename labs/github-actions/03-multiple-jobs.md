# Lab 03 - Multiple Jobs in GitHub Actions

# Objective

Learn how to create workflows with multiple Jobs and understand how Jobs execute in parallel or sequentially using dependencies.

After completing this lab, you will be able to

- Create multiple Jobs
- Execute Jobs in parallel
- Execute Jobs sequentially
- Use the needs keyword
- View Job dependencies

---

# Lab Architecture

```
                Workflow

                   │

        ┌──────────┴──────────┐

        │                     │

   Build Job             Test Job

        │                     │

        └──────────┬──────────┘

                   │

             Deploy Job

                   │

          Workflow Complete
```

---

# Prerequisites

- Lab 01 completed
- Lab 02 completed
- GitHub repository available
- GitHub Actions enabled

---

# Step 1: Create Workflow

```bash
nano .github/workflows/multiple-jobs.yml
```

---

# Step 2: Add Workflow

```yaml
name: Multiple Jobs Demo

on:
  push:
    branches:
      - main

jobs:

  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Build Step
        run: echo "Building application..."

  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Test Step
        run: echo "Running tests..."

  deploy:
    runs-on: ubuntu-latest

    needs:
      - build
      - test

    steps:
      - uses: actions/checkout@v4

      - name: Deploy Step
        run: echo "Deploying application..."
```

Save the file.

---

# Step 3: Verify Workflow

```bash
cat .github/workflows/multiple-jobs.yml
```

---

# Step 4: Commit Changes

```bash
git add .

git commit -m "Add multiple jobs workflow"
```

---

# Step 5: Push Changes

```bash
git push origin main
```

---

# Step 6: Open GitHub Actions

Navigate to

```
Repository

↓

Actions

↓

Multiple Jobs Demo
```

---

# Step 7: Observe Workflow

You should see

```
Build

↓

Completed

Test

↓

Completed

Deploy

↓

Completed
```

Notice

- Build and Test start together.
- Deploy waits for both Jobs.

---

# Parallel Execution

```
Workflow

↓

Build Job
        \
         \
          ---->

Workflow

↓

Test Job
```

Both Jobs execute simultaneously.

---

# Sequential Execution

```
Build

↓

Success

+

Test

↓

Success

↓

Deploy
```

Deploy starts only after Build and Test complete successfully.

---

# Understanding "needs"

Example

```yaml
needs:
  - build
  - test
```

Meaning

Deploy cannot start until

- Build succeeds
- Test succeeds

---

# Job Execution Timeline

```
Build Job

██████████

Test Job

██████████

Deploy Job

          ██████████
```

---

# Step 8: View Individual Job Logs

Open each Job

```
Build

↓

View Logs
```

Repeat for

- Test
- Deploy

---

# Expected Output

Build Job

```
Building application...
```

Test Job

```
Running tests...
```

Deploy Job

```
Deploying application...
```

---

# Validation Checklist

Verify

- Workflow executes successfully
- Three Jobs are visible
- Build and Test run simultaneously
- Deploy waits for both Jobs
- Logs are available for every Job

---

# Common Errors

## Deploy Never Starts

Cause

One dependency failed.

Verify

```
Build

Success

Test

Success
```

---

## Job Failed

Cause

One Step returned a non-zero exit code.

Review Job logs.

---

## Workflow Failed

Cause

YAML syntax issue.

Validate indentation.

---

## Missing needs

Without

```yaml
needs:
```

All Jobs execute independently.

---

# Troubleshooting

View workflow files

```bash
ls .github/workflows
```

Check Git status

```bash
git status
```

Review commit history

```bash
git log --oneline
```

View workflow YAML

```bash
cat .github/workflows/multiple-jobs.yml
```

---

# Enterprise Example

```
Checkout

↓

Build

↓

Unit Tests

↓

Security Scan

↓

Docker Build

↓

Push Image

↓

Deploy Staging

↓

Approval

↓

Deploy Production
```

Each stage is implemented as a separate Job.

---

# Expected Result

You should successfully

- Create multiple Jobs
- Execute Jobs in parallel
- Execute dependent Jobs
- Understand the needs keyword
- Read Job execution graphs

---

# Lab Summary

In this lab you learned

- Multiple Jobs
- Parallel execution
- Sequential execution
- Job dependencies
- needs keyword
- Workflow visualization
- Enterprise pipeline structure

