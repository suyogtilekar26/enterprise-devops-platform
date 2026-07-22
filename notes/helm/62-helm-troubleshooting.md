# Helm Notes 62 - Helm Troubleshooting (Real Production Scenarios)

# Enterprise DevOps Platform

---

# 1. Purpose

The purpose of this document is to understand the most common Helm deployment failures seen in production and how to troubleshoot them systematically.

This is one of the highest-value interview topics because almost every experienced DevOps interview includes at least one troubleshooting scenario.

---

# 2. Production Story

Friday.

8:30 PM.

Developer says

```
Code is working.

Pipeline passed Docker Build.

But Helm deployment failed.
```

Management asks

```
What happened?

How long to recover?
```

As a DevOps Engineer,

you must identify the issue within minutes.

---

# 3. Golden Troubleshooting Process

Never guess.

Always investigate in this order.

```
CI/CD Logs

↓

helm status

↓

helm history

↓

helm get values

↓

helm template

↓

helm lint

↓

kubectl get all

↓

kubectl describe

↓

kubectl logs

↓

kubectl get events

↓

Root Cause

↓

Fix

↓

Redeploy
```

---

# 4. Scenario 1 - YAML Parse Error

Example

```
Error:

YAML parse error
```

Reason

- Wrong indentation
- Missing :
- Extra spaces
- Invalid syntax

Check

```bash
helm lint .
```

```bash
helm template .
```

Production Fix

```
Correct YAML

↓

helm lint

↓

Deploy Again
```

Interview Question

```
How do you identify YAML errors?

Answer

helm lint

helm template
```

---

# 5. Scenario 2 - Template Error

Example

```
template:

nil pointer

can't evaluate field
```

Reason

```
Variable Missing

OR

Wrong Values
```

Check

```bash
helm template .
```

```bash
helm get values RELEASE
```

Fix

Correct

```
values.yaml
```

---

# 6. Scenario 3 - Release Already Exists

Example

```
cannot re-use

release name
```

Reason

Release already installed.

Check

```bash
helm list -A
```

Fix

Upgrade

```bash
helm upgrade
```

OR

Delete

```bash
helm uninstall
```

---

# 7. Scenario 4 - Pending Upgrade

Example

```
STATUS

pending-upgrade
```

Reason

Previous deployment interrupted.

Check

```bash
helm status
```

```bash
helm history
```

Fix

Rollback

```bash
helm rollback RELEASE REVISION
```

---

# 8. Scenario 5 - ImagePullBackOff

Helm Deployment

SUCCESS

Pods

FAILED

Reason

```
Wrong Image

Wrong Tag

Registry Login

Image Missing
```

Check

```bash
kubectl describe pod
```

```bash
kubectl logs
```

Fix

Correct image.

Deploy again.

---

# 9. Scenario 6 - CrashLoopBackOff

Deployment successful.

Application crashes.

Reason

- Bad ConfigMap
- Wrong Secret
- Application Bug
- Missing ENV

Check

```bash
kubectl logs POD
```

```bash
kubectl describe pod
```

Never blame Helm first.

---

# 10. Scenario 7 - Resource Already Exists

Example

```
resource already exists
```

Reason

Someone manually created

```
ConfigMap

Secret

PVC
```

Helm cannot own it.

Check

```bash
kubectl get all
```

Fix

Delete manual resource

OR

Import correctly.

---

# 11. Scenario 8 - Immutable Field

Example

```
field is immutable
```

Usually

```
PVC

Selector

Deployment Label

Service Type
```

cannot be modified.

Fix

Delete resource

OR

Create new resource.

---

# 12. Scenario 9 - Namespace Error

Example

```
namespace not found
```

Check

```bash
kubectl get ns
```

Fix

```bash
kubectl create namespace production
```

Deploy again.

---

# 13. Scenario 10 - Timeout

Example

```
UPGRADE FAILED

timed out waiting
```

Reason

Pods not Ready.

Check

```bash
kubectl get pods
```

```bash
kubectl describe pod
```

```bash
kubectl logs
```

Never increase timeout first.

Find root cause.

---

# 14. Enterprise Troubleshooting Flow

```
Deployment Failed

↓

helm status

↓

helm history

↓

helm get values

↓

helm template

↓

kubectl get pods

↓

kubectl describe

↓

kubectl logs

↓

kubectl events

↓

Identify Root Cause

↓

Fix

↓

helm upgrade
```

---

# 15. Interview Questions

## Q1

Deployment succeeded but Pods failed.

Where will you investigate?

Answer

```
kubectl describe

kubectl logs

Events
```

---

## Q2

How do you identify template problems?

Answer

```bash
helm template .
```

---

## Q3

Which command validates YAML?

Answer

```bash
helm lint .
```

---

## Q4

How do you recover from Pending Upgrade?

Answer

```
helm history

↓

helm rollback
```

---

## Q5

What causes ImagePullBackOff?

Answer

- Wrong Image
- Wrong Tag
- Registry Authentication
- Image Missing

---

# 16. Best Practices

- Never panic.
- Investigate before rollback.
- Always check Events.
- Validate chart before deployment.
- Use immutable versions.
- Keep revision history.
- Test changes in lower environments first.

---

# 17. Common Mistakes

❌ Blaming Helm for application bugs

❌ Skipping kubectl logs

❌ Ignoring Events

❌ Deleting production resources without investigation

❌ Using latest image tag

❌ Manual Kubernetes changes outside Helm

---

# 18. Marathi Quick Revision

- Helm fail झाला तर प्रथम status तपासा.
- YAML error → helm lint.
- Template error → helm template.
- Pod fail → kubectl logs.
- Pending Upgrade → history + rollback.
- ImagePullBackOff → image/tag तपासा.
- Namespace verify करा.
- Events नेहमी पहा.

---

# 19. Marathi Summary (5+ Years)

## Simple Explanation

Production मध्ये Helm deployment fail झाला तर प्रत्येक error साठी वेगळी investigation असते. Helm commands आणि Kubernetes commands दोन्ही वापरून root cause शोधला पाहिजे.

### Project Usage

आपल्या Enterprise DevOps Platform मध्ये GitHub Actions deployment fail झाल्यास प्रथम Helm release तपासू. त्यानंतर Kubernetes Pods, Events, Logs आणि Describe output वापरून actual failure शोधू. Helm issue आणि Application issue वेगळे identify करू.

### Production Best Practice

Always follow a structured troubleshooting process. Helm, Kubernetes आणि Application logs तिन्ही तपासल्याशिवाय निष्कर्ष काढू नये.

### Production Story

एका production deployment मध्ये Helm upgrade successful झाला, पण application उपलब्ध नव्हती. सुरुवातीला Helm ला दोष दिला गेला. Investigation मध्ये `kubectl logs` वापरून समजले की application चुकीच्या database password मुळे CrashLoopBackOff मध्ये होती. Secret update करून `helm upgrade` केल्यावर application पुन्हा सुरू झाली.

### Investigation Flow

```
Pipeline Failed

↓

helm status

↓

helm history

↓

helm template

↓

helm lint

↓

kubectl get pods

↓

kubectl describe

↓

kubectl logs

↓

kubectl get events

↓

Fix

↓

Redeploy
```

### 5+ Years Memory Trick

**Interview Question**

A Helm deployment failed in production. How will you troubleshoot it?

**Answer**

"I first identify whether the issue is related to Helm or Kubernetes. I check `helm status`, `helm history`, `helm get values` and `helm template` to validate the release. Then I move to Kubernetes by checking Pods, Events, Describe output and Logs. Once I identify the exact root cause, I either perform a Helm upgrade with the fix or rollback to the previous stable revision."

