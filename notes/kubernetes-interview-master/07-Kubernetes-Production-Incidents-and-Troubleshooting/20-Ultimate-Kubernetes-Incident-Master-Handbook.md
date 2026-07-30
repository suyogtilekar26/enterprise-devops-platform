# Kubernetes Interview Master Handbook

# Section 07 - Kubernetes Production Incidents & Troubleshooting

# Chapter 20 - Ultimate Kubernetes Incident Master Handbook

---

# Objective

This handbook consolidates everything learned in this section into a single production-ready incident response guide.

It is intended to serve as a quick-reference document during interviews, production incidents and SRE on-call responsibilities.

---

# Ultimate Production Incident Lifecycle

Monitoring Alert

↓

Incident Detection

↓

Business Impact Assessment

↓

Incident Classification

↓

SEV Assignment

↓

War Room (If Required)

↓

Evidence Collection

↓

Infrastructure Investigation

↓

Kubernetes Investigation

↓

Application Investigation

↓

Root Cause Identification

↓

Controlled Recovery

↓

Validation

↓

Customer Confirmation

↓

Incident Closure

↓

Blameless RCA

↓

Preventive Actions

---

# Kubernetes Layer-by-Layer Investigation

Layer 1

Cloud Infrastructure

↓

Layer 2

Load Balancer

↓

Layer 3

Network

↓

Layer 4

DNS

↓

Layer 5

Ingress

↓

Layer 6

Service

↓

Layer 7

Endpoints

↓

Layer 8

Pods

↓

Layer 9

Containers

↓

Layer 10

Application

↓

Layer 11

Database

↓

Layer 12

External Dependencies

---

# Universal Production Investigation Commands

## Cluster Health

```bash
kubectl cluster-info
```

---

## Nodes

```bash
kubectl get nodes
```

---

## Pods

```bash
kubectl get pods -A
```

---

## Events

```bash
kubectl get events -A --sort-by=.metadata.creationTimestamp
```

---

## Services

```bash
kubectl get svc -A
```

---

## Endpoints

```bash
kubectl get endpoints -A
```

---

## Ingress

```bash
kubectl get ingress -A
```

---

## PVC

```bash
kubectl get pvc -A
```

---

## PV

```bash
kubectl get pv
```

---

## Logs

```bash
kubectl logs <pod-name>

kubectl logs <pod-name> --previous
```

---

## Describe

```bash
kubectl describe pod <pod-name>
```

---

## Node Resources

```bash
kubectl top nodes
```

---

## Pod Resources

```bash
kubectl top pods -A
```

---

# Incident Decision Matrix

| Incident | First Check | Most Common Root Cause |
|----------|-------------|------------------------|
| CrashLoopBackOff | Logs | Application Failure |
| ImagePullBackOff | Image | Registry Authentication |
| Pending Pod | Describe Pod | Resources / Scheduler |
| Node NotReady | kubelet | Node Failure |
| HTTP 503 | Endpoints | Backend Pods |
| DNS Failure | CoreDNS | DNS Configuration |
| Storage Failure | PVC | Storage Provisioner |
| API Server Down | etcd | Control Plane Failure |
| High CPU | kubectl top | Traffic / Application |
| High Memory | kubectl top | Memory Leak |

---

# Production Severity Matrix

## SEV-1

Customer Impact

Complete Service Outage

Examples

- API Server Down
- etcd Failure
- Payment Failure
- Checkout Failure
- Complete Cluster Outage

Target MTTR

Less than 30 Minutes

---

## SEV-2

Partial Service Impact

Examples

- Single Node Failure
- Storage Issue
- Network Issue
- Monitoring Failure

Target MTTR

Less than 2 Hours

---

## SEV-3

Minor Degradation

Examples

- Warning Alerts
- Single Pod Failure
- Performance Degradation

Target MTTR

Less than 1 Business Day

---

# Universal Recovery Workflow

1.

Understand Business Impact

↓

2.

Collect Evidence

↓

3.

Review Monitoring

↓

4.

Review Events

↓

5.

Review Logs

↓

6.

Identify Root Cause

↓

7.

Apply Controlled Recovery

↓

8.

Validate Infrastructure

↓

9.

Validate Applications

↓

10.

Validate Customer Transactions

↓

11.

Close Incident

↓

12.

Complete RCA

---

# Universal Validation Checklist

□ Nodes Ready

□ Pods Running

□ Services Healthy

□ Endpoints Healthy

□ Ingress Healthy

□ DNS Healthy

□ Storage Healthy

□ Monitoring Green

□ API Server Healthy

