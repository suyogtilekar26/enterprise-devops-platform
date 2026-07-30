# Kubernetes Interview Master Handbook

# Section 07 - Kubernetes Production Incidents & Troubleshooting

# Chapter 16 - Real World SRE Incident Playbooks

---

# Objective

Learn production-ready Incident Playbooks used by SRE and Platform Engineering teams to resolve Kubernetes incidents quickly, consistently and safely.

These playbooks follow the same structured process used by Google SRE, AWS, Azure, Red Hat, VMware and large enterprise DevOps teams.

---

# What is an Incident Playbook?

An Incident Playbook is a predefined operational guide that provides engineers with a repeatable process for diagnosing, recovering and validating a production incident.

Benefits

- Faster recovery
- Reduced human error
- Standardized troubleshooting
- Easier handoffs
- Better documentation
- Improved RCA quality

---

# Standard Incident Playbook

Alert

↓

Incident Declared

↓

Business Impact

↓

Evidence Collection

↓

Root Cause Analysis

↓

Recovery

↓

Validation

↓

Communication

↓

RCA

↓

Preventive Actions

---

# Playbook 1

## Production Application Down

### Symptoms

- HTTP 500
- HTTP 503
- Login unavailable
- Checkout unavailable

### Investigation

```bash
kubectl get pods -A
```

```bash
kubectl get svc -A
```

```bash
kubectl get ingress -A
```

```bash
kubectl get endpoints -A
```

```bash
kubectl logs deployment/<application>
```

### Possible Root Causes

- CrashLoopBackOff
- ImagePullBackOff
- Empty Endpoints
- Database unavailable
- Bad deployment
- DNS failure

### Recovery

Rollback deployment.

Restart application.

Recover backend services.

Validate customer transactions.

---

# Playbook 2

## Node NotReady

### Symptoms

Pods not scheduling.

Node unavailable.

### Investigation

```bash
kubectl get nodes
```

```bash
kubectl describe node <node>
```

```bash
journalctl -u kubelet
```

### Possible Root Causes

- kubelet failure
- Disk full
- Memory exhaustion
- Network failure
- Container runtime failure

### Recovery

Restart kubelet.

Recover runtime.

Free disk.

Validate node.

---

# Playbook 3

## Pod CrashLoopBackOff

### Symptoms

Pods continuously restarting.

### Investigation

```bash
kubectl get pods
```

```bash
kubectl describe pod <pod>
```

```bash
kubectl logs <pod> --previous
```

### Possible Root Causes

- Bad configuration
- Missing Secret
- Database unavailable
- Application bug
- Startup failure

### Recovery

Correct configuration.

Rollback deployment.

Restart Pod.

---

# Playbook 4

## ImagePullBackOff

### Symptoms

Pods never start.

### Investigation

```bash
kubectl describe pod <pod>
```

### Verify

- Image Name
- Image Tag
- Registry
- ImagePullSecret

### Recovery

Correct image.

Authenticate registry.

Redeploy application.

---

# Playbook 5

## DNS Failure

### Symptoms

Applications cannot resolve services.

### Investigation

```bash
kubectl exec -it <pod> -- nslookup kubernetes.default
```

```bash
kubectl logs -n kube-system deployment/coredns
```

### Recovery

Recover CoreDNS.

Restore ConfigMap.

Validate DNS.

---

# Playbook 6

## Ingress Failure

### Symptoms

External users receive

HTTP 502

HTTP 503

### Investigation

```bash
kubectl get ingress -A
```

```bash
kubectl get svc -A
```

```bash
kubectl get endpoints -A
```

### Recovery

Recover Ingress Controller.

Recover backend Pods.

Validate LoadBalancer.

---

# Playbook 7

## PersistentVolume Failure

### Symptoms

Pods Pending.

Volume Mount Failure.

### Investigation

```bash
kubectl get pvc
```

```bash
kubectl get pv
```

```bash
kubectl describe pvc <pvc>
```

### Recovery

Recover storage.

Reattach volume.

Restart workload.

---

# Playbook 8

