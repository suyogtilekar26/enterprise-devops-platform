# Kubernetes Interview Master Handbook

# Production Lab 02 - Rolling Update and Rollback

---

# Objective

Learn how Kubernetes performs zero-downtime deployments.

Topics

Rolling Update

Rollback

Deployment History

Revision Management

Failed Deployment Recovery

---

# Production Scenario

A company has deployed Version 1 of an application.

A new Version 2 is released.

Goal

Deploy Version 2 without downtime.

If Version 2 fails,

return immediately to Version 1.

---

# Architecture

Users

↓

Service

↓

Deployment

↓

ReplicaSet

↓

Pods

---

# Rolling Update Workflow

Current Pods (v1)

↓

New ReplicaSet Created

↓

One New Pod (v2)

↓

One Old Pod Removed

↓

Repeat

↓

All Pods Updated

---

# Benefits

No downtime

Gradual rollout

Easy rollback

Traffic always available

---

# Deployment Strategy

RollingUpdate

↓

maxSurge

↓

maxUnavailable

---

# maxSurge

Extra Pods created during update.

Example

Replicas = 4

maxSurge = 1

Maximum Pods

5

---

# maxUnavailable

Maximum unavailable Pods during update.

Example

Replicas = 4

maxUnavailable = 1

At least

3 Pods stay available.

---

# Lab Step 1

Create Deployment

kubectl apply -f deployment.yaml

---

Verify

kubectl get deployment

kubectl get rs

kubectl get pods

---

# Lab Step 2

Check Rollout Status

kubectl rollout status deployment app

---

# Lab Step 3

Update Image

Example

kubectl set image deployment/app \
app=nginx:1.28

---

Verify

kubectl rollout status deployment app

---

# Observe Rolling Update

kubectl get pods -w

Watch

Old Pods terminating

↓

New Pods starting

↓

Traffic continues

---

# Lab Step 4

View Revision History

kubectl rollout history deployment app

---

View Specific Revision

kubectl rollout history deployment app --revision=2

---

# Lab Step 5

Rollback

kubectl rollout undo deployment app

---

Rollback to Specific Revision

kubectl rollout undo deployment app --to-revision=1

---

Verify

kubectl rollout status deployment app

---

# Complete Deployment Flow

Developer

↓

Git Push

↓

CI/CD

↓

Deployment Updated

↓

New ReplicaSet

↓

Rolling Update

↓

Pods Ready

↓

Traffic Shift

↓

Old ReplicaSet Removed

---

# Readiness During Rollout

New Pod Created

↓

Readiness Probe

↓

Ready

↓

Service Sends Traffic

If Readiness fails

↓

No Traffic

---

# Liveness During Rollout

Container Starts

↓

Application Crash

↓

Liveness Probe

↓

Restart

---

# Common Problems

ImagePullBackOff

CrashLoopBackOff

Readiness Failed

Liveness Failed

Deployment Timeout

Wrong Image

Configuration Error

---

# Troubleshooting Flow

Deployment Failed

↓

Rollout Status

↓

ReplicaSet

↓

Pods

↓

Events

↓

Logs

↓

Readiness

↓

Liveness

↓

Rollback

---

# Production Incident

Version 2 deployed.

Pods started.

Readiness Probe failed.

Customers received 503 errors.

Resolution

Rollback immediately.

Investigate in staging.

Fix application.

Redeploy.

---

# Another Incident

Wrong Docker image tag used.

Pods entered ImagePullBackOff.

Resolution

Rollback to previous revision.

Correct image tag.

Redeploy.

---

# Best Practices

Always use RollingUpdate.

Never deploy directly to production without testing.

Configure Readiness Probes.

Monitor rollout.

Keep revision history.

Automate rollback when required.

---

# Useful Commands

kubectl rollout status deployment app

---

kubectl rollout history deployment app

---

kubectl rollout undo deployment app

---

kubectl rollout restart deployment app

---

kubectl describe deployment app

---

kubectl get rs

---

kubectl get pods -w

---

kubectl logs POD_NAME

---

# Interview Questions

Q1

What is a Rolling Update?

Answer

Rolling Update gradually replaces old Pods with new Pods while keeping the application available.

---

Q2

Difference between Rolling Update and Recreate?

Answer

Rolling Update keeps the application available.

Recreate terminates all old Pods before creating new Pods, causing downtime.

---

Q3

What is maxSurge?

Answer

Maximum number of additional Pods allowed during a Rolling Update.

---

Q4

What is maxUnavailable?

Answer

Maximum number of Pods that may be unavailable during a Rolling Update.

---

Q5

How do you rollback a Deployment?

Answer

kubectl rollout undo deployment <deployment-name>

---

# Scenario Based Interview

Question

Deployment is stuck.

Only half the Pods are updated.

How will you troubleshoot?

Answer

1. Check rollout status.

2. Describe Deployment.

3. Verify ReplicaSet.

4. Check Pod Events.

5. Review Readiness Probe.

6. Check Application Logs.

---

Question

Users report errors immediately after deployment.

What should you do?

Answer

1. Check rollout status.

2. Verify application health.

3. Rollback immediately if production is impacted.

4. Analyze logs.

5. Fix the issue and redeploy.

---

# Production Checklist

✔ Deployment

✔ ReplicaSet

✔ Rolling Update

✔ Readiness Probe

✔ Liveness Probe

✔ Rollout Status

✔ Rollback

✔ Logs

✔ Events

✔ Revision History

---

# Assignment

Deploy Version 1 of an application.

Upgrade to Version 2.

Observe the Rolling Update.

Rollback to Version 1.

Document every command and explain what happened at each stage.

