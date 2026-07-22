# Helm Runbook 19 - Audit and Compliance for Helm Releases

# Enterprise DevOps Platform

---

# Purpose

This runbook explains the standard operating procedure (SOP) for auditing Helm Releases and validating compliance with enterprise deployment standards.

It enables Platform Engineering, DevOps, Security and Audit teams to verify that every Kubernetes deployment is traceable, approved and compliant with organizational policies.

---

# Introduction

Enterprise deployments are governed by change management and compliance requirements.

Every Helm Release should provide sufficient evidence to answer questions such as

- Who deployed the application?
- When was it deployed?
- Which chart version was used?
- Which application version is running?
- Was the deployment approved?
- Can the deployment be reproduced?
- Can it be rolled back?

Helm Release metadata combined with CI/CD logs provides this audit trail.

---

# Production Scenario

Company

ABC Bank

The Internal Audit Team requests evidence for the latest API Gateway deployment.

The Platform Engineering team must provide deployment history, chart version, configuration, approval records and rollout validation to satisfy compliance requirements.

---

# Enterprise Architecture

```
Developer

        │

        ▼

GitHub Actions

        │

        ▼

Helm Deployment

        │

        ▼

Kubernetes Cluster

        │

        ▼

Helm Release Metadata

        │

        ▼

Audit Records

        │

        ▼

Compliance Report
```

---

# Investigation

Perform the following audit checks.

---

## Step 1

Verify Kubernetes Context.

```bash
kubectl config current-context
```

---

## Step 2

List Helm Releases.

```bash
helm list \
-n api-prod
```

Confirm the expected release exists.

---

## Step 3

Review Release Status.

```bash
helm status api-gateway \
-n api-prod
```

Record

- Release Name
- Namespace
- Status
- Revision
- Last Deployment Time

---

## Step 4

Review Release History.

```bash
helm history api-gateway \
-n api-prod
```

Document

- Revision Numbers
- Deployment Timeline
- Chart Versions
- Status

---

## Step 5

Review Applied Values.

```bash
helm get values api-gateway \
-n api-prod
```

Verify

- Replica Count
- Resources
- Image Tag
- Environment Variables

Ensure production configuration matches approved standards.

---

## Step 6

Review Rendered Manifest.

```bash
helm get manifest api-gateway \
-n api-prod
```

Confirm

- Deployments
- Services
- ConfigMaps
- Secrets References
- Labels
- Annotations

---

## Step 7

Verify Running Image.

```bash
kubectl get pods \
-n api-prod \
-o wide
```

Ensure deployed containers match the approved application version.

---

## Step 8

Review Kubernetes Events.

```bash
kubectl get events \
-n api-prod \
--sort-by=.lastTimestamp
```

Verify there were no deployment failures.

---

## Step 9

Review CI/CD Records.

Verify

- Pipeline ID
- Build Number
- Commit ID
- Change Request
- Deployment Approval
- Deployment Timestamp

---

## Step 10

Verify Monitoring.

Confirm

- Application Healthy
- No Critical Alerts
- Successful Rollout
- SLA Compliance

---

# Resolution

If audit findings are identified

- Correct deployment documentation.
- Update release records.
- Align chart version with approved release.
- Investigate configuration drift.
- Re-run deployment validation if necessary.
- Record corrective actions.

---

# Validation

Verify

```bash
helm status api-gateway \
-n api-prod
```

Verify

```bash
helm history api-gateway \
-n api-prod
```

Verify

```bash
helm get values api-gateway \
-n api-prod
```

Verify

```bash
helm get manifest api-gateway \
-n api-prod
```

Confirm

- Deployment Traceability
- Configuration Integrity
- Version Consistency
- Operational Compliance

---

# Rollback

If an unauthorized or non-compliant deployment is discovered

Identify the last approved release.

```bash
helm history api-gateway \
-n api-prod
```

Rollback.

```bash
helm rollback api-gateway <REVISION> \
-n api-prod
```

Validate application health and document the corrective action.

---

# Audit Checklist

Verify

- Release Exists
- Release Status
- Revision History
- Chart Version
- Application Version
- Approved Configuration
- CI/CD Evidence
- Change Request
- Rollback Capability
- Monitoring Status

---

# Production Best Practices

- Deploy only through approved CI/CD pipelines.
- Maintain immutable chart versions.
- Record every deployment in the change management system.
- Retain Helm release history.
- Review configuration drift regularly.
- Integrate audit evidence into deployment pipelines.
- Maintain least-privilege RBAC for deployment operations.

---

# Common Mistakes

- Deploying directly from local workstations.
- Missing change approvals.
- Using mutable chart versions.
- Losing release history.
- Ignoring configuration drift.
- Failing to document deployment evidence.

---

# Interview Questions

## Q1. Why is Helm Release History important for audits?

### Answer

It provides a complete deployment timeline including revisions, chart versions, deployment timestamps and status, enabling traceability and compliance.

---

## Q2. Which command displays deployment revisions?

```bash
helm history api-gateway -n api-prod
```

---

## Q3. What information should an enterprise deployment audit include?

### Answer

Deployment history, chart version, application version, release status, configuration, CI/CD evidence, change approvals, rollout validation and rollback capability.

---

# Commands Reference

List Releases

```bash
helm list -n api-prod
```

Release Status

```bash
helm status api-gateway -n api-prod
```

Release History

```bash
helm history api-gateway -n api-prod
```

Release Values

```bash
helm get values api-gateway -n api-prod
```

Rendered Manifest

```bash
helm get manifest api-gateway -n api-prod
```

Events

```bash
kubectl get events -n api-prod --sort-by=.lastTimestamp
```

Pods

```bash
kubectl get pods -n api-prod -o wide
```

---

# Marathi Quick Revision

- helm status तपासा.
- helm history verify करा.
- Values तपासा.
- Manifest verify करा.
- CI/CD records तपासा.
- Change approval verify करा.
- Audit evidence document करा.

---

# Marathi Summary (5+ Experience Revision)

या Runbook मध्ये Helm Releases साठी Enterprise Audit आणि Compliance प्रक्रिया समजावली आहे. Helm release metadata, deployment history, chart version, application version, rendered manifests आणि CI/CD records यांच्या आधारे deployment ची traceability आणि compliance पडताळली जाते. Production deployments नेहमी approved pipeline, immutable chart versions आणि documented change management प्रक्रियेद्वारेच झाल्या पाहिजेत. Enterprise DevOps, Security आणि Audit टीमसाठी ही प्रक्रिया regulatory compliance, operational governance आणि deployment accountability सुनिश्चित करण्यासाठी अत्यावश्यक आहे.

