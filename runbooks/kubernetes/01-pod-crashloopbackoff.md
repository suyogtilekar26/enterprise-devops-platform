# Kubernetes Runbook 01 - Recovering CrashLoopBackOff Pods

# 1. Purpose

This runbook explains how to investigate, diagnose and recover Kubernetes Pods that are continuously crashing and entering the **CrashLoopBackOff** state.

The objective is to restore application availability while collecting sufficient evidence for Root Cause Analysis (RCA).

---

# 2. Scope

Applicable to

- Production Clusters
- Staging Clusters
- Kind Clusters
- Managed Kubernetes (EKS, AKS, GKE)

Applicable workloads

- Deployments
- StatefulSets
- Jobs

---

# 3. Symptoms

Users may report

- Application unavailable
- API returning 503
- Login failures
- Service timeout

Monitoring may report

- Pod Restart Count Increasing
- CrashLoopBackOff
- Availability Alerts
- Failed Readiness Checks

Verify

```bash
kubectl get pods -A
```

Example

```
NAME                     READY   STATUS             RESTARTS

api-gateway-abc123       0/1     CrashLoopBackOff   12
```

---

# 4. Business Impact

Possible impact

Critical

- Customer login unavailable
- Payment failures
- Dashboard inaccessible

Medium

- Internal service unavailable
- Reporting delayed

Low

- Non-production environments affected

---

# 5. Possible Root Causes

Common causes include

- Application startup failure
- Missing ConfigMap
- Missing Secret
- Incorrect environment variables
- Database connectivity issues
- DNS failures
- Image bugs
- Incorrect command or entrypoint
- Liveness Probe failures
- OOMKilled
- File permission issues
- Missing Persistent Volume
- External dependency unavailable

---

# 6. Prerequisites

Access required

- kubectl
- Cluster access
- Namespace access
- Read access to logs

Useful permissions

```bash
kubectl auth can-i get pods

kubectl auth can-i get events

kubectl auth can-i get deployments
```

---

# 7. Initial Investigation

## Step 1

Locate failing Pod

```bash
kubectl get pods -A
```

---

## Step 2

Check restart count

```bash
kubectl get pods -A
```

Example

```
RESTARTS

15
```

High restart counts usually indicate an ongoing production issue.

---

## Step 3

Identify namespace

Example

```bash
kubectl get pods -A
```

```
enterprise-devops
```

---

# 8. Detailed Investigation

## Step 1

Describe Pod

```bash
kubectl describe pod <pod-name> -n <namespace>
```

Review

- Events
- Restart Count
- Exit Code
- Last State
- Reason
- Probe Failures

---

## Step 2

View Logs

```bash
kubectl logs <pod-name> \
-n <namespace>
```

---

## Step 3

View Previous Logs

This is one of the most important commands.

```bash
kubectl logs <pod-name> \
--previous \
-n <namespace>
```

Previous logs usually contain the original startup failure.

---

## Step 4

Review Events

```bash
kubectl get events \
-n <namespace> \
--sort-by=.metadata.creationTimestamp
```

Look for

- Failed Mount
- Probe Failure
- Container Restart
- Scheduling Errors

---

## Step 5

Verify Deployment

```bash
kubectl describe deployment <deployment> \
-n <namespace>
```

Verify

- Image
- Environment Variables
- ConfigMaps
- Secrets
- Resources

---

## Step 6

Verify ConfigMap

```bash
kubectl get configmap \
-n <namespace>

kubectl describe configmap <configmap-name> \
-n <namespace>
```

---

## Step 7

Verify Secret

```bash
kubectl get secret \
-n <namespace>

kubectl describe secret <secret-name> \
-n <namespace>
```

---

## Step 8

Verify Resources

```bash
kubectl top pod \
-n <namespace>
```

If unavailable

Check

```bash
kubectl describe pod <pod-name>
```

Review

- Memory
- CPU
- Limits
- Requests

---

## Step 9

Verify Service Dependencies

Examples

- Database
- Redis
- Kafka
- Authentication
- External API

Application startup may fail if dependencies are unavailable.

---

# 9. Resolution Steps

Resolution depends on the identified root cause.

Examples

Wrong Image

```bash
kubectl set image deployment/<deployment> \
<container>=<correct-image> \
-n <namespace>
```

Missing ConfigMap

Restore ConfigMap.

Restart Deployment if required.

Missing Secret

Restore Secret.

Restart Deployment.

OOMKilled

Increase memory limit after investigation.

Probe Failure

Correct readiness or liveness probe configuration.

Application Bug

Rollback deployment.

---

# 10. Validation Steps

Verify

```bash
kubectl get pods \
-n <namespace>
```

Expected

```
STATUS

Running
```

Verify

```bash
kubectl rollout status deployment/<deployment> \
-n <namespace>
```

Verify logs

```bash
kubectl logs <pod-name>
```

Business Validation

- Login
- APIs
- Dashboard
- Monitoring

---

# 11. Rollback Procedure

If issue started after deployment

```bash
kubectl rollout undo deployment/<deployment> \
-n <namespace>
```

Verify

```bash
kubectl rollout history deployment/<deployment>
```

Confirm application recovery before closing the incident.

---

# 12. Escalation Matrix

L1

- Collect logs
- Collect events
- Verify Pod status

↓

L2

- Deployment review
- Configuration review
- Resource analysis

↓

L3

- Application debugging
- Code investigation
- Production hotfix

↓

Platform Team

