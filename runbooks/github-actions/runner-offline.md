# Runbook - GitHub Actions Self-hosted Runner Offline

## Purpose

This runbook provides the standard procedure for investigating and recovering an offline GitHub Actions Self-hosted Runner.

This issue prevents workflows from executing on Self-hosted infrastructure and can block Kubernetes deployments in the Enterprise DevOps Platform.

---

# Severity

Applicable to

- SEV-2
- SEV-3

Escalate to SEV-1 if Production deployments are blocked.

---

# Symptoms

Examples

- Workflow remains queued
- Runner status shows Offline
- No available runners
- Deployment pipeline never starts
- GitHub displays

```
Waiting for a runner to pick up this job...
```

---

# Prerequisites

Ensure access to

- GitHub Repository
- Self-hosted Runner Machine
- SSH Access
- Internet Connectivity
- Docker
- Kubernetes Cluster (if applicable)

---

# Investigation

## Step 1

Verify workflow status.

Navigate

```
Repository

↓

Actions

↓

Workflow

↓

Queued
```

---

## Step 2

Verify Runner status.

Navigate

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
Online
```

If status is

```
Offline
```

continue investigation.

---

## Step 3

Login to Runner machine.

Verify current directory.

```bash
cd ~/actions-runner
```

---

## Step 4

Verify Runner files.

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

## Step 5

Check Runner process.

```bash
ps -ef | grep Runner
```

or

```bash
ps -ef | grep run.sh
```

If no process exists, the Runner is not running.

---

## Step 6

Verify Internet connectivity.

```bash
ping github.com
```

---

## Step 7

Verify disk space.

```bash
df -h
```

---

## Step 8

Verify memory.

```bash
free -h
```

---

## Step 9

Verify CPU utilization.

```bash
top
```

or

```bash
htop
```

---

# Resolution

## Runner Process Stopped

Start Runner.

```bash
cd ~/actions-runner

./run.sh
```

Expected

```
Listening for Jobs
```

---

## Runner Removed

Reconfigure Runner.

```bash
./config.sh
```

Follow GitHub registration instructions.

---

## Network Failure

Restore network connectivity.

Verify

```bash
ping github.com
```

---

## Disk Full

Remove unnecessary files.

Verify

```bash
df -h
```

---

## System Reboot

Restart Runner.

```bash
./run.sh
```

---

# Verification

Confirm

Repository

↓

Settings

↓

Actions

↓

Runners

Status

```
Online
```

Run a test workflow.

Confirm

- Runner accepted Job
- Workflow completed
- Deployment resumed

---

# Rollback

If Runner cannot be recovered

Temporarily modify workflow

```yaml
runs-on: ubuntu-latest
```

This allows CI workflows to continue while the Self-hosted Runner is repaired.

Note

Deployment jobs requiring access to the local Kind cluster should continue using the Self-hosted Runner.

---

# Escalation

Escalate when

- Runner repeatedly disconnects
- Multiple Runners become unavailable
- Hardware failure suspected
- Network outage persists
- Production deployment blocked

Notify

- DevOps Lead
- Infrastructure Team
- Platform Team

---

# Post-Incident Tasks

- Identify root cause
- Document outage duration
- Verify Runner stability
- Update monitoring alerts
- Review Runner logs
- Update runbook if required

---

# Recovery Checklist

- Runner Online
- Network healthy
- Workflow executed
- Jobs completed
- Deployments resumed
- Monitoring normal
- Incident closed

