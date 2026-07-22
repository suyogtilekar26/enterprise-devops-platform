# Helm Notes 29 - Helm default Function

# Enterprise DevOps Platform

---

# 1. Purpose

The purpose of this document is to understand the **default** function in Helm and how it provides fallback values when a configuration is missing.

This is not a beginner tutorial.

This document explains why enterprise Helm Charts use the **default** function to make templates flexible, reusable and environment-independent.

---

# 2. Introduction

Not every value inside

```
values.yaml
```

is mandatory.

Some configuration is optional.

Examples

- Replica Count
- Image Pull Policy
- Service Type
- Namespace
- Container Port
- Resource Limits
- Log Level

If these values are missing,

Helm can automatically use a predefined value.

This is achieved using

```
default
```

---

# 3. Why default Exists

Suppose

```
replicaCount
```

is not specified in

```
values.yaml
```

Without

```
default
```

the generated manifest may contain

```yaml
replicas:
```

which is invalid.

Instead,

Helm can automatically use

```
1
```

---

# 4. Enterprise Problem Statement

Our Enterprise DevOps Platform supports

```
Development

↓

Testing

↓

UAT

↓

Production
```

Every environment may not define

- Replica Count
- Service Type
- Pull Policy
- Log Level

Instead of forcing developers to specify every value,

Helm provides sensible defaults.

---

# 5. What is default?

The

```
default
```

function returns

```
Default Value
```

if the supplied value is

- Empty
- Nil
- Undefined

Syntax

```yaml
{{ default "latest" .Values.image.tag }}
```

If

```
image.tag
```

exists,

its value is used.

Otherwise,

```
latest
```

is returned.

---

# 6. Basic Example

values.yaml

```yaml
replicaCount: 3
```

Template

```yaml
replicas:

{{ default 1 .Values.replicaCount }}
```

Output

```yaml
replicas: 3
```

---

# 7. Missing Value Example

values.yaml

```yaml
# replicaCount not defined
```

Template

```yaml
replicas:

{{ default 1 .Values.replicaCount }}
```

Output

```yaml
replicas: 1
```

Deployment succeeds.

---

# 8. Common Examples

Image Pull Policy

```yaml
imagePullPolicy:

{{ default "IfNotPresent" .Values.image.pullPolicy }}
```

Service Type

```yaml
type:

{{ default "ClusterIP" .Values.service.type }}
```

Log Level

```yaml
LOG_LEVEL:

{{ default "INFO" .Values.logLevel }}
```

Container Port

```yaml
containerPort:

{{ default 8080 .Values.containerPort }}
```

---

# 9. default vs required

| Function | Purpose |
|----------|----------|
| required | Stops deployment if value is missing |
| default | Uses fallback value if value is missing |

Use

```
required
```

for mandatory values.

Use

```
default
```

for optional values.

---

# 10. Enterprise Workflow

Developer

↓

Read values.yaml

↓

Value Exists?

↓

Yes

↓

Use Given Value

↓

No

↓

Use default

↓

Render Manifest

↓

Deploy

---

# 11. Enterprise Use Cases

default is commonly used for

- Replica Count
- Service Type
- Pull Policy
- Namespace
- Container Port
- Log Level
- Health Check Path
- Monitoring Configuration

Almost every production Helm Chart uses default.

---

# 12. Production Scenario

A development team forgot to specify

```
image.pullPolicy
```

inside the QA values file.

Instead of failing,

Helm automatically applied

```
IfNotPresent
```

using the

```
default
```

function.

Deployment completed successfully without modifying the template.

---

# 13. Interview Questions

## Q1. What is the default function in Helm?

### Answer

The `default` function returns a fallback value when the specified value is empty, nil or undefined.

---

## Q2. Why do enterprises use default?

### Answer

To provide sensible fallback values for optional configuration, reducing template complexity and making Helm Charts reusable across multiple environments.

---

## Q3. What is the difference between default and required?

### Answer

`default` supplies a fallback value when configuration is missing, whereas `required` stops the deployment if a mandatory value is not provided.

---

## Q4. Which values typically use default?

### Answer

Replica count, service type, image pull policy, container port, namespace, log level and other optional configuration values.

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

# 15. Best Practices

- Use `default` only for optional values.
- Use meaningful fallback values.
- Keep defaults consistent across environments.
- Combine with values.yaml.
- Use `required` for critical configuration.
- Validate rendered manifests.
- Test with missing values.

---

# 16. Common Mistakes

- Using `default` for passwords.
- Using `default` for image tags in production.
- Confusing `default` with `required`.
- Hardcoding unnecessary defaults.
- Not documenting fallback values.
- Ignoring environment-specific overrides.

---

# 17. Marathi Quick Revision

- `default` fallback value देतो.
- Value नसल्यास default वापरतो.
- Optional configuration साठी वापरतात.
- Mandatory values साठी `required` वापरतात.
- Production Charts मध्ये खूप common आहे.
- Templates reusable बनवतो.

---

# 18. Marathi Summary (5+ Experience Revision)

## Simple Explanation

`default` हा Helm function optional configuration साठी fallback value देतो. जर value values.yaml मध्ये दिली नसेल तर predefined value वापरून manifest तयार केला जातो.

### Project Usage

आपल्या Enterprise DevOps Platform मध्ये `replicaCount`, `service.type`, `image.pullPolicy`, `containerPort`, `logLevel` आणि `namespace` यांसारख्या optional values साठी `default` वापरला जाईल.

### Production Best Practice

Critical values साठी `default` वापरू नये. Passwords, Secrets, Image Tags आणि TLS configuration साठी `required` वापरावा. `default` फक्त optional configuration साठीच वापरणे योग्य आहे.

### Production Story

एका enterprise मध्ये QA values file मध्ये `image.pullPolicy` define करायचे राहिले. Helm Chart मध्ये `default "IfNotPresent"` असल्यामुळे deployment fail झाला नाही. Fallback value वापरून application यशस्वीपणे deploy झाले.

### Investigation Flow

```
Run Helm

↓

Read values.yaml

↓

Value Exists?

↓

Yes

↓

Use Given Value

↓

No

↓

Apply default

↓

Render Manifest

↓

Deploy

↓

Validate
```

### 5+ Years Memory Trick

**Interview Question:**

When should you use the `default` function in Helm?

**Answer:**

"The `default` function should be used for optional configuration values where a sensible fallback exists. It improves chart portability across environments while avoiding unnecessary deployment failures. Mandatory configuration should always be validated using the `required` function instead."

