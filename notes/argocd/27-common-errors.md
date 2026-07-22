# Common ArgoCD Errors & Troubleshooting

# Enterprise DevOps Platform

---

# Purpose

This document covers the most common ArgoCD errors asked in DevOps, SRE and Platform Engineer interviews.

Knowing these errors is important because most production incidents involve diagnosing synchronization, repository, RBAC, Kubernetes or application health issues.

---

# Troubleshooting Approach

Always troubleshoot in this order

```
Application

↓

Sync Status

↓

Health Status

↓

Events

↓

Pods

↓

Logs

↓

Repository

↓

Cluster

↓

ArgoCD Components
```

---

# Error 1

## OutOfSync

### Meaning

Git state and Cluster state are different.

Example

```
Git

Replicas = 3

↓

Cluster

Replicas = 5
```

### Causes

- Manual kubectl changes
- HPA updates
- ConfigMap modified
- Resource edited manually

### Solution

```bash
argocd app sync frontend
```

Investigate why drift occurred.

---

# Error 2

## Degraded Application

### Meaning

Deployment completed but application is unhealthy.

### Common Causes

- CrashLoopBackOff
- ImagePullBackOff
- Failed Readiness Probe
- Failed Liveness Probe
- PVC Pending

### Commands

```bash
kubectl get pods
```

```bash
kubectl describe pod <pod-name>
```

```bash
kubectl logs <pod-name>
```

---

# Error 3

## Repository Connection Failed

Example

```
Repository

↓

Connection Failed
```

### Causes

- Wrong Git URL
- Invalid SSH Key
- Expired Token
- Network Issue

### Verify

```bash
argocd repo list
```

---

# Error 4

## Authentication Failed

Possible reasons

- Wrong Git credentials
- Expired Personal Access Token
- Invalid SSH Key

Solution

Update repository credentials.

---

# Error 5

## Permission Denied

Example

```
Permission Denied

RBAC
```

### Causes

- Missing Role
- Wrong Project
- Missing Sync Permission

Check

```
argocd-rbac-cm
```

---

# Error 6

## Sync Failed

### Causes

- Invalid YAML
- Invalid Helm Values
- Missing Namespace
- Invalid Manifest
- Kubernetes API Error

Check

```bash
argocd app get frontend
```

---

# Error 7

## ImagePullBackOff

### Causes

- Wrong Image
- Image Not Found
- Registry Authentication Failure

Verify

```bash
kubectl describe pod <pod-name>
```

---

# Error 8

## CrashLoopBackOff

### Causes

- Application Crash
- Wrong Environment Variable
- Database Connection Failure
- Secret Missing

Check

```bash
kubectl logs <pod-name>
```

---

# Error 9

## Namespace Not Found

Example

```
namespaces "frontend" not found
```

Solution

Create namespace

or

Enable

```
Create Namespace
```

during sync.

---

# Error 10

## Cluster Unreachable

Possible reasons

- API Server Down
- Network Failure
- Invalid Cluster Credentials
- Expired Token

Check

```bash
argocd cluster list
```

---

# Error 11

## Application Missing

Possible reasons

- Deleted manually
- Wrong Git Path
- Repository changed

Verify

```bash
argocd app get frontend
```

---

# Error 12

## Resource Already Exists

Meaning

Kubernetes resource already exists but is owned by another Application.

Solution

- Check ownership
- Avoid duplicate Applications
- Review Resource Tracking

---

# Production Troubleshooting Flow

```
Application Failed

↓

argocd app get

↓

Sync Status

↓

Health Status

↓

kubectl get pods

↓

Describe Pod

↓

Logs

↓

Events

↓

Fix

↓

Sync Again
```

---

# Important CLI Commands

Application Details

```bash
argocd app get frontend
```

Application History

```bash
argocd app history frontend
```

Application Sync

```bash
argocd app sync frontend
```

List Applications

```bash
argocd app list
```

Repositories

```bash
argocd repo list
```

Clusters

```bash
argocd cluster list
```

Pods

```bash
kubectl get pods
```

Logs

```bash
kubectl logs <pod-name>
```

Events

```bash
kubectl get events
```

---

# Interview Questions

## Q1. Application is OutOfSync. What will you check?

### Answer

- Git changes
- Manual kubectl changes
- Sync Status
- Ignore Differences
- Resource Drift

---

## Q2. Application is Synced but Degraded. What does it mean?

### Answer

Deployment matches Git, but the application is unhealthy due to runtime issues such as CrashLoopBackOff, failed probes or missing dependencies.

---

## Q3. Git repository authentication suddenly fails. What will you verify?

### Answer

Repository URL, SSH key, Personal Access Token, network connectivity and repository credentials.

---

## Q4. Which commands do you use most while troubleshooting ArgoCD?

### Answer

```bash
argocd app get
argocd app sync
argocd app history
argocd repo list
argocd cluster list
kubectl get pods
kubectl describe pod
kubectl logs
kubectl get events
```

---

# Marathi Quick Revision

- OutOfSync → Git आणि Cluster वेगळे.
- Degraded → App चालत नाही.
- CrashLoop → Logs तपासा.
- ImagePullBackOff → Image तपासा.
- RBAC → Permission तपासा.
- Repo Error → SSH Key/Token तपासा.
- Interview मध्ये Troubleshooting Flow खूप विचारतात.

---

# Marathi Summary (5+ Experience Revision)

Production मध्ये ArgoCD troubleshooting करताना प्रथम Sync Status, नंतर Health Status, त्यानंतर Pods, Logs, Events, Repository आणि Cluster तपासले जातात. OutOfSync, Degraded, CrashLoopBackOff, ImagePullBackOff, Repository Authentication Failure आणि RBAC Permission Denied हे सर्वाधिक सामान्य production issues आहेत. Senior DevOps interviews मध्ये troubleshooting approach आणि वापरले जाणारे CLI commands जवळपास नेहमी विचारले जातात.

