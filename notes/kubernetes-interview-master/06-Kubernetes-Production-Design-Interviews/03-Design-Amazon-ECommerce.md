# Kubernetes Interview Master Handbook

# Chapter 03 - Design Amazon E-Commerce Platform

---

# Objective

Design a production-grade Amazon-like E-Commerce platform capable of handling millions of users and orders.

---

# Interview Scenario

Design an e-commerce platform where customers can browse products, place orders, make payments and track deliveries with high availability.

---

# Functional Requirements

- User Registration
- Login
- Product Catalog
- Product Search
- Shopping Cart
- Wishlist
- Order Placement
- Payment
- Inventory Management
- Shipment Tracking
- Notifications
- Reviews & Ratings

---

# Non-Functional Requirements

- 99.99% Availability
- High Scalability
- Low Latency
- Secure Payments
- Disaster Recovery
- Fault Tolerance
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

Redis

Kafka

PostgreSQL

Elasticsearch

Prometheus

Grafana

Loki

Tempo

Vault

Velero

---

# High Level Architecture

Users

↓

CloudFront

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

Product Service

↓

Cart Service

↓

Order Service

↓

Payment Service

↓

Inventory Service

↓

Shipment Service

↓

Notification Service

↓

Redis

↓

Kafka

↓

PostgreSQL

↓

Elasticsearch

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

HPA

↓

Cluster Autoscaler

---

# Order Flow

Customer Login

↓

Browse Products

↓

Search Product

↓

Add to Cart

↓

Checkout

↓

Payment

↓

Order Created

↓

Inventory Updated

↓

Notification Sent

↓

Shipment Started

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

NetworkPolicies

Vault

TLS

Kyverno

OPA

Signed Images

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

Customers are unable to place orders.

Investigation

Product Service is healthy.

Payment Service is healthy.

Kafka consumer lag is increasing.

Inventory Service is not processing events.

Root Cause

Kafka consumer crashed due to Out Of Memory.

Resolution

Increase memory limit.

Restart consumer.

Increase HPA replicas.

Consumer lag cleared.

Orders resumed successfully.

---

# Interview Questions

## Q1. Why use Redis?

Answer

Redis stores sessions, carts and frequently accessed product information to reduce database load.

---

## Q2. Why Elasticsearch?

Answer

Elasticsearch provides fast full-text product search and filtering.

---

## Q3. Why Kafka?

Answer

Kafka processes asynchronous events like inventory updates, notifications and shipment events.

---

## Q4. How will you avoid inventory mismatch?

Answer

Inventory should be updated through transactional processing with Kafka events and database consistency checks.

---

## Q5. How will you scale during a sale?

Answer

Use HPA, Cluster Autoscaler, CDN caching, Redis caching and Kafka-based asynchronous processing.

---

# Assignment

Design an Amazon-like E-Commerce Platform using

- API Gateway
- Authentication Service
- Product Service
- Cart Service
- Order Service
- Payment Service
- Inventory Service
- Shipment Service
- Notification Service
- Redis
- Kafka
- PostgreSQL
- Elasticsearch

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

- ingress
- ecommerce
- database
- monitoring

Install

- NGINX Ingress
- Metrics Server
- cert-manager

---

## Step 3 - Deploy Services

Deploy

- API Gateway
- Authentication
- Product
- Cart
- Order
- Payment
- Inventory
- Shipment
- Notification

Each service should include

- Deployment
- Service
- ConfigMap
- Secret
- Resource Limits
- Liveness Probe
- Readiness Probe
- HPA

---

## Step 4 - Database Layer

Deploy

- PostgreSQL HA
- Redis
- Kafka
- Elasticsearch

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

- Order Rate
- Payment Success Rate
- Inventory Status
- CPU
- Memory
- Kafka Lag
- API Latency

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

Scale Product Service and Order Service based on

- CPU
- Memory
- Requests Per Second

---

## Step 9 - Disaster Recovery

Install Velero.

Store backups in Amazon S3.

Schedule daily backups.

Validate restore every month.

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

Product

↓

Cart

↓

Order

↓

Payment

↓

Inventory

↓

Shipment

↓

Notification

↓

Redis

↓

Kafka

↓

PostgreSQL

↓

Elasticsearch

---

## Production Best Practices

✔ Multi-AZ Deployment

✔ Minimum 3 Replicas

✔ HPA

✔ Cluster Autoscaler

✔ Redis Cache

✔ Kafka Event Processing

✔ GitOps

✔ Image Signing

✔ Monitoring

✔ Disaster Recovery

---

## Interview Answer

"I would build the platform on AWS EKS using microservices. Product search would use Elasticsearch, shopping carts would be stored in Redis, asynchronous communication would use Kafka, PostgreSQL HA would store transactional data, GitHub Actions would provide CI, Argo CD would manage GitOps deployments, and Prometheus, Grafana, Loki and Tempo would provide observability. High availability would be achieved using Multi-AZ deployment, HPA, Cluster Autoscaler and Velero backups."

---

## Common Mistakes

❌ Single Database

❌ No Cache

❌ No Event Queue

❌ No Health Probes

❌ No Autoscaling

❌ No Monitoring

❌ No Backup

❌ No Rollback Strategy

