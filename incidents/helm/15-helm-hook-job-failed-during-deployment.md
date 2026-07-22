# Helm Incident 15 - Helm Hook Job Failed During Deployment

# Enterprise DevOps Platform

---

# Purpose

This incident simulates a production deployment where a Helm pre-upgrade hook fails, preventing the application upgrade from completing.

The objective is to investigate the hook failure, identify the root cause, restore the deployment pipeline and implement preventive controls.

---

# Incident Summary

| Field | Value |
|-------|-------|
| Incident ID | INC-HLM-015 |
| Severity | SEV-2 |
| Environment | Production |
| Application | API Gateway |
| Cluster | production-cluster |
| Namespace | api-prod |
| Reported By | GitHub Actions Deployment Pipeline |
| Status | Resolved |

---

# Business Impact

A production deployment was initiated through GitHub Actions.

Before deploying the new application version, Helm executed a pre-upgrade migration Job.

The Job failed, causing Helm to abort the deployment.

Business impact included

- Production deployment blocked
- Database migration not completed
- Planned release delayed
- Emergency fixes postponed
- Deployment pipeline failed

---

# Enterprise Architecture

```
GitHub Actions

        │

        ▼

Helm Upgrade

        │

        ▼

Pre-Upgrade Hook

        │

        ▼

Database Migration Job

        │

        ▼

PostgreSQL
```

Deployment Flow

```
GitHub Actions

        │

        ▼

helm upgrade

        │

        ▼

Pre-Upgrade Hook

        │

        ▼

Migration Job Failed

        │

        ▼

Helm Upgrade Aborted
```

---

# Symptoms

Deployment pipeline failed.

Observed

```
Error

pre-upgrade hooks failed
```

Application remained on the previous version.

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

Review release history.

```bash
helm history api-gateway \
-n api-prod
```

Latest revision

```
FAILED
```

---

List Jobs.

```bash
kubectl get jobs \
-n api-prod
```

Observed

```
db-migration-job

Failed
```

---

Describe Job.

```bash
kubectl describe job db-migration-job \
-n api-prod
```

Observed

```
BackoffLimitExceeded
```

---

Review Job logs.

```bash
kubectl logs job/db-migration-job \
-n api-prod
```

Observed

```
ERROR

relation users already exists
```

---

Review Helm hooks.

```bash
helm get hooks api-gateway \
-n api-prod
```

Observed

```
pre-upgrade hook

db-migration-job
```

---

Review migration script.

Migration attempted to recreate an existing table.

---

# Root Cause

The pre-upgrade migration Job was not idempotent.

It attempted to create database objects that already existed.

The Job failed.

Helm considered the hook unsuccessful and cancelled the deployment.

---

# Resolution

Modify the migration script.

Replace

```sql
CREATE TABLE users
```

with

```sql
CREATE TABLE IF NOT EXISTS users
```

Rebuild the application image.

Redeploy.

```bash
helm upgrade api-gateway \
helm/charts/api-gateway \
-f values-prod.yaml \
-n api-prod
```

---

# Validation

Verify Jobs.

```bash
kubectl get jobs \
-n api-prod
```

Expected

```
Completed
```

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

Verify application.

```bash
kubectl get pods \
-n api-prod
```

All Pods

```
Running
```

---

Business Validation

- Deployment successful
- Database migration completed
- Customer login successful
- APIs operational
- Monitoring healthy

---

# Incident Timeline

| Time | Activity |
|------|----------|
| 20:00 | Deployment started |
| 20:02 | Hook executed |
| 20:03 | Migration failed |
| 20:05 | Deployment aborted |
| 20:08 | Incident declared |
| 20:20 | Migration logs reviewed |
| 20:30 | Root cause identified |
| 20:42 | Migration corrected |
| 20:50 | Deployment retried |
| 20:58 | Incident resolved |

---

# Root Cause Analysis (5 Whys)

### Why did Helm upgrade fail?

The pre-upgrade hook failed.

---

### Why?

The migration Job exited with an error.

---

### Why?

The migration attempted to recreate an existing table.

---

### Why?

The migration script was not idempotent.

---

### Why?

Migration testing did not include rerun scenarios.

---

# Corrective Actions

- Fix migration script.
- Make migrations idempotent.
- Redeploy application.
- Validate database changes.
- Document deployment procedure.

---

# Preventive Actions

- Test Helm hooks before production.
- Make all database migrations idempotent.
- Review migration scripts during pull requests.
- Automate migration validation.
- Monitor hook execution.
- Use rollback testing.

---

# Lessons Learned

- Helm hooks directly affect deployment success.
- Database migrations must be repeatable.
- Hook logs are essential during troubleshooting.
- CI/CD should validate migration execution.
- Failed hooks stop Helm deployments.

---

# Production Best Practices

- Keep hook Jobs lightweight.
- Use idempotent SQL migrations.
- Monitor hook execution time.
- Define appropriate Job retry policies.
- Validate hooks in staging.
- Archive migration logs.
- Document rollback procedures.

---

# Interview Questions

## Q1. What is a Helm hook?

### Answer

A Helm hook is a Kubernetes resource executed at specific points in the release lifecycle, such as before or after install, upgrade or delete.

---

## Q2. Why did the deployment fail?

### Answer

The pre-upgrade migration Job failed because it attempted to create an existing database table. Helm treated the failed hook as a deployment failure.

---

## Q3. How can enterprises avoid Helm hook failures?

### Answer

By testing hooks thoroughly, using idempotent migration scripts, validating hooks in CI/CD and monitoring Job execution.

---

# Commands Reference

Release Status

```bash
helm status api-gateway -n api-prod
```

Release History

```bash
helm history api-gateway -n api-prod
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
kubectl describe job db-migration-job -n api-prod
```

Logs

```bash
kubectl logs job/db-migration-job -n api-prod
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

- Helm hook fail झाला.
- Deployment थांबला.
- Job तपासा.
- Job logs पहा.
- Migration verify करा.
- Script idempotent करा.
- Helm upgrade पुन्हा करा.
- Validation करा.

---

# Marathi Summary (5+ Experience Revision)

या Incident मध्ये Helm upgrade दरम्यान चालणारा pre-upgrade hook Job अयशस्वी झाला आणि संपूर्ण deployment थांबला. Investigation मध्ये `helm get hooks`, `kubectl get jobs`, `kubectl logs job/...` आणि migration scripts तपासून SQL migration idempotent नसल्याचे आढळले. `CREATE TABLE IF NOT EXISTS` सारखे सुरक्षित migration logic वापरून Job यशस्वी झाला आणि Helm deployment पूर्ण झाला. या Incident मधून Helm hooks, Kubernetes Jobs, database migration strategy आणि idempotent deployment practices यांचे Enterprise Production वातावरणातील महत्त्व स्पष्ट होते.

