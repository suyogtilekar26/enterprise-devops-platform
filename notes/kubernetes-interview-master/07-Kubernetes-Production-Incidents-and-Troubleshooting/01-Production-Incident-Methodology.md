# Kubernetes Interview Master Handbook

# Section 07 - Kubernetes Production Incidents & Troubleshooting

# Chapter 01 - Production Incident Methodology

---

# Objective

Learn a structured, production-grade methodology for investigating, troubleshooting, mitigating and permanently resolving Kubernetes production incidents.

This methodology is used by Senior DevOps Engineers, SREs, Platform Engineers and Cloud Architects in enterprise environments.

---

# Interview Scenario

It is 2:15 AM.

PagerDuty wakes you up.

The alert says:

"Checkout Service Error Rate > 30%"

Customers cannot place orders.

CEO is asking for ETA.

Engineering teams have joined the bridge.

What do you do?

---

# Golden Rule

Never start fixing anything immediately.

Always

Observe

↓

Collect Evidence

↓

Identify Root Cause

↓

Mitigate

↓

Recover

↓

Perform RCA

---

# Production Incident Lifecycle

Incident Detected

↓

Alert Triggered

↓

Incident Acknowledged

↓

Impact Assessment

↓

Evidence Collection

↓

Hypothesis

↓

Validation

↓

Mitigation

↓

Recovery

↓

Root Cause Analysis

↓

Preventive Action

↓

Postmortem

---

# Incident Severity

## SEV-1

Complete production outage

Examples

- Entire application unavailable
- Database unavailable
- API Gateway down
- Kubernetes Control Plane failure

Response Time

Immediate

---

## SEV-2

Major degradation

Examples

- Checkout slow
- Login failing
- Payment timeout
- One region unavailable

Response Time

Within Minutes

---

## SEV-3

Partial degradation

Examples

- Dashboard slow
- One service failing
- Increased latency

Response Time

Business Priority

---

## SEV-4

Minor Issue

Examples

- Cosmetic issue
- Low priority alert
- Monitoring warning

---

# Production Incident Workflow

Alert

↓

Acknowledge

↓

Join Incident Bridge

↓

Assign Incident Commander

↓

Assess Business Impact

↓

Collect Evidence

↓

Identify Root Cause

↓

Mitigate

↓

Recover

↓

Validate

↓

Close Incident

↓

RCA

---

# Incident Roles

## Incident Commander

Coordinates entire incident

Responsibilities

- Communication
- Prioritization
- Decision Making

---

## Scribe

Documents timeline

Records

- Commands executed
- Decisions
- Findings
- Recovery steps

---

## Technical Lead

Performs troubleshooting

Coordinates engineering teams

---

## Communication Lead

Updates

- Business Teams
- Leadership
- Customers

---

# Investigation Methodology

Always investigate in this order

Users

↓

Load Balancer

↓

Ingress

↓

Service

↓

Pods

↓

Containers

↓

Node

↓

Cluster

↓

Database

↓

External Dependencies

Never randomly jump between components.

---

# First Five Questions

1.

What changed?

---

2.

When did the issue start?

---

3.

Which users are affected?

---

4.

Which services are affected?

---

5.

Can we reproduce the issue?

---

# Initial Information Collection

Collect

Current alerts

Current deployments

Recent releases

Recent configuration changes

Infrastructure changes

Scaling events

Certificate renewals

Database changes

DNS changes

Cloud incidents

---

# First Commands

Check cluster

kubectl cluster-info

---

Check nodes

kubectl get nodes

---

Check pods

kubectl get pods -A

---

Check events

kubectl get events -A --sort-by=.metadata.creationTimestamp

---

Check deployments

kubectl get deploy -A

---

Check ingress

kubectl get ingress -A

---

Check services

kubectl get svc -A

---

# Health Check Order

API Server

↓

Nodes

↓

Namespaces

↓

Pods

↓

Deployments

↓

Services

↓

Ingress

↓

Application

↓

Database

---

# Evidence Collection

Never delete logs before collecting them.

Collect

Application Logs

Node Logs

Events

Metrics

Traces

Deployment History

Git Commit

Recent PRs

Cloud Events

---

# Metrics to Verify

CPU

Memory

Disk

Network

Pod Restarts

OOMKilled

Latency

Request Rate

Error Rate

Saturation

---

# Logs to Verify

Application Logs

↓

Container Logs

↓

Node Logs

↓

System Logs

↓

Ingress Logs

↓

Database Logs

↓

Cloud Logs

---

# Traces

Verify

Request Flow

↓

Service Latency

↓

Database Calls

↓

External APIs

↓

Failures

---

# Common Root Causes

