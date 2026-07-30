# Kubernetes Interview Master Handbook

# Chapter 08 - Design Multi-Tenant SaaS Platform

---

# Objective

Design a production-grade Multi-Tenant SaaS platform capable of serving thousands of organizations securely on a shared Kubernetes infrastructure.

---

# Interview Scenario

Design a SaaS platform where multiple customers (tenants) use the same application while keeping their data completely isolated.

---

# Functional Requirements

- Tenant Registration
- User Registration
- Login
- Tenant Dashboard
- User Management
- Billing
- Subscription Management
- Reports
- Notifications
- Audit Logs

---

# Non-Functional Requirements

- 99.99% Availability
- Multi-Tenancy
- Tenant Isolation
- High Scalability
- Security
- Disaster Recovery
- Observability

---

# Technology Stack

AWS

Docker

Kubernetes (EKS)

Helm

GitHub Actions

Argo CD

Redis

Kafka

PostgreSQL

Vault

Prometheus

Grafana

Loki

Tempo

Velero

---

# High Level Architecture

Users

↓

AWS ALB

↓

NGINX Ingress

↓

API Gateway

↓

Authentication Service

↓

Tenant Service

↓

User Service

↓

Billing Service

↓

Subscription Service

↓

Notification Service

↓

Audit Service

↓

Redis

↓

Kafka

↓

PostgreSQL

---

# Tenant Request Flow

User Login

↓

Authentication

↓

Tenant Validation

↓

Authorization

↓

Application Request

↓

Database Query

↓

Response

---

# Kubernetes Architecture

EKS

↓

Namespaces

↓

Ingress

↓

Deployments

↓

Services

↓

StatefulSets

↓

Secrets

↓

Persistent Volumes

↓

HPA

↓

Cluster Autoscaler

---

# Tenant Isolation Strategies

Shared Database

↓

Separate Schema

OR

Separate Database

OR

Separate Namespace

Choose based on security and compliance requirements.

---

# CI/CD Pipeline

Developer

↓

GitHub

↓

GitHub Actions

↓

Unit Test

↓

SonarQube

↓

Trivy

↓

Docker Build

↓

Cosign

↓

Container Registry

↓

Helm Update

↓

Argo CD

↓

Production

---

# Security

RBAC

Vault

TLS

NetworkPolicies

Kyverno

OPA

Image Signing

Audit Logging

---

# Observability

Prometheus

↓

Grafana

↓

Loki

↓

Tempo

↓

Alertmanager

---

# Production Incident

Issue

Tenant A can view Tenant B's data.

Investigation

Authentication successful.

Authorization failed.

Tenant ID validation missing in User Service.

Root Cause

Application bug skipped tenant validation.

Resolution

Fix authorization middleware.

Add automated security tests.

Rotate affected credentials.

Review audit logs.

---

# Interview Questions

## Q1. What is Multi-Tenancy?

Answer

A software architecture where multiple customers share the same application while keeping their data isolated.

---

## Q2. How do you isolate tenant data?

Answer

Use Tenant IDs, RBAC, application-level authorization and database isolation.

---

## Q3. Which database model is most secure?

Answer

Separate databases provide the strongest isolation but increase operational cost.

---

## Q4. Why use Kafka?

Answer

Kafka processes billing events, notifications and audit events asynchronously.

---

## Q5. How will you scale the platform?

Answer

Use HPA, Cluster Autoscaler, Redis caching and Kafka for asynchronous workloads.

---

# Assignment

Design a Multi-Tenant SaaS Platform using

- API Gateway
- Authentication Service
- Tenant Service
- User Service
- Billing Service
- Subscription Service
- Notification Service
- Audit Service
- Redis
- Kafka
- PostgreSQL

Implement

- Kubernetes
- Helm
- GitHub Actions
- Argo CD
- Prometheus
- Grafana
- Loki
- Tempo
- Vault
- HPA
- Cluster Autoscaler
- Velero

---

# Assignment Solution

## Step 1 - AWS Infrastructure

Create

- VPC
- Public Subnets
- Private Subnets
- Internet Gateway
- NAT Gateway
- EKS Cluster
- Managed Node Groups

---

## Step 2 - Kubernetes Setup

Create namespaces

- saas
- ingress
- monitoring
- database

Install

- NGINX Ingress
- Metrics Server
- cert-manager

---

## Step 3 - Deploy Services

Deploy

- API Gateway
- Authentication
- Tenant
- User
- Billing
- Subscription
- Notification
- Audit

Each service should have

- Deployment
- Service
- ConfigMap
- Secret
- Resource Limits
- Readiness Probe
- Liveness Probe
- HPA

---

## Step 4 - Database Layer

Deploy

- PostgreSQL
- Redis
- Kafka

Choose one isolation strategy

- Shared Database + Tenant ID
OR
- Separate Schema
OR
- Separate Database

---

## Step 5 - CI/CD

Developer

↓

GitHub

↓

GitHub Actions

↓

Unit Test

↓

SonarQube

↓

Trivy

↓

Docker Build

↓

Cosign Image Signing

↓

Push Image

↓

Update Helm Chart

↓

Argo CD Sync

↓

Production

---

## Step 6 - Monitoring

Install

- Prometheus
- Grafana
- Loki
- Tempo
- Alertmanager

Monitor

- Active Tenants
- Login Requests
- API Latency
- Billing Requests
- CPU
- Memory
- Kafka Lag

---

## Step 7 - Security

Configure

- RBAC
- Vault
- TLS
- NetworkPolicies
- Kyverno
- OPA

Implement tenant authorization middleware.

---

## Step 8 - Autoscaling

Configure

- HPA
- Cluster Autoscaler

Scale

- API Gateway
- Authentication
- Billing
- Tenant Service

Based on

- CPU
- Memory
- Requests Per Second

---

## Step 9 - Disaster Recovery

Install Velero.

Backup cluster daily.

Store backups in Amazon S3.

Validate restore every month.

---

## Final Architecture

Users

↓

AWS ALB

↓

NGINX Ingress

↓

API Gateway

↓

Authentication

↓

Tenant

↓

User

↓

Billing

↓

Subscription

↓

Notification

↓

Audit

↓

Redis

↓

Kafka

↓

PostgreSQL

---

## Production Best Practices

✔ Tenant Isolation

✔ RBAC

✔ Vault

✔ Multi-AZ Deployment

✔ HPA

✔ Cluster Autoscaler

✔ GitOps

✔ Monitoring

✔ Daily Backup

✔ Disaster Recovery

---

## Interview Answer

"I would build the SaaS platform on AWS EKS using Kubernetes microservices. Every request would include tenant validation before business logic execution. PostgreSQL would store tenant data using an appropriate isolation strategy, Redis would cache sessions, Kafka would process billing and notification events, GitHub Actions would automate CI, Argo CD would manage GitOps deployments, and Prometheus, Grafana, Loki and Tempo would provide observability. Security would be enforced using RBAC, Vault, NetworkPolicies and strict tenant authorization."

---

## Common Mistakes

❌ No Tenant Validation

❌ Shared Secrets

❌ No Audit Logs

❌ No Monitoring

❌ Single Replica

❌ No Autoscaling

❌ No Disaster Recovery

❌ No Rollback Strategy

