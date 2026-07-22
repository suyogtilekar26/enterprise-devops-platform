# Container Image Signing

## Purpose

This document explains Container Image Signing from an Enterprise DevOps perspective.

Container Image Signing ensures that container images are authentic, untampered, and published by trusted sources before they are deployed into production environments.

For our Enterprise DevOps Platform, image signing will become a mandatory security control before images are deployed to Kubernetes.

---

# Introduction

Container Image Signing is the process of cryptographically signing a Docker image.

The signature proves

- Who created the image
- That the image has not been modified
- That the image originated from a trusted build pipeline

Image signing is a critical component of Software Supply Chain Security.

---

# High-Level Architecture

```text
Developer

↓

Git Push

↓

GitHub Actions

↓

Docker Build

↓

Image Scan

↓

Image Signing

↓

Container Registry

↓

Signature Verification

↓

Kubernetes Deployment
```

Only trusted images should reach production.

---

# Why Image Signing is Important

Benefits

- Verifies image authenticity
- Prevents image tampering
- Protects software supply chain
- Supports compliance
- Improves deployment security
- Prevents unauthorized images

---

# What Does Image Signing Protect?

Image signing ensures

- Image integrity
- Publisher identity
- Trusted deployment
- Immutable releases
- Secure software delivery

---

# Image Signing Workflow

```text
Build Image

↓

Generate Signature

↓

Push Image

↓

Push Signature

↓

Registry

↓

Verify Signature

↓

Deploy
```

---

# Without Image Signing

```text
Developer

↓

Docker Build

↓

Registry

↓

Kubernetes
```

Risk

An attacker could replace the image without detection.

---

# With Image Signing

```text
Developer

↓

Docker Build

↓

Sign Image

↓

Registry

↓

Verify Signature

↓

Deploy
```

Only verified images are deployed.

---

# Digital Signature

A digital signature is generated using cryptography.

It verifies

- Image integrity
- Publisher identity
- Data authenticity

If the image changes after signing, signature verification fails.

---

# Public Key Cryptography

Signing generally uses

```text
Private Key

↓

Sign Image

↓

Public Key

↓

Verify Image
```

Private Key

Used for signing.

Public Key

Used for verification.

---

# Signature Verification

Verification confirms

- Image unchanged
- Signature valid
- Trusted publisher
- Deployment approved

If verification fails

Deployment should stop.

---

# Popular Image Signing Tools

Examples

- Cosign
- Notary
- Notary v2
- Sigstore

Cosign is widely adopted in modern Kubernetes environments.

---

# Cosign

Cosign is an open-source image signing tool.

Capabilities

- Sign images
- Verify signatures
- Keyless signing
- SBOM support
- Supply chain security

Cosign integrates well with Kubernetes and CI/CD.

---

# Sigstore

Sigstore provides

- Free signing infrastructure
- Certificate transparency
- Identity verification
- Secure software supply chain

Cosign is part of the Sigstore ecosystem.

---

# Notary

Docker Notary provides trusted image publishing.

Capabilities

- Image signing
- Trust management
- Publisher verification

Notary laid the foundation for trusted container image distribution.

---

# Image Signing in CI/CD

Pipeline

```text
Git Push

↓

Build

↓

Scan

↓

Sign

↓

Registry

↓

Deploy
```

Images are signed automatically after passing security checks.

---

# Image Signing in Our Project

Workflow

```text
Developer

↓

GitHub Actions

↓

Docker Build

↓

Trivy Scan

↓

Cosign Sign

↓

Registry

↓

Kind Kubernetes

↓

Pods
```

Only signed images will be considered production-ready.

---

# Enterprise Workflow

Developer

↓

Source Code

↓

CI Pipeline

↓

Docker Build

↓

Image Scan

↓

Image Signing

↓

Registry

↓

Admission Controller

↓

Kubernetes Deployment

Admission controllers can reject unsigned images.

---

# Internal Workflow

Docker Build

↓

Generate Image Digest

↓

Create Signature

↓

Store Signature

↓

Push Registry

↓

Verify Before Deployment

---

# Image Digest vs Image Tag

Image Tag

```text
frontend:v1.0.0
```

Can be reassigned.

Image Digest

```text
sha256:xxxxxxxx
```

Immutable identifier.

Image signing is typically performed against the image digest.

---

# Admission Controllers

Kubernetes admission controllers can enforce

- Signed images only
- Trusted publishers
- Approved registries
- Security policies

Unsigned images are rejected before Pod creation.

---

# Daily DevOps Activities

DevOps Engineers

