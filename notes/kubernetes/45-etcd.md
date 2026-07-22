# Kubernetes etcd

# 1. Purpose

The purpose of etcd is to act as the primary distributed key-value database for Kubernetes.

It stores the complete state of the Kubernetes Cluster.

Everything Kubernetes knows is stored inside etcd.

Without etcd,

the Kubernetes Cluster cannot function.

---

# 2. Introduction

Imagine a Developer executes

```bash
kubectl apply -f deployment.yaml
```

Where does Kubernetes store this Deployment?

```
Developer

↓

kubectl

↓

API Server

↓

etcd

↓

Deployment Stored
```

etcd is the single source of truth for Kubernetes.

---

# 3. Enterprise Usage

Every Enterprise Kubernetes Cluster uses etcd.

Used by

- AWS EKS
- Azure AKS
- Google GKE
- OpenShift
- Rancher
- On-Prem Kubernetes

Production clusters run etcd in highly available mode.

---

# 4. Usage in THIS Project

Enterprise DevOps Platform

```
Frontend Deployment

↓

API Server

↓

etcd

------------------------

API Gateway

↓

API Server

↓

etcd

------------------------

ConfigMaps

↓

API Server

↓

etcd

------------------------

Secrets

↓

API Server

↓

etcd
```

Every Kubernetes object in our project will ultimately be stored in etcd.

---

# 5. Architecture

```
                 kubectl

                    │

                    ▼

               API Server

                    │

                    ▼

                  etcd

        ┌───────────┼───────────┐

        ▼           ▼           ▼

    Deployment    Service     ConfigMap

        ▼           ▼           ▼

      Secret      Namespace     Pod
```

---

# 6. Internal Workflow

```
kubectl apply

↓

API Server

↓

Authentication

↓

Authorization

↓

Admission

↓

Validation

↓

Store Object

↓

etcd

↓

Scheduler

↓

Pod Created
```

---

# 7. What is etcd?

etcd is

- Distributed
- Consistent
- Highly Available
- Key-Value Database

It stores

- Pods
- Deployments
- Services
- Secrets
- ConfigMaps
- Nodes
- Namespaces
- StatefulSets
- Jobs
- PersistentVolumes

Everything is stored as key-value pairs.

---

# 8. Why etcd?

Without etcd

```
Cluster Restart

↓

No Stored State

↓

Nothing Exists
```

With etcd

```
Cluster Restart

↓

Desired State Available

↓

Controllers Reconcile

↓

Applications Running
```

---

# 9. Important Characteristics

## Distributed

Multiple etcd members.

---

## Consistent

All members maintain the same data.

---

## Highly Available

Cluster survives node failures.

---

## Fast

Optimized for frequent reads and writes.

---

## Reliable

Uses the Raft Consensus Algorithm.

---

# 10. Daily DevOps Activities

- Verify etcd Health
- Monitor Disk Usage
- Take Backups
- Restore Backups
- Monitor Latency
- Verify Cluster Health

---

# 11. Production Best Practices

- Always enable TLS.
- Take regular backups.
- Encrypt Secrets.
- Monitor storage usage.
- Use odd-numbered etcd members.
- Never modify etcd data manually.

---

# 12. Security

- TLS Communication
- Client Certificates
- Encryption at Rest
- RBAC Protection
- Backup Encryption
- Restricted Access

---

# 13. Troubleshooting

Check Cluster

```bash
kubectl cluster-info
```

Check Nodes

```bash
kubectl get nodes
```

View Component Health

```bash
kubectl get componentstatuses
```

Check API Server

```bash
kubectl get --raw='/healthz'
```

For self-managed Kubernetes

```bash
etcdctl endpoint health
```

---

# 14. Real Production Scenarios

## Scenario 1

### etcd Disk Full

Symptoms

```
Deployments Failed

↓

Objects Not Created
```

Root Cause

etcd storage exhausted.

Resolution

Expanded storage.

Compacted database.

---

## Scenario 2

### Corrupted etcd Database

Symptoms

```
API Server Failed

↓

Cluster Unavailable
```

Resolution

Restored from Backup.

---

## Scenario 3

### Accidental Object Deletion

