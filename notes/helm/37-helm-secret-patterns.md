# Helm Notes 37 - Helm Secret Patterns

# Enterprise DevOps Platform

---

# 1. Purpose

The purpose of this document is to understand the different Secret patterns used in enterprise Helm Charts.

This is not a beginner tutorial.

This document explains how production teams securely manage sensitive data such as passwords, API keys, certificates and tokens using Kubernetes Secrets.

---

# 2. Introduction

Applications require two types of configuration

```
Non-Sensitive

↓

ConfigMap
```

and

```
Sensitive

↓

Secret
```

Sensitive data includes

- Database Passwords
- API Keys
- JWT Secrets
- TLS Certificates
- SSH Keys
- OAuth Tokens

These should NEVER be stored inside ConfigMaps.

---

# 3. Why Secret Patterns Exist

Suppose an application requires

```
Database Password

API Key

JWT Secret
```

Hardcoding these values inside

```
Deployment.yaml

Docker Image

ConfigMap
```

creates serious security risks.

Helm uses Kubernetes Secrets to store sensitive data securely.

---

# 4. Enterprise Problem Statement

Our Enterprise DevOps Platform contains

```
Frontend

↓

Backend

↓

Redis

↓

RabbitMQ

↓

PostgreSQL

↓

Monitoring
```

Each application requires

- Database Credentials
- TLS Certificates
- OAuth Tokens
- SMTP Passwords
- API Keys

These values must remain protected across all environments.

---

# 5. Secret Pattern 1 - Simple Values

values.yaml

```yaml
secret:

  username: admin

  password: MyPassword123
```

Template

```yaml
apiVersion: v1

kind: Secret

type: Opaque

data:

  username: {{ .Values.secret.username | b64enc }}

  password: {{ .Values.secret.password | b64enc }}
```

Helm encodes values using Base64.

---

# 6. Secret Pattern 2 - External Files

Directory

```
secrets/

    tls.crt

    tls.key
```

Template

```yaml
apiVersion: v1

kind: Secret

type: kubernetes.io/tls

data:

{{ (.Files.Glob "secrets/*").AsSecrets | indent 2 }}
```

Helm automatically Base64 encodes the files.

---

# 7. Secret Pattern 3 - Required Values

Template

```yaml
password:

{{ required "Database password is required" .Values.database.password | b64enc }}
```

Deployment stops if the password is missing.

---

# 8. Secret Pattern 4 - Existing Secret

Template

```yaml
{{- $secret := lookup "v1" "Secret" "default" "database-secret" }}

{{- if $secret }}

Reuse Existing Secret

{{ else }}

Create Secret

{{ end }}
```

Used during upgrades to avoid changing credentials.

---

# 9. Enterprise Workflow

Developer

↓

Update Secret Values

↓

Helm Template

↓

Create Secret

↓

Deploy

↓

Pod Reads Secret

↓

Application Starts

---

# 10. Enterprise Use Cases

Secrets commonly store

- Database Passwords
- API Tokens
- TLS Certificates
- SSH Keys
- SMTP Passwords
- OAuth Credentials
- Docker Registry Credentials
- License Keys

Every enterprise Kubernetes platform uses Secrets.

---

# 11. Production Scenario

A financial application stored

```
Database Password
```

inside

```
ConfigMap
```

A security audit identified the issue.

The platform team migrated credentials to Kubernetes Secrets.

Helm templates were updated to

- Encode values using `b64enc`
- Validate mandatory credentials using `required`
- Reuse existing Secrets using `lookup`

The application became compliant with internal security standards.

---

# 12. Interview Questions

## Q1. Why should passwords never be stored in ConfigMaps?

### Answer

ConfigMaps are designed for non-sensitive configuration. Passwords, API keys and certificates should always be stored in Kubernetes Secrets or an external Secret Manager.

---

## Q2. Does Kubernetes Secret encrypt data?

### Answer

