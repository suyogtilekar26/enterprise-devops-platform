# Kubernetes Runbook 15 - OOMKilled

# 1. Purpose

This runbook explains how to investigate and recover Kubernetes Pods terminated with the **OOMKilled (Out Of Memory)** status.

OOMKilled is one of the most common production incidents in Kubernetes. It occurs when a container exceeds its configured memory limit, causing the Linux Kernel OOM Killer to terminate the process.

The objective is to identify the reason for excessive memory consumption, restore application availability, prevent recurring incidents, and complete the Root Cause Analysis (RCA).

---

# 2. Scope

Applicable to

- Deployments
- StatefulSets
- DaemonSets
- Batch Jobs
- CronJobs
- Memory-intensive applications
- Production Kubernetes Clusters

Supported Platforms

- Kind
- EKS
- AKS
- GKE
- OpenShift
- On-Prem Kubernetes

---

# 3. Symptoms

Users may report

- Application unavailable
- Random API failures
- Login failures
- Slow responses
- Intermittent outages

Monitoring may report

- OOMKilled
- Pod Restart
- High Memory Utilization
- CrashLoopBackOff
- Increased HTTP 5xx

Example

```
Memory Usage

↓

Memory Limit Exceeded

↓

Kernel OOM Killer

↓

Container Terminated

↓

Pod Restart
```

---

# 4. Business Impact

Critical

- Production application unavailable
- Customer transactions interrupted
- Multiple service failures

Medium

- One application degraded
- Increased latency

Low

- Background batch jobs affected

---

# 5. Possible Root Causes

- Memory leak
- Incorrect memory limit
- No memory request
- Traffic spike
- Large file processing
- Infinite application loop
- Cache growth
- JVM heap misconfiguration
- Batch processing overload
- Database query consuming excessive memory

---

# 6. Prerequisites

Required

- kubectl
- Metrics Server
- Cluster administrator access

Verify

```bash
kubectl auth can-i get pods

kubectl auth can-i top pods

kubectl auth can-i describe pods
```

---

# 7. Initial Investigation

## Step 1

Identify OOMKilled Pods

```bash
kubectl get pods -A
```

Look for

```
CrashLoopBackOff
```

or frequent restarts.

---

## Step 2

Describe Pod

```bash
kubectl describe pod <pod-name> \
-n <namespace>
```

Expected

```
Last State

Terminated

Reason

OOMKilled
```

---

## Step 3

Review Restart Count

```bash
kubectl get pods
```

Example

```
RESTARTS

27
```

Frequent restarts usually indicate recurring failures.

---

## Step 4

Check Resource Usage

```bash
kubectl top pod <pod-name> \
-n <namespace>
```

---

# 8. Detailed Investigation

## Step 1

Review Previous Logs

```bash
kubectl logs <pod-name> \
--previous \
-n <namespace>
```

Look for

- Heap errors
- Memory allocation failures
- Large processing jobs
- Unexpected loops

---

## Step 2

Review Current Logs

```bash
kubectl logs <pod-name> \
-n <namespace>
```

---

## Step 3

Review Resource Configuration

```bash
kubectl describe pod <pod-name>
```

Review

```
Requests

Limits
```

Example

```
Requests

256Mi

Limits

512Mi
```

---

## Step 4

Verify Deployment

```bash
kubectl describe deployment <deployment-name>
```

Review

- Recent rollout
- Image version
- Resource configuration

---

## Step 5

Review HPA

```bash
kubectl get hpa
```

Determine whether Pods should have scaled before memory exhaustion occurred.

---

## Step 6

Review Recent Changes

Verify

- Helm release
- Git commits
- CI/CD deployment
- Argo CD synchronization
- ConfigMap changes
- Secret changes

---

## Step 7

Determine Memory Growth Pattern

Questions

- Memory spike immediately?
- Memory increases slowly?
- Happens after traffic spike?
- Happens after deployment?
- Happens during scheduled batch jobs?

These answers help distinguish

- Memory leak
- Capacity issue
- Application bug

---

# 9. Resolution Steps

Depending on findings

Memory Leak

- Rollback deployment
- Engage Development Team

Incorrect Memory Limit

Increase limits after confirming application behavior.

Traffic Spike

Scale application.

Large Batch Processing

Split workload into smaller batches.

Application Bug

Rollback to previous stable release.

---

# 10. Validation Steps

Verify

```bash
kubectl get pods

kubectl top pods
```

Confirm

- No OOMKilled events
- Stable memory usage
- Restart count stable

Business Validation

- Login successful
- APIs healthy
- Dashboard available
- Monitoring green

---

# 11. Rollback Procedure

If issue started after deployment

```bash
kubectl rollout undo deployment/<deployment>
```

Validate

- Memory usage
- Pod stability
- Customer transactions
- Monitoring

---

# 12. Escalation Matrix

L1

- Verify OOMKilled
- Collect logs

↓

L2

- Review resources
- Review deployments

↓

Development Team

- Memory leak
- Code optimization

↓

Platform Team

- Cluster resources
- Scaling

---

# 13. Production Best Practices

