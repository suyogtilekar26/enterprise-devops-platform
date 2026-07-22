# Kubernetes Debugging

# 1. Purpose

The purpose of this document is to understand how to systematically debug Kubernetes production issues.

A Senior DevOps Engineer should never guess the problem.

Production debugging always follows a structured investigation process.

This document explains the real investigation flow used in enterprise production environments.

---

# 2. Introduction

One of the biggest mistakes beginners make is immediately checking application logs.

In production, debugging starts from the Kubernetes infrastructure layer and gradually moves toward the application layer.

Never assume the application is at fault.

Always verify the infrastructure first.

---

# 3. Enterprise Usage

Production teams use Kubernetes debugging during

- Application Down
- API Failure
- Deployment Failure
- Release Validation
- High CPU
- High Memory
- Node Failure
- Storage Failure
- Network Issues
- Incident Response

Every Sev-1 and Sev-2 incident starts with Kubernetes debugging.

---

# 4. Usage in THIS Project

During our Enterprise DevOps Platform deployment, Kubernetes debugging will be used for

- Frontend unavailable
- API Gateway failure
- Auth Service failure
- Dashboard failure
- Ingress issues
- Service connectivity
- ConfigMap mistakes
- Secret issues
- PVC failures
- Readiness/Liveness failures

---

# 5. Debugging Architecture

```
User

↓

Ingress

↓

Service

↓

Endpoints

↓

Pod

↓

Container

↓

Application

↓

Database

↓

External Services
```

Never jump directly to the database.

Always investigate layer by layer.

---

# 6. Internal Debugging Workflow

Alert

↓

Understand Business Impact

↓

Check Cluster

↓

Check Nodes

↓

Check Pods

↓

Check Events

↓

Describe Resource

↓

Check Logs

↓

Exec into Container

↓

Network Testing

↓

Configuration Validation

↓

Root Cause Analysis

↓

Resolution

↓

Verification

↓

Monitoring

---

# 7. Daily DevOps Activities

Daily production checks include

```bash
kubectl get nodes

kubectl get pods -A

kubectl get deployments

kubectl get svc

kubectl get ingress

kubectl get events -A
```

Verify

- Running Pods
- Ready Pods
- Failed Pods
- Restart Count
- Pending Pods
- Failed Rollouts

---

# 8. Production Best Practices

Always investigate in this order

1. Cluster

2. Nodes

3. Namespaces

4. Deployments

5. ReplicaSets

6. Pods

7. Events

8. Logs

9. Exec

10. Application

Never restart resources before identifying the root cause.

Avoid deleting Pods without understanding why they failed.

---

# 9. Security

During debugging

- Do not expose Secrets
- Do not modify production manifests directly
- Avoid using cluster-admin unless required
- Never disable RBAC
- Record all production changes

---

# 10. Troubleshooting Flow

## Step 1

Cluster

```bash
kubectl cluster-info
```

---

## Step 2

Nodes

```bash
kubectl get nodes

kubectl describe node <node-name>
```

---

## Step 3

Pods

```bash
kubectl get pods -A
```

---

## Step 4

Events

```bash
kubectl get events -A --sort-by=.metadata.creationTimestamp
```

---

## Step 5

Describe

```bash
kubectl describe pod <pod-name>
```

---

## Step 6

Logs

```bash
kubectl logs <pod-name>

kubectl logs -f <pod-name>

kubectl logs <pod-name> --previous
```

---

## Step 7

Shell Access

```bash
kubectl exec -it <pod-name> -- sh
```

---

## Step 8

Networking

```bash
nslookup

ping

curl

wget
```

---

## Step 9

Resources

```bash
kubectl top pods

kubectl top nodes
```

---

## Step 10

Application

Application logs

Database

External APIs

Configuration

---

# 11. Real Production Scenarios

## Scenario 1

CrashLoopBackOff

Investigation

```bash
kubectl get pods

kubectl describe pod

kubectl logs
```

Root Cause

Application startup failure.

---

## Scenario 2

ImagePullBackOff

Investigation

```bash
kubectl describe pod
```

Root Cause

Wrong image tag.

---

## Scenario 3

Pending Pod

Investigation

```bash
kubectl describe pod
```

Root Cause

Insufficient CPU.

---

## Scenario 4

OOMKilled

Investigation

```bash
kubectl describe pod

kubectl top pod
```

Root Cause

Memory limit exceeded.

---

## Scenario 5

Application Not Reachable

Investigation

```bash
kubectl get svc

kubectl get endpoints

kubectl get ingress
```

Root Cause

Service selector mismatch.

---

## Scenario 6

DNS Failure

Investigation

```bash
kubectl exec -it <pod> -- nslookup auth-service
```

Root Cause

CoreDNS issue.

---

# 12. Scenario Interview Q&A

