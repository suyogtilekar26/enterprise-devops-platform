# Kubernetes Secrets

# 1. Purpose

The purpose of Kubernetes Secrets is to securely store sensitive information used by applications.

Examples

- Database Password
- JWT Secret
- API Keys
- OAuth Tokens
- SSH Keys
- TLS Certificates

Secrets keep confidential information separate from the application and reduce the risk of exposing credentials.

---

# 2. Introduction

Imagine our API Gateway needs to connect to a PostgreSQL database.

It requires

- Username
- Password

Bad Practice

```
Docker Image

↓

Password Hardcoded

↓

Anyone with Image can view Password
```

Good Practice

```
Secret

↓

Deployment

↓

Pod

↓

Application Reads Password
```

---

# 3. Enterprise Usage

Production applications commonly store

- Database Credentials
- JWT Secret Keys
- AWS Access Keys
- Azure Credentials
- SMTP Passwords
- OAuth Client Secret
- TLS Certificates

Secrets are used in almost every enterprise Kubernetes cluster.

---

# 4. Usage in THIS Project

```
Frontend

↓

ConfigMap

↓

API URL

----------------------------

API Gateway

↓

Secret

↓

JWT Secret

↓

Database Password

↓

API Gateway Pods

----------------------------

Auth Service

↓

Secret

↓

JWT Signing Key
```

Rule

```
ConfigMap

↓

Non-sensitive Data

-----------------------

Secret

↓

Sensitive Data
```

---

# 5. Architecture

```
               Secret

     DB_USERNAME

     DB_PASSWORD

     JWT_SECRET

            │

            ▼

      Deployment

            │

            ▼

          Pod

            │

            ▼

      Application
```

---

# 6. Internal Workflow

```
DevOps Engineer

↓

Create Secret

↓

Deployment References Secret

↓

Pod Starts

↓

Environment Variables Loaded

↓

Application Uses Credentials
```

---

# 7. Why Secrets?

Without Secrets

```
Password

↓

Dockerfile

↓

GitHub

↓

Anyone Can Read
```

With Secrets

```
Password

↓

Secret

↓

Pod

↓

Application
```

Credentials are managed separately from the application.

---

# 8. What Should Be Stored?

Good Examples

```
Database Password

JWT Secret

OAuth Secret

SMTP Password

TLS Certificate

Private Key
```

Bad Examples

```
Application Name

Environment

Log Level

API URL

Port Number
```

These belong in ConfigMap.

---

# 9. Daily DevOps Activities

- Create Secrets
- Rotate Credentials
- Update TLS Certificates
- Verify Secret Mounts
- Restart Deployments
- Audit Secret Access

---

# 10. Production Best Practices

- Never store passwords in Git.
- Rotate credentials regularly.
- Enable Secret encryption at rest.
- Use RBAC.
- Use External Secret Managers where possible.
- Audit Secret usage.

---

# 11. Security

- Encrypt Secrets.
- Restrict RBAC access.
- Never expose Secrets in logs.
- Never commit Secrets to GitHub.
- Integrate with Vault or AWS Secrets Manager in Production.

---

# 12. Troubleshooting

List Secrets

```bash
kubectl get secrets
```

Describe Secret

```bash
kubectl describe secret db-secret
```

View Secret Names

```bash
kubectl get secret db-secret -o yaml
```

Verify Environment Variables

```bash
kubectl exec -it <pod-name> -- env
```

---

# 13. Real Production Scenarios

## Scenario 1

### Database Login Failed

Application

```
CrashLoopBackOff
```

Investigation

```bash
kubectl describe pod

kubectl get secrets

kubectl describe secret db-secret
```

Root Cause

Database password changed.

Secret was not updated.

Resolution

Update Secret.

Restart Deployment.

---

## Scenario 2

### JWT Authentication Failed

Users could not log in.

Root Cause

JWT Secret changed in Auth Service but API Gateway was still using the old Secret.

Resolution

Update Secret in both services.

Restart Pods.

---

## Scenario 3

### GitHub Credential Leak

Developer accidentally committed passwords to GitHub.

Immediate Actions

- Rotate credentials.
- Delete leaked credentials.
- Create new Secret.
- Redeploy application.

---

# 14. Scenario Interview Questions

Q1. What is a Kubernetes Secret?

Answer

A Secret securely stores sensitive information used by Kubernetes applications.

---

Q2. Can Secrets store passwords?

Answer

Yes.

Secrets are specifically designed for sensitive information.

---

Q3. What is the difference between ConfigMap and Secret?

Answer

ConfigMap stores non-sensitive configuration.

Secret stores sensitive credentials.

---

Q4. Are Secrets encrypted?

Answer

By default they are Base64 encoded.

For Production, enable encryption at rest and use an external secret manager whenever possible.

---

# 15. Architecture Interview Questions

Explain Secret flow.

```
Secret

↓

Deployment

↓

Pod

↓

Application
```

---

Q2.

Why should Secrets never be stored in Docker Images?

Answer

Anyone with access to the image can extract the credentials.

Secrets separate sensitive data from application code.

---

# 16. Production Support Interview Questions

Production Investigation Flow

```
Authentication Failed

↓

Check Secret

↓

Verify Environment Variables

↓

Verify Credentials

↓

Restart Deployment

↓

Validate Application

↓

Resolved
```

Manager Question

"Users cannot log in after today's deployment."

Expected Answer

- Verify Secret
- Verify Credentials
- Verify Authentication Logs
- Restart Deployment
- Validate Login
- Confirm Recovery

---

# 17. Related Runbooks

- database-authentication-failure.md
- jwt-secret-mismatch.md
- secret-rotation.md

---

# 18. Common Incidents

- Wrong Password
- Secret Missing
- Expired TLS Certificate
- Secret Not Mounted
- Authentication Failure

---

# 19. Commands

```bash
kubectl get secrets

kubectl describe secret db-secret

kubectl get secret db-secret -o yaml

kubectl exec -it <pod-name> -- env

kubectl rollout restart deployment api-gateway
```

---

# 20. Marathi Quick Revision

- Secret मध्ये Password, Token, API Key ठेवतात.
- ConfigMap मध्ये Password ठेवत नाहीत.
- Secret GitHub मध्ये Commit करू नये.
- Secret Update केल्यावर Deployment Restart करावा लागू शकतो.

---

# 21. Marathi Summary (5+ Years Experience Revision)

## Interview Summary

Secret हा Kubernetes मधील Sensitive Data Store आहे.

Production मध्ये Database Password, JWT Secret, TLS Certificate आणि API Keys Secrets मध्ये ठेवले जातात.

## Production Investigation Flow

```
Authentication Failed

↓

Secrets

↓

Environment Variables

↓

Application Logs

↓

Restart Deployment

↓

Verify

↓

Resolved
```

## Production Story

Production मध्ये API Gateway Database ला Connect होत नव्हती.

Pods Running होते.

Database Healthy होता.

Investigation मध्ये Database Team ने Password बदलला होता, पण Kubernetes Secret Update झाला नव्हता.

Secret Update करून Deployment Restart केल्यावर Application पुन्हा चालू झाली.

## Memory Trick

**ConfigMap = Configuration**

**Secret = Password**

Remember

**Never Commit Secrets to Git**

