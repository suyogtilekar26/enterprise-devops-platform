# Kubernetes Runbook 10 - PVC and PV Issues

# 1. Purpose

This runbook explains how to investigate and recover PersistentVolume (PV) and PersistentVolumeClaim (PVC) issues in Kubernetes.

Storage failures can prevent Pods from starting, cause application downtime, or result in data access failures. The objective is to identify the storage issue, restore access safely, and document the Root Cause Analysis (RCA).

---

# 2. Scope

Applicable to

- PersistentVolumes (PV)
- PersistentVolumeClaims (PVC)
- StorageClasses
- StatefulSets
- Deployments using persistent storage

Supported Platforms

- Kind
- EKS
- AKS
- GKE
- OpenShift
- On-Prem Kubernetes

---

# 3. Symptoms

Users may report

- Application unavailable
- Database not starting
- Upload failures
- Data inaccessible

Monitoring may report

- PVC Pending
- Volume Mount Failed
- Failed Attach Volume
- Failed Mount
- StatefulSet unavailable

Example

```
Database Pod

↓

Pending

↓

PVC Pending

↓

Application Failure
```

---

# 4. Business Impact

Critical

- Database unavailable
- Customer transactions fail
- Persistent data inaccessible

Medium

- One application unavailable
- Stateful workload degraded

Low

- Development storage issue

---

# 5. Possible Root Causes

- PVC Pending
- PV unavailable
- StorageClass missing
- Storage provisioner unavailable
- Volume attachment failure
- Node failure
- AccessMode mismatch
- Capacity mismatch
- CSI driver failure
- Cloud storage failure
- Disk quota exceeded

---

# 6. Prerequisites

Required

- kubectl
- Storage administrator access
- Namespace access

Verify

```bash
kubectl auth can-i get pvc

kubectl auth can-i get pv

kubectl auth can-i get storageclass
```

---

# 7. Initial Investigation

## Step 1

Verify PVC

```bash
kubectl get pvc -A
```

Expected

```
STATUS

Bound
```

Problem

```
Pending
```

---

## Step 2

Verify PV

```bash
kubectl get pv
```

Review

- Status
- Capacity
- Access Modes
- StorageClass

---

## Step 3

Describe PVC

```bash
kubectl describe pvc <pvc-name> \
-n <namespace>
```

Review

- Events
- StorageClass
- Requested Size
- Access Modes

---

# 8. Detailed Investigation

## Step 1

Verify StorageClass

```bash
kubectl get storageclass

kubectl describe storageclass <storageclass>
```

Ensure the requested StorageClass exists.

---

## Step 2

Review Events

```bash
kubectl get events \
-n <namespace> \
--sort-by=.metadata.creationTimestamp
```

Look for

- Failed Mount
- Provisioning Failed
- Attach Volume Failed

---

## Step 3

Verify Pod

```bash
kubectl describe pod <pod-name> \
-n <namespace>
```

Review

- Volume Mounts
- Events
- Mount failures

---

## Step 4

Verify CSI Driver

```bash
kubectl get pods -A | grep csi
```

Ensure CSI controller and node plugins are healthy.

---

## Step 5

Verify Node

```bash
kubectl get nodes
```

Confirm the target node is Ready.

---

## Step 6

Verify Cloud Storage

Examples

AWS

- EBS Volume
- EFS

Azure

- Managed Disk

GCP

- Persistent Disk

Verify cloud disk health.

---

## Step 7

Verify Capacity

Check

Requested

```
10Gi
```

Available

```
5Gi
```

Provisioning fails if sufficient storage is unavailable.

---

## Step 8

Verify Access Mode

Examples

```
ReadWriteOnce

ReadOnlyMany

ReadWriteMany
```

Ensure the application requirements match the storage capabilities.

---

# 9. Resolution Steps

Depending on findings

PVC Pending

Correct StorageClass or provision storage.

StorageClass Missing

Create or update StorageClass.

CSI Failure

Recover CSI controller.

Node Failure

Recover or reschedule workload.

Capacity Issue

Increase storage capacity.

Cloud Volume Failure

Restore or recreate cloud volume.

---

# 10. Validation Steps

Verify

```bash
kubectl get pvc

kubectl get pv
```

Expected

```
STATUS

Bound
```

Verify Pod

```bash
kubectl get pods
```

Business Validation

- Database accessible
- Uploads working
- APIs responding
- Monitoring healthy

---

# 11. Rollback Procedure

If storage changes caused the issue

Restore previous StorageClass or storage configuration.

Restart affected workloads only after confirming storage availability.

Never delete a production PV without verifying data protection and backup status.

---

# 12. Escalation Matrix

L1

- Verify PVC
- Verify PV
- Collect Events

↓

L2

- Verify StorageClass
- Verify CSI
- Verify Node

↓

Platform Team

- Kubernetes Storage
- CSI

↓

Cloud Team

- EBS
- Azure Disk
- GCE Persistent Disk
- SAN/NAS

