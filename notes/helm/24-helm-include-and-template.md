# Helm Notes 24 - Helm include vs template

# Enterprise DevOps Platform

---

# 1. Purpose

The purpose of this document is to understand the difference between the **include** and **template** functions in Helm.

This is not a beginner tutorial.

This document explains how enterprises reuse named templates using **include** and why it is preferred over **template** in production Helm Charts.

---

# 2. Introduction

After creating reusable templates inside

```
_helpers.tpl
```

they must be called from other templates.

Helm provides two functions

```
include

template
```

Both execute a named template.

However,

they behave differently.

Understanding the difference is a common Helm interview topic.

---

# 3. Why include and template Exist

Suppose every Kubernetes resource requires

```
Common Labels

Common Annotations

Standard Resource Names
```

Instead of duplicating YAML,

engineers create reusable templates.

These templates are called using

```
include

or

template
```

---

# 4. Enterprise Problem Statement

Our Enterprise DevOps Platform contains

```
Deployment

↓

Service

↓

Ingress

↓

ConfigMap

↓

Secret
```

Every resource requires

- Common Labels
- Standard Naming
- Chart Version
- Team Information

Instead of repeating code,

the same helper template is reused.

---

# 5. What is include?

The

```
include
```

function executes a named template

and returns the output as a string.

Because it returns a string,

the output can be modified using Helm functions.

Example

```yaml
{{ include "frontend.labels" . | indent 4 }}
```

This is the preferred approach.

---

# 6. What is template?

The

```
template
```

function also executes a named template.

Example

```yaml
{{ template "frontend.labels" . }}
```

Unlike

```
include
```

its output cannot be passed through pipeline functions.

---

# 7. Example

Named Template

```yaml
{{- define "frontend.labels" }}

app: frontend

team: devops

{{- end }}
```

Using template

```yaml
metadata:

  labels:

{{ template "frontend.labels" . }}
```

Using include

```yaml
metadata:

  labels:

{{ include "frontend.labels" . | indent 4 }}
```

The include version produces properly indented YAML.

---

# 8. Why include is Preferred

Since

```
include
```

returns a string,

it supports

- indent
- nindent
- quote
- trim
- upper
- lower

Example

```yaml
{{ include "frontend.labels" . | indent 4 }}
```

This is not possible with

```
template
```

---

# 9. Comparison

| Feature | include | template |
|----------|----------|-----------|
| Executes Named Template | Yes | Yes |
| Returns String | Yes | No |
| Supports Pipeline | Yes | No |
| Supports indent | Yes | No |
| Enterprise Preferred | Yes | Rarely |

---

# 10. Enterprise Workflow

Developer

↓

_helpers.tpl

↓

define

↓

include

↓

Template Rendering

↓

Manifest Generation

↓

Deployment

---

# 11. Enterprise Use Cases

include is commonly used for

- Labels
- Selector Labels
- Full Resource Names
- Service Accounts
- ConfigMaps
- Secrets
- Ingress
- StatefulSets

Almost every enterprise Helm Chart prefers include.

---

# 12. Production Scenario

A company migrated hundreds of Helm Charts.

Initially,

all helper templates used

```
template
```

Engineers faced indentation issues.

After replacing

```
template
```

with

```
include | indent
```

all manifests rendered correctly.

Deployment failures caused by invalid YAML disappeared.

---

# 13. Interview Questions

## Q1. What is the difference between include and template?

### Answer

Both execute named templates. However, `include` returns the rendered output as a string, allowing it to be used with pipeline functions such as `indent` and `nindent`, whereas `template` does not.

---

## Q2. Which function is preferred in enterprise Helm Charts?

### Answer

`include` is preferred because it supports pipelines and produces properly formatted YAML.

---

## Q3. Why is include commonly used with indent?

### Answer

Because include returns a string, its output can be indented correctly using the `indent` or `nindent` functions, ensuring valid YAML formatting.

---

## Q4. Does template support pipelines?

### Answer

No.

The template function does not support pipeline operations.

---

# 14. Commands

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

# 15. Best Practices

- Prefer include over template.
- Use include with indent or nindent.
- Keep helper templates reusable.
- Avoid duplicate YAML.
- Validate rendered manifests.
- Keep helper templates simple.
- Follow GitOps principles.

---

# 16. Common Mistakes

- Using template when indentation is required.
- Forgetting indent after include.
- Creating duplicate helper templates.
- Hardcoding labels.
- Ignoring YAML formatting.
- Not validating rendered manifests.

---

# 17. Marathi Quick Revision

- include आणि template दोन्ही helper template call करतात.
- include string return करतो.
- include सोबत indent वापरता येतो.
- template सोबत pipeline वापरता येत नाही.
- Enterprise मध्ये include वापरतात.
- include + indent ही Best Practice आहे.

---

# 18. Marathi Summary (5+ Experience Revision)

## Simple Explanation

`include` आणि `template` दोन्ही named templates execute करतात. पण `include` string return करतो त्यामुळे त्यावर `indent`, `nindent` सारख्या pipeline functions वापरता येतात. म्हणून production Helm Charts मध्ये `include` जास्त वापरला जातो.

### Project Usage

आपल्या Enterprise DevOps Platform मध्ये `_helpers.tpl` मधील labels, selector labels, fullname आणि service account templates `include | nindent` वापरून Deployment, Service, ConfigMap आणि Ingress मध्ये reuse केले जातील.

### Production Best Practice

Production Helm Charts मध्ये नेहमी `include` वापरावा. YAML formatting योग्य ठेवण्यासाठी `indent` किंवा `nindent` सोबतच वापरावा.

### Production Story

एका enterprise मध्ये helper templates `template` वापरून call केले जात होते. Indentation चुकीची असल्यामुळे Kubernetes manifests invalid होत होते. Engineering team ने सर्व templates `include | nindent` मध्ये migrate केले. त्यानंतर rendering errors पूर्णपणे थांबले.

### Investigation Flow

```
Need Reusable Template

↓

define (_helpers.tpl)

↓

include

↓

indent / nindent

↓

Render Template

↓

Generate Manifest

↓

Deploy

↓

Validate
```

### 5+ Years Memory Trick

**Interview Question:**

Why is `include` preferred over `template` in enterprise Helm Charts?

**Answer:**

"`include` returns the rendered template as a string, allowing it to be processed through pipeline functions like `indent` and `nindent`. This ensures correct YAML formatting, improves template flexibility and makes it the preferred choice for enterprise Helm Chart development."