By default, Kubernetes Secrets are Base64 encoded, not encrypted. For production environments, enable etcd encryption and use an external Secret Manager where possible.

---

## Q3. Why is b64enc used?

### Answer

Kubernetes Secret data must be Base64 encoded. The `b64enc` function converts plain text values into Base64 format during template rendering.

---

## Q4. What is the best enterprise approach for Secrets?

### Answer

Store sensitive values in an external Secret Manager such as HashiCorp Vault, Azure Key Vault or AWS Secrets Manager and inject them into Kubernetes rather than storing production secrets directly in Git.

---

# 13. Commands

Render Templates

```bash
helm template frontend ./frontend-chart
```

Validate Chart

```bash
helm lint frontend-chart
```

Install Chart

```bash
helm install frontend ./frontend-chart
```

Upgrade Chart

```bash
helm upgrade frontend ./frontend-chart
```

---

# 14. Best Practices

- Store only sensitive data in Secrets.
- Never commit production passwords to Git.
- Use `required` for mandatory credentials.
- Use `lookup` to reuse existing Secrets.
- Rotate credentials regularly.
- Enable etcd encryption.
- Prefer External Secret Managers in production.

---

# 15. Common Mistakes

- Storing passwords in ConfigMaps.
- Assuming Base64 is encryption.
- Hardcoding secrets in templates.
- Committing secrets to Git repositories.
- Recreating Secrets on every upgrade.
- Not rotating credentials.

---

# 16. Marathi Quick Revision

- Secret मध्ये sensitive data ठेवतात.
- ConfigMap मध्ये password ठेवू नये.
- Base64 म्हणजे encryption नाही.
- `b64enc` वापरून Secret तयार करतात.
- Production मध्ये Vault किंवा Key Vault वापरतात.
- Enterprise मध्ये Secret rotation महत्त्वाची असते.

---

# 17. Marathi Summary (5+ Experience Revision)

## Simple Explanation

Secret हा Kubernetes resource आहे जो passwords, API keys, certificates आणि tokens सारखी sensitive माहिती ठेवण्यासाठी वापरला जातो. Helm मध्ये `b64enc`, `required` आणि `lookup` वापरून secure Secret management केले जाते.

### Project Usage

आपल्या Enterprise DevOps Platform मध्ये PostgreSQL password, RabbitMQ credentials, TLS certificates, SMTP password, Docker registry credentials आणि API tokens Kubernetes Secrets मध्ये ठेवले जातील. Production मध्ये External Secret Manager वापरण्याची शिफारस केली जाईल.

### Production Best Practice

Passwords Git मध्ये commit करू नयेत. ConfigMap मध्ये secrets ठेवू नयेत. `required` वापरून mandatory credentials validate करावेत. Existing Secrets साठी `lookup` वापरावा. शक्य असल्यास Azure Key Vault, AWS Secrets Manager किंवा HashiCorp Vault वापरावा.

### Production Story

एका enterprise मध्ये database password ConfigMap मध्ये ठेवला होता. Security audit मध्ये हा issue सापडला. Engineering team ने Kubernetes Secret, `b64enc`, `required` आणि `lookup` वापरून Secret management सुधारले. नंतर External Secret Manager integrate करून compliance requirements पूर्ण करण्यात आल्या.

### Investigation Flow

```
Need Sensitive Data

↓

Create Secret

↓

Validate using required

↓

Encode using b64enc

↓

Deploy

↓

Pod Reads Secret

↓

Application Starts

↓

Rotate Credentials Periodically
```

### 5+ Years Memory Trick

**Interview Question:**

What is the enterprise best practice for managing Secrets in Helm?

**Answer:**

"Kubernetes Secrets should be used only for sensitive data, but production environments should not rely solely on Base64 encoding. Enterprises typically integrate Helm with External Secret Managers such as HashiCorp Vault, Azure Key Vault or AWS Secrets Manager, validate mandatory credentials using `required`, and reuse existing Secrets using `lookup` for secure and upgrade-safe deployments."

