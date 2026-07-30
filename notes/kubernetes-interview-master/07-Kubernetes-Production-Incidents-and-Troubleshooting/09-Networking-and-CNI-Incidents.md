# Kubernetes Interview Master Handbook

# Section 07 - Kubernetes Production Incidents & Troubleshooting

# Chapter 09 - Networking and CNI Incidents

---

# Objective

Learn how to investigate, troubleshoot, recover and permanently prevent Kubernetes Networking and CNI (Container Network Interface) incidents in production environments.

Networking incidents are among the most critical failures because they can affect every application running in the cluster.

---

# Interview Scenario

Time: 04:15 PM

PagerDuty Alert

"Multiple Microservices Cannot Communicate"

Impact

- API requests timing out
- Internal service communication failing
- Customer transactions failing
- Multiple production applications impacted

You are the on-call SRE.

Restore production networking immediately.

---

# What is a Networking Incident?

A Networking incident occurs when Pods, Services, Nodes or external clients cannot communicate because of networking failures.

---

# Kubernetes Networking Flow

Client

↓

Load Balancer

↓

Ingress

↓

Service

↓

kube-proxy

↓

Pod Network (CNI)

↓

Destination Pod

OR

↓

Packet Dropped

↓

Timeout

↓

Application Failure

---

# Common Root Causes

CNI Plugin Failure

CoreDNS Failure

NetworkPolicy Blocking Traffic

kube-proxy Failure

Pod CIDR Overlap

Firewall Rules

Security Group Changes

VXLAN Failure

Calico Node Failure

Cilium Agent Failure

Flannel Failure

MTU Mismatch

Routing Problems

Node Network Failure

---

# Step 1 - Verify Cluster Networking

```bash
kubectl get nodes
```

Confirm

- All nodes Ready

---

# Step 2 - Check Pod Connectivity

```bash
kubectl exec -it <pod-name> -- ping <destination-pod-ip>
```

---

# Step 3 - Verify Service

```bash
kubectl get svc -A
```

---

# Step 4 - Verify Endpoints

```bash
kubectl get endpoints -A
```

Ensure

Endpoints exist.

---

# Step 5 - Verify DNS

```bash
kubectl exec -it <pod-name> -- nslookup kubernetes.default
```

---

# Step 6 - Verify CoreDNS

```bash
kubectl get pods -n kube-system
```

Check

CoreDNS Running

---

# Step 7 - Verify CNI Pods

```bash
kubectl get pods -n kube-system
```

Look for

- calico-node
- cilium
- flannel
- weave-net

---

# Step 8 - Verify kube-proxy

```bash
kubectl get pods -n kube-system | grep kube-proxy
```

---

# Step 9 - Verify Network Policies

```bash
kubectl get networkpolicy -A
```

---

# Step 10 - Verify Events

```bash
kubectl get events -A --sort-by=.metadata.creationTimestamp
```

---

# Investigation Flow

Application

↓

Service

↓

Endpoints

↓

DNS

↓

CoreDNS

↓

kube-proxy

↓

CNI

↓

Node Network

↓

Recovery

---

# Scenario 1

CoreDNS Failure

Pods

Running

DNS

Not Resolving

Resolution

Restart CoreDNS.

Investigate DNS logs.

---

# Scenario 2

Calico Failure

calico-node

CrashLoopBackOff

Result

Pods cannot communicate.

Resolution

Recover Calico.

---

# Scenario 3

NetworkPolicy

Traffic denied.

Root Cause

Incorrect ingress rule.

Resolution

Update NetworkPolicy.

---

# Scenario 4

Missing Endpoints

Service exists.

Endpoints empty.

Root Cause

Pods not Ready.

Resolution

Recover application Pods.

---

# Scenario 5

kube-proxy Failure

iptables not updated.

Services unreachable.

Resolution

Restart kube-proxy.

---

# Scenario 6

Firewall Changes

Worker Nodes cannot communicate.

Resolution

Restore firewall rules.

---

# Production Incident

