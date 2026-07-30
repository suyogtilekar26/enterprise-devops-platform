# Kubernetes Interview Master Handbook

# Section 07 - Kubernetes Production Incidents & Troubleshooting

# Chapter 05 - Node NotReady Incidents

---

# Objective

Learn how to investigate, troubleshoot, recover and permanently prevent Kubernetes Node NotReady incidents in production environments.

Node failures are among the highest priority incidents because they directly impact workloads, scheduling and application availability.

---

# Interview Scenario

Time: 02:10 AM

PagerDuty Alert

"Worker Node NotReady"

Impact

- Multiple Pods become unavailable.
- New Pods cannot be scheduled.
- Application availability decreases.
- Customers report service failures.

You are the on-call SRE.

Restore production immediately.

---

# What is Node NotReady?

A Node enters the NotReady state when Kubernetes determines that the worker node is unhealthy or cannot communicate with the control plane.

When this happens

- Existing Pods may become unavailable.
- New Pods are not scheduled.
- Node is removed from Service endpoints.

---

# Node Health Workflow

Worker Node Starts

↓

Kubelet Running

↓

Heartbeat Sent

↓

API Server Receives Status

↓

Node Ready

OR

↓

Heartbeat Missing

↓

Node NotReady

↓

Pods Evicted

↓

Applications Impacted

---

# Common Root Causes

Kubelet Failure

Container Runtime Failure

Disk Full

CPU Exhausted

Memory Exhausted

Network Failure

Node Power Failure

Cloud VM Failure

Certificate Expired

Filesystem Corruption

Kernel Panic

Security Group Changes

Firewall Blocking API Server

---

# Step 1 - Check Nodes

```bash
kubectl get nodes
```

Example

```
NAME         STATUS
worker-01    Ready
worker-02    NotReady
worker-03    Ready
```

---

# Step 2 - Describe Node

```bash
kubectl describe node worker-02
```

Verify

- Conditions
- Events
- Taints
- Resource Usage

---

# Step 3 - Verify Node Conditions

Look for

```
MemoryPressure

DiskPressure

PIDPressure

NetworkUnavailable

Ready=False
```

---

# Step 4 - Check Pods on the Node

```bash
kubectl get pods -A -o wide
```

Verify

- Failed Pods
- Unknown Pods
- Evicted Pods

---

# Step 5 - Verify Events

```bash
kubectl get events -A --sort-by=.metadata.creationTimestamp
```

---

# Step 6 - Verify Resource Usage

```bash
kubectl top nodes
```

---

# Step 7 - SSH to Worker Node

```bash
ssh worker-02
```

Verify

- System Health
- CPU
- Memory
- Disk

---

# Step 8 - Verify Kubelet

```bash
sudo systemctl status kubelet
```

Restart if necessary

```bash
sudo systemctl restart kubelet
```

---

# Step 9 - Verify Container Runtime

Containerd

```bash
sudo systemctl status containerd
```

Docker

```bash
sudo systemctl status docker
```

---

# Step 10 - Verify Disk Space

```bash
df -h
```

---

# Step 11 - Verify Memory

```bash
free -h
```

---

# Step 12 - Verify Network

```bash
ping <api-server-ip>
```

---

# Investigation Flow

Node

↓

Describe

↓

Events

↓

Conditions

↓

Kubelet

↓

Container Runtime

↓

Disk

↓

Memory

↓

Network

↓

Recovery

---

# Scenario 1

Kubelet Stopped

```
systemctl status kubelet

inactive
```

Root Cause

Kubelet service stopped.

Resolution

Restart kubelet.

---

# Scenario 2

Container Runtime Failure

```
containerd not running
```

Resolution

Restart container runtime.

---

# Scenario 3

Disk Full

```
DiskPressure=True
```

Resolution

Remove unused images.

Clean logs.

Expand disk.

---

# Scenario 4

Memory Pressure

```
MemoryPressure=True
```

Resolution

Increase node memory.

Reduce workload usage.

---

# Scenario 5

Network Failure

```
Unable to reach API Server
```

Resolution

Restore network connectivity.

Verify firewall rules.

---

