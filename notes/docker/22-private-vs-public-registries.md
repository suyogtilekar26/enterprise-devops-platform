# Private vs Public Docker Registries

## Purpose

This document explains the differences between Public and Private Docker Registries from an Enterprise DevOps perspective.

Choosing the correct registry is an important architectural decision because it affects security, compliance, deployment speed, access control, cost, and software distribution.

For our Enterprise DevOps Platform, we will initially learn using Docker Hub (public registry) and later migrate to GitHub Container Registry (GHCR) and Amazon Elastic Container Registry (ECR).

---

# Introduction

A Docker Registry stores Docker Images.

Registries are broadly classified into two categories

- Public Registry
- Private Registry

The primary difference is who can access the stored images.

---

# High-Level Architecture

```text
                Docker Registry

                      │
        ┌─────────────┴─────────────┐
        │                           │

 Public Registry             Private Registry

        │                           │

 Accessible by All          Restricted Access

        │                           │

 Docker Hub                 GHCR / ECR / Harbor
```

---

# Public Registry

A Public Registry allows anyone to

- Pull images
- View repositories
- Access public image metadata

Examples

- Docker Hub
- Quay.io (public repositories)
- GitHub Container Registry (public repositories)

Example

```bash
docker pull nginx
```

No authentication is required for most public images.

---

# Private Registry

A Private Registry restricts access.

Only authorized users or systems can

- Pull images
- Push images
- View repositories

Authentication is mandatory.

Examples

- Amazon ECR
- GitHub Container Registry (private)
- Harbor
- Azure Container Registry
- Google Artifact Registry

---

# Public Registry Workflow

```text
Developer

↓

Docker Build

↓

Docker Hub

↓

Anyone Can Pull

↓

Container
```

---

# Private Registry Workflow

```text
Developer

↓

CI/CD

↓

Private Registry

↓

Authenticated Kubernetes Cluster

↓

Containers
```

---

# Public Registry Characteristics

Advantages

- Free images
- Easy sharing
- Huge ecosystem
- Community maintained images
- Excellent for learning

Disadvantages

- Limited security
- Public visibility
- Pull rate limits
- Less control
- Compliance challenges

---

# Private Registry Characteristics

Advantages

- Secure
- Access controlled
- Private repositories
- Enterprise compliance
- Audit logging
- IAM integration
- Vulnerability scanning

Disadvantages

- Cost
- Administration
- Infrastructure management
- Authentication required

---

# Public Registry Examples

Docker Hub

```text
docker.io
```

GitHub Container Registry

```text
ghcr.io
```

Quay

```text
quay.io
```

---

# Private Registry Examples

Amazon

```text
ECR
```

Azure

```text
ACR
```

Google Cloud

```text
Artifact Registry
```

Self-hosted

```text
Harbor
```

Docker Registry

```text
registry:2
```

---

# Authentication

Public Registry

```text
Optional
```

Private Registry

```text
Mandatory
```

Typical authentication

```bash
docker login
```

---

# Image Visibility

Public

```text
Everyone
```

Private

```text
Authorized Users Only
```

---

# Enterprise Comparison

| Feature | Public Registry | Private Registry |
|----------|----------------|------------------|
| Public Access | Yes | No |
| Authentication | Optional | Required |
| Enterprise Security | Limited | Excellent |
| Compliance | Limited | Strong |
| IAM Integration | Limited | Yes |
| Production Usage | Limited | Recommended |
| Cost | Usually Free | Usually Paid |

---

# Registry Selection

Development

```text
Docker Hub
```

Internal Testing

```text
GHCR Private
```

Production

```text
Amazon ECR
```

Large Enterprise

```text
Harbor

or

ECR

or

ACR

or

GAR
```

---

# Registry Choice in Our Project

Learning Phase

```text
Docker Hub
```

Intermediate Phase

```text
GitHub Container Registry
```

Production Simulation

```text
Amazon ECR
```

Deployment

```text
GitHub Actions

↓

Build Image

↓

GHCR / ECR

↓

Kind Kubernetes

↓

Pods
```

---

# Enterprise Workflow

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

Private Registry

↓

Kubernetes Deployment

Production environments rarely deploy directly from public registries.

---

# Internal Workflow

Developer

↓

Build Image

↓

Authenticate

↓

Push Image

↓

Registry Stores Layers

↓

Kubernetes Pulls Image

↓

Container Starts

---

# Why Enterprises Prefer Private Registries

Private registries provide

- Security
- Compliance
- Encryption
- Access control
- Audit logging
- Vulnerability scanning
- Lifecycle policies
- Geographic replication

These features are essential for production workloads.

---

# Daily DevOps Activities

DevOps Engineers

- Push images
- Configure registry permissions
- Manage repositories
- Rotate credentials
- Clean old images
- Review vulnerability scans
- Configure lifecycle policies
- Support deployments

---

# Production Best Practices

