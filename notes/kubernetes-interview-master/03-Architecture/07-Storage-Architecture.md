# Kubernetes Interview Master Handbook

# Architecture 07 - Storage Architecture

---

# What is Kubernetes Storage?

## English

Kubernetes Storage provides persistent data storage for applications.

Unlike container filesystems, Persistent Volumes survive Pod restarts and recreation.

---

## मराठी

Kubernetes Storage मुळे Application चा Data Pod delete किंवा recreate झाल्यानंतरही सुरक्षित राहतो.

---

# Storage Architecture

Application

↓

Pod

↓

PersistentVolumeClaim (PVC)

↓

StorageClass

↓

CSI Driver

↓

PersistentVolume (PV)

↓

Physical Storage

↓

Disk

---

# Storage Components

1. PersistentVolume (PV)

2. PersistentVolumeClaim (PVC)

3. StorageClass

4. CSI Driver

5. Physical Storage

---

# PersistentVolume (PV)

Purpose

Represents actual storage inside the cluster.

Characteristics

Independent from Pods

Reusable

Persistent

Can be static or dynamically created.

---

# PersistentVolumeClaim (PVC)

Purpose

A request for storage.

Applications never directly use PV.

They request storage through PVC.

---

# StorageClass

Purpose

Defines how storage should be provisioned.

Contains

Provisioner

Parameters

Reclaim Policy

Volume Expansion

Binding Mode

---

# CSI

Container Storage Interface.

Purpose

Provides a standard interface between Kubernetes and storage providers.

Examples

AWS EBS CSI

Azure Disk CSI

Azure File CSI

GCE Persistent Disk CSI

Ceph CSI

NFS CSI

VMware vSphere CSI

---

# Dynamic Provisioning

Application

↓

PVC Created

↓

StorageClass

↓

CSI Driver

↓

Disk Created Automatically

↓

PV Created

↓

PVC Bound

↓

Pod Starts

---

# Static Provisioning

Administrator creates PV manually.

↓

Application creates PVC.

↓

PVC binds to existing PV.

---

# Volume Binding Modes

Immediate

↓

PV created immediately.

---

WaitForFirstConsumer

↓

Volume created only after the Pod is scheduled.

Useful for topology-aware storage.

---

# Access Modes

ReadWriteOnce (RWO)

Mounted as read/write by one node.

Common for block storage.

---

ReadOnlyMany (ROX)

Mounted read-only by multiple nodes.

---

ReadWriteMany (RWX)

Mounted read/write by multiple nodes.

Common for shared file storage.

---

# Reclaim Policies

Retain

Storage remains after PVC deletion.

Administrator cleans manually.

---

Delete

Underlying storage is deleted automatically.

---

Recycle

Deprecated.

---

# Volume Expansion

Supported by many CSI drivers.

PVC Size Increased

↓

StorageClass Allows Expansion

↓

Disk Expanded

↓

Filesystem Resized

↓

Application Continues Running

---

# Storage Flow

Developer

↓

Deployment

↓

PVC

↓

StorageClass

↓

CSI Driver

↓

PV

↓

Disk

↓

Pod Running

---

# Common Storage Problems

PVC Pending

No StorageClass

Wrong StorageClass

Access Mode Mismatch

Insufficient Capacity

CSI Driver Failure

Volume Mount Failure

Disk Attachment Failure

Filesystem Resize Failure

---

# Troubleshooting Flow

Pod Pending

↓

PVC

↓

PV

↓

StorageClass

↓

CSI Driver

↓

Disk

↓

Volume Mounted

↓

Application Running

---

# Production Incident

Developer requested

200Gi

Available Storage

100Gi

PVC remained Pending.

Resolution

Increase available storage

OR

Reduce requested size.

---

# Another Incident

StorageClass configured with

WaitForFirstConsumer

PVC remained Pending until Pod scheduling completed.

This is expected behavior.

---

# Best Practices

Always use StorageClass.

Prefer Dynamic Provisioning.

Use CSI drivers supported by your platform.

Monitor storage usage.

Enable volume expansion where supported.

Take regular backups.

Choose reclaim policies carefully.

---

# Useful Commands

kubectl get pv

---

kubectl get pvc

---

kubectl describe pvc PVC_NAME

---

kubectl describe pv PV_NAME

---

kubectl get storageclass

---

kubectl describe storageclass STORAGECLASS_NAME

---

kubectl get csidriver

---

# Interview Questions

Q1

Difference between PV and PVC?

Answer

PV is the actual storage resource.

PVC is a request for storage.

---

Q2

What is StorageClass?

Answer

StorageClass defines how Kubernetes dynamically provisions storage.

---

Q3

What is CSI?

Answer

CSI is the standard interface used by Kubernetes to communicate with storage providers.

---

Q4

Difference between Static and Dynamic Provisioning?

Answer

Static Provisioning uses manually created PVs.

Dynamic Provisioning automatically creates storage using a StorageClass and CSI driver.

---

Q5

What is WaitForFirstConsumer?

Answer

The storage volume is created only after the Pod has been scheduled to an appropriate node.

---

# Scenario Based Interview

Question

PVC is Pending.

How will you troubleshoot?

Answer

1. Check PVC.

2. Verify StorageClass.

3. Verify PV availability.

4. Verify CSI Driver.

5. Check Events.

6. Verify requested capacity.

---

Question

Volume failed to mount after scheduling.

What will you check?

Answer

1. CSI Driver.

2. Node Logs.

3. Storage Provider.

4. Volume Attachment.

5. Kubernetes Events.

---

# Production Troubleshooting Checklist

✔ PV

✔ PVC

✔ StorageClass

✔ CSI Driver

✔ Access Mode

✔ Capacity

✔ Reclaim Policy

✔ Volume Binding Mode

✔ Events

✔ Node Logs

---

# Senior Engineer Notes

Always remember the storage workflow:

Application

↓

PVC

↓

StorageClass

↓

CSI Driver

↓

PV

↓

Physical Disk

↓

Mounted Volume

↓

Running Application

Never mount production data directly inside a container filesystem.

Always use Persistent Volumes with an appropriate StorageClass and CSI driver.

