# Helm Lab 14 - Use Custom Values Files

# Enterprise DevOps Platform

---

# Lab Objective

In this lab, we will learn how to deploy the same Helm Chart using different values files.

This is one of the biggest advantages of Helm.

Instead of creating separate Kubernetes manifests for every environment, we will maintain:

- One Helm Chart
- Multiple values files

Each environment will have its own configuration while using the same templates.

---

# Production Scenario

Company

ABC Bank

The API Gateway is deployed to multiple Kubernetes clusters.

Environments

```
Development

QA

UAT

Production
```

Every environment uses the same Helm Chart.

Only the configuration changes.

Example

Development

- 1 Replica
- Small Resources
- Debug Enabled

Production

- 5 Replicas
- Large Resources
- Production Image
- High Availability

This approach simplifies deployment and reduces configuration drift.

---

# Enterprise Architecture

```
API Gateway Helm Chart

             │

             ▼

      values-dev.yaml

             │

             ▼

      Development

────────────────────────

API Gateway Helm Chart

             │

             ▼

      values-qa.yaml

             │

             ▼

      QA

────────────────────────

API Gateway Helm Chart

             │

             ▼

      values-prod.yaml

             │

             ▼

      Production
```

---

# Current Project

```
helm/

└── charts/

    └── api-gateway/

        ├── Chart.yaml

        ├── values.yaml

        └── templates/
```

Target

```
helm/

└── charts/

    └── api-gateway/

        ├── Chart.yaml

        ├── values.yaml

        ├── values-dev.yaml

        ├── values-qa.yaml

        ├── values-uat.yaml

        ├── values-prod.yaml

        └── templates/
```

---

# Step 1

Move to the chart directory.

```bash
cd ~/devops-lab/enterprise-devops-platform/helm/charts/api-gateway
```

---

# Step 2

Create Development values.

```bash
cat > values-dev.yaml <<EOF
replicaCount: 1

image:
  repository: enterprise-devops-platform/api-gateway
  pullPolicy: IfNotPresent
  tag: "1.0.0"

service:
  type: ClusterIP
  port: 5000

resources:
  requests:
    cpu: 100m
    memory: 128Mi

  limits:
    cpu: 250m
    memory: 256Mi
