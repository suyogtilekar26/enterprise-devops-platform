# Kubernetes Interview Master Handbook

# Production Incident 07 - Deployment Rollout Failed

---

# Incident

Developer deployed a new application version.

Deployment started.

Some Pods became Ready.

New Pods failed.

Rollout stopped.

Production deployment failed.

---

# What is Rollout?

## English

A Rollout is the process of replacing old Pods with new Pods.

Kubernetes performs this using the RollingUpdate strategy.

---

## मराठी

Rollout म्हणजे जुने Pods बंद करून नवीन Version चे Pods सुरू करणे.

हे Kubernetes Rolling Update वापरून करते.

---

# Rollout Flow

Deployment Updated

↓

New ReplicaSet Created

↓

New Pods Created

↓

Readiness Check

↓

Old Pods Removed

↓

Deployment Complete

If any step fails

↓

Rollout Failed

---

# Common Reasons

Wrong Image

CrashLoopBackOff

Readiness Probe Failed

ImagePullBackOff

Wrong Environment Variables

ConfigMap Error

Secret Missing

Insufficient Resources

Application Startup Failure

---

# Step 1

Check Deployment

kubectl get deployment

---

# Step 2

Check Rollout Status

kubectl rollout status deployment/frontend

Healthy

deployment successfully rolled out

---

Failed

Waiting for deployment...

---

# Step 3

Check Deployment Details

kubectl describe deployment frontend

Look for

Events

Conditions

ReplicaSets

---

# Step 4

Check Pods

kubectl get pods

Look for

CrashLoopBackOff

ImagePullBackOff

Pending

OOMKilled

---

# Step 5

Check ReplicaSets

kubectl get rs

Example

frontend-7d89

Old ReplicaSet

frontend-9ab1

New ReplicaSet

---

# Step 6

Check Rollout History

kubectl rollout history deployment/frontend

Example

REVISION

1

v1.0.0

REVISION

2

v1.0.1

---

# Step 7

Rollback

kubectl rollout undo deployment/frontend

Rollback starts immediately.

Previous ReplicaSet becomes Active.

---

# Rollback to Specific Revision

kubectl rollout undo deployment/frontend --to-revision=1

---

# Check Logs

kubectl logs POD_NAME

kubectl logs POD_NAME --previous

---

# Check Events

kubectl get events --sort-by=.metadata.creationTimestamp

---

# Troubleshooting Flow

Rollout Failed

↓

Rollout Status

↓

Describe Deployment

↓

Check ReplicaSets

↓

Check Pods

↓

Logs

↓

Events

↓

Fix Root Cause

↓

Redeploy

OR

Rollback

---

# Production Incident

Developer deployed

frontend:v2.0.0

Image contained startup bug.

Readiness Probe failed.

Old Pods remained.

New Pods never became Ready.

Rollout paused.

Resolution

Rollback to previous version.

Investigate application.

Fix bug.

Deploy again.

---

# Another Incident

Developer pushed wrong ConfigMap.

Application crashed during startup.

Rollout never completed.

Rollback restored service within two minutes.

---

# Best Practices

Use RollingUpdate.

Never deploy latest tag.

Keep rollout history.

Use Readiness Probes.

Monitor deployments.

Test before Production.

Automate rollback using GitOps.

---

# Useful Commands

kubectl rollout status deployment/frontend

---

kubectl rollout history deployment/frontend

---

kubectl rollout undo deployment/frontend

---

kubectl describe deployment frontend

---

kubectl get rs

---

kubectl get pods

---

kubectl logs POD_NAME

---

# Interview Questions

Q1

What is a Rollout?

Answer

Replacing old Pods with new Pods during a Deployment update.

---

Q2

How do you check rollout progress?

Answer

kubectl rollout status deployment/frontend

---

Q3

How do you see rollout history?

Answer

kubectl rollout history deployment/frontend

---

Q4

How do you rollback?

Answer

kubectl rollout undo deployment/frontend

---

Q5

What usually causes rollout failures?

Answer

Application crash

Readiness probe failure

Wrong image

Configuration issues

Resource problems

---

# Scenario Based Interview

Question

Deployment is stuck.

Old Pods are Running.

New Pods are not Ready.

What will you do?

Answer

1. Check rollout status

2. Describe Deployment

3. Check ReplicaSets

4. Check Pod Status

5. Review Logs

6. Check Events

7. Verify Readiness Probe

8. Rollback if production impact exists

---

Question

A deployment failed in production.

Users are affected.

What is your first action?

Answer

If service impact is high, rollback immediately to the last stable revision.

After restoring service, investigate the failed release and identify the root cause.

---

# Production Troubleshooting Checklist

✔ kubectl rollout status

✔ kubectl rollout history

✔ kubectl rollout undo

✔ kubectl describe deployment

✔ kubectl get rs

✔ kubectl get pods

✔ kubectl logs

✔ kubectl get events

✔ Verify Readiness Probe

✔ Verify Image Version

---

# Senior Engineer Notes

Production priority is:

1. Restore service.

2. Identify the root cause.

3. Fix the issue.

4. Redeploy safely.

Never spend 30 minutes debugging while production users are down.

Rollback first, investigate second.

