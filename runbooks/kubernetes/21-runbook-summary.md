# Kubernetes Runbook Summary

## Overview

This directory contains production-grade Kubernetes runbooks designed for real enterprise DevOps environments.

These runbooks are written from the perspective of a Production Support / Platform Engineering team responsible for maintaining business-critical Kubernetes workloads.

Unlike tutorials, every runbook focuses on:

- Production troubleshooting
- Standard investigation workflow
- Root Cause Analysis (RCA)
- Business impact
- Enterprise architecture
- Recovery procedures
- Rollback strategy
- Production validation
- Interview preparation

These runbooks complement the Kubernetes Notes and Kubernetes Labs already present in this repository.

---

# Runbook Roadmap

| Runbook | Topic | Status |
|----------|-------|--------|
| 00 | Runbook Roadmap | ✅ |
| 01 | Pod CrashLoopBackOff | ✅ |
| 02 | ImagePullBackOff | ✅ |
| 03 | Pod Pending | ✅ |
| 04 | Node NotReady | ✅ |
| 05 | Node Maintenance | ✅ |
| 06 | Deployment Rollback | ✅ |
| 07 | Service Not Reachable | ✅ |
| 08 | Ingress Not Working | ✅ |
| 09 | CoreDNS Failure | ✅ |
| 10 | PVC / PV Issues | ✅ |
| 11 | StorageClass Issues | ✅ |
| 12 | ConfigMap Update | ✅ |
| 13 | Secret Rotation | ✅ |
| 14 | Resource Exhaustion | ✅ |
| 15 | OOMKilled | ✅ |
| 16 | Health Probe Failures | ✅ |
| 17 | API Server Unreachable | ✅ |
| 18 | etcd Backup and Restore | ✅ |
| 19 | Cluster Disaster Recovery | ✅ |
| 20 | Production Maintenance Checklist | ✅ |
| 21 | Runbook Summary | ✅ |

---

# Enterprise Incident Investigation Philosophy

Every production incident should follow a consistent investigation methodology.

```
Alert

↓

Business Impact

↓

Incident Declaration

↓

Scope Identification

↓

Evidence Collection

↓

Infrastructure Validation

↓

Kubernetes Validation

↓

Application Validation

↓

Dependency Validation

↓

Root Cause Identification

↓

Resolution

↓

Business Validation

↓

Monitoring Validation

↓

RCA

↓

Preventive Actions
```

Never jump directly to a fix without collecting evidence.

---

# Standard Production Investigation Order

## Step 1

Understand customer impact.

Questions

- What is failing?
- Since when?
- Which users are affected?
- Revenue impact?
- SLA impact?

---

## Step 2

Verify Cluster

```bash
kubectl cluster-info

kubectl get nodes

kubectl get pods -A

kubectl get events \
--sort-by=.metadata.creationTimestamp
```

---

## Step 3

Identify Scope

Determine

- Single Pod
- Deployment
- Namespace
- Node
- Cluster
- Control Plane

---

## Step 4

Collect Evidence

Always collect

```bash
kubectl describe pod

kubectl logs

kubectl logs --previous

kubectl top pods

kubectl top nodes
```

Never modify production before collecting logs.

---

## Step 5

Review Recent Changes

Always verify

- CI/CD
- Git
- Helm
- Argo CD
- ConfigMap
- Secret
- Deployment
- Infrastructure
- Change Request

Most production incidents originate from recent changes.

---

## Step 6

Validate Dependencies

Check

- Database
- DNS
- Storage
- Redis
- Kafka
- External APIs
- Certificates

Many Kubernetes incidents originate outside Kubernetes.

---

## Step 7

Apply Fix

Examples

- Rollback
- Restart
- Scale
- Update configuration
- Restore backup

Always follow approved change management.

---

## Step 8

Business Validation

Verify

- Login
- Authentication
- API Gateway
- Dashboard
- Database
- Customer transactions

Technical recovery alone is insufficient.

---

## Step 9

Monitoring Validation

Confirm

- Alerts cleared
- Metrics normal
- Logs healthy
- Dashboards green

---

## Step 10

Root Cause Analysis

Document

