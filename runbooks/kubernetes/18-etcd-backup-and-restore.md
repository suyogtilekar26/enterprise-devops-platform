# Kubernetes Runbook 18 - etcd Backup and Restore

# 1. Purpose

This runbook explains how to safely back up and restore etcd in a Kubernetes production cluster.

etcd is the primary datastore for Kubernetes. Every Kubernetes object—including Pods, Deployments, Services, Secrets, ConfigMaps, RBAC, Nodes, and Custom Resources—is stored in etcd.

A corrupted or unavailable etcd can result in complete control plane failure. This runbook provides enterprise procedures for protecting, restoring, and validating etcd while minimizing production downtime.

---

# 2. Scope

Applicable to

- kubeadm Clusters
- On-Prem Kubernetes
- Self-Managed Control Plane
- HA etcd Clusters
- Single Control Plane Clusters
- Disaster Recovery

Supported Platforms

- kubeadm
- Kind (Learning)
- Bare Metal
- VMware
- OpenShift
- Rancher

Note

Managed Kubernetes services like EKS, AKS and GKE manage etcd internally. Administrators normally cannot perform direct etcd backup or restore.

---

# 3. Symptoms

Administrators may observe

- API Server unavailable
- Cluster state missing
- Deployments disappeared
- Secrets unavailable
- ConfigMaps missing
- kubectl timeout
- etcd unhealthy

Monitoring may report

- etcd leader election failures
- High etcd latency
- Disk latency
- Quorum failures

---

# 4. Business Impact

Critical

- Complete cluster outage
- No deployments
- No scaling
- No scheduling
- Configuration unavailable

Medium

- Control plane instability

Low

- Development cluster affected

---

# 5. Possible Root Causes

- Disk corruption
- Accidental deletion
- Failed cluster upgrade
- Storage failure
- etcd database corruption
- Snapshot failure
- Certificate expiration
- Human error
- Filesystem corruption

---

# 6. Prerequisites

Required

- Root access
- Control Plane access
- etcdctl
- Backup storage
- Cluster administrator privileges

Verify

```bash
etcdctl version

kubectl cluster-info
```

---

# 7. Initial Investigation

## Step 1

Verify API Server

```bash
kubectl cluster-info
```

---

## Step 2

Verify etcd Container

```bash
sudo crictl ps | grep etcd
```

---

## Step 3

Verify etcd Health

```bash
export ETCDCTL_API=3

etcdctl endpoint health \
--endpoints=https://127.0.0.1:2379 \
--cacert=/etc/kubernetes/pki/etcd/ca.crt \
--cert=/etc/kubernetes/pki/etcd/server.crt \
--key=/etc/kubernetes/pki/etcd/server.key
```

Expected

```
healthy
```

---

# 8. Detailed Investigation

## Step 1

Review etcd Logs

```bash
sudo crictl logs <etcd-container-id>
```

Look for

- Database corruption
- Disk failure
- Certificate errors
- Leader election failures

---

## Step 2

Verify Disk

```bash
df -h

iostat

lsblk
```

---

## Step 3

Verify Certificates

```bash
sudo kubeadm certs check-expiration
```

---

## Step 4

Check Snapshot Availability

Example

```bash
ls -lh /backup/etcd/
```

---

## Step 5

Verify Snapshot Status

```bash
export ETCDCTL_API=3

etcdctl snapshot status backup.db \
--write-out=table
```

Expected

- Revision
- Total Keys
- Size

---

## Step 6

Review Recent Changes

Investigate

- Cluster upgrade
- OS patching
- Disk replacement
- Certificate renewal
- Maintenance activity

---

# 9. Resolution Steps

## Create Backup

```bash
export ETCDCTL_API=3

etcdctl snapshot save /backup/etcd/backup.db \
--endpoints=https://127.0.0.1:2379 \
--cacert=/etc/kubernetes/pki/etcd/ca.crt \
--cert=/etc/kubernetes/pki/etcd/server.crt \
--key=/etc/kubernetes/pki/etcd/server.key
```

---

## Verify Backup

```bash
etcdctl snapshot status /backup/etcd/backup.db \
--write-out=table
```

---

## Restore Snapshot

```bash
etcdctl snapshot restore backup.db \
--data-dir=/var/lib/etcd-restored
```

Update the etcd static Pod manifest to point to the restored data directory.

Restart kubelet

```bash
sudo systemctl restart kubelet
```

---

# 10. Validation Steps

Verify

```bash
kubectl get nodes

kubectl get pods -A

kubectl get deployments -A

kubectl get svc -A
```

Verify etcd

```bash
etcdctl endpoint health
```

Business Validation

- Deployments visible
- Secrets available
- ConfigMaps available
- APIs operational
- Monitoring healthy

---

# 11. Rollback Procedure

If restore fails

- Stop restore activity.
- Preserve restored data directory.
- Restore previous verified snapshot.
- Recover original etcd configuration.
- Revalidate API Server.

Never overwrite the original etcd data directory until snapshot integrity has been confirmed.

---

# 12. Escalation Matrix

