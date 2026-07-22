# Incident ID

INC-005

# Incident Title

Kubernetes Deployment Failed During GitHub Actions Pipeline

---

# Severity

SEV-1

---

# Status

Resolved

---

# Date

2026-03-02

---

# Reported By

GitHub Actions

---

# Environment

Development Kubernetes Cluster (Kind)

---

# Services Impacted

- GitHub Actions
- Kubernetes
- API Gateway
- Auth Service
- Dashboard Service
- Frontend

---

# Business Impact

The CI pipeline completed successfully, including Docker image creation and image publication to GitHub Container Registry.

The deployment stage failed while applying Kubernetes manifests, preventing the latest application version from being deployed.

The previous application version remained available.

---

# Detection

GitHub Actions failed during the Kubernetes deployment stage.

Workflow logs reported

```
deployment failed
```

The deployment job terminated before health verification.

---

# Timeline

## 15:05

Developer merged changes into the main branch.

---

## 15:06

CI pipeline started.

---

## 15:09

Build completed successfully.

---

## 15:12

Docker image successfully pushed to GHCR.

---

## 15:14

Deployment stage started.

---

## 15:16

kubectl apply returned an error.

---

## 15:18

DevOps engineer began investigation.

---

## 15:25

Deployment manifest validation completed.

---

## 15:31

Incorrect image tag identified.

---

## 15:36

Deployment manifest corrected.

---

## 15:40

Workflow re-run.

---

## 15:45

Deployment completed successfully.

---

# Symptoms

- Deployment stage failed
- kubectl apply unsuccessful
- New Pods not created
- Rollout incomplete
- Health verification skipped

---

# Investigation

Reviewed workflow logs.

Verified deployment commands.

```bash
kubectl apply -f kubernetes/
```

Verified cluster.

```bash
kubectl get nodes
```

Verified deployments.

```bash
kubectl get deployments
```

Verified Pods.

```bash
kubectl get pods
```

Reviewed deployment events.

```bash
kubectl get events \
--sort-by=.metadata.creationTimestamp
```

Described Deployment.

```bash
kubectl describe deployment api-gateway
```

Reviewed image configuration.

```bash
kubectl describe pod <pod-name>
```

---

# Root Cause

The Kubernetes deployment manifest referenced an incorrect Docker image tag.

GitHub Actions successfully published the new image, but Kubernetes attempted to deploy an image version that did not exist in GitHub Container Registry.

The Deployment controller repeatedly failed to create healthy Pods.

---

# Resolution

Updated the deployment manifest with the correct image tag.

Validated the manifest.

```bash
kubectl apply \
--dry-run=client \
-f kubernetes/
```

Committed the corrected manifest.

Re-ran the GitHub Actions workflow.

Deployment completed successfully.

---

# Verification

Confirmed

- Workflow successful
- Deployment created
- Pods Running
- Services Available
- Rollout completed
- Health endpoint responding

Verified

```bash
kubectl get deployments

kubectl get pods

kubectl get svc

kubectl rollout status deployment/api-gateway
```

---

# Recovery Time

40 Minutes

---

# Preventive Actions

- Use immutable image tags
- Validate image availability before deployment
- Include manifest validation in CI
- Add deployment smoke tests
- Verify rollout status before marking deployment successful

---

# Lessons Learned

- Image tags in Kubernetes manifests must match published container images.
- Deployment validation should occur before production rollout.
- Automated health checks reduce deployment risk.
- Rollout status should always be verified after deployment.

---

# Related Runbooks

- deployment-failure.md
- rollback-failed-deployment.md
- workflow-failure.md

