# Incident 08 - Helm Rendering Failure

# Enterprise DevOps Platform

---

# Incident Summary

ArgoCD failed to deploy an application because the Helm chart could not be rendered into valid Kubernetes manifests.

The deployment never reached Kubernetes because manifest generation failed during the rendering phase.

---

# Severity

```
SEV-2
```

Deployment is blocked before Kubernetes resources are created.

---

# Business Impact

- Production deployment blocked
- CI/CD pipeline failure
- Release delay
- Application update unavailable
- Increased operational effort

---

# Environment

- ArgoCD
- Helm
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
```

---

# Common Causes

- Invalid Helm Template
- Invalid values.yaml
- Missing Required Value
- YAML Syntax Error
- Incorrect Template Function
- Missing Helper Template
- Invalid Conditional Logic
- Wrong Chart Version
- Missing Dependency
- Template Rendering Error

---

# Detection

Check Application

```bash
argocd app get guestbook
```

Check History

```bash
argocd app history guestbook
```

---

# Investigation

## Step 1

Check Application

```bash
argocd app get guestbook
```

Look for

```
Manifest Generation Error
```

---

## Step 2

Render Chart Locally

```bash
helm template guestbook .
```

---

## Step 3

Lint Chart

```bash
helm lint .
```

---

## Step 4

Validate Values

```bash
cat values.yaml
```

Verify

- Image
- Replica Count
- Resources
- Service
- Ingress

---

## Step 5

Validate Kubernetes YAML

```bash
helm template guestbook . | kubectl apply \
--dry-run=client -f -
```

---

## Step 6

Verify Dependencies

```bash
helm dependency list
```

Update

```bash
helm dependency update
```

---

## Step 7

Review Repo Server Logs

```bash
kubectl logs deployment/argocd-repo-server \
-n argocd
```

---

# Root Cause Analysis

Example

Developer updated

```yaml
replicaCount:
```

The value was accidentally removed.

Helm could not render

```
.spec.replicas
```

Manifest generation failed.

ArgoCD stopped deployment.

---

# Resolution

Correct

```
values.yaml
```

Example

```yaml
replicaCount: 3
```

Commit

```bash
git add .
```

```bash
git commit -m "Fixed Helm values"
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

Render Chart

```bash
helm template guestbook .
```

Expected

```
Valid Kubernetes YAML
```

---

Lint

```bash
helm lint .
```

Expected

```
0 Chart Errors
```

---

Application

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

Template

```bash
helm template guestbook .
```

Lint

```bash
helm lint .
```

Dependencies

```bash
helm dependency update
```

Logs

```bash
kubectl logs deployment/argocd-repo-server \
-n argocd
```

---

# Timeline Example

```
09:00

Developer Updates values.yaml

↓

09:03

Git Commit

↓

09:05

ArgoCD Starts Sync

↓

09:06

Helm Rendering Failed

↓

09:08

Engineer Runs helm lint

↓

09:10

Configuration Fixed

↓

09:12

Git Updated

↓

09:13

ArgoCD Sync

↓

09:15

Application Healthy
```

---

# Prevention

- Run helm lint in CI.
- Validate values.yaml before merge.
- Test helm template locally.
- Review Pull Requests.
- Pin chart versions.
- Validate chart dependencies.

---

# Best Practices

- Keep templates simple.
- Use default values.
- Validate charts during CI.
- Avoid unnecessary template complexity.
- Test every chart before Production deployment.

---

# Interview Questions

## 1. What is a Helm Rendering Failure?

It occurs when Helm cannot generate valid Kubernetes manifests from a chart.

---

## 2. Which command validates a Helm chart?

```bash
helm lint .
```

---

## 3. Which command renders manifests locally?

```bash
helm template <release-name> .
```

---

## 4. Which ArgoCD component renders Helm charts?

```
argocd-repo-server
```

---

## 5. How can Helm rendering failures be prevented?

- helm lint
- helm template
- CI validation
- Pull Request review
- Dependency validation

---

# Incident Success Criteria

The incident is resolved when:

- Helm chart renders successfully.
- Lint passes without errors.
- ArgoCD synchronization succeeds.
- Application becomes Healthy.
- Root cause is documented.
- Preventive actions are implemented.

---

# Marathi Quick Revision

- Helm Rendering Failure म्हणजे Helm Chart मधून Kubernetes YAML तयार होत नाही.
- `helm lint` आणि `helm template` हे सर्वात महत्त्वाचे Debugging Commands आहेत.
- Invalid values.yaml किंवा Template Errors ही सामान्य कारणे आहेत.
- CI मध्ये Helm Validation करणे आवश्यक आहे.
- Production मध्ये Chart Render Test न करता Deployment करू नये.

