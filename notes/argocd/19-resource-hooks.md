# Resource Hooks

# Enterprise DevOps Platform

---

# Purpose

This document explains Resource Hooks in ArgoCD from beginner to enterprise level.

Resource Hooks allow ArgoCD to execute Kubernetes resources at specific stages of the deployment lifecycle. They are widely used in enterprise environments for database migrations, smoke tests, notifications, backups, approvals and cleanup activities.

---

# Introduction

A deployment often requires more than simply applying Kubernetes manifests.

Example

```
Deploy Application

↓

Run Database Migration

↓

Deploy Pods

↓

Run Smoke Test

↓

Notify Team
```

Resource Hooks automate these additional tasks.

---

# Simple Definition

Resource Hooks are Kubernetes resources that ArgoCD executes before, during or after an application deployment.

---

# Why Resource Hooks?

Without Hooks

```
Engineer

↓

Deploy

↓

Run DB Migration

↓

Run Tests

↓

Verify Deployment

↓

Notify Team
```

Everything is manual.

---

With Hooks

```
Git Commit

↓

ArgoCD

↓

PreSync

↓

Sync

↓

PostSync

↓

Deployment Completed
```

Fully automated.

---

# Hook Lifecycle

```
Git Commit

↓

PreSync

↓

Application Deployment

↓

Sync

↓

Application Healthy

↓

PostSync

↓

Sync Completed
```

---

# Types of Hooks

## PreSync

Runs before deployment.

Typical use cases

- Database migration
- Configuration validation
- Backup
- Permission check

---

## Sync

Runs during synchronization.

Usually performs deployment-related operations.

---

## PostSync

Runs after successful deployment.

Typical use cases

- Smoke testing
- API testing
- Slack notification
- Email notification

---

## SyncFail

Runs only if synchronization fails.

Typical use cases

- Rollback
- Incident notification
- Alert generation
- Cleanup

---

# Hook Flow

```
Git

↓

PreSync

↓

Deploy

↓

Healthy?

↓

Yes

↓

PostSync

----------------------

No

↓

SyncFail
```

---

# Example PreSync Hook

```yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: database-migration
  annotations:
    argocd.argoproj.io/hook: PreSync
```

Database migration executes before deployment.

---

# Example PostSync Hook

```yaml
metadata:
  annotations:
    argocd.argoproj.io/hook: PostSync
```

Runs after deployment becomes healthy.

---

# Example SyncFail Hook

```yaml
metadata:
  annotations:
    argocd.argoproj.io/hook: SyncFail
```

Runs only when synchronization fails.

---

# Enterprise Example

Our Enterprise DevOps Platform

```
Frontend

Gateway

Auth

Dashboard
```

Deployment Process

```
PreSync

↓

Backup Database

↓

Run DB Migration

↓

Deploy Applications

↓

Health Checks

↓

Smoke Test

↓

Slack Notification

↓

Deployment Completed
```

---

# Hook Delete Policies

After execution, hooks can be removed automatically.

Example

```yaml
annotations:
  argocd.argoproj.io/hook-delete-policy: HookSucceeded
```

Other policies include

- HookSucceeded
- HookFailed
- BeforeHookCreation

---

# Common Enterprise Use Cases

## Database Migration

```
PreSync

↓

Liquibase

Flyway

Migration Job
```

---

## Smoke Testing

```
PostSync

↓

API Test

↓

Success
```

---

## Slack Notification

```
Deployment Completed

↓

Slack Message

↓

Team Notified
```

---

## Rollback Notification

```
Deployment Failed

↓

SyncFail

↓

PagerDuty Alert
```

---

# Benefits

- Automated deployments
- Automated database migration
- Automated testing
- Consistent release process
- Reduced manual work
- Better production reliability

---

# Common Problems

Database migration fails.

Result

```
PreSync Failed

↓

Deployment Stops
```

This prevents application deployment with an inconsistent database.

---

PostSync test fails.

Application deploys successfully but

```
Smoke Test

Failed
```

Operations team investigates immediately.

---

# Best Practices

- Keep hooks idempotent.
- Use Kubernetes Jobs for hooks.
- Keep hook execution fast.
- Always monitor hook failures.
- Use PreSync for migrations only.
- Use PostSync for validation.
- Configure cleanup policies.
- Store hook definitions in Git.

---

# Interview Questions

## Q1. What are Resource Hooks in ArgoCD?

### Answer

Resource Hooks are Kubernetes resources that execute before, during or after application synchronization to automate deployment-related tasks.

---

## Q2. What is the purpose of a PreSync Hook?

### Answer

PreSync Hooks execute before deployment and are commonly used for database migrations, validation and backups.

---

## Q3. What is the purpose of a PostSync Hook?

### Answer

PostSync Hooks execute after a successful deployment and are commonly used for smoke tests, notifications and deployment verification.

---

## Q4. What happens if a PreSync Hook fails?

### Answer

ArgoCD stops the deployment process, preventing the application from being deployed in an inconsistent state.

---

# Marathi Quick Revision

- Hooks म्हणजे Deployment Automation.
- PreSync → Deployment आधी.
- Sync → Deployment दरम्यान.
- PostSync → Deployment नंतर.
- SyncFail → Failure नंतर.
- Database Migration साठी PreSync वापरतात.
- Smoke Test साठी PostSync वापरतात.

---

# Marathi Summary (5+ Experience Revision)

Resource Hooks हे ArgoCD मधील अत्यंत महत्त्वाचे enterprise automation feature आहे. Deployment lifecycle मधील PreSync, Sync, PostSync आणि SyncFail या टप्प्यांमध्ये Kubernetes Jobs किंवा इतर resources execute करता येतात. Database migration, smoke testing, backup, rollback, Slack notification आणि cleanup यांसारख्या production workflows मध्ये Hooks मोठ्या प्रमाणावर वापरले जातात. Senior DevOps interviews मध्ये PreSync आणि PostSync Hooks बद्दल प्रश्न जवळपास नेहमीच विचारले जातात.

