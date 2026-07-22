# Helm Notes 21 - Helm Variables

# Enterprise DevOps Platform

---

# 1. Purpose

The purpose of this document is to understand Helm Variables and how they simplify complex templates by storing reusable values.

This is not a beginner tutorial.

This document explains how enterprise Helm Charts use variables to improve readability, avoid repetition and simplify template logic.

---

# 2. Introduction

Large Helm templates often repeat the same value multiple times.

Example

```yaml
{{ .Release.Name }}

{{ .Release.Name }}

{{ .Release.Name }}
```

Writing the same expression repeatedly

- Makes templates lengthy
- Reduces readability
- Increases maintenance effort

Helm allows values to be stored in variables.

---

# 3. Why Variables Exist

Suppose the release name is required in

- Deployment
- Service
- ConfigMap
- Secret
- Ingress

Instead of repeatedly writing

```yaml
{{ .Release.Name }}
```

Helm stores it in a variable.

Example

```yaml
{{- $release := .Release.Name -}}
```

Now it can be reused anywhere.

---

# 4. Enterprise Problem Statement

Our Enterprise DevOps Platform deploys

```
Frontend

↓

Backend

↓

Redis

↓

RabbitMQ

↓

Prometheus
```

Every Kubernetes resource requires

- Release Name
- Namespace
- Labels
- Team Name

Instead of repeating long object references,

variables simplify the template.

---

# 5. Variable Syntax

Basic Syntax

```yaml
{{- $variable := VALUE -}}
```

Example

```yaml
{{- $name := .Release.Name -}}
```

Variable names always begin with

```
$
```

---

# 6. Example - Release Name

Template

```yaml
{{- $release := .Release.Name -}}

metadata:

  name: {{ $release }}
```

Rendered Output

```yaml
metadata:

  name: frontend
```

The variable can be reused anywhere in the template.

---

# 7. Example - Image Repository

values.yaml

```yaml
image:

  repository: frontend

  tag: v2.0.0
```

Template

```yaml
{{- $image := .Values.image.repository -}}

image:

  repository: {{ $image }}
```

Rendered Output

```yaml
image:

  repository: frontend
```

---

# 8. Variables Inside range

Example

```yaml
{{- $release := .Release.Name -}}

{{ range .Values.ports }}

- name: {{ $release }}

  containerPort: {{ . }}

{{ end }}
```

Even inside a `range` loop,

variables remain accessible.

---

# 9. Variables Inside with

Example

```yaml
{{- $release := .Release.Name -}}

{{ with .Values.image }}

repository: {{ .repository }}

release: {{ $release }}

{{ end }}
```

Even though the context changes,

variables still work.

---

# 10. Enterprise Workflow

Developer

↓

Declare Variables

↓

Template Rendering

↓

Reuse Variables

↓

Generate Manifest

↓

Deploy

Variables improve readability without changing deployment logic.

---

# 11. Enterprise Use Cases

Variables are commonly used for

- Release Name
- Namespace
- Labels
- Image Repository
- Team Name
- Common Annotations
- Cluster Name
- Environment Name

Every enterprise Helm Chart uses variables.

---

# 12. Production Scenario

A company maintained a large Helm Chart with more than

```
40
```

references to

```yaml
.Release.Name
```

During a review,

engineers introduced

```yaml
{{- $release := .Release.Name -}}
```

All repeated references were replaced with

```yaml
{{ $release }}
```

The template became much cleaner and easier to maintain.

---

# 13. Interview Questions

## Q1. What are Helm Variables?

### Answer

Helm Variables store values in reusable identifiers, reducing repeated expressions and improving template readability.

---

## Q2. How are variables declared?

### Answer

Variables are declared using the `:=` operator.

Example

```yaml
{{- $name := .Release.Name -}}
```

---

## Q3. Why do enterprises use variables?

### Answer

Variables simplify templates, reduce repetition and make large Helm Charts easier to maintain.

---

## Q4. Are variables accessible inside range and with?

### Answer

Yes.

Variables declared outside a `range` or `with` block remain accessible inside those blocks.

---

# 14. Commands

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

# 15. Best Practices

- Use variables for repeated values.
- Give variables meaningful names.
- Keep variable scope simple.
- Avoid unnecessary variables.
- Use variables with range and with.
- Validate rendered manifests.
- Follow GitOps principles.

---

# 16. Common Mistakes

- Forgetting the `$` prefix.
- Declaring unnecessary variables.
- Using unclear variable names.
- Repeating long object references.
- Confusing variables with `.Values`.
- Ignoring template readability.

---

# 17. Marathi Quick Revision

- Variable `$` ने सुरू होतो.
- `:=` वापरून declare करतात.
- Repeated values साठी वापरतात.
- `range` आणि `with` मध्येही वापरता येतो.
- Template readable बनतो.
- Enterprise Charts मध्ये मोठ्या प्रमाणात वापरतात.

---

# 18. Marathi Summary (5+ Experience Revision)

## Simple Explanation

Helm Variables वापरून repeated values एका variable मध्ये store करता येतात. त्यामुळे templates छोटे, readable आणि maintain करणे सोपे होते.

### Project Usage

आपल्या Enterprise DevOps Platform मध्ये Release Name, Namespace, Labels, Image Repository आणि Team Name सारख्या repeated values variables मध्ये store करून सर्व templates मध्ये reuse केल्या जातील.

### Production Best Practice

Repeated expressions साठी नेहमी variables वापरावेत. Variable names स्पष्ट आणि meaningful असावीत. अनावश्यक variables तयार करू नयेत.

### Production Story

एका enterprise मध्ये प्रत्येक template मध्ये `.Release.Name` आणि `.Release.Namespace` अनेक वेळा लिहिले जात होते. Code review दरम्यान variables वापरून हे references replace करण्यात आले. Template size कमी झाला, readability वाढली आणि maintenance सोपी झाली.

### Investigation Flow

```
Read Template

↓

Declare Variables

↓

Reuse Variables

↓

Render Manifest

↓

Deploy

↓

Validate
```

### 5+ Years Memory Trick

**Interview Question:**

Why are Helm Variables important in enterprise Helm Charts?

**Answer:**

"Helm Variables store reusable values that reduce repeated template expressions, improve readability and simplify maintenance. They are especially useful in large enterprise Helm Charts where the same values are referenced multiple times across Kubernetes resources."

