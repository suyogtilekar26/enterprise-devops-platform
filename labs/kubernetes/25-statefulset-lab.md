# Lab 25 - StatefulSet

# 1. Objective

The objective of this lab is to understand how Kubernetes StatefulSets manage stateful applications by providing stable network identities, persistent storage, and ordered deployment.

By the end of this lab you will be able to

- Create a StatefulSet
- Understand stable Pod identities
- Understand Headless Services
- Understand Persistent Volume Claims in StatefulSets
- Verify ordered Pod creation
- Troubleshoot StatefulSets
- Explain enterprise StatefulSet architecture

StatefulSets are designed for applications that require stable identities and persistent storage.

---

# 2. Prerequisites

Complete

- Lab 01 - Lab 24

Verify

```bash
kubectl get nodes

kubectl get storageclass

kubectl get pv

kubectl get pvc
```

---

# 3. Enterprise Usage

Stateful applications require

- Stable Pod Names
- Persistent Storage
- Ordered Startup
- Ordered Shutdown
- Predictable Network Identity

Examples

- PostgreSQL
- MySQL
- MongoDB
- Cassandra
- Kafka
- Elasticsearch
- ZooKeeper

Deployment

```
Replica 1

↓

Random Pod

↓

Pod Deleted

↓

New Random Pod
```

StatefulSet

```
database-0

↓

database-1

↓

database-2

↓

Stable Identity
```

---

# 4. Usage in THIS Project

Current project

```
Frontend

Deployment
```

```
API Gateway

Deployment
```

```
Auth Service

Deployment
```

```
Dashboard Service

Deployment
```

Future enterprise additions

```
PostgreSQL

↓

StatefulSet
```

```
Redis

↓

StatefulSet
```

Monitoring stack continues using Deployments except components requiring stable storage.

---

# 5. Architecture

```
Headless Service

↓

StatefulSet

↓

Stable Pod Names

↓

Persistent Volume Claims

↓

Persistent Volumes
```

---

# 6. Step-by-Step Implementation

## Step 1

Create Headless Service

```bash
cat > headless-service.yaml <<EOF
apiVersion: v1
kind: Service
metadata:
  name: nginx-headless
spec:
  clusterIP: None
  selector:
    app: nginx
  ports:
  - port: 80
    name: web
