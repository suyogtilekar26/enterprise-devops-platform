# Kubernetes Interview Master Handbook

# Architecture 12 - Kubernetes Resource Management Architecture

---

# What is Resource Management?

## English

Resource Management ensures that CPU and Memory are allocated fairly among workloads.

It prevents one application from consuming all cluster resources.

---

## मराठी

Resource Management म्हणजे Cluster मधील CPU आणि Memory योग्य प्रकारे वाटप करणे.

यामुळे एखादे Application संपूर्ण Node चे Resources वापरू शकत नाही.

---

# Resource Management Flow

Application

↓

Deployment

↓

Resource Requests

↓

Scheduler

↓

Worker Node

↓

cgroups

↓

CPU

↓

Memory

↓

Container Running

---

# CPU Request

Purpose

Minimum CPU guaranteed for a container.

Scheduler uses CPU Requests while selecting Nodes.

Example

500m = 0.5 CPU Core

---

# CPU Limit

Purpose

Maximum CPU allowed.

If exceeded

Linux throttles CPU usage.

Container continues running.

---

# Memory Request

Purpose

Minimum guaranteed Memory.

Scheduler uses this value for scheduling.

---

# Memory Limit

Purpose

Maximum Memory allowed.

If exceeded

Container is terminated.

Reason

OOMKilled

---

# Requests vs Limits

Requests

Guaranteed resources

↓

Scheduling

---

Limits

Maximum allowed usage

↓

Runtime Enforcement

---

# cgroups

Control Groups

Purpose

Linux kernel feature used to enforce CPU and Memory limits.

Kubernetes uses cgroups underneath every container.

---

# CPU Throttling

Application

↓

Consumes CPU

↓

CPU Limit Reached

↓

cgroups

↓

CPU Throttled

↓

Application Slows

---

# OOM Killer

Application

↓

Consumes Memory

↓

Memory Limit Crossed

↓

Linux OOM Killer

↓

Container Killed

↓

Restart

---

# Quality of Service (QoS)

Guaranteed

Requests = Limits

Highest Priority

Least likely to be evicted.

---

Burstable

Requests < Limits

Medium Priority

Can burst when resources are available.

---

BestEffort

No Requests

No Limits

Lowest Priority

Evicted first.

---

# QoS Flow

Guaranteed

↓

Burstable

↓

BestEffort

Eviction order starts from BestEffort.

---

# Eviction Manager

Monitors

Memory

Disk

PID

Filesystem

Node Pressure

If Node resources become critical

Pods are evicted.

---

# Node Pressure

Memory Pressure

Disk Pressure

PID Pressure

Network Pressure (indirect operational impact)

---

# ResourceQuota

Namespace level control.

Example

Maximum CPU

Maximum Memory

Maximum Pods

Maximum PVCs

---

# LimitRange

Provides default

Requests

Limits

inside a Namespace.

---

# Scheduling Decision

Pod Created

↓

CPU Request

↓

Memory Request

↓

Scheduler

↓

Node Selected

↓

Container Started

---

# Common Resource Problems

OOMKilled

CPU Throttling

Pending Pod

Insufficient Memory

Insufficient CPU

Eviction

Node Pressure

ResourceQuota Exceeded

---

# Troubleshooting Flow

Pod Slow

↓

CPU Usage

↓

Memory Usage

↓

Requests

↓

Limits

↓

QoS

↓

Node Pressure

↓

Events

↓

Logs

---

# Production Incident

Application restarted continuously.

Reason

Memory usage exceeded limit.

Status

OOMKilled

Resolution

Increase Memory Limit.

Optimize application memory usage.

---

# Another Incident

Application became very slow.

Reason

CPU Limit too low.

Container throttled.

Resolution

Increase CPU Limit.

Review Requests.

---

# Best Practices

Always define Requests.

Always define Limits.

Use Guaranteed QoS for critical applications.

Monitor CPU throttling.

Monitor OOMKilled events.

Avoid BestEffort Pods in production.

Review ResourceQuota regularly.

---

# Useful Commands

kubectl top nodes

---

kubectl top pods

---

kubectl describe pod POD_NAME

---

kubectl get resourcequota

---

kubectl describe resourcequota

---

kubectl get limitrange

---

kubectl describe limitrange

---

kubectl get events --sort-by=.metadata.creationTimestamp

---

# Interview Questions

Q1

Difference between CPU Request and CPU Limit?

Answer

CPU Request is used for scheduling.

CPU Limit is the maximum CPU the container may consume.

---

Q2

Difference between Memory Request and Memory Limit?

Answer

Memory Request guarantees scheduling.

Memory Limit defines the maximum memory before OOMKilled.

---

Q3

What is CPU Throttling?

Answer

CPU throttling occurs when a container exceeds its configured CPU limit and the Linux kernel restricts CPU usage using cgroups.

---

Q4

What is OOMKilled?

Answer

The Linux OOM Killer terminates a container when it exceeds its memory limit.

---

Q5

Explain QoS Classes.

Answer

Guaranteed

Requests equal Limits.

Burstable

Requests lower than Limits.

BestEffort

No Requests or Limits.

---

# Scenario Based Interview

Question

Application restarts every few minutes.

kubectl describe shows

OOMKilled.

How will you troubleshoot?

Answer

1. Check Memory Usage.

2. Compare with Memory Limit.

3. Review application logs.

4. Increase Memory Limit if justified.

5. Optimize application memory usage.

---

Question

Application response time suddenly increases.

CPU usage is constantly at the configured limit.

Answer

CPU throttling is occurring.

Increase CPU Limit after validating workload requirements and monitor performance.

---

# Production Troubleshooting Checklist

✔ CPU Requests

✔ CPU Limits

✔ Memory Requests

✔ Memory Limits

✔ QoS Class

✔ cgroups

✔ OOMKilled

✔ CPU Throttling

✔ Node Pressure

✔ ResourceQuota

---

# Senior Engineer Notes

Always think in this order:

Application

↓

Requests

↓

Scheduler

↓

Node

↓

cgroups

↓

CPU

↓

Memory

↓

QoS

↓

Eviction Manager

↓

Container

Most production performance issues are caused by incorrect Requests/Limits, CPU throttling, Memory limits, or node resource pressure. Understanding this flow makes troubleshooting much faster.

