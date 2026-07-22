# Scenario Based Interview Questions

# Enterprise DevOps Platform

---

# Purpose

This document contains real-world ArgoCD scenario-based interview questions commonly asked for 3–10 years of DevOps, SRE and Platform Engineer positions.

These questions test troubleshooting skills rather than theory.

---

# Scenario 1

## Application is OutOfSync. What will you do?

### Expected Answer

First, I will verify why the application became OutOfSync.

Steps

1. Check application status

```bash
argocd app get frontend
```

2. Compare Git and Cluster.

3. Check for manual kubectl changes.

4. Verify Ignore Differences configuration.

5. If changes are valid

```bash
argocd app sync frontend
```

If unexpected drift exists,

identify root cause before syncing.

---

# Scenario 2

## Application is Synced but Degraded.

How will you troubleshoot?

### Expected Answer

Since Sync is successful,

Git and Cluster match.

Problem is runtime related.

Checklist

```bash
kubectl get pods

kubectl describe pod

kubectl logs

kubectl get events
```

Check

- CrashLoopBackOff
- ImagePullBackOff
- Readiness Probe
- Liveness Probe
- Database connectivity
- ConfigMap
- Secret

---

# Scenario 3

## Production deployment failed after Automatic Sync.

What will you do?

### Expected Answer

- Stop further deployments.
- Identify failed revision.
- Review logs.
- Check Health Status.
- Rollback immediately.

```bash
argocd app history frontend

argocd app rollback frontend <history-id>
```

Perform RCA after restoring service.

---

# Scenario 4

## Developer changed Deployment using kubectl.

What happens?

### Expected Answer

Manual change creates

```
Configuration Drift
```

If Self Healing is enabled,

ArgoCD restores the Git version automatically.

If disabled,

Application becomes

```
OutOfSync
```

---

# Scenario 5

## Git Repository credentials expired.

How do you troubleshoot?

### Expected Answer

Verify

```bash
argocd repo list
```

Check

- Repository URL
- SSH Key
- Personal Access Token
- Network
- Repository permissions

Update credentials if required.

---

# Scenario 6

## Pods are running but application is inaccessible.

### Expected Answer

Check

```bash
kubectl get svc

kubectl get ingress
```

Verify

- Service Selector
- TargetPort
- Ingress Backend
- DNS
- TLS

Most commonly,

Service selector is incorrect.

---

# Scenario 7

## ImagePullBackOff occurred after deployment.

### Expected Answer

Check

```bash
kubectl describe pod <pod-name>
```

Verify

- Image Name
- Image Tag
- Registry Access
- ImagePullSecrets
- Private Registry Authentication

---

# Scenario 8

## Production deployment should happen only after 10 PM.

How will you implement it?

### Expected Answer

Use

```
Sync Windows
```

Allow deployments only during

```
10 PM

↓

2 AM
```

---

# Scenario 9

## Company has 100 microservices.

How will you manage them?

### Expected Answer

Use

- ApplicationSet
- App of Apps
- Projects
- Git Generator
- Cluster Generator

This reduces manual effort.

---

# Scenario 10

## Company has Development, QA, Staging and Production clusters.

How will you deploy applications?

### Expected Answer

Register all clusters.

Use

```
ApplicationSet

+

Cluster Generator
```

One Git commit can deploy applications to multiple clusters.

---

# Scenario 11

## A developer accidentally deleted Deployment from Git.

Pruning is enabled.

What happens?

### Expected Answer

ArgoCD detects that the Deployment no longer exists in Git.

Pruning automatically deletes the Deployment from Kubernetes.

This is why Pull Request approval is critical.

---

# Scenario 12

## Developers should not deploy directly to Production.

How will you enforce this?

### Expected Answer

- RBAC
- Manual Sync
- Protected Branch
- Pull Request Approval
- Sync Windows

---

# Scenario 13

## How do you debug a failed synchronization?

### Expected Answer

Check

```bash
argocd app get

kubectl get events

kubectl logs

kubectl describe pod
```

Verify

- Invalid YAML
- Helm values
- Namespace
- RBAC
- Repository connectivity

---

# Scenario 14

## Multiple teams use the same ArgoCD.

How will you isolate access?

### Expected Answer

Use

- Projects
- RBAC
- Separate Repositories
- Separate Namespaces

Developers should access only their own projects.

---

# Scenario 15

## CEO reports Production is down immediately after deployment.

What will you do?

### Expected Answer

Priority

```
Restore Service

↓

Rollback

↓

Verify Health

↓

Inform Stakeholders

↓

Root Cause Analysis
```

Never start debugging before restoring customer service if rollback is available.

---

# Senior Interview Tips

Interviewers expect you to mention

- GitOps
- Root Cause Analysis
- Rollback
- Monitoring
- Least Privilege
- Production Safety
- High Availability
- Disaster Recovery
- Auditability

---

# Golden Production Troubleshooting Flow

```
Application

↓

Sync

↓

Health

↓

Pods

↓

Logs

↓

Events

↓

Deployment

↓

Service

↓

Ingress

↓

ConfigMap

↓

Secret

↓

Rollback

↓

Healthy
```

---

# Interview Questions

## Q1. What is the first thing you check during an ArgoCD production issue?

### Answer

I first check the Application Sync Status and Health Status using:

```bash
argocd app get <application-name>
```

---

## Q2. What is your rollback strategy?

### Answer

Identify the last stable deployment using application history and immediately rollback if customer impact is high.

---

## Q3. Which ArgoCD topics are most important for senior interviews?

### Answer

- ApplicationSet
- App of Apps
- Multi-Cluster
- RBAC
- Sync Windows
- Rollback
- Self Healing
- Pruning
- Troubleshooting
- Production Best Practices

---

# Marathi Quick Revision

- प्रथम Sync आणि Health तपासा.
- CrashLoop → Logs.
- OutOfSync → Drift.
- ImagePull → Image.
- Production Down → Rollback प्रथम.
- ApplicationSet → Scale.
- RBAC → Security.

---

# Marathi Summary (5+ Experience Revision)

Senior DevOps interviews मध्ये theory पेक्षा scenario-based प्रश्न जास्त विचारले जातात. Production outage, OutOfSync, Degraded application, ImagePullBackOff, manual kubectl changes, rollback strategy, ApplicationSet, Multi-Cluster आणि RBAC यावर आधारित troubleshooting approach स्पष्ट सांगणे अपेक्षित असते. नेहमी प्रथम service restore, नंतर root cause analysis हा production mindset interview मध्ये मोठा plus point मानला जातो.

