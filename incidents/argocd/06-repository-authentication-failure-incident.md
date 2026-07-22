# Incident 06 - Repository Authentication Failure

# Enterprise DevOps Platform

---

# Incident Summary

ArgoCD failed to access the Git repository because authentication with the Git provider failed.

Since ArgoCD could not fetch manifests, deployments stopped and applications became OutOfSync or Unknown.

---

# Severity

```
SEV-1
```

Critical GitOps failure preventing deployments.

---

# Business Impact

- Production deployments blocked
- Auto Sync stopped
- Configuration drift increases
- Rollback impossible
- Delayed releases
- Operational risk

---

# Environment

- ArgoCD
- GitHub / GitLab / Bitbucket
- Kubernetes
- Production Cluster

---

# Symptoms

ArgoCD UI

```
Repository Error

Authentication Failed
```

Application

```
Unknown

OutOfSync
```

CLI

```bash
argocd app get guestbook
```

Possible Output

```
Unable to load manifests

authentication required
```

---

# Common Causes

- Expired Personal Access Token
- Revoked SSH Key
- Wrong Repository URL
- Invalid Username
- Wrong Password
- Missing Repository Secret
- Repository Permissions Removed
- Organization Policy Change
- Expired Deploy Key
- Secret Accidentally Deleted

---

# Detection

List Repositories

```bash
argocd repo list
```

Expected

```
STATUS

Failed
```

---

Check Application

```bash
argocd app get guestbook
```

---

# Investigation

## Step 1

Verify Repository

```bash
argocd repo list
```

---

## Step 2

Describe Repository

```bash
argocd repo get https://github.com/company/gitops.git
```

---

## Step 3

Check Repository Secret

```bash
kubectl get secrets \
-n argocd
```

---

## Step 4

Inspect Repository Configuration

```bash
kubectl get secret \
argocd-repo-creds \
-n argocd
```

---

## Step 5

Check ArgoCD Repository Server Logs

```bash
kubectl logs deployment/argocd-repo-server \
-n argocd
```

Look for

```
authentication failed

permission denied

repository unreachable
```

---

## Step 6

Verify Git Access

Example

```bash
git ls-remote https://github.com/company/gitops.git
```

If SSH is used

```bash
ssh -T git@github.com
```

---

## Step 7

Verify Token

Check

- Expiration
- Permissions
- Repository Access

---

# Root Cause Analysis

Example

GitHub Personal Access Token expired.

ArgoCD continued using the old token.

Repository access failed.

Applications could not fetch updated manifests.

Auto Sync stopped.

---

# Resolution

Generate a new access token.

Update ArgoCD repository credentials.

Example

```bash
argocd repo rm https://github.com/company/gitops.git
```

Add Repository Again

```bash
argocd repo add https://github.com/company/gitops.git \
--username git-user \
--password <new-token>
```

Or update the Kubernetes Secret storing repository credentials.

---

# Validation

Verify Repository

```bash
argocd repo list
```

Expected

```
Successful
```

---

Verify Application

```bash
argocd app get guestbook
```

Expected

```
Healthy

Synced
```

---

Synchronize

```bash
argocd app sync guestbook
```

Deployment should complete successfully.

---

# Commands Used

Repositories

```bash
argocd repo list
```

Repository Details

```bash
argocd repo get <repository-url>
```

Application

```bash
argocd app get guestbook
```

Sync

```bash
argocd app sync guestbook
```

Logs

```bash
kubectl logs deployment/argocd-repo-server \
-n argocd
```

Secrets

```bash
kubectl get secrets \
-n argocd
```

---

# Timeline Example

```
10:00

Git Token Expires

↓

10:05

ArgoCD Attempts Repository Access

↓

10:06

Authentication Failed

↓

10:08

Applications Cannot Refresh

↓

10:12

Engineer Reviews Repo Status

↓

10:18

Token Rotated

↓

10:20

Repository Updated

↓

10:22

Applications Refresh

↓

10:24

Deployment Successful
```

---

# Prevention

- Rotate tokens before expiration.
- Use short-lived credentials with automated rotation.
- Monitor repository authentication failures.
- Store credentials securely.
- Limit repository permissions.
- Document credential ownership.
- Audit repository access regularly.

---

# Best Practices

- Prefer GitHub App or OIDC authentication where supported.
- Store credentials in Kubernetes Secrets.
- Never hardcode credentials.
- Use dedicated service accounts.
- Enable repository health monitoring.
- Test credential rotation procedures periodically.

---

# Interview Questions

## 1. Why does ArgoCD require repository authentication?

To fetch Kubernetes manifests from the Git repository.

---

## 2. Which command lists configured repositories?

```bash
argocd repo list
```

---

## 3. Which ArgoCD component accesses Git repositories?

```
argocd-repo-server
```

---

## 4. Where should Git credentials be stored?

In Kubernetes Secrets managed securely by ArgoCD.

---

## 5. How can repository authentication failures be prevented?

- Automated credential rotation
- Secret management
- Repository monitoring
- Least-privilege access
- Regular credential validation

---

# Incident Success Criteria

The incident is resolved when:

- Repository authentication succeeds.
- Repository status is Successful.
- Applications refresh normally.
- Auto Sync resumes.
- Applications become Healthy and Synced.
- Root cause and preventive actions are documented.

---

# Marathi Quick Revision

- Repository Authentication Failure म्हणजे ArgoCD ला Git Repository Access करता येत नाही.
- Expired Token किंवा SSH Key ही सर्वात सामान्य कारणे आहेत.
- `argocd repo list` वापरून Repository Status तपासा.
- `argocd-repo-server` Logs मधून Root Cause शोधा.
- Production मध्ये Credentials नियमित Rotate करा आणि Secrets मध्ये सुरक्षित ठेवा.

