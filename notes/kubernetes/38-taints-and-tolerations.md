# Kubernetes Taints and Tolerations

# 1. Purpose

The purpose of Taints and Tolerations is to control which Pods are allowed to run on specific Kubernetes Nodes.

Unlike Affinity, which attracts Pods to Nodes,

Taints repel Pods unless they explicitly tolerate the Node.

This mechanism is widely used to reserve dedicated infrastructure for specific workloads.

---

# 2. Introduction

Imagine a Production Kubernetes Cluster.

```
Worker Node-1

General Applications

-------------------------

Worker Node-2

General Applications

-------------------------

Worker Node-3

Database Only
```

Without Taints

```
Any Pod

↓

Any Node

✓
```

This may cause

- Database performance issues
- Resource contention
- Security concerns

With Taints

```
Database Node

↓

Only Database Pods

✓

Other Pods

↓

Rejected
```

---

# 3. Enterprise Usage

Taints and Tolerations are commonly used for

- Database Nodes
- GPU Nodes
- AI/ML Workloads
- Monitoring Nodes
- Logging Nodes
- Compliance Workloads
- Dedicated Production Nodes

---

# 4. Usage in THIS Project

Our Enterprise DevOps Platform

```
Worker Node-1

Frontend

API Gateway

-----------------------

Worker Node-2

Auth Service

Dashboard Service

-----------------------

Worker Node-3

PostgreSQL

Dedicated Database Node
```

Only PostgreSQL Pods should run on the Database Node.

---

# 5. Architecture

```
                  Kubernetes Cluster

      ┌────────────┬────────────┬────────────┐

      │            │            │

    Node-1      Node-2      Node-3

 General Apps  General Apps  Database

                               ▲

                               │

                     Taint Applied

                               │

                 PostgreSQL Pod

                     Toleration

                               │

                          Scheduled
```

---

# 6. Internal Workflow

```
Pod Created

↓

Scheduler

↓

Node Has Taint?

↓

YES

↓

Pod Has Matching Toleration?

↓

YES

↓

Schedule Pod

-------------------------

NO

↓

Reject Scheduling
```

---

# 7. What is a Taint?

A Taint is applied to a Node.

It tells Kubernetes

```
Do Not Schedule Pods Here
```

unless a Pod explicitly tolerates the Taint.

Example

```
Database Node

↓

No General Applications
```

---

# 8. What is a Toleration?

A Toleration is applied to a Pod.

It tells Kubernetes

```
This Pod Is Allowed

To Run

On This Tainted Node
```

Example

```
PostgreSQL Pod

↓

Allowed

↓

Database Node
```

---

# 9. Taint Effects

## NoSchedule

```
New Pods

↓

Blocked
```

Most commonly used.

---

## PreferNoSchedule

Scheduler tries to avoid the Node,

but may schedule Pods if required.

---

## NoExecute

Existing Pods are removed unless they tolerate the Taint.

Also blocks new Pods.

---

# 10. Daily DevOps Activities

- Verify Node Taints
- Review Pod Scheduling
- Check Dedicated Nodes
- Monitor Scheduler Events
- Validate Tolerations
- Investigate Pending Pods

---

# 11. Production Best Practices

- Reserve Database Nodes using Taints.
- Use Tolerations only when required.
- Label dedicated Nodes clearly.
- Monitor Node utilization.
- Document all Taints.
- Review scheduling rules regularly.

---

# 12. Security

- Isolate sensitive workloads.
- Prevent unauthorized Pod placement.
- Protect Production Nodes.
- Restrict Node modifications using RBAC.
- Audit Node configuration changes.

---

# 13. Troubleshooting

List Nodes

```bash
kubectl get nodes
```

Describe Node

```bash
kubectl describe node <node-name>
```

View Taints

```bash
kubectl describe node <node-name> | grep Taints
```

Describe Pod

```bash
kubectl describe pod <pod-name>
```

View Events

```bash
kubectl get events
```

---

# 14. Real Production Scenarios

## Scenario 1

### Database Node Misused

Application Pods started consuming the Database Node.

Performance dropped significantly.

Solution

Applied

```
NoSchedule
```

Taint.

Only PostgreSQL Pods with matching Toleration could run.

---

## Scenario 2

### Pod Pending

Application remained

```
Pending
```

Investigation

```bash
kubectl describe pod
```

Reason

```
Node Had Taint

No Matching Toleration
```

Resolution

Added appropriate Toleration.

---

## Scenario 3