## High CPU Incident

### Symptoms

Latency increases.

Applications slow.

### Investigation

```bash
kubectl top pods
```

```bash
kubectl top nodes
```

### Recovery

Scale application.

Optimize workload.

Investigate CPU consumers.

---

# Playbook 9

## High Memory Incident

### Symptoms

OOMKilled

Restarts

### Investigation

```bash
kubectl top pods
```

```bash
kubectl describe pod <pod>
```

### Recovery

Increase limits.

Fix memory leak.

Scale application.

---

# Playbook 10

## etcd Failure

### Symptoms

kubectl unavailable.

Control Plane unavailable.

### Investigation

```bash
ETCDCTL_API=3 etcdctl endpoint health
```

```bash
ETCDCTL_API=3 etcdctl member list
```

### Recovery

Recover quorum.

Restore snapshot.

Validate API Server.

---

# Universal Investigation Checklist

□ Business Impact Confirmed

□ Incident Severity Assigned

□ Monitoring Reviewed

□ Cluster Health Verified

□ Nodes Verified

□ Pods Verified

□ Events Reviewed

□ Logs Reviewed

□ Networking Verified

□ Storage Verified

□ Database Verified

□ Recent Deployment Reviewed

□ Root Cause Confirmed

□ Recovery Executed

□ Validation Completed

---

# Universal Recovery Checklist

□ Services Available

□ Pods Healthy

□ Nodes Ready

□ Ingress Healthy

□ DNS Healthy

□ Storage Healthy

□ Monitoring Green

□ Alerts Cleared

□ Customer Transactions Successful

---

# Universal RCA Template

Incident

Root Cause

Business Impact

Detection Time

Recovery Time

Resolution

Lessons Learned

Preventive Actions

Owner

Target Date

---

# Interview Questions

## Q1. What is an Incident Playbook?

Answer

A documented step-by-step operational guide used to investigate, recover and validate production incidents consistently.

---

## Q2. Why do SRE teams use playbooks?

Answer

To reduce recovery time, standardize incident handling, minimize mistakes and improve operational consistency.

---

## Q3. What is the first step in every production incident?

Answer

Understand the business impact before making any infrastructure changes.

---

## Q4. Why should engineers collect evidence before recovery?

Answer

Evidence helps identify the real root cause and supports accurate RCA after the incident.

---

## Q5. What should happen after every production incident?

Answer

Complete validation, stakeholder communication, blameless RCA and implementation of preventive actions.

---

# Assignment

Create a complete Incident Playbook for a production outage involving

- Kubernetes
- Networking
- Storage
- Database
- Application

Include

- Investigation
- Commands
- Recovery
- Validation
- RCA

---

# Assignment Solution

## Step 1

Confirm business impact.

---

## Step 2

Verify cluster health.

---

## Step 3

Collect logs and evidence.

---

## Step 4

Identify root cause.

---

## Step 5

Recover affected component.

---

## Step 6

Validate applications and customer transactions.

---

## Step 7

Complete RCA.

---

# Production Best Practices

✔ Maintain Playbooks for Every Critical Service

✔ Review Playbooks Quarterly

✔ Automate Repetitive Recovery Tasks

✔ Practice Incident Simulations

✔ Keep Commands Updated

✔ Maintain Ownership Information

✔ Test Recovery Procedures

✔ Conduct Blameless RCAs

✔ Continuously Improve Documentation

✔ Measure MTTR and Incident Trends

---

# Runbook Checklist

□ Incident Declared

□ Business Impact Understood

□ Evidence Collected

□ Root Cause Confirmed

□ Recovery Executed

□ Validation Completed

□ Customers Verified

□ Stakeholders Updated

□ RCA Completed

□ Preventive Actions Assigned

---

# Common Mistakes

❌ Skipping Evidence Collection

❌ Applying Multiple Fixes Simultaneously

❌ Ignoring Business Impact

❌ Restarting Components Without Investigation

❌ Not Following the Playbook

❌ Poor Communication

❌ Closing Incident Without Validation

❌ Skipping Preventive Actions

