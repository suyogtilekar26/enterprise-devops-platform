# Kubernetes Scheduler

# 1. Purpose

The purpose of the Kubernetes Scheduler is to determine the best Worker Node on which a newly created Pod should run.

The Scheduler does not create Pods.

It only decides

**Which Node should run the Pod.**

Scheduling decisions are based on

- Resource Availability
- Node Labels
- Node Affinity
- Taints & Tolerations
- Pod Affinity
- Pod Anti-Affinity
- Resource Requests
- Scheduling Policies

The Scheduler is one of the core Kubernetes Control Plane components.

---

# 2. Introduction

Imagine our Enterprise DevOps Platform.

A Deployment requests

```
3 Replicas
```

Question

```
Which Worker Node
should run these Pods?
```

Answer

```
Kubernetes Scheduler
```

Example

```
Deployment

↓

API Server

↓

Scheduler

↓

Worker Node 1

↓

Pod Running
```

Without Scheduler

```
Deployment

↓

Pending

↓

No Node Selected

↓

Application Never Starts
```

---

# 3. Enterprise Usage

Every Enterprise Kubernetes Cluster depends on the Scheduler.

Used in

- AWS EKS
- Azure AKS
- Google GKE
- OpenShift
- Rancher
- On-Prem Kubernetes

Large Production clusters schedule thousands of Pods every minute.

---

# 4. Usage in THIS Project

Enterprise DevOps Platform

```
Frontend

↓

Scheduler

↓

Worker Node-1

------------------------

API Gateway

↓

Scheduler

↓

Worker Node-2

------------------------

Auth Service

↓

Scheduler

↓

Worker Node-3

------------------------

Dashboard Service

↓

Scheduler

↓

Worker Node-2
```

The Scheduler will intelligently distribute workloads across available Worker Nodes.

---

# 5. Architecture

```
              Deployment

                   │

                   ▼

              API Server

                   │

                   ▼

              Scheduler

         ┌─────────┼─────────┐

         ▼         ▼         ▼

     Worker-1  Worker-2  Worker-3

         ▼         ▼         ▼

        Pod       Pod       Pod
```

---

# 6. Internal Workflow

```
Deployment Created

↓

API Server

↓

Object Stored in etcd

↓

Scheduler Watches API Server

↓

Find Unscheduled Pod

↓

Evaluate Worker Nodes

↓

Best Node Selected

↓

Bind Pod

↓

Kubelet Starts Container
```

---

# 7. Responsibilities of Scheduler

The Scheduler performs

- Watches Pending Pods
- Finds Eligible Nodes
- Calculates Scores
- Chooses Best Node
- Binds Pod to Node

It never runs containers.

That responsibility belongs to

```
Kubelet
```

---

# 8. Scheduling Process

The Scheduler uses two phases.

## Filtering Phase

Removes Nodes that cannot run the Pod.

Example

```
Worker-1

CPU Full

↓

Rejected

-----------------------

Worker-2

Enough CPU

↓

Eligible

-----------------------

Worker-3

Memory Full

↓

Rejected
```

---

## Scoring Phase

Eligible Nodes receive scores.

Example

```
Worker-2

Score

95

--------------------

Worker-4

Score

80
```

Highest score wins.

---

# 9. Scheduling Factors

The Scheduler considers

- CPU Requests
- Memory Requests
- Node Capacity
- Node Labels
- Node Affinity
- Pod Affinity
- Pod Anti-Affinity
- Taints
- Tolerations
- Topology Spread Constraints

---

# 10. Daily DevOps Activities

- Investigate Pending Pods
- Review Scheduling Events
- Check Resource Availability
- Review Node Labels
- Verify Affinity Rules
- Troubleshoot Scheduler Decisions

---

# 11. Production Best Practices

- Define Resource Requests.
- Use Node Labels.
- Avoid unnecessary Affinity Rules.
- Balance workloads across Nodes.
- Monitor Pending Pods.
- Avoid Node Resource Exhaustion.

---

# 12. Security

- Use Node Isolation.
- Protect Dedicated Nodes.
- Combine Scheduler with RBAC.
- Use Taints for Sensitive Workloads.
- Restrict privileged workloads.

---

# 13. Troubleshooting

Check Pending Pods

```bash
kubectl get pods
```

Describe Pod

```bash
kubectl describe pod <pod-name>
```

Check Nodes

```bash
kubectl get nodes
```

Describe Node

```bash
kubectl describe node <node-name>
```

View Events

```bash
kubectl get events
```

---

# 14. Real Production Scenarios

## Scenario 1

### Pod Pending

Symptoms

```
Pod

↓

Pending
```

Investigation

```
kubectl describe pod
```

Result

```
Insufficient CPU
```

Resolution

Scaled Worker Nodes.

---

## Scenario 2

### Wrong Node Placement

