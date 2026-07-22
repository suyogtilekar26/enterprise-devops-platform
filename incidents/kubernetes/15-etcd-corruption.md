# Kubernetes Production Incident 15 - etcd Corruption During Production

# 1. Incident Overview

## Incident ID

INC-K8S-015

## Severity

SEV-0

## Environment

Production

## Reported By

Prometheus Alertmanager

## Incident Time

01:14 AM

## Resolved Time

02:38 AM

## Duration

84 Minutes

## Affected Component

etcd Database

## Impacted Services

Entire Kubernetes Control Plane

## Impacted Application

Enterprise DevOps Platform

```
Users

↓

Ingress

↓

Applications

↓

Worker Nodes

↓

API Server

↓

etcd ❌
```

---

# 2. Business Impact

Customer Impact

- New deployments failed
- Autoscaling unavailable
- Config updates failed
- Cluster management unavailable

Business Impact

- Production releases blocked
- Incident response delayed
- Risk of workload instability
- High operational risk

Estimated Revenue Impact

Critical

---

# 3. Alert Received

Prometheus Alert

```
EtcdHighFsyncDurations

Severity

Critical
```

Additional Alerts

```
KubeAPIDown

ControlPlaneUnavailable

EtcdMemberUnhealthy
```

API Server Logs

```
failed to read from storage

etcdserver: mvcc: database corruption detected
```

---

# 4. Production Architecture

```
Applications

↓

API Server

↓

etcd Cluster

↓

Persistent Storage
```

---

# 5. Symptoms

Observed

- kubectl unavailable
- API Server unavailable
- Controller Manager stopped reconciling
- Scheduler unable to schedule workloads

Users observed

- Existing workloads mostly operational
- New deployments failed
- Autoscaling stopped
- Configuration updates impossible

---

# 6. Initial Investigation

Objective

Determine whether issue is related to

- API Server
- etcd
- Storage
- Certificates
- Network
- Control Plane

Commands

```bash
kubectl cluster-info

kubectl get nodes
```

Observation

```
Unable to connect to the server
```

---

# 7. Investigation Timeline

## 01:14

Critical alert received.

---

## 01:18

Verified API Server unavailable.

---

## 01:22

Connected to Control Plane node.

Verified kubelet.

```bash
systemctl status kubelet
```

Healthy.

---

## 01:28

Reviewed API Server logs.

```bash
crictl logs <api-server-id>
```

Observed

```
etcdserver:

database corruption detected
```

---

## 01:35

Verified etcd.

```bash
ETCDCTL_API=3 etcdctl endpoint health
```

Observed

```
Unhealthy
```

---

## 01:41

Reviewed etcd logs.

```bash
crictl logs <etcd-container-id>
```

Observed

```
mvcc corruption

backend corruption

wal verification failed
```

---

## 01:48

Confirmed latest snapshot availability.

```bash
ls /backup/etcd/
```

Latest snapshot

```
01:00 AM
```

---

## 01:55

Stopped corrupted etcd.

---

## 02:02

Restored snapshot.

```bash
ETCDCTL_API=3 etcdctl snapshot restore \
backup.db
```

---

## 02:15

Restarted etcd.

---

## 02:21

API Server recovered.

---

## 02:28

Validated cluster.

```bash
kubectl get nodes

kubectl get pods -A
```

---

## 02:38

Business validation completed.

Incident closed.

---

# 8. Commands Executed

API Server

```bash
kubectl cluster-info

kubectl get componentstatuses
```

Control Plane

```bash
systemctl status kubelet

journalctl -u kubelet
```

Containers

```bash
crictl ps

crictl logs
```

etcd

```bash
ETCDCTL_API=3 etcdctl endpoint health

ETCDCTL_API=3 etcdctl endpoint status

ETCDCTL_API=3 etcdctl snapshot status backup.db

ETCDCTL_API=3 etcdctl snapshot restore backup.db
```

System

```bash
df -h

free -m

iostat
```

---

# 9. Findings

Infrastructure

Healthy

Worker Nodes

Healthy

API Server

Unavailable

etcd

Database corrupted

Root Issue

Corrupted etcd backend database

---

# 10. Root Cause

Unexpected storage corruption caused etcd database inconsistency.

The API Server was unable to read Kubernetes cluster state.

Because etcd stores all Kubernetes metadata, cluster management operations immediately failed.

Existing workloads continued running because kubelets already had workload state.

---

# 11. Resolution

Stopped corrupted etcd.

Validated backup.

Restored latest healthy snapshot.

Restarted etcd.

Validated API Server.

Validated workloads.

---

# 12. Validation

Cluster

```bash
kubectl get nodes

kubectl get pods -A
```

Business

- Deployments successful
- Scaling functional
- Cluster manageable
- Applications healthy

