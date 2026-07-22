# Kubernetes Architecture Flow

# 1. Purpose

The purpose of this document is to understand the complete end-to-end request flow inside a Kubernetes cluster.

Most engineers know Kubernetes components individually.

A Senior DevOps Engineer understands how every component works together from the moment a deployment is created until traffic reaches the application.

This topic is one of the most frequently asked questions in

- Senior DevOps Interviews
- Architect Interviews
- Production Support Interviews

---

# 2. Introduction

Whenever we execute

```bash
kubectl apply -f deployment.yaml
```

many Kubernetes components work together.

Instead of thinking about Pods only, understand the complete lifecycle.

```
kubectl

↓

API Server

↓

etcd

↓

Scheduler

↓

Worker Node

↓

kubelet

↓

Container Runtime

↓

Pod

↓

Service

↓

Ingress

↓

User
```

---

# 3. Enterprise Usage

Every production deployment follows this architecture.

Examples

- Amazon EKS
- Azure AKS
- Google GKE
- OpenShift
- Rancher

Although cloud providers differ, the request flow remains the same.

---

# 4. Usage in THIS Project

Deployment Flow

```
GitHub

↓

GitHub Actions

↓

Docker Build

↓

GHCR

↓

kubectl apply

↓

API Server

↓

Scheduler

↓

Worker Node

↓

Frontend Pod

↓

API Gateway Pod

↓

Auth Pod

↓

Dashboard Pod

↓

Service

↓

Ingress

↓

Users
```

---

# 5. Complete Kubernetes Request Flow

```
Developer

↓

GitHub

↓

GitHub Actions

↓

Docker Build

↓

GHCR

↓

kubectl apply

↓

API Server

↓

Authentication

↓

Authorization

↓

Validation

↓

etcd

↓

Scheduler

↓

Worker Node

↓

kubelet

↓

Container Runtime

↓

Image Pull

↓

Container Creation

↓

Pod Running

↓

Readiness Probe

↓

Service

↓

CoreDNS

↓

Ingress Controller

↓

Load Balancer

↓

Users
```

---

# 6. Internal Workflow

Developer applies Deployment

↓

kubectl sends REST API request

↓

API Server authenticates request

↓

RBAC authorization

↓

Manifest validation

↓

Desired state stored in etcd

↓

Scheduler selects Worker Node

↓

kubelet receives Pod specification

↓

Container Runtime pulls image

↓

Container starts

↓

Readiness Probe succeeds

↓

Endpoints updated

↓

Service begins routing traffic

↓

Ingress exposes application

↓

Users access application

↓

Controller Manager continuously monitors desired state

---

# 7. Component Responsibilities

## kubectl

- Sends REST API requests
- Reads kubeconfig
- Authenticates user

---

## API Server

- Entry point
- Authentication
- Authorization
- Validation

---

## etcd

Stores

- Deployments
- Services
- Secrets
- ConfigMaps
- Cluster State

---

## Scheduler

Decides

```
Which Worker Node?
```

based on

- CPU
- Memory
- Labels
- Affinity
- Taints

---

## kubelet

- Creates Pods
- Monitors Pods
- Reports status

---

## Container Runtime

- Pull image
- Create container
- Start container

---

## Service

Provides stable networking.

Pods may change.

Service IP remains stable.

---

## CoreDNS

Resolves

```
service-name.namespace.svc.cluster.local
```

---

## Ingress

Routes external HTTP/HTTPS traffic.

---

## Controller Manager

Continuously compares

Desired State

vs

Current State

Automatically restores missing Pods.

---

# 8. Daily DevOps Activities

- Verify deployment flow
- Check rollout
- Review events
- Monitor scheduler
- Verify Service endpoints
- Test DNS
- Check Ingress
- Monitor Controller activity

---

# 9. Production Best Practices

- Keep manifests declarative.
- Monitor every deployment.
- Verify rollout before release.
- Never bypass API Server.
- Use readiness probes.
- Use liveness probes.
- Keep images immutable.
- Validate deployments in lower environments first.

---

# 10. Security

Every request passes through

Authentication

↓

Authorization

↓

Admission Controllers

↓

API Server

↓

etcd

Best Practices

- RBAC
- TLS
- Secret Encryption
- Audit Logging
- Least Privilege

---

# 11. Troubleshooting

Cluster

```bash
kubectl cluster-info
```

Deployments

```bash
kubectl get deployments
```

Pods

```bash
kubectl get pods -o wide
```

Events

```bash
kubectl get events -A
```

Endpoints

```bash
kubectl get endpoints
```

Ingress

```bash
kubectl get ingress
```

Logs

```bash
kubectl logs <pod-name>
```

---

# 12. Real Production Scenarios

## Scenario 1

Pods created.

Application unavailable.

Investigation

```bash
kubectl get endpoints

kubectl describe svc
```

Root Cause

Service selector mismatch.

---

## Scenario 2

Pods remain Pending.