Developer deleted Namespace.

Business Impact

Production Outage.

Resolution

Restored etcd Backup.

Recovered Namespace.

---

# 15. Scenario Interview Questions

Q1. What is etcd?

Answer

etcd is the distributed key-value database that stores the complete state of the Kubernetes Cluster.

---

Q2. Does Kubernetes store data on Worker Nodes?

Answer

No.

Kubernetes stores cluster state in etcd.

---

Q3. What happens if etcd becomes unavailable?

Answer

The API Server cannot read or write cluster state, and Kubernetes operations fail.

---

Q4. Why are backups important?

Answer

Because etcd stores the entire cluster state.

Without backups, recovery becomes extremely difficult.

---

# 16. Architecture Interview Questions

Explain etcd Workflow.

```
kubectl

↓

API Server

↓

Authentication

↓

Authorization

↓

Admission

↓

Validation

↓

etcd

↓

Scheduler
```

---

Q2.

Why is etcd called the Source of Truth?

Answer

Because it stores the desired state and configuration of every Kubernetes object.

---

# 17. Production Support Interview Questions

Production Investigation Flow

```
Deployment Failed

↓

API Server

↓

etcd Health

↓

Disk Usage

↓

Backup Status

↓

Restore

↓

Resolved
```

Manager Question

"Our Kubernetes Cluster suddenly stopped accepting deployments."

Expected Answer

- Verify API Server
- Verify etcd Health
- Check Disk Usage
- Check etcd Logs
- Verify Certificates
- Restore Backup if required

---

# 18. Related Runbooks

- etcd-backup.md
- etcd-restore.md
- etcd-disk-full.md

---

# 19. Common Incidents

- etcd Disk Full
- Database Corruption
- Backup Failure
- API Server Unable to Reach etcd
- High etcd Latency

---

# 20. Commands

```bash
kubectl cluster-info

kubectl get componentstatuses

kubectl get nodes

kubectl get --raw='/healthz'

etcdctl endpoint health

etcdctl member list
```

---

# 21. YAML / Internal Data Deep Dive

Example Deployment

```yaml
apiVersion: apps/v1
kind: Deployment

metadata:
  name: api-gateway

spec:
  replicas: 3
```

Internal Flow

```
Deployment YAML

↓

API Server

↓

Validation

↓

Converted Into

Key-Value Objects

↓

Stored in etcd

↓

Controllers Watch Changes

↓

Pods Created
```

Applications never communicate directly with etcd.

Only the API Server interacts with etcd.

---

# 22. Marathi Quick Revision

- etcd म्हणजे Kubernetes Database.
- Kubernetes ची सर्व माहिती etcd मध्ये Store होते.
- API Server थेट etcd शी बोलतो.
- Worker Nodes कधीही etcd शी थेट बोलत नाहीत.
- etcd Backup हा Production मधील सर्वात महत्त्वाचा Backup असतो.

---

# 23. Marathi Summary (5+ Years Experience Revision)

## Interview Summary

etcd हा Kubernetes चा Distributed Key-Value Database आहे.

तो Cluster मधील प्रत्येक Object ची Desired State Store करतो.

API Server हा एकमेव Component आहे जो etcd शी थेट संवाद साधतो.

Production मध्ये etcd चे Backup, TLS Security आणि High Availability अत्यंत महत्त्वाचे असतात.

## Production Investigation Flow

```
Deployment Failed

↓

API Server

↓

etcd Health

↓

Disk Space

↓

Backup

↓

Restore

↓

Resolved
```

## Production Story

एका Production Kubernetes Cluster मध्ये नवीन Deployments अचानक Fail होऊ लागले.

Investigation दरम्यान API Server Logs मध्ये etcd Write Failures दिसल्या.

Disk Usage 100% झाल्यामुळे etcd नवीन Objects Store करू शकत नव्हते.

Storage Expand करून Database Compact करण्यात आली आणि Cluster पुन्हा Normal झाला.

## Memory Trick

**API Server = Brain**

**etcd = Memory**

Remember

**kubectl**

↓

**API Server**

↓

**etcd (Source of Truth)**

↓

**Scheduler**

↓

**Pods**

