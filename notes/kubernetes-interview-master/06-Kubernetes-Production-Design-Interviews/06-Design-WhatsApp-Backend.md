# Kubernetes Interview Master Handbook

# Chapter 06 - Design WhatsApp Backend

---

# Objective

Design a production-grade messaging platform similar to WhatsApp using Kubernetes.

---

# Interview Scenario

Design a messaging application capable of supporting millions of concurrent users with real-time messaging, voice calls and media sharing.

---

# Functional Requirements

- User Registration
- Login
- Contact Sync
- One-to-One Chat
- Group Chat
- Voice Calling
- Video Calling
- Media Sharing
- Read Receipts
- Online Status
- Push Notifications

---

# Non-Functional Requirements

- 99.99% Availability
- Low Latency
- High Throughput
- Fault Tolerance
- End-to-End Security
- Disaster Recovery
- High Scalability

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

Object Storage (S3)

Prometheus

Grafana

Loki

Tempo

Vault

Velero

---

# High Level Architecture

Mobile App

↓

AWS ALB

↓

NGINX Ingress

↓

API Gateway

↓

Authentication Service

↓

User Service

↓

Messaging Service

↓

Group Service

↓

Media Service

↓

Notification Service

↓

Presence Service

↓

Redis

↓

Kafka

↓

PostgreSQL

↓

Amazon S3

---

# Message Flow

User A

↓

Messaging Service

↓

Kafka

↓

User B Online?

↓

Yes → Deliver Immediately

↓

No → Store Message

↓

Push Notification

↓

Delivered

↓

Read Receipt

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

Messages are delayed by several minutes.

Investigation

Messaging Service healthy.

Kafka consumer lag increasing.

Notification Service healthy.

Root Cause

Kafka brokers overloaded due to sudden traffic spike.

Resolution

Scale Kafka brokers.

Increase Messaging Service replicas.

Consumer lag reduced.

Messages delivered normally.

---

# Interview Questions

## Q1. Why Kafka?

Answer

Kafka provides reliable asynchronous message delivery with high throughput.

---

## Q2. Why Redis?

Answer

Redis stores online users, sessions and presence information with extremely low latency.

---

## Q3. Why store media in Amazon S3?

Answer

Media files are large. Object storage is scalable, durable and cost-effective.

---

## Q4. How do you handle offline users?

Answer

Messages are stored in the database and delivered when the user reconnects.

---

## Q5. How will you scale messaging?

Answer

Use Kafka partitions, HPA, Cluster Autoscaler and stateless Messaging Services.

---

# Assignment

Design a WhatsApp-like messaging platform using

- API Gateway
- Authentication Service
- User Service
- Messaging Service
- Group Service
- Media Service
- Notification Service
- Presence Service
- Redis
- Kafka
- PostgreSQL
- Amazon S3

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

Create namespaces

- whatsapp
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
- User
- Messaging
- Group
- Media
- Notification
- Presence

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

Store media files in Amazon S3.

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

- Messages Per Second
- Delivery Latency
- Kafka Lag
- API Latency
- CPU
- Memory

---

## Step 7 - Security

Configure

- RBAC
- Vault
- TLS
- NetworkPolicies
- Kyverno
- OPA

---

## Step 8 - Autoscaling

Configure

- HPA
- Cluster Autoscaler

Scale

- Messaging Service
- Notification Service
- Presence Service

Based on

- CPU
- Memory
- Messages Per Second

---

## Step 9 - Disaster Recovery

Install Velero.

Backup cluster daily.

Store backups in Amazon S3.

Perform restore testing monthly.

---

## Final Architecture

Mobile App

↓

AWS ALB

↓

NGINX Ingress

↓

API Gateway

↓

Authentication

↓

User

↓

Messaging

↓

Group

↓

Media

↓

Notification

↓

Presence

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

✔ Kafka Cluster

✔ Redis Cache

✔ HPA

✔ Cluster Autoscaler

✔ GitOps

✔ Monitoring

✔ Vault

✔ Daily Backup

✔ Disaster Recovery

---

## Interview Answer

"I would build the messaging platform on AWS EKS using stateless microservices. Kafka would process messaging events, Redis would manage user presence and sessions, PostgreSQL would store chat metadata, Amazon S3 would store media files, GitHub Actions would automate CI, Argo CD would perform GitOps deployments and Prometheus, Grafana, Loki and Tempo would provide observability. High availability would be ensured using Multi-AZ deployment, HPA, Cluster Autoscaler and Velero backups."

---

## Common Mistakes

❌ Store media inside PostgreSQL

❌ No Kafka

❌ No Redis

❌ Single Replica

❌ No Monitoring

❌ No Autoscaling

❌ No Disaster Recovery

❌ No Rollback Strategy

