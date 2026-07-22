# Kubernetes Runbook 13 - Secret Rotation

# 1. Purpose

This runbook explains how to safely rotate Kubernetes Secrets in production environments without causing application outages.

Secret rotation is a critical security practice used for passwords, API keys, database credentials, TLS certificates, cloud access keys, and service account credentials. Incorrect rotation can immediately break production applications.

The objective is to rotate credentials securely, minimize downtime, validate application functionality, and document the Root Cause Analysis (RCA) if issues occur.

---

# 2. Scope

Applicable to

- Kubernetes Secrets
- Database Password Rotation
- API Key Rotation
- TLS Secret Rotation
- Docker Registry Secrets
- Cloud Credentials
- Service Account Credentials

Supported Platforms

- Kind
- EKS
- AKS
- GKE
- OpenShift
- On-Prem Kubernetes

---

# 3. Symptoms

Users may report

- Login failures
- Database connection failures
- API authentication failures
- TLS certificate errors
- ImagePullBackOff
- Internal authentication failures

Monitoring may report

- HTTP 401
- HTTP 403
- Database connection errors
- Certificate expiration alerts
- Authentication failures

Example

```
Secret Updated

↓

Application Restart

↓

Credential Mismatch

↓

Production Outage
```

---

# 4. Business Impact

Critical

- Customer login unavailable
- Database inaccessible
- Production outage

Medium

- One microservice unavailable
- API authentication failures

Low

- Internal applications affected

---

# 5. Possible Root Causes

- Wrong Secret value
- Incorrect base64 encoding
- Wrong Secret name
- Deployment using old Secret
- Application restart missing
- Database password mismatch
- Expired certificate
- Registry Secret failure
- Secret updated in wrong namespace
- Human error

---

# 6. Prerequisites

Required

- kubectl
- Namespace access
- Secret update permissions
- Approved production change
- Credential owner approval

Verify

```bash
kubectl auth can-i get secret

kubectl auth can-i update secret

kubectl auth can-i rollout deployment
```

---

# 7. Initial Investigation

## Step 1

List Secrets

```bash
kubectl get secrets -A
```

---

## Step 2

Describe Secret

```bash
kubectl describe secret app-secret \
-n enterprise-devops
```

Review

- Type
- Keys
- Namespace

---

## Step 3

Review Deployment

```bash
kubectl describe deployment api-gateway \
-n enterprise-devops
```

Verify Secret references.

---

## Step 4

Review Application Logs

```bash
kubectl logs <pod-name> \
-n enterprise-devops
```

Look for

- Authentication failed
- Access denied
- Invalid credentials
- Certificate expired

---

# 8. Detailed Investigation

## Step 1

Export Existing Secret

```bash
kubectl get secret app-secret \
-o yaml \
-n enterprise-devops
```

Store a secure backup before any modification.

---

## Step 2

Verify Secret Consumption

Secrets may be consumed through

- Environment Variables
- Mounted Files
- TLS Volumes
- ImagePullSecrets

---

## Step 3

Verify Deployment

```bash
kubectl describe deployment api-gateway
```

Confirm

- Secret name
- Environment variables
- Volume mounts

---

## Step 4

Verify Environment Variables

```bash
kubectl exec -it <pod> -- env
```

---

## Step 5

Verify Mounted Secret

```bash
kubectl exec -it <pod> -- ls /etc/secrets
```

Example

```bash
kubectl exec -it <pod> \
-- cat /etc/secrets/database-password
```

---

## Step 6

Validate External System

Examples

- Database password
- Redis password
- Vault secret
- API key
- Cloud credentials

Ensure the external system and Kubernetes Secret contain identical credentials.

---

## Step 7

Review Recent Changes

Verify

- Git history
- Helm release
- Argo CD sync
- CI/CD pipeline
- Change Request

---

# 9. Resolution Steps

Update Secret

```bash
kubectl apply -f secret.yaml
```

Restart Deployment

```bash
kubectl rollout restart deployment/api-gateway \
-n enterprise-devops
```

Wait

```bash
kubectl rollout status deployment/api-gateway
```

---

# 10. Validation Steps

Verify

```bash
kubectl get secrets

kubectl get pods
```

Validate

- Login
- Database connectivity
- APIs
- Dashboard
- TLS
- Monitoring

---

# 11. Rollback Procedure

Restore previous Secret

```bash
kubectl apply -f previous-secret.yaml
```

Restart workload

```bash
kubectl rollout restart deployment/api-gateway
```

Validate

- Authentication
- Database access
- Business functionality

---

# 12. Escalation Matrix

L1

- Verify Secret
- Collect logs

↓

L2

- Verify Deployment
- Verify external credentials