- Timeline
- Root Cause
- Impact
- Resolution
- Preventive Actions
- Lessons Learned

---

# Enterprise Production Principles

Always

- Verify before changing.
- Backup before modifying.
- Validate before closing.
- Monitor during changes.
- Follow change management.
- Test rollback procedures.
- Document every incident.
- Perform post-incident reviews.

Never

- Restart blindly.
- Delete Pods without investigation.
- Ignore monitoring alerts.
- Skip business validation.
- Modify production without approval.
- Assume recovery without verification.

---

# Enterprise DevOps Project Mapping

Application

```
Frontend (React + Vite)

↓

API Gateway

↓

Auth Service

↓

Dashboard Service
```

Infrastructure

```
Docker

↓

Docker Compose

↓

GitHub Actions

↓

Container Registry

↓

Kind Kubernetes

↓

Helm

↓

Argo CD

↓

Terraform

↓

AWS

↓

Monitoring
```

These runbooks support the Kubernetes layer of the platform.

---

# Common Commands

Cluster

```bash
kubectl cluster-info

kubectl get nodes

kubectl top nodes
```

Pods

```bash
kubectl get pods -A

kubectl describe pod

kubectl logs

kubectl logs --previous
```

Deployments

```bash
kubectl get deployments

kubectl rollout status

kubectl rollout undo
```

Services

```bash
kubectl get svc

kubectl describe svc
```

Ingress

```bash
kubectl get ingress
```

Storage

```bash
kubectl get pvc

kubectl get pv
```

Events

```bash
kubectl get events \
--sort-by=.metadata.creationTimestamp
```

Control Plane

```bash
kubectl cluster-info

etcdctl endpoint health
```

---

# Interview Preparation

A 5+ year DevOps engineer is expected to:

- Troubleshoot production issues systematically.
- Understand Kubernetes architecture.
- Perform RCA.
- Execute safe rollbacks.
- Handle Disaster Recovery.
- Understand etcd.
- Understand control plane failures.
- Perform maintenance planning.
- Validate business functionality.
- Communicate effectively during incidents.

Interview answers should always include

- Investigation
- Commands
- Root Cause
- Resolution
- Validation
- Prevention

---

# Marathi Quick Revision

- आधी evidence घ्या.
- मग investigation करा.
- Root Cause शोधा.
- मग fix करा.
- Business validation करा.
- Monitoring validate करा.
- RCA लिहा.
- Preventive action ठरवा.

---

# Final Marathi Summary (5+ Experience Revision)

## Kubernetes Runbook Memory Flow

```
Alert

↓

Scope

↓

Evidence

↓

Cluster

↓

Application

↓

Dependencies

↓

Root Cause

↓

Fix

↓

Validation

↓

Monitoring

↓

RCA

↓

Lessons Learned
```

## Production Story

एका enterprise retail कंपनीमध्ये एका महिन्यात अनेक Kubernetes incidents आले—CrashLoopBackOff, ImagePullBackOff, Node failure, Secret rotation issue आणि API Server outage. सुरुवातीला प्रत्येक engineer वेगवेगळ्या पद्धतीने troubleshooting करत होता, त्यामुळे MTTR (Mean Time To Recovery) वाढत होता.

यानंतर DevOps Platform Team ने standardized runbooks तयार केले. प्रत्येक incident साठी investigation order, commands, rollback procedure, business validation आणि RCA format निश्चित करण्यात आले.

पुढील quarter मध्ये:

- MTTR कमी झाला.
- Production outages कमी झाले.
- RCA quality सुधारली.
- On-call engineers अधिक confident झाले.
- New engineers काही आठवड्यांत production support देऊ लागले.

यामुळे runbooks हे documentation नसून production operations चे operational playbooks बनले.

## 5+ Years Memory Trick

Interview मध्ये जर विचारले,

**"How do you handle Kubernetes production incidents?"**

उत्तर:

"I follow a structured production runbook. I first determine the business impact and incident scope, collect evidence before making changes, investigate cluster, application and external dependencies, identify the root cause, apply the safest recovery or rollback strategy, validate business functionality, monitor post-recovery stability, and finally document a complete RCA with preventive actions."

