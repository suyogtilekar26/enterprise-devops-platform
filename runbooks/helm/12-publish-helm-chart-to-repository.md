# Helm Runbook 12 - Publish Helm Chart to Repository

# Enterprise DevOps Platform

---

# Purpose

This runbook explains the standard operating procedure (SOP) for publishing a validated Helm Chart package to an Enterprise Helm Repository.

Publishing a chart makes it available for deployment through CI/CD pipelines across Development, QA, UAT and Production environments.

---

# Introduction

After a Helm Chart has been validated and packaged, it should be uploaded to a centralized Helm Repository.

Enterprise repositories provide

- Version Management
- Artifact Storage
- Access Control
- Audit Trail
- Secure Distribution
- CI/CD Integration

Production deployments should always use charts from the approved repository instead of local developer machines.

---

# Production Scenario

Company

ABC Bank

The Platform Engineering Team has successfully packaged API Gateway version **2.2.0**.

The release has been approved by the Change Advisory Board (CAB).

The chart package must now be published to the Enterprise Helm Repository before the Production deployment pipeline can begin.

---

# Enterprise Architecture

```
Developer

        │

        ▼

Git Repository

        │

        ▼

Helm Validation

        │

        ▼

helm package

        │

        ▼

api-gateway-2.2.0.tgz

        │

        ▼

Enterprise Helm Repository

        │

        ▼

GitHub Actions

        │

        ▼

Argo CD / Helm

        │

        ▼

Production Kubernetes
```

---

# Investigation

Before publishing, verify the following.

---

## Step 1

Verify Chart Package Exists.

```bash
ls *.tgz
```

Expected

```
api-gateway-2.2.0.tgz
```

---

## Step 2

Verify Chart Metadata.

```bash
helm show chart api-gateway-2.2.0.tgz
```

Confirm

- Chart Name
- Version
- Description
- App Version

---

## Step 3

Verify Default Values.

```bash
helm show values api-gateway-2.2.0.tgz
```

Review

- Image
- Resources
- Replica Count
- Service

---

## Step 4

Verify Chart Rendering.

```bash
helm template api-gateway api-gateway-2.2.0.tgz
```

Ensure manifests render successfully.

---

## Step 5

Verify Version.

Ensure the chart version does not already exist in the repository.

Never overwrite released versions.

---

# Resolution

## Example Repository Types

Common Enterprise Helm repositories include

- Harbor
- JFrog Artifactory
- Nexus Repository
- ChartMuseum
- OCI Registry

---

## Example Repository Configuration

Add the repository.

```bash
helm repo add enterprise https://helm.company.com/charts
```

Verify.

```bash
helm repo list
```

---

## Authenticate

Authenticate using enterprise credentials or CI/CD service accounts.

Example

```bash
helm registry login registry.company.com
```

---

## Publish Chart

Upload the packaged chart using the organization's approved repository mechanism.

Example (OCI)

```bash
helm push api-gateway-2.2.0.tgz oci://registry.company.com/helm
```

---

## Verify Upload

Search the repository.

```bash
helm search repo api-gateway
```

Verify

- Version
- Repository
- Chart Name

---

## Refresh Local Repository

```bash
helm repo update
```

---

## Verify Download

```bash
helm pull enterprise/api-gateway --version 2.2.0
```

Ensure the package downloads successfully.

---

# Validation

Verify

- Chart uploaded successfully.
- Repository index updated.
- Correct chart version is available.
- Download succeeds.
- Metadata matches the approved release.
- CI/CD pipeline can access the chart.

---

# Rollback

If an incorrect chart is published

- Do not overwrite the existing version.
- Remove the invalid package according to repository policy.
- Correct the chart.
- Increment the chart version if required.
- Package and publish a new release.

Document the incident and notify stakeholders.

---

# Production Release Checklist

Verify

- Chart Validated
- Package Created
- Version Approved
- Repository Authentication Successful
- Upload Completed
- Repository Indexed
- Download Verified
- CI/CD Access Confirmed

---

# Production Best Practices

- Publish only validated charts.
- Use immutable version numbers.
- Protect repositories with RBAC.
- Sign charts when organizational policy requires it.
- Store charts in highly available repositories.
- Integrate publishing into CI/CD pipelines.
- Maintain artifact retention policies.

---

# Common Mistakes

- Publishing unvalidated charts.
- Reusing an existing version number.
- Uploading directly from developer laptops.
- Skipping repository verification.
- Ignoring repository access controls.
- Forgetting to verify download after publishing.

---

# Interview Questions

## Q1. Why are Helm Charts published to a centralized repository?

### Answer

A centralized repository provides secure version management, artifact distribution, auditability and enables consistent deployments across environments.

---

## Q2. Why should released chart versions never be overwritten?

### Answer

Released versions must remain immutable to ensure reproducibility, traceability and reliable rollback.

---

## Q3. Why should a published chart be downloaded and verified?

### Answer

Downloading verifies that the artifact is available, accessible and identical to the approved release before it is consumed by deployment pipelines.

---

# Commands Reference

Show Chart

```bash
helm show chart api-gateway-2.2.0.tgz
```

Show Values

```bash
helm show values api-gateway-2.2.0.tgz
```

Add Repository

```bash
helm repo add enterprise https://helm.company.com/charts
```

Update Repository

```bash
helm repo update
```

Search Repository

```bash
helm search repo api-gateway
```

Pull Chart

```bash
helm pull enterprise/api-gateway --version 2.2.0
```

OCI Login

```bash
helm registry login registry.company.com
```

OCI Push

```bash
helm push api-gateway-2.2.0.tgz oci://registry.company.com/helm
```

---

# Marathi Quick Revision

- Package verify करा.
- Repository configure करा.
- Authentication करा.
- Chart publish करा.
- Repository update करा.
- Chart download करून verify करा.
- Immutable versions वापरा.

---

# Marathi Summary (5+ Experience Revision)

या Runbook मध्ये Enterprise Helm Repository मध्ये Helm Chart publish करण्याची SOP समजावली आहे. Chart publish करण्यापूर्वी package, metadata, rendering आणि version validate केली जाते. त्यानंतर Harbor, Artifactory, Nexus, ChartMuseum किंवा OCI Registry सारख्या Enterprise Repository मध्ये chart upload केला जातो. Publish झाल्यानंतर repository update, chart search आणि download verification करून CI/CD pipeline त्या artifact चा वापर करण्यास तयार आहे याची खात्री केली जाते. Immutable versioning, repository security आणि centralized artifact management या Enterprise DevOps प्रक्रियेतील अत्यंत महत्त्वाच्या सर्वोत्तम पद्धती आहेत.

