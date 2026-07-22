# Helm Notes 28 - Helm required Function

# Enterprise DevOps Platform

---

# 1. Purpose

The purpose of this document is to understand the **required** function in Helm and how it prevents deployments when mandatory values are missing.

This is not a beginner tutorial.

This document explains why enterprise Helm Charts use the **required** function to enforce configuration validation before deployment.

---

# 2. Introduction

In Kubernetes, some configuration values are mandatory.

Examples

- Image Repository
- Image Tag
- Database Password
- Hostname
- Storage Class
- Domain Name
- TLS Secret

If these values are missing,

deployment may

- Fail
- Deploy incorrect resources
- Cause application downtime

Helm provides

```
required
```

to stop deployments before these issues occur.

---

# 3. Why required Exists

Suppose a Deployment template contains

```yaml
image:

  repository: {{ .Values.image.repository }}
```

If

```
.Values.image.repository
```

does not exist,

Helm may generate an invalid manifest.

Instead of deploying invalid YAML,

Helm should stop immediately.

This is the purpose of

```
required
```

---

# 4. Enterprise Problem Statement

Our Enterprise DevOps Platform supports

```
Development

↓

QA

↓

UAT

↓

Production
```

Every environment requires

- Different Images
- Different Secrets
- Different Domains
- Different Storage Classes

If a required value is missing,

deployment must fail immediately.

---

# 5. What is required?

The

```
required
```

function validates that a value exists.

If the value is empty,

Helm stops rendering and displays an error.

Syntax

```yaml
{{ required "Image repository is required" .Values.image.repository }}
```

---

# 6. Basic Example

values.yaml

```yaml
image:

  repository: nginx
```

Template

```yaml
image:

  repository:

{{ required "Image Repository is required" .Values.image.repository }}
```

Deployment succeeds.

---

# 7. Missing Value Example

values.yaml

```yaml
image: {}
```

Template

```yaml
{{ required "Image Repository is required" .Values.image.repository }}
```

Output

```
Error:

Image Repository is required
```

Deployment stops immediately.

---

# 8. Multiple Required Fields

Example

```yaml
{{ required "Repository Required" .Values.image.repository }}

{{ required "Tag Required" .Values.image.tag }}

{{ required "Domain Required" .Values.domain }}

{{ required "Database Password Required" .Values.database.password }}
```

Each field is validated independently.

---

# 9. Enterprise Workflow

Developer

↓

Update values.yaml

↓

Run Helm

↓

required Validation

↓

Missing Value?

↓

Yes → Stop Deployment

↓

No → Render Templates

↓

Deploy

---

# 10. Enterprise Use Cases

required is commonly used for

- Image Repository
- Image Tag
- Secret Names
- TLS Certificates
- Storage Classes
- Database Passwords
- External URLs
- Domain Names

Every production chart validates critical configuration.

---

# 11. Production Scenario

A banking application was deployed using Helm.

The Production values file accidentally missed

```
image.tag
```

Without validation,

the cluster deployed an unexpected image.

After implementing

```yaml
required
```

Helm stopped deployment immediately.

The incorrect release never reached production.

Root Cause

Missing mandatory configuration.

---

# 12. Interview Questions

## Q1. What is the required function?

### Answer

The `required` function validates that a value exists. If the value is empty or undefined, Helm stops rendering and displays the specified error message.

---

## Q2. Why do enterprises use required?

### Answer

To prevent deployments with missing mandatory configuration such as image tags, secrets, storage classes or domain names.

---

## Q3. Does required stop Helm installation?

### Answer

Yes.

If validation fails, template rendering stops and the deployment is aborted.

---

## Q4. Which values should normally use required?

### Answer

Critical production values such as image repository, image tag, secrets, TLS configuration, storage classes and database credentials.

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

- Validate all mandatory values.
- Use meaningful error messages.
- Keep optional values outside required.
- Validate production secrets.
- Validate image versions.
- Test every environment.
- Keep values.yaml complete.

---

# 15. Common Mistakes

- Not validating critical values.
- Using vague error messages.
- Using required for optional fields.
- Hardcoding production values.
- Forgetting image tag validation.
- Ignoring dry-run validation.

---

# 16. Marathi Quick Revision

- `required` mandatory value check करतो.
- Value missing असेल तर deployment थांबतो.
- Error message developer ला दिसतो.
- Production charts मध्ये खूप वापरतात.
- Secrets, Image Tag, Domain validate करतात.
- Wrong deployment टाळतो.

---

# 17. Marathi Summary (5+ Experience Revision)

## Simple Explanation

`required` हा Helm function mandatory configuration validate करतो. जर value missing किंवा empty असेल तर Helm rendering थांबवतो आणि custom error message दाखवतो.

### Project Usage

आपल्या Enterprise DevOps Platform मध्ये `image.repository`, `image.tag`, `database.password`, `ingress.host`, `tls.secretName` आणि `storageClass` यांसारख्या critical values साठी `required` वापरला जाईल.

### Production Best Practice

Production मध्ये प्रत्येक critical configuration `required` ने validate करावी. Invalid configuration मुळे deployment होण्यापूर्वीच error मिळणे हे production-safe approach आहे.

### Production Story

एका financial application मध्ये Production deployment करताना `image.tag` values file मधून चुकून delete झाला. `required` असल्यामुळे Helm ने deployment थांबवला आणि योग्य tag दिल्यानंतरच release deploy झाला. त्यामुळे चुकीचा image production मध्ये जाणे टळले.

### Investigation Flow

```
Run Helm

↓

Read values.yaml

↓

required Validation

↓

Value Missing?

↓

Yes

↓

Stop Rendering

↓

Display Error

↓

Fix values.yaml

↓

Deploy Again
```

### 5+ Years Memory Trick

**Interview Question:**

Why is the `required` function important in enterprise Helm deployments?

**Answer:**

"The `required` function validates mandatory configuration before template rendering. It prevents invalid releases by stopping deployments when critical values such as image tags, secrets or domain names are missing, making Helm deployments safer and more reliable in production environments."

