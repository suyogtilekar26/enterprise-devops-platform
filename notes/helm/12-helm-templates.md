# Helm Notes 12 - Helm Templates

# Enterprise DevOps Platform

---

# 1. Purpose

The purpose of this document is to understand Helm Templates, how they work and why they eliminate duplicate Kubernetes YAML files in enterprise environments.

This is not a beginner tutorial.

This document explains how Helm Templates generate Kubernetes manifests dynamically using values files.

---

# 2. Introduction

Templates are the heart of Helm.

A Helm Template is a Kubernetes YAML file containing placeholders.

Instead of hardcoding values,

Helm replaces placeholders with values from

```
values.yaml
```

during deployment.

This allows one template to deploy applications across multiple environments.

---

# 3. Why Templates Were Created

Before Helm

Developers maintained

```
deployment-dev.yaml

deployment-qa.yaml

deployment-uat.yaml

deployment-prod.yaml
```

Every file looked almost identical.

Only a few values changed

- Replica Count
- Image Tag
- Namespace
- Resources
- Hostname

Maintaining duplicate YAML files increased

- Human Errors
- Configuration Drift
- Maintenance Effort

Templates solve this problem.

---

# 4. Enterprise Problem Statement

Suppose our Enterprise DevOps Platform contains

```
Development

↓

QA

↓

Production
```

Development

```
Replica = 1
```

Production

```
Replica = 8
```

Without Templates

Different Deployment YAML files are required.

With Templates

Only values files change.

---

# 5. What is a Template?

A Template is a Kubernetes manifest containing Helm expressions.

Example

```yaml
apiVersion: apps/v1

kind: Deployment

metadata:
  name: frontend
```

Instead of hardcoded values

Helm uses

```yaml
replicas: {{ .Values.replicaCount }}
```

During deployment,

Helm replaces the placeholder.

---

# 6. Template Rendering

Template

```yaml
replicas: {{ .Values.replicaCount }}

image: {{ .Values.image.repository }}:{{ .Values.image.tag }}
```

values.yaml

```yaml
replicaCount: 4

image:
  repository: frontend
  tag: v2.0.0
```

Rendered Output

```yaml
replicas: 4

image: frontend:v2.0.0
```

The generated manifest is sent to the Kubernetes API Server.

---

# 7. Enterprise Workflow

Developer

↓

Update values.yaml

↓

Helm Reads Template

↓

Replace Variables

↓

Generate Kubernetes YAML

↓

API Server

↓

Pods Created

Templates never change.

Only configuration changes.

---

# 8. Common Template Variables

Examples

Replica Count

```yaml
{{ .Values.replicaCount }}
```

Image Repository

```yaml
{{ .Values.image.repository }}
```

Image Tag

```yaml
{{ .Values.image.tag }}
```

Service Port

```yaml
{{ .Values.service.port }}
```

Namespace

```yaml
{{ .Release.Namespace }}
```

Release Name

```yaml
{{ .Release.Name }}
```

---

# 9. Benefits of Templates

### Reusability

One template supports multiple environments.

---

### Consistency

No duplicate YAML files.

---

### Easy Maintenance

Update one template instead of many files.

---

### GitOps Ready

Templates integrate directly with Argo CD.

---

### CI/CD Friendly

Pipelines inject environment-specific values automatically.

---

# 10. Enterprise Use Cases

Templates are used for

- Deployments
- Services
- ConfigMaps
- Secrets
- Ingress
- StatefulSets
- Jobs
- CronJobs
- Network Policies

Every enterprise Helm Chart uses templates.

---

# 11. Production Scenario

A company maintained four Deployment YAML files.

A security update required adding one annotation.

Engineers modified only

```
deployment-prod.yaml
```

The remaining environments became inconsistent.

After migrating to Helm,

one Deployment Template was maintained.

All environments automatically received the update.

---

# 12. Interview Questions

## Q1. What are Helm Templates?

### Answer

Helm Templates are Kubernetes manifests containing placeholders that are dynamically replaced with values during deployment to generate environment-specific Kubernetes resources.

---

## Q2. Why are Templates important?

### Answer

Templates eliminate duplicate Kubernetes YAML files, simplify maintenance, improve consistency and support reusable deployments across multiple environments.

---

## Q3. What happens during Template rendering?

### Answer

Helm reads the template, replaces placeholders using values.yaml, generates Kubernetes manifests and sends them to the Kubernetes API Server for deployment.

---

# 13. Commands

Generate manifests

```bash
helm template frontend ./frontend-chart
```

Generate using Production values

```bash
helm template frontend ./frontend-chart -f values-prod.yaml
```

Validate Chart

```bash
helm lint frontend-chart
```

---

# 14. Best Practices

- Keep templates generic.
- Store configuration in values files.
- Avoid hardcoded values.
- Reuse templates.
- Validate rendered manifests.
- Store templates in Git.
- Follow GitOps principles.

---

# 15. Common Mistakes

- Hardcoding values.
- Creating duplicate templates.
- Editing rendered YAML.
- Mixing template logic with configuration.
- Ignoring template validation.
- Overcomplicating template expressions.

---

# 16. Marathi Quick Revision

- Template म्हणजे Dynamic Kubernetes YAML.
- values.yaml मधून values घेतल्या जातात.
- Duplicate YAML कमी होतात.
- Template एकच असतो.
- Environment नुसार values बदलतात.
- Production मध्ये Templates खूप महत्त्वाचे असतात.

---

# 17. Marathi Summary (5+ Experience Revision)

## Simple Explanation

Helm Template म्हणजे Kubernetes YAML file ज्यामध्ये placeholders असतात. Deployment वेळी Helm values.yaml मधील values वापरून final Kubernetes manifest तयार करतो.

### Project Usage

आपल्या Enterprise DevOps Platform मध्ये प्रत्येक Deployment, Service, ConfigMap आणि Ingress Template स्वरूपात तयार केला जाईल. Development, QA, UAT आणि Production साठी फक्त values files बदलतील.

### Production Best Practice

Templates मध्ये business configuration ठेवू नये. सर्व configurable values values.yaml मध्ये ठेवाव्यात. Templates reusable आणि simple ठेवावेत.

### Production Story

एका enterprise मध्ये प्रत्येक environment साठी वेगळे Deployment YAML maintain केले जात होते. एका security update दरम्यान Production YAML update झाली पण QA आणि UAT update झाली नाहीत. Helm Templates लागू केल्यानंतर एकच Template maintain करण्यात आला आणि सर्व environments मध्ये consistency मिळाली.

### Investigation Flow

```
Template

↓

Read values.yaml

↓

Replace Variables

↓

Generate Manifest

↓

Deploy

↓

Validate
```

### 5+ Years Memory Trick

**Interview Question:**

Why are Helm Templates important in enterprise Kubernetes?

**Answer:**

"Helm Templates separate application configuration from Kubernetes manifests by using dynamic placeholders. This eliminates duplicate YAML files, ensures deployment consistency, supports multiple environments and enables scalable CI/CD and GitOps automation."

