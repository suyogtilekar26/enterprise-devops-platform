# Self-Hosted Docker Registry

## Purpose

This document explains Self-Hosted Docker Registries from an Enterprise DevOps perspective.

A Self-Hosted Docker Registry allows organizations to host, manage, and secure container images within their own infrastructure instead of relying on external cloud registries.

For our Enterprise DevOps Platform, we will first understand the architecture of a self-hosted registry and later use enterprise registry solutions like Amazon ECR and GitHub Container Registry while understanding where self-hosted registries fit into enterprise environments.

---

# Introduction

A Self-Hosted Docker Registry is a private image repository deployed and managed by an organization.

Instead of storing images on Docker Hub or another cloud registry, images are stored inside the company's infrastructure.

Typical deployments include

- Internal Datacenter
- VMware
- Kubernetes
- Private Cloud
- On-Premises Servers

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

Self-Hosted Registry

↓

Kubernetes Cluster

↓

Application Pods
```

The registry becomes the organization's internal image repository.

---

# Why Use a Self-Hosted Registry?

Organizations choose self-hosted registries when they require

- Complete control
- Strong security
- Compliance
- Air-gapped environments
- Internal networking
- Reduced internet dependency
- Cost optimization

---

# Registry Components

A Self-Hosted Registry stores

- Image Layers
- Image Tags
- Image Manifests
- Repository Metadata

It also integrates with

- Authentication
- TLS Certificates
- Storage Backend
- Backup Systems
- Monitoring

---

# Registry Workflow

```text
Docker Build

↓

Image Created

↓

docker push

↓

Self-Hosted Registry

↓

docker pull

↓

Kubernetes
```

---

# Popular Self-Hosted Registries

Examples

- Docker Registry
- Harbor
- Nexus Repository
- JFrog Artifactory

Among these, Harbor is one of the most popular enterprise solutions.

---

# Docker Registry

Docker provides an official registry image.

Example

```text
registry:2
```

This is a lightweight registry implementation.

---

# Harbor

Harbor extends the standard Docker Registry with enterprise features.

Features

- RBAC
- Vulnerability Scanning
- Replication
- Image Signing
- Audit Logs
- LDAP Integration
- Project Management

Many enterprises prefer Harbor over a basic Docker Registry.

---

# Deployment Architecture

```text
CI/CD

↓

Registry

↓

Persistent Storage

↓

TLS

↓

Authentication

↓

Monitoring

↓

Backup
```

Each component contributes to production readiness.

---

# Storage

Registry images must be stored on persistent storage.

Examples

- Local Storage
- NFS
- AWS S3
- Azure Blob Storage
- Google Cloud Storage

Without persistent storage, images are lost if the registry container is removed.

---

# Authentication

Authentication methods include

- Basic Authentication
- LDAP
- Active Directory
- OAuth
- IAM
- Robot Accounts

Only authorized users should push production images.

---

# TLS

Production registries should always use HTTPS.

Benefits

- Encryption
- Authentication
- Data Integrity

Plain HTTP should never be used in production.

---

# Replication

Enterprise registries often replicate images between regions.

Example

```text
Primary Registry

↓

Replica Registry

↓

Disaster Recovery
```

Replication improves availability and disaster recovery.

---

# Backup

Registry backups should include

- Images
- Metadata
- Configuration
- Certificates

Backups are essential for disaster recovery.

---

# Self-Hosted Registry in Our Project

Learning Phase

```text
Docker Hub
```

Intermediate Phase

```text
GitHub Container Registry
```

Enterprise Understanding

```text
Self-Hosted Harbor
```

Production Simulation

```text
Amazon ECR
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

Security Scan

↓

Self-Hosted Registry

↓

Kubernetes Deployment

The registry serves as the organization's internal source of container images.

---

# Internal Workflow

Developer

↓

Create Image

↓

Authenticate

↓

Push Image

↓

Registry Stores Layers

↓

Kubernetes Pulls Image

↓

Containers Start

---

# Advantages

- Complete ownership
- Better security
- Internal networking
- Compliance
- No public exposure
- Custom authentication
- Audit logging
- Image replication

---

# Disadvantages

- Infrastructure management
- Maintenance
- Storage management
- Certificate management
- Backup responsibility
- High availability planning

---

# Daily DevOps Activities

DevOps Engineers

- Maintain registry
- Monitor storage
- Rotate certificates
- Configure backups
- Manage user access
- Scan images
- Remove unused images
- Review audit logs

---

# Production Best Practices

- Enable HTTPS.
- Use persistent storage.
- Enable RBAC.
- Configure image scanning.
- Enable replication.
- Automate backups.
- Monitor registry health.
- Use immutable image tags.
- Restrict administrative access.

