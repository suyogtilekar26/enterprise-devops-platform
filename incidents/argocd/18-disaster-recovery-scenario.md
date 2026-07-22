# Incident 18 - Disaster Recovery Scenario

# Enterprise DevOps Platform

---

# Incident Summary

A complete Kubernetes production cluster became unavailable due to infrastructure failure.

ArgoCD and the Git repository remained intact, but all application workloads running in the production cluster were lost.

A Disaster Recovery (DR) procedure was initiated to restore production using GitOps.

---

# Severity

```
SEV-1
```

Critical business continuity incident.

---

# Business Impact

- Complete production outage
- Customer-facing services unavailable
- Revenue loss
- SLA violation
- Business operations interrupted
- Emergency disaster recovery initiated

---

# Environment

- ArgoCD
- Kubernetes
- Git Repository
- Backup Storage
- Disaster Recovery Cluster

---

# Symptoms

Applications

```
Unknown
```

Cluster

```bash
kubectl get nodes
```

Output

```
Unable to connect to the server
```

ArgoCD

```bash
argocd cluster list
```

Output

```
Connection Failed
```

---

# Common Causes

- Cloud Region Failure
- Control Plane Failure
- Infrastructure Loss
- Data Center Outage
- Network Failure
- Accidental Cluster Deletion
- Storage Failure
- Disaster Recovery Test
- Security Incident
- Hardware Failure

---

# Detection

Verify Cluster

```bash
kubectl cluster-info
```

---

Verify ArgoCD

```bash
argocd cluster list
```

---

Verify Monitoring

Check

- Prometheus
- Grafana
- Cloud Provider Alerts
- Kubernetes Control Plane
- Infrastructure Monitoring

---

# Investigation

## Step 1

Confirm Cluster Failure

```bash
kubectl get nodes
```

---

## Step 2

Determine Scope

Identify

- Applications affected
- Namespaces
- Persistent Volumes
- Databases
- External Services

---

## Step 3

Verify Git Repository

Ensure all manifests are available.

Example

```
applications/

base/

overlays/

helm/

kustomize/
```

---

## Step 4

Verify Backup Availability

Check

- etcd Backup
- Database Backup
- Persistent Volume Backup
- Secrets Backup

---

## Step 5

Provision Recovery Cluster

Verify

```bash
kubectl get nodes
```

Expected

```
Ready
```

---

## Step 6

Register Recovery Cluster

```bash
argocd cluster add disaster-recovery
```

---

## Step 7

Restore Applications

Synchronize

```bash
argocd app sync guestbook
```

Repeat for all production applications.

---

# Root Cause Analysis

Example

A cloud provider regional outage caused the Kubernetes control plane to become unavailable.

All worker nodes were unreachable.

The Git repository remained healthy.

A new Kubernetes cluster was provisioned.

ArgoCD synchronized every application from Git, restoring production.

---

# Resolution

Provision a new Kubernetes cluster.

Register it with ArgoCD.

```bash
argocd cluster add disaster-recovery
```

Synchronize applications

```bash
argocd app sync guestbook
```

Restore

- Databases
- Persistent Volumes
- Secrets
- Certificates
- External Integrations

---

# Validation

Verify Cluster

```bash
kubectl get nodes
```

Expected

```
Ready
```

---

Verify Applications

```bash
argocd app list
```

Expected

```
Healthy

Synced
```

---

Verify Pods

```bash
kubectl get pods -A
```

Expected

```
Running
```

---

Verify Business Services

Confirm

- Login
- API
- UI
- Background Jobs
- Database Connectivity

---

# Commands Used

Clusters

```bash
argocd cluster list
```

Register Cluster

```bash
argocd cluster add disaster-recovery
```

Applications

```bash
argocd app list
```

Synchronize

```bash
argocd app sync guestbook
```

Nodes

```bash
kubectl get nodes
```

Pods

```bash
kubectl get pods -A
```

---

# Timeline Example

```
02:00

Cloud Region Failure

↓

02:03

Production Cluster Unavailable

↓

02:05

Incident Declared

↓

02:10

Recovery Cluster Provisioned

↓

02:18

Cluster Registered in ArgoCD

↓

02:22

Applications Synchronized

↓

02:28

Databases Restored

↓

02:35

Business Validation Completed

↓

02:40

Production Restored
```

---

# Prevention

- Maintain disaster recovery clusters.
- Back up etcd regularly.
- Back up persistent volumes.
- Replicate databases.
- Test disaster recovery frequently.
- Store all manifests in Git.
- Automate cluster provisioning.

---

# Best Practices

- Treat Git as the single source of truth.
- Automate disaster recovery.
- Test recovery procedures quarterly.
- Monitor backup health.
- Document recovery runbooks.
- Measure Recovery Time Objective (RTO) and Recovery Point Objective (RPO).

---

# Interview Questions

## 1. Why is GitOps valuable during disaster recovery?

Git contains the desired state, allowing ArgoCD to recreate infrastructure consistently on a new cluster.

---

## 2. Which command registers a new cluster with ArgoCD?

```bash
argocd cluster add disaster-recovery
```

---

## 3. What resources usually require separate backup besides Git?

- Databases
- Persistent Volumes
- Secrets
- Certificates
- etcd

---

## 4. Can Git alone restore an entire production environment?

No.

Git restores Kubernetes manifests, but stateful data such as databases and persistent storage must be restored from backups.

---

## 5. How can disaster recovery readiness be improved?

- Regular DR drills
- Automated backups
- Cluster automation
- GitOps
- Continuous validation

---

# Incident Success Criteria

The incident is resolved when:

- Recovery cluster is operational.
- Applications are Healthy.
- Applications are Synced.
- Business services are functional.
- Data is restored.
- Root cause and recovery actions are documented.

---

# Marathi Quick Revision

- Disaster Recovery म्हणजे संपूर्ण Production Cluster Fail झाल्यावर नवीन Cluster वर Services पुन्हा सुरू करणे.
- GitOps मुळे Git मधील Manifests वापरून ArgoCD Applications पुन्हा Deploy करू शकते.
- Databases, Persistent Volumes आणि Secrets यांचे स्वतंत्र Backup आवश्यक आहे.
- `argocd cluster add` वापरून नवीन Cluster ArgoCD मध्ये Register करता येतो.
- Production मध्ये नियमित Disaster Recovery Drill करणे अत्यावश्यक आहे.

