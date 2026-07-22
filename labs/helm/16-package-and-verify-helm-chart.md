# Helm Lab 16 - Package and Verify Helm Chart

# Enterprise DevOps Platform

---

# Lab Objective

In this lab, we will package our API Gateway Helm Chart into a distributable archive.

Packaging is the final step before publishing a Helm Chart to an internal chart repository or using it in a CI/CD pipeline.

Enterprise organizations rarely deploy directly from source code. Instead, they deploy versioned Helm Chart packages.

---

# Production Scenario

Company

ABC Bank

The Platform Team maintains an internal Helm Repository.

Deployment Flow

```
Developer

↓

Git Commit

↓

GitHub Actions

↓

Helm Package

↓

Internal Helm Repository

↓

Argo CD

↓

Production Kubernetes
```

Every application version is stored as a packaged Helm Chart.

---

# Enterprise Architecture

```
API Gateway Helm Chart

        │

        ▼

helm package

        │

        ▼

api-gateway-1.0.0.tgz

        │

        ▼

Chart Repository

        │

        ▼

Production Deployment
```

---

# Current Project

```
helm/

└── charts/

    └── api-gateway/

        ├── Chart.yaml

        ├── values.yaml

        └── templates/
```

---

# Step 1

Move to the project directory.

```bash
cd ~/devops-lab/enterprise-devops-platform
```

---

# Step 2

Validate the chart.

```bash
helm lint helm/charts/api-gateway
```

Expected

```
1 chart(s) linted

0 chart(s) failed
```

---

# Step 3

Package the chart.

```bash
helm package helm/charts/api-gateway
```

Expected

```
Successfully packaged chart and saved it to:

api-gateway-1.0.0.tgz
```

---

# Step 4

Verify the package.

```bash
ls *.tgz
```

Expected

```
api-gateway-1.0.0.tgz
```

---

# Step 5

Inspect Chart Metadata.

```bash
helm show chart api-gateway-1.0.0.tgz
```

Verify

- Name
- Version
- Description
- App Version

---

# Step 6

Inspect Default Values.

```bash
helm show values api-gateway-1.0.0.tgz
```

Verify

- Replica Count
- Image
- Resources
- Service

---

# Step 7

Render Templates from Package.

```bash
helm template api-gateway api-gateway-1.0.0.tgz
```

Notice

Templates are rendered exactly as they were from the source chart.

---

# Step 8

Install Using the Package.

```bash
helm install api-gateway api-gateway-1.0.0.tgz
```

Expected

```
STATUS

deployed
```

---

# Step 9

Verify Release.

```bash
helm list
```

---

# Step 10

Verify Kubernetes Resources.

```bash
kubectl get deployment

kubectl get pods

kubectl get svc
```

---

# Step 11

View Release Status.

```bash
helm status api-gateway
```

---

# Step 12

Cleanup.

```bash
helm uninstall api-gateway
```

---

# Enterprise Deployment Flow

```
Chart Source

        │

        ▼

helm package

        │

        ▼

Versioned Archive

        │

        ▼

Repository

        │

        ▼

Deployment Pipeline

        │

        ▼

Kubernetes
```

---

# Why Package Helm Charts?

Packaging provides

- Version Control
- Immutable Artifacts
- CI/CD Integration
- Easier Distribution
- Reproducible Deployments
- Chart Repository Support

---

# Validation Checklist

Run

```bash
helm lint helm/charts/api-gateway
```

Run

```bash
helm package helm/charts/api-gateway
```

Run

```bash
helm show chart api-gateway-1.0.0.tgz
```

Run

```bash
helm template api-gateway api-gateway-1.0.0.tgz
```

Run

```bash
helm install api-gateway api-gateway-1.0.0.tgz
```

Verify

```bash
kubectl get pods
```

---

# Expected Result

Successfully packaged the API Gateway Helm Chart into a versioned archive.

Verified that the packaged chart can be installed exactly like the source chart.

---

# Production Best Practices

- Always run `helm lint` before packaging.
- Package only validated charts.
- Store packaged charts in a version-controlled repository.
- Never overwrite released chart versions.
- Use semantic versioning.
- Keep packaged charts immutable after release.

---

# Common Mistakes

- Packaging charts with validation errors.
- Reusing chart versions after changes.
- Modifying packaged archives manually.
- Deploying untested chart packages.
- Forgetting to update Chart.yaml version before packaging.

---

# Interview Questions

## Q1. Why do enterprises package Helm Charts?

### Answer

Packaging creates immutable, versioned artifacts that can be stored in repositories, distributed through CI/CD pipelines and deployed consistently across environments.

---

## Q2. Which command packages a Helm Chart?

```bash
helm package <chart-directory>
```

Example

```bash
helm package helm/charts/api-gateway
```

---

## Q3. Can a packaged Helm Chart be deployed directly?

### Answer

Yes. A packaged `.tgz` chart can be installed, upgraded and rolled back exactly like a chart directory.

---

# Marathi Quick Revision

- helm lint करा.
- helm package वापरा.
- .tgz file तयार होते.
- helm show ने verify करा.
- Package मधून install करा.
- Production मध्ये package deploy करतात.

---

# Marathi Summary (5+ Experience Revision)

या Lab मध्ये आपण API Gateway Helm Chart package करून `.tgz` archive तयार केला. Enterprise मध्ये source chart ऐवजी versioned packaged charts deploy करणे ही standard practice आहे. यामुळे immutable artifacts, reproducible deployments आणि CI/CD integration सुलभ होते. Package तयार करण्यापूर्वी `helm lint` आणि version validation करणे अत्यावश्यक आहे.