□ etcd Healthy

□ Scheduler Healthy

□ Controller Manager Healthy

□ Applications Healthy

□ Database Connected

□ Customer Transactions Successful

---

# Universal RCA Template

## Incident

---

## Severity

---

## Detection Time

---

## Resolution Time

---

## Business Impact

---

## Timeline

---

## Root Cause

---

## Contributing Factors

---

## Evidence Collected

---

## Recovery Steps

---

## Validation

---

## Lessons Learned

---

## Preventive Actions

---

## Owner

---

## Target Completion Date

---

# Golden Rules for Every Production Incident

1.

Stay Calm

---

2.

Understand Business Impact

---

3.

Never Assume Root Cause

---

4.

Collect Evidence First

---

5.

Make One Change At A Time

---

6.

Validate Every Change

---

7.

Communicate Frequently

---

8.

Document Everything

---

9.

Perform Blameless RCA

---

10.

Implement Preventive Actions

---

# Top Interview Questions

## Q1

What is your approach during a SEV-1 Kubernetes incident?

Answer

Assess business impact, assign severity, collect evidence, investigate systematically from infrastructure to application, recover using controlled changes, validate services and complete an RCA.

---

## Q2

How do you reduce MTTR?

Answer

Maintain runbooks, decision trees, monitoring, automation, regular incident drills and clear communication processes.

---

## Q3

Why should engineers avoid making multiple changes during an incident?

Answer

Multiple simultaneous changes make it difficult to determine which action resolved the issue and increase operational risk.

---

## Q4

What is the most important activity after recovering production?

Answer

Validate complete service recovery, confirm customer impact is resolved and conduct a blameless Root Cause Analysis.

---

## Q5

What qualities distinguish a Senior SRE during production incidents?

Answer

Calm decision-making, structured troubleshooting, strong communication, evidence-based recovery, operational leadership and continuous improvement.

---

# Final Assignment

You are the primary on-call Kubernetes Platform Engineer.

A SEV-1 incident has occurred.

Symptoms

- Customers cannot log in.
- Payment service unavailable.
- HTTP 503 responses.
- Monitoring dashboards red.
- PagerDuty triggered.
- CEO requests updates every 15 minutes.

Prepare a complete production response including

- Business Impact Assessment
- Severity Classification
- War Room Plan
- Investigation Workflow
- Commands
- Root Cause Analysis
- Recovery Plan
- Validation Checklist
- Communication Plan
- Final RCA
- Preventive Actions

---

# Assignment Solution

## Step 1

Assess business impact and declare SEV-1.

---

## Step 2

Start the War Room and assign Incident Commander, Scribe and technical owners.

---

## Step 3

Investigate systematically

- Infrastructure
- Kubernetes
- Networking
- Storage
- Database
- Application

using the standard command set.

---

## Step 4

Collect evidence before making changes.

---

## Step 5

Identify the verified root cause.

---

## Step 6

Execute the least disruptive recovery.

---

## Step 7

Validate

- Infrastructure
- Applications
- Monitoring
- Customer Transactions

---

## Step 8

Communicate resolution to stakeholders.

---

## Step 9

Complete a blameless RCA.

---

## Step 10

Implement preventive actions and update runbooks.

---

# Production Best Practices

✔ Standardize Incident Response

✔ Maintain Accurate Runbooks

✔ Automate Health Checks

✔ Practice Quarterly Game Days

✔ Keep etcd Backups Current

✔ Monitor Critical Business KPIs

✔ Review Every SEV-1 Incident

✔ Continuously Improve Alert Quality

✔ Measure MTTR, MTTD and Availability

✔ Build a Culture of Operational Excellence

---

# Master Runbook Checklist

□ Alert Acknowledged

□ Severity Assigned

□ Business Impact Confirmed

□ War Room Created (If Required)

□ Evidence Collected

□ Root Cause Confirmed

□ Recovery Executed

□ Validation Completed

□ Customer Impact Resolved

□ Stakeholders Updated

□ Incident Closed

□ RCA Completed

□ Preventive Actions Assigned

□ Runbooks Updated

□ Lessons Shared

---

# Common Mistakes

❌ Ignoring Business Impact

❌ Skipping Evidence Collection

❌ Restarting Components Without Investigation

❌ Making Multiple Changes Simultaneously

❌ Poor Communication

❌ Closing Incidents Without Validation

❌ Skipping Blameless RCA

❌ Failing to Update Documentation

❌ Repeating the Same Incident Due to Missing Preventive Actions

❌ Treating Recovery as the End Instead of the Beginning of Continuous Improvement

