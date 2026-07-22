# Helm Lab 02 - Verify Helm Installation

# Enterprise DevOps Platform

---

# Lab Objective

Verify that Helm is correctly installed and is able to communicate with the Kubernetes cluster before creating our first production Helm Chart.

In enterprise environments, engineers always validate their tooling before starting deployments.

This avoids unnecessary deployment failures later in the CI/CD pipeline.

---

# Production Scenario

Company

ABC Bank

Platform Team completed a new DevOps workstation setup.

Before allowing engineers to deploy applications into Production, the platform onboarding checklist requires verification of:

- kubectl
- Kubernetes Cluster
- Helm
- Namespace Access
- RBAC Permissions

Only after successful verification are engineers permitted to deploy production releases.

We will perform the same validation.

---

# Enterprise Project

```
Enterprise DevOps Platform

Developer Laptop

│

├── Git

├── Docker

├── kubectl

├── Kind Cluster

└── Helm
```

---

# Verification Flow

```
Helm CLI

↓

kubectl Context

↓

Kubernetes API Server

↓

Cluster

↓

Namespaces

↓

Releases
```

---

# Step 1

Verify Helm Version

```bash
helm version
```

Expected Output

```
version.BuildInfo{
Version:"v3.x.x"
...
}
```

---

# Step 2

Verify Helm Environment

```bash
helm env
```

Expected Output

```
HELM_CACHE_HOME

HELM_CONFIG_HOME

HELM_DATA_HOME
```

---

# Step 3

Verify Current Kubernetes Context

```bash
kubectl config current-context
```

Expected Output

```
kind-kind
```

If using another cluster, the output will be different.

Always verify this before any production deployment.

---

# Step 4

Verify Kubernetes Nodes

```bash
kubectl get nodes
```

Expected

```
NAME

kind-control-plane

STATUS

Ready
```

---

# Step 5

Verify Helm Connectivity

```bash
helm list
```

Expected

```
NAME

(empty)
```

No releases are installed yet.

Successful execution confirms Helm can communicate with Kubernetes.

---

# Step 6

Verify All Namespaces

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

# Step 7

Verify Kubernetes API Access

```bash
kubectl cluster-info
```

Expected

Control Plane endpoint information.

---

# Step 8

Check Helm Client Help

```bash
helm help
```

Expected

Complete Helm command reference.

---

# Verification Checklist

| Verification | Status |
|--------------|--------|
| Helm Installed | ✅ |
| Helm Version | ✅ |
| Kubernetes Reachable | ✅ |
| Cluster Healthy | ✅ |
| kubectl Working | ✅ |
| Current Context Verified | ✅ |
| Helm Connected | ✅ |

---

# Our Project Status

Current

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

Kubernetes

(No Helm Charts Yet)
```

After Upcoming Labs

```
Enterprise DevOps Platform

↓

Helm Charts

↓

Helm Releases

↓

Kubernetes
```

---

# Production Validation

Before every production deployment verify

```bash
helm version

kubectl config current-context

kubectl get nodes

helm list

kubectl cluster-info
```

Never skip these checks.

---

# Common Errors

## Error

```
Error:

Kubernetes cluster unreachable
```

Possible Cause

Wrong kubeconfig.

Wrong context.

Cluster stopped.

---

## Error

```
connection refused
```

Possible Cause

Kubernetes API Server unavailable.

---

## Error

```
context deadline exceeded
```

Possible Cause

Network issue.

VPN disconnected.

Cluster unavailable.

---

# Troubleshooting Commands

Current Context

```bash
kubectl config current-context
```

Available Contexts

```bash
kubectl config get-contexts
```

Cluster Information

```bash
kubectl cluster-info
```

Nodes

```bash
kubectl get nodes
```

Helm

```bash
helm version

helm env

helm list
```

---

# Production Best Practices

Always verify:

- Current Kubernetes context
- Helm version
- Kubernetes connectivity
- Node health
- Namespace access
- User permissions

Never deploy directly after opening a terminal without checking the current context.

Many production incidents begin with deployments to the wrong cluster.

---

# Interview Questions

## Q1. How do you verify Helm is working?

### Answer

Run:

```bash
helm version

helm env

helm list
```

and verify Kubernetes connectivity using:

```bash
kubectl cluster-info

kubectl get nodes
```

---

## Q2. Why should engineers verify the current Kubernetes context?

### Answer

Helm uses the active kubectl context. If the wrong context is selected, deployments may accidentally target the wrong Kubernetes cluster, potentially causing production outages.

---

## Q3. Does Helm maintain its own Kubernetes connection?

### Answer

No.

Helm uses the same kubeconfig and current context as kubectl to communicate with the Kubernetes API Server.

---

# Marathi Quick Revision

- Helm Version तपासा.
- Helm Environment तपासा.
- Current Context तपासा.
- Nodes Ready आहेत का तपासा.
- Helm List चालवा.
- Cluster Info verify करा.

---

# Marathi Summary (5+ Experience Revision)

Production मध्ये Helm वापरण्यापूर्वी `helm version`, `helm env`, `helm list`, `kubectl config current-context`, `kubectl get nodes` आणि `kubectl cluster-info` हे नेहमी verify करावेत. Helm स्वतःचा connection वापरत नाही; तो kubectl चा kubeconfig आणि current context वापरतो. चुकीच्या context वर deployment करणे हा production मधील सर्वात गंभीर operational mistakes पैकी एक आहे.

