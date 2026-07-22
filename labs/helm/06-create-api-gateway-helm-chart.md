# Helm Lab 06 - Create Helm Chart for API Gateway

# Enterprise DevOps Platform

---

# Lab Objective

In this lab, we will create the first real production Helm Chart for our Enterprise DevOps Platform.

This is the beginning of packaging our actual microservices.

Application

```
Frontend

↓

API Gateway

↓

Auth Service

↓

Dashboard Service
```

The API Gateway will become our first production-ready Helm Chart.

---

# Production Scenario

Company

ABC Bank

A new version of the API Gateway is ready for deployment.

Instead of maintaining dozens of Kubernetes YAML files, the Platform Team packages the API Gateway into a reusable Helm Chart.

The same chart is used for:

- Development
- QA
- UAT
- Production

Only configuration changes between environments.

This is exactly how our project will be managed.

---

# Existing Project Structure

```
enterprise-devops-platform/

├── api-gateway/

├── frontend/

├── auth-service/

├── dashboard-service/

├── helm/

│   └── charts/

│       └── demo-chart
```

Target Structure

```
helm/

└── charts/

    ├── api-gateway

    └── demo-chart
```

---

# Enterprise Architecture

```
Developer

↓

GitHub

↓

GitHub Actions

↓

Docker Image

↓

Container Registry

↓

API Gateway Helm Chart

↓

Kubernetes
```

---

# Step 1

Move to the project directory.

```bash
cd ~/devops-lab/enterprise-devops-platform
```

---

# Step 2

Navigate to Helm charts.

```bash
cd helm/charts
```

---

# Step 3

Create the API Gateway chart.

```bash
helm create api-gateway
```

Expected Output

```
Creating api-gateway
```

---

# Step 4

Verify the chart.

```bash
tree api-gateway
```

Expected

```
api-gateway

├── Chart.yaml

├── values.yaml

├── charts

└── templates

    ├── deployment.yaml

    ├── service.yaml

    ├── ingress.yaml

    ├── serviceaccount.yaml

    ├── hpa.yaml

    ├── NOTES.txt

    ├── _helpers.tpl

    └── tests
```

---

# Step 5

Verify available charts.

```bash
ls
```

Expected

```
api-gateway

demo-chart
```

---

# Step 6

Inspect Chart Metadata.

```bash
cat api-gateway/Chart.yaml
```

Notice

- Chart Name
- Version
- Description
- App Version

These values will be customized in upcoming labs.

---

# Step 7

Inspect Default Values.

```bash
cat api-gateway/values.yaml
```

Observe

Default values include:

- replicaCount
- image
- service
- ingress
- resources
- autoscaling

We will replace these defaults with values specific to our API Gateway.

---

# Project Mapping

Current

```
API Gateway Source Code

↓

Docker Image

(Not Yet Managed)

↓

Kubernetes
```

After Helm

```
API Gateway Source

↓

Docker Image

↓

API Gateway Helm Chart

↓

Kubernetes
```

---

# Verification

Verify chart exists.

```bash
ls helm/charts
```

Expected

```
api-gateway

demo-chart
```

Verify chart structure.

```bash
tree helm/charts/api-gateway
```

---

# Expected Result

Successfully created a dedicated Helm Chart for the API Gateway.

No deployment has been performed yet.

The chart will be customized in the upcoming labs.

---

# Why One Chart Per Service?

Our Enterprise DevOps Platform consists of multiple independently deployable services.

Each service has:

- Independent releases
- Independent scaling
- Independent rollback
- Independent versioning

Therefore each service receives its own Helm Chart.

Example

```
frontend

↓

Version 3.2

api-gateway

↓

Version 4.8

auth-service

↓

Version 2.5

dashboard-service

↓

Version 6.1
```

All services can be upgraded independently.

---

# Production Best Practices

- One chart per deployable application.
- Do not combine unrelated services into one chart.
- Keep charts small and reusable.
- Maintain semantic chart versions.
- Store charts inside source control.
- Customize generated templates instead of rewriting everything.

---

# Common Mistakes

- One giant chart for every application.
- Hardcoding namespaces.
- Hardcoding image tags.
- Deleting generated templates immediately.
- Ignoring chart versioning.

---

# Interview Questions

## Q1. Why create one Helm Chart per microservice?

### Answer

Each microservice has an independent lifecycle, release schedule, rollback strategy and scaling requirements. Separate Helm Charts allow independent deployment and version management.

---

## Q2. Can multiple applications share one Helm Chart?

### Answer

Only if they are tightly coupled and always deployed together. In most enterprise microservice architectures, each deployable service has its own chart.

---

## Q3. Why use `helm create` instead of writing everything manually?

### Answer

`helm create` generates a standardized production-ready chart structure containing best-practice templates, reducing development time and ensuring consistency.

---

# Marathi Quick Revision

- API Gateway साठी स्वतंत्र Chart तयार केला.
- प्रत्येक microservice ला स्वतंत्र Helm Chart.
- अजून deployment नाही.
- पुढे templates customize करणार.
- Production मध्ये independent releases असतात.

---

# Marathi Summary (5+ Experience Revision)

या Lab मध्ये आपण आपल्या Enterprise DevOps Platform मधील पहिला वास्तविक Helm Chart तयार केला—API Gateway साठी. Enterprise मध्ये प्रत्येक deployable microservice साठी स्वतंत्र Helm Chart ठेवणे ही standard practice आहे. त्यामुळे प्रत्येक service स्वतंत्रपणे deploy, upgrade, rollback आणि scale करता येते. पुढील Labs मध्ये आपण या Chart मधील metadata, values.yaml आणि templates आपल्या production application नुसार customize करू.

