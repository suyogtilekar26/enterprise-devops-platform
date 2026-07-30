# Kubernetes Interview Master Handbook

# Section 08 - Kubernetes Security, RBAC & NetworkPolicies

# Chapter 08 - ConfigMaps vs Secrets

---

# Objective

Understand the differences between ConfigMaps and Secrets from a production and interview perspective.

Learn when to use each resource, how applications consume them and the security implications in enterprise Kubernetes environments.

---

# Interview Scenario

Time: 11:15 AM

Production Alert

A security audit discovers that database passwords are stored inside a ConfigMap.

Risk

- Sensitive credentials exposed
- Compliance violation
- Security incident raised

You are responsible for fixing the configuration without impacting production.

---

# What is a ConfigMap?

A ConfigMap stores non-sensitive application configuration.

Examples

- Application Properties
- Feature Flags
- Log Levels
- URLs
- Environment Settings
- Configuration Files

---

# What is a Secret?

A Secret stores sensitive information.

Examples

- Passwords
- API Keys
- Tokens
- Certificates
- SSH Keys
- OAuth Credentials

---

# Comparison

| Feature | ConfigMap | Secret |
|----------|-----------|--------|
| Purpose | Non-sensitive Data | Sensitive Data |
| Stores | Configuration | Credentials |
| Encoding | Plain Text | Base64 Encoded |
| Encryption at Rest | No | Supported |
| Typical Usage | App Config | Passwords, Tokens |

---

# Architecture

Application

↓

Pod

↓

ConfigMap

Configuration

↓

Secret

Credentials

↓

Application Starts

---

# ConfigMap Example

```yaml
apiVersion: v1
kind: ConfigMap

metadata:
  name: app-config

data:
  APP_NAME: ecommerce
  LOG_LEVEL: INFO
  FEATURE_FLAG: "true"
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

# Using ConfigMap as Environment Variables

```yaml
env:

- name: LOG_LEVEL

  valueFrom:

    configMapKeyRef:

      name: app-config

      key: LOG_LEVEL
```

---

# Using Secret as Environment Variables

```yaml
env:

- name: DB_PASSWORD

  valueFrom:

    secretKeyRef:

      name: db-secret

      key: password
```

---

# Mounting ConfigMap

```yaml
volumes:

- name: config-volume

  configMap:

    name: app-config
```

---

# Mounting Secret

```yaml
volumes:

- name: secret-volume

  secret:

    secretName: db-secret
```

---

# Production Incident

Issue

Application credentials exposed during security review.

Investigation

```bash
kubectl get configmap app-config -o yaml
```

Result

Database password stored inside ConfigMap.

Root Cause

Incorrect resource selection.

Resolution

Move credentials into Kubernetes Secret.

Update Deployment.

Restart Pods.

Validate connectivity.

---

# Investigation Commands

View ConfigMaps

```bash
kubectl get configmaps
```

---

Describe ConfigMap

```bash
kubectl describe configmap app-config
```

---

View ConfigMap YAML

```bash
kubectl get configmap app-config -o yaml
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

Describe Pod

```bash
kubectl describe pod app-pod
```

---

# Common Problems

Passwords Stored in ConfigMaps

Secrets Stored in Wrong Namespace

Incorrect Resource References

Missing Restart After Updates

Shared Secrets Across Applications

---

# Validation Checklist

ConfigMaps Contain Only Non-sensitive Data

Secrets Contain Credentials

Application Starts Successfully

Credentials Loaded Correctly

Pods Healthy

Audit Logs Reviewed

---

# RCA Template

Incident

Sensitive Data Exposure

Root Cause

Credentials Stored in ConfigMap

Business Impact

Security Risk

Resolution

Migrated Credentials to Secret

Preventive Action

Configuration Review During Code Review

---

# Interview Questions

## Q1. What is the difference between ConfigMap and Secret?

Answer

ConfigMaps store non-sensitive configuration.

Secrets store sensitive information such as passwords, tokens and certificates.

---

## Q2. Can Secrets replace ConfigMaps?

Answer

Yes, technically.

However, ConfigMaps should be used for non-sensitive configuration and Secrets for sensitive data to maintain clarity and security.

---

## Q3. Are Kubernetes Secrets encrypted by default?

Answer

No.

Secret values are Base64 encoded by default.

Encryption at Rest should be enabled in production clusters.

---

## Q4. Can both ConfigMaps and Secrets be mounted as volumes?

Answer

Yes.

Both can be mounted as files or exposed as environment variables.

---

## Q5. Why is storing passwords in ConfigMaps a bad practice?

Answer

ConfigMaps are intended for non-sensitive configuration and provide weaker protection than properly managed Secrets.

---

# Assignment

An application requires

- Application Name
- Log Level
- Feature Flag
- Database Username
- Database Password
- API Token

Prepare

- Resource Design
- Kubernetes Objects
- Deployment Integration
- Validation Commands
- Security Considerations

---

# Assignment Solution

## Step 1

Store application configuration in a ConfigMap.

---

## Step 2

Store credentials in a Secret.

---

## Step 3

Reference both resources in the Deployment.

---

## Step 4

Restart the application if required.

---

## Step 5

Validate configuration and connectivity.

---

## Step 6

Document ownership and rotation procedures.

---

# Production Best Practices

✔ Store Only Non-sensitive Data in ConfigMaps

✔ Store Credentials Only in Secrets

✔ Enable Encryption at Rest

✔ Rotate Secrets Regularly

✔ Restrict Secret Access with RBAC

✔ Use External Secret Managers When Available

✔ Audit Secret Access

✔ Keep Configuration Separate from Credentials

✔ Validate Changes Before Production

✔ Follow Least Privilege

---

# Runbook Checklist

□ ConfigMaps Reviewed

□ Secrets Reviewed

□ No Credentials in ConfigMaps

□ Secrets Referenced Correctly

□ Application Healthy

□ Root Cause Confirmed

□ Recovery Completed

□ Validation Successful

□ Audit Completed

□ Documentation Updated

---

# Common Mistakes

❌ Storing Passwords in ConfigMaps

❌ Committing Secrets to Git

❌ Sharing Secrets Between Applications

❌ Forgetting Secret Rotation

❌ Mixing Configuration and Credentials

❌ Missing RBAC Restrictions

❌ Ignoring Security Reviews

❌ Skipping Validation

