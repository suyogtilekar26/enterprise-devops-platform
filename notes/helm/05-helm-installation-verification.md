# Helm Notes 05 - Helm Installation Verification

# Enterprise DevOps Platform

---

# 1. Purpose

The purpose of this document is to understand how DevOps engineers verify that Helm is correctly installed and ready for production deployments.

This is not simply about checking the Helm version.

This document explains the complete verification process performed before deploying applications in enterprise Kubernetes environments.

---

# 2. Introduction

Installing Helm is only the first step.

Before deploying any application, engineers must verify that

- Helm is working
- kubectl is working
- Kubernetes cluster is reachable
- Current context is correct
- Required permissions exist

Skipping these validations can result in deployments to the wrong cluster or failed production releases.

---

# 3. Why Verification is Important

A successful Helm installation does not guarantee successful deployments.

Common production issues include

- Wrong Kubernetes Context
- Expired kubeconfig
- Cluster Unreachable
- RBAC Permission Errors
- Authentication Failures
- Network Connectivity Problems

Verification helps detect these issues before deployment.

---

# 4. Enterprise Verification Workflow

```
Install Helm

↓

Verify Helm Version

↓

Verify Helm Environment

↓

Verify kubectl

↓

Verify Kubernetes Context

↓

Verify Cluster

↓

Verify Permissions

↓

Deploy Application
```

---

# 5. Verify Helm Version

Check Helm version

```bash
helm version
```

Example

```
version.BuildInfo{
Version:"v3.19.0"
}
```

This confirms Helm is installed successfully.

---

# 6. Verify Helm Environment

Display Helm environment variables

```bash
helm env
```

Example

```
HELM_CACHE_HOME

HELM_CONFIG_HOME

HELM_DATA_HOME
```

These directories are used by Helm internally.

---

# 7. Verify Kubernetes Connectivity

Check cluster information

```bash
kubectl cluster-info
```

Check nodes

```bash
kubectl get nodes
```

Expected

```
STATUS

Ready
```

If nodes are not reachable, Helm deployments will fail.

---

# 8. Verify Current Context

Display current context

```bash
kubectl config current-context
```

List all contexts

```bash
kubectl config get-contexts
```

Switch context

```bash
kubectl config use-context production
```

Deploying to the wrong cluster is one of the most common production mistakes.

---

# 9. Verify Permissions

Check namespaces

```bash
kubectl get namespaces
```

Check pods

```bash
kubectl get pods -A
```

Verify RBAC permissions

```bash
kubectl auth can-i create deployments
```

Expected

```
yes
```

---

# 10. Enterprise Workflow

Developer

↓

GitHub

↓

GitHub Actions

↓

Docker Build

↓

Container Registry

↓

Helm Verification

↓

Helm Deploy

↓

Argo CD

↓

Production Kubernetes

Verification is always performed before deployment.

---

# 11. Production Scenario

A release engineer attempted

```bash
helm install payment ./payment-chart
```

Deployment failed.

Investigation showed

```bash
kubectl config current-context
```

returned

```
staging
```

instead of

```
production
```

The deployment was stopped before any production impact occurred.

Root Cause

Wrong Kubernetes context.

---

# 12. Interview Questions

## Q1. What checks do you perform before a Helm deployment?

### Answer

Before deploying, I verify Helm installation, Kubernetes connectivity, current context, node status, namespace availability and RBAC permissions to ensure the deployment targets the correct cluster.

---

## Q2. How do you verify Helm is working?

### Answer

I run

```bash
helm version

helm env

helm --help
```

These commands confirm that Helm is installed and functioning correctly.

---

## Q3. Why is checking the Kubernetes context important?

### Answer

The current context determines the target Kubernetes cluster. Verifying it prevents accidental deployments to the wrong environment, such as deploying development changes into production.

---

# 13. Commands

```bash
helm version

helm env

helm --help

kubectl cluster-info

kubectl get nodes

kubectl config current-context

kubectl config get-contexts

kubectl auth can-i create deployments
```

---

# 14. Best Practices

- Verify Helm before every deployment.
- Check the current Kubernetes context.
- Validate cluster connectivity.
- Verify RBAC permissions.
- Confirm node health.
- Include verification in CI/CD pipelines.
- Follow deployment checklists.

---

# 15. Common Mistakes

- Deploying to the wrong cluster.
- Ignoring RBAC permission errors.
- Assuming Helm installation is enough.
- Forgetting to verify kubectl.
- Using expired kubeconfig.
- Skipping deployment validation.

---

# 16. Marathi Quick Revision

- Helm version तपासा.
- helm env तपासा.
- kubectl get nodes चालतोय का पहा.
- Current context verify करा.
- RBAC permissions तपासा.
- Cluster Ready आहे का verify करा.

---

# 17. Marathi Summary (5+ Experience Revision)

## Simple Explanation

Helm install झाल्यानंतर deployment करण्यापूर्वी Helm, Kubernetes cluster, kubectl configuration, current context आणि permissions verify करणे आवश्यक असते. यामुळे production deployment failures टाळता येतात.

### Project Usage

आपल्या Enterprise DevOps Platform मध्ये GitHub Actions deployment सुरू करण्यापूर्वी Helm आणि Kubernetes connectivity verify केली जाईल. त्यानंतरच Helm Chart deploy केला जाईल.

### Production Best Practice

Production deployment करण्यापूर्वी नेहमी `helm version`, `kubectl get nodes`, `kubectl config current-context` आणि `kubectl auth can-i` वापरून verification करावी.

### Production Story

एका enterprise मध्ये release engineer ने production deployment सुरू करण्यापूर्वी verification checklist execute केली. `kubectl config current-context` तपासल्यावर staging context active असल्याचे आढळले. Deployment थांबवून योग्य production context निवडण्यात आला आणि मोठा production incident टळला.

### Investigation Flow

```
Verify Helm

↓

Verify kubectl

↓

Verify Context

↓

Verify Cluster

↓

Verify Permissions

↓

Deploy

↓

Validate
```

### 5+ Years Memory Trick

**Interview Question:**

What verification steps do you perform before running a Helm deployment?

**Answer:**

"Before every Helm deployment, I verify the Helm installation, Kubernetes connectivity, active context, node health, namespace access and RBAC permissions. These checks ensure deployments are executed safely against the correct production cluster."

