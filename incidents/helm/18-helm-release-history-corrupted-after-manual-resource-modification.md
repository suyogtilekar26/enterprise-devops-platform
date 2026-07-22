# Helm Incident 18 - Helm Release History Corrupted After Manual Resource Modification

# Enterprise DevOps Platform

---

# Purpose

This incident simulates a production outage where engineers manually modify Kubernetes resources using `kubectl edit`, causing Helm release state to drift from the actual cluster resources.

The objective is to investigate the configuration drift, restore Helm ownership and establish preventive controls.

---

# Incident Summary

| Field | Value |
|-------|-------|
| Incident ID | INC-HLM-018 |
| Severity | SEV-2 |
| Environment | Production |
| Application | API Gateway |
| Cluster | production-cluster |
| Namespace | api-prod |
| Reported By | GitHub Actions Deployment Pipeline |
| Status | Resolved |

---

# Business Impact

An engineer manually modified the production Deployment to quickly increase CPU limits.

Several days later, a Helm upgrade behaved unexpectedly because the live Kubernetes resources no longer matched the Helm release state.

Business impact included

- Production deployment failed
- Configuration drift
- Release history inconsistent
- Rollback uncertainty
- Emergency investigation

---

# Enterprise Architecture

```
Git Repository

      │

      ▼

GitHub Actions

      │

      ▼

Helm Release

      │

      ▼

Deployment

      │

      ▼

Pods
```

Incident Flow

```
Helm Deploy

      │

      ▼

kubectl edit

      │

      ▼

Configuration Drift

      │

      ▼

Next Helm Upgrade

      │

      ▼

Unexpected Behavior
```

---

# Symptoms

Pipeline executed

```bash
helm upgrade api-gateway \
helm/charts/api-gateway \
-f values-prod.yaml \
-n api-prod
```

Observed

```
Upgrade completed

Unexpected Deployment changes detected
```

Application restarted unexpectedly.

---

# Initial Investigation

Verify release.

```bash
helm status api-gateway \
-n api-prod
```

Release

```
deployed
```

---

Review Deployment.

```bash
kubectl get deployment api-gateway-api-gateway \
-o yaml \
-n api-prod
```

Observed

```
CPU limits manually modified
```

---

Compare Helm manifest.

```bash
helm get manifest api-gateway \
-n api-prod
```

Deployment differed from live cluster.

---

Review managed fields.

```bash
kubectl get deployment api-gateway-api-gateway \
-o yaml
```

Observed

```
manager:

kubectl-edit
```

---

Review annotations.

```bash
kubectl describe deployment api-gateway-api-gateway \
-n api-prod
```

Manual edits found after previous release.

---

Review release history.

```bash
helm history api-gateway \
-n api-prod
```

History contained no record of manual modifications.

---

# Root Cause

Production resources were modified directly using

```bash
kubectl edit
```

Helm release metadata was not updated.

During the next deployment Helm attempted to reconcile the resources, producing unexpected changes and configuration drift.

---

# Resolution

Restore desired state from Helm.

```bash
helm upgrade api-gateway \
helm/charts/api-gateway \
-f values-prod.yaml \
--force \
-n api-prod
```

Remove manual configuration.

Verify Deployment matches Helm templates.

---

# Validation

Verify Deployment.

```bash
kubectl get deployment \
api-gateway-api-gateway \
-o yaml \
-n api-prod
```

Matches rendered manifest.

---

Verify release.

```bash
helm status api-gateway \
-n api-prod
```

Expected

```
STATUS

deployed
```

---

Verify Pods.

```bash
kubectl get pods \
-n api-prod
```

Expected

```
Running
```

---

Business Validation

- Deployment successful
- Configuration synchronized
- Monitoring healthy
- No unexpected restarts

---

# Incident Timeline

| Time | Activity |
|------|----------|
| Day 1 | Manual kubectl edit performed |
| Day 4 | Helm deployment executed |
| Day 4 | Unexpected resource reconciliation |
| Day 4 | Incident declared |
| Day 4 | Drift investigation |
| Day 4 | Manual edits identified |
| Day 4 | Helm redeployment |
| Day 4 | Validation completed |
| Day 4 | Incident closed |

---

# Root Cause Analysis (5 Whys)

### Why did Helm behave unexpectedly?

Live resources differed from Helm state.

---

### Why?

Resources were manually modified.

---

### Why?

Changes bypassed Helm.

---

### Why?

Emergency production fix was performed.

---

### Why?

Operational process allowed direct production modifications.

---

# Corrective Actions

- Restore Helm-managed configuration.
- Remove manual edits.
- Document production change.
- Review deployment process.
- Audit cluster resources.

---

# Preventive Actions

- Never modify Helm-managed resources manually.
- Use GitOps for production changes.
- Restrict `kubectl edit` permissions.
- Audit Kubernetes API activity.
- Enable policy enforcement.
- Require pull request approvals.

---

# Lessons Learned

- Helm should remain the single source of truth.
- Manual production edits create drift.
- Drift complicates upgrades and rollbacks.
- GitOps minimizes configuration inconsistencies.
- Cluster auditing is essential.

---

# Production Best Practices

- Manage all changes through Helm.
- Adopt GitOps workflows.
- Disable manual production editing where possible.
- Audit managedFields regularly.
- Compare live resources with Helm manifests.
- Monitor configuration drift.
- Document emergency changes immediately.

---

# Interview Questions

## Q1. What is configuration drift?

### Answer

Configuration drift occurs when live Kubernetes resources differ from the desired state stored in Helm charts or version control.

---

## Q2. Why is `kubectl edit` dangerous for Helm-managed resources?

### Answer

Because Helm is unaware of manual changes. Future upgrades or rollbacks may overwrite them or behave unexpectedly.

---

## Q3. How can enterprises prevent configuration drift?

### Answer

By adopting GitOps, restricting manual production access, enforcing infrastructure as code and continuously auditing Kubernetes resources.

---

# Commands Reference

Status

```bash
helm status api-gateway -n api-prod
```

History

```bash
helm history api-gateway -n api-prod
```

Manifest

```bash
helm get manifest api-gateway -n api-prod
```

Deployment

```bash
kubectl get deployment api-gateway-api-gateway -o yaml -n api-prod
```

Upgrade

```bash
helm upgrade api-gateway \
helm/charts/api-gateway \
-f values-prod.yaml \
--force \
-n api-prod
```

---

# Marathi Quick Revision

- Manual kubectl edit झाला.
- Helm state वेगळा झाला.
- Drift तपासा.
- helm get manifest करा.
- Deployment compare करा.
- Helm upgrade --force करा.
- Validation करा.

---

# Marathi Summary (5+ Experience Revision)

या Incident मध्ये Production Deployment वर `kubectl edit` वापरून थेट बदल करण्यात आले. त्यामुळे Helm release metadata आणि live Kubernetes resources यांच्यात configuration drift निर्माण झाला. पुढील Helm upgrade दरम्यान Helm ने resources reconcile करण्याचा प्रयत्न केला आणि अनपेक्षित बदल झाले. Investigation मध्ये `helm get manifest`, `helm history`, Deployment YAML आणि managedFields तपासून manual modification हा root cause असल्याचे आढळले. `helm upgrade --force` वापरून Helm-managed state पुन्हा restore करण्यात आली. या Incident मधून GitOps, Helm as the single source of truth, configuration drift detection आणि production governance यांचे Enterprise Kubernetes वातावरणातील महत्त्व स्पष्ट होते.

