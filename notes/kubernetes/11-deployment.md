# Kubernetes Deployment

# 1. Purpose

The purpose of a Deployment is to manage application Pods in production.

Deployment provides

- Rolling Updates
- Rollbacks
- Scaling
- Self-Healing
- High Availability

In production, applications are deployed using Deployments instead of standalone Pods.

---

# 2. Introduction

Deployment is a higher-level Kubernetes object.

It manages

Deployment

↓

ReplicaSet

↓

Pods

If Pods fail, Deployment ensures ReplicaSet recreates them automatically.

---

# 3. Enterprise Usage

Almost every Production Application uses Deployments.

Examples

- Frontend
- API Gateway
- Authentication Service
- Dashboard Service
- Notification Service
- Payment Service

Databases usually use StatefulSets instead of Deployments.

---

# 4. Usage in THIS Project

```
Frontend Deployment

↓

ReplicaSet

↓

Frontend Pods

----------------------------

API Gateway Deployment

↓

ReplicaSet

↓

API Pods

----------------------------

Auth Deployment

↓

ReplicaSet

↓

Auth Pods

----------------------------

Dashboard Deployment

↓

ReplicaSet

↓

Dashboard Pods
```

---

# 5. Architecture

```
             Deployment

                  │

                  ▼

             ReplicaSet

        ┌────────┼────────┐

        ▼        ▼        ▼

      Pod-1    Pod-2    Pod-3

```

---

# 6. Internal Workflow

```
Developer

↓

kubectl apply

↓

Deployment Created

↓

ReplicaSet Created

↓

Pods Created

↓

Application Running

↓

Health Checks

↓

Users
```

---

# 7. Rolling Update

One of the biggest advantages of Deployment is Rolling Update.

Old Pods are replaced one by one.

```
Version 1

Pod-1

Pod-2

Pod-3

↓

Rolling Update Starts

↓

Pod-1 Updated

↓

Pod-2 Updated

↓

Pod-3 Updated

↓

Version 2 Running
```

Users continue using the application during deployment.

No downtime.

---

# 8. Rollback

If a deployment fails,

Deployment automatically allows rollback.

```
Version 1

↓

Deploy Version 2

↓

Application Failure

↓

Rollback

↓

Version 1 Restored
```

This is heavily used in production.

---

# 9. Daily DevOps Activities

- Deploy Applications
- Scale Deployments
- Check Rollout Status
- Rollback Failed Deployments
- Monitor Replica Count
- Monitor Pod Health

---

# 10. Production Best Practices

- Never deploy standalone Pods.
- Always use Deployments.
- Configure Readiness Probe.
- Configure Liveness Probe.
- Use Rolling Updates.
- Keep Replica Count greater than one.
- Enable Monitoring.

---

# 11. Security

- Use RBAC.
- Store Secrets separately.
- Scan Images.
- Use Image Digests.
- Restrict Deployment Permissions.

---

# 12. Troubleshooting

List Deployments

```bash
kubectl get deployments
```

Describe Deployment

```bash
kubectl describe deployment <deployment-name>
```

Rollout Status

```bash
kubectl rollout status deployment <deployment-name>
```

Deployment History

```bash
kubectl rollout history deployment <deployment-name>
```

---

# 13. Real Production Scenarios

## Scenario 1

### Zero Downtime Deployment

```
Version-1

↓

Rolling Update

↓

Old Pod Deleted

↓

New Pod Created

↓

Health Check Passed

↓

Next Pod Updated

↓

Deployment Complete
```

Production Story

A Banking Application required deployment during office hours.

Instead of stopping the application,

Deployment updated one Pod at a time.

Users continued using the application.

No outage occurred.

---

## Scenario 2

### Bad Release

Developer deployed Version 2.

Application returned HTTP 500.

Resolution

```
kubectl rollout undo deployment frontend
```

Rollback completed within seconds.

---

## Scenario 3

### Manual Scaling

Traffic increased.

Replica Count changed

3

↓

6

Deployment created three additional Pods automatically.

---

# 14. Scenario Interview Q&A

Q. Why do we use Deployments instead of Pods?

Answer

Deployments provide

- Self-Healing
- Rolling Updates
- Rollbacks
- Scaling

Standalone Pods do not.

---

Q. Which Kubernetes object manages ReplicaSets?

Answer

Deployment.

---

Q. Can Deployment rollback a failed release?

Answer

Yes.

Using Rollback.

---

# 15. Architecture Interview Q&A

```
Deployment

↓

ReplicaSet

↓

Pods

↓

Users
```

Deployment manages ReplicaSets.

ReplicaSet manages Pods.

Pods run the application.

---

# 16. Production Support Interview Q&A

Deployment Failure Investigation

```
Alert

↓

kubectl get deployments

↓

Rollout Status

↓

ReplicaSet

↓

Pods

↓

Logs

↓

Events

↓

Root Cause

↓

Rollback

↓

Verification
```

---

# 17. Related Runbooks

- deployment-failure.md
- rollout-failure.md
- rollback.md
- pod-crashloop.md

---

# 18. Common Incidents

- Rollout Failed
- Replica Mismatch
- CrashLoopBackOff
- ImagePullBackOff
- Failed Rollback
- Readiness Probe Failure

---

# 19. Commands

```bash
kubectl get deployments

kubectl describe deployment <deployment>

kubectl rollout status deployment <deployment>

kubectl rollout history deployment <deployment>

kubectl rollout undo deployment <deployment>

kubectl scale deployment frontend --replicas=5
```

---

# 20. Marathi Quick Revision

- Deployment Production मध्ये Application Deploy करण्यासाठी वापरतात.
- Deployment ReplicaSet Manage करतो.
- ReplicaSet Pods Manage करतो.
- Deployment Rolling Update आणि Rollback देतो.
- Production मध्ये Standalone Pod वापरत नाहीत.

---

# 21. Marathi Summary (5+ Experience Revision)

## Interview Summary

Deployment हा Production मधील सर्वात महत्त्वाचा Kubernetes Object आहे.

तो ReplicaSet वापरून Pods Manage करतो.

Rolling Updates आणि Rollbacks ही त्याची सर्वात महत्त्वाची Features आहेत.

## Production Investigation Flow

```
Alert

↓

kubectl get deployments

↓

Rollout Status

↓

ReplicaSet

↓

Pods

↓

Logs

↓

Events

↓

Rollback

↓

Verify
```

## Production Story

Production मध्ये नवीन Release Deploy केली.

एका नवीन Pod मध्ये Application Crash झाली.

Deployment ने Rollout Pause केला.

Team ने Rollback केला.

एका मिनिटात Application पुन्हा Stable झाली.

Business ला Downtime जाणवला नाही.

## Memory Trick

Deployment

↓

ReplicaSet

↓

Pods

↓

Application

Remember

**Deployment Deploys**

**ReplicaSet Protects**

**Pods Run**