- Always configure memory requests and limits.
- Monitor memory utilization continuously.
- Enable HPA where appropriate.
- Monitor restart count.
- Investigate every OOMKilled incident.
- Avoid simply increasing memory limits without RCA.
- Perform load testing before production releases.

---

# 14. Real Production Scenario

A production payment application began restarting every few minutes after a new release.

Investigation

```bash
kubectl describe pod payment-api
```

showed

```
Reason

OOMKilled
```

Previous logs indicated an infinite cache growth bug introduced in the latest release.

The Deployment was rolled back immediately.

Application recovered within minutes.

Development later fixed the cache implementation.

Root Cause

Memory leak introduced during deployment.

---

# 15. Scenario Interview Questions

## Q1. A Pod is repeatedly OOMKilled. What is your first step?

### Answer

Verify

```bash
kubectl describe pod

kubectl top pod

kubectl logs --previous
```

Collect evidence before changing resource limits.

---

## Q2. Should you immediately increase memory limits?

### Answer

No.

First determine whether the issue is

- Memory leak
- Traffic spike
- Application bug
- Incorrect configuration

Increasing limits without investigation can hide production defects.

---

## Q3. Which command confirms an OOMKilled event?

### Answer

```bash
kubectl describe pod <pod-name>
```

Review

```
Last State

Reason

OOMKilled
```

---

# 16. Architecture Interview Questions

## Q1. Explain OOMKilled architecture.

### Answer

```
Application

↓

Memory Usage

↓

Container Limit

↓

Linux Kernel OOM Killer

↓

Container Terminated

↓

Kubelet

↓

Pod Restart
```

---

## Q2. Which Kubernetes components participate?

### Answer

- kubelet
- Linux Kernel
- Scheduler
- Deployment Controller
- Metrics Server

---

# 17. Production Support Interview Questions

## Q1. Production Pods are restarting because of OOMKilled. Walk through your investigation.

### Answer

Commands

```bash
kubectl describe pod

kubectl top pod

kubectl logs --previous

kubectl describe deployment

kubectl get hpa

kubectl rollout history deployment
```

Verify

- Memory usage
- Requests
- Limits
- Recent deployment
- Traffic spike
- Memory leak

---

## Q2. What production mistakes commonly lead to OOMKilled?

### Answer

- Missing limits
- Very low limits
- Memory leaks
- Large cache
- Batch processing
- JVM heap larger than container memory
- Ignoring monitoring alerts

---

# 18. Commands Reference

```bash
kubectl get pods

kubectl describe pod

kubectl top pod

kubectl logs <pod>

kubectl logs <pod> --previous

kubectl describe deployment

kubectl get hpa

kubectl rollout undo deployment/<deployment>
```

---

# 19. Marathi Quick Revision

- Pod describe करा.
- OOMKilled verify करा.
- Previous logs तपासा.
- Memory usage तपासा.
- Requests आणि Limits तपासा.
- Deployment history verify करा.
- Root Cause शोधा.
- आवश्यक असल्यास rollback करा.

---

# 20. Related Runbooks

- 06-deployment-rollback.md
- 14-resource-exhaustion.md
- 16-health-probe-failures.md
- 17-api-server-unreachable.md

---

# 21. Marathi Summary (5+ Experience Revision)

## Interview Summary

OOMKilled म्हणजे container ने configured memory limit ओलांडल्यामुळे Linux Kernel ने process terminate केली आहे. Production मध्ये प्रथम `kubectl describe pod` वापरून OOMKilled verify करावे, `kubectl logs --previous` मधून crash आधीचे logs तपासावेत, `kubectl top pod` वापरून memory usage पाहावी आणि requests/limits validate करावेत. Memory limit वाढवण्यापूर्वी memory leak किंवा application bug आहे का ते निश्चित करणे अत्यावश्यक आहे.

### Production Investigation Flow

```
Alert

↓

Pod Restart

↓

Describe Pod

↓

OOMKilled

↓

Previous Logs

↓

Memory Usage

↓

Requests / Limits

↓

Recent Deployment

↓

Memory Leak?

↓

Rollback / Fix

↓

Validation

↓

RCA
```

### Production Story

एका production fintech platform मध्ये payment service प्रत्येक 3-4 मिनिटांनी restart होत होती. `kubectl describe pod` मध्ये OOMKilled दिसले. `kubectl logs --previous` मधून नवीन release मध्ये cache cleanup logic तुटल्याचे दिसले आणि memory सतत वाढत होती. DevOps team ने त्वरित rollback केला. Service स्थिर झाली आणि development team ने memory leak fix करून पुढील release दिला. Incident नंतर memory profiling CI pipeline मध्ये समाविष्ट करण्यात आले.

### 5+ Years Memory Trick

Interview मध्ये जर विचारले,

**"How do you troubleshoot an OOMKilled Pod in production?"**

उत्तर:

"I confirm the OOMKilled event using `kubectl describe pod`, review previous container logs, check current memory utilization with `kubectl top`, validate requests and limits, review recent deployments, determine whether the issue is a memory leak or capacity problem, perform rollback if required, validate business functionality, and complete the RCA."

