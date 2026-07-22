# Kubernetes Production Incident 04 - Worker Node NotReady During Peak Business Hours

# 1. Incident Overview

## Incident ID

INC-K8S-004

## Severity

SEV-1

## Environment

Production

## Reported By

Prometheus Alertmanager

## Incident Time

09:18 AM

## Resolved Time

10:01 AM

## Duration

43 Minutes

## Affected Component

Worker Node

## Impacted Services

- API Gateway
- Auth Service
- Dashboard Service

## Impacted Application

Enterprise DevOps Platform

```
Frontend

↓

API Gateway

↓

Auth Service

↓

Dashboard Service

↓

Worker Node ❌
```

---

# 2. Business Impact

Customer Impact

- Multiple APIs became unavailable.
- Some customer requests timed out.
- Existing sessions experienced intermittent failures.
- Dashboard became partially unavailable.

Business Impact

- Production capacity reduced.
- Increased response times.
- Customer complaints increased.
- SLA violation risk.

Estimated Revenue Impact

High

---

# 3. Alert Received

Prometheus Alert

```
KubeNodeNotReady

Severity

Critical

Node

worker-node-02
```

Grafana Dashboard

```
Ready Nodes ↓

Node Availability ↓

Pod Evictions ↑
```

---

# 4. Production Architecture

```
Users

↓

Load Balancer

↓

Ingress

↓

Worker Node 01

Worker Node 02 ❌

Worker Node 03

↓

Application Pods
```

---

# 5. Symptoms

Observed

- Worker node status became NotReady.
- Pods on the affected node entered Unknown or Terminating state.
- New Pods scheduled to remaining nodes.
- Increased API latency.

Users observed

- HTTP 502
- HTTP 503
- Slow responses

---

# 6. Initial Investigation

Objective

Determine whether the issue is caused by

- Worker node failure
- Kubelet failure
- Network issue
- Disk issue
- Memory exhaustion
- Infrastructure outage

Commands

```bash
kubectl get nodes

kubectl get pods -A -o wide

kubectl get events \
--sort-by=.metadata.creationTimestamp
```

Observation

```
worker-node-02

NotReady
```

---

# 7. Investigation Timeline

## 09:18

Critical alert received.

---

## 09:20

Verified cluster.

```bash
kubectl get nodes
```

Result

```
worker-node-02

NotReady
```

---

## 09:22

Checked affected Pods.

```bash
kubectl get pods -A -o wide
```

Most affected Pods located on

```
worker-node-02
```

---

## 09:25

Reviewed node details.

```bash
kubectl describe node worker-node-02
```

Condition

```
NodeNotReady
```

Kubelet heartbeat missing.

---

## 09:28

Infrastructure team verified VM.

Result

```
VM reachable

SSH successful
```

---

## 09:31

Checked kubelet.

```bash
systemctl status kubelet
```

Observed

```
kubelet service stopped
```

---

## 09:34

Reviewed kubelet logs.

```bash
journalctl -u kubelet
```

Observed

```
Disk pressure

Container runtime unavailable
```

---

## 09:38

Checked disk usage.

```bash
df -h
```

Result

```
Filesystem

100% Used
```

---

## 09:43

Cleaned container runtime images.

```bash
crictl rmi --prune
```

Removed unused logs.

---

## 09:46

Restarted kubelet.

```bash
systemctl restart kubelet
```

---

## 09:51

Node became Ready.

```bash
kubectl get nodes
```

---

## 09:56

Pods rescheduled successfully.

---

## 10:01

Business validation completed.

Incident closed.

---

# 8. Commands Executed

Cluster

```bash
kubectl get nodes

kubectl describe node

kubectl get events \
--sort-by=.metadata.creationTimestamp
```

Pods

```bash
kubectl get pods -A -o wide
```

Linux

```bash
systemctl status kubelet

systemctl restart kubelet

journalctl -u kubelet

df -h

free -m
```

Container Runtime

```bash
crictl images

crictl ps

crictl rmi --prune
```

---

# 9. Findings

Control Plane

Healthy

Worker Node

NotReady

VM

Healthy

Network

Healthy

Root Issue

Disk full

Kubelet stopped sending heartbeats.

---

# 10. Root Cause

Container images and application logs consumed the entire filesystem.

Because the disk reached 100% utilization, the container runtime failed, kubelet stopped functioning correctly, and the node transitioned to the NotReady state.

---

# 11. Resolution

Freed disk space.

Removed unused container images.

Restarted kubelet.

Verified node health.

Pods automatically recovered.

---

# 12. Validation

Infrastructure

```bash
kubectl get nodes
```

Pods

```bash
kubectl get pods -A
```

Business

- Login successful
- Dashboard available
- APIs responding normally
- Customer transactions completed

Monitoring

