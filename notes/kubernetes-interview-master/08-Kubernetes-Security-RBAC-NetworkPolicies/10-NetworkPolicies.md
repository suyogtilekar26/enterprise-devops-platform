# Kubernetes Interview Master Handbook

# Section 08 - Kubernetes Security, RBAC & NetworkPolicies

# Chapter 10 - NetworkPolicies

---

# Objective

Learn Kubernetes NetworkPolicies from a production and interview perspective.

Understand how NetworkPolicies restrict Pod-to-Pod communication and implement Zero Trust networking in enterprise Kubernetes clusters.

---

# Interview Scenario

Time: 01:30 PM

Security Alert

A compromised application Pod is able to communicate with every Pod inside the cluster.

Risk

- Lateral movement
- Data exfiltration
- Production compromise

Security Team requests immediate network isolation.

You are responsible for implementing Kubernetes NetworkPolicies.

---

# What is a NetworkPolicy?

A NetworkPolicy controls network traffic between Pods.

It defines

- Which Pods can communicate
- Which traffic is allowed
- Which traffic is denied

Without NetworkPolicies, Pods can generally communicate freely inside the cluster.

---

# Default Kubernetes Networking

Pod A

↓

Pod B

Allowed

↓

Pod C

Allowed

↓

Database

Allowed

---

# With NetworkPolicy

Pod A

↓

Frontend

Allowed

↓

Backend

Allowed

↓

Database

Allowed

↓

Other Pods

Denied

---

# Zero Trust Model

Default

↓

Deny All

↓

Allow Only Required Traffic

---

# NetworkPolicy Components

Pod Selector

↓

Ingress Rules

↓

Egress Rules

↓

Allowed Communication

---

# Types of Rules

## Ingress

Controls incoming traffic to Pods.

---

## Egress

Controls outgoing traffic from Pods.

---

## Both

Can be enforced simultaneously.

---

# Example Deny All Policy

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy

metadata:
  name: default-deny
  namespace: production

spec:
  podSelector: {}

  policyTypes:

  - Ingress

  - Egress
```

---

# Example Allow Frontend to Backend

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy

metadata:
  name: frontend-backend

spec:

  podSelector:

    matchLabels:

      app: backend

  ingress:

  - from:

    - podSelector:

        matchLabels:

          app: frontend
```

---

# Example Allow DNS

```yaml
egress:

- to:

  - namespaceSelector:

      matchLabels:

        kubernetes.io/metadata.name: kube-system

  ports:

  - protocol: UDP

    port: 53
```

---

# Production Architecture

Internet

↓

Ingress

↓

Frontend

↓

Backend

↓

Database

Each layer communicates only with the next approved layer.

---

# Production Incident

Issue

Database compromised through lateral movement.

Investigation

No NetworkPolicies configured.

Every Pod could reach the database.

Root Cause

Cluster allowed unrestricted east-west traffic.

Resolution

Create

- Default Deny Policy
- Frontend Policy
- Backend Policy
- Database Policy

Validate communication.

---

# Investigation Commands

View NetworkPolicies

```bash
kubectl get networkpolicies -A
```

---

Describe NetworkPolicy

```bash
kubectl describe networkpolicy default-deny
```

---

View YAML

```bash
kubectl get networkpolicy default-deny -o yaml
```

---

View Pods

```bash
kubectl get pods -A --show-labels
```

---

Describe Pod

```bash
kubectl describe pod frontend
```

---

Test Connectivity

```bash
kubectl exec frontend -- curl http://backend
```

---

Test DNS

```bash
kubectl exec frontend -- nslookup kubernetes.default
```

---

# Common Problems

No Default Deny Policy

Incorrect Labels

Missing DNS Rules

Incorrect Namespace Selectors

CNI Does Not Support NetworkPolicies

Missing Egress Rules

---

# Validation Checklist

Default Deny Enabled

Required Traffic Allowed

Unnecessary Traffic Blocked

DNS Working

Applications Healthy

Security Review Passed

---

# RCA Template

Incident

Unrestricted Pod Communication

Root Cause

Missing NetworkPolicies

Business Impact

Potential Lateral Movement

Resolution

Implemented NetworkPolicies

Preventive Action

Default Deny Policy for Every Namespace

---

# Interview Questions

## Q1. What is a NetworkPolicy?

Answer

A NetworkPolicy controls Pod network communication by defining allowed ingress and egress traffic.

---

## Q2. Does Kubernetes block traffic by default?

Answer

No.

Without NetworkPolicies, Pods can generally communicate freely with each other.

---

## Q3. What are the two policy types?

Answer

Ingress and Egress.

---

## Q4. What is the first NetworkPolicy created in production?

Answer

A Default Deny policy.

---

## Q5. Why do NetworkPolicies require CNI support?

Answer

NetworkPolicies are enforced by the Container Network Interface (CNI) plugin. If the CNI does not support them, the policies will not be enforced.

---

# Assignment

Secure a three-tier application

- Frontend
- Backend
- Database

Requirements

- Internet → Frontend
- Frontend → Backend
- Backend → Database
- No Other Communication Allowed

Prepare

- NetworkPolicy Design
- Validation Commands
- Security Considerations
- Recovery Plan

---

# Assignment Solution

## Step 1

Create Default Deny Policy.

---

## Step 2

Allow Frontend traffic.

---

## Step 3

Allow Backend traffic.

---

## Step 4

Allow Database traffic.

---

## Step 5

Allow DNS.

---

## Step 6

Validate connectivity.

---

## Step 7

Review audit results.

---

# Production Best Practices

✔ Implement Default Deny

✔ Allow Only Required Traffic

✔ Use Label-Based Policies

✔ Test Policies Before Production

✔ Enable DNS Access Explicitly

✔ Review Policies Regularly

✔ Document Network Flows

✔ Monitor Blocked Connections

✔ Use Zero Trust Networking

✔ Validate Policies After Deployments

---

# Runbook Checklist

□ Default Deny Enabled

□ Required Traffic Allowed

□ Unnecessary Traffic Blocked

□ DNS Working

□ Labels Verified

□ Root Cause Confirmed

□ Recovery Completed

□ Validation Successful

□ Documentation Updated

□ Security Review Completed

---

# Common Mistakes

❌ No Default Deny Policy

❌ Forgetting DNS Rules

❌ Incorrect Labels

❌ Allowing All Traffic

❌ Missing Egress Policies

❌ Assuming Policies Work Without Supported CNI

❌ Never Testing Connectivity

❌ Skipping Validation

