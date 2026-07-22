# Kubernetes Runbook 06 - Production Deployment Rollback

# 1. Purpose

This runbook explains the enterprise procedure for safely rolling back a failed Kubernetes deployment.

A rollback restores the last known stable application version while minimizing customer impact and preserving evidence for Root Cause Analysis (RCA).

---

# 2. Scope

Applicable to

- Deployments
- Rolling Updates
- Production Releases
- Staging Releases
- Blue-Green Deployments (rollback principles)
- Canary Deployments (rollback principles)

Supported Platforms

- Kind
- EKS
- AKS
- GKE
- OpenShift
- On-Prem Kubernetes

---

# 3. Symptoms

Users may report

- Login failures
- API failures
- Dashboard unavailable
- Increased latency
- Internal Server Errors

Monitoring may report

- High 5xx errors
- Increased restart count
- Failed health checks
- Failed deployment
- Availability degradation

Verify

```bash
kubectl get deployments

kubectl get pods
```

---

# 4. Business Impact

Critical

- Production outage
- Customer transactions failing
- Authentication unavailable

Medium

- Partial application outage
- One microservice degraded

Low

- Internal services affected

---

# 5. Possible Root Causes

- Application bug
- Incorrect image
- Wrong image tag
- ConfigMap error
- Secret misconfiguration
- Environment variable issue
- Database migration failure
- Health probe failure
- Resource limit issue
- Network policy issue

---

# 6. Prerequisites

Required access

- kubectl
- Namespace access
- Deployment permissions
- Monitoring dashboards
- Change approval (Production)

Verify

```bash
kubectl auth can-i update deployments
```

---

# 7. Initial Investigation

## Step 1

Verify Deployment

```bash
kubectl get deployment \
-n <namespace>
```

---

## Step 2

Check Rollout Status

```bash
kubectl rollout status deployment/<deployment> \
-n <namespace>
```

---

## Step 3

Review Pods

```bash
kubectl get pods \
-n <namespace>
```

Look for

- CrashLoopBackOff
- Pending
- ImagePullBackOff
- OOMKilled

---

## Step 4

Review Events

```bash
kubectl get events \
-n <namespace> \
--sort-by=.metadata.creationTimestamp
```

---

# 8. Detailed Investigation

## Step 1

View Rollout History

```bash
kubectl rollout history deployment/<deployment> \
-n <namespace>
```

Example

```
REVISION

1

2

3
```

---

## Step 2

Describe Deployment

```bash
kubectl describe deployment <deployment> \
-n <namespace>
```

Review

- Image
- Replica count
- Events
- Strategy
- Conditions

---

## Step 3

Review Logs

```bash
kubectl logs <pod-name> \
-n <namespace>

kubectl logs <pod-name> \
--previous
```

---

## Step 4

Compare Deployment Versions

Verify

- Image version
- ConfigMap
- Secret
- Resources
- Environment variables

---

## Step 5

Business Validation

Determine

- Which business function failed?
- Customer impact?
- Number of affected services?
- Is rollback safer than forward fix?

---

# 9. Resolution Steps

Rollback to previous revision

```bash
kubectl rollout undo deployment/<deployment> \
-n <namespace>
```

Rollback to specific revision

```bash
kubectl rollout undo deployment/<deployment> \
--to-revision=<revision> \
-n <namespace>
```

Wait

```bash
kubectl rollout status deployment/<deployment>
```

---

# 10. Validation Steps

Verify rollout

```bash
kubectl rollout status deployment/<deployment>
```

Verify Pods

```bash
kubectl get pods
```

Verify Services

```bash
kubectl get svc
```

Business Validation

- Login successful
- APIs responding
- Dashboard accessible
- Monitoring green
- Alerts cleared

---

# 11. Rollback Procedure

Rollback Checklist

✓ Rollout history reviewed

✓ Correct revision identified

✓ Rollback executed

✓ Pods healthy

✓ Business validated

✓ Monitoring healthy

✓ Incident updated

---

# 12. Escalation Matrix

L1

- Verify rollout failure
- Collect logs

↓

L2

- Execute rollback
- Validate application

↓

Release Team

- Deployment verification

↓

Development Team

- Bug investigation

↓

Platform Team

- Kubernetes issues

---

# 13. Production Best Practices

- Never rollback blindly.
- Identify affected revision first.
- Preserve deployment evidence.
- Validate business transactions after rollback.
- Keep rollback versions available.
- Use immutable image tags.
- Document rollback reason.

---

# 14. Real Production Scenario

A new Authentication Service release introduced an incorrect JWT configuration.

Within minutes

- Login failures increased
- 5xx errors spiked
- Health probes failed

