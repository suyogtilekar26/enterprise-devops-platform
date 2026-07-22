# Debugging ArgoCD Applications

# Enterprise DevOps Platform

---

# Purpose

This document explains how to debug ArgoCD applications in Production environments.

Debugging is one of the most frequently asked scenario-based interview topics because DevOps Engineers spend a significant amount of time troubleshooting failed deployments.

---

# Introduction

Suppose a developer says

```
Application is not working.
```

Do not immediately restart Pods.

Instead, follow a systematic debugging process.

---

# Production Debugging Workflow

```
User Reports Issue

↓

Open ArgoCD UI

↓

Check Sync Status

↓

Check Health Status

↓

Check Events

↓

Check Pods

↓

Describe Pod

↓

Check Logs

↓

Check ConfigMap

↓

Check Secret

↓

Check Service

↓

Check Ingress

↓

Check Network

↓

Fix

↓

Sync

↓

Healthy
```

---

# Step 1

## Check Application

```bash
argocd app get frontend
```

Verify

- Sync Status
- Health Status
- Revision
- Destination Cluster
- Namespace

---

# Step 2

## Check Sync Status

Possible values

```
Synced

OutOfSync

Unknown
```

If

```
OutOfSync
```

Check

- Git changes
- Manual kubectl changes
- Drift

---

# Step 3

## Check Health Status

Possible values

```
Healthy

Progressing

Degraded

Missing

Unknown
```

If

```
Degraded
```

Move to Pod debugging.

---

# Step 4

## List Pods

```bash
kubectl get pods -n frontend
```

Example

```
Running

CrashLoopBackOff

ImagePullBackOff

Pending

Completed
```

---

# Step 5

## Describe Pod

```bash
kubectl describe pod <pod-name>
```

Look for

- Events
- Scheduling Errors
- Image Errors
- Volume Errors
- Probe Failures

---

# Step 6

## View Logs

```bash
kubectl logs <pod-name>
```

Common Errors

```
Database Connection Failed

Permission Denied

File Not Found

Port Already Used

Null Pointer Exception

Authentication Failed
```

---

# Step 7

## Check Events

```bash
kubectl get events
```

Look for

- Failed Scheduling
- Failed Mount
- Image Pull Error
- Resource Limits
- Node Issues

---

# Step 8

## Verify Deployment

```bash
kubectl get deployment
```

Check

```
Desired Replicas

Available Replicas

Ready Replicas
```

---

# Step 9

## Verify Service

```bash
kubectl get svc
```

Check

- Selector
- Port
- TargetPort
- ClusterIP

Wrong selector

↓

No traffic reaches Pods.

---

# Step 10

## Verify Ingress

```bash
kubectl get ingress
```

Check

- Host
- Path
- Backend Service
- TLS

---

# Step 11

## Verify ConfigMap

```bash
kubectl get configmap
```

Check

- Missing values
- Wrong configuration
- Incorrect environment variables

---

# Step 12

## Verify Secret

```bash
kubectl get secret
```

Typical issues

- Wrong password
- Missing Secret
- Expired credentials

---

# Step 13

## Verify Namespace

```bash
kubectl get ns
```

Application may be deployed into the wrong namespace.

---

# Step 14

## Verify Image

```bash
kubectl describe pod <pod-name>
```

Check

```
ImagePullBackOff

ErrImagePull
```

Verify

- Image name
- Image tag
- Registry credentials

---

# Step 15

## Verify Cluster Resources

```bash
kubectl top nodes
```

```bash
kubectl top pods
```

Look for

- CPU Exhaustion
- Memory Exhaustion
- Disk Pressure

---

# Production Debugging Checklist

```
Application

✓

↓

Sync

✓

↓

Health

✓

↓

Pods

✓

↓

Logs

✓

↓

Events

✓

↓

Deployment

✓

↓

Service

✓

↓

Ingress

✓

↓

ConfigMap

✓

↓

Secret

✓

↓

Node

✓
```

---

# Enterprise Scenario

Deployment completed successfully.

Users receive

```
503 Service Unavailable
```

Debugging

```
Service

↓

Selector Wrong

↓

Pods Never Receive Traffic

↓

Update Service

↓

Sync

↓

Healthy
```

---

# Common Production Issues

| Problem | Root Cause |
|----------|------------|
| OutOfSync | Git Drift |
| CrashLoopBackOff | Application Crash |
| ImagePullBackOff | Invalid Image |
| Pending | Insufficient Resources |
| 503 Error | Service Selector |
| 502 Error | Ingress Backend |
| Auth Failed | Secret Problem |
| DB Error | Wrong ConfigMap |

---

# Interview Questions

## Q1. What is your debugging approach for a failed ArgoCD deployment?

### Answer

I first check Sync Status and Health Status in ArgoCD, then inspect Pods, Events, Logs, Deployments, Services, ConfigMaps, Secrets and Kubernetes resources to identify the root cause.

---

## Q2. Application is Synced but users receive 503 errors. What will you investigate?

### Answer

I will verify the Service selector, Endpoints, Pod readiness, Ingress configuration and application logs.

---

## Q3. Which command do you use first while debugging?

### Answer

```bash
argocd app get <application-name>
```

---

## Q4. What are the most commonly used Kubernetes commands during debugging?

### Answer

```bash
kubectl get pods
kubectl describe pod
kubectl logs
kubectl get events
kubectl get deployment
kubectl get svc
kubectl get ingress
kubectl top nodes
```

---

# Marathi Quick Revision

- प्रथम `argocd app get`.
- Sync Status तपासा.
- Health Status तपासा.
- Pods तपासा.
- Logs तपासा.
- Events तपासा.
- Service आणि Ingress Verify करा.

---

# Marathi Summary (5+ Experience Revision)

Production debugging करताना प्रथम ArgoCD मधील Sync आणि Health Status तपासणे आवश्यक आहे. त्यानंतर Pods, Events, Logs, Deployment, Service, Ingress, ConfigMap, Secret आणि Node Resources यांची तपासणी करून Root Cause शोधला जातो. Senior DevOps आणि SRE interviews मध्ये "Application Synced आहे पण चालत नाही, काय तपासाल?" हा सर्वात सामान्य scenario-based प्रश्न असतो आणि ही debugging workflow त्याचे आदर्श उत्तर आहे.

