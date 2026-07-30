# Kubernetes Interview Master Handbook

# Section 07 - Kubernetes Production Incidents & Troubleshooting

# Chapter 12 - etcd Failure Incidents

---

# Objective

Learn how to investigate, troubleshoot, recover and permanently prevent etcd failures in Kubernetes production environments.

etcd is the brain of Kubernetes. Every object in the cluster is stored inside etcd. A failure can impact the entire control plane.

---

# Interview Scenario

Time: 02:45 AM

PagerDuty Alert

"Kubernetes API Server Unavailable"

Impact

- kubectl commands timing out
- Deployments cannot be created
- Pods cannot be scheduled
- Cluster management unavailable

You are the on-call SRE.

Restore the Kubernetes control plane immediately.

---

# What is etcd?

etcd is a distributed key-value database used by Kubernetes to store the complete cluster state.

It stores

- Pods
- Nodes
- Deployments
- Secrets
- ConfigMaps
- Services
- RBAC
- PersistentVolumes
- Namespaces
- Leases

---

# Kubernetes Control Plane Flow

kubectl

↓

API Server

↓

etcd

↓

Cluster State

↓

Controller Manager

↓

Scheduler

↓

Worker Nodes

---

# Common Root Causes

etcd Process Stopped

Disk Full

Disk Latency

Corrupted Database

Certificate Expired

Network Partition

Quorum Lost

Member Failure

Filesystem Corruption

Memory Exhaustion

Storage Failure

Snapshot Restore Failure

---

# Step 1 - Verify API Server

```bash
kubectl cluster-info
```

If unreachable

Continue investigation.

---

# Step 2 - Verify Control Plane Pods

```bash
kubectl get pods -n kube-system
```

Look for

- etcd
- kube-apiserver
- kube-controller-manager
- kube-scheduler

---

# Step 3 - SSH into Control Plane

```bash
ssh master-01
```

---

# Step 4 - Verify etcd Process

```bash
sudo systemctl status etcd
```

Static Pod Clusters

```bash
crictl ps | grep etcd
```

---

# Step 5 - Verify etcd Logs

Systemd

```bash
journalctl -u etcd
```

Static Pod

```bash
crictl logs <container-id>
```

Look for

- corruption
- timeout
- certificate errors
- WAL errors
- quorum errors

---

# Step 6 - Verify Disk

```bash
df -h
```

Check

- Free Space
- Disk Usage

---

# Step 7 - Verify Memory

```bash
free -h
```

---

# Step 8 - Verify etcd Health

```bash
ETCDCTL_API=3 etcdctl endpoint health
```

Expected

```text
healthy
```

---

# Step 9 - Verify Cluster Members

```bash
ETCDCTL_API=3 etcdctl member list
```

Confirm

All members healthy.

---

# Step 10 - Verify Alarm Status

```bash
ETCDCTL_API=3 etcdctl alarm list
```

---

# Investigation Flow

API Server

↓

Control Plane

↓

etcd

↓

Logs

↓

Disk

↓

Memory

↓

Network

↓

Quorum

↓

Recovery

---

# Scenario 1

Disk Full

Logs

```text
database space exceeded
```

Resolution

Free disk space.

Compact database.

Defragment etcd.

---

# Scenario 2

Certificate Expired

Logs

```text
x509 certificate has expired
```

Resolution

Renew certificates.

Restart etcd.

---

# Scenario 3

Quorum Lost

Three-member cluster.

Two nodes unavailable.

Result

No leader.

Resolution

Recover failed members.

Restore quorum.

---

# Scenario 4

Corrupted Database

Logs

```text
wal corruption
```

Resolution

Restore from latest snapshot.

---

# Scenario 5

Network Partition

Members cannot communicate.

Resolution

Restore network connectivity.

---

# Scenario 6

Memory Exhaustion

OOMKilled.

Resolution

Increase memory.

Investigate memory usage.

---

# Production Incident

Issue

API Server unavailable.

Investigation

etcd logs

```text
mvcc: database space exceeded
```

Disk

100% Used.

Root Cause

Automatic backups filled the filesystem.

Resolution

Remove unnecessary files.

Compact etcd.

Defragment database.

Restart etcd.

API Server becomes healthy.

---

# Recovery Commands

Check Health

```bash
ETCDCTL_API=3 etcdctl endpoint health
```

---

Check Members

```bash
ETCDCTL_API=3 etcdctl member list
```

---

Compact Database

```bash
ETCDCTL_API=3 etcdctl compact <revision>
```

---

Defragment Database

```bash
ETCDCTL_API=3 etcdctl defrag
```

---

Take Snapshot

```bash
ETCDCTL_API=3 etcdctl snapshot save backup.db
```

---

Restore Snapshot

```bash
ETCDCTL_API=3 etcdctl snapshot restore backup.db
```

---

# Validation Checklist

API Server Healthy

etcd Healthy

Scheduler Running

Controller Manager Running

kubectl Working

Nodes Ready

Applications Healthy

---

# RCA Template

Incident

etcd Failure

Root Cause

Disk Full

Business Impact

Control Plane Unavailable

Detection

API Server Alert

Resolution

Freed Disk

Compacted Database

Restarted etcd

Preventive Action

Disk Monitoring

Scheduled Defragmentation

---

# Interview Questions

## Q1. What is etcd?

Answer

etcd is Kubernetes' distributed key-value database that stores the complete cluster state.

---

## Q2. Why is etcd critical?

Answer

Every Kubernetes object is stored in etcd. If etcd becomes unavailable, the control plane cannot function correctly.

---

## Q3. Which command verifies etcd health?

Answer

```bash
ETCDCTL_API=3 etcdctl endpoint health
```

---

## Q4. What causes etcd failures?

Answer

Disk exhaustion, certificate expiry, quorum loss, corruption, memory exhaustion, network partitions and storage failures.

---

## Q5. How do you recover etcd?

Answer

Identify the root cause, restore quorum if necessary, recover storage, restore from snapshot if required, validate API Server functionality and confirm cluster health.

---

# Assignment

The Kubernetes API Server is unavailable due to an etcd failure.

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

Verify API Server.

---

## Step 2

Verify etcd status.

---

## Step 3

Review

- Logs
- Disk
- Memory
- Members
- Health

---

## Step 4

Identify root cause.

---

## Step 5

Recover

- Free disk
- Restore quorum
- Restore snapshot if required

---

## Step 6

Validate

- API Server
- Scheduler
- Controller Manager
- kubectl
- Cluster Health

---

## Step 7

Complete RCA.

---

# Production Best Practices

✔ Deploy Multi-Member etcd Clusters

✔ Take Frequent Snapshots

✔ Test Snapshot Restoration

✔ Monitor Disk Usage

✔ Monitor Database Size

✔ Monitor etcd Latency

✔ Monitor Certificate Expiry

✔ Schedule Database Compaction

✔ Schedule Defragmentation

✔ Maintain etcd Recovery Runbooks

---

# Runbook Checklist

□ API Server Checked

□ etcd Healthy

□ Logs Reviewed

□ Disk Verified

□ Memory Verified

□ Members Healthy

□ Quorum Verified

□ Root Cause Confirmed

□ Recovery Completed

□ Validation Successful

□ RCA Completed

---

# Common Mistakes

❌ Running Single-Member etcd in Production

❌ Never Taking Snapshots

❌ Ignoring Disk Usage

❌ Ignoring Certificate Expiry

❌ Restoring Incorrect Snapshots

❌ Skipping Health Checks

❌ Closing Incident Without Validation

❌ Skipping RCA

