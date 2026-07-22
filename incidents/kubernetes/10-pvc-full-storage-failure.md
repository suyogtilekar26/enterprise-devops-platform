# Kubernetes Production Incident 10 - PVC Full / Storage Failure During Production

# 1. Incident Overview

## Incident ID

INC-K8S-010

## Severity

SEV-1

## Environment

Production

## Reported By

Prometheus Alertmanager

## Incident Time

06:42 PM

## Resolved Time

07:28 PM

## Duration

46 Minutes

## Affected Component

Persistent Volume Claim (PVC)

## Affected Service

PostgreSQL Database

## Impacted Application

Enterprise DevOps Platform

```
Frontend

↓

API Gateway

↓

Auth Service

↓

PostgreSQL ❌

↓

Persistent Volume Claim
```

---

# 2. Business Impact

Customer Impact

- Login requests failed
- Dashboard unavailable
- Transactions could not be processed
- APIs returned HTTP 500

Business Impact

- Database stopped accepting writes
- Customer transactions delayed
- Order processing interrupted
- SLA breach risk

Estimated Revenue Impact

Critical

---

# 3. Alert Received

Prometheus Alert

```
KubePersistentVolumeFillingUp

Severity

Critical

Namespace

enterprise-devops

PVC

postgres-pvc

Usage

98%
```

Grafana Dashboard

```
PVC Usage ↑

Database Errors ↑

HTTP 500 ↑
```

Application Logs

```
ERROR

could not write to file

No space left on device
```

---

# 4. Production Architecture

```
Frontend

↓

API Gateway

↓

Auth Service

↓

PostgreSQL

↓

Persistent Volume

↓

StorageClass
```

---

# 5. Symptoms

Observed

- Database write failures
- Pods Running
- APIs failing
- Transaction failures

Users observed

- Login failures
- Dashboard errors
- HTTP 500
- Slow responses

---

# 6. Initial Investigation

Objective

Determine whether issue is related to

- PVC
- PV
- StorageClass
- Database
- Node storage

Commands

```bash
kubectl get pvc

kubectl get pv

kubectl describe pvc postgres-pvc
```

Observation

```
PVC Usage

98%
```

---

# 7. Investigation Timeline

## 06:42

Critical alert received.

---

## 06:45

Verified Pods.

```bash
kubectl get pods
```

Pods healthy.

---

## 06:48

Verified PVC.

```bash
kubectl get pvc
```

Observed

```
Bound

98% Utilization
```

---

## 06:51

Verified PV.

```bash
kubectl get pv
```

Healthy.

---

## 06:54

Connected to PostgreSQL.

Observed

```
Disk Full

Unable to write WAL
```

---

## 06:58

Checked filesystem.

```bash
df -h
```

Result

```
100%

Used
```

---

## 07:02

Identified excessive archived logs.

Old backup files occupied most of the volume.

---

## 07:08

Archived and removed obsolete backup files.

---

## 07:13

Expanded PVC.

```bash
kubectl edit pvc postgres-pvc
```

Storage

```
100Gi

↓

200Gi
```

---

## 07:20

Filesystem resized successfully.

---

## 07:24

Database resumed normal writes.

---

## 07:28

Business validation completed.

Incident closed.

---

# 8. Commands Executed

Storage

```bash
kubectl get pvc

kubectl describe pvc

kubectl get pv

kubectl describe pv
```

Filesystem

```bash
df -h

du -sh /*
```

Database

```bash
psql

SELECT version();
```

Events

```bash
kubectl get events \
--sort-by=.metadata.creationTimestamp
```

---

# 9. Findings

Infrastructure

Healthy

Cluster

Healthy

PVC

Nearly full

Database

Unable to write

Root Issue

Persistent storage exhausted

---

# 10. Root Cause

Database backup archives accumulated for several weeks because an automated cleanup job had failed.

The Persistent Volume reached full capacity.

PostgreSQL could no longer write WAL files, causing transaction failures.

---

# 11. Resolution

Removed obsolete backup files.

Expanded Persistent Volume.

Validated filesystem expansion.

Verified database write operations.

Confirmed application recovery.

---

# 12. Validation

Storage

```bash
kubectl get pvc
```

Filesystem

```bash
df -h
```

Business

- Login successful
- Database writes successful
- Dashboard available
- Transactions completed

