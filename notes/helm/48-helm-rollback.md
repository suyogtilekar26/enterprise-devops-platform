# Helm Notes 48 - Helm Rollback

# Enterprise DevOps Platform

---

# 1. Purpose

The purpose of this document is to understand **Helm Rollback**, how it works internally and how enterprise DevOps teams use it to recover from failed production deployments.

This is not a beginner tutorial.

This document explains one of the most critical production recovery mechanisms available in Helm.

---

# 2. Introduction

No matter how well applications are tested,

production deployments can still fail because of

- Incorrect Image
- Wrong Configuration
- Failed Migration
- Bad Environment Variable
- Resource Limits
- Secret Issues

Instead of rebuilding Docker images,

Helm allows us to restore a previously working release.

This process is called

```
Rollback
```

---

# 3. Why Rollback Exists

Imagine

```
400 Applications

↓

Thousands of Deployments

↓

Production Environment
```

A new deployment causes

```
CrashLoopBackOff

↓

Application Down

↓

Users Cannot Access Service
```

Waiting for developers to fix the code may take hours.

Rollback restores the last stable deployment within minutes.

---

# 4. Enterprise Problem Statement

Our Enterprise DevOps Platform contains

```
Frontend

↓

Backend

↓

Redis

↓

RabbitMQ

↓

PostgreSQL

↓

Prometheus

↓

Grafana

↓

Ingress
```

Every production deployment must support

- Immediate Recovery
- Minimal Downtime
- Version Restoration
- Safe Rollback
- Incident Response

---

# 5. What is Helm Rollback?

Helm Rollback restores a previous Release Revision.

Command

```bash
helm rollback <release-name> <revision>
```

Example

```bash
helm rollback frontend 5
```

Helm restores

```
Revision 5
```

and creates

```
New Revision

↓

Rollback Revision
```

---

# 6. Rollback Lifecycle

```
Revision 1

↓

Install

----------------

Revision 2

↓

Upgrade

----------------

Revision 3

↓

Upgrade

----------------

Revision 4

↓

Upgrade Failed

----------------

Rollback

↓

Revision 3 Restored

↓

Revision 5 Created
```

Rollback never deletes history.

---

# 7. How Rollback Works Internally

```
helm rollback

↓

Read Release History

↓

Locate Target Revision

↓

Read Stored Manifest

↓

Apply Old Manifest

↓

Update Kubernetes Resources

↓

Create New Revision

↓

Deployment Complete
```

The restored deployment becomes the active release.

---

# 8. Enterprise Rollback Workflow

```
Developer

↓

Git Push

↓

CI/CD

↓

helm upgrade

↓

Deployment Failed

↓

helm status

↓

helm history

↓

helm rollback

↓

Application Restored

↓

Root Cause Analysis
```

---

# 9. Production Troubleshooting Example

Deployment

```
Revision 18

↓

New Image
```

Pods

```
CrashLoopBackOff
```

Engineer executes

```bash
helm status frontend
```

Output

```
STATUS

failed
```

Next

```bash
helm history frontend
```

Finds

```
Revision 17

↓

Stable
```

Rollback

```bash
helm rollback frontend 17
```

Application becomes healthy again.

---

# 10. Rollback Options

Rollback

```bash
helm rollback frontend 5
```

Wait Until Complete

```bash
helm rollback frontend 5 \
--wait
```

Rollback and Wait

```bash
helm rollback frontend 5 \
--timeout 10m
```

Rollback Without Hooks

```bash
helm rollback frontend 5 \
--no-hooks
```

Rollback with Cleanup

```bash
helm rollback frontend 5 \
--cleanup-on-fail
```

---

# 11. Production Scenario

A banking application deployed

```
Image v2.8
```

Deployment completed successfully.

After five minutes,

customers reported

```
Payment Failure
```

Investigation showed

```
Incorrect Environment Variable
```

Platform Engineer executed

```bash
helm rollback payment-service 21
```

Within two minutes

```
Previous Version Restored

↓

Payments Started

↓

Business Recovered
```

Root cause analysis continued after service restoration.

---

# 12. Interview Questions

## Q1. What is Helm Rollback?

