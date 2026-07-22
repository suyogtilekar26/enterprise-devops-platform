# Helm Notes 59 - Helm Chart Versioning

# Enterprise DevOps Platform

---

# 1. Purpose

The purpose of this document is to understand **Helm Chart Versioning**, how chart versions are managed, the difference between `version` and `appVersion`, and how enterprise DevOps teams handle chart releases.

This is not a beginner tutorial.

Chart versioning is one of the most frequently asked Helm interview topics because incorrect version management can break CI/CD pipelines and production deployments.

---

# 2. Introduction

Every Helm Chart contains

```
Chart.yaml
```

Inside it

```yaml
apiVersion: v2

name: frontend

version: 1.2.0

appVersion: "2.8.5"
```

Most beginners think

```
version

=

appVersion
```

This is WRONG.

Both have completely different purposes.

---

# 3. Why Versioning Exists

Imagine

```
Frontend Application

↓

Bug Fixed

↓

New Docker Image
```

Should we

Increase Chart Version?

OR

Increase Application Version?

Answer

```
Depends
```

Understanding this difference is critical.

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

Each application changes independently.

Sometimes

```
Application Changes

↓

Chart Same
```

Sometimes

```
Chart Changes

↓

Application Same
```

Both require different version updates.

---

# 5. Chart Version

Example

```yaml
version: 2.4.1
```

Chart Version represents

```
Helm Chart

↓

Packaging

↓

Templates

↓

Values

↓

Deployment Logic
```

If Helm templates change,

increase

```
Chart Version
```

---

# 6. appVersion

Example

```yaml
appVersion: "3.1.0"
```

This represents

```
Application Version

↓

Docker Image

↓

Software Release
```

Changing application code

does NOT necessarily require

changing Helm templates.

---

# 7. Example

Current

```yaml
version: 1.0.0

appVersion: "2.5.1"
```

New Docker Image

```
frontend:2.5.2
```

Chart

```yaml
version: 1.0.0

appVersion: "2.5.2"
```

Templates unchanged.

Chart version remains the same.

---

Another example

Templates modified

```
Deployment.yaml

↓

Ingress

↓

Resources

↓

Values.yaml
```

Now

```yaml
version: 1.1.0

appVersion: "2.5.2"
```

Chart version changes because deployment logic changed.

---

# 8. Semantic Versioning (SemVer)

Helm follows

```
MAJOR.MINOR.PATCH
```

Example

```
1.0.0

↓

1.0.1

↓

1.1.0

↓

2.0.0
```

Meaning

```
PATCH

↓

Bug Fix

----------------

MINOR

↓

New Feature

----------------

MAJOR

↓

Breaking Change
```

---

# 9. Enterprise Workflow

```
Developer

↓

Application Updated

↓

New Docker Image

↓

Update appVersion

↓

Package Chart

↓

Publish
```

If Helm templates change

```
Developer

↓

Modify Templates

↓

Increase Chart Version

↓

Package

↓

Publish
```

---

# 10. Enterprise Use Cases

Chart Version tracks

- Template Changes
- Values Changes
- Hooks
- Resources
- Chart Packaging

appVersion tracks

- Docker Image
- Software Release
- Microservice Version
- Backend Release
- Frontend Release

---

# 11. Production Scenario

A retail company released

```
Frontend v5.2.3
```

Only the application code changed.

Helm templates remained unchanged.

Platform Team updated

```yaml
appVersion: "5.2.3"
```

Chart version stayed

```
2.1.0
```

Two weeks later

Ingress configuration changed.

Now

```
version

↓

2.2.0
```

Application version remained unchanged.

---

# 12. Interview Questions

## Q1. What is the difference between version and appVersion?

### Answer

`version` identifies the Helm Chart version.

`appVersion` identifies the application version deployed by the chart.

---

## Q2. Does changing the Docker image always require changing Chart version?

### Answer

No.

Only if Helm templates or chart configuration change.

---

## Q3. Which version follows SemVer?

### Answer

Chart Version.

---

## Q4. What does appVersion represent?

### Answer

The version of the application (typically the Docker image or software release).

---

## Q5. Why is chart versioning important?

### Answer

It allows Helm to track chart releases, upgrades and compatibility across environments.

---

# 13. Commands

Show Installed Release

```bash
helm list
```

Package Chart

```bash
helm package .
```

Upgrade Release

```bash
helm upgrade frontend .
```

View Chart Metadata

```bash
cat Chart.yaml
```

Show Release

```bash
helm status frontend
```

---

# 14. Best Practices

- Follow Semantic Versioning.
- Increment Chart version whenever templates change.
- Keep appVersion synchronized with application releases.
- Never reuse the same Chart version for different content.
- Publish immutable chart versions.
- Document release notes.

---

# 15. Common Mistakes

- Confusing Chart version with appVersion.
- Reusing existing chart versions.
- Forgetting to update appVersion.
- Changing templates without incrementing Chart version.
- Publishing mutable chart versions.
- Ignoring Semantic Versioning.

---

# 16. Marathi Quick Revision

- `version` म्हणजे Helm Chart Version.
- `appVersion` म्हणजे Application Version.
- Template बदलला तर Chart Version वाढवायचा.
- Docker Image बदलली तर appVersion बदलायचा.
- Chart Version आणि appVersion वेगळे असतात.
- SemVer वापरावा.

---

# 17. Marathi Summary (5+ Experience Revision)

## Simple Explanation

Helm मध्ये `version` आणि `appVersion` वेगवेगळे असतात. `version` हा Helm Chart साठी असतो, तर `appVersion` हा application किंवा Docker Image साठी असतो.

### Project Usage

आपल्या Enterprise DevOps Platform मध्ये Frontend ची Docker Image `v3.4.2` झाली तर `appVersion` अपडेट करू. जर Deployment template, Ingress किंवा Values मध्ये बदल केला तर Chart Version देखील वाढवू.

### Production Best Practice

Chart Version नेहमी Semantic Versioning नुसार maintain करावा. प्रत्येक release immutable ठेवावी. `appVersion` application release शी synchronize ठेवावा.

### Production Story

एका enterprise मध्ये developer ने Helm templates बदलल्या पण Chart Version वाढवला नाही. CI/CD pipeline ने जुनी cached chart वापरली आणि production मध्ये नवीन configuration लागू झाली नाही. त्यानंतर policy बनवण्यात आली की प्रत्येक template change साठी Chart Version increment करणे अनिवार्य आहे.

### Investigation Flow

```
Wrong Version Deployed

↓

Check Chart.yaml

↓

Verify version

↓

Verify appVersion

↓

Compare Git Commit

↓

Package Chart

↓

Deploy

↓

Validate Release
```

### 5+ Years Memory Trick

**Interview Question:**

Explain the difference between `version` and `appVersion` in Helm.

**Answer:**

"`version` represents the Helm Chart itself and should be incremented whenever templates, values or deployment logic change. `appVersion` represents the application version, usually the Docker image version. In enterprise environments we follow Semantic Versioning for charts and keep appVersion aligned with application releases to ensure predictable deployments."

