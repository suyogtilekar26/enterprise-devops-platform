# Kubernetes Interview Master Handbook

# Section 07 - Kubernetes Production Incidents & Troubleshooting

# Chapter 19 - Interview Based Incident Scenarios

---

# Objective

Master real production-style Kubernetes incident scenarios frequently asked in DevOps, SRE, Platform Engineering and Cloud Engineer interviews.

These scenarios evaluate

- Troubleshooting ability
- Production thinking
- Root Cause Analysis
- Decision making
- Communication
- Recovery planning

---

# Interview Scenario 1

## CrashLoopBackOff After Production Deployment

### Situation

A new application version was deployed.

Within five minutes

- Pods entered CrashLoopBackOff
- Customer requests failed
- Alerts triggered

---

### Interview Question

How would you investigate this incident?

---

### Expected Answer

Step 1

Check Pods

```bash
kubectl get pods
```

---

Step 2

Describe Pod

```bash
kubectl describe pod <pod>
```

---

Step 3

Check Previous Logs

```bash
kubectl logs <pod> --previous
```

---

Step 4

Review

- ConfigMap
- Secret
- Image
- Database Connectivity
- Environment Variables

---

Step 5

Rollback

```bash
kubectl rollout undo deployment <deployment>
```

---

Step 6

Validate

- Pods Running
- Customer Traffic
- Monitoring

---

# Interview Scenario 2

## Node Becomes NotReady

### Situation

One worker node suddenly becomes NotReady.

Pods begin moving to other nodes.

---

### Interview Question

How do you investigate?

---

### Expected Answer

Verify Node

```bash
kubectl get nodes
```

---

Describe Node

```bash
kubectl describe node <node>
```

---

Check kubelet

```bash
journalctl -u kubelet
```

---

Verify

- Disk
- Memory
- Network
- Container Runtime

---

Recover kubelet.

Validate scheduling.

---

# Interview Scenario 3

## Users Receive HTTP 503

### Situation

Application Pods are healthy.

Users receive HTTP 503.

---

### Expected Investigation

Check

```bash
kubectl get ingress

kubectl get svc

kubectl get endpoints
```

---

Likely Root Causes

- Empty Endpoints
- Incorrect Service Selector
- Ingress Misconfiguration
- Backend Failure

---

# Interview Scenario 4

## Pods Remain Pending

### Situation

Deployment created.

Pods never start.

---

### Investigation

```bash
kubectl describe pod <pod>
```

Review

- Resources
- PVC
- Taints
- Node Selector
- Affinity

---

# Interview Scenario 5

## API Server Unavailable

### Situation

Every kubectl command fails.

---

### Investigation

SSH

Control Plane

Verify

```bash
crictl ps
```

---

Check

- API Server
- etcd
- Scheduler
- Controller Manager

---

Verify

```bash
ETCDCTL_API=3 etcdctl endpoint health
```

---

# Interview Scenario 6

## Database Connection Failure

### Situation

Pods healthy.

Application unavailable.

Logs

```text
connection refused
```

---

### Investigation

Verify

- Database
- DNS
- Service
- Secret
- NetworkPolicy

---

# Interview Scenario 7

## DNS Failure

### Situation

Pods cannot resolve services.

---

### Investigation

```bash
kubectl exec -it <pod> -- nslookup kubernetes.default
```

---

Verify

- CoreDNS
- ConfigMap
- Network

---

# Interview Scenario 8

## High CPU Usage

### Situation

Application latency increases.

---

### Investigation

```bash
kubectl top nodes

kubectl top pods
```

---

Review

- Recent Deployments
- Traffic
- CPU Limits
- Application Profiling

---

# Interview Scenario 9

## PersistentVolume Failure

### Situation

Pods remain Pending.

PVC not bound.

---

### Investigation

```bash
kubectl get pvc

kubectl get pv

kubectl describe pvc <pvc>
```

---

Review

- StorageClass
- CSI Driver
- PV Availability

---

# Interview Scenario 10

## Complete Production Outage

### Situation

Checkout Platform Down

Login Down

Payment Failure

Monitoring Critical

