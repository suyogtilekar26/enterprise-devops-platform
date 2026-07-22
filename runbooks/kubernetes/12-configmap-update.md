# Kubernetes Runbook 12 - ConfigMap Update

# 1. Purpose

This runbook explains how to safely investigate, update, validate, and roll back Kubernetes ConfigMap changes in production environments.

ConfigMaps store application configuration outside container images. Incorrect ConfigMap updates are one of the most common causes of production outages because they can affect every Pod using that configuration.

The objective is to safely update configuration, minimize customer impact, and document the Root Cause Analysis (RCA).

---

# 2. Scope

Applicable to

- ConfigMaps
- Deployments
- StatefulSets
- DaemonSets
- Application Configuration
- Environment Variables
- Mounted Configuration Files

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

- Application unavailable
- Login failure
- Internal Server Error
- Configuration missing
- API failures
- Database connection failure

Monitoring may report

- Pod restarts
- Readiness failures
- Liveness failures
- CrashLoopBackOff
- Increased HTTP 5xx

Example

```
ConfigMap Updated

↓

Application Restart

↓

Invalid Configuration

↓

Production Outage
```

---

# 4. Business Impact

Critical

- Complete application outage
- Authentication unavailable
- Customer transactions fail

Medium

- One service unavailable
- Partial degradation

Low

- Internal application issue

---

# 5. Possible Root Causes

- Incorrect ConfigMap value
- Missing key
- Wrong environment variable
- YAML syntax error
- Invalid application configuration
- ConfigMap not mounted
- Deployment not restarted
- Incorrect namespace
- Human error during change

---

# 6. Prerequisites

Required

- kubectl
- Namespace access
- Deployment update permissions
- Change approval for Production

Verify

```bash
kubectl auth can-i get configmap

kubectl auth can-i update configmap

kubectl auth can-i rollout deployment
```

---

# 7. Initial Investigation

## Step 1

List ConfigMaps

```bash
kubectl get configmap -A
```

---

## Step 2

Describe ConfigMap

```bash
kubectl describe configmap app-config \
-n enterprise-devops
```

Review

- Keys
- Values
- Events

---

## Step 3

Verify Pod

```bash
kubectl get pods \
-n enterprise-devops
```

Look for

- CrashLoopBackOff
- Error
- Running but Not Ready

---

## Step 4

Review Logs

```bash
kubectl logs <pod-name> \
-n enterprise-devops
```

Look for

- Missing configuration
- Invalid value
- Parsing errors

---

# 8. Detailed Investigation

## Step 1

Export Current ConfigMap

```bash
kubectl get configmap app-config \
-o yaml \
-n enterprise-devops
```

Always save a backup before changes.

---

## Step 2

Verify Deployment

```bash
kubectl describe deployment api-gateway \
-n enterprise-devops
```

Confirm

- ConfigMap reference
- Environment variables
- Volume mounts

---

## Step 3

Verify Mounted Configuration

```bash
kubectl exec -it <pod> \
-- ls /config
```

or

```bash
kubectl exec -it <pod> \
-- cat /config/application.properties
```

---

## Step 4

Verify Environment Variables

```bash
kubectl exec -it <pod> \
-- env
```

Confirm required variables exist.

---

## Step 5

Determine Update Method

ConfigMap consumed as

- Environment Variables

Requires Pod restart.

ConfigMap mounted as Volume

May update automatically depending on application behavior.

---

## Step 6

Review Recent Changes

Check

- Git history
- Change Request
- CI/CD deployment
- Argo CD synchronization
- Helm release

---

# 9. Resolution Steps

Update ConfigMap

```bash
kubectl edit configmap app-config \
-n enterprise-devops
```

or

```bash
kubectl apply -f configmap.yaml
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
kubectl get configmap

kubectl get pods
```

Verify configuration

```bash
kubectl exec -it <pod> -- env
```

Business Validation

- Login works
- APIs healthy
- Dashboard available
- Monitoring green

---

# 11. Rollback Procedure

Restore previous ConfigMap

```bash
kubectl apply -f previous-configmap.yaml
```

Restart Deployment

```bash
kubectl rollout restart deployment/api-gateway
```

Validate

- Pods healthy
- Configuration restored
- Business functionality working

---

# 12. Escalation Matrix

L1

- Verify ConfigMap
- Collect logs

↓

L2

- Compare configuration
- Restart workloads

↓

Development Team

- Configuration validation

↓

Platform Team

- Kubernetes issues

---

# 13. Production Best Practices

