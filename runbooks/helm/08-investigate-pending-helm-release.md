# Helm Runbook 08 - Investigate Pending Helm Release

# Enterprise DevOps Platform

---

# Purpose

This runbook explains the standard operating procedure (SOP) for investigating Helm Releases that remain in a Pending state.

Pending releases are common during interrupted deployments, failed upgrades, Kubernetes API delays or deployment timeouts.

---

# Introduction

A Helm Release should normally transition to one of the following states.

```
deployed

failed

uninstalled

superseded
```

Occasionally a release may remain in

```
pending-install

pending-upgrade

pending-rollback
```

A Pending release usually indicates that Helm is waiting for Kubernetes resources to become ready or the previous operation did not complete successfully.

---

# Production Scenario

Company

ABC Bank

The Platform Team started upgrading the API Gateway.

The deployment pipeline timed out.

Helm now reports

```
STATUS

pending-upgrade
```

Users report intermittent API failures.

The engineering team must determine whether the deployment is still progressing or if manual intervention is required.

---

# Enterprise Architecture

```
GitHub Actions

        │

        ▼

helm upgrade

        │

        ▼

Pending Release

        │

 ┌───────────────┐

 ▼               ▼

Helm         Kubernetes

        │

        ▼

Investigation

        │

        ▼

Recovery

        │

        ▼

Healthy Release
```

---

# Investigation

Follow the investigation steps in order.

---

## Step 1

Verify Kubernetes Context.

```bash
kubectl config current-context
```

---

## Step 2

Check Release Status.

```bash
helm status api-gateway \
-n api-prod
```

Example

```
STATUS

pending-upgrade
```

Possible states

```
pending-install

pending-upgrade

pending-rollback
```

---

## Step 3

Review Release History.

```bash
helm history api-gateway \
-n api-prod
```

Identify

- Current Revision
- Previous Stable Revision
- Failed Revisions

---

## Step 4

Verify Deployment.

```bash
kubectl get deployment \
-n api-prod
```

Check

- Available Replicas
- Updated Replicas
- Ready Replicas

---

## Step 5

Check Rollout Status.

```bash
kubectl rollout status deployment/api-gateway-api-gateway \
-n api-prod
```

Determine whether the rollout is still progressing.

---

## Step 6

Verify Pods.

```bash
kubectl get pods \
-n api-prod
```

Look for

```
Pending

ContainerCreating

CrashLoopBackOff

ImagePullBackOff

Running
```

---

## Step 7

Describe Deployment.

```bash
kubectl describe deployment api-gateway-api-gateway \
-n api-prod
```

Review

- Events
- Replica Status
- Scheduling
- Progress Deadline

---

## Step 8

Describe Pending Pod.

```bash
kubectl describe pod <POD_NAME> \
-n api-prod
```

Review

- Scheduling Events
- Image Pull
- Node Assignment
- Volumes
- Environment Variables

---

## Step 9

Review Pod Logs.

```bash
kubectl logs <POD_NAME> \
-n api-prod
```

If the container has not started, logs may not yet be available.

---

## Step 10

Verify Cluster Resources.

```bash
kubectl get nodes
```

Verify

```
Ready
```

Check node capacity if Pods remain Pending.

---

## Step 11

Review Events.

```bash
kubectl get events \
-n api-prod \
--sort-by=.lastTimestamp
```

Look for

- Failed Scheduling
- Image Pull Failures
- Resource Constraints
- Probe Failures

---

## Step 12

Verify Applied Values.

```bash
helm get values api-gateway \
-n api-prod
```

Confirm

- Image
- Replica Count
- Resources

---

# Resolution

Depending on the root cause

### Deployment Still Progressing

Wait until rollout completes.

Verify

```bash
kubectl rollout status deployment/api-gateway-api-gateway \
-n api-prod
```

---

### Resource Constraints

Increase

- Cluster Capacity
- CPU
- Memory

