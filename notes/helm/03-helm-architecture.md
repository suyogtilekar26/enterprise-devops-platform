# Helm Notes 03 - Helm Architecture

# Enterprise DevOps Platform

---

# 1. Purpose

The purpose of this document is to understand the internal architecture of Helm and how it interacts with Kubernetes during application deployment.

This is not a beginner tutorial.

This document explains how Helm components work together in a real enterprise production environment.

---

# 2. Introduction

When we execute a Helm command like

```bash
helm install frontend ./frontend-chart
```

Helm does much more than simply applying YAML files.

Internally, Helm

- Reads the Chart
- Reads values.yaml
- Renders Templates
- Generates Kubernetes Manifests
- Sends them to the Kubernetes API Server
- Stores Release History

Understanding this architecture is important for production troubleshooting and interviews.

---

# 3. Helm Architecture Overview

```
Developer

↓

Helm CLI

↓

Helm Chart

↓

Templates

+

values.yaml

↓

Rendered Kubernetes YAML

↓

Kubernetes API Server

↓

etcd

↓

Scheduler

↓

Worker Nodes

↓

Running Application
```

Every deployment follows this workflow.

---

# 4. Enterprise Architecture

Our Enterprise DevOps Platform

```
GitHub

↓

GitHub Actions

↓

Docker Build

↓

Container Registry

↓

Helm Chart

↓

Argo CD

↓

Kubernetes API Server

↓

Worker Nodes

↓

Application Running
```

Helm acts as the deployment engine between CI/CD and Kubernetes.

---

# 5. Helm Components

## Helm CLI

The command-line tool used by DevOps Engineers.

Examples

```bash
helm install

helm upgrade

helm rollback

helm uninstall
```

Responsible for

- Packaging Charts
- Rendering Templates
- Managing Releases

---

## Chart

A Chart is a packaged Kubernetes application.

Example

```
frontend-chart/

Chart.yaml

values.yaml

templates/

charts/
```

The Chart contains everything required to deploy one application.

---

## Templates

Templates are reusable Kubernetes YAML files.

Example

```
deployment.yaml

service.yaml

configmap.yaml

ingress.yaml
```

Instead of hardcoded values

Templates use

```
{{ .Values.image.tag }}
```

Helm replaces placeholders during deployment.

---

## values.yaml

Contains environment-specific configuration.

Example

```yaml
replicaCount: 3

image:
  repository: my-app
  tag: v1.2.0

service:
  port: 80
```

The same template can deploy different environments using different values.

---

## Kubernetes API Server

After rendering templates

Helm sends generated manifests to

```
Kubernetes API Server
```

Exactly like

```bash
kubectl apply
```

The API Server stores everything inside etcd.

---

## Release

Every installation creates a Release.

Example

```
frontend

auth-service

dashboard
```

Each Release maintains

- Version
- Status
- History
- Rollback Information

---

# 6. Deployment Flow

Suppose we execute

```bash
helm install frontend ./frontend-chart
```

Internally

```
Read Chart

↓

Read values.yaml

↓

Render Templates

↓

Generate Kubernetes YAML

↓

Send to API Server

↓

Objects Stored in etcd

↓

Scheduler

↓

Pods Created

↓

Application Running
```

This happens within seconds.

---

# 7. How Helm Communicates with Kubernetes

Helm does NOT deploy containers directly.

It communicates only with

```
Kubernetes API Server
```

The API Server then communicates with

- Scheduler
- Controller Manager
- kubelet
- etcd

Helm simply creates Kubernetes objects.

---

# 8. Helm Release Lifecycle

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

Revision 2 Restored
```

Every change creates a new revision.

---

# 9. Helm 3 Architecture

Earlier

```
Helm CLI

↓

Tiller

↓

Kubernetes
```

Helm 2 required a server-side component called

```
Tiller
```

Problems

- Security
- RBAC complexity
- Extra maintenance

Helm 3 removed Tiller.

Current Architecture

```
Helm CLI

↓

Kubernetes API Server

↓

