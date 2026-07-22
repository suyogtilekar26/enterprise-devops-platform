# Incident 05 - ImagePullBackOff

# Enterprise DevOps Platform

---

# Incident Summary

A production deployment failed because Kubernetes could not pull the container image from the container registry.

The application Pods entered the **ImagePullBackOff** state and never started.

---

# Severity

```
SEV-1
```

Critical production deployment failure.

---

# Business Impact

- Application unavailable
- Production deployment blocked
- Release delayed
- Customer-facing outage
- SLA violation
- Increased operational effort

---

# Environment

- Kubernetes
- ArgoCD
- Container Registry
- Git Repository
- Production Cluster

---

# Symptoms

ArgoCD Dashboard

```
Application

Health

Degraded
```

Pods

```bash
kubectl get pods -n guestbook
```

Example

```
NAME

guestbook-xxxxx

STATUS

ImagePullBackOff
```

---

# Common Causes

- Wrong Image Name
- Wrong Image Tag
- Private Registry Authentication Failure
- Missing imagePullSecret
- Registry Unavailable
- Network Connectivity Issue
- Deleted Image
- Typographical Error
- Expired Registry Credentials
- Image Not Yet Published

---

# Detection

Check Application

```bash
argocd app get guestbook
```

Check Pods

```bash
kubectl get pods -n guestbook
```

---

# Investigation

## Step 1

Verify Pod Status

```bash
kubectl get pods -n guestbook
```

---

## Step 2

Describe Pod

```bash
kubectl describe pod <pod-name> \
-n guestbook
```

Look for

```
Failed to pull image

ImagePullBackOff

ErrImagePull
```

---

## Step 3

Review Events

```bash
kubectl get events \
-n guestbook \
--sort-by=.lastTimestamp
```

---

## Step 4

Verify Image Name

```bash
kubectl describe deployment guestbook \
-n guestbook
```

Check

```
Image

repository/image:tag
```

---

## Step 5

Verify Registry Access

```bash
docker pull repository/image:tag
```

Or

```bash
crictl pull repository/image:tag
```

---

## Step 6

Verify imagePullSecrets

```bash
kubectl get secrets \
-n guestbook
```

Describe

```bash
kubectl describe serviceaccount default \
-n guestbook
```

---

## Step 7

Verify Registry Credentials

Confirm

- Username
- Password
- Token
- Secret
- Registry URL

---

# Root Cause Analysis

Example

Developer updated Deployment.

Previous Image

```
guestbook:v1.4.0
```

New Image

```
guestbook:v2.0.0
```

The CI pipeline failed before pushing the image.

Git referenced a tag that did not exist.

Kubernetes repeatedly attempted to download the image.

Pods entered

```
ImagePullBackOff
```

---

# Resolution

Correct the image tag.

Example

```yaml
image:

  repository: company/guestbook

  tag: v1.4.0
```

Or push the missing image.

Commit

```bash
git add .
```

```bash
git commit -m "Fixed image tag"
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

Verify Deployment

```bash
kubectl get deployment \
-n guestbook
```

---

Verify Pods

```bash
kubectl get pods \
-n guestbook
```

Expected

```
Running
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

Pods

```bash
kubectl get pods
```

Describe Pod

```bash
kubectl describe pod <pod-name>
```

Deployment

```bash
kubectl describe deployment guestbook
```

Events

```bash
kubectl get events
```

Secrets

```bash
kubectl get secrets
```

---

# Timeline Example

```
16:00

Developer Updates Image Tag

↓

16:02

CI Pipeline Fails

↓

16:05

ArgoCD Starts Deployment

↓

16:06

Image Download Fails

↓

16:07

Pods Enter ImagePullBackOff

↓

16:10

Engineer Reviews Events

↓

16:15

Correct Image Published

↓

16:17

Git Updated

↓

16:18

ArgoCD Sync

↓

16:20

Application Healthy
```

---

# Prevention

- Use immutable image tags.
- Validate image existence in CI.
- Avoid using latest tag.
- Test registry authentication.
- Rotate registry credentials securely.
- Verify imagePullSecrets.
- Protect container registry.

---

# Best Practices

- Use image digests for production deployments.
- Publish images before updating GitOps manifests.
- Automate image verification in CI pipelines.
- Monitor registry availability.
- Alert on ImagePullBackOff events.
- Keep registry credentials in Kubernetes Secrets.

---

# Interview Questions

## 1. What is ImagePullBackOff?

A Kubernetes state indicating that the container image could not be downloaded.

---

## 2. What is the difference between ErrImagePull and ImagePullBackOff?

ErrImagePull is the initial image download failure.

ImagePullBackOff occurs after Kubernetes retries the image pull with exponential backoff.

---

## 3. Which command is most useful for identifying the cause?

```bash
kubectl describe pod <pod-name>
```

---

## 4. What are common causes of ImagePullBackOff?

- Invalid image tag
- Missing imagePullSecret
- Registry authentication failure
- Deleted image
- Network issues

---

## 5. How can ImagePullBackOff incidents be prevented?

- CI image validation
- Immutable image tags
- Registry monitoring
- Proper imagePullSecrets
- Automated deployment testing

---

# Incident Success Criteria

The incident is resolved when:

- Image downloads successfully.
- Pods are Running.
- Application is Healthy.
- Application is Synced.
- Registry authentication works.
- Root cause is documented.

---

# Marathi Quick Revision

- ImagePullBackOff म्हणजे Kubernetes ला Container Image Download करता येत नाही.
- `kubectl describe pod` हा Root Cause शोधण्यासाठी सर्वात महत्त्वाचा Command आहे.
- Wrong Image Tag, Missing imagePullSecret किंवा Registry Authentication Failure ही सामान्य कारणे आहेत.
- CI Pipeline मध्ये Image Publish झाल्यानंतरच GitOps Repository Update करा.
- Production मध्ये Immutable Image Tags वापरणे ही सर्वोत्तम पद्धत आहे.

