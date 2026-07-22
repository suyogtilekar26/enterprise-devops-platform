# Kubernetes StorageClass

# 1. Purpose

The purpose of a StorageClass is to automatically provision Persistent Volumes when a Persistent Volume Claim (PVC) is created.

Without StorageClass, administrators must manually create Persistent Volumes.

StorageClass enables Dynamic Provisioning of storage.

---

# 2. Introduction

Suppose our Dashboard application needs 20 GB of storage.

Without StorageClass

```
Administrator

↓

Create PV Manually

↓

Create PVC

↓

Bind PVC

↓

Pod Starts
```

With StorageClass

```
Create PVC

↓

StorageClass

↓

Automatically Creates PV

↓

Pod Starts
```

This reduces manual work and speeds up deployments.

---

# 3. Enterprise Usage

StorageClass is used in almost every Production Kubernetes Cluster.

Examples

- AWS EBS
- Azure Managed Disk
- Google Persistent Disk
- NetApp
- Ceph
- NFS
- VMware vSphere CSI

Enterprise clusters rarely create Persistent Volumes manually.

---

# 4. Usage in THIS Project

```
Dashboard Deployment

↓

Persistent Volume Claim

↓

StorageClass

↓

AWS EBS CSI Driver

↓

Amazon EBS Volume

----------------------------

Prometheus

↓

PVC

↓

StorageClass

↓

AWS EBS SSD
```

Every stateful application in our Enterprise DevOps Platform will use StorageClass with Dynamic Provisioning.

---

# 5. Architecture

```
             Dashboard Pod

                    │

                    ▼

                  PVC

                    │

                    ▼

             StorageClass

                    │

                    ▼

           CSI Provisioner

                    │

                    ▼

            AWS EBS Volume

                    │

                    ▼

                  Mounted
```

---

# 6. Internal Workflow

```
Developer Creates PVC

↓

PVC References StorageClass

↓

StorageClass Calls CSI Driver

↓

Cloud Disk Created

↓

Persistent Volume Created

↓

PVC Bound

↓

Pod Mounted
```

---

# 7. Static vs Dynamic Provisioning

## Static Provisioning

```
Admin

↓

Create PV

↓

Create PVC

↓

Bind

↓

Pod
```

Manual process.

---

## Dynamic Provisioning

```
PVC

↓

StorageClass

↓

Automatic PV

↓

Pod
```

Recommended for Production.

---

# 8. Why StorageClass?

Without StorageClass

- Manual PV Creation
- Slower Deployment
- Human Errors
- Difficult Scaling

With StorageClass

- Automatic Storage
- Faster Deployment
- Easy Scaling
- Cloud Integration

---

# 9. Daily DevOps Activities

- Verify StorageClasses
- Monitor PVC Binding
- Expand Volumes
- Monitor Storage Usage
- Validate CSI Driver
- Troubleshoot Provisioning Failures

---

# 10. Production Best Practices

- Use Dynamic Provisioning.
- Use SSD Storage for Databases.
- Define Default StorageClass.
- Monitor Disk Consumption.
- Use CSI Drivers supported by the cloud provider.
- Enable Snapshots and Backups.

---

# 11. Security

- Encrypt Cloud Volumes.
- Restrict Storage Access.
- Enable IAM Policies.
- Use Encrypted StorageClasses.
- Monitor Storage Events.

---

# 12. Troubleshooting

List StorageClasses

```bash
kubectl get storageclass
```

Describe StorageClass

```bash
kubectl describe storageclass
```

List PVC

```bash
kubectl get pvc
```

Describe PVC

```bash
kubectl describe pvc
```

Check CSI Pods

```bash
kubectl get pods -A | grep csi
```

---

# 13. Real Production Scenarios

## Scenario 1

### PVC Stuck in Pending

Symptoms

```
PVC

Pending
```

Investigation

```bash
kubectl describe pvc
```

