# Software Supply Chain Security

## Purpose

This document explains Software Supply Chain Security from an Enterprise DevOps perspective.

Software Supply Chain Security protects every stage involved in building, testing, packaging, storing, and deploying software. It ensures that only trusted code, dependencies, container images, and deployment artifacts reach production.

For our Enterprise DevOps Platform, Software Supply Chain Security will be implemented throughout the CI/CD pipeline using secure source control, image scanning, image signing, trusted registries, and Kubernetes admission controls.

---

# Introduction

A software supply chain consists of every component involved in delivering an application.

It includes

- Source Code
- Dependencies
- Build Systems
- CI/CD Pipelines
- Container Images
- Registries
- Kubernetes Clusters
- Production Infrastructure

A compromise at any stage can affect production.

---

# High-Level Architecture

```text
Developer

↓

Git Repository

↓

Dependencies

↓

CI/CD Pipeline

↓

Docker Build

↓

Image Scan

↓

Image Signing

↓

Container Registry

↓

Kubernetes

↓

Production
```

Every stage must be trusted.

---

# Why Supply Chain Security Matters

Benefits

- Prevents malicious code deployment
- Protects production systems
- Improves software integrity
- Enables compliance
- Supports incident investigations
- Reduces security risks

---

# Supply Chain Components

Typical components include

- Source Repository
- Build Server
- Dependency Manager
- Docker Images
- Container Registry
- Kubernetes Cluster
- Secrets Manager
- Monitoring Platform

---

# Common Supply Chain Risks

- Compromised source code
- Malicious dependencies
- Vulnerable libraries
- CI/CD compromise
- Unsigned container images
- Public registry attacks
- Credential theft
- Dependency confusion
- Typosquatting packages

---

# Secure Supply Chain Workflow

```text
Developer

↓

Git Commit

↓

Code Review

↓

CI Pipeline

↓

Dependency Scan

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

Production
```

---

# Source Code Security

Protect source code using

- Branch protection
- Pull Requests
- Code Reviews
- Signed commits
- Repository permissions

---

# Dependency Security

Every dependency should be

- Trusted
- Updated
- Scanned
- Version controlled

Avoid downloading unknown packages.

---

# CI/CD Security

Protect CI/CD by

- Limiting permissions
- Using short-lived credentials
- Protecting secrets
- Restricting pipeline changes
- Reviewing workflow updates

---

# Container Security

Secure containers by

- Using trusted base images
- Running vulnerability scans
- Removing unnecessary packages
- Running as non-root
- Signing images

---

# Registry Security

Registry controls include

- Authentication
- Authorization
- Immutable tags
- Image signing
- Vulnerability scanning
- Audit logging

---

# Kubernetes Security

Kubernetes should verify

- Trusted registry
- Signed images
- Approved namespaces
- Security policies
- Admission controls

---

# Software Bill of Materials (SBOM)

SBOM provides

- Complete dependency inventory
- Library versions
- Operating system packages
- Runtime components

SBOMs improve traceability and vulnerability management.

---

# Provenance

Provenance records

- Source repository
- Commit ID
- Build pipeline
- Build timestamp
- Image digest
- Deployment history

This information supports auditing and incident response.

---

# Zero Trust Principles

Assume nothing is trusted automatically.

Verify

- Users
- Images
- Pipelines
- Dependencies
- Deployments
- Identities

Every request requires validation.

---

# Supply Chain Security in Our Project

Workflow

```text
Developer

↓

GitHub

↓

GitHub Actions

↓

Dependency Scan

↓

Docker Build

↓

Trivy Scan

↓

Cosign Sign

↓

GHCR / ECR

↓

Kind Kubernetes

↓

Pods
```

Only validated artifacts reach deployment.

---

# Enterprise Workflow

Developer

↓

Source Repository

↓

Automated Testing

↓

Dependency Validation

↓

Container Build

↓

Security Scan

↓

Image Signing

↓

Registry

↓

Admission Controller

↓

Production

---

# Internal Workflow

Code Commit

↓

Pipeline Trigger

↓

Dependency Resolution

↓

Image Build

↓

Security Validation

↓

Artifact Storage

↓

Deployment Approval

---

# Daily DevOps Activities

DevOps Engineers

