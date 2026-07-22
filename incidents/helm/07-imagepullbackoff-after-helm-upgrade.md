# Helm Incident 07 - ImagePullBackOff After Helm Upgrade

# Enterprise DevOps Platform

---

# Purpose

This incident simulates a real-world enterprise production outage where a Helm upgrade succeeds, but the application Pods fail with the **ImagePullBackOff** error because Kubernetes cannot pull the container image.

The objective is to investigate the issue, identify the root cause, restore production services and implement preventive controls.

---

# Incident Summary

| Field | Value |
|-------|-------|
| Incident ID | INC-HLM-007 |
| Severity | SEV-1 |
| Environment | Production |
| Application | API Gateway |
| Cluster | production-cluster |
| Namespace | api-prod |
| Reported By | Prometheus Alertmanager |
| Status | Resolved |

---

# Business Impact

A scheduled production deployment completed successfully from the Helm perspective.

However, Kubernetes failed to start the new Pods because the application image could not be downloaded.

Business impact included

- Public APIs unavailable
- Customer login failures
- Internal Dashboard unavailable
- Deployment rollback delayed
- Production outage

---

# Enterprise Architecture

```
React Frontend

        │

        ▼

API Gateway

        │

 ┌───────────────┐
 ▼               ▼

Auth Service   Dashboard Service

        │

        ▼

PostgreSQL

        │

        ▼

Redis
```

Deployment Flow

```
GitHub Actions

        │

        ▼

Docker Image Build

        │

        ▼

Image Push

        │

        ▼

Helm Upgrade

        │

        ▼

Pods Created

        │

        ▼

ImagePullBackOff

        │

        ▼

Platform Engineering

        │

        ▼

Recovery
```

---

# Symptoms

Deployment pipeline reported

```
Upgrade completed successfully.
```

Production monitoring reported

- Application unavailable
- Pods stuck in Pending
- No application endpoints available
- Health checks failing

---

# Initial Investigation

Verify Helm release.

```bash
helm status api-gateway \
-n api-prod
```

Output

```
STATUS

deployed
```

---

Verify Pods.

```bash
kubectl get pods \
-n api-prod
```

Output

```
ImagePullBackOff
```

---

Describe affected Pod.

```bash
kubectl describe pod <POD_NAME> \
-n api-prod
```

Observed

```
Failed to pull image

ImagePullBackOff
```

---

Review Events.

```bash
kubectl get events \
-n api-prod \
--sort-by=.lastTimestamp
```

Observed

```
Failed to pull image

manifest unknown

repository not found
```

---

Review Deployment.

```bash
kubectl describe deployment api-gateway-api-gateway \
-n api-prod
```

---

Review current image.

```bash
kubectl get deployment api-gateway-api-gateway \
-n api-prod \
-o=jsonpath='{.spec.template.spec.containers[0].image}'
```

Output

```
company/api-gateway:v2.4.0
```

---

Verify image exists.

```bash
docker manifest inspect company/api-gateway:v2.4.0
```

Returned

```
manifest unknown
```

---

Review Helm values.

```bash
helm get values api-gateway \
-n api-prod
```

Observed

```
image.tag=v2.4.0
```

The published image version was actually

```
v2.3.1
```

---

# Root Cause

The Helm chart referenced a container image tag that had never been published to the container registry.

Helm successfully updated the Deployment, but Kubernetes could not pull the non-existent image.

---

# Resolution

Update the Production values file with the correct image tag.

```yaml
image:
  repository: company/api-gateway
  tag: v2.3.1
```

Deploy the corrected release.

```bash
helm upgrade api-gateway \
helm/charts/api-gateway \
-f values-prod.yaml \
-n api-prod
```

---

# Validation

Verify release.

```bash
helm status api-gateway \
-n api-prod
```

Expected

```
STATUS

deployed
```

---

Verify Pods.

```bash
kubectl get pods \
-n api-prod
```

Expected

```
Running
```

---

Verify image.

```bash
kubectl get deployment api-gateway-api-gateway \
-n api-prod \
-o=jsonpath='{.spec.template.spec.containers[0].image}'
```

Expected

```
company/api-gateway:v2.3.1
```

---

Verify rollout.

```bash
kubectl rollout status deployment/api-gateway-api-gateway \
-n api-prod
```