Investigation

```bash
kubectl describe pod
```

Root Cause

Scheduler unable to find available node.

---

## Scenario 3

Pods Running.

Users receive 404.

Investigation

```bash
kubectl describe ingress
```

Root Cause

Incorrect Ingress path.

---

## Scenario 4

Deployment successful.

Traffic never reaches application.

Investigation

```bash
kubectl get svc

kubectl get endpoints
```

Root Cause

Readiness Probe failing.

Endpoints never created.

---

# 13. Scenario Interview Q&A

**Q1. Explain Kubernetes Architecture Flow.**

Answer

```
kubectl

↓

API Server

↓

etcd

↓

Scheduler

↓

Worker Node

↓

kubelet

↓

Container Runtime

↓

Pod

↓

Service

↓

Ingress

↓

User
```

---

**Q2. Which component actually starts containers?**

Container Runtime.

---

**Q3. Which component decides the Worker Node?**

Scheduler.

---

# 14. Architecture Interview Q&A

**Q1. Why doesn't kubectl communicate directly with Pods?**

Because API Server is the single control point for all Kubernetes operations.

---

**Q2. Why is Service required if Pods already have IP addresses?**

Pod IPs are temporary.

Services provide a stable virtual IP and service discovery.

---

# 15. Production Support Interview Q&A

**Q1. Pods are Running but application is unavailable. Investigation order?**

1.

```bash
kubectl get pods
```

2.

```bash
kubectl get svc
```

3.

```bash
kubectl get endpoints
```

4.

```bash
kubectl get ingress
```

5.

Readiness Probe

6.

Logs

7.

RCA

---

**Q2. Users receive HTTP 502. Which layers do you verify?**

- Ingress
- Service
- Endpoints
- Pods
- Readiness
- Application Logs

---

# 16. Related Runbooks

- kubernetes-service-unreachable.md
- kubernetes-ingress-failure.md
- kubernetes-pod-pending.md
- kubernetes-readiness-probe-failure.md

---

# 17. Common Incidents

- Scheduler Failure
- Service Selector Mismatch
- Endpoint Missing
- DNS Failure
- Ingress Misconfiguration
- Readiness Probe Failure
- ImagePullBackOff
- CrashLoopBackOff

---

# 18. Commands

```bash
kubectl get deployments
kubectl get pods -o wide
kubectl get svc
kubectl get endpoints
kubectl get ingress
kubectl get events -A
kubectl describe pod
kubectl describe svc
kubectl describe ingress
kubectl logs <pod-name>
```

---

# 19. Production Request Flow

```
Developer

↓

kubectl

↓

API Server

↓

etcd

↓

Scheduler

↓

Worker Node

↓

kubelet

↓

Container Runtime

↓

Pod

↓

Readiness

↓

Service

↓

CoreDNS

↓

Ingress

↓

Load Balancer

↓

Users
```

---

# 20. Marathi Quick Revision

- kubectl API Server शी बोलतो.
- API Server request validate करून etcd मध्ये state साठवतो.
- Scheduler योग्य Worker Node निवडतो.
- kubelet Pod तयार करतो.
- Service stable networking देते.
- Ingress बाहेरील traffic route करतो.

---

# 21. Marathi Summary (5+ Experience Revision)

## Interview Summary

Kubernetes Architecture Flow म्हणजे request cluster मध्ये कशी प्रवास करते हे समजणे.

Senior DevOps Engineer प्रत्येक component वेगळा न पाहता संपूर्ण end-to-end flow समजावून सांगू शकला पाहिजे.

### Production Investigation Flow

```
User Issue

↓

Ingress

↓

Service

↓

Endpoints

↓

Pods

↓

Scheduler

↓

API Server

↓

Events

↓

Logs

↓

Root Cause Analysis
```

### Production Story

Production मध्ये deployment successful झाला, Pods Running होते, पण users ना application access होत नव्हती.

`kubectl get endpoints` मध्ये Service साठी कोणतेही endpoints तयार झाले नव्हते.

`kubectl describe pod` मध्ये Readiness Probe सतत fail होत असल्याचे दिसले.

Readiness Probe URL चुकीचा configure झाला होता.

URL दुरुस्त करून rollout केल्यानंतर endpoints तयार झाले आणि traffic पुन्हा application पर्यंत पोहोचू लागला.

### 5+ Years Memory Trick

जर interviewer विचारेल,

**"Kubernetes मध्ये request end-to-end कशी जाते?"**

उत्तर:

"kubectl API Server ला request पाठवतो. API Server authentication, authorization आणि validation करून desired state etcd मध्ये store करतो. Scheduler योग्य Worker Node निवडतो. kubelet Container Runtime मार्फत Pod तयार करतो. Readiness Probe यशस्वी झाल्यावर Service endpoints update होतात. CoreDNS service discovery देते, Ingress traffic route करतो आणि शेवटी user application पर्यंत पोहोचतो."

