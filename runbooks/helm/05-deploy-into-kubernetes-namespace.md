# Helm Runbook 05 - Deploy into Kubernetes Namespace

# Enterprise DevOps Platform

---

# Purpose

This runbook explains the standard operating procedure (SOP) for deploying a Helm Release into a dedicated Kubernetes Namespace.

Namespaces provide logical isolation for applications, environments and teams, making them an essential component of enterprise Kubernetes deployments.

---

# Introduction

Enterprise Kubernetes clusters host hundreds of applications.

Deploying everything into the `default` namespace creates operational challenges such as:

- Resource Conflicts
- Security Risks
- Difficult Troubleshooting
- Poor RBAC Management
- Monitoring Complexity

Each application should have its own namespace for every environment.

Example

```
frontend-dev

frontend-prod

api-dev

api-prod

auth-prod

dashboard-prod
```

---

# Production Scenario

Company

ABC Bank

The Platform Team is deploying API Gateway version **2.1.0** into the Production namespace.

Deployment Details

```
Application

API Gateway

Namespace

api-prod

Deployment Tool

Helm

Cluster

production-cluster
```

Deployment must not affect any other application running in the cluster.

---

# Enterprise Architecture

```
GitHub Actions

        │

        ▼

Helm Chart

        │

        ▼

values-prod.yaml

        │

        ▼

Namespace

api-prod

        │

        ▼

Deployment

        │

        ▼

Pods

        │

        ▼

Service
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

## Verify Namespace

```bash
kubectl get namespace api-prod
```

If the namespace does not exist

```bash
kubectl create namespace api-prod
```

---

## Verify Cluster Health

```bash
kubectl get nodes
```

Expected

```
Ready
```

---

## Verify Existing Releases

```bash
helm list -n api-prod
```

Determine whether the release already exists.

If it exists, follow the Upgrade Runbook.

---

## Validate Chart

```bash
helm lint helm/charts/api-gateway
```

---

## Validate Templates

```bash
helm template api-gateway \
helm/charts/api-gateway \
-f helm/charts/api-gateway/values-prod.yaml
```

Verify

- Namespace-independent templates
- Deployment
- Service
- Labels
- Resources

---

# Resolution

Deploy the Helm Release into the namespace.

```bash
helm upgrade \
--install api-gateway \
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

## Verify Helm Release

```bash
helm list -n api-prod
```

Expected

```
api-gateway
```

---

## Verify Release Status

```bash
helm status api-gateway \
-n api-prod
```

---

## Verify Deployments

```bash
kubectl get deployment \
-n api-prod
```

---

## Verify Pods

```bash
kubectl get pods \
-n api-prod
```

Expected

```
Running
```

---

## Verify Services

```bash
kubectl get svc \
-n api-prod
```

---

## Verify Endpoints

```bash
kubectl get endpoints \
-n api-prod
```

Ensure Service endpoints are available.

---

## Verify Rollout

```bash
kubectl rollout status deployment/api-gateway-api-gateway \
-n api-prod
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
- No application exceptions

---

# Rollback

View release history.

```bash
helm history api-gateway \
-n api-prod
```

Rollback if required.

```bash
helm rollback api-gateway <REVISION> \
-n api-prod
```

Verify rollout.

```bash
kubectl rollout status deployment/api-gateway-api-gateway \
-n api-prod
```

---

# Namespace Verification Checklist

Verify

- Correct Namespace
- Helm Release
- Deployment
- Pods
- Services
- Endpoints
- Logs
- Monitoring Dashboard
- Business Validation

---

# Enterprise Namespace Strategy

```
Enterprise DevOps Platform

Development

├── frontend-dev
├── api-dev
├── auth-dev
└── dashboard-dev

QA

├── frontend-qa
├── api-qa
├── auth-qa
└── dashboard-qa

UAT

├── frontend-uat
├── api-uat
├── auth-uat
└── dashboard-uat

Production

├── frontend-prod
├── api-prod
├── auth-prod
└── dashboard-prod
```

Each namespace is independently managed using RBAC, ResourceQuota and Network Policies.

---

# Production Best Practices

- Never deploy production workloads into the `default` namespace.
- Maintain separate namespaces for each application and environment.
- Apply RBAC at the namespace level.
- Configure ResourceQuota and LimitRange.
- Monitor namespace resource usage.
- Follow consistent namespace naming conventions.
- Verify namespace before every deployment.

---

# Common Mistakes

- Deploying into the wrong namespace.
- Using the `default` namespace in Production.
- Forgetting the `-n` or `--namespace` option.
- Listing releases without specifying the namespace.
- Mixing Development and Production workloads in the same namespace.

---

# Interview Questions

## Q1. Why are namespaces important in Kubernetes?

### Answer

Namespaces provide logical isolation between applications, teams and environments, improving security, resource management and operational efficiency.

---

## Q2. Which Helm option specifies the namespace?

```bash
--namespace

or

-n
```

---

## Q3. How do you list Helm releases in a specific namespace?

```bash
helm list -n api-prod
```

---

# Commands Reference

Verify Namespace

```bash
kubectl get namespace api-prod
```

Deploy

```bash
helm upgrade \
--install api-gateway \
helm/charts/api-gateway \
-f helm/charts/api-gateway/values-prod.yaml \
-n api-prod
```

Verify Release

```bash
helm status api-gateway \
-n api-prod
```

Verify Pods

```bash
kubectl get pods \
-n api-prod
```

Verify Rollout

```bash
kubectl rollout status deployment/api-gateway-api-gateway \
-n api-prod
```

Rollback

```bash
helm rollback api-gateway <REVISION> \
-n api-prod
```

---

# Marathi Quick Revision

- Namespace verify करा.
- helm lint करा.
- helm template verify करा.
- योग्य namespace मध्ये deploy करा.
- Pods verify करा.
- Rollout verify करा.
- Logs तपासा.
- Rollback तयार ठेवा.

---

# Marathi Summary (5+ Experience Revision)

या Runbook मध्ये Helm Release स्वतंत्र Kubernetes Namespace मध्ये deploy करण्याची Enterprise SOP समजावली आहे. Production मध्ये प्रत्येक application आणि environment साठी स्वतंत्र namespace वापरणे ही standard DevOps practice आहे. Deployment पूर्वी namespace, cluster context आणि chart validation verify करणे आवश्यक आहे. Deployment नंतर Helm Release, Pods, Services, Endpoints, rollout status आणि application logs validate करून deployment यशस्वी असल्याची खात्री केली जाते. Namespace isolation मुळे security, RBAC, monitoring आणि troubleshooting अधिक प्रभावीपणे व्यवस्थापित करता येतात.