---

Business Validation

- Customer login successful
- API endpoints healthy
- Dashboard accessible
- Health endpoint returned HTTP 200

---

# Incident Timeline

| Time | Activity |
|------|----------|
| 13:00 | Deployment started |
| 13:03 | Helm upgrade completed |
| 13:05 | Pods entered ImagePullBackOff |
| 13:08 | Monitoring alerts triggered |
| 13:12 | Incident declared |
| 13:20 | Pod events reviewed |
| 13:30 | Incorrect image tag identified |
| 13:36 | Values updated |
| 13:42 | Upgrade executed |
| 13:48 | Service restored |
| 13:55 | Incident closed |

---

# Root Cause Analysis (5 Whys)

### Why did Pods fail?

Kubernetes could not download the container image.

---

### Why?

The specified image tag did not exist.

---

### Why?

The Helm values file referenced an unpublished image version.

---

### Why?

The deployment pipeline did not validate image availability.

---

### Why?

No release gate verified that the Docker image had been successfully pushed before deployment.

---

# Corrective Actions

- Deploy the correct image version.
- Validate image tags before deployment.
- Update deployment documentation.
- Improve CI/CD validation.
- Review release process.

---

# Preventive Actions

- Validate image existence before Helm upgrades.
- Block deployments if image is unavailable.
- Publish Docker images before Helm deployment.
- Use immutable image tags.
- Automate registry verification in CI/CD.
- Integrate image signing and verification.

---

# Lessons Learned

- Helm only updates Kubernetes resources.
- Kubernetes must successfully download images.
- Image validation should be part of every deployment.
- Immutable image tags reduce deployment failures.
- Registry verification prevents production outages.

---

# Production Best Practices

- Never deploy unpublished image tags.
- Use immutable versioning.
- Validate registry availability.
- Automate image verification.
- Monitor Pod events after deployment.
- Keep rollback plans ready.
- Integrate container registry validation into release pipelines.

---

# Interview Questions

## Q1. Why can Helm report a successful deployment while Pods remain in ImagePullBackOff?

### Answer

Helm successfully updates Kubernetes resources, but Kubernetes independently downloads container images. If the image is unavailable, Pods cannot start.

---

## Q2. Which command is most useful for identifying ImagePullBackOff errors?

### Answer

```bash
kubectl describe pod <POD_NAME> -n api-prod
```

---

## Q3. How can enterprises prevent ImagePullBackOff incidents?

### Answer

By validating image availability, using immutable image tags, integrating registry verification into CI/CD pipelines and blocking deployments when images are missing.

---

# Commands Reference

Release Status

```bash
helm status api-gateway -n api-prod
```

Pods

```bash
kubectl get pods -n api-prod
```

Describe Pod

```bash
kubectl describe pod <POD_NAME> -n api-prod
```

Events

```bash
kubectl get events -n api-prod --sort-by=.lastTimestamp
```

Current Image

```bash
kubectl get deployment api-gateway-api-gateway \
-n api-prod \
-o=jsonpath='{.spec.template.spec.containers[0].image}'
```

Upgrade

```bash
helm upgrade api-gateway \
helm/charts/api-gateway \
-f values-prod.yaml \
-n api-prod
```

---

# Marathi Quick Revision

- Helm deployment successful झाला.
- Pods ImagePullBackOff मध्ये गेले.
- Pod describe करा.
- Events तपासा.
- Image tag verify करा.
- योग्य image tag deploy करा.
- Validation करा.

---

# Marathi Summary (5+ Experience Revision)

या Incident मध्ये Helm upgrade यशस्वी झाला, परंतु Kubernetes ला आवश्यक container image registry मधून मिळाली नाही आणि Pods `ImagePullBackOff` स्थितीत गेले. Investigation मध्ये `kubectl describe pod`, Kubernetes events आणि Helm values तपासून चुकीचा image tag हा root cause असल्याचे आढळले. योग्य image tag वापरून Helm upgrade पुन्हा execute करण्यात आला आणि application पुन्हा सुरू झाला. या Incident मधून Docker image publishing, immutable image tagging, registry validation आणि CI/CD release gates यांचे Production deployments मध्ये असलेले महत्त्व स्पष्ट होते.

