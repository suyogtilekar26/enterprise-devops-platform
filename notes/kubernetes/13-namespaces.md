# Kubernetes Namespaces

# 1. Purpose

The purpose of Namespaces is to logically separate resources inside the same Kubernetes Cluster.

Instead of creating multiple clusters, enterprises create multiple Namespaces.

Namespaces help organize, secure and manage applications.

---

# 2. Introduction

A Namespace is a logical partition inside a Kubernetes Cluster.

Think of it like folders inside a laptop.

Laptop

↓

Documents

↓

Photos

↓

Videos

Similarly,

Cluster

↓

Development Namespace

↓

Testing Namespace

↓

Production Namespace

Resources inside one Namespace are isolated from another Namespace.

---

# 3. Enterprise Usage

Most companies use Namespaces like

- dev
- qa
- uat
- staging
- production
- monitoring
- logging
- argocd
- ingress-nginx
- kube-system

Instead of creating separate clusters for every team.

---

# 4. Usage in THIS Project

```
Enterprise Cluster

↓

dev

↓

qa

↓

production

↓

monitoring

↓

argocd
```

Our application

```
production

↓

Frontend

↓

API Gateway

↓

Auth

↓

Dashboard
```

---

# 5. Architecture

```
             Kubernetes Cluster

------------------------------------------------

kube-system

API Server

Scheduler

Controller Manager

------------------------------------------------

development

Frontend

API

------------------------------------------------

testing

Frontend

API

------------------------------------------------

production

Frontend

API

Auth

Dashboard

------------------------------------------------

monitoring

Prometheus

Grafana
```

---

# 6. Internal Workflow

```
Developer

↓

kubectl apply

↓

Namespace Selected

↓

Deployment

↓

ReplicaSet

↓

Pods

↓

Users
```

---

# 7. Default Namespaces

Kubernetes provides

### default

User applications.

---

### kube-system

Internal Kubernetes components.

Never delete resources from this Namespace.

---

### kube-public

Public cluster information.

---

### kube-node-lease

Stores Node heartbeat information.

---

# 8. Why Namespaces?

Without Namespace

```
Frontend

Frontend

Frontend

API

API

API
```

Impossible to identify which application belongs where.

With Namespace

```
development

↓

Frontend

testing

↓

Frontend

production

↓

Frontend
```

Everything becomes organized.

---

# 9. Daily DevOps Activities

- Create Namespace
- Deploy Applications
- Check Resources
- Apply RBAC
- Configure Resource Quotas
- Delete Old Resources

---

# 10. Production Best Practices

- Never deploy everything in default Namespace.
- Separate Dev, QA and Production.
- Use Resource Quotas.
- Use Network Policies.
- Restrict Namespace Access.
- Apply Labels.

---

# 11. Security

- Namespace Isolation
- RBAC
- Resource Quotas
- Limit Ranges
- Network Policies
- Least Privilege

---

# 12. Troubleshooting

List Namespaces

```bash
kubectl get namespaces
```

Pods inside Namespace

```bash
kubectl get pods -n production
```

Deployments

```bash
kubectl get deployments -n production
```

Describe Namespace

```bash
kubectl describe namespace production
```

---

# 13. Real Production Scenarios

## Scenario 1

### Wrong Namespace

Developer deployed application.

Pods were not visible.

Reason

Deployment happened inside "default".

Expected Namespace

production.

Investigation

```bash
kubectl get pods -A
```

Resolution

Deploy again using

```bash
kubectl apply -n production
```

---

## Scenario 2

### Developer Deleted Wrong Resources

Developer executed

```bash
kubectl delete pods --all
```

Only Development Namespace was affected.

Production remained safe.

Because applications were isolated.

---

## Scenario 3

### Monitoring Team

Monitoring Team deployed

- Prometheus
- Grafana

inside

monitoring Namespace.

Application teams could not accidentally modify them.

---

# 14. Scenario Interview Q&A

Q. Why do we use Namespaces?

Answer

To logically separate applications inside one Kubernetes Cluster.

---

Q. Can two Pods have the same name?

Answer

Yes.

If they belong to different Namespaces.

---

Q. Which Namespace stores Kubernetes components?

Answer

kube-system.

---

# 15. Architecture Interview Q&A

```
Cluster

↓

Namespaces

↓

Deployments

↓

ReplicaSets

↓

Pods
```

---

# 16. Production Support Interview Q&A

Application Missing

```
Alert

↓

kubectl get namespaces

↓

Correct Namespace?

↓

kubectl get pods -A

↓

Deployment

↓

Root Cause

↓

Fix
```

---

# 17. Related Runbooks

- namespace-not-found.md
- deployment-wrong-namespace.md
- resource-quota.md

---

# 18. Common Incidents

- Wrong Namespace
- Resource Quota Exceeded
- Access Denied
- Namespace Deleted
- RBAC Failure

---

# 19. Commands

```bash
kubectl get namespaces

kubectl create namespace production

kubectl delete namespace test

kubectl get pods -n production

kubectl get deployments -n production

kubectl describe namespace production
```

---

# 20. Marathi Quick Revision

- Namespace म्हणजे Logical Folder.
- एका Cluster मध्ये अनेक Namespace असू शकतात.
- Production आणि Development वेगळे ठेवण्यासाठी Namespace वापरतात.
- kube-system मध्ये Kubernetes Components असतात.

---

# 21. Marathi Summary (5+ Experience Revision)

## Interview Summary

Namespace म्हणजे Kubernetes Cluster मधील Logical Isolation.

Enterprise मध्ये Dev, QA, Production, Monitoring यांच्यासाठी वेगळे Namespace असतात.

## Production Investigation Flow

```
Alert

↓

kubectl get namespaces

↓

Correct Namespace?

↓

kubectl get pods -A

↓

Deployment

↓

Events

↓

Root Cause
```

## Production Story

एका Developer ने Production Deployment केल्याचे सांगितले.

Application दिसत नव्हती.

`kubectl get pods -A` चालवले.

Application default Namespace मध्ये Deploy झाली होती.

योग्य Namespace मध्ये Deploy केल्यानंतर समस्या सुटली.

## Memory Trick

**Cluster → Namespace → Deployment → ReplicaSet → Pod**

Remember

**Namespace = Logical Separation**

