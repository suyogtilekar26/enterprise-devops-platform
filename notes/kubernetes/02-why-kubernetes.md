# Why Kubernetes?

# 1. Purpose

The purpose of this document is to understand why Kubernetes was created, what limitations existed before Kubernetes, and why almost every modern enterprise uses Kubernetes for deploying and managing containerized applications.

This document explains the business need, technical need, and production need for Kubernetes.

---

# 2. Introduction

Docker revolutionized application deployment by packaging applications and their dependencies into containers.

Docker Compose made it easier to run multiple containers on a single machine.

However, enterprise environments require much more than simply running containers.

Organizations require

- High Availability
- Zero Downtime Deployment
- Automatic Recovery
- Horizontal Scaling
- Service Discovery
- Secret Management
- Multi-Node Deployment
- Disaster Recovery

Docker alone cannot provide all these enterprise capabilities.

Kubernetes was created to solve these operational challenges.

---

# 3. Enterprise Usage

Before Kubernetes

Large organizations managed hundreds or thousands of Docker containers manually.

Common challenges included

- Containers crashing
- Manual restarts
- Downtime during deployments
- Difficult scaling
- Server failures
- Network management
- Service communication

After Kubernetes adoption

Organizations gained

- High Availability
- Self-Healing
- Rolling Updates
- Auto Scaling
- Better Resource Utilization
- Centralized Management
- Production Stability

---

# 4. Usage in THIS Project

Current Deployment

```
Docker Compose

↓

Frontend

↓

API Gateway

↓

Auth Service

↓

Dashboard Service
```

Future Deployment

```
Kind Cluster

↓

Pods

↓

Services

↓

Ingress

↓

Monitoring
```

Eventually

```
AWS EKS

↓

Helm

↓

Argo CD

↓

Terraform
```

---

# 5. Architecture

Without Kubernetes

```
Docker

↓

Containers

↓

Single Machine
```

With Kubernetes

```
Cluster

↓

Control Plane

↓

Worker Nodes

↓

Pods

↓

Services

↓

Users
```

---

# 6. Internal Workflow

Developer Push

↓

CI/CD

↓

Docker Image

↓

Container Registry

↓

Kubernetes Deployment

↓

Scheduler

↓

Worker Node

↓

Pod Running

↓

Service Available

---

# 7. Why Companies Choose Kubernetes

Major reasons

- Container Orchestration
- Automatic Scheduling
- Self-Healing
- Auto Scaling
- Load Balancing
- Service Discovery
- Rolling Updates
- Rollbacks
- High Availability
- Secret Management
- Storage Management

---

# 8. Production Best Practices

- Design applications for Kubernetes.
- Keep applications stateless whenever possible.
- Use Deployments instead of standalone Pods.
- Configure Resource Requests and Limits.
- Enable Health Probes.
- Use Namespaces.
- Secure Secrets.
- Follow GitOps.

---

# 9. Security

Production Kubernetes provides

- RBAC
- Service Accounts
- Secrets
- Network Policies
- TLS
- Image Scanning

Security becomes easier to standardize compared to manually managed Docker hosts.

---

# 10. Troubleshooting

Useful Commands

```bash
kubectl cluster-info

kubectl get nodes

kubectl get pods -A

kubectl get deployments -A

kubectl get services -A
```

---

# 11. Real Production Scenarios

## Scenario 1

A Worker Node suddenly crashes.

Docker

Containers become unavailable.

Kubernetes

Pods automatically move to another healthy Worker Node.

---

## Scenario 2

Traffic suddenly becomes five times higher.

Docker

Manual scaling required.

Kubernetes

Horizontal Pod Autoscaler creates additional Pods automatically.

---

## Scenario 3

A deployment contains a faulty image.

Docker

Manual rollback required.

Kubernetes

Rolling rollback restores the previous stable version.

---

# 12. Scenario Interview Q&A

## Q1. Why was Kubernetes created?

Answer

Kubernetes was created to automate the deployment, scaling, networking, and management of containerized applications running across multiple servers.

---

## Q2. Why isn't Docker enough?

Answer

Docker is a container runtime.

It can create and run containers.

However, Docker does not provide enterprise features like

