# Docker Content Trust (DCT)

## Purpose

This document explains Docker Content Trust (DCT) from an Enterprise DevOps perspective.

Docker Content Trust (DCT) enables verification of the publisher and integrity of Docker images using digital signatures. It helps ensure that only trusted container images are pulled and deployed.

For our Enterprise DevOps Platform, Docker Content Trust provides the foundational concepts behind trusted image distribution and software supply chain security, although modern enterprise environments increasingly use Sigstore/Cosign for image signing.

---

# Introduction

Docker Content Trust (DCT) is a security feature that allows Docker clients to verify that an image was published by a trusted source and has not been modified.

DCT is based on

- Digital Signatures
- Docker Notary
- Public Key Cryptography

When enabled, Docker verifies image signatures before pulling or pushing trusted images.

---

# High-Level Architecture

```text
Developer

↓

Docker Build

↓

Sign Image

↓

Docker Registry

↓

Docker Notary

↓

Client Verification

↓

Container Deployment
```

Only trusted images are accepted.

---

# Why Docker Content Trust Matters

Benefits

- Verifies publisher identity
- Prevents image tampering
- Protects software supply chain
- Ensures image integrity
- Improves deployment security
- Supports compliance requirements

---

# Core Components

Docker Content Trust consists of

- Docker Client
- Docker Registry
- Docker Notary Server
- Signing Keys
- Trusted Metadata

---

# Docker Content Trust Workflow

```text
Build Image

↓

Sign Image

↓

Push Registry

↓

Store Signature

↓

Pull Image

↓

Verify Signature

↓

Run Container
```

---

# Digital Signatures

A digital signature confirms

- Who published the image
- Whether the image changed
- Whether the image is trusted

If the image changes after signing, verification fails.

---

# Signing Keys

DCT uses multiple keys.

Typical keys include

- Root Key
- Repository Key
- Timestamp Key
- Snapshot Key

Each key has a specific security purpose.

---

# Root Key

The Root Key establishes trust.

Characteristics

- Created locally
- Highly sensitive
- Should be backed up securely
- Rarely used

Loss of the Root Key can make trust management difficult.

---

# Repository Key

The Repository Key signs image metadata.

It is commonly used during normal publishing operations.

---

# Timestamp Key

The Timestamp Key protects clients from replay attacks by ensuring metadata freshness.

---

# Snapshot Key

The Snapshot Key protects repository metadata consistency and versioning.

---

# Enabling Docker Content Trust

Example

```bash
export DOCKER_CONTENT_TRUST=1
```

When enabled, Docker verifies trusted images automatically.

---

# Pulling Trusted Images

With Docker Content Trust enabled

```bash
docker pull repository/image:tag
```

Docker verifies the signature before completing the pull.

---

# Pushing Trusted Images

Example

```bash
docker push repository/image:v1.0.0
```

Docker signs trusted metadata before publishing.

---

# What Happens If Verification Fails?

Possible reasons

- Missing signature
- Invalid signature
- Image tampering
- Untrusted publisher

Result

The image should not be deployed.

---

# Docker Content Trust in Our Project

Conceptual Workflow

```text
GitHub Actions

↓

Docker Build

↓

Image Scan

↓

Image Signing

↓

Registry

↓

Verification

↓

Kind Kubernetes
```

In later implementation phases, Cosign will replace DCT for production-style image signing.

---

# Enterprise Workflow

Developer

↓

Git Commit

↓

CI Pipeline

↓

Docker Build

↓

Security Scan

↓

Image Signing

↓

Registry

↓

Deployment Verification

↓

Production

---

# Internal Workflow

Build Image

↓

Generate Signature

↓

Store Trusted Metadata

↓

Push Registry

↓

Verify Signature

↓

Deploy

---

# Docker Content Trust vs Cosign

| Feature | Docker Content Trust | Cosign |
|----------|----------------------|---------|
| Image Signing | Yes | Yes |
| Modern Kubernetes Support | Limited | Excellent |
| Sigstore Integration | No | Yes |
| Keyless Signing | No | Yes |
| Active Enterprise Adoption | Declining | Growing |

Modern cloud-native environments increasingly prefer Cosign.

---

# Daily DevOps Activities

DevOps Engineers

- Verify image signatures
- Protect signing keys
- Audit trusted repositories
- Investigate signature failures
- Maintain trusted publishers
- Rotate keys when required

---

# Production Best Practices

