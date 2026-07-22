# Kubernetes Runbook 14 - Resource Exhaustion

# 1. Purpose

This runbook explains how to investigate and recover Kubernetes resource exhaustion issues affecting CPU, Memory, Ephemeral Storage, and Node capacity.

Resource exhaustion is one of the most common causes of production instability. It can lead to slow applications, Pod evictions, scheduling failures, OOMKilled containers, and complete node degradation.

The objective is to identify the exhausted resource, restore cluster stability, minimize customer impact, and document the Root Cause Analysis (RCA).

---

# 2. Scope

Applicable to

- CPU Exhaustion
- Memory Exhaustion
- Ephemeral Storage Exhaustion
- Node Resource Pressure
- Pod Resource Limits
- Requests and Limits
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

- Slow application
- API timeout
- Login failures
- Random service failures
- Dashboard loading slowly

Monitoring may report

- High CPU
- High Memory
- Node Pressure
- Pod Evictions
- OOMKilled
- Scheduling failures

Example

```
Traffic Increase

↓

CPU Exhausted

↓

Pods Slow

↓

Timeouts

↓

Customer Impact
```

---

# 4. Business Impact

Critical

- Multiple production services unavailable
- Customer transactions failing
- Cluster instability

Medium

- One microservice degraded
- High response time

Low

- Development workload impacted

---

# 5. Possible Root Causes

- CPU spike
- Memory leak
- Missing resource limits
- Incorrect requests
- Node overcommitment
- Traffic spike
- Infinite application loop
- Large batch job
- Ephemeral storage full
- Runaway container
- Horizontal scaling failure

---

# 6. Prerequisites

Required

- kubectl
- Metrics Server
- Cluster administrator access

Verify

```bash
kubectl auth can-i get nodes

kubectl auth can-i top pods

kubectl auth can-i top nodes
```

---

# 7. Initial Investigation

## Step 1

Check Nodes

```bash
kubectl get nodes
```

---

## Step 2

Check Node Utilization

```bash
kubectl top nodes
```

Example

```
CPU

95%

Memory

92%
```

---

## Step 3

Check Pod Utilization

```bash
kubectl top pods -A
```

Identify

- Highest CPU
- Highest Memory

---

## Step 4

Check Events

```bash
kubectl get events \
--sort-by=.metadata.creationTimestamp
```

Look for

- Evicted
- NodePressure
- OOMKilled
- FailedScheduling

---

# 8. Detailed Investigation

## Step 1

Describe Node

```bash
kubectl describe node <node-name>
```

Review

- Allocated Resources
- Conditions
- Events

---

## Step 2

Review Node Conditions

Expected

```
Ready=True

MemoryPressure=False

DiskPressure=False

PIDPressure=False
```

---

## Step 3

Describe Pod

```bash
kubectl describe pod <pod-name>
```

Review

- Requests
- Limits
- Restart Count
- Events

---

## Step 4

Review Logs

```bash
kubectl logs <pod-name>

kubectl logs <pod-name> --previous
```

Look for

- Infinite loops
- Memory allocation errors
- High request volume

---

## Step 5

Verify Requests and Limits

```bash
kubectl describe pod <pod-name>
```

Review

```
Requests

Limits
```

---

## Step 6

Check HPA

```bash
kubectl get hpa
```

Verify

- Current replicas
- Desired replicas
- CPU utilization

---

## Step 7

Check Cluster Autoscaler

Cloud environments

Verify

- Autoscaler running
- Scale-up failures
- Node provisioning

---

## Step 8

Review Recent Deployments

Check

- CI/CD pipeline
- Helm release
- Argo CD sync
- Recent production changes

---

# 9. Resolution Steps

Depending on findings

High CPU

- Scale Deployment
- Optimize application
- Increase CPU requests

Memory Leak

- Rollback deployment
- Restart Pods
- Fix application

Node Exhausted

- Add worker nodes
- Enable autoscaling

Ephemeral Storage Full

- Clean temporary files
- Increase storage

Incorrect Limits

- Update Deployment resources

---

# 10. Validation Steps

Verify

```bash
kubectl top nodes

kubectl top pods
```

Confirm

- CPU normalized
- Memory normalized
- No NodePressure

Business Validation

- Login
- APIs
- Dashboard
- Monitoring
- Alert recovery

---

# 11. Rollback Procedure

If the issue started after deployment

```bash
kubectl rollout undo deployment/<deployment>
```

If caused by incorrect resources

Restore previous Deployment manifest.

Validate

- Resource utilization
- Business functionality
- Monitoring

---

# 12. Escalation Matrix

L1

- Verify utilization
- Collect logs

↓

L2

- Review resources
- Review HPA

↓

Platform Team

- Cluster capacity
- Autoscaler

↓

Development Team

- Memory leak
- CPU optimization

↓

Cloud Team

- Node provisioning

---

# 13. Production Best Practices

- Always define requests and limits.
- Monitor CPU and Memory continuously.
- Configure HPA where appropriate.
- Enable Cluster Autoscaler.
- Monitor node utilization trends.
- Alert before capacity reaches critical levels.
- Perform capacity planning regularly.

