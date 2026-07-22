# Lab 23 - Persistent Volume Claim (PVC)

# 1. Objective

The objective of this lab is to understand how Kubernetes Persistent Volume Claims (PVCs) allow applications to request persistent storage without knowing the underlying storage implementation.

By the end of this lab you will be able to

- Create a Persistent Volume Claim
- Bind a PVC to a Persistent Volume
- Mount a PVC inside a Pod
- Verify data persistence
- Troubleshoot PVC issues
- Understand enterprise storage architecture
- Explain the relationship between PV and PVC

Persistent Volume Claims are how applications consume storage in Kubernetes.

---

# 2. Prerequisites

Complete

- Lab 01 - Lab 22

Verify

```bash
kubectl get nodes

kubectl get pv

kubectl get pvc
```

---

# 3. Enterprise Usage

Applications should never consume storage directly.

Instead

```
Application

↓

Persistent Volume Claim

↓

Persistent Volume

↓

Storage Backend
```

Benefits

- Storage abstraction
- Dynamic provisioning
- Easier migration
- Cloud independence
- Standardized deployments

---

# 4. Usage in THIS Project

Future project

```
Prometheus

↓

Persistent Volume Claim

↓

Persistent Volume
```

```
Grafana

↓

Persistent Volume Claim

↓

Persistent Volume
```

```
Jenkins

↓

Persistent Volume Claim

↓

Persistent Volume
```

Applications request storage through PVCs.

They never reference Persistent Volumes directly.

---

# 5. Architecture

```
Application

↓

PVC

↓

PV

↓

Storage Backend
```

Binding

```
PVC

↓

Matching Capacity

↓

Matching Access Mode

↓

PV Bound
```

---

# 6. Step-by-Step Implementation

## Step 1

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
    path: /tmp/pvc-demo
