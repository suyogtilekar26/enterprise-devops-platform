# Helm Notes 58 - Helm OCI Registries

# Enterprise DevOps Platform

---

# 1. Purpose

The purpose of this document is to understand **Helm OCI Registries**, how Helm stores charts using the OCI standard and why modern enterprise DevOps teams are moving from traditional Helm repositories to OCI registries.

This is not a beginner tutorial.

OCI-based Helm Charts are becoming the industry standard and are frequently discussed in Senior DevOps interviews.

---

# 2. Introduction

Earlier,

Helm Charts were stored in

```
Helm Repository

↓

index.yaml

↓

chart.tgz
```

Today,

most enterprises store Helm Charts inside

```
OCI Registry
```

The same registry can store

```
Docker Images

+

Helm Charts

+

OCI Artifacts
```

One registry.

Multiple artifact types.

---

# 3. Why OCI Registries Exist

Imagine

```
Docker Images

↓

Docker Registry

------------------

Helm Charts

↓

Helm Repository

------------------

SBOM

↓

Another Tool

------------------

Signatures

↓

Another Tool
```

Too many repositories.

OCI combines everything.

```
One Registry

↓

Multiple Artifacts
```

---

# 4. Enterprise Problem Statement

Our Enterprise DevOps Platform contains

```
Docker Images

↓

Frontend Chart

↓

Backend Chart

↓

Redis Chart

↓

Security Artifacts

↓

SBOM

↓

Signatures
```

Instead of maintaining multiple repositories,

Platform Team stores everything inside one OCI Registry.

---

# 5. What is OCI?

OCI stands for

```
Open Container Initiative
```

It defines a standard format for storing

- Container Images
- Helm Charts
- OCI Artifacts
- Signatures
- SBOM

Any OCI-compatible registry can store Helm Charts.

---

# 6. Popular OCI Registries

Enterprise examples

```
Azure Container Registry (ACR)

↓

Amazon Elastic Container Registry (ECR)

↓

Google Artifact Registry

↓

GitHub Container Registry (GHCR)

↓

Harbor

↓

JFrog Artifactory

↓

Docker Hub (OCI Support)
```

---

# 7. OCI Workflow

```
Developer

↓

helm package

↓

helm push

↓

OCI Registry

↓

GitHub Actions

↓

helm pull

↓

helm install

↓

Production
```

---

# 8. OCI Commands

Enable OCI Support (Helm 3.8+ has OCI enabled by default)

Login

```bash
helm registry login myregistry.example.com
```

Push Chart

```bash
helm push frontend-1.0.0.tgz \
oci://myregistry.example.com/charts
```

Pull Chart

```bash
helm pull \
oci://myregistry.example.com/charts/frontend \
--version 1.0.0
```

Install Chart

```bash
helm install frontend \
oci://myregistry.example.com/charts/frontend \
--version 1.0.0
```

---

# 9. Enterprise Workflow

```
Developer

↓

Git Push

↓

GitHub Actions

↓

helm lint

↓

helm package

↓

helm push

↓

OCI Registry

↓

Production Pipeline

↓

helm pull

↓

helm install
```

---

# 10. Enterprise Use Cases

OCI Registries store

- Docker Images
- Helm Charts
- SBOM
- Cosign Signatures
- Security Metadata
- WASM Modules
- Platform Artifacts

Large organizations are standardizing on OCI.

---

# 11. Production Scenario

A telecom company previously maintained

```
Docker Registry

+

Private Helm Repository
```

Developers frequently synchronized versions manually.

Platform Team migrated to

```
Azure Container Registry

(OCI)
```

Now

```
Docker Images

↓

Helm Charts

↓

Security Signatures

↓

Stored Together
```

GitHub Actions pushed both Docker images and Helm Charts to ACR.

Deployment became simpler and easier to audit.

---

# 12. Interview Questions

## Q1. What is OCI?

### Answer

