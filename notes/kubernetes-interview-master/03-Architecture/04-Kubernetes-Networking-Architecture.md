# Kubernetes Interview Master Handbook

# Architecture 04 - Kubernetes Networking Architecture

---

# What is Kubernetes Networking?

## English

Kubernetes networking enables communication between Pods, Services and external users.

Every Pod receives its own IP address and can communicate with other Pods without NAT.

---

## मराठी

Kubernetes Networking मुळे Pods, Services आणि बाहेरील Users एकमेकांशी communicate करू शकतात.

प्रत्येक Pod ला स्वतःचा IP मिळतो.

---

# Kubernetes Networking Goals

Every Pod gets a unique IP.

Pods communicate without NAT.

Nodes communicate with Pods.

Services provide stable access.

External users access applications through Ingress or LoadBalancer.

---

# Networking Architecture

External User

↓

DNS

↓

LoadBalancer

↓

Ingress

↓

Service

↓

kube-proxy

↓

Pod

↓

Application

---

# Pod Network

Each Pod receives

Unique IP

Example

frontend

10.244.1.10

backend

10.244.2.15

Pods communicate directly using Pod IPs.

Applications should use Services instead of Pod IPs.

---

# Service Types

ClusterIP

Default Service

Accessible only inside cluster.

---

NodePort

Accessible using

<NodeIP>:NodePort

---

LoadBalancer

Creates Cloud Load Balancer.

Available in

AWS

Azure

GCP

---

ExternalName

Maps Service to external DNS.

---

# ClusterIP Flow

Frontend Pod

↓

ClusterIP

↓

kube-proxy

↓

Backend Pod

---

# NodePort Flow

Browser

↓

Worker Node IP

↓

NodePort

↓

Service

↓

Pod

---

# LoadBalancer Flow

Internet

↓

Cloud Load Balancer

↓

Service

↓

Pods

---

# Ingress Flow

Internet

↓

DNS

↓

Load Balancer

↓

Ingress Controller

↓

Ingress Rules

↓

Service

↓

Pods

---

# kube-proxy

Purpose

Implements Kubernetes Services.

Routes traffic to backend Pods.

Modes

iptables

IPVS

---

# iptables

Uses Linux firewall rules.

Simple.

Default in many clusters.

---

# IPVS

Kernel load balancer.

Better scalability.

Preferred for large production clusters.

---

# CNI

Container Network Interface.

Responsible for

Pod IP

Routing

Network Policies

Cross-node networking

---

# Popular CNI Plugins

Calico

Cilium

Flannel

Weave

Antrea

---

# Cross Node Communication

Pod A

Node 1

↓

CNI Network

↓

Node 2

↓

Pod B

Pods communicate without NAT.

---

# DNS Flow

Application

↓

CoreDNS

↓

Service Name

↓

ClusterIP

↓

Pod

---

# Complete Request Flow

Browser

↓

DNS

↓

LoadBalancer

↓

Ingress

↓

Service

↓

kube-proxy

↓

Pod

↓

Application

↓

Response

---

# Common Networking Problems

DNS Failure

Ingress Failure

Service Misconfiguration

NetworkPolicy Blocking

CNI Failure

No Endpoints

Wrong Selector

kube-proxy Failure

---

# Troubleshooting Flow

Cannot Access Application

↓

DNS

↓

Ingress

↓

Service

↓

Endpoints

↓

kube-proxy

↓

Pod

↓

Application

---

# Production Incident

Pods Running.

Service Exists.

Endpoints Empty.

Reason

Wrong labels.

Resolution

Correct Deployment labels.

---

# Another Incident

Ingress Healthy.

DNS wrong.

Users cannot reach application.

Resolution

Correct DNS record.

---

# Best Practices

Use ClusterIP for internal services.

Use Ingress for HTTP/HTTPS.

Avoid NodePort in production.

Monitor CoreDNS.

Monitor kube-proxy.

Keep CNI updated.

Use NetworkPolicies.

---

# Useful Commands

kubectl get svc

---

kubectl get endpoints

---

kubectl get ingress

---

kubectl get networkpolicy

---

kubectl get pods -o wide

---

kubectl describe svc SERVICE_NAME

---

kubectl describe ingress

---

kubectl get pods -n kube-system

---

# Interview Questions

Q1

Why does every Pod have its own IP?

Answer

To allow direct Pod-to-Pod communication without NAT.

---

Q2

Difference between ClusterIP and NodePort?

Answer

ClusterIP is internal only.

NodePort exposes the Service through a Worker Node port.

---

Q3

When should LoadBalancer be used?

Answer

When exposing applications externally in cloud environments.

---

Q4

Difference between Ingress and LoadBalancer?

Answer

LoadBalancer exposes a Service.

Ingress provides HTTP/HTTPS routing for multiple Services.

---

Q5

What is the role of kube-proxy?

Answer

It implements Service networking and routes traffic to backend Pods.

---

# Scenario Based Interview

Question

Application returns 503.

Pods are Running.

How will you troubleshoot?

Answer

1. Check Service.

2. Check Endpoints.

3. Check Labels.

4. Check Ingress.

5. Check DNS.

6. Verify kube-proxy.

---

Question

Pods on different Nodes cannot communicate.

What will you check?

Answer

1. CNI Plugin.

2. Routes.

3. NetworkPolicy.

4. Node Network.

5. Pod IP allocation.

---

# Production Troubleshooting Checklist

✔ Pod IP

✔ Service

✔ Endpoints

✔ kube-proxy

✔ CNI

✔ DNS

✔ Ingress

✔ NetworkPolicy

✔ LoadBalancer

✔ Application Logs

---

# Senior Engineer Notes

Always troubleshoot networking in this order:

Client

↓

DNS

↓

LoadBalancer

↓

Ingress

↓

Service

↓

Endpoints

↓

kube-proxy

↓

CNI

↓

Pod

↓

Application

Never start with the Pod unless the networking path has already been verified.

