# Kubernetes Interview Master Handbook

# Chapter 05 - Design Uber Backend

---

# Objective

Design a production-grade ride-hailing platform similar to Uber using Kubernetes.

---

# Interview Scenario

Design a highly available backend capable of handling millions of ride requests, live driver tracking and real-time notifications.

---

# Functional Requirements

- User Registration
- Driver Registration
- Login
- Live Location Tracking
- Ride Booking
- Driver Matching
- Ride Acceptance
- Trip Tracking
- Fare Calculation
- Payment
- Notifications
- Ride History

---

# Non-Functional Requirements

- 99.99% Availability
- Low Latency
- Real-Time Processing
- High Scalability
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

Redis

Kafka

PostgreSQL

Prometheus

Grafana

Loki

Tempo

Vault

Velero

---

# High Level Architecture

Passenger App

↓

Driver App

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

Driver Service

↓

Ride Service

↓

Location Service

↓

Matching Service

↓

Payment Service

↓

Notification Service

↓

Redis

↓

Kafka

↓

PostgreSQL

---

# Ride Booking Flow

Passenger Login

↓

Request Ride

↓

Ride Service

↓

Matching Service

↓

Nearest Driver

↓

Driver Accepts Ride

↓

Trip Starts

↓

Trip Ends

↓

Payment

↓

Notification

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

ConfigMaps

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

Passengers cannot find nearby drivers.

Investigation

Ride Service healthy.

Driver Service healthy.

Location Service latency increased.

Redis response time became very high.

Root Cause

Redis memory exhausted.

Resolution

Increase Redis memory.

Scale Redis cluster.

Restart affected pods.

Verify ride matching.

---

# Interview Questions

## Q1. Why Redis?

Answer

Redis stores driver locations and active ride sessions with extremely low latency.

---

## Q2. Why Kafka?

Answer

Kafka processes ride events, driver status updates and notifications asynchronously.

---

## Q3. Why separate Ride Service and Matching Service?

Answer

Ride booking and driver matching have different workloads and can scale independently.

---

## Q4. How will you reduce ride matching latency?

Answer

Use Redis for live locations, optimize matching algorithms and autoscale matching services.

---

## Q5. How will you ensure high availability?

Answer

Deploy across Multi-AZ, use multiple replicas, HPA, Cluster Autoscaler, monitoring and disaster recovery.

---

# Assignment

Design an Uber-like platform using

- API Gateway
- Authentication Service
- User Service
- Driver Service
- Ride Service
- Location Service
- Matching Service
- Payment Service
- Notification Service
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

- uber
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
- Driver
- Ride
- Location
- Matching
- Payment
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

- PostgreSQL
- Redis
- Kafka

Use

- Redis for driver locations
- Kafka for ride events

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

- Ride Requests
- Driver Availability
- Ride Matching Latency
- API Latency
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

---

## Step 8 - Autoscaling

Configure

- HPA
- Cluster Autoscaler

Scale

- Ride Service
- Matching Service
- Location Service

Based on

- CPU
- Memory
- Ride Requests Per Second

---

## Step 9 - Disaster Recovery

Install Velero.

Configure scheduled backups.

Store backups in Amazon S3.

Validate restore process monthly.

---

## Final Architecture

Passenger App

↓

Driver App

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

Driver

↓

Ride

↓

Location

↓

Matching

↓

Payment

↓

Notification

↓

Redis

↓

Kafka

↓

PostgreSQL

---

## Production Best Practices

✔ Multi-AZ Deployment

✔ Redis Cluster

✔ Kafka Event Processing

✔ HPA

✔ Cluster Autoscaler

✔ GitOps

✔ Monitoring

✔ Vault

✔ Daily Backups

✔ Disaster Recovery

---

## Interview Answer

"I would build the Uber backend on AWS EKS using microservices. Redis would store live driver locations, Kafka would process ride events asynchronously, PostgreSQL would store transactional ride data, GitHub Actions would automate CI, Argo CD would perform GitOps deployments, and Prometheus, Grafana, Loki and Tempo would provide complete observability. High availability would be achieved through Multi-AZ deployment, HPA, Cluster Autoscaler and Velero backups."

---

## Common Mistakes

❌ Store live locations in PostgreSQL

❌ No Redis Cache

❌ No Event Queue

❌ Single Replica

❌ No Monitoring

❌ No Autoscaling

❌ No Disaster Recovery

❌ No Rollback Strategy

