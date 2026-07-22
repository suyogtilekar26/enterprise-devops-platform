# Kubernetes ClusterIP Service

# 1. Purpose

The purpose of a ClusterIP Service is to provide a stable internal network endpoint for applications running inside the Kubernetes Cluster.

ClusterIP is the default Service type in Kubernetes.

Production applications use ClusterIP for service-to-service communication.

---

# 2. Introduction

Pods are temporary.

Whenever a Pod is recreated, its IP address changes.

Applications should never communicate using Pod IPs.

Instead, they communicate using a ClusterIP Service.

Example

```
Frontend

↓

API Gateway Service

↓

API Gateway Pods
```

Even if Pods restart, the Service IP remains stable.

---

# 3. Enterprise Usage

ClusterIP is used for internal communication between microservices.

Examples

- Frontend → API Gateway
- API Gateway → Auth Service
- API Gateway → Dashboard Service
- Dashboard → Database Proxy
- Monitoring → Application Metrics

External users cannot directly access a ClusterIP Service.

---

# 4. Usage in THIS Project

```
Frontend

↓

api-gateway-service

↓

API Gateway Pods

----------------------------

API Gateway

↓

auth-service

↓

Auth Pods

----------------------------

API Gateway

↓

dashboard-service

↓

Dashboard Pods
```

Every backend service in our Enterprise DevOps Platform will use ClusterIP.

---

# 5. Architecture

```
                 Kubernetes Cluster

+--------------------------------------------------+

Frontend Pods

        │

        ▼

+----------------------+

api-gateway Service

ClusterIP

10.96.20.15

+----------------------+

        │

 ┌──────┼───────┐

 ▼      ▼       ▼

API Pod-1

API Pod-2

API Pod-3

+--------------------------------------------------+
```

Users never connect directly to Pods.

Traffic always goes through the Service.

---

# 6. Internal Workflow

```
Frontend Request

↓

DNS Lookup

↓

api-gateway.default.svc.cluster.local

↓

ClusterIP Service

↓

Service Selector

↓

Matching Pods

↓

Response Returned
```

---

# 7. How ClusterIP Works

Step 1

Deployment creates Pods.

↓

Step 2

Service selects Pods using Labels.

↓

Step 3

ClusterIP is assigned.

↓

Step 4

Requests arrive at ClusterIP.

↓

Step 5

kube-proxy forwards requests to healthy Pods.

---

# 8. Why Not Use Pod IP?

```
Pod

10.244.1.20

↓

Pod Deleted

↓

New Pod

10.244.3.45
```

Application breaks.

Using ClusterIP

```
Frontend

↓

api-service

↓

Healthy Pods
```

Application continues working.

---

# 9. Daily DevOps Activities

- Verify Service Status
- Check Endpoints
- Validate Selectors
- Test DNS Resolution
- Investigate Service Connectivity
- Verify Load Balancing

---

# 10. Production Best Practices

- Use ClusterIP for internal services.
- Never expose internal APIs using NodePort.
- Use meaningful Service names.
- Verify Label and Selector consistency.
- Monitor Endpoints.
- Enable Readiness Probes.

---

# 11. Security

- Keep backend Services as ClusterIP.
- Use Network Policies.
- Restrict Namespace communication.
- Enable TLS where required.
- Never expose sensitive services publicly.

---

# 12. Troubleshooting

List Services

```bash
kubectl get svc
```

Describe Service

```bash
kubectl describe svc api-gateway
```

Check Endpoints

```bash
kubectl get endpoints
```

Check Pods

```bash
kubectl get pods --show-labels
```

Test DNS

```bash
kubectl exec -it frontend-pod -- nslookup api-gateway
```

---

# 13. Real Production Scenarios

## Scenario 1

### Empty Endpoints

Symptoms

- Frontend receives HTTP 503.
- Service exists.
- Pods are Running.

Investigation

```bash
kubectl get endpoints

kubectl describe svc api-gateway

kubectl get pods --show-labels
```

Root Cause

Service Selector does not match Pod Labels.

Resolution

Correct the Selector.

---

## Scenario 2

### Pod Restart

API Pod crashes.

ReplicaSet creates a new Pod.

Old IP disappears.

ClusterIP automatically routes traffic to the new Pod.

Users experience no downtime.

---

## Scenario 3

### Rolling Update

Deployment starts Rolling Update.

Old Pods terminate one by one.

New Pods pass Readiness Probe.

ClusterIP automatically removes unhealthy Pods and sends traffic only to healthy Pods.

---

# 14. Scenario Interview Questions

Q1. What is ClusterIP?

Answer

ClusterIP is the default Kubernetes Service type used for internal communication inside the cluster.

---

Q2. Can external users access ClusterIP?

Answer

No.

ClusterIP is accessible only from within the Kubernetes Cluster.

---

Q3. Why is ClusterIP better than Pod IP?

Answer

Pod IP changes after restart.

ClusterIP remains stable.

---

Q4. Does ClusterIP perform Load Balancing?

Answer

Yes.

Traffic is distributed across healthy Pods.

---

# 15. Architecture Interview Questions

Q1.

Explain how Frontend communicates with the API Gateway.

```
Frontend

↓

ClusterIP Service

↓

Selector

↓

API Pods
```

---

Q2.

What happens if one Pod crashes?

Answer

ReplicaSet creates a new Pod.

ClusterIP automatically starts routing traffic to the new Pod.

---

# 16. Production Support Interview Questions

Production Investigation

```
Alert

↓

Application Down

↓

kubectl get svc

↓

kubectl get endpoints

↓

Endpoints Empty?

↓

Check Labels

↓

Describe Service

↓

Verify Pods

↓

Fix

↓

Validate
```

Manager Question

"Users are getting 503 errors. How will you investigate?"

Expected Answer

1. Check Service.
2. Check Endpoints.
3. Verify Labels.
4. Verify Pods.
5. Review Events.
6. Confirm traffic restoration.

---

# 17. Related Runbooks

- service-endpoints-empty.md
- selector-mismatch.md
- service-dns-failure.md

---

# 18. Common Incidents

- Empty Endpoints
- Wrong Labels
- Wrong Selector
- DNS Failure
- Service Timeout

---

# 19. Commands

```bash
kubectl get svc

kubectl describe svc api-gateway

kubectl get endpoints

kubectl get pods --show-labels

kubectl exec -it frontend-pod -- nslookup api-gateway
```

---

# 20. Marathi Quick Revision

- ClusterIP हा Default Service Type आहे.
- Internal Communication साठी वापरतात.
- Pod IP बदलतो पण ClusterIP बदलत नाही.
- Service Labels वापरून Pods शोधते.
- ClusterIP Load Balancing करते.

---

# 21. Marathi Summary (5+ Years Experience Revision)

## Interview Summary

ClusterIP हा Kubernetes मधील सर्वात जास्त वापरला जाणारा Service Type आहे.

तो Internal Microservices Communication साठी वापरला जातो.

## Production Investigation Flow

```
Application Down

↓

Service

↓

Endpoints

↓

Labels

↓

Pods

↓

Logs

↓

Events

↓

RCA

↓

Resolved
```

## Production Story

Frontend Team ने सांगितले की API 503 Error देत आहे.

Pods Running होते.

`kubectl get endpoints` चालवल्यावर Endpoints रिकामे दिसले.

Root Cause:

Deployment वर Label `app=api`

Service Selector वर `app=backend`

Selector बदलल्यानंतर लगेच Traffic सुरू झाला.

## Memory Trick

**ClusterIP = Internal Communication**

Remember

**Applications talk to Services, not directly to Pods.**

