# Kubernetes Runbook 04 - Recovering Node NotReady

# 1. Purpose

This runbook explains how to investigate and recover Kubernetes worker nodes that enter the **NotReady** state.

A Node in the NotReady state cannot schedule new Pods and may eventually cause running workloads to become unavailable.

The objective is to identify the underlying infrastructure or Kubernetes issue, restore node health safely, and minimize application downtime.

---

# 2. Scope

Applicable to

- Worker Nodes
- Control Plane Nodes (where applicable)
- Kind Clusters
- EKS
- AKS
- GKE
- On-Prem Kubernetes

---

# 3. Symptoms

Users may report

- Applications unavailable
- Pods terminating
- Pods Pending
- Random service failures

Monitoring may report

- Node NotReady
- Node Unreachable
- Kubelet Down
- High Pod Evictions

Verify

```bash
kubectl get nodes
```

Example

```
NAME        STATUS

worker-01   Ready
worker-02   NotReady
worker-03   Ready
```

---

# 4. Business Impact

Critical

- Multiple workloads unavailable
- Production outage
- Cluster capacity reduced

Medium

- Reduced redundancy
- Auto Scaling affected

Low

- Development environment degradation

---

# 5. Possible Root Causes

Common causes

- Worker node powered off
- VM failure
- Cloud instance failure
- kubelet stopped
- Container runtime failure
- Disk full
- Memory exhaustion
- CPU starvation
- Network partition
- Certificate expiration
- Kernel panic
- Hardware failure

---

# 6. Prerequisites

Required access

- kubectl
- SSH access (where applicable)
- Cloud Console
- Monitoring Dashboard

Verify permissions

```bash
kubectl auth can-i get nodes
```

---

# 7. Initial Investigation

## Step 1

Verify Node Status

```bash
kubectl get nodes
```

---

## Step 2

Describe Node

```bash
kubectl describe node <node-name>
```

Review

- Conditions
- Events
- Taints
- Resource Pressure

---

## Step 3

Check Node Conditions

Look for

```
Ready=False

MemoryPressure=True

DiskPressure=True

PIDPressure=True

NetworkUnavailable=True
```

---

# 8. Detailed Investigation

## Step 1

Review Events

```bash
kubectl describe node <node-name>
```

Look for

- Node unreachable
- Kubelet stopped
- Disk pressure
- Evictions

---

## Step 2

Verify Pods

```bash
kubectl get pods -A -o wide
```

Identify affected workloads.

---

## Step 3

Check Kubelet

On the node

```bash
systemctl status kubelet
```

If stopped

```bash
systemctl restart kubelet
```

---

## Step 4

Check Container Runtime

Docker

```bash
systemctl status docker
```

containerd

```bash
systemctl status containerd
```

Restart only after identifying the cause.

---

## Step 5

Check Disk Space

```bash
df -h
```

If disk usage is 100%, investigate large log files and unused container images.

---

## Step 6

Check Memory

```bash
free -h
```

or

```bash
top
```

Look for memory exhaustion.

---

## Step 7

Check CPU

```bash
top
```

or

```bash
uptime
```

---

## Step 8

Verify Network Connectivity

```bash
ping <api-server>

curl -k https://<api-server>:6443/healthz
```

---

## Step 9

Cloud Provider Verification

Verify

- EC2 Instance
- Azure VM
- GCE Instance

Check

- Instance State
- Health Checks
- Network
- Security Groups

---

# 9. Resolution Steps

Depending on the root cause

kubelet stopped

```bash
systemctl restart kubelet
```

Container runtime failed

Restart runtime after investigation.

Disk Full

- Clean logs
- Remove unused images
- Expand storage

Memory Pressure

- Reduce workload
- Add worker nodes

Cloud Failure

Recover or replace instance.

Hardware Failure

Replace node.

---

# 10. Validation Steps

Verify

```bash
kubectl get nodes
```

Expected

```
STATUS

Ready
```

Verify Pods

```bash
kubectl get pods -A -o wide
```

Business Validation

- Login
- APIs
- Dashboard
- Monitoring

---

# 11. Rollback Procedure

If maintenance caused the issue

- Restore previous configuration.
- Restart affected services.
- Rejoin node if required.

If node cannot be recovered

- Replace the node.
- Drain and remove failed node.
- Join a new worker node.

---

# 12. Escalation Matrix

L1

- Verify Node
- Collect Events

↓

L2

- Verify kubelet
- Verify Runtime
- Verify Resources

↓

Platform Team

- Kubernetes
- Networking

↓

Infrastructure Team

- VM
- Hardware
- Cloud Provider

---

# 13. Production Best Practices

- Monitor node health continuously.
- Configure alerts for NotReady nodes.
- Maintain spare cluster capacity.
- Perform regular OS patching.
- Monitor disk usage.
- Monitor kubelet health.
- Test node recovery procedures regularly.

