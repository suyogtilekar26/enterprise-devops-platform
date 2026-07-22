# Helm Notes 04 - Installing Helm

# Enterprise DevOps Platform

---

# 1. Purpose

The purpose of this document is to understand how Helm is installed in enterprise environments and how DevOps engineers verify that Helm is correctly configured before deploying production workloads.

This is not just an installation guide.

This document explains the production installation process, verification steps and common issues encountered during Helm installation.

---

# 2. Introduction

Helm is a client-side application.

Unlike Helm 2, Helm 3 does **not** require any server-side component inside the Kubernetes cluster.

Installation is performed only on the engineer's workstation or CI/CD server.

Examples

- Developer Laptop
- DevOps Engineer Laptop
- Jenkins Server
- GitHub Actions Runner
- Azure DevOps Agent
- GitLab Runner

Once installed, Helm communicates directly with the Kubernetes API Server.

---

# 3. Why Helm Installation is Important

Before deploying applications using Helm, every DevOps engineer must ensure

- Helm is installed
- Correct Helm version is used
- Kubernetes cluster is reachable
- kubectl is configured
- Required permissions exist

A successful installation is the foundation for all future Helm operations.

---

# 4. Enterprise Installation Architecture

DevOps Engineer

↓

Helm CLI Installed

↓

kubectl Configured

↓

Kubernetes API Server

↓

Cluster

↓

Applications

There is no Helm server running inside Kubernetes.

Everything starts from the Helm CLI.

---

# 5. Installation Methods

Helm can be installed using

- Binary Download
- Package Manager
- Chocolatey (Windows)
- Homebrew (macOS)
- apt (Ubuntu)
- Snap
- CI/CD Container Images

Enterprise environments generally use

- Package Manager
- Official Binary
- CI/CD Images

---

# 6. Installing Helm on Ubuntu

Update package information

```bash
sudo apt update
```

Install dependencies

```bash
sudo apt install curl -y
```

Download Helm installation script

```bash
curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash
```

Expected output

```
Helm installed successfully.
```

---

# 7. Installing Helm on Windows

Using Chocolatey

```powershell
choco install kubernetes-helm
```

Using Scoop

```powershell
scoop install helm
```

Or download the binary from the official Helm releases page.

---

# 8. Installing Helm on macOS

Using Homebrew

```bash
brew install helm
```

Verify installation

```bash
helm version
```

---

# 9. Verifying Installation

Check installed version

```bash
helm version
```

Example

```
version.BuildInfo{
Version:"v3.x.x"
}
```

Display Helm environment

```bash
helm env
```

Display available commands

```bash
helm --help
```

---

# 10. Verify Kubernetes Connectivity

Helm requires access to Kubernetes.

Verify cluster connectivity

```bash
kubectl cluster-info
```

Verify nodes

```bash
kubectl get nodes
```

Expected

```
STATUS

Ready
```

Without cluster access Helm cannot deploy applications.

---

# 11. Enterprise Workflow

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

Helm Installed

↓

Helm Deploy

↓

Argo CD

↓

Kubernetes Cluster

Helm becomes the deployment client used by engineers and CI/CD pipelines.

---

# 12. Production Scenario

A DevOps engineer attempted

```bash
helm install frontend ./frontend-chart
```

Error

```
Kubernetes cluster unreachable
```

Investigation showed

```bash
kubectl get nodes
```

returned

```
Unable to connect to the server
```

The kubeconfig file was pointing to an old Kubernetes cluster.

After updating kubeconfig

```bash
kubectl config use-context production
```

Helm deployments worked successfully.

Root Cause

Incorrect Kubernetes context.

---

# 13. Interview Questions

## Q1. Does Helm require installation inside Kubernetes?

### Answer

No.

Helm 3 is a client-side application.

It communicates directly with the Kubernetes API Server and does not require any server-side component like Tiller.

---

## Q2. How do you verify Helm installation?

### Answer

Run

```bash
helm version

helm env

helm --help
```

These commands verify that Helm is installed correctly and functioning.

---

## Q3. Why might Helm fail immediately after installation?

### Answer

Common reasons include

- kubectl not configured
- Wrong Kubernetes context
- Cluster unreachable
- Network connectivity issues
- Insufficient RBAC permissions

---

# 14. Commands

Check version

```bash
helm version
```

Display environment

```bash
helm env
```

Display help

```bash
helm --help
```

Verify cluster

```bash
kubectl cluster-info
```

Verify nodes

```bash
kubectl get nodes
```

Check current context

```bash
kubectl config current-context
```

List available contexts

```bash
kubectl config get-contexts
```

Switch context

```bash
kubectl config use-context <context-name>
```

---

# 15. Best Practices

- Always use Helm 3.
- Keep Helm updated.
- Verify Kubernetes connectivity before deployment.
- Use the official installation method.
- Validate kubectl configuration.
- Test Helm commands after installation.
- Store Helm version information in project documentation.

---

# 16. Common Mistakes

- Installing Helm but forgetting kubectl.
- Using the wrong Kubernetes context.
- Assuming Helm creates clusters.
- Using an outdated Helm version.
- Ignoring RBAC permission errors.
- Deploying to the wrong cluster accidentally.

---

# 17. Marathi Quick Revision

- Helm फक्त Client आहे.
- Helm 3 मध्ये Tiller नाही.
- Install झाल्यावर helm version तपासा.
- kubectl get nodes चालतोय का तपासा.
- kubeconfig योग्य आहे का verify करा.
- Wrong context मुळे deployment fail होऊ शकतो.

---

# 18. Marathi Summary (5+ Experience Revision)

## Simple Explanation

Helm हा Kubernetes साठी client-side package manager आहे. तो engineer च्या laptop किंवा CI/CD server वर install केला जातो. Helm 3 मध्ये Tiller नसल्यामुळे तो थेट Kubernetes API Server शी communicate करतो.

### Project Usage

आपल्या Enterprise DevOps Platform मध्ये GitHub Actions runner वर Helm install असेल. Docker image build झाल्यानंतर Helm Chart deploy केला जाईल आणि पुढे Argo CD GitOps deployment manage करेल.

### Production Best Practice

Production मध्ये Helm install झाल्यावर नेहमी helm version, kubectl get nodes आणि kubectl config current-context verify करावे. चुकीच्या cluster मध्ये deployment होऊ नये म्हणून context verify करणे अत्यंत महत्त्वाचे आहे.

### Production Story

एका production release दरम्यान DevOps engineer ने Helm install योग्य असल्याचे verify केले होते, पण deployment चुकीच्या staging cluster मध्ये झाले. Investigation दरम्यान kubectl config current-context मध्ये चुकीचा context active असल्याचे दिसले. त्यानंतर production deployment checklist मध्ये context verification हा mandatory step करण्यात आला.

### Investigation Flow

Install Helm

↓

Verify Version

↓

Verify kubectl

↓

Verify Context

↓

Verify Cluster

↓

Helm Deploy

↓

Application Validation

### 5+ Years Memory Trick

**Interview Question:**

How do you validate a production Helm installation before deployment?

**Answer:**

"First, I verify the Helm installation using helm version and helm env. Next, I validate Kubernetes connectivity with kubectl cluster-info and kubectl get nodes, confirm the active Kubernetes context, and ensure the required RBAC permissions are available before deploying any Helm Chart."
