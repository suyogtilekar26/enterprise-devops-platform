# Incident 03 - Application Degraded

# Enterprise DevOps Platform

---

# Incident Summary

An ArgoCD application entered the **Degraded** state after a deployment completed successfully, but one or more Kubernetes resources failed their health checks.

Unlike **Sync Failed**, the manifests were successfully applied to Kubernetes. However, the application is not operating correctly.

---

# Severity

```
SEV-2
```

Production deployment completed, but the application is partially or completely unavailable.

---

# Business Impact

- Service degradation
- Customer-facing errors
- Failed health checks
- Increased latency
- Revenue impact
- SLA violation
- Pager alerts triggered

---

# Environment

- Kubernetes
- ArgoCD
- Production Cluster
- Git Repository

---

# Symptoms

ArgoCD Dashboard

```
Application

Health

Degraded

Sync Status

Synced
```

CLI

```bash
argocd app get guestbook
```

Example

```
Sync Status

Synced

Health

Degraded
```

---

# Common Causes

- Pods Not Ready
- CrashLoopBackOff
- ImagePullBackOff
- Readiness Probe Failure
- Liveness Probe Failure
- Deployment Timeout
- Failed Job
- Missing Secret
- Missing ConfigMap
- Database Connectivity Failure
- Resource Limits
- Network Policy Issues

---

# Detection

Check Application

```bash
argocd app get guestbook
```

List Applications

```bash
argocd app list
```

Dashboard

```
Health

Degraded
```

---

# Investigation

## Step 1

Check Application

```bash
argocd app get guestbook
```

Review

- Health
- Sync
- Resources
- Conditions

---

## Step 2

Check Pods

```bash
kubectl get pods -n guestbook
```

Look for

```
CrashLoopBackOff

Pending

ImagePullBackOff

Error
```

---

## Step 3

Describe Deployment

```bash
kubectl describe deployment guestbook \
-n guestbook
```

---

## Step 4

Describe Pod

```bash
kubectl describe pod <pod-name> \
-n guestbook
```

---

## Step 5

Check Logs

```bash
kubectl logs <pod-name> \
-n guestbook
```

---

## Step 6

Check Events

```bash
kubectl get events \
-n guestbook \
--sort-by=.lastTimestamp
```

---

## Step 7

Verify Services

```bash
kubectl get svc \
-n guestbook
```

---

## Step 8

Verify Endpoints

```bash
kubectl get endpoints \
-n guestbook
```

---

# Root Cause Analysis

Example

A new deployment introduced an incorrect database connection string.

Application started successfully but failed readiness checks.

Pods never became Ready.

ArgoCD reported

```
Health

Degraded
```

although synchronization completed successfully.

---

# Resolution

Correct the application configuration.

Example

Update

```
DATABASE_URL
```

Commit

```bash
git add .
```

```bash
git commit -m "Fixed database configuration"
```

```bash
git push origin main
```

Synchronize

```bash
argocd app sync guestbook
```

---

# Validation

Verify

```bash
argocd app get guestbook
```

Expected

```
Healthy

Synced
```

---

Verify Pods

```bash
kubectl get pods \
-n guestbook
```

Expected

```
Running

Ready
```

---

Verify Deployment

```bash
kubectl rollout status deployment/guestbook \
-n guestbook
```

---

# Commands Used

Application

```bash
argocd app get guestbook
```

Pods

```bash
kubectl get pods -n guestbook
```

Logs

```bash
kubectl logs <pod-name> -n guestbook
```

Deployment

```bash
kubectl describe deployment guestbook -n guestbook
```

Events

```bash
kubectl get events -n guestbook
```

Rollout Status

```bash
kubectl rollout status deployment/guestbook
```

---

# Timeline Example

```
14:00

Deployment Started

↓

14:02

Application Synced

↓

14:03

Pods Fail Readiness Probe

↓

14:04

Application Health becomes Degraded

↓

14:08

Engineer Reviews Logs

↓

14:15

Database Configuration Fixed

↓

14:17

Git Updated

↓

14:18

ArgoCD Sync

↓

14:20

Application Healthy
```

---

# Prevention

- Test deployments in lower environments.
- Configure readiness probes correctly.
- Validate ConfigMaps and Secrets.
- Monitor application logs.
- Perform smoke testing.
- Use progressive deployments.
- Configure proper resource requests and limits.

---

# Best Practices

- Monitor application health continuously.
- Never ignore Degraded applications.
- Investigate Kubernetes events first.
- Use structured application logging.
- Keep readiness and liveness probes accurate.
- Validate dependencies before deployment.

---

# Interview Questions

## 1. What does Degraded mean in ArgoCD?

Resources are synchronized, but one or more resources are unhealthy.

---

## 2. What is the difference between Sync Failed and Degraded?

Sync Failed means deployment was rejected.

Degraded means deployment succeeded but the application is unhealthy.

---

## 3. Which command shows application health?

```bash
argocd app get <application>
```

---

## 4. Which Kubernetes commands help investigate Degraded applications?

```bash
kubectl get pods
```

```bash
kubectl describe pod
```

```bash
kubectl logs
```

---

## 5. What are common causes of Degraded applications?

- CrashLoopBackOff
- Failed probes
- Missing Secrets
- Database failures
- Configuration errors

---

# Incident Success Criteria

The incident is resolved when:

- Application Health is Healthy.
- Application is Synced.
- Pods are Ready.
- Services are reachable.
- Root cause is documented.
- Preventive actions are implemented.

---

# Marathi Quick Revision

- Degraded म्हणजे Deployment यशस्वी झाला आहे पण Application Healthy नाही.
- Pods Ready नसणे, Readiness Probe Failure किंवा Database Errors ही सामान्य कारणे आहेत.
- `kubectl logs`, `kubectl describe` आणि `kubectl get events` हे Debugging साठी सर्वात महत्त्वाचे Commands आहेत.
- Configuration Git मध्ये दुरुस्त करून पुन्हा Sync करा.
- Production मध्ये Degraded Application कधीही दुर्लक्षित करू नये.