OCI (Open Container Initiative) defines an open standard for storing and distributing container images and other artifacts such as Helm Charts.

---

## Q2. Can Helm Charts be stored in OCI registries?

### Answer

Yes.

Helm 3 supports storing and retrieving charts from OCI-compliant registries.

---

## Q3. Which command pushes a chart to an OCI registry?

### Answer

```bash
helm push
```

---

## Q4. Which command authenticates to an OCI registry?

### Answer

```bash
helm registry login
```

---

## Q5. Why are enterprises adopting OCI?

### Answer

OCI allows container images, Helm Charts and security artifacts to be managed in one secure, versioned and standardized registry.

---

# 13. Commands

Login

```bash
helm registry login registry.example.com
```

Package

```bash
helm package .
```

Push

```bash
helm push frontend-1.0.0.tgz \
oci://registry.example.com/charts
```

Pull

```bash
helm pull \
oci://registry.example.com/charts/frontend
```

Install

```bash
helm install frontend \
oci://registry.example.com/charts/frontend
```

Logout

```bash
helm registry logout registry.example.com
```

---

# 14. Best Practices

- Use OCI registries for enterprise deployments.
- Store immutable chart versions.
- Authenticate using service accounts.
- Enable TLS.
- Scan artifacts for vulnerabilities.
- Store Docker images and Helm Charts together.
- Use signed artifacts where possible.

---

# 15. Common Mistakes

- Using mutable chart versions.
- Skipping registry authentication.
- Mixing OCI and legacy repository workflows without planning.
- Not versioning charts.
- Allowing manual uploads.
- Ignoring artifact security scanning.

---

# 16. Marathi Quick Revision

- OCI म्हणजे Open Container Initiative.
- OCI Registry मध्ये Docker Images आणि Helm Charts दोन्ही ठेवता येतात.
- `helm push` chart upload करतो.
- `helm pull` chart download करतो.
- `helm registry login` authentication करतो.
- Enterprise मध्ये OCI हा नवीन standard आहे.

---

# 17. Marathi Summary (5+ Experience Revision)

## Simple Explanation

OCI Registry मध्ये Docker Images, Helm Charts आणि इतर artifacts एकाच ठिकाणी ठेवता येतात. त्यामुळे वेगवेगळ्या repositories maintain करण्याची गरज राहत नाही.

### Project Usage

आपल्या Enterprise DevOps Platform मध्ये GitHub Actions प्रथम Docker Image build करून OCI Registry मध्ये push करेल. त्यानंतर `helm package` आणि `helm push` वापरून Helm Chart त्याच Registry मध्ये publish करेल. Production pipeline `helm pull` करून approved chart install करेल.

### Production Best Practice

OCI Registry वापरून Images आणि Helm Charts एकाच registry मध्ये ठेवावेत. Immutable versions वापराव्यात. Registry authentication, TLS आणि artifact scanning अनिवार्य ठेवावे.

### Production Story

एका telecom enterprise मध्ये Docker Images वेगळ्या registry मध्ये आणि Helm Charts वेगळ्या repository मध्ये होते. Version mismatch मुळे deployments fail होत होते. Platform Team ने Azure Container Registry (OCI) स्वीकारले. Images, Helm Charts आणि security artifacts एकाच registry मध्ये store झाले. CI/CD pipeline सोपी झाली आणि deployment consistency सुधारली.

### Investigation Flow

```
Chart Pull Failed

↓

Registry Login

↓

Check Permissions

↓

Verify Chart Version

↓

helm pull

↓

helm install

↓

Verify Release

↓

Close Incident
```

### 5+ Years Memory Trick

**Interview Question:**

Why are modern enterprises moving from traditional Helm repositories to OCI registries?

**Answer:**

"OCI registries provide a single standardized platform for storing Docker images, Helm Charts and other OCI artifacts. This simplifies CI/CD pipelines, improves security, enables unified authentication and version management, and supports immutable, reproducible deployments across enterprise environments."

