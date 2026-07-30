# Kubernetes Interview Master Handbook

# Architecture 09 - Kubernetes High Availability (HA) Architecture

---

# What is High Availability (HA)?

## English

High Availability ensures that the Kubernetes cluster continues to operate even if one or more components fail.

The goal is to eliminate single points of failure.

---

## मराठी

High Availability म्हणजे Cluster मधील एखादा Component बंद पडला तरी Cluster चालू राहणे.

मुख्य उद्देश म्हणजे Single Point of Failure टाळणे.

---

# Single Control Plane

Worker Nodes

↓

Single API Server

↓

Single etcd

Problem

If the Control Plane fails,

the entire cluster becomes unavailable.

---

# High Availability Architecture

Users

↓

Load Balancer

↓

API Server 1

↓

API Server 2

↓

API Server 3

↓

Shared etcd Cluster

↓

Worker Nodes

---

# Control Plane Components

API Server

Scheduler

Controller Manager

etcd

Load Balancer

---

# API Server HA

Multiple API Servers

↓

Load Balancer

↓

Client always connects to Virtual IP

If one API Server fails,

traffic moves to another API Server.

---

# Scheduler HA

Multiple Scheduler instances

↓

Leader Election

↓

Only one Scheduler is Active

Others remain Standby.

---

# Controller Manager HA

Multiple Controller Managers

↓

Leader Election

↓

Single Active Leader

Automatic Failover

---

# etcd Cluster

Recommended

3 Members

OR

5 Members

Always use

Odd Number

Reason

Quorum

---

# Quorum

3 Member Cluster

↓

Minimum

2 Healthy Members

Required

---

5 Member Cluster

↓

Minimum

3 Healthy Members

Required

---

# Raft Consensus

Every Write

↓

Majority Approval

↓

Stored in etcd

↓

Cluster State Updated

---

# Worker Node Failure

Worker Node

↓

NotReady

↓

Controller Manager Detects

↓

Pods Recreated

↓

Healthy Worker Node

---

# Control Plane Failure

API Server Down

↓

Load Balancer

↓

Routes Traffic

↓

Healthy API Server

↓

Cluster Continues

---

# Zone Awareness

Availability Zone A

↓

Control Plane

↓

Worker Nodes

---

Availability Zone B

↓

Control Plane

↓

Worker Nodes

---

Availability Zone C

↓

Control Plane

↓

Worker Nodes

---

# Disaster Recovery

Regular etcd Snapshots

↓

Store Securely

↓

Restore Cluster

↓

Validate Applications

---

# Backup Strategy

Daily etcd Snapshot

Weekly Restore Test

Certificate Backup

Manifest Backup

Infrastructure as Code

---

# Common HA Problems

Single Control Plane

Lost Quorum

Expired Certificates

API Server Failure

Load Balancer Failure

Network Partition

Disk Failure

---

# Troubleshooting Flow

Cluster Unavailable

↓

Load Balancer

↓

API Servers

↓

etcd Health

↓

Leader Election

↓

Certificates

↓

Worker Nodes

↓

Applications

---

# Production Incident

One API Server crashed.

Users continued accessing applications.

Reason

Load Balancer redirected traffic to healthy API Servers.

---

# Another Incident

Two etcd members failed

in a 3-member cluster.

Quorum lost.

API Server could not write cluster state.

Resolution

Recover failed etcd members.

Restore quorum.

---

# Best Practices

Deploy at least 3 Control Plane Nodes.

Use external Load Balancer.

Use odd number of etcd members.

Monitor etcd latency.

Take regular snapshots.

Test disaster recovery.

Monitor certificate expiry.

---

# Useful Commands

kubectl get nodes

---

kubectl get pods -n kube-system

---

kubectl cluster-info

---

ETCDCTL_API=3 etcdctl endpoint health

---

ETCDCTL_API=3 etcdctl member list

---

kubeadm certs check-expiration

---

# Interview Questions

Q1

Why should etcd have an odd number of members?

Answer

Because Raft Consensus requires a majority (quorum), and an odd number avoids split votes while maximizing fault tolerance.

---

Q2

What happens if one API Server fails in an HA cluster?

Answer

The Load Balancer routes requests to another healthy API Server.

---

Q3

What is Quorum?

Answer

Quorum is the minimum majority of healthy etcd members required for read/write consistency.

---

Q4

What is Leader Election?

Answer

Leader Election ensures only one Scheduler or Controller Manager actively performs cluster management tasks.

---

Q5

Why is a Load Balancer required?

Answer

It provides a single endpoint and distributes traffic across multiple API Servers.

---

# Scenario Based Interview

Question

Cluster has

3 etcd members.

Two members become unavailable.

What happens?

Answer

Quorum is lost.

The API Server cannot reliably persist cluster state, so cluster management operations fail until quorum is restored.

---

Question

One Control Plane Node crashes.

Will applications stop?

Answer

No.

If the cluster is configured for High Availability and the remaining Control Plane components are healthy, workloads continue running.

---

# Production Troubleshooting Checklist

✔ Load Balancer

✔ API Servers

✔ etcd Health

✔ Quorum

✔ Leader Election

✔ Certificates

✔ Worker Nodes

✔ kube-system Pods

✔ Disaster Recovery

✔ Backup Status

---

# Senior Engineer Notes

Always remember the HA architecture flow:

Users

↓

Load Balancer

↓

Multiple API Servers

↓

etcd Cluster

↓

Scheduler

↓

Controller Manager

↓

Worker Nodes

↓

Applications

Production Kubernetes clusters should never rely on a single Control Plane.

High Availability depends on proper quorum, healthy Control Plane components, reliable networking, and tested disaster recovery procedures.

