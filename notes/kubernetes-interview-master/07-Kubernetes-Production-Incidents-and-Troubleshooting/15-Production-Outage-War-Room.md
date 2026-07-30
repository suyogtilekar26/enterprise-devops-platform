# Kubernetes Interview Master Handbook

# Section 07 - Kubernetes Production Incidents & Troubleshooting

# Chapter 15 - Production Outage War Room

---

# Objective

Learn how Production War Rooms operate during SEV-1 Kubernetes incidents, how engineers coordinate under pressure, and how to restore services using a structured incident management process.

This chapter focuses on real production incident handling followed by most SRE, Platform Engineering and DevOps teams.

---

# Interview Scenario

Time: 09:17 AM

PagerDuty Alert

"SEV-1 : Production Checkout Platform Down"

Impact

- Login unavailable
- Payment failures
- Order processing stopped
- Revenue loss
- Thousands of users affected

Engineering declares a SEV-1 incident.

You are the Kubernetes Platform Engineer joining the War Room.

Your responsibility is to identify the infrastructure issue and restore production as quickly as possible.

---

# What is a War Room?

A War Room is a centralized incident response meeting where all required teams collaborate until the incident is resolved.

Typical participants

- Incident Commander
- SRE Team
- Platform Engineers
- Kubernetes Engineers
- Network Team
- Database Team
- Application Team
- Security Team
- Cloud Team
- Management

---

# SEV-1 Incident Timeline

Alert

↓

Incident Declared

↓

War Room Created

↓

Roles Assigned

↓

Investigation Begins

↓

Root Cause Identified

↓

Recovery

↓

Validation

↓

Customer Communication

↓

Incident Closed

↓

RCA Meeting

---

# War Room Roles

## Incident Commander

Responsible for

- Leading incident
- Assigning tasks
- Prioritizing work
- Stakeholder communication
- Final decision making

---

## Scribe

Responsible for

- Recording timeline
- Logging commands
- Recording findings
- Documenting decisions

---

## Platform Engineer

Responsible for

- Kubernetes
- Control Plane
- Worker Nodes
- Networking
- Storage

---

## Application Team

Responsible for

- Application logs
- Recent deployments
- Feature releases
- Rollbacks

---

## Database Team

Responsible for

- Database health
- Replication
- Storage
- Connections

---

## Network Team

Responsible for

- DNS
- Firewall
- LoadBalancer
- Routing
- Connectivity

---

# Golden Rules During Incident

Stay Calm

Communicate Clearly

Do Not Guess

Collect Evidence

One Change At A Time

Document Every Action

Always Validate Before Closing

---

# Production Investigation Workflow

Alert

↓

Monitoring Dashboard

↓

Application Health

↓

Kubernetes Cluster

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

Recovery

---

# Step 1

Confirm Business Impact

Questions

Which application?

Which region?

How many users?

When did it start?

---

# Step 2

Verify Cluster

```bash
kubectl get nodes
```

---

# Step 3

Verify Pods

```bash
kubectl get pods -A
```

---

# Step 4

Verify Events

```bash
kubectl get events -A --sort-by=.metadata.creationTimestamp
```

---

# Step 5

Check Recent Deployments

```bash
kubectl rollout history deployment checkout
```

---

# Step 6

Check Logs

```bash
kubectl logs deployment/checkout
```

---

# Step 7

Verify Services

```bash
kubectl get svc -A
```

---

# Step 8

Verify Ingress

```bash
kubectl get ingress -A
```

---

# Step 9

Verify Endpoints

```bash
kubectl get endpoints -A
```

---

# Step 10

Validate Recovery

Application

Monitoring

Business Transactions

Customer Access

---

# Real Production Timeline

09:17

Alert triggered.

---

09:19

Incident declared.

---

09:20

War Room started.

---

09:23

Platform Team confirms

Worker Nodes healthy.

---

09:25

Application Team confirms

New deployment completed 5 minutes ago.

---

09:28

Pods

CrashLoopBackOff.

---

09:31

Logs

```text
Database migration failed.
```