Cluster
```

Much simpler and more secure.

---

# 10. Helm vs kubectl

| kubectl | Helm |
|----------|------|
| Resource Management | Application Management |
| No Release History | Release History |
| No Packaging | Charts |
| Manual Updates | Versioned Upgrades |
| Manual Rollback | Built-in Rollback |
| Individual Resources | Complete Applications |

---

# 11. Enterprise Use Cases

Helm Architecture is used for

- Banking Platforms
- Healthcare Systems
- Insurance Applications
- Telecom Platforms
- Retail Platforms
- SaaS Products
- Kubernetes Operators
- Internal Developer Platforms

Every enterprise deployment pipeline follows a similar flow.

---

# 12. Production Scenario

A production deployment failed after a new release.

Investigation showed

```
helm upgrade
```

generated incorrect Kubernetes manifests because values.yaml contained an invalid image tag.

Helm itself was functioning correctly.

The problem originated from incorrect configuration.

The release was rolled back within minutes.

---

# 13. Interview Questions

## Q1. Explain Helm Architecture.

### Answer

Helm consists of the Helm CLI, Charts, Templates and values files. The Helm CLI renders templates using values.yaml, generates Kubernetes manifests and sends them to the Kubernetes API Server. Kubernetes then schedules and runs the application while Helm maintains release history.

---

## Q2. Does Helm create Pods directly?

### Answer

No.

Helm communicates only with the Kubernetes API Server.

The Kubernetes control plane creates Deployments, ReplicaSets and Pods.

---

## Q3. What changed in Helm 3?

### Answer

Helm 3 removed Tiller.

Now Helm communicates directly with the Kubernetes API Server, improving security and simplifying deployment architecture.

---

# 14. Commands

```bash
helm version

helm env

helm --help
```

---

# 15. Best Practices

- Use Helm 3.
- Store Charts in Git.
- Keep templates reusable.
- Separate configuration using values files.
- Validate rendered manifests before deployment.
- Maintain release history.
- Follow GitOps practices.

---

# 16. Common Mistakes

- Thinking Helm deploys Pods directly.
- Confusing Charts with Releases.
- Editing rendered YAML manually.
- Hardcoding values inside templates.
- Ignoring release revisions.
- Not understanding Helm 3 architecture.

---

# 17. Marathi Quick Revision

- Helm CLI Chart वाचतो.
- values.yaml वाचतो.
- Templates render करतो.
- Kubernetes YAML तयार करतो.
- API Server ला पाठवतो.
- Release history maintain करतो.
- Helm 3 मध्ये Tiller नाही.

---

# 18. Marathi Summary (5+ Experience Revision)

## Simple Explanation

Helm CLI Chart मधील templates आणि values.yaml वापरून Kubernetes manifests तयार करतो. हे manifests Kubernetes API Server कडे पाठवले जातात. API Server पुढे Pods तयार करतो. Helm प्रत्येक deployment ची release history देखील maintain करतो.

### Project Usage

आपल्या Enterprise DevOps Platform मध्ये GitHub Actions Docker image build करेल. Helm त्या image साठी manifests तयार करेल आणि Argo CD ते Kubernetes मध्ये deploy करेल. Helm release history मुळे rollback आणि troubleshooting सोपे होतील.

### Production Best Practice

Helm templates मध्ये कोणतेही hardcoded values ठेवू नयेत. सर्व configuration values.yaml मध्ये ठेवावी. Helm 3 वापरावे आणि प्रत्येक release ची history maintain करावी.

### Production Story

एका production deployment नंतर application start होत नव्हते. सुरुवातीला Kubernetes issue असल्याचा संशय होता. Investigation दरम्यान helm template वापरून rendered manifests तपासले असता image tag चुकीचा असल्याचे आढळले. values.yaml दुरुस्त करून नवीन Helm upgrade करण्यात आले आणि application काही मिनिटांत restore झाले.

### Investigation Flow

Read Chart

↓

Read values.yaml

↓

Render Templates

↓

Generate Manifests

↓

API Server

↓

Kubernetes Objects

↓

Pods Running

↓

Application Validation

### 5+ Years Memory Trick

**Interview Question:**

Explain Helm Architecture in a production environment.

**Answer:**

"Helm CLI reads the Chart and values files, renders reusable templates into Kubernetes manifests, and submits them to the Kubernetes API Server. Kubernetes creates the required resources while Helm maintains release history, enabling controlled upgrades, rollbacks and seamless integration with enterprise CI/CD and GitOps workflows."

