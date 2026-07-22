# Webhook Failure Runbook

# Enterprise DevOps Platform

---

# Purpose

This runbook describes the Standard Operating Procedure (SOP) for troubleshooting **ArgoCD Webhook Failures**.

Git Webhooks allow Git providers such as GitHub, GitLab and Bitbucket to immediately notify ArgoCD about repository changes. When Webhooks fail, deployments are delayed until the next repository polling cycle.

---

# Scope

Applications

- React + Vite Frontend
- Flask API Gateway
- Flask Auth Service
- Flask Dashboard Service

Git Providers

- GitHub
- GitLab
- Bitbucket
- Azure DevOps

Infrastructure

- Kubernetes
- ArgoCD
- Git Repository

---

# Symptoms

- Git commit completed
- Deployment not triggered immediately
- Manual Refresh works
- Auto Sync delayed
- No webhook events
- Repository polling eventually detects changes

---

# Common Causes

| Cause | Example |
|--------|----------|
| Wrong Webhook URL | Incorrect endpoint |
| Invalid Secret | Signature verification failed |
| Firewall Blocking | Request dropped |
| Ingress Failure | Webhook endpoint unreachable |
| TLS Certificate Error | HTTPS validation failed |
| ArgoCD Server Down | Endpoint unavailable |
| Git Provider Misconfiguration | Webhook disabled |

---

# Troubleshooting Workflow

```
Git Commit

↓

Webhook Sent

↓

ArgoCD Server

↓

Webhook Validation

↓

Repository Refresh

↓

Auto Sync

↓

Healthy
```

---

# Step 1 - Verify Application

```bash
argocd app get frontend
```

Review

- Sync Status
- Health Status
- Target Revision

---

# Step 2 - Verify Git Commit

Confirm

- Commit pushed successfully
- Branch updated
- Pull Request merged
- Repository reflects latest changes

---

# Step 3 - Verify Webhook Configuration

Review webhook settings in your Git provider.

Ensure

- Correct URL
- Correct Secret
- Push Events Enabled
- SSL Verification Enabled

---

# Step 4 - Verify Webhook URL

Typical endpoint

```
https://argocd.company.com/api/webhook
```

Ensure

- URL is correct
- DNS resolves
- Endpoint is reachable

---

# Step 5 - Verify Webhook Delivery

Review webhook delivery history.

Check

- HTTP Status
- Response Body
- Retry Attempts
- Delivery Timestamp

Expected

```
HTTP 200 OK
```

---

# Step 6 - Verify ArgoCD Server

```bash
kubectl get pods -n argocd
```

Locate

```
argocd-server
```

Ensure

- Running
- Ready
- No restarts

---

# Step 7 - Review ArgoCD Server Logs

```bash
kubectl logs -n argocd <argocd-server-pod>
```

Look for

- Webhook received
- Signature validation
- Authentication errors
- Repository refresh

---

# Step 8 - Verify Ingress

```bash
kubectl get ingress -n argocd
```

Check

- Host
- TLS
- Backend Service
- DNS

---

# Step 9 - Verify Network

Ensure

- Firewall allows inbound HTTPS
- Load Balancer healthy
- DNS resolution working
- Reverse Proxy operational

---

# Step 10 - Verify Webhook Secret

Ensure

- Git provider secret matches ArgoCD secret
- No extra spaces
- Secret recently rotated if expired

---

# Step 11 - Fix the Issue

Possible actions

- Correct Webhook URL
- Update Webhook Secret
- Restore DNS
- Fix TLS certificate
- Restart ArgoCD Server
- Correct Ingress configuration

---

# Step 12 - Validation

Push a small commit.

Expected workflow

```
Git Commit

↓

Webhook Delivered

↓

Repository Refresh

↓

Auto Sync

↓

Application Synced

↓

Healthy
```

---

# Important Commands

Application

```bash
argocd app get frontend
```

Pods

```bash
kubectl get pods -n argocd
```

Ingress

```bash
kubectl get ingress -n argocd
```

Server Logs

```bash
kubectl logs -n argocd <argocd-server-pod>
```

Services

```bash
kubectl get svc -n argocd
```

---

# Success Criteria

- Webhook Delivered Successfully
- HTTP 200 Response
- Repository Refresh Triggered
- Auto Sync Executed
- Application Synced
- Health = Healthy

---

# Interview Questions

## Q1. Why are Webhooks used in ArgoCD?

### Answer

Webhooks notify ArgoCD immediately when changes are pushed to a Git repository, eliminating the need to wait for periodic repository polling.

---

## Q2. What happens if Webhooks fail?

### Answer

ArgoCD can still detect changes through repository polling, but deployments are delayed until the next reconciliation cycle.

---

## Q3. Which ArgoCD component receives Webhook requests?

### Answer

The **argocd-server** receives Git Webhook requests, validates them and triggers a repository refresh for reconciliation.

---

# Marathi Quick Revision

- Git Commit झाला पण Deployment नाही = Webhook Failure.
- Webhook URL Verify करा.
- Secret Verify करा.
- Delivery History तपासा.
- `argocd-server` Logs तपासा.
- Ingress आणि DNS Verify करा.
- Test Commit करून Auto Sync Validate करा.