Monitoring

- API Server healthy
- etcd healthy
- Control Plane stable

---

# 13. Rollback

If restored snapshot fails

- Restore previous snapshot.
- Rebuild failed etcd member.
- Rejoin cluster.
- Validate quorum.
- Recover API Server.

---

# 14. Customer Communication

Initial Update

> We are investigating a Kubernetes control plane storage issue affecting cluster management operations.

Progress Update

> The issue has been isolated to the Kubernetes datastore. Recovery from validated backups is in progress.

Resolution

> Kubernetes management services have been restored successfully. Cluster integrity has been verified.

---

# 15. Incident Timeline

```
01:14

Alert

↓

01:28

API Logs

↓

01:35

etcd Health

↓

01:41

Corruption Confirmed

↓

01:48

Backup Verified

↓

02:02

Snapshot Restore

↓

02:21

API Server Restored

↓

02:38

Incident Closed
```

---

# 16. Root Cause Analysis (RCA)

## What Happened?

etcd database corruption caused Control Plane failure.

## Why?

Storage corruption damaged the etcd backend database.

## Why wasn't it prevented?

Early storage degradation alerts were insufficient.

## Customer Impact

Cluster management unavailable.

## Preventive Action

Implement storage monitoring, automated snapshot validation and periodic disaster recovery testing.

---

# 17. Preventive Actions

- Schedule automatic etcd snapshots.
- Store snapshots off-cluster.
- Validate snapshot restoration monthly.
- Monitor storage latency.
- Enable filesystem integrity monitoring.
- Practice Control Plane disaster recovery.
- Document etcd recovery procedures.

---

# 18. Production Best Practices

- Never attempt manual repair before confirming corruption.
- Always validate snapshot integrity before restoration.
- Maintain multiple backup generations.
- Restore into an isolated environment when practical.
- Monitor etcd database growth.
- Regularly test disaster recovery procedures.

---

# 19. Production Support Interview Questions

## Q1. How do you investigate etcd corruption?

### Answer

1. Assess business impact.
2. Verify API Server connectivity.
3. Review API Server logs.
4. Check etcd health.
5. Review etcd logs.
6. Confirm corruption.
7. Validate available snapshots.
8. Restore the latest healthy snapshot.
9. Validate cluster recovery.
10. Complete RCA.

---

## Q2. Why is restoring from snapshot preferred over repairing corruption?

### Answer

Because repairing a corrupted distributed datastore can introduce inconsistent cluster state. Restoring a validated snapshot provides a known-good and predictable recovery point.

---

## Q3. What is the biggest operational risk after restoring etcd?

### Answer

Data loss between the latest snapshot and the failure time. This recovery point objective (RPO) should be clearly communicated and reconciled after recovery.

---

# 20. Marathi Quick Revision

- API Server verify करा.
- etcd health तपासा.
- etcd logs तपासा.
- Snapshot verify करा.
- Snapshot restore करा.
- API Server validate करा.
- Cluster validate करा.
- Business validation करा.
- RCA तयार करा.

---

# 21. Marathi Summary (5+ Experience Revision)

## Interview Summary

Production मध्ये etcd corruption आल्यास प्रथम API Server connectivity verify करावी. त्यानंतर etcd health, logs आणि storage verify करावे. Corruption निश्चित झाल्यानंतर उपलब्ध snapshot validate करून restore करावा. Recovery नंतर API Server, cluster health, workloads आणि business functionality validate करून RCA पूर्ण करावी.

### Production Investigation Flow

```
Alert

↓

API Server

↓

etcd Health

↓

etcd Logs

↓

Corruption Confirmed

↓

Snapshot Validation

↓

Restore

↓

API Server Recovery

↓

Business Validation

↓

RCA
```

### Production Story

एका production Kubernetes cluster मध्ये मध्यरात्री API Server पूर्णपणे unavailable झाला. सुरुवातीला network issue वाटत असला तरी API Server logs मध्ये `mvcc: database corruption detected` दिसले. Investigation मध्ये underlying storage corruption मुळे etcd backend खराब झाल्याचे आढळले. सुदैवाने automated hourly snapshots उपलब्ध होते. Latest verified snapshot restore करून etcd आणि API Server काही मिनिटांत recover झाले. Incident नंतर monthly snapshot restore drills, storage latency alerts आणि off-site etcd backups अनिवार्य करण्यात आले.

### 5+ Years Memory Trick

Interview मध्ये जर विचारले,

**"How do you troubleshoot etcd corruption in Kubernetes production?"**

उत्तर:

"I first assess the business impact, verify API Server connectivity, inspect etcd health and logs, confirm database corruption, validate the latest healthy snapshot, restore etcd safely, verify Control Plane recovery, validate business functionality, monitor cluster stability, and complete the RCA."

