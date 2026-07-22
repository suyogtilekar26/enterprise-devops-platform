# Lab 05 - Using GitHub Secrets

# Objective

Learn how to securely store and use sensitive information in GitHub Actions using GitHub Secrets.

After completing this lab, you will be able to

- Create Repository Secrets
- Access Secrets in Workflows
- Understand secret masking
- Use environment variables
- Follow enterprise security practices

---

# Lab Architecture

```
Developer

↓

GitHub Repository

↓

Repository Secret

↓

Workflow

↓

Runner

↓

Environment Variable

↓

Application
```

---

# Prerequisites

- Lab 01 completed
- GitHub repository
- GitHub Actions enabled

---

# What are GitHub Secrets?

Secrets are encrypted values stored securely in GitHub.

Examples

- API Tokens
- Passwords
- SSH Keys
- Docker Credentials
- Cloud Credentials

Secrets are never stored in your repository.

---

# Step 1: Open Repository Settings

Navigate to

```
Repository

↓

Settings

↓

Secrets and variables

↓

Actions
```

---

# Step 2: Create a Repository Secret

Click

```
New repository secret
```

Name

```
DEMO_SECRET
```

Value

```
HelloFromGitHubSecrets
```

Click

```
Add secret
```

---

# Step 3: Create Workflow

```bash
nano .github/workflows/github-secrets.yml
```

---

# Step 4: Add Workflow

```yaml
name: GitHub Secrets Demo

on:
  push:
    branches:
      - main

jobs:

  secrets-demo:

    runs-on: ubuntu-latest

    env:
      DEMO_MESSAGE: ${{ secrets.DEMO_SECRET }}

    steps:

      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Display Secret Length
        run: echo "Secret loaded successfully."

      - name: Verify Secret Exists
        run: |
          if [ -z "$DEMO_MESSAGE" ]; then
            echo "Secret not found."
            exit 1
          else
            echo "Secret is available."
          fi

      - name: Display Environment Variable Name
        run: echo "Environment variable configured."
```

Save the file.

---

# Step 5: Verify Workflow

```bash
cat .github/workflows/github-secrets.yml
```

---

# Step 6: Commit Changes

```bash
git add .

git commit -m "Add GitHub Secrets lab"
```

---

# Step 7: Push Changes

```bash
git push origin main
```

---

# Step 8: Open GitHub Actions

Navigate to

```
Repository

↓

Actions

↓

GitHub Secrets Demo
```

---

# Step 9: Verify Workflow

Expected Output

```
Secret loaded successfully.
```

```
Secret is available.
```

The actual secret value should NOT appear.

---

# Secret Masking

If a workflow accidentally prints a secret

Example

```bash
echo $DEMO_MESSAGE
```

GitHub automatically masks the value.

Example

Instead of

```
HelloFromGitHubSecrets
```

You will see

```
***
```

---

# Accessing Secrets

Repository Secret

```yaml
${{ secrets.DEMO_SECRET }}
```

Environment Variable

```yaml
env:
  DEMO_MESSAGE: ${{ secrets.DEMO_SECRET }}
```

Shell

```bash
echo "$DEMO_MESSAGE"
```

---

# Workflow Execution

```
Push

↓

Workflow

↓

Runner

↓

Load Secret

↓

Execute Steps

↓

Workflow Complete
```

---

# Validation Checklist

Verify

- Secret created
- Workflow executes
- Secret available
- Secret not displayed
- Workflow successful

---

# Common Errors

## Secret Not Found

Cause

Incorrect secret name.

Verify

```
DEMO_SECRET
```

matches

```yaml
${{ secrets.DEMO_SECRET }}
```

---

## Workflow Failed

Cause

Secret missing.

Create the Repository Secret before running the workflow.

---

## Secret Printed

GitHub masks the value automatically.

Never intentionally print secrets.

---

## YAML Syntax Error

Cause

Incorrect indentation.

---

# Troubleshooting

Check workflow

```bash
cat .github/workflows/github-secrets.yml
```

Verify repository status

```bash
git status
```

Check latest commit

```bash
git log --oneline
```

---

# Enterprise Example

Production workflows commonly use secrets such as

```
GHCR_TOKEN

AWS_ACCESS_KEY_ID

AWS_SECRET_ACCESS_KEY

KUBECONFIG

DOCKER_USERNAME

DOCKER_PASSWORD
```

These credentials are stored as GitHub Secrets and injected only during workflow execution.

---

# Security Best Practices

Always

- Store credentials in GitHub Secrets
- Rotate secrets regularly
- Use least privilege
- Limit repository access

Never

- Commit secrets to Git
- Store passwords in YAML
- Share secrets in logs
- Hardcode credentials

---

# Expected Result

You should successfully

- Create Repository Secrets
- Access Secrets securely
- Verify secret availability
- Understand secret masking
- Follow enterprise security practices

---

# Lab Summary

In this lab you learned

- GitHub Secrets
- Repository Secrets
- Secret masking
- Environment variables
- Secure workflow configuration
- Enterprise secret management

