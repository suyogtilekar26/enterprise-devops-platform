# Lab 09 - Configure a Self-hosted Runner

# Objective

Learn how to configure a Self-hosted Runner and execute GitHub Actions workflows on your own machine instead of GitHub-hosted runners.

After completing this lab, you will be able to

- Understand Self-hosted Runners
- Register a Runner
- Configure Runner labels
- Execute workflows on your machine
- Verify Runner connectivity

---

# Enterprise Scenario

Most enterprise organizations use Self-hosted Runners because they need access to

- Internal Kubernetes clusters
- Private Docker registries
- Corporate VPN
- Internal artifact repositories
- On-premise infrastructure
- Production deployment environments

In our Enterprise DevOps Platform, we will later use a Self-hosted Runner to deploy applications into our Kind Kubernetes cluster.

---

# Lab Architecture

```
Developer

↓

Push Code

↓

GitHub Repository

↓

Workflow

↓

Self-hosted Runner

↓

Execute Workflow

↓

Deployment
```

---

# Prerequisites

- GitHub Account
- Enterprise DevOps Platform Repository
- Git Installed
- Internet Connection

---

# Step 1: Open Repository Settings

Navigate to

```
Repository

↓

Settings

↓

Actions

↓

Runners
```

---

# Step 2: Create New Runner

Click

```
New self-hosted runner
```

Select

```
Linux

x64
```

GitHub displays installation instructions.

Do not execute them yet.

---

# Step 3: Create Runner Directory

```bash
mkdir ~/actions-runner

cd ~/actions-runner
```

---

# Step 4: Download Runner

Copy the command provided by GitHub.

Example

```bash
curl -o actions-runner-linux-x64.tar.gz <DOWNLOAD_URL>
```

---

# Step 5: Extract Runner

```bash
tar xzf actions-runner-linux-x64.tar.gz
```

Verify

```bash
ls
```

Expected

```
config.sh

run.sh

bin/

externals/
```

---

# Step 6: Configure Runner

Run the configuration command provided by GitHub.

Example

```bash
./config.sh
```

GitHub asks

```
Repository URL

Registration Token

Runner Name

Runner Labels

Working Directory
```

Provide the requested values.

---

# Step 7: Start Runner

```bash
./run.sh
```

Expected

```
Listening for Jobs...
```

Leave this terminal running.

---

# Step 8: Verify Runner

Navigate to

```
Repository

↓

Settings

↓

Actions

↓

Runners
```

Expected

```
Runner Status

Online
```

---

# Step 9: Create Workflow

```bash
nano .github/workflows/self-hosted-runner.yml
```

---

# Step 10: Add Workflow

```yaml
name: Self-hosted Runner Demo

on:
  push:
    branches:
      - main

jobs:

  runner-demo:

    runs-on: self-hosted

    steps:

      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Display Hostname
        run: hostname

      - name: Display Current User
        run: whoami

      - name: Display Current Directory
        run: pwd

      - name: Display Operating System
        run: uname -a
```

Save the file.

---

# Step 11: Commit Changes

```bash
git add .

git commit -m "Add self-hosted runner workflow"
```

---

# Step 12: Push Changes

```bash
git push origin main
```

---

# Step 13: Observe Workflow

Navigate to

```
Repository

↓

Actions

↓

Self-hosted Runner Demo
```

Verify

The workflow executes on your own machine instead of a GitHub-hosted Runner.

---

# Expected Output

Example

Hostname

```
devops-lab
```

Current User

```
ubuntu
```

Operating System

```
Linux
```

---

# Workflow Execution

```
Push

↓

Workflow

↓

Self-hosted Runner

↓

Execute Steps

↓

Workflow Complete
```

---

# Validation Checklist

Verify

- Runner Online
- Workflow assigned to Self-hosted Runner
- Checkout successful
- Commands executed successfully
- Workflow completed

---

# Common Errors

## Runner Offline

Cause

Runner process stopped.

Restart

```bash
./run.sh
```

---

## Job Stuck in Queue

Cause

Runner unavailable.

Verify Runner status.

---

## Runner Not Registered

Cause

Configuration incomplete.

Run

```bash
./config.sh
```

again.

---

## Labels Do Not Match

Workflow

```yaml
runs-on: self-hosted
```

must match Runner labels.

---

# Troubleshooting

Check Runner directory

```bash
pwd
```

Verify Runner files

```bash
ls
```

Check Git status

```bash
git status
```

Verify workflow

```bash
cat .github/workflows/self-hosted-runner.yml
```

---

# Enterprise Example

Production workflow

```
Developer Push

↓

GitHub Actions

↓

Self-hosted Runner

↓

Docker Build

↓

Push GHCR

↓

Deploy Kind

↓

Helm Upgrade

↓

Health Check

↓

Production
```

This is the same deployment flow we will build later in this project.

---

# Best Practices

Always

- Keep Runner updated
- Monitor Runner health
- Restrict Runner permissions
- Use dedicated deployment runners
- Secure Runner access

Never

- Expose Runner publicly
- Store secrets on the Runner
- Use production Runner for testing
- Run untrusted workflows

---

# Expected Result

You should successfully

- Register a Self-hosted Runner
- Execute a workflow on your machine
- Understand Runner registration
- Verify Runner status
- Prepare for Kubernetes deployments

---

# Lab Summary

In this lab you learned

- Self-hosted Runner architecture
- Runner registration
- Runner configuration
- Workflow execution
- Runner troubleshooting
- Enterprise deployment runners

