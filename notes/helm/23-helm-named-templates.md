# Helm Notes 23 - Helm Named Templates (_helpers.tpl)

# Enterprise DevOps Platform

---

# 1. Purpose

The purpose of this document is to understand Helm Named Templates and the **_helpers.tpl** file.

This is not a beginner tutorial.

This document explains how enterprise Helm Charts avoid duplicate code by creating reusable template blocks using named templates.

---

# 2. Introduction

Large Helm Charts often contain repeated YAML.

Example

- Labels
- Names
- Annotations
- Image Names
- Selector Labels
- Full Resource Names

Instead of copying the same code into every template,

Helm provides

```
Named Templates
```

These reusable templates are usually stored inside

```
templates/_helpers.tpl
```

---

# 3. Why Named Templates Exist

Suppose every resource contains

```yaml
labels:

  app: frontend

  team: devops

  managed-by: Helm
```

The same labels appear in

- Deployment
- Service
- ConfigMap
- Secret
- Ingress
- HPA

Without Named Templates

The labels are copied into every file.

If one label changes,

every file must be edited.

Named Templates solve this problem.

---

# 4. Enterprise Problem Statement

Our Enterprise DevOps Platform contains

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

↓

Grafana
```

Every Kubernetes resource requires

- Common Labels
- Common Names
- Release Name
- Chart Version

Instead of duplicating code,

all common logic is placed inside

```
_helpers.tpl
```

---

# 5. What is _helpers.tpl?

```
_helpers.tpl
```

is a special Helm file used for storing

- Reusable Templates
- Common Labels
- Common Names
- Common Functions
- Naming Standards

It is NOT deployed to Kubernetes.

It is only used during template rendering.

---

# 6. Creating a Named Template

Example

```yaml
{{- define "frontend.labels" }}

app: frontend

team: devops

managed-by: Helm

{{- end }}
```

The

```
define
```

keyword creates a reusable template.

---

# 7. Using a Named Template

A named template is called using

```
include
```

Example

```yaml
metadata:

  labels:

{{ include "frontend.labels" . | indent 4 }}
```

Rendered Output

```yaml
metadata:

  labels:

    app: frontend

    team: devops

    managed-by: Helm
```

The same template can be reused everywhere.

---

# 8. Common Named Templates

Enterprise Helm Charts commonly create templates for

- Labels
- Selector Labels
- Full Resource Names
- Chart Names
- Service Account Names
- Image Names
- Common Annotations

This keeps templates consistent.

---

# 9. Enterprise Workflow

Developer

↓

_helpers.tpl

↓

Named Template

↓

include

↓

Template Rendering

↓

Generated Manifest

↓

Deployment

---

# 10. Enterprise Use Cases

Named Templates are used for

- Standard Labels
- Standard Annotations
- Naming Conventions
- Service Accounts
- ConfigMaps
- Secrets
- Ingress
- StatefulSets

Every production Helm Chart contains a `_helpers.tpl` file.

---

# 11. Production Scenario

A company had

```
65
```

microservices.

Every Deployment contained identical labels.

When a new compliance label

```
security: approved
```

was introduced,

engineers had to modify dozens of templates.

After introducing

```
_helpers.tpl
```

the label was added in one place.

Every Deployment, Service and ConfigMap automatically received the update.

Maintenance time reduced dramatically.

---

# 12. Interview Questions

## Q1. What is _helpers.tpl?

### Answer

`_helpers.tpl` is a special Helm template file that stores reusable named templates such as labels, annotations and naming conventions.

---

## Q2. Why do enterprises use Named Templates?

### Answer

Named Templates eliminate duplicate template code, improve consistency and simplify maintenance across large Helm Charts.

---

## Q3. Does _helpers.tpl create Kubernetes resources?

### Answer

No.

It is never deployed to Kubernetes.

It only provides reusable template definitions during rendering.

---

## Q4. How do you call a Named Template?

### Answer

Named Templates are typically called using the `include` function.

Example

```yaml
{{ include "frontend.labels" . }}
```

---

# 13. Commands

Render Templates

```bash
helm template frontend ./frontend-chart
```

Validate Chart

```bash
helm lint frontend-chart
```

Install Chart

```bash
helm install frontend ./frontend-chart
```

Package Chart

```bash
helm package frontend-chart
```

---

# 14. Best Practices

- Store reusable logic in `_helpers.tpl`.
- Keep templates small and modular.
- Reuse labels and annotations.
- Follow standard naming conventions.
- Avoid duplicate YAML.
- Keep helper templates readable.
- Test rendered manifests.

---

# 15. Common Mistakes

- Copying labels into every template.
- Creating duplicate helper functions.
- Hardcoding names.
- Forgetting to use `include`.
- Making `_helpers.tpl` too complex.
- Ignoring naming standards.

---

# 16. Marathi Quick Revision

- `_helpers.tpl` मध्ये reusable templates ठेवतात.
- Kubernetes मध्ये deploy होत नाही.
- Labels, Names, Annotations येथे ठेवतात.
- `define` ने template तयार करतात.
- `include` ने वापरतात.
- Enterprise Helm Charts मध्ये नेहमी असतो.

---

# 17. Marathi Summary (5+ Experience Revision)

## Simple Explanation

`_helpers.tpl` हा Helm मधील reusable template file आहे. Common labels, names आणि annotations एकदाच define करून सर्व templates मध्ये वापरता येतात. त्यामुळे duplicate YAML कमी होते.

### Project Usage

आपल्या Enterprise DevOps Platform मध्ये common labels, selector labels, fullname, chart name आणि service account names `_helpers.tpl` मध्ये define केले जातील. Deployment, Service, ConfigMap आणि Ingress हे सर्व त्याच helper templates वापरतील.

### Production Best Practice

Common logic नेहमी `_helpers.tpl` मध्ये ठेवावी. Duplicate labels आणि naming logic वेगवेगळ्या templates मध्ये लिहू नयेत.

### Production Story

एका enterprise मध्ये 65 microservices होते. नवीन compliance label सर्व resources मध्ये add करायचा होता. पूर्वी प्रत्येक template manually बदलावा लागत होता. `_helpers.tpl` लागू केल्यानंतर helper template एकदाच update केला आणि सर्व resources मध्ये नवीन label आपोआप आला.

### Investigation Flow

```
Need Common Logic

↓

Create Named Template

↓

Store in _helpers.tpl

↓

Use include

↓

Render Templates

↓

Generate Manifest

↓

Deploy
```

### 5+ Years Memory Trick

**Interview Question:**

Why is `_helpers.tpl` important in enterprise Helm Charts?

**Answer:**

"`_helpers.tpl` stores reusable named templates such as labels, annotations and naming conventions. It eliminates duplicate template code, improves consistency, simplifies maintenance and enables scalable Helm Chart development across enterprise Kubernetes environments."

