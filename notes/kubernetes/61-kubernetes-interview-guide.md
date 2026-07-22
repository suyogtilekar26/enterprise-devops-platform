# Kubernetes Interview Guide (5+ Years DevOps)

# 1. Purpose

The purpose of this document is to prepare a DevOps Engineer for real enterprise Kubernetes interviews.

This is not a beginner interview guide.

This document covers questions typically asked for

- 5+ Years DevOps Engineer
- Senior DevOps Engineer
- Production Support Engineer
- Platform Engineer
- SRE
- Cloud DevOps Engineer

The focus is on production thinking rather than memorizing definitions.

---

# 2. Introduction

Interviewers at the senior level rarely ask,

"What is a Pod?"

Instead, they ask,

- What happens internally?
- How would you troubleshoot?
- What would you do in production?
- Have you handled this before?
- What was the business impact?
- How did you perform RCA?

This document prepares you for those discussions.

---

# 3. Enterprise Usage

In enterprise interviews, Kubernetes questions generally fall into

- Fundamentals
- Architecture
- Production Support
- Troubleshooting
- Networking
- Security
- Storage
- CI/CD
- GitOps
- Monitoring
- Disaster Recovery
- Real Scenarios

---

# 4. Usage in THIS Project

For our Enterprise DevOps Platform, you should be able to explain

```
GitHub

↓

GitHub Actions

↓

Docker

↓

GHCR

↓

Kubernetes

↓

Helm

↓

Argo CD

↓

Monitoring

↓

AWS
```

Every answer should relate back to this project.

---

# 5. Interview Architecture Flow

```
Developer

↓

GitHub

↓

GitHub Actions

↓

Container Registry

↓

Kubernetes

↓

Ingress

↓

Service

↓

Pods

↓

Users
```

You should be able to explain every layer.

---

# 6. Interview Strategy

Always answer in this order

Problem

↓

Architecture

↓

Production Usage

↓

Real Incident

↓

Commands

↓

Root Cause Analysis

↓

Best Practice

This creates a strong senior-level impression.

---

# 7. Daily DevOps Questions

### Q1. What do you check every morning?

Answer

- Cluster Health
- Nodes
- Pods
- Deployments
- Alerts
- Grafana
- Failed Jobs
- Events

---

### Q2. Which kubectl commands do you use daily?

```bash
kubectl get pods -A

kubectl get nodes

kubectl top nodes

kubectl top pods

kubectl get events

kubectl describe pod

kubectl logs

kubectl rollout status
```

---

# 8. Production Questions

### Q1.

Production deployment failed.

What will you check?

Answer

Deployment

↓

ReplicaSet

↓

Pods

↓

Events

↓

Logs

↓

Readiness

↓

Service

↓

Ingress

↓

RCA

---

### Q2.

Pods Running.

Application unavailable.

Answer

Service

↓

Endpoints

↓

Ingress

↓

DNS

↓

Application

---

### Q3.

Pod restarting continuously.

Answer

```bash
kubectl describe pod

kubectl logs --previous

kubectl top pod
```

---

# 9. Security Questions

### Q1.

How do you secure Kubernetes?

Answer

- RBAC
- Network Policies
- Pod Security Standards
- Secret Management
- TLS
- Image Scanning
- Audit Logging
- Least Privilege

---

### Q2.

Why not use cluster-admin?

Because it violates the principle of least privilege.

---

# 10. Troubleshooting Questions

### Q1.

CrashLoopBackOff

Investigation

```bash
kubectl describe pod

kubectl logs
```

---

### Q2.

Pending Pod

Investigation

```bash
kubectl describe pod
```

Check

- CPU
- Memory
- Affinity
- Taints
- PVC

---

### Q3.

ImagePullBackOff

Check

- Image
- Registry
- Credentials
- Network

---

# 11. Real Production Scenarios

## Scenario 1

Deployment successful.

Users receive HTTP 503.

Investigation

Ingress

↓

Service

↓

Endpoints

↓

Readiness

Root Cause

Wrong readiness path.

---

## Scenario 2

Pods healthy.

Database unreachable.

Root Cause

Network Policy blocked traffic.

---

## Scenario 3

OOMKilled

Root Cause

No memory limits.

---

## Scenario 4

Node Not Ready

Investigation

