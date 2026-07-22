# Docker Image Scanning

## Purpose

This document explains Docker Image Scanning from an Enterprise DevOps perspective.

Docker Image Scanning identifies vulnerabilities, outdated packages, configuration issues, and security risks before container images are deployed to production.

For our Enterprise DevOps Platform, every image will be scanned automatically in the CI/CD pipeline before it is pushed to the container registry and deployed to Kubernetes.

---

# Introduction

Docker Image Scanning is the process of analyzing a container image to identify security vulnerabilities and compliance issues.

Scanning helps detect

- Known CVEs
- Outdated packages
- Vulnerable libraries
- Misconfigurations
- Embedded secrets
- Malware
- License issues

Image scanning is an essential part of DevSecOps.

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

Pass Security Policy

↓

Container Registry

↓

Kubernetes
```

Only approved images move forward.

---

# Why Image Scanning is Important

Benefits

- Detects vulnerabilities early
- Reduces security risks
- Prevents insecure deployments
- Supports compliance
- Improves software quality
- Enables secure CI/CD

---

# What Gets Scanned?

Image scanning examines

- Base Image
- Operating System Packages
- Language Dependencies
- Application Libraries
- Installed Software
- Image Configuration
- Secrets
- Metadata

---

# Common Vulnerabilities

Examples

- Critical CVEs
- High-risk packages
- Unsupported software
- Weak configurations
- Outdated dependencies
- Embedded credentials
- Unsafe permissions

---

# Image Scanning Workflow

```text
Docker Build

↓

Generate Image

↓

Security Scanner

↓

Identify Issues

↓

Generate Report

↓

Pass / Fail Pipeline
```

---

# Severity Levels

Most scanners classify vulnerabilities as

```text
Critical

High

Medium

Low

Informational
```

Enterprise pipelines commonly fail builds when Critical or High vulnerabilities are detected.

---

# Image Scanning Tools

Popular tools include

- Docker Scout
- Trivy
- Grype
- Snyk
- Clair
- Anchore

Each tool maintains vulnerability databases that are updated regularly.

---

# Docker Scout

Docker Scout is Docker's security solution.

Capabilities

- Vulnerability detection
- Base image recommendations
- Software Bill of Materials (SBOM)
- Image comparison
- Security insights

---

# Trivy

Trivy is one of the most widely used open-source image scanners.

Features

- Fast scanning
- CVE detection
- Secret scanning
- Misconfiguration scanning
- Kubernetes scanning
- Filesystem scanning

---

# Grype

Grype scans

- Docker Images
- OCI Images
- Filesystems
- SBOMs

It identifies known vulnerabilities using public vulnerability databases.

---

# Secret Detection

Scanners can identify accidental inclusion of

- API Keys
- Passwords
- AWS Credentials
- Tokens
- SSH Keys
- Certificates

Secrets should never exist inside container images.

---

# Software Bill of Materials (SBOM)

An SBOM lists every software component included in an image.

Example

```text
Base Image

↓

Python

↓

OpenSSL

↓

Flask

↓

Gunicorn
```

SBOMs improve visibility and supply chain security.

---

# CI/CD Integration

Pipeline

```text
Git Push

↓

Build Image

↓

Run Scanner

↓

Critical Vulnerabilities?

↓

No

↓

Push Registry

↓

Deploy
```

If vulnerabilities exceed policy limits, the pipeline fails.

---

# Docker Image Scanning in Our Project

Workflow

```text
GitHub Actions

↓

Docker Build

↓

Trivy Scan

↓

Policy Validation

↓

Docker Registry

↓

