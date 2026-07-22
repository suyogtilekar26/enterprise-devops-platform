# Helm Incident 16 - Helm Release Stuck Due to Failed Post-Upgrade Hook

# Enterprise DevOps Platform

---

# Purpose

This incident simulates a production deployment where the application is successfully upgraded, but a post-upgrade Helm hook fails, causing the Helm release to be marked as failed.

The objective is to investigate the failed hook, determine whether the application is healthy, restore the Helm release state and implement preventive controls.

---

# Incident Summary

| Field | Value |
|-------|-------|
| Incident ID | INC-HLM-016 |
| Severity | SEV-2 |
| Environment | Production |
| Application | API Gateway |
| Cluster | production-cluster |
| Namespace | api-prod |
| Reported By | GitHub Actions Deployment Pipeline |
| Status | Resolved |

---

# Business Impact

A scheduled production deployment completed.

The application Pods were upgraded successfully.

However, a post-upgrade validation Job failed, causing Helm to mark the release as failed.

Business impact included

- Deployment pipeline reported failure
- Release status marked failed
- Operations team initiated rollback investigation
- Change approval delayed
- False production incident triggered

---

# Enterprise Architecture

```
GitHub Actions

        │

        ▼

Helm Upgrade

        │

        ▼

Application Deployment

        │

        ▼

Post-Upgrade Hook

        │

        ▼

Validation Job

        │

        ▼

Helm Release Status
```

Deployment Flow

```
GitHub Actions

        │

        ▼

helm upgrade

        │

        ▼

Application Updated

        │

        ▼

Post-Upgrade Hook Failed

        │

        ▼

Release Marked Failed
```

---

# Symptoms

Deployment pipeline reported

```
UPGRADE FAILED

post-upgrade hooks failed
```

Application remained available.

Pods continued serving production traffic.

---

# Initial Investigation

Verify release.

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

Verify Pods.

```bash
kubectl get pods \
-n api-prod
```

Observed

```
Running
```

---

Verify rollout.

```bash
kubectl rollout status deployment/api-gateway-api-gateway \
-n api-prod
```

Observed

```
successfully rolled out
```

---

Review Helm hooks.

```bash
helm get hooks api-gateway \
-n api-prod
```

Observed

```
post-upgrade hook

health-check-job
```

---

Review Jobs.

```bash
kubectl get jobs \
-n api-prod
```

Observed

```
health-check-job

Failed
```

---

Review Job logs.

```bash
kubectl logs job/health-check-job \
-n api-prod
```

Observed

```
curl: (6)

Could not resolve host
```

---

Describe Job.

```bash
kubectl describe job health-check-job \
-n api-prod
```

Observed

```
BackoffLimitExceeded
```

---

Review hook manifest.

```bash
helm get manifest api-gateway \
-n api-prod
```

Validation Job referenced an incorrect Service name.

---

# Root Cause

The application deployment completed successfully.

The post-upgrade validation Job attempted to access

```
api-service
```

instead of

```
api-gateway
```

The validation Job failed.

Helm therefore marked the release as failed.

---

# Resolution

Update the hook configuration.

Correct the Service name.

```yaml
command:
- curl
- http://api-gateway:5000/health
```

Deploy the corrected chart.

```bash
helm upgrade api-gateway \
helm/charts/api-gateway \
-f values-prod.yaml \
-n api-prod
```

---

# Validation

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

Verify Job.

```bash
kubectl get jobs \
-n api-prod
```

Expected

```
Completed
```

---

Verify application.

```bash
curl http://api.company.com/health
```

Expected

```
HTTP/1.1 200 OK
```

---

Business Validation

- Deployment completed
- Validation Job successful
- APIs operational
- Dashboard accessible
- Monitoring healthy

---

# Incident Timeline

| Time | Activity |
|------|----------|
| 18:00 | Deployment started |
| 18:03 | Application upgraded |
| 18:05 | Post-upgrade hook executed |
| 18:06 | Hook failed |
| 18:08 | Release marked failed |
| 18:15 | Incident declared |
| 18:25 | Job logs reviewed |
| 18:35 | Hook configuration corrected |
| 18:42 | Deployment retried |
| 18:50 | Incident resolved |

---

# Root Cause Analysis (5 Whys)

### Why was the release marked failed?

The post-upgrade hook failed.

---

### Why?

The validation Job could not reach the application.

---

### Why?

It referenced an incorrect Kubernetes Service.

---

### Why?

The hook configuration contained outdated values.

---

### Why?

Hook templates were not validated during testing.

---

# Corrective Actions

- Correct hook configuration.
- Redeploy application.
- Verify hook completion.
- Update deployment checklist.
- Review hook templates.

---

# Preventive Actions

- Test all Helm hooks in staging.
- Automate post-deployment validation.
- Validate Service names in templates.
- Review hook configuration during pull requests.
- Include hook testing in CI/CD.
- Monitor Job failures.

---

# Lessons Learned

- A failed Helm release does not always mean application failure.
- Hook failures require separate investigation.
- Post-upgrade validation should use stable Service names.
- Job logs provide the fastest root cause.
- Release status should always be correlated with application health.

---

# Production Best Practices

- Keep validation hooks simple.
- Use Kubernetes DNS names consistently.
- Monitor hook execution separately.
- Automate hook validation.
- Archive Job logs.
- Test hook retries.
- Document hook dependencies.

---

# Interview Questions

## Q1. Can a Helm release be marked as failed even when the application is running?

### Answer

Yes.

If a lifecycle hook fails, Helm marks the release as failed even if the Deployment itself completed successfully.

---

## Q2. Which command displays Helm hooks?

### Answer

```bash
helm get hooks api-gateway -n api-prod
```

---

## Q3. What should engineers verify before rolling back a failed release?

### Answer

They should confirm whether the application is actually unhealthy or whether only a Helm lifecycle hook failed.

---

# Commands Reference

Release Status

```bash
helm status api-gateway -n api-prod
```

Hooks

```bash
helm get hooks api-gateway -n api-prod
```

Jobs

```bash
kubectl get jobs -n api-prod
```

Describe Job

```bash
kubectl describe job health-check-job -n api-prod
```

Logs

```bash
kubectl logs job/health-check-job -n api-prod
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

- Helm release failed दिसत आहे.
- Pods Running आहेत.
- Hook तपासा.
- Job logs पहा.
- Wrong Service शोधा.
- Hook fix करा.
- Helm upgrade करा.
- Validation करा.

---

# Marathi Summary (5+ Experience Revision)

या Incident मध्ये Helm upgrade यशस्वी झाला आणि application व्यवस्थित चालू होती, परंतु post-upgrade validation hook चुकीच्या Kubernetes Service नावामुळे अयशस्वी झाला. त्यामुळे Helm ने release ला `failed` म्हणून चिन्हांकित केले, जरी application production traffic serve करत होती. Investigation मध्ये `helm get hooks`, `kubectl get jobs`, `kubectl logs` आणि rendered manifests तपासून चुकीचा Service reference हा root cause असल्याचे आढळले. Hook दुरुस्त करून Helm upgrade पुन्हा execute करण्यात आला आणि release `deployed` स्थितीत आली. या Incident मधून Helm lifecycle hooks, validation Jobs आणि release status व application health यातील फरक समजणे Enterprise Production Support साठी अत्यंत महत्त्वाचे आहे.

