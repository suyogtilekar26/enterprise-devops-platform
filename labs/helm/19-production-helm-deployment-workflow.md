# Helm Lab 19 - Production Helm Deployment Workflow

# Enterprise DevOps Platform

---

# Lab Objective

In this lab, we will simulate a complete enterprise production deployment workflow using Helm.

Unlike previous labs that focused on individual Helm commands, this lab demonstrates how a real Platform Engineering team deploys a new application version into Production.

This workflow combines everything learned so far:

- Chart Validation
- Values Verification
- Dry Run
- Release Upgrade
- Health Checks
- Rollback Readiness

---

# Production Scenario

Company

ABC Bank

The Platform Team is preparing to deploy API Gateway version **v2.0.0** to the Production Kubernetes Cluster.

Deployment Window

```
Sunday

02:00 AM
```

Approvals Received

- Development Team
- QA Team
- Change Advisory Board (CAB)
- Platform Manager

Deployment must complete with:

- Zero downtime
- Rollback readiness
- Health verification
- Deployment documentation

---

# Enterprise Production Architecture

```
Developer

        │

        ▼

GitHub

        │

        ▼

GitHub Actions

        │

        ▼

Docker Build

        │

        ▼

Container Registry

        │

        ▼

Helm Chart

        │

        ▼

values-prod.yaml

        │

        ▼

Production Kubernetes

        │

        ▼

API Gateway
```

---

# Production Deployment Checklist

Before deployment verify

- CAB Approval
- Backup Available
- Rollback Plan
- Monitoring Dashboard
- Alerts Enabled
- Production Values Verified
- Chart Version Verified
- Docker Image Verified

No deployment begins until every item is approved.

---

# Step 1

Verify Kubernetes Context.

```bash
kubectl config current-context
```

Expected

```
production-cluster
```

Always verify the target cluster before deploying.

---

# Step 2

Verify Cluster Health.

```bash
kubectl get nodes
```

Expected

```
Ready
```

---

# Step 3

Validate the Chart.

```bash
helm lint helm/charts/api-gateway
```

Expected

```
0 chart(s) failed
```

---

# Step 4

Review Production Values.

```bash
cat helm/charts/api-gateway/values-prod.yaml
```

Verify

- Replica Count
- Resources
- Image Tag
- Service Port

---

# Step 5

Render Production Templates.

```bash
helm template api-gateway \
helm/charts/api-gateway \
-f helm/charts/api-gateway/values-prod.yaml
```

Review

- Deployment
- Service
- Image
- Resources
- Labels

---

# Step 6

Perform Dry Run.

```bash
helm upgrade \
--install api-gateway \
helm/charts/api-gateway \
-f helm/charts/api-gateway/values-prod.yaml \
--dry-run \
--debug
```

Deployment should complete without validation errors.

---

# Step 7

Deploy Release.

```bash
helm upgrade \
--install api-gateway \
helm/charts/api-gateway \
-f helm/charts/api-gateway/values-prod.yaml
```

Expected

```
STATUS

deployed
```

---

# Step 8

Verify Helm Release.

```bash
helm list
```

Expected

```
api-gateway
```

---

# Step 9

Verify Deployment.

```bash
kubectl get deployment
```

Confirm

- Desired Replicas
- Available Replicas
- Ready Replicas

---

# Step 10

Verify Pods.

```bash
kubectl get pods
```

Expected

```
Running
```

No Pods should be

```
Pending

CrashLoopBackOff

ImagePullBackOff
```

---

# Step 11

Verify Service.

```bash
kubectl get svc
```

Verify

- ClusterIP
- Port
- Endpoints

---

# Step 12

Verify Rollout Status.

```bash
kubectl rollout status deployment/api-gateway-api-gateway
```

Expected

```
successfully rolled out
```

---

# Step 13

Verify Release Status.

```bash
helm status api-gateway
```

Confirm

- Revision
- Status
- Namespace
- Resources

---

# Step 14

Verify Release History.

```bash
helm history api-gateway
```

Record

