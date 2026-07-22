# Helm Notes 17 - Helm Control Structures

# Enterprise DevOps Platform

---

# 1. Purpose

The purpose of this document is to understand Helm Control Structures and how they are used to create dynamic Kubernetes manifests.

This is not a beginner tutorial.

This document explains how enterprise Helm Charts use conditional statements and loops to generate different Kubernetes resources based on configuration.

---

# 2. Introduction

Not every Kubernetes resource should always be deployed.

For example

- Ingress may be optional.
- Autoscaling may be optional.
- Monitoring may be enabled only in Production.
- ServiceAccount may be created only when required.

Helm provides

```
Control Structures
```

to make deployment decisions dynamically.

---

# 3. Why Control Structures Exist

Suppose your application supports

```
Ingress Enabled

or

Ingress Disabled
```

Without Helm

You need two Deployment files.

With Helm

One template decides whether to generate the Ingress resource.

This reduces duplicate YAML files.

---

# 4. Enterprise Problem Statement

Our Enterprise DevOps Platform supports

```
Development

↓

QA

↓

Production
```

Development

```
Ingress Disabled

HPA Disabled
```

Production

```
Ingress Enabled

HPA Enabled
```

Instead of maintaining different templates,

Helm uses Control Structures.

---

# 5. Types of Control Structures

Helm provides

```
if

else

with

range
```

These are the most commonly used control structures.

---

# 6. if Statement

The if statement executes a block only when the condition is true.

Example

Template

```yaml
{{- if .Values.ingress.enabled }}

apiVersion: networking.k8s.io/v1

kind: Ingress

{{- end }}
```

If

```yaml
ingress:
  enabled: true
```

Ingress is created.

If

```yaml
ingress:
  enabled: false
```

Ingress is skipped.

---

# 7. else Statement

Example

```yaml
{{ if .Values.environment }}

Environment Exists

{{ else }}

Environment Missing

{{ end }}
```

Only one block is executed.

---

# 8. with Statement

The with statement reduces repeated object references.

Without with

```yaml
{{ .Values.image.repository }}

{{ .Values.image.tag }}
```

With with

```yaml
{{ with .Values.image }}

{{ .repository }}

{{ .tag }}

{{ end }}
```

Templates become shorter and easier to read.

---

# 9. range Statement

The range statement loops through a list.

Example

values.yaml

```yaml
ports:

- 80

- 443
```

Template

```yaml
{{ range .Values.ports }}

- containerPort: {{ . }}

{{ end }}
```

Rendered Output

```yaml
- containerPort: 80

- containerPort: 443
```

---

# 10. Enterprise Workflow

Developer

↓

values.yaml

↓

Control Structures

↓

Template Rendering

↓

Generate Manifest

↓

Deploy

↓

Validate

Only required resources are created.

---

# 11. Enterprise Use Cases

Control Structures are commonly used for

- Optional Ingress
- Optional Autoscaling
- Optional ConfigMaps
- Optional Secrets
- Multiple Ports
- Multiple Containers
- Labels
- Annotations

Almost every enterprise Helm Chart uses them.

---

# 12. Production Scenario

A company deployed applications to

Development

QA

Production

Only Production required Ingress.

Instead of maintaining three Ingress manifests,

the Helm Chart used

```yaml
{{ if .Values.ingress.enabled }}
```

Development deployments skipped Ingress automatically.

Production deployments created it successfully.

---

# 13. Interview Questions

## Q1. What are Helm Control Structures?

### Answer

Helm Control Structures are template statements such as if, else, with and range that dynamically control how Kubernetes manifests are generated.

---

## Q2. Why is the if statement used?

### Answer

The if statement conditionally creates Kubernetes resources only when the specified condition evaluates to true.

---

## Q3. What is the purpose of range?

### Answer

The range statement iterates through lists or maps to generate multiple Kubernetes resources dynamically.

---

## Q4. Why is with used?

### Answer

The with statement reduces repeated object references, making templates cleaner and easier to maintain.

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

- Use if for optional resources.
- Use range for lists.
- Use with to simplify templates.
- Keep conditions simple.
- Avoid deeply nested control structures.
- Validate rendered output.
- Keep templates readable.

---

# 16. Common Mistakes

- Deep nesting of if statements.
- Forgetting {{ end }}.
- Hardcoding optional resources.
- Using range incorrectly.
- Ignoring template validation.
- Creating duplicate templates.

---

# 17. Marathi Quick Revision

- if → Condition True असेल तर Execute.
- else → दुसरा पर्याय.
- with → Code Short करतो.
- range → Loop चालवतो.
- Optional Resources साठी if वापरतात.
- Multiple Values साठी range वापरतात.

---

# 18. Marathi Summary (5+ Experience Revision)

## Simple Explanation

Helm Control Structures वापरून templates मध्ये conditions आणि loops तयार करता येतात. त्यामुळे एकाच Helm Chart मधून वेगवेगळ्या environments साठी वेगवेगळे Kubernetes resources तयार करता येतात.

### Project Usage

आपल्या Enterprise DevOps Platform मध्ये Production मध्ये Ingress आणि HPA enable असतील, तर Development मध्ये ते disable असतील. हे सर्व `if` condition वापरून नियंत्रित केले जाईल. Multiple ports आणि environment variables साठी `range` वापरला जाईल.

### Production Best Practice

Optional resources नेहमी `if` वापरून तयार करावेत. Repeated objects साठी `with` वापरावे. Lists साठी `range` वापरावे. Templates साधे आणि readable ठेवावेत.

### Production Story

एका enterprise मध्ये Development environment मध्ये Ingress आवश्यक नव्हता, पण Deployment YAML मध्ये तो कायम तयार होत होता. यामुळे deployment failures होत होते. Helm मध्ये `if .Values.ingress.enabled` वापरल्यानंतर Ingress फक्त Production मध्येच तयार होऊ लागला आणि deployments स्थिर झाले.

### Investigation Flow

```
Read values.yaml

↓

Evaluate Conditions

↓

Execute if / else

↓

Execute range

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

Why are Helm Control Structures important in enterprise deployments?

**Answer:**

"Helm Control Structures such as `if`, `else`, `with` and `range` enable dynamic manifest generation based on configuration values. They eliminate duplicate templates, simplify maintenance and allow a single Helm Chart to support multiple environments with different deployment requirements."

