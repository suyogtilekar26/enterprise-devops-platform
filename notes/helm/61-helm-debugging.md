# Helm Notes 61 - Helm Debugging (Interview & Production)

# Enterprise DevOps Platform

---

# 1. Purpose

The purpose of this document is to learn how to debug Helm deployments in production.

This is one of the most important topics for Senior DevOps interviews because in production your job is not only deploying applications, but also troubleshooting failed deployments quickly.

---

# 2. Production Story

Imagine...

Friday evening.

A developer merged code.

GitHub Actions pipeline started.

```
Docker Build
        ↓
Image Push
        ↓
Helm Upgrade
        ↓
FAILED
```

Application is down.

Everyone asks...

> "What happened?"

As a DevOps Engineer,

your job is NOT to panic.

Your job is to debug step by step.

---

# 3. Helm Debugging Workflow (Golden Flow)

Always follow this order.

```
Deployment Failed
        ↓
helm status
        ↓
helm history
        ↓
helm get values
        ↓
helm get manifest
        ↓
helm template
        ↓
helm lint
        ↓
kubectl logs
        ↓
kubectl describe
        ↓
Find Root Cause
```

Never randomly change YAML files.

---

# 4. Most Important Debugging Commands

## 1. Check Installed Releases

```bash
helm list -A
```

Shows

- Installed releases
- Namespace
- Status
- Revision

---

## 2. Check Release Status

```bash
helm status frontend
```

Shows

- Deployment Status
- Namespace
- Revision
- Resources
- Notes

Interview Question

> First command after deployment failure?

Answer

```
helm status
```

---

## 3. Check Release History

```bash
helm history frontend
```

Output

```
REVISION

1

2

3

4
```

Useful for

- Rollback
- Failed Upgrade
- Previous Version

---

## 4. Get Current Values

```bash
helm get values frontend
```

Useful when

Developer says

```
"I used correct values."
```

Verify yourself.

---

## 5. Get Manifest

```bash
helm get manifest frontend
```

Shows

Generated Kubernetes YAML.

Very useful when

```
Deployment exists

but

Pod not created.
```

---

## 6. Render Templates

Without deploying

```bash
helm template .
```

Shows final YAML.

Useful for

- YAML errors
- Wrong values
- Missing variables

Production engineers use this every day.

---

## 7. Validate Chart

```bash
helm lint .
```

Checks

- Chart syntax
- YAML
- Metadata
- Common mistakes

Always execute before Git Push.

---

## 8. Dry Run

```bash
helm install frontend . \
--dry-run \
--debug
```

Nothing gets deployed.

Everything gets validated.

Excellent interview point.

---

# 5. Production Debugging Commands

After Helm,

move to Kubernetes.

Pods

```bash
kubectl get pods
```

Describe

```bash
kubectl describe pod POD_NAME
```

Logs

```bash
kubectl logs POD_NAME
```

Events

```bash
kubectl get events
```

Deployment

```bash
kubectl describe deployment frontend
```

---

# 6. Enterprise Debugging Flow

```
GitHub Actions Failed

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

kubectl get pods

↓

kubectl describe pod

↓

kubectl logs

↓

Root Cause

↓

Fix

↓

helm upgrade
```

---

# 7. Real Production Scenario

Developer changed

```
values.yaml
```

Image became

```
myapp:latest
```

Production policy

```
latest

NOT ALLOWED
```

Pipeline failed.

Investigation

```
helm get values

↓

Image Tag

↓

Wrong

↓

Developer Fixed

↓

helm upgrade

↓

Production Restored
```

No rollback required.

---

# 8. Interview Questions

## Q1

First command after Helm deployment failure?

Answer

```bash
helm status RELEASE_NAME
```

---

## Q2

How do you see generated YAML?

Answer

```bash
helm template .
```

or

```bash
helm get manifest RELEASE_NAME
```

---

## Q3

How do you validate a chart before deployment?

Answer

```bash
helm lint .
```

---

## Q4

How do you test a chart without installing it?

Answer

```bash
helm install \
--dry-run \
--debug
```

---

## Q5

How do you check previous release revisions?

Answer

```bash
helm history
```

---

# 9. Production Checklist

Before deployment

✅ helm lint

✅ helm template

✅ dry-run

After deployment

✅ helm status

✅ kubectl get pods

✅ logs

✅ events

If failed

✅ history

✅ rollback

---

# 10. Best Practices

- Never deploy without lint.
- Always use dry-run in testing.
- Check rendered YAML before production.
- Never troubleshoot only from CI logs.
- Verify Kubernetes Events.
- Use rollback only after identifying the root cause.
- Keep revision history.

---

# 11. Common Mistakes

❌ Directly editing live resources

❌ Ignoring helm history

❌ Not checking generated YAML

❌ Forgetting Kubernetes events

❌ Blind rollback

❌ Deploying without lint

---

# 12. Marathi Quick Revision

- Failure आली की panic करू नका.
- प्रथम `helm status`.
- नंतर `helm history`.
- मग `helm get values`.
- मग `helm template`.
- मग `helm lint`.
- मग Kubernetes logs/events.
- Root cause शोधा.
- मगच fix करा.

---

# 13. Marathi Summary (5+ Years)

## Simple Explanation

Production मध्ये Helm deployment fail झाला तर random changes करू नयेत. Step-by-step debugging process follow करायची.

## Project Usage

Enterprise DevOps Platform मध्ये GitHub Actions fail झाल्यावर आपण `helm status`, `helm history`, `helm get values`, `helm template` आणि `helm lint` वापरून issue isolate करू. त्यानंतर Kubernetes logs आणि events तपासून root cause शोधू.

## Production Best Practice

Always validate the chart before deployment. Never skip `helm lint` and `--dry-run`. Root cause समजल्याशिवाय rollback करू नका.

## Production Story

एका production release मध्ये developer ने चुकीचा image tag values.yaml मध्ये commit केला. Pipeline fail झाली. `helm get values` वापरून चुकीचा image tag सापडला. Correct tag देऊन `helm upgrade` केले आणि service काही मिनिटांत restore झाली.

## Investigation Flow

```
Pipeline Failed

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

kubectl logs

↓

kubectl describe

↓

Fix

↓

helm upgrade
```

## 5+ Years Memory Trick

**Interview Question**

How do you debug a failed Helm deployment?

**Answer**

"In production I follow a structured approach. First I check the release status using `helm status`, then review revision history with `helm history`. I verify the deployed values using `helm get values`, inspect the generated manifests using `helm get manifest` or `helm template`, validate the chart with `helm lint`, and finally investigate Kubernetes resources using `kubectl describe`, logs and events. Only after identifying the root cause do I perform a Helm upgrade or rollback."

