# Rollback

# Enterprise DevOps Platform

---

# Purpose

This document explains Rollback in ArgoCD from beginner to enterprise level.

Rollback is one of the most important production and interview topics. It allows applications to return to a previously working version when a deployment introduces failures.

---

# Introduction

Imagine a new deployment is released.

```
Version

v2.0
```

After deployment

```
Users

↓

500 Errors

↓

Application Crash
```

The fastest solution is

```
Rollback

↓

Previous Stable Version

↓

v1.9
```

ArgoCD makes rollback simple because Git stores deployment history.

---

# Simple Definition

Rollback means

> Restoring an application to a previously working Git revision.

---

# Why Rollback?

Without Rollback

```
Deploy

↓

Application Fails

↓

Manual Fix

↓

Long Downtime
```

---

With Rollback

```
Deploy

↓

Failure

↓

Rollback

↓

Stable Version Restored

↓

Application Healthy
```

---

# Rollback Workflow

```
Git Repository

↓

Revision 10

↓

Deploy

↓

Application Failure

↓

Rollback

↓

Revision 9

↓

Healthy
```

---

# Enterprise Example

Enterprise DevOps Platform

Current Version

```
Frontend

v2.5
```

Deployment

```
v2.6
```

Problem

```
Login Failed

↓

Checkout Failed

↓

Users Impacted
```

DevOps Engineer

```
Rollback

↓

v2.5

↓

Service Restored
```

---

# Revision History

Every synchronization creates a revision.

Example

```
Revision 15

↓

v2.5

---------------------

Revision 16

↓

v2.6

---------------------

Revision 17

↓

v2.7
```

Rollback returns to an earlier revision.

---

# View History

```bash
argocd app history frontend
```

Example

```
ID

16

Revision

abc123

Deployed

Success

------------------------

ID

15

Revision

xyz789

Success
```

---

# Rollback Command

```bash
argocd app rollback frontend 15
```

Meaning

```
Rollback

↓

Revision 15
```

---

# Rollback Architecture

```
Git

↓

Revision History

↓

Select Revision

↓

Rollback

↓

Cluster Updated

↓

Healthy
```

---

# Typical Rollback Scenarios

## Bad Release

```
New Feature

↓

Application Crash

↓

Rollback
```

---

## Wrong Configuration

```
ConfigMap Updated

↓

Pods Fail

↓

Rollback
```

---

## Secret Change

```
Wrong Secret

↓

Authentication Failed

↓

Rollback
```

---

## Failed Deployment

```
Deployment

↓

CrashLoopBackOff

↓

Rollback
```

---

# Rollback vs Git Revert

Rollback

```
Cluster

↓

Previous Revision
```

Git Revert

```
Git Commit

↓

New Commit

↓

Deploy Again
```

Interview Tip

Rollback is immediate.

Git Revert creates a new commit.

---

# Benefits

- Fast recovery
- Reduced downtime
- Simple deployment recovery
- Safer releases
- Better production stability
- Supports incident response

---

# Limitations

Rollback cannot fix

- Database corruption
- Lost data
- External system failures
- Infrastructure failures

Database schema changes may require separate rollback procedures.

---

# Best Practices

- Deploy small changes.
- Keep releases frequent.
- Test before Production.
- Monitor deployments.
- Keep database migrations backward compatible.
- Document rollback procedures.
- Practice rollback during DR drills.

---

# Common Problems

Rollback fails.

Possible causes

- Missing Git revision
- Resource conflicts
- Database schema incompatibility
- Manual cluster changes

---

Application still unhealthy.

Possible causes

- External dependency failure
- Database issue
- Incorrect rollback target

---

# Interview Questions

## Q1. What is Rollback in ArgoCD?

### Answer

Rollback restores an application to a previously deployed Git revision when the current deployment fails.

---

## Q2. How do you view deployment history?

### Answer

```bash
argocd app history <application-name>
```

---

## Q3. How do you rollback an application?

### Answer

```bash
argocd app rollback <application-name> <history-id>
```

Example

```bash
argocd app rollback frontend 15
```

---

## Q4. What is the difference between Rollback and Git Revert?

### Answer

Rollback restores an earlier deployed revision immediately, while Git Revert creates a new commit that reverses previous changes.

---

# Marathi Quick Revision

- Rollback म्हणजे जुनी Stable Version Restore करणे.
- Deployment History वापरतो.
- `argocd app history` वापरून revisions पाहतो.
- `argocd app rollback` वापरून rollback करतो.
- Git Revert आणि Rollback वेगळे आहेत.
- Production Incident मध्ये खूप वापरतात.
- Senior Interview Favorite Topic.

---

# Marathi Summary (5+ Experience Revision)

Rollback हे ArgoCD मधील Production Recovery चे महत्त्वाचे feature आहे. नवीन deployment मुळे application failure झाल्यास आधीच्या stable Git revision वर त्वरित परत जाता येते. `argocd app history` द्वारे deployment revisions पाहता येतात आणि `argocd app rollback` वापरून सुरक्षित revision restore करता येते. Enterprise environments मध्ये Rollback ही Incident Response आणि Release Management ची अत्यंत महत्त्वाची प्रक्रिया आहे. Git Revert आणि Rollback मधील फरक हा Interview मध्ये वारंवार विचारला जाणारा प्रश्न आहे.