# Scenario 6

Cloud VM Failure

Node becomes unreachable.

Resolution

Replace worker node.

Allow workloads to reschedule.

---

# Production Incident

Issue

One worker node suddenly becomes NotReady.

Customer Impact

Checkout API latency increases.

Some Pods become unavailable.

Investigation

```
kubectl describe node worker-02
```

Shows

```
DiskPressure=True
```

SSH

```
df -h
```

Filesystem

```
100% Used
```

Root Cause

Log files filled the disk.

Resolution

Remove logs.

Prune unused container images.

Restart kubelet.

Node returns to Ready.

Pods become healthy.

---

# Recovery Commands

Check Node

```bash
kubectl get nodes
```

---

Describe Node

```bash
kubectl describe node worker-02
```

---

Restart Kubelet

```bash
sudo systemctl restart kubelet
```

---

Restart Container Runtime

```bash
sudo systemctl restart containerd
```

---

Drain Node

```bash
kubectl drain worker-02 --ignore-daemonsets
```

---

Uncordon Node

```bash
kubectl uncordon worker-02
```

---

# Validation Checklist

Node Ready

Heartbeat Normal

Pods Running

Container Runtime Healthy

Kubelet Healthy

Disk Available

Memory Available

Application Healthy

---

# RCA Template

Incident

Node NotReady

Root Cause

Disk Full

Business Impact

Application degradation

Detection

Node monitoring alert

Resolution

Freed disk space

Restarted kubelet

Preventive Action

Disk monitoring

Log rotation

---

# Interview Questions

## Q1. What does Node NotReady mean?

Answer

The Kubernetes control plane cannot confirm that the worker node is healthy, so workloads may not be scheduled or may become unavailable.

---

## Q2. Which command do you execute first?

Answer

```bash
kubectl get nodes
```

Followed by

```bash
kubectl describe node <node-name>
```

---

## Q3. What are the common causes?

Answer

Kubelet failure, container runtime failure, disk pressure, memory pressure, network issues, VM failure and certificate problems.

---

## Q4. How do you verify kubelet?

Answer

```
sudo systemctl status kubelet
```

Review logs if necessary.

---

## Q5. How do you recover a NotReady node?

Answer

Identify the underlying issue, restore node health, verify kubelet and container runtime, then validate application recovery.

---

# Assignment

A production worker node becomes NotReady during business hours.

Perform

- Investigation
- Commands
- Evidence Collection
- Root Cause Analysis
- Recovery
- Validation
- Preventive Actions

---

# Assignment Solution

## Step 1

Check node status.

```bash
kubectl get nodes
```

---

## Step 2

Describe the affected node.

```bash
kubectl describe node <node-name>
```

---

## Step 3

Verify

- Events
- Conditions
- Resource Usage
- Kubelet
- Container Runtime

---

## Step 4

SSH into the node.

Check

- Disk
- Memory
- Network

---

## Step 5

Fix the root cause.

Restart services if required.

---

## Step 6

Validate

- Node Ready
- Pods Healthy
- Application Healthy

---

## Step 7

Document RCA and preventive actions.

---

# Production Best Practices

✔ Monitor Node Health

✔ Enable Alerting

✔ Rotate Logs

✔ Monitor Disk Usage

✔ Monitor Memory Usage

✔ Keep Kubelet Updated

✔ Maintain Container Runtime

✔ Use Cluster Autoscaler

✔ Regular Node Maintenance

✔ Maintain Incident Runbooks

---

# Runbook Checklist

□ Node Identified

□ Node Described

□ Conditions Reviewed

□ Events Collected

□ Kubelet Verified

□ Container Runtime Verified

□ Disk Checked

□ Memory Checked

□ Network Verified

□ Root Cause Confirmed

□ Recovery Completed

□ Validation Successful

□ RCA Completed

---

# Common Mistakes

❌ Rebooting Node Without Investigation

❌ Ignoring Node Conditions

❌ Not Checking Kubelet

❌ Ignoring Disk Usage

❌ Ignoring Container Runtime

❌ Forgetting to Drain the Node

❌ Closing Incident Without Validation

❌ Skipping RCA

