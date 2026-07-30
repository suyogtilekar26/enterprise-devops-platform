# Kubernetes Interview Master Handbook

# Architecture 13 - Kubernetes Controllers Architecture

---

# What are Kubernetes Controllers?

## English

Controllers continuously monitor the current state of the cluster and compare it with the desired state.

If any difference is detected, controllers automatically take corrective action.

---

## मराठी

Controller सतत Cluster ची Current State आणि Desired State compare करतो.

दोन्हीमध्ये फरक आढळल्यास तो आपोआप Cluster पुन्हा Desired State मध्ये आणतो.

---

# Controller Pattern

Desired State

↓

API Server

↓

etcd

↓

Controller Watches

↓

Current State

↓

Difference Found

↓

Take Action

↓

Desired State Achieved

---

# Reconciliation Loop

Watch

↓

Compare

↓

Detect Difference

↓

Take Action

↓

Verify

↓

Repeat Forever

---

# Why Controllers Exist?

Without Controllers

↓

Manual Monitoring

↓

Manual Recovery

↓

Human Errors

---

With Controllers

↓

Automatic Detection

↓

Automatic Recovery

↓

Self-Healing Cluster

---

# Deployment Controller

Purpose

Maintains desired number of ReplicaSets.

Supports

Rolling Update

Rollback

Scaling

---

# Deployment Flow

Deployment

↓

ReplicaSet

↓

Pods

↓

Running Application

---

# ReplicaSet Controller

Purpose

Maintains required number of Pods.

Example

Desired = 5

Current = 3

↓

Creates 2 New Pods

---

Desired = 5

Current = 7

↓

Deletes 2 Pods

---

# StatefulSet Controller

Purpose

Maintains ordered Pods.

Provides

Stable Identity

Persistent Storage

Ordered Deployment

Ordered Deletion

Examples

MySQL

PostgreSQL

Kafka

ZooKeeper

---

# DaemonSet Controller

Purpose

Runs one Pod on every Node.

Examples

Fluentd

Prometheus Node Exporter

Security Agents

CNI Plugins

---

# Job Controller

Purpose

Runs workload once.

When completed

Pod exits successfully.

Examples

Backup

Migration

Report Generation

---

# CronJob Controller

Purpose

Runs Jobs on schedule.

Examples

Nightly Backup

Database Cleanup

Report Generation

---

# Horizontal Pod Autoscaler (HPA)

Purpose

Automatically scales Pods.

Metrics

CPU

Memory

Custom Metrics

Flow

High CPU

↓

Increase Replicas

↓

Load Balanced

---

# Vertical Pod Autoscaler (VPA)

Purpose

Automatically adjusts CPU and Memory.

Useful for

Long-running workloads.

---

# Cluster Autoscaler

Purpose

Automatically adds or removes Worker Nodes.

Scenario

Pending Pods

↓

No Resources

↓

New Node Added

---

Unused Nodes

↓

Scale Down

---

# Controller Manager

Contains

Deployment Controller

ReplicaSet Controller

Job Controller

StatefulSet Controller

DaemonSet Controller

Node Controller

Namespace Controller

ServiceAccount Controller

PV Controller

PVC Controller

Many more...

---

# Complete Controller Workflow

kubectl apply

↓

API Server

↓

etcd

↓

Controller Detects

↓

Reconciliation Loop

↓

ReplicaSet

↓

Pods

↓

Running

---

# Common Controller Problems

Replica mismatch

Failed Rollout

Pods Pending

CrashLoopBackOff

HPA not Scaling

StatefulSet Stuck

DaemonSet Missing Pods

CronJob Not Running

---

# Troubleshooting Flow

Application Down

↓

Deployment

↓

ReplicaSet

↓

Pods

↓

Events

↓

Controller Logs

↓

Scheduler

↓

Node

↓

Application

---

# Production Incident

Developer accidentally deleted two Pods.

Within seconds

ReplicaSet created two new Pods.

Reason

Reconciliation Loop.

---

# Another Incident

Deployment desired replicas = 10

Current replicas = 6

Reason

Insufficient Node Resources.

Scheduler could not place remaining Pods.

---

# Best Practices

Use Deployments for stateless workloads.

Use StatefulSets for databases.

Use DaemonSets for node agents.

Use Jobs for one-time tasks.

Use CronJobs for scheduled tasks.

Monitor HPA behavior.

Enable Cluster Autoscaler in production.

---

# Useful Commands

kubectl get deployments

---

kubectl get replicasets

---

kubectl get daemonsets

---

kubectl get statefulsets

---

kubectl get jobs

---

kubectl get cronjobs

---

kubectl get hpa

---

kubectl describe deployment DEPLOYMENT_NAME

---

kubectl rollout status deployment DEPLOYMENT_NAME

---

kubectl rollout history deployment DEPLOYMENT_NAME

---

# Interview Questions

Q1

What is the Reconciliation Loop?

Answer

Controllers continuously compare the current cluster state with the desired state and automatically correct any differences.

---

Q2

Difference between Deployment and ReplicaSet?

Answer

Deployment manages ReplicaSets and supports rolling updates and rollbacks.

ReplicaSet only maintains the desired number of Pods.

---

Q3

When should StatefulSet be used?

Answer

For stateful applications requiring stable identities and persistent storage.

---

Q4

Why use DaemonSet?

Answer

To ensure exactly one Pod runs on every eligible Worker Node.

---

Q5

Difference between HPA and Cluster Autoscaler?

Answer

HPA scales Pods.

Cluster Autoscaler scales Worker Nodes.

---

# Scenario Based Interview

Question

A Pod was manually deleted.

Why did it immediately come back?

Answer

The ReplicaSet Controller detected that the current number of Pods was lower than the desired state and created a replacement Pod.

---

Question

Deployment shows

Desired = 8

Available = 5

How will you troubleshoot?

Answer

1. Check ReplicaSet.

2. Check Pod Events.

3. Verify Scheduler.

4. Check Node Resources.

5. Check Image Pull and Readiness Probe.

---

# Production Troubleshooting Checklist

✔ Deployment

✔ ReplicaSet

✔ Pods

✔ Rollout Status

✔ Events

✔ Scheduler

✔ Node Resources

✔ Controller Manager

✔ HPA

✔ Cluster Autoscaler

---

# Senior Engineer Notes

Always remember the Controller workflow:

Desired State

↓

API Server

↓

etcd

↓

Controller Watches

↓

Reconciliation Loop

↓

Corrective Action

↓

Desired State Restored

The Reconciliation Loop is the foundation of Kubernetes. Nearly every Kubernetes resource is managed by a controller that continuously works to maintain the desired state automatically.

