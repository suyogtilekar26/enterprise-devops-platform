# Kubernetes LoadBalancer Service

# 1. Purpose

The purpose of a LoadBalancer Service is to expose an application to external users using a Cloud Provider Load Balancer.

LoadBalancer is the most common Service type used for Production applications running on cloud platforms.

Examples

- AWS EKS
- Azure AKS
- Google GKE

Instead of accessing Worker Node IPs, users access the Cloud Load Balancer.

---

# 2. Introduction

In Cloud environments,

Kubernetes can automatically create an external Load Balancer.

Example

```
Internet

↓

AWS Load Balancer

↓

Kubernetes Service

↓

Pods
```

The Cloud Provider manages

- Public IP
- Health Checks
- Traffic Distribution

---

# 3. Enterprise Usage

Production companies use LoadBalancer for

- Web Applications
- REST APIs
- Customer Portals
- Mobile Backend APIs
- Payment Services

Real Examples

- Amazon
- Netflix
- Microsoft
- Flipkart
- Swiggy

LoadBalancer is preferred over NodePort for Production.

---

# 4. Usage in THIS Project

```
Internet

↓

AWS Load Balancer

↓

Frontend Service

↓

Frontend Pods

↓

API Gateway Service

↓

API Gateway Pods

↓

Auth Service

↓

Dashboard Service
```

In AWS EKS, our Frontend Service will be exposed using a LoadBalancer.

---

# 5. Architecture

```
                 Internet

                     │

                     ▼

         AWS Elastic Load Balancer

                     │

             LoadBalancer Service

                     │

         ┌───────────┼───────────┐

         ▼           ▼           ▼

      Frontend-1  Frontend-2  Frontend-3
```

Users never communicate directly with Pods.

---

# 6. Internal Workflow

```
User Request

↓

Public DNS

↓

AWS Load Balancer

↓

Kubernetes Service

↓

Service Selector

↓

Healthy Pods

↓

Application Response
```

---

# 7. How LoadBalancer Works

Step 1

Service Type = LoadBalancer

↓

Step 2

Cloud Provider detects the Service

↓

Step 3

External Load Balancer created

↓

Step 4

Public IP assigned

↓

Step 5

Traffic forwarded to healthy Pods

---

# 8. Why Use LoadBalancer?

Without LoadBalancer

```
User

↓

Worker Node

↓

NodePort
```

Problems

- Worker Node exposed
- Manual configuration
- Difficult to scale

With LoadBalancer

```
User

↓

Public Load Balancer

↓

Service

↓

Pods
```

Advantages

- Automatic
- Highly Available
- Secure
- Easy Scaling

---

# 9. Daily DevOps Activities

- Verify External IP
- Check Load Balancer Health
- Monitor Endpoints
- Validate DNS Mapping
- Monitor Traffic
- Troubleshoot Connectivity

---

# 10. Production Best Practices

- Use LoadBalancer only for public applications.
- Use Ingress when multiple applications share one Load Balancer.
- Enable HTTPS.
- Configure Health Checks.
- Enable Access Logs.
- Restrict Public Access where possible.

---

# 11. Security

- Enable TLS.
- Use WAF.
- Restrict Security Groups.
- Enable DDoS Protection.
- Use IAM Least Privilege.
- Never expose internal services publicly.

---

# 12. Troubleshooting

List Services

```bash
kubectl get svc
```

Describe Service

```bash
kubectl describe svc frontend
```

Check External IP

```bash
kubectl get svc -o wide
```

Check Endpoints

```bash
kubectl get endpoints
```

---

# 13. Real Production Scenarios

## Scenario 1

### External IP Pending

Symptoms

```
EXTERNAL-IP

<pending>
```

Investigation

```bash
kubectl describe svc frontend
```

Possible Reasons

- No Cloud Provider
- Missing Load Balancer Controller
- Cloud Permission Issue

Resolution

Verify Cloud Integration.

---

## Scenario 2

### Users Cannot Access Website

Load Balancer exists.

Pods are Running.

Root Cause

Security Group blocked Port 80/443.

Resolution

Allow HTTP/HTTPS traffic.

---

## Scenario 3

### One Pod Failed

```
Pod-2

Crash
```

Load Balancer Health Check marked it unhealthy.

Traffic automatically routed only to healthy Pods.

Users experienced no downtime.

---

# 14. Scenario Interview Questions

Q1. What is a LoadBalancer Service?

Answer

A Service type that exposes an application using a Cloud Provider Load Balancer.

---

Q2. Is LoadBalancer available on bare-metal Kubernetes?

Answer

Not by default.

It requires an external Load Balancer solution like MetalLB.

---

Q3. Why is LoadBalancer preferred over NodePort?

Answer

It provides a public IP, health checks, high availability and better security.

---

Q4. Which cloud services create Kubernetes LoadBalancers?

Answer

AWS ELB, Azure Load Balancer and Google Cloud Load Balancer.

---

# 15. Architecture Interview Questions

Explain the request flow.

```
Internet

↓

AWS ELB

↓

LoadBalancer Service

↓

Pods
```

---

Q2.

Who performs Health Checks?

Answer

The Cloud Load Balancer and Kubernetes together ensure traffic reaches only healthy Pods.

---

# 16. Production Support Interview Questions

Production Investigation Flow

```
Application Down

↓

kubectl get svc

↓

External IP Assigned?

↓

Security Group

↓

Endpoints

↓

Pods

↓

Logs

↓

Resolved
```

Manager Question

"Our Production website is inaccessible after deployment."

Expected Answer

- Verify External IP
- Check Security Groups
- Check Load Balancer Health
- Verify Service
- Verify Endpoints
- Verify Pods
- Validate Application

---

# 17. Related Runbooks

- loadbalancer-pending.md
- security-group-blocked.md
- external-ip-not-assigned.md

---

# 18. Common Incidents

- External IP Pending
- Security Group Blocked
- Wrong Health Check
- Empty Endpoints
- DNS Misconfiguration

---

# 19. Commands

```bash
kubectl get svc

kubectl describe svc frontend

kubectl get svc -o wide

kubectl get endpoints

kubectl get pods
```

---

# 20. Marathi Quick Revision

- LoadBalancer Cloud मध्ये वापरतात.
- Public IP मिळतो.
- Users थेट Load Balancer ला Access करतात.
- Health Checks मुळे खराब Pods कडे Traffic जात नाही.
- AWS EKS मध्ये हा सर्वात सामान्य Service Type आहे.

---

# 21. Marathi Summary (5+ Years Experience Revision)

## Interview Summary

LoadBalancer हा Production Cloud Kubernetes मधील सर्वात महत्त्वाचा External Service Type आहे.

तो Public IP, High Availability आणि Automatic Traffic Distribution प्रदान करतो.

## Production Investigation Flow

```
User

↓

Load Balancer

↓

Security Group

↓

Service

↓

Endpoints

↓

Pods

↓

Application

↓

Resolved
```

## Production Story

Production Deployment नंतर Website Open होत नव्हती.

Pods Running होते.

Service Healthy होता.

Investigation मध्ये AWS Security Group मध्ये Port 443 Allow नव्हता.

Rule Update केल्यानंतर Website लगेच सुरू झाली.

## Memory Trick

**Internet → Load Balancer → Service → Pods**

Remember

**Production Cloud = LoadBalancer**

