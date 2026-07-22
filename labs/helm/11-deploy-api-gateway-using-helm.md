# Helm Lab 11 - Deploy API Gateway using Helm

# Enterprise DevOps Platform

---

# Lab Objective

In this lab, we will deploy the API Gateway Helm Chart into our Kubernetes cluster.

This is the first deployment of a real application from our Enterprise DevOps Platform using Helm.

Unlike the previous demo chart, this deployment represents an actual production workflow.

---

# Production Scenario

Company

ABC Bank

The Platform Team has completed the API Gateway Helm Chart.

The release is ready for deployment into the Development Kubernetes cluster.

Deployment Pipeline

```
Developer

↓

GitHub

↓

GitHub Actions

↓

Docker Image

↓

Container Registry

↓

Helm Upgrade --install

↓

Development Kubernetes
```

The same deployment process will later be used for QA, UAT and Production.

---

# Enterprise Architecture

```
API Gateway Source

↓

Docker Image

↓

Helm Chart

↓

Kubernetes Deployment

↓

Pods

↓

Service
```

---

# Prerequisites

Verify the following.

```bash
kubectl get nodes
```

Expected

```
Ready
```

Verify Helm.

```bash
helm version
```

Verify Chart.

```bash
tree helm/charts/api-gateway
```

---

# Step 1

Move to project.

```bash
cd ~/devops-lab/enterprise-devops-platform
```

---

# Step 2

Validate the Helm Chart.

```bash
helm lint helm/charts/api-gateway
```

Expected

```
1 chart(s) linted

0 chart(s) failed
```

Never skip linting before deployment.

---

# Step 3

Render Kubernetes Manifests.

```bash
helm template api-gateway helm/charts/api-gateway
```

Review

- Deployment
- Service
- Labels
- Image
- Resources

Rendering templates before deployment is a production best practice.

---

# Step 4

Install the Release.

```bash
helm install api-gateway helm/charts/api-gateway
```

Expected

```
NAME:

api-gateway

STATUS:

deployed

REVISION:

1
```

---

# Step 5

Verify Helm Releases.

```bash
helm list
```

Expected

```
NAME

api-gateway

STATUS

deployed
```

---

# Step 6

Verify Deployment.

```bash
kubectl get deployment
```

Expected

```
api-gateway-api-gateway
```

---

# Step 7

Verify ReplicaSet.

```bash
kubectl get rs
```

---

# Step 8

Verify Pods.

```bash
kubectl get pods
```

Expected

```
Running
```

If Pods are Pending or CrashLoopBackOff, investigate before proceeding.

---

# Step 9

Verify Service.

```bash
kubectl get svc
```

Expected

```
ClusterIP

5000/TCP
```

---

# Step 10

Describe Deployment.

```bash
kubectl describe deployment api-gateway-api-gateway
```

Review

- Replicas
- Image
- Events
- Conditions

---

# Step 11

Describe Pod.

```bash
kubectl describe pod
```

Verify

- Container Image
- Events
- Resources
- Readiness

---

# Step 12

View Release Details.

```bash
helm status api-gateway
```

Expected

```
STATUS

deployed

REVISION

1
```

---

# Step 13

View Release History.

```bash
helm history api-gateway
```

Expected

```
REVISION

1
```

---

# Step 14

View Release Values.

```bash
helm get values api-gateway
```

Observe

Values loaded from

```
values.yaml
```

---

# Step 15

View Rendered Manifest.

```bash
helm get manifest api-gateway
```

Notice

Templates have become standard Kubernetes YAML.

---

# Step 16

Cleanup

```bash
helm uninstall api-gateway
```

Verify

```bash
helm list

kubectl get all
```

---

# Enterprise Deployment Flow

```
values.yaml

↓

Templates

↓

Helm Rendering

↓

Deployment

↓

ReplicaSet

↓

Pods

↓

Service
```

---

# Validation Checklist

Run

```bash
helm lint helm/charts/api-gateway
```

Run

```bash
helm install api-gateway helm/charts/api-gateway
```

Run

```bash
kubectl get pods
```

Run

```bash
kubectl get svc
```

Run

```bash
helm status api-gateway
```

Run

```bash
helm history api-gateway
```

Run

```bash
helm uninstall api-gateway
```

---

# Expected Result

Successfully deployed the API Gateway using Helm.

Verified

- Deployment
- ReplicaSet
- Pods
- Service
- Helm Release
- Release History

The application has now been deployed using the same lifecycle followed in enterprise production environments.

---

# Production Best Practices

- Always run `helm lint` before deployment.
- Review manifests using `helm template`.
- Verify Pods after installation.
- Verify Services and Endpoints.
- Check Helm Release status.
- Validate application functionality before declaring deployment successful.
- Remove test releases after validation.

---

# Common Mistakes

- Deploying without linting.
- Ignoring Pod failures.
- Assuming Helm success means application success.
- Forgetting to verify Services.
- Not checking Helm history.
- Deploying into the wrong namespace.

---

# Interview Questions

## Q1. How do you deploy a Helm Chart?

### Answer

```bash
helm install <release-name> <chart-path>
```

Example

```bash
helm install api-gateway helm/charts/api-gateway
```

---

## Q2. How do you verify a successful Helm deployment?

### Answer

Verify:

- Helm Release
- Deployment
- Pods
- Services
- Events
- Application health
- Release history

---

## Q3. Why should engineers use `helm template` before deployment?

### Answer

It renders Kubernetes manifests locally, allowing engineers to detect template or configuration issues before applying changes to the cluster.

---

# Marathi Quick Revision

- helm lint करा.
- helm template verify करा.
- helm install करा.
- Pods तपासा.
- Service तपासा.
- helm status तपासा.
- helm history verify करा.

---

# Marathi Summary (5+ Experience Revision)

या Lab मध्ये आपण आपल्या Enterprise DevOps Platform मधील API Gateway Helm Chart प्रथमच Kubernetes मध्ये deploy केला. Production मध्ये deployment करण्यापूर्वी `helm lint` आणि `helm template` वापरून validation करणे अत्यंत महत्त्वाचे आहे. Deployment नंतर Pods, Services, Deployment, Release Status आणि Release History verify करणे ही प्रत्येक DevOps Engineer ची जबाबदारी असते.

