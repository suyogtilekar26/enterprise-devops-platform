# Helm Labs Roadmap

# Enterprise DevOps Platform

---

# Purpose

This roadmap defines all hands-on Helm labs for the Enterprise DevOps Platform.

Unlike generic Helm tutorials, every lab in this repository uses our actual production application.

Application

```
Users

        │

        ▼

Frontend (React + Vite)

        │

        ▼

API Gateway

        │

 ┌──────┴────────┐

 ▼               ▼

Auth Service   Dashboard Service
```

Each lab builds toward a complete enterprise production deployment.

---

# Prerequisites

Before starting Helm Labs, you should have completed:

- Docker
- Docker Compose
- Kubernetes Notes
- Kubernetes Labs

The Kubernetes cluster should already be operational.

---

# Enterprise Goal

By the end of these labs you will be able to:

- Install Helm
- Create production-ready Helm Charts
- Deploy multiple applications
- Manage releases
- Upgrade applications
- Roll back failed deployments
- Deploy multiple environments
- Integrate Helm with GitHub Actions
- Integrate Helm with Argo CD

---

# Lab Roadmap

| No | Lab | Status |
|----|-----|--------|
| 00 | Helm Lab Roadmap | Current |
| 01 | Install Helm | Pending |
| 02 | Verify Helm Installation | Pending |
| 03 | Create First Helm Chart | Pending |
| 04 | Understand Generated Chart | Pending |
| 05 | Deploy Sample Chart | Pending |
| 06 | Create API Gateway Chart | Pending |
| 07 | Create Auth Service Chart | Pending |
| 08 | Create Dashboard Chart | Pending |
| 09 | Create Frontend Chart | Pending |
| 10 | Configure values.yaml | Pending |
| 11 | Configure ConfigMap | Pending |
| 12 | Configure Secrets | Pending |
| 13 | Configure Service | Pending |
| 14 | Configure Ingress | Pending |
| 15 | Configure Resource Limits | Pending |
| 16 | Configure HPA | Pending |
| 17 | Multi Environment Values | Pending |
| 18 | Chart Dependencies | Pending |
| 19 | Package Chart | Pending |
| 20 | Upgrade Release | Pending |
| 21 | Rollback Release | Pending |
| 22 | Helm History | Pending |
| 23 | Helm Test | Pending |
| 24 | OCI Registry | Pending |
| 25 | GitHub Actions Integration | Pending |
| 26 | Argo CD Deployment | Pending |
| 27 | Production Release | Pending |
| 28 | Troubleshooting | Pending |
| 29 | Lab Summary | Pending |

---

# Our Final Project

By the end of all labs our cluster will look like:

```
Enterprise DevOps Platform

Namespace

enterprise

│

├── frontend

├── api-gateway

├── auth-service

├── dashboard-service

├── ingress

├── configmaps

├── secrets

├── hpa

└── services
```

All applications will be installed using Helm.

---

# Production Deployment Flow

```
Developer

↓

GitHub

↓

GitHub Actions

↓

Docker Build

↓

Push Image

↓

Helm Upgrade

↓

Argo CD

↓

Production Kubernetes
```

---

# Production Best Practices

Every lab follows enterprise standards.

- One chart per application
- Semantic versioning
- Environment-specific values
- Resource limits
- Health probes
- Labels
- Annotations
- GitOps compatibility
- Production-ready templates

---

# Expected Outcome

After completing all Helm Labs you should be able to:

- Build enterprise Helm Charts
- Package applications
- Perform production deployments
- Execute upgrades
- Roll back safely
- Support production releases
- Troubleshoot Helm deployment issues

---

# Marathi Quick Revision

- Helm install
- Chart create
- values.yaml
- ConfigMap
- Secret
- Upgrade
- Rollback
- GitHub Actions
- Argo CD

---

# Marathi Summary (5+ Experience Revision)

या सर्व Labs मध्ये आपण आपल्या Enterprise DevOps Platform साठी production-ready Helm Charts तयार करू. Frontend, API Gateway, Auth Service आणि Dashboard Service यांचे स्वतंत्र Charts तयार करून पुढे GitHub Actions आणि Argo CD द्वारे production deployment करू. प्रत्येक Lab हा प्रत्यक्ष enterprise production workflow प्रमाणे असेल.

