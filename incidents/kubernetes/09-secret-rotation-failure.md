# Kubernetes Production Incident 09 - Secret Rotation Failure During Production

# 1. Incident Overview

## Incident ID

INC-K8S-009

## Severity

SEV-1

## Environment

Production

## Reported By

Prometheus Alertmanager

## Incident Time

07:25 AM

## Resolved Time

08:03 AM

## Duration

38 Minutes

## Affected Component

Kubernetes Secret

## Affected Service

Auth Service

## Impacted Application

Enterprise DevOps Platform

```
Frontend

↓

API Gateway

↓

Auth Service ❌

↓

PostgreSQL
```

---

# 2. Business Impact

Customer Impact

- User login failed
- JWT generation unavailable
- Authentication APIs returned HTTP 500
- Dashboard inaccessible

Business Impact

- Customer authentication unavailable
- Revenue-generating transactions delayed
- Increased customer support tickets
- SLA breach risk

Estimated Revenue Impact

Critical

---

# 3. Alert Received

Prometheus Alert

```
ApplicationErrorRate

Severity

Critical

Namespace

enterprise-devops

Deployment

auth-service
```

Grafana Dashboard

```
HTTP 500 ↑

Pod Restarts ↑

Authentication Errors ↑
```

Application Logs

```
FATAL

password authentication failed

for user auth_user
```

---

# 4. Production Architecture

```
GitHub Actions

↓

Argo CD

↓

Kubernetes Secret

↓

Auth Service

↓

PostgreSQL
```

---

# 5. Symptoms

Observed

- Auth Pods restarting
- Login failures
- Database authentication failures
- JWT generation stopped

Users observed

- Login page failed
- Authentication timeout
- HTTP 500 responses

---

# 6. Initial Investigation

Objective

Determine whether issue is related to

- Secret
- Database
- Network
- Application
- Deployment

Commands

```bash
kubectl get pods

kubectl logs --previous

kubectl describe pod
```

Observation

```
Database authentication failed
```

---

# 7. Investigation Timeline

## 07:25

Critical alert received.

---

## 07:28

Verified Pods.

```bash
kubectl get pods
```

Observed

```
CrashLoopBackOff
```

---

## 07:31

Collected previous logs.

```bash
kubectl logs \
auth-service-pod \
--previous
```

Observed

```
password authentication failed
```

---

## 07:34

Verified Secret.

```bash
kubectl describe secret auth-secret
```

Secret updated recently.

---

## 07:37

Compared Secret values with database credentials.

Observed

Password mismatch.

---

## 07:41

Reviewed Git history.

Secret rotation pipeline completed successfully.

Database password rotation job failed.

---

## 07:45

Root Cause confirmed.

Secret updated before database credential rotation completed.

---

## 07:49

Updated Secret with correct credentials.

```bash
kubectl apply \
-f auth-secret.yaml
```

Restarted Deployment.

```bash
kubectl rollout restart \
deployment/auth-service
```

---

## 07:57

Pods healthy.

---

## 08:03

Business validation completed.

Incident closed.

---

# 8. Commands Executed

Pods

```bash
kubectl get pods

kubectl describe pod

kubectl logs

kubectl logs --previous
```

Secrets

```bash
kubectl get secret

kubectl describe secret

kubectl edit secret
```

Deployment

```bash
kubectl rollout restart deployment/auth-service

kubectl rollout status deployment/auth-service
```

Database

```bash
psql

SELECT current_user;
```

Events

```bash
kubectl get events \
--sort-by=.metadata.creationTimestamp
```

---

# 9. Findings

Infrastructure

Healthy

Pods

Restarting

Database

Healthy

Application

Unable to authenticate

Root Issue

Secret contained incorrect password

---

# 10. Root Cause

The Secret rotation automation updated Kubernetes Secrets before the database password rotation completed successfully.

The application attempted to authenticate using credentials that were not yet valid.

---

# 11. Resolution

Updated Kubernetes Secret.

Restarted Deployment.

Validated database connectivity.

Verified login functionality.

---

# 12. Validation

Pods

```bash
kubectl get pods
```

Business

- Login successful
- JWT generated
- Dashboard accessible
- Authentication restored

Monitoring

- Restart alerts cleared
- HTTP 500 resolved
- Authentication latency normal

---

# 13. Rollback

Restore previous Secret.

