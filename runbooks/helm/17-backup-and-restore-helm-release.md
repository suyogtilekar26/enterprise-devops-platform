# Helm Runbook 17 - Backup and Restore Helm Release

# Enterprise DevOps Platform

---

# Purpose

This runbook explains the standard operating procedure (SOP) for backing up and restoring Helm Releases in an enterprise Kubernetes environment.

The objective is to preserve deployment configuration, release metadata and application manifests so that applications can be restored quickly during disaster recovery, cluster migration or accidental deletion.

---

# Introduction

Helm stores release metadata inside Kubernetes.

Backing up this information enables Platform Engineering teams to

- Recover deployments
- Recreate environments
- Compare configurations
- Restore applications
- Support disaster recovery
- Meet compliance requirements

A complete backup includes

- Helm Release Metadata
- Values Files
- Kubernetes Manifests
- Chart Version
- Application Version
- Secrets (where applicable)
- Persistent Data Backup

---

# Production Scenario

Company

ABC Bank

The Production Kubernetes cluster hosting the API Gateway is scheduled for migration.

Before migration begins, the Platform Engineering team must create backups of the Helm Release and deployment configuration so that the application can be restored in the new cluster if required.

---

# Enterprise Architecture

```
Production Cluster

        │

        ▼

Helm Release

        │

        ▼

Release Metadata

        │

        ▼

Values

        │

        ▼

Rendered Manifest

        │

        ▼

Backup Storage

        │

        ▼

Disaster Recovery

        │

        ▼

Restore Cluster
```

---

# Investigation

Perform the following verification steps.

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

Review Release Status.

```bash
helm status api-gateway \
-n api-prod
```

Confirm

- Release Name
- Namespace
- Revision
- Status

---

## Step 4

Review Release History.

```bash
helm history api-gateway \
-n api-prod
```

Record

- Current Revision
- Stable Revision
- Chart Version

---

## Step 5

Export Release Values.

```bash
helm get values api-gateway \
-n api-prod \
-o yaml > backup-values.yaml
```

---

## Step 6

Export Rendered Manifest.

```bash
helm get manifest api-gateway \
-n api-prod > backup-manifest.yaml
```

---

## Step 7

Export Release Notes.

```bash
helm get notes api-gateway \
-n api-prod > release-notes.txt
```

---

## Step 8

Record Chart Information.

```bash
helm show chart enterprise/api-gateway
```

Document

- Chart Version
- App Version

---

## Step 9

Verify Persistent Storage.

```bash
kubectl get pvc \
-n api-prod
```

Determine whether application data also requires backup.

---

# Resolution

## Backup Helm Values.

```bash
helm get values api-gateway \
-n api-prod \
-o yaml > backup-values.yaml
```

---

## Backup Manifest.

```bash
helm get manifest api-gateway \
-n api-prod > backup-manifest.yaml
```

---

## Backup Release Notes.

```bash
helm get notes api-gateway \
-n api-prod > release-notes.txt
```

---

## Store Backup Securely.

Store

- Values
- Manifest
- Notes
- Chart Version
- Release Information

inside the enterprise backup repository.

---

## Restore Application.

Restore using the approved chart version.

Example

```bash
helm install api-gateway \
enterprise/api-gateway \
--version 2.2.0 \
-f backup-values.yaml \
-n api-prod
```

---

## Restore Persistent Data.

If the application is stateful,

restore

- Database
- PVC Data
- Object Storage

according to enterprise backup procedures.

---

# Validation

Verify

```bash
helm status api-gateway \
-n api-prod
```

Verify

```bash
kubectl get pods \
-n api-prod
```

Verify

```bash
kubectl rollout status deployment/api-gateway-api-gateway \
-n api-prod
```

Verify

```bash
kubectl get svc \
-n api-prod
```

Verify

```bash
kubectl get endpoints \
-n api-prod
```

Validate

- Login
- API
- Dashboard
- Health Endpoint

---

# Rollback

If restoration fails

- Verify chart version.
- Verify values file.
- Verify Kubernetes resources.
- Restore from the previous verified backup.
- Escalate according to disaster recovery procedures.

---

# Backup Checklist

Verify

- Release Status
- Chart Version
- Values Backup
- Manifest Backup
- Notes Backup
- Release History
- Persistent Data Backup
- Backup Storage Location
- Restore Validation

---

# Production Best Practices

- Backup before every production upgrade.
- Store backups in secure centralized storage.
- Encrypt backup data where required.
- Test restoration regularly.
- Keep chart versions aligned with backups.
- Include persistent data in disaster recovery plans.
- Document every backup and restore activity.

---

# Common Mistakes

- Backing up only Helm metadata and not application data.
- Forgetting to save custom values.
- Losing chart version information.
- Not testing restore procedures.
- Storing backups on local developer systems.
- Ignoring database backup requirements.

---

# Interview Questions

## Q1. What should be backed up for a Helm Release?

### Answer

Release values, rendered manifests, chart version, release metadata, release notes and any associated application data.

---

## Q2. Which command exports the values of a Helm Release?

```bash
helm get values api-gateway -n api-prod -o yaml
```

---

## Q3. Why are Helm backups important?

### Answer

They enable disaster recovery, environment recreation, cluster migration and faster restoration after accidental deletion or infrastructure failures.

---

# Commands Reference

Release Status

```bash
helm status api-gateway -n api-prod
```

Release History

```bash
helm history api-gateway -n api-prod
```

Export Values

```bash
helm get values api-gateway -n api-prod -o yaml
```

Export Manifest

```bash
helm get manifest api-gateway -n api-prod
```

Export Notes

```bash
helm get notes api-gateway -n api-prod
```

Install from Backup

```bash
helm install api-gateway \
enterprise/api-gateway \
--version 2.2.0 \
-f backup-values.yaml \
-n api-prod
```

---

# Marathi Quick Revision

- Release verify करा.
- Values backup घ्या.
- Manifest backup घ्या.
- Notes save करा.
- Chart version नोंदवा.
- Stateful data backup घ्या.
- Restore validate करा.

---

# Marathi Summary (5+ Experience Revision)

या Runbook मध्ये Helm Release चे Backup आणि Restore करण्याची Enterprise SOP समजावली आहे. Backup मध्ये Helm values, rendered manifests, release notes, chart version आणि आवश्यक असल्यास persistent application data समाविष्ट असतो. Disaster Recovery, Cluster Migration किंवा accidental deletion झाल्यास approved chart version आणि backup values वापरून application restore केली जाते. Enterprise DevOps मध्ये नियमित backup, restore testing आणि secure centralized storage ही अत्यावश्यक operational practices आहेत.

