# Lab 05 - Multi-Container Pod

# 1. Objective

The objective of this lab is to understand how multiple containers can run inside a single Kubernetes Pod.

By the end of this lab you will be able to

- Deploy a Multi-Container Pod
- Understand Pod Networking
- Understand Shared Storage
- Verify Container Communication
- Execute commands inside different containers
- Understand Sidecar Pattern
- Troubleshoot Multi-Container Pods

This lab introduces one of the most common enterprise design patterns.

---

# 2. Prerequisites

Complete

- Lab 01 - Kind Cluster Installation
- Lab 02 - kubectl Configuration
- Lab 03 - Cluster Verification
- Lab 04 - Create First Pod

Verify

```bash
kubectl get nodes

kubectl get pods
```

Cluster should be healthy.

---

# 3. Enterprise Usage

Multi-container Pods are commonly used for

- Logging Sidecars
- Monitoring Agents
- Service Mesh Proxies
- File Synchronization
- Reverse Proxies
- Secret Injection

Example

```
Application

↓

Sidecar

↓

Shared Volume

↓

Logs
```

Popular examples

- Istio Envoy Proxy
- Fluent Bit
- Prometheus Exporters
- Vault Agent

---

# 4. Usage in THIS Project

Later in our Enterprise DevOps Platform

```
Application

↓

Monitoring Sidecar

↓

Shared Volume

↓

Prometheus
```

or

```
Application

↓

Log Collector

↓

Shared Logs

↓

Central Logging
```

Although our application services will primarily run one container each, understanding sidecars is essential for enterprise environments.

---

# 5. Architecture

```
Pod

├── nginx Container

├── busybox Container

└── Shared Volume (emptyDir)
```

Network

```
localhost

↓

Shared by both containers
```

Storage

```
emptyDir

↓

Accessible by both containers
```

---

# 6. Step-by-Step Implementation

## Step 1

Create manifest

```bash
cat > multi-container-pod.yaml <<EOF
apiVersion: v1
kind: Pod
metadata:
  name: multi-container-pod
spec:
  volumes:
  - name: shared-data
    emptyDir: {}

  containers:

  - name: nginx
    image: nginx:1.27
    volumeMounts:
    - name: shared-data
      mountPath: /usr/share/nginx/html

  - name: busybox
    image: busybox
    command:
    - sh
    - -c
    - |
      while true
      do
        date > /shared/index.html
        sleep 5
      done
    volumeMounts:
    - name: shared-data
      mountPath: /shared
