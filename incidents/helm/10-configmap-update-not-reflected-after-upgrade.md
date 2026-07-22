# Helm Incident 10 - ConfigMap Update Not Reflected After Upgrade

# Enterprise DevOps Platform

---

# Purpose

This incident simulates a production scenario where a Helm upgrade completes successfully, the ConfigMap is updated, but the running application continues using the old configuration.

The objective is to investigate why the updated configuration was not applied, restore production services and implement preventive controls.

---

# Incident Summary

| Field | Value |
|-------|-------|
| Incident ID | INC-HLM-010 |
| Severity | SEV-2 |
| Environment | Production |
| Application | API Gateway |
| Cluster | production-cluster |
| Namespace | api-prod |
| Reported By | Platform Monitoring |
| Status | Resolved |

---

# Business Impact

A production deployment introduced new API rate limiting rules.

Although the Helm upgrade completed successfully, the application continued enforcing the old limits.

Business impact included

- Incorrect rate limiting
- Customer complaints
- Security policy not enforced
- Production configuration drift
- Emergency investigation initiated

---

# Enterprise Architecture

```
React Frontend

        │

        ▼

API Gateway

        │

ConfigMap

        │

        ▼

Deployment

        │

        ▼

Running Pods
```

Deployment Flow

```
GitHub Actions

        │

        ▼

Helm Upgrade

        │

        ▼

ConfigMap Updated

        │

        ▼

Pods NOT Restarted

        │

        ▼

Old Configuration Active

        │

        ▼

Production Incident
```

---

# Symptoms

Deployment pipeline completed successfully.

Monitoring indicated

- Old configuration still active
- Application behavior unchanged
- ConfigMap updated
- Pods not restarted

---

# Initial Investigation

Verify Helm release.

```bash
helm status api-gateway \
-n api-prod
```

Output

```
STATUS

deployed
```

---

Verify ConfigMap.

```bash
kubectl get configmap \
-n api-prod
```

ConfigMap showed the latest data.

---

Describe ConfigMap.

```bash
kubectl describe configmap api-gateway-config \
-n api-prod
```

Updated configuration was present.

---

Verify Deployment rollout.

```bash
kubectl rollout status deployment/api-gateway-api-gateway \
-n api-prod
```

Output

```
successfully rolled out
```

---

Verify Pod age.

```bash
kubectl get pods \
-n api-prod
```

Observed

```
Pods created 6 days ago
```

No new Pods had been created.

---

Review Deployment annotations.

```bash
kubectl describe deployment api-gateway-api-gateway \
-n api-prod
```

No checksum annotation found.

---

Review Helm template.

```bash
helm get manifest api-gateway \
-n api-prod
```

Deployment template mounted the ConfigMap but lacked a checksum annotation.

---

# Root Cause

The ConfigMap was updated successfully.

However,

the Deployment template did not contain a checksum annotation referencing the ConfigMap.

Because Kubernetes detected no change in the Pod template, it did not create new Pods.

Existing Pods continued using the old configuration.

---

# Resolution

Modify the Deployment template.

Add ConfigMap checksum annotation.

Example

```yaml
metadata:
  annotations:
    checksum/config: {{ include (print $.Template.BasePath "/configmap.yaml") . | sha256sum }}
```

Upgrade the release.

```bash
helm upgrade api-gateway \
helm/charts/api-gateway \
-f values-prod.yaml \
-n api-prod
```

---

# Validation

Verify rollout.

```bash
kubectl rollout status deployment/api-gateway-api-gateway \
-n api-prod
```

---

Verify Pods.

```bash
kubectl get pods \
-n api-prod
```

Expected

```
New Pods Running
```

---

Verify ConfigMap.

```bash
kubectl describe configmap api-gateway-config \
-n api-prod
```

---

Verify application configuration.

Confirm

- New rate limits active
- Updated environment loaded
- Monitoring healthy

---

Business Validation

- API Gateway enforcing new policy
- Customer requests processed correctly
- Dashboard operational
- No configuration drift

---

# Incident Timeline

