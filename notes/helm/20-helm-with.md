# Helm Notes 20 - Helm with

# Enterprise DevOps Platform

---

# 1. Purpose

The purpose of this document is to understand the Helm **with** statement and how it simplifies templates by reducing repeated object references.

This is not a beginner tutorial.

This document explains how enterprise Helm Charts use the **with** statement to improve readability and maintainability.

---

# 2. Introduction

Large Helm Charts often contain deeply nested configuration.

Example

```yaml
.Values.image.repository

.Values.image.tag

.Values.image.pullPolicy
```

Writing these repeatedly makes templates

- Long
- Difficult to read
- Hard to maintain

Helm provides

```
with
```

to simplify access to nested objects.

---

# 3. Why with Exists

Suppose values.yaml contains

```yaml
image:

  repository: frontend

  tag: v2.1.0

  pullPolicy: IfNotPresent
```

Without **with**

```yaml
{{ .Values.image.repository }}

{{ .Values.image.tag }}

{{ .Values.image.pullPolicy }}
```

The object path is repeated multiple times.

With **with**

```yaml
{{ with .Values.image }}

{{ .repository }}

{{ .tag }}

{{ .pullPolicy }}

{{ end }}
```

Templates become cleaner.

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
```

Every deployment uses

- Image Repository
- Image Tag
- Pull Policy

Instead of repeatedly writing

```
.Values.image
```

Helm changes the current context using

```
with
```

---

# 5. Syntax

Basic Syntax

```yaml
{{ with OBJECT }}

...

{{ end }}
```

Inside the block

```
.
```

represents the selected object.

---

# 6. Example - Image Configuration

values.yaml

```yaml
image:

  repository: frontend

  tag: v2.0.0

  pullPolicy: Always
```

Template

```yaml
{{ with .Values.image }}

image:

  repository: {{ .repository }}

  tag: {{ .tag }}

  pullPolicy: {{ .pullPolicy }}

{{ end }}
```

Rendered Output

```yaml
image:

  repository: frontend

  tag: v2.0.0

  pullPolicy: Always
```

---

# 7. Example - Resources

values.yaml

```yaml
resources:

  limits:

    cpu: "2"

    memory: 2Gi
```

Template

```yaml
{{ with .Values.resources }}

resources:

{{ toYaml . | indent 2 }}

{{ end }}
```

The resources block is rendered only when it exists.

---

# 8. What Happens Inside with?

Before entering the block

```
.
```

represents the root object.

After entering

```yaml
{{ with .Values.image }}
```

the current context changes.

Now

```yaml
.repository
```

actually means

```yaml
.Values.image.repository
```

When the block ends,

the context returns to the root.

---

# 9. Enterprise Workflow

Developer

↓

values.yaml

↓

with Statement

↓

Context Changes

↓

Template Rendering

↓

Manifest Generation

↓

Deployment

---

# 10. Enterprise Use Cases

The **with** statement is commonly used for

- Image Configuration
- Resources
- Service Configuration
- Ingress Configuration
- Autoscaling
- Security Context
- Affinity
- Tolerations

Almost every enterprise Helm Chart uses **with**.

---

# 11. Production Scenario

A company maintained large Helm Charts.

Each Deployment contained

```yaml
.Values.resources
```

more than

```
20 times.
```

Templates became difficult to maintain.

The engineering team replaced repeated references with

```yaml
with
```

The templates became significantly shorter, easier to review and easier to debug.

---

# 12. Interview Questions

## Q1. What is the purpose of the with statement?

### Answer

The with statement changes the current template context to a specified object, reducing repeated object references and improving readability.

---

## Q2. Does with change the dot (.) context?

### Answer

Yes.

Inside the with block, the dot (`.`) refers to the selected object instead of the root context.

---

## Q3. Why do enterprises use with?

### Answer

It keeps Helm templates shorter, cleaner and easier to maintain by avoiding repeated object paths.

---

## Q4. What happens after the with block ends?

### Answer

After `{{ end }}`, the context automatically returns to the original root object.

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

- Use with for nested objects.
- Keep with blocks short.
- Use meaningful object names.
- Combine with toYaml when appropriate.
- Validate rendered manifests.
- Keep templates readable.
- Follow GitOps principles.

---

# 15. Common Mistakes

- Forgetting that the dot (`.`) context changes.
- Accessing root values incorrectly inside a with block.
- Deep nesting of with blocks.
- Hardcoding configuration.
- Ignoring template readability.
- Forgetting `{{ end }}`.

---

# 16. Marathi Quick Revision

- with म्हणजे Context बदलणे.
- Dot (`.`) नवीन object ला refer करतो.
- Repeated `.Values.image` लिहावे लागत नाही.
- Template readable बनतो.
- Enterprise Charts मध्ये खूप वापरतात.
- Block संपल्यावर Context पुन्हा Root वर येतो.

---

# 17. Marathi Summary (5+ Experience Revision)

## Simple Explanation

Helm मधील **with** statement एखाद्या object ला current context बनवतो. त्यामुळे repeated object paths लिहिण्याची गरज राहत नाही आणि templates अधिक स्वच्छ व maintainable होतात.

### Project Usage

आपल्या Enterprise DevOps Platform मध्ये image, resources, ingress, service, affinity आणि securityContext सारख्या nested configurations साठी `with` वापरला जाईल.

### Production Best Practice

Nested objects साठी नेहमी `with` वापरावा. त्यामुळे templates छोटे, readable आणि maintain करणे सोपे राहते. Context बदलतो हे नेहमी लक्षात ठेवावे.

### Production Story

एका enterprise मध्ये Deployment templates मध्ये `.Values.image` आणि `.Values.resources` अनेक वेळा लिहिले जात होते. Code review कठीण होत होता. Helm `with` वापरल्यानंतर templates जवळपास 30% लहान झाले आणि debugging जलद झाले.

### Investigation Flow

```
Read values.yaml

↓

Enter with Block

↓

Context Changes

↓

Render Nested Values

↓

Exit with Block

↓

Restore Root Context

↓

Generate Manifest

↓

Deploy
```

### 5+ Years Memory Trick

**Interview Question:**

Why is the Helm `with` statement important in enterprise Helm Charts?

**Answer:**

"The `with` statement changes the current template context to a selected object, reducing repeated object references and improving readability. It helps create cleaner, reusable and maintainable Helm templates for large enterprise deployments."

