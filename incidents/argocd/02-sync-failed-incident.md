# Incident 02 - Application Sync Failed

# Enterprise DevOps Platform

---

# Incident Summary

An ArgoCD application entered the **Sync Failed** state during deployment.

Unlike an **OutOfSync** application, ArgoCD attempted to deploy the desired state but failed because Kubernetes rejected one or more resources.

---

# Severity

```
SEV-2
```

Deployment is blocked and new application changes are not delivered to the target environment.

---

# Business Impact

- Release blocked
- Deployment pipeline failure
- Production changes delayed
- Increased operational workload
- Possible service degradation
- Risk of inconsistent environments

---

# Environment

- Kubernetes
- ArgoCD
- Git Repository
- Production Cluster

---

# Symptoms

ArgoCD Dashboard

```
Application

Sync Failed
```

CLI

```bash
argocd app get guestbook
```

Example

```
Sync Status

OutOfSync

Operation

Failed
```

---

# Common Causes

- Invalid YAML
- Invalid Kubernetes API Version
- Missing Namespace
- Resource Validation Failure
- Duplicate Resource
- Immutable Field Modification
- Missing CRD
- Invalid Helm Values
- Kustomize Build Failure
- Admission Controller Rejection

---

# Detection

Check Application

```bash
argocd app get guestbook
```

Review Sync Operation

```bash
argocd app history guestbook
```

---

# Investigation

## Step 1

View Application

```bash
argocd app get guestbook
```

Review

- Sync Status
- Health
- Operation State
- Error Message

---

## Step 2

View Operation History

```bash
argocd app history guestbook
```

---

## Step 3

View Application Events

```bash
kubectl get events -n guestbook
```

---

## Step 4

Validate YAML

```bash
kubectl apply \
--dry-run=client \
-f deployment.yaml
```

---

## Step 5

Validate Helm

```bash
helm lint .
```

---

## Step 6

Validate Kustomize

```bash
kubectl apply \
--dry-run=client \
-k .
```

---

## Step 7

Review ArgoCD Controller Logs

```bash
kubectl logs deployment/argocd-application-controller \
-n argocd
```

---

# Root Cause Analysis

Example

Developer committed

```yaml
replicas: "three"
```

instead of

```yaml
replicas: 3
```

Kubernetes validation failed.

ArgoCD marked the deployment as

```
Sync Failed
```

---

# Resolution

Correct the manifest.

Example

```yaml
replicas: 3
```

Commit

```bash
git add .
```

```bash
git commit -m "Fixed deployment manifest"
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

Verify

```bash
kubectl get deployment
```

Deployment should exist.

---

Verify Pods

```bash
kubectl get pods
```

Expected

```
Running
```

---

# Commands Used

Application

```bash
argocd app get guestbook
```

History

```bash
argocd app history guestbook
```

Sync

```bash
argocd app sync guestbook
```

Events

```bash
kubectl get events
```

Logs

```bash
kubectl logs deployment/argocd-application-controller \
-n argocd
```

---

# Timeline Example

```
11:00

Developer pushes invalid YAML

↓

11:01

ArgoCD starts Sync

↓

11:02

Kubernetes rejects Deployment

↓

11:03

Application becomes Sync Failed

↓

11:06

Engineer identifies invalid manifest

↓

11:10

Fix committed to Git

↓

11:11

ArgoCD synchronizes successfully

↓

11:12

Application Healthy
```

---

# Prevention

- Validate YAML before committing.
- Use CI validation.
- Run Helm lint.
- Validate Kustomize builds.
- Protect Production branches.
- Review Pull Requests.
- Use automated testing.

---

# Best Practices

- Never bypass CI validation.
- Treat Git as the only deployment source.
- Review ArgoCD operation history before retrying.
- Read Kubernetes events before restarting resources.
- Document recurring deployment failures.

---

# Interview Questions

## 1. What does Sync Failed mean?

ArgoCD attempted to synchronize resources but Kubernetes rejected one or more objects.

---

## 2. What is the first command to investigate?

```bash
argocd app get <application>
```

---

## 3. How do you validate Kubernetes manifests?

```bash
kubectl apply --dry-run=client -f <file>
```

---

## 4. Which logs help investigate Sync failures?

```bash
kubectl logs deployment/argocd-application-controller -n argocd
```

---

## 5. How can Sync Failed incidents be prevented?

- CI validation
- YAML linting
- Helm lint
- Kustomize validation
- Pull Request reviews

---

# Incident Success Criteria

The incident is resolved when:

- Application is Healthy.
- Application is Synced.
- Deployment succeeds.
- Pods are Running.
- Root cause is documented.
- Preventive controls are implemented.

---

# Marathi Quick Revision

- Sync Failed म्हणजे ArgoCD ने Deployment करण्याचा प्रयत्न केला पण Kubernetes ने तो नाकारला.
- Invalid YAML, Helm किंवा Kustomize Errors ही सामान्य कारणे आहेत.
- `argocd app get` आणि Controller Logs तपासणे हा पहिला टप्पा आहे.
- CI मध्ये Manifest Validation केल्यास अशा समस्या टाळता येतात.
- समस्या Git मध्ये दुरुस्त करून पुन्हा Sync करणे ही सर्वोत्तम पद्धत आहे.

