# Repository Failure Runbook

# Enterprise DevOps Platform

---

# Purpose

This runbook describes the Standard Operating Procedure (SOP) for troubleshooting Git repository connectivity issues in ArgoCD.

Repository failures prevent ArgoCD from reading Kubernetes manifests and deploying applications.

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

---

# Symptoms

- Repository Status = Failed
- Authentication Error
- Unable to Fetch Repository
- Sync Failed
- Application OutOfSync
- Repository Unreachable

---

# Common Causes

| Cause | Example |
|--------|----------|
| Wrong Repository URL | Typo in Git URL |
| Invalid SSH Key | Expired or Missing Key |
| Expired Personal Access Token | Authentication Failure |
| Repository Deleted | Repository Not Found |
| Branch Deleted | Invalid Target Revision |
| Network Issue | Cannot Reach Git Server |
| Certificate Error | TLS Verification Failure |
| Firewall Restriction | Access Blocked |

---

# Troubleshooting Workflow

```
Repository Failure

↓

Check Repository

↓

Authentication

↓

Network

↓

Credentials

↓

Git Access

↓

Fix

↓

Refresh

↓

Healthy
```

---

# Step 1 - Verify Repository

```bash
argocd repo list
```

Expected

```
Successful
```

If failed,

identify the reported error.

---

# Step 2 - Verify Repository Details

```bash
argocd repo list
```

Check

- Repository URL
- Repository Type
- Connection Status

Ensure the URL is correct.

---

# Step 3 - Verify Repository Access

Confirm

- Repository exists
- Repository is accessible
- Required branch exists
- Repository is not archived

---

# Step 4 - Verify Authentication

SSH Repository

Verify

- SSH Private Key
- Public Key Registered
- Repository Permissions

HTTPS Repository

Verify

- Username
- Personal Access Token
- Token Expiration

---

# Step 5 - Verify Repository Credentials

Review

```bash
kubectl get secret -n argocd
```

Locate repository credential Secret.

Ensure

- Credentials are current
- Secret has not expired

---

# Step 6 - Verify Target Revision

Check Application

```bash
argocd app get frontend
```

Verify

```
Target Revision

↓

main
```

Ensure

- Branch exists
- Tag exists
- Commit exists

---

# Step 7 - Verify Network Connectivity

Confirm

- Git server reachable
- DNS resolution working
- Firewall allows outbound access
- Proxy configuration correct

---

# Step 8 - Verify TLS

If using HTTPS

Verify

- Certificate validity
- CA certificate
- TLS handshake

---

# Step 9 - Verify ArgoCD Repo Server

```bash
kubectl get pods -n argocd
```

Locate

```
argocd-repo-server
```

Verify

- Running
- Ready
- No restarts

Check logs

```bash
kubectl logs -n argocd <repo-server-pod>
```

---

# Step 10 - Correct the Issue

Possible fixes

- Correct repository URL
- Update SSH key
- Rotate Personal Access Token
- Restore repository access
- Correct branch name
- Update repository Secret

---

# Step 11 - Refresh Application

```bash
argocd app get frontend
```

If repository is healthy,

Synchronize

```bash
argocd app sync frontend
```

---

# Validation

Verify

```bash
argocd repo list
```

Expected

```
Successful
```

Application

```bash
argocd app get frontend
```

Expected

```
Synced

Healthy
```

---

# Important Commands

Repositories

```bash
argocd repo list
```

Application

```bash
argocd app get frontend
```

Sync

```bash
argocd app sync frontend
```

Secrets

```bash
kubectl get secrets -n argocd
```

Repo Server Pods

```bash
kubectl get pods -n argocd
```

Repo Server Logs

```bash
kubectl logs -n argocd <repo-server-pod>
```

---

# Success Criteria

- Repository Connected
- Authentication Successful
- Repo Server Healthy
- Application Synced
- Application Healthy
- No Repository Errors

---

# Interview Questions

## Q1. What is the first command to verify repository connectivity?

### Answer

```bash
argocd repo list
```

---

## Q2. What are the common causes of repository failures?

### Answer

Incorrect repository URL, expired Personal Access Token, invalid SSH key, missing permissions, deleted branch, TLS issues and network connectivity problems.

---

## Q3. Which ArgoCD component communicates with Git repositories?

### Answer

The **argocd-repo-server** is responsible for cloning repositories, generating manifests and providing them to the Application Controller.

---

# Marathi Quick Revision

- `argocd repo list` प्रथम चालवा.
- Repository URL Verify करा.
- SSH Key / PAT तपासा.
- Branch Verify करा.
- Repo Server Logs तपासा.
- Credentials Update करा.
- Sync करून Health Verify करा.

