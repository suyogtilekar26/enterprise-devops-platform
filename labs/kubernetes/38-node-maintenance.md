# Lab 38 - Kubernetes Node Maintenance

# 1. Objective

The objective of this lab is to understand how Kubernetes node maintenance is performed in production without causing unnecessary application downtime.

By the end of this lab you will be able to

- Perform node cordon
- Perform node drain
- Perform node uncordon
- Verify Pod rescheduling
- Understand Pod Disruption Budget impact
- Troubleshoot drain failures
- Explain enterprise maintenance workflow

Node maintenance is one of the most common activities performed by Kubernetes administrators during production upgrades, OS patching and hardware replacement.

---

# 2. Prerequisites

Complete

- Lab 01 - Lab 37

Verify

```bash
kubectl get nodes

kubectl get pods -A

kubectl get deployments
```

Ensure at least one Deployment has multiple replicas.

---

# 3. Enterprise Usage

Typical maintenance workflow

```
Worker Node

↓

Cordon

↓

Drain

↓

OS Upgrade

↓

Kubelet Upgrade

↓

Validation

↓

Uncordon

↓

Production Traffic
```

Maintenance should never cause unexpected production downtime.

---

# 4. Usage in THIS Project

Future maintenance process

```
Frontend Pods

↓

Move to Healthy Nodes
```

```
API Gateway

↓

Drain Node

↓

Automatic Reschedule
```

```
Authentication Service

↓

Remain Available
```

```
Monitoring Stack

↓

Validate After Maintenance
```

---

# 5. Architecture

```
Administrator

↓

kubectl drain

↓

API Server

↓

Evict Pods

↓

Scheduler

↓

Healthy Worker Node

↓

Pods Running
```

---

# 6. Step-by-Step Implementation

## Step 1

View Nodes

```bash
kubectl get nodes
```

Example

```
kind-control-plane
kind-worker
kind-worker2
```

---

## Step 2

Deploy Test Application

```bash
kubectl create deployment maintenance-demo \
--image=nginx:stable
```

Scale

```bash
kubectl scale deployment maintenance-demo \
--replicas=6
```

Verify

```bash
kubectl get pods -o wide
```

Observe Pod distribution.

---

## Step 3

Select Node

Example

```bash
kubectl get nodes
```

Choose

```
kind-worker
```

---

## Step 4

Cordon Node

```bash
kubectl cordon kind-worker
```

Verify

```bash
kubectl get nodes
```

Expected

```
SchedulingDisabled
```

Existing Pods continue running.

No new Pods are scheduled.

---

## Step 5

Verify Scheduling

Delete one Pod running on another node.

```bash
kubectl delete pod <pod-name>
```

Observe

New Pod is **not** scheduled on the cordoned node.

---

## Step 6

Drain Node

```bash
kubectl drain kind-worker \
--ignore-daemonsets \
--delete-emptydir-data
```

Observe

Pods are evicted.

Scheduler creates replacement Pods on healthy nodes.

---

## Step 7

Verify Pod Migration

```bash
kubectl get pods -o wide
```

Expected

No application Pods remain on

```
kind-worker
```

---

## Step 8

Perform Maintenance

Example activities

- Operating system patches
- Security updates
- Kubelet upgrade
- Runtime upgrade
- Hardware replacement

In this lab we simulate maintenance only.

---

## Step 9

Uncordon Node

```bash
kubectl uncordon kind-worker
```

Verify

```bash
kubectl get nodes
```

Expected

```
Ready
```

without

```
SchedulingDisabled
```

---

## Step 10

Review Cluster

```bash
kubectl get nodes

kubectl get pods -o wide

kubectl describe node kind-worker
```

---

# 7. Verification

```bash
kubectl get nodes

kubectl get pods -o wide

kubectl describe node kind-worker
```

Expected

- Node Ready
- Scheduling enabled
- Pods rescheduled successfully
- Cluster healthy

---

# 8. Failure Simulation

## Scenario 1

Attempt Maintenance Without Drain

Power off node directly.

Expected

Unexpected application disruption.

---

## Scenario 2

Drain Single Replica Deployment

Deployment

```
Replicas = 1
```

Expected

Temporary downtime.

---

## Scenario 3

