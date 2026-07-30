# Kubernetes Interview Master Handbook

# Architecture 11 - Kubernetes Networking Internals

---

# What is Kubernetes Networking?

## English

Kubernetes networking allows communication between Pods, Services and external clients.

Every Pod receives its own IP address.

Pods communicate directly without NAT.

---

## मराठी

Kubernetes Networking मुळे Pods, Services आणि बाहेरील Clients एकमेकांशी communicate करू शकतात.

प्रत्येक Pod ला स्वतःचा IP Address मिळतो.

---

# Kubernetes Networking Model

Client

↓

Ingress / LoadBalancer

↓

Service

↓

kube-proxy

↓

Pod

↓

Container

---

# Networking Principles

Every Pod gets its own IP.

Pods communicate directly.

Nodes communicate without NAT.

Services provide stable access.

DNS resolves Service names.

---

# Pod-to-Pod Communication

Pod A

↓

CNI Network

↓

Pod B

Requirements

Unique IP

Flat Network

No NAT

---

# Same Node Communication

Pod A

↓

veth Pair

↓

Linux Bridge

↓

veth Pair

↓

Pod B

Fast communication inside the same Worker Node.

---

# Different Node Communication

Pod A

↓

veth

↓

Bridge

↓

Node Network

↓

Bridge

↓

veth

↓

Pod B

Handled by the CNI Plugin.

---

# CNI

Container Network Interface

Purpose

Provides Pod networking.

Examples

Calico

Cilium

Flannel

Weave

Azure CNI

Amazon VPC CNI

---

# Service

Purpose

Provides a stable virtual IP for Pods.

Service hides changing Pod IP addresses.

---

# ClusterIP

Default Service type.

Accessible only inside the cluster.

---

# NodePort

Exposes the Service on every Worker Node.

Client

↓

NodeIP:NodePort

↓

Service

↓

Pods

---

# LoadBalancer

Used in Cloud environments.

Client

↓

Cloud Load Balancer

↓

Service

↓

Pods

---

# ExternalName

Maps a Service to an external DNS name.

No proxying is performed.

---

# kube-proxy

Purpose

Maintains Service networking rules.

Modes

iptables

IPVS

---

# kube-proxy Flow

Client

↓

ClusterIP

↓

iptables/IPVS Rules

↓

Selected Pod

---

# Endpoints

Stores Pod IP addresses behind a Service.

Service

↓

Endpoints

↓

Pod List

---

# EndpointSlices

Modern replacement for Endpoints.

Benefits

Better scalability

Lower API load

Improved performance

---

# CoreDNS

Purpose

Provides DNS for Kubernetes.

Example

api.default.svc.cluster.local

↓

ClusterIP

---

# DNS Resolution Flow

Pod

↓

CoreDNS

↓

Service Name

↓

ClusterIP

↓

Service

↓

Pod

---

# Ingress

Purpose

HTTP/HTTPS routing.

Client

↓

Ingress

↓

Ingress Controller

↓

Service

↓

Pod

---

# Packet Flow

External Client

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

# Common Networking Problems

Pod cannot reach Pod

DNS Failure

Service unavailable

NetworkPolicy blocks traffic

CNI Failure

CoreDNS Down

Incorrect Service Selector

Ingress Misconfiguration

---

# Troubleshooting Flow

Application Not Reachable

↓

Pod Running?

↓

Service

↓

Endpoints

↓

CoreDNS

↓

NetworkPolicy

↓

CNI

↓

Ingress

↓

Application Logs

---

# Production Incident

Application returned

503 Service Unavailable.

Reason

Service selector did not match Pod labels.

Resolution

Correct labels.

Verify Endpoints.

---

# Another Incident

Pods could not resolve DNS.

Reason

CoreDNS Pods were not running.

Resolution

Restart CoreDNS.

Verify kube-system namespace.

---

# Best Practices

Use ClusterIP for internal services.

Use LoadBalancer for production external access.

Use Ingress for HTTP routing.

Monitor CoreDNS.

Use NetworkPolicies.

Avoid hardcoded Pod IP addresses.

Use EndpointSlices in large clusters.

---

# Useful Commands

kubectl get svc

---

kubectl get endpoints

---

kubectl get endpointslices

---

kubectl get ingress

---

kubectl get pods -n kube-system

---

kubectl describe svc SERVICE_NAME

---

kubectl describe ingress INGRESS_NAME

---

kubectl logs -n kube-system deployment/coredns

---

# Interview Questions

Q1

Why does every Pod receive its own IP?

Answer

So Pods can communicate directly without port mapping or NAT.

---

Q2

What is the role of kube-proxy?

Answer

It programs iptables or IPVS rules to route Service traffic to backend Pods.

---

Q3

Difference between ClusterIP and NodePort?

Answer

ClusterIP is accessible only inside the cluster.

NodePort exposes the Service on every Worker Node.

---

Q4

What is the purpose of CoreDNS?

Answer

CoreDNS resolves Kubernetes Service names into ClusterIP addresses.

---

Q5

What are EndpointSlices?

Answer

EndpointSlices are the scalable replacement for Endpoints and efficiently store backend Pod information.

---

# Scenario Based Interview

Question

Pods are Running but the Service has no Endpoints.

How will you troubleshoot?

Answer

1. Verify Service selector.

2. Check Pod labels.

3. Confirm Pods are Ready.

4. Describe the Service.

5. Check Endpoints.

---

Question

Pods cannot resolve Service names.

Answer

1. Verify CoreDNS Pods.

2. Check CoreDNS logs.

3. Verify kube-dns Service.

4. Test DNS from a Pod.

5. Check NetworkPolicies.

---

# Production Troubleshooting Checklist

✔ Pod IP

✔ Service

✔ Endpoints

✔ EndpointSlices

✔ kube-proxy

✔ CoreDNS

✔ CNI

✔ NetworkPolicy

✔ Ingress

✔ Application Logs

---

# Senior Engineer Notes

Always remember the networking flow:

Client

↓

LoadBalancer

↓

Ingress

↓

Service

↓

kube-proxy

↓

Endpoints

↓

Pod

↓

Application

Networking issues are usually caused by incorrect Service selectors, DNS failures, CNI problems or NetworkPolicies. Following this flow helps isolate production issues quickly.

