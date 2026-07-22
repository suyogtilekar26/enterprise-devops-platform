# Helm Lab 18 - Helm Template, Debug and Dry Run

# Enterprise DevOps Platform

---

# Lab Objective

In this lab, we will learn how to validate Helm Charts before deploying them into Kubernetes.

Enterprise DevOps Engineers never deploy a Helm Chart directly to Production without first validating:

- Template Rendering
- YAML Output
- Variable Substitution
- Kubernetes Manifests
- Installation Simulation

Helm provides several commands to perform these validations safely.

---

# Production Scenario

Company

ABC Bank

The Platform Team is preparing to deploy API Gateway version 2.0.0.

Before Production deployment, engineers execute:

- helm lint
- helm template
- helm install --dry-run
- helm install --debug

Only after all validations succeed is the deployment approved.

This process prevents production outages caused by template or configuration errors.

---

# Enterprise Deployment Workflow

```
Developer

        │

        ▼

Chart Modification

        │

        ▼

helm lint

        │

        ▼

helm template

        │

        ▼

Dry Run

        │

        ▼

Debug

        │

        ▼

Production Deployment
```

---

# Current Project

```
Enterprise DevOps Platform

↓

API Gateway Helm Chart

↓

Templates

↓

Values

↓

Kubernetes
```

---

# Step 1

Validate Chart.

```bash
helm lint helm/charts/api-gateway
```

Expected

```
1 chart(s) linted

0 chart(s) failed
```

---

# Step 2

Render Templates.

```bash
helm template api-gateway \
helm/charts/api-gateway
```

Observe

```
Deployment

↓

Service

↓

ServiceAccount
```

Helm converts templates into plain Kubernetes YAML.

Nothing is deployed.

---

# Step 3

Render Using Production Values.

```bash
helm template api-prod \
helm/charts/api-gateway \
-f helm/charts/api-gateway/values-prod.yaml
```

Verify

```
replicas: 5
```

Observe

- Image
- Resources
- Ports

---

# Step 4

Save Rendered YAML.

```bash
helm template api-gateway \
helm/charts/api-gateway \
> rendered.yaml
```

Verify

```bash
cat rendered.yaml
```

This file can be reviewed before deployment.

---

# Step 5

Perform Dry Run.

```bash
helm install api-gateway \
helm/charts/api-gateway \
--dry-run
```

Expected

```
NAME

api-gateway

STATUS

pending-install
```

Nothing is created inside Kubernetes.

---

# Step 6

Dry Run with Debug.

```bash
helm install api-gateway \
helm/charts/api-gateway \
--dry-run \
--debug
```

Observe

- Rendered YAML
- Values Used
- Chart Information
- Hooks
- Installation Steps

---

# Step 7

Upgrade Dry Run.

```bash
helm upgrade api-gateway \
helm/charts/api-gateway \
--dry-run \
--debug
```

This simulates an upgrade without changing the cluster.

---

# Step 8

Compare Values.

```bash
helm get values api-gateway
```

If no release exists yet, Helm reports that the release is not found. This is expected because previous commands used `--dry-run` and did not create a real release.

---

# Step 9

Deploy After Validation.

```bash
helm install api-gateway \
helm/charts/api-gateway
```

Verify

```bash
helm list
```

---

# Step 10

Cleanup.

```bash
helm uninstall api-gateway
```

Delete rendered file.

```bash
rm rendered.yaml
```

---

# Enterprise Validation Pipeline

```
Chart

        │

        ▼

helm lint

        │

        ▼

helm template

        │

        ▼

Review YAML

        │

        ▼

Dry Run

        │

        ▼

Debug

        │

        ▼

Deploy
```

---

# Difference Between Commands

## helm lint

Checks

- Chart Structure
- YAML Syntax
- Best Practices

---

## helm template

Creates Kubernetes YAML.

Does not contact Kubernetes.

---

## helm install --dry-run

Simulates installation.

Nothing is deployed.

---

## helm install --debug

Displays detailed execution information.

Useful for troubleshooting.

---

# Validation Checklist

Run

```bash
helm lint helm/charts/api-gateway
```

Run

```bash
helm template api-gateway \
helm/charts/api-gateway
```

Run

```bash
helm install api-gateway \
helm/charts/api-gateway \
--dry-run
```

Run

```bash
helm install api-gateway \
helm/charts/api-gateway \
--dry-run \
--debug
```

---

# Expected Result

Successfully validated the API Gateway Helm Chart without making changes to the Kubernetes cluster.

Learned how to:

- Render templates
- Simulate deployments
- Debug installations
- Review generated manifests

---

# Production Best Practices

- Always execute `helm lint` before every deployment.
- Review rendered YAML using `helm template`.
- Use `--dry-run` before Production deployments.
- Use `--debug` while troubleshooting.
- Store rendered manifests when performing peer reviews.
- Integrate these validation steps into CI/CD pipelines.

---

# Common Mistakes

- Deploying directly without validation.
- Ignoring lint warnings.
- Reviewing templates instead of rendered YAML.
- Assuming dry-run creates Kubernetes resources.
- Forgetting to verify Production values before deployment.

---

# Interview Questions

## Q1. What is the difference between `helm template` and `helm install --dry-run`?

### Answer

`helm template` renders Kubernetes manifests locally without contacting the cluster.

`helm install --dry-run` simulates an installation, performing installation logic without creating Kubernetes resources.

---

## Q2. Why is `--debug` useful?

### Answer

`--debug` provides detailed information including rendered manifests, chart metadata, values and execution steps, making troubleshooting significantly easier.

---

## Q3. Why should Production deployments always use dry-run first?

### Answer

Dry-run helps detect configuration, templating and deployment issues before any changes are applied to the Kubernetes cluster, reducing deployment risk.

---

# Marathi Quick Revision

- helm lint करा.
- helm template verify करा.
- dry-run वापरा.
- debug वापरा.
- Rendered YAML तपासा.
- मगच Production deploy करा.

---

# Marathi Summary (5+ Experience Revision)

या Lab मध्ये आपण Helm Chart Production मध्ये deploy करण्यापूर्वी validation कशी करायची हे शिकलो. `helm lint`, `helm template`, `helm install --dry-run` आणि `--debug` हे Production deployment pipeline मधील अत्यंत महत्त्वाचे टप्पे आहेत. Enterprise मध्ये कोणतेही deployment करण्यापूर्वी rendered manifests आणि dry-run validate करणे ही standard DevOps practice आहे.

