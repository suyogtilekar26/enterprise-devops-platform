# Helm Notes 07 - Helm Install vs Upgrade

# Enterprise DevOps Platform

---

# 1. Purpose

The purpose of this document is to understand the difference between Helm Install and Helm Upgrade from an enterprise production perspective.

This is not just about learning two commands.

This document explains when to use Install, when to use Upgrade, how releases are managed and how production deployments are performed safely.

---

# 2. Introduction

Two of the most frequently used Helm commands are

- helm install
- helm upgrade

Almost every production deployment uses one of these commands.

Understanding their behavior is essential for DevOps Engineers.

---

# 3. Why Install and Upgrade Exist

A Kubernetes application has two stages.

First Deployment

↓

Future Updates

The first deployment creates the application.

Future deployments modify the existing application.

Helm provides two different commands for these operations.

---

# 4. Enterprise Problem Statement

Suppose our Enterprise DevOps Platform contains

```
Frontend

↓

API Gateway

↓

Authentication

↓

Dashboard
```

Initially

No application exists.

The DevOps Engineer executes

```
helm install
```

After one week

Developers release Version 2.

Instead of creating another application,

the existing release must be updated.

For this,

Helm uses

```
helm upgrade
```

---

# 5. Helm Install

The Install command creates a brand-new Helm Release.

Example

```bash
helm install frontend ./frontend-chart
```

Result

```
New Release Created

↓

Deployment

↓

Service

↓

ConfigMap

↓

Pods Running
```

A Release History starts from Revision 1.

---

# 6. Helm Upgrade

Upgrade modifies an existing Release.

Example

```bash
helm upgrade frontend ./frontend-chart
```

Helm compares

Current Release

↓

New Chart

↓

Apply Changes

↓

New Revision

The application is updated without creating another release.

---

# 7. Install vs Upgrade

| Install | Upgrade |
|----------|----------|
| Creates a new Release | Updates an existing Release |
| First deployment | Existing deployment |
| Revision starts at 1 | Revision increases |
| New application | Existing application updated |
| Used once | Used multiple times |

---

# 8. Enterprise Workflow

Developer

↓

Git Push

↓

GitHub Actions

↓

Docker Build

↓

Push Image

↓

Helm Upgrade

↓

Argo CD

↓

Production Cluster

Notice

Install usually happens only once.

Upgrade happens throughout the application's lifecycle.

---

# 9. Release Revision Example

Initial deployment

```
Revision 1
```

Second deployment

```
Revision 2
```

Third deployment

```
Revision 3
```

Fourth deployment

```
Revision 4
```

Every Upgrade creates a new Revision.

---

# 10. Enterprise Use Cases

Install

- New Application
- New Namespace
- New Environment
- Initial Deployment

Upgrade

- New Image Version
- Configuration Changes
- Replica Updates
- Resource Changes
- Feature Releases
- Security Fixes

---

# 11. Production Scenario

A banking application Version 1.0 was deployed using

```bash
helm install banking ./bank-chart
```

One week later

Version 1.1 became available.

Instead of uninstalling and reinstalling,

the DevOps Engineer executed

```bash
helm upgrade banking ./bank-chart
```

Only the required Kubernetes resources were updated.

The application remained available with minimal downtime.

---

# 12. Interview Questions

## Q1. What is the difference between Helm Install and Helm Upgrade?

### Answer

Helm Install creates a new Helm Release, while Helm Upgrade modifies an existing Release by applying changes from the updated Chart and creating a new release revision.

---

## Q2. Can Helm Install update an existing Release?

### Answer

No.

Helm Install creates a new Release.

Updating an existing application requires Helm Upgrade.

---

## Q3. What happens during Helm Upgrade?

### Answer

Helm renders the updated templates, compares them with the current release, applies the required Kubernetes changes and creates a new release revision.

---

# 13. Commands

Install application

```bash
helm install frontend ./frontend-chart
```

Upgrade application

```bash
helm upgrade frontend ./frontend-chart
```

Upgrade using values file

```bash
helm upgrade frontend ./frontend-chart -f values-prod.yaml
```

Install if missing, otherwise upgrade

```bash
helm upgrade --install frontend ./frontend-chart
```

---

# 14. Best Practices

- Use Install only once.
- Use Upgrade for future releases.
- Version every release.
- Validate Charts before upgrading.
- Test upgrades in lower environments.
- Keep rollback history.
- Store Charts in Git.

---

# 15. Common Mistakes

- Running Install twice.
- Uninstalling instead of Upgrading.
- Forgetting values files.
- Upgrading without validation.
- Ignoring release history.
- Deploying directly to production.

---

# 16. Marathi Quick Revision

- Install म्हणजे नवीन Release.
- Upgrade म्हणजे Existing Release Update.
- प्रत्येक Upgrade नवीन Revision तयार करते.
- Production मध्ये Upgrade जास्त वापरले जाते.
- Install साधारणपणे एकदाच चालतो.

---

# 17. Marathi Summary (5+ Experience Revision)

## Simple Explanation

Helm Install नवीन Release तयार करतो, तर Helm Upgrade आधीपासून असलेल्या Release मध्ये बदल करून नवीन Revision तयार करतो. Production मध्ये Install पेक्षा Upgrade खूप जास्त वापरला जातो.

### Project Usage

आपल्या Enterprise DevOps Platform मध्ये प्रत्येक microservice प्रथम `helm install` ने deploy होईल. त्यानंतर प्रत्येक नवीन Docker image release साठी `helm upgrade` वापरला जाईल.

### Production Best Practice

Production मध्ये application uninstall करून पुन्हा install करू नये. नेहमी `helm upgrade` वापरून controlled deployment करावे आणि release history maintain करावी.

### Production Story

एका enterprise मध्ये प्रत्येक release साठी Helm uninstall करून पुन्हा install केले जात होते. त्यामुळे downtime निर्माण होत होता. नंतर deployment strategy बदलून Helm Upgrade वापरण्यात आला. Release revisions maintain झाल्या, rollback सोपे झाले आणि downtime मोठ्या प्रमाणात कमी झाला.

### Investigation Flow

```
New Application

↓

Helm Install

↓

Release Created

↓

New Version

↓

Helm Upgrade

↓

New Revision

↓

Application Updated
```

### 5+ Years Memory Trick

**Interview Question:**

When would you use Helm Install and Helm Upgrade in production?

**Answer:**

"Helm Install is used only for the initial deployment of an application, creating a new release. Subsequent deployments use Helm Upgrade, which updates the existing release, creates a new revision, preserves release history and enables safe rollbacks if required."