---

# 14. Real Production Scenario

A production e-commerce platform experienced extremely slow response times during a festival sale.

Investigation

```bash
kubectl top nodes
```

showed

```
CPU

99%
```

HPA existed but Cluster Autoscaler was disabled.

Pods could not scale because no additional worker nodes were available.

After enabling autoscaling and adding worker nodes, CPU utilization dropped and application performance recovered.

Root Cause

Cluster capacity exhaustion during traffic spike.

---

# 15. Scenario Interview Questions

## Q1. CPU usage is above 95% across all nodes. What is your first step?

### Answer

Verify

```bash
kubectl top nodes

kubectl top pods
```

Identify whether the issue is application-specific or cluster-wide.

---

## Q2. Which Kubernetes features help prevent resource exhaustion?

### Answer

- Requests
- Limits
- HPA
- Cluster Autoscaler
- ResourceQuota

---

## Q3. Why shouldn't you immediately increase CPU limits?

### Answer

Because the root cause may be

- Application bug
- Infinite loop
- Traffic spike
- Memory leak

Increasing resources without investigation only hides the underlying problem.

---

# 16. Architecture Interview Questions

## Q1. Explain Kubernetes resource management architecture.

### Answer

```
Application

↓

Pod

↓

Requests / Limits

↓

Scheduler

↓

Worker Node

↓

CPU / Memory

↓

Autoscaler
```

---

## Q2. Which Kubernetes components participate?

### Answer

- Scheduler
- kubelet
- Metrics Server
- HPA
- Cluster Autoscaler
- Worker Nodes

---

# 17. Production Support Interview Questions

## Q1. Production becomes slow during peak traffic. How do you investigate?

### Answer

Commands

```bash
kubectl top nodes

kubectl top pods

kubectl describe node

kubectl describe pod

kubectl get hpa

kubectl get events
```

Verify

- CPU
- Memory
- Node conditions
- Scaling
- Resource limits
- Recent deployments

---

## Q2. What production mistakes commonly lead to resource exhaustion?

### Answer

- No resource limits
- Wrong requests
- Autoscaler disabled
- Memory leaks
- Capacity planning ignored
- Large batch jobs during business hours
- Infinite application loops

---

# 18. Commands Reference

```bash
kubectl top nodes

kubectl top pods

kubectl describe node

kubectl describe pod

kubectl logs <pod>

kubectl logs <pod> --previous

kubectl get hpa

kubectl get events

kubectl rollout undo deployment/<deployment>
```

---

# 19. Marathi Quick Revision

- Node utilization तपासा.
- Pod utilization तपासा.
- Node conditions verify करा.
- Requests आणि Limits तपासा.
- HPA verify करा.
- Autoscaler तपासा.
- Root Cause शोधा.
- Business validation करा.

---

# 20. Related Runbooks

- 04-node-notready.md
- 06-deployment-rollback.md
- 15-oomkilled.md
- 16-health-probe-failures.md
- 20-production-maintenance-checklist.md

---

# 21. Marathi Summary (5+ Experience Revision)

## Interview Summary

Production मध्ये resource exhaustion आल्यास प्रथम `kubectl top nodes` आणि `kubectl top pods` वापरून CPU आणि Memory utilization तपासावी. त्यानंतर Node conditions, Pod requests/limits, HPA, Cluster Autoscaler आणि recent deployments तपासावेत. Root Cause निश्चित झाल्यानंतरच scaling किंवा resource changes कराव्यात. Investigation शिवाय फक्त CPU किंवा Memory वाढवणे योग्य production practice नाही.

### Production Investigation Flow

```
Alert

↓

Node Utilization

↓

Pod Utilization

↓

Node Conditions

↓

Requests / Limits

↓

HPA

↓

Autoscaler

↓

Recent Changes

↓

Root Cause

↓

Fix

↓

Validation

↓

RCA
```

### Production Story

एका production OTT platform वर weekend live event दरम्यान अचानक API response time 10 सेकंदांपेक्षा जास्त झाला. `kubectl top nodes` मध्ये सर्व worker nodes 98% CPU वर चालत होते. Investigation मध्ये Cluster Autoscaler चुकीने disable असल्याचे आढळले. Autoscaler enable करून नवीन nodes जोडले गेले आणि HPA ने Pods scale केल्या. काही मिनिटांत response time पुन्हा सामान्य झाला. Incident review नंतर peak traffic capacity testing आणि autoscaler validation deployment checklist मध्ये समाविष्ट करण्यात आली.

### 5+ Years Memory Trick

Interview मध्ये जर विचारले,

**"How do you troubleshoot Kubernetes resource exhaustion in production?"**

उत्तर:

"I begin by checking node and pod resource utilization using `kubectl top`, review node conditions, verify requests and limits, inspect HPA and Cluster Autoscaler, identify whether the issue is application or infrastructure related, implement the appropriate scaling or rollback strategy, validate business functionality, and complete the RCA."

