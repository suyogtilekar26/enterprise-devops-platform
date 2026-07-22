# Lab 01 - ArgoCD Installation

# Enterprise DevOps Platform

---

# Lab Objective

In this lab you will:

- Install ArgoCD
- Verify all components
- Access the ArgoCD UI
- Login using CLI
- Understand the installation architecture

---

# Prerequisites

- Ubuntu 22.04+
- Kubernetes Cluster
- kubectl installed
- Internet Connectivity
- Cluster Admin Access

---

# Lab Architecture

```
Developer

↓

kubectl

↓

Kubernetes Cluster

↓

ArgoCD Namespace

↓

ArgoCD Components

↓

UI + CLI
```

---

# Step 1 - Verify Cluster

Check cluster connectivity.

```bash
kubectl cluster-info
```

Expected Output

Cluster information should be displayed.

---

# Step 2 - Check Nodes

```bash
kubectl get nodes
```

Expected Output

```
NAME        STATUS
master      Ready
worker01    Ready
```

---

# Step 3 - Create Namespace

```bash
kubectl create namespace argocd
```

Verify

```bash
kubectl get ns
```

---

# Step 4 - Install ArgoCD

```bash
kubectl apply -n argocd \
-f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```

Wait for installation to complete.

---

# Step 5 - Verify Pods

```bash
kubectl get pods -n argocd
```

Expected Pods

- argocd-server
- argocd-repo-server
- argocd-application-controller
- argocd-redis
- argocd-dex-server (Optional)

All should be

```
Running
```

---

# Step 6 - Verify Services

```bash
kubectl get svc -n argocd
```

Expected

```
argocd-server
```

---

# Step 7 - Port Forward

```bash
kubectl port-forward svc/argocd-server \
-n argocd 8080:443
```

Open Browser

```
https://localhost:8080
```

Accept the browser security warning.

---

# Step 8 - Get Initial Password

```bash
kubectl -n argocd get secret argocd-initial-admin-secret \
-o jsonpath="{.data.password}" | base64 -d
```

Save the password.

---

# Step 9 - Login

Username

```
admin
```

Password

```
<password from previous command>
```

---

# Step 10 - Install ArgoCD CLI

Linux

```bash
curl -sSL -o argocd \
https://github.com/argoproj/argo-cd/releases/latest/download/argocd-linux-amd64
```

```bash
chmod +x argocd
```

```bash
sudo mv argocd /usr/local/bin/
```

Verify

```bash
argocd version
```

---

# Step 11 - CLI Login

```bash
argocd login localhost:8080
```

Enter

- Username
- Password

---

# Step 12 - Verify Installation

```bash
argocd app list
```

Expected

No applications found.

This confirms the CLI is connected successfully.

---

# Component Verification

Check Pods

```bash
kubectl get pods -n argocd
```

Check Services

```bash
kubectl get svc -n argocd
```

Check Deployments

```bash
kubectl get deploy -n argocd
```

---

# Expected Result

You should have

- ArgoCD Installed
- UI Accessible
- CLI Working
- Components Running
- Namespace Created

---

# Troubleshooting

## Pods Pending

Check

```bash
kubectl describe pod <pod>
```

---

## CrashLoopBackOff

Check Logs

```bash
kubectl logs <pod> -n argocd
```

---

## Cannot Open UI

Verify

```bash
kubectl get svc -n argocd
```

Restart Port Forward

```bash
kubectl port-forward svc/argocd-server \
-n argocd 8080:443
```

---

## Login Failed

Regenerate Password

```bash
kubectl -n argocd get secret argocd-initial-admin-secret \
-o jsonpath="{.data.password}" | base64 -d
```

---

# Best Practices

- Use a dedicated namespace.
- Change the default admin password.
- Enable HTTPS.
- Configure SSO for production.
- Enable RBAC.
- Monitor ArgoCD components.
- Backup ArgoCD configuration regularly.

---

# Interview Questions

### 1. Which namespace is commonly used for ArgoCD?

argocd

---

### 2. Which component provides the UI?

argocd-server

---

### 3. Which component clones Git repositories?

argocd-repo-server

---

### 4. Which component detects drift?

argocd-application-controller

---

### 5. How do you retrieve the initial admin password?

```bash
kubectl -n argocd get secret argocd-initial-admin-secret \
-o jsonpath="{.data.password}" | base64 -d
```

---

# Lab Success Criteria

You have successfully completed this lab if:

- ArgoCD is installed.
- All pods are running.
- UI is accessible.
- CLI login is successful.
- `argocd app list` executes without errors.

---

# Marathi Quick Revision

- Namespace तयार करा.
- ArgoCD Install करा.
- Pods Running आहेत का तपासा.
- UI Open करा.
- Admin Password मिळवा.
- CLI Install करा.
- Login करा.
- Installation Verify करा.
- आता ArgoCD वापरण्यास तयार आहे.

