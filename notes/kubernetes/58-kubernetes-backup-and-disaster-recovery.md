# Kubernetes Backup and Disaster Recovery (DR)

# 1. Purpose

The purpose of this document is to understand how Kubernetes clusters are backed up and recovered during disasters.

A production Kubernetes cluster is a critical business asset. Hardware failures, accidental deletion, ransomware, cloud outages, or operator mistakes can cause complete service disruption.

A Senior DevOps Engineer must know how to recover both the Kubernetes control plane and application workloads with minimal downtime and data loss.

---

# 2. Introduction

Disaster Recovery (DR) is the process of restoring a Kubernetes cluster and applications after a failure.

A proper DR strategy includes

- etcd Backup
- Application Manifest Backup
- Persistent Volume Backup
- Secret Backup
- ConfigMap Backup
- Storage Snapshot
- Recovery Validation
- DR Testing

Remember

**A backup that has never been restored is not a backup—it is only a file.**

---

# 3. Enterprise Usage

Enterprise organizations perform backups for

- Production Clusters
- Disaster Recovery Sites
- Compliance
- Business Continuity
- Security Incidents
- Cloud Failures
- Region Failures
- Human Errors

Common enterprise tools

- Velero
- etcdctl
- Cloud Volume Snapshots
- AWS Backup
- Azure Backup
- Google Cloud Backup

---

# 4. Usage in THIS Project

Our Enterprise DevOps Platform

```
Frontend

↓

API Gateway

↓

Auth Service

↓

Dashboard Service

↓

Persistent Storage

↓

etcd Backup

↓

Application Backup

↓

Recovery Testing
```

Later we will implement

- Velero
- Storage Snapshots
- Backup Policies

---

# 5. Backup Architecture

```
Production Cluster

│

├── etcd Backup

├── YAML Backup

├── ConfigMaps

├── Secrets

├── Persistent Volumes

├── Container Images

└── Monitoring Configuration

↓

Backup Repository

↓

Disaster Recovery Site

↓

Restore Cluster

↓

Business Validation
```

---

# 6. Internal Workflow

Daily Backup

↓

Backup Verification

↓

Store Securely

↓

Retention Policy

↓

Recovery Test

↓

Application Validation

↓

Monitoring Validation

↓

Business Approval

---

# 7. Daily DevOps Activities

Check cluster

```bash
kubectl get nodes

kubectl get pods -A
```

Verify backups

```bash
etcdctl snapshot status backup.db
```

Verify storage

```bash
kubectl get pvc

kubectl get pv
```

Check backup jobs

```bash
kubectl get jobs -A
```

---

# 8. Production Best Practices

- Take daily etcd backups.
- Encrypt backup files.
- Store backups outside the cluster.
- Test restores regularly.
- Follow the 3-2-1 Backup Rule.
- Automate backups.
- Monitor backup failures.
- Document recovery procedures.

---

# 9. Security

Backup files contain

- Secrets
- Certificates
- RBAC
- Cluster Configuration

Always

- Encrypt backups
- Restrict access
- Rotate backup credentials
- Audit backup access
- Store backups securely

---

# 10. Backup Procedure

## etcd Backup

```bash
etcdctl snapshot save backup.db
```

Verify

```bash
etcdctl snapshot status backup.db
```

---

Backup Kubernetes Resources

```bash
kubectl get all -A -o yaml
```

---

Backup ConfigMaps

```bash
kubectl get configmap -A -o yaml
```

---

Backup Secrets

```bash
kubectl get secrets -A -o yaml
```

---

Backup PV Information

```bash
kubectl get pv

kubectl get pvc -A
```

---

# 11. Real Production Scenarios

## Scenario 1

Administrator accidentally deleted Namespace.

Impact

Multiple applications unavailable.

Recovery

Restore namespace from backup.

---

## Scenario 2

Control Plane corrupted.

Impact

Entire cluster unavailable.

Recovery

Restore etcd snapshot.

---

## Scenario 3

Cloud region failure.

Recovery

Restore applications in DR region.

---

## Scenario 4

Persistent Volume deleted.

Recovery