### Answer

Helm Rollback restores a previously deployed Release Revision and creates a new revision representing the rollback operation.

---

## Q2. Which command performs rollback?

### Answer

```bash
helm rollback <release-name> <revision>
```

---

## Q3. Does rollback delete newer revisions?

### Answer

No.

Rollback creates a new revision while preserving the complete deployment history.

---

## Q4. When should rollback be performed?

### Answer

Rollback should be performed when a production deployment introduces failures and restoring the previous stable version is faster than fixing the current release.

---

## Q5. Why do enterprises prefer rollback over rebuilding?

### Answer

Rollback minimizes downtime by restoring a known stable deployment within minutes, allowing development teams to investigate the issue without impacting users.

---

# 13. Commands

View Status

```bash
helm status frontend
```

View History

```bash
helm history frontend
```

Rollback

```bash
helm rollback frontend 4
```

Rollback and Wait

```bash
helm rollback frontend 4 --wait
```

Rollback with Timeout

```bash
helm rollback frontend 4 \
--timeout 10m
```

Rollback Without Hooks

```bash
helm rollback frontend 4 \
--no-hooks
```

Rollback Cleanup

```bash
helm rollback frontend 4 \
--cleanup-on-fail
```

---

# 14. Best Practices

- Verify `helm history` before rollback.
- Roll back only to a verified stable revision.
- Use `--wait` in production.
- Monitor Pods after rollback.
- Perform root cause analysis after recovery.
- Test rollback procedures regularly.
- Automate rollback where appropriate.

---

# 15. Common Mistakes

- Rolling back to the wrong revision.
- Skipping `helm history`.
- Assuming rollback fixes the root cause.
- Not verifying application health after rollback.
- Ignoring failed rollback operations.
- Performing manual Kubernetes changes after rollback.

---

# 16. Marathi Quick Revision

- Rollback म्हणजे जुनी stable revision restore करणे.
- `helm rollback` command वापरतात.
- Rollback नंतर नवीन revision तयार होते.
- History delete होत नाही.
- Production outage मध्ये सर्वात जास्त वापरतात.
- Root cause नंतर शोधतात, आधी service restore करतात.

---

# 17. Marathi Summary (5+ Experience Revision)

## Simple Explanation

Helm Rollback म्हणजे आधी deploy केलेली stable revision पुन्हा restore करणे. नवीन deployment fail झाल्यास काही मिनिटांत application पूर्वीच्या working version वर आणता येते.

### Project Usage

आपल्या Enterprise DevOps Platform मध्ये GitHub Actions द्वारे नवीन deployment fail झाल्यास Platform Team `helm status` आणि `helm history` तपासेल. Stable revision ओळखून `helm rollback --wait` वापरून application restore केली जाईल आणि नंतर root cause analysis सुरू होईल.

### Production Best Practice

Rollback करण्यापूर्वी `helm history` तपासावी. नेहमी verified stable revision निवडावी. `--wait` वापरून rollback पूर्ण होईपर्यंत थांबावे. Rollback नंतर Pods, Services आणि application health verify करावी.

### Production Story

एका banking enterprise मध्ये नवीन payment-service deployment नंतर सर्व payment requests fail होऊ लागल्या. Platform Team ने `helm history` मधून Revision 21 stable असल्याचे ओळखले आणि `helm rollback payment-service 21 --wait` वापरून दोन मिनिटांत service restore केली. Business continuity टिकून राहिली आणि development team ने नंतर root cause fix केला.

### Investigation Flow

```
Production Alert

↓

helm status

↓

helm history

↓

Identify Stable Revision

↓

helm rollback --wait

↓

Verify Pods

↓

Verify Services

↓

Monitor Application

↓

Root Cause Analysis

↓

Redeploy Fixed Version
```

### 5+ Years Memory Trick

**Interview Question:**

How do you handle a failed Helm deployment in production?

**Answer:**

"My first priority is restoring the service. I check `helm status` to confirm the failure, review `helm history` to identify the last stable revision and execute `helm rollback <release> <revision> --wait`. After verifying application health, I begin root cause analysis while users continue using the restored version."