### Q1. Your production application is down. What is your investigation order?

Answer

Cluster

↓

Nodes

↓

Pods

↓

Events

↓

Describe

↓

Logs

↓

Exec

↓

Networking

↓

Application

↓

RCA

---

### Q2. Why check Events before Logs?

Events often reveal scheduling, image, probe and volume issues before application logs.

---

### Q3. Why shouldn't you restart Pods immediately?

Restarting may temporarily hide the actual root cause.

---

# 13. Architecture Interview Q&A

### Q1. Which Kubernetes component helps first during debugging?

API Server

because every cluster state is queried through it.

---

### Q2. Which command gives the most useful debugging information?

```bash
kubectl describe pod
```

It combines

- Events
- Scheduling
- Probes
- Volumes
- Images
- Conditions

---

# 14. Production Support Interview Q&A

### Q1. User reports HTTP 503.

Investigation

```bash
kubectl get ingress

kubectl get svc

kubectl get endpoints

kubectl get pods

kubectl logs
```

---

### Q2. Pod restarted 45 times.

Investigation

```bash
kubectl describe pod

kubectl logs --previous
```

---

### Q3. Deployment succeeded but users still cannot access application.

Verify

- Readiness Probe
- Service
- Endpoints
- Ingress
- DNS

---

# 15. Related Runbooks

- Pod CrashLoopBackOff
- ImagePullBackOff
- Pending Pods
- OOMKilled
- DNS Failure
- Service Unreachable
- Ingress Failure
- PVC Pending

---

# 16. Common Incidents

- CrashLoopBackOff
- ImagePullBackOff
- Pending Pods
- OOMKilled
- Failed Scheduling
- Node Not Ready
- DNS Failure
- Readiness Failure
- Liveness Failure
- High Restart Count

---

# 17. Important Commands

```bash
kubectl get pods -A

kubectl describe pod

kubectl logs

kubectl logs --previous

kubectl exec

kubectl top pods

kubectl top nodes

kubectl get events -A

kubectl get svc

kubectl get endpoints

kubectl get ingress
```

---

# 18. Marathi Quick Revision

- Debugging नेहमी Infrastructure पासून सुरू करा.
- Events आधी पाहा.
- Describe हा सर्वात महत्त्वाचा command आहे.
- Logs नंतर तपासा.
- Exec वापरून container verify करा.
- RCA न करता Pod restart करू नका.

---

# 19. Enterprise Debugging Checklist

```
Cluster Healthy?

↓

Nodes Ready?

↓

Deployment Healthy?

↓

Pods Running?

↓

Events Normal?

↓

Describe Pod

↓

Logs

↓

Exec

↓

Networking

↓

Application

↓

Database

↓

External Dependency

↓

Root Cause

↓

Fix

↓

Verify
```

---

# 20. Production Investigation Order

```
Alert

↓

Impact Analysis

↓

kubectl get nodes

↓

kubectl get pods

↓

kubectl get events

↓

kubectl describe pod

↓

kubectl logs

↓

kubectl exec

↓

Service

↓

Ingress

↓

Application

↓

RCA

↓

Resolution

↓

Monitoring
```

---

# 21. Marathi Summary (5+ Experience Revision)

## Interview Summary

Production debugging म्हणजे command चालवणे नाही; योग्य क्रमाने investigation करणे.

Senior DevOps Engineer infrastructure, networking, deployment आणि application हे सर्व स्तर तपासतो आणि शेवटी Root Cause निश्चित करतो.

### Production Investigation Flow

```
Alert

↓

Nodes

↓

Pods

↓

Events

↓

Describe

↓

Logs

↓

Exec

↓

Network

↓

Application

↓

RCA
```

### Production Story

एका release नंतर Frontend 503 error देत होता. सुरुवातीला application team ने code issue असल्याचे सांगितले. Investigation मध्ये Pods Running होते, पण `kubectl get endpoints` मध्ये endpoints रिकामे होते. `kubectl describe pod` मध्ये Readiness Probe सतत fail होत असल्याचे दिसले. Probe path चुकीचा configure झाला होता. Configuration दुरुस्त करून rollout restart केल्यानंतर traffic पुन्हा सुरू झाले. Application code मध्ये कोणतीही समस्या नव्हती.

### 5+ Years Memory Trick

जर interviewer विचारेल,

**"Production Kubernetes issue कसा debug कराल?"**

उत्तर:

"मी कधीही थेट logs पासून सुरुवात करत नाही. प्रथम Cluster, Nodes, Pods, Events, Describe, Logs, Exec, Networking, Services, Ingress आणि शेवटी Application तपासतो. हा structured investigation approach production मध्ये चुकीचे assumptions टाळतो आणि Root Cause लवकर शोधण्यास मदत करतो."

