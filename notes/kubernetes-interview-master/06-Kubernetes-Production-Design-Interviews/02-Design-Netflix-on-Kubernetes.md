# Kubernetes Interview Master Handbook

# Chapter 02 - Design Netflix on Kubernetes

---

# Objective

Design a production-grade video streaming platform similar to Netflix using Kubernetes.

---

# Interview Scenario

Design a highly available video streaming platform capable of serving millions of concurrent users worldwide.

---

# Functional Requirements

- User Registration
- Login
- Browse Movies
- Search Movies
- Recommendations
- Watch Movies
- Continue Watching
- Watch History
- Profiles
- Notifications
- Subtitle Support

---

# Non-Functional Requirements

- 99.99% Availability
- High Scalability
- Low Latency
- High Performance
- Fault Tolerance
- Disaster Recovery
- Security
- Observability

---

# Technology Stack

AWS

Docker

Kubernetes (EKS)

Helm

GitHub Actions

Argo CD

NGINX Ingress

Prometheus

Grafana

Loki

Tempo

Redis

Kafka

PostgreSQL

Amazon S3

CloudFront

Velero

Vault

---

# High Level Architecture

Users

↓

CloudFront CDN

↓

AWS WAF

↓

Application Load Balancer

↓

NGINX Ingress

↓

API Gateway

↓

Authentication Service

↓

Catalog Service

↓

Recommendation Service

↓

Streaming Service

↓

Search Service

↓

Notification Service

↓

Redis

↓

Kafka

↓

PostgreSQL

↓

Amazon S3

---

# Kubernetes Architecture

EKS Cluster

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

ConfigMaps

↓

Secrets

↓

Persistent Volumes

↓

Horizontal Pod Autoscaler

↓

Cluster Autoscaler

---

# Streaming Request Flow

User Login

↓

Authentication Service

↓

Catalog Service

↓

Movie Selected

↓

Streaming Token Generated

↓

CloudFront

↓

Amazon S3

↓

Video Playback

↓

Watch History Updated

↓

Recommendation Engine

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

Trivy Scan

↓

Docker Build

↓

Cosign Image Signing

↓

Container Registry

↓

Update Helm Values

↓

Argo CD Sync

↓

Production

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

# Security

RBAC

NetworkPolicies

Vault

TLS

Kyverno

OPA

Signed Images

---

# Autoscaling

Horizontal Pod Autoscaler

↓

Cluster Autoscaler

↓

KEDA

---

# Disaster Recovery

Velero Backup

↓

Amazon S3

↓

Restore

↓

Validation

---

# Production Incident

Issue

Streaming latency increased to more than 2 seconds.

Investigation

Prometheus showed high latency.

Grafana dashboard confirmed API delay.

Tempo traces identified slow Streaming Service.

Redis cache miss ratio increased.

Root Cause

Redis cache eviction due to insufficient memory.

Resolution

Increase Redis memory.

Tune eviction policy.

Increase HPA replicas.

Latency returned below 300ms.

---

# Interview Questions

## Q1. Why use CloudFront?

Answer

CloudFront caches videos at edge locations, reducing latency and improving user experience.

---

## Q2. Why Kafka?

Answer

Kafka handles asynchronous workloads like notifications, watch history and recommendation events.

---

## Q3. Why Redis?

Answer

Redis stores sessions and frequently accessed metadata, reducing database load.

---

## Q4. How will you achieve 99.99% availability?

Answer

Deploy applications across multiple Availability Zones with multiple replicas, HPA, Cluster Autoscaler, health probes and disaster recovery.

---

## Q5. How will you troubleshoot slow streaming?

Answer

Check Grafana dashboards, Prometheus metrics, Tempo traces, Loki logs, Redis performance, CDN cache hit ratio and Kubernetes events.

---

# Assignment

Design a Netflix-like streaming platform using

- API Gateway
- Authentication Service
- Catalog Service
- Recommendation Service
- Streaming Service
- Search Service
- Notification Service
- Redis
- Kafka
- PostgreSQL
- Amazon S3
- CloudFront

Implement

- Kubernetes
- Helm
- GitHub Actions
- Argo CD
- Prometheus
- Grafana
- Loki
- Tempo
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

Create Namespaces

- ingress
- frontend
- backend
- monitoring
- database

Install

- NGINX Ingress Controller
- Metrics Server
- cert-manager

---

## Step 3 - Deploy Microservices

Deploy

- API Gateway
- Authentication Service
- Catalog Service
- Recommendation Service
- Streaming Service
- Search Service
- Notification Service

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

## Step 4 - Databases

Deploy

- PostgreSQL HA
- Redis
- Kafka

Store video files in Amazon S3.

Deliver content through CloudFront.

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

Create dashboards for

- Streaming Latency
- API Response Time
- CPU Usage
- Memory Usage
- Error Rate
- Kafka Lag

---

## Step 7 - Security

Configure

- RBAC
- NetworkPolicies
- Vault
- TLS
- Kyverno
- OPA

---

## Step 8 - Autoscaling

Configure

- HPA
- Cluster Autoscaler

Scale Streaming Service based on

- CPU
- Memory
- Requests Per Second

---

## Step 9 - Disaster Recovery

Install Velero.

Configure daily backups.

Store backups in Amazon S3.

Perform restore testing every month.

---

## Final Architecture

Users

↓

CloudFront

↓

AWS ALB

↓

NGINX Ingress

↓

API Gateway

↓

Authentication

↓

Catalog

↓

Recommendation

↓

Streaming

↓

Search

↓

Notification

↓

Redis

↓

Kafka

↓

PostgreSQL

↓

Amazon S3

---

## Production Best Practices

✔ Multi-AZ Deployment

✔ Minimum 3 Replicas

✔ Readiness Probe

✔ Liveness Probe

✔ HPA

✔ Cluster Autoscaler

✔ GitOps

✔ Image Signing

✔ Monitoring

✔ Disaster Recovery

---

## Interview Answer

"I would build the platform on AWS EKS using a microservices architecture. GitHub Actions would perform CI, while Argo CD would handle GitOps deployments. Redis would cache user sessions and movie metadata, Kafka would process asynchronous events such as watch history and notifications, PostgreSQL would store transactional data, and Amazon S3 with CloudFront would deliver video globally. Prometheus, Grafana, Loki and Tempo would provide complete observability. High availability would be achieved using Multi-AZ deployment, HPA, Cluster Autoscaler and Velero backups."

---

## Common Mistakes

❌ Single Replica

❌ No CDN

❌ No Health Probes

❌ No HPA

❌ Secrets in ConfigMap

❌ No Monitoring

❌ No Backup

❌ No Rollback Strategy

