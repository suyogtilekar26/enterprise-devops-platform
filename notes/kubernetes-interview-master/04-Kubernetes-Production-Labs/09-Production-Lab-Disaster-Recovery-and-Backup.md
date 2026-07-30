# Kubernetes Interview Master Handbook

# Production Lab 09 - Disaster Recovery and Backup

---

# Objective

Learn how to protect and recover a Kubernetes cluster from failures.

Topics

Disaster Recovery

etcd Backup

etcd Restore

Velero

Persistent Volume Backup

Snapshots

RPO

RTO

Recovery Validation

---

# Production Scenario

A production Kubernetes cluster crashes due to storage failure.

Requirements

Restore cluster quickly.

Recover application data.

Minimize downtime.

Prevent data loss.

---

# Architecture

Applications

↓

Persistent Volumes

↓

CSI Snapshot

↓

Backup Storage

↓

Velero

↓

Object Storage

↓

Recovery Cluster

---

# Disaster Recovery Flow

Production Cluster

↓

Scheduled Backup

↓

Object Storage

↓

Disaster Occurs

↓

Restore

↓

Applications Running

---

# RPO

Recovery Point Objective

Maximum acceptable data loss.

Example

Backup every

30 Minutes

Maximum data loss

30 Minutes

---

# RTO

Recovery Time Objective

Maximum acceptable recovery time.

Example

Restore within

15 Minutes

Production available again.

---

# Step 1

Verify etcd

kubectl get pods -n kube-system

---

Locate etcd

kubectl get pods -n kube-system | grep etcd

---

# Step 2

Take etcd Backup

ETCDCTL_API=3 etcdctl snapshot save backup.db

---

Verify Backup

ETCDCTL_API=3 etcdctl snapshot status backup.db

---

# Step 3

Restore etcd

ETCDCTL_API=3 etcdctl snapshot restore backup.db

---

Verify

Cluster starts successfully.

---

# Step 4

Install Velero

helm install velero \
velero \
-n velero

---

Verify

kubectl get pods -n velero

---

# Step 5

Backup Namespace

velero backup create production-backup \
--include-namespaces production

---

Verify

velero backup get

---

Describe Backup

velero backup describe production-backup

---

# Step 6

Restore Namespace

velero restore create \
--from-backup production-backup

---

Verify

kubectl get all -n production

---

# Step 7

Persistent Volume Snapshot

Create

VolumeSnapshot

↓

Storage Snapshot

↓

Restore

↓

PVC

↓

Pod

---

# Backup Flow

Application

↓

PVC

↓

CSI Snapshot

↓

Object Storage

↓

Velero Metadata

↓

Restore

---

# Recovery Validation

Pods Running

↓

PVC Bound

↓

Services Available

↓

Ingress Working

↓

Application Healthy

---

# Common Problems

Backup Failed

Restore Failed

Snapshot Missing

Object Storage Unreachable

PVC Pending

Version Mismatch

Permissions Missing

---

# Troubleshooting Flow

Restore Failed

↓

Velero Logs

↓

Backup Status

↓

PVC

↓

StorageClass

↓

Events

↓

Application Logs

---

# Production Incident

Control Plane storage failed.

Latest etcd snapshot restored.

Applications recovered successfully.

Downtime

12 Minutes

---

# Another Incident

Namespace restore completed.

Application failed.

Reason

Persistent Volume snapshot missing.

Resolution

Restore PVC snapshot.

Restart application.

---

# Best Practices

Schedule automatic backups.

Store backups off-cluster.

Encrypt backups.

Test restore regularly.

Document DR procedures.

Monitor backup jobs.

Verify backup integrity.

Keep multiple restore points.

---

# Useful Commands

velero backup get

---

velero backup describe BACKUP_NAME

---

velero restore get

---

velero restore describe RESTORE_NAME

---

kubectl get volumesnapshots

---

kubectl get pvc

---

kubectl get pv

---

ETCDCTL_API=3 etcdctl snapshot status backup.db

---

# Interview Questions

Q1

Why is etcd backup important?

Answer

etcd stores the Kubernetes cluster state. Without it, the control plane configuration cannot be recovered.

---

Q2

What is Velero?

Answer

Velero is a Kubernetes backup and disaster recovery tool used to back up cluster resources and persistent volumes.

---

Q3

Difference between RPO and RTO?

Answer

RPO defines the maximum acceptable data loss.

RTO defines the maximum acceptable recovery time.

---

Q4

Can Velero back up Persistent Volumes?

Answer

Yes.

With supported CSI snapshot providers or file-system backups.

---

Q5

How often should disaster recovery be tested?

Answer

Regularly through scheduled recovery drills to verify backup integrity and recovery procedures.

---

# Scenario Based Interview

Question

The cluster is unavailable after a control plane failure.

How will you recover it?

Answer

1. Restore etcd from the latest snapshot.

2. Verify control plane components.

3. Validate Nodes.

4. Verify workloads.

5. Validate applications.

---

Question

Namespace restored successfully but data is missing.

Answer

1. Verify PVC.

2. Verify VolumeSnapshot.

3. Check StorageClass.

4. Restore persistent storage.

5. Validate application data.

---

# Production Checklist

✔ etcd Backup

✔ etcd Restore

✔ Velero

✔ VolumeSnapshot

✔ Object Storage

✔ RPO

✔ RTO

✔ Recovery Testing

✔ Backup Validation

✔ DR Runbook

---

# Assignment

Create

1 etcd backup

1 Velero backup

1 Namespace backup

Restore

Namespace

Persistent Volume

Validate

Application

Data

Ingress

Document the complete disaster recovery process including RPO and RTO objectives.

