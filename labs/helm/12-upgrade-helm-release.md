# Helm Lab 12 - Upgrade Helm Release

# Enterprise DevOps Platform

---

# Lab Objective

In this lab, we will perform our first Helm Release Upgrade.

Instead of deleting and reinstalling the application, Helm upgrades the existing release while preserving release history.

This is the standard deployment approach used in enterprise production environments.

---

# Production Scenario

Company

ABC Bank

A bug has been fixed in the API Gateway.

Current Production Version

```
v1.0.0
```

New Version

```
v1.1.0
```

Instead of deleting the deployment, the Platform Team performs an in-place Helm upgrade.

Benefits

- Zero downtime (when configured properly)
- Release history maintained
- Easy rollback
- Controlled deployment

This is exactly how our Enterprise DevOps Platform will be managed.

---

# Enterprise Deployment Flow

```
Git Commit

        │

        ▼

Docker Build

        │

        ▼

Docker Image

v1.1.0

        │

        ▼

Update values.yaml

        │

        ▼

helm upgrade

        │

        ▼

Rolling Update

        │

        ▼

New Pods
```

---

# Prerequisites

Verify cluster.

```bash
kubectl get nodes
```

Verify Helm.

```bash
helm version
```

Verify chart.

```bash
helm lint helm/charts/api-gateway
```

---

# Step 1

Deploy the current release.

```bash
helm install api-gateway helm/charts/api-gateway
```

Verify.

```bash
helm list
```

---

# Step 2

Update the application version.

Open

```bash
nano helm/charts/api-gateway/values.yaml
```

Locate

```yaml
image:

  tag: "1.0.0"
```

Change

```yaml
image:

  tag: "1.1.0"
```

Save the file.

---

# Step 3

Verify the modification.

```bash
grep tag helm/charts/api-gateway/values.yaml
```

Expected

```
tag: "1.1.0"
```

---

# Step 4

Validate the chart.

```bash
helm lint helm/charts/api-gateway
```

Expected

```
0 chart(s) failed
```

---

# Step 5

Render the manifests.

```bash
helm template api-gateway helm/charts/api-gateway
```

Verify

```
image:

enterprise-devops-platform/api-gateway:1.1.0
```

---

# Step 6

Upgrade the Release.

```bash
helm upgrade api-gateway helm/charts/api-gateway
```

Expected

```
Release

"api-gateway"

has been upgraded
```

---

# Step 7

Verify Helm Status.

```bash
helm status api-gateway
```

Expected

```
STATUS

deployed

REVISION

2
```

Notice

Revision increased from

```
1

↓

2
```

---

# Step 8

Verify Release History.

```bash
helm history api-gateway
```

Expected

```
REVISION

1

REVISION

2
```

Helm stores every deployment.

---

# Step 9

Verify Deployment.

```bash
kubectl get deployment
```

---

# Step 10

Verify Pods.

```bash
kubectl get pods
```

Observe

Old Pods terminate.

New Pods start.

This is a Rolling Update.

---

# Step 11

Describe Deployment.

```bash
kubectl describe deployment api-gateway-api-gateway
```

Verify

- New Image
- Replica Count
- Events
- Rolling Update Strategy

---

# Step 12

Verify Image.

```bash
kubectl describe pod
```

Locate

```
Image

enterprise-devops-platform/api-gateway:1.1.0
```

---

# Step 13

View Current Values.

```bash
helm get values api-gateway
```

Expected

```
tag: 1.1.0
```

---

# Step 14

Cleanup.

```bash
helm uninstall api-gateway
```

---

# Enterprise Release Lifecycle

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

Revision 2
```

Helm automatically tracks every revision.

---

# Validation Checklist

Run

```bash
helm history api-gateway
```

Run

```bash
helm status api-gateway
```

Run

```bash
kubectl get pods
```

Run

```bash
helm get values api-gateway
```

Verify

- Revision Number
- Updated Image
- Running Pods

---

# Expected Result

Successfully upgraded the API Gateway release.

Verified

- Rolling Update
- Revision Increment
- Updated Docker Image
- Release History
- Current Values

---

# Production Best Practices

- Always run `helm lint` before upgrades.
- Review changes using `helm template`.
- Upgrade instead of uninstall/install.
- Verify application health after upgrade.
- Monitor Pods during rolling updates.
- Preserve release history for rollback.

---

# Common Mistakes

- Forgetting to update image tags.
- Running uninstall instead of upgrade.
- Ignoring failed Pods after upgrade.
- Skipping release verification.
- Assuming upgrade success without checking the application.

---

# Interview Questions

## Q1. Why use `helm upgrade` instead of reinstalling?

### Answer

`helm upgrade` updates an existing release while preserving release history, enabling controlled deployments and easy rollbacks without recreating the entire release.

---

## Q2. What happens to the Helm revision after an upgrade?

### Answer

Each successful upgrade creates a new revision. For example, Revision 1 becomes Revision 2 after the first upgrade.

---

## Q3. How do you verify a successful Helm upgrade?

### Answer

Verify:

- `helm status`
- `helm history`
- `kubectl get pods`
- `kubectl describe deployment`
- Application health
- Updated container image

---

# Marathi Quick Revision

- image tag बदला.
- helm lint करा.
- helm template verify करा.
- helm upgrade चालवा.
- Revision वाढली का तपासा.
- Pods Rolling Update झाले का verify करा.

---

# Marathi Summary (5+ Experience Revision)

या Lab मध्ये आपण API Gateway Helm Release upgrade केला. `helm upgrade` वापरल्यामुळे नवीन release revision तयार झाली आणि Kubernetes ने Rolling Update करून नवीन Pods सुरू केले. Production मध्ये uninstall/install करण्याऐवजी `helm upgrade` वापरणे ही standard practice आहे, कारण त्यामुळे release history जतन होते आणि rollback करणे सोपे होते.

