# Kubernetes Interview Master Handbook

# Section 08 - Kubernetes Security, RBAC & NetworkPolicies

# Chapter 07 - Kubernetes Secrets

---

# Objective

Learn Kubernetes Secrets from a production and interview perspective.

Understand how sensitive information should be securely stored, accessed and managed inside enterprise Kubernetes clusters.

---

# Interview Scenario

Time: 08:30 AM

Production Alert

The application cannot connect to the database.

Application Log

```text
Access denied for user
```

Investigation shows

- Database is healthy
- Network is healthy
- Secret was accidentally deleted

You are responsible for restoring production.

---

# What is a Kubernetes Secret?

A Secret stores sensitive information used by applications.

Examples

- Passwords
- API Keys
- Database Credentials
- TLS Certificates
- SSH Keys
- OAuth Tokens

Secrets help avoid storing sensitive data inside application code or container images.

---

# Why Not ConfigMap?

ConfigMaps

Store non-sensitive configuration.

Secrets

Store sensitive information.

---

# Secret Architecture

Application

↓

Pod

↓

Secret

↓

Environment Variable

OR

Mounted Volume

↓

Application Reads Credentials

---

# Types of Secrets

## Opaque

Default Secret type.

Stores generic key-value pairs.

---

## kubernetes.io/tls

Stores

- TLS Certificate
- Private Key

---

## kubernetes.io/dockerconfigjson

Stores Docker Registry credentials.

Used for pulling private container images.

---

## kubernetes.io/service-account-token

Automatically created for ServiceAccounts.

---

# Create Secret

Literal Values

```bash
kubectl create secret generic db-secret \
--from-literal=username=admin \
--from-literal=password=Password123
```

---

From File

```bash
kubectl create secret generic app-secret \
--from-file=config.env
```

---

View Secrets

```bash
kubectl get secrets
```

---

Describe Secret

```bash
kubectl describe secret db-secret
```

---

View Secret YAML

```bash
kubectl get secret db-secret -o yaml
```

---

# Secret Example

```yaml
apiVersion: v1
kind: Secret

metadata:
  name: db-secret

type: Opaque

data:
  username: YWRtaW4=
  password: UGFzc3dvcmQxMjM=
```

---

# Using Secrets as Environment Variables

```yaml
env:

- name: DB_USERNAME

  valueFrom:

    secretKeyRef:

      name: db-secret

      key: username

- name: DB_PASSWORD

  valueFrom:

    secretKeyRef:

      name: db-secret

      key: password
```

---

# Mounting Secrets as Volumes

```yaml
volumes:

- name: secret-volume

  secret:

    secretName: db-secret
```

---

# Production Incident

Issue

Application fails to connect to database.

Investigation

```bash
kubectl get secrets
```

Result

```text
db-secret
Not Found
```

Root Cause

Secret accidentally deleted.

Resolution

Restore Secret.

Restart Deployment.

Validate connectivity.

---

# Investigation Commands

List Secrets

```bash
kubectl get secrets
```

---

Describe Secret

```bash
kubectl describe secret db-secret
```

---

View YAML

```bash
kubectl get secret db-secret -o yaml
```

---

Describe Pod

```bash
kubectl describe pod app-pod
```

---

Check Environment Variables

```bash
kubectl exec app-pod -- env
```

---

View Mounted Secrets

```bash
kubectl exec app-pod -- ls /etc/secrets
```

---

# Common Problems

Secret Deleted

Secret Name Incorrect

Wrong Namespace

Wrong Secret Key

Application Not Restarted

Base64 Value Incorrect

---

# Validation Checklist

Secret Exists

Correct Namespace

Application Reads Secret

Database Connection Successful

Pods Healthy

Audit Logs Reviewed

---

# RCA Template

Incident

Application Authentication Failure

Root Cause

Deleted Kubernetes Secret

Business Impact

Database Connection Failure

Resolution

Restored Secret

Restarted Application

Preventive Action

Backup Secrets

Enable RBAC Protection

---

# Interview Questions

## Q1. What is a Kubernetes Secret?

Answer

A Kubernetes Secret securely stores sensitive information such as passwords, API keys and certificates for applications.

---

## Q2. Difference between ConfigMap and Secret?

Answer

ConfigMaps store non-sensitive configuration.

Secrets store sensitive information.

---

## Q3. Are Secret values encrypted?

Answer

By default, Secret values are Base64 encoded.

Production clusters should enable Encryption at Rest for stronger protection.

---

## Q4. How can a Pod consume a Secret?

Answer

As

- Environment Variables

or

- Mounted Volumes

---

## Q5. Which Secret type is used for private image pulls?

Answer

kubernetes.io/dockerconfigjson

---

# Assignment

A production application needs

- Database Username
- Database Password
- TLS Certificate

Prepare

- Secret Design
- Deployment Integration
- Validation Commands
- Security Considerations
- Recovery Plan

---

# Assignment Solution

## Step 1

Create dedicated Secrets.

---

## Step 2

Reference Secrets in the Deployment.

---

## Step 3

Verify Secret availability.

---

## Step 4

Restart Pods if necessary.

---

## Step 5

Validate application connectivity.

---

## Step 6

Document Secret ownership and rotation process.

---

# Production Best Practices

✔ Enable Encryption at Rest

✔ Restrict Secret Access Using RBAC

✔ Never Store Secrets in Git

✔ Rotate Credentials Regularly

✔ Use Dedicated Secrets Per Application

✔ Audit Secret Access

✔ Use External Secret Managers Where Possible

✔ Backup Critical Secrets

✔ Monitor Secret Changes

✔ Follow Least Privilege

---

# Runbook Checklist

□ Secret Exists

□ Correct Namespace

□ Secret Referenced Correctly

□ Pod Restarted

□ Application Healthy

□ Database Connected

□ Root Cause Confirmed

□ Recovery Completed

□ Validation Successful

□ Documentation Updated

---

# Common Mistakes

❌ Storing Passwords in ConfigMaps

❌ Committing Secrets to Git

❌ Using Default Credentials

❌ Sharing Secrets Across Applications

❌ Forgetting Secret Rotation

❌ Ignoring RBAC

❌ Missing Secret Backups

❌ Skipping Validation