- Sign production images.
- Protect Root Keys.
- Rotate compromised keys.
- Store keys securely.
- Verify images before deployment.
- Use immutable image tags.
- Automate trust verification.
- Prefer modern signing solutions for Kubernetes.

---

# Security Considerations

- Never expose private signing keys.
- Backup Root Keys securely.
- Restrict signing permissions.
- Verify every deployment.
- Monitor signature failures.
- Audit registry activity.

---

# Troubleshooting

Enable Docker Content Trust

```bash
export DOCKER_CONTENT_TRUST=1
```

Pull trusted image

```bash
docker pull repository/image:v1.0.0
```

Push trusted image

```bash
docker push repository/image:v1.0.0
```

List local images

```bash
docker images
```

Inspect image

```bash
docker image inspect repository/image:v1.0.0
```

---

# Real Production Scenario

Scenario

A registry is compromised and an attacker replaces a production image.

Investigation

The replacement image has no valid trusted metadata.

Result

Docker Content Trust verification fails.

Resolution

- Reject deployment.
- Restore the trusted image.
- Investigate registry compromise.
- Rotate compromised credentials.
- Verify all production images.

---

# Scenario-Based Interview Questions

## Question 1

What is Docker Content Trust?

Answer

Docker Content Trust verifies the authenticity and integrity of Docker images using digital signatures and trusted metadata.

---

## Question 2

What happens if an image signature is invalid?

Answer

Verification fails, and trusted deployments should reject the image.

---

## Question 3

Why are signing keys important?

Answer

Signing keys establish trust and ensure only authorized publishers can create trusted images.

---

# Architecture-Level Interview Questions

## Question

Why is Docker Content Trust considered part of software supply chain security?

Answer

Because it verifies that deployed images originate from trusted publishers and have not been altered during distribution.

---

## Question

Why are many organizations moving from Docker Content Trust to Cosign?

Answer

Cosign offers stronger Kubernetes integration, Sigstore support, keyless signing, and broader adoption in modern cloud-native environments.

---

## Question

Why should trust verification be automated?

Answer

Automation ensures every deployment consistently enforces security policies without relying on manual verification.

---

# Production Support Questions

Q.

Trusted image verification suddenly starts failing.

What should you investigate?

Answer

Review

- Image signatures
- Registry metadata
- Signing keys
- Repository trust configuration
- Registry availability
- Pipeline signing stage

---

Q.

A signing key is suspected to be compromised.

Possible response?

Answer

- Revoke affected trust
- Rotate keys
- Re-sign trusted images
- Audit registry activity
- Investigate unauthorized access

---

# Related Runbooks

Future runbooks

- Enable Docker Content Trust
- Manage Signing Keys
- Verify Trusted Images
- Rotate Repository Keys
- Investigate Signature Failures

---

# Common Incidents

- Invalid image signature
- Missing trusted metadata
- Compromised signing key
- Repository trust failure
- Verification failure
- Registry compromise

---

# Commands

Enable trust

```bash
export DOCKER_CONTENT_TRUST=1
```

Push image

```bash
docker push repository/image:v1.0.0
```

Pull image

```bash
docker pull repository/image:v1.0.0
```

List images

```bash
docker images
```

Inspect image

```bash
docker image inspect repository/image:v1.0.0
```

---

# Key Takeaways

Docker Content Trust introduced trusted image publishing through digital signatures and metadata verification.

Although many modern Kubernetes platforms now favor Cosign and Sigstore, understanding Docker Content Trust provides valuable background for enterprise container security and software supply chain protection.

For our Enterprise DevOps Platform, DCT serves as the conceptual bridge between traditional Docker image trust and modern cloud-native image signing practices.

---

# Marathi Quick Revision

Docker Content Trust

- Image verify करते
- Publisher verify करते
- Digital Signature वापरते
- Docker Notary वापरते
- Tampering detect करते

Modern Alternative

- Cosign
- Sigstore

---

# Marathi Interview Memory Tip

Interview मध्ये जर विचारलं:

"Docker Content Trust म्हणजे काय?"

असं सांगा:

"Docker Content Trust ही Docker images ची authenticity आणि integrity verify करणारी security feature आहे. ती Docker Notary आणि digital signatures वापरते. Image trusted publisher कडून आली आहे आणि तिच्यात बदल झालेला नाही याची खात्री करते. आधुनिक Kubernetes environments मध्ये Cosign आणि Sigstore अधिक वापरले जात असले तरी Docker Content Trust ची संकल्पना software supply chain security समजण्यासाठी महत्त्वाची आहे."

