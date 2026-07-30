# Kubernetes Interview Master Handbook

# Production Incident 11 - Ingress Issues

---

# Incident

Application Pods are Running.

Service is Healthy.

But users cannot access

https://app.company.com

Browser shows

404

502

503

OR

TLS Error

---

# What is Ingress?

## English

Ingress is a Kubernetes resource that manages external HTTP and HTTPS traffic.

It routes requests to the correct Service based on

Host

Path

Rules

---

## मराठी

Ingress बाहेरून येणारा HTTP/HTTPS Traffic योग्य Service कडे पाठवतो.

Routing Host आणि Path वर आधारित असते.

---

# Request Flow

Browser

↓

DNS

↓

Load Balancer

↓

Ingress Controller

↓

Ingress Rules

↓

Service

↓

Endpoints

↓

Pod

↓

Application

---

# Common Reasons

Ingress Controller Missing

Wrong Host

Wrong Path

Wrong Service Name

Wrong Service Port

DNS Failure

TLS Certificate Expired

Empty Endpoints

NetworkPolicy

Firewall

---

# Step 1

Check Ingress

kubectl get ingress

---

# Step 2

Describe Ingress

kubectl describe ingress frontend

Verify

Host

Path

Backend Service

Events

---

# Step 3

Check Ingress Controller

kubectl get pods -n ingress-nginx

Verify

Controller Pod is Running.

---

# Step 4

Check Service

kubectl get svc

Verify

Backend Service exists.

---

# Step 5

Check Endpoints

kubectl get endpoints

Example

frontend

10.244.1.5:80

If

<none>

Service cannot reach Pods.

---

# Step 6

Verify DNS

nslookup app.company.com

OR

dig app.company.com

Verify

DNS points to Load Balancer.

---

# Step 7

Verify TLS

kubectl get secret

Check TLS Secret exists.

Verify Certificate validity.

---

# Common HTTP Errors

404 Not Found

Ingress rule not matching.

Wrong Host

Wrong Path

---

502 Bad Gateway

Ingress reached Service

Backend Application unavailable.

---

503 Service Unavailable

Service has no healthy Endpoints.

---

# Troubleshooting Flow

User Cannot Access

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

---

# Production Incident

Developer renamed Service

frontend

↓

frontend-v2

Ingress still pointed to

frontend

Result

502 Bad Gateway

Resolution

Update Ingress backend service.

---

# Another Incident

TLS certificate expired.

Browser displayed

NET::ERR_CERT_DATE_INVALID

Resolution

Renew certificate.

Update Kubernetes Secret.

Reload Ingress Controller.

---

# Best Practices

Always use TLS.

Monitor certificate expiry.

Keep Host rules simple.

Use readiness probes.

Monitor Ingress Controller.

Use meaningful paths.

---

# Useful Commands

kubectl get ingress

---

kubectl describe ingress

---

kubectl get svc

---

kubectl get endpoints

---

kubectl get pods -n ingress-nginx

---

kubectl logs -n ingress-nginx deployment/ingress-nginx-controller

---

nslookup DOMAIN

---

# Interview Questions

Q1

What is Ingress?

Answer

Ingress manages external HTTP and HTTPS traffic and routes requests to Kubernetes Services.

---

Q2

Difference between Service and Ingress?

Answer

Service exposes applications inside the cluster.

Ingress provides HTTP/HTTPS routing from outside the cluster.

---

Q3

What causes HTTP 404?

Answer

Host or Path does not match the Ingress rules.

---

Q4

What causes HTTP 502?

Answer

Ingress reached the Service but the backend application is unavailable.

---

Q5

What causes HTTP 503?

Answer

The Service has no healthy Endpoints.

---

# Scenario Based Interview

Question

Domain resolves successfully.

Pods are Running.

Users receive

503 Service Unavailable.

How will you troubleshoot?

Answer

1. Check Ingress.

2. Verify Backend Service.

3. Check Endpoints.

4. Verify Readiness Probe.

5. Verify Pod Health.

---

Question

Browser shows certificate error.

How will you troubleshoot?

Answer

1. Check TLS Secret.

2. Verify Certificate validity.

3. Verify Secret reference in Ingress.

4. Reload Ingress Controller if required.

---

# Production Troubleshooting Checklist

✔ kubectl get ingress

✔ kubectl describe ingress

✔ kubectl get svc

✔ kubectl get endpoints

✔ kubectl get pods -n ingress-nginx

✔ kubectl logs ingress controller

✔ Verify DNS

✔ Verify TLS Secret

✔ Verify Backend Service

✔ Verify Readiness Probe

---

# Senior Engineer Notes

Always troubleshoot from the client towards the application.

Browser

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

Pod

↓

Application

Never jump directly to the Pod.

Most production Ingress issues are caused by DNS, Service mapping or missing Endpoints—not Kubernetes itself.