Investigation confirmed the issue originated in the latest deployment.

Rollback

```bash
kubectl rollout undo deployment/auth-service
```

completed successfully.

Customer logins recovered in less than five minutes.

Root Cause

Incorrect production configuration packaged with the release.

---

# 15. Scenario Interview Questions

## Q1. When should you rollback instead of fixing forward?

### Answer

Rollback is preferred when

- Customer impact is high
- Stable previous version exists
- Root cause requires development changes
- Recovery must be immediate

Production priority is restoring service first.

---

## Q2. Which command performs a rollback?

### Answer

```bash
kubectl rollout undo deployment/<deployment>
```

Specific revision

```bash
kubectl rollout undo deployment/<deployment> \
--to-revision=<revision>
```

---

## Q3. What should you verify before rollback?

### Answer

- Deployment history
- Business impact
- Previous stable version
- Monitoring
- Current logs
- Deployment events

---

# 16. Architecture Interview Questions

## Q1. Explain Deployment Rollback Architecture.

### Answer

```
Deployment

↓

ReplicaSet Revision 1

↓

ReplicaSet Revision 2

↓

ReplicaSet Revision 3

↓

Rollback

↓

ReplicaSet Revision 2 Active
```

Kubernetes maintains ReplicaSet history that enables rollback.

---

## Q2. Which Kubernetes resources participate?

### Answer

- Deployment
- ReplicaSet
- Pods
- Controller Manager
- Scheduler
- kubelet

---

# 17. Production Support Interview Questions

## Q1. A deployment caused production outage. Walk through your actions.

### Answer

Investigation order

```bash
kubectl rollout status deployment

kubectl rollout history deployment

kubectl describe deployment

kubectl get pods

kubectl logs

kubectl get events
```

If rollback is the safest option

```bash
kubectl rollout undo deployment
```

Validate

- Pods
- APIs
- Business transactions
- Monitoring

---

## Q2. Why not immediately rollback every failed deployment?

### Answer

Because

- Some failures are infrastructure-related.
- Rollback may not resolve database migrations.
- Shared configuration changes may still exist.
- Evidence must be collected first.

Rollback should be an informed decision, not an automatic reaction.

---

# 18. Commands Reference

```bash
kubectl get deployments

kubectl rollout history deployment/<deployment>

kubectl rollout status deployment/<deployment>

kubectl rollout undo deployment/<deployment>

kubectl rollout undo deployment/<deployment> \
--to-revision=<revision>

kubectl describe deployment

kubectl get pods

kubectl logs <pod>

kubectl get events
```

---

# 19. Marathi Quick Revision

- Rollout history तपासा.
- Root Cause समजून घ्या.
- योग्य revision निवडा.
- Rollback करा.
- Pods verify करा.
- Business validation करा.
- RCA तयार करा.

---

# 20. Related Runbooks

- 01-pod-crashloopbackoff.md
- 02-imagepullbackoff.md
- 03-pod-pending.md
- 12-configmap-update.md
- 13-secret-rotation.md

---

# 21. Marathi Summary (5+ Experience Revision)

## Interview Summary

Production deployment fail झाल्यास लगेच rollback करू नये. प्रथम rollout history, deployment events, logs आणि customer impact तपासावा. जर नवीन release मुळे production outage झाला असेल आणि मागील version stable असेल, तर `kubectl rollout undo` वापरून rollback करावा. Rollback नंतर Pods, APIs, business transactions आणि monitoring validate करून Incident आणि RCA पूर्ण करावी.

### Production Investigation Flow

```
Alert

↓

Deployment Failed

↓

Rollout Status

↓

Rollout History

↓

Logs

↓

Events

↓

Business Impact

↓

Rollback Decision

↓

Rollback

↓

Validation

↓

Monitoring

↓

RCA
```

### Production Story

एका production insurance application मध्ये नवीन API release नंतर सर्व policy creation requests fail होत होत्या. Investigation दरम्यान logs मध्ये configuration regression दिसली. Development fix तयार होण्यासाठी वेळ लागणार असल्यामुळे DevOps team ने `kubectl rollout undo` वापरून मागील stable revision restore केली. पाच मिनिटांत customer traffic सामान्य झाली आणि नंतर development team ने योग्य fix नवीन release मध्ये दिला.

### 5+ Years Memory Trick

Interview मध्ये जर विचारले,

**"How do you perform a production deployment rollback?"**

उत्तर:

"I first assess customer impact, review rollout history, collect deployment evidence and confirm the last stable revision. If rollback is the safest recovery option, I execute `kubectl rollout undo`, validate pod health, business functionality and monitoring, then document the RCA and coordinate with the development team for a permanent fix."

