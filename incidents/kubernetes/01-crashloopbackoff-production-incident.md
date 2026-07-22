# Kubernetes Production Incident 01 - CrashLoopBackOff During Production Deployment

# 1. Incident Overview

## Incident ID

INC-K8S-001

## Severity

SEV-1

## Environment

Production

## Reported By

Prometheus Alertmanager

## Incident Time

10:05 AM

## Resolved Time

10:32 AM

## Duration

27 Minutes

## Affected Service

Auth Service

## Impacted Application

Enterprise DevOps Platform

```
Frontend

↓

API Gateway

↓

Auth Service   ❌

↓

Dashboard Service
```

---

# 2. Business Impact

Customer Impact

- Users unable to login
- Authentication APIs returning HTTP 500
- Dashboard inaccessible
- Mobile application login failed

Business Impact

- Customer authentication unavailable
- New user sessions failed
- Internal support tickets increased
- SLA breach risk

Estimated Revenue Impact

High

---

# 3. Alert Received

Prometheus Alert

```
KubernetesPodCrashLooping

Severity: Critical

Namespace: enterprise-devops

Pod:

auth-service-79bc98b7d-zrkn5

Restart Count

34
```

Grafana Dashboard

```
Pod Restarts ↑↑↑

Availability ↓

HTTP 500 ↑
```

---

# 4. Production Architecture

```
React Frontend

↓

API Gateway

↓

Auth Service

↓

PostgreSQL
```

Deployment

```
GitHub Actions

↓

Container Registry

↓

Kubernetes Deployment

↓

Auth Pods
```

---

# 5. Symptoms

Observed

- Login API returning 500
- Pod restarting every few seconds
- Readiness probe failing
- Liveness probe restarting container
- Authentication unavailable

Application Logs

```
Database connection failed

Exiting...
```

---

# 6. Initial Investigation

First objective

Determine

- Infrastructure issue?
- Kubernetes issue?
- Application issue?
- Database issue?

Commands

```bash
kubectl get pods -n enterprise-devops

kubectl get events \
--sort-by=.metadata.creationTimestamp

kubectl top pods
```

Observation

```
CrashLoopBackOff
```

only on

```
auth-service
```

Other services healthy.

---

# 7. Investigation Timeline

## 10:05

Critical Alert received.

---

## 10:07

Verified cluster health.

```bash
kubectl get nodes
```

Result

```
All Nodes Ready
```

---

## 10:08

Verified Pods.

```bash
kubectl get pods
```

Result

```
Auth Pod

CrashLoopBackOff
```

---

## 10:10

Collected Pod description.

```bash
kubectl describe pod auth-service-79bc98b7d-zrkn5
```

Events

```
Back-off restarting failed container
```

---

## 10:12

Collected previous logs.

```bash
kubectl logs auth-service-79bc98b7d-zrkn5 \
--previous
```

Observed

```
Database authentication failed
```

---

## 10:15

Verified Deployment.

```bash
kubectl describe deployment auth-service
```

Confirmed

```
DATABASE_PASSWORD

coming from Secret
```

---

## 10:18

Verified Secret.

```bash
kubectl describe secret auth-secret
```

Secret recently updated.

---

## 10:20

Compared production Secret with PostgreSQL credentials.

Mismatch identified.

---

## 10:22

Root Cause confirmed.

Wrong database password deployed.

---

## 10:24

Applied corrected Secret.

```bash
kubectl apply -f auth-secret.yaml
```

Restarted Deployment.

```bash
kubectl rollout restart deployment/auth-service
```

---

## 10:29

Pods healthy.

---

## 10:32

Business validation successful.

Incident closed.

---

# 8. Commands Executed

Cluster

```bash
kubectl get nodes

kubectl cluster-info
```

Pods

```bash
kubectl get pods

kubectl describe pod

kubectl logs

kubectl logs --previous
```

Deployment

```bash
kubectl describe deployment

kubectl rollout restart deployment/auth-service
```

Secrets

```bash
kubectl get secrets

kubectl describe secret auth-secret
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

Control Plane

Healthy

Worker Nodes

Healthy

Database

Healthy

Application

Unable to authenticate

Secret

Incorrect password

---

# 10. Root Cause

During a scheduled credential rotation, an incorrect database password was stored inside the Kubernetes Secret.

The Deployment restarted using invalid credentials.

Application initialization failed.

The container exited repeatedly, causing CrashLoopBackOff.

---

# 11. Resolution

Updated Secret

```bash
kubectl apply -f auth-secret.yaml
```

Restarted Deployment

```bash
kubectl rollout restart deployment/auth-service
```

Verified

```bash
kubectl rollout status deployment/auth-service
```

---

# 12. Validation

Infrastructure

```bash
kubectl get nodes
```

Pods

```bash
kubectl get pods
```

Business

- Login successful
- JWT generation successful
- Dashboard accessible
- APIs healthy

Monitoring

- Restart alerts cleared
- HTTP 500 disappeared
- Availability restored

---

# 13. Rollback

If Secret update failed

Restore previous Secret

```bash
kubectl apply -f previous-secret.yaml
```

Restart Deployment

```bash
kubectl rollout restart deployment/auth-service
```

Validate authentication.

---

# 14. Customer Communication

Initial Update

> We are investigating an authentication service issue affecting user logins.

Mid Update

> Root cause identified. Recovery actions are in progress.

Resolution

> Authentication services have been restored. We are continuing to monitor the platform.

---

# 15. Incident Timeline

```
10:05

