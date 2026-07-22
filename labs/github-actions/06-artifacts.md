# Lab 06 - Using GitHub Actions Artifacts

# Objective

Learn how to generate, upload, and download Artifacts in GitHub Actions.

After completing this lab, you will be able to

- Generate build artifacts
- Upload artifacts
- Download artifacts
- Understand artifact retention
- Use artifacts in enterprise CI/CD pipelines

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

Generate Files

↓

Upload Artifact

↓

GitHub Artifact Storage

↓

Download Artifact
```

---

# Prerequisites

- Lab 01 completed
- GitHub repository
- GitHub Actions enabled

---

# What are Artifacts?

Artifacts are files generated during workflow execution and stored by GitHub.

Examples

- Build output
- Test reports
- Coverage reports
- Logs
- ZIP packages

Artifacts help preserve workflow results after execution.

---

# Step 1: Create Workflow

```bash
nano .github/workflows/artifacts.yml
```

---

# Step 2: Add Workflow

```yaml
name: Artifact Demo

on:
  push:
    branches:
      - main

jobs:

  artifact-demo:

    runs-on: ubuntu-latest

    steps:

      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Create Report Directory
        run: mkdir reports

      - name: Generate Report
        run: |
          echo "GitHub Actions Artifact Demo" > reports/report.txt
          echo "Workflow executed successfully." >> reports/report.txt
          date >> reports/report.txt

      - name: Upload Artifact
        uses: actions/upload-artifact@v4
        with:
          name: workflow-report
          path: reports/
```

Save the file.

---

# Step 3: Verify Workflow

```bash
cat .github/workflows/artifacts.yml
```

---

# Step 4: Commit Changes

```bash
git add .

git commit -m "Add artifact upload workflow"
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

Artifact Demo
```

---

# Step 7: Verify Workflow

Confirm all steps completed successfully.

Expected

```
Checkout Repository

↓

Create Report Directory

↓

Generate Report

↓

Upload Artifact
```

---

# Step 8: Download Artifact

Open

```
Workflow Run

↓

Artifacts

↓

workflow-report

↓

Download
```

Extract the downloaded archive.

Expected file

```
report.txt
```

---

# Step 9: Verify Artifact Content

Expected Output

```
GitHub Actions Artifact Demo

Workflow executed successfully.

<Date and Time>
```

---

# Workflow Execution

```
Push

↓

Runner

↓

Generate Files

↓

Upload Artifact

↓

Workflow Complete
```

---

# Validation Checklist

Verify

- Workflow executes successfully
- Report created
- Artifact uploaded
- Artifact downloadable
- Report contains expected content

---

# Common Errors

## Artifact Missing

Cause

Incorrect upload path.

Verify

```yaml
path: reports/
```

---

## Upload Failed

Cause

Directory not created.

Ensure

```bash
mkdir reports
```

runs before upload.

---

## Empty Artifact

Cause

No files generated.

Verify

```
reports/report.txt
```

exists before upload.

---

## Wrong Artifact Name

Cause

Incorrect

```yaml
name:
```

value.

---

# Troubleshooting

View workflow

```bash
cat .github/workflows/artifacts.yml
```

Verify repository status

```bash
git status
```

Check workflow files

```bash
ls .github/workflows
```

Verify report generation locally

```bash
mkdir -p reports

echo "Test Report" > reports/report.txt

ls reports
```

---

# Enterprise Example

Artifacts commonly include

```
JUnit Reports

↓

Code Coverage

↓

Application Packages

↓

Deployment Manifests

↓

Build Logs

↓

Security Scan Reports
```

Teams use these artifacts for

- Auditing
- Troubleshooting
- Release validation
- Compliance

---

# Artifact Lifecycle

```
Workflow

↓

Generate Files

↓

Upload Artifact

↓

GitHub Storage

↓

Download

↓

Review
```

---

# Best Practices

Always

- Upload important reports
- Use meaningful artifact names
- Keep artifacts organized
- Remove unnecessary files
- Review retention policies

Never

- Upload secrets
- Upload large unnecessary files
- Store credentials in artifacts

---

# Expected Result

You should successfully

- Generate reports
- Upload artifacts
- Download artifacts
- Verify artifact contents
- Understand enterprise artifact usage

---

# Lab Summary

In this lab you learned

- Artifact generation
- Artifact upload
- Artifact download
- Artifact lifecycle
- Enterprise artifact management
- Artifact troubleshooting

