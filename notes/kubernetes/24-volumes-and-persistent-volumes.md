# Kubernetes Volumes and Persistent Volumes

# 1. Purpose

The purpose of Kubernetes Volumes is to preserve application data.

Containers are temporary.

If a container crashes or is recreated, its internal filesystem is lost.

Volumes provide persistent storage for applications.

---

# 2. Introduction

Imagine our Dashboard Service stores uploaded reports.

Without Persistent Storage

```
Dashboard Pod

↓

Upload File

↓

Pod Restart

↓

File Lost
```

With Persistent Volume

```
Dashboard Pod

↓

Persistent Volume

↓

File Stored

↓

Pod Restart

↓

File Still Available
```

---

# 3. Enterprise Usage

Persistent Storage is used by

- Databases
- Jenkins
- SonarQube
- Nexus Repository
- Prometheus
- Grafana
- Elasticsearch
- File Upload Applications

Stateless applications usually do not require Persistent Volumes.

---

# 4. Usage in THIS Project

```
Dashboard Pods

↓

Persistent Volume Claim

↓

Persistent Volume

↓

AWS EBS

----------------------------

Prometheus

↓

Persistent Volume

↓

Metrics Storage

----------------------------

Grafana

↓

Persistent Volume

↓

Dashboards
```

---

# 5. Architecture

```
                Dashboard Pod

                      │

                      ▼

          Persistent Volume Claim

                      │

                      ▼

             Persistent Volume

                      │

                      ▼

         AWS EBS / Azure Disk / NFS
```

---

# 6. Internal Workflow

```
Deployment

↓

PVC Created

↓

PVC Requests Storage

↓

PV Bound

↓

Pod Mounted

↓

Application Reads/Writes Data
```

---

# 7. Kubernetes Storage Components

## Volume

Temporary storage attached to a Pod.

Lost when Pod is removed.

---

## Persistent Volume (PV)

Actual storage resource.

Managed by Kubernetes.

---

## Persistent Volume Claim (PVC)

Storage request made by a Pod.

Pod never uses PV directly.

Flow

```
Pod

↓

PVC

↓

PV

↓

Storage
```

---

# 8. Why Persistent Volume?

Without PV

```
Database

↓

Pod Restart

↓

Database Lost
```

With PV

```
Database

↓

Persistent Volume

↓

Pod Restart

↓

Database Safe
```

---

# 9. Daily DevOps Activities

- Verify PV Status
- Verify PVC Status
- Check Storage Usage
- Expand Volumes
- Investigate Storage Issues
- Monitor Disk Capacity

---

# 10. Production Best Practices

- Use Dynamic Provisioning.
- Monitor Disk Usage.
- Take Regular Backups.
- Use SSD Storage for Databases.
- Never store production data inside containers.
- Enable Storage Monitoring.

---

# 11. Security

- Encrypt Storage.
- Restrict PVC Access.
- Enable Volume Backups.
- Use IAM Roles.
- Enable Snapshot Policies.

---

# 12. Troubleshooting

List PV

```bash
kubectl get pv
```

List PVC

```bash
kubectl get pvc
```

Describe PVC

```bash
kubectl describe pvc
```

Describe PV

```bash
kubectl describe pv
```

---

# 13. Real Production Scenarios

## Scenario 1

### Database Lost After Restart

Symptoms

Database restarted.

All data disappeared.

Root Cause

Database stored data inside container filesystem.

Resolution

Move database storage to Persistent Volume.

---

## Scenario 2

### PVC Pending

Symptoms

```
PVC

Pending
```

Investigation

```bash
kubectl get pvc

kubectl describe pvc
```

Possible Reasons

- No StorageClass
- No Available PV
- Incorrect Storage Size

---

## Scenario 3

### Disk Full

Prometheus stopped collecting metrics.

Reason

Persistent Volume reached 100%.

Resolution

- Expand Storage
- Delete Old Data
- Configure Retention Policy

---

# 14. Scenario Interview Questions

Q1. Why do we need Persistent Volumes?

Answer

To preserve application data after Pod restart or recreation.

---

Q2. What is the difference between PV and PVC?

Answer

PV is the actual storage.

PVC is the request for storage made by a Pod.

---

Q3. Can Pods directly use a PV?

Answer

No.

Pods use PVC, and PVC binds to a PV.

---

Q4. Which applications require Persistent Storage?

Answer

Databases, Jenkins, Prometheus, Grafana, Nexus, Elasticsearch and similar stateful applications.

---

# 15. Architecture Interview Questions

Explain the storage flow.

```
Pod

↓

PVC

↓

PV

↓

Cloud Storage
```

---

Q2.

What happens if a Pod is recreated?

Answer

The Pod mounts the same PVC again, so the data remains available.

---

# 16. Production Support Interview Questions

Production Investigation Flow

```
Application Data Missing

↓

Check PVC

↓

PVC Bound?

↓

Check PV

↓

Storage Full?

↓

Events

↓

Logs

↓

Resolved
```

Manager Question

"Our Jenkins server lost all build history after restart."

Expected Answer

- Verify Persistent Volume
- Verify PVC
- Check Volume Mount
- Check StorageClass
- Restore Backup if required

---

# 17. Related Runbooks

- pvc-pending.md
- storage-full.md
- persistent-volume-lost.md

---

# 18. Common Incidents

- PVC Pending
- PV Not Bound
- Disk Full
- Volume Mount Failure
- Data Loss

---

# 19. Commands

```bash
kubectl get pv

kubectl get pvc

kubectl describe pvc

kubectl describe pv

kubectl get storageclass
```

---

# 20. Marathi Quick Revision

- Volume म्हणजे Storage.
- PV म्हणजे Actual Storage.
- PVC म्हणजे Storage Request.
- Pod थेट PV वापरत नाही.
- Database साठी नेहमी Persistent Volume वापरतात.

---

# 21. Marathi Summary (5+ Years Experience Revision)

## Interview Summary

Persistent Volume Kubernetes मध्ये Data सुरक्षित ठेवण्यासाठी वापरतात.

Pod Delete किंवा Restart झाला तरी Data सुरक्षित राहतो.

PVC हा Pod आणि PV यांच्यामधला Bridge आहे.

## Production Investigation Flow

```
Application Data Missing

↓

PVC

↓

PV

↓

StorageClass

↓

Events

↓

Logs

↓

Resolved
```

## Production Story

Production Jenkins Server Restart झाला.

सर्व Build History गायब झाली.

Investigation मध्ये Jenkins Container ला Persistent Volume Mount केलेला नव्हता.

PVC Configure करून आणि Backup Restore केल्यानंतर सर्व Build History परत आली.

## Memory Trick

**Pod → PVC → PV → Storage**

Remember

**PVC Requests**

**PV Provides**

