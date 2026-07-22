# Kubernetes Runbook 11 - StorageClass Issues

# 1. Purpose

This runbook explains how to investigate and recover StorageClass-related issues in Kubernetes.

StorageClass problems commonly prevent PersistentVolumeClaims (PVCs) from being dynamically provisioned, resulting in Pods remaining in the Pending state.

The objective is to identify storage provisioning failures, restore persistent storage, and document the Root Cause Analysis (RCA).

---

# 2. Scope

Applicable to

- StorageClasses
- PersistentVolumeClaims (PVC)
- PersistentVolumes (PV)
- CSI Drivers
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

- Database not starting
- Stateful application unavailable
- Upload failures
- Application waiting indefinitely

Monitoring may report

- PVC Pending
- Volume provisioning failure
- Failed Mount
- Storage alerts

Example

```
Application

↓

PVC Pending

↓

No Volume

↓

Pod Pending
```

---

# 4. Business Impact

Critical

- Database unavailable
- Persistent applications unavailable
- Customer transactions failing

Medium

- Internal applications degraded
- Delayed deployments

Low

- Development storage issues

---

# 5. Possible Root Causes

- StorageClass does not exist
- Wrong StorageClass name
- StorageClass marked incorrectly
- CSI Driver unavailable
- Provisioner unavailable
- Cloud storage unavailable
- AccessMode mismatch
- Insufficient storage capacity
- Incorrect reclaim policy
- VolumeBindingMode issue

---

# 6. Prerequisites

Required

- kubectl
- Cluster administrator access
- Storage administrator access

Verify permissions

```bash
kubectl auth can-i get storageclass

kubectl auth can-i get pvc

kubectl auth can-i get pv
```

---

# 7. Initial Investigation

## Step 1

List StorageClasses

```bash
kubectl get storageclass
```

Example

```
NAME

gp3

gp2

standard
```

Identify

- Default StorageClass
- Requested StorageClass

---

## Step 2

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

## Step 3

Describe PVC

```bash
kubectl describe pvc <pvc-name> \
-n <namespace>
```

Review

- StorageClass
- Events
- Provisioning failures

---

# 8. Detailed Investigation

## Step 1

Describe StorageClass

```bash
kubectl describe storageclass <storageclass-name>
```

Verify

- Provisioner
- Reclaim Policy
- Volume Binding Mode
- Allow Volume Expansion

---

## Step 2

Verify Default StorageClass

```bash
kubectl get storageclass
```

Expected

```
(default)
```

Only one StorageClass should normally be marked as default.

---

## Step 3

Verify Provisioner

Examples

AWS

```
ebs.csi.aws.com
```

Azure

```
disk.csi.azure.com
```

GCP

```
pd.csi.storage.gke.io
```

Confirm the provisioner matches the cloud platform.

---

## Step 4

Verify CSI Components

```bash
kubectl get pods -A | grep csi
```

Expected

```
Running
```

---

## Step 5

Review Events

```bash
kubectl get events \
-n <namespace> \
--sort-by=.metadata.creationTimestamp
```

Look for

```
Provisioning failed

StorageClass not found

CSI timeout

Volume creation failed
```

---

## Step 6

Verify Cloud Storage

Check

AWS

- EBS
- EFS

Azure

- Managed Disk

GCP

- Persistent Disk

---

## Step 7

Verify Capacity

Ensure

Requested

```
100Gi
```

is supported by the StorageClass.

---

## Step 8

Verify VolumeBindingMode

Typical values

```
Immediate

WaitForFirstConsumer
```

Ensure scheduling behavior matches workload requirements.

---

# 9. Resolution Steps

StorageClass Missing

Create the StorageClass.

Wrong StorageClass

Update Deployment or PVC.

CSI Failure

Recover CSI Controller.

Provisioner Failure

Restore storage provisioner.

Cloud Storage Issue

Recover cloud storage service.

Incorrect Default StorageClass

Correct default annotation.

---

# 10. Validation Steps

Verify

```bash
kubectl get storageclass

kubectl get pvc

kubectl get pv
```

Expected

```
PVC

Bound
```

Verify Pods

```bash
kubectl get pods
```

Business Validation

- Database available
- Application healthy
- Monitoring green

---

# 11. Rollback Procedure

If a StorageClass change caused the issue

Restore the previous StorageClass configuration.

Avoid modifying production StorageClasses during business hours unless required by an approved change.

Restart workloads only after storage provisioning succeeds.

---

# 12. Escalation Matrix

L1

- Verify PVC
- Verify StorageClass

↓

L2

- Verify Provisioner
- Verify CSI

↓

Platform Team

- Kubernetes Storage
- CSI

↓

Cloud Team

- Cloud Storage
- Storage APIs

