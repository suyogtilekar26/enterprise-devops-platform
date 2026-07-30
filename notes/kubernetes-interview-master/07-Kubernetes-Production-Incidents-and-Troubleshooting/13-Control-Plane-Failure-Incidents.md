# Kubernetes Interview Master Handbook

# Section 07 - Kubernetes Production Incidents & Troubleshooting

# Chapter 13 - Control Plane Failure Incidents

---

# Objective

Learn how to investigate, troubleshoot, recover and permanently prevent Kubernetes Control Plane failures in production environments.

Control Plane failures are SEV-1 incidents because they affect cluster management, scheduling and overall platform availability.

---

# Interview Scenario

Time: 03:20 AM

PagerDuty Alert

"Kubernetes Control Plane Unavailable"

Impact

- kubectl commands fail.
- New Pods cannot be scheduled.
- Deployments fail.
- Autoscaling stops.
- Platform teams cannot manage the cluster.

You are the on-call SRE.

Restore the Kubernetes Control Plane immediately.

---

# What is the Control Plane?

The Kubernetes Control Plane manages the entire cluster.

It consists of

- kube-apiserver
- etcd
- kube-scheduler
- kube-controller-manager
- cloud-controller-manager (Cloud Clusters)

---

# Control Plane Workflow

kubectl

↓

API Server

↓

Authentication

↓

Authorization

↓

Admission Controllers

↓

etcd

↓

Scheduler

↓

Controller Manager

↓

Worker Nodes

---

# Common Root Causes

API Server Failure

etcd Failure

Scheduler Failure

Controller Manager Failure

Certificate Expired

Disk Full

Memory Exhaustion

Network Partition

Load Balancer Failure

Cloud Infrastructure Failure

Configuration Changes

Control Plane Upgrade Failure

---

# Step 1 - Verify Cluster

```bash
kubectl cluster-info
```

If unreachable

Continue investigation.

---

# Step 2 - Verify Nodes

```bash
kubectl get nodes
```

If command fails

API Server may be unavailable.

---

# Step 3 - SSH to Control Plane

```bash
ssh master-01
```

---

# Step 4 - Verify Static Pods

```bash
crictl ps
```

Expected

- kube-apiserver
- etcd
- kube-scheduler
- kube-controller-manager

Running

---

# Step 5 - Verify API Server

```bash
crictl logs <api-server-container-id>
```

Look for

- TLS Errors
- Authentication Errors
- etcd Connection Errors
- Startup Failures

---

# Step 6 - Verify etcd

```bash
ETCDCTL_API=3 etcdctl endpoint health
```

---

# Step 7 - Verify Scheduler

```bash
crictl logs <scheduler-container-id>
```

---

# Step 8 - Verify Controller Manager

```bash
crictl logs <controller-manager-container-id>
```

---

# Step 9 - Verify Certificates

```bash
kubeadm certs check-expiration
```

---

# Step 10 - Verify Disk

```bash
df -h
```

---

# Step 11 - Verify Memory

```bash
free -h
```

---

# Step 12 - Verify Events

```bash
journalctl -xe
```

---

# Investigation Flow

API Server

↓

etcd

↓

Scheduler

↓

Controller Manager

↓

Certificates

↓

Disk

↓

Memory

↓

Recovery

---

# Scenario 1

API Server Down

Logs

```text
connection refused
```

Resolution

Restart API Server.

Verify manifest.

---

# Scenario 2

etcd Failure

API Server logs

```text
failed to connect to etcd
```

Resolution

Recover etcd.

Restore quorum.

---

# Scenario 3

Certificate Expired

Logs

```text
certificate expired
```

Resolution

Renew certificates.

Restart control plane.

---

# Scenario 4

Disk Full

Filesystem

100%

Resolution

Free disk space.

Restart affected component.

---

# Scenario 5

Scheduler Failure

Pods remain Pending.

Resolution

Restart Scheduler.

Verify logs.

---

# Scenario 6