Monitoring

- PVC alerts cleared
- Database healthy
- HTTP 500 resolved

---

# 13. Rollback

If expansion fails

Restore from storage snapshot.

Attach previous volume.

Restore database.

Validate application.

---

# 14. Customer Communication

Initial Update

> We are investigating a storage issue affecting database operations.

Progress Update

> Root cause has been identified. Storage recovery and expansion are in progress.

Resolution

> Database services have been restored successfully. Monitoring continues to ensure stability.

---

# 15. Incident Timeline

```
06:42

Alert

↓

06:48

PVC Investigation

↓

06:54

Database Verified

↓

07:02

Storage Full Confirmed

↓

07:08

Cleanup Started

↓

07:13

PVC Expanded

↓

07:24

Database Recovered

↓

07:28

Incident Closed
```

---

# 16. Root Cause Analysis (RCA)

## What Happened?

Database storage became full.

## Why?

Backup cleanup automation failed.

## Why wasn't it detected?

Storage growth alerts were configured too late.

## Customer Impact

Database unavailable for write operations.

## Preventive Action

Implement automated storage lifecycle management and earlier capacity alerts.

---

# 17. Preventive Actions

- Alert when PVC reaches 70%, 80% and 90%.
- Enable automated backup cleanup.
- Perform storage capacity planning.
- Review database growth monthly.
- Monitor WAL generation.
- Implement storage dashboards.

---

# 18. Production Best Practices

- Never allow production PVC utilization above 80%.
- Automate backup retention.
- Test volume expansion procedures.
- Monitor filesystem growth daily.
- Maintain storage runbooks.
- Schedule periodic storage reviews.

---

# 19. Production Support Interview Questions

## Q1. How do you investigate a production PVC full incident?

### Answer

1. Verify application impact.
2. Check PVC and PV status.
3. Verify filesystem usage.
4. Check database write capability.
5. Identify storage consumers.
6. Clean up or expand storage.
7. Validate application recovery.
8. Complete RCA.

---

## Q2. How do you confirm a PVC is the root cause?

### Answer

Check PVC utilization, filesystem usage (`df -h`), application logs and database write failures together.

---

## Q3. Can expanding a PVC immediately solve every storage issue?

### Answer

No.

You must first identify what consumed the storage. Expanding the volume without understanding the growth pattern only delays the next outage.

---

# 20. Marathi Quick Revision

- PVC तपासा.
- PV verify करा.
- `df -h` चालवा.
- Database write तपासा.
- Storage usage शोधा.
- Cleanup करा.
- PVC expand करा.
- Business validation करा.
- RCA तयार करा.

---

# 21. Marathi Summary (5+ Experience Revision)

## Interview Summary

Production मध्ये PVC Full incident आल्यास प्रथम application impact समजून घ्यावा. त्यानंतर PVC, PV, filesystem usage आणि database write operations verify कराव्यात. Storage कोणत्या files मुळे भरली आहे हे शोधून cleanup किंवा volume expansion करावे. शेवटी business validation, monitoring validation आणि RCA पूर्ण करावी.

### Production Investigation Flow

```
Alert

↓

PVC

↓

PV

↓

Filesystem

↓

Database

↓

Storage Analysis

↓

Root Cause

↓

Cleanup / Expansion

↓

Business Validation

↓

RCA
```

### Production Story

एका production e-commerce platform मध्ये PostgreSQL अचानक write failures देऊ लागली. सुरुवातीला database issue वाटत असला तरी `df -h` मध्ये volume 100% भरलेला असल्याचे दिसले. Investigation मध्ये automated backup cleanup job अनेक दिवसांपासून अपयशी ठरत असल्याने जुने backup archives साठले होते. Cleanup करून PVC expand करण्यात आली आणि काही मिनिटांत database पुन्हा write करू लागली. Incident नंतर 70%, 80% आणि 90% storage alerts तसेच automated retention policy लागू करण्यात आली.

### 5+ Years Memory Trick

Interview मध्ये जर विचारले,

**"How do you troubleshoot a Kubernetes PVC full production incident?"**

उत्तर:

"I first assess the business impact, inspect the PVC and PV status, verify filesystem usage, identify what is consuming storage, validate database write operations, clean up or expand the volume as appropriate, confirm business recovery, monitor storage health, and complete the RCA."