```bash
kubectl apply \
-f previous-secret.yaml
```

Restart deployment.

```bash
kubectl rollout restart deployment/auth-service
```

---

# 14. Customer Communication

Initial Update

> We are investigating an authentication issue affecting customer logins.

Progress Update

> Root cause has been identified during credential rotation. Recovery actions are underway.

Resolution

> Authentication services have been fully restored. Monitoring will continue until stability is confirmed.

---

# 15. Incident Timeline

```
07:25

Alert

↓

07:31

Logs Reviewed

↓

07:34

Secret Investigation

↓

07:37

Credential Comparison

↓

07:41

Pipeline Review

↓

07:45

Root Cause

↓

07:49

Secret Updated

↓

07:57

Pods Healthy

↓

08:03

Incident Closed
```

---

# 16. Root Cause Analysis (RCA)

## What Happened?

Authentication failed after Secret rotation.

## Why?

Kubernetes Secret was updated before the database password change completed.

## Why wasn't it detected?

The credential rotation workflow lacked end-to-end validation.

## Customer Impact

Authentication services unavailable.

## Preventive Action

Implement transactional credential rotation with automatic verification before deployment.

---

# 17. Preventive Actions

- Implement staged Secret rotation.
- Validate database credentials before updating Kubernetes Secrets.
- Add automated authentication smoke tests.
- Prevent deployment if credential validation fails.
- Peer review Secret rotation workflows.
- Monitor authentication success rate after rotation.

---

# 18. Production Best Practices

- Rotate credentials using an approved runbook.
- Never update Secrets before backend systems are ready.
- Validate authentication immediately after rotation.
- Keep previous Secrets available for rollback.
- Automate Secret rotation using GitOps workflows.
- Audit every credential change.

---

# 19. Production Support Interview Questions

## Q1. How do you investigate Secret rotation failures?

### Answer

1. Review application logs.
2. Verify Secret contents.
3. Compare credentials with backend systems.
4. Review Secret rotation pipeline.
5. Validate database authentication.
6. Restore valid credentials.
7. Restart affected workloads.
8. Validate business functionality.

---

## Q2. Why is Secret rotation risky?

### Answer

Because multiple systems must be updated in the correct sequence. Updating one side before the other causes authentication failures and application outages.

---

## Q3. How do you make Secret rotation safer?

### Answer

Use staged rotation, automated validation, smoke tests, rollback capability, GitOps approvals and post-rotation monitoring.

---

# 20. Marathi Quick Revision

- Logs तपासा.
- Secret verify करा.
- Database credentials compare करा.
- Rotation pipeline तपासा.
- Root Cause शोधा.
- Secret restore करा.
- Deployment restart करा.
- Business validation करा.
- RCA तयार करा.

---

# 21. Marathi Summary (5+ Experience Revision)

## Interview Summary

Production मध्ये Secret rotation failure आल्यास प्रथम application logs तपासावेत. त्यानंतर Kubernetes Secret आणि backend credentials compare करावेत. Rotation workflow, deployment history आणि database authentication verify करून Root Cause निश्चित करावा. योग्य Secret restore करून deployment restart करावा. शेवटी business validation, monitoring validation आणि RCA पूर्ण करावी.

### Production Investigation Flow

```
Alert

↓

Logs

↓

Secret

↓

Database

↓

Rotation Pipeline

↓

Root Cause

↓

Fix

↓

Restart

↓

Business Validation

↓

RCA
```

### Production Story

एका production banking application मध्ये सकाळच्या scheduled Secret rotation नंतर सर्व login requests fail होऊ लागल्या. Investigation मध्ये Kubernetes Secret नवीन password वापरत होती, पण database rotation job अर्धवट अपयशी ठरली होती. योग्य Secret restore करून Auth Service restart करण्यात आली आणि काही मिनिटांत authentication पूर्णपणे restore झाली. Incident नंतर Secret rotation pipeline मध्ये "database validation before Secret update" हा mandatory approval step जोडण्यात आला.

### 5+ Years Memory Trick

Interview मध्ये जर विचारले,

**"How do you troubleshoot a Secret rotation failure in Kubernetes production?"**

उत्तर:

"I first review application logs, inspect the Kubernetes Secret, compare credentials with the backend system, review the rotation workflow, identify the synchronization failure, restore valid credentials, restart the affected workloads, validate business functionality, monitor authentication metrics, and complete the RCA."

