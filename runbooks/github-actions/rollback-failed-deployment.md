# Runbook - Rollback Failed Deployment in GitHub Actions

## Purpose

This runbook provides the standard operating procedure for rolling back a failed Kubernetes deployment initiated through GitHub Actions.

The objective is to restore the last known healthy application version with minimal service disruption.

This runbook applies to deployments of

- Frontend
- API Gateway
- Auth Service
- Dashboard Service

within the Enterprise DevOps Platform.

---

# Severity

Applicable to

- SEV-1
- SEV-2

Immediate rollback is recommended if production stability is impacted.

---

# Symptoms

Examples

- Deployment completed but application unavailable
- Pods entering CrashLoopBackOff
- Readiness probe failures
- Liveness probe failures
- Increased application errors
- Failed smoke tests
- Health endpoint unavailable
- Customer impact observed

---

# Prerequisites

Ensure access to

- GitHub Repository
- GitHub Actions
- Self-hosted Runner
- Kubernetes Cluster
- kubectl
- Deployment History

---

# Investigation

## Step 1

Open the failed workflow.

Navigate

```
Repository

↓

Actions

↓

Deployment Workflow
```

Record

- Workflow Run
- Commit SHA
- Image Tag
- Deployment Time

---

## Step 2

Verify deployment status.

```bash
kubectl get deployments
```

---

## Step 3

Verify rollout history.

```bash
kubectl rollout history deployment/<deployment-name>
```

Record

- Current Revision
- Previous Revision

---

## Step 4

Verify Pods.

```bash
kubectl get pods
```

Check for

- CrashLoopBackOff
- Error
- Pending
- ImagePullBackOff

---

## Step 5

Review Pod logs.

```bash
kubectl logs <pod-name>
```

---

## Step 6

Describe affected Pod.

```bash
kubectl describe pod <pod-name>
```

Review

- Events
- Readiness
- Liveness
- Image
- Scheduling

---

## Step 7

Verify Services.

```bash
kubectl get svc
```

---

# Resolution

## Roll Back Deployment

Execute

```bash
kubectl rollout undo deployment/<deployment-name>
```

---

## Monitor Rollback

```bash
kubectl rollout status deployment/<deployment-name>
```

Wait until rollout completes successfully.

---

## Verify Revision

```bash
kubectl rollout history deployment/<deployment-name>
```

Confirm the previous stable revision is active.

---

## Verify Pods

```bash
kubectl get pods
```

Expected

```
Running
```

---

## Verify Services

```bash
kubectl get svc
```

Ensure services are available.

---

## Verify Application

Check application health endpoint.

Example

```text
/health
```

Expected

```
200 OK
```

---

# Verification

Confirm

- Rollback completed successfully
- Pods are healthy
- Services available
- Health endpoints responding
- Application functionality restored
- Monitoring alerts cleared

---

# Rollback Validation Checklist

Verify

- Previous revision active
- No failing Pods
- No restart loop
- No image pull failures
- Readiness probes passing
- Liveness probes passing
- Application accessible

---

# Escalation

Escalate when

- Rollback fails
- Previous revision unavailable
- Kubernetes cluster unhealthy
- Multiple services impacted
- Production outage continues

Notify

- DevOps Lead
- Platform Team
- Application Owner
- Incident Manager

---

# Post-Incident Tasks

- Preserve workflow logs
- Preserve Kubernetes events
- Identify root cause
- Create incident report
- Review deployment process
- Improve automated validation checks
- Update runbooks if required

---

# Recovery Checklist

- Rollback successful
- Previous revision restored
- Pods healthy
- Services healthy
- Health checks passing
- Monitoring normal
- Incident closed

