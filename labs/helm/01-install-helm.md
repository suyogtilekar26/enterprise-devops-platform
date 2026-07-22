# Helm Lab 01 - Install Helm

# Enterprise DevOps Platform

---

# Lab Objective

Install Helm CLI on the DevOps workstation that will be used to deploy the Enterprise DevOps Platform into Kubernetes.

This is the same workstation that already contains:

- Git
- Docker
- Kind Kubernetes Cluster
- kubectl
- GitHub Repository

After this lab, Helm will become the package manager for all Kubernetes deployments in this project.

---

# Production Scenario

Company

ABC Bank

Environment

Production

Platform Team manages

- 300+ Microservices
- 40 Kubernetes Namespaces
- Thousands of Kubernetes Objects

Without Helm every deployment required manually applying YAML files.

The organization standardized on Helm so every application deployment follows the same release process.

Our project will follow the same architecture.

---

# Existing Project Architecture

```
Enterprise DevOps Platform

Frontend

↓

API Gateway

↓

Auth Service

↓

Dashboard Service

↓

Kind Kubernetes Cluster
```

Current Deployment

```
kubectl apply -f manifests
```

Target Deployment

```
helm upgrade --install
```

---

# Lab Architecture

```
Developer Laptop

│

├── Docker

├── Kind Cluster

├── kubectl

└── Helm
```

---

# Step 1

Verify Kubernetes Cluster

```bash
kubectl get nodes
```

Expected Output

```
NAME

kind-control-plane

Ready
```

---

# Step 2

Verify kubectl

```bash
kubectl version --client
```

Expected

Client version displayed successfully.

---

# Step 3

Install Helm

Ubuntu

```bash
curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash
```

---

# Step 4

Verify Installation

```bash
helm version
```

Expected

```
version.BuildInfo

Version v3.x.x
```

---

# Step 5

Display Helm Help

```bash
helm --help
```

---

# Step 6

Display Helm Environment

```bash
helm env
```

Example

```
HELM_CACHE_HOME

HELM_CONFIG_HOME

HELM_DATA_HOME
```

---

# Step 7

Verify Kubernetes Connectivity

```bash
helm list
```

Expected

```
NAME

(empty)
```

This confirms Helm can communicate with Kubernetes.

---

# Project Usage

Nothing is deployed yet.

Helm is only installed.

Upcoming labs will deploy:

```
Frontend

↓

API Gateway

↓

Auth Service

↓

Dashboard Service
```

using Helm Charts.

---

# Verification Checklist

Verify

```bash
helm version
```

Verify

```bash
helm env
```

Verify

```bash
helm list
```

Verify

```bash
kubectl get nodes
```

All commands should execute successfully.

---

# Expected Result

Helm CLI installed.

Helm connected to Kubernetes.

Environment ready for creating Helm Charts.

---

# Production Tips

Always verify:

- Kubernetes connectivity
- kubectl version
- Helm version
- Current Kubernetes context

before performing production deployments.

Many production deployment failures occur because engineers accidentally target the wrong Kubernetes cluster.

Always verify:

```bash
kubectl config current-context
```

before executing Helm commands.

---

# Common Mistakes

Installing an outdated Helm version.

Installing Helm without kubectl.

Wrong Kubernetes context.

Helm cannot communicate with cluster.

Ignoring Helm version compatibility.

---

# Interview Questions

## Q1. Why must Helm be installed on the DevOps workstation?

### Answer

Helm is a client-side package manager used to package, install, upgrade and manage Kubernetes applications. It communicates with the Kubernetes API Server through the current kubectl context.

---

## Q2. Does Helm require installation inside the Kubernetes cluster?

### Answer

No.

Modern Helm (Helm 3) is completely client-side.

It communicates directly with the Kubernetes API Server.

---

## Q3. How do you verify Helm installation?

```bash
helm version

helm env

helm list
```

---

# Marathi Quick Revision

- Helm Install करा.
- Version तपासा.
- Environment तपासा.
- Cluster connectivity तपासा.
- kubectl context verify करा.

---

# Marathi Summary (5+ Experience Revision)

Helm install केल्यानंतर सर्वप्रथम `helm version`, `helm env`, `helm list` आणि `kubectl get nodes` verify करावेत. Production मध्ये deployment करण्यापूर्वी योग्य Kubernetes context आहे का हे नेहमी तपासावे. चुकीच्या cluster वर deployment होणे हा production मधील सर्वात सामान्य operational mistakes पैकी एक आहे.