- Verify signatures
- Rotate signing keys
- Review signing policies
- Maintain trusted publishers
- Audit registry images
- Monitor failed verification events

---

# Production Best Practices

- Sign every production image.
- Verify signatures before deployment.
- Protect signing keys.
- Use immutable image tags.
- Sign image digests.
- Rotate cryptographic keys.
- Automate signing in CI/CD.
- Use trusted registries.

---

# Security Considerations

- Never expose private signing keys.
- Store keys securely.
- Enable key rotation.
- Verify every deployment.
- Restrict signing permissions.
- Audit signature verification failures.
- Protect CI/CD pipelines.

---

# Troubleshooting

Inspect image

```bash
docker image inspect frontend:v1
```

View image history

```bash
docker history frontend:v1
```

List images

```bash
docker images
```

Inspect image digest

```bash
docker inspect --format='{{index .RepoDigests 0}}' frontend:v1
```

---

# Real Production Scenario

Scenario

A compromised CI server attempts to publish an unauthorized image to the production registry.

Investigation

The image exists in the registry but has no valid signature.

Admission Controller Result

```text
Deployment Rejected
```

Resolution

- Investigate CI compromise.
- Remove unauthorized image.
- Rotate signing keys if necessary.
- Rebuild and sign a trusted image.
- Redeploy.

Result

The malicious image never reaches production.

---

# Scenario-Based Interview Questions

## Question 1

What is Container Image Signing?

Answer

Container Image Signing uses cryptographic signatures to verify that an image was created by a trusted source and has not been modified.

---

## Question 2

Why is image signing important?

Answer

It protects the software supply chain by preventing unauthorized or tampered images from being deployed.

---

## Question 3

What happens if signature verification fails?

Answer

Enterprise environments should reject the deployment until a valid signed image is available.

---

# Architecture-Level Interview Questions

## Question

Why sign image digests instead of tags?

Answer

Image tags can change, while image digests are immutable and uniquely identify image content.

---

## Question

How do Kubernetes admission controllers improve image security?

Answer

They verify policies before workloads are created, allowing only trusted and signed images into the cluster.

---

## Question

Why integrate image signing into CI/CD?

Answer

Automating signing ensures every approved build is authenticated consistently without manual intervention.

---

# Production Support Questions

Q.

A Kubernetes deployment fails because the image signature is invalid.

What should you investigate?

Answer

Review

- Image digest
- Signature
- Trusted public key
- Registry image
- Admission controller logs
- CI/CD signing stage

---

Q.

An unsigned image appears in the registry.

Possible causes?

Answer

- Signing stage skipped
- CI/CD misconfiguration
- Manual image push
- Failed signing process
- Incorrect registry permissions

---

# Related Runbooks

Future runbooks

- Configure Cosign
- Sign Container Images
- Verify Image Signatures
- Rotate Signing Keys
- Troubleshoot Signature Verification Failures

---

# Common Incidents

- Invalid signature
- Missing signature
- Key rotation failure
- Admission controller rejection
- Unsigned production image
- Compromised signing key
- CI signing stage failure

---

# Commands

Inspect image

```bash
docker image inspect frontend:v1
```

View image history

```bash
docker history frontend:v1
```

List images

```bash
docker images
```

Inspect digest

```bash
docker inspect --format='{{index .RepoDigests 0}}' frontend:v1
```

---

# Key Takeaways

Container Image Signing ensures that only trusted, verified, and untampered images are deployed.

Enterprise DevOps teams integrate image signing into CI/CD pipelines using tools such as Cosign and enforce verification through Kubernetes admission controllers.

For our Enterprise DevOps Platform, image signing will complement vulnerability scanning to secure the complete container software supply chain before production deployment.

---

# Marathi Quick Revision

Container Image Signing

- Image authenticate करते
- Tampering detect करते
- Trusted publisher verify करते
- Supply Chain Security
- Cosign
- Sigstore
- Notary
- Admission Controller

Production मध्ये

- प्रत्येक image sign करा
- Deploy करण्यापूर्वी verify करा

---

# Marathi Interview Memory Tip

Interview मध्ये जर विचारलं:

"Container Image Signing म्हणजे काय?"

असं सांगा:

"Container Image Signing म्हणजे Docker image ला cryptographic signature देण्याची प्रक्रिया. यामुळे image trusted source कडून तयार झाली आहे आणि तिच्यात कोणताही बदल झालेला नाही हे verify करता येते. Enterprise मध्ये Cosign सारखी tools वापरून CI/CD pipeline मध्ये images sign केल्या जातात आणि Kubernetes admission controllers deployment पूर्वी त्या signatures verify करतात."