- Node Ready
- Alerts cleared
- CPU and Memory normal
- Disk utilization acceptable

---

# 13. Rollback

If node recovery fails

Drain node

```bash
kubectl drain worker-node-02 \
--ignore-daemonsets \
--delete-emptydir-data
```

Replace or rebuild node.

Rejoin cluster.

```bash
kubeadm join ...
```

Uncordon node.

```bash
kubectl uncordon worker-node-02
```

---

# 14. Customer Communication

Initial Update

> We are investigating a worker node issue affecting application availability.

Progress Update

> Root cause has been identified. Recovery actions are currently in progress.

Resolution

> Production services have been restored successfully. We will continue monitoring cluster stability.

---

# 15. Incident Timeline

```
09:18

Alert

↓

09:20

Node NotReady Verified

↓

09:25

Node Investigation

↓

09:31

Kubelet Failure

↓

09:38

Disk Full Confirmed

↓

09:43

Cleanup

↓

09:46

Kubelet Restart

↓

09:51

Node Ready

↓

10:01

Incident Closed
```

---

# 16. Root Cause Analysis (RCA)

## What Happened?

Worker node entered NotReady state.

## Why?

Disk utilization reached 100%.

## Why wasn't it detected?

Disk utilization alerts were configured too late.

## Customer Impact

Multiple services unavailable.

## Preventive Action

Implement proactive disk monitoring and automated cleanup.

---

# 17. Preventive Actions

- Enable disk utilization alerts at 80%.
- Schedule container image cleanup.
- Rotate application logs.
- Monitor kubelet health.
- Monitor container runtime.
- Perform regular node maintenance.

---

# 18. Production Best Practices

- Monitor disk usage continuously.
- Configure log rotation.
- Remove unused container images regularly.
- Never ignore NodePressure warnings.
- Monitor kubelet and container runtime services.
- Perform periodic node health audits.

---

# 19. Production Support Interview Questions

## Q1. How do you investigate a Node NotReady incident?

### Answer

1. Verify cluster health.
2. Identify affected node.
3. Describe the node.
4. Check kubelet status.
5. Review kubelet logs.
6. Verify disk, CPU, memory and network.
7. Check container runtime.
8. Restore node health.
9. Validate application recovery.
10. Complete RCA.

---

## Q2. What are the most common causes of Node NotReady?

### Answer

- Kubelet failure
- Disk full
- Network partition
- Memory exhaustion
- CPU starvation
- Container runtime failure
- Infrastructure outage

---

## Q3. Should you reboot the node immediately?

### Answer

No.

Always collect evidence first. Verify kubelet, logs, infrastructure health and disk usage before restarting or replacing the node.

---

# 20. Marathi Quick Revision

- Node Ready आहे का तपासा.
- Node describe करा.
- Kubelet status तपासा.
- Kubelet logs पहा.
- Disk usage verify करा.
- Runtime verify करा.
- Root Cause शोधा.
- Recovery करा.
- Business validation करा.
- RCA तयार करा.

---

# 21. Marathi Summary (5+ Experience Revision)

## Interview Summary

Production मध्ये Node NotReady आल्यास प्रथम `kubectl get nodes` आणि `kubectl describe node` वापरून node condition तपासावी. त्यानंतर kubelet status, kubelet logs, disk usage, memory, network आणि container runtime verify करावे. Root Cause निश्चित झाल्यानंतरच node recover किंवा replace करावा. शेवटी business validation, monitoring validation आणि RCA पूर्ण करावी.

### Production Investigation Flow

```
Alert

↓

Node NotReady

↓

Describe Node

↓

Kubelet

↓

Disk

↓

Runtime

↓

Infrastructure

↓

Root Cause

↓

Recovery

↓

Business Validation

↓

RCA
```

### Production Story

एका production banking platform मध्ये सकाळच्या peak traffic दरम्यान एक worker node अचानक `NotReady` झाला. सुरुवातीला infrastructure outage ची शंका होती, पण VM व्यवस्थित चालू होती. `journalctl -u kubelet` आणि `df -h` तपासल्यावर disk 100% भरल्यामुळे container runtime बंद पडल्याचे आढळले. Unused images आणि logs साफ करून kubelet restart करण्यात आला. काही मिनिटांत node पुन्हा Ready झाला आणि Pods आपोआप recover झाले. Incident नंतर automated image cleanup, log rotation आणि 80% disk usage alert लागू करण्यात आले.

### 5+ Years Memory Trick

Interview मध्ये जर विचारले,

**"How do you troubleshoot a Kubernetes Node NotReady production incident?"**

उत्तर:

"I first verify the affected node, inspect node conditions, review kubelet status and logs, check disk, memory, network and container runtime health, identify the root cause before making changes, recover or replace the node as required, validate business functionality, monitor cluster stability, and complete the RCA."

