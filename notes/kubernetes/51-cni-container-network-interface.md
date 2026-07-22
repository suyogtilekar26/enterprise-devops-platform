# Kubernetes CNI (Container Network Interface)

# 1. Purpose

The purpose of the Container Network Interface (CNI) is to provide networking capabilities for Kubernetes Pods.

CNI is responsible for

- Assigning IP Addresses
- Configuring Pod Networking
- Enabling Pod-to-Pod Communication
- Connecting Pods across Worker Nodes
- Integrating Kubernetes with different network providers

Without a CNI Plugin,

Pods cannot communicate with each other.

---

# 2. Introduction

Imagine our Enterprise DevOps Platform.

```
Frontend Pod

↓

API Gateway Pod

↓

Auth Service Pod

↓

Dashboard Pod
```

Question

How can Pods running on different Worker Nodes communicate?

Answer

```
CNI Plugin
```

Without CNI

```
Pod

↓

No IP Address

↓

No Network

↓

Application Failure
```

With CNI

```
Pod

↓

Gets IP Address

↓

Connected To Cluster Network

↓

Application Works
```

---

# 3. Enterprise Usage

Every Production Kubernetes Cluster requires a CNI Plugin.

Popular Enterprise CNI Plugins

- Calico
- Cilium
- Flannel
- Weave Net
- Amazon VPC CNI
- Azure CNI
- Antrea

Cloud Platforms

- AWS EKS → Amazon VPC CNI
- Azure AKS → Azure CNI
- Google GKE → Google Native CNI

---

# 4. Usage in THIS Project

Enterprise DevOps Platform

```
Frontend

↓

CNI Network

↓

API Gateway

↓

CNI Network

↓

Auth Service

↓

Dashboard Service
```

All Pods will communicate through the configured CNI Plugin.

---

# 5. Architecture

```
               API Server

                    │

                    ▼

               Worker Node

                    │

               Kubelet

                    │

                    ▼

           Container Runtime

                    │

                    ▼

               CNI Plugin

                    │

        ┌───────────┼───────────┐

        ▼           ▼           ▼

      Pod-1       Pod-2       Pod-3

                    │

                    ▼

             Cluster Network
```

---

# 6. Internal Workflow

```
Pod Scheduled

↓

Kubelet

↓

Container Runtime

↓

Invoke CNI Plugin

↓

Allocate IP Address

↓

Configure Network Interface

↓

Update Routing

↓

Pod Ready
```

---

# 7. What is CNI?

CNI stands for

```
Container Network Interface
```

It is a standard interface that allows Kubernetes to work with different networking implementations.

Kubelet communicates with the CNI Plugin whenever a Pod is created or deleted.

---

# 8. Responsibilities of CNI

The CNI Plugin performs

- Allocate Pod IP
- Configure Virtual Network
- Connect Pod to Cluster Network
- Configure Routing
- Remove Network During Pod Deletion
- Support Network Policies (plugin dependent)

---

# 9. Popular CNI Plugins

## Calico

Features

- Network Policies
- BGP Routing
- High Performance

Commonly used in Enterprise environments.

---

## Cilium

Features

- eBPF Based
- High Performance
- Advanced Security
- Network Observability

Growing rapidly in Enterprise Kubernetes.

---

## Flannel

Features

- Simple
- Lightweight
- Easy to Configure

Common in Labs and Learning environments.

---

## Amazon VPC CNI

Used by

```
AWS EKS
```

Pods receive IP addresses directly from the AWS VPC.

---

## Azure CNI

Used by

```
Azure AKS
```

Integrates Pods directly into Azure Virtual Networks.

---

# 10. Daily DevOps Activities

- Verify Pod Networking
- Troubleshoot Network Connectivity
- Check Pod IP Allocation
- Monitor CNI Pods
- Review Network Policies
- Monitor IP Utilization

---

# 11. Production Best Practices

- Choose an Enterprise-supported CNI.
- Monitor IP Address utilization.
- Keep the CNI Plugin updated.
- Enable Network Policies.
- Monitor CNI Pod health.
- Plan Pod CIDR ranges carefully.

---

# 12. Security

- Use Network Policies.
- Restrict Cross-Namespace traffic.
- Monitor East-West traffic.
- Encrypt sensitive traffic where required.
- Audit CNI configuration.

---

# 13. Troubleshooting

Check Nodes

```bash
kubectl get nodes
```

View Pod IPs

```bash
kubectl get pods -o wide
```

Check CNI Pods

```bash
kubectl get pods -n kube-system
```

Describe Pod

```bash
kubectl describe pod <pod-name>
```

Check Events

```bash
kubectl get events
```

---

# 14. Real Production Scenarios

## Scenario 1

### Pod Stuck in ContainerCreating

Symptoms

```
Pod

↓

ContainerCreating
```

Investigation

```
Events

↓

CNI Error
```

Root Cause

CNI Plugin failed to assign an IP address.

Resolution