Alert

↓

10:08

CrashLoopBackOff Verified

↓

10:12

Logs Collected

↓

10:18

Secret Investigated

↓

10:22

Root Cause Found

↓

10:24

Secret Updated

↓

10:29

Pods Healthy

↓

10:32

Incident Closed
```

---

# 16. Root Cause Analysis (RCA)

## What Happened?

Database credentials were rotated incorrectly.

## Why?

Incorrect Secret value deployed.

## Why wasn't it detected?

No post-deployment authentication validation.

## Customer Impact

Authentication unavailable.

## Preventive Action

Implement automated login validation after every Secret rotation.

---

# 17. Preventive Actions

- Automated Secret validation
- Post-deployment smoke testing
- Secret peer review
- GitOps approval workflow
- Login API synthetic monitoring
- Automated rollback on repeated CrashLoopBackOff

---

# 18. Production Best Practices

- Never rotate Secrets without validation.
- Backup Secrets before updates.
- Verify external credentials before deployment.
- Monitor restart count after every deployment.
- Validate business transactions—not just Pod status.
- Always collect logs before restarting Pods.

---

# 19. Production Support Interview Questions

## Q1. A production Pod enters CrashLoopBackOff. What is your investigation order?

### Answer

1. Assess business impact.
2. Verify cluster health.
3. Describe the Pod.
4. Review current and previous logs.
5. Check Events.
6. Review recent deployments.
7. Verify ConfigMaps and Secrets.
8. Validate external dependencies.
9. Identify Root Cause.
10. Apply the safest recovery and validate business functionality.

---

## Q2. Why should you use `kubectl logs --previous`?

### Answer

Because the current container may have already restarted. The previous container logs often contain the actual crash reason.

---

## Q3. Should you delete the Pod immediately?

### Answer

No.

Deleting the Pod removes valuable evidence and may delay Root Cause Analysis.

---

# 20. Marathi Quick Revision

- Alert आला.
- Pod describe करा.
- Previous logs घ्या.
- Events तपासा.
- Secret verify करा.
- Database verify करा.
- Root Cause शोधा.
- मगच restart करा.
- Business validation करा.
- RCA तयार करा.

---

# 21. Marathi Summary (5+ Experience Revision)

## Interview Summary

Production मध्ये CrashLoopBackOff आल्यास प्रथम business impact समजून घ्यावा. त्यानंतर `kubectl describe pod`, `kubectl logs --previous`, Events, Deployment, ConfigMap, Secret आणि external dependencies तपासाव्यात. Root Cause निश्चित झाल्यानंतरच fix करावा. शेवटी business validation, monitoring validation आणि RCA पूर्ण करावी.

### Production Investigation Flow

```
Alert

↓

Business Impact

↓

Pod Status

↓

Describe Pod

↓

Previous Logs

↓

Events

↓

Deployment

↓

Secrets

↓

Database

↓

Root Cause

↓

Fix

↓

Validation

↓

RCA
```

### Production Story

एका production fintech application मध्ये Secret rotation नंतर Auth Service सतत CrashLoopBackOff मध्ये जात होती. सुरुवातीला Pod delete करण्याचा विचार झाला, पण टीमने आधी `kubectl logs --previous` वापरून logs गोळा केले. त्यातून database authentication failure दिसली. Secret मधील चुकीचा password दुरुस्त करून Deployment restart करण्यात आला आणि 30 मिनिटांच्या आत production पूर्णपणे recover झाली. Incident नंतर automated authentication smoke test CI/CD मध्ये जोडण्यात आला.

### 5+ Years Memory Trick

Interview मध्ये जर विचारले,

**"How would you handle a CrashLoopBackOff production incident?"**

उत्तर:

"I first determine the business impact, collect evidence using `kubectl describe pod` and `kubectl logs --previous`, review events, deployments, ConfigMaps, Secrets and dependencies, identify the root cause before making changes, implement the safest recovery or rollback, validate business functionality, monitor stability, and complete a detailed RCA."

