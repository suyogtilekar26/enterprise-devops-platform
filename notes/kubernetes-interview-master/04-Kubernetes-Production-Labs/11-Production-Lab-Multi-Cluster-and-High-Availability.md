# Kubernetes Interview Master Handbook

# Production Lab 11 - Multi-Cluster and High Availability

---

# Objective

Learn how enterprise Kubernetes clusters achieve High Availability and Disaster Recovery.

Topics

Multi-Cluster

HA Control Plane

Multi-Region

Global Load Balancer

Active-Active

Active-Passive

Failover

Recovery

---

# Production Scenario

A company serves millions of users globally.

Requirements

No Single Point of Failure

High Availability

Automatic Failover

Regional Disaster Recovery

Zero Data Loss (where possible)

---

# Enterprise Architecture

                Users
                   |
        Global Load Balancer
             /          \
      Region A         Region B
        |                 |
   Kubernetes        Kubernetes
     Cluster           Cluster
        |                 |
 Applications      Applications

---

# High Availability Control Plane

Load Balancer

↓

API Server-1

↓

API Server-2

↓

API Server-3

---

Scheduler

Multiple Instances

Leader Election

---

Controller Manager

Multiple Instances

Leader Election

---

etcd Cluster

3 Members

or

5 Members

Quorum Required

---

# Worker Nodes

Node-1

↓

Node-2

↓

Node-3

↓

Node-4

Applications distributed across Nodes.

---

# Active-Active

Region A

Serving Traffic

+

Region B

Serving Traffic

Advantages

Better latency

Automatic regional failover

Higher availability

---

# Active-Passive

Region A

Handles production traffic.

↓

Region B

Standby

↓

Activated only during disaster.

Advantages

Lower cost

Simpler architecture

---

# Failover Flow

Region A Failure

↓

Health Check Fails

↓

Global Load Balancer

↓

Traffic Shift

↓

Region B

↓

Users Continue Working

---

# Multi-Cluster Benefits

Fault Isolation

Independent Upgrades

Regional Compliance

Scalability

Improved Availability

Disaster Recovery

---

# Step 1

Verify Cluster Nodes

kubectl get nodes

---

# Step 2

Verify Control Plane

kubectl get componentstatuses

---

# Step 3

Verify etcd Health

ETCDCTL_API=3 etcdctl endpoint health

---

# Step 4

Simulate Worker Failure

kubectl drain NODE_NAME \
--ignore-daemonsets

---

Observe

Pods Rescheduled

Automatically

---

# Step 5

Simulate Region Failure

Region A

Unavailable

↓

Traffic

↓

Region B

---

Verify

Application remains available.

---

# Step 6

Restore Region A

Synchronize Data

↓

Health Checks Pass

↓

Traffic Restored

---

# Quorum

3 etcd Nodes

Need

2 Healthy

---

5 etcd Nodes

Need

3 Healthy

---

Without Quorum

Cluster Cannot Accept Writes

---

# Health Checks

Load Balancer

↓

API Server

↓

Application

↓

Database

↓

DNS

---

# Common Problems

API Server Down

etcd Quorum Lost

DNS Failure

Load Balancer Failure

Network Partition

Worker Node Failure

Certificate Expiry

---

# Troubleshooting Flow

Application Down

↓

DNS

↓

Load Balancer

↓

Ingress

↓

API Server

↓

etcd

↓

Nodes

↓

Pods

↓

Logs

---

# Production Incident

One availability zone failed.

Worker Nodes became unavailable.

Scheduler moved Pods to healthy Nodes.

Customers experienced no downtime.

---

# Another Incident

Entire Region A lost connectivity.

Global Load Balancer redirected traffic to Region B.

Business continued without interruption.

---

# Best Practices

Use odd-numbered etcd members.

Deploy multiple API Servers.

Distribute Workers across zones.

Use Multi-AZ clusters.

Test failover regularly.

Automate recovery.

Monitor health continuously.

Document DR procedures.

---

# Useful Commands

kubectl get nodes

---

kubectl get pods -A

---

kubectl drain NODE_NAME

---

kubectl uncordon NODE_NAME

---

kubectl cluster-info

---

ETCDCTL_API=3 etcdctl endpoint health

---

kubectl top nodes

---

kubectl get events

---

# Interview Questions

Q1

Why should the Kubernetes Control Plane be Highly Available?

Answer

To eliminate single points of failure and ensure continuous cluster management even if one control plane node fails.

---

Q2

What is etcd quorum?

Answer

A majority of etcd members must be healthy to allow writes and maintain cluster consistency.

---

Q3

Difference between Active-Active and Active-Passive?

Answer

Active-Active serves traffic from multiple regions simultaneously.

Active-Passive serves traffic from one region while another remains on standby.

---

Q4

Why deploy applications across multiple Availability Zones?

Answer

To improve fault tolerance and ensure workloads remain available during zone failures.

---

Q5

What happens when a worker node fails?

Answer

The Node becomes NotReady, and the scheduler reschedules affected Pods onto healthy nodes if sufficient capacity exists.

---

# Scenario Based Interview

Question

One API Server is down.

Should users experience downtime?

Answer

No.

The Load Balancer routes API requests to healthy API Servers, while leader election ensures scheduler and controller continuity.

---

Question

The etcd cluster loses quorum.

What is the impact?

Answer

The Kubernetes API cannot persist new state changes.

Existing running workloads may continue, but cluster management operations fail until quorum is restored.

---

# Production Checklist

✔ HA Control Plane

✔ Multiple API Servers

✔ etcd Quorum

✔ Multi-AZ Workers

✔ Global Load Balancer

✔ Health Checks

✔ Automatic Failover

✔ Disaster Recovery

✔ Monitoring

✔ Regular Failover Testing

---

# Assignment

Design an enterprise Kubernetes platform with

2 Regions

3 Control Plane Nodes per Cluster

3 etcd Members

Multiple Worker Nodes

Global Load Balancer

Active-Active deployment

Simulate

Worker Node failure

Availability Zone failure

Regional failure

Document

Architecture

Failover sequence

Recovery process

