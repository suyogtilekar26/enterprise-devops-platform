# ArgoCD Production Checklist

# Enterprise DevOps Platform

---

# Purpose

This document provides a practical Production Readiness Checklist for ArgoCD deployments.

It can be used before every production release to ensure deployments are safe, secure and compliant with enterprise GitOps practices.

---

# Introduction

Before deploying to Production, every DevOps team should verify that all technical, operational and security requirements have been satisfied.

A deployment should never be approved based only on successful CI execution.

---

# Production Readiness Workflow

```
Code Complete

↓

Pull Request

↓

Code Review

↓

CI Validation

↓

Security Scan

↓

Image Scan

↓

Manifest Validation

↓

Approval

↓

ArgoCD Sync

↓

Production Verification

↓

Monitoring
```

---

# Git Checklist

- Feature branch merged.
- Pull Request approved.
- Branch protection enabled.
- No direct commits to main.
- Commit history is clean.
- Release tag created (if applicable).

---

# CI Checklist

Verify

- Unit Tests Passed
- Integration Tests Passed
- Static Code Analysis Passed
- Dependency Scan Passed
- Docker Build Successful
- Docker Image Pushed

---

# Container Checklist

Verify

- Correct Image Tag
- Latest Approved Image
- Registry Accessible
- Image Vulnerabilities Reviewed

Avoid deploying mutable tags such as

```
latest
```

Prefer versioned tags.

---

# Kubernetes Manifest Checklist

Verify

- Namespace
- Deployment
- Service
- ConfigMap
- Secret References
- Ingress
- Resource Requests
- Resource Limits
- Health Probes

---

# ArgoCD Checklist

Verify

- Application Healthy
- Repository Connected
- Destination Cluster Correct
- Target Namespace Correct
- Sync Policy Reviewed
- Sync Window Open
- No Existing Drift

---

# Security Checklist

Verify

- RBAC Applied
- Least Privilege
- Secrets Managed Securely
- No Plaintext Credentials
- Audit Logs Enabled

---

# Infrastructure Checklist

Verify

- Cluster Healthy
- Worker Nodes Ready
- Storage Available
- Network Healthy
- DNS Working
- Ingress Controller Healthy

---

# Database Checklist

Verify

- Backup Completed
- Migration Reviewed
- Rollback Plan Ready
- Database Connectivity Verified

---

# Monitoring Checklist

Verify

- Prometheus Running
- Grafana Dashboards Ready
- Alertmanager Active
- Application Logs Available
- Kubernetes Events Accessible

---

# Rollback Checklist

Ensure

- Previous Stable Revision Available
- Rollback Command Tested
- Incident Contacts Available
- Recovery Procedure Documented

Example

```bash
argocd app history frontend

argocd app rollback frontend <history-id>
```

---

# Post Deployment Verification

Verify

- Application Healthy
- Pods Running
- Services Reachable
- APIs Responding
- Login Working
- Dashboard Accessible
- Metrics Collected
- No Critical Alerts

---

# Enterprise Example

Application Stack

```
React + Vite

↓

Flask API Gateway

↓

Flask Auth Service

↓

Flask Dashboard Service

↓

Redis

↓

PostgreSQL
```

Deployment is considered successful only when every service reports a healthy status.

---

# Common Production Mistakes

- Deploying without approvals.
- Ignoring failed health checks.
- Skipping rollback planning.
- Using latest image tags.
- Manual kubectl changes.
- Missing monitoring.

---

# Interview Questions

## Q1. What should be verified before a Production ArgoCD deployment?

### Answer

Git approvals, CI validation, image security, Kubernetes manifests, ArgoCD health, RBAC, monitoring and rollback readiness.

---

## Q2. Why is a rollback plan mandatory?

### Answer

If a deployment impacts production, service can be restored quickly while the root cause is investigated.

---

## Q3. Why should health checks be verified after deployment?

### Answer

A successful sync only confirms resource deployment. Health checks confirm the application is actually running correctly.

---

# Marathi Quick Revision

- PR Approved.
- CI Passed.
- Image Scan Complete.
- Manifest Verify.
- RBAC Check.
- Rollback Ready.
- Monitoring Active.
- Health Verify.

---

# Marathi Summary (5+ Experience Revision)

Production deployment करण्यापूर्वी Git approvals, CI validation, image scanning, Kubernetes manifests, ArgoCD health, RBAC, monitoring आणि rollback readiness तपासणे आवश्यक आहे. Deployment पूर्ण झाल्यानंतर application health, services, logs आणि monitoring dashboards verify करणे ही enterprise production release process ची अत्यावश्यक पायरी आहे.

