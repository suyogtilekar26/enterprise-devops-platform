# Kubernetes Production Incident 16 - Worker Node Disk Full

# 1. Incident Overview

## Incident ID

INC-K8S-016

## Severity

SEV-1

## Environment

Production

## Reported By

Prometheus Alertmanager

## Incident Time

11:06 PM

## Resolved Time

11:58 PM

## Duration

52 Minutes

## Affected Component

Worker Node Filesystem

## Impacted Services

Multiple Production Workloads

## Impacted Application

Enterprise DevOps Platform

```
Users

↓

Ingress

↓

API Gateway

↓

Worker Node ❌

↓

Container Runtime

↓

Filesystem
```

---

# 2. Business Impact

Customer Impact

- Random API failures
- New Pods failed to start
- Existing Pods evicted
- Increased response latency

Business Impact

- Deployment failures
- Autoscaling failures
- Customer-facing service degradation
- SLA breach risk

Estimated Revenue Impact

Critical

---

# 3. Alert Received

Prometheus Alert

```
NodeFilesystemUsageHigh

Severity

Critical

Node

worker-node-02

Disk Usage

98%
```

Additional Alerts

```
KubeNodeNotReady

KubePodEvictions

ImageGCFailed
```

Kubernetes Events

```
Eviction manager:

attempting to reclaim ephemeral-storage
```

---

# 4. Production Architecture

```
Applications

↓

Worker Node

↓

Container Runtime

↓

Images

↓

Logs

↓

Filesystem
```

---

# 5. Symptoms

Observed

- Pods entering Evicted state
- New Pods Pending
- Image pull failures
- Node DiskPressure=True

Users observed

- Slow application
- API failures
- Dashboard intermittently unavailable
- Login failures

---

# 6. Initial Investigation

Objective

Determine whether issue is related to

- Node storage
- Container runtime
- Images
- Logs
- PVC
- Application

Commands

```bash
kubectl get nodes

kubectl describe node worker-node-02

kubectl get events
```

Observation

```
DiskPressure=True
```

---

# 7. Investigation Timeline

## 11:06

Critical alert received.

---

## 11:10

Verified Node.

```bash
kubectl get nodes
```

Observed

```
Ready

DiskPressure=True
```

---

## 11:14

Reviewed Node.

```bash
kubectl describe node worker-node-02
```

Observed

```
Eviction Threshold Met
```

---

## 11:18

Connected to Worker Node.

Checked filesystem.

```bash
df -h
```

Observed

```
98%

Used
```

---

## 11:23

Investigated storage usage.

```bash
du -sh /var/lib/containerd/*

du -sh /var/log/*
```

Observed

- Old container images
- Large rotated logs
- Unused containers

---

## 11:29

Verified container runtime.

```bash
crictl images

crictl ps -a
```

Large number of unused images detected.

---

## 11:35

Performed cleanup.

```bash
crictl rmi --prune

journalctl --vacuum-size=500M
```

Removed obsolete logs.

---

## 11:42

Filesystem utilization reduced.

```
98%

↓

62%
```

---

## 11:47

DiskPressure cleared.

Pods automatically rescheduled.

---

## 11:58

Business validation completed.

Incident closed.

---

# 8. Commands Executed

Node

```bash
kubectl get nodes

kubectl describe node

kubectl top node
```

Filesystem

```bash
df -h

du -sh /var/lib/containerd/*

du -sh /var/log/*
```

Container Runtime

```bash
crictl images

crictl ps -a

crictl rmi --prune
```

Logs

```bash
journalctl --disk-usage

journalctl --vacuum-size=500M
```

Events

```bash
kubectl get events \
--sort-by=.metadata.creationTimestamp
```

---

# 9. Findings

Infrastructure

Healthy

Cluster

Healthy

Worker Node

Disk Full

Container Runtime

Accumulated unused images

Root Issue

Worker node filesystem exhausted

---

# 10. Root Cause

The worker node accumulated unused container images, rotated application logs and container runtime artifacts over several weeks.

Image garbage collection could not reclaim enough storage before eviction thresholds were reached.

The kubelet marked the node with DiskPressure and began evicting workloads.

---

# 11. Resolution

Removed unused container images.

Cleaned system logs.

Validated filesystem utilization.

Confirmed DiskPressure cleared.

Verified workload recovery.

---

# 12. Validation

Cluster

```bash
kubectl get nodes

kubectl get pods -A
```

Filesystem

```bash
df -h
```

Business

- APIs healthy
- Login successful
- Dashboard available
- Deployments successful

Monitoring

- Disk alerts cleared
- Evictions stopped
- Node healthy

---

# 13. Rollback

If cleanup is insufficient

