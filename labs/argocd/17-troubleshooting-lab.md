# Lab 17 - ArgoCD Troubleshooting

# Enterprise DevOps Platform

---

# Lab Objective

In this lab you will learn how to:

- Troubleshoot common ArgoCD issues
- Identify Sync failures
- Debug Application health
- Investigate Kubernetes resources
- Analyze ArgoCD logs
- Resolve production deployment issues

---

# Prerequisites

- Labs 01 to 16 Completed
- ArgoCD Installed
- Kubernetes Cluster Running
- Git Repository
- CLI Access

---

# Why Troubleshooting is Important

Production environments experience failures due to:

- Wrong YAML
- Git Errors
- Image Pull Issues
- Kubernetes Failures
- RBAC Problems
- Network Issues
- Resource Limits

A DevOps Engineer should quickly identify and resolve these issues.

---

# Troubleshooting Workflow

```
Application Failed

↓

Check ArgoCD UI

↓

Check Application Status

↓

Check Events

↓

Check Kubernetes Resources

↓

Check Logs

↓

Identify Root Cause

↓

Fix Issue

↓

Sync Again

↓

Healthy
```

---

# Scenario 1 - Application OutOfSync

Check Status

```bash
argocd app get guestbook
```

Expected

```
OutOfSync
```

Synchronize

```bash
argocd app sync guestbook
```

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

# Scenario 2 - Sync Failed

Check

```bash
argocd app get guestbook
```

Look for

```
Sync Failed
```

Review Events

```bash
kubectl get events -n guestbook
```

---

# Scenario 3 - Invalid YAML

Validate

```bash
kubectl apply --dry-run=client -f deployment.yaml
```

Fix YAML

Commit

Push

Sync Again

---

# Scenario 4 - Pod CrashLoopBackOff

Check Pods

```bash
kubectl get pods -n guestbook
```

Expected

```
CrashLoopBackOff
```

Describe Pod

```bash
kubectl describe pod <pod-name> -n guestbook
```

Logs

```bash
kubectl logs <pod-name> -n guestbook
```

Identify Root Cause.

---

# Scenario 5 - ImagePullBackOff

Check

```bash
kubectl get pods
```

Describe

```bash
kubectl describe pod <pod-name>
```

Possible Causes

- Wrong Image
- Private Registry
- Missing Secret
- Network Issue

---

# Scenario 6 - Application Degraded

Check

```bash
argocd app get guestbook
```

Verify

```bash
kubectl get deployment
```

```bash
kubectl get pods
```

```bash
kubectl get svc
```

---

# Scenario 7 - Repository Access Failed

Symptoms

```
Repository Error

Authentication Failed
```

Verify Repository

```bash
argocd repo list
```

Check Credentials.

---

# Scenario 8 - Cluster Connection Failed

Verify

```bash
argocd cluster list
```

Expected

```
Successful
```

If not

Re-register Cluster

```bash
argocd cluster add <cluster-context>
```

---

# Scenario 9 - RBAC Permission Denied

Symptoms

```
Permission Denied
```

Verify

```bash
kubectl get configmap argocd-rbac-cm \
-n argocd
```

Review

```
policy.csv
```

---

# Scenario 10 - Auto Sync Not Working

Verify Application

```bash
argocd app get guestbook
```

Expected

```
Automated Sync Policy
```

If missing

Enable Auto Sync.

---

# Scenario 11 - Notification Failure

Check Logs

```bash
kubectl logs deployment/argocd-notifications-controller \
-n argocd
```

Verify

- Secret
- Token
- Channel
- SMTP

---

# Scenario 12 - ArgoCD Server Issues

Pods

```bash
kubectl get pods -n argocd
```

Logs

```bash
kubectl logs deployment/argocd-server \
-n argocd
```

Restart

```bash
kubectl rollout restart deployment argocd-server \
-n argocd
```

---

# Useful Commands

Applications

```bash
argocd app list
```

Application Details

```bash
argocd app get guestbook
```

Application History

```bash
argocd app history guestbook
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
kubectl get pods -A
```

Events

```bash
kubectl get events -A
```

Logs

```bash
kubectl logs <pod-name>
```

Describe

```bash
kubectl describe pod <pod-name>
```

---

# Troubleshooting Checklist

Application

- Healthy?
- Synced?
- Refreshing?
- Degraded?

Git

- Repository Reachable?
- Latest Commit?
- Correct Branch?

Kubernetes

- Pods Running?
- Deployments Available?
- Services Created?
- Events Normal?

Infrastructure

- Nodes Ready?
- Storage Available?
- Network Healthy?

---

# Expected Output

```
Issue Detected

↓

Collect Information

↓

Analyze Logs

↓

Identify Root Cause

↓

Fix Configuration

↓

Commit Changes

↓

ArgoCD Sync

↓

Healthy
```

---

# Best Practices

- Always check Application status first.
- Read Events before restarting resources.
- Validate YAML before deployment.
- Use Git history to identify recent changes.
- Review logs before applying fixes.
- Keep monitoring enabled.
- Document recurring issues.
- Create runbooks for common incidents.

---

# Enterprise Troubleshooting Flow

```
Monitoring Alert

↓

ArgoCD Dashboard

↓

Application Status

↓

Kubernetes Events

↓

Pod Logs

↓

Root Cause Analysis

↓

Fix in Git

↓

Commit

↓

ArgoCD Sync

↓

Verification

↓

Incident Closed
```

---

# Interview Questions

## 1. What is the first step in troubleshooting ArgoCD?

Check the Application status using:

```bash
argocd app get <application-name>
```

---

## 2. How do you investigate a failed Pod?

Use:

```bash
kubectl describe pod <pod-name>
```

and

```bash
kubectl logs <pod-name>
```

---

## 3. How do you verify repository connectivity?

```bash
argocd repo list
```

---

## 4. Which command lists registered clusters?

```bash
argocd cluster list
```

---

## 5. Why should configuration changes be fixed in Git instead of Kubernetes?

Because Git is the Single Source of Truth in GitOps, and manual changes will be overwritten by ArgoCD.

---

# Lab Success Criteria

You have successfully completed this lab if:

- You can troubleshoot Sync failures.
- You can investigate Pod failures.
- You can resolve repository and cluster issues.
- You can identify RBAC problems.
- You can use logs and events to determine root causes.
- You understand an enterprise troubleshooting workflow.

---

# Marathi Quick Revision

- Problem आल्यावर प्रथम `argocd app get` वापरून Application Status तपासा.
- `kubectl describe` आणि `kubectl logs` हे Debugging साठी सर्वात महत्त्वाचे Commands आहेत.
- Git Repository, Cluster आणि RBAC नेहमी Verify करा.
- Manual Fix करण्याऐवजी Git मध्ये बदल करा.
- Production मध्ये Root Cause Analysis (RCA) करून Runbook Update करणे ही सर्वोत्तम पद्धत आहे.