- Revision
- Deployment Time
- Status

---

# Step 15

Verify Application Logs.

```bash
kubectl logs deployment/api-gateway-api-gateway
```

Confirm

- No startup errors
- No configuration errors
- Application started successfully

---

# Step 16

Health Check.

```bash
kubectl get endpoints
```

Verify that the Service has active endpoints.

---

# Step 17

Rollback Readiness.

Do not execute.

Verify rollback command.

```bash
helm rollback api-gateway <REVISION>
```

The deployment team confirms rollback steps before closing the deployment window.

---

# Enterprise Deployment Timeline

```
01:30

Deployment Window Opens

↓

01:40

Validation

↓

01:50

Dry Run

↓

02:00

Deployment

↓

02:05

Health Check

↓

02:10

Monitoring

↓

02:20

Business Validation

↓

02:30

Deployment Closed
```

---

# Enterprise Project Mapping

```
Enterprise DevOps Platform

Frontend

↓

API Gateway

↓

Auth Service

↓

Dashboard Service

↓

Helm

↓

Production Kubernetes
```

The same deployment workflow will later be followed for every service.

---

# Validation Checklist

Run

```bash
helm lint helm/charts/api-gateway
```

Run

```bash
helm template api-gateway \
helm/charts/api-gateway \
-f helm/charts/api-gateway/values-prod.yaml
```

Run

```bash
helm upgrade \
--install api-gateway \
helm/charts/api-gateway \
-f helm/charts/api-gateway/values-prod.yaml
```

Run

```bash
kubectl rollout status deployment/api-gateway-api-gateway
```

Run

```bash
helm status api-gateway
```

Run

```bash
helm history api-gateway
```

Run

```bash
kubectl logs deployment/api-gateway-api-gateway
```

---

# Expected Result

Successfully completed an enterprise-style Helm deployment workflow including:

- Validation
- Dry Run
- Production Deployment
- Health Verification
- Rollout Verification
- Release Verification
- Rollback Readiness

---

# Production Best Practices

- Always use `helm upgrade --install` in CI/CD pipelines.
- Never deploy directly without validation.
- Verify rollout completion before announcing success.
- Monitor logs immediately after deployment.
- Confirm Service endpoints.
- Keep a rollback plan ready throughout the deployment window.
- Record deployment revision numbers in the change record.

---

# Common Mistakes

- Deploying with the wrong values file.
- Ignoring rollout failures.
- Declaring success before health checks.
- Not reviewing application logs.
- Forgetting rollback procedures.
- Closing the deployment window without business validation.

---

# Interview Questions

## Q1. Why is `helm upgrade --install` preferred over `helm install`?

### Answer

`helm upgrade --install` performs an install if the release does not exist and an upgrade if it already exists, making it ideal for automated CI/CD pipelines.

---

## Q2. Why should rollout status be verified after deployment?

### Answer

A successful Helm deployment only confirms that Kubernetes accepted the resources. `kubectl rollout status` verifies that the Deployment has actually completed successfully and all updated Pods are available.

---

## Q3. What should be verified before closing a production deployment?

### Answer

Engineers should verify Helm release status, rollout completion, Pod health, Service endpoints, application logs, monitoring dashboards, business validation and rollback readiness.

---

# Marathi Quick Revision

- helm lint करा.
- Production values verify करा.
- Dry Run करा.
- `helm upgrade --install` वापरा.
- Rollout verify करा.
- Logs तपासा.
- Rollback तयार ठेवा.

---

# Marathi Summary (5+ Experience Revision)

या Lab मध्ये आपण Enterprise Production Helm Deployment Workflow पूर्ण केला. Production deployment मध्ये केवळ `helm upgrade` चालवणे पुरेसे नसते. Deployment पूर्वी validation, dry-run, values verification आणि deployment नंतर rollout status, Pods, Services, logs, release history आणि rollback readiness verify करणे अत्यावश्यक असते. Enterprise Platform Teams याच standardized workflow चा वापर करून सुरक्षित आणि repeatable production deployments करतात.

