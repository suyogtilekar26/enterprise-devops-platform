# Helm Notes 51 - Helm Hooks

# Enterprise DevOps Platform

---

# 1. Purpose

The purpose of this document is to understand **Helm Hooks**, how they work internally and how enterprise DevOps teams automate tasks before and after Helm release lifecycle events.

This is not a beginner tutorial.

This document explains one of the most important advanced Helm topics used in production deployments.

---

# 2. Introduction

Deploying an application is not always enough.

Sometimes we need to perform additional tasks like

- Backup Database
- Run Database Migration
- Validate Configuration
- Execute Smoke Tests
- Send Notifications
- Clean Temporary Resources

These tasks must happen

```
Before

OR

After

Deployment
```

Helm provides this capability using

```
Hooks
```

---

# 3. Why Helm Hooks Exist

Imagine

```
Backend Deployment

↓

Database Schema Changed

↓

Application Starts

↓

Database Not Updated

↓

Application Crash
```

To avoid this,

the database migration should run

```
Before

Application Deployment
```

This is exactly what Helm Hooks solve.

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
```

Before Backend deployment,

we must

- Backup Database
- Apply Schema Migration
- Verify Database Connection

After deployment,

we should

- Execute Smoke Tests
- Notify Monitoring
- Clean Temporary Jobs

Helm Hooks automate these tasks.

---

# 5. What are Helm Hooks?

Helm Hooks are Kubernetes resources that execute during specific stages of a Helm Release lifecycle.

Helm identifies them using annotations.

Example

```yaml
annotations:
  "helm.sh/hook": pre-install
```

When Helm reaches the

```
Install Phase
```

this resource executes automatically.

---

# 6. Common Helm Hooks

| Hook | Purpose |
|------|---------|
| pre-install | Before installation |
| post-install | After installation |
| pre-upgrade | Before upgrade |
| post-upgrade | After upgrade |
| pre-delete | Before uninstall |
| post-delete | After uninstall |
| pre-rollback | Before rollback |
| post-rollback | After rollback |
| test | During `helm test` |

---

# 7. Example Hook

```yaml
apiVersion: batch/v1
kind: Job

metadata:

  name: database-migration

  annotations:

    "helm.sh/hook": pre-upgrade

spec:

  template:

    spec:

      containers:

      - name: migration

        image: migrate:latest

      restartPolicy: Never
```

Before

```bash
helm upgrade
```

Helm executes

```
Database Migration Job
```

---

# 8. Hook Execution Flow

```
helm upgrade

↓

Find Hook

↓

Create Job

↓

Wait For Completion

↓

Successful ?

↓

YES

↓

Deploy Application

↓

NO

↓

Deployment Stops
```

---

# 9. Hook Delete Policies

Helm allows automatic cleanup.

Example

```yaml
annotations:

  "helm.sh/hook-delete-policy": hook-succeeded
```

Other policies

```
hook-failed

before-hook-creation

hook-succeeded
```

This prevents old hook resources from accumulating.

---

# 10. Enterprise Use Cases

Helm Hooks are commonly used for

- Database Backup
- Database Migration
- Cache Warmup
- Smoke Testing
- API Validation
- Secret Generation
- Notification Jobs
- Cleanup Jobs

---

# 11. Production Scenario

A payment application introduced

```
New Database Columns
```

If the application started first,

it would immediately fail.

Platform Team created a

```
pre-upgrade Hook
```

The hook

- Executed Database Migration
- Verified Schema
- Completed Successfully

Only then did Helm deploy the new application.

Deployment completed without downtime.

---

# 12. Interview Questions

## Q1. What are Helm Hooks?

### Answer

Helm Hooks are Kubernetes resources executed automatically before or after specific Helm lifecycle events.

---

## Q2. How does Helm identify a Hook?

### Answer

Using annotations such as

```yaml
helm.sh/hook: pre-install
```

---

## Q3. Which hook executes before an upgrade?

### Answer

```
pre-upgrade
```

---

## Q4. Which hook executes after deployment?

### Answer

```
post-install

or

post-upgrade
```

depending on the operation.

---

## Q5. Why are Helm Hooks important?

### Answer

They automate deployment-related tasks such as database migration, backup, validation and cleanup, reducing manual effort and improving deployment reliability.

---

# 13. Commands

Install Release

```bash
helm install frontend .
```

Upgrade Release

```bash
helm upgrade frontend .
```

Run Tests

```bash
helm test frontend
```

View Hooks

```bash
helm get hooks frontend
```

View Jobs

```bash
kubectl get jobs
```

Describe Job

```bash
kubectl describe job database-migration
```

Logs

```bash
kubectl logs job/database-migration
```

---

# 14. Best Practices

- Keep Hooks idempotent.
- Use Jobs instead of Pods where appropriate.
- Clean completed Hook resources.
- Fail deployment if critical Hooks fail.
- Test Hooks thoroughly.
- Keep Hook execution fast.
- Log Hook execution clearly.

---

# 15. Common Mistakes

- Running long-running applications as Hooks.
- Forgetting cleanup policies.
- Using Hooks for non-deployment tasks.
- Ignoring Hook failures.
- Not monitoring Hook logs.
- Making Hooks non-idempotent.

---

# 16. Marathi Quick Revision

- Hook म्हणजे deployment च्या आधी किंवा नंतर चालणारे task.
- Annotation वापरून Hook define करतात.
- Database migration साठी pre-upgrade वापरतात.
- Smoke testing साठी post-install वापरतात.
- Hook fail झाला तर deployment थांबतो.
- Production मध्ये खूप वापरतात.

---

# 17. Marathi Summary (5+ Experience Revision)

## Simple Explanation

Helm Hooks म्हणजे deployment lifecycle मधील specific event ला automatically execute होणारे Kubernetes resources. Database migration, backup, smoke testing आणि cleanup यांसाठी त्यांचा वापर केला जातो.

### Project Usage

आपल्या Enterprise DevOps Platform मध्ये Backend deployment पूर्वी `pre-upgrade` Hook database migration चालवेल. Deployment नंतर `post-upgrade` Hook smoke tests चालवेल. `helm test` साठी स्वतंत्र `test` Hook वापरला जाईल.

### Production Best Practice

Critical Hooks नेहमी Jobs म्हणून लिहावेत. Hook execution logs monitor करावेत. Cleanup policies वापरून जुने Hook resources delete करावेत. Hook idempotent ठेवावेत म्हणजे repeated execution मुळे समस्या निर्माण होणार नाहीत.

### Production Story

एका fintech enterprise मध्ये नवीन payment-service deployment दरम्यान database migration विसरल्यामुळे application crash होत होती. Platform Team ने `pre-upgrade` Hook तयार केला जो deployment आधी migration पूर्ण करत होता. त्यानंतर सर्व deployments zero-downtime आणि stable झाल्या.

### Investigation Flow

```
Deployment Started

↓

Hook Executed

↓

Success ?

↓

YES

↓

Continue Deployment

↓

NO

↓

View Hook Logs

↓

Fix Issue

↓

Re-run Deployment

↓

Verify Application
```

### 5+ Years Memory Trick

**Interview Question:**

How have you used Helm Hooks in production?

**Answer:**

"In production, I use Helm Hooks to automate deployment lifecycle tasks. For example, a `pre-upgrade` Hook runs database migrations before deploying a new application version, while a `post-upgrade` Hook performs smoke tests. If a critical Hook fails, Helm stops the deployment, preventing faulty releases from reaching users."