- Multi-node orchestration
- Auto Scaling
- Self-Healing
- Rolling Updates
- Service Discovery
- High Availability

Kubernetes provides all these capabilities.

---

## Q3. What problem does Kubernetes solve?

Answer

Kubernetes eliminates manual operational work by automatically managing containers and maintaining the desired application state.

---

## Q4. What is Self-Healing?

Answer

If a Pod crashes or a Node fails, Kubernetes automatically recreates Pods to maintain the desired state without manual intervention.

---

## Q5. What is High Availability?

Answer

High Availability means applications remain accessible even if servers or Pods fail because Kubernetes automatically schedules workloads on healthy nodes.

---

# 13. Architecture Interview Q&A

## Q1. Explain Docker vs Kubernetes.

Answer

Docker is responsible for building and running containers.

Kubernetes is responsible for managing containers across multiple servers.

---

## Q2. Explain why enterprises migrate from Docker Compose to Kubernetes.

Answer

Docker Compose works only on one host.

Enterprise applications require

- High Availability
- Multi-node deployment
- Auto Scaling
- Self-Healing
- Rolling Updates

These capabilities are provided by Kubernetes.

---

# 14. Production Support Interview Q&A

## Q1. A production application is unavailable after a server crash. What happens in Kubernetes?

Answer

Kubernetes detects that the Node is unhealthy.

The Scheduler creates replacement Pods on healthy Worker Nodes.

Traffic is automatically redirected using Services.

---

## Q2. Why do companies invest in Kubernetes?

Answer

Because Kubernetes reduces downtime, improves reliability, automates operations, and simplifies large-scale application management.

---

# 15. Related Runbooks

Future Runbooks

- Worker Node Not Ready
- CrashLoopBackOff
- ImagePullBackOff
- Failed Deployment
- Pending Pods

---

# 16. Common Incidents

- Node Failure
- Pod Crash
- Failed Deployment
- ImagePullBackOff
- OOMKilled
- Pending Pods

---

# 17. Commands

```bash
kubectl cluster-info

kubectl get nodes

kubectl get pods -A

kubectl get deployments -A

kubectl get svc -A
```

---

# 18. Marathi Quick Revision

Docker म्हणजे container run करतो.

Docker Compose म्हणजे एका machine वर multiple containers चालवतो.

Kubernetes म्हणजे अनेक servers वर enterprise applications manage करणारा orchestration platform आहे.

---

# 19. Common Mistakes

- Docker आणि Kubernetes एकच आहेत असे समजणे.
- Kubernetes Docker ची replacement आहे असे म्हणणे.
- Self-Healing म्हणजे Pod restart एवढंच समजणे.
- High Availability फक्त multiple Pods असल्यामुळे मिळते असे समजणे.

---

# 20. Best Practices & Key Takeaways

- Learn Why before How.
- Understand the business problem Kubernetes solves.
- Think beyond commands.
- Focus on production architecture.
- Understand desired state management.

---

# 21. Marathi Summary (5+ Experience Revision)

## Interview Summary

जर Interviewer विचारेल

"Why Kubernetes?"

उत्तर

"Kubernetes was introduced to solve enterprise challenges such as multi-node container orchestration, self-healing, high availability, rolling updates, auto scaling, service discovery, and automated lifecycle management of containerized applications."

---

## Production Investigation Flow

```
Alert

↓

Check Cluster

↓

Check Nodes

↓

Check Pods

↓

Check Events

↓

Check Logs

↓

Find Root Cause

↓

Resolve

↓

Verify
```

---

## Production Story

एका FinTech कंपनीमध्ये Docker Compose वर 40 पेक्षा जास्त microservices चालत होत्या.

एका physical server मध्ये hardware failure झाल्यानंतर सर्व applications down झाल्या.

Migration to Kubernetes नंतर प्रत्येक application अनेक Worker Nodes वर deploy झाली.

Node failure झाल्यानंतर Kubernetes ने नवीन Pods दुसऱ्या Node वर सुरू केले आणि business ला downtime जाणवला नाही.

---

## 5+ Years Memory Trick

Remember

Docker

↓

Run Containers

Docker Compose

↓

Run Multiple Containers

Kubernetes

↓

Run Enterprise Production Platforms