- Use private registries for production.
- Enable IAM or RBAC.
- Scan every image.
- Use immutable tags.
- Remove old image versions.
- Enable TLS.
- Enable audit logging.
- Configure lifecycle policies.
- Limit repository permissions.

---

# Security Considerations

- Never expose production images publicly.
- Enable MFA.
- Use access tokens.
- Rotate credentials regularly.
- Restrict push permissions.
- Restrict pull permissions.
- Scan images continuously.
- Encrypt registry traffic.

---

# Troubleshooting

Login

```bash
docker login registry.company.com
```

Push image

```bash
docker push registry.company.com/frontend:v1.0.0
```

Pull image

```bash
docker pull registry.company.com/frontend:v1.0.0
```

Verify image

```bash
docker images
```

Inspect image

```bash
docker image inspect frontend:v1.0.0
```

---

# Real Production Scenario

Scenario

A developer accidentally pushes a confidential internal application image to a public registry.

Impact

- Source code exposed
- Security risk
- Compliance violation
- Sensitive software publicly available

Resolution

- Remove public repository
- Rotate credentials
- Audit image contents
- Move application to a private registry
- Restrict future push permissions
- Update CI/CD pipeline

Lesson

Production applications should use private registries.

---

# Scenario-Based Interview Questions

## Question 1

What is the difference between a Public and Private Docker Registry?

Answer

A Public Registry allows unrestricted access to public images, while a Private Registry restricts access to authorized users and systems through authentication and access control.

---

## Question 2

Why do enterprises use private registries?

Answer

Private registries provide stronger security, compliance, access control, auditing, vulnerability scanning, and integration with enterprise identity systems.

---

## Question 3

Can Docker Hub be used as a private registry?

Answer

Yes.

Docker Hub supports both public and private repositories, although many enterprises choose dedicated private registry solutions for additional enterprise features.

---

# Architecture-Level Interview Questions

## Question

Why shouldn't production Kubernetes clusters pull business-critical images from public registries?

Answer

Public registries introduce dependency on external services, may enforce pull rate limits, and provide less control over security and compliance. Private registries offer greater reliability, governance, and access control.

---

## Question

Why are lifecycle policies important in private registries?

Answer

They automatically remove unused or outdated images, reducing storage costs and improving registry management.

---

## Question

Why integrate registries with IAM?

Answer

IAM enables centralized authentication, fine-grained authorization, auditing, and secure access management across teams.

---

# Production Support Questions

Q.

Production deployments suddenly fail with image pull errors.

What should you investigate?

Answer

Review

- Registry availability
- Authentication
- IAM permissions
- Image tag
- Repository existence
- Network connectivity
- Kubernetes imagePullSecrets

---

Q.

An internal application image becomes publicly accessible.

Possible causes?

Answer

- Repository created as public
- Incorrect registry permissions
- CI/CD misconfiguration
- Manual publication
- Access policy errors

---

# Related Runbooks

Future runbooks

- Configure Private Registry
- Authenticate with Registry
- Configure imagePullSecrets
- Rotate Registry Credentials
- Manage Registry Lifecycle Policies

---

# Common Incidents

- Authentication failure
- Public repository exposure
- ImagePullBackOff
- Wrong repository permissions
- Registry unavailable
- Lifecycle policy deleting required images
- Incorrect IAM permissions

---

# Commands

Login

```bash
docker login registry.company.com
```

Push image

```bash
docker push registry.company.com/frontend:v1.0.0
```

Pull image

```bash
docker pull registry.company.com/frontend:v1.0.0
```

List images

```bash
docker images
```

Inspect image

```bash
docker image inspect frontend:v1.0.0
```

---

# Key Takeaways

Public registries are ideal for learning, open-source software, and community collaboration, while private registries are the preferred choice for enterprise production environments due to their enhanced security, access control, compliance, and operational features.

For our Enterprise DevOps Platform, we will begin with Docker Hub to understand registry concepts, transition to GitHub Container Registry during CI/CD implementation, and finally use Amazon ECR for enterprise-grade production deployments.

---

# Marathi Quick Revision

Public Registry

- सर्वांना access
- Learning
- Open Source
- Docker Hub

Private Registry

- Authentication
- Secure
- Enterprise
- ECR
- GHCR
- Harbor
- ACR

Production

```text
Private Registry वापरा
```

---

# Marathi Interview Memory Tip

Interview मध्ये जर विचारलं:

"Public आणि Private Docker Registry मध्ये काय फरक आहे?"

असं सांगा:

"Public Registry मध्ये images सर्वांना उपलब्ध असतात, तर Private Registry मध्ये authentication आणि access control असतो. Learning आणि open-source projects साठी Docker Hub योग्य आहे, पण production enterprise applications साठी Amazon ECR, GitHub Container Registry किंवा Harbor सारखे private registries वापरले जातात कारण ते security, compliance, IAM integration आणि vulnerability scanning सारखी enterprise features देतात."