Application Bug

Configuration Change

Infrastructure Failure

Certificate Expired

DNS Failure

Database Failure

Memory Leak

CPU Exhaustion

Network Failure

Storage Failure

Cloud Provider Issue

Human Error

---

# Mitigation Strategy

Temporary Fix

↓

Business Recovery

↓

Permanent Fix Later

Examples

Scale replicas

Rollback deployment

Restart pods

Increase resources

Disable feature flag

Failover database

Switch traffic

---

# Recovery Validation

Verify

Application Healthy

Pods Healthy

Requests Successful

Latency Normal

Error Rate Reduced

Dashboards Healthy

Business Validation

Customer Validation

---

# Root Cause Analysis

Timeline

↓

Root Cause

↓

Contributing Factors

↓

Detection

↓

Recovery

↓

Lessons Learned

↓

Preventive Actions

---

# Example Timeline

02:15

PagerDuty Alert

↓

02:17

Incident Started

↓

02:22

High Error Rate Confirmed

↓

02:28

Database Connection Pool Issue Found

↓

02:35

Configuration Updated

↓

02:40

Traffic Normal

↓

03:00

Incident Closed

---

# Production Incident Example

Issue

Users receive HTTP 503 responses.

Investigation

Ingress healthy.

Service healthy.

Pods restarting repeatedly.

kubectl describe pod

shows

OOMKilled

Prometheus confirms memory reached 100%.

Root Cause

Incorrect memory limits.

Resolution

Increase memory limits.

Deploy updated configuration.

Validate recovery.

---

# Interview Questions

## Q1. What is your first action during a production incident?

Answer

Acknowledge the incident, assess business impact, gather evidence and avoid making immediate changes without understanding the problem.

---

## Q2. Why is evidence collection important?

Answer

Evidence helps identify the actual root cause, supports post-incident analysis and prevents incorrect assumptions.

---

## Q3. What is the role of an Incident Commander?

Answer

The Incident Commander coordinates the response, manages communication, prioritizes actions and ensures the incident progresses efficiently.

---

## Q4. What is RCA?

Answer

Root Cause Analysis identifies the underlying cause of an incident and defines preventive actions to avoid recurrence.

---

## Q5. Why should mitigation come before permanent fixes?

Answer

The primary objective during an incident is to restore business operations quickly. Permanent fixes should be implemented after service stability is restored.

---

# Assignment

A production alert reports:

"Checkout Service - 45% Error Rate"

Prepare

- Investigation Plan
- Commands to Execute
- Evidence Collection Strategy
- Mitigation Plan
- Recovery Validation
- RCA Document

---

# Assignment Solution

## Step 1

Acknowledge the incident.

Join the incident bridge.

Assign an Incident Commander.

---

## Step 2

Assess impact.

Identify affected users, regions and services.

---

## Step 3

Collect evidence using

- kubectl get nodes
- kubectl get pods -A
- kubectl get events -A
- kubectl describe pod
- kubectl logs
- Grafana
- Prometheus
- Loki
- Tempo

---

## Step 4

Identify the root cause using metrics, logs and traces.

---

## Step 5

Mitigate

Possible actions

- Rollback deployment
- Scale replicas
- Restart failed pods
- Increase resources
- Failover services

---

## Step 6

Validate

- Error rate normal
- Latency acceptable
- Customer transactions successful
- Dashboards healthy

---

## Step 7

Prepare RCA

Include

- Timeline
- Root Cause
- Contributing Factors
- Corrective Actions
- Preventive Actions

---

# Production Best Practices

✔ Never Panic

✔ Assign Incident Commander

✔ Follow Runbooks

✔ Collect Evidence First

✔ Use Metrics + Logs + Traces Together

✔ Keep Stakeholders Updated

✔ Restore Service Before Permanent Fixes

✔ Perform Blameless Postmortems

✔ Automate Repetitive Recovery Steps

✔ Continuously Improve Runbooks

---

# Runbook Checklist

□ Alert Acknowledged

□ Incident Bridge Created

□ Incident Commander Assigned

□ Business Impact Assessed

□ Cluster Health Verified

□ Metrics Reviewed

□ Logs Collected

□ Traces Analyzed

□ Root Cause Identified

□ Mitigation Applied

□ Recovery Validated

□ RCA Completed

---

# Common Mistakes

❌ Restarting Everything Immediately

❌ Ignoring Business Impact

❌ Making Multiple Changes Simultaneously

❌ Not Recording Timeline

❌ Deleting Evidence

❌ Assuming the Root Cause

❌ Poor Communication

❌ Skipping RCA

❌ No Preventive Actions

❌ Closing Incident Without Validation

