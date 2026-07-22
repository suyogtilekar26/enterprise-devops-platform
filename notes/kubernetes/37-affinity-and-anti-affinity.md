# Kubernetes Affinity and Anti-Affinity

# 1. Purpose

The purpose of Affinity and Anti-Affinity is to control where Pods are scheduled in a Kubernetes Cluster.

They help Kubernetes decide

- Which Nodes should run a Pod
- Which Pods should run together
- Which Pods should never run together

These scheduling rules improve

- High Availability
- Performance
- Fault Tolerance
- Compliance

---

# 2. Introduction

Imagine our API Gateway Deployment has

```
5 Pods
```

Without scheduling rules

```
Node-1

Pod-1

Pod-2

Pod-3

Pod-4

Pod-5
```

If Node-1 crashes

```
All Pods Lost

↓

Application Down
```

Affinity and Anti-Affinity solve this problem.

---

# 3. Enterprise Usage

Affinity is widely used for

- Database Applications
- Cache Servers
- AI Workloads
- High Performance Applications

Anti-Affinity is used for

- API Gateway
- Authentication Services
- Banking Applications
- Payment Services
- HA Microservices

---

# 4. Usage in THIS Project

Our Enterprise DevOps Platform

```
API Gateway

↓

5 Pods

↓

Spread Across

Node-1

Node-2

Node-3
```

Database Pods

```
Database

↓

Storage Node

↓

Dedicated Infrastructure
```

---

# 5. Architecture

```
             Worker Nodes

        ┌────────┬────────┬────────┐

        │        │        │

      Node-1   Node-2   Node-3

        │        │        │

      API-1    API-2    API-3

        │                 │

      Auth-1          Dashboard-1

-------------------------------

Database

↓

Dedicated Node
```

---

# 6. Internal Workflow

```
Deployment Created

↓

Scheduler

↓

Affinity Rules

↓

Anti-Affinity Rules

↓

Suitable Node Found?

↓

YES

↓

Pod Scheduled

------------------------

NO

↓

Pending
```

---

# 7. Node Affinity

Purpose

Node Affinity schedules Pods on specific Nodes.

Example

```
Database

↓

SSD Nodes Only
```

Example

```
GPU Application

↓

GPU Nodes Only
```

Production Examples

- GPU Nodes
- High Memory Nodes
- SSD Storage Nodes
- Compliance Nodes

---

# 8. Pod Affinity

Purpose

Pod Affinity places Pods close together.

Example

```
Application

↓

Redis Cache

↓

Same Node
```

Benefits

- Lower Network Latency
- Faster Communication
- Better Performance

---

# 9. Pod Anti-Affinity

Purpose

Ensure Pods are distributed across multiple Nodes.

Example

```
API Gateway

Pod-1

↓

Node-1

--------------------

Pod-2

↓

Node-2

--------------------

Pod-3

↓

Node-3
```

If one Node fails,

other Pods continue serving traffic.

---

# 10. Daily DevOps Activities

- Verify Scheduler Decisions
- Review Node Labels
- Monitor Pod Distribution
- Investigate Pending Pods
- Validate High Availability
- Review Scheduling Events

---

# 11. Production Best Practices

- Use Anti-Affinity for critical applications.
- Use Node Affinity for dedicated hardware.
- Label Nodes consistently.
- Avoid overly restrictive scheduling.
- Test scheduling policies before Production.
- Monitor Pod distribution after deployments.

---

# 12. Security

- Isolate sensitive workloads.
- Separate Production and Development Nodes.
- Use Node Labels carefully.
- Restrict label modification using RBAC.
- Audit scheduling policy changes.

---

# 13. Troubleshooting

Check Nodes

```bash
kubectl get nodes --show-labels
```

Describe Pod

```bash
kubectl describe pod <pod-name>
```

Describe Node

```bash
kubectl describe node <node-name>
```

View Events

```bash
kubectl get events
```

Check Pod Placement

```bash
kubectl get pods -o wide
```

---

# 14. Real Production Scenarios

## Scenario 1

### API Gateway Concentrated on One Node

All API Pods were scheduled on

```
Node-2
```

Node-2 crashed.

Entire API became unavailable.

Solution

Implemented Pod Anti-Affinity.

Pods were distributed across three Worker Nodes.

---

## Scenario 2

### Database Scheduled on Wrong Node

Database Pod started on

```
Standard HDD Node
```

Performance dropped significantly.

Root Cause

Node Affinity missing.

Resolution

Configured Node Affinity for SSD Nodes.

---

## Scenario 3

### Pod Pending

Application never started.

Investigation

```bash
kubectl describe pod
```

Reason

