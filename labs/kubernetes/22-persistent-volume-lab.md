# Lab 22 - Persistent Volume (PV)

# 1. Objective

The objective of this lab is to understand how Kubernetes Persistent Volumes provide storage that survives Pod recreation.

By the end of this lab you will be able to

- Create a Persistent Volume
- Understand hostPath storage
- Verify persistent storage
- Understand PV lifecycle
- Troubleshoot PV issues
- Understand enterprise storage architecture
- Differentiate ephemeral and persistent storage

Persistent Volumes allow application data to survive Pod deletion and recreation.

---

# 2. Prerequisites

Complete

- Lab 01 - Lab 21

Verify

```bash
kubectl get nodes

kubectl get pv

kubectl get pvc
```

---

# 3. Enterprise Usage

Without Persistent Volumes

```
Pod

↓

Container Filesystem

↓

Pod Deleted

↓

Data Lost
```

With Persistent Volume

```
Pod

↓

Persistent Volume

↓

Storage

↓

Pod Deleted

↓

Data Preserved
```

Typical workloads

- Databases
- Jenkins
- Elasticsearch
- Prometheus
- Grafana
- SonarQube

---

# 4. Usage in THIS Project

Future project storage

```
Prometheus

↓

Persistent Volume
```

```
Grafana

↓

Persistent Volume
```

```
Jenkins

↓

Persistent Volume
```

Application containers remain stateless.

Monitoring and CI tools require persistent storage.

---

# 5. Architecture

```
Application

↓

Persistent Volume Claim

↓

Persistent Volume

↓

Physical Storage
```

---

# 6. Step-by-Step Implementation

## Step 1

Create Local Directory

On Kind node

```bash
mkdir -p /tmp/k8s-pv-demo
```

---

## Step 2

Create Persistent Volume

```bash
cat > persistent-volume.yaml <<EOF
apiVersion: v1
kind: PersistentVolume
metadata:
  name: demo-pv
spec:
  capacity:
    storage: 1Gi
  accessModes:
  - ReadWriteOnce
  persistentVolumeReclaimPolicy: Retain
  hostPath:
    path: /tmp/k8s-pv-demo
