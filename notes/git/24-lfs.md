# Git Large File Storage (Git LFS)

## Purpose

This document explains Git Large File Storage (Git LFS) from an Enterprise DevOps perspective.

Git LFS is an extension to Git that manages large binary files efficiently.

Instead of storing large files directly inside the Git repository, Git LFS stores lightweight pointers in Git while the actual files are stored separately.

Enterprise organizations use Git LFS to improve repository performance, reduce clone times, and efficiently manage large assets.

---

# Introduction

Git performs best with

- Source code
- Configuration files
- Documentation
- Scripts

Git performs poorly with

- Large binaries
- Videos
- Virtual machine images
- Large datasets
- Backup archives

Git LFS was created to solve this limitation.

---

# What is Git LFS?

Git LFS replaces large files with small pointer files inside Git.

Actual file

↓

Git LFS Storage

↓

Pointer stored inside Git

Developers continue working normally while Git automatically downloads the required files.

---

# Why Git LFS is Important

Git LFS provides

- Smaller Git repositories
- Faster cloning
- Faster fetching
- Better repository performance
- Efficient storage of binary assets

It prevents repository history from becoming unnecessarily large.

---

# Enterprise Usage

Git LFS is commonly used for

- Machine Learning datasets
- Videos
- Images
- ISO files
- Virtual machine images
- CAD files
- Game assets
- Large binaries

Source code remains in Git.

Large assets are managed by Git LFS.

---

# Git LFS Architecture

```text
Large File

↓

Git LFS

↓

Pointer File

↓

Git Repository

↓

Actual File

↓

LFS Storage Server
```

The repository contains only lightweight references.

---

# Install Git LFS

Example

```bash
git lfs install
```

This initializes Git LFS on the local machine.

---

# Track Large Files

Example

```bash
git lfs track "*.zip"
```

Track ISO images

```bash
git lfs track "*.iso"
```

Track virtual machine images

```bash
git lfs track "*.qcow2"
```

Git automatically records tracking rules in

```text
.gitattributes
```

---

# Verify Tracking

```bash
git lfs track
```

Displays all tracked file patterns.

---

# View LFS Files

```bash
git lfs ls-files
```

Lists files currently managed by Git LFS.

---

# Clone Repository Using Git LFS

Standard clone

```bash
git clone <repository-url>
```

Git LFS automatically downloads required large files if installed.

---

# Git LFS in Our Project

Current Enterprise DevOps Platform

Mostly contains

- Source Code
- Dockerfiles
- Kubernetes YAML
- Helm Charts
- Terraform
- Documentation

Git LFS is currently unnecessary.

Possible future use

- Training datasets
- Demo videos
- Large architecture diagrams
- VM images
- Test artifacts

---

# Enterprise Workflow

Developer

↓

Add Large File

↓

Git LFS Pointer Created

↓

Commit

↓

Push

↓

GitHub

↓

LFS Storage

↓

Developer Clone

↓

Actual File Downloaded

Repository performance remains efficient.

---

# Daily DevOps Activities

DevOps Engineers may

- Configure Git LFS
- Track binary assets
- Verify LFS storage
- Troubleshoot downloads
- Manage storage usage

Most daily work continues exactly as with standard Git.

---

# Production Best Practices

- Track only large binary files.
- Keep source code in standard Git.
- Commit the `.gitattributes` file.
- Monitor LFS storage usage.
- Remove unused large assets periodically.

---

# Security Considerations

Large files may contain

- Proprietary software
- Customer data
- Internal documentation
- VM images

Apply

- Access control
- Encryption
- Backup policies
- Repository permissions

Git LFS does not replace security controls.

---

# Troubleshooting

Initialize Git LFS

```bash
git lfs install
```

View tracked patterns

```bash
git lfs track
```

View LFS files

```bash
git lfs ls-files
```

Download missing objects

```bash
git lfs pull
```

Fetch objects

```bash
git lfs fetch
```

---

# Real Production Scenario

Scenario

A DevOps team manages several 8 GB virtual machine images used for testing Kubernetes upgrades.

Without Git LFS,

every clone downloads the complete repository history containing all large binaries.

Repository size grows dramatically.

After migrating VM images to Git LFS,

Git history remains lightweight while VM images are downloaded only when required.

Developer onboarding becomes significantly faster.

---

# Scenario-Based Interview Questions

## Question 1

Why was Git LFS created?

Answer

Git is optimized for source code but performs poorly with large binary files.

Git LFS stores binaries separately while keeping lightweight pointers in Git.

---

## Question 2

Which files should be managed using Git LFS?

Answer

Large binary assets such as

- Videos
- ISO files
- VM images
- Large datasets
- CAD files

---

## Question 3

Should normal source code be stored in Git LFS?

Answer

No.

Source code should remain in standard Git because it compresses efficiently and benefits from Git's normal versioning.

---

# Architecture-Level Interview Questions

## Question

How does Git LFS reduce repository size?

Answer

Git stores only pointer files while the actual binary objects are stored separately in an LFS server.

---

## Question

Does Git LFS change normal Git workflows?

Answer

Very little.

Developers continue using normal Git commands while Git LFS transparently manages large files.

---

## Question

When should Git LFS be avoided?

Answer

When repositories contain only source code, configuration files and documentation.

Using Git LFS unnecessarily adds operational complexity.

---

# Production Support Questions

Q.

A cloned repository contains small pointer files instead of actual binaries.

What should you verify?

Answer

Confirm Git LFS is installed and run

```bash
git lfs pull
```

to download the required objects.

---

Q.

Why has repository cloning become unusually slow?

Answer

Investigate whether large binary files were committed directly to Git instead of being managed through Git LFS.

---

# Related Runbooks

Future runbooks

- Install Git LFS
- Configure Git LFS
- Migrate Large Files
- Troubleshoot Missing LFS Objects

---

# Common Incidents

- Git LFS not installed
- Missing binary objects
- Repository contains large files without LFS
- Incorrect tracking rules
- LFS storage quota exceeded
- Pointer files committed incorrectly

---

# Commands

Initialize Git LFS

```bash
git lfs install
```

Track file type

```bash
git lfs track "*.zip"
```

View tracked patterns

```bash
git lfs track
```

List LFS files

```bash
git lfs ls-files
```

Download LFS objects

```bash
git lfs pull
```

Fetch LFS objects

```bash
git lfs fetch
```

---

# Key Takeaways

Git LFS extends Git for managing large binary files.

It improves

- Repository performance
- Clone speed
- Storage efficiency
- Binary asset management

Our Enterprise DevOps Platform currently does not require Git LFS because it primarily contains source code, infrastructure definitions, and documentation. However, Git LFS remains an important enterprise technology for repositories containing large binary assets.

---

# Marathi Quick Revision

Git LFS म्हणजे मोठ्या binary files साठी Git ची extension.

Git मध्ये

- Pointer File

साठवला जातो.

Actual file

↓

LFS Storage मध्ये ठेवला जातो.

यामुळे repository लहान आणि fast राहते.

---

# Marathi Interview Memory Tip

Interview मध्ये जर विचारलं:

"Git LFS म्हणजे काय?"

असं सांगा:

"Git LFS म्हणजे Large File Storage. मोठ्या binary files जसे VM images, videos किंवा datasets थेट Git मध्ये न ठेवता Git फक्त pointer ठेवतो आणि actual files वेगळ्या LFS storage मध्ये ठेवतो. त्यामुळे repository size कमी राहतो आणि clone performance सुधारते."

