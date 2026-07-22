# Helm Runbook 16 - Cleanup and Uninstall Helm Release

# Enterprise DevOps Platform

---

# Purpose

This runbook explains the standard operating procedure (SOP) for safely uninstalling a Helm Release and cleaning up associated Kubernetes resources in an enterprise environment.

It ensures application removal is performed in a controlled manner without impacting unrelated workloads.

---

# Introduction

There are several situations where a Helm Release needs to be removed.

Examples include

- Environment Decommission
- Failed POC Cleanup
- Temporary Test Environment
- Disaster Recovery Testing
- Application Migration
- Cluster Cleanup
- End of Project Lifecycle

A Helm uninstall should always follow an approved change process in Production.

---

# Production Scenario

Company

ABC Bank

The Platform Engineering Team has migrated the API Gateway to a new Kubernetes cluster.

The old deployment must now be safely removed from the previous cluster.

Before uninstalling the release, engineers must verify dependencies and ensure no production traffic is routed to the existing deployment.

---

# Enterprise Architecture

```
Production Cluster

        │

        ▼

Helm Release

        │

        ▼

Deployment

        │

        ▼

ReplicaSet

        │

        ▼

Pods

        │

        ▼

Service

        │

        ▼

Helm Uninstall

        │

        ▼

Kubernetes Cleanup
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

Ensure the correct cluster is selected.

---

## Step 2

Verify Namespace.

```bash
kubectl get ns
```

Confirm the target namespace exists.

---

## Step 3

List Helm Releases.

```bash
helm list \
-n api-prod
```

Verify

```
api-gateway
```

exists.

---

## Step 4

Review Release Status.

```bash
helm status api-gateway \
-n api-prod
```

Verify

- Current Revision
- Deployment Status
- Namespace

---

## Step 5

Verify Running Workloads.

```bash
kubectl get all \
-n api-prod
```

Identify

- Deployments
- ReplicaSets
- Pods
- Services

---

## Step 6

Verify External Traffic.

Ensure

- DNS
- Load Balancer
- Ingress
- API Gateway
- Monitoring

are no longer routing production traffic to this release.

---

## Step 7

Review Persistent Resources.

Check

```bash
kubectl get pvc \
-n api-prod
```

Verify whether Persistent Volumes must be retained.

---

# Resolution

## Uninstall Helm Release.

```bash
helm uninstall api-gateway \
-n api-prod
```

Expected

```
release "api-gateway" uninstalled
```

---

## Verify Release Removal.

```bash
helm list \
-n api-prod
```

The release should no longer appear.

---

## Verify Kubernetes Resources.

```bash
kubectl get all \
-n api-prod
```

Ensure

- Pods Removed
- Deployments Removed
- ReplicaSets Removed
- Services Removed

---

## Verify Persistent Volume Claims.

```bash
kubectl get pvc \
-n api-prod
```

Remove PVCs only if approved.

---

## Remove Namespace (Optional).

If the namespace is dedicated to this application.

```bash
kubectl delete namespace api-prod
```

Only perform this after confirming no shared workloads exist.

---

# Validation

Verify

```bash
helm list \
-n api-prod
```

Expected

```
No releases found.
```

Verify

```bash
kubectl get all \
-n api-prod
```

Confirm no application resources remain.

Verify

```bash
kubectl get pvc \
-n api-prod
```

Confirm expected storage state.

Verify

- Monitoring
- DNS
- Ingress
- Load Balancer

Ensure no stale references remain.

---

# Rollback

If the release was removed accidentally,

reinstall using the approved chart version.

Example

```bash
helm install api-gateway \
enterprise/api-gateway \
--version 2.2.0 \
-n api-prod
```

Validate

- Pods
- Services
- Endpoints
- Application Health

Restore production traffic only after successful validation.

---

# Cleanup Checklist

Verify

- Release Removed
- Pods Deleted
- ReplicaSets Deleted
- Deployments Deleted
- Services Deleted
- Ingress Removed
- PVC Reviewed
- Namespace Reviewed
- Monitoring Updated
- DNS Updated

---

# Production Best Practices

- Obtain change approval before uninstalling production workloads.
- Verify production traffic has been migrated.
- Preserve backups before removing stateful workloads.
- Review PVC retention policies.
- Remove only application-specific resources.
- Document cleanup activities.
- Monitor the environment after cleanup.

---

# Common Mistakes

- Deleting the wrong release.
- Removing shared namespaces.
- Deleting Persistent Volumes without approval.
- Forgetting DNS cleanup.
- Ignoring monitoring alerts after uninstall.
- Removing applications that still receive production traffic.

---

# Interview Questions

## Q1. Which command removes a Helm Release?

```bash
helm uninstall api-gateway -n api-prod
```

---

## Q2. Does `helm uninstall` always remove Persistent Volumes?

### Answer

No.

Persistent Volumes and Persistent Volume Claims may remain depending on the storage class, reclaim policy and chart configuration.

---

## Q3. Why should production traffic be verified before uninstalling a release?

### Answer

To ensure users are no longer dependent on the existing deployment and to prevent unexpected outages.

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

Uninstall

```bash
helm uninstall api-gateway -n api-prod
```

Resources

```bash
kubectl get all -n api-prod
```

PVC

```bash
kubectl get pvc -n api-prod
```

Delete Namespace

```bash
kubectl delete namespace api-prod
```

---

# Marathi Quick Revision

- helm list तपासा.
- Release verify करा.
- Production traffic migrate झाला आहे का तपासा.
- helm uninstall करा.
- Resources verify करा.
- PVC काळजीपूर्वक तपासा.
- Cleanup validate करा.

---

# Marathi Summary (5+ Experience Revision)

या Runbook मध्ये Helm Release सुरक्षितपणे uninstall करून Kubernetes resources clean up करण्याची Enterprise SOP समजावली आहे. Uninstall करण्यापूर्वी release status, namespace, production traffic, storage resources आणि dependencies verify करणे आवश्यक आहे. `helm uninstall` नंतर Deployments, Pods, Services आणि इतर resources काढले गेले आहेत का ते validate केले जाते. Stateful workloads साठी PVC आणि Persistent Volume retention धोरणांचे पालन करणे अत्यंत महत्त्वाचे आहे. Production cleanup नेहमी change management आणि operational validation सोबतच केले पाहिजे.