```
No Node Matched

Affinity Rules
```

Resolution

Corrected Node Labels.

---

# 15. Scenario Interview Questions

Q1. What is Node Affinity?

Answer

Node Affinity ensures Pods are scheduled only on Nodes matching specific labels.

---

Q2. What is Pod Affinity?

Answer

Pod Affinity schedules Pods close to other selected Pods for improved communication.

---

Q3. What is Pod Anti-Affinity?

Answer

Pod Anti-Affinity spreads Pods across different Nodes to improve High Availability.

---

Q4. Why is Anti-Affinity important?

Answer

It prevents all replicas from running on the same Node, reducing the impact of Node failures.

---

# 16. Architecture Interview Questions

Explain the scheduling flow.

```
Deployment

↓

Scheduler

↓

Affinity Rules

↓

Node Selection

↓

Pod Scheduled
```

---

Q2.

What happens if no Node satisfies the Affinity rule?

Answer

The Pod remains in the Pending state until a suitable Node becomes available.

---

# 17. Production Support Interview Questions

Production Investigation Flow

```
Pod Pending

↓

Describe Pod

↓

Scheduler Events

↓

Node Labels

↓

Affinity Rules

↓

Schedule Pod

↓

Resolved
```

Manager Question

"Our API became unavailable after one Worker Node failed."

Expected Answer

- Check Pod Distribution
- Verify Pod Anti-Affinity
- Review Node Failure
- Confirm Replica Placement
- Validate High Availability Configuration
- Restore Service

---

# 18. Related Runbooks

- pod-pending-affinity.md
- node-label-mismatch.md
- scheduler-failed.md

---

# 19. Common Incidents

- Pod Pending
- Incorrect Node Labels
- Missing Anti-Affinity
- Scheduler Failure
- Uneven Pod Distribution

---

# 20. Commands

```bash
kubectl get nodes --show-labels

kubectl describe node <node-name>

kubectl describe pod <pod-name>

kubectl get pods -o wide

kubectl get events
```

---

# 21. YAML Deep Dive

Example

```yaml
affinity:
  podAntiAffinity:
    requiredDuringSchedulingIgnoredDuringExecution:
    - labelSelector:
        matchExpressions:
        - key: app
          operator: In
          values:
          - api-gateway
      topologyKey: kubernetes.io/hostname
```

Explanation

```
affinity
```

Defines scheduling preferences and requirements.

```
podAntiAffinity
```

Ensures matching Pods are scheduled on different Nodes.

```
requiredDuringSchedulingIgnoredDuringExecution
```

This rule must be satisfied before scheduling.

```
labelSelector
```

Selects Pods using labels.

```
matchExpressions
```

Provides advanced label matching.

```
topologyKey
```

Specifies the topology boundary.

`kubernetes.io/hostname` means Pods should be distributed across different Worker Nodes.

---

# 22. Marathi Quick Revision

- Node Affinity म्हणजे Pod विशिष्ट Node वर चालवणे.
- Pod Affinity म्हणजे Pods जवळ ठेवणे.
- Pod Anti-Affinity म्हणजे Pods वेगवेगळ्या Nodes वर ठेवणे.
- High Availability साठी Anti-Affinity वापरतात.
- Scheduler Node Labels वापरून निर्णय घेतो.

---

# 23. Marathi Summary (5+ Years Experience Revision)

## Interview Summary

Affinity आणि Anti-Affinity Kubernetes Scheduler ला Pods कुठे चालवायचे हे सांगतात.

Node Affinity विशिष्ट Nodes निवडते.

Pod Affinity संबंधित Pods जवळ ठेवते.

Pod Anti-Affinity Pods वेगवेगळ्या Worker Nodes वर पसरवते, ज्यामुळे High Availability मिळते.

## Production Investigation Flow

```
Pod Pending

↓

Describe Pod

↓

Scheduler Events

↓

Node Labels

↓

Affinity Rules

↓

Resolved
```

## Production Story

Production API Gateway चे सर्व Pods चुकून एका Worker Node वर Schedule झाले.

त्या Node मध्ये Hardware Failure झाला आणि संपूर्ण API Service Down झाली.

RCA मध्ये Pod Anti-Affinity कॉन्फिगर नसल्याचे आढळले.

Pod Anti-Affinity लागू केल्यानंतर Pods तीन Worker Nodes वर वितरित झाले आणि पुढील Node Failure मध्ये कोणताही Downtime झाला नाही.

## Memory Trick

**Node Affinity = Right Node**

**Pod Affinity = Together**

**Pod Anti-Affinity = Apart**

Remember

**Affinity = Close**

**Anti-Affinity = Spread**