Root Cause

StorageClass name was incorrect.

Resolution

Update PVC with the correct StorageClass.

---

## Scenario 2

### CSI Driver Not Running

PVC could not create storage.

Investigation

```bash
kubectl get pods -A | grep csi
```

Root Cause

AWS EBS CSI Driver was unavailable.

Resolution

Restart CSI components.

---

## Scenario 3

### Wrong Storage Type

Production database was provisioned on HDD instead of SSD.

Result

High database latency.

Resolution

Update StorageClass to use SSD-backed storage.

---

# 14. Scenario Interview Questions

Q1. What is a StorageClass?

Answer

A StorageClass defines how Kubernetes dynamically provisions storage for Persistent Volume Claims.

---

Q2. Why do we use StorageClass?

Answer

To automatically create Persistent Volumes without manual administrator intervention.

---

Q3. What is Dynamic Provisioning?

Answer

Automatic creation of storage when a PVC is created.

---

Q4. Does a Pod directly use a StorageClass?

Answer

No.

The Pod uses a PVC, which references a StorageClass.

---

# 15. Architecture Interview Questions

Explain the complete storage flow.

```
Pod

↓

PVC

↓

StorageClass

↓

CSI Driver

↓

Cloud Disk

↓

Persistent Volume
```

---

Q2.

What is the role of a CSI Driver?

Answer

The CSI (Container Storage Interface) Driver communicates with the cloud storage provider to create, attach and manage storage volumes.

---

# 16. Production Support Interview Questions

Production Investigation Flow

```
Application Waiting

↓

PVC Pending

↓

StorageClass

↓

CSI Driver

↓

Cloud Storage

↓

PV Created

↓

Pod Running
```

Manager Question

"Our application Pods are not starting because storage is unavailable."

Expected Answer

- Check PVC Status
- Verify StorageClass
- Verify CSI Driver
- Check Cloud Disk Creation
- Verify PV Binding
- Restart Failed Components if required

---

# 17. Related Runbooks

- pvc-pending.md
- storageclass-not-found.md
- csi-driver-failure.md

---

# 18. Common Incidents

- StorageClass Not Found
- PVC Pending
- CSI Driver Failure
- Volume Provisioning Failure
- Incorrect Storage Type

---

# 19. Commands

```bash
kubectl get storageclass

kubectl describe storageclass

kubectl get pvc

kubectl describe pvc

kubectl get pv

kubectl get pods -A | grep csi
```

---

# 20. Marathi Quick Revision

- StorageClass म्हणजे Automatic Storage Provisioning.
- PVC तयार झाल्यावर StorageClass आपोआप PV तयार करतो.
- Production मध्ये Dynamic Provisioning वापरतात.
- CSI Driver Cloud Storage तयार करतो.
- Manual PV तयार करण्याची गरज राहत नाही.

---

# 21. Marathi Summary (5+ Years Experience Revision)

## Interview Summary

StorageClass Kubernetes मध्ये Dynamic Storage Provisioning साठी वापरला जातो.

PVC तयार झाल्यावर StorageClass CSI Driver वापरून Cloud मध्ये Disk तयार करतो आणि त्याला PV म्हणून Bind करतो.

## Production Investigation Flow

```
Pod Pending

↓

PVC

↓

StorageClass

↓

CSI Driver

↓

Cloud Volume

↓

PV

↓

Resolved
```

## Production Story

Production मध्ये Prometheus Pods Pending मध्ये होते.

PVC सतत Pending होता.

Investigation मध्ये StorageClass चे नाव चुकीचे असल्यामुळे CSI Driver Volume तयार करत नव्हता.

योग्य StorageClass वापरल्यानंतर PV तयार झाला आणि Pods Running झाले.

## Memory Trick

**Pod → PVC → StorageClass → CSI → PV → Storage**

Remember

**PVC Requests**

**StorageClass Creates**

**PV Provides**

