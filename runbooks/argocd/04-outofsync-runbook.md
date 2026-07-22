# OutOfSync Runbook

# Enterprise DevOps Platform

---

# Purpose

This runbook describes the Standard Operating Procedure (SOP) for resolving an ArgoCD Application in the **OutOfSync** state.

OutOfSync is one of the most common Production issues and is frequently encountered by DevOps Engineers and SRE teams.

---

# Scope

Applications

- React + Vite Frontend
- Flask API Gateway
- Flask Auth Service
- Flask Dashboard Service

Supporting Services

- Redis
- PostgreSQL

---

# What Does OutOfSync Mean?

OutOfSync means

```
Git Desired State

≠

Kubernetes Cluster State
```

ArgoCD has detected that the cluster no longer matches the manifests stored in Git.

---

# Common Symptoms

- Application status shows **OutOfSync**
- Manual Kubernetes changes
- Resources modified outside Git
- Deployment differs from Git
- ConfigMap changed manually
- Secret modified
- HPA changed replicas
- Failed Sync

---

# Common Causes

| Cause | Example |
|--------|----------|
| Manual kubectl apply | Deployment modified manually |
| Manual scaling | Replicas changed |
| ConfigMap updated | Configuration drift |
| Secret updated | Credentials changed manually |
| Failed synchronization | Partial deployment |
| Git updated | Cluster not synchronized |

---

# Troubleshooting Workflow

```
Application

↓

OutOfSync

↓

Compare Git

↓

Compare Cluster

↓

Identify Drift

↓

Validate Change

↓

Sync

↓

Healthy
```

---

# Step 1 - Verify Application

```bash
argocd app get frontend
```

Expected

```
Sync Status

↓

OutOfSync
```

---

# Step 2 - Identify Changed Resources

```bash
argocd app diff frontend
```

Review

- Deployment
- Service
- ConfigMap
- Secret
- Ingress

Determine exactly what differs between Git and Kubernetes.

---

# Step 3 - Check Git Repository

Verify

- Latest commit
- Manifest changes
- Pull Request history
- Recent merges

Ensure Git contains the expected configuration.

---

# Step 4 - Check Manual Changes

Review

```bash
kubectl get deployment
```

```bash
kubectl describe deployment frontend
```

Ask

- Did anyone use kubectl apply?
- Was the Deployment manually edited?
- Was scaling performed manually?

---

# Step 5 - Verify ConfigMaps

```bash
kubectl get configmap
```

Check

- Configuration values
- Environment variables
- Recent updates

---

# Step 6 - Verify Secrets

```bash
kubectl get secret
```

Ensure

- Secret exists
- Secret matches expected configuration

---

# Step 7 - Verify HPA

```bash
kubectl get hpa
```

If HPA changes replica count,

verify whether Ignore Differences is configured.

---

# Step 8 - Decide Correct Source

Question

Which state is correct?

Option A

```
Git
```

Correct

↓

Synchronize Cluster

Option B

```
Cluster
```

Correct

↓

Update Git

Never leave Git and Cluster inconsistent.

---

# Step 9 - Synchronize

```bash
argocd app sync frontend
```

Monitor

```bash
argocd app get frontend
```

Expected

```
Synced

Healthy
```

---

# Step 10 - Validate

```bash
kubectl get pods
```

```bash
kubectl get deployment
```

Ensure

- Pods Running
- Deployment Updated
- Services Working

---

# Recovery Validation

Verify

- Login
- Dashboard
- Authentication
- APIs
- Database
- Redis

---

# Prevention

- Never use kubectl apply in Production.
- Protect Git branches.
- Enable Self Healing where appropriate.
- Use Pull Requests.
- Review every deployment.
- Monitor OutOfSync alerts.

---

# Important Commands

Application

```bash
argocd app get frontend
```

Diff

```bash
argocd app diff frontend
```

Sync

```bash
argocd app sync frontend
```

History

```bash
argocd app history frontend
```

Deployment

```bash
kubectl get deployment
```

Pods

```bash
kubectl get pods
```

---

# Success Criteria

- Sync Status = Synced
- Health = Healthy
- No configuration drift
- Application functioning normally
- Monitoring healthy

---

# Interview Questions

## Q1. What causes an OutOfSync application?

### Answer

OutOfSync occurs when the Kubernetes cluster no longer matches the desired configuration stored in Git. Common causes include manual kubectl changes, failed synchronizations and configuration drift.

---

## Q2. Which command shows differences between Git and the cluster?

### Answer

```bash
argocd app diff <application-name>
```

---

## Q3. How do you resolve an OutOfSync application?

### Answer

Identify the source of drift, determine whether Git or the cluster contains the correct configuration, update the appropriate source if needed and synchronize the application.

---

# Marathi Quick Revision

- OutOfSync = Git ≠ Cluster.
- प्रथम `argocd app diff`.
- Manual kubectl changes तपासा.
- ConfigMap/Secret Verify करा.
- योग्य State निश्चित करा.
- Sync करा.
- Health Verify करा.

