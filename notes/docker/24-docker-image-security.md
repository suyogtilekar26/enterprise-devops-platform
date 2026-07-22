# Docker Image Security

## Purpose

This document explains Docker Image Security from an Enterprise DevOps perspective.

Docker Image Security focuses on ensuring that container images are free from vulnerabilities, trusted, properly configured, and protected throughout the Software Development Lifecycle (SDLC).

For our Enterprise DevOps Platform, every image will be scanned, validated, versioned, and secured before deployment to Kubernetes.

---

# Introduction

A Docker image contains everything required to run an application.

If the image itself is insecure, every container created from it will also be insecure.

Securing images is therefore the first step toward securing containers.

---

# Security Lifecycle

```text
Source Code

↓

Docker Build

↓

Image Scan

↓

Registry

↓

Kubernetes

↓

Running Containers
```

Security begins during image creation—not after deployment.

---

# Why Image Security Matters

Benefits

- Prevents vulnerable deployments
- Reduces attack surface
- Protects production systems
- Meets compliance requirements
- Improves software quality
- Supports secure CI/CD

---

# Common Image Security Risks

- Vulnerable base images
- Outdated packages
- Embedded secrets
- Root user execution
- Untrusted third-party images
- Excessive permissions
- Malware
- Misconfigured software

---

# Secure Image Workflow

```text
Choose Trusted Base Image

↓

Build Image

↓

Scan Image

↓

Fix Vulnerabilities

↓

Push Registry

↓

Deploy Kubernetes
```

---

# Trusted Base Images

Always prefer

- Official images
- Vendor-maintained images
- Minimal images
- Frequently updated images

Examples

```text
python:3.12-slim

nginx:1.27

node:22-alpine
```

Avoid unknown or unverified images.

---

# Keep Base Images Updated

Bad

```text
python:3.8
```

Better

```text
python:3.12-slim
```

Regular updates reduce known vulnerabilities.

---

# Minimize Installed Software

Install only required packages.

Example

Bad

```text
git
vim
nano
gcc
make
curl
```

Better

Only runtime dependencies.

Smaller images reduce attack surface.

---

# Run as Non-Root

Bad

```dockerfile
USER root
```

Better

```dockerfile
RUN useradd appuser

USER appuser
```

Containers should not run as root unless absolutely necessary.

---

# Never Store Secrets

Do NOT include

- Passwords
- API Keys
- SSH Keys
- Certificates
- Database Credentials
- Tokens

Instead use

- Environment Variables
- Kubernetes Secrets
- Secret Managers

---

# Scan Images

Images should be scanned before deployment.

Typical checks include

- Known CVEs
- Outdated packages
- Misconfigurations
- Malware
- License issues

Scanning should be automated in CI/CD.

---

# Sign Images

Image signing verifies

- Authenticity
- Integrity
- Trusted publisher

Benefits

- Prevents tampering
- Verifies provenance
- Supports supply chain security

---

# Image Provenance

Track

- Source repository
- Git commit
- Build pipeline
- Image tag
- Registry
- Deployment version

Traceability is essential for incident response.

---

# Immutable Images

Images should never be modified after publishing.

Instead

```text
Old Image

↓

Build New Image

↓

Deploy New Version
```

Never patch running containers.

---

# Docker Image Security in Our Project

Workflow

```text
Developer

↓

Git Push

↓

GitHub Actions

↓

Docker Build

↓

Security Scan

↓

Docker Registry

↓

Kind Kubernetes

↓

Pods
```

Only approved images move to deployment.

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

Policy Validation

↓

Registry

↓

Kubernetes Deployment

Security gates prevent vulnerable images from reaching production.

---

# Internal Workflow

Dockerfile

↓

Build Image

↓

Security Scanner

↓

Fix Issues

↓

Push Registry

↓

Deploy

---

# Daily DevOps Activities

DevOps Engineers

- Review image vulnerabilities
- Update base images
- Remove vulnerable packages
- Verify image signatures
- Monitor CVEs
- Scan registry images
- Rotate credentials
- Enforce security policies

---

# Production Best Practices

