# Incident 07 - Repository Unreachable

# Enterprise DevOps Platform

---

# Incident Summary

ArgoCD was unable to reach the Git repository because of network connectivity or repository availability issues.

Unlike an authentication failure, credentials are valid, but the repository cannot be contacted.

---

# Severity

```
SEV-1
```

Critical production incident because GitOps deployments stop until repository connectivity is restored.

---

# Business Impact

- Production deployments blocked
- Auto Sync unavailable
- Rollback delayed
- Configuration drift cannot be reconciled
- Emergency fixes delayed
- Increased operational risk

---

# Environment

- ArgoCD
- Kubernetes
- GitHub / GitLab / Bitbucket
- Production Cluster

---

# Symptoms

ArgoCD UI

```
Repository Error

Repository Unreachable
```

Application

```
Unknown
```

CLI

```bash
argocd app get guestbook
```

Possible Output

```
Unable to fetch manifests

connection timed out
```

or

```
repository unavailable
```

---

# Common Causes

- Git Provider Outage
- DNS Failure
- Firewall Rules
- Network Policy
- Proxy Misconfiguration
- TLS Certificate Issue
- Internet Connectivity Failure
- Repository URL Changed
- VPN Failure
- Kubernetes Egress Blocked

---

# Detection

Check Repository

```bash
argocd repo list
```

Example

```
STATUS

Failed
```

---

Check Applications

```bash
argocd app list
```

Applications may show

```
Unknown
```

---

# Investigation

## Step 1

Verify Repository Status

```bash
argocd repo list
```

---

## Step 2

Check Repository Server Logs

```bash
kubectl logs deployment/argocd-repo-server \
-n argocd
```

Look for

```
connection refused

timeout

dns lookup failed
```

---

## Step 3

Test DNS

```bash
kubectl exec -it deployment/argocd-repo-server \
-n argocd -- nslookup github.com
```

---

## Step 4

Verify Network Connectivity

```bash
kubectl exec -it deployment/argocd-repo-server \
-n argocd -- curl -I https://github.com
```

---

## Step 5

Verify Repository URL

```bash
argocd repo get https://github.com/company/gitops.git
```

---

## Step 6

Check Network Policies

```bash
kubectl get networkpolicy -A
```

---

## Step 7

Check Kubernetes Events

```bash
kubectl get events -n argocd
```

---

# Root Cause Analysis

Example

A firewall update blocked outbound HTTPS traffic from the Kubernetes cluster.

ArgoCD could no longer communicate with GitHub.

Repository access failed.

Applications stopped refreshing.

---

# Resolution

Restore network connectivity.

Verify

- DNS
- Firewall
- Proxy
- Internet Access
- Repository URL

Once connectivity is restored

```bash
argocd app refresh guestbook
```

Synchronize

```bash
argocd app sync guestbook
```

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

Verify Refresh

```bash
argocd app refresh guestbook
```

Should complete successfully.

---

# Commands Used

Repository List

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

Refresh

```bash
argocd app refresh guestbook
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

DNS

```bash
nslookup github.com
```

Network

```bash
curl -I https://github.com
```

---

# Timeline Example

```
13:00

Firewall Rule Updated

↓

13:02

ArgoCD Loses Internet Connectivity

↓

13:04

Repository Refresh Fails

↓

13:06

Applications Become Unknown

↓

13:10

Engineer Reviews Repo Server Logs

↓

13:15

Firewall Rule Corrected

↓

13:17

Repository Reachable

↓

13:18

Application Refresh

↓

13:20

Applications Healthy
```

---

# Prevention

- Monitor Git provider availability.
- Monitor outbound connectivity.
- Validate firewall changes.
- Test DNS after infrastructure updates.
- Configure redundant network paths.
- Maintain change management records.

---

# Best Practices

- Monitor ArgoCD repository health.
- Alert on repository connectivity failures.
- Validate DNS resolution regularly.
- Test proxy configuration after changes.
- Document network dependencies.
- Include Git connectivity checks in platform monitoring.

---

# Interview Questions

## 1. What is the difference between Repository Authentication Failure and Repository Unreachable?

Authentication Failure means credentials are invalid.

Repository Unreachable means credentials are valid but the repository cannot be contacted.

---

## 2. Which ArgoCD component communicates with Git?

```
argocd-repo-server
```

---

## 3. Which commands help investigate connectivity?

```bash
nslookup github.com
```

```bash
curl -I https://github.com
```

---

## 4. What are common causes of repository connectivity failures?

- DNS
- Firewall
- Proxy
- Network Policies
- Internet outage

---

## 5. How can repository connectivity incidents be prevented?

- Network monitoring
- DNS monitoring
- Firewall validation
- Change management
- Continuous connectivity testing

---

# Incident Success Criteria

The incident is resolved when:

- Repository is reachable.
- Repository status is Successful.
- Applications refresh successfully.
- Auto Sync resumes.
- Applications are Healthy and Synced.
- Root cause is documented.

---

# Marathi Quick Revision

- Repository Unreachable म्हणजे Git Repository पर्यंत Network पोहोचत नाही.
- Authentication योग्य असू शकते, पण Connectivity Fail झालेली असते.
- `argocd-repo-server` Logs, DNS आणि Network Connectivity तपासा.
- Firewall, Proxy आणि DNS ही सर्वात सामान्य कारणे आहेत.
- Production मध्ये Repository Connectivity सतत Monitor करणे आवश्यक आहे.

