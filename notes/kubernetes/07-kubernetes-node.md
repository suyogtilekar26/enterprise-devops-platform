# Kubernetes Node

# 1. Purpose

The purpose of this document is to understand what a Kubernetes Node is and why it is one of the most important resources inside a Kubernetes Cluster.

Every Pod runs on a Node.

If Nodes are unhealthy, applications become unavailable.

---

# 2. Introduction

A Node is a machine that participates in a Kubernetes Cluster.

A Node can be

- Physical Server
- Virtual Machine
- Cloud Instance

Every Worker Node runs application Pods.

Every Control Plane Node runs Kubernetes management components.

---

# 3. Enterprise Usage

Production environments usually have multiple Worker Nodes.

Example

Development

- 1 Control Plane
- 1 Worker Node

Production

- 3 Control Plane Nodes
- 10+ Worker Nodes

Large companies may have hundreds of Worker Nodes.

---

# 4. Usage in THIS Project

```
Kind Cluster

↓

Worker Node

↓

Frontend Pod

↓

API Gateway Pod

↓

Auth Pod

↓

Dashboard Pod
```

Later in AWS

```
Amazon EKS

↓

EC2 Worker Nodes

↓

Pods

↓

Applications
```

---

# 5. Architecture

```
                 Kubernetes Cluster

--------------------------------------------------

            Control Plane

--------------------------------------------------

                │

        ---------------------

        │                   │

+----------------+   +----------------+

 Worker Node-1      Worker Node-2

 kubelet            kubelet

 kube-proxy         kube-proxy

 containerd         containerd

 Frontend Pod       Auth Pod

 API Pod            Dashboard Pod

+----------------+   +----------------+
```

---

# 6. Internal Workflow

```
Developer

↓

Deployment

↓

Scheduler

↓

Worker Node Selected

↓

kubelet

↓

containerd

↓

Pod Running

↓

Health Report

↓

API Server
```

---

# 7. Node Components

Every Worker Node contains

- kubelet
- kube-proxy
- containerd
- Pods

Responsibilities

- Run Containers
- Execute Pods
- Send Health Status
- Handle Networking

---

# 8. Node States

A Node can be

Ready

Application can run.

NotReady

Applications cannot be scheduled.

Unknown

Control Plane cannot communicate.

SchedulingDisabled

Node is under maintenance.

---

# 9. Daily DevOps Activities

- Check Node Health
- Monitor CPU Usage
- Monitor Memory
- Monitor Disk Usage
- Drain Nodes
- Upgrade Nodes
- Investigate NotReady Nodes

---

# 10. Production Best Practices

- Always use multiple Worker Nodes.
- Never deploy Production on one Node.
- Monitor Node utilization.
- Drain Node before maintenance.
- Upgrade Nodes one by one.
- Keep Node OS patched.

---

# 11. Security

- Disable password login.
- Enable SSH Keys.
- Restrict Root Login.
- Enable Firewall.
- Keep Kubernetes updated.
- Scan Node OS regularly.

---

# 12. Troubleshooting

Check Nodes

```bash
kubectl get nodes
```

Describe Node

```bash
kubectl describe node <node-name>
```

Check Pods

```bash
kubectl get pods -o wide
```

Node Resource Usage

```bash
kubectl top nodes
```

---

# 13. Real Production Scenarios

## Scenario 1

### Node Becomes NotReady

```
Worker Node

↓

Network Failure

↓

Node NotReady

↓

Scheduler

↓

Healthy Node

↓

Pods Recreated
```

Production Story

One production Worker Node lost network connectivity.

The API Server stopped receiving heartbeat messages.

Node status changed to NotReady.

Scheduler started new Pods on another healthy Worker Node.

Users did not experience downtime.

---

## Scenario 2

### High CPU Usage

Symptoms

- Slow Application
- Pod Restart
- High Load Average

Investigation

```bash
kubectl top nodes

kubectl top pods
```

Resolution

Scale Worker Nodes or optimize application.

---

## Scenario 3

### Disk Full

Symptoms

- Image Pull Failure
- Pod Startup Failure
- DiskPressure=True

Investigation

```bash
df -h

kubectl describe node
```

Resolution

Clean unused images and logs.

---

# 14. Scenario Interview Q&A

Q. What is a Kubernetes Node?

Answer

A Node is a machine inside a Kubernetes Cluster where Pods are executed.

---

Q. Can a Node run multiple Pods?

Answer

Yes.

A single Worker Node can run multiple Pods depending on available CPU and Memory.

---

# 15. Architecture Interview Q&A

Explain Node Architecture.

```
Control Plane

↓

Scheduler

↓

Worker Node

↓

kubelet

↓

containerd

↓

Pods
```

---

# 16. Production Support Interview Q&A

Node Investigation

```
Alert

↓

kubectl get nodes

↓

Ready?

↓

No

↓

kubectl describe node

↓

CPU

Memory

Disk

Network

↓

Root Cause

↓

Fix

↓

Verify
```

---

# 17. Related Runbooks

- node-not-ready.md
- node-maintenance.md
- disk-pressure.md
- cpu-pressure.md

---

# 18. Common Incidents

- Node Not Ready
- Memory Pressure
- Disk Pressure
- Network Failure
- kubelet Down
- High CPU Usage

---

# 19. Commands

```bash
kubectl get nodes

kubectl describe node <node>

kubectl top nodes

kubectl get pods -o wide

kubectl cordon <node>

kubectl drain <node>

kubectl uncordon <node>
```

---

# 20. Marathi Quick Revision

- Node म्हणजे Kubernetes मधील Machine.
- प्रत्येक Pod एका Node वर चालतो.
- kubelet Pods Manage करतो.
- containerd Container चालवतो.
- Node Ready असणे खूप महत्त्वाचे आहे.

---

# 21. Marathi Summary (5+ Experience Revision)

## Interview Summary

Node म्हणजे Kubernetes Cluster मधील Worker Machine.

Applications Node वर चालतात.

Node Down झाला तर Scheduler दुसऱ्या Node वर Pods सुरू करतो.

## Production Investigation Flow

```
Alert

↓

kubectl get nodes

↓

Node Ready?

↓

kubectl describe node

↓

CPU

Memory

Disk

↓

Events

↓

Root Cause
```

## Production Story

Production मध्ये एका Node वर DiskPressure आली.

नवीन Pods Pending राहू लागले.

Unused Docker Images आणि Logs Cleanup केल्या.

Node Ready झाला.

Applications पुन्हा Normal झाल्या.

## Memory Trick

**Node = Machine + kubelet + kube-proxy + containerd + Pods**

