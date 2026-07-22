# Lab 08 - Matrix Builds in GitHub Actions

# Objective

Learn how to execute the same Job across multiple operating systems and Python versions using GitHub Actions Matrix Builds.

After completing this lab, you will be able to

- Create a Matrix Build
- Test multiple Python versions
- Test multiple operating systems
- Understand parallel execution
- Apply Matrix Builds in enterprise CI pipelines

---

# Lab Architecture

```
Developer

↓

Push Code

↓

Workflow

↓

Matrix Strategy

├───────────────┐
│               │
▼               ▼
Ubuntu        Windows
│               │
▼               ▼
Python 3.11   Python 3.11

├───────────────┐
│               │
▼               ▼
Ubuntu        Windows
│               │
▼               ▼
Python 3.12   Python 3.12

↓

Workflow Complete
```

---

# Prerequisites

- Lab 01 completed
- GitHub repository
- GitHub Actions enabled

---

# What is a Matrix Build?

A Matrix Build allows GitHub Actions to execute the same Job multiple times using different combinations of operating systems, programming language versions, or other variables.

Instead of writing multiple Jobs, one Job automatically expands into multiple executions.

---

# Step 1: Create Workflow

```bash
nano .github/workflows/matrix-build.yml
```

---

# Step 2: Add Workflow

```yaml
name: Matrix Build Demo

on:
  push:
    branches:
      - main

jobs:

  matrix-demo:

    strategy:
      matrix:
        os:
          - ubuntu-latest
          - windows-latest

        python-version:
          - "3.11"
          - "3.12"

    runs-on: ${{ matrix.os }}

    steps:

      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Setup Python
        uses: actions/setup-python@v5
        with:
          python-version: ${{ matrix.python-version }}

      - name: Display Operating System
        run: echo "Operating System: ${{ matrix.os }}"

      - name: Display Python Version
        run: python --version
```

Save the file.

---

# Step 3: Verify Workflow

```bash
cat .github/workflows/matrix-build.yml
```

---

# Step 4: Commit Changes

```bash
git add .

git commit -m "Add matrix build workflow"
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

Matrix Build Demo
```

---

# Step 7: Observe Workflow

GitHub automatically creates four Job executions.

Expected

```
Ubuntu + Python 3.11

Ubuntu + Python 3.12

Windows + Python 3.11

Windows + Python 3.12
```

---

# Matrix Expansion

GitHub expands

```yaml
os:
  - ubuntu-latest
  - windows-latest

python-version:
  - "3.11"
  - "3.12"
```

into

```
Ubuntu + Python 3.11

Ubuntu + Python 3.12

Windows + Python 3.11

Windows + Python 3.12
```

---

# Parallel Execution

```
Workflow

↓

Matrix

├────────────┬────────────┬────────────┬────────────┐
│            │            │            │
▼            ▼            ▼            ▼
Job 1      Job 2       Job 3       Job 4

↓

Workflow Complete
```

---

# Validation Checklist

Verify

- Workflow starts
- Four Jobs created
- All Jobs execute
- Python versions displayed
- Operating systems displayed
- Workflow succeeds

---

# Common Errors

## Matrix Not Created

Cause

Incorrect YAML indentation.

---

## Python Setup Failed

Cause

Unsupported Python version.

Verify

```yaml
python-version:
```

---

## Runner Not Available

Cause

Invalid operating system name.

Supported examples

```
ubuntu-latest

windows-latest

macos-latest
```

---

## Workflow Failed

Cause

Incorrect matrix syntax.

Review the

```yaml
strategy:
  matrix:
```

section.

---

# Troubleshooting

View workflow

```bash
cat .github/workflows/matrix-build.yml
```

Check repository status

```bash
git status
```

Check commit history

```bash
git log --oneline
```

Verify workflow files

```bash
ls .github/workflows
```

---

# Enterprise Example

A production Python application may be tested against

```
Ubuntu

↓

Python 3.10

Python 3.11

Python 3.12
```

A Node.js application may be tested against

```
Ubuntu

Windows

macOS

↓

Node 18

Node 20

Node 22
```

This ensures compatibility across supported environments.

---

# Benefits of Matrix Builds

- Parallel execution
- Less YAML
- Better compatibility testing
- Faster validation
- Easier maintenance

---

# Best Practices

Always

- Test supported versions
- Keep matrix combinations manageable
- Use parallel execution wisely
- Review failed combinations individually

Never

- Test unsupported versions
- Create unnecessarily large matrices
- Ignore failed matrix jobs

---

# Expected Result

You should successfully

- Configure a Matrix Build
- Execute multiple Jobs automatically
- Test multiple operating systems
- Test multiple Python versions
- Understand enterprise compatibility testing

---

# Lab Summary

In this lab you learned

- Matrix Builds
- Matrix strategy
- Parallel execution
- Multi-platform testing
- Multi-version testing
- Enterprise CI compatibility testing

