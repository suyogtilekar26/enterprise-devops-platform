# Health Checks

# Enterprise DevOps Platform

---

# Purpose

This document explains Health Checks in ArgoCD from beginner to enterprise level.

Health Checks help determine whether an application deployed in Kubernetes is functioning correctly. They provide real-time visibility into application status and are one of the first things Production Support Engineers monitor during deployments and incidents.

---

# Introduction

Synchronization tells us whether the cluster matches Git.

Health tells us whether the application is actually working.

Example

```
Application

Synced

Healthy
```

means

- Git and Kubernetes match.
- Application is running correctly.

Another example

```
Application

Synced

Degraded
```

means

- Deployment was successful.
- Application is unhealthy.

---

# Sync vs Health

```
Sync Status

↓

Configuration

Git

↓

Cluster

-----------------------

Health Status

↓

Runtime Condition

Application

↓

Working or Not
```

Both are important.

---

# Health Check Workflow

```
Git Repository

↓

Application Controller

↓

Deploy Resources

↓

Monitor Resources

↓

Calculate Health

↓

Display Status
```

---

# Health States

ArgoCD supports several health states.

```
Healthy

Progressing

Degraded

Missing

Suspended

Unknown
```

---

# Healthy

Meaning

```
Application is running correctly.
```

Example

```
Deployment Ready

Pods Running

Service Available
```

UI

```
Healthy

Green
```

---

# Progressing

Meaning

```
Deployment is still in progress.
```

Example

```
Deployment

↓

ReplicaSet Creating

↓

Pods Starting
```

Typical during

- New Deployments
- Rollouts
- Scaling Operations

---

# Degraded

Meaning

```
Application has problems.
```

Examples

```
CrashLoopBackOff

ImagePullBackOff

Failed Pods

Readiness Failure

Liveness Failure
```

Production engineers investigate this immediately.

---

# Missing

Meaning

```
Required resource does not exist.
```

Example

Git contains

```
Service
```

Cluster

```
Service Missing
```

Health becomes

```
Missing
```

---

# Suspended

Usually used with

- CronJobs
- Jobs

Example

```
CronJob

Suspended

true
```

ArgoCD reports

```
Suspended
```

---

# Unknown

Meaning

ArgoCD cannot determine resource health.

Possible causes

- Unsupported resource
- API error
- Controller issue

---

# Enterprise Example

Our Enterprise DevOps Platform

```
Frontend

Healthy

----------------

Gateway

Healthy

----------------

Auth

Progressing

----------------

Dashboard

Degraded
```

Production Support immediately investigates

```
Dashboard
```

---

# Resource Health

ArgoCD evaluates many Kubernetes resources.

Examples

```
Deployment

ReplicaSet

StatefulSet

DaemonSet

Job

CronJob

Service

Ingress
```

Each resource has its own health evaluation logic.

---

# Deployment Health

Healthy

```
Desired Replicas

=

Available Replicas
```

Example

```
Desired

3

Available

3

Healthy
```

---

Progressing

```
Desired

5

Available

2
```

Pods are still starting.

---

Degraded

```
Desired

4

Available

0
```

Possible reasons

- CrashLoopBackOff
- Failed scheduling
- ImagePullBackOff

---

# StatefulSet Health

Healthy

```
All replicas ready.
```

Progressing

```
Rolling update running.
```

Degraded

```
Replica failures.
```

---

# Job Health

Healthy

```
Completed
```

Progressing

```
Running
```

Degraded

```
Failed
```

---

# CronJob Health

Possible states

```
Healthy

Suspended

Unknown
```

---

# Enterprise Monitoring Workflow

```
Application

↓

Health Check

↓

Healthy?

↓

Yes

↓

No Action

--------------------

No

↓

Investigate

↓

Logs

↓

Events

↓

Pods

↓

Fix

↓

Healthy
```

---

# Health Check Sources

ArgoCD evaluates

- Kubernetes Status
- Conditions
- Replica Availability
- Pod Readiness
- Job Completion
- StatefulSet Status

---

# Common Reasons for Degraded Status

- CrashLoopBackOff
- ImagePullBackOff
- Failed Readiness Probe
- Failed Liveness Probe
- PVC Pending
- Resource Quota
- Node Failure
- Scheduling Failure

---

# Troubleshooting

Check Application

```bash
argocd app get frontend
```

Check Pods

```bash
kubectl get pods
```

Describe Pod

```bash
kubectl describe pod <pod-name>
```

View Logs

```bash
kubectl logs <pod-name>
```

Check Events

```bash
kubectl get events
```

---

# Best Practices

- Monitor Health continuously.
- Investigate Degraded applications immediately.
- Monitor Progressing applications during deployments.
- Configure alerts for unhealthy applications.
- Review Kubernetes Events during failures.
- Monitor readiness and liveness probes.
- Keep application dependencies healthy.

---

# Interview Questions

## Q1. What is the difference between Sync Status and Health Status?

### Answer

Sync Status indicates whether the Kubernetes cluster matches the desired state in Git, while Health Status indicates whether the deployed application is actually running correctly.

---

## Q2. What does the Degraded status indicate?

### Answer

Degraded means the application has deployment or runtime problems such as CrashLoopBackOff, ImagePullBackOff, failed probes or unavailable replicas.

---

## Q3. Which Kubernetes resources does ArgoCD evaluate for health?

### Answer

ArgoCD evaluates resources such as Deployments, StatefulSets, ReplicaSets, Jobs, CronJobs, Services and other supported Kubernetes resources.

---

# Marathi Quick Revision

- Health म्हणजे Application चालू आहे का.
- Sync म्हणजे Git आणि Cluster सारखे आहेत का.
- Healthy म्हणजे सर्व ठीक.
- Progressing म्हणजे Deployment सुरू आहे.
- Degraded म्हणजे समस्या आहे.
- Missing म्हणजे Resource नाही.
- Logs आणि Events तपासा.

---

# Marathi Summary (5+ Experience Revision)

ArgoCD Health Checks Kubernetes resources ची runtime स्थिती तपासतात. Sync Status फक्त Git आणि Cluster समान आहेत का हे सांगतो, तर Health Status प्रत्यक्ष Application योग्यरित्या चालू आहे का हे दर्शवतो. Healthy, Progressing, Degraded, Missing, Suspended आणि Unknown हे प्रमुख Health States आहेत. Production Support मध्ये Degraded applications वर त्वरित logs, events, pod status आणि Kubernetes resources तपासून root cause शोधणे ही अत्यंत महत्त्वाची जबाबदारी असते.

