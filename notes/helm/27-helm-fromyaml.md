# Helm Notes 27 - Helm fromYaml

# Enterprise DevOps Platform

---

# 1. Purpose

The purpose of this document is to understand the **fromYaml** function in Helm and how it converts YAML content into Helm objects.

This is not a beginner tutorial.

This document explains how enterprise Helm Charts use **fromYaml** to read YAML data and manipulate it dynamically during template rendering.

---

# 2. Introduction

We have already learned

```
toYaml
```

which converts

```
Helm Object

↓

YAML
```

Sometimes we need the opposite.

Suppose we already have YAML data and want to

- Read it
- Access its fields
- Loop through it
- Merge it
- Modify it

Helm provides

```
fromYaml
```

---

# 3. Why fromYaml Exists

Suppose a helper template generates

```yaml
image:

  repository: nginx

  tag: latest

service:

  port: 80
```

This is plain YAML text.

If we want to access

```
image.repository
```

Helm must first convert YAML into an object.

That is exactly what

```
fromYaml
```

does.

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

Each application shares

- Labels
- Resources
- Environment Variables
- Common Configurations

Sometimes helper templates generate YAML that must be reused and modified.

Enterprise Helm Charts use

```
fromYaml
```

to convert that YAML into usable objects.

---

# 5. What is fromYaml?

The

```
fromYaml
```

function converts YAML text into a Helm object.

Syntax

```yaml
{{ fromYaml $yaml }}
```

After conversion,

the object can be accessed like any other Helm object.

---

# 6. Basic Example

Variable

```yaml
{{- $config := "
image:
  repository: nginx
  tag: latest
" -}}
```

Convert

```yaml
{{- $obj := fromYaml $config -}}
```

Access

```yaml
{{ $obj.image.repository }}
```

Output

```
nginx
```

---

# 7. Example with Helper Template

Helper

```yaml
{{ define "common.config" }}

image:

  repository: nginx

  tag: latest

{{ end }}
```

Convert

```yaml
{{- $cfg := include "common.config" . | fromYaml -}}
```

Access

```yaml
{{ $cfg.image.tag }}
```

Output

```
latest
```

---

# 8. toYaml vs fromYaml

| Function | Purpose |
|----------|----------|
| toYaml | Object → YAML |
| fromYaml | YAML → Object |

They are opposite functions.

Enterprise Helm Charts often use both together.

---

# 9. Enterprise Workflow

Developer

↓

Helper Template

↓

Generate YAML

↓

fromYaml

↓

Helm Object

↓

Modify Data

↓

Render Manifest

↓

Deploy

---

# 10. Enterprise Use Cases

fromYaml is commonly used for

- Helper Templates
- Shared Configuration
- Dynamic Objects
- Configuration Transformation
- Reusable YAML Blocks
- Complex Chart Logic

It is mainly used in advanced Helm Charts.

---

# 11. Production Scenario

An enterprise maintained common application configuration inside a helper template.

Multiple services required different values from the same configuration.

Instead of duplicating YAML,

the helper template output was converted using

```yaml
fromYaml
```

Each service accessed only the required fields.

The chart became modular and easier to maintain.

---

# 12. Interview Questions

## Q1. What is fromYaml in Helm?

### Answer

`fromYaml` converts YAML text into a Helm object so that its values can be accessed and manipulated inside templates.

---

## Q2. What is the difference between toYaml and fromYaml?

### Answer

`toYaml` converts an object into YAML, whereas `fromYaml` converts YAML into an object.

---

## Q3. Why do enterprise Helm Charts use fromYaml?

### Answer

To reuse generated YAML, convert it into structured data and dynamically access or modify its fields.

---

## Q4. Can fromYaml be used with include?

### Answer

Yes.

A common pattern is:

```yaml
{{ include "common.config" . | fromYaml }}
```

This converts the helper template output into an object.

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

Dry Run

```bash
helm install frontend ./frontend-chart \
--dry-run
```

Install Chart

```bash
helm install frontend ./frontend-chart
```

---

# 14. Best Practices

- Use `fromYaml` only when YAML needs further processing.
- Keep helper templates reusable.
- Validate generated YAML before conversion.
- Combine with `include` for modular charts.
- Keep templates readable.
- Test rendered manifests.
- Follow GitOps principles.

---

# 15. Common Mistakes

- Confusing `toYaml` with `fromYaml`.
- Converting invalid YAML.
- Overusing `fromYaml` in simple templates.
- Ignoring YAML formatting.
- Not validating helper output.
- Making helper templates overly complex.

---

# 16. Marathi Quick Revision

- `fromYaml` YAML ला Object मध्ये convert करतो.
- `toYaml` च्या उलट काम करतो.
- Helper template सोबत वापरतात.
- Dynamic configuration साठी उपयोगी.
- Enterprise Charts मध्ये advanced use case आहे.
- `include | fromYaml` हा common pattern आहे.

---

# 17. Marathi Summary (5+ Experience Revision)

## Simple Explanation

`fromYaml` हा Helm function YAML text ला Helm Object मध्ये convert करतो. त्यामुळे त्या YAML मधील fields programmatically access करता येतात आणि त्यावर पुढील processing करता येते.

### Project Usage

आपल्या Enterprise DevOps Platform मध्ये shared helper templates मधून common configuration generate होईल. `include | fromYaml` वापरून ते object मध्ये convert केले जाईल आणि वेगवेगळ्या microservices साठी आवश्यक values वापरल्या जातील.

### Production Best Practice

Static configuration साठी `fromYaml` वापरू नये. जेव्हा generated YAML पुन्हा process करायचा असेल किंवा helper template output reuse करायचा असेल तेव्हाच `fromYaml` वापरावा.

### Production Story

एका enterprise मध्ये common configuration helper template मधून generate होत होती. वेगवेगळ्या applications ना त्यातील वेगवेगळे values लागायचे होते. `fromYaml` वापरून helper output object मध्ये convert करण्यात आला. त्यामुळे duplicate configuration काढून टाकता आली आणि maintenance effort मोठ्या प्रमाणात कमी झाला.

### Investigation Flow

```
Generate YAML

↓

Check YAML Format

↓

Apply fromYaml

↓

Create Object

↓

Access Required Fields

↓

Render Template

↓

Deploy

↓

Validate
```

### 5+ Years Memory Trick

**Interview Question:**

When would you use `fromYaml` in an enterprise Helm Chart?

**Answer:**

"`fromYaml` is used when YAML content generated by helper templates or other sources needs to be converted into a Helm object for further processing. It enables reusable, modular and dynamic template logic, especially in complex enterprise Helm Charts."

