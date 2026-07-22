# Helm Notes 16 - Helm Built-in Objects

# Enterprise DevOps Platform

---

# 1. Purpose

The purpose of this document is to understand Helm Built-in Objects and how they provide dynamic information during template rendering.

This is not a beginner tutorial.

This document explains the most commonly used built-in objects in enterprise Helm Charts and how they are used in production deployments.

---

# 2. Introduction

Helm provides several built-in objects that are automatically available inside every template.

These objects contain important deployment information such as

- Release Name
- Namespace
- Chart Information
- Values
- Kubernetes Capabilities
- Template Information

Developers use these objects to build dynamic and reusable Helm Charts.

---

# 3. Why Built-in Objects Exist

Suppose every Deployment YAML contains

```yaml
namespace: production
```

If the application is deployed to

```
Development

QA

UAT

Production
```

The namespace must be edited manually.

Instead, Helm provides

```yaml
{{ .Release.Namespace }}
```

Now the namespace is automatically determined during deployment.

---

# 4. Enterprise Problem Statement

Our Enterprise DevOps Platform deploys

```
Frontend

Backend

Redis

RabbitMQ

Prometheus

Grafana
```

Each application is installed into different namespaces.

Instead of hardcoding values,

Helm Built-in Objects automatically provide deployment information.

---

# 5. Common Built-in Objects

The most frequently used objects are

```
.Values

.Release

.Chart

.Capabilities

.Template

.Files
```

These are available in every Helm template.

---

# 6. .Values Object

The .Values object reads configuration from

```
values.yaml
```

Example

```yaml
replicas: {{ .Values.replicaCount }}

image: {{ .Values.image.repository }}:{{ .Values.image.tag }}
```

This is the most commonly used built-in object.

---

# 7. .Release Object

The .Release object contains release-specific information.

Common properties

```yaml
{{ .Release.Name }}

{{ .Release.Namespace }}

{{ .Release.Service }}

{{ .Release.Revision }}
```

Example

```yaml
metadata:

  namespace: {{ .Release.Namespace }}
```

---

# 8. .Chart Object

The .Chart object provides information from

```
Chart.yaml
```

Example

```yaml
{{ .Chart.Name }}

{{ .Chart.Version }}

{{ .Chart.AppVersion }}
```

Useful for labels and annotations.

---

# 9. .Capabilities Object

The .Capabilities object provides Kubernetes cluster information.

Example

```yaml
{{ .Capabilities.KubeVersion.Version }}
```

Useful when supporting multiple Kubernetes versions.

---

# 10. .Template Object

The .Template object contains template metadata.

Example

```yaml
{{ .Template.Name }}
```

Useful during debugging and logging.

---

# 11. .Files Object

The .Files object reads files packaged inside the Helm Chart.

Example

```yaml
{{ .Files.Get "config/app.properties" }}
```

Commonly used for

- ConfigMaps
- Application Configuration
- Static Files

---

# 12. Enterprise Workflow

Developer

↓

values.yaml

↓

Built-in Objects

↓

Template Rendering

↓

Generated Manifest

↓

Kubernetes API Server

Built-in objects provide deployment metadata automatically.

---

# 13. Enterprise Use Cases

Built-in Objects are used for

- Dynamic Namespaces
- Dynamic Image Tags
- Labels
- Annotations
- ConfigMaps
- Secrets
- Version Management
- Multi-Cluster Deployments

Every enterprise Helm Chart uses Built-in Objects.

---

# 14. Production Scenario

A company deployed the same Helm Chart to

```
dev

qa

uat

production
```

Instead of maintaining four namespace values,

the Deployment Template used

```yaml
namespace: {{ .Release.Namespace }}
```

Now the namespace was automatically assigned during installation.

The same Chart successfully deployed to every environment.

---

# 15. Interview Questions

## Q1. What are Helm Built-in Objects?

### Answer

Helm Built-in Objects are predefined variables that provide deployment information such as values, release metadata, chart details and Kubernetes cluster capabilities during template rendering.

---

## Q2. Which Built-in Object is used most frequently?

### Answer

The `.Values` object is the most frequently used because it provides access to configuration stored in values.yaml.

---

## Q3. What is the purpose of the .Release object?

### Answer

The `.Release` object provides release-specific information such as release name, namespace, revision and deployment service.

---

## Q4. When is the .Chart object used?

### Answer

The `.Chart` object is used to access metadata defined in Chart.yaml such as chart name, version and application version.

---

# 16. Commands

Render Templates

```bash
helm template frontend ./frontend-chart
```

Install Chart

```bash
helm install frontend ./frontend-chart
```

Upgrade Chart

```bash
helm upgrade frontend ./frontend-chart
```

View Values

```bash
helm show values frontend-chart
```

---

# 17. Best Practices

- Use `.Values` for all configurable parameters.
- Avoid hardcoding namespaces.
- Use `.Release.Namespace` dynamically.
- Use `.Chart.Version` for labels.
- Keep templates reusable.
- Validate rendered manifests.
- Follow GitOps principles.

---

# 18. Common Mistakes

- Hardcoding namespace names.
- Ignoring built-in objects.
- Storing metadata inside templates.
- Duplicating chart information.
- Editing templates for every environment.
- Not using `.Values` for configuration.

---

# 19. Marathi Quick Revision

- `.Values` → values.yaml मधील values.
- `.Release` → Release माहिती.
- `.Chart` → Chart.yaml माहिती.
- `.Capabilities` → Kubernetes Version.
- `.Template` → Template माहिती.
- `.Files` → Chart मधील files वाचण्यासाठी.

---

# 20. Marathi Summary (5+ Experience Revision)

## Simple Explanation

Helm Built-in Objects म्हणजे Helm ने आधीपासून उपलब्ध करून दिलेली variables आहेत. यांचा वापर करून templates dynamic बनवले जातात. त्यामुळे hardcoding टाळता येते आणि Chart सर्व environments मध्ये reusable राहतो.

### Project Usage

आपल्या Enterprise DevOps Platform मध्ये `.Values` वापरून image tag, replica count आणि resources घेण्यात येतील. `.Release.Namespace` वापरून namespace dynamic ठेवला जाईल. `.Chart.Version` labels मध्ये वापरली जाईल.

### Production Best Practice

Hardcoded values टाळाव्यात. Built-in Objects वापरून templates reusable ठेवावेत. Release आणि Chart metadata manually लिहू नये.

### Production Story

एका enterprise मध्ये प्रत्येक environment साठी namespace manually बदलला जात होता. एका release दरम्यान production namespace चुकीचा टाकल्यामुळे deployment fail झाला. नंतर `.Release.Namespace` वापरण्यात आला आणि namespace selection पूर्णपणे automated झाले.

### Investigation Flow

```
Deployment Started

↓

Read Built-in Objects

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

What are the most important Helm Built-in Objects used in enterprise deployments?

**Answer:**

"The most commonly used Helm Built-in Objects are `.Values`, `.Release`, `.Chart`, `.Capabilities`, `.Template` and `.Files`. They provide configuration, release metadata, chart information and Kubernetes cluster details, enabling reusable, dynamic and production-ready Helm Charts."