Node

↓

kubelet

↓

Container Runtime

↓

Disk

↓

Memory

---

# 12. Scenario Interview Questions

- Explain a production incident you handled.
- Explain CrashLoopBackOff.
- Explain Pending Pods.
- Explain ImagePullBackOff.
- Explain Kubernetes networking.
- Explain Ingress.
- Explain HPA.
- Explain Resource Limits.
- Explain RBAC.
- Explain Secrets.
- Explain ConfigMaps.

---

# 13. Architecture Interview Questions

### Explain Kubernetes architecture.

### Explain API Server.

### Explain Scheduler.

### Explain Controller Manager.

### Explain kubelet.

### Explain etcd.

### Explain CNI.

### Explain CoreDNS.

### Explain Service Discovery.

### Explain Ingress Flow.

---

# 14. Production Support Interview Questions

### Daily Checks

- Nodes
- Pods
- Deployments
- Alerts
- Monitoring
- Events

---

### Deployment Failure

Investigation

Deployment

↓

ReplicaSet

↓

Pods

↓

Logs

↓

Events

↓

Rollback

---

### High CPU

Investigation

```bash
kubectl top node

kubectl top pod
```

---

### High Restart Count

Investigation

```bash
kubectl logs --previous

kubectl describe pod
```

---

# 15. Related Runbooks

- Cluster Health Check
- Deployment Failure
- CrashLoopBackOff
- ImagePullBackOff
- Pending Pods
- Node Not Ready
- High CPU
- High Memory
- Ingress Failure
- DNS Failure

---

# 16. Common Incidents

- CrashLoopBackOff
- Pending Pods
- Node Failure
- ImagePullBackOff
- OOMKilled
- DNS Failure
- Ingress Failure
- PVC Pending
- High CPU
- High Memory

---

# 17. Commands

```bash
kubectl get pods -A

kubectl get nodes

kubectl describe pod

kubectl logs

kubectl top nodes

kubectl top pods

kubectl get svc

kubectl get ingress

kubectl get events

kubectl rollout status
```

---

# 18. Marathi Quick Revision

- प्रत्येक उत्तर Production च्या दृष्टीने द्या.
- Architecture explain करा.
- Commands सांगा.
- RCA सांगा.
- Best Practices सांगा.
- Real Incident जोडा.

---

# 19. Manager Round Tips

Manager expects

- Ownership
- RCA mindset
- Communication
- Risk Assessment
- Change Management
- Monitoring
- Business Impact
- Team Collaboration

Never answer only with commands.

Always explain impact and decision-making.

---

# 20. Interview Answer Framework

For every Kubernetes question answer in this sequence

```
Definition

↓

Architecture

↓

Production Usage

↓

Commands

↓

Troubleshooting

↓

Real Incident

↓

Best Practice
```

This is the format expected from a Senior DevOps Engineer.

---

# 21. Marathi Summary (5+ Experience Revision)

## Interview Summary

5+ वर्षांच्या Kubernetes Interview मध्ये definitions पेक्षा production experience महत्त्वाचा असतो.

प्रत्येक उत्तरात architecture, troubleshooting, commands, RCA आणि business impact यांचा समावेश करा.

### Production Investigation Flow

```
Problem

↓

Business Impact

↓

Cluster

↓

Nodes

↓

Pods

↓

Events

↓

Logs

↓

Root Cause

↓

Resolution

↓

Prevention
```

### Production Story

एका Manager Round मध्ये प्रश्न होता: "Deployment successful आहे पण users ना 503 error येतो, काय कराल?" चांगले उत्तर देणाऱ्या उमेदवाराने फक्त `kubectl logs` सांगितले नाही. त्याने Ingress → Service → Endpoints → Readiness → Logs → RCA हा पूर्ण investigation flow समजावून सांगितला आणि business impact, rollback plan आणि monitoring verification देखील सांगितले. हेच Senior DevOps Engineer चे उत्तर मानले जाते.

### 5+ Years Memory Trick

जर interviewer कोणताही Kubernetes production scenario विचारला तर हा क्रम लक्षात ठेवा:

**Architecture → Investigation → Commands → Root Cause → Resolution → Prevention**

हा framework जवळजवळ प्रत्येक Senior Kubernetes Interview मध्ये लागू होतो.