- Review dependency updates
- Monitor CVEs
- Validate image signatures
- Rotate credentials
- Audit CI/CD pipelines
- Review registry policies
- Generate SBOMs
- Investigate security alerts

---

# Production Best Practices

- Protect source repositories.
- Require pull requests.
- Scan dependencies.
- Scan container images.
- Sign production images.
- Use trusted registries.
- Generate SBOMs.
- Verify deployments.
- Enable audit logging.
- Rotate secrets regularly.

---

# Security Considerations

- Never trust unsigned artifacts.
- Protect CI/CD credentials.
- Monitor third-party dependencies.
- Enforce least privilege.
- Enable MFA.
- Use immutable artifacts.
- Continuously monitor supply chain risks.

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

Inspect digest

```bash
docker inspect --format='{{index .RepoDigests 0}}' frontend:v1
```

---

# Real Production Scenario

Scenario

A popular open-source package is compromised and begins distributing malicious code.

Investigation

The CI pipeline detects the new package version during dependency scanning.

Resolution

- Block the build.
- Pin the previous trusted version.
- Review dependency updates.
- Rebuild images.
- Re-run security validation.

Result

The malicious dependency never reaches production.

---

# Scenario-Based Interview Questions

## Question 1

What is Software Supply Chain Security?

Answer

It is the practice of protecting every stage involved in creating, building, storing, and deploying software to ensure only trusted artifacts reach production.

---

## Question 2

Why is image signing important in supply chain security?

Answer

It verifies image authenticity and prevents deployment of tampered or unauthorized container images.

---

## Question 3

Why generate an SBOM?

Answer

An SBOM provides visibility into software components, making vulnerability management and compliance easier.

---

# Architecture-Level Interview Questions

## Question

Why is supply chain security considered a shared responsibility?

Answer

Because developers, DevOps engineers, security teams, infrastructure administrators, and platform teams all contribute to protecting different stages of the delivery pipeline.

---

## Question

How do admission controllers improve software supply chain security?

Answer

They enforce deployment policies by rejecting unsigned, untrusted, or non-compliant container images before workloads are created.

---

## Question

Why are immutable artifacts important?

Answer

They ensure deployed software cannot be modified after approval, improving traceability and reducing tampering risks.

---

# Production Support Questions

Q.

A deployment is blocked by supply chain security policies.

What should you investigate?

Answer

Review

- Dependency scan results
- Image scan report
- Image signature
- Registry policies
- Admission controller logs
- CI/CD pipeline output

---

Q.

A newly disclosed dependency vulnerability affects production.

Possible response?

Answer

- Identify affected applications
- Update dependency
- Rebuild images
- Re-scan artifacts
- Redeploy patched workloads
- Monitor production

---

# Related Runbooks

Future runbooks

- Respond to Dependency Vulnerabilities
- Generate SBOM
- Verify Image Signatures
- Secure CI/CD Pipeline
- Investigate Supply Chain Incidents

---

# Common Incidents

- Malicious dependency
- Compromised CI pipeline
- Unsigned container image
- Vulnerable base image
- Registry compromise
- Failed admission policy
- Dependency confusion attack

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

Software Supply Chain Security protects every stage of application delivery, from source code to production deployment.

Enterprise DevOps teams secure the supply chain through dependency validation, CI/CD protection, vulnerability scanning, image signing, trusted registries, SBOM generation, and Kubernetes policy enforcement.

For our Enterprise DevOps Platform, supply chain security will ensure that only verified, scanned, signed, and trusted software artifacts are deployed.

---

# Marathi Quick Revision

Software Supply Chain Security

- Source Code सुरक्षित ठेवा
- Dependencies scan करा
- CI/CD सुरक्षित ठेवा
- Images scan करा
- Images sign करा
- Trusted Registry वापरा
- SBOM तयार करा
- Admission Controller वापरा

---

# Marathi Interview Memory Tip

Interview मध्ये जर विचारलं:

"Software Supply Chain Security म्हणजे काय?"

असं सांगा:

"Software Supply Chain Security म्हणजे source code पासून production deployment पर्यंतच्या प्रत्येक टप्प्याचे संरक्षण. यात dependency scanning, container image scanning, image signing, trusted registries, SBOM generation आणि Kubernetes admission policies वापरून फक्त trusted software production मध्ये deploy होईल याची खात्री केली जाते."

