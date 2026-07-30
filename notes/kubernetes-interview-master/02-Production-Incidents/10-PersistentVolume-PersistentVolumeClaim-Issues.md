# Kubernetes Interview Master Handbook

# Production Incident 10 - PersistentVolume & PersistentVolumeClaim Issues

---

# Incident

Deployment created successfully.

Pod remains

Pending

Reason

PersistentVolumeClaim is Pending.

Application cannot start.

---

# What is PersistentVolume (PV)?

## English

PersistentVolume (PV) is a storage resource in the Kubernetes cluster.

It exists independently of Pods.

It provides persistent storage even if Pods are deleted.

---

## मराठी

PersistentVolume म्हणजे Kubernetes Cluster मधील Storage Resource.

Pod delete झाला तरी Data सुरक्षित राहतो.

---

# What is PersistentVolumeClaim (PVC)?

## English

PersistentVolumeClaim (PVC) is a request for storage made by a Pod.

The PVC is matched with a suitable PV.

---

## मराठी

PersistentVolumeClaim म्हणजे Pod कडून Storage ची मागणी.

PVC ला योग्य PersistentVolume मिळाल्यावर Pod सुरू होतो.

---

# Storage Flow

Application

↓

Deployment

↓

PersistentVolumeClaim

↓

StorageClass

↓

PersistentVolume

↓

Disk

↓

Application Starts

---

# Common Reasons for PVC Pending

No PersistentVolume Available

StorageClass Missing

Wrong StorageClass

Insufficient Storage

Access Mode Mismatch

Dynamic Provisioner Failure

Cloud Storage Error

---

# Step 1

Check Pods

kubectl get pods

Status

Pending

---

# Step 2

Check PVC

kubectl get pvc

Example

NAME

frontend-data

STATUS

Pending

---

# Step 3

Describe PVC

kubectl describe pvc frontend-data

Look for

Events

StorageClass

Requested Size

Access Mode

---

# Step 4

Check PV

kubectl get pv

Verify

STATUS

Available

Bound

Released

Failed

---

# Step 5

Check StorageClass

kubectl get storageclass

Verify

Default StorageClass

Provisioner

---

# Step 6

Describe StorageClass

kubectl describe storageclass standard

Check

Provisioner

Parameters

AllowVolumeExpansion

---

# Step 7

Verify Access Modes

ReadWriteOnce (RWO)

Single Node Read/Write

---

ReadOnlyMany (ROX)

Multiple Nodes Read Only

---

ReadWriteMany (RWX)

Multiple Nodes Read/Write

---

# Troubleshooting Flow

Pod Pending

↓

PVC Pending

↓

Describe PVC

↓

Check Events

↓

StorageClass Exists?

↓

PV Available?

↓

Access Mode Match?

↓

Storage Capacity Available?

↓

PVC Bound

↓

Pod Running

---

# Production Incident

Developer requested

100Gi Storage

Available PV

50Gi

PVC

Pending

Reason

Requested size larger than available storage.

Resolution

Create larger PV

OR

Reduce requested storage.

---

# Another Incident

StorageClass

fast-ssd

Deployment requested

premium-ssd

PVC never bound.

Reason

StorageClass name mismatch.

Resolution

Correct StorageClass name.

---

# Dynamic Provisioning

Modern clusters create PV automatically.

Flow

PVC

↓

StorageClass

↓

Provisioner

↓

Cloud Disk

↓

PV Created

↓

PVC Bound

↓

Pod Starts

---

# Best Practices

Always use StorageClass.

Use Dynamic Provisioning.

Monitor storage utilization.

Enable volume expansion.

Backup Persistent Volumes.

Document storage requirements.

---

# Useful Commands

kubectl get pvc

---

kubectl describe pvc PVC_NAME

---

kubectl get pv

---

kubectl describe pv PV_NAME

---

kubectl get storageclass

---

kubectl describe storageclass STORAGECLASS_NAME

---

# Interview Questions

Q1

Difference between PV and PVC?

Answer

PV is the actual storage resource.

PVC is a request for storage.

---

Q2

Why does a PVC remain Pending?

Answer

No matching PV

Wrong StorageClass

Insufficient storage

Provisioner failure

Access mode mismatch

---

Q3

Which command do you use first?

Answer

kubectl get pvc

Then

kubectl describe pvc PVC_NAME

---

Q4

What is Dynamic Provisioning?

Answer

Kubernetes automatically creates a PersistentVolume using the configured StorageClass.

---

Q5

Difference between RWO and RWX?

Answer

RWO allows one node to mount the volume for read/write.

RWX allows multiple nodes to mount the volume for read/write.

---

# Scenario Based Interview

Question

Pod is Pending.

PVC is Pending.

How will you troubleshoot?

Answer

1. Check PVC status.

2. Describe PVC.

3. Verify StorageClass.

4. Verify PV availability.

5. Verify requested storage size.

6. Verify access modes.

7. Check provisioner logs if dynamic provisioning is used.

---

Question

Application restarted but data still exists.

Why?

Answer

Because the data is stored on a PersistentVolume, which exists independently of the Pod.

---

# Production Troubleshooting Checklist

✔ kubectl get pods

✔ kubectl get pvc

✔ kubectl describe pvc

✔ kubectl get pv

✔ kubectl describe pv

✔ kubectl get storageclass

✔ kubectl describe storageclass

✔ Verify Access Modes

✔ Verify Requested Storage

✔ Verify StorageClass

---

# Senior Engineer Notes

Never store production data inside the container filesystem.

Use PersistentVolumes for databases and stateful applications.

Prefer Dynamic Provisioning with StorageClasses.

Monitor storage capacity and volume health regularly.

Always test backup and restore procedures before production rollout.

