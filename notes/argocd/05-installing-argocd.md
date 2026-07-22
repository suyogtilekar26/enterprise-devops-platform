# Installing ArgoCD

# Enterprise DevOps Platform

---

# Purpose

This document explains how to install ArgoCD in a Kubernetes cluster from beginner to enterprise level.

By the end of this guide, you will understand the installation process, the resources created by ArgoCD, and how enterprises deploy ArgoCD in production.

---

# Introduction

ArgoCD is deployed inside a Kubernetes cluster.

It runs as a collection of Kubernetes resources including

- Deployments
- Services
- ConfigMaps
- Secrets
- RBAC Resources
- StatefulSets

The installation is typically performed using Kubernetes manifests or Helm charts.

---

# Installation Prerequisites

Before installing ArgoCD, ensure you have

- Kubernetes Cluster
- kubectl installed
- Cluster Admin privileges
- Internet access to download manifests
- Storage Class (recommended)
- Ingress Controller (optional)

Verify cluster connectivity

```bash
kubectl cluster-info
```

Verify nodes

```bash
kubectl get nodes
```

---

# Create Namespace

ArgoCD is usually installed inside

```
argocd
```

namespace.

Create namespace

```bash
kubectl create namespace argocd
```

Verify

```bash
kubectl get ns
```

---

# Install ArgoCD

Install the official manifests

```bash
kubectl apply -n argocd \
-f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```

This creates all required resources.

---

# Resources Created

Verify

```bash
kubectl get all -n argocd
```

Typical output includes

```
Deployments

argocd-server

argocd-repo-server

argocd-applicationset-controller

argocd-notifications-controller
```

StatefulSets

```
argocd-application-controller

argocd-redis
```

Services

```
argocd-server

argocd-repo-server

argocd-redis
```

---

# Verify Pods

Check Pods

```bash
kubectl get pods -n argocd
```

Example

```
argocd-server

Running

argocd-repo-server

Running

argocd-application-controller

Running

argocd-redis

Running
```

All Pods should be

```
Running
```

---

# Verify Deployments

```bash
kubectl get deployments -n argocd
```

Verify availability

```bash
kubectl rollout status deployment argocd-server -n argocd
```

---

# Verify Services

```bash
kubectl get svc -n argocd
```

Example

```
argocd-server

ClusterIP

argocd-repo-server

ClusterIP

argocd-redis

ClusterIP
```

---

# Access ArgoCD

For local testing

```bash
kubectl port-forward svc/argocd-server -n argocd 8080:443
```

Open browser

```
https://localhost:8080
```

---

# Retrieve Initial Admin Password

The default username is

```
admin
```

Retrieve password

```bash
kubectl -n argocd \
get secret argocd-initial-admin-secret \
-o jsonpath="{.data.password}" | base64 -d
```

Login using

Username

```
admin
```

Password

```
<decoded-password>
```

---

# Change Admin Password

After first login

Navigate to

```
Settings

↓

Accounts

↓

admin

↓

Update Password
```

In enterprise environments, the default admin account is often disabled after SSO integration.

---

# Installation Verification

Verify all resources

```bash
kubectl get all -n argocd
```

Verify logs

```bash
kubectl logs deployment/argocd-server -n argocd
```

Check controller logs

```bash
kubectl logs statefulset/argocd-application-controller -n argocd
```

---

# Enterprise Installation Architecture

```
                 Kubernetes Cluster

        ┌───────────────────────────────┐

                 argocd Namespace

        ┌───────────────────────────────┐

        API Server

        Repository Server

        Application Controller

        Redis

        Notifications

        ApplicationSet Controller

        └───────────────────────────────┘
```

---

# Production Installation

Most enterprises

- Install using Helm
- Use High Availability mode
- Configure Ingress
- Enable TLS
- Integrate SSO
- Configure RBAC
- Enable Monitoring
- Configure Backups

---

# Common Installation Problems

Problem

Pods stuck in

```
Pending
```

Possible causes

- No worker nodes
- Storage issue
- Resource quota
- Taints

---

Problem

```
ImagePullBackOff
```

Possible causes

- Internet issue
- Registry blocked
- Wrong image

---

Problem

```
CrashLoopBackOff
```

Possible causes

- Configuration error
- Missing Secret
- Corrupted installation

---

Problem

Cannot access UI

Possible causes

- Port-forward issue
- Service issue
- Ingress issue
- Firewall

---

# Best Practices

- Install in dedicated namespace.
- Use latest stable release.
- Enable TLS.
- Configure Ingress.
- Integrate with enterprise SSO.
- Enable RBAC.
- Monitor ArgoCD components.
- Backup ConfigMaps and Secrets.
- Use High Availability in production.

---

# Interview Questions

## Q1. Where is ArgoCD installed?

### Answer

ArgoCD is installed inside a Kubernetes cluster, typically in a dedicated namespace named `argocd`.

---

## Q2. How do you access ArgoCD after installation?

### Answer

By using port-forwarding, an Ingress, or a LoadBalancer service depending on the deployment architecture.

---

## Q3. How do you retrieve the initial admin password?

### Answer

By reading the `argocd-initial-admin-secret` Kubernetes Secret and decoding the stored password using `base64`.

---

# Marathi Quick Revision

- Namespace तयार करा.
- Official Manifest Install करा.
- Pods Verify करा.
- Services Verify करा.
- Port Forward करा.
- Admin Password मिळवा.
- UI Login करा.
- Production मध्ये HA वापरा.

---

# Marathi Summary (5+ Experience Revision)

ArgoCD Kubernetes cluster मध्ये स्वतंत्र `argocd` namespace मध्ये install केले जाते. Installation नंतर API Server, Repository Server, Application Controller, Redis आणि इतर components तयार होतात. सर्व Pods Running असल्याची खात्री करून UI ला port-forward किंवा Ingress द्वारे access केले जाते. Production environments मध्ये Helm-based installation, High Availability, TLS, RBAC, SSO integration, monitoring आणि backups या सर्वोत्तम पद्धती वापरल्या जातात.

