# Kubernetes Interview Master Handbook

# Production Lab 04 - StatefulSet and Persistent Storage

---

# Objective

Deploy a production database using StatefulSet.

Topics

StatefulSet

Headless Service

PersistentVolume

PersistentVolumeClaim

StorageClass

Stable Identity

Ordered Deployment

Ordered Scaling

Ordered Termination

---

# Production Scenario

A company needs to deploy MySQL in Kubernetes.

Requirements

Persistent storage

Stable hostname

Stable network identity

Ordered startup

Ordered shutdown

Data must survive Pod recreation.

---

# Architecture

Application

↓

ClusterIP Service

↓

MySQL StatefulSet

↓

PersistentVolumeClaim

↓

StorageClass

↓

PersistentVolume

↓

Disk

---

# Why StatefulSet?

Deployment

Random Pod Names

No Stable Storage

---

StatefulSet

Stable Pod Names

Stable Network Identity

Persistent Storage

Ordered Operations

---

# StatefulSet Identity

mysql-0

↓

mysql-1

↓

mysql-2

Hostnames never change.

---

# Headless Service

Purpose

Provides direct DNS records for every Pod.

Example

mysql-0.mysql.default.svc.cluster.local

mysql-1.mysql.default.svc.cluster.local

---

# Storage Flow

Application

↓

PVC

↓

StorageClass

↓

PV

↓

Disk

↓

Data

---

# Step 1

Create Namespace

kubectl create namespace database

---

Verify

kubectl get ns

---

# Step 2

Create StorageClass

kubectl apply -f storageclass.yaml

---

Verify

kubectl get storageclass

---

# Step 3

Create Headless Service

kubectl apply -f headless-service.yaml

---

Verify

kubectl get svc

---

# Step 4

Deploy StatefulSet

kubectl apply -f statefulset.yaml

---

Verify

kubectl get statefulsets

kubectl get pods

---

# Step 5

Verify PVC

kubectl get pvc

---

Verify PV

kubectl get pv

---

# Ordered Startup

mysql-0

↓

Running

↓

mysql-1

↓

Running

↓

mysql-2

↓

Running

---

# Ordered Scale Up

Replicas

3

↓

Scale

5

↓

mysql-3

↓

mysql-4

---

# Ordered Scale Down

Replicas

5

↓

Scale

3

↓

mysql-4 Deleted

↓

mysql-3 Deleted

---

# Pod Recreation

mysql-0 Deleted

↓

New mysql-0 Created

↓

Same PVC Attached

↓

Data Preserved

---

# Common Problems

PVC Pending

StorageClass Missing

Volume Mount Failure

Pod Pending

Disk Full

Permission Errors

Wrong Access Mode

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

Events

↓

Node

↓

Application

---

# Production Incident

Database Pod restarted.

Application data remained available.

Reason

PVC reattached automatically.

---

# Another Incident

StatefulSet Pod remained Pending.

Reason

StorageClass did not exist.

Resolution

Create StorageClass.

Recreate PVC.

---

# Best Practices

Always use StatefulSet for databases.

Use Headless Service.

Use PersistentVolumeClaims.

Enable backups.

Test restore procedures.

Monitor storage utilization.

Avoid local storage in production.

---

# Useful Commands

kubectl get statefulsets

---

kubectl describe statefulset mysql

---

kubectl get pvc

---

kubectl get pv

---

kubectl describe pvc

---

kubectl describe pv

---

kubectl get storageclass

---

kubectl get pods -o wide

---

# Interview Questions

Q1

Why should databases use StatefulSet instead of Deployment?

Answer

StatefulSet provides stable identities, ordered deployment and persistent storage required for databases.

---

Q2

What is a Headless Service?

Answer

A Service without a ClusterIP that provides direct DNS records for each StatefulSet Pod.

---

Q3

What happens if mysql-0 is deleted?

Answer

Kubernetes recreates mysql-0 and reattaches the same PersistentVolumeClaim, preserving data.

---

Q4

Why is ordered startup important?

Answer

Many distributed databases require primary nodes to start before replica nodes.

---

Q5

Can a Deployment provide stable Pod identities?

Answer

No.

Deployments create replaceable Pods with changing names.

---

# Scenario Based Interview

Question

A StatefulSet Pod is Pending.

PVC status is Pending.

How will you troubleshoot?

Answer

1. Check PVC.

2. Verify StorageClass.

3. Check PV availability.

4. Review Events.

5. Verify CSI Driver.

---

Question

Database Pod restarted after a Node failure.

Will data be lost?

Answer

No, provided the PersistentVolume is healthy and the PersistentVolumeClaim is reattached successfully.

---

# Production Checklist

✔ StatefulSet

✔ Headless Service

✔ PVC

✔ PV

✔ StorageClass

✔ Ordered Startup

✔ Ordered Shutdown

✔ Persistent Data

✔ Backups

✔ Restore Testing

---

# Assignment

Deploy a MySQL StatefulSet with

3 replicas.

Verify

Stable Pod Names

PVC Creation

Persistent Storage

Delete mysql-0.

Verify

Pod recreation

Same PVC

Data remains available.

