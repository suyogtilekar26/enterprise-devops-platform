# Helm Notes 10 - values.yaml

# Enterprise DevOps Platform

---

# 1. Purpose

The purpose of this document is to understand the values.yaml file, its importance and how it enables environment-specific configuration in enterprise Kubernetes deployments.

This is not a beginner tutorial.

This document explains why values.yaml is one of the most important files in every Helm Chart and how enterprises use it to eliminate duplicate Kubernetes manifests.

---

# 2. Introduction

One of the biggest advantages of Helm is separating

Application Logic

from

Application Configuration.

Instead of modifying Kubernetes YAML files for every environment,

Helm stores configurable values inside

```
values.yaml
```

Templates remain the same.

Only values change.

---

# 3. Why values.yaml Exists

Before Helm

Developers maintained

```
deployment-dev.yaml

deployment-qa.yaml

deployment-uat.yaml

deployment-prod.yaml
```

Almost every file was identical.

Only a few values changed

- Image Tag
- Replica Count
- Namespace
- CPU
- Memory
- Hostname

Maintaining duplicate YAML files created

- Human Errors
- Configuration Drift
- Slow Releases
- Difficult Maintenance

Helm solves this using values.yaml.

---

# 4. Enterprise Problem Statement

Suppose our Enterprise DevOps Platform has

```
Development

↓

QA

↓

UAT

↓

Production
```

Each environment requires

Development

```
Replica = 1
```

QA

```
Replica = 2
```

Production

```
Replica = 6
```

Without values.yaml

Every Deployment YAML must be modified.

With Helm

Only values files change.

---

# 5. What is values.yaml?

values.yaml stores

Application Configuration

Example

```yaml
replicaCount: 2

image:
  repository: frontend
  tag: v1.0.0

service:
  type: ClusterIP
  port: 80
```

Templates read these values during deployment.

---

# 6. Common Configuration Stored in values.yaml

Typical enterprise configuration includes

- Replica Count
- Docker Image
- Image Tag
- Namespace
- Labels
- Service Type
- Service Port
- Ingress Host
- CPU Requests
- CPU Limits
- Memory Requests
- Memory Limits
- Environment Variables
- Secrets Reference
- Resource Limits

Everything configurable belongs inside values.yaml.

---

# 7. Enterprise Workflow

Developer

↓

Build Docker Image

↓

Update Image Tag

↓

Update values.yaml

↓

Helm Upgrade

↓

Argo CD

↓

Production Kubernetes

Templates remain unchanged.

Only configuration changes.

---

# 8. Environment-Specific Values

Example

Development

```yaml
replicaCount: 1

image:
  tag: dev
```

Production

```yaml
replicaCount: 6

image:
  tag: v2.1.0
```

Same template.

Different configuration.

---

# 9. How Templates Use values.yaml

Template

```yaml
replicas: {{ .Values.replicaCount }}

image: {{ .Values.image.repository }}:{{ .Values.image.tag }}
```

Rendered Output

```yaml
replicas: 6

image: frontend:v2.1.0
```

Helm automatically replaces placeholders during deployment.

---

# 10. Enterprise Use Cases

values.yaml is commonly used for

- Multi-Environment Deployments
- CI/CD Pipelines
- GitOps
- Blue-Green Deployments
- Canary Deployments
- Resource Management
- Image Version Control
- Infrastructure Standardization

Every enterprise Helm Chart contains values.yaml.

---

# 11. Production Scenario

A company deployed the same Helm Chart to

- Development
- QA
- Production

Only the values files were different.

Development

```
Replica = 1
```

Production

```
Replica = 10
```

No template changes were required.

Deployment became faster and configuration remained consistent across all environments.

---

# 12. Interview Questions

## Q1. What is values.yaml?

### Answer

values.yaml is the configuration file of a Helm Chart. It stores environment-specific values such as image tags, replica count, ports, resource limits and other configurable parameters used during template rendering.

---

## Q2. Why is values.yaml important?

### Answer

It separates configuration from templates, eliminates duplicate YAML files, supports multiple environments and enables reusable Kubernetes deployments.

---

## Q3. Can the same Helm Chart be deployed to multiple environments?

### Answer

Yes.

The same Helm Chart can be deployed to Development, QA, UAT and Production using different values files without modifying the templates.

---

# 13. Commands

Display default values

```bash
helm show values frontend-chart
```

Install using values file

```bash
helm install frontend ./frontend-chart -f values.yaml
```

Upgrade using values file

```bash
helm upgrade frontend ./frontend-chart -f values-prod.yaml
```

---

# 14. Best Practices

- Keep templates generic.
- Store all configurable values in values.yaml.
- Create separate values files for each environment.
- Never hardcode image tags.
- Store values in Git.
- Validate values before deployment.
- Follow GitOps principles.

---

# 15. Common Mistakes

- Hardcoding values inside templates.
- Using one values file for all environments.
- Editing templates instead of values.
- Committing secrets inside values.yaml.
- Forgetting to update image tags.
- Mixing development and production configuration.

---

# 16. Marathi Quick Revision

- values.yaml मध्ये configuration असते.
- Template मध्ये logic असते.
- प्रत्येक environment साठी वेगळी values file ठेवावी.
- Image Tag values.yaml मधून बदलतो.
- YAML duplication कमी होते.
- Production मध्ये values.yaml खूप महत्त्वाचा असतो.

---

# 17. Marathi Summary (5+ Experience Revision)

## Simple Explanation

values.yaml हा Helm Chart मधील configuration file आहे. Replica Count, Image Tag, Resources, Service Port यांसारखी सर्व configurable माहिती येथे ठेवली जाते. त्यामुळे templates बदलण्याची गरज पडत नाही.

### Project Usage

आपल्या Enterprise DevOps Platform मध्ये Development, QA, UAT आणि Production साठी स्वतंत्र values files तयार केल्या जातील. GitHub Actions नवीन Docker image तयार करेल आणि Helm values file मधील image tag update करून Argo CD deployment करेल.

### Production Best Practice

Production मध्ये templates कधीही edit करू नयेत. सर्व environment-specific configuration values files मध्ये ठेवावी. Image tags, replica count आणि resource limits values.yaml मधून नियंत्रित करावेत.

### Production Story

एका enterprise मध्ये प्रत्येक environment साठी वेगळी Deployment YAML maintain केली जात होती. एका release दरम्यान QA configuration production मध्ये deploy झाली. Helm वापरल्यानंतर एकच template ठेवण्यात आला आणि प्रत्येक environment साठी स्वतंत्र values file वापरण्यात आली. त्यानंतर configuration drift पूर्णपणे कमी झाली.

### Investigation Flow

```
Deployment Request

↓

Read values.yaml

↓

Render Templates

↓

Generate Manifest

↓

Deploy

↓

Validate
```

### 5+ Years Memory Trick

**Interview Question:**

Why is values.yaml important in Helm?

**Answer:**

"values.yaml separates configuration from Kubernetes templates, enabling reusable deployments across multiple environments. It eliminates duplicate manifests, simplifies configuration management and allows CI/CD and GitOps pipelines to deploy the same Helm Chart using different environment-specific values."

