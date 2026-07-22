# Kubernetes Services

# 1. Purpose

The purpose of a Kubernetes Service is to provide a stable network endpoint for Pods.

Pods are temporary.

Their IP addresses change whenever they are recreated.

A Service provides one permanent endpoint that applications and users can use.

---

# 2. Introduction

Pods are dynamic.

Example

```
Pod-1

IP

10.244.1.10

↓

Crash

↓

New Pod

IP

10.244.3.15
```

The Pod IP changed.

Instead of connecting directly to Pods, clients connect to the Service.

---

# 3. Enterprise Usage

Every Production application uses Services.

Examples

- Frontend → API Gateway
- API Gateway → Auth Service
- API Gateway → Dashboard Service
- Monitoring → Applications

Services provide

- Stable IP
- Load Balancing
- Service Discovery

---

# 4. Usage in THIS Project

```
Users

↓

Frontend Service

↓

Frontend Pods

-------------------------

Frontend

↓

API Gateway Service

↓

API Gateway Pods

-------------------------

API Gateway

↓

Auth Service

↓

Auth Pods

-------------------------

API Gateway

↓

Dashboard Service

↓

Dashboard Pods
```

---

# 5. Architecture

```
Users

↓

Frontend Service

        │

 ┌──────┼──────┐

 ▼      ▼      ▼

Pod-1  Pod-2  Pod-3

Frontend Pods
```

The Service automatically distributes traffic among healthy Pods.

---

# 6. Internal Workflow

```
User Request

↓

Service

↓

Selector

↓

Matching Pods

↓

Load Balancing

↓

Application Response
```

---

# 7. Why Services?

Without Service

```
User

↓

Pod IP

↓

Pod Deleted

↓

Connection Failed
```

With Service

```
User

↓

Service

↓

Current Healthy Pods

↓

Application Works
```

---

# 8. Types of Services

## ClusterIP

Default Service Type.

Accessible only inside the cluster.

Example

```
Frontend

↓

API Service

↓

API Pods
```

---

## NodePort

Exposes application on every Worker Node.

```
User

↓

Worker Node

Port 30080

↓

Application
```

Mostly used for testing.

---

## LoadBalancer

Used in Cloud Platforms.

```
Internet

↓

AWS ELB

↓

Service

↓

Pods
```

Most common Production Service Type.

---

## ExternalName

Maps Service to an external DNS name.

Example

```
database.company.com
```

---

# 9. Daily DevOps Activities

- Verify Services
- Check Endpoints
- Validate Selectors
- Test Connectivity
- Troubleshoot Service Discovery

---

# 10. Production Best Practices

- Use ClusterIP for internal communication.
- Use LoadBalancer for external applications.
- Verify Service Selectors.
- Monitor Service Endpoints.
- Avoid NodePort in Production unless required.

---

# 11. Security

- Use Network Policies.
- Expose only required Services.
- Protect LoadBalancers.
- Restrict Public Access.
- Use TLS for external traffic.

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

Check Endpoints

```bash
kubectl get endpoints
```

Test DNS

```bash
kubectl exec -it <pod-name> -- nslookup frontend
```

---

# 13. Real Production Scenarios

## Scenario 1

### Service Has No Endpoints

```
Service

↓

Selector

↓

No Matching Pods

↓

Endpoints Empty

↓

503 Error
```

Investigation

```bash
kubectl get endpoints

kubectl get pods --show-labels

kubectl describe svc frontend
```

Resolution

Correct the Selector Labels.

---

## Scenario 2

### Pod Restart

Frontend Pod crashed.

ReplicaSet created a new Pod.

Pod IP changed.

Service automatically started routing traffic to the new Pod.

Users noticed no interruption.

---

## Scenario 3

### Load Balancing

Three Frontend Pods

```
Request 1 → Pod-1

Request 2 → Pod-2

Request 3 → Pod-3

Request 4 → Pod-1
```

Traffic is distributed automatically.

---

# 14. Scenario Interview Q&A

Q. Why do we use Services?

Answer

Services provide a stable network endpoint and load balancing for Pods.

---

Q. Why can't we access Pods directly?

Answer

Pod IPs change whenever Pods are recreated.

---

Q. Which Service type is default?

Answer

ClusterIP.

---

Q. Which Service type is commonly used in Cloud Production?

Answer

LoadBalancer.

---

# 15. Architecture Interview Q&A

```
Users

↓

Service

↓

Selector

↓

Pods
```

The Service never communicates directly with applications.

It forwards traffic to matching Pods.

---

# 16. Production Support Interview Q&A

Application Not Reachable

```
Alert

↓

kubectl get svc

↓

kubectl get endpoints

↓

Endpoints Empty?

↓

Check Labels

↓

Check Selectors

↓

Verify Pods

↓

Application Restored
```

---

# 17. Related Runbooks

- service-no-endpoints.md
- dns-failure.md
- selector-mismatch.md
- loadbalancer-not-working.md

---

# 18. Common Incidents

- Empty Endpoints
- Wrong Selector
- DNS Failure
- LoadBalancer Pending
- Service Not Reachable

---

# 19. Commands

```bash
kubectl get svc

kubectl describe svc frontend

kubectl get endpoints

kubectl get pods --show-labels

kubectl exec -it <pod-name> -- nslookup frontend
```

---

# 20. Marathi Quick Revision

- Service म्हणजे Stable IP.
- Pod चा IP बदलतो, Service चा बदलत नाही.
- Service Load Balancing करते.
- ClusterIP हा Default Service Type आहे.
- Cloud मध्ये LoadBalancer जास्त वापरतात.

---

# 21. Marathi Summary (5+ Experience Revision)

## Interview Summary

Service हा Pods साठी Stable Network Endpoint आहे.

तो Load Balancing आणि Service Discovery प्रदान करतो.

Production मध्ये प्रत्येक Application Service वापरते.

## Production Investigation Flow

```
Alert

↓

kubectl get svc

↓

kubectl get endpoints

↓

Endpoints Empty?

↓

Check Labels

↓

Check Selectors

↓

Verify Pods

↓

Resolved
```

## Production Story

Production मध्ये Frontend Service 503 Error देत होती.

Pods Running होते.

`kubectl get endpoints` मध्ये कोणतेही Endpoints नव्हते.

Service Selector चुकीचा होता.

Selector Update केल्यानंतर Service ने Pods शोधले आणि Application लगेच सुरू झाली.

## Memory Trick

**Service = Stable IP**

**Pods = Dynamic IP**

Remember

**Users connect to Services, not Pods.**

