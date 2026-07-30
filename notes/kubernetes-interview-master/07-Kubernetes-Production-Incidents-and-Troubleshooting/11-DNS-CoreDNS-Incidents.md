# Kubernetes Interview Master Handbook

# Section 07 - Kubernetes Production Incidents & Troubleshooting

# Chapter 11 - DNS & CoreDNS Incidents

---

# Objective

Learn how to investigate, troubleshoot, recover and permanently prevent DNS and CoreDNS incidents in Kubernetes production environments.

DNS failures can impact every microservice because almost all inter-service communication depends on DNS resolution.

---

# Interview Scenario

Time: 06:30 PM

PagerDuty Alert

"Service Discovery Failure"

Impact

- Microservices cannot communicate.
- Database hostname cannot be resolved.
- External API calls failing.
- Multiple production services unavailable.

You are the on-call SRE.

Restore DNS resolution immediately.

---

# What is a DNS Incident?

A DNS incident occurs when Pods cannot resolve Kubernetes Service names or external domains because of failures in CoreDNS, networking or DNS configuration.

---

# DNS Resolution Flow

Application

↓

Resolver (/etc/resolv.conf)

↓

CoreDNS

↓

Kubernetes API

↓

Service Records

↓

ClusterIP

↓

Application

OR

↓

DNS Lookup Failure

↓

Application Timeout

↓

Production Incident

---

# Common Root Causes

CoreDNS Crash

CoreDNS Misconfiguration

DNS Loop

NetworkPolicy Blocking DNS

Node Networking Failure

CNI Failure

API Server Unreachable

High DNS Latency

CoreDNS Resource Exhaustion

Incorrect resolv.conf

Firewall Blocking Port 53

---

# Step 1 - Verify Pod

```bash
kubectl get pods -A
```

---

# Step 2 - Test DNS Resolution

```bash
kubectl exec -it <pod-name> -- nslookup kubernetes.default
```

Expected

```text
Server: 10.96.0.10

Name: kubernetes.default.svc.cluster.local

Address: 10.96.0.1
```

---

# Step 3 - Test Service Resolution

```bash
kubectl exec -it <pod-name> -- nslookup payment-service.default.svc.cluster.local
```

---

# Step 4 - Verify CoreDNS

```bash
kubectl get pods -n kube-system
```

Expected

```text
coredns

Running
```

---

# Step 5 - Describe CoreDNS

```bash
kubectl describe pod -n kube-system <coredns-pod>
```

---

# Step 6 - Check CoreDNS Logs

```bash
kubectl logs -n kube-system deployment/coredns
```

Look for

- timeout
- plugin errors
- API connection failures
- DNS loop
- SERVFAIL

---

# Step 7 - Verify CoreDNS Service

```bash
kubectl get svc -n kube-system
```

Expected

```text
kube-dns
```

---

# Step 8 - Verify CoreDNS ConfigMap

```bash
kubectl get configmap -n kube-system coredns -o yaml
```

---

# Step 9 - Verify Endpoints

```bash
kubectl get endpoints -n kube-system kube-dns
```

---

# Step 10 - Verify Events

```bash
kubectl get events -A --sort-by=.metadata.creationTimestamp
```

---

# Step 11 - Verify Network Policies

```bash
kubectl get networkpolicy -A
```

---

# Step 12 - Verify DNS Configuration

```bash
kubectl exec -it <pod-name> -- cat /etc/resolv.conf
```

Expected

```text
search default.svc.cluster.local

nameserver 10.96.0.10
```

---

# Investigation Flow

Application

↓

DNS Lookup

↓

CoreDNS

↓

CoreDNS Logs

↓

ConfigMap

↓

Service

↓

Endpoints

↓

Network

↓

Recovery

---

# Scenario 1

CoreDNS CrashLoopBackOff

Symptoms

DNS resolution fails.

Root Cause

CoreDNS deployment failure.

Resolution

Restart CoreDNS.

---

# Scenario 2

CoreDNS Config Error

Logs

```text
plugin error
```

Root Cause

Invalid Corefile.

Resolution

Restore ConfigMap.

Restart CoreDNS.

---

# Scenario 3

NetworkPolicy Blocking DNS

Pods cannot access

Port 53

Resolution

Allow UDP/TCP 53.

---

# Scenario 4

API Server Unreachable

CoreDNS logs

```text
connection refused
```

Resolution

