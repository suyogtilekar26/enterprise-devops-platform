# Kubernetes Worker Node Components

# 1. Purpose

The purpose of this document is to understand how Worker Nodes execute applications inside a Kubernetes Cluster.

Control Plane makes decisions.

Worker Nodes execute those decisions.

Every Pod in Kubernetes runs on a Worker Node.

---

# 2. Introduction

A Worker Node is a machine (Virtual Machine or Physical Server) where application Pods run.

Each Worker Node contains

- kubelet
- kube-proxy
- Container Runtime (containerd)

Without Worker Nodes, applications cannot run.

---

# 3. Enterprise Usage

Every production Kubernetes cluster contains multiple Worker Nodes.

Examples

- Amazon EKS Worker Nodes
- Azure AKS Node Pools
- Google GKE Nodes
- OpenShift Worker Nodes

Large production environments may have hundreds of Worker Nodes.

---

# 4. Usage in THIS Project

```
Developer

↓

GitHub

↓

GitHub Actions

↓

Kind Cluster

↓

Worker Node

↓

Frontend Pod

↓

API Gateway Pod

↓

Auth Pod

↓

Dashboard Pod
```

---

# 5. Architecture

```
              Worker Node

+--------------------------------------+

        kubelet

        kube-proxy

        containerd

---------------------------------------

      Frontend Pod

      API Gateway Pod

      Auth Pod

      Dashboard Pod

+--------------------------------------+
```

---

# 6. Internal Workflow

```
Scheduler

↓

Worker Node Selected

↓

kubelet Receives Request

↓

containerd Pulls Image

↓

Container Created

↓

Pod Running

↓

Health Status Sent To API Server
```

---

# 7. kubelet

kubelet is the most important process on every Worker Node.

Responsibilities

- Register Node
- Create Pods
- Monitor Pods
- Restart Failed Containers
- Send Status to Control Plane

Diagram

```
API Server

↓

kubelet

↓

containerd

↓

Pod Running
```

---

# 8. kube-proxy

kube-proxy handles networking.

Responsibilities

- Service Discovery
- Load Balancing
- Network Rules
- Pod Communication

Diagram

```
Service

↓

kube-proxy

↓

------------------

│       │       │

Pod1   Pod2   Pod3
```

---

# 9. Container Runtime

Container Runtime actually starts containers.

Nowadays Kubernetes uses

- containerd
- CRI-O

Docker Engine is no longer used directly by Kubernetes.

Diagram

```
Container Image

↓

containerd

↓

Container

↓

Pod
```

---

# 10. Production Best Practices

- Monitor Node Health.
- Keep enough CPU and Memory.
- Update Worker Nodes regularly.
- Drain Node before maintenance.
- Never reboot Worker Nodes without planning.
- Monitor Disk Usage.

---

# 11. Security

- Disable root login.
- Keep OS updated.
- Restrict SSH access.
- Scan container images.
- Use least privilege.
- Enable Node Security Policies.

---

# 12. Troubleshooting

Node Status

```bash
kubectl get nodes
```

Describe Node

```bash
kubectl describe node <node-name>
```

Pods on Node

```bash
kubectl get pods -o wide
```

Node Events

```bash
kubectl describe node <node-name>
```

---

# 13. Real Production Scenarios

## Scenario 1

### Worker Node Crash

```
Worker Node

↓

Hardware Failure

↓

Node Not Ready

↓

Scheduler

↓

Healthy Worker Node

↓

Pods Recreated

↓

Users Continue Working
```

Production Story

One production VM crashed because of hardware failure.

The Control Plane marked the Node as NotReady.

Scheduler immediately selected another healthy Worker Node.

kubelet recreated all missing Pods.

Business users did not notice any outage.

---

## Scenario 2

### Disk Full

Symptoms

- Pods fail to start.
- Images cannot be pulled.
- Node becomes unstable.

Investigation

```bash
kubectl describe node

df -h

journalctl
```

---

## Scenario 3

### High CPU Usage

Symptoms

- Slow applications
- Pod restart
- Node pressure alerts

Resolution

Scale Worker Nodes or add new Nodes.

---

# 14. Scenario Interview Q&A

Q. What is the responsibility of kubelet?

Answer

kubelet communicates with the API Server and ensures Pods are running on the Worker Node.

---

Q. Does kube-proxy create Pods?

Answer

No.

It only manages networking.

---

# 15. Architecture Interview Q&A

Explain Worker Node.

```
Control Plane

↓

Scheduler

↓

Worker Node

↓

kubelet

↓

containerd

↓

Pod

↓

Service
```

---

# 16. Production Support Interview Q&A

Application Down Investigation

```
Alert

↓

kubectl get nodes

↓

kubectl describe node

↓

kubectl get pods -o wide

↓

kubectl describe pod

↓

kubectl logs

↓

Root Cause

↓

Fix
```

---

# 17. Related Runbooks

- worker-node-not-ready.md
- kubelet-down.md
- disk-full.md
- pod-not-starting.md

---

# 18. Common Incidents

- Node Not Ready
- Disk Full
- Memory Pressure
- CPU Pressure
- kubelet Failure
- ImagePullBackOff

---

# 19. Commands

```bash
kubectl get nodes

kubectl describe node <node>

kubectl get pods -o wide

kubectl top nodes

kubectl top pods

kubectl drain <node>

kubectl uncordon <node>
```

---

# 20. Marathi Quick Revision

- Worker Node वर Pods चालतात.
- kubelet Pods Manage करतो.
- kube-proxy Networking सांभाळतो.
- containerd Container चालवतो.
- Worker Node म्हणजे Application Server.

---

# 21. Marathi Summary (5+ Experience Revision)

## Interview Summary

Worker Node म्हणजे Kubernetes मधील Application Execution Machine.

Control Plane निर्णय घेतो.

Worker Node ते निर्णय execute करतो.

kubelet Pods चालवतो.

kube-proxy Networking हाताळतो.

containerd Containers चालवतो.

## Production Investigation Flow

```
Alert

↓

kubectl get nodes

↓

Node Ready?

↓

No

↓

kubectl describe node

↓

Disk / CPU / Memory

↓

kubelet Status

↓

Root Cause
```

## Production Story

एका Production Node वर Disk 100% भरली.

नवीन Pods सुरू होत नव्हते.

Node Describe मध्ये "DiskPressure=True" दिसले.

Unused images cleanup केल्या.

Node Ready झाला.

Applications पुन्हा Normal झाल्या.

## Memory Trick

**KKC**

K → kubelet

K → kube-proxy

C → containerd

Remember

**kubelet Runs Pods → kube-proxy Connects Pods → containerd Runs Containers**

