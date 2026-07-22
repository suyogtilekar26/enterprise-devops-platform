# Runbook - GitHub Actions Kubernetes Deployment Failure

## Purpose

This runbook provides the standard operating procedure for investigating and resolving Kubernetes deployment failures triggered by GitHub Actions.

It applies to deployments executed using GitHub Actions to Kind Kubernetes clusters in the Enterprise DevOps Platform.

---

# Severity

Applicable to

- SEV-1
- SEV-2
- SEV-3

Production deployment failures should be treated as SEV-1 or SEV-2 depending on business impact.

---

# Symptoms

Examples

- Deployment job failed
- kubectl apply failed
- Pods stuck in Pending
- Pods in CrashLoopBackOff
- ImagePullBackOff
- Health check failed
- Deployment timeout
- Rollout failed

---

# Prerequisites

Ensure access to

- GitHub Repository
- GitHub Actions
- Self-hosted Runner
- Kind Kubernetes Cluster
- kubectl
- Docker
- Deployment Manifests

---

# Investigation

## Step 1

Open GitHub Actions.

Navigate

```
Repository

↓

Actions

↓

Failed Workflow
```

Identify

- Failed Job
- Failed Step
- Error Message

---

## Step 2

Verify Runner.

Repository

↓

Settings

↓

Actions

↓

Runners

Expected

```
Online
```

---

## Step 3

Verify Kubernetes Cluster.

```bash
kubectl cluster-info
```

---

## Step 4

Verify Nodes.

```bash
kubectl get nodes
```

Expected

```
Ready
```

---

## Step 5

Verify Deployments.

```bash
kubectl get deployments
```

---

## Step 6

Verify Pods.

```bash
kubectl get pods -A
```

Check for

- Pending
- CrashLoopBackOff
- ImagePullBackOff
- Error

---

## Step 7

Describe failed Pod.

```bash
kubectl describe pod <pod-name>
```

Review

- Events
- Scheduling
- Image pull
- Readiness
- Liveness

---

## Step 8

Review Pod Logs.

```bash
kubectl logs <pod-name>
```

If multiple containers exist

```bash
kubectl logs <pod-name> -c <container-name>
```

---

## Step 9

Verify Deployment Manifest.

```bash
kubectl apply \
--dry-run=client \
-f kubernetes/deployment.yaml
```

---

## Step 10

Verify Services.

```bash
kubectl get svc
```

---

## Step 11

Verify Events.

```bash
kubectl get events \
--sort-by=.metadata.creationTimestamp
```

---

# Resolution

## Cluster Unavailable

Restart Kind cluster.

Verify

```bash
kubectl get nodes
```

---

## Deployment Manifest Invalid

Correct manifest.

Validate

```bash
kubectl apply \
--dry-run=client \
-f kubernetes/deployment.yaml
```

Commit changes.

Re-run workflow.

---

## ImagePullBackOff

Verify

- Image exists
- Image tag
- Registry
- Authentication

---

## CrashLoopBackOff

Review

```bash
kubectl logs <pod-name>
```

Correct application issue.

Redeploy.

---

## Readiness Probe Failed

Verify

- Endpoint
- Port
- Startup time

Update deployment.

---

## Liveness Probe Failed

Verify

- Application running
- Probe configuration

Redeploy.

---

## Service Misconfiguration

Verify

```bash
kubectl get svc

kubectl describe svc <service-name>
```

---

# Verification

Confirm

```bash
kubectl get deployments

kubectl get pods

kubectl get svc
```

Expected

- Deployments Available
- Pods Running
- Services Active
- No Restart Loop
- Health checks successful

---

# Rollback

Rollback Deployment

```bash
kubectl rollout undo deployment/<deployment-name>
```

Verify

```bash
kubectl rollout status deployment/<deployment-name>
```

Confirm Pods become healthy.

---

# Escalation

Escalate when

- Multiple deployments fail
- Kubernetes cluster unavailable
- Production outage
- Registry unavailable
- Application owner required

Notify

- DevOps Lead
- Platform Team
- Application Team

---

# Post-Incident Tasks

- Document root cause
- Verify deployment manifests
- Review workflow logs
- Update monitoring dashboards
- Update runbook if necessary
- Create incident report

---

# Recovery Checklist

- Workflow successful
- Deployment successful
- Pods healthy
- Services healthy
- Health checks passed
- Monitoring normal
- Incident closed