Restarted the CNI Pods.

---

## Scenario 2

### Pod-to-Pod Communication Failed

Frontend could not reach the API Gateway.

Investigation

```
CNI

↓

Routes

↓

Network Policies
```

Root Cause

CNI routing issue.

Resolution

Restarted networking components.

---

## Scenario 3

### IP Address Exhaustion

Symptoms

```
New Pods

↓

Pending
```

Reason

No available Pod IP addresses.

Resolution

Expanded Pod CIDR.

Added Worker Nodes.

---

# 15. Scenario Interview Questions

Q1. What is CNI?

Answer

CNI is the networking interface used by Kubernetes to configure networking for Pods.

---

Q2. Why is a CNI Plugin required?

Answer

Without a CNI Plugin, Pods cannot receive IP addresses or communicate with each other.

---

Q3. Name some popular CNI Plugins.

Answer

- Calico
- Cilium
- Flannel
- Amazon VPC CNI
- Azure CNI

---

Q4. Which CNI does AWS EKS use?

Answer

Amazon VPC CNI.

---

# 16. Architecture Interview Questions

Explain CNI Workflow.

```
Pod Scheduled

↓

Kubelet

↓

Container Runtime

↓

CNI Plugin

↓

Assign IP

↓

Configure Network

↓

Pod Running
```

---

Q2.

Does Kubernetes provide networking by itself?

Answer

No.

Kubernetes relies on CNI Plugins to implement networking.

---

# 17. Production Support Interview Questions

Production Investigation Flow

```
Pod Network Issue

↓

Pod IP

↓

CNI Pods

↓

Events

↓

Routing

↓

Network Policy

↓

Resolved
```

Manager Question

"Our applications cannot communicate across Worker Nodes."

Expected Answer

- Verify Pod IPs
- Check CNI Plugin Health
- Review CNI Logs
- Verify Routing
- Check Network Policies
- Confirm Worker Node Connectivity

---

# 18. Related Runbooks

- cni-plugin-failure.md
- pod-network-connectivity.md
- ip-address-exhaustion.md

---

# 19. Common Incidents

- CNI Plugin Crash
- Pod IP Allocation Failure
- Cross-Node Communication Failure
- Network Policy Misconfiguration
- Pod CIDR Exhausted

---

# 20. Commands

```bash
kubectl get nodes

kubectl get pods -o wide

kubectl get pods -n kube-system

kubectl describe pod <pod-name>

kubectl get events

kubectl logs -n kube-system <cni-pod-name>
```

---

# 21. YAML Deep Dive

Example Pod

```yaml
apiVersion: v1
kind: Pod

metadata:
  name: api-gateway

spec:
  containers:
  - name: api-gateway
    image: api-gateway:v1
```

CNI Processing Flow

```
Scheduler

↓

Worker Node

↓

Kubelet

↓

Container Runtime

↓

CNI Plugin

↓

Assign Pod IP

↓

Configure Routes

↓

Pod Ready
```

Explanation

When Kubernetes creates a Pod,

the Kubelet invokes the configured CNI Plugin.

The CNI Plugin

- Creates the network interface
- Assigns an IP address
- Configures routing
- Connects the Pod to the cluster network

Only after successful networking does the Pod become Ready.

---

# 22. Marathi Quick Revision

- CNI म्हणजे Container Network Interface.
- CNI Pod ला IP Address देते.
- Pod-to-Pod Communication CNI मुळे शक्य होते.
- Kubernetes स्वतः Networking करत नाही.
- AWS मध्ये Amazon VPC CNI वापरतात.

---

# 23. Marathi Summary (5+ Years Experience Revision)

## Interview Summary

CNI (Container Network Interface) हा Kubernetes Networking चा मुख्य भाग आहे.

तो Pods ला IP Address देतो, Network Interface तयार करतो आणि Cluster Networking Configure करतो.

Calico, Cilium, Flannel, Amazon VPC CNI आणि Azure CNI हे Production मध्ये सर्वाधिक वापरले जाणारे CNI Plugins आहेत.

## Production Investigation Flow

```
Pod Network Issue

↓

Pod IP

↓

CNI Plugin

↓

Events

↓

Routing

↓

Network Policy

↓

Resolved
```

## Production Story

Production EKS Cluster मध्ये नवीन Pods सतत `ContainerCreating` अवस्थेत अडकत होते.

`kubectl describe pod` मध्ये `failed to setup network for sandbox` Error दिसत होती.

Investigation मध्ये Amazon VPC CNI Pods CrashLoopBackOff मध्ये असल्याचे आढळले.

CNI Pods Restart करून आणि IP Allocation तपासल्यानंतर नवीन Pods यशस्वीपणे सुरू झाले.

## Memory Trick

**Scheduler = Select Node**

↓

**Kubelet = Create Pod**

↓

**CNI = Give Network**

↓

**Container Runtime = Run Container**

Remember

**No CNI = No IP = No Communication**

