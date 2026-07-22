# Kubernetes ReplicaSet

# 1. Purpose

The purpose of ReplicaSet is to ensure that the required number of Pod replicas are always running.

If a Pod crashes, ReplicaSet automatically creates a new Pod.

This is one of the main reasons Kubernetes provides Self-Healing.

---

# 2. Introduction

A ReplicaSet continuously monitors Pods.

It compares

Desired Pods

vs

Running Pods

If they are different,

ReplicaSet fixes the difference automatically.

Example

Desired Pods = 3

Running Pods = 2

ReplicaSet immediately creates one new Pod.

---

# 3. Enterprise Usage

ReplicaSets are rarely created manually.

Production applications use

Deployment

↓

ReplicaSet

↓

Pods

ReplicaSet works behind every Deployment.

---

# 4. Usage in THIS Project

```
Deployment

↓

ReplicaSet

↓

Frontend Pods

↓

API Gateway Pods

↓

Auth Pods

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

        Desired Pods = 3

      ┌────────┼────────┐

      ▼        ▼        ▼

    Pod-1    Pod-2    Pod-3
```

---

# 6. Internal Workflow

```
Deployment Created

↓

ReplicaSet Created

↓

ReplicaSet Creates Pods

↓

Pod Crash

↓

ReplicaSet Detects Failure

↓

New Pod Created

↓

Desired State Restored
```

---

# 7. How ReplicaSet Works

ReplicaSet continuously watches Pods.

If

Pod Deleted

↓

ReplicaSet notices

↓

Creates another Pod

If

Node crashes

↓

Pods disappear

↓

ReplicaSet creates replacement Pods on another healthy Node.

---

# 8. Scaling

ReplicaSet supports scaling.

Example

Current Pods = 3

Scale to 5

```
ReplicaSet

Desired = 5

↓

Creates

Pod-4

Pod-5
```

Scale Down

Desired = 2

↓

Deletes extra Pods.

---

# 9. Daily DevOps Activities

- Check ReplicaSets
- Verify Desired Replicas
- Monitor Pod Recreation
- Scale Applications
- Investigate Missing Pods

---

# 10. Production Best Practices

- Never create standalone Pods.
- Use Deployments.
- Monitor Replica Health.
- Always maintain multiple replicas.
- Configure Resource Limits.

---

# 11. Security

- Use RBAC.
- Protect Deployments.
- Scan Images.
- Restrict API Access.

---

# 12. Troubleshooting

List ReplicaSets

```bash
kubectl get rs
```

Describe ReplicaSet

```bash
kubectl describe rs <replicaset-name>
```

List Pods

```bash
kubectl get pods
```

---

# 13. Real Production Scenarios

## Scenario 1

### Pod Crash

```
Pod Running

↓

Application Crash

↓

Pod Deleted

↓

ReplicaSet Detects

↓

Creates New Pod

↓

Application Available
```

Production Story

A Java application crashed because of Out Of Memory.

The Pod terminated.

ReplicaSet immediately created another Pod.

Users experienced only a few seconds of recovery time.

---

## Scenario 2

### Worker Node Failure

```
Worker Node

↓

Crash

↓

Pods Lost

↓

ReplicaSet

↓

Scheduler

↓

Healthy Worker Node

↓

New Pods Running
```

---

## Scenario 3

### Accidental Pod Deletion

Developer accidentally executed

```bash
kubectl delete pod frontend-pod
```

Within seconds

ReplicaSet recreated the Pod automatically.

---

# 14. Scenario Interview Q&A

Q. What is ReplicaSet?

Answer

ReplicaSet ensures the desired number of Pods are always running.

---

Q. Does ReplicaSet perform Rolling Updates?

Answer

No.

Deployment performs Rolling Updates.

ReplicaSet only maintains Pod count.

---

Q. Can ReplicaSet recreate a deleted Pod?

Answer

Yes.

Automatically.

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

Deployment manages ReplicaSet.

ReplicaSet manages Pods.

---

# 16. Production Support Interview Q&A

Investigation Flow

```
Alert

↓

kubectl get rs

↓

Desired Replicas?

↓

Current Replicas?

↓

kubectl get pods

↓

Describe ReplicaSet

↓

Root Cause

↓

Fix
```

---

# 17. Related Runbooks

- pod-crashloop.md
- deployment-failure.md
- replica-mismatch.md

---

# 18. Common Incidents

- Missing Pods
- Replica Mismatch
- Pod Crash
- Failed Scheduling
- Node Failure

---

# 19. Commands

```bash
kubectl get rs

kubectl describe rs <name>

kubectl get deployments

kubectl get pods

kubectl scale deployment frontend --replicas=5
```

---

# 20. Marathi Quick Revision

- ReplicaSet Pods ची संख्या Maintain करतो.
- Pod Delete झाला तर नवीन Pod तयार करतो.
- ReplicaSet Self-Healing देतो.
- ReplicaSet Deployment च्या मागे काम करतो.

---

# 21. Marathi Summary (5+ Experience Revision)

## Interview Summary

ReplicaSet ensures the desired number of Pods are always available.

It automatically recreates failed or deleted Pods.

Deployment uses ReplicaSet internally.

## Production Investigation Flow

```
Alert

↓

kubectl get rs

↓

Desired = Current ?

↓

No

↓

kubectl describe rs

↓

Pods

↓

Events

↓

Root Cause
```

## Production Story

एका Production Node वर Hardware Failure झाला.

त्या Node वरील सर्व Pods गायब झाले.

ReplicaSet ने लगेच नवीन Pods दुसऱ्या Worker Node वर तयार केले.

Application सतत Available राहिली.

## Memory Trick

**Deployment → ReplicaSet → Pods**

Remember

**Deployment manages ReplicaSet**

**ReplicaSet manages Pods**

