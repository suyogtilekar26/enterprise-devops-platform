# Helm Incident 19 - Helm Release Failed Due to Resource Quota Exceeded

# Enterprise DevOps Platform

---

# Purpose

This incident simulates a production deployment where a Helm upgrade fails because the Kubernetes namespace has reached its configured ResourceQuota limits.

The objective is to investigate the deployment failure, identify the quota constraint, restore production deployment capability and implement preventive controls.

---

# Incident Summary

| Field | Value |
|-------|-------|
| Incident ID | INC-HLM-019 |
| Severity | SEV-2 |
| Environment | Production |
| Application | API Gateway |
| Cluster | production-cluster |
| Namespace | api-prod |
| Reported By | GitHub Actions Deployment Pipeline |
| Status | Resolved |

---

# Business Impact

A scheduled production release failed during deployment.

The new Pods could not be created because the namespace had exhausted its CPU quota.

Business impact included

- Production deployment blocked
- Release delayed
- Emergency fixes postponed
- CI/CD pipeline failure
- Extended maintenance window

---

# Enterprise Architecture

```
GitHub Actions

        │

        ▼

Helm Upgrade

        │

        ▼

Deployment

        │

        ▼

ResourceQuota

        │

        ▼

Pod Scheduling Failed
```

Deployment Flow

```
GitHub Actions

        │

        ▼

helm upgrade

        │

        ▼

Deployment Created

        │

        ▼

New Pods

        │

        ▼

Quota Exceeded

        │

        ▼

Upgrade Failed
```

---

# Symptoms

Deployment pipeline failed.

Observed

```
UPGRADE FAILED
```

Pods were not created.

---

# Initial Investigation

Verify Helm release.

```bash
helm status api-gateway \
-n api-prod
```

Observed

```
STATUS

failed
```

---

Review Deployment.

```bash
kubectl describe deployment api-gateway-api-gateway \
-n api-prod
```

Observed

```
FailedCreate
```

---

Review Events.

```bash
kubectl get events \
-n api-prod \
--sort-by=.lastTimestamp
```

Observed

```
Error creating Pod

exceeded quota
```

---

Review ResourceQuota.

```bash
kubectl get resourcequota \
-n api-prod
```

---

Describe ResourceQuota.

```bash
kubectl describe resourcequota \
-n api-prod
```

Observed

```
requests.cpu

Used

20

Hard

20
```

---

Review namespace resources.

```bash
kubectl top pods \
-n api-prod
```

CPU utilization confirmed.

---

Review Deployment requests.

```bash
kubectl describe deployment api-gateway-api-gateway \
-n api-prod
```

New deployment requested additional CPU resources.

---

# Root Cause

The namespace CPU ResourceQuota had already reached its maximum limit.

During the Helm upgrade Kubernetes attempted to create additional Pods for the rolling update.

The quota prevented Pod creation, causing the deployment to fail.

---

# Resolution

Option 1

Increase ResourceQuota.

```yaml
requests.cpu: "30"
```

Option 2

Reduce application resource requests.

```yaml
resources:
  requests:
    cpu: 250m
```

Apply the updated configuration.

```bash
helm upgrade api-gateway \
helm/charts/api-gateway \
-f values-prod.yaml \
-n api-prod
```

---

# Validation

Verify ResourceQuota.

```bash
kubectl describe resourcequota \
-n api-prod
```

Ensure available CPU capacity exists.

---

Verify rollout.

```bash
kubectl rollout status deployment/api-gateway-api-gateway \
-n api-prod
```

Expected

```
successfully rolled out
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
- APIs operational
- Dashboard available
- Monitoring healthy

---

# Incident Timeline

| Time | Activity |
|------|----------|
| 13:00 | Deployment started |
| 13:02 | Pod creation failed |
| 13:04 | Pipeline failed |
| 13:08 | Incident declared |
| 13:15 | ResourceQuota investigated |
| 13:25 | CPU quota exhaustion confirmed |
| 13:35 | Quota increased |
| 13:42 | Deployment retried |
| 13:48 | Deployment successful |
| 13:55 | Incident closed |

---

# Root Cause Analysis (5 Whys)

### Why did the deployment fail?

New Pods could not be created.

---

### Why?

Namespace ResourceQuota was exceeded.

---

### Why?

CPU requests reached the configured limit.

---

### Why?

Rolling update required additional Pods.

---

### Why?

Capacity planning did not account for temporary rollout resource requirements.

---

# Corrective Actions

- Increase namespace quota.
- Optimize resource requests.
- Retry deployment.
- Review namespace capacity.
- Update deployment documentation.

---

# Preventive Actions

- Monitor ResourceQuota utilization.
- Alert before quota exhaustion.
- Perform capacity planning.
- Review resource requests regularly.
- Validate quota before deployments.
- Implement automated quota checks in CI/CD.

---

# Lessons Learned

- Successful scheduling depends on available namespace quota.
- Rolling updates require temporary additional resources.
- Capacity planning is essential.
- ResourceQuota monitoring should be proactive.
- CI/CD should validate cluster capacity before deployment.

---

# Production Best Practices

- Monitor quota utilization continuously.
- Reserve rollout capacity.
- Define realistic resource requests.
- Review namespace quotas periodically.
- Automate quota validation.
- Avoid resource overcommitment.
- Include quota verification in deployment checklists.

---

# Interview Questions

## Q1. Why can a Helm deployment fail even though the cluster has available nodes?

### Answer

Because Kubernetes enforces namespace ResourceQuota independently of cluster capacity. Even if nodes have resources available, Pods cannot be created when namespace quotas are exhausted.

---

## Q2. Which command identifies ResourceQuota usage?

### Answer

```bash
kubectl describe resourcequota -n api-prod
```

---

## Q3. How can enterprises prevent quota-related deployment failures?

### Answer

By monitoring quota utilization, planning rollout capacity, validating quotas before deployments and optimizing application resource requests.

---

# Commands Reference

Status

```bash
helm status api-gateway -n api-prod
```

Deployment

```bash
kubectl describe deployment api-gateway-api-gateway -n api-prod
```

Events

```bash
kubectl get events -n api-prod --sort-by=.lastTimestamp
```

Quota

```bash
kubectl describe resourcequota -n api-prod
```

Resource Usage

```bash
kubectl top pods -n api-prod
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

- Deployment fail झाला.
- Pods create झाले नाहीत.
- Events तपासा.
- ResourceQuota verify करा.
- CPU requests तपासा.
- Quota वाढवा किंवा requests कमी करा.
- Helm upgrade पुन्हा करा.
- Validation करा.

---

# Marathi Summary (5+ Experience Revision)

या Incident मध्ये Helm upgrade दरम्यान namespace मधील ResourceQuota पूर्ण भरल्यामुळे नवीन Pods तयार होऊ शकले नाहीत. Investigation मध्ये `kubectl describe deployment`, `kubectl get events`, `kubectl describe resourcequota` आणि resource usage तपासून CPU quota exhaustion हा root cause असल्याचे आढळले. ResourceQuota वाढवून किंवा application resource requests कमी करून Helm upgrade पुन्हा execute करण्यात आला आणि deployment यशस्वी झाला. या Incident मधून namespace quotas, capacity planning, rollout resource requirements आणि proactive monitoring यांचे Enterprise Kubernetes Production वातावरणातील महत्त्व स्पष्ट होते.

