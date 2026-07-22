# Incident 09 - Kustomize Build Failure

# Enterprise DevOps Platform

---

# Incident Summary

ArgoCD failed to deploy an application because Kustomize could not build valid Kubernetes manifests.

The deployment failed during the manifest generation stage before any resources were applied to the cluster.

---

# Severity

```
SEV-2
```

Deployment blocked due to manifest generation failure.

---

# Business Impact

- Production deployment delayed
- Release blocked
- CI/CD pipeline interruption
- Configuration changes not applied
- Increased operational effort

---

# Environment

- ArgoCD
- Kustomize
- Kubernetes
- Git Repository
- Production Cluster

---

# Symptoms

ArgoCD Dashboard

```
Sync Failed

Manifest Generation Error
```

CLI

```bash
argocd app get guestbook
```

Example

```
Failed to generate manifests

kustomize build failed
```

---

# Common Causes

- Missing Resource
- Incorrect File Path
- Invalid Patch
- Invalid YAML
- Namespace Mismatch
- Duplicate Resources
- Missing Base Directory
- Wrong Overlay Configuration
- Incorrect Image Transformer
- Syntax Error

---

# Detection

Check Application

```bash
argocd app get guestbook
```

Review Sync History

```bash
argocd app history guestbook
```

---

# Investigation

## Step 1

Verify Application

```bash
argocd app get guestbook
```

Look for

```
Manifest Generation Error
```

---

## Step 2

Build Locally

```bash
kustomize build .
```

---

## Step 3

Validate Kubernetes Manifests

```bash
kustomize build . | kubectl apply \
--dry-run=client -f -
```

---

## Step 4

Inspect kustomization.yaml

```bash
cat kustomization.yaml
```

Verify

- resources
- patches
- images
- namespace
- commonLabels

---

## Step 5

Verify Referenced Files

Example

```bash
ls -R
```

Ensure every referenced file exists.

---

## Step 6

Check Patch Files

Example

```bash
cat patch-deployment.yaml
```

Confirm

- Correct Kind
- Correct Metadata
- Valid YAML
- Matching Resource Names

---

## Step 7

Review Repo Server Logs

```bash
kubectl logs deployment/argocd-repo-server \
-n argocd
```

Look for

```
kustomize build failed

resource not found

yaml parse error
```

---

# Root Cause Analysis

Example

Developer renamed

```
deployment.yaml
```

to

```
deployment-prod.yaml
```

The file reference inside

```
kustomization.yaml
```

was never updated.

Kustomize failed while building manifests.

ArgoCD stopped deployment.

---

# Resolution

Update

```
kustomization.yaml
```

Correct Example

```yaml
resources:
  - deployment-prod.yaml
  - service.yaml
```

Commit Changes

```bash
git add .
```

```bash
git commit -m "Fixed Kustomize resource references"
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

Run

```bash
kustomize build .
```

Expected

```
Valid Kubernetes YAML
```

---

Dry Run

```bash
kustomize build . | kubectl apply \
--dry-run=client -f -
```

Expected

```
configured (dry run)
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

# Commands Used

Application

```bash
argocd app get guestbook
```

History

```bash
argocd app history guestbook
```

Build

```bash
kustomize build .
```

Dry Run

```bash
kustomize build . | kubectl apply \
--dry-run=client -f -
```

Logs

```bash
kubectl logs deployment/argocd-repo-server \
-n argocd
```

---

# Timeline Example

```
11:00

Developer Renames Resource File

↓

11:03

Git Commit

↓

11:05

ArgoCD Starts Sync

↓

11:06

Kustomize Build Failed

↓

11:08

Engineer Executes kustomize build

↓

11:12

Resource Path Corrected

↓

11:14

Git Updated

↓

11:15

ArgoCD Sync

↓

11:17

Application Healthy
```

---

# Prevention

- Validate Kustomize in CI.
- Run local builds before committing.
- Use Pull Request reviews.
- Avoid manual file renaming without updating references.
- Validate overlays.
- Keep directory structures consistent.

---

# Best Practices

- Always execute `kustomize build` before committing.
- Use relative paths consistently.
- Keep overlays simple.
- Validate patches after every change.
- Test production overlays independently.
- Maintain clean repository organization.

---

# Interview Questions

## 1. What is a Kustomize Build Failure?

It occurs when Kustomize cannot generate valid Kubernetes manifests from the configured resources and overlays.

---

## 2. Which command validates a Kustomize project?

```bash
kustomize build .
```

---

## 3. Which ArgoCD component runs Kustomize?

```
argocd-repo-server
```

---

## 4. What are common causes of Kustomize failures?

- Missing resource files
- Invalid patches
- YAML syntax errors
- Incorrect paths
- Overlay configuration issues

---

## 5. How can Kustomize build failures be prevented?

- Local build validation
- CI validation
- Pull Request review
- Overlay testing
- Consistent repository structure

---

# Incident Success Criteria

The incident is resolved when:

- Kustomize build succeeds.
- Kubernetes manifests are valid.
- ArgoCD synchronization completes.
- Application becomes Healthy.
- Root cause is documented.
- Preventive actions are implemented.

---

# Marathi Quick Revision

- Kustomize Build Failure म्हणजे Kustomize Kubernetes Manifests तयार करू शकत नाही.
- `kustomize build .` हा सर्वात महत्त्वाचा Debugging Command आहे.
- Missing Resources, Invalid Patches आणि चुकीचे File Paths ही सामान्य कारणे आहेत.
- CI मध्ये Kustomize Build Validation करणे आवश्यक आहे.
- Production मध्ये Local Build Test केल्याशिवाय Git Commit करू नये.

