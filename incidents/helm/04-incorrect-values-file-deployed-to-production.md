# Helm Incident 04 - Incorrect Values File Deployed to Production

# Enterprise DevOps Platform

---

# Purpose

This incident simulates an enterprise production outage where the wrong Helm values file was accidentally used during deployment.

The objective is to investigate the deployment, identify the configuration mistake, restore production services and define preventive controls to avoid future configuration-related incidents.

---

# Incident Summary

| Field | Value |
|-------|-------|
| Incident ID | INC-HLM-004 |
| Severity | SEV-1 |
| Environment | Production |
| Application | API Gateway |
| Cluster | production-cluster |
| Namespace | api-prod |
| Reported By | Monitoring System |
| Status | Resolved |

---

# Business Impact

A scheduled production deployment completed successfully from Helm's perspective, but the application immediately became unstable.

Business impact included

- API response latency increased
- Customer login failures
- Dashboard intermittently unavailable
- Internal authentication requests timing out
- Emergency investigation initiated

---

# Enterprise Architecture

```
React Frontend

        │

        ▼

API Gateway

        │

 ┌───────────────┐
 ▼               ▼

Auth Service   Dashboard Service

        │

        ▼

PostgreSQL

        │

        ▼

Redis
```

Deployment Flow

```
GitHub Actions

        │

        ▼

helm upgrade

        │

        ▼

Wrong values file

        │

        ▼

Application Misconfiguration

        │

        ▼

Production Incident
```

---

# Symptoms

Deployment completed successfully.

```
STATUS

deployed
```

However,

- Pods continuously restarted
- Database connectivity failed
- External API requests timed out
- Production monitoring generated multiple alerts

---

# Initial Investigation

Verify Helm release.

```bash
helm status api-gateway \
-n api-prod
```

Release status

```
deployed
```

---

Review release history.

```bash
helm history api-gateway \
-n api-prod
```

Latest revision deployed successfully.

---

Review running Pods.

```bash
kubectl get pods \
-n api-prod
```

Pods repeatedly restarted.

---

Review logs.

```bash
kubectl logs <POD_NAME> \
-n api-prod
```

Observed

```
Database connection failed

Unable to connect to PostgreSQL
```

---

Review current values.

```bash
helm get values api-gateway \
-n api-prod
```

Investigation revealed

```
database.host=postgres-dev

redis.host=redis-dev
```

Production should have been

```
postgres-prod

redis-prod
```

---

Review deployment pipeline.

Pipeline executed

```bash
helm upgrade api-gateway \
helm/charts/api-gateway \
-f values-dev.yaml \
-n api-prod
```

Instead of

```bash
helm upgrade api-gateway \
helm/charts/api-gateway \
-f values-prod.yaml \
-n api-prod
```

---

# Root Cause

The deployment pipeline referenced the Development values file instead of the Production values file.

As a result

- Incorrect database endpoint
- Incorrect Redis endpoint
- Invalid environment configuration

The deployment itself succeeded because the templates were valid, but the application configuration was incorrect.

---

# Resolution

Deploy using the correct Production values file.

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

Verify values.

```bash
helm get values api-gateway \
-n api-prod
```

Confirm

```
database.host=postgres-prod

redis.host=redis-prod
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

Verify logs.

```bash
kubectl logs <POD_NAME> \
-n api-prod
```

No connection errors observed.

---

Verify endpoints.

```bash
kubectl get endpoints \
-n api-prod
```

---

Business Validation

- User authentication successful
- Dashboard operational
- APIs responding normally
- Monitoring alerts cleared

---

# Incident Timeline

| Time | Activity |
|------|----------|
| 11:00 | Deployment started |
| 11:03 | Helm upgrade completed |
| 11:06 | Monitoring alerts generated |
| 11:10 | Incident declared |
| 11:18 | Pod logs investigated |
| 11:25 | Incorrect values file identified |
| 11:32 | Production values deployed |
| 11:38 | Application stabilized |
| 11:45 | Incident resolved |

---

# Root Cause Analysis (5 Whys)

### Why was the application misconfigured?

Wrong configuration values were applied.

---

### Why?

Development values file was deployed.

---

### Why?

Pipeline referenced the wrong file.

---

### Why?

Deployment workflow lacked environment validation.

---

### Why?

CI/CD pipeline had no safeguard to prevent incorrect values files from being used in Production.

---

# Corrective Actions

- Redeploy with Production values.
- Validate environment configuration.
- Review deployment pipeline.
- Update release checklist.
- Improve deployment documentation.

---

# Preventive Actions

- Store environment values separately.
- Require approval before Production deployments.
- Validate values file names in CI/CD.
- Block Development configuration in Production.
- Implement automated configuration verification.
- Use GitOps with environment-specific repositories.

---

# Lessons Learned

- Successful Helm deployment does not guarantee a healthy application.
- Configuration validation is as important as chart validation.
- Environment-specific values must be protected.
- Production deployments should include automated policy checks.
- Deployment pipelines should enforce environment isolation.

---

# Production Best Practices

- Maintain separate values files for each environment.
- Restrict Production deployments.
- Validate configuration before deployment.
- Automate environment verification.
- Review values changes during pull requests.
- Store Production configuration securely.
- Monitor application immediately after deployment.

---

# Interview Questions

## Q1. Can a Helm deployment succeed while the application fails?

### Answer

Yes.

Helm validates and deploys Kubernetes resources successfully, but incorrect configuration values can cause the application to fail after deployment.

---

## Q2. Which command helps identify the values currently applied to a release?

### Answer

```bash
helm get values api-gateway -n api-prod
```

---

## Q3. How can enterprises prevent deployment of incorrect values files?

### Answer

By implementing CI/CD validation, environment-specific deployment pipelines, GitOps workflows, approval gates and automated policy enforcement.

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

Current Values

```bash
helm get values api-gateway -n api-prod
```

Upgrade

```bash
helm upgrade api-gateway \
helm/charts/api-gateway \
-f values-prod.yaml \
-n api-prod
```

Pods

```bash
kubectl get pods -n api-prod
```

Logs

```bash
kubectl logs <POD_NAME> -n api-prod
```

Endpoints

```bash
kubectl get endpoints -n api-prod
```

---

# Marathi Quick Revision

- Deployment successful झाला.
- Application fail झाला.
- helm get values तपासा.
- Wrong values file शोधा.
- values-prod.yaml वापरा.
- Helm upgrade करा.
- Validation करा.

---

# Marathi Summary (5+ Experience Revision)

या Incident मध्ये Helm deployment यशस्वी झाला, परंतु Production मध्ये चुकून `values-dev.yaml` वापरल्यामुळे API Gateway चुकीच्या PostgreSQL आणि Redis endpoints शी जोडण्याचा प्रयत्न करत होता. त्यामुळे Pods restart होत होते आणि application उपलब्ध नव्हते. `helm get values` आणि Pod logs तपासून चुकीचा values file हा root cause असल्याचे आढळले. योग्य `values-prod.yaml` वापरून Helm upgrade पुन्हा execute करण्यात आला आणि सेवा पूर्ववत झाली. या Incident मधून Production deployments मध्ये environment-specific configuration validation, CI/CD safeguards आणि GitOps आधारित environment isolation यांचे महत्त्व अधोरेखित होते.