- Use official images.
- Keep images updated.
- Scan every build.
- Run as non-root.
- Remove unnecessary software.
- Never embed secrets.
- Use immutable image tags.
- Enable image signing.
- Store images in trusted registries.
- Automate security checks in CI/CD.

---

# Security Considerations

- Scan continuously.
- Monitor newly published CVEs.
- Restrict registry access.
- Enable TLS.
- Use least privilege.
- Verify image provenance.
- Remove vulnerable images promptly.

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

Remove vulnerable image

```bash
docker rmi frontend:v1
```

Rebuild image

```bash
docker build --no-cache -t frontend:v2 .
```

---

# Real Production Scenario

Scenario

A newly disclosed OpenSSL vulnerability affects multiple production containers.

Investigation

The base image contains the vulnerable package.

Resolution

- Update the base image.
- Rebuild all affected images.
- Re-run security scans.
- Push updated images.
- Redeploy Kubernetes workloads.

Result

All vulnerable containers are replaced with patched versions.

---

# Scenario-Based Interview Questions

## Question 1

Why is Docker Image Security important?

Answer

Because every running container inherits its software from the image. An insecure image results in insecure containers.

---

## Question 2

Why should images be scanned?

Answer

To detect vulnerabilities, outdated packages, misconfigurations, and known security risks before deployment.

---

## Question 3

Why should containers avoid running as root?

Answer

Running as a non-root user limits the impact of a container compromise and follows the principle of least privilege.

---

# Architecture-Level Interview Questions

## Question

Why is image scanning integrated into CI/CD?

Answer

To ensure vulnerable images are blocked before they reach production, enforcing security early in the delivery pipeline.

---

## Question

Why are immutable images considered more secure?

Answer

They prevent unauthorized modifications and ensure deployments remain reproducible and traceable.

---

## Question

Why is image provenance important?

Answer

It enables teams to identify exactly where an image originated, how it was built, and which source code version it contains.

---

# Production Support Questions

Q.

A vulnerability scanner reports a critical CVE in a production image.

What should you investigate?

Answer

Review

- Base image version
- Installed packages
- CVE details
- Registry image version
- Running Kubernetes deployments
- Available patched versions

---

Q.

An image unexpectedly contains sensitive credentials.

Possible causes?

Answer

- Secrets copied during build
- Hardcoded credentials
- Incorrect Dockerfile
- Missing .dockerignore
- Developer mistake

---

# Related Runbooks

Future runbooks

- Scan Docker Images
- Update Base Images
- Rotate Vulnerable Images
- Remove Secrets from Images
- Respond to Critical CVEs

---

# Common Incidents

- Critical CVEs detected
- Root user execution
- Secrets inside images
- Outdated base images
- Malware in third-party images
- Image signature validation failure
- Registry security policy violations

---

# Commands

Build image

```bash
docker build -t frontend:v1 .
```

List images

```bash
docker images
```

Inspect image

```bash
docker image inspect frontend:v1
```

View image history

```bash
docker history frontend:v1
```

Remove image

```bash
docker rmi frontend:v1
```

---

# Key Takeaways

Docker Image Security is the foundation of container security.

Enterprise DevOps teams secure images by using trusted base images, minimizing installed software, scanning every build, avoiding embedded secrets, running containers as non-root users, and enforcing security policies throughout the CI/CD pipeline.

For our Enterprise DevOps Platform, every image will pass automated security validation before being stored in the registry and deployed to Kubernetes.

---

# Marathi Quick Revision

Docker Image Security

- Official Images वापरा
- Image Scan करा
- Root user टाळा
- Secrets image मध्ये ठेवू नका
- Base image update ठेवा
- Immutable images वापरा
- Trusted Registry वापरा

---

# Marathi Interview Memory Tip

Interview मध्ये जर विचारलं:

"Docker Image Security कशी maintain करता?"

असं सांगा:

"मी official minimal base images वापरतो, प्रत्येक build नंतर image vulnerability scan करतो, containers non-root user ने चालवतो, secrets image मध्ये ठेवत नाही, immutable versioned images वापरतो आणि CI/CD pipeline मध्ये security gates लागू करूनच images registry मध्ये push करतो."

