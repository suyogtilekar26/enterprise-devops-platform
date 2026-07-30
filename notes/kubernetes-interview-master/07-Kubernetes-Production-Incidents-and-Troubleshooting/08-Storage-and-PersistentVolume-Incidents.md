# Kubernetes Interview Master Handbook

# Section 07 - Kubernetes Production Incidents & Troubleshooting

# Chapter 08 - Storage and PersistentVolume Incidents

---

# Objective

Learn how to investigate, troubleshoot, recover and permanently prevent Storage, PersistentVolume (PV) and PersistentVolumeClaim (PVC) incidents in Kubernetes production environments.

Storage incidents are among the highest-impact failures because they directly affect databases, stateful applications and business-critical workloads.

---

# Interview Scenario

Time: 08:15 AM

PagerDuty Alert

"Database Pods Stuck in Pending"

Impact

- PostgreSQL unavailable
- Customer transactions failing
- StatefulSet not starting
- Business operations affected

You are the on-call SRE.

Restore production immediately.

---

# What is a Storage Incident?

A Storage incident occurs when Kubernetes workloads cannot provision, attach, mount or access persistent storage required for application execution.

---

# Storage Workflow

Application

↓

PersistentVolumeClaim

↓

StorageClass

↓

PersistentVolume

↓

CSI Driver

↓

Cloud Storage

↓

Pod Mounted

OR

↓

Provisioning Failure

↓

Pending

↓

Application Failure

---

# Common Root Causes

PVC Pending

PV Not Bound

StorageClass Missing

CSI Driver Failure

Volume Attachment Failure

Disk Full

Filesystem Corruption

AccessMode Mismatch

Storage Quota Exceeded

Cloud Storage Outage

Node Mount Failure

Deleted PersistentVolume

---

# Step 1 - Check Pods

```bash
kubectl get pods -A
```

Example

```text
postgres-0      Pending
```

---

# Step 2 - Check PVC

```bash
kubectl get pvc -A
```

Example

```text
NAME          STATUS
postgres-pvc  Pending
```

---

# Step 3 - Describe PVC

```bash
kubectl describe pvc postgres-pvc
```

Verify

- Events
- StorageClass
- Requested Capacity
- AccessMode

---

# Step 4 - Check PV

```bash
kubectl get pv
```

Verify

STATUS

- Available
- Bound
- Released
- Failed

---

# Step 5 - Describe PV

```bash
kubectl describe pv <pv-name>
```

Verify

- Capacity
- Claim
- StorageClass
- Reclaim Policy

---

# Step 6 - Verify StorageClass

```bash
kubectl get storageclass
```

Describe

```bash
kubectl describe storageclass <storageclass>
```

---

# Step 7 - Verify CSI Driver

```bash
kubectl get pods -A | grep csi
```

Confirm

- CSI Controller Running
- CSI Node Plugin Running

---

# Step 8 - Verify Events

```bash
kubectl get events -A --sort-by=.metadata.creationTimestamp
```

Look for

- FailedAttachVolume
- FailedMount
- ProvisioningFailed

---

# Step 9 - Verify Node

```bash
kubectl describe node <node-name>
```

Check

- Disk Pressure
- Mount Errors
- Volume Limits

---

# Investigation Flow

Pod

↓

PVC

↓

PV

↓

StorageClass

↓

CSI Driver

↓

Node

↓

Cloud Storage

↓

Recovery

---

# Scenario 1

PVC Pending

Event

```text
Waiting for a volume to be created
```

Root Cause

StorageClass missing.

Resolution

Create or correct StorageClass.

---

# Scenario 2

PV Not Bound

PV

```text
Available
```

PVC

```text
Pending
```

Root Cause

AccessMode or StorageClass mismatch.

Resolution

Correct PVC specification.

---

# Scenario 3

Failed Mount

Event

```text
FailedMount
```

Root Cause

Volume could not be mounted.

Resolution

Verify CSI Driver.

Verify Node.

---

# Scenario 4

Disk Full

Node

```text
DiskPressure=True
```

Resolution

Free disk space.

Expand storage.

---

# Scenario 5

CSI Driver Failure

CSI Pods

CrashLoopBackOff

