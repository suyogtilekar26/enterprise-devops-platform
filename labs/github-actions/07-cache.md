# Lab 07 - Using GitHub Actions Cache

# Objective

Learn how to use GitHub Actions Cache to speed up workflow execution by reusing downloaded dependencies.

After completing this lab, you will be able to

- Configure dependency caching
- Understand cache keys
- Observe cache hits and misses
- Improve workflow performance
- Apply caching in enterprise CI pipelines

---

# Lab Architecture

```
Developer

↓

Push Code

↓

Workflow

↓

Runner

↓

Restore Cache

↓

Install Dependencies

↓

Save Cache

↓

Workflow Complete
```

---

# Prerequisites

- Lab 01 completed
- GitHub repository
- GitHub Actions enabled

---

# What is Cache?

Cache stores reusable dependencies between workflow runs.

Instead of downloading dependencies every time, GitHub restores them from cache.

Examples

- npm packages
- pip packages
- Maven dependencies
- Gradle dependencies

---

# Step 1: Create Workflow

```bash
nano .github/workflows/cache-demo.yml
```

---

# Step 2: Add Workflow

```yaml
name: Cache Demo

on:
  push:
    branches:
      - main

jobs:

  cache-demo:

    runs-on: ubuntu-latest

    steps:

      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Setup Python
        uses: actions/setup-python@v5
        with:
          python-version: "3.12"

      - name: Restore pip Cache
        uses: actions/cache@v4
        with:
          path: ~/.cache/pip
          key: pip-${{ runner.os }}-${{ hashFiles('**/requirements.txt') }}
          restore-keys: |
            pip-${{ runner.os }}-

      - name: Install Dependency
        run: pip install requests

      - name: Verify Installation
        run: pip show requests
```

Save the file.

---

# Step 3: Verify Workflow

```bash
cat .github/workflows/cache-demo.yml
```

---

# Step 4: Commit Changes

```bash
git add .

git commit -m "Add cache demo workflow"
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

Cache Demo
```

---

# Step 7: Observe First Execution

The first execution normally shows

```
Cache not found
```

because no cache exists yet.

The workflow completes successfully and saves the cache.

---

# Step 8: Push Another Commit

```bash
echo "# Cache Demo" >> README.md

git add README.md

git commit -m "Trigger cache workflow"

git push origin main
```

---

# Step 9: Observe Second Execution

Expected

```
Cache restored successfully
```

Dependency installation is faster because cached files are reused.

---

# Cache Lifecycle

```
First Run

↓

Cache Miss

↓

Download Dependencies

↓

Save Cache

-------------------

Second Run

↓

Cache Hit

↓

Restore Dependencies

↓

Faster Workflow
```

---

# Understanding Cache Keys

Example

```yaml
key: pip-${{ runner.os }}-${{ hashFiles('**/requirements.txt') }}
```

Components

```
pip

↓

Operating System

↓

Hash of requirements.txt
```

Whenever the dependency file changes, GitHub creates a new cache.

---

# Restore Keys

Example

```yaml
restore-keys: |
  pip-${{ runner.os }}-
```

If an exact cache key is unavailable, GitHub attempts a partial match.

---

# Validation Checklist

Verify

- Workflow completed
- Cache created
- Second execution restored cache
- Dependency installed successfully
- Workflow execution became faster

---

# Common Errors

## Cache Not Restored

Cause

Cache does not exist.

Run the workflow again.

---

## Cache Always Misses

Cause

Cache key changes every execution.

Review the

```yaml
key:
```

configuration.

---

## Wrong Cache Path

Cause

Incorrect directory configured.

Verify

```yaml
path: ~/.cache/pip
```

---

## Dependency Downloaded Every Time

Cause

Cache not restored successfully.

Check workflow logs.

---

# Troubleshooting

View workflow

```bash
cat .github/workflows/cache-demo.yml
```

Check repository status

```bash
git status
```

View commit history

```bash
git log --oneline
```

Verify workflow files

```bash
ls .github/workflows
```

---

# Enterprise Example

Large applications commonly cache

```
npm

↓

pip

↓

Maven

↓

Gradle

↓

Composer

↓

Cargo
```

Benefits

- Faster builds
- Reduced network usage
- Lower CI costs
- Better developer experience

---

# Cache vs Artifact

| Cache | Artifact |
|--------|----------|
| Dependency reuse | Build output |
| Speeds up builds | Stores results |
| Automatically restored | Manually downloaded |
| Performance optimization | Reporting and distribution |

---

# Best Practices

Always

- Cache dependency directories
- Use meaningful cache keys
- Include dependency file hashes
- Use restore keys
- Monitor cache effectiveness

Never

- Cache secrets
- Cache temporary files
- Cache unnecessary directories

---

# Expected Result

You should successfully

- Configure dependency caching
- Observe cache miss and cache hit
- Improve workflow speed
- Understand cache keys
- Apply caching in enterprise CI pipelines

---

# Lab Summary

In this lab you learned

- Dependency caching
- Cache keys
- Restore keys
- Cache lifecycle
- Cache troubleshooting
- Enterprise caching best practices

