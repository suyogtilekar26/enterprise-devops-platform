# Kubernetes Interview Master Handbook

# Production Lab 05 - Ingress and TLS

---

# Objective

Deploy applications securely using Ingress and HTTPS.

Topics

NGINX Ingress Controller

Ingress Resource

Host Routing

Path Routing

TLS

cert-manager

SSL Termination

Multiple Applications

---

# Production Scenario

A company hosts multiple applications.

Requirements

shop.company.com

api.company.com

admin.company.com

Only one Load Balancer should be used.

All traffic must use HTTPS.

---

# Architecture

Internet

↓

Cloud Load Balancer

↓

NGINX Ingress Controller

↓

Ingress

↓

Frontend Service

↓

Backend Service

↓

Pods

---

# HTTPS Flow

Client

↓

HTTPS Request

↓

Load Balancer

↓

Ingress Controller

↓

TLS Certificate

↓

SSL Termination

↓

HTTP

↓

Application

---

# Host Based Routing

shop.company.com

↓

Frontend Service

---

api.company.com

↓

Backend Service

---

admin.company.com

↓

Admin Service

---

# Path Based Routing

company.com/shop

↓

Frontend

---

company.com/api

↓

Backend

---

company.com/admin

↓

Admin

---

# Step 1

Verify Ingress Controller

kubectl get pods -n ingress-nginx

---

Verify

kubectl get svc -n ingress-nginx

---

# Step 2

Deploy Application

kubectl apply -f deployment.yaml

---

Verify

kubectl get deployments

kubectl get pods

---

# Step 3

Deploy Services

kubectl apply -f service.yaml

---

Verify

kubectl get svc

---

# Step 4

Deploy Ingress

kubectl apply -f ingress.yaml

---

Verify

kubectl get ingress

---

Describe

kubectl describe ingress

---

# Step 5

Configure TLS Secret

kubectl create secret tls app-tls \
--cert=tls.crt \
--key=tls.key

---

Verify

kubectl get secrets

---

# Step 6

Update Ingress

Add

tls:

hosts:

secretName

---

Verify

HTTPS works.

---

# cert-manager

Purpose

Automatically issues and renews TLS certificates.

Supported Providers

Let's Encrypt

Venafi

Vault

Private CA

---

# Certificate Flow

Ingress

↓

cert-manager

↓

Certificate Request

↓

Let's Encrypt

↓

Certificate Issued

↓

TLS Secret

↓

HTTPS Enabled

---

# SSL Termination

Client

↓

HTTPS

↓

Ingress Controller

↓

TLS Decryption

↓

HTTP

↓

Application

---

# Common Problems

404 Not Found

503 Service Unavailable

TLS Handshake Failed

Certificate Expired

Host Not Found

Wrong Service Name

Wrong Port

DNS Misconfigured

---

# Troubleshooting Flow

Application Not Accessible

↓

Ingress

↓

Service

↓

Endpoints

↓

Pods

↓

TLS Secret

↓

DNS

↓

Application Logs

---

# Production Incident

Users received

404

Reason

Incorrect Host Rule.

Resolution

Correct Ingress hostname.

Apply updated manifest.

---

# Another Incident

HTTPS failed.

Browser reported

Certificate Invalid.

Reason

Expired Certificate.

Resolution

Renew using cert-manager.

---

# Best Practices

Use HTTPS everywhere.

Use cert-manager.

Never expose backend directly.

Use Host based routing.

Enable HTTP to HTTPS redirect.

Monitor certificate expiry.

Use least privilege RBAC.

---

# Useful Commands

kubectl get ingress

---

kubectl describe ingress

---

kubectl get secrets

---

kubectl describe secret app-tls

---

kubectl get endpoints

---

kubectl logs -n ingress-nginx deployment/ingress-nginx-controller

---

kubectl get certificate

---

kubectl get certificaterequest

---

# Interview Questions

Q1

Why use Ingress instead of multiple LoadBalancers?

Answer

Ingress allows multiple applications to share one external Load Balancer, reducing cost and simplifying routing.

---

Q2

What is SSL Termination?

Answer

The Ingress Controller decrypts HTTPS traffic and forwards plain HTTP traffic to backend services.

---

Q3

What is cert-manager?

Answer

cert-manager automates certificate issuance and renewal for Kubernetes workloads.

---

Q4

Difference between Host-based and Path-based Routing?

Answer

Host-based routing uses different domain names.

Path-based routing uses different URL paths on the same domain.

---

Q5

Why are TLS Secrets required?

Answer

TLS Secrets securely store the certificate and private key used for HTTPS communication.

---

# Scenario Based Interview

Question

Ingress returns

503 Service Unavailable.

How will you troubleshoot?

Answer

1. Verify Service.

2. Check Endpoints.

3. Verify Pods are Ready.

4. Describe Ingress.

5. Review Ingress Controller Logs.

---

Question

Users receive

Certificate Invalid.

What will you check?

Answer

1. TLS Secret.

2. Certificate expiry.

3. cert-manager status.

4. DNS configuration.

5. Hostname in certificate.

---

# Production Checklist

✔ Ingress Controller

✔ Ingress

✔ Services

✔ Endpoints

✔ TLS Secret

✔ cert-manager

✔ HTTPS

✔ DNS

✔ Logs

✔ Certificate Expiry

---

# Assignment

Deploy two applications.

Configure

Host-based Routing

Enable HTTPS using TLS.

Verify

Correct routing

HTTPS access

Automatic certificate renewal using cert-manager.