- Cluster issue
- Infrastructure issue
- Control Plane issue

---

# 13. Production Best Practices

- Never delete Pods before collecting logs.
- Always review previous logs.
- Validate ConfigMaps and Secrets.
- Verify dependencies before restarting workloads.
- Record all investigation commands.
- Capture evidence for RCA.
- Perform business validation after recovery.

---

# 14. Real Production Scenario

A production authentication service suddenly entered CrashLoopBackOff immediately after deployment.

Initial assumption was an application bug.

Investigation showed

```
kubectl logs --previous
```

revealed

```
Environment variable DATABASE_URL not found.
```

The deployment referenced a Secret that had been deleted during a maintenance activity.

The Secret was restored.

Deployment restarted successfully.

Business recovered within minutes.

Root Cause

Production Secret accidentally deleted.

---

# 15. Scenario Interview Questions

## Q1. A Pod is in CrashLoopBackOff. What is your first step?

### Answer

Never restart the Pod immediately.

Collect evidence first.

Commands

```bash
kubectl describe pod <pod>

kubectl logs <pod>

kubectl logs <pod> --previous

kubectl get events
```

Production Explanation

Most CrashLoopBackOff incidents can be identified from previous container logs without making any changes.

---

## Q2. Why are previous logs important?

### Answer

The current container may not contain the original startup error.

The previous container usually contains the exact exception responsible for the crash.

Command

```bash
kubectl logs --previous
```

---

## Q3. Can deleting the Pod solve CrashLoopBackOff?

### Answer

Usually no.

Deployment recreates the Pod with the same configuration.

Unless the root cause is fixed, the new Pod also crashes.

---

# 16. Architecture Interview Questions

## Q1. Explain CrashLoopBackOff flow.

### Answer

```
Deployment

↓

Pod Created

↓

Application Starts

↓

Application Crashes

↓

Container Restarts

↓

Repeated Failure

↓

CrashLoopBackOff
```

CrashLoopBackOff is a symptom.

The actual root cause must be identified through logs and events.

---

## Q2. Which Kubernetes components participate?

### Answer

- Deployment
- ReplicaSet
- Pod
- kubelet
- Container Runtime

The kubelet repeatedly attempts to restart the failed container.

---

# 17. Production Support Interview Questions

## Q1. Users report login failures after deployment. Pods show CrashLoopBackOff. How will you investigate?

### Answer

Investigation order

```bash
kubectl get pods

kubectl describe pod

kubectl logs

kubectl logs --previous

kubectl get events

kubectl describe deployment
```

Then verify

- ConfigMaps
- Secrets
- Database connectivity
- Authentication service
- Recent deployment changes

---

## Q2. When do you escalate to developers?

### Answer

Escalate after confirming

- Infrastructure healthy
- Kubernetes configuration correct
- Secrets available
- ConfigMaps correct
- Dependencies available

If application code continues crashing, provide

- Logs
- Events
- Timeline
- Deployment version
- RCA evidence

---

# 18. Commands Reference

```bash
kubectl get pods -A

kubectl describe pod <pod>

kubectl logs <pod>

kubectl logs <pod> --previous

kubectl get events

kubectl describe deployment

kubectl rollout history deployment

kubectl rollout undo deployment
```

---

# 19. Marathi Quick Revision

- प्रथम Pod delete करू नका.
- Describe करा.
- Previous logs तपासा.
- Events तपासा.
- ConfigMap आणि Secret verify करा.
- Root Cause शोधा.
- मगच fix करा.

---

# 20. Related Runbooks

- 02-imagepullbackoff.md
- 03-pod-pending.md
- 06-deployment-rollback.md
- 15-oomkilled.md
- 16-health-probe-failures.md

---

# 21. Marathi Summary (5+ Experience Revision)

## Interview Summary

CrashLoopBackOff म्हणजे Kubernetes ची समस्या नसून application वारंवार crash होत असल्याचे लक्षण आहे. Production मध्ये engineer ने प्रथम logs, previous logs, events आणि deployment configuration तपासावी. पुरावे गोळा केल्याशिवाय Pod delete किंवा restart करू नये. Root Cause निश्चित झाल्यावरच corrective action घ्यावी.

### Production Investigation Flow

```
Alert

↓

Pod Status

↓

Describe

↓

Logs

↓

Previous Logs

↓

Events

↓

Deployment

↓

ConfigMap

↓

Secret

↓

Dependencies

↓

Root Cause

↓

Fix

↓

Validation

↓

RCA
```

### Production Story

एका production banking application मध्ये deployment नंतर Authentication Pods सतत CrashLoopBackOff मध्ये जात होत्या. काही engineers Pods delete करत होते, पण प्रत्येक नवीन Pod पुन्हा crash होत होता. Senior DevOps engineer ने `kubectl logs --previous` तपासले आणि missing JWT Secret आढळले. Secret restore करून rollout restart केल्यानंतर सर्व Pods healthy झाले. Incident review मध्ये "Never restart before collecting evidence" हा नियम अधिकृत runbook मध्ये समाविष्ट करण्यात आला.

### 5+ Years Memory Trick

Interview मध्ये जर विचारले,

**"How do you troubleshoot CrashLoopBackOff in production?"**

उत्तर:

"I never restart the Pod immediately. I first collect evidence using `kubectl describe`, current logs, previous logs and events. Then I validate ConfigMaps, Secrets, resource limits and application dependencies. After identifying the root cause, I implement the fix, verify application recovery and document the RCA."

