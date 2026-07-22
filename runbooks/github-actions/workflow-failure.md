# Runbook - GitHub Actions Workflow Failure

## Purpose

This runbook provides a standard operating procedure for investigating and resolving GitHub Actions workflow failures in the Enterprise DevOps Platform.

It should be followed whenever a workflow fails during

- Build
- Test
- Docker Image Build
- Image Push
- Kubernetes Deployment
- Health Verification

---

# Severity

Applicable to

- SEV-2
- SEV-3
- SEV-4

SEV-1 should follow Incident Management procedures.

---

# Symptoms

Examples

- Workflow status is Failed
- Job failed unexpectedly
- Deployment stopped
- Docker image not created
- Image push failed
- Kubernetes deployment failed
- Health check failed

---

# Prerequisites

Ensure access to

- GitHub Repository
- GitHub Actions
- Repository Settings
- Self-hosted Runner (if applicable)
- Docker
- kubectl
- Kind Cluster

---

# Investigation

## Step 1

Identify failed workflow.

Navigate

```
Repository

↓

Actions

↓

Failed Workflow
```

Record

- Workflow Name
- Branch
- Commit SHA
- Trigger Event
- Failed Job

---

## Step 2

Identify failed Job.

Examples

```
Build

Test

Docker

Deploy
```

Open the failed Job.

---

## Step 3

Identify failed Step.

Examples

```
Checkout

Setup Python

Docker Login

Docker Build

Docker Push

kubectl Apply

Health Check
```

Record the exact error message.

---

## Step 4

Review workflow logs.

Look for

- Exit codes
- Authentication errors
- YAML errors
- Missing files
- Permission denied
- Timeout
- Network failures

---

## Step 5

Verify repository status.

```bash
git status
```

---

## Step 6

Verify workflow configuration.

```bash
ls .github/workflows

cat .github/workflows/*.yml
```

---

## Step 7

If deployment failed, verify cluster.

```bash
kubectl get nodes

kubectl get deployments

kubectl get pods

kubectl get svc
```

---

## Step 8

If Docker failed, verify Docker.

```bash
docker version

docker images
```

---

## Step 9

If Self-hosted Runner is used, verify Runner.

Runner should show

```
Online
```

If offline

```bash
cd ~/actions-runner

./run.sh
```

---

# Resolution

Resolution depends on failure type.

## YAML Error

Correct YAML syntax.

Commit and push again.

---

## Missing Secret

Create or update Repository Secret.

Re-run workflow.

---

## Docker Login Failure

Verify

- GHCR permissions
- GITHUB_TOKEN
- docker/login-action

---

## Docker Build Failure

Verify

```bash
docker build .
```

works locally.

---

## Docker Push Failure

Verify image tag.

Verify registry permissions.

---

## Runner Offline

Restart Runner.

```bash
./run.sh
```

---

## Kubernetes Failure

Verify

```bash
kubectl get events

kubectl describe pod <pod-name>

kubectl logs <pod-name>
```

Correct the issue and redeploy.

---

# Verification

Confirm

- Workflow completed successfully
- All Jobs passed
- Docker image created
- Image pushed
- Pods running
- Services available
- Health checks passed

---

# Rollback

If deployment reached Kubernetes but application is unhealthy

Rollback using

```bash
kubectl rollout undo deployment/<deployment-name>
```

Verify

```bash
kubectl rollout status deployment/<deployment-name>
```

---

# Escalation

Escalate when

- Multiple workflow failures occur
- Production deployment blocked
- Runner unavailable for extended period
- Registry unavailable
- Kubernetes cluster unavailable

Notify

- DevOps Lead
- Platform Team
- Application Owner

---

# Post-Incident Tasks

- Document root cause
- Update workflow if necessary
- Update runbook
- Create incident report
- Review preventive actions
- Verify future workflow executions

---

# Recovery Checklist

- Workflow fixed
- Jobs successful
- Docker image available
- Deployment successful
- Health checks passed
- Monitoring normal
- Incident closed