---

# Security Considerations

- Use TLS certificates.
- Restrict network access.
- Enable authentication.
- Rotate credentials.
- Enable vulnerability scanning.
- Store secrets securely.
- Enable audit logging.

---

# Troubleshooting

Run registry

```bash
docker run -d -p 5000:5000 registry:2
```

List images

```bash
docker images
```

Tag image

```bash
docker tag frontend:v1 localhost:5000/frontend:v1
```

Push image

```bash
docker push localhost:5000/frontend:v1
```

Pull image

```bash
docker pull localhost:5000/frontend:v1
```

---

# Real Production Scenario

Scenario

A company operating in a highly regulated industry cannot store application images in public cloud services.

Solution

A Harbor registry is deployed inside the organization's private data center.

Benefits

- Internal image storage
- LDAP authentication
- Vulnerability scanning
- Audit logging
- Disaster recovery replication
- Compliance with organizational policies

---

# Scenario-Based Interview Questions

## Question 1

What is a Self-Hosted Docker Registry?

Answer

A Self-Hosted Docker Registry is a privately managed repository that stores Docker images within an organization's infrastructure.

---

## Question 2

Why do enterprises deploy self-hosted registries?

Answer

To improve security, maintain compliance, reduce internet dependency, and retain complete control over container images.

---

## Question 3

What is Harbor?

Answer

Harbor is an enterprise container registry built on top of Docker Registry that provides RBAC, vulnerability scanning, image signing, replication, and audit logging.

---

# Architecture-Level Interview Questions

## Question

Why is persistent storage required for a registry?

Answer

Container images are stored as files. Without persistent storage, all images would be lost if the registry container or host is recreated.

---

## Question

Why is TLS mandatory for production registries?

Answer

TLS encrypts communication between clients and the registry, protecting credentials and image transfers from interception.

---

## Question

Why are registry backups important?

Answer

Backups allow organizations to recover container images and metadata after infrastructure failures or disasters.

---

# Production Support Questions

Q.

Developers cannot push images to the registry.

What should you investigate?

Answer

Review

- Authentication
- TLS certificates
- Repository permissions
- Registry availability
- Storage capacity
- Network connectivity

---

Q.

Kubernetes cannot pull images from the registry.

Possible causes?

Answer

- Authentication failure
- Invalid image tag
- Registry unavailable
- Expired TLS certificate
- Missing imagePullSecrets
- DNS resolution issues

---

# Related Runbooks

Future runbooks

- Deploy Docker Registry
- Configure Harbor
- Configure TLS for Registry
- Backup Registry Data
- Restore Registry
- Configure Registry Authentication

---

# Common Incidents

- Registry unavailable
- Storage full
- Authentication failure
- TLS certificate expired
- Registry replication failure
- Image corruption
- Backup failure

---

# Commands

Run registry

```bash
docker run -d -p 5000:5000 registry:2
```

Tag image

```bash
docker tag frontend:v1 localhost:5000/frontend:v1
```

Push image

```bash
docker push localhost:5000/frontend:v1
```

Pull image

```bash
docker pull localhost:5000/frontend:v1
```

List images

```bash
docker images
```

---

# Key Takeaways

A Self-Hosted Docker Registry provides organizations with complete control over container image storage, security, compliance, and distribution.

While cloud registries such as Amazon ECR and GitHub Container Registry simplify management, self-hosted registries remain an important option for organizations with strict compliance, regulatory, or air-gapped infrastructure requirements.

For our Enterprise DevOps Platform, understanding self-hosted registries provides the architectural foundation needed to work with enterprise container registry solutions.

---

# Marathi Quick Revision

Self-Hosted Registry

- कंपनीच्या infrastructure मध्ये चालते
- Secure
- Private
- Compliance
- Harbor
- Docker Registry
- Backup
- TLS
- Authentication

Production मध्ये

- HTTPS
- Persistent Storage
- RBAC
- Image Scanning
- Backup

---

# Marathi Interview Memory Tip

Interview मध्ये जर विचारलं:

"Self-Hosted Docker Registry म्हणजे काय?"

असं सांगा:

"Self-Hosted Docker Registry म्हणजे कंपनी स्वतःच्या infrastructure मध्ये Docker Images store करणारी private registry. यामुळे images वर पूर्ण नियंत्रण मिळते, security आणि compliance सुधारते, तसेच Harbor सारख्या solutions द्वारे RBAC, vulnerability scanning, replication आणि audit logging सारखी enterprise features उपलब्ध होतात."

