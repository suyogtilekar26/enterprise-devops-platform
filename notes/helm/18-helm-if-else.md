# Helm Notes 18 - Helm if / else

# Enterprise DevOps Platform

---

# 1. Purpose

The purpose of this document is to understand the Helm **if / else** conditional statements and how they are used to create dynamic Kubernetes resources.

This is not a beginner tutorial.

This document explains how enterprises use conditional logic to deploy different resources based on environment-specific configurations.

---

# 2. Introduction

Not every Kubernetes resource is required in every environment.

For example

- Development may not require Ingress.
- QA may not require Autoscaling.
- Production requires Monitoring.
- Internal applications may not need LoadBalancer Services.

Instead of maintaining multiple YAML files,

Helm uses

```
if / else
```

to decide which resources should be generated.

---

# 3. Why if / else Exists

Suppose an application is deployed to

```
Development

↓

QA

↓

Production
```

Only Production needs

- Ingress
- HPA
- PodDisruptionBudget

Without Helm

Separate YAML files are required.

With Helm

A single template decides what should be deployed.

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

Development

```
Ingress = Disabled

HPA = Disabled
```

Production

```
Ingress = Enabled

HPA = Enabled
```

The same Helm Chart must support both environments.

---

# 5. Syntax

Basic Syntax

```yaml
{{ if CONDITION }}

...

{{ end }}
```

With else

```yaml
{{ if CONDITION }}

...

{{ else }}

...

{{ end }}
```

Only one block executes.

---

# 6. Example - Ingress

values.yaml

```yaml
ingress:
  enabled: true
```

Template

```yaml
{{ if .Values.ingress.enabled }}

apiVersion: networking.k8s.io/v1

kind: Ingress

metadata:

  name: frontend

{{ end }}
```

Rendered Output

```yaml
apiVersion: networking.k8s.io/v1

kind: Ingress
```

If

```yaml
enabled: false
```

Nothing is generated.

---

# 7. Example - Service Type

values.yaml

```yaml
service:
  type: LoadBalancer
```

Template

```yaml
{{ if eq .Values.service.type "LoadBalancer" }}

type: LoadBalancer

{{ else }}

type: ClusterIP

{{ end }}
```

Development

```yaml
ClusterIP
```

Production

```yaml
LoadBalancer
```

---

# 8. Example - Autoscaling

values.yaml

```yaml
autoscaling:
  enabled: true
```

Template

```yaml
{{ if .Values.autoscaling.enabled }}

kind: HorizontalPodAutoscaler

{{ end }}
```

HPA is created only when enabled.

---

# 9. Enterprise Workflow

Developer

↓

values.yaml

↓

if / else Evaluation

↓

Template Rendering

↓

Manifest Generation

↓

Kubernetes Deployment

Only required resources are deployed.

---

# 10. Enterprise Use Cases

if / else is commonly used for

- Ingress
- HPA
- ServiceAccount
- ConfigMaps
- Secrets
- NetworkPolicy
- PodDisruptionBudget
- Monitoring Components

Every enterprise Helm Chart contains multiple if statements.

---

# 11. Production Scenario

A banking application had

```
Development

QA

Production
```

Only Production required

```
LoadBalancer Service
```

Instead of maintaining multiple Service YAML files,

the template used

```yaml
{{ if eq .Values.service.type "LoadBalancer" }}
```

Development automatically received ClusterIP.

Production received LoadBalancer.

One template supported all environments.

---

# 12. Interview Questions

## Q1. Why is if used in Helm?

### Answer

The if statement conditionally generates Kubernetes resources based on values defined in values.yaml.

---

## Q2. What happens if the condition is false?

### Answer

The block inside the if statement is skipped and no Kubernetes resource is generated.

---

## Q3. Why do enterprises use if statements?

### Answer

They allow one Helm Chart to support multiple environments without maintaining duplicate Kubernetes manifests.

---

## Q4. Can Helm compare values?

### Answer

Yes.

Functions like

```
eq

ne

gt

lt

ge

le
```

are commonly used with if statements.

---

# 13. Commands

Render Templates

```bash
helm template frontend ./frontend-chart
```

Render Production

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

- Keep conditions simple.
- Use values.yaml for configuration.
- Avoid nested if statements.
- Test all conditions.
- Validate rendered manifests.
- Use descriptive variable names.
- Follow GitOps practices.

---

# 15. Common Mistakes

- Forgetting {{ end }}.
- Deep nesting of conditions.
- Hardcoding values.
- Ignoring false conditions.
- Duplicating templates.
- Skipping template validation.

---

# 16. Marathi Quick Revision

- if म्हणजे Condition Check.
- Condition True असेल तर Code Execute होतो.
- False असेल तर Skip होतो.
- else दुसरा पर्याय देतो.
- Production मध्ये Optional Resources साठी वापरतात.
- Duplicate YAML टाळण्यासाठी if वापरतात.

---

# 17. Marathi Summary (5+ Experience Revision)

## Simple Explanation

Helm मधील **if / else** वापरून values.yaml मधील configuration नुसार Kubernetes resources तयार किंवा skip करता येतात. त्यामुळे एकाच Helm Chart मधून अनेक environments manage करता येतात.

### Project Usage

आपल्या Enterprise DevOps Platform मध्ये Production मध्ये Ingress, HPA, Monitoring आणि LoadBalancer enable असतील. Development मध्ये हे resources disable असतील. हे सर्व if / else वापरून नियंत्रित केले जाईल.

### Production Best Practice

Conditional resources नेहमी if statement वापरून तयार करावेत. Templates मध्ये hardcoding टाळावी. सर्व decisions values.yaml मधून घ्यावेत.

### Production Story

एका enterprise मध्ये Development environment मध्ये LoadBalancer Service deploy होत होता. त्यामुळे unnecessary cloud cost वाढत होती. Helm if condition वापरून LoadBalancer फक्त Production मध्ये deploy करण्यात आला. Development मध्ये ClusterIP वापरला गेला आणि cloud खर्च कमी झाला.

### Investigation Flow

```
Read values.yaml

↓

Evaluate if Condition

↓

True ?

↓

Generate Resource

↓

False ?

↓

Skip Resource

↓

Render Manifest

↓

Deploy

↓

Validate
```

### 5+ Years Memory Trick

**Interview Question:**

Why do enterprises use if / else statements in Helm?

**Answer:**

"Helm if / else statements allow conditional generation of Kubernetes resources based on configuration values. This enables a single Helm Chart to support multiple environments, reduces duplicate manifests, improves maintainability and simplifies enterprise CI/CD and GitOps deployments."

