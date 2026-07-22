# Helm Notes 39 - values.schema.json

# Enterprise DevOps Platform

---

# 1. Purpose

The purpose of this document is to understand **values.schema.json** in Helm and how enterprises use it to validate user input before a deployment starts.

This is not a beginner tutorial.

This document explains why production Helm Charts always validate input values to prevent deployment failures.

---

# 2. Introduction

Normally Helm reads

```
values.yaml
```

If someone accidentally writes

```yaml
replicaCount: abc
```

instead of

```yaml
replicaCount: 3
```

Helm may generate invalid Kubernetes manifests.

To prevent these mistakes,

Helm supports

```
values.schema.json
```

which validates values before rendering templates.

---

# 3. Why values.schema.json Exists

Imagine an enterprise platform with

```
200 Developers

↓

500 Helm Charts

↓

Thousands of Deployments
```

If every developer can enter any value,

deployment failures become common.

Examples

- Invalid Image Name
- Wrong Port
- Negative Replica Count
- Empty Password
- Invalid Environment Name

Schema validation prevents these errors before deployment.

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

PostgreSQL

↓

Monitoring
```

Every deployment requires values like

- replicaCount
- image.tag
- image.repository
- service.port
- ingress.enabled
- resources
- autoscaling

Incorrect values can break production deployments.

---

# 5. What is values.schema.json?

It is a JSON Schema file stored in the chart root.

```
mychart/

Chart.yaml

values.yaml

values.schema.json

templates/
```

Helm automatically validates

```
values.yaml
```

against this schema.

---

# 6. Basic Schema Example

values.schema.json

```json
{
  "$schema": "https://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "replicaCount": {
      "type": "integer",
      "minimum": 1
    }
  }
}
```

Valid values

```yaml
replicaCount: 3
```

Invalid values

```yaml
replicaCount: abc
```

Helm rejects the deployment.

---

# 7. Required Fields Example

Schema

```json
{
  "properties": {
    "image": {
      "type": "object",
      "required": [
        "repository",
        "tag"
      ]
    }
  }
}
```

If either field is missing,

Helm returns an error before deployment.

---

# 8. Enum Validation Example

```json
{
  "environment": {
    "type": "string",
    "enum": [
      "dev",
      "qa",
      "uat",
      "prod"
    ]
  }
}
```

Allowed

```
prod
```

Rejected

```
production123
```

---

# 9. Enterprise Workflow

Developer

↓

Update values.yaml

↓

Helm Reads Schema

↓

Validate Values

↓

Template Rendering

↓

Generate Manifests

↓

Deploy

---

# 10. Enterprise Use Cases

Schema validation is commonly used for

- Replica Count
- Image Repository
- Image Tag
- Service Port
- Ingress Host
- CPU Limits
- Memory Limits
- Environment Name
- Storage Size

Every production Helm Chart should include schema validation.

---

# 11. Production Scenario

A production deployment failed because a developer entered

```yaml
service:

  port: eighty
```

instead of

```yaml
service:

  port: 80
```

After introducing

```
values.schema.json
```

Helm immediately rejected invalid values.

Deployment errors were caught before reaching Kubernetes.

---

# 12. Interview Questions

## Q1. What is values.schema.json?

### Answer

It is a JSON Schema file used by Helm to validate values.yaml before rendering templates.

---

## Q2. Why do enterprises use values.schema.json?

### Answer

To prevent invalid configuration, improve deployment quality and catch errors before resources are created in Kubernetes.

---

## Q3. Is values.schema.json mandatory?

### Answer

No.

However, it is considered a production best practice for enterprise Helm Charts.

---

## Q4. What can be validated?

### Answer

- Data types
- Required fields
- Minimum and maximum values
- Allowed values (enum)
- Object structure
- Arrays
- String patterns

---

# 13. Commands

Validate Chart

```bash
helm lint mychart
```

Render Templates

```bash
helm template myapp ./mychart
```

Install Chart

```bash
helm install myapp ./mychart
```

Upgrade Chart

```bash
helm upgrade myapp ./mychart
```

---

# 14. Best Practices

- Always include values.schema.json.
- Validate required fields.
- Use enum for fixed values.
- Validate numeric ranges.
- Keep schema synchronized with values.yaml.
- Review schema during code reviews.
- Fail fast before deployment.

---

# 15. Common Mistakes

- Updating values.yaml but not the schema.
- Using incorrect data types.
- Missing required fields.
- Allowing unrestricted input.
- Ignoring validation errors.
- Not testing schema changes.

---

# 16. Marathi Quick Revision

- values.schema.json values validate करतो.
- Invalid values deployment आधीच reject होतात.
- Required fields check करता येतात.
- Enum वापरून fixed values enforce करता येतात.
- Enterprise मध्ये production best practice आहे.
- Fail Fast approach वापरतो.

---

# 17. Marathi Summary (5+ Experience Revision)

## Simple Explanation

`values.schema.json` हा Helm Chart मधील validation file आहे. तो `values.yaml` मधील values योग्य आहेत का हे deployment सुरू होण्यापूर्वी तपासतो.

### Project Usage

आपल्या Enterprise DevOps Platform मध्ये `replicaCount`, `image.tag`, `service.port`, `resources`, `autoscaling` आणि `environment` यांसारख्या सर्व महत्त्वाच्या values schema वापरून validate केल्या जातील.

### Production Best Practice

प्रत्येक production Helm Chart मध्ये `values.schema.json` असावा. Required fields, enum, numeric limits आणि object validation वापरून चुकीचे deployments थांबवावेत.

### Production Story

एका enterprise मध्ये चुकीचा service port आणि invalid image tag मुळे अनेक deployments fail होत होते. Platform team ने `values.schema.json` लागू केला. त्यानंतर invalid configurations Helm ने deployment आधीच reject केल्या आणि production incidents मोठ्या प्रमाणात कमी झाले.

### Investigation Flow

```
Deployment Failed

↓

Check values.yaml

↓

Validate Schema

↓

Fix Invalid Value

↓

helm lint

↓

helm template

↓

Deploy

↓

Verify Application
```

### 5+ Years Memory Trick

**Interview Question:**

Why is `values.schema.json` important in enterprise Helm Charts?

**Answer:**

"`values.schema.json` enforces configuration validation before template rendering. It prevents invalid deployments, ensures configuration consistency, improves developer experience and enables fail-fast validation across enterprise Kubernetes environments."

