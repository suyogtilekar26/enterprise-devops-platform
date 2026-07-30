# Kubernetes Interview Master Handbook

# Architecture 10 - Kubernetes Cluster Bootstrap Architecture

---

# What is Cluster Bootstrap?

## English

Cluster Bootstrap is the process of creating a brand-new Kubernetes cluster and preparing all required Control Plane and Worker Node components.

---

## मराठी

Cluster Bootstrap म्हणजे नवीन Kubernetes Cluster तयार करण्याची संपूर्ण प्रक्रिया.

यामध्ये Control Plane, Worker Nodes आणि सर्व आवश्यक Components configure केले जातात.

---

# Bootstrap Workflow

Administrator

↓

kubeadm init

↓

Preflight Checks

↓

Certificates Generated

↓

etcd Started

↓

API Server Started

↓

Controller Manager Started

↓

Scheduler Started

↓

kubeconfig Generated

↓

Bootstrap Token Created

↓

CNI Installed

↓

Cluster Ready

↓

Worker Nodes Join

---

# kubeadm init

Purpose

Initializes the Kubernetes Control Plane.

Main Tasks

Preflight Validation

Generate Certificates

Generate kubeconfig

Start Control Plane

Generate Join Token

Mark Cluster Ready

---

# Preflight Checks

Before initialization kubeadm verifies

CPU

Memory

Hostname

Swap Disabled

Container Runtime

Network Configuration

Ports Availability

Required Binaries

---

# Certificate Generation

kubeadm automatically generates

CA Certificate

API Server Certificate

API Server Kubelet Client Certificate

Front Proxy Certificate

etcd Certificates

Service Account Keys

Certificates secure communication between cluster components.

---

# Static Pods

Control Plane Components run as Static Pods.

Location

/etc/kubernetes/manifests/

Files

kube-apiserver.yaml

kube-controller-manager.yaml

kube-scheduler.yaml

etcd.yaml

kubelet continuously monitors this directory.

---

# kubelet Bootstrap

kubelet starts first.

↓

Reads Static Pod manifests.

↓

Starts Control Plane containers.

↓

Reports Node status.

---

# kubeconfig Files

Generated automatically.

Files

admin.conf

controller-manager.conf

scheduler.conf

kubelet.conf

Purpose

Secure authentication with API Server.

---

# Bootstrap Token

Created automatically.

Used by Worker Nodes.

Example

kubeadm join ...

Token

Discovery Token Hash

CA Verification

---

# Worker Node Join

Administrator

↓

kubeadm join

↓

Preflight Checks

↓

Token Validation

↓

CA Verification

↓

TLS Bootstrap

↓

Node Registration

↓

CSR Approval

↓

Node Ready

---

# TLS Bootstrap

Worker Node

↓

Creates Certificate Signing Request (CSR)

↓

API Server

↓

Certificate Approved

↓

Node Receives Certificate

↓

Secure Communication Established

---

# Node Registration

Worker kubelet registers itself.

↓

API Server

↓

Node Object Created

↓

Scheduler Can Use Node

---

# CNI Installation

Without CNI

Pods remain

NotReady

Common CNIs

Calico

Cilium

Flannel

Weave

Amazon VPC CNI

Azure CNI

---

# Cluster Startup Flow

Power On

↓

Container Runtime

↓

kubelet

↓

Static Pods

↓

API Server

↓

Controller Manager

↓

Scheduler

↓

etcd

↓

Node Ready

↓

Applications Deploy

---

# Common Bootstrap Problems

Swap Enabled

Certificates Expired

Container Runtime Down

API Server Not Starting

CNI Missing

Node NotReady

Token Expired

CSR Pending

---

# Troubleshooting Flow

Cluster Not Ready

↓

kubelet

↓

Static Pods

↓

API Server

↓

etcd

↓

Certificates

↓

Container Runtime

↓

CNI

↓

Worker Join

↓

Applications

---

# Production Incident

Worker Node failed to join cluster.

Reason

Bootstrap token expired.

Resolution

Generate new join token.

Run kubeadm join again.

---

# Another Incident

Cluster initialized successfully.

Pods remained NotReady.

Reason

CNI plugin not installed.

Resolution

Install supported CNI.

Wait for Nodes to become Ready.

---

# Best Practices

Disable Swap.

Use supported Kubernetes versions.

Secure bootstrap tokens.

Rotate certificates.

Backup kubeconfig files.

Backup etcd regularly.

Install CNI immediately after initialization.

---

# Useful Commands

kubeadm init

---

kubeadm join

---

kubeadm token list

---

kubeadm token create --print-join-command

---

kubectl get nodes

---

kubectl get csr

---

kubectl certificate approve CSR_NAME

---

systemctl status kubelet

---

ls /etc/kubernetes/manifests

---

# Interview Questions

Q1

What does kubeadm init do?

Answer

It initializes the Control Plane by performing preflight checks, generating certificates, creating kubeconfig files, starting Control Plane components and creating a join token.

---

Q2

Why are Control Plane components Static Pods?

Answer

Because kubelet can start and manage them directly without requiring the API Server to already be running.

---

Q3

What happens during kubeadm join?

Answer

The Worker Node validates the bootstrap token, verifies the CA, performs TLS bootstrap, registers with the API Server and becomes Ready.

---

Q4

Why is a CNI plugin required?

Answer

Without a CNI plugin, Pods cannot communicate over the network and Nodes remain NotReady for scheduling workloads.

---

Q5

Where are Static Pod manifests stored?

Answer

/ etc / kubernetes / manifests

(actual path: /etc/kubernetes/manifests)

---

# Scenario Based Interview

Question

Worker Node shows NotReady after joining.

How will you troubleshoot?

Answer

1. Check kubelet status.

2. Verify CNI installation.

3. Check Node Events.

4. Verify Container Runtime.

5. Check kubelet logs.

---

Question

Control Plane is not starting after kubeadm init.

Answer

1. Check Static Pod manifests.

2. Verify kubelet.

3. Check etcd logs.

4. Check certificates.

5. Verify required ports.

---

# Production Troubleshooting Checklist

✔ kubeadm

✔ kubelet

✔ Static Pods

✔ API Server

✔ etcd

✔ Certificates

✔ kubeconfig

✔ Bootstrap Token

✔ CNI

✔ Worker Node Join

---

# Senior Engineer Notes

Always remember the complete bootstrap sequence:

kubeadm init

↓

Preflight Checks

↓

Certificates

↓

Static Pods

↓

API Server

↓

Controller Manager

↓

Scheduler

↓

etcd

↓

kubeconfig

↓

Bootstrap Token

↓

CNI

↓

Worker Node Join

↓

TLS Bootstrap

↓

Node Ready

↓

Applications

Understanding this startup sequence helps troubleshoot cluster initialization and node join failures in production environments.

