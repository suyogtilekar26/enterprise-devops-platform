# Kubernetes Interview Master Handbook

# Section 07 - Kubernetes Production Incidents & Troubleshooting

# Chapter 14 - Kubernetes Upgrade and Rollback

---

# Objective

Learn how to safely plan, execute, troubleshoot and recover from Kubernetes cluster upgrades and application rollbacks in production environments.

Cluster upgrades are high-risk operations because they impact the Control Plane, Worker Nodes and running workloads.

---

# Interview Scenario

Time: Sunday 01:00 AM

Scheduled Maintenance Window

During a Kubernetes upgrade

- New Pods fail to start
- Applications become unavailable
- Worker Nodes become NotReady
- API latency increases

You are the Platform Engineer responsible for the production upgrade.

Recover the cluster.

---

# What is a Kubernetes Upgrade?

A Kubernetes upgrade is the process of updating

- Kubernetes Version
- Control Plane
- Worker Nodes
- kubelet
- kube-proxy
- CNI
- CSI Drivers
- Add-ons

without impacting production workloads.

---

# Production Upgrade Strategy

Planning

↓

Compatibility Check

↓

Backup

↓

Upgrade Control Plane

↓

Validate

↓

Upgrade Worker Nodes

↓

Validate

↓

Upgrade Add-ons

↓

Smoke Testing

↓

Production Validation

---

# Common Upgrade Failures

API Server Failure

etcd Failure

Node NotReady

Version Compatibility Issue

CNI Failure

CSI Driver Failure

CoreDNS Failure

Certificate Issues

Deployment Failures

DaemonSet Failure

Helm Upgrade Failure

Application Compatibility Issue

---

# Pre-Upgrade Checklist

Cluster Healthy

Nodes Ready

Applications Healthy

etcd Backup Completed

Certificates Valid

Storage Healthy

Monitoring Healthy

Rollback Plan Ready

Maintenance Window Approved

Stakeholders Notified

---

# Step 1 - Verify Cluster

```bash
kubectl get nodes
```

---

# Step 2 - Verify Pods

```bash
kubectl get pods -A
```

---

# Step 3 - Verify Version

```bash
kubectl version
```

---

# Step 4 - Backup etcd

```bash
ETCDCTL_API=3 etcdctl snapshot save backup.db
```

---

# Step 5 - Drain Worker Node

```bash
kubectl drain worker-01 --ignore-daemonsets --delete-emptydir-data
```

---

# Step 6 - Upgrade Node

Upgrade

- kubeadm
- kubelet
- kubectl

Restart kubelet.

---

# Step 7 - Uncordon Node

```bash
kubectl uncordon worker-01
```

---

# Step 8 - Validate Node

```bash
kubectl get nodes
```

---

# Step 9 - Repeat

Upgrade remaining worker nodes one at a time.

---

# Investigation Flow

Upgrade

↓

Control Plane

↓

Worker Nodes

↓

Networking

↓

Storage

↓

Applications

↓

Validation

↓

Recovery

---

# Scenario 1

API Server Failure

Symptoms

kubectl unavailable.

Resolution

Recover API Server.

Verify etcd.

---

# Scenario 2

Worker Node NotReady

Cause

kubelet failed after upgrade.

Resolution

Restart kubelet.

Verify version compatibility.

---

# Scenario 3

CNI Failure

Pods cannot communicate.

Resolution

Upgrade compatible CNI version.

---

# Scenario 4

CSI Driver Failure

PersistentVolumes unavailable.

Resolution

Upgrade CSI Driver.

Verify StorageClasses.

---

# Scenario 5

CoreDNS Failure

DNS unavailable.

Resolution

Restart CoreDNS.

Verify compatibility.

---

# Scenario 6

Application Failure

New version incompatible with upgraded cluster.

Resolution

Rollback application deployment.

---

# Production Incident

Issue

After upgrading Kubernetes,

30% of applications become unavailable.

Investigation

Worker Nodes healthy.

Ingress healthy.