Issue

Checkout service cannot connect to payment service.

Investigation

Service exists.

Endpoints healthy.

DNS working.

Ping fails.

Calico Node

CrashLoopBackOff.

Root Cause

Calico upgrade failed.

Resolution

Rollback Calico deployment.

Networking restored.

Applications recover.

---

# Recovery Commands

Check Services

```bash
kubectl get svc -A
```

---

Check Endpoints

```bash
kubectl get endpoints -A
```

---

Check DNS

```bash
kubectl exec -it <pod-name> -- nslookup kubernetes.default
```

---

Check CNI

```bash
kubectl get pods -n kube-system
```

---

Restart CoreDNS

```bash
kubectl rollout restart deployment coredns -n kube-system
```

---

Restart kube-proxy

```bash
kubectl rollout restart daemonset kube-proxy -n kube-system
```

---

# Validation Checklist

Pods Communicating

DNS Working

Services Reachable

Endpoints Healthy

NetworkPolicies Validated

Application Healthy

Customer Transactions Successful

---

# RCA Template

Incident

Networking Failure

Root Cause

Calico Node Failure

Business Impact

Microservice communication failure

Detection

Application Timeout Alert

Resolution

Recovered CNI

Preventive Action

CNI Monitoring

Upgrade Validation

---

# Interview Questions

## Q1. What is the role of CNI?

Answer

The CNI plugin provides Pod networking, IP allocation and communication between Pods across the Kubernetes cluster.

---

## Q2. Which command verifies Service endpoints?

Answer

```bash
kubectl get endpoints
```

---

## Q3. What are common networking failures?

Answer

CNI failures, CoreDNS issues, NetworkPolicy rules, kube-proxy failures, firewall changes, routing issues and endpoint failures.

---

## Q4. Why verify Endpoints?

Answer

A Service without healthy Endpoints cannot route traffic to application Pods.

---

## Q5. How do you troubleshoot networking?

Answer

Verify Services, Endpoints, DNS, CoreDNS, kube-proxy, CNI plugins, NetworkPolicies and node connectivity before identifying the root cause.

---

# Assignment

Production microservices cannot communicate.

Prepare

- Investigation Plan
- Commands
- Evidence Collection
- Root Cause Analysis
- Recovery
- Validation
- Preventive Actions

---

# Assignment Solution

## Step 1

Check Services.

```bash
kubectl get svc -A
```

---

## Step 2

Verify Endpoints.

```bash
kubectl get endpoints -A
```

---

## Step 3

Check DNS.

```bash
kubectl exec -it <pod-name> -- nslookup kubernetes.default
```

---

## Step 4

Verify

- CoreDNS
- kube-proxy
- CNI
- NetworkPolicies
- Events

---

## Step 5

Identify networking failure.

---

## Step 6

Recover affected networking component.

---

## Step 7

Validate

- DNS
- Pod Connectivity
- Service Connectivity
- Application Health

---

# Production Best Practices

✔ Monitor CNI Components

✔ Monitor CoreDNS

✔ Validate NetworkPolicies

✔ Monitor kube-proxy

✔ Use Network Observability

✔ Validate Cluster Networking After Upgrades

✔ Document Firewall Rules

✔ Test Inter-Service Communication

✔ Alert on DNS Failures

✔ Maintain Networking Runbooks

---

# Runbook Checklist

□ Services Verified

□ Endpoints Verified

□ DNS Verified

□ CoreDNS Healthy

□ kube-proxy Healthy

□ CNI Healthy

□ NetworkPolicies Reviewed

□ Root Cause Confirmed

□ Recovery Completed

□ Validation Successful

□ RCA Completed

---

# Common Mistakes

❌ Assuming DNS Is the Problem

❌ Ignoring Endpoints

❌ Forgetting NetworkPolicies

❌ Ignoring CNI Health

❌ Skipping kube-proxy Checks

❌ Not Testing Pod-to-Pod Connectivity

❌ Closing Incident Without Validation

❌ Skipping RCA