---

# 13. Production Best Practices

- Monitor PVC Pending alerts.
- Monitor disk utilization.
- Use dynamic provisioning.
- Backup persistent data regularly.
- Monitor CSI components.
- Avoid manual PV modifications.
- Test storage recovery procedures.

---

# 14. Real Production Scenario

A production PostgreSQL StatefulSet failed to start after a cluster upgrade.

Investigation

```bash
kubectl describe pvc postgres-data
```

showed

```
Provisioning failed
```

The CSI controller had failed after the upgrade.

Restarting the CSI controller restored provisioning.

PVC became Bound.

Database started successfully.

Root Cause

CSI controller failure.

---

# 15. Scenario Interview Questions

## Q1. A Pod is Pending because its PVC is Pending. What is your first step?

### Answer

Verify

```bash
kubectl get pvc

kubectl describe pvc
```

Review Events before making changes.

---

## Q2. Which components should you verify?

### Answer

- StorageClass
- PV
- CSI Driver
- Node
- Cloud Storage

---

## Q3. Why shouldn't you immediately delete the PVC?

### Answer

Deleting a PVC may permanently remove access to production data depending on the reclaim policy.

Always verify backups and reclaim policy before deleting any storage resource.

---

# 16. Architecture Interview Questions

## Q1. Explain Kubernetes Persistent Storage Architecture.

### Answer

```
Application

↓

Pod

↓

PersistentVolumeClaim

↓

PersistentVolume

↓

StorageClass

↓

CSI Driver

↓

Cloud Storage / Disk
```

---

## Q2. Which Kubernetes components participate?

### Answer

- Pod
- PVC
- PV
- StorageClass
- CSI Controller
- CSI Node Plugin
- Cloud Storage Provider

---

# 17. Production Support Interview Questions

## Q1. A production database Pod remains Pending due to storage. How do you investigate?

### Answer

Commands

```bash
kubectl get pvc

kubectl describe pvc

kubectl get pv

kubectl get storageclass

kubectl describe pod

kubectl get events

kubectl get pods -A | grep csi
```

Verify

- PVC
- PV
- StorageClass
- CSI
- Node
- Cloud volume

---

## Q2. How do you differentiate between a Kubernetes storage issue and a cloud storage issue?

### Answer

If PVC provisioning fails before reaching the cloud provider, investigate Kubernetes StorageClass and CSI.

If Kubernetes resources are healthy but the underlying disk cannot attach or provision, investigate the cloud storage platform.

---

# 18. Commands Reference

```bash
kubectl get pvc

kubectl describe pvc

kubectl get pv

kubectl describe pv

kubectl get storageclass

kubectl describe storageclass

kubectl describe pod

kubectl get events

kubectl get pods -A | grep csi
```

---

# 19. Marathi Quick Revision

- PVC तपासा.
- PV तपासा.
- StorageClass verify करा.
- Events तपासा.
- CSI Driver तपासा.
- Node Ready आहे का तपासा.
- Cloud Storage verify करा.

---

# 20. Related Runbooks

- 03-pod-pending.md
- 04-node-notready.md
- 11-storageclass-issues.md
- 19-cluster-disaster-recovery.md

---

# 21. Marathi Summary (5+ Experience Revision)

## Interview Summary

PVC किंवा PV समस्या आल्यास सर्वप्रथम `kubectl get pvc` आणि `kubectl describe pvc` वापरून Events तपासावेत. त्यानंतर PV, StorageClass, CSI Driver, Node आणि Cloud Storage verify करावे. Production मध्ये PVC delete करण्यापूर्वी reclaim policy आणि backup स्थिती तपासणे अत्यावश्यक आहे. Root Cause निश्चित झाल्यावरच storage configuration बदलावी.

### Production Investigation Flow

```
Alert

↓

PVC

↓

PV

↓

StorageClass

↓

Events

↓

CSI Driver

↓

Node

↓

Cloud Storage

↓

Root Cause

↓

Fix

↓

Validation

↓

RCA
```

### Production Story

एका production e-commerce platform मध्ये PostgreSQL StatefulSet सुरू होत नव्हता. सुरुवातीला database corruption असल्याचा संशय होता. `kubectl describe pvc` मध्ये provisioning failures दिसले. CSI controller upgrade नंतर crash झाला होता. CSI controller recover केल्यानंतर PVC Bound झाली आणि database काही मिनिटांत सुरू झाला. Incident review नंतर CSI health monitoring आणि pre-upgrade validation checklist लागू करण्यात आली.

### 5+ Years Memory Trick

Interview मध्ये जर विचारले,

**"How do you troubleshoot PVC/PV issues in production?"**

उत्तर:

"I begin by checking the PVC status and events, then verify the PV, StorageClass and CSI components. Next, I validate node health and the underlying cloud storage. I never delete production storage resources before verifying reclaim policies and backups. Once storage is restored, I validate application functionality and document the RCA."

