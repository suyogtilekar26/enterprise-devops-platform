# Kubernetes Interview Master Handbook

# Architecture 06 - Scheduling Deep Dive

---

# What is Scheduling?

## English

Scheduling is the process of selecting the best Worker Node for a Pod.

The Kubernetes Scheduler continuously watches for Pending Pods and assigns them to suitable nodes.

---

## मराठी

Scheduling म्हणजे Pod साठी योग्य Worker Node निवडण्याची प्रक्रिया.

Scheduler Pending Pods पाहतो आणि योग्य Node वर त्यांना schedule करतो.

---

# Scheduling Workflow

Developer

↓

Deployment Created

↓

API Server

↓

Pending Pod

↓

Scheduler

↓

Find Candidate Nodes

↓

Filter Nodes

↓

Score Nodes

↓

Best Node Selected

↓

Bind Pod

↓

kubelet

↓

Container Running

---

# Scheduler Filtering

Scheduler removes unsuitable Nodes based on

Resources

NodeSelector

Node Affinity

Taints

Node Conditions

Volume Constraints

---

# Scheduler Scoring

Remaining Nodes receive scores.

Factors

Available CPU

Available Memory

Balanced Resources

Topology Spread

Affinity Preferences

Lowest resource pressure

Highest scoring node wins.

---

# Node Selector

Purpose

Schedule Pods only on specific Nodes.

Example

environment=production

Only nodes with that label are selected.

---

# Node Affinity

More flexible than NodeSelector.

Types

RequiredDuringSchedulingIgnoredDuringExecution

PreferredDuringSchedulingIgnoredDuringExecution

---

Required

Pod will not schedule without matching Node.

---

Preferred

Scheduler prefers matching Nodes but can use others.

---

# Pod Affinity

Purpose

Schedule Pods together.

Example

Frontend near Backend.

Benefits

Lower latency

Better performance

---

# Pod Anti-Affinity

Purpose

Keep Pods apart.

Example

Replica Pods on different Nodes.

Benefits

High Availability

Fault Tolerance

---

# Taints

Purpose

Prevent Pods from being scheduled.

Example

Dedicated Database Node

Maintenance Node

GPU Node

---

Example

NoSchedule

↓

No Pod allowed

Unless tolerated.

---

# Tolerations

Purpose

Allow Pods to use tainted Nodes.

Without Toleration

↓

Pod stays Pending.

---

With Toleration

↓

Pod schedules successfully.

---

# Requests

Minimum guaranteed resources.

CPU

Memory

Scheduler uses Requests while selecting Nodes.

---

# Limits

Maximum allowed resources.

If exceeded

Container may be throttled

OR

OOMKilled

---

# Priority Classes

Purpose

High priority workloads schedule first.

Examples

Critical System Pods

Monitoring

Logging

---

# Preemption

High Priority Pod arrives

↓

Cluster Full

↓

Low Priority Pod Evicted

↓

High Priority Pod Scheduled

---

# Scheduling Constraints

Node Selector

↓

Node Affinity

↓

Pod Affinity

↓

Pod Anti-Affinity

↓

Taints

↓

Tolerations

↓

Resources

↓

Topology

↓

Node Selected

---

# Common Scheduling Problems

Insufficient CPU

Insufficient Memory

NodeSelector mismatch

Affinity mismatch

Taints

Missing Tolerations

PVC Constraints

Node NotReady

---

# Troubleshooting Flow

Pod Pending

↓

Describe Pod

↓

Events

↓

Scheduler Message

↓

Resources

↓

Affinity

↓

Taints

↓

Node Status

↓

Scheduled

---

# Production Incident

Production Nodes

Tainted

NoSchedule

Developer forgot Toleration.

Pods remained Pending.

Resolution

Add matching Toleration.

---

# Another Incident

Application required

SSD Nodes

NodeAffinity configured incorrectly.

Scheduler found no matching Node.

Resolution

Correct Node labels.

---

# Best Practices

Use Requests on every Pod.

Avoid excessive Limits.

Use Node Affinity over Node Selector when flexibility is required.

Use Anti-Affinity for critical replicas.

Reserve dedicated Nodes using Taints.

Monitor scheduler latency.

---

# Useful Commands

kubectl get nodes

---

kubectl describe node NODE_NAME

---

kubectl describe pod POD_NAME

---

kubectl get events --sort-by=.metadata.creationTimestamp

---

kubectl top nodes

---

kubectl top pods

---

kubectl get priorityclass

---

# Interview Questions

Q1

What is the responsibility of the Kubernetes Scheduler?

Answer

The Scheduler assigns Pending Pods to the most suitable Worker Node.

---

Q2

Difference between NodeSelector and Node Affinity?

Answer

NodeSelector performs exact label matching.

Node Affinity provides required and preferred scheduling rules.

---

Q3

Difference between Taints and Tolerations?

Answer

Taints block scheduling on a Node.

Tolerations allow specific Pods to be scheduled on tainted Nodes.

---

Q4

Difference between Requests and Limits?

Answer

Requests are guaranteed resources used during scheduling.

Limits define the maximum resources a container can consume.

---

Q5

What is Pod Anti-Affinity?

Answer

It prevents similar Pods from running on the same Node, improving high availability.

---

# Scenario Based Interview

Question

Pod is stuck in Pending.

Scheduler reports

0/5 nodes are available.

How will you troubleshoot?

Answer

1. Check Events.

2. Verify CPU and Memory Requests.

3. Check Node Affinity.

4. Check Taints and Tolerations.

5. Verify Node Status.

6. Check PVC constraints if applicable.

---

Question

Why are Replica Pods running on different Nodes?

Answer

Pod Anti-Affinity is used to improve availability by spreading replicas across multiple Nodes.

---

# Production Troubleshooting Checklist

✔ Scheduler Events

✔ Node Labels

✔ Node Affinity

✔ Pod Affinity

✔ Pod Anti-Affinity

✔ Taints

✔ Tolerations

✔ Requests

✔ Limits

✔ Node Resources

---

# Senior Engineer Notes

Always think about scheduling in this order:

Pending Pod

↓

Scheduler

↓

Filter Nodes

↓

Resources

↓

Affinity Rules

↓

Taints

↓

Tolerations

↓

Score Nodes

↓

Best Node

↓

Pod Scheduled

Understanding this workflow helps diagnose nearly every scheduling issue in production Kubernetes clusters.

