# Kubernetes Interview Master Handbook

# Architecture 01 - Kubernetes Architecture

---

# What is Kubernetes Architecture?

## English

Kubernetes Architecture defines how all cluster components work together to deploy, schedule, manage and recover containerized applications.

The architecture is divided into two major parts:

1. Control Plane
2. Worker Nodes

---

## मराठी

Kubernetes Architecture म्हणजे Cluster मधील सर्व Components एकत्र येऊन Applications कशा चालवतात याची रचना.

Cluster चे दोन मुख्य भाग असतात.

1. Control Plane
2. Worker Nodes

---

# High Level Architecture

                User
                  |
             kubectl / API
                  |
          +------------------+
          |   API Server     |
          +------------------+
                  |
        -------------------------
        |          |            |
      etcd     Scheduler   Controller
        |
   Cluster State
        |
==============================
        |
     Worker Nodes
        |
+-----------------------------+
| kubelet                     |
| kube-proxy                  |
| Container Runtime           |
| Pods                        |
+-----------------------------+

---

# Control Plane Components

API Server

Acts as the entry point.

Every kubectl command reaches the API Server first.

Responsibilities

Authentication

Authorization

Validation

REST API

Stores cluster state into etcd.

---

etcd

Distributed Key-Value Database.

Stores

Pods

Deployments

Secrets

Services

ConfigMaps

Namespaces

Cluster State

---

Scheduler

Chooses the best Worker Node for every new Pod.

Scheduling Factors

CPU

Memory

Node Affinity

Taints

Topology

Policies

---

Controller Manager

Continuously compares

Desired State

↓

Actual State

Creates or deletes resources to match the desired state.

Controllers

Deployment

ReplicaSet

Node

Namespace

Job

Endpoints

ServiceAccount

---

Cloud Controller Manager

Available in managed cloud environments.

Examples

AWS EKS

Azure AKS

Google GKE

Responsible for

Load Balancer

Cloud Routes

Cloud Volumes

Cloud Nodes

---

# Worker Node Components

Kubelet

Node Agent.

Communicates with API Server.

Starts and monitors Pods.

Reports Node Health.

---

Container Runtime

Runs Containers.

Examples

containerd

CRI-O

Docker (legacy environments)

---

kube-proxy

Implements Kubernetes Services.

Maintains networking rules.

Handles ClusterIP communication.

---

Pods

Smallest deployable unit.

One or more containers.

Shared

Network

Storage

Namespace

---

# Request Flow

Developer

↓

kubectl apply

↓

API Server

↓

etcd

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

# Self-Healing Flow

Pod Crashes

↓

Kubelet Reports

↓

Controller Manager Detects

↓

Scheduler Selects Node

↓

New Pod Created

---

# Scaling Flow

kubectl scale

↓

API Server

↓

Deployment Updated

↓

ReplicaSet Updated

↓

Controller Manager

↓

New Pods Created

---

# Why Control Plane is called the Brain?

Because it

Stores State

Schedules Pods

Manages Controllers

Processes Requests

Maintains Cluster Health

---

# Best Practices

Deploy Highly Available Control Plane.

Protect etcd.

Take regular etcd backups.

Monitor API Server latency.

Monitor Scheduler performance.

Separate Worker and Control Plane nodes.

---

# Useful Commands

kubectl cluster-info

---

kubectl get nodes

---

kubectl get pods -n kube-system

---

kubectl get componentstatuses

(Note: Deprecated in newer Kubernetes versions.)

---

kubectl get pods -A

---

# Interview Questions

Q1

What are the two major parts of Kubernetes Architecture?

Answer

Control Plane and Worker Nodes.

---

Q2

Which component stores the cluster state?

Answer

etcd.

---

Q3

Which component schedules Pods?

Answer

Scheduler.

---

Q4

What is the responsibility of kubelet?

Answer

kubelet runs on every Worker Node, communicates with the API Server, starts Pods and reports node health.

---

Q5

What is kube-proxy responsible for?

Answer

It manages Kubernetes Service networking and forwards traffic to Pods.

---

# Scenario Based Interview

Question

Pods are not getting created after Deployment.

How will you troubleshoot?

Answer

1. Check API Server.

2. Check Scheduler.

3. Check Controller Manager.

4. Check Node status.

5. Check Events.

---

Question

Node is Ready but Pods are not starting.

What will you check?

Answer

1. kubelet

2. Container Runtime

3. Image Pull

4. Events

5. Node Resources

---

# Production Troubleshooting Checklist

✔ API Server

✔ etcd

✔ Scheduler

✔ Controller Manager

✔ kubelet

✔ kube-proxy

✔ Container Runtime

✔ Worker Node

✔ Events

✔ Pod Logs

---

# Senior Engineer Notes

Think of Kubernetes Architecture in this sequence:

User

↓

API Server

↓

etcd

↓

Scheduler

↓

Controller Manager

↓

Worker Node

↓

kubelet

↓

Container Runtime

↓

Pod

This end-to-end flow is one of the most common architecture questions in Kubernetes interviews.

