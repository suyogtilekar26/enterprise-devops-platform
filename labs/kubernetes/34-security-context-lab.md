# Lab 34 - Kubernetes Security Context

# 1. Objective

The objective of this lab is to understand Kubernetes Security Context and how it improves container security by controlling user privileges, filesystem permissions, Linux capabilities and privilege escalation.

By the end of this lab you will be able to

- Configure Pod Security Context
- Configure Container Security Context
- Run containers as non-root
- Prevent privilege escalation
- Configure read-only root filesystem
- Drop Linux capabilities
- Troubleshoot Security Context issues
- Explain enterprise container hardening

Security Context is one of the most important Kubernetes security features used in enterprise production environments.

---

# 2. Prerequisites

Complete

- Lab 01 - Lab 33

Verify

```bash
kubectl get nodes

kubectl get pods

kubectl version
```

---

# 3. Enterprise Usage

Typical enterprise usage

```
Application

↓

Run As Non Root

↓

Restricted Linux Capabilities

↓

Read Only Filesystem

↓

Secure Container
```

Security Context reduces the impact of container compromise.

---

# 4. Usage in THIS Project

Future production deployment

```
Frontend

↓

Non Root User

↓

Read Only Filesystem
```

```
API Gateway

↓

Security Context

↓

Least Privilege
```

```
Auth Service

↓

Security Context

↓

Restricted Container
```

```
Dashboard

↓

Security Context

↓

Production Hardened
```

---

# 5. Architecture

```
Pod

↓

Security Context

↓

Container Runtime

↓

Linux Kernel

↓

Restricted Permissions
```

---

# 6. Step-by-Step Implementation

## Step 1

Create Secure Pod

```bash
cat > security-context.yaml <<EOF
apiVersion: v1
kind: Pod
metadata:
  name: secure-nginx
spec:
  securityContext:
    runAsNonRoot: true
    runAsUser: 1001
    runAsGroup: 1001
    fsGroup: 1001

  containers:
  - name: nginx
    image: nginx:stable

    securityContext:
      allowPrivilegeEscalation: false
      readOnlyRootFilesystem: true

      capabilities:
        drop:
        - ALL
