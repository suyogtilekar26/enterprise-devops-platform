# Helm Runbook 01 - Install a Helm Release

# Enterprise DevOps Platform

---

# Purpose

This runbook explains the standard operating procedure (SOP) for installing a new Helm Release into a Kubernetes cluster.

It is intended for Platform Engineers, DevOps Engineers and SRE teams responsible for production deployments.

---

# Introduction

A Helm Release is a deployed instance of a Helm Chart.

In enterprise environments, every production deployment follows a standardized installation process that includes:

- Chart Validation
- Environment Validation
- Deployment
- Health Verification
- Documentation
- Rollback Readiness

---

# Production Scenario

Company

ABC Bank

The Platform Team needs to deploy a new version of the API Gateway into the Production Kubernetes Cluster.

Deployment Details

```
Application

API Gateway

Environment

Production

Deployment Tool

Helm

Cluster

production-cluster
```

The deployment must complete without service disruption.

---

# Enterprise Architecture

```
GitHub Actions

        │

        ▼

Docker Image

        │

        ▼

Container Registry

        │

        ▼

Helm Chart

        │

        ▼

values-prod.yaml

        │

        ▼

Production Kubernetes

        │

        ▼

API Gateway Pods
```

---

# Investigation

Before deployment verify the following.

## Kubernetes Context

```bash
kubectl config current-context
```

Expected

```
production-cluster
```

---

## Cluster Health

```bash
kubectl get nodes
```

Verify

```
Ready
```

for every node.

---

## Namespace

Verify namespace exists.

```bash
kubectl get namespace api-prod
```

If required

```bash
kubectl create namespace api-prod
```

---

## Helm Version

```bash
helm version
```

---

## Existing Release

Check whether the release already exists.

```bash
helm list -n api-prod
```

If a release already exists, use the Upgrade Runbook instead of performing a fresh installation.

---

## Validate Chart

```bash
helm lint helm/charts/api-gateway
```

Expected

```
0 chart(s) failed
```

---

## Validate Templates

```bash
helm template api-gateway \
helm/charts/api-gateway \
-f helm/charts/api-gateway/values-prod.yaml
```

Review

- Image
- Replicas
- Resources
- Service
- Labels

---

# Resolution

Install the Helm Release.

```bash
helm install api-gateway \
helm/charts/api-gateway \
-f helm/charts/api-gateway/values-prod.yaml \
-n api-prod
```

Expected

```
STATUS

deployed
```

---

# Validation

## Verify Release

```bash
helm list -n api-prod
```

---

## Verify Status

```bash
helm status api-gateway \
-n api-prod
```

---

## Verify Deployment

```bash
kubectl get deployment -n api-prod
```

---

## Verify Pods

```bash
kubectl get pods -n api-prod
```

Expected

```
Running
```

---

## Verify Service

```bash
kubectl get svc -n api-prod
```

---

## Verify Rollout

```bash
kubectl rollout status deployment/api-gateway-api-gateway \
-n api-prod
```

Expected

```
successfully rolled out
```

---

## Verify Logs

```bash
kubectl logs deployment/api-gateway-api-gateway \
-n api-prod
```

Ensure

- No startup failures
- No configuration errors
- No crash loops

---

# Rollback

If deployment validation fails immediately after installation

```bash
helm uninstall api-gateway \
-n api-prod
```

Investigate the issue before attempting another deployment.

If this installation replaced a previously removed release, follow the organization's recovery process before reinstalling.

---

# Post Deployment Checklist

Verify

- Helm Release
- Deployment
- Replica Count
- Pods
- Service
- Endpoints
- Logs
- Monitoring Dashboard
- Application Health
- Business Validation

Document

- Deployment Time
- Chart Version
- Application Version
- Engineer Name
- Change Request Number

---

# Production Best Practices

- Validate charts before deployment.
- Always deploy using the correct environment values file.
- Verify Kubernetes context before running Helm commands.
- Deploy into dedicated namespaces.
- Record deployment revisions.
- Monitor application logs after deployment.
- Confirm rollout completion before closing the deployment activity.

---

# Common Mistakes

- Deploying into the wrong Kubernetes cluster.
- Installing into the default namespace.
- Using incorrect values files.
- Skipping chart validation.
- Declaring deployment success without verifying rollout.
- Ignoring application logs after installation.

---

# Interview Questions

## Q1. What is a Helm Release?

### Answer

A Helm Release is a deployed instance of a Helm Chart running inside a Kubernetes cluster.

---

## Q2. Which command installs a Helm Release?

```bash
helm install api-gateway \
helm/charts/api-gateway
```

---

## Q3. What should be verified after installing a Helm Release?

### Answer

Verify the Helm release status, Deployment, Pods, Services, rollout status, application logs and application health before considering the deployment successful.

---

# Commands Reference

Verify Context

```bash
kubectl config current-context
```

Validate Chart

```bash
helm lint helm/charts/api-gateway
```

Render Templates

```bash
helm template api-gateway \
helm/charts/api-gateway \
-f helm/charts/api-gateway/values-prod.yaml
```

Install

```bash
helm install api-gateway \
helm/charts/api-gateway \
-f helm/charts/api-gateway/values-prod.yaml \
-n api-prod
```

Verify

```bash
helm status api-gateway -n api-prod

helm list -n api-prod

kubectl get pods -n api-prod

kubectl rollout status deployment/api-gateway-api-gateway -n api-prod
```

---

# Marathi Quick Revision

- Context verify करा.
- Namespace verify करा.
- helm lint करा.
- helm template verify करा.
- helm install करा.
- Pods verify करा.
- Rollout verify करा.
- Logs तपासा.

---

# Marathi Summary (5+ Experience Revision)

या Runbook मध्ये नवीन Helm Release Production Kubernetes Cluster मध्ये install करण्याची संपूर्ण Enterprise SOP पाहिली. Installation पूर्वी Kubernetes context, namespace, chart validation आणि rendered manifests verify करणे आवश्यक आहे. Installation नंतर Helm Release, Pods, Deployment, Service, rollout status आणि application logs validate करूनच deployment पूर्ण मानला जातो. कोणतीही समस्या आढळल्यास uninstall करून root cause analysis केल्यानंतरच पुनः deployment करणे ही Enterprise DevOps best practice आहे.

