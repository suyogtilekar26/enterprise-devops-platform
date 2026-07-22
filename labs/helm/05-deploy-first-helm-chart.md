# Helm Lab 05 - Deploy First Helm Chart

# Enterprise DevOps Platform

---

# Lab Objective

In this lab, we will deploy our first Helm Chart into the Kubernetes cluster.

This deployment is only for understanding the complete Helm Release lifecycle.

We are **not deploying our Enterprise DevOps Platform yet**.

That begins in upcoming labs.

---

# Production Scenario

Company

ABC Bank

Before deploying production applications, every newly onboarded Platform Engineer performs a validation deployment using a sample Helm Chart.

Purpose

- Verify Helm
- Verify Kubernetes connectivity
- Verify Release lifecycle
- Verify Upgrade capability
- Verify Rollback capability

Only after successful validation are engineers allowed to deploy production applications.

---

# Current Architecture

```
Developer Laptop

        │

        ▼

Helm CLI

        │

        ▼

Kind Kubernetes Cluster

        │

        ▼

Sample Helm Release
```

---

# Enterprise Deployment Flow

```
helm install

↓

Chart Rendered

↓

Templates Converted

↓

Kubernetes API

↓

Deployment Created

↓

Service Created

↓

Pods Running

↓

Release Stored
```

---

# Step 1

Go to project directory.

```bash
cd ~/devops-lab/enterprise-devops-platform
```

---

# Step 2

Verify cluster.

```bash
kubectl get nodes
```

Expected

```
kind-control-plane

Ready
```

---

# Step 3

Verify chart exists.

```bash
ls helm/charts
```

Expected

```
demo-chart
```

---

# Step 4

Install chart.

```bash
helm install demo-release helm/charts/demo-chart
```

Expected

```
NAME: demo-release

STATUS: deployed

REVISION: 1
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

demo-release

STATUS

deployed
```

---

# Step 6

Verify Kubernetes Resources.

```bash
kubectl get all
```

Expected Resources

```
Deployment

ReplicaSet

Pod

Service
```

---

# Step 7

Verify Pods.

```bash
kubectl get pods
```

Expected

```
Running
```

---

# Step 8

Describe Deployment.

```bash
kubectl describe deployment demo-release-demo-chart
```

Review

- Replicas
- Labels
- Events
- Strategy

---

# Step 9

Describe Service.

```bash
kubectl get svc
```

Example

```
demo-release-demo-chart

ClusterIP
```

---

# Step 10

View Release Details.

```bash
helm status demo-release
```

Expected

```
STATUS

deployed

REVISION

1
```

---

# Step 11

View Release Manifest.

```bash
helm get manifest demo-release
```

Notice

Helm has rendered Kubernetes YAML from templates.

---

# Step 12

View Release Values.

```bash
helm get values demo-release
```

Currently

Default values.yaml is being used.

---

# Step 13

View Release History.

```bash
helm history demo-release
```

Expected

```
REVISION

1

STATUS

deployed
```

---

# Step 14

Uninstall Release.

```bash
helm uninstall demo-release
```

---

# Step 15

Verify Cleanup.

```bash
helm list

kubectl get all
```

Expected

No Helm releases.

No application resources.

---

# Enterprise Project Usage

Today

```
demo-chart

↓

demo-release
```

Upcoming Labs

```
Frontend Chart

↓

API Gateway Chart

↓

Auth Chart

↓

Dashboard Chart
```

Eventually

```
Enterprise DevOps Platform

↓

Helm

↓

Production Kubernetes
```

---

# Release Lifecycle

```
Chart

↓

Install

↓

Release

↓

Upgrade

↓

History

↓

Rollback

↓

Uninstall
```

This lifecycle is followed in every enterprise Kubernetes deployment.

---

# Validation Checklist

Verify

```bash
helm list
```

Verify

```bash
helm status demo-release
```

Verify

```bash
kubectl get pods
```

Verify

```bash
helm history demo-release
```

Verify

```bash
helm uninstall demo-release
```

---

# Expected Result

Successfully

- Installed first Helm Release
- Viewed Release metadata
- Viewed rendered manifests
- Viewed Release history
- Removed Release

---

# Production Best Practices

Never deploy directly into Production without validating:

- Chart
- Cluster connectivity
- Values
- Templates
- Release history

Always verify the release immediately after installation.

---

# Common Mistakes

- Installing into the wrong namespace.
- Forgetting to verify Pods.
- Ignoring Helm status.
- Not checking release history.
- Forgetting to uninstall test releases.
- Assuming "helm install" means the application is healthy.

---

# Interview Questions

## Q1. What is the difference between a Chart and a Release?

### Answer

A Chart is a package containing Kubernetes templates and configuration.

A Release is a deployed instance of a Chart running inside a Kubernetes cluster.

---

## Q2. Which command installs a Helm Chart?

```bash
helm install <release-name> <chart-path>
```

Example

```bash
helm install demo-release helm/charts/demo-chart
```

---

## Q3. How do you verify a successful Helm deployment?

### Answer

Verify:

- `helm list`
- `helm status`
- `kubectl get pods`
- `kubectl get svc`
- `kubectl describe deployment`
- Application health endpoints

---

# Marathi Quick Revision

- Chart install करा.
- Release verify करा.
- Pods तपासा.
- Service तपासा.
- History तपासा.
- Uninstall करा.
- Release म्हणजे deployed Chart.

---

# Marathi Summary (5+ Experience Revision)

या Lab मध्ये आपण पहिला Helm Release deploy केला. Helm Chart install झाल्यानंतर Release तयार होतो आणि Kubernetes मध्ये Deployment, Service, ReplicaSet आणि Pods तयार होतात. Production मध्ये `helm install` नंतर नेहमी `helm status`, `helm history`, `kubectl get pods` आणि application health verify करणे आवश्यक असते. पुढील Labs मध्ये आपण आपल्या Enterprise DevOps Platform साठी वास्तविक production-ready Helm Charts तयार करू.

