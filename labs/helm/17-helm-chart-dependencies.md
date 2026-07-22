# Helm Lab 17 - Helm Chart Dependencies

# Enterprise DevOps Platform

---

# Lab Objective

In this lab, we will understand Helm Chart Dependencies.

Large enterprise applications rarely consist of a single application.

Instead, they depend on supporting services like:

- PostgreSQL
- Redis
- RabbitMQ
- Elasticsearch
- Kafka

Helm allows us to manage these dependencies through Chart Dependencies.

---

# Production Scenario

Company

ABC Bank

The API Gateway requires Redis for caching.

Instead of asking every engineer to install Redis manually, the Platform Team adds Redis as a Helm Chart dependency.

Deployment becomes:

```
API Gateway

+

Redis

↓

Single Helm Installation
```

This ensures every environment has identical infrastructure.

---

# Enterprise Architecture

```
API Gateway Chart

        │

        ▼

Chart Dependencies

        │

 ┌──────┴────────┐

 ▼               ▼

Redis       PostgreSQL

        │

        ▼

Kubernetes
```

---

# Current Project

```
helm/

└── charts/

    └── api-gateway/

        ├── Chart.yaml

        ├── values.yaml

        ├── templates/

        └── charts/
```

Currently

```
charts/
```

is empty.

Later, dependencies will be downloaded into this directory.

---

# Understanding Chart Dependencies

A Helm Chart can automatically install another Helm Chart.

Example

```
Frontend

↓

API Gateway

↓

Redis

↓

PostgreSQL
```

Instead of deploying each component separately, Helm manages them together.

---

# Step 1

Open Chart Metadata.

```bash
cat helm/charts/api-gateway/Chart.yaml
```

Current

```yaml
apiVersion: v2

name: api-gateway

version: 1.0.0
```

---

# Step 2

Add a dependency section.

Example

```yaml
dependencies:

- name: redis

  version: "18.x.x"

  repository: "https://charts.bitnami.com/bitnami"
```

This tells Helm that the API Gateway depends on the Redis Helm Chart.

> **Note:** We are using Redis only as an example. We will not download external charts in this lab.

---

# Step 3

Save the file.

---

# Step 4

Validate the chart.

```bash
helm lint helm/charts/api-gateway
```

If dependency charts have not been downloaded yet, Helm may report dependency-related messages. This is expected until dependencies are updated.

---

# Step 5

View Chart Metadata.

```bash
helm show chart helm/charts/api-gateway
```

Notice

```
Dependencies
```

appear in the chart metadata.

---

# Step 6

Check the charts directory.

```bash
tree helm/charts/api-gateway/charts
```

Currently

```
(empty)
```

Dependency packages are not downloaded yet.

---

# Step 7

Download Dependencies.

```bash
helm dependency update helm/charts/api-gateway
```

Expected

```
Getting updates for unmanaged Helm repositories...

Saving charts...

Downloading redis...
```

After successful execution,

```
charts/
```

contains packaged dependency charts.

---

# Step 8

Verify Downloaded Charts.

```bash
ls helm/charts/api-gateway/charts
```

Example

```
redis-18.x.x.tgz
```

---

# Step 9

Build Dependencies.

```bash
helm dependency build helm/charts/api-gateway
```

Purpose

Rebuild dependencies using the existing lock file.

Useful in CI/CD pipelines.

---

# Step 10

Verify Dependency List.

```bash
helm dependency list helm/charts/api-gateway
```

Example

```
NAME

redis

VERSION

18.x.x

STATUS

ok
```

---

# Enterprise Project Mapping

Current

```
API Gateway
```

Future

```
Enterprise DevOps Platform

├── Frontend

├── API Gateway

│     │

│     └── Redis

├── Auth Service

└── Dashboard Service
```

Dependencies become reusable building blocks.

---

# Dependency Workflow

```
Chart.yaml

        │

        ▼

Dependency Definition

        │

        ▼

helm dependency update

        │

        ▼

charts/

        │

        ▼

Deployment
```

---

# Validation Checklist

Run

```bash
helm dependency update helm/charts/api-gateway
```

Run

```bash
helm dependency list helm/charts/api-gateway
```

Run

```bash
tree helm/charts/api-gateway/charts
```

Verify

- Dependencies downloaded
- charts directory populated
- Dependency list displayed

---

# Expected Result

Successfully understood how Helm Chart dependencies work.

Verified how supporting applications can be packaged and managed alongside the primary application.

---

# Production Best Practices

- Define dependencies in `Chart.yaml`.
- Pin dependency versions instead of using broad version ranges.
- Commit `Chart.lock` to version control.
- Review dependency updates before upgrading.
- Download dependencies during CI/CD builds rather than manually on production systems.
- Regularly update dependencies to receive security fixes.

---

# Common Mistakes

- Forgetting to update dependencies after editing `Chart.yaml`.
- Using incompatible dependency versions.
- Deleting the `charts/` directory without rebuilding dependencies.
- Ignoring `Chart.lock`.
- Depending on untrusted public chart repositories.

---

# Interview Questions

## Q1. What are Helm Chart Dependencies?

### Answer

Chart Dependencies allow one Helm Chart to include and manage other Helm Charts automatically, making complex applications easier to deploy and maintain.

---

## Q2. Which command downloads chart dependencies?

```bash
helm dependency update <chart-directory>
```

Example

```bash
helm dependency update helm/charts/api-gateway
```

---

## Q3. What is the purpose of the `charts/` directory?

### Answer

The `charts/` directory stores packaged dependency charts that are used during Helm installations. These charts are downloaded using `helm dependency update` or rebuilt using `helm dependency build`.

---

# Marathi Quick Revision

- Chart.yaml मध्ये dependencies define करतो.
- `helm dependency update` वापरून download करतो.
- charts/ directory मध्ये dependencies येतात.
- `helm dependency list` ने verify करतो.
- Production मध्ये version pin करतात.

---

# Marathi Summary (5+ Experience Revision)

या Lab मध्ये आपण Helm Chart Dependencies समजून घेतल्या. Enterprise applications अनेक supporting services वर अवलंबून असतात, जसे Redis, PostgreSQL किंवा RabbitMQ. Helm मध्ये या dependencies `Chart.yaml` मध्ये define करून `helm dependency update` द्वारे डाउनलोड करता येतात. Production मध्ये dependency versions pin करणे, `Chart.lock` version control मध्ये ठेवणे आणि CI/CD pipeline मधून dependencies build करणे ही standard DevOps practice आहे.