---

# 13. Production Best Practices

- Use a single default StorageClass.
- Monitor storage provisioning failures.
- Regularly verify CSI health.
- Use dynamic provisioning.
- Document StorageClass standards.
- Monitor cloud storage quotas.
- Test disaster recovery procedures.

---

# 14. Real Production Scenario

A production PostgreSQL deployment remained Pending after migration to a new Kubernetes cluster.

Investigation

```bash
kubectl describe pvc
```

showed

```
StorageClass "gp2" not found
```

The new cluster used

```
gp3
```

instead.

Updating the PVC to use the correct StorageClass resolved the issue.

Root Cause

Incorrect StorageClass reference after migration.

---

# 15. Scenario Interview Questions

## Q1. PVC is Pending with "StorageClass not found". What will you do?

### Answer

Verify

```bash
kubectl get storageclass

kubectl describe pvc
```

Update the PVC or create the required StorageClass.

---

## Q2. What does a StorageClass define?

### Answer

A StorageClass defines

- Provisioner
- Reclaim Policy
- Volume Binding Mode
- Expansion capability

It determines how persistent storage is dynamically provisioned.

---

## Q3. Why is only one default StorageClass recommended?

### Answer

Multiple default StorageClasses can create unexpected provisioning behavior and operational confusion.

---

# 16. Architecture Interview Questions

## Q1. Explain StorageClass architecture.

### Answer

```
Application

↓

PVC

↓

StorageClass

↓

CSI Driver

↓

Cloud Storage

↓

PV

↓

Pod
```

---

## Q2. Which Kubernetes components participate?

### Answer

- PVC
- PV
- StorageClass
- CSI Controller
- CSI Node Plugin
- Cloud Storage Provider

---

# 17. Production Support Interview Questions

## Q1. A production StatefulSet remains Pending after migration. How will you investigate?

### Answer

Commands

```bash
kubectl get pvc

kubectl describe pvc

kubectl get storageclass

kubectl describe storageclass

kubectl get pv

kubectl get pods -A | grep csi
```

Verify

- StorageClass
- CSI
- Cloud Storage
- Events
- Capacity

---

## Q2. What production mistakes commonly cause StorageClass failures?

### Answer

- Incorrect StorageClass names
- Missing CSI Drivers
- Wrong cloud provisioner
- Multiple default StorageClasses
- Cloud quota exhaustion
- Manual StorageClass modifications

---

# 18. Commands Reference

```bash
kubectl get storageclass

kubectl describe storageclass

kubectl get pvc

kubectl describe pvc

kubectl get pv

kubectl describe pv

kubectl get pods -A | grep csi

kubectl get events
```

---

# 19. Marathi Quick Revision

- StorageClass तपासा.
- PVC Events तपासा.
- CSI Driver verify करा.
- Provisioner तपासा.
- Cloud Storage verify करा.
- Default StorageClass तपासा.
- Root Cause शोधूनच बदल करा.

---

# 20. Related Runbooks

- 10-pvc-pv-issues.md
- 03-pod-pending.md
- 19-cluster-disaster-recovery.md

---

# 21. Marathi Summary (5+ Experience Revision)

## Interview Summary

StorageClass चुकीचा असल्यास किंवा उपलब्ध नसल्यास PVC Bound होत नाही आणि Pods Pending राहतात. Production मध्ये प्रथम StorageClass, PVC Events, CSI Driver, Provisioner आणि Cloud Storage verify करावे. चुकीचा StorageClass reference ही migration नंतरची अतिशय सामान्य production समस्या आहे. Root Cause निश्चित झाल्यानंतरच StorageClass किंवा PVC configuration बदलावी.

### Production Investigation Flow

```
Alert

↓

PVC Pending

↓

StorageClass

↓

PVC Events

↓

Provisioner

↓

CSI Driver

↓

Cloud Storage

↓

Capacity

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

एका production healthcare application चे StatefulSet नवीन EKS cluster वर migrate केल्यानंतर सुरू होत नव्हते. `kubectl describe pvc` मध्ये `StorageClass "gp2" not found` दिसले. नवीन cluster मध्ये default StorageClass `gp3` होती. PVC configuration update केल्यानंतर volume लगेच provision झाली आणि database सुरू झाला. Migration checklist मध्ये StorageClass compatibility validation नंतर अनिवार्य करण्यात आली.

### 5+ Years Memory Trick

Interview मध्ये जर विचारले,

**"How do you troubleshoot StorageClass issues in production?"**

उत्तर:

"I first verify the StorageClass referenced by the PVC, review PVC events, validate the CSI driver and provisioner, and confirm cloud storage availability. I ensure the correct default StorageClass is configured, restore successful provisioning, validate the application, and document the RCA."

