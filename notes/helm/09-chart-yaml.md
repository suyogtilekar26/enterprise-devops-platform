# Helm Notes 09 - Chart.yaml

# Enterprise DevOps Platform

---

# 1. Purpose

The purpose of this document is to understand the Chart.yaml file, its structure and why it is considered the identity card of every Helm Chart.

This is not a beginner tutorial.

This document explains every important field inside Chart.yaml and how it is used in enterprise Kubernetes environments.

---

# 2. Introduction

Every Helm Chart contains one mandatory file

```
Chart.yaml
```

Without this file,

Helm cannot recognize the directory as a valid Chart.

Chart.yaml contains metadata about the Chart.

Think of it as

```
Identity Card

or

Passport

of the Helm Chart.
```

---

# 3. Why Chart.yaml Exists

Suppose two teams maintain hundreds of Charts.

Without metadata,

Helm cannot determine

- Chart Name
- Version
- Application Version
- Description
- Dependencies

Chart.yaml provides all this information in one place.

---

# 4. Enterprise Problem Statement

Imagine our Enterprise DevOps Platform contains

```
Frontend Chart

API Chart

Authentication Chart

Dashboard Chart

Notification Chart
```

Every Chart must contain

- Name
- Version
- Description
- Maintainer
- Dependencies

Without Chart.yaml,

managing hundreds of Charts becomes impossible.

---

# 5. Chart.yaml Structure

Example

```yaml
apiVersion: v2
name: frontend
description: Frontend Application
type: application
version: 1.0.0
appVersion: "1.0.0"
```

This file is mandatory.

---

# 6. Important Fields

## apiVersion

Specifies the Helm Chart API version.

Example

```yaml
apiVersion: v2
```

Helm 3 uses

```
v2
```

---

## name

Defines the Chart name.

Example

```yaml
name: frontend
```

Usually matches the application name.

---

## description

Describes the application.

Example

```yaml
description: Enterprise Frontend Service
```

Useful for documentation and repositories.

---

## type

Specifies the Chart type.

Application

```yaml
type: application
```

Library

```yaml
type: library
```

Most enterprise Charts use

```
application
```

---

## version

Chart Version

Example

```yaml
version: 1.2.0
```

This is

Chart Version

NOT

Application Version.

---

## appVersion

Application Version

Example

```yaml
appVersion: "2.4.1"
```

Represents the software version.

---

# 7. Chart Version vs App Version

Example

```
Chart Version

1.3.0

↓

Application Version

2.7.5
```

Chart version changes when

- Templates change
- Dependencies change
- Chart structure changes

Application version changes when

- New software version is released

---

# 8. Enterprise Workflow

Developer

↓

New Application Version

↓

Docker Image

↓

Update appVersion

↓

Modify Templates

↓

Update Chart Version

↓

Git Commit

↓

GitHub Actions

↓

Helm Package

↓

Argo CD

↓

Production

---

# 9. Example Enterprise Chart.yaml

```yaml
apiVersion: v2

name: auth-service

description: Enterprise Authentication Service

type: application

version: 2.1.0

appVersion: "4.8.3"
```

Simple

Readable

Version Controlled

---

# 10. Enterprise Use Cases

Chart.yaml is used for

- Version Management
- CI/CD Pipelines
- Helm Repository
- Dependency Management
- GitOps
- Release Automation
- Chart Distribution

Every enterprise Chart contains this file.

---

# 11. Production Scenario

A DevOps Engineer upgraded an application.

Application Version

```
5.2.0
```

Chart Version

remained

```
1.0.0
```

Argo CD detected no Chart update.

Deployment was skipped.

After updating

```
version

↓

1.0.1
```

the deployment succeeded.

Root Cause

Chart Version was not updated.

---

# 12. Interview Questions

## Q1. What is Chart.yaml?

### Answer

Chart.yaml is the mandatory metadata file of every Helm Chart. It contains information such as Chart name, version, application version, description, type and dependencies.

---

## Q2. What is the difference between version and appVersion?

### Answer

Version represents the Helm Chart version, while appVersion represents the actual application version deployed by the Chart.

---

## Q3. Is Chart.yaml mandatory?

### Answer

Yes.

Without Chart.yaml Helm cannot identify a directory as a valid Helm Chart.

---

# 13. Commands

Display Chart information

```bash
helm show chart frontend-chart
```

Create Chart

```bash
helm create frontend-chart
```

Validate Chart

```bash
helm lint frontend-chart
```

---

# 14. Best Practices

- Keep Chart Version updated.
- Keep Application Version accurate.
- Use semantic versioning.
- Write meaningful descriptions.
- Store Charts in Git.
- Review Chart metadata before release.
- Validate Charts using helm lint.

---

# 15. Common Mistakes

- Forgetting to update Chart Version.
- Confusing version and appVersion.
- Missing description.
- Invalid apiVersion.
- Incorrect Chart name.
- Ignoring semantic versioning.

---

# 16. Marathi Quick Revision

- Chart.yaml हे Mandatory आहे.
- apiVersion = Helm API Version.
- name = Chart चे नाव.
- version = Chart Version.
- appVersion = Application Version.
- Production मध्ये Chart Version update करणे विसरू नये.

---

# 17. Marathi Summary (5+ Experience Revision)

## Simple Explanation

Chart.yaml हे Helm Chart चे metadata file आहे. यामध्ये Chart चे नाव, Version, Application Version, Description आणि Type ठेवले जाते. Helm ला Chart ओळखण्यासाठी हा file आवश्यक असतो.

### Project Usage

आपल्या Enterprise DevOps Platform मध्ये प्रत्येक Helm Chart मध्ये योग्य Chart Version आणि Application Version maintain केली जाईल. GitHub Actions आणि Argo CD deployment दरम्यान ही metadata वापरली जाईल.

### Production Best Practice

Application release झाल्यावर appVersion update करावी. Templates किंवा Chart मध्ये बदल झाल्यास version देखील update करावी. दोन्ही वेगवेगळ्या गोष्टी आहेत.

### Production Story

एका production deployment दरम्यान नवीन Docker image तयार झाली होती, पण Chart Version update केली नव्हती. Argo CD ने Chart मध्ये बदल नसल्याचे समजून deployment केले नाही. Investigation नंतर Chart Version update करण्यात आली आणि deployment यशस्वी झाले.

### Investigation Flow

```
Deployment Skipped

↓

Check Chart.yaml

↓

Verify version

↓

Verify appVersion

↓

Package Chart

↓

Deploy

↓

Validate
```

### 5+ Years Memory Trick

**Interview Question:**

Why is Chart.yaml important in Helm?

**Answer:**

"Chart.yaml is the metadata definition of a Helm Chart. It uniquely identifies the Chart, stores version information, application version, description and dependency details. It is mandatory for Helm to recognize and package the application correctly."

