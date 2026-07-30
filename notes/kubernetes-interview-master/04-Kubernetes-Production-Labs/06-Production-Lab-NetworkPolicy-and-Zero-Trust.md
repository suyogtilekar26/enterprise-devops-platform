# Kubernetes Interview Master Handbook

# Production Lab 06 - NetworkPolicy and Zero Trust Networking

---

# Objective

Secure Kubernetes workloads using NetworkPolicy.

Topics

NetworkPolicy

Default Deny

Ingress Rules

Egress Rules

Namespace Isolation

Zero Trust

Micro Segmentation

Calico

Cilium

---

# Production Scenario

A banking application contains

Frontend

Backend

Database

Requirements

Frontend can access Backend.

Backend can access Database.

Frontend must never access Database directly.

No other communication should be allowed.

---

# Architecture

Internet

↓

Ingress

↓

Frontend

↓

Backend

↓

Database

---

# Without NetworkPolicy

Every Pod

↓

Can communicate

↓

With every other Pod

Security Risk

---

# With NetworkPolicy

Frontend

↓

Backend

↓

Database

Only allowed communication succeeds.

Everything else is denied.

---

# Zero Trust Principle

Default

↓

Deny Everything

↓

Allow Only Required Traffic

---

# Step 1

Create Namespace

kubectl create namespace production-security

---

Verify

kubectl get ns

---

# Step 2

Deploy Applications

Frontend

Backend

Database

---

Verify

kubectl get pods -n production-security

---

# Step 3

Test Connectivity

kubectl exec -it frontend-pod \
-n production-security -- sh

---

Inside Pod

wget backend

Expected

Success

---

Try Database

wget mysql

Expected

Success

(Currently no restrictions)

---

# Step 4

Apply Default Deny Policy

kubectl apply -f default-deny.yaml

---

Verify

kubectl get networkpolicy

---

Expected

All communication blocked.

---

# Step 5

Allow Frontend

↓

Backend

kubectl apply -f frontend-backend-policy.yaml

---

Verify

Frontend

↓

Backend

Success

---

Frontend

↓

Database

Blocked

---

# Step 6

Allow Backend

↓

Database

kubectl apply -f backend-db-policy.yaml

---

Verify

Backend

↓

Database

Success

---

Frontend

↓

Database

Blocked

---

# Final Communication Matrix

Frontend

↓

Backend

Allowed

---

Backend

↓

Database

Allowed

---

Frontend

↓

Database

Denied

---

Unknown Pod

↓

Database

Denied

---

# Ingress Rules

Control

Incoming Traffic

---

# Egress Rules

Control

Outgoing Traffic

---

# Namespace Isolation

Namespace A

↓

Cannot Access

↓

Namespace B

Unless explicitly allowed.

---

# Calico

Provides

NetworkPolicy

Routing

Security

BGP

---

# Cilium

Provides

eBPF Networking

NetworkPolicy

Observability

High Performance

---

# Common Problems

Policy Too Strict

Wrong Labels

Wrong Namespace

DNS Blocked

Backend Not Reachable

Database Timeout

Missing Egress Rules

---

# Troubleshooting Flow

Application Cannot Connect

↓

NetworkPolicy

↓

Labels

↓

Namespace

↓

DNS

↓

Pods

↓

Logs

↓

Application

---

# Production Incident

Frontend could not reach Backend.

Reason

Pod labels changed.

NetworkPolicy selector no longer matched.

Resolution

Correct labels.

Reapply policy.

---

# Another Incident

Application could not resolve DNS.

Reason

DNS traffic blocked by Egress Policy.

Resolution

Allow DNS traffic to CoreDNS.

---

# Best Practices

Default Deny first.

Allow only required traffic.

Separate namespaces.

Use labels carefully.

Review policies regularly.

Test connectivity.

Monitor denied traffic.

Use Calico or Cilium.

---

# Useful Commands

kubectl get networkpolicy

---

kubectl describe networkpolicy

---

kubectl get pods --show-labels

---

kubectl exec -it POD_NAME -- sh

---

kubectl get namespaces

---

kubectl logs POD_NAME

---

kubectl describe pod POD_NAME

---

# Interview Questions

Q1

What is NetworkPolicy?

Answer

NetworkPolicy defines which Pods are allowed to communicate with each other.

---

Q2

What is Default Deny?

Answer

All traffic is blocked unless explicitly allowed by a NetworkPolicy.

---

Q3

Difference between Ingress and Egress Rules?

Answer

Ingress controls incoming traffic to a Pod.

Egress controls outgoing traffic from a Pod.

---

Q4

Why is Zero Trust important?

Answer

Every connection must be explicitly allowed, reducing the attack surface.

---

Q5

Do NetworkPolicies work without a supporting CNI?

Answer

No.

The CNI plugin (for example Calico or Cilium) must implement NetworkPolicy enforcement.

---

# Scenario Based Interview

Question

Backend cannot connect to Database after applying NetworkPolicy.

How will you troubleshoot?

Answer

1. Verify NetworkPolicy.

2. Check Pod Labels.

3. Verify Namespace.

4. Check Egress Rules.

5. Test connectivity.

6. Review CNI logs.

---

Question

Everything stopped working after applying Default Deny.

Answer

Expected behavior.

Default Deny blocks all traffic until explicit allow rules are created.

---

# Production Checklist

✔ NetworkPolicy

✔ Default Deny

✔ Ingress Rules

✔ Egress Rules

✔ Labels

✔ Namespace Isolation

✔ DNS Access

✔ Calico/Cilium

✔ Connectivity Tests

✔ Logs

---

# Assignment

Deploy

Frontend

Backend

Database

Apply

1. Default Deny

2. Allow Frontend → Backend

3. Allow Backend → Database

Verify

Frontend → Backend ✔

Backend → Database ✔

Frontend → Database ✘

Unknown Pod → Database ✘

Document the communication flow and explain why each rule is required.