Restore volume snapshot.

---

# 12. Scenario Interview Q&A

### Q1. What should be backed up in Kubernetes?

- etcd
- Secrets
- ConfigMaps
- Persistent Volumes
- YAML manifests

---

### Q2. What is the most important Kubernetes backup?

etcd

because it stores the complete cluster state.

---

### Q3. How often should backups be tested?

Regularly.

Enterprise teams perform scheduled restore testing.

---

# 13. Architecture Interview Q&A

### Q1. Why isn't etcd backup enough?

Because application data may exist in Persistent Volumes.

---

### Q2. Why store backups outside the cluster?

If the cluster is completely lost, local backups are lost too.

---

# 14. Production Support Interview Q&A

### Q1. Entire cluster lost. Investigation?

- Confirm outage
- Verify backup availability
- Restore etcd
- Restore workloads
- Validate applications
- Verify monitoring
- Business confirmation

---

### Q2. Namespace deleted accidentally.

Recovery

- Restore manifests
- Restore Secrets
- Restore ConfigMaps
- Restore PVs
- Verify application

---

# 15. Related Runbooks

- etcd Backup
- etcd Restore
- Namespace Recovery
- PV Recovery
- Cluster Recovery
- Velero Restore

---

# 16. Common Incidents

- Accidental Namespace Deletion
- Lost Secrets
- Deleted ConfigMap
- Corrupted etcd
- Storage Failure
- Region Failure
- Backup Failure
- Restore Failure

---

# 17. Commands

```bash
kubectl get pv

kubectl get pvc

kubectl get all -A

kubectl get secrets -A

kubectl get configmap -A

etcdctl snapshot save backup.db

etcdctl snapshot status backup.db
```

---

# 18. Marathi Quick Revision

- etcd हा Kubernetes चा सर्वात महत्त्वाचा backup आहे.
- PV data वेगळा backup करावा लागतो.
- Backup encrypt करा.
- Backup restore test नियमित करा.
- Backup cluster बाहेर store करा.

---

# 19. Disaster Recovery Flow

```
Disaster

↓

Incident Declared

↓

Impact Assessment

↓

Locate Backup

↓

Restore etcd

↓

Restore PV

↓

Restore Resources

↓

Application Validation

↓

Monitoring Validation

↓

Business Sign-off
```

---

# 20. Recovery Checklist

- Incident Declared
- Backup Available
- Backup Verified
- Restore Started
- Cluster Healthy
- Applications Running
- Monitoring Healthy
- Business Validation Completed
- RCA Scheduled

---

# 21. Marathi Summary (5+ Experience Revision)

## Interview Summary

Production Disaster Recovery म्हणजे फक्त backup घेणे नाही; गरज पडल्यास पूर्ण cluster आणि applications सुरक्षितपणे restore करण्याची क्षमता असणे.

Senior DevOps Engineer ला etcd, Persistent Volumes, Secrets, ConfigMaps आणि application manifests यांचा recovery sequence माहिती असला पाहिजे.

### Production Investigation Flow

```
Disaster

↓

Business Impact

↓

Backup Verification

↓

etcd Restore

↓

Worker Validation

↓

Application Restore

↓

Monitoring

↓

Business Confirmation

↓

RCA
```

### Production Story

एका production environment मध्ये चुकीच्या automation मुळे पूर्ण namespace delete झाला. सुदैवाने nightly backup उपलब्ध होता. प्रथम etcd आणि नंतर application manifests restore करण्यात आले. Persistent Volume snapshot recover करून applications पुन्हा सुरू करण्यात आली. Business downtime कमी ठेवण्यात यश आले कारण recovery runbook आधीपासून तयार होता.

### 5+ Years Memory Trick

जर interviewer विचारेल,

**"Production Kubernetes Disaster Recovery कसा कराल?"**

उत्तर:

"मी प्रथम business impact assess करतो, नंतर backup verify करतो. Recovery मध्ये etcd, cluster resources, Persistent Volumes आणि application validation हा क्रम पाळतो. शेवटी monitoring, business verification आणि RCA पूर्ण करून incident close करतो."

