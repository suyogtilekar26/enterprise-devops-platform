# Helm Incident 11 - Secret Misconfiguration After Helm Deployment

# Enterprise DevOps Platform

---

# Purpose

This incident simulates a production outage where a Helm deployment succeeds, but the application becomes unavailable because an incorrect Kubernetes Secret is deployed.

The objective is to investigate the incident, identify the root cause, restore production service and establish preventive controls.

---

# Incident Summary

| Field | Value |
|-------|-------|
| Incident ID | INC-HLM-011 |
| Severity | SEV-1 |
| Environment | Production |
| Application | API Gateway |
| Cluster | production-cluster |
| Namespace | api-prod |
| Reported By | Prometheus Alertmanager |
| Status | Resolved |

---

# Business Impact

A scheduled Helm deployment completed successfully.

Shortly after deployment, API Gateway failed to authenticate with backend services because incorrect Secret values were loaded.

Business impact included

- Customer login failures
- Authentication service unavailable
- API requests returning HTTP 500
- Dashboard inaccessible
- Production outage

---

# Enterprise Architecture

```
React Frontend

        │

        ▼

API Gateway

        │

Secret

        │

        ▼

Deployment

        │

        ▼

Auth Service

        │

        ▼

PostgreSQL
```

Deployment Flow

```
GitHub Actions

        │

        ▼

Helm Upgrade

        │

        ▼

Secret Updated

        │

        ▼

Application Startup

        │

        ▼

Authentication Failure

        │

        ▼

Production Incident
```

---

# Symptoms

Deployment pipeline completed successfully.

Monitoring reported

- Authentication failures
- HTTP 500 responses
- Login failures
- Increased application errors

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

Verify Pods.

```bash
kubectl get pods \
-n api-prod
```

Pods were

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
Database authentication failed

Invalid username or password
```

---

Verify Secret.

```bash
kubectl get secret api-gateway-secret \
-n api-prod
```

---

Decode Secret.

```bash
kubectl get secret api-gateway-secret \
-n api-prod \
-o jsonpath='{.data.DB_PASSWORD}' | base64 --decode
```

Observed

```
dev_password
```

Production password should have been

```
prod_password
```

---

Review Helm values.

```bash
helm get values api-gateway \
-n api-prod
```

Observed

```yaml
database:
  password: dev_password
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

The Production deployment referenced the Development values file.

As a result

- Development database credentials
- Incorrect application Secret
- Authentication failures

Helm successfully deployed the resources, but the application could not connect to Production services.

---

# Resolution

Deploy using the correct Production values.

```bash
helm upgrade api-gateway \
helm/charts/api-gateway \
-f values-prod.yaml \
-n api-prod
```

---

# Validation

Verify Secret.

```bash
kubectl get secret api-gateway-secret \
-n api-prod \
-o jsonpath='{.data.DB_PASSWORD}' | base64 --decode
```

Expected

```
prod_password
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

Verify application logs.

```bash
kubectl logs <POD_NAME> \
-n api-prod
```

No authentication errors observed.

---

Verify application.

- Customer login successful
- API Gateway connected to PostgreSQL
- Dashboard operational
- Monitoring healthy

---

# Incident Timeline

| Time | Activity |
|------|----------|
| 15:00 | Deployment completed |
| 15:03 | Authentication failures detected |
| 15:05 | Monitoring alerts triggered |
| 15:08 | Incident declared |
| 15:15 | Pod logs reviewed |
| 15:22 | Secret investigation started |
| 15:30 | Incorrect Secret identified |
| 15:36 | Production values deployed |
| 15:42 | Authentication restored |
| 15:48 | Incident closed |

---

# Root Cause Analysis (5 Whys)

### Why did authentication fail?

Incorrect credentials were used.

---

### Why?

The Kubernetes Secret contained Development credentials.

---

### Why?

Development values file was deployed.

---

### Why?

Deployment pipeline referenced the wrong environment file.

---

### Why?

CI/CD pipeline lacked environment validation for sensitive configuration.

---

# Corrective Actions

- Deploy correct Production Secret.
- Verify application connectivity.
- Review deployment pipeline.
- Update deployment checklist.
- Document incident.

---

# Preventive Actions

- Separate Production and Development Secrets.
- Store credentials in external Secret managers.
- Validate environment before deployment.
- Restrict Production deployments.
- Implement policy checks for Secret values.
- Require peer review for Secret changes.

---

# Lessons Learned

- Successful Helm deployments do not guarantee valid application credentials.
- Secret validation is critical before deployment.
- Environment isolation prevents configuration mistakes.
- Sensitive configuration requires stronger controls.
- Automated validation reduces human error.

---

# Production Best Practices

- Use External Secrets Operator or Vault.
- Never store Production credentials in Git.
- Separate values files by environment.
- Validate Secrets before deployment.
- Monitor authentication failures.
- Rotate credentials regularly.
- Audit Secret changes.

---

# Interview Questions

## Q1. Can a Helm deployment succeed while authentication fails?

### Answer

Yes.

Helm successfully deploys Kubernetes resources, but incorrect Secret values can prevent the application from connecting to dependent services.

---

## Q2. Which command can verify the value stored inside a Kubernetes Secret?

### Answer

```bash
kubectl get secret api-gateway-secret \
-n api-prod \
-o jsonpath='{.data.DB_PASSWORD}' | base64 --decode
```

---

## Q3. How can enterprises prevent Secret misconfiguration?

### Answer

By using external Secret management solutions, environment-specific values, CI/CD validation, policy enforcement and deployment approvals.

---

# Commands Reference

Status

```bash
helm status api-gateway -n api-prod
```

Current Values

```bash
helm get values api-gateway -n api-prod
```

Secret

```bash
kubectl get secret api-gateway-secret -n api-prod
```

Decode Secret

```bash
kubectl get secret api-gateway-secret \
-n api-prod \
-o jsonpath='{.data.DB_PASSWORD}' | base64 --decode
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

- Helm deployment successful झाला.
- Authentication fail झाली.
- Secret verify करा.
- Secret decode करा.
- Wrong credentials शोधा.
- values-prod.yaml वापरा.
- Helm upgrade करा.
- Validation करा.

---

# Marathi Summary (5+ Experience Revision)

या Incident मध्ये Helm deployment यशस्वी झाला, परंतु Production मध्ये Development Secret deploy झाल्यामुळे API Gateway PostgreSQL शी authenticate करू शकला नाही. Investigation मध्ये `kubectl logs`, `helm get values` आणि Secret decode करून चुकीचे credentials हा root cause असल्याचे आढळले. योग्य Production values वापरून Helm upgrade पुन्हा execute करण्यात आला आणि authentication restore झाली. या Incident मधून Secret management, environment isolation, external Secret stores आणि CI/CD validation यांचे Enterprise Production deployments मध्ये असलेले महत्त्व स्पष्ट होते.

