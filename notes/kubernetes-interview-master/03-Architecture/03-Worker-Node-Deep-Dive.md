# Kubernetes Interview Master Handbook

# Architecture 03 - Worker Node Deep Dive

---

# What is a Worker Node?

## English

A Worker Node is the machine where application Pods actually run.

The Control Plane manages the cluster, while Worker Nodes execute workloads.

---

## मराठी

Worker Node म्हणजे जिथे आपले Application Pods प्रत्यक्षात चालतात.

Control Plane निर्णय घेतो आणि Worker Node तो निर्णय execute करतो.

---

# Worker Node Components

1. kubelet

2. kube-proxy

3. Container Runtime

4. CNI Plugin

5. CSI Plugin (Optional)

6. Pods

---

# Worker Node Architecture

Control Plane

↓

API Server

↓

kubelet

↓

Container Runtime

↓

Pod

↓

Application

---

Network

↓

kube-proxy

↓

CNI

↓

Pod Network

---

Storage

↓

CSI

↓

Persistent Volume

---

# kubelet

Purpose

Node Agent.

Runs on every Worker Node.

Responsible for creating and monitoring Pods.

---

# kubelet Responsibilities

Registers Node with API Server.

Receives Pod specifications.

Starts Containers.

Monitors Pod health.

Reports Node status.

Runs Liveness and Readiness probes.

Mounts Volumes.

Collects Node information.

---

# kubelet Workflow

API Server

↓

Pod Spec

↓

kubelet

↓

Container Runtime

↓

Container Created

↓

Health Checks

↓

Status Report

↓

API Server

---

# Container Runtime

Purpose

Runs Containers.

Implements the CRI (Container Runtime Interface).

Examples

containerd

CRI-O

Docker (legacy)

---

# Container Runtime Responsibilities

Pull Images

Create Containers

Start Containers

Stop Containers

Delete Containers

Report Container Status

---

# kube-proxy

Purpose

Implements Kubernetes Services.

Routes traffic to Pods.

Maintains Service networking.

---

# kube-proxy Modes

iptables

Most Common

Kernel Firewall Rules

---

IPVS

High Performance

Better Scalability

Large Production Clusters

---

# Service Traffic Flow

Client

↓

Service

↓

kube-proxy

↓

Pod

↓

Application

---

# CNI (Container Network Interface)

Purpose

Provides Pod Networking.

Assigns Pod IP addresses.

Enables Pod-to-Pod communication.

---

# Popular CNI Plugins

Calico

Cilium

Flannel

Weave

Antrea

---

# CSI (Container Storage Interface)

Purpose

Connects Kubernetes with storage systems.

Examples

AWS EBS CSI

Azure Disk CSI

GCE PD CSI

Ceph CSI

NFS CSI

---

# Pod Lifecycle on Worker Node

Scheduler selects Node

↓

API Server stores Pod

↓

kubelet receives Pod Spec

↓

Container Runtime pulls Image

↓

Volumes Mounted

↓

Network Configured

↓

Container Started

↓

Readiness Probe

↓

Service Receives Traffic

---

# Node Registration

Worker Node Starts

↓

kubelet Starts

↓

Registers with API Server

↓

Node Appears

kubectl get nodes

↓

Ready

---

# Common Worker Node Problems

kubelet Down

Container Runtime Down

Disk Full

Memory Pressure

CPU Pressure

Image Pull Failure

Network Failure

CNI Failure

CSI Failure

---

# Troubleshooting Flow

Pod Not Running

↓

Node Ready?

↓

kubelet Running?

↓

Container Runtime Running?

↓

Image Pulled?

↓

Volumes Mounted?

↓

Network Ready?

↓

Pod Started

---

# Production Incident

Node became

NotReady

Reason

kubelet service stopped.

Resolution

Restart kubelet.

Verify node status.

---

# Another Incident

Pod stuck in

ContainerCreating

Reason

CNI plugin failed.

Resolution

Check CNI logs.

Restart networking components.

---

# Another Incident

Container cannot start.

Reason

containerd service stopped.

Resolution

Restart container runtime.

Verify kubelet.

---

# Best Practices

Monitor kubelet.

Monitor container runtime.

Use IPVS for large clusters.

Monitor disk usage.

Monitor node resources.

Keep CNI plugins updated.

Use CSI drivers supported by cloud provider.

---

# Useful Commands

kubectl get nodes

---

kubectl describe node NODE_NAME

---

kubectl get pods -o wide

---

systemctl status kubelet

---

systemctl status containerd

---

journalctl -u kubelet

---

crictl ps

---

crictl images

---

crictl logs CONTAINER_ID

---

# Interview Questions

Q1

What is kubelet?

Answer

kubelet is the node agent that communicates with the API Server and manages Pods on the Worker Node.

---

Q2

What is kube-proxy?

Answer

kube-proxy manages Kubernetes Service networking and routes traffic to backend Pods.

---

Q3

Difference between containerd and kubelet?

Answer

kubelet manages Pods.

containerd manages Containers.

---

Q4

What is CNI?

Answer

CNI provides Pod networking and assigns IP addresses to Pods.

---

Q5

What is CSI?

Answer

CSI provides a standard interface for Kubernetes to interact with storage systems.

---

# Scenario Based Interview

Question

Pod is stuck in

ContainerCreating.

How will you troubleshoot?

Answer

1. Describe Pod.

2. Check Events.

3. Verify container runtime.

4. Verify CNI.

5. Verify CSI if volumes are attached.

6. Check kubelet logs.

---

Question

Node is Ready.

Pods are not starting.

What will you check?

Answer

1. kubelet

2. containerd

3. Events

4. Image Pull

5. Resource availability

6. Pod logs

---

# Production Troubleshooting Checklist

✔ Node Ready

✔ kubelet Running

✔ containerd Running

✔ CNI Healthy

✔ CSI Healthy

✔ Disk Space

✔ CPU

✔ Memory

✔ Pod Events

✔ kubelet Logs

---

# Senior Engineer Notes

Remember the Worker Node execution flow:

Scheduler

↓

API Server

↓

kubelet

↓

Container Runtime

↓

CNI

↓

CSI

↓

Container Started

↓

Readiness Probe

↓

Service Traffic

In production, most Worker Node incidents are caused by:

- kubelet failure
- container runtime issues
- CNI networking problems
- storage mount failures
- resource exhaustion

Master this flow because it is one of the most frequently asked Kubernetes architecture topics in Senior DevOps and SRE interviews.