Resolution

Recover CSI Controller.

Restart CSI components.

---

# Scenario 6

Cloud Disk Attachment Failure

Event

```text
FailedAttachVolume
```

Root Cause

Cloud provider issue.

Resolution

Reattach disk.

Recover node.

---

# Production Incident

Issue

Production PostgreSQL unavailable.

Investigation

```bash
kubectl get pvc
```

PVC

Pending

Describe PVC

```text
StorageClass "fast-ssd" not found
```

Root Cause

StorageClass deleted during infrastructure change.

Resolution

Restore StorageClass.

PVC Bound.

StatefulSet starts successfully.

Application recovered.

---

# Recovery Commands

Check PVC

```bash
kubectl get pvc -A
```

---

Check PV

```bash
kubectl get pv
```

---

Describe PVC

```bash
kubectl describe pvc <pvc-name>
```

---

Describe PV

```bash
kubectl describe pv <pv-name>
```

---

Verify StorageClass

```bash
kubectl get storageclass
```

---

Restart StatefulSet

```bash
kubectl rollout restart statefulset postgres
```

---

# Validation Checklist

PVC Bound

PV Bound

Storage Mounted

StatefulSet Running

Database Healthy

Application Healthy

Transactions Successful

---

# RCA Template

Incident

PersistentVolume Failure

Root Cause

Missing StorageClass

Business Impact

Database unavailable

Detection

PVC Pending Alert

Resolution

Restored StorageClass

Preventive Action

Infrastructure Change Validation

Storage Monitoring

---

# Interview Questions

## Q1. What causes PVC Pending?

Answer

Missing StorageClass, unavailable PersistentVolume, insufficient storage, CSI driver failures, access mode mismatch or provisioning failures.

---

## Q2. Which command do you execute first?

Answer

```bash
kubectl get pvc -A
```

Followed by

```bash
kubectl describe pvc <pvc-name>
```

---

## Q3. What is the difference between PV and PVC?

Answer

A PersistentVolume is the storage resource, while a PersistentVolumeClaim is the request made by an application to use that storage.

---

## Q4. What is a StorageClass?

Answer

A StorageClass defines how Kubernetes dynamically provisions persistent storage using a CSI driver.

---

## Q5. How do you recover from storage failures?

Answer

Identify the storage provisioning issue, restore PV/PVC binding, verify CSI driver health, validate storage mounting and confirm application recovery.

---

# Assignment

Production PostgreSQL Pods remain Pending due to storage issues.

Prepare

- Investigation Plan
- Commands
- Evidence Collection
- Root Cause Analysis
- Recovery
- Validation
- Preventive Actions

---

# Assignment Solution

## Step 1

Check Pods.

```bash
kubectl get pods -A
```

---

## Step 2

Check PVC.

```bash
kubectl get pvc -A
```

---

## Step 3

Describe PVC.

```bash
kubectl describe pvc <pvc-name>
```

---

## Step 4

Verify

- PV
- StorageClass
- CSI Driver
- Events
- Node

---

## Step 5

Fix root cause.

---

## Step 6

Validate

- PVC Bound
- PV Bound
- Pod Running
- Database Healthy

---

## Step 7

Complete RCA.

---

# Production Best Practices

✔ Use Dynamic Provisioning

✔ Monitor PVC Status

✔ Monitor CSI Drivers

✔ Regular Storage Capacity Reviews

✔ Validate StorageClasses

✔ Test Backup and Restore

✔ Use Highly Available Storage

✔ Monitor Disk Utilization

✔ Alert on PVC Pending

✔ Maintain Storage Runbooks

---

# Runbook Checklist

□ Pod Checked

□ PVC Reviewed

□ PV Reviewed

□ StorageClass Verified

□ CSI Driver Healthy

□ Events Reviewed

□ Root Cause Confirmed

□ Recovery Completed

□ Validation Successful

□ RCA Completed

---

# Common Mistakes

❌ Ignoring PVC Events

❌ Deleting Bound PVs

❌ Incorrect AccessMode

❌ Missing StorageClass

❌ Ignoring CSI Driver Health

❌ Skipping Backup Validation

❌ Closing Incident Without Validation

❌ Skipping RCA