Controller Manager Failure

ReplicaSets stop updating.

Node lifecycle stops.

Resolution

Restart Controller Manager.

---

# Production Incident

Issue

Entire cluster unavailable.

Investigation

API Server unreachable.

SSH successful.

API Server logs

```text
failed to connect to etcd
```

etcd

Unhealthy.

Root Cause

Disk full on etcd node.

Resolution

Free disk space.

Compact etcd.

Restart API Server.

Cluster recovered.

---

# Recovery Commands

Check Static Pods

```bash
crictl ps
```

---

Restart kubelet

```bash
sudo systemctl restart kubelet
```

---

Check API Server Logs

```bash
crictl logs <api-server-container-id>
```

---

Check etcd Health

```bash
ETCDCTL_API=3 etcdctl endpoint health
```

---

Check Certificates

```bash
kubeadm certs check-expiration
```

---

Restart Control Plane Components

Automatically handled after kubelet detects updated static pod manifests.

---

# Validation Checklist

API Server Healthy

etcd Healthy

Scheduler Running

Controller Manager Running

Nodes Ready

kubectl Working

Deployments Successful

Applications Healthy

---

# RCA Template

Incident

Control Plane Failure

Root Cause

etcd Disk Full

Business Impact

Cluster Management Unavailable

Detection

API Server Alert

Resolution

Recovered etcd

Restarted API Server

Preventive Action

Disk Monitoring

Certificate Monitoring

Control Plane Health Checks

---

# Interview Questions

## Q1. What are the Control Plane components?

Answer

API Server, etcd, Scheduler, Controller Manager and Cloud Controller Manager (cloud environments).

---

## Q2. Which component is the entry point for every Kubernetes request?

Answer

kube-apiserver.

---

## Q3. Which command verifies certificate expiry?

Answer

```bash
kubeadm certs check-expiration
```

---

## Q4. What happens if the Scheduler fails?

Answer

Existing Pods continue running, but new Pods cannot be scheduled onto worker nodes.

---

## Q5. How do you troubleshoot a Control Plane failure?

Answer

Verify API Server, etcd, Scheduler, Controller Manager, certificates, logs, disk, memory and network before identifying the root cause.

---

# Assignment

The Kubernetes Control Plane becomes unavailable during production hours.

Prepare

- Investigation Plan
- Commands
- Evidence Collection
- Root Cause Analysis
- Recovery
- Validation
- Preventive Actions

---

# Assignment Solution

## Step 1

Verify API Server.

---

## Step 2

SSH into Control Plane.

---

## Step 3

Verify

- API Server
- etcd
- Scheduler
- Controller Manager
- Certificates

---

## Step 4

Review

- Logs
- Disk
- Memory
- Events

---

## Step 5

Recover affected component.

---

## Step 6

Validate

- kubectl
- Nodes
- Deployments
- Applications

---

## Step 7

Complete RCA.

---

# Production Best Practices

✔ Deploy Highly Available Control Planes

✔ Monitor API Server Health

✔ Monitor etcd Health

✔ Monitor Scheduler

✔ Monitor Controller Manager

✔ Monitor Certificate Expiry

✔ Monitor Disk Usage

✔ Test Control Plane Recovery

✔ Automate Snapshots

✔ Maintain Recovery Runbooks

---

# Runbook Checklist

□ API Server Verified

□ etcd Verified

□ Scheduler Verified

□ Controller Manager Verified

□ Certificates Verified

□ Logs Reviewed

□ Disk Checked

□ Memory Checked

□ Root Cause Confirmed

□ Recovery Completed

□ Validation Successful

□ RCA Completed

---

# Common Mistakes

❌ Restarting Everything Without Investigation

❌ Ignoring etcd Health

❌ Ignoring Certificate Expiry

❌ Ignoring Static Pod Logs

❌ Not Monitoring Disk Usage

❌ Skipping Validation

❌ Closing Incident Without RCA

❌ No Recovery Testing

