# Kubernetes Interview Master Handbook

# Chapter 07 - Design YouTube Streaming Platform

---

# Objective

Design a production-grade video streaming platform similar to YouTube using Kubernetes.

---

# Interview Scenario

Design a highly scalable platform capable of uploading, processing and streaming millions of videos worldwide.

---

# Functional Requirements

- User Registration
- Login
- Video Upload
- Video Processing
- Video Streaming
- Search Videos
- Like Videos
- Comments
- Subscriptions
- Notifications
- Watch History
- Recommendations

---

# Non-Functional Requirements

- 99.99% Availability
- Low Latency
- Global Video Delivery
- High Scalability
- Disaster Recovery
- Fault Tolerance
- Security

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

Amazon S3

CloudFront

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

CloudFront CDN

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

Video Upload Service

↓

Video Processing Service

↓

Streaming Service

↓

Recommendation Service

↓

Comment Service

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

# Video Upload Flow

User Login

↓

Upload Video

↓

Upload Service

↓

Amazon S3

↓

Kafka Event

↓

Video Processing Service

↓

Generate 240p

↓

Generate 480p

↓

Generate 720p

↓

Generate 1080p

↓

Update Database

↓

Video Available

---

# Video Streaming Flow

User Opens Video

↓

Streaming Service

↓

CloudFront CDN

↓

Amazon S3

↓

Adaptive Bitrate Streaming

↓

Playback

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

Video uploads are successful but videos never become available.

Investigation

Upload Service healthy.

S3 upload successful.

Kafka lag increasing.

Video Processing Service not consuming messages.

Root Cause

Video Processing pods crashed because CPU limits were too low.

Resolution

Increase CPU limits.

Increase HPA replicas.

Restart processing workers.

Video processing resumed.

---

# Interview Questions

## Q1. Why Amazon S3?

Answer

Amazon S3 provides highly durable and scalable object storage for video files.

---

## Q2. Why CloudFront?

Answer

CloudFront caches videos closer to users, reducing latency and bandwidth costs.

---

## Q3. Why Kafka?

Answer

Kafka asynchronously processes upload events, video transcoding and notifications.

---

## Q4. Why separate Upload and Processing Services?

Answer

Uploading and transcoding have different workloads and should scale independently.

---

## Q5. How will you scale video processing?

Answer

Use Kafka consumers, HPA and Cluster Autoscaler to process videos in parallel.

---

# Assignment

Design a YouTube-like streaming platform using

- API Gateway
- Authentication Service
- User Service
- Upload Service
- Video Processing Service
- Streaming Service
- Comment Service
- Recommendation Service
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

Create namespaces

- youtube
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
- Upload
- Video Processing
- Streaming
- Comment
- Recommendation
- Notification

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

Store videos in Amazon S3.

Deliver videos using CloudFront CDN.

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

- Upload Success Rate
- Processing Queue
- Video Processing Time
- Streaming Latency
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

- Upload Service
- Video Processing Service
- Streaming Service

Based on

- CPU
- Memory
- Upload Requests
- Processing Queue Length

---

## Step 9 - Disaster Recovery

Install Velero.

Configure daily backups.

Store backups in Amazon S3.

Test restore every month.

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

User

↓

Upload

↓

Video Processing

↓

Streaming

↓

Comment

↓

Recommendation

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

✔ CloudFront CDN

✔ Kafka Event Processing

✔ HPA

✔ Cluster Autoscaler

✔ GitOps

✔ Monitoring

✔ Vault

✔ Daily Backup

✔ Disaster Recovery

---

## Interview Answer

"I would build the YouTube platform on AWS EKS using microservices. Videos would be uploaded to Amazon S3, Kafka would trigger asynchronous video transcoding, CloudFront would provide global content delivery, Redis would cache metadata, PostgreSQL would store application data, GitHub Actions would automate CI, Argo CD would manage GitOps deployments, and Prometheus, Grafana, Loki and Tempo would provide complete observability. High availability would be achieved through Multi-AZ deployment, HPA, Cluster Autoscaler and Velero backups."

---

## Common Mistakes

❌ Store videos in PostgreSQL

❌ No CDN

❌ No Kafka

❌ Single Replica

❌ No Monitoring

❌ No Autoscaling

❌ No Disaster Recovery

❌ No Rollback Strategy

