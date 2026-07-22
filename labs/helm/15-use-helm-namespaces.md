# Helm Lab 15 - Deploy Helm Releases into Kubernetes Namespaces

# Enterprise DevOps Platform

---

# Lab Objective

In this lab, we will deploy our API Gateway Helm Chart into a dedicated Kubernetes Namespace.

Namespaces are essential in enterprise Kubernetes environments because they provide logical isolation between applications, teams and environments.

After this lab, all future deployments of our Enterprise DevOps Platform will use dedicated namespaces.

---

# Production Scenario

Company

ABC Bank

The Production Kubernetes Cluster hosts more than 300 applications.

Applications are separated using namespaces.

Example

```
frontend-prod

api-prod

payments-prod

monitoring

logging

argocd

ingress-nginx
```

Every Helm release is deployed into its designated namespace.

This prevents resource conflicts and simplifies operational management.

---

# Enterprise Architecture

```
Developer

        │

        ▼

Helm Chart

        │

        ▼

Namespace

api-dev

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

# Current Project

```
Enterprise DevOps Platform

↓

API Gateway

↓

Helm Chart

↓

Kubernetes
```

Target

```
Enterprise DevOps Platform

↓

Namespace

↓

API Gateway

↓

Deployment

↓

Pods

↓

Service
```

---

# Step 1

Verify existing namespaces.

```bash
kubectl get namespaces
```

Example

```
default

kube-system

kube-public

kube-node-lease
```

---

# Step 2

Create a namespace for Development.

```bash
kubectl create namespace api-dev
```

Expected

```
namespace/api-dev created
```

---

# Step 3

Verify namespace.

```bash
kubectl get namespaces
```

Expected

```
api-dev
```

---

# Step 4

Validate the chart.

```bash
helm lint helm/charts/api-gateway
```

---

# Step 5

Deploy into the namespace.

```bash
helm install api-gateway \
helm/charts/api-gateway \
--namespace api-dev
```

Expected

```
STATUS

deployed
```

---

# Step 6

Verify Helm Releases.

```bash
helm list --namespace api-dev
```

Expected

```
api-gateway
```

---

# Step 7

Verify Deployments.

```bash
kubectl get deployment -n api-dev
```

Expected

```
api-gateway-api-gateway
```

---

# Step 8

Verify Pods.

```bash
kubectl get pods -n api-dev
```

Expected

```
Running
```

---

# Step 9

Verify Services.

```bash
kubectl get svc -n api-dev
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
kubectl describe deployment api-gateway-api-gateway -n api-dev
```

Verify

- Replicas
- Events
- Image
- Strategy

---

# Step 11

View Release Status.

```bash
helm status api-gateway \
--namespace api-dev
```

---

# Step 12

View Release History.

```bash
helm history api-gateway \
--namespace api-dev
```

---

# Step 13

Cleanup.

```bash
helm uninstall api-gateway \
--namespace api-dev
```

Delete namespace.

```bash
kubectl delete namespace api-dev
```

---

# Enterprise Namespace Strategy

```
Enterprise DevOps Platform

Namespaces

├── frontend-dev

├── api-dev

├── auth-dev

├── dashboard-dev

├── frontend-prod

├── api-prod

├── auth-prod

└── dashboard-prod
```

Every application and environment is isolated.

---

# Why Namespaces?

Namespaces provide

- Resource Isolation
- RBAC Separation
- Resource Quotas
- Network Policies
- Easier Monitoring
- Easier Troubleshooting

Without namespaces, all applications would share the same logical space.

---

# Validation Checklist

Run

```bash
kubectl get namespaces
```

Run

```bash
helm list --namespace api-dev
```

Run

```bash
kubectl get pods -n api-dev
```

Run

```bash
kubectl get svc -n api-dev
```

Run

```bash
helm status api-gateway \
--namespace api-dev
```

---

# Expected Result

Successfully deployed the API Gateway Helm Release into a dedicated Kubernetes Namespace.

Verified

- Namespace
- Deployment
- Pods
- Service
- Helm Release

---

# Production Best Practices

- Never deploy production workloads into the default namespace.
- Use one namespace per application and environment.
- Apply RBAC at the namespace level.
- Configure ResourceQuota and LimitRange for production namespaces.
- Monitor namespace resource consumption.
- Use namespace naming conventions consistently.

---

# Common Mistakes

- Deploying everything into the default namespace.
- Forgetting the `--namespace` flag.
- Listing releases without specifying the namespace.
- Deleting namespaces before uninstalling Helm releases.
- Mixing Development and Production workloads in the same namespace.

---

# Interview Questions

## Q1. Why are namespaces important in Kubernetes?

### Answer

Namespaces provide logical isolation between applications, environments and teams, enabling better security, resource management and operational control.

---

## Q2. How do you install a Helm release into a namespace?

```bash
helm install api-gateway \
helm/charts/api-gateway \
--namespace api-dev
```

---

## Q3. How do you list Helm releases in a namespace?

```bash
helm list --namespace api-dev
```

---

# Marathi Quick Revision

- Namespace तयार करा.
- Helm Release namespace मध्ये deploy करा.
- `-n` किंवा `--namespace` वापरा.
- Pods आणि Services namespace मध्ये verify करा.
- Default namespace टाळा.

---

# Marathi Summary (5+ Experience Revision)

या Lab मध्ये आपण API Gateway Helm Chart स्वतंत्र Kubernetes Namespace मध्ये deploy केला. Enterprise मध्ये प्रत्येक application आणि प्रत्येक environment साठी स्वतंत्र namespace वापरणे ही standard practice आहे. यामुळे resource isolation, RBAC, monitoring, troubleshooting आणि security अधिक प्रभावीपणे व्यवस्थापित करता येतात. Helm वापरताना namespace-aware commands (`--namespace`) वापरणे अत्यंत महत्त्वाचे आहे.