- Cordon node.
- Drain workloads.
- Expand node storage.
- Replace node if required.
- Rejoin node to cluster.

Commands

```bash
kubectl cordon worker-node-02

kubectl drain worker-node-02 \
--ignore-daemonsets

kubectl uncordon worker-node-02
```

---

# 14. Customer Communication

Initial Update

> We are investigating a worker node storage issue affecting application availability.

Progress Update

> The affected node has been identified. Cleanup and workload recovery are in progress.

Resolution

> Services have been restored successfully. The affected node is healthy and under observation.

---

# 15. Incident Timeline

```
11:06

Alert

↓

11:14

Node Investigation

↓

11:18

Filesystem Analysis

↓

11:29

Runtime Investigation

↓

11:35

Cleanup

↓

11:42

Disk Usage Normal

↓

11:47

DiskPressure Cleared

↓

11:58

Incident Closed
```

---

# 16. Root Cause Analysis (RCA)

## What Happened?

Worker node storage became full.

## Why?

Unused images and logs accumulated until eviction thresholds were exceeded.

## Why wasn't it detected?

Storage cleanup and monitoring thresholds were insufficient.

## Customer Impact

Pods were evicted and deployments failed.

## Preventive Action

Implement automated cleanup, proactive storage monitoring and node maintenance.

---

# 17. Preventive Actions

- Configure image garbage collection.
- Monitor node filesystem usage.
- Rotate application logs.
- Remove unused images automatically.
- Alert at 70%, 80% and 90% disk utilization.
- Schedule regular node maintenance.
- Review ephemeral storage consumption monthly.

---

# 18. Production Best Practices

- Keep worker node utilization below 80%.
- Configure kubelet image garbage collection.
- Limit container log growth.
- Separate application and system disks where possible.
- Monitor ephemeral storage continuously.
- Maintain documented node recovery runbooks.

---

# 19. Production Support Interview Questions

## Q1. How do you investigate a Worker Node Disk Full incident?

### Answer

1. Assess business impact.
2. Verify node status.
3. Check DiskPressure condition.
4. Review filesystem utilization.
5. Identify storage consumers.
6. Clean images and logs.
7. Validate node health.
8. Confirm workload recovery.
9. Monitor stability.
10. Complete RCA.

---

## Q2. What happens when a node experiences DiskPressure?

### Answer

The kubelet attempts garbage collection and, if necessary, evicts Pods to reclaim storage. Scheduling decisions may also avoid the affected node until the condition clears.

---

## Q3. What usually consumes worker node disk space?

### Answer

Common causes include unused container images, container logs, application logs, container runtime artifacts, temporary files and excessive ephemeral storage usage.

---

# 20. Marathi Quick Revision

- Node तपासा.
- DiskPressure verify करा.
- `df -h` चालवा.
- Images तपासा.
- Logs तपासा.
- Cleanup करा.
- Disk usage verify करा.
- Business validation करा.
- RCA तयार करा.

---

# 21. Marathi Summary (5+ Experience Revision)

## Interview Summary

Production मध्ये Worker Node Disk Full incident आल्यास प्रथम node health आणि DiskPressure verify करावी. त्यानंतर filesystem usage, container images, logs आणि runtime storage तपासावे. Root Cause निश्चित करून cleanup किंवा storage expansion करावे. शेवटी workloads, business functionality, monitoring आणि RCA validate करावे.

### Production Investigation Flow

```
Alert

↓

Node Status

↓

DiskPressure

↓

Filesystem

↓

Images

↓

Logs

↓

Root Cause

↓

Cleanup

↓

Business Validation

↓

RCA
```

### Production Story

एका production Kubernetes cluster मध्ये अचानक अनेक Pods `Evicted` होऊ लागले आणि नवीन deployments Pending राहू लागले. Investigation मध्ये एका worker node वर disk utilization 98% असल्याचे दिसले. अनेक महिन्यांपासून cleanup न झाल्यामुळे जुने container images, runtime artifacts आणि application logs साठले होते. `crictl rmi --prune` आणि log cleanup केल्यानंतर filesystem utilization 62% वर आली, DiskPressure condition हटली आणि सर्व workloads पुन्हा normal झाल्या. Incident नंतर automated image garbage collection, log retention policy आणि node storage alerts लागू करण्यात आले.

### 5+ Years Memory Trick

Interview मध्ये जर विचारले,

**"How do you troubleshoot a Worker Node Disk Full incident in Kubernetes production?"**

उत्तर:

"I first assess the business impact, verify the node condition and DiskPressure status, inspect filesystem utilization, identify storage consumers such as container images and logs, perform safe cleanup or storage expansion, validate node recovery, confirm application functionality, monitor cluster stability, and complete the RCA."

