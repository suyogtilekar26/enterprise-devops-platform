# Helm Notes 11 - Multiple Values Files

# Enterprise DevOps Platform

---

# 1. Purpose

The purpose of this document is to understand how multiple values files are used in Helm for different environments.

This is not a beginner tutorial.

This document explains how enterprises deploy the same Helm Chart to Development, QA, UAT and Production using different values files.

---

# 2. Introduction

A single Helm Chart should be reusable across multiple environments.

Instead of creating

- Different Charts
- Different Templates
- Different Kubernetes YAML files

Helm uses

```
Multiple Values Files
```

Each environment has its own configuration.

Templates remain unchanged.

---

# 3. Why Multiple Values Files Exist

Suppose we have

```
Development

QA

UAT

Production
```

Each environment has different

- Replica Count
- Image Tag
- CPU
- Memory
- Hostname
- Resource Limits

If only one values.yaml exists,

Engineers must edit it before every deployment.

This creates

- Human Errors
- Wrong Deployments
- Configuration Drift

Helm solves this by using multiple values files.

---

# 4. Enterprise Problem Statement

Our Enterprise DevOps Platform has

```
Development

↓

QA

↓

UAT

↓

Production
```

Production requires

```
Replica = 8

Memory = 2Gi

CPU = 2
```

Development requires

```
Replica = 1

Memory = 256Mi

CPU = 250m
```

Using one values.yaml is unsafe.

Separate values files solve this problem.

---

# 5. Standard Values File Structure

Example

```
frontend-chart/

values.yaml

values-dev.yaml

values-qa.yaml

values-uat.yaml

values-prod.yaml
```

Each file represents one environment.

---

# 6. Example Values Files

Development

```yaml
replicaCount: 1

image:
  tag: dev

resources:
  limits:
    cpu: 250m
    memory: 256Mi
```

Production

```yaml
replicaCount: 8

image:
  tag: v2.5.1

resources:
  limits:
    cpu: 2
    memory: 2Gi
```

Templates remain identical.

---

# 7. Enterprise Workflow

Developer

↓

Git Push

↓

GitHub Actions

↓

Docker Image

↓

Update Image Tag

↓

Select Values File

↓

Helm Upgrade

↓

Argo CD

↓

Production

Only the values file changes.

---

# 8. Deployment Example

Development

```bash
helm install frontend ./frontend-chart \
-f values-dev.yaml
```

QA

```bash
helm install frontend ./frontend-chart \
-f values-qa.yaml
```

Production

```bash
helm install frontend ./frontend-chart \
-f values-prod.yaml
```

Same Chart

Different configuration.

---

# 9. Benefits of Multiple Values Files

### Environment Isolation

Each environment has independent configuration.

---

### Safer Deployments

No manual editing before deployment.

---

### Easy Maintenance

One Chart

Multiple environments.

---

### GitOps Ready

Argo CD can reference the correct values file.

---

### CI/CD Friendly

Pipelines select the appropriate values file automatically.

---

# 10. Enterprise Use Cases

Multiple values files are used for

- Development
- QA
- UAT
- Production
- Disaster Recovery
- Blue-Green Deployments
- Customer-Specific Deployments
- Regional Deployments

Almost every enterprise follows this approach.

---

# 11. Production Scenario

A retail company deployed

```
values-dev.yaml
```

to Production by mistake.

Result

```
Replica Count = 1
```

Production traffic increased.

Application became unavailable.

After implementing separate deployment pipelines and environment validation,

the issue never occurred again.

Root Cause

Wrong values file selected.

---

# 12. Interview Questions

## Q1. Why do enterprises use multiple values files?

### Answer

Multiple values files allow the same Helm Chart to be deployed across different environments using environment-specific configuration without changing templates.

---

## Q2. Can one Helm Chart support multiple environments?

### Answer

Yes.

A single Helm Chart can deploy Development, QA, UAT and Production using separate values files.

---

## Q3. What is the advantage of using values-prod.yaml?

### Answer

It isolates production configuration from lower environments, reducing deployment risks and configuration drift.

---

# 13. Commands

Deploy Development

```bash
helm install frontend ./frontend-chart -f values-dev.yaml
```

Deploy QA

```bash
helm install frontend ./frontend-chart -f values-qa.yaml
```

Deploy Production

```bash
helm install frontend ./frontend-chart -f values-prod.yaml
```

Upgrade Production

```bash
helm upgrade frontend ./frontend-chart -f values-prod.yaml
```

---

# 14. Best Practices

- Create one values file per environment.
- Never edit values.yaml during deployment.
- Store values files in Git.
- Validate environment before deployment.
- Keep production configuration isolated.
- Use GitOps for environment management.
- Automate values file selection in CI/CD.

---

# 15. Common Mistakes

- Using one values file for every environment.
- Editing values manually before deployment.
- Deploying the wrong values file.
- Hardcoding production values.
- Mixing Development and Production configuration.
- Storing secrets inside values files.

---

# 16. Marathi Quick Revision

- प्रत्येक environment साठी वेगळी values file ठेवा.
- values-dev.yaml
- values-qa.yaml
- values-uat.yaml
- values-prod.yaml
- Templates बदलू नयेत.
- Deployment वेळी योग्य values file वापरा.

---

# 17. Marathi Summary (5+ Experience Revision)

## Simple Explanation

Helm मध्ये एकच Chart अनेक environments मध्ये deploy करण्यासाठी प्रत्येक environment साठी वेगळी values file वापरली जाते. त्यामुळे templates बदलावे लागत नाहीत आणि deployment सुरक्षित राहतो.

### Project Usage

आपल्या Enterprise DevOps Platform मध्ये Development, QA, UAT आणि Production साठी स्वतंत्र values files असतील. GitHub Actions योग्य values file वापरेल आणि Argo CD त्याच configuration ने Kubernetes मध्ये deployment करेल.

### Production Best Practice

Production values file वेगळी ठेवावी. CI/CD pipeline मध्ये योग्य environment validation असावी. Production values file manually edit करू नये.

### Production Story

एका production deployment दरम्यान चुकीची values-dev.yaml file वापरली गेली. Replica count कमी असल्यामुळे production application overload झाली. Investigation नंतर environment validation आणि automated values file selection लागू करण्यात आले.

### Investigation Flow

```
Deployment Request

↓

Select Environment

↓

Select Values File

↓

Render Templates

↓

Deploy

↓

Validate
```

### 5+ Years Memory Trick

**Interview Question:**

Why do enterprises maintain multiple values files in Helm?

**Answer:**

"Multiple values files allow the same Helm Chart to be deployed across multiple environments using environment-specific configuration. This eliminates duplicate templates, reduces configuration drift, improves deployment safety and integrates seamlessly with enterprise CI/CD and GitOps workflows."

