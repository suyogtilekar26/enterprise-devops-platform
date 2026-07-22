# Lab 29 - DaemonSet

# 1. Objective

The objective of this lab is to understand how Kubernetes DaemonSets ensure that exactly one Pod runs on every eligible node in a cluster.

By the end of this lab you will be able to

- Create a DaemonSet
- Understand DaemonSet architecture
- Verify one Pod per node
- Troubleshoot DaemonSets
- Understand enterprise node agents
- Explain DaemonSet scheduling
- Compare DaemonSet with Deployment

DaemonSets are primarily used for node-level services such as logging, monitoring, networking and security agents.

---

# 2. Prerequisites

Complete

- Lab 01 - Lab 28

Verify

```bash
kubectl get nodes

kubectl get pods -A
```

---

# 3. Enterprise Usage

Typical DaemonSet workloads

```
Every Worker Node

↓

Fluent Bit
```

```
Every Worker Node

↓

Prometheus Node Exporter
```

```
Every Worker Node

↓

Falco Security Agent
```

```
Every Worker Node

↓

CNI Plugin
```

```
Every Worker Node

↓

CSI Driver
```

Unlike Deployments, DaemonSets automatically create one Pod on every eligible node.

---

# 4. Usage in THIS Project

Future architecture

```
Worker Node

↓

Fluent Bit DaemonSet

↓

Collect Container Logs

↓

Loki / Elasticsearch
```

```
Worker Node

↓

Node Exporter

↓

Prometheus
```

---

# 5. Architecture

```
DaemonSet

↓

Scheduler

↓

Every Eligible Node

↓

One Pod Per Node
```

---

# 6. Step-by-Step Implementation

## Step 1

Verify Nodes

```bash
kubectl get nodes
```

---

## Step 2

Create DaemonSet

```bash
cat > daemonset.yaml <<EOF
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: nginx-daemonset
spec:
  selector:
    matchLabels:
      app: nginx-daemon
  template:
    metadata:
      labels:
        app: nginx-daemon
    spec:
      containers:
      - name: nginx
        image: nginx:stable
