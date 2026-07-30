# Kubernetes Interview Master Handbook

# Production Incident 15 - etcd & Control Plane Issues

---

# Incident

Users report

Applications are down.

kubectl commands fail.

New Pods cannot be created.

Cluster appears unhealthy.

Reason

Control Plane Failure.

---

# What is the Control Plane?

## English

The Kubernetes Control Plane manages the entire cluster.

Every Kubernetes operation passes through the Control Plane.

Components

API Server

etcd

Scheduler

Controller Manager

Cloud Controller Manager (Cloud Clusters)

---

## मराठी

Control Plane म्हणजे Kubernetes Cluster चा Brain.

संपूर्ण Cluster याच्यावर अवलंबून असतो.

---

# Control Plane Architecture

User

↓

kubectl

↓

API Server

↓

etcd

↓

Scheduler

↓

Controller Manager

↓

Worker Nodes

↓

Pods

---

# API Server

Responsibilities

Receives kubectl requests

Authentication

Authorization

Validation

Stores objects in etcd

Exposes Kubernetes API

---

# etcd

Distributed Key-Value Database

Stores

Pods

Deployments

Secrets

Namespaces

Nodes

Services

Everything in Kubernetes.

Without etcd

Cluster State is lost.

---

# Scheduler

Assigns Pods to Worker Nodes.

Uses

Resources

Affinity

Taints

Topology

Policies

---

# Controller Manager

Continuously compares

Desired State

↓

Actual State

Creates

Pods

ReplicaSets

Deployments

Jobs

Namespaces

---

# Common Problems

API Server Down

etcd Corruption

Certificate Expired

Scheduler Failure

Controller Manager Failure

Leader Election Failure

Disk Full

Network Partition

---

# Step 1

Check Cluster

kubectl cluster-info

If unreachable

API Server may be unavailable.

---

# Step 2

Check Nodes

kubectl get nodes

If command fails

Check API Server.

---

# Step 3

Check Control Plane Pods

kubectl get pods -n kube-system

Verify

kube-apiserver

etcd

kube-scheduler

kube-controller-manager

CoreDNS

---

# Step 4

Check API Server Logs

kubectl logs -n kube-system kube-apiserver-NODE

Look for

Authentication Errors

Storage Errors

Certificate Errors

---

# Step 5

Check etcd

ETCDCTL_API=3 etcdctl endpoint health

Healthy

healthy

Problem

unhealthy

---

# Step 6

Check Scheduler

kubectl logs -n kube-system kube-scheduler-NODE

Look for

Scheduling Errors

Leader Election

Resource Errors

---

# Step 7

Check Controller Manager

kubectl logs -n kube-system kube-controller-manager-NODE

Look for

Reconciliation Failures

Leader Election

API Errors

---

# Step 8

Check Certificates

kubeadm certs check-expiration

Expired certificates may stop cluster communication.

---

# Step 9

Check Disk

df -h

etcd requires healthy disk space.

---

# Troubleshooting Flow

kubectl Fails

↓

API Server Healthy?

↓

etcd Healthy?

↓

Certificates Valid?

↓

Scheduler Healthy?

↓

Controller Manager Healthy?

↓

Worker Nodes Healthy?

↓

Cluster Restored

---

# etcd Backup

Example

ETCDCTL_API=3 etcdctl snapshot save backup.db

Take regular backups.

---

# etcd Restore

Example

ETCDCTL_API=3 etcdctl snapshot restore backup.db

Always test restore procedures before production use.

---

# Production Incident

Disk became full.

etcd stopped writing data.

API Server returned errors.

No deployments could be created.

Resolution

Clean disk.

Restart etcd.

Verify API Server.

---

# Another Incident

Kubernetes certificates expired.

kubectl stopped working.

Nodes became NotReady.

Resolution

Renew certificates.

Restart Control Plane components.

---

# Best Practices

Take regular etcd backups.

Monitor certificate expiry.

Monitor disk usage.

Use Highly Available Control Plane.

Test disaster recovery procedures.

Never ignore Control Plane alerts.

---

# Useful Commands

kubectl cluster-info

---

kubectl get componentstatuses

(Note: Deprecated in newer Kubernetes versions.
Prefer checking individual control plane components.)

---

kubectl get pods -n kube-system

---

kubectl logs -n kube-system kube-apiserver-NODE

---

kubectl logs -n kube-system kube-scheduler-NODE

---

kubectl logs -n kube-system kube-controller-manager-NODE

---

kubeadm certs check-expiration

---

ETCDCTL_API=3 etcdctl endpoint health

---

ETCDCTL_API=3 etcdctl snapshot save backup.db

---

# Interview Questions

Q1

What is etcd?

Answer

etcd is Kubernetes' distributed key-value database that stores the complete cluster state.

---

Q2

What happens if etcd is unavailable?

Answer

The API Server cannot reliably read or write cluster state.

Cluster management operations fail.

---

Q3

What is the responsibility of the Scheduler?

Answer

The Scheduler assigns Pods to suitable Worker Nodes.

---

Q4

Why are etcd backups important?

Answer

They allow cluster state recovery after corruption or failure.

---

Q5

How do you check certificate expiry?

Answer

kubeadm certs check-expiration

---

# Scenario Based Interview

Question

kubectl get pods

returns

connection refused

How will you troubleshoot?

Answer

1. Verify API Server.

2. Check Control Plane Pods.

3. Check API Server logs.

4. Verify etcd health.

5. Verify certificates.

6. Verify node connectivity.

---

Question

New Pods are not scheduling.

Existing Pods are Running.

What will you check?

Answer

1. Scheduler logs.

2. Node status.

3. Resource availability.

4. Scheduler leader election.

5. Events.

---

# Production Troubleshooting Checklist

✔ kubectl cluster-info

✔ kubectl get nodes

✔ kubectl get pods -n kube-system

✔ Verify API Server

✔ Verify etcd

✔ Verify Scheduler

✔ Verify Controller Manager

✔ Verify Certificates

✔ Verify Disk Space

✔ Verify etcd Backup

---

# Senior Engineer Notes

Always troubleshoot the Control Plane before debugging workloads.

The investigation order should be:

API Server

↓

etcd

↓

Scheduler

↓

Controller Manager

↓

Worker Nodes

↓

Pods

Production clusters should use:

Highly Available Control Plane

Regular etcd backups

Certificate monitoring

Disaster recovery testing

Continuous health monitoring

