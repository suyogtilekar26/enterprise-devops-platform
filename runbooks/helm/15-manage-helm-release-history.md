# Helm Runbook 15 - Manage Helm Release History

# Enterprise DevOps Platform

---

# Purpose

This runbook explains the standard operating procedure (SOP) for managing Helm Release History in enterprise Kubernetes environments.

Release history enables Platform Engineering, DevOps and SRE teams to audit deployments, investigate incidents, compare revisions and perform safe rollbacks.

---

# Introduction

Every Helm deployment creates a new Release Revision.

These revisions form the deployment history of an application.

Typical Release Lifecycle

```
Install

↓

Revision 1

↓

Upgrade

↓

Revision 2

↓

Upgrade

↓

Revision 3

↓

Rollback

↓

Revision 4
```

Each revision contains

- Chart Version
- App Version
- Deployment Time
- Deployment Status
- Configuration Values
- Manifest Snapshot

Release history is one of Helm's most important operational features.

---

# Production Scenario

Company

ABC Bank

The API Gateway has been upgraded several times during the last month.

A production issue has been reported after the latest deployment.

Before performing a rollback, the Platform Engineering team must review the release history to identify the last known stable revision.

---

# Enterprise Architecture

```
GitHub Actions

        │

        ▼

Helm Install

        │

        ▼

Revision 1

        │

        ▼

Helm Upgrade

        │

        ▼

Revision 2

        │

        ▼

Helm Upgrade

        │

        ▼

Revision 3

        │

        ▼

Helm History

        │

        ▼

Rollback Decision
```

---

# Investigation

Perform the following checks.

---

## Step 1

Verify Kubernetes Context.

```bash
kubectl config current-context
```

---

## Step 2

Verify Release Exists.

```bash
helm list \
-n api-prod
```

Expected

```
api-gateway
```

---

## Step 3

Review Release History.

```bash
helm history api-gateway \
-n api-prod
```

Example

```
REVISION

STATUS

CHART

APP VERSION

DESCRIPTION
```

Verify

- Revision Number
- Status
- Deployment Time
- Chart Version

---

## Step 4

Identify Stable Revision.

Locate the most recent revision with

```
STATUS

deployed
```

or

```
superseded
```

that is known to be stable.

---

## Step 5

Verify Current Status.

```bash
helm status api-gateway \
-n api-prod
```

Confirm

- Current Revision
- Current Status
- Namespace

---

## Step 6

Review Applied Values.

```bash
helm get values api-gateway \
-n api-prod
```

Verify

- Image
- Replica Count
- Resources
- Environment Variables

---

## Step 7

Review Rendered Manifest.

```bash
helm get manifest api-gateway \
-n api-prod
```

Confirm

- Deployment
- Service
- ConfigMap
- Secret References

---

## Step 8

Review Notes.

```bash
helm get notes api-gateway \
-n api-prod
```

Review deployment instructions if provided.

---

# Resolution

## Review Historical Revisions.

```bash
helm history api-gateway \
-n api-prod
```

Document

- Current Revision
- Previous Stable Revision
- Failed Revisions

---

## Compare Configuration.

Review

```bash
helm get values api-gateway
```

and

```bash
helm get manifest api-gateway
```

Identify

- Image Changes
- Configuration Changes
- Resource Changes

---

## Select Rollback Target.

Choose the latest verified stable revision.

Example

```
Revision

5
```

---

## Record Change Details.

Update

- Change Request
- Deployment Record
- Incident Record

before initiating rollback.

---

# Validation

Verify

```bash
helm history api-gateway \
-n api-prod
```

Confirm

- Revision Numbers
- Deployment Timeline
- Status History

Verify

```bash
helm status api-gateway \
-n api-prod
```

Ensure the release information matches deployment records.

---

# Rollback

View release history.

```bash
helm history api-gateway \
-n api-prod
```

Rollback.

```bash
helm rollback api-gateway 5 \
-n api-prod
```

Verify

```bash
helm status api-gateway \
-n api-prod
```

Verify

```bash
kubectl rollout status deployment/api-gateway-api-gateway \
-n api-prod
```

Confirm application functionality after rollback.

---

# Release History Checklist

Verify

- Release Exists
- Revision Numbers
- Deployment Status
- Deployment Timeline
- Stable Revision
- Failed Revision
- Applied Values
- Manifest Snapshot
- Rollback Candidate

---

# Production Best Practices

- Preserve complete release history.
- Never delete release metadata unnecessarily.
- Review release history before every rollback.
- Document deployment revisions in change records.
- Retain deployment history for audits.
- Monitor revision growth in long-running clusters.
- Align release history with CI/CD records.

---

# Common Mistakes

- Rolling back without reviewing history.
- Selecting an incorrect rollback revision.
- Ignoring failed deployment records.
- Losing deployment documentation.
- Assuming the latest revision is always stable.
- Not correlating revisions with incident timelines.

---

# Interview Questions

## Q1. Why is Helm Release History important?

### Answer

Release history provides a complete record of deployments, enabling auditing, troubleshooting and safe rollbacks.

---

## Q2. Which command displays Helm Release History?

```bash
helm history api-gateway -n api-prod
```

---

## Q3. What information is available in Helm Release History?

### Answer

Release history includes revision number, deployment status, chart version, application version, deployment timestamp and deployment description.

---

# Commands Reference

List Releases

```bash
helm list -n api-prod
```

Release History

```bash
helm history api-gateway -n api-prod
```

Release Status

```bash
helm status api-gateway -n api-prod
```

Applied Values

```bash
helm get values api-gateway -n api-prod
```

Rendered Manifest

```bash
helm get manifest api-gateway -n api-prod
```

Release Notes

```bash
helm get notes api-gateway -n api-prod
```

Rollback

```bash
helm rollback api-gateway 5 -n api-prod
```

---

# Marathi Quick Revision

- helm history पाहा.
- Stable revision शोधा.
- helm status verify करा.
- Values तपासा.
- Manifest verify करा.
- Rollback करण्यापूर्वी history review करा.

---

# Marathi Summary (5+ Experience Revision)

या Runbook मध्ये Helm Release History व्यवस्थापित करण्याची Enterprise SOP समजावली आहे. प्रत्येक Helm install, upgrade आणि rollback मुळे नवीन revision तयार होते, ज्यामुळे deployment ची पूर्ण audit trail उपलब्ध राहते. Production incident किंवा rollback करण्यापूर्वी release history, applied values आणि rendered manifests तपासून योग्य stable revision निवडणे अत्यंत महत्त्वाचे असते. Enterprise DevOps आणि SRE टीममध्ये change management, auditing आणि recovery साठी Helm Release History हा एक मूलभूत operational component आहे.

