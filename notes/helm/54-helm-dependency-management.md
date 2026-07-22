# Helm Notes 54 - Helm Dependency Management

# Enterprise DevOps Platform

---

# 1. Purpose

The purpose of this document is to understand **Helm Dependency Management**, how parent and child charts work, and how enterprise DevOps teams manage reusable application components.

This is not a beginner tutorial.

This document explains one of the most important enterprise Helm concepts frequently asked in 5+ years DevOps interviews.

---

# 2. Introduction

Imagine our Enterprise DevOps Platform.

Instead of deploying only one application,

we deploy

```
Frontend

↓

Backend

↓

Redis

↓

RabbitMQ

↓

PostgreSQL

↓

Prometheus

↓

Grafana
```

Question

```
Should we write

one huge chart?

OR

multiple reusable charts?
```

Enterprise answer

```
Multiple Charts

+

Dependencies
```

This is called

```
Helm Dependency Management
```

---

# 3. Why Dependency Management Exists

Imagine

100 applications.

Every application requires

```
Redis

↓

PostgreSQL

↓

Ingress

↓

Monitoring
```

Without dependencies,

every team copies

```
Deployment YAML

↓

Service YAML

↓

ConfigMaps

↓

Secrets
```

Problems

```
Duplicate Code

↓

Maintenance Difficult

↓

Version Mismatch

↓

Deployment Errors
```

Dependencies solve these problems.

---

# 4. Enterprise Problem Statement

Our Enterprise DevOps Platform

```
enterprise-platform

│

├── frontend

├── backend

├── redis

├── rabbitmq

├── postgresql

├── prometheus

└── grafana
```

Instead of writing everything inside

```
enterprise-platform
```

we reuse existing charts.

---

# 5. What is a Helm Dependency?

A dependency is

```
One Helm Chart

↓

Used Inside

Another Helm Chart
```

Terminology

```
Parent Chart

↓

Uses

↓

Child Chart
```

Example

```
Enterprise Platform

↓

Backend

↓

Redis

↓

PostgreSQL
```

Backend depends on

```
Redis

+

PostgreSQL
```

---

# 6. Defining Dependencies

Dependencies are defined in

```
Chart.yaml
```

Example

```yaml
dependencies:

- name: redis
  version: "21.0.0"
  repository: "https://charts.bitnami.com/bitnami"

- name: postgresql
  version: "17.1.0"
  repository: "https://charts.bitnami.com/bitnami"
```

This tells Helm

```
Download

↓

Install

↓

Manage
```

both charts.

---

# 7. Download Dependencies

Command

```bash
helm dependency update
```

What happens

```
Read Chart.yaml

↓

Download Child Charts

↓

Store in charts/

↓

Create Chart.lock
```

Folder structure

```
my-chart

│

├── Chart.yaml

├── Chart.lock

├── charts/

│   ├── redis-21.0.0.tgz

│   └── postgresql-17.1.0.tgz

└── templates/
```

---

# 8. Dependency Commands

Download

```bash
helm dependency update
```

Build

```bash
helm dependency build
```

List files

```bash
tree
```

Verify

```bash
ls charts/
```

---

# 9. Enterprise Workflow

```
Developer

↓

Update Chart.yaml

↓

helm dependency update

↓

Download Child Charts

↓

Commit Chart.lock

↓

Git Push

↓

CI/CD

↓

helm install

↓

Deploy Parent

↓

Deploy Children
```

---

# 10. Enterprise Use Cases

Dependencies are used for

- Redis
- PostgreSQL
- RabbitMQ
- Kafka
- NGINX Ingress
- Prometheus
- Grafana
- Loki
- Elasticsearch
- Vault

Most enterprise platforms use dependency charts instead of rewriting them.

---

# 11. Production Scenario

A banking application required

```
Backend

↓

Redis

↓

PostgreSQL
```

Initially,

developers manually maintained three separate deployments.

Versions became inconsistent.

Platform Team converted the Backend chart into a parent chart and declared Redis and PostgreSQL as dependencies.

Now

```
helm dependency update

↓

helm upgrade

↓

Entire Platform Installed
```

