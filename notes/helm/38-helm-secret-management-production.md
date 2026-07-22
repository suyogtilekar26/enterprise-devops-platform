# Helm Notes 38 - Production Secret Management

# Enterprise DevOps Platform

---

# 1. Purpose

The purpose of this document is to understand how enterprise organizations manage Secrets in production Kubernetes environments.

This is not a beginner tutorial.

This document explains real-world Secret management architectures, security practices and production workflows followed by large enterprises.

---

# 2. Introduction

Many beginners think Kubernetes Secret is enough.

Reality is different.

Production companies rarely store production passwords directly inside

```
values.yaml

OR

Git Repository
```

Instead they use

```
Secret Manager

↓

Helm

↓

Kubernetes Secret

↓

Application
```

This reduces security risks and supports password rotation.

---

# 3. Why Production Secret Management Exists

Imagine a company having

```
600 Microservices

↓

150 Developers

↓

20 Clusters
```

Every application requires

- Database Password
- RabbitMQ Password
- Kafka Credentials
- API Keys
- TLS Certificates
- SMTP Password
- OAuth Tokens

Managing these manually is impossible.

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

↓

Ingress
```

Sensitive information includes

```
Database Password

Redis Password

RabbitMQ Password

Grafana Admin Password

SMTP Password

TLS Certificates

Docker Registry Credentials
```

None of these should be committed to Git.

---

# 5. Enterprise Secret Architecture

```
Developer

↓

Git Repository

(No Passwords)

↓

CI/CD Pipeline

↓

Secret Manager

↓

Helm

↓

Kubernetes Secret

↓

Pod

↓

Application
```

Git stores only templates.

Passwords stay inside Secret Manager.

---

# 6. Popular Enterprise Secret Managers

Most enterprises use

```
HashiCorp Vault
```

or

```
Azure Key Vault
```

or

```
AWS Secrets Manager
```

or

```
Google Secret Manager
```

Some organizations also use

```
External Secrets Operator

ESO
```

to synchronize secrets automatically.

---

# 7. Secret Lifecycle

```
Security Team

↓

Creates Secret

↓

Stores Secret

↓

Application Requests Secret

↓

Helm Deployment

↓

Kubernetes Secret

↓

Pod Starts

↓

Application Reads Secret

↓

Periodic Rotation
```

---

# 8. Password Rotation Workflow

```
Security Team

↓

Generate New Password

↓

Update Secret Manager

↓

Trigger CI/CD

↓

Helm Upgrade

↓

Rolling Update

↓

Application Uses New Password
```

No application rebuild is required.

---

# 9. Enterprise Workflow

Developer

↓

Git Push

↓

CI/CD Pipeline

↓

Read Secrets

↓

Helm Upgrade

↓

Create Kubernetes Secret

↓

Deploy Pods

↓

Application Starts

↓

Monitoring

---

# 10. Enterprise Best Practices

Production teams follow

- Never store passwords in Git
- Never hardcode credentials
- Use RBAC
- Enable etcd Encryption
- Rotate passwords regularly
- Audit Secret access
- Use Secret Manager
- Use least privilege access
- Separate Dev/Test/Prod secrets

---

# 11. Production Incident

A developer accidentally committed

```
database-password

AWS Access Key

JWT Secret
```

to GitHub.

Within minutes

automated bots detected the credentials.

Attackers attempted unauthorized access.

Production impact

- Credentials leaked
- Emergency password rotation
- New TLS Certificates
- Application downtime
- Security audit
- Compliance violation

After this incident,

the company migrated to

```
HashiCorp Vault

+

Helm

+

