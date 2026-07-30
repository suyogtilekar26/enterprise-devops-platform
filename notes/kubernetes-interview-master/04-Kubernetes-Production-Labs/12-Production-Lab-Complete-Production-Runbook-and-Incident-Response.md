# Kubernetes Interview Master Handbook

# Production Lab 12 - Complete Production Runbook and Incident Response

---

# Objective

Learn how production incidents are handled from detection to closure.

Topics

Incident Management

Severity Levels

On-call Process

War Room

Escalation

Runbooks

Root Cause Analysis (RCA)

Postmortem

Lessons Learned

---

# Production Scenario

It is 2:30 AM.

The monitoring system triggers an alert.

Customers report that the application is unavailable.

The on-call engineer receives a PagerDuty notification.

Your responsibility is to restore production as quickly as possible.

---

# Incident Lifecycle

Monitoring

↓

Alert

↓

Incident Created

↓

Engineer Assigned

↓

Investigation

↓

Mitigation

↓

Recovery

↓

RCA

↓

Postmortem

↓

Preventive Actions

---

# Severity Levels

SEV-1

Production Down

Business Critical

Immediate Response

---

SEV-2

Major Feature Impact

Partial Outage

High Priority

---

SEV-3

Minor Issue

Workaround Available

Normal Priority

---

SEV-4

Enhancement

Maintenance

Low Priority

---

# War Room Process

Incident Declared

↓

Bridge Call

↓

Incident Commander

↓

DevOps

↓

Developers

↓

Database Team

↓

Network Team

↓

Security Team

↓

Vendor (if required)

---

# Responsibilities

Incident Commander

Coordinates the response.

---

DevOps Engineer

Infrastructure

Kubernetes

CI/CD

Cloud

---

Application Team

Application Fixes

---

Database Team

Database Recovery

---

Network Team

DNS

Load Balancer

Firewall

---

# Initial Checklist

Verify Alert

↓

Check Dashboard

↓

Confirm Customer Impact

↓

Identify Scope

↓

Start War Room

↓

Assign Responsibilities

---

# Kubernetes Investigation

kubectl get nodes

---

kubectl get pods -A

---

kubectl get events -A

---

kubectl top nodes

---

kubectl top pods

---

kubectl describe pod POD_NAME

---

kubectl logs POD_NAME

---

kubectl rollout status deployment APP

---

# Infrastructure Investigation

Node Health

CPU

Memory

Disk

Network

Cloud Load Balancer

DNS

Storage

Certificates

---

# Common Incident Examples

CrashLoopBackOff

ImagePullBackOff

NodeNotReady

OOMKilled

Disk Full

API Server Down

Ingress Failure

Certificate Expired

DNS Failure

Database Connection Failure

---

# Recovery Strategy

Stop Further Impact

↓

Restore Service

↓

Validate

↓

Monitor

↓

Close Incident

---

# Communication Timeline

15 Minutes

Initial Status

---

30 Minutes

Business Update

---

60 Minutes

Executive Update

---

Resolution

Closure Message

---

# Root Cause Analysis (RCA)

Incident Summary

↓

Timeline

↓

Root Cause

↓

Impact

↓

Detection

↓

Resolution

↓

Preventive Actions

---

# Example RCA

Issue

Database storage became full.

Impact

Application unavailable for 18 minutes.

Root Cause

Disk monitoring threshold was not configured.

Resolution

Expanded storage.

Restarted database.

Prevention

Added storage alerts.

Weekly capacity review.

---

# Postmortem

What Happened

What Went Well

What Failed

Customer Impact

Lessons Learned

Action Items

Owner

Due Date

---

# Runbook Structure

Purpose

Prerequisites

Symptoms

Diagnosis

Commands

Recovery Steps

Validation

Rollback

Escalation

References

---

# Escalation Matrix

L1

Monitoring

Initial Investigation

---

L2

DevOps

Platform

Infrastructure

---

L3

Development

Architecture

Code

---

Vendor

Cloud Provider

Third-party Services

---

# Best Practices

Remain calm.

Communicate clearly.

Never make blind changes.

Record every action.

Automate repetitive recovery tasks.

Review every incident.

Update runbooks after each incident.

---

# Useful Commands

kubectl get nodes

---

kubectl get pods -A

---

kubectl get events -A

---

kubectl describe node NODE_NAME

---

kubectl logs POD_NAME

---

kubectl top nodes

---

kubectl top pods

---

kubectl rollout undo deployment APP

---

kubectl get ingress

---

kubectl get pvc

---

# Interview Questions

Q1

What is the first action during a SEV-1 incident?

Answer

Confirm the incident, assess customer impact, declare the incident if required and begin coordinated response while working to restore service.

---

Q2

What is an Incident Commander?

Answer

The person responsible for coordinating the incident response, assigning tasks, tracking progress and communicating status updates.

---

Q3

Why is an RCA important?

Answer

An RCA identifies the underlying cause of an incident and defines preventive actions to reduce the chance of recurrence.

---

Q4

What should a production runbook contain?

Answer

Symptoms, diagnosis steps, recovery commands, validation, rollback procedures, escalation contacts and references.

---

Q5

What is the difference between mitigation and resolution?

Answer

Mitigation reduces customer impact quickly.

Resolution permanently fixes the underlying problem.

---

# Scenario Based Interview

Question

Production becomes unavailable at midnight.

Customers cannot log in.

How will you respond?

Answer

1. Validate the alert.

2. Assess impact.

3. Declare incident if needed.

4. Open war room.

5. Check Kubernetes cluster health.

6. Review application logs.

7. Restore service.

8. Monitor recovery.

9. Perform RCA.

10. Update runbook.

---

Question

CPU usage is normal, but application latency suddenly increases.

What will you investigate?

Answer

1. Database performance.

2. External API latency.

3. Network issues.

4. Ingress and Load Balancer.

5. Recent deployments.

6. Application logs.

7. Tracing and APM data.

---

# Production Checklist

✔ Monitoring

✔ Alerting

✔ Incident Classification

✔ War Room

✔ Recovery

✔ Validation

✔ RCA

✔ Postmortem

✔ Runbooks

✔ Continuous Improvement

---

# Assignment

Simulate a SEV-1 production outage.

Perform

Detection

Investigation

Recovery

Validation

Communication

RCA

Postmortem

Prepare a complete incident report including timeline, root cause, corrective actions and preventive measures.