Pod Disruption Budget Blocks Drain

Expected

```
Cannot evict pod
```

Drain pauses until disruption budget allows eviction.

---

## Scenario 4

DaemonSet Pods

Drain command without

```bash
--ignore-daemonsets
```

Expected

Drain fails.

---

# 9. Troubleshooting

Nodes

```bash
kubectl get nodes

kubectl describe node kind-worker
```

Pods

```bash
kubectl get pods -o wide

kubectl describe pod <pod-name>
```

Drain

```bash
kubectl drain kind-worker \
--ignore-daemonsets \
--delete-emptydir-data
```

Events

```bash
kubectl get events
```

---

# 10. Production Discussion

Enterprise Maintenance Flow

```
Maintenance Window

↓

Cordon

↓

Drain

↓

Infrastructure Upgrade

↓

Validation

↓

Uncordon

↓

Traffic Restored
```

This process minimizes service interruption.

---

# 11. Production Best Practices

- Schedule maintenance during approved windows.
- Notify stakeholders.
- Verify application health before draining.
- Ensure sufficient replicas exist.
- Configure Pod Disruption Budgets.
- Validate monitoring after maintenance.
- Document every maintenance activity.

---

# 12. Real Production Scenario

A production Kubernetes cluster required critical Linux kernel patches due to a security vulnerability.

The operations team:

- Cordoned one node.
- Drained application Pods.
- Installed OS updates.
- Rebooted the server.
- Validated kubelet.
- Uncordoned the node.

This process was repeated one node at a time.

The entire cluster remained available with zero customer downtime.

---

# 13. Scenario Interview Questions

## Q1. What is cordon?

### Answer

Cordon marks a node as unschedulable.

Existing Pods continue running, but Kubernetes does not schedule new Pods onto the node.

Command

```bash
kubectl cordon <node>
```

---

## Q2. What is drain?

### Answer

Drain safely evicts workload Pods from a node before maintenance.

The Scheduler recreates Pods on other healthy nodes.

Command

```bash
kubectl drain <node> \
--ignore-daemonsets \
--delete-emptydir-data
```

---

## Q3. What is uncordon?

### Answer

Uncordon marks the node as schedulable again.

New Pods can once again be placed on the node.

Command

```bash
kubectl uncordon <node>
```

---

## Q4. Why not simply reboot a production node?

### Answer

Directly rebooting a node can abruptly terminate running Pods and cause service disruption.

The recommended workflow is

```
Cordon

↓

Drain

↓

Maintenance

↓

Uncordon
```

---

## Q5. What happens during drain?

### Answer

Kubernetes

- Evicts Pods
- Honors Pod Disruption Budgets
- Reschedules workloads
- Preserves application availability when sufficient replicas exist

---

# 14. Architecture Interview Questions

## Q1. Explain Node Maintenance Architecture.

### Answer

```
Administrator

↓

kubectl drain

↓

API Server

↓

Eviction API

↓

Scheduler

↓

Healthy Worker Node

↓

Pods Running
```

The Scheduler automatically recreates Pods on available nodes after eviction.

---

## Q2. Why does drain use the Eviction API?

### Answer

The Eviction API respects Pod Disruption Budgets and allows controlled application disruption instead of immediately deleting Pods.

---

## Q3. How do Pod Disruption Budgets affect maintenance?

### Answer

Pod Disruption Budgets define how many application Pods must remain available during voluntary disruptions.

If draining a node violates the PDB, Kubernetes blocks Pod eviction until the disruption budget can be satisfied.

---

## Q4. Why are multiple replicas important before maintenance?

### Answer

Multiple replicas ensure that workloads continue serving traffic while Pods are being evicted and recreated on other nodes.

Single replica applications may experience downtime during maintenance.

---

# 15. Production Support Interview Questions

## Q1. Drain command is hanging. How will you investigate?

### Answer

Commands

```bash
kubectl drain <node> \
--ignore-daemonsets \
--delete-emptydir-data

kubectl get pdb

kubectl describe pdb

kubectl get events
```

Investigate

- Pod Disruption Budget
- DaemonSets
- Stateful workloads
- Unmanaged Pods
- Stuck terminating Pods

---

## Q2. Pods are not moving to another node. What will you check?

### Answer

Commands

