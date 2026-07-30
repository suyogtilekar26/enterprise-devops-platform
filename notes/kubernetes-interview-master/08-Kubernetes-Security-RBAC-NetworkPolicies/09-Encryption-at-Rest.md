# Kubernetes Interview Master Handbook

# Section 08 - Kubernetes Security, RBAC & NetworkPolicies

# Chapter 09 - Encryption at Rest

---

# Objective

Learn Kubernetes Encryption at Rest from a production and interview perspective.

Understand why Kubernetes Secrets should be encrypted inside etcd and how enterprise organizations protect sensitive data.

---

# Interview Scenario

Time: 09:10 AM

Security Audit

During a compliance audit, the security team discovers that Kubernetes Secrets are stored in etcd without encryption.

Risk

- Credentials exposed
- Compliance violation
- High security risk

You are responsible for securing the cluster.

---

# What is Encryption at Rest?

Encryption at Rest protects Kubernetes data while it is stored on disk.

Without Encryption at Rest

Secret

↓

API Server

↓

etcd

↓

Stored as Plain Data (after Base64 decoding)

With Encryption at Rest

Secret

↓

API Server

↓

Encryption Provider

↓

Encrypted Data

↓

etcd

---

# Why is Encryption Needed?

Base64 encoding is NOT encryption.

Anyone with etcd access can decode Secret values if Encryption at Rest is not enabled.

---

# What Data Should Be Encrypted?

- Secrets
- Tokens
- Certificates
- Passwords
- API Keys
- Sensitive Custom Resources

---

# Kubernetes Encryption Flow

Application

↓

API Server

↓

Encryption Provider

↓

Encrypted Secret

↓

etcd

---

# Encryption Providers

## identity

No encryption.

Used mainly for testing.

---

## aescbc

AES-CBC encryption.

Most commonly used in production.

---

## secretbox

Modern symmetric encryption.

---

## kms

Uses external Key Management Services.

Examples

- AWS KMS
- Azure Key Vault
- Google Cloud KMS
- HashiCorp Vault

Recommended for enterprise production clusters.

---

# EncryptionConfiguration Example

```yaml
apiVersion: apiserver.config.k8s.io/v1
kind: EncryptionConfiguration

resources:

- resources:
  - secrets

  providers:

  - aescbc:
      keys:
      - name: key1
        secret: <BASE64_KEY>

  - identity: {}
```

---

# Production Incident

Issue

Security audit reports unencrypted Secrets.

Investigation

EncryptionConfiguration not configured.

Root Cause

Encryption at Rest disabled.

Resolution

Configure EncryptionConfiguration.

Restart API Server.

Re-encrypt existing Secrets.

---

# Investigation Commands

View Secrets

```bash
kubectl get secrets
```

---

View Secret

```bash
kubectl get secret db-secret -o yaml
```

---

Check API Server Configuration

```bash
ps -ef | grep kube-apiserver
```

---

Check Encryption Configuration

```bash
cat /etc/kubernetes/encryption-config.yaml
```

---

Verify API Server Flag

```bash
ps -ef | grep encryption-provider-config
```

---

# Re-encrypt Existing Secrets

Rewrite existing Secrets after enabling encryption.

```bash
kubectl get secrets --all-namespaces -o json | kubectl replace -f -
```

---

# Validation Checklist

EncryptionConfiguration Present

API Server Using Encryption

Secrets Successfully Rewritten

Applications Healthy

Audit Passed

---

# RCA Template

Incident

Secrets Not Encrypted

Root Cause

Encryption at Rest Disabled

Business Impact

Sensitive Data Exposure Risk

Resolution

Enabled EncryptionConfiguration

Re-encrypted Secrets

Preventive Action

Include Encryption Verification in Cluster Build Process

---

# Interview Questions

## Q1. What is Encryption at Rest?

Answer

Encryption at Rest protects Kubernetes resources such as Secrets while they are stored inside etcd.

---

## Q2. Are Kubernetes Secrets encrypted by default?

Answer

No.

By default they are Base64 encoded.

Encryption at Rest must be explicitly configured.

---

## Q3. Where are Kubernetes Secrets stored?

Answer

Secrets are stored inside etcd.

---

## Q4. Which encryption provider is recommended for enterprise production?

Answer

KMS integrated with an external Key Management Service.

---

## Q5. Why should Encryption at Rest be enabled?

Answer

To protect sensitive information if etcd storage is compromised and to satisfy security and compliance requirements.

---

# Assignment

A financial application stores

- Database Password
- API Tokens
- TLS Certificates

Prepare

- Encryption Design
- Validation Steps
- Recovery Plan
- Security Considerations
- Compliance Checklist

---

# Assignment Solution

## Step 1

Enable EncryptionConfiguration.

---

## Step 2

Configure an approved encryption provider.

---

## Step 3

Restart the API Server.

---

## Step 4

Re-encrypt existing Secrets.

---

## Step 5

Validate application functionality.

---

## Step 6

Document encryption and key rotation procedures.

---

# Production Best Practices

✔ Enable Encryption at Rest

✔ Use External KMS

✔ Rotate Encryption Keys

✔ Restrict etcd Access

✔ Backup Encryption Keys Securely

✔ Audit Secret Access

✔ Validate Encryption After Cluster Upgrades

✔ Protect API Server Configuration

✔ Perform Regular Compliance Reviews

✔ Monitor Security Events

---

# Runbook Checklist

□ Encryption Enabled

□ API Server Configured

□ Secrets Re-encrypted

□ Applications Healthy

□ Compliance Verified

□ Root Cause Confirmed

□ Recovery Completed

□ Validation Successful

□ Documentation Updated

□ Security Review Completed

---

# Common Mistakes

❌ Assuming Base64 Is Encryption

❌ Leaving Secrets Unencrypted

❌ Not Rotating Encryption Keys

❌ Forgetting to Re-encrypt Existing Secrets

❌ Exposing etcd Access

❌ Skipping Compliance Validation

❌ Missing Encryption Backups

❌ Not Testing After Configuration Changes