---

09:34

Deployment rolled back.

---

09:36

Pods healthy.

---

09:38

Customer traffic restored.

---

09:45

Incident resolved.

---

# Decision Tree

Users Cannot Access Application

↓

Infrastructure Healthy?

↓

YES

↓

Application Investigation

↓

Recent Deployment?

↓

YES

↓

Rollback

↓

Validate

↓

Close Incident

---

# Production Communication Template

Incident Status

SEV-1

Application

Checkout

Current Status

Investigation In Progress

Business Impact

Customer Transactions Affected

Next Update

15 Minutes

---

# Recovery Commands

Rollback Deployment

```bash
kubectl rollout undo deployment checkout
```

---

Restart Deployment

```bash
kubectl rollout restart deployment checkout
```

---

Check Rollout

```bash
kubectl rollout status deployment checkout
```

---

Verify Pods

```bash
kubectl get pods
```

---

Verify Logs

```bash
kubectl logs deployment/checkout
```

---

# Validation Checklist

Applications Healthy

Pods Running

Nodes Ready

Ingress Healthy

Services Healthy

Database Connected

Monitoring Green

Customer Transactions Successful

---

# RCA Template

Incident

Production Outage

Root Cause

Application Deployment Failure

Business Impact

Customer Checkout Unavailable

Detection

Monitoring Alert

Resolution

Deployment Rollback

Preventive Action

Deployment Validation

Canary Releases

Automated Smoke Tests

---

# Interview Questions

## Q1. What is the first responsibility during a SEV-1 incident?

Answer

Understand the business impact, assemble the required teams, assign roles and begin structured investigation.

---

## Q2. Who leads a War Room?

Answer

The Incident Commander coordinates the response, assigns responsibilities and communicates with stakeholders.

---

## Q3. Should multiple fixes be applied simultaneously?

Answer

No. Apply one controlled change at a time so that the impact of each action can be verified.

---

## Q4. When should an incident be closed?

Answer

Only after validating that services are fully restored, monitoring is healthy, customer impact has ended and all stakeholders are informed.

---

## Q5. What happens after the incident?

Answer

A Root Cause Analysis (RCA) meeting is conducted to identify the root cause, contributing factors, lessons learned and preventive actions.

---

# Assignment

A SEV-1 production outage affects the checkout platform.

Prepare

- War Room Plan
- Team Responsibilities
- Investigation Flow
- Recovery Plan
- Validation
- RCA
- Preventive Actions

---

# Assignment Solution

## Step 1

Declare SEV-1.

---

## Step 2

Create War Room.

---

## Step 3

Assign

- Incident Commander
- Platform Team
- Application Team
- Database Team
- Network Team
- Scribe

---

## Step 4

Investigate

- Cluster
- Nodes
- Pods
- Logs
- Networking
- Database

---

## Step 5

Identify Root Cause.

---

## Step 6

Recover Service.

---

## Step 7

Validate

- Monitoring
- Business Transactions
- Customer Access

---

## Step 8

Complete RCA.

---

# Production Best Practices

✔ Define Incident Severity Levels

✔ Maintain On-Call Rotation

✔ Maintain Updated Runbooks

✔ Practice Game Days

✔ Use Canary Deployments

✔ Use Automated Rollback

✔ Monitor Business KPIs

✔ Record Complete Incident Timeline

✔ Conduct Blameless RCA

✔ Track Action Items Until Completion

---

# Runbook Checklist

□ SEV-1 Declared

□ War Room Started

□ Incident Commander Assigned

□ Business Impact Confirmed

□ Root Cause Identified

□ Recovery Completed

□ Monitoring Healthy

□ Customer Validation Completed

□ RCA Scheduled

□ Preventive Actions Assigned

---

# Common Mistakes

❌ No Incident Commander

❌ Poor Communication

❌ Making Multiple Changes Simultaneously

❌ Ignoring Business Impact

❌ No Timeline Documentation

❌ Closing Incident Too Early

❌ Skipping Validation

❌ Not Conducting RCA