---

# 14. Real Production Scenario

During a production maintenance window, one worker node became NotReady.

Investigation showed

```bash
df -h
```

returned

```
100% disk utilization
```

Container logs had consumed the entire filesystem.

Old logs were archived and unnecessary images removed.

After restarting kubelet, the node became Ready and workloads were rescheduled successfully.

Root Cause

Disk exhaustion caused kubelet instability.

---

# 15. Scenario Interview Questions

## Q1. What is your first step when a node becomes NotReady?

### Answer

Verify node status

```bash
kubectl get nodes

kubectl describe node <node>
```

Review

- Conditions
- Events
- Resource Pressure

---

## Q2. Which services should you verify?

### Answer

- kubelet
- containerd
- docker (if applicable)

Commands

```bash
systemctl status kubelet

systemctl status containerd
```

---

## Q3. Can you immediately restart kubelet?

### Answer

No.

First collect evidence.

Identify why kubelet stopped.

Restart only after understanding the root cause.

---

# 16. Architecture Interview Questions

## Q1. Which components are involved?

### Answer

```
API Server

↓

Scheduler

↓

Worker Node

↓

kubelet

↓

Container Runtime

↓

Pods
```

If kubelet cannot communicate with the API Server, the node eventually becomes NotReady.

---

## Q2. What happens to Pods?

### Answer

Existing Pods may continue temporarily.

Eventually

- Pods may be evicted.
- New Pods cannot be scheduled.
- ReplicaSets create replacement Pods on healthy nodes.

---

# 17. Production Support Interview Questions

## Q1. A production node becomes NotReady during business hours. How do you investigate?

### Answer

Investigation order

```bash
kubectl get nodes

kubectl describe node

kubectl get pods -o wide

systemctl status kubelet

systemctl status containerd

df -h

free -h

top
```

Verify

- Network
- Storage
- Memory
- CPU
- Cloud VM
- Node events

---

## Q2. When should you replace a node instead of repairing it?

### Answer

Replace the node when

- Hardware failure
- Repeated kernel panic
- Corrupted filesystem
- Unrecoverable OS issues
- Persistent infrastructure instability

Replacing an unstable node is often safer than repeated repairs.

---

# 18. Commands Reference

```bash
kubectl get nodes

kubectl describe node <node>

kubectl get pods -A -o wide

systemctl status kubelet

systemctl restart kubelet

systemctl status containerd

df -h

free -h

top
```

---

# 19. Marathi Quick Revision

- Node Ready आहे का तपासा.
- Describe Node करा.
- Events तपासा.
- kubelet verify करा.
- container runtime तपासा.
- Disk, Memory आणि CPU तपासा.
- Root Cause सापडल्यानंतरच restart करा.

---

# 20. Related Runbooks

- 03-pod-pending.md
- 05-node-maintenance.md
- 14-resource-exhaustion.md
- 17-api-server-unreachable.md
- 19-cluster-disaster-recovery.md

---

# 21. Marathi Summary (5+ Experience Revision)

## Interview Summary

Node NotReady म्हणजे worker node Kubernetes Control Plane शी योग्य प्रकारे communicate करू शकत नाही. Production मध्ये सर्वप्रथम `kubectl get nodes` आणि `kubectl describe node` वापरून Conditions आणि Events तपासावेत. त्यानंतर kubelet, container runtime, disk usage, memory, CPU आणि network connectivity verify करावी. पुरावे गोळा केल्याशिवाय kubelet किंवा node restart करू नये.

### Production Investigation Flow

```
Alert

↓

Node NotReady

↓

Describe Node

↓

Events

↓

kubelet

↓

Container Runtime

↓

Disk

↓

Memory

↓

CPU

↓

Network

↓

Cloud VM

↓

Root Cause

↓

Recovery

↓

Validation

↓

RCA
```

### Production Story

एका production Kubernetes cluster मध्ये अचानक एक worker node NotReady झाला. सुरुवातीला infrastructure failure असल्याचा संशय होता. Senior DevOps engineer ने `kubectl describe node` आणि `df -h` तपासले. Disk 100% भरलेला असल्यामुळे kubelet API Server शी संपर्क ठेवू शकत नव्हता. जुने container logs हटवून kubelet restart करण्यात आला आणि node काही मिनिटांत Ready झाला. Incident review नंतर disk usage alerts 80% वर configure करण्यात आले.

### 5+ Years Memory Trick

Interview मध्ये जर विचारले,

**"How do you troubleshoot a NotReady node in production?"**

उत्तर:

"I first verify node conditions using `kubectl describe node`, then investigate kubelet, container runtime, disk utilization, memory, CPU and network connectivity. I avoid restarting services until I identify the underlying cause. After recovery, I validate workload health and document the RCA."