Restore API Server connectivity.

---

# Scenario 5

High CPU in CoreDNS

Queries timing out.

Resolution

Increase replicas.

Increase CPU resources.

---

# Scenario 6

DNS Loop

Logs

```text
loop detected
```

Resolution

Correct forwarding configuration.

---

# Production Incident

Issue

Checkout service cannot connect to PostgreSQL.

Investigation

Application logs

```text
lookup postgres.default.svc.cluster.local

no such host
```

CoreDNS

CrashLoopBackOff.

Logs

```text
plugin/loop
```

Root Cause

Incorrect CoreDNS forwarding configuration.

Resolution

Restore CoreDNS ConfigMap.

Restart CoreDNS.

DNS restored.

Applications recovered.

---

# Recovery Commands

Verify CoreDNS

```bash
kubectl get pods -n kube-system
```

---

Restart CoreDNS

```bash
kubectl rollout restart deployment coredns -n kube-system
```

---

Check Logs

```bash
kubectl logs -n kube-system deployment/coredns
```

---

Check DNS

```bash
kubectl exec -it <pod-name> -- nslookup kubernetes.default
```

---

Check ConfigMap

```bash
kubectl get configmap -n kube-system coredns -o yaml
```

---

# Validation Checklist

CoreDNS Running

DNS Resolution Successful

Service Discovery Working

Applications Connected

Latency Normal

Customer Transactions Successful

---

# RCA Template

Incident

DNS Failure

Root Cause

CoreDNS Configuration Error

Business Impact

Service Discovery Failure

Detection

Application Alerts

Resolution

Restored ConfigMap

Restarted CoreDNS

Preventive Action

Configuration Validation

CoreDNS Monitoring

---

# Interview Questions

## Q1. What is the role of CoreDNS?

Answer

CoreDNS provides DNS resolution for Kubernetes Services, Pods and external domains.

---

## Q2. Which command verifies DNS resolution?

Answer

```bash
kubectl exec -it <pod-name> -- nslookup kubernetes.default
```

---

## Q3. Why verify the CoreDNS ConfigMap?

Answer

The ConfigMap contains the CoreDNS configuration. Invalid entries can stop DNS resolution across the entire cluster.

---

## Q4. What are common DNS failures?

Answer

CoreDNS crashes, configuration errors, network policies, API server connectivity issues, DNS loops and resource exhaustion.

---

## Q5. How do you recover a DNS incident?

Answer

Verify CoreDNS health, review logs, validate the ConfigMap, restore DNS configuration, restart CoreDNS and confirm DNS resolution.

---

# Assignment

Production applications cannot resolve Kubernetes Service names.

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

Verify DNS.

```bash
kubectl exec -it <pod-name> -- nslookup kubernetes.default
```

---

## Step 2

Verify CoreDNS.

```bash
kubectl get pods -n kube-system
```

---

## Step 3

Review

- CoreDNS Logs
- ConfigMap
- Events
- Endpoints
- Network Policies

---

## Step 4

Identify root cause.

---

## Step 5

Recover

- Restore ConfigMap
- Restart CoreDNS
- Restore Networking

---

## Step 6

Validate

- DNS Resolution
- Service Discovery
- Application Connectivity

---

## Step 7

Complete RCA.

---

# Production Best Practices

✔ Deploy Multiple CoreDNS Replicas

✔ Monitor DNS Latency

✔ Monitor CoreDNS CPU and Memory

✔ Validate CoreDNS Config Changes

✔ Enable DNS Alerting

✔ Protect Port 53 Traffic

✔ Test DNS After Cluster Upgrades

✔ Backup CoreDNS Configuration

✔ Monitor Service Discovery

✔ Maintain DNS Runbooks

---

# Runbook Checklist

□ DNS Tested

□ CoreDNS Running

□ CoreDNS Logs Reviewed

□ ConfigMap Verified

□ Service Verified

□ Endpoints Verified

□ Network Policies Reviewed

□ Root Cause Confirmed

□ Recovery Completed

□ Validation Successful

□ RCA Completed

---

# Common Mistakes

❌ Assuming Application Is Faulty

❌ Ignoring CoreDNS Logs

❌ Forgetting DNS ConfigMap

❌ Blocking Port 53

❌ Ignoring Network Policies

❌ Restarting Applications Before DNS

❌ Closing Incident Without Validation

❌ Skipping RCA

