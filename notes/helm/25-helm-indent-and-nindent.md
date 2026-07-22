# Helm Notes 25 - Helm indent vs nindent

# Enterprise DevOps Platform

---

# 1. Purpose

The purpose of this document is to understand the **indent** and **nindent** functions in Helm and why they are essential for generating valid Kubernetes YAML.

This is not a beginner tutorial.

This document explains how enterprise Helm Charts use **indent** and **nindent** to format reusable templates correctly and avoid YAML parsing errors.

---

# 2. Introduction

Helm generates Kubernetes YAML dynamically.

YAML is whitespace-sensitive.

Even a small indentation mistake can result in

```
Error converting YAML to JSON

mapping values are not allowed

did not find expected key
```

To solve this,

Helm provides

```
indent

nindent
```

These functions format generated YAML correctly.

---

# 3. Why indent and nindent Exist

Suppose we have a helper template

```yaml
app: frontend

team: devops
```

and we include it inside

```yaml
metadata:

  labels:
```

Without indentation

Rendered YAML becomes invalid.

Helm automatically fixes indentation using

```
indent

or

nindent
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
```

Every resource includes

- Labels
- Selector Labels
- Annotations

These reusable templates must align correctly inside YAML.

Otherwise,

deployment fails.

---

# 5. What is indent?

The

```
indent
```

function adds spaces before every line.

Syntax

```yaml
{{ include "frontend.labels" . | indent 4 }}
```

Example

Input

```yaml
app: frontend

team: devops
```

Output

```yaml
    app: frontend

    team: devops
```

---

# 6. What is nindent?

The

```
nindent
```

function

- Adds a new line
- Then indents every line

Syntax

```yaml
{{ include "frontend.labels" . | nindent 4 }}
```

This is the most commonly used function in enterprise Helm Charts.

---

# 7. Difference Between indent and nindent

Suppose

```yaml
labels:
```

Using indent

```yaml
labels:{{ include "frontend.labels" . | indent 2 }}
```

Output

```yaml
labels:  app: frontend
```

Invalid YAML.

Using nindent

```yaml
labels:{{ include "frontend.labels" . | nindent 2 }}
```

Output

```yaml
labels:

  app: frontend

  team: devops
```

Valid YAML.

---

# 8. Comparison

| Feature | indent | nindent |
|----------|--------|----------|
| Adds Spaces | Yes | Yes |
| Adds New Line | No | Yes |
| Pipeline Support | Yes | Yes |
| Used with include | Yes | Yes |
| Enterprise Preferred | Sometimes | Yes |

---

# 9. Enterprise Workflow

Developer

↓

_helpers.tpl

↓

include

↓

nindent

↓

Render Template

↓

Generate YAML

↓

Deploy

Proper indentation guarantees valid manifests.

---

# 10. Enterprise Use Cases

indent and nindent are commonly used for

- Labels
- Annotations
- Resources
- Affinity
- Tolerations
- Node Selectors
- Security Context
- ConfigMaps

Almost every enterprise Helm Chart uses nindent.

---

# 11. Production Scenario

A production deployment failed with

```
error converting YAML to JSON
```

Investigation showed

```yaml
labels:
{{ include "frontend.labels" . }}
```

The helper template was not indented.

After changing it to

```yaml
labels:
{{ include "frontend.labels" . | nindent 2 }}
```

the manifest became valid and deployment succeeded.

Root Cause

Incorrect YAML indentation.

---

# 12. Interview Questions

## Q1. What is indent in Helm?

### Answer

The `indent` function adds a specified number of spaces before every line of the rendered output.

---

## Q2. What is nindent?

### Answer

The `nindent` function inserts a new line before the rendered output and then indents every line by the specified number of spaces.

---

## Q3. Why is nindent preferred?

### Answer

Because it produces correctly formatted YAML when inserting reusable templates inside nested YAML structures.

---

## Q4. When should indent be used?

### Answer

Indent is useful when a new line is not required. However, in most Kubernetes manifests, `nindent` is preferred because YAML usually requires a new line before nested content.

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

Dry Run

```bash
helm install frontend ./frontend-chart \
--dry-run
```

---

# 14. Best Practices

- Prefer `nindent` for Kubernetes YAML.
- Use `include | nindent`.
- Validate rendered manifests.
- Keep helper templates reusable.
- Follow YAML indentation rules.
- Test templates using `helm template`.
- Follow GitOps principles.

---

# 15. Common Mistakes

- Forgetting indentation.
- Using include without nindent.
- Mixing tabs and spaces.
- Incorrect indentation levels.
- Ignoring YAML parser errors.
- Not validating rendered output.

---

# 16. Marathi Quick Revision

- indent → फक्त spaces add करतो.
- nindent → New Line + Spaces add करतो.
- include सोबत nindent वापरणे Best Practice.
- YAML indentation चुकीची असेल तर deployment fail होतो.
- Enterprise मध्ये nindent जास्त वापरतात.
- helm template ने नेहमी verify करा.

---

# 17. Marathi Summary (5+ Experience Revision)

## Simple Explanation

`indent` आणि `nindent` हे Helm functions generated YAML योग्य format मध्ये ठेवण्यासाठी वापरले जातात. `nindent` नवीन line देतो आणि indentation करतो, त्यामुळे Kubernetes manifests valid राहतात.

### Project Usage

आपल्या Enterprise DevOps Platform मध्ये `_helpers.tpl` मधील labels, annotations, affinity, resources आणि securityContext Deployment, Service आणि Ingress मध्ये `include | nindent` वापरून include केले जातील.

### Production Best Practice

Production मध्ये helper templates नेहमी `include | nindent` वापरून include करावेत. प्रत्येक deployment पूर्वी `helm template` वापरून rendered YAML verify करावा.

### Production Story

एका enterprise मध्ये ConfigMap deployment वारंवार fail होत होता. Investigation दरम्यान YAML indentation चुकीची असल्याचे आढळले. `include` ऐवजी `include | nindent` वापरल्यानंतर सर्व manifests valid झाले आणि deployment errors पूर्णपणे थांबले.

### Investigation Flow

```
Deployment Failed

↓

Run helm template

↓

Check YAML Indentation

↓

Verify include

↓

Add nindent

↓

Render Again

↓

Deploy

↓

Validate
```

### 5+ Years Memory Trick

**Interview Question:**

Why is `nindent` preferred over `indent` in enterprise Helm Charts?

**Answer:**

"`nindent` inserts a new line before indenting the rendered output, producing correctly structured Kubernetes YAML. It is the preferred function for including reusable templates because it prevents YAML formatting errors and ensures reliable production deployments."