```bash
kubectl get nodes

kubectl describe node

kubectl describe pod <pod>

kubectl get events
```

Investigate

- Available worker nodes
- Node capacity
- Taints
- Affinity rules
- Resource Requests

---

## Q3. After maintenance, applications are unavailable. How will you investigate?

### Answer

Verify

- Node Ready status
- Deployment replicas
- Service endpoints
- Readiness Probes
- Events
- Ingress
- Load Balancer

Commands

```bash
kubectl get nodes

kubectl get pods

kubectl get svc

kubectl get endpoints

kubectl get events
```

---

## Q4. Describe the enterprise node maintenance process.

### Answer

Typical workflow

```
Maintenance Approval

↓

Notify Teams

↓

Cordon Node

↓

Drain Node

↓

OS/Kubernetes Upgrade

↓

Validation

↓

Uncordon

↓

Monitor Production
```

Maintenance is usually performed one worker node at a time to maintain application availability.

---

# 16. Cleanup

```bash
kubectl delete deployment maintenance-demo
```

---

# 17. Important Commands

```bash
kubectl cordon <node>

kubectl drain <node> \
--ignore-daemonsets \
--delete-emptydir-data

kubectl uncordon <node>

kubectl get nodes

kubectl get pods -o wide

kubectl describe node <node>

kubectl get events
```

---

# 18. Marathi Quick Revision

- Cordon म्हणजे नवीन Pods schedule होऊ देत नाही.
- Drain म्हणजे Pods सुरक्षितपणे दुसऱ्या node वर हलवतो.
- Uncordon म्हणजे node पुन्हा scheduling साठी उपलब्ध करतो.
- Production मध्ये reboot करण्यापूर्वी drain करणे आवश्यक आहे.
- PDB मुळे काही Pods लगेच evict होणार नाहीत.

---

# 19. Enterprise Learning Outcome

After completing this lab you should be able to

- Perform production node maintenance
- Use cordon, drain and uncordon correctly
- Troubleshoot drain failures
- Understand Pod Disruption Budgets
- Minimize downtime during maintenance
- Explain enterprise maintenance procedures

---

# 20. Next Lab

```
39-pod-debugging-production.md
```

In the next lab we will troubleshoot real production Pod failures including CrashLoopBackOff, ImagePullBackOff, Pending Pods, probe failures, OOMKilled and configuration issues using a structured incident investigation approach.

---

# 21. Marathi Summary (5+ Experience Revision)

## Interview Summary

Node Maintenance करताना Kubernetes मध्ये थेट node reboot किंवा shutdown करत नाहीत. प्रथम node ला **cordon** करून नवीन Pods schedule होण्यापासून थांबवले जाते. नंतर **drain** वापरून Pods सुरक्षितपणे इतर healthy nodes वर हलवले जातात. Maintenance पूर्ण झाल्यावर **uncordon** करून node पुन्हा cluster मध्ये scheduling साठी उपलब्ध केला जातो. Enterprise production मध्ये downtime टाळण्यासाठी हीच standard प्रक्रिया वापरली जाते.

### Production Investigation Flow

```
Maintenance Request

↓

Cluster Health Check

↓

Cordon

↓

Drain

↓

OS/Kubernetes Upgrade

↓

Validation

↓

Uncordon

↓

Application Health Verification
```

### Production Story

एका production banking cluster मध्ये Linux kernel security patch लागू करायचा होता. एका engineer ने चुकून node थेट reboot केला, ज्यामुळे single-replica internal reporting service काही मिनिटांसाठी unavailable झाली. Incident नंतर standard maintenance runbook तयार करण्यात आला. त्यात प्रत्येक node साठी cordon, drain, validation आणि uncordon या चार mandatory steps समाविष्ट करण्यात आल्या. पुढील सर्व maintenance windows zero downtime मध्ये पूर्ण झाल्या.

### 5+ Years Memory Trick

Interview मध्ये जर विचारले,

**"How do you perform Kubernetes node maintenance in production?"**

उत्तर:

"First verify application health and replica availability. Cordon the node to stop new scheduling, drain it to safely evict workloads while respecting Pod Disruption Budgets, perform the required maintenance, validate node health, uncordon the node and finally monitor applications to ensure normal operation."