- Keep ConfigMaps in Git.
- Never edit production ConfigMaps without approval.
- Validate configuration in staging first.
- Backup ConfigMaps before updates.
- Use immutable image tags with versioned ConfigMaps.
- Restart Deployments only after validation.
- Monitor rollout after every configuration change.

---

# 14. Real Production Scenario

A production payment application suddenly began returning HTTP 500 errors after a maintenance window.

Investigation

```bash
kubectl logs payment-api
```

showed

```
DATABASE_URL not found
```

A ConfigMap update accidentally removed the required key.

The previous ConfigMap was restored and the Deployment restarted.

Service recovered within minutes.

Root Cause

Human error during ConfigMap modification.

---

# 15. Scenario Interview Questions

## Q1. A ConfigMap was updated but the application still uses old values. Why?

### Answer

If ConfigMap values are injected as environment variables, Pods must be restarted to load the updated configuration.

---

## Q2. Which command restarts the Deployment?

### Answer

```bash
kubectl rollout restart deployment/<deployment>
```

---

## Q3. What should you do before modifying a production ConfigMap?

### Answer

- Export backup
- Review change request
- Validate configuration
- Notify stakeholders
- Prepare rollback

---

# 16. Architecture Interview Questions

## Q1. Explain ConfigMap architecture.

### Answer

```
ConfigMap

↓

Deployment

↓

Pod

↓

Container

↓

Application Configuration
```

ConfigMaps separate configuration from application code.

---

## Q2. How can a Pod consume a ConfigMap?

### Answer

- Environment Variables
- Mounted Volume
- Individual Configuration File

---

# 17. Production Support Interview Questions

## Q1. A ConfigMap change caused production outage. How do you investigate?

### Answer

Commands

```bash
kubectl describe configmap

kubectl describe deployment

kubectl logs <pod>

kubectl exec -it <pod> -- env

kubectl rollout history deployment
```

Verify

- ConfigMap
- Deployment reference
- Environment variables
- Mounted files
- Rollout

---

## Q2. Why should ConfigMaps be version controlled?

### Answer

Version control provides

- Audit trail
- Easy rollback
- Peer review
- Change history
- Compliance

---

# 18. Commands Reference

```bash
kubectl get configmap

kubectl describe configmap

kubectl edit configmap

kubectl apply -f configmap.yaml

kubectl rollout restart deployment/<deployment>

kubectl rollout status deployment/<deployment>

kubectl exec -it <pod> -- env

kubectl logs <pod>
```

---

# 19. Marathi Quick Revision

- ConfigMap verify करा.
- Logs तपासा.
- Deployment reference तपासा.
- Environment variables verify करा.
- Backup घ्या.
- ConfigMap update करा.
- Deployment restart करा.
- Business validation करा.

---

# 20. Related Runbooks

- 06-deployment-rollback.md
- 13-secret-rotation.md
- 16-health-probe-failures.md
- 21-runbook-summary.md

---

# 21. Marathi Summary (5+ Experience Revision)

## Interview Summary

Production मध्ये ConfigMap update ही high-risk activity आहे. प्रथम ConfigMap backup घ्यावा, Deployment reference verify करावी, logs तपासावेत आणि application configuration validate करावी. Environment variables वापरत असल्यास Deployment restart करणे आवश्यक असते. बदलानंतर business validation करून RCA document करावी.

### Production Investigation Flow

```
Alert

↓

ConfigMap

↓

Deployment

↓

Logs

↓

Environment Variables

↓

Mounted Files

↓

Root Cause

↓

Update

↓

Deployment Restart

↓

Validation

↓

RCA
```

### Production Story

एका production fintech application मध्ये maintenance दरम्यान नवीन API endpoint ConfigMap मध्ये update करण्यात आला. चुकीच्या edit मुळे `DATABASE_URL` key हटली. नवीन Pods सुरू झाले पण सर्व database connections fail झाल्या. Backup ConfigMap restore करून Deployment restart करण्यात आला आणि application पाच मिनिटांत recover झाली. Incident नंतर ConfigMap changes साठी mandatory peer review आणि GitOps approval लागू करण्यात आले.

### 5+ Years Memory Trick

Interview मध्ये जर विचारले,

**"How do you safely update a ConfigMap in production?"**

उत्तर:

"I first back up the existing ConfigMap, verify the Deployment reference, validate the new configuration, apply the ConfigMap update, restart the affected Deployment if required, validate business functionality, monitor the rollout, and document the RCA."