Redeploy if required.

---

### Image Pull Issues

Correct

- Image Repository
- Image Tag
- Registry Credentials

Upgrade the release.

---

### Configuration Errors

Correct

- values.yaml
- ConfigMap
- Secret
- Environment Variables

Upgrade again after validation.

---

### Stuck Deployment

If the deployment cannot recover and the previous revision was stable,

perform a rollback.

```bash
helm rollback api-gateway <REVISION> \
-n api-prod
```

---

# Validation

Verify

```bash
helm status api-gateway \
-n api-prod
```

Expected

```
STATUS

deployed
```

Verify

```bash
kubectl get pods \
-n api-prod
```

Expected

```
Running
```

Verify

```bash
kubectl rollout status deployment/api-gateway-api-gateway \
-n api-prod
```

Verify

```bash
kubectl get endpoints \
-n api-prod
```

Confirm application functionality.

---

# Rollback

View history.

```bash
helm history api-gateway \
-n api-prod
```

Rollback.

```bash
helm rollback api-gateway <REVISION> \
-n api-prod
```

Verify

- Rollout
- Pods
- Services
- Logs
- Monitoring

Confirm the release status changes to

```
deployed
```

---

# Root Cause Analysis Checklist

Document

- Pending State
- Deployment Revision
- Kubernetes Events
- Root Cause
- Recovery Action
- Recovery Time
- Preventive Action
- Engineer
- Incident Number

---

# Production Best Practices

- Never terminate a deployment without understanding why it is pending.
- Always verify rollout progress before intervening.
- Review Kubernetes Events before restarting workloads.
- Monitor cluster capacity continuously.
- Validate Helm Charts before every deployment.
- Keep rollback procedures documented and tested.

---

# Common Mistakes

- Assuming every pending release is failed.
- Restarting Pods before reviewing Events.
- Ignoring rollout status.
- Retrying deployments without identifying the root cause.
- Performing rollback without checking release history.

---

# Interview Questions

## Q1. What are common Pending Helm Release states?

### Answer

- pending-install
- pending-upgrade
- pending-rollback

These indicate that Helm is waiting for an operation to complete or recover.

---

## Q2. Which command shows the current Helm Release status?

```bash
helm status api-gateway -n api-prod
```

---

## Q3. What should be checked before rolling back a Pending release?

### Answer

Verify rollout status, Kubernetes Events, Pod health, release history and determine whether the deployment is still progressing before initiating a rollback.

---

# Commands Reference

Release Status

```bash
helm status api-gateway -n api-prod
```

Release History

```bash
helm history api-gateway -n api-prod
```

Rollout Status

```bash
kubectl rollout status deployment/api-gateway-api-gateway -n api-prod
```

Deployment

```bash
kubectl describe deployment api-gateway-api-gateway -n api-prod
```

Pods

```bash
kubectl get pods -n api-prod
```

Events

```bash
kubectl get events -n api-prod --sort-by=.lastTimestamp
```

Rollback

```bash
helm rollback api-gateway <REVISION> -n api-prod
```

---

# Marathi Quick Revision

- helm status तपासा.
- pending state ओळखा.
- helm history तपासा.
- rollout status verify करा.
- Events तपासा.
- Pod describe करा.
- Root cause शोधा.
- गरज असल्यास rollback करा.

---

# Marathi Summary (5+ Experience Revision)

या Runbook मध्ये Pending Helm Release ची Enterprise SOP अनुसार तपासणी कशी करायची ते समजावले आहे. `pending-install`, `pending-upgrade` किंवा `pending-rollback` या स्थिती आढळल्यास Helm status, release history, rollout status, Pods, Kubernetes Events आणि cluster resources तपासून deployment अजून सुरू आहे की अडकला आहे हे निश्चित केले जाते. Root cause समजल्यानंतरच corrective action किंवा rollback करणे ही Production DevOps आणि SRE टीमची standard operational practice आहे.