↓

Development Team

- Application authentication

↓

Security Team

- Credential rotation

↓

Platform Team

- Kubernetes issue

---

# 13. Production Best Practices

- Rotate secrets regularly.
- Never edit production Secrets manually without approval.
- Store encrypted Secret manifests in Git.
- Use external secret management where possible.
- Backup Secrets before rotation.
- Rotate credentials during maintenance windows.
- Validate applications immediately after rotation.
- Monitor authentication failures after deployment.

---

# 14. Real Production Scenario

A production payment service lost database connectivity immediately after scheduled credential rotation.

Investigation

```bash
kubectl logs payment-api
```

showed

```
Access denied for user
```

The database password had been changed, but the Kubernetes Secret still contained the previous password.

After updating the Secret and restarting the Deployment, connectivity was restored.

Root Cause

Credential mismatch between Kubernetes Secret and database.

---

# 15. Scenario Interview Questions

## Q1. Secret rotation caused authentication failures. What is your first action?

### Answer

Verify

- Secret contents
- Deployment reference
- External credential

Collect evidence before changing anything.

---

## Q2. Why do applications sometimes continue using old Secret values?

### Answer

Secrets injected as environment variables require Pod restart.

Without restarting the workload, applications continue using the previous values.

---

## Q3. What should always be backed up before rotating Secrets?

### Answer

Existing Secret manifest and recovery procedure.

---

# 16. Architecture Interview Questions

## Q1. Explain Secret architecture.

### Answer

```
Secret

↓

Deployment

↓

Pod

↓

Container

↓

Application

↓

Database/API/TLS
```

---

## Q2. How can applications consume Kubernetes Secrets?

### Answer

- Environment Variables
- Mounted Volumes
- TLS Secrets
- ImagePullSecrets

---

# 17. Production Support Interview Questions

## Q1. Secret rotation broke production. How do you investigate?

### Answer

Commands

```bash
kubectl describe secret

kubectl describe deployment

kubectl logs <pod>

kubectl exec -it <pod> -- env

kubectl rollout history deployment
```

Verify

- Secret
- Deployment
- External credential
- Restart status
- Authentication

---

## Q2. What production mistakes commonly occur during Secret rotation?

### Answer

- Wrong namespace
- Wrong Secret name
- Incorrect base64 encoding
- External password not synchronized
- Missing Deployment restart
- Manual production edits
- No rollback plan

---

# 18. Commands Reference

```bash
kubectl get secrets

kubectl describe secret

kubectl apply -f secret.yaml

kubectl rollout restart deployment/<deployment>

kubectl rollout status deployment/<deployment>

kubectl exec -it <pod> -- env

kubectl logs <pod>

kubectl describe deployment
```

---

# 19. Marathi Quick Revision

- Secret verify करा.
- Backup घ्या.
- Deployment reference तपासा.
- External credential verify करा.
- Secret update करा.
- Deployment restart करा.
- Authentication validate करा.
- Business validation करा.

---

# 20. Related Runbooks

- 06-deployment-rollback.md
- 12-configmap-update.md
- 15-oomkilled.md
- 16-health-probe-failures.md

---

# 21. Marathi Summary (5+ Experience Revision)

## Interview Summary

Production मध्ये Secret rotation ही security-critical activity आहे. प्रथम Secret backup घ्यावा, Deployment reference verify करावी आणि external system मधील credentials जुळत आहेत का ते तपासावे. Secret update केल्यानंतर आवश्यक असल्यास Deployment restart करून authentication, database connectivity आणि business transactions validate कराव्यात. Failure झाल्यास previous Secret restore करून RCA तयार करावी.

### Production Investigation Flow

```
Alert

↓

Secret

↓

Deployment

↓

Logs

↓

External Credential

↓

Secret Update

↓

Deployment Restart

↓

Authentication Validation

↓

Business Validation

↓

RCA
```

### Production Story

एका production banking application मध्ये quarterly password rotation दरम्यान database password बदलण्यात आला, परंतु Kubernetes Secret update करण्यास विसर पडला. नवीन Pods सतत `Access denied` errors देत होते. DevOps team ने Secret update करून Deployment restart केला आणि काही मिनिटांत सर्व services recover झाल्या. Incident नंतर automated Secret rotation pipeline आणि post-rotation validation checklist लागू करण्यात आली.

### 5+ Years Memory Trick

Interview मध्ये जर विचारले,

**"How do you safely rotate Kubernetes Secrets in production?"**

उत्तर:

"I back up the existing Secret, verify the Deployment reference and external credentials, update the Secret, restart the affected workloads if required, validate authentication and business functionality, monitor the rollout, and document the RCA with a tested rollback plan."

