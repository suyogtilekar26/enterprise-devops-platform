# Kubernetes StatefulSet

# 1. Purpose

The purpose of a StatefulSet is to deploy and manage stateful applications that require stable identities, persistent storage and ordered deployment.

Unlike Deployments, StatefulSets provide predictable Pod names and dedicated storage for each Pod.

StatefulSets are designed for applications where data consistency and identity are important.

---

# 2. Introduction

Some applications cannot run correctly if Pods are randomly created or deleted.

Examples

- PostgreSQL
- MySQL
- MongoDB
- Cassandra
- Kafka
- ZooKeeper
- Elasticsearch

These applications require

- Stable Pod Names
- Persistent Storage
- Ordered Startup
- Ordered Shutdown

StatefulSet provides these features.

---

# 3. Enterprise Usage

StatefulSets are commonly used for

- Databases
- Distributed Databases
- Kafka Brokers
- Elasticsearch Nodes
- Redis Clusters
- RabbitMQ
- ZooKeeper

Stateless applications like

- React
- Flask APIs
- NGINX

generally use Deployments instead.

---

# 4. Usage in THIS Project

Our Enterprise DevOps Platform is mostly stateless.

However, supporting services use StatefulSets.

```
Prometheus

↓

StatefulSet

↓

Persistent Volume

--------------------------

Grafana

↓

Deployment

--------------------------

PostgreSQL

↓

StatefulSet

↓

Persistent Volume

--------------------------

Kafka

↓

StatefulSet
```

---

# 5. Architecture

```
              StatefulSet

                    │

      ┌─────────────┼──────────────┐

      ▼             ▼              ▼

 postgres-0    postgres-1    postgres-2

      │             │              │

      ▼             ▼              ▼

    PVC-0         PVC-1         PVC-2

      │             │              │

      ▼             ▼              ▼

 Persistent    Persistent     Persistent

   Volume        Volume         Volume
```

Each Pod owns its own storage.

---

# 6. Internal Workflow

```
Create StatefulSet

↓

Create Pod-0

↓

Attach PVC-0

↓

Pod-0 Running

↓

Create Pod-1

↓

Attach PVC-1

↓

Pod-1 Running

↓

Continue Sequentially
```

---

# 7. StatefulSet Characteristics

Every Pod has

- Stable Name
- Stable Network Identity
- Dedicated Persistent Volume
- Ordered Deployment
- Ordered Scaling
- Ordered Deletion

Example

```
mysql-0

mysql-1

mysql-2
```

These names never randomly change.

---

# 8. Deployment vs StatefulSet

Deployment

```
frontend-5fd78

frontend-a8d71

frontend-z92kl
```

Random Pod names.

Pods are interchangeable.

---

StatefulSet

```
postgres-0

postgres-1

postgres-2
```

Stable Pod names.

Pods are NOT interchangeable.

---

# 9. Daily DevOps Activities

- Verify StatefulSet Health
- Monitor Persistent Volumes
- Check Pod Order
- Scale Database Nodes
- Backup Data
- Monitor Storage Usage

---

# 10. Production Best Practices

- Use Persistent Volumes.
- Take regular backups.
- Use anti-affinity rules.
- Monitor disk utilization.
- Scale carefully.
- Never delete PVCs accidentally.

---

# 11. Security

- Encrypt Persistent Volumes.
- Store credentials in Secrets.
- Restrict database access.
- Enable RBAC.
- Use Network Policies.

---

# 12. Troubleshooting

List StatefulSets

```bash
kubectl get statefulsets
```

Describe StatefulSet

```bash
kubectl describe statefulset postgres
```

Check Pods

```bash
kubectl get pods
```

Check PVC

```bash
kubectl get pvc
```

---

# 13. Real Production Scenarios

## Scenario 1

### Database Pod Restart

```
postgres-0
```

restarted.

Because it used the same PVC,

no data was lost.

---

## Scenario 2

### Pod Deleted

Developer accidentally deleted

```
postgres-1
```

Kubernetes recreated

```
postgres-1
```

using

```
PVC-1
```

Database continued working.

---

## Scenario 3

### Scaling Database

Old Cluster

```
postgres-0

postgres-1
```

Scaled to

```
postgres-0

postgres-1

postgres-2
```

Each Pod automatically received its own Persistent Volume.

---

# 14. Scenario Interview Questions

Q1. What is StatefulSet?

Answer

A Kubernetes workload resource designed for stateful applications requiring stable identity and persistent storage.

---

Q2. When should StatefulSet be used?

Answer

For databases, Kafka, Elasticsearch, ZooKeeper and similar stateful workloads.

---

Q3. Can Deployments replace StatefulSets?

Answer

No.

Deployments are intended for stateless applications.

---

Q4. Why does every StatefulSet Pod have its own PVC?

Answer

To ensure each Pod retains its own data even after restart or recreation.

---

# 15. Architecture Interview Questions

Explain the architecture.

```
StatefulSet

↓

Pod

↓

Dedicated PVC

↓

Dedicated PV
```

---

Q2.

Why are Pod names important?

Answer

Database replication and clustering often rely on predictable hostnames.

---

# 16. Production Support Interview Questions

Production Investigation Flow

```
Database Issue

↓

StatefulSet

↓

Pod

↓

PVC

↓

PV

↓

Storage

↓

Logs

↓

Resolved
```

Manager Question

"Our PostgreSQL Pod restarted. Did we lose data?"

Expected Answer

No.

Because PostgreSQL uses a StatefulSet with Persistent Volumes, the recreated Pod mounts the same storage.

---

# 17. Related Runbooks

- postgres-pod-restart.md
- pvc-not-attached.md
- statefulset-scaling.md

---

# 18. Common Incidents

- PVC Not Bound
- Storage Full
- Pod Startup Failure
- Database Replica Failure
- Incorrect Scaling

---

# 19. Commands

```bash
kubectl get statefulsets

kubectl describe statefulset postgres

kubectl get pods

kubectl get pvc

kubectl rollout status statefulset postgres
```

---

# 20. Marathi Quick Revision

- StatefulSet Database साठी वापरतात.
- प्रत्येक Pod ला स्वतःचा PVC असतो.
- Pod Name कायम एकच राहतो.
- Data Restart नंतरही सुरक्षित राहतो.
- Kafka, PostgreSQL, MongoDB यासाठी StatefulSet वापरतात.

---

# 21. Marathi Summary (5+ Years Experience Revision)

## Interview Summary

StatefulSet हा Stateful Applications साठी वापरला जाणारा Kubernetes Resource आहे.

तो Stable Pod Names, Persistent Storage आणि Ordered Deployment प्रदान करतो.

Database सारख्या Applications साठी StatefulSet हा योग्य पर्याय आहे.

## Production Investigation Flow

```
Database Issue

↓

StatefulSet

↓

Pod

↓

PVC

↓

PV

↓

Storage

↓

Logs

↓

Resolved
```

## Production Story

Production PostgreSQL Pod Restart झाला.

Application Team ला Data Loss ची भीती होती.

Investigation मध्ये PostgreSQL StatefulSet वर चालत होता आणि Pod ने जुना PVC पुन्हा Mount केला.

Data पूर्णपणे सुरक्षित होता आणि Database काही मिनिटांत पुन्हा Online झाला.

## Memory Trick

**Deployment = Stateless**

**StatefulSet = Stateful**

Remember

**Stable Pod Name + Dedicated PVC = StatefulSet**