---

### Expected Investigation Order

Business Impact

↓

Monitoring

↓

Nodes

↓

Pods

↓

Networking

↓

Storage

↓

Database

↓

Applications

↓

Recovery

↓

Validation

---

# Rapid Fire Interview Questions

## Q1

A Pod is running but customers cannot access the application.

Where do you investigate?

Answer

Ingress

↓

Service

↓

Endpoints

↓

Application

---

## Q2

Pods remain Pending.

First command?

Answer

```bash
kubectl describe pod <pod>
```

---

## Q3

API Server unavailable.

Most critical component?

Answer

etcd.

---

## Q4

CrashLoopBackOff after deployment.

Immediate action?

Answer

Collect logs, identify root cause and rollback if customer impact is significant.

---

## Q5

Node becomes NotReady.

First investigation?

Answer

Check kubelet, node conditions, container runtime, disk and memory.

---

## Q6

Users receive HTTP 503.

Likely infrastructure components?

Answer

Ingress, Service, Endpoints, backend Pods.

---

## Q7

DNS lookup fails.

Where do you investigate?

Answer

CoreDNS, DNS configuration, networking and NetworkPolicies.

---

## Q8

Storage mount fails.

Investigate?

Answer

PVC, PV, StorageClass and CSI Driver.

---

## Q9

Monitoring shows high CPU.

Immediate investigation?

Answer

Identify whether the CPU spike is at the node, pod or application level.

---

## Q10

Production deployment fails.

Best recovery?

Answer

Rollback to the previous stable release after collecting sufficient evidence.

---

# Senior-Level Scenario

Question

Production checkout is unavailable.

Monitoring shows

- All Nodes Ready
- Pods Running
- Services Healthy

Customers still receive HTTP 503.

How do you proceed?

---

Expected Thought Process

Step 1

Verify Ingress.

---

Step 2

Verify Endpoints.

---

Step 3

Verify Service Selectors.

---

Step 4

Verify Backend Application.

---

Step 5

Review Recent Deployment.

---

Step 6

Rollback if required.

---

Step 7

Validate customer transactions.

---

# Principal Engineer Scenario

Question

Multiple microservices fail simultaneously.

How do you determine whether this is

- Infrastructure
- Kubernetes
- Networking
- Storage
- Application

---

Expected Answer

Follow a layer-by-layer investigation.

Infrastructure

↓

Cluster

↓

Networking

↓

Storage

↓

Database

↓

Application

Never assume the root cause before collecting evidence.

---

# Assignment

For each scenario above prepare

- Investigation Plan
- Commands
- Root Cause
- Recovery
- Validation
- RCA

---

# Assignment Solution

## Step 1

Confirm business impact.

---

## Step 2

Identify affected Kubernetes layer.

---

## Step 3

Collect logs and evidence.

---

## Step 4

Confirm root cause.

---

## Step 5

Recover using the least disruptive approach.

---

## Step 6

Validate infrastructure, applications and business transactions.

---

## Step 7

Complete RCA.

---

# Production Best Practices

✔ Follow a Structured Investigation

✔ Collect Evidence Before Changes

✔ Roll Back When Customer Impact Is High

✔ Validate Every Recovery

✔ Maintain Incident Timelines

✔ Practice Interview Scenarios Regularly

✔ Build Troubleshooting Muscle Memory

✔ Keep Runbooks Updated

✔ Perform Blameless RCAs

✔ Continuously Improve Operational Processes

---

# Runbook Checklist

□ Business Impact Confirmed

□ Investigation Started

□ Evidence Collected

□ Root Cause Identified

□ Recovery Executed

□ Validation Successful

□ Stakeholders Updated

□ Incident Closed

□ RCA Completed

□ Preventive Actions Assigned

---

# Common Mistakes

❌ Jumping Directly to Restarting Pods

❌ Assuming the Application Is Always the Problem

❌ Ignoring Events and Logs

❌ Applying Multiple Fixes Simultaneously

❌ Skipping Validation

❌ Forgetting Customer Impact

❌ Closing Incidents Too Early

❌ Not Documenting Lessons Learned

