# Helm Notes 19 - Helm range

# Enterprise DevOps Platform

---

# 1. Purpose

The purpose of this document is to understand the Helm **range** statement and how it is used to iterate over lists and maps while generating Kubernetes manifests.

This is not a beginner tutorial.

This document explains how enterprises use the **range** statement to avoid repetitive YAML and dynamically generate Kubernetes resources.

---

# 2. Introduction

In Kubernetes, many resources contain repeated data.

Examples

- Multiple Container Ports
- Multiple Environment Variables
- Multiple Volumes
- Multiple Labels
- Multiple Annotations
- Multiple Containers

Instead of writing the same YAML repeatedly,

Helm provides

```
range
```

to loop through data.

---

# 3. Why range Exists

Suppose an application exposes

```
80

443

8080
```

Without Helm

You write

```yaml
ports:

- containerPort: 80

- containerPort: 443

- containerPort: 8080
```

If tomorrow

```
9090
```

is added,

the template must be edited.

Using range,

only values.yaml changes.

---

# 4. Enterprise Problem Statement

Our Enterprise DevOps Platform has

```
Frontend

↓

Backend

↓

API Gateway
```

Each application exposes different ports.

Development

```
80
```

Production

```
80

443

8080
```

The Deployment Template should remain the same.

Only configuration changes.

---

# 5. Syntax

Basic Syntax

```yaml
{{ range LIST }}

...

{{ end }}
```

Helm loops through every item.

---

# 6. Example - Container Ports

values.yaml

```yaml
ports:

- 80

- 443

- 8080
```

Template

```yaml
ports:

{{ range .Values.ports }}

- containerPort: {{ . }}

{{ end }}
```

Rendered Output

```yaml
ports:

- containerPort: 80

- containerPort: 443

- containerPort: 8080
```

---

# 7. Example - Environment Variables

values.yaml

```yaml
env:

- name: ENV

  value: production

- name: LOG_LEVEL

  value: INFO
```

Template

```yaml
env:

{{ range .Values.env }}

- name: {{ .name }}

  value: {{ .value }}

{{ end }}
```

Rendered Output

```yaml
env:

- name: ENV

  value: production

- name: LOG_LEVEL

  value: INFO
```

---

# 8. Example - Labels

values.yaml

```yaml
labels:

  app: frontend

  team: devops

  owner: platform
```

Template

```yaml
{{ range $key, $value := .Values.labels }}

{{ $key }}: {{ $value }}

{{ end }}
```

Rendered Output

```yaml
app: frontend

team: devops

owner: platform
```

---

# 9. Enterprise Workflow

Developer

↓

Update values.yaml

↓

range Loop

↓

Template Rendering

↓

Generate Manifest

↓

Deploy

↓

Validate

The template remains unchanged.

---

# 10. Enterprise Use Cases

The range statement is commonly used for

- Container Ports
- Environment Variables
- Labels
- Annotations
- Volumes
- Volume Mounts
- Secrets
- ConfigMaps
- Multiple Containers

Almost every enterprise Helm Chart uses range.

---

# 11. Production Scenario

A company supported more than

```
50 microservices.
```

Each service exposed different ports.

Instead of maintaining separate Deployment YAML files,

one Deployment Template used

```yaml
range .Values.ports
```

Only values.yaml differed for each service.

Deployment maintenance became significantly easier.

---

# 12. Interview Questions

## Q1. What is the purpose of range in Helm?

### Answer

The range statement iterates through lists or maps and generates Kubernetes resources dynamically.

---

## Q2. Why do enterprises use range?

### Answer

It removes repetitive YAML, keeps templates reusable and supports dynamic configuration for multiple environments and services.

---

## Q3. Can range iterate over maps?

### Answer

Yes.

The range statement supports both lists and key-value maps.

Example

```yaml
{{ range $key, $value := .Values.labels }}
```

---

## Q4. What does the dot (.) represent inside range?

### Answer

Inside a range loop, the dot (`.`) refers to the current item being processed.

---

# 13. Commands

Render Templates

```bash
helm template frontend ./frontend-chart
```

Render Production Templates

```bash
helm template frontend ./frontend-chart \
-f values-prod.yaml
```

Validate Chart

```bash
helm lint frontend-chart
```

Install Chart

```bash
helm install frontend ./frontend-chart
```

---

# 14. Best Practices

- Use range for lists and maps.
- Keep loop logic simple.
- Store repeated values in values.yaml.
- Validate rendered manifests.
- Avoid duplicate YAML.
- Use descriptive variable names.
- Follow GitOps principles.

---

# 15. Common Mistakes

- Forgetting {{ end }}.
- Using range on incorrect data types.
- Hardcoding repeated values.
- Creating duplicate templates.
- Ignoring rendered output.
- Mixing configuration with template logic.

---

# 16. Marathi Quick Revision

- range म्हणजे Loop.
- List मधील प्रत्येक value वर चालतो.
- Map वरही चालतो.
- Duplicate YAML कमी करतो.
- Values.yaml मधील list वापरतो.
- Enterprise Helm Charts मध्ये खूप वापरला जातो.

---

# 17. Marathi Summary (5+ Experience Revision)

## Simple Explanation

Helm मधील **range** statement वापरून list किंवा map मधील प्रत्येक value वर loop चालवता येतो. त्यामुळे repeated Kubernetes YAML लिहिण्याची गरज राहत नाही.

### Project Usage

आपल्या Enterprise DevOps Platform मध्ये container ports, environment variables, labels, annotations, volume mounts आणि secrets dynamic तयार करण्यासाठी `range` वापरला जाईल.

### Production Best Practice

Repeated configuration नेहमी values.yaml मध्ये ठेवावी आणि templates मध्ये `range` वापरावा. Duplicate YAML कधीही लिहू नये.

### Production Story

एका enterprise मध्ये प्रत्येक microservice साठी वेगवेगळे Deployment YAML होते कारण प्रत्येक service चे ports वेगळे होते. Helm मध्ये `range` वापरल्यानंतर एकच Deployment Template ठेवण्यात आला आणि values.yaml मधील ports list वापरून manifests तयार करण्यात आले. Maintenance वेळ आणि errors दोन्ही कमी झाले.

### Investigation Flow

```
Read values.yaml

↓

Read List / Map

↓

Execute range

↓

Generate YAML

↓

Render Manifest

↓

Deploy

↓

Validate
```

### 5+ Years Memory Trick

**Interview Question:**

Why is the Helm range statement important in enterprise deployments?

**Answer:**

"The `range` statement allows Helm to iterate over lists and maps, enabling dynamic generation of Kubernetes manifests. It eliminates repetitive YAML, improves template reusability and supports scalable deployments across multiple applications and environments."