Database Pod deployed on General Worker.

Root Cause

Missing Node Affinity.

Resolution

Added

```
nodeAffinity
```

Database deployed on dedicated Database Node.

---

## Scenario 3

### Taints Prevent Scheduling

Developer created Pod.

Status

```
Pending
```

Reason

```
No Toleration
```

Resolution

Added matching Toleration.

---

# 15. Scenario Interview Questions

Q1. What is the Kubernetes Scheduler?

Answer

The Scheduler selects the most suitable Worker Node for newly created Pods.

---

Q2. Does the Scheduler create Pods?

Answer

No.

The Scheduler only assigns Pods to Worker Nodes.

Kubelet starts the containers.

---

Q3. What happens if no Node satisfies scheduling requirements?

Answer

The Pod remains in the Pending state until an eligible Node becomes available.

---

Q4. What information does the Scheduler use before scheduling?

Answer

CPU, Memory, Labels, Affinity, Taints, Tolerations, Topology and Scheduling Policies.

---

# 16. Architecture Interview Questions

Explain Scheduler Workflow.

```
Deployment

↓

API Server

↓

Scheduler

↓

Find Eligible Nodes

↓

Score Nodes

↓

Best Node

↓

Bind Pod

↓

Kubelet

↓

Container Running
```

---

Q2.

Why are Resource Requests important for scheduling?

Answer

The Scheduler uses Resource Requests to determine whether a Node has sufficient CPU and Memory to run the Pod.

---

# 17. Production Support Interview Questions

Production Investigation Flow

```
Pod Pending

↓

kubectl describe pod

↓

Scheduling Events

↓

Check Nodes

↓

Resource Availability

↓

Affinity

↓

Taints

↓

Resolved
```

Manager Question

"Our Production Deployment is stuck in Pending."

Expected Answer

- Check Pod Events
- Verify Scheduler Messages
- Check CPU & Memory
- Verify Node Labels
- Review Affinity Rules
- Review Taints & Tolerations
- Scale Cluster if required

---

# 18. Related Runbooks

- pod-pending.md
- scheduler-failed.md
- insufficient-resources.md

---

# 19. Common Incidents

- Pod Pending
- Insufficient CPU
- Insufficient Memory
- Node Affinity Mismatch
- Missing Toleration
- Unschedulable Node

---

# 20. Commands

```bash
kubectl get pods

kubectl describe pod <pod-name>

kubectl get nodes

kubectl describe node <node-name>

kubectl top nodes

kubectl get events
```

---

# 21. YAML Deep Dive

Example

```yaml
spec:
  nodeSelector:
    workload: backend

  containers:
  - name: api-gateway

    resources:
      requests:
        cpu: "500m"
        memory: "512Mi"
```

Explanation

```
nodeSelector
```

Restricts scheduling to Nodes with the specified label.

```
resources.requests
```

The Scheduler uses these values to determine whether the Node has sufficient available resources.

Scheduling Flow

```
Pod Created

↓

Scheduler

↓

Check Labels

↓

Check CPU

↓

Check Memory

↓

Select Best Node

↓

Bind Pod
```

---

# 22. Marathi Quick Revision

- Scheduler म्हणजे Pod कोणत्या Worker Node वर चालेल हे ठरवतो.
- Scheduler Pod Run करत नाही.
- Kubelet Container Start करतो.
- Scheduler CPU, Memory, Labels आणि Affinity तपासतो.
- योग्य Node न मिळाल्यास Pod Pending राहतो.

---

# 23. Marathi Summary (5+ Years Experience Revision)

## Interview Summary

Kubernetes Scheduler हा Control Plane Component आहे जो नवीन Pods साठी सर्वोत्तम Worker Node निवडतो.

तो CPU, Memory, Node Labels, Affinity, Taints आणि इतर Scheduling Rules तपासून योग्य Node निवडतो.

Pod Start करण्याचे काम Scheduler करत नाही; ते Kubelet करते.

## Production Investigation Flow

```
Pod Pending

↓

Scheduler Events

↓

Node Resources

↓

Labels

↓

Affinity

↓

Taints

↓

Resolved
```

## Production Story

Production Cluster मध्ये API Gateway चे Pods सतत Pending अवस्थेत होते.

`kubectl describe pod` मध्ये `0/6 nodes are available: Insufficient memory` असा संदेश दिसला.

Investigation मध्ये Worker Nodes वर Memory पूर्णपणे वापरली गेली असल्याचे आढळले.

Cluster Autoscaler ने नवीन Nodes जोडले आणि Scheduler ने Pending Pods नवीन Nodes वर Schedule केले.

Application पुन्हा Normal झाली.

## Memory Trick

**API Server = Accepts Request**

↓

**etcd = Stores State**

↓

**Scheduler = Chooses Node**

↓

**Kubelet = Runs Container**

