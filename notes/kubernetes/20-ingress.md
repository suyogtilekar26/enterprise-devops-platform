# Kubernetes Ingress

# 1. Purpose

The purpose of Ingress is to expose HTTP and HTTPS applications running inside a Kubernetes Cluster using a single entry point.

Instead of creating one LoadBalancer for every application, Ingress allows multiple applications to share one LoadBalancer.

Ingress reduces infrastructure cost and simplifies traffic management.

---

# 2. Introduction

Suppose our project has four services.

- Frontend
- API Gateway
- Auth Service
- Dashboard Service

Without Ingress, we need multiple LoadBalancers.

```
Frontend

↓

LoadBalancer

----------------

API

↓

LoadBalancer

----------------

Auth

↓

LoadBalancer

----------------

Dashboard

↓

LoadBalancer
```

This is expensive.

Ingress solves this problem.

---

# 3. Enterprise Usage

Almost every Production Kubernetes Cluster uses Ingress.

Examples

- AWS EKS
- Azure AKS
- Google GKE
- OpenShift

Popular Ingress Controllers

- NGINX Ingress
- AWS Load Balancer Controller
- Traefik
- HAProxy

---

# 4. Usage in THIS Project

```
Internet

↓

AWS Load Balancer

↓

NGINX Ingress Controller

↓

Frontend Service

↓

Frontend Pods

--------------------------

API Gateway Service

↓

API Pods

--------------------------

Auth Service

↓

Auth Pods

--------------------------

Dashboard Service

↓

Dashboard Pods
```

One public endpoint will expose our entire Enterprise DevOps Platform.

---

# 5. Architecture

```
                    Internet

                        │

                        ▼

              AWS Load Balancer

                        │

                        ▼

          NGINX Ingress Controller

        ┌────────┼──────────┬──────────┐

        ▼        ▼          ▼          ▼

Frontend   API Gateway    Auth    Dashboard

Service      Service      Service   Service

        ▼        ▼          ▼          ▼

      Pods     Pods       Pods       Pods
```

---

# 6. Internal Workflow

```
Browser Request

↓

Load Balancer

↓

Ingress Controller

↓

Ingress Rules

↓

Matching Service

↓

Matching Pods

↓

Application Response
```

---

# 7. Why Ingress?

Without Ingress

```
4 Applications

↓

4 LoadBalancers

↓

Higher Cost
```

With Ingress

```
4 Applications

↓

1 Ingress

↓

1 LoadBalancer

↓

Lower Cost
```

---

# 8. Features of Ingress

- HTTP Routing
- HTTPS Support
- SSL Termination
- Path-based Routing
- Host-based Routing
- URL Rewrite
- Load Balancing

---

# 9. Daily DevOps Activities

- Verify Ingress Rules
- Check DNS Mapping
- Validate TLS Certificates
- Monitor Ingress Controller
- Troubleshoot Routing Issues
- Verify Backend Services

---

# 10. Production Best Practices

- Use HTTPS only.
- Store TLS Certificates securely.
- Use Ingress for Web Applications.
- Monitor Ingress Logs.
- Avoid exposing internal services.
- Configure Health Checks.

---

# 11. Security

- Enable TLS.
- Redirect HTTP to HTTPS.
- Enable Web Application Firewall (WAF).
- Restrict Public Access.
- Enable Rate Limiting.
- Use Authentication where required.

---

# 12. Troubleshooting

List Ingress

```bash
kubectl get ingress
```

Describe Ingress

```bash
kubectl describe ingress
```

Check Services

```bash
kubectl get svc
```

Check Endpoints

```bash
kubectl get endpoints
```

Check Ingress Controller Pods

```bash
kubectl get pods -n ingress-nginx
```

---

# 13. Real Production Scenarios

## Scenario 1

### 404 Not Found

Symptoms

Users receive

```
404 Not Found
```

Investigation

```bash
kubectl describe ingress
```

Root Cause

Incorrect path rule.

Resolution

Update Ingress Rule.

---

## Scenario 2

### Backend Service Unavailable

Ingress is Healthy.

LoadBalancer is Healthy.

Root Cause

Backend Service has no Endpoints.

Investigation

```bash
kubectl get endpoints
```

Resolution

Correct Service Selector.

---

## Scenario 3

### TLS Certificate Expired

Users receive browser certificate warnings.

Investigation

Check TLS Secret.

Renew certificate.

Restart if required.

---

# 14. Scenario Interview Questions

Q1. What is Ingress?

Answer

Ingress is a Kubernetes resource that manages external HTTP and HTTPS access to services inside the cluster.

---

Q2. Why do we use Ingress?

Answer

To expose multiple applications using a single LoadBalancer.

---

Q3. Does Ingress expose Pods directly?

Answer

No.

Ingress forwards traffic to Kubernetes Services.

---

Q4. Can Ingress perform SSL Termination?

Answer

Yes.

---

# 15. Architecture Interview Questions

Explain the complete request flow.

```
Browser

↓

Load Balancer

↓

Ingress Controller

↓

Ingress Rule

↓

Service

↓

Pods
```

---

Q2.

What is the difference between Ingress and LoadBalancer?

Answer

LoadBalancer exposes one Service.

Ingress can expose multiple Services using one LoadBalancer.

---

# 16. Production Support Interview Questions

Production Investigation Flow

```
Website Down

↓

DNS

↓

Load Balancer

↓

Ingress

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

Manager Question

"Our Production website returns 404 after deployment."

Expected Answer

- Verify DNS
- Verify LoadBalancer
- Verify Ingress Rules
- Verify Backend Service
- Verify Endpoints
- Verify Pods
- Validate Application

---

# 17. Related Runbooks

- ingress-404.md
- tls-certificate-expired.md
- backend-service-unavailable.md

---

# 18. Common Incidents

- 404 Not Found
- TLS Certificate Expired
- Wrong Path Rule
- Backend Unavailable
- DNS Failure

---

# 19. Commands

```bash
kubectl get ingress

kubectl describe ingress

kubectl get svc

kubectl get endpoints

kubectl get pods -n ingress-nginx
```

---

# 20. Marathi Quick Revision

- Ingress एकाच LoadBalancer वर अनेक Applications चालवतो.
- HTTP आणि HTTPS Routing करतो.
- Service पर्यंत Traffic Forward करतो.
- Production मध्ये Cost कमी करण्यासाठी वापरतात.
- NGINX Ingress Controller सर्वात जास्त वापरला जातो.

---

# 21. Marathi Summary (5+ Years Experience Revision)

## Interview Summary

Ingress हा Kubernetes मधील HTTP/HTTPS Traffic Manager आहे.

तो एका LoadBalancer वापरून अनेक Services expose करू शकतो.

Enterprise Production मध्ये हा सर्वाधिक वापरला जाणारा External Routing Component आहे.

## Production Investigation Flow

```
User

↓

DNS

↓

Load Balancer

↓

Ingress

↓

Service

↓

Endpoints

↓

Pods

↓

Resolved
```

## Production Story

Production मध्ये Frontend Website 404 Error देत होती.

Pods Running होते.

Services Healthy होत्या.

`kubectl describe ingress` मध्ये Path Rule चुकीचा होता.

Rule Update केल्यानंतर Website लगेच सुरू झाली.

## Memory Trick

**Internet → Load Balancer → Ingress → Service → Pods**

Remember

**Ingress = One Entry Point for Multiple Applications**