CoreDNS healthy.

Application Pods

CrashLoopBackOff.

Logs

Deprecated Kubernetes API removed.

Root Cause

Application using removed API version.

Resolution

Rollback application.

Upgrade manifests.

Deploy supported API version.

---

# Rollback Strategy

Application Rollback

↓

Node Rollback

↓

Control Plane Recovery

↓

Restore etcd Snapshot (Last Resort)

---

# Recovery Commands

Check Nodes

```bash
kubectl get nodes
```

---

Check Pods

```bash
kubectl get pods -A
```

---

Rollback Deployment

```bash
kubectl rollout undo deployment checkout
```

---

Check Rollout

```bash
kubectl rollout status deployment checkout
```

---

Restart Deployment

```bash
kubectl rollout restart deployment checkout
```

---

Restore etcd Snapshot

```bash
ETCDCTL_API=3 etcdctl snapshot restore backup.db
```

---

# Validation Checklist

Cluster Healthy

Nodes Ready

Pods Running

Networking Healthy

Storage Healthy

Ingress Healthy

Applications Healthy

Monitoring Healthy

Customer Transactions Successful

---

# RCA Template

Incident

Cluster Upgrade Failure

Root Cause

Application incompatible with upgraded Kubernetes API

Business Impact

Application outage

Detection

Upgrade Validation

Resolution

Application rollback

Preventive Action

Compatibility Testing

Upgrade Validation Pipeline

---

# Interview Questions

## Q1. What should you do before every Kubernetes upgrade?

Answer

Verify cluster health, take an etcd backup, review version compatibility, notify stakeholders and prepare a rollback plan.

---

## Q2. Why upgrade worker nodes one at a time?

Answer

To maintain application availability and reduce production risk by allowing workloads to move to healthy nodes.

---

## Q3. Which command safely removes workloads before upgrading a node?

Answer

```bash
kubectl drain <node-name> --ignore-daemonsets --delete-emptydir-data
```

---

## Q4. What is the final recovery option after a failed control plane upgrade?

Answer

Restore the etcd snapshot after verifying that other recovery methods cannot restore the cluster safely.

---

## Q5. How do you validate a successful upgrade?

Answer

Verify node health, application availability, networking, storage, monitoring dashboards and business transactions.

---

# Assignment

A production Kubernetes upgrade causes application failures.

Prepare

- Upgrade Investigation Plan
- Commands
- Root Cause Analysis
- Rollback Plan
- Recovery
- Validation
- Preventive Actions

---

# Assignment Solution

## Step 1

Verify cluster health.

---

## Step 2

Review

- Nodes
- Pods
- Control Plane
- Networking
- Storage

---

## Step 3

Identify upgrade failure.

---

## Step 4

Rollback affected application or cluster component.

---

## Step 5

Recover production.

---

## Step 6

Validate

- Cluster
- Applications
- Monitoring
- Business Transactions

---

## Step 7

Complete RCA.

---

# Production Best Practices

✔ Test Upgrades in Staging

✔ Read Release Notes

✔ Verify Version Compatibility

✔ Upgrade One Node at a Time

✔ Take etcd Snapshots

✔ Maintain Rollback Procedures

✔ Monitor During Upgrades

✔ Automate Smoke Tests

✔ Upgrade Add-ons Carefully

✔ Maintain Upgrade Runbooks

---

# Runbook Checklist

□ Maintenance Window Started

□ Cluster Health Verified

□ etcd Backup Completed

□ Control Plane Upgraded

□ Worker Nodes Upgraded

□ Applications Validated

□ Monitoring Verified

□ Rollback Tested

□ Recovery Completed

□ Validation Successful

□ RCA Completed

---

# Common Mistakes

❌ Upgrading Without Backup

❌ Upgrading All Nodes Simultaneously

❌ Ignoring Version Compatibility

❌ Skipping Staging Validation

❌ Not Testing Rollback

❌ Ignoring Add-on Compatibility

❌ Closing Change Without Validation

❌ Skipping RCA