| Time | Activity |
|------|----------|
| 10:00 | Helm upgrade completed |
| 10:05 | Incorrect behavior observed |
| 10:10 | Incident declared |
| 10:18 | ConfigMap verified |
| 10:25 | Old Pods identified |
| 10:32 | Missing checksum annotation discovered |
| 10:42 | Chart updated |
| 10:48 | Helm upgrade executed |
| 10:55 | New Pods running |
| 11:00 | Incident resolved |

---

# Root Cause Analysis (5 Whys)

### Why was the old configuration still active?

Pods were never restarted.

---

### Why?

Deployment template never changed.

---

### Why?

ConfigMap updates alone do not trigger Pod recreation.

---

### Why?

Checksum annotation was missing.

---

### Why?

Deployment template did not implement automatic ConfigMap rollout.

---

# Corrective Actions

- Add checksum annotation.
- Redeploy application.
- Verify rollout.
- Update Helm templates.
- Review deployment standards.

---

# Preventive Actions

- Always use checksum annotations for ConfigMaps.
- Validate Pod recreation after configuration changes.
- Automate Helm template reviews.
- Test configuration updates before production.
- Add deployment validation to CI/CD.

---

# Lessons Learned

- ConfigMap updates do not automatically restart Pods.
- Deployment templates should trigger rollouts for configuration changes.
- Helm best practices include checksum annotations.
- Configuration drift can occur even after successful deployments.
- Rollout verification is mandatory.

---

# Production Best Practices

- Use checksum annotations for ConfigMaps and Secrets.
- Monitor Pod recreation after upgrades.
- Validate configuration after every deployment.
- Perform rollout verification.
- Automate deployment testing.
- Keep configuration immutable where possible.
- Review Helm templates regularly.

---

# Interview Questions

## Q1. Why doesn't updating a ConfigMap automatically restart Pods?

### Answer

Because Kubernetes only creates new Pods when the Pod template changes. Updating a mounted ConfigMap alone does not modify the Deployment specification.

---

## Q2. What is the recommended Helm solution?

### Answer

Use a checksum annotation derived from the ConfigMap template so that any ConfigMap change updates the Pod template and triggers a rollout.

---

## Q3. Which command confirms that a new rollout occurred?

### Answer

```bash
kubectl rollout status deployment/api-gateway-api-gateway -n api-prod
```

---

# Commands Reference

Status

```bash
helm status api-gateway -n api-prod
```

Manifest

```bash
helm get manifest api-gateway -n api-prod
```

ConfigMap

```bash
kubectl describe configmap api-gateway-config -n api-prod
```

Pods

```bash
kubectl get pods -n api-prod
```

Rollout

```bash
kubectl rollout status deployment/api-gateway-api-gateway -n api-prod
```

Upgrade

```bash
helm upgrade api-gateway \
helm/charts/api-gateway \
-f values-prod.yaml \
-n api-prod
```

---

# Marathi Quick Revision

- ConfigMap update झाला.
- Pods restart झाले नाहीत.
- ConfigMap verify करा.
- Pod age तपासा.
- Checksum annotation शोधा.
- Deployment template अपडेट करा.
- Helm upgrade करा.
- Validation करा.

---

# Marathi Summary (5+ Experience Revision)

या Incident मध्ये Helm upgrade यशस्वी झाला आणि ConfigMap अपडेट झाला, परंतु Deployment template मध्ये ConfigMap checksum annotation नसल्यामुळे Kubernetes ने नवीन Pods तयार केले नाहीत. त्यामुळे जुने Pods जुन्याच configuration सह चालू राहिले आणि Production मध्ये configuration drift निर्माण झाला. Investigation मध्ये ConfigMap, Pod age, Deployment आणि Helm manifest तपासून checksum annotation नसणे हा root cause असल्याचे आढळले. Deployment template मध्ये checksum annotation जोडून Helm upgrade पुन्हा execute करण्यात आला आणि नवीन Pods योग्य configuration सह सुरू झाले. या Incident मधून ConfigMap checksum annotations, rollout validation आणि configuration management या Helm Production best practices चे महत्त्व स्पष्ट होते.

