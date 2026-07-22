# Kubernetes Production Incident 18 - Kubernetes Cluster Upgrade Failure

# 1. Incident Overview

## Incident ID

INC-K8S-018

## Severity

SEV-1

## Environment

Production

## Reported By

Platform Operations Team

## Incident Time

10:15 PM

## Resolved Time

11:37 PM

## Duration

82 Minutes

## Affected Component

Kubernetes Control Plane Upgrade

## Impacted Services

Control Plane

Ingress

Application Deployments

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

Control Plane Upgrade ❌

↓

API Server
```

---

# 2. Business Impact

Customer Impact

- New deployments failed
- Rolling updates paused
- Some APIs experienced intermittent failures
- Autoscaling delayed

Business Impact

- Planned maintenance exceeded maintenance window
- Release pipeline blocked
- Operational risk increased
- Engineering resources diverted to incident response

Estimated Revenue Impact

High

---

# 3. Alert Received

Prometheus Alert

```
KubeAPILatencyHigh

Severity

Critical
```

Additional Alerts

```
KubeControllerManagerDown

SchedulerUnavailable

ArgoCDSyncFailed
```

CI/CD Pipeline

```
Deployment Failed

context deadline exceeded
```

---

# 4. Production Architecture

```
GitHub Actions

↓

Argo CD

↓

API Server

↓

Scheduler

↓

Controller Manager

↓

Worker Nodes

↓

Applications
```

---

# 5. Symptoms

Observed

- Upgrade process stalled
- API latency increased
- Controllers unavailable
- Argo CD synchronization failed
- Some worker nodes reported NotReady temporarily

Users observed

- Existing applications mostly available
- New releases blocked
- Delayed scaling events

---

# 6. Initial Investigation

Objective

Determine whether issue is related to

- Upgrade procedure
- API Server
- etcd
- Version compatibility
- Worker Nodes
- Networking

Commands

```bash
kubectl get nodes

kubectl get pods -A

kubectl version
```

Observation

```
API Server responding slowly

Control Plane degraded
```

---

# 7. Investigation Timeline

## 10:15

Upgrade initiated.

---

## 10:18

Monitoring detected API latency.

---

## 10:22

Deployment pipeline failed.

```bash
kubectl get nodes
```

Some worker nodes temporarily NotReady.

---

## 10:28

Verified Control Plane Pods.

```bash
kubectl get pods \
-n kube-system
```

Observed

```
Controller Manager restarting
```

---

## 10:36

Reviewed upgrade logs.

Observed

```
Version skew detected

Worker Nodes behind supported version
```

---

## 10:45

Validated etcd health.

```bash
ETCDCTL_API=3 etcdctl endpoint health
```

Healthy.

---

## 10:51

Root Cause confirmed.

Upgrade sequence was not followed correctly.

Worker nodes exceeded supported Kubernetes version skew.

---

## 11:00

Paused upgrade.

Rolled back Control Plane binaries.

---

## 11:12

Validated API Server.

Controller Manager recovered.

Scheduler healthy.

---

## 11:24

Worker nodes rejoined cluster.

---

## 11:31

Validated deployments.

Argo CD synchronization successful.

---

## 11:37

Business validation completed.

Incident closed.

---

# 8. Commands Executed

Cluster

```bash
kubectl version

kubectl get nodes

kubectl get pods -A
```

Control Plane

```bash
kubectl get pods \
-n kube-system

kubectl describe pod
```

etcd

```bash
ETCDCTL_API=3 etcdctl endpoint health
```

Upgrade

```bash
kubeadm upgrade plan

kubeadm upgrade apply
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

Worker Nodes

Recovered

API Server

Recovered

etcd

Healthy

Root Issue

Unsupported upgrade sequence caused Control Plane instability.

---

# 10. Root Cause

The Kubernetes upgrade procedure skipped mandatory version compatibility validation.

The Control Plane was upgraded while several worker nodes were outside the supported version skew policy.

This caused controller instability and upgrade failure.

---

# 11. Resolution

Paused upgrade.

Rolled back Control Plane.

Validated etcd.

Verified version compatibility.

Performed upgrade using the supported sequence.

Validated workloads.

---

# 12. Validation

Cluster

```bash
kubectl get nodes

kubectl version

kubectl get pods -A
```

Business

- Deployments successful
- Applications healthy
- Autoscaling operational
- Argo CD synchronized

Monitoring

- API latency normal
- Control Plane healthy
- Upgrade alerts cleared

---

# 13. Rollback

If upgrade recovery fails

- Restore Control Plane snapshot.
- Restore etcd snapshot if required.
- Reinstall previous Kubernetes version.
- Rejoin worker nodes.
- Validate cluster functionality.

---

# 14. Customer Communication

Initial Update