Deployment became standardized across Dev, QA and Production.

---

# 12. Interview Questions

## Q1. What is a Helm Dependency?

### Answer

A Helm Dependency is a child chart referenced by a parent chart and managed automatically during deployment.

---

## Q2. Where are dependencies defined?

### Answer

Inside

```
Chart.yaml
```

under the

```
dependencies:
```

section.

---

## Q3. Which command downloads dependencies?

### Answer

```bash
helm dependency update
```

---

## Q4. What is Chart.lock?

### Answer

Chart.lock stores the resolved dependency versions to ensure consistent deployments across environments.

---

## Q5. Why do enterprises use dependency charts?

### Answer

They improve reusability, standardization, version management and reduce duplicated configuration.

---

# 13. Commands

Update Dependencies

```bash
helm dependency update
```

Build Dependencies

```bash
helm dependency build
```

List Charts

```bash
ls charts/
```

View Structure

```bash
tree
```

Install

```bash
helm install enterprise-platform .
```

Upgrade

```bash
helm upgrade enterprise-platform .
```

---

# 14. Best Practices

- Pin dependency versions.
- Commit Chart.lock to Git.
- Use trusted repositories.
- Avoid modifying downloaded child charts directly.
- Regularly update dependencies after testing.
- Scan dependency charts for vulnerabilities.
- Document dependency versions.

---

# 15. Common Mistakes

- Forgetting `helm dependency update`.
- Not committing Chart.lock.
- Using floating versions.
- Editing packaged child charts manually.
- Mixing incompatible dependency versions.
- Downloading charts from untrusted repositories.

---

# 16. Marathi Quick Revision

- Dependency म्हणजे Parent Chart मधून वापरलेला Child Chart.
- Dependency `Chart.yaml` मध्ये define करतात.
- `helm dependency update` charts download करतो.
- Child charts `charts/` मध्ये साठवले जातात.
- `Chart.lock` version lock ठेवतो.
- Enterprise मध्ये Redis, PostgreSQL सारख्या charts dependency म्हणून वापरतात.

---

# 17. Marathi Summary (5+ Experience Revision)

## Simple Explanation

Helm Dependency Management मुळे एका Parent Chart मध्ये अनेक Child Charts वापरता येतात. त्यामुळे Redis, PostgreSQL, RabbitMQ सारख्या reusable applications पुन्हा लिहाव्या लागत नाहीत.

### Project Usage

आपल्या Enterprise DevOps Platform मध्ये `enterprise-platform` हा Parent Chart असेल. Backend, Redis, PostgreSQL, RabbitMQ, Prometheus आणि Grafana हे Child Charts dependency म्हणून वापरले जातील. CI/CD मध्ये `helm dependency update` चालवून सर्व dependencies डाउनलोड केल्या जातील.

### Production Best Practice

Dependency versions नेहमी pin कराव्यात. `Chart.lock` Git मध्ये commit करावा. Trusted repositories वापराव्यात. Child Charts manually edit करू नयेत.

### Production Story

एका enterprise मध्ये प्रत्येक team स्वतःचा Redis deployment maintain करत होती. Version mismatch मुळे production issues येत होते. Platform Team ने Bitnami Redis chart dependency म्हणून वापरला. सर्व environments मध्ये एकसारखी Redis deployment मिळाली आणि maintenance effort मोठ्या प्रमाणात कमी झाला.

### Investigation Flow

```
Deployment Failed

↓

Check Chart.yaml

↓

Verify Dependency Version

↓

helm dependency update

↓

Check charts/

↓

Verify Chart.lock

↓

Deploy Again

↓

Validate Application
```

### 5+ Years Memory Trick

**Interview Question:**

How do you manage Helm dependencies in an enterprise Kubernetes platform?

**Answer:**

"In enterprise environments, I define reusable services like Redis, PostgreSQL and RabbitMQ as child chart dependencies in `Chart.yaml`. I use `helm dependency update` to download them, commit the generated `Chart.lock` for version consistency and deploy everything through the parent chart. This provides standardized, repeatable and maintainable deployments across all environments."