L1

- Verify API Server
- Verify etcd health

↓

L2

- Verify snapshot
- Review logs

↓

Platform Team

- Control Plane
- etcd

↓

Infrastructure Team

- Storage
- Filesystem

---

# 13. Production Best Practices

- Take scheduled etcd backups.
- Store backups off-cluster.
- Encrypt backup storage.
- Regularly test restore procedures.
- Monitor etcd latency.
- Monitor disk health.
- Keep multiple backup generations.
- Automate backup verification.

---

# 14. Real Production Scenario

A production virtualization platform suffered storage corruption on the control plane.

The API Server stopped responding.

Investigation confirmed etcd database corruption.

A snapshot from two hours earlier was restored.

The API Server became healthy, Deployments reappeared, and production recovered with minimal data loss.

Root Cause

Underlying storage corruption.

---

# 15. Scenario Interview Questions

## Q1. Why is etcd backup critical?

### Answer

Because every Kubernetes object is stored in etcd.

Without a valid backup, complete cluster recovery may not be possible.

---

## Q2. How do you verify an etcd backup?

### Answer

```bash
etcdctl snapshot status backup.db --write-out=table
```

Always verify snapshot integrity before considering it usable.

---

## Q3. Should backup success be assumed after snapshot creation?

### Answer

No.

Always validate

- Snapshot integrity
- File size
- Revision
- Restore testing

---

# 16. Architecture Interview Questions

## Q1. Explain Kubernetes control plane architecture around etcd.

### Answer

```
kubectl

↓

API Server

↓

etcd

↓

Cluster State

↓

Scheduler

↓

Controller Manager

↓

Worker Nodes
```

---

## Q2. Which components depend on etcd?

### Answer

- API Server
- Scheduler
- Controller Manager
- Operators
- Argo CD
- Helm
- All Kubernetes resources

---

# 17. Production Support Interview Questions

## Q1. etcd becomes corrupted in production. Walk through your investigation.

### Answer

Commands

```bash
kubectl cluster-info

etcdctl endpoint health

sudo crictl logs <etcd>

df -h

etcdctl snapshot status backup.db
```

Verify

- etcd health
- Disk
- Certificates
- Snapshot integrity
- API Server

Restore only after confirming the backup is valid.

---

## Q2. What production mistakes commonly cause etcd recovery failures?

### Answer

- No backup verification
- Single backup copy
- Backup stored on same disk
- Restoring over original data immediately
- Ignoring certificate issues
- Skipping restore testing
- No documented DR procedure

---

# 18. Commands Reference

```bash
kubectl cluster-info

etcdctl endpoint health

etcdctl snapshot save

etcdctl snapshot status

etcdctl snapshot restore

sudo crictl ps

sudo crictl logs

df -h

sudo kubeadm certs check-expiration

sudo systemctl restart kubelet
```

---

# 19. Marathi Quick Revision

- API Server तपासा.
- etcd health verify करा.
- Snapshot उपलब्ध आहे का तपासा.
- Snapshot validate करा.
- Restore करण्यापूर्वी backup verify करा.
- kubelet restart करा.
- Cluster validate करा.
- Business validation करा.

---

# 20. Related Runbooks

- 17-api-server-unreachable.md
- 19-cluster-disaster-recovery.md
- 20-production-maintenance-checklist.md

---

# 21. Marathi Summary (5+ Experience Revision)

## Interview Summary

etcd हे Kubernetes चे database आहे. त्यामुळे production मध्ये etcd खराब झाल्यास संपूर्ण control plane प्रभावित होतो. प्रथम `etcdctl endpoint health` वापरून health तपासावी, logs, disk आणि certificates verify करावेत. Restore करण्यापूर्वी snapshot integrity `etcdctl snapshot status` ने validate करावी. Restore नंतर API Server, Nodes, Deployments, Secrets आणि business functionality validate करून RCA तयार करावी.

### Production Investigation Flow

```
Alert

↓

API Server

↓

etcd Health

↓

Logs

↓

Disk

↓

Certificates

↓

Snapshot Validation

↓

Restore

↓

API Server Recovery

↓

Cluster Validation

↓

Business Validation

↓

RCA
```

### Production Story

एका production telecom cluster मध्ये storage controller failure मुळे etcd database corrupt झाली. API Server पूर्णपणे unavailable झाला. DevOps team कडे automated hourly etcd snapshots उपलब्ध होत्या. Snapshot validate करून restore करण्यात आली आणि control plane 20 मिनिटांत पुन्हा operational झाला. Incident नंतर backup verification आणि quarterly disaster recovery drill अनिवार्य करण्यात आली.

### 5+ Years Memory Trick

Interview मध्ये जर विचारले,

**"How do you perform an etcd backup and restore in production?"**

उत्तर:

"I first verify etcd health and confirm the availability of a valid snapshot. Before restoring, I validate the snapshot integrity, preserve the existing data, restore into a new data directory, update the etcd configuration, restart kubelet, verify API Server functionality, validate cluster resources and business operations, and finally document the RCA."