Kind Kubernetes
```

Scanning becomes a mandatory deployment gate.

---

# Enterprise Workflow

Developer

↓

Source Code

↓

CI Pipeline

↓

Build Image

↓

Image Scan

↓

Compliance Check

↓

Push Registry

↓

Deploy Kubernetes

Security validation occurs before every deployment.

---

# Internal Workflow

Dockerfile

↓

Image Build

↓

Scanner Downloads CVE Database

↓

Analyze Image

↓

Generate Report

↓

Pipeline Decision

---

# Daily DevOps Activities

DevOps Engineers

- Review vulnerability reports
- Update vulnerable images
- Patch dependencies
- Monitor CVE announcements
- Rebuild affected images
- Verify scan results
- Improve security policies

---

# Production Best Practices

- Scan every image.
- Fail builds on Critical vulnerabilities.
- Update vulnerability databases regularly.
- Keep base images current.
- Remove unnecessary packages.
- Generate SBOMs.
- Automate scanning in CI/CD.
- Re-scan stored registry images periodically.

---

# Security Considerations

- Never ignore Critical findings.
- Validate scanner results.
- Remove vulnerable dependencies.
- Scan third-party images.
- Protect scan reports.
- Maintain image provenance.
- Use trusted registries.

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

Rebuild image

```bash
docker build --no-cache -t frontend:v2 .
```

---

# Real Production Scenario

Scenario

A security scanner identifies a Critical OpenSSL vulnerability in the API Gateway image during the CI pipeline.

Investigation

- Base image contains the vulnerable package.
- The vulnerability is listed in the latest CVE database.

Resolution

- Update the base image.
- Rebuild the image.
- Re-run the scanner.
- Push the updated image.
- Deploy the patched version.

Result

The pipeline succeeds and only the secure image reaches production.

---

# Scenario-Based Interview Questions

## Question 1

What is Docker Image Scanning?

Answer

Docker Image Scanning is the automated process of identifying vulnerabilities, outdated packages, misconfigurations, and other security issues within a container image before deployment.

---

## Question 2

Why should image scanning be part of CI/CD?

Answer

It prevents vulnerable images from reaching production by enforcing security checks automatically during every build.

---

## Question 3

What happens if a scanner detects a Critical vulnerability?

Answer

Enterprise CI/CD pipelines typically fail the build until the vulnerability is resolved or an approved exception is granted.

---

# Architecture-Level Interview Questions

## Question

Why scan images instead of only scanning source code?

Answer

The final image includes operating system packages, runtime libraries, and dependencies that are not visible in source code alone.

---

## Question

Why are vulnerability databases updated frequently?

Answer

New CVEs are discovered daily, so scanners require updated databases to accurately detect recently disclosed vulnerabilities.

---

## Question

Why generate an SBOM?

Answer

An SBOM provides complete visibility into image contents, simplifying vulnerability management, compliance, and incident response.

---

# Production Support Questions

Q.

A production deployment is blocked because the image scan failed.

What should you investigate?

Answer

Review

- Scanner report
- Vulnerability severity
- Base image version
- Dependency versions
- Security policy thresholds
- Available patches

---

Q.

A scanner suddenly reports many new vulnerabilities in an unchanged image.

Possible causes?

Answer

- Updated CVE database
- Newly disclosed vulnerabilities
- Scanner version upgrade
- Changes in vulnerability classification

---

# Related Runbooks

Future runbooks

- Scan Docker Images
- Investigate Failed Image Scans
- Patch Vulnerable Base Images
- Generate SBOM
- Respond to Critical CVEs

---

# Common Incidents

- Critical vulnerability detected
- Pipeline blocked
- Outdated base image
- Vulnerable dependency
- Embedded secrets
- Scanner database outdated
- False positive findings

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

Rebuild image

```bash
docker build --no-cache -t frontend:v2 .
```

---

# Key Takeaways

Docker Image Scanning is a critical DevSecOps practice that identifies vulnerabilities before deployment.

Enterprise teams integrate automated scanning into CI/CD pipelines, enforce security policies, generate SBOMs, and continuously monitor new CVEs to ensure only secure images are deployed.

For our Enterprise DevOps Platform, image scanning will be a mandatory quality gate before every registry push and Kubernetes deployment.

---

# Marathi Quick Revision

Docker Image Scanning

- CVE शोधते
- Vulnerabilities शोधते
- Secrets शोधते
- Misconfiguration शोधते
- CI/CD मध्ये automate करा
- Critical vulnerability असेल तर deployment थांबवा

Popular Tools

- Trivy
- Docker Scout
- Grype
- Snyk
- Clair

---

# Marathi Interview Memory Tip

Interview मध्ये जर विचारलं:

"Docker Image Scanning म्हणजे काय?"

असं सांगा:

"Docker Image Scanning म्हणजे container image मधील vulnerabilities, outdated packages, secrets आणि misconfigurations शोधण्याची automated प्रक्रिया. Enterprise CI/CD pipelines मध्ये Trivy किंवा Docker Scout सारखी tools वापरून प्रत्येक image scan केली जाते. Critical vulnerability आढळल्यास pipeline fail होते आणि सुरक्षित image तयार झाल्यानंतरच deployment केला जातो."