External Secrets Operator
```

Passwords were never stored inside Git again.

---

# 12. Interview Questions

## Q1. Where should production secrets be stored?

### Answer

Production secrets should be stored in a dedicated Secret Manager such as HashiCorp Vault, Azure Key Vault, AWS Secrets Manager or Google Secret Manager instead of Git repositories.

---

## Q2. Why is values.yaml not suitable for production passwords?

### Answer

Because values.yaml is usually version-controlled. Storing production passwords there increases the risk of credential leakage.

---

## Q3. What is Secret Rotation?

### Answer

Secret Rotation is the process of periodically changing passwords, certificates or API keys without modifying application code, reducing the risk of credential compromise.

---

## Q4. Why do enterprises integrate Helm with Secret Managers?

### Answer

To centralize credential management, automate secret injection, support auditing, improve compliance and simplify password rotation.

---

## Q5. What happens if a Git repository leaks passwords?

### Answer

Credentials should be revoked immediately, rotated, audited and replaced. The Git history should also be cleaned if required, but password rotation is always the highest priority.

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

Verify Secrets

```bash
kubectl get secrets
```

Describe Secret

```bash
kubectl describe secret database-secret
```

View Secret Keys

```bash
kubectl get secret database-secret -o yaml
```

Decode Secret

```bash
kubectl get secret database-secret \
-o jsonpath="{.data.password}" | base64 -d
```

---

# 14. Best Practices

- Never commit secrets to Git.
- Use dedicated Secret Managers.
- Rotate passwords periodically.
- Enable audit logging.
- Enable etcd encryption.
- Restrict RBAC permissions.
- Separate environments.
- Automate secret injection.
- Use short-lived credentials whenever possible.

---

# 15. Common Mistakes

- Passwords inside values.yaml
- Secrets committed to Git
- Using ConfigMaps for passwords
- No credential rotation
- Broad RBAC permissions
- Sharing production credentials
- Assuming Base64 is encryption
- No audit logging

---

# 16. Marathi Quick Revision

- Production password Git मध्ये ठेवू नये.
- Secret Manager वापरावा.
- Base64 म्हणजे encryption नाही.
- Password rotation नियमित करावी.
- RBAC वापरावा.
- Audit logging सुरू ठेवावी.
- प्रत्येक environment चे secrets वेगळे ठेवावेत.

---

# 17. Marathi Summary (5+ Experience Revision)

## Simple Explanation

Production मध्ये passwords, API keys आणि certificates Git किंवा values.yaml मध्ये ठेवत नाहीत. ते HashiCorp Vault, Azure Key Vault किंवा AWS Secrets Manager सारख्या Secret Manager मध्ये ठेवले जातात. Helm deployment दरम्यान Secrets Kubernetes मध्ये inject केले जातात.

### Project Usage

आपल्या Enterprise DevOps Platform मध्ये PostgreSQL, Redis, RabbitMQ, SMTP, Grafana आणि Docker Registry credentials Secret Manager मध्ये ठेवले जातील. CI/CD Pipeline deployment दरम्यान Helm Kubernetes Secrets तयार करेल आणि Pods ते credentials वापरतील.

### Production Best Practice

Production passwords कधीही Git मध्ये commit करू नयेत. Secret Manager वापरावा. Password rotation automate करावी. RBAC आणि etcd encryption enable ठेवावी. Audit logs नियमित तपासावेत.

### Production Story

एका enterprise मध्ये developer ने AWS Access Key आणि database password GitHub वर commit केले. Automated scanners ने काही मिनिटांत credentials detect केले. Security team ला emergency rotation करावी लागली. त्यानंतर संपूर्ण organization ने HashiCorp Vault + Helm + External Secrets Operator वापरायला सुरुवात केली.

### Investigation Flow

```
Application Failed

↓

Check Secret

↓

Check Secret Manager

↓

Verify Secret Sync

↓

Verify Kubernetes Secret

↓

Verify Pod Mount

↓

Restart Deployment

↓

Validate Application
```

### 5+ Years Memory Trick

**Interview Question:**

How do enterprises manage secrets in production Kubernetes environments?

**Answer:**

"In production, secrets are never stored in Git or Docker images. Enterprises use Secret Managers like HashiCorp Vault, Azure Key Vault or AWS Secrets Manager. Helm integrates with these systems to inject secrets into Kubernetes securely. Password rotation, RBAC, audit logging and etcd encryption are standard security practices."

