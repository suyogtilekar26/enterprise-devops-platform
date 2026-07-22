# Helm Runbook 18 - Disaster Recovery for Helm Deployments

# Enterprise DevOps Platform

---

# Purpose

This runbook explains the standard operating procedure (SOP) for recovering Helm-managed applications after a Kubernetes cluster failure or disaster.

It provides a structured recovery process followed by Enterprise DevOps, Platform Engineering and SRE teams to restore business-critical applications with minimal downtime.

---

# Introduction

Disaster Recovery (DR) is the process of restoring critical services after a catastrophic failure.

Typical disaster scenarios include

- Kubernetes Cluster Failure
- Cloud Region Failure
- Accidental Cluster Deletion
- Storage Corruption
- Control Plane Failure
- Infrastructure Disaster
- Ransomware Recovery
- Human Error

Helm simplifies recovery by allowing applications to be redeployed using versioned charts and backed-up configuration.

---

# Production Scenario

Company

ABC Bank

The primary Production Kubernetes cluster hosting the Enterprise DevOps Platform becomes unavailable due to a cloud infrastructure outage.

The Disaster Recovery (DR) cluster has already been provisioned.

The Platform Engineering team must restore the API Gateway application using the approved Helm Chart, backed-up values and application data.

---

# Enterprise Architecture

```
Primary Cluster

        │

        ▼

Infrastructure Failure

        │

        ▼

Disaster Declared

        │

        ▼

DR Kubernetes Cluster

        │

        ▼

Restore Helm Repository

        │

        ▼

Restore Helm Release

        │

        ▼

Restore Persistent Data

        │

        ▼

Validate Application

        │

        ▼

Business Traffic Restored
```

---

# Investigation

Perform the following verification steps.

---

## Step 1

Confirm Disaster Declaration.

Verify

- Incident Number
- Disaster Approval
- Change Approval
- Recovery Window

---

## Step 2

Verify DR Cluster.

```bash
kubectl config current-context
```

Expected

```
dr-cluster
```

---

## Step 3

Verify Cluster Health.

```bash
kubectl get nodes
```

Confirm

```
Ready
```

for all worker nodes.

---

## Step 4

Verify Namespace.

```bash
kubectl get ns
```

Create the application namespace if required.

---

## Step 5

Verify Helm Repository.

```bash
helm repo list
```

Ensure the enterprise repository is configured.

---

## Step 6

Update Repository.

```bash
helm repo update
```

---

## Step 7

Verify Chart Availability.

```bash
helm search repo api-gateway
```

Confirm the approved production chart version exists.

---

## Step 8

Verify Backup Files.

Ensure the following are available.

- backup-values.yaml
- Release Documentation
- Chart Version
- Database Backup
- Persistent Storage Backup

---

# Resolution

## Create Namespace.

```bash
kubectl create namespace api-prod
```

Skip if the namespace already exists.

---

## Restore Helm Release.

```bash
helm install api-gateway \
enterprise/api-gateway \
--version 2.2.0 \
-f backup-values.yaml \
-n api-prod
```

---

## Verify Deployment.

```bash
helm status api-gateway \
-n api-prod
```

---

## Restore Persistent Data.

Restore

- Database
- Persistent Volumes
- Object Storage
- Shared Files

using the approved enterprise backup solution.

---

## Verify Pods.

```bash
kubectl get pods \
-n api-prod
```

---

## Verify Services.

```bash
kubectl get svc \
-n api-prod
```

---

## Verify Endpoints.

```bash
kubectl get endpoints \
-n api-prod
```

---

## Restore External Connectivity.

Restore

- DNS
- Load Balancer
- Ingress
- API Gateway Routing
- Certificates

---

# Validation

Verify

```bash
helm status api-gateway \
-n api-prod
```

Expected

```
STATUS

deployed
```

Verify

```bash
kubectl rollout status deployment/api-gateway-api-gateway \
-n api-prod
```

Verify

```bash
kubectl get pods \
-n api-prod
```

Expected

```
Running
```

Verify

```bash
kubectl get endpoints \
-n api-prod
```

Validate business functionality.

- Login
- Authentication
- Dashboard
- APIs
- Health Endpoint

Confirm monitoring dashboards report healthy application status.

---

# Rollback

If recovery fails

- Verify chart version.
- Verify backup values.
- Verify persistent data restoration.
- Review Kubernetes Events.
- Reinstall using the previous verified backup.
- Escalate according to Disaster Recovery procedures.

Document every recovery attempt.

---

# Disaster Recovery Checklist

Verify

- DR Cluster Ready
- Namespace Created
- Repository Available
- Chart Available
- Backup Values Available
- Persistent Data Restored
- Helm Release Installed
- Pods Running
- Services Available
- Endpoints Healthy
- DNS Updated
- Business Validation Complete

---

# Production Best Practices

- Test Disaster Recovery regularly.
- Maintain versioned Helm Charts.
- Keep backup values synchronized with Production.
- Replicate Helm repositories across regions.
- Backup application data independently of Helm.
- Automate DR validation where possible.
- Document Recovery Time Objective (RTO) and Recovery Point Objective (RPO).

---

# Common Mistakes

- Recovering with an incorrect chart version.
- Forgetting to restore persistent data.
- Using outdated values files.
- Skipping application validation.
- Ignoring DNS updates.
- Assuming Helm alone restores application state.

---

# Interview Questions

## Q1. Does Helm perform complete Disaster Recovery by itself?

### Answer

No.

Helm restores Kubernetes resources, but databases, persistent storage, DNS, certificates and external integrations must also be restored separately.

---

## Q2. What files are essential for restoring a Helm Release?

### Answer

- Helm Chart
- Chart Version
- Custom Values File
- Release Documentation
- Application Data Backups

---

## Q3. Why should Disaster Recovery be tested periodically?

### Answer

Regular testing validates recovery procedures, verifies backup integrity and ensures Recovery Time Objectives (RTO) can be achieved during real incidents.

---

# Commands Reference

Cluster

```bash
kubectl get nodes
```

Namespaces

```bash
kubectl get ns
```

Repository

```bash
helm repo update
```

Search Chart

```bash
helm search repo api-gateway
```

Install

```bash
helm install api-gateway \
enterprise/api-gateway \
--version 2.2.0 \
-f backup-values.yaml \
-n api-prod
```

Status

```bash
helm status api-gateway -n api-prod
```

Pods

```bash
kubectl get pods -n api-prod
```

Rollout

```bash
kubectl rollout status deployment/api-gateway-api-gateway -n api-prod
```

---

# Marathi Quick Revision

- DR Cluster verify करा.
- Repository verify करा.
- Chart version verify करा.
- Backup values वापरा.
- Helm install करा.
- Database restore करा.
- Pods verify करा.
- Business validation करा.

---

# Marathi Summary (5+ Experience Revision)

या Runbook मध्ये Helm-based applications साठी Enterprise Disaster Recovery प्रक्रिया समजावली आहे. Kubernetes cluster fail झाल्यानंतर DR cluster तयार असल्याची खात्री करून Enterprise Helm Repository मधील approved chart, backup values आणि application data वापरून application restore केली जाते. Helm केवळ Kubernetes resources restore करतो; databases, persistent storage, DNS, certificates आणि external integrations स्वतंत्रपणे restore करणे आवश्यक असते. Recovery पूर्ण झाल्यानंतर business validation, monitoring verification आणि DR documentation पूर्ण करणे ही Enterprise Platform Engineering आणि SRE टीमची मानक प्रक्रिया आहे.