### GPU Cluster

AI Team owned expensive GPU Nodes.

General applications accidentally started using them.

GPU utilization became inefficient.

Solution

Applied GPU Node Taints.

Only ML workloads with matching Tolerations were scheduled.

---

# 15. Scenario Interview Questions

Q1. What is a Taint?

Answer

A Taint is applied to a Node to prevent Pods from being scheduled unless they tolerate it.

---

Q2. What is a Toleration?

Answer

A Toleration allows a Pod to run on a Node that has a matching Taint.

---

Q3. What is the difference between Affinity and Taints?

Answer

Affinity attracts Pods to Nodes.

Taints repel Pods from Nodes unless they have a matching Toleration.

---

Q4. What does NoExecute do?

Answer

It prevents new Pods from scheduling and evicts existing Pods that do not tolerate the Taint.

---

# 16. Architecture Interview Questions

Explain scheduling.

```
Pod

↓

Scheduler

↓

Node Taint

↓

Toleration

↓

Schedule

OR

Pending
```

---

Q2.

When should Taints be used?

Answer

When dedicated Nodes must be reserved for specific workloads such as databases, GPUs or monitoring.

---

# 17. Production Support Interview Questions

Production Investigation Flow

```
Pod Pending

↓

Describe Pod

↓

Describe Node

↓

Check Taints

↓

Check Tolerations

↓

Scheduler Events

↓

Resolved
```

Manager Question

"Our Database Node is running API Pods."

Expected Answer

- Verify Node Taints
- Review Tolerations
- Check Scheduler Events
- Apply NoSchedule Taint
- Redeploy Workloads
- Validate Pod Placement

---

# 18. Related Runbooks

- pod-pending-taints.md
- database-node-isolation.md
- scheduler-node-selection.md

---

# 19. Common Incidents

- Missing Toleration
- Incorrect Taint
- Pod Pending
- Database Node Resource Contention
- Scheduler Rejection

---

# 20. Commands

```bash
kubectl get nodes

kubectl describe node <node-name>

kubectl taint nodes <node-name> dedicated=db:NoSchedule

kubectl taint nodes <node-name> dedicated=db:NoSchedule-

kubectl describe pod <pod-name>

kubectl get events
```

---

# 21. YAML Deep Dive

Example

```yaml
spec:
  tolerations:
  - key: "dedicated"
    operator: "Equal"
    value: "db"
    effect: "NoSchedule"
```

Explanation

```
tolerations
```

Defines which Node Taints the Pod can tolerate.

```
key
```

Matches the Taint key on the Node.

```
operator
```

Defines how the value is matched.

Common values

- Equal
- Exists

```
value
```

Must match the Node Taint value.

```
effect
```

Must match the Node Taint effect.

Example

```
Node

↓

dedicated=db:NoSchedule

↓

Pod

↓

Matching Toleration

↓

Scheduled
```

---

# 22. Marathi Quick Revision

- Taint Node वर लावतात.
- Toleration Pod वर लावतात.
- Taint म्हणजे Node वर सामान्य Pods येऊ देऊ नका.
- Toleration म्हणजे हा Pod त्या Node वर चालू शकतो.
- Production मध्ये Database, GPU आणि Monitoring Nodes साठी वापरतात.

---

# 23. Marathi Summary (5+ Years Experience Revision)

## Interview Summary

Taints आणि Tolerations Kubernetes Scheduler ला कोणते Pods कोणत्या Nodes वर चालू द्यायचे हे नियंत्रित करतात.

Taint Node ला Protect करतो.

Toleration Pod ला त्या Protected Node वर चालण्याची परवानगी देतो.

## Production Investigation Flow

```
Pod Pending

↓

Describe Pod

↓

Describe Node

↓

Check Taints

↓

Check Tolerations

↓

Events

↓

Resolved
```

## Production Story

Production EKS Cluster मध्ये PostgreSQL साठी Dedicated High-Memory Nodes होते.

एका चुकीच्या Deployment मुळे API Pods त्या Nodes वर Schedule झाले आणि Database Performance कमी झाली.

RCA मध्ये Taints कॉन्फिगर नसल्याचे आढळले.

`NoSchedule` Taint लागू करून आणि PostgreSQL ला Toleration देऊन Database Nodes पूर्णपणे Isolate करण्यात आले.

## Memory Trick

**Affinity = Attraction**

**Taint = Repel**

**Toleration = Permission**

Remember

**Taint on Node → Toleration on Pod**

