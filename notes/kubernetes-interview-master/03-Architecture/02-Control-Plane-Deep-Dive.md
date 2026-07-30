# Kubernetes Interview Master Handbook

# Architecture 02 - Control Plane Deep Dive

---

# What is Control Plane?

## English

The Kubernetes Control Plane is the brain of the cluster.

It receives requests, validates them, stores the cluster state, schedules workloads, and continuously ensures that the actual state matches the desired state.

---

## मराठी

Control Plane म्हणजे Kubernetes Cluster चा Brain.

तो Requests स्वीकारतो, Validate करतो, Cluster State Store करतो आणि Pods योग्य Node वर Schedule करतो.

---

# Control Plane Components

1. API Server

2. etcd

3. Scheduler

4. Controller Manager

5. Cloud Controller Manager (Cloud Only)

---

# Complete Request Flow

Developer

↓

kubectl apply -f deployment.yaml

↓

API Server

↓

Authentication

↓

Authorization

↓

Admission Controllers

↓

Validation

↓

etcd

↓

Controller Manager

↓

Scheduler

↓

Worker Node

↓

kubelet

↓

Container Runtime

↓

Pod Running

---

# API Server

Purpose

Entry point of Kubernetes.

Every request reaches API Server first.

Responsibilities

Authentication

Authorization

Admission Control

Validation

REST API

Read / Write cluster state

Communicates with etcd

---

# Authentication

Question

Who are you?

Examples

Certificate

Token

OIDC

ServiceAccount

---

# Authorization

Question

Are you allowed?

Examples

RBAC

ABAC

Webhook

Node Authorization

---

# Admission Controllers

Purpose

Modify or reject objects before storing them.

Examples

Namespace Exists

ResourceQuota

LimitRange

PodSecurity

Mutating Admission

Validating Admission

---

# etcd

Purpose

Distributed Key-Value Store.

Stores

Deployments

Pods

Services

Secrets

ConfigMaps

Namespaces

Nodes

PersistentVolumes

Cluster Configuration

---

# etcd Characteristics

Strongly Consistent

Highly Available

Raft Consensus

Supports Snapshots

Supports Restore

---

# Scheduler

Purpose

Assign Pods to Worker Nodes.

Scheduling Factors

CPU

Memory

Node Affinity

Node Selector

Taints

Tolerations

Topology Spread

Pod Affinity

Pod Anti-Affinity

Resource Requests

---

# Scheduler Workflow

Pending Pod

↓

Find Candidate Nodes

↓

Filter Nodes

↓

Score Nodes

↓

Best Node Selected

↓

Bind Pod

---

# Controller Manager

Purpose

Maintains Desired State.

Controllers

Deployment Controller

ReplicaSet Controller

Node Controller

Namespace Controller

Job Controller

CronJob Controller

Endpoints Controller

ServiceAccount Controller

---

# Reconciliation Loop

Desired Replicas

3

↓

Actual Replicas

2

↓

Controller detects mismatch

↓

Creates one more Pod

↓

Desired State Restored

---

# Cloud Controller Manager

Available In

AWS EKS

Azure AKS

Google GKE

Responsibilities

Load Balancer

Cloud Routes

Persistent Disks

Cloud Nodes

---

# Leader Election

Scheduler

↓

One Active Leader

Others Standby

---

Controller Manager

↓

One Active Leader

Others Standby

Leader election prevents multiple components from performing the same task simultaneously.

---

# Failure Scenario

API Server Down

↓

kubectl Fails

↓

No New Deployments

↓

Existing Pods Continue Running

---

# Failure Scenario

Scheduler Down

↓

New Pods Stay Pending

↓

Existing Pods Continue Running

---

# Failure Scenario

Controller Manager Down

↓

Self-Healing Stops

↓

Replica Count Not Maintained

↓

Node Monitoring Stops

---

# Failure Scenario

etcd Down

↓

Cluster State Unavailable

↓

API Server Cannot Persist Changes

↓

Management Operations Fail

---

# Best Practices

Deploy Highly Available Control Plane.

Use odd number of etcd members.

Monitor API Server latency.

Take regular etcd snapshots.

Monitor Scheduler latency.

Monitor Controller Manager health.

---

# Useful Commands

kubectl cluster-info

---

kubectl get pods -n kube-system

---

kubectl logs -n kube-system kube-apiserver-NODE

---

kubectl logs -n kube-system kube-scheduler-NODE

---

kubectl logs -n kube-system kube-controller-manager-NODE

---

ETCDCTL_API=3 etcdctl endpoint health

---

kubeadm certs check-expiration

---

# Interview Questions

Q1

What happens when you execute

kubectl apply?

Answer

The request reaches the API Server, is authenticated, authorized, validated, stored in etcd, reconciled by the Controller Manager, scheduled by the Scheduler, and finally executed by kubelet on a Worker Node.

---

Q2

Why is etcd considered the heart of Kubernetes?

Answer

Because it stores the complete cluster state required by the Control Plane.

---

Q3

Can Kubernetes run without Scheduler?

Answer

Existing Pods continue running, but new Pods remain Pending because they cannot be assigned to a node.

---

Q4

What is the Reconciliation Loop?

Answer

The Controller Manager continuously compares the desired state with the actual state and takes corrective actions when they differ.

---

Q5

What is Leader Election?

Answer

Leader Election ensures that only one instance of components such as the Scheduler or Controller Manager is active at a time in a highly available Control Plane.

---

# Scenario Based Interview

Question

Pods are continuously staying in Pending state.

How will you troubleshoot?

Answer

1. Check Scheduler health.

2. Check Node resources.

3. Check taints and tolerations.

4. Check Events.

5. Check Scheduler logs.

---

Question

Deployment shows

3 replicas desired

2 replicas running.

What component is responsible?

Answer

The Controller Manager detects the mismatch and creates another Pod.

---

# Production Troubleshooting Checklist

✔ API Server Healthy

✔ Authentication

✔ Authorization

✔ Admission Controllers

✔ etcd Healthy

✔ Scheduler Healthy

✔ Controller Manager Healthy

✔ Leader Election

✔ kube-system Pods

✔ Events

---

# Senior Engineer Notes

Remember the Control Plane request flow:

User

↓

API Server

↓

Authentication

↓

Authorization

↓

Admission Controllers

↓

Validation

↓

etcd

↓

Controller Manager

↓

Scheduler

↓

Worker Node

↓

kubelet

↓

Container Runtime

↓

Pod Running

If you can confidently explain this end-to-end flow in an interview, it demonstrates a strong understanding of Kubernetes internals.