> We are investigating an issue encountered during scheduled Kubernetes maintenance.

Progress Update

> The issue has been isolated to the cluster upgrade process. Recovery activities are underway.

Resolution

> The Kubernetes platform has been restored successfully. Planned upgrades will be rescheduled following additional validation.

---

# 15. Incident Timeline

```
10:15

Upgrade Started

↓

10:22

API Degradation

↓

10:28

Control Plane Investigation

↓

10:36

Version Analysis

↓

10:45

etcd Verified

↓

10:51

Root Cause

↓

11:00

Rollback

↓

11:24

Cluster Healthy

↓

11:37

Incident Closed
```

---

# 16. Root Cause Analysis (RCA)

## What Happened?

A planned Kubernetes upgrade failed.

## Why?

Supported upgrade sequence and version compatibility checks were not fully validated.

## Why wasn't it prevented?

The upgrade checklist was incomplete and lacked automated validation.

## Customer Impact

Production release activities were interrupted.

## Preventive Action

Implement mandatory pre-upgrade validation, version compatibility checks and automated maintenance runbooks.

---

# 17. Preventive Actions

- Validate Kubernetes version skew before upgrades.
- Run `kubeadm upgrade plan` before every upgrade.
- Test upgrades in staging.
- Verify etcd backup before maintenance.
- Automate upgrade checklists.
- Perform post-upgrade smoke testing.
- Schedule upgrades during approved maintenance windows.

---

# 18. Production Best Practices

- Always take an etcd snapshot before upgrading.
- Upgrade one supported version at a time.
- Never skip Kubernetes minor versions unless officially supported.
- Validate Control Plane before upgrading worker nodes.
- Keep rollback procedures documented.
- Perform production-like upgrade rehearsals.

---

# 19. Production Support Interview Questions

## Q1. How do you investigate a Kubernetes upgrade failure?

### Answer

1. Assess business impact.
2. Verify Control Plane health.
3. Review upgrade logs.
4. Check Kubernetes version compatibility.
5. Validate etcd health.
6. Review worker node versions.
7. Roll back if necessary.
8. Validate cluster functionality.
9. Resume upgrade using the supported sequence.
10. Complete RCA.

---

## Q2. Why is Kubernetes version skew important?

### Answer

Kubernetes officially supports only specific version differences between the Control Plane and worker nodes. Exceeding these limits can cause scheduling, controller and API failures.

---

## Q3. What should always be completed before upgrading Kubernetes?

### Answer

Take an etcd snapshot, validate backups, review version compatibility, execute `kubeadm upgrade plan`, test in staging, prepare rollback procedures and notify stakeholders.

---

# 20. Marathi Quick Revision

- Upgrade logs तपासा.
- Version compatibility verify करा.
- etcd health तपासा.
- Control Plane verify करा.
- Worker nodes तपासा.
- Rollback करा.
- Cluster validate करा.
- Business validation करा.
- RCA तयार करा.

---

# 21. Marathi Summary (5+ Experience Revision)

## Interview Summary

Production मध्ये Kubernetes Upgrade Failure आल्यास प्रथम business impact समजून घ्यावा. त्यानंतर Control Plane, API Server, worker node versions आणि etcd health verify करावी. Upgrade logs तपासून version compatibility validate करावी. आवश्यक असल्यास rollback करून cluster restore करावा. शेवटी business validation, monitoring validation आणि RCA पूर्ण करावी.

### Production Investigation Flow

```
Alert

↓

Upgrade Logs

↓

Control Plane

↓

API Server

↓

Worker Versions

↓

etcd Health

↓

Root Cause

↓

Rollback / Recovery

↓

Business Validation

↓

RCA
```

### Production Story

एका production Kubernetes cluster मध्ये quarterly platform upgrade दरम्यान Control Plane upgrade यशस्वी झाल्यासारखा दिसत होता, पण काही मिनिटांत scheduler आणि controller-manager सतत restart होऊ लागले. Investigation मध्ये काही worker nodes अजूनही supported version skew च्या बाहेर असल्याचे आढळले. Upgrade थांबवून Control Plane rollback करण्यात आला, cluster stabilize झाल्यावर योग्य upgrade sequence वापरून maintenance पुन्हा पूर्ण करण्यात आली. Incident नंतर automated pre-upgrade validation, version skew verification आणि mandatory staging rehearsal प्रत्येक upgrade साठी लागू करण्यात आले.

### 5+ Years Memory Trick

Interview मध्ये जर विचारले,

**"How do you troubleshoot a Kubernetes upgrade failure in production?"**

उत्तर:

"I first assess the business impact, verify Control Plane health, review upgrade logs, validate Kubernetes version compatibility, confirm etcd health, identify the upgrade failure point, perform rollback if required, validate cluster functionality, monitor stability, and complete the RCA."

