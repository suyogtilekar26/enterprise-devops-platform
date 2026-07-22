# Helm Incident 17 - Helm Rollback Deployed but Database Schema Incompatible

# Enterprise DevOps Platform

---

# Purpose

This incident simulates a production rollback where Helm successfully restores the previous application version, but the application still fails because the database schema has already been migrated to a newer incompatible version.

The objective is to investigate the issue, identify the root cause, restore production services and establish safe rollback strategies.

---

# Incident Summary

| Field | Value |
|-------|-------|
| Incident ID | INC-HLM-017 |
| Severity | SEV-1 |
| Environment | Production |
| Application | API Gateway |
| Cluster | production-cluster |
| Namespace | api-prod |
| Reported By | On-call SRE |
| Status | Resolved |

---

# Business Impact

A production deployment introduced a critical application bug.

Operations initiated a Helm rollback.

The rollback completed successfully, but the application continued failing because the database schema had already been upgraded.

Business impact included

- Customer login failures
- API Gateway unavailable
- Database query failures
- Emergency maintenance
- Extended production outage

---

# Enterprise Architecture

```
React Frontend

        │

        ▼

API Gateway

        │

        ▼

Database Migration

        │

        ▼

PostgreSQL
```

Deployment Flow

```
Deployment

      │

      ▼

Database Migrated

      │

      ▼

Application Failure

      │

      ▼

Helm Rollback

      │

      ▼

Old Application

      │

      ▼

Schema Incompatibility
```

---

# Symptoms

Rollback completed successfully.

```bash
helm rollback api-gateway 41 \
-n api-prod
```

Output

```
Rollback was a success
```

Application remained unavailable.

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

deployed
```

---

Verify Pods.

```bash
kubectl get pods \
-n api-prod
```

Pods

```
Running
```

---

Review application logs.

```bash
kubectl logs <POD_NAME> \
-n api-prod
```

Observed

```
column last_login_timestamp does not exist
```

---

Review release history.

```bash
helm history api-gateway \
-n api-prod
```

Rollback completed successfully.

---

Review migration history.

```sql
SELECT version FROM schema_version;
```

Observed

```
Version 42
```

Application expected

```
Version 41
```

---

Review deployment history.

Database migration had already executed during the failed deployment.

---

# Root Cause

Helm rollback restored Kubernetes resources.

However,

Helm does not automatically rollback database schema changes.

The older application expected an earlier database schema.

The migrated database was incompatible.

---

# Resolution

Deploy a forward-compatible application version.

Instead of rolling back the application again,

deploy a corrected release compatible with Schema Version 42.

```bash
helm upgrade api-gateway \
helm/charts/api-gateway \
-f values-prod.yaml \
-n api-prod
```

---

# Validation

Verify application.

```bash
curl http://api.company.com/health
```

Expected

```
HTTP/1.1 200 OK
```

---

Verify logs.

```bash
kubectl logs <POD_NAME> \
-n api-prod
```

No schema errors observed.

---

Verify database.

```sql
SELECT version FROM schema_version;
```

Expected

```
42
```

---

Business Validation

- Customer login successful
- APIs operational
- Dashboard accessible
- Monitoring healthy

---

# Incident Timeline

| Time | Activity |
|------|----------|
| 21:00 | Deployment started |
| 21:03 | Database migrated |
| 21:05 | Application failure detected |
| 21:08 | Helm rollback executed |
| 21:10 | Rollback completed |
| 21:12 | Application still failing |
| 21:20 | Schema mismatch identified |
| 21:35 | Compatible release deployed |
| 21:45 | Service restored |
| 21:50 | Incident closed |

---

# Root Cause Analysis (5 Whys)

### Why did the rollback not restore the application?

Database schema remained upgraded.

---

### Why?

Helm rollback only restored Kubernetes resources.

---

### Why?

Database migrations are external to Helm release state.

---

### Why?

Migration strategy was irreversible.

---

### Why?

Rollback planning did not include database compatibility.

---

# Corrective Actions

- Deploy compatible application version.
- Review migration strategy.
- Document rollback limitations.
- Validate schema compatibility.
- Update deployment runbook.

---

# Preventive Actions

- Design backward-compatible database migrations.
- Separate schema migration from application deployment.
- Test rollback scenarios.
- Avoid destructive schema changes.
- Use expand-and-contract migration strategy.
- Review migration plans during releases.

---

# Lessons Learned

- Helm rollback does not rollback databases.
- Database migrations require independent planning.
- Backward compatibility reduces rollback risk.
- Production rollback procedures should include schema validation.
- Migration testing is essential.

---

# Production Best Practices

- Use versioned database migrations.
- Prefer additive schema changes.
- Delay destructive migrations.
- Test rollback in staging.
- Coordinate database and application releases.
- Maintain migration documentation.
- Monitor schema versions.

---

# Interview Questions

## Q1. Does Helm rollback restore database schema?

### Answer

No.

Helm only restores Kubernetes resources. Database schema changes remain unless separate rollback mechanisms exist.

---

## Q2. Why is backward-compatible database design important?

### Answer

It allows older application versions to continue operating during rollbacks, reducing downtime and deployment risk.

---

## Q3. What migration strategy is commonly recommended?

### Answer

The expand-and-contract pattern, where new schema elements are introduced first, applications are updated to use them, and old schema elements are removed only after all deployments are complete.

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

Rollback

```bash
helm rollback api-gateway 41 -n api-prod
```

Logs

```bash
kubectl logs <POD_NAME> -n api-prod
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

- Rollback successful झाला.
- Application अजून fail होत आहे.
- Logs तपासा.
- Schema version verify करा.
- Database rollback झाला नाही.
- Compatible release deploy करा.
- Validation करा.

---

# Marathi Summary (5+ Experience Revision)

या Incident मध्ये Helm rollback यशस्वी झाला, परंतु deployment दरम्यान झालेली database schema migration मागे गेली नाही. जुने application version नवीन schema शी compatible नसल्यामुळे application सतत errors देत होती. Investigation मध्ये `helm history`, application logs आणि schema version तपासून database incompatibility हा root cause असल्याचे आढळले. Database rollback करण्याऐवजी नवीन schema शी compatible application version deploy करण्यात आला. या Incident मधून Helm rollback च्या मर्यादा, backward-compatible migrations, expand-and-contract strategy आणि production rollback planning यांचे Enterprise वातावरणातील महत्त्व स्पष्ट होते.

