# Kubernetes Runbook 08 - Ingress Not Working

# 1. Purpose

This runbook explains how to investigate and recover Kubernetes Ingress issues when external traffic cannot reach applications.

Ingress failures typically impact all external users because requests cannot reach backend Services.

The objective is to identify the exact networking or configuration issue, restore connectivity safely and document the Root Cause Analysis (RCA).

---

# 2. Scope

Applicable to

- NGINX Ingress Controller
- AWS Load Balancer Controller
- Traefik
- HAProxy Ingress
- Istio Ingress Gateway (basic concepts)

Supported Platforms

- Kind
- EKS
- AKS
- GKE
- OpenShift
- On-Prem Kubernetes

---

# 3. Symptoms

Users may report

- Website not loading
- Login page unavailable
- HTTP 404
- HTTP 502
- HTTP 503
- SSL certificate error
- Gateway timeout

Monitoring may report

- Endpoint unavailable
- Increased 5xx errors
- Load Balancer unhealthy
- Health check failures

---

# 4. Business Impact

Critical

- Complete customer outage
- Login unavailable
- Public website inaccessible

Medium

- One application unavailable
- API inaccessible

Low

- Internal environments affected

---

# 5. Possible Root Causes

- Ingress Controller unavailable
- Backend Service unavailable
- Empty Endpoints
- Incorrect Service name
- Wrong Service port
- DNS issue
- TLS certificate expired
- Incorrect Ingress rules
- Load Balancer issue
- NetworkPolicy restriction
- CNI issue

---

# 6. Prerequisites

Required

- kubectl
- Namespace access
- Ingress access
- Service access

Verify permissions

```bash
kubectl auth can-i get ingress

kubectl auth can-i get svc

kubectl auth can-i get endpoints
```

---

# 7. Initial Investigation

## Step 1

Verify Ingress

```bash
kubectl get ingress -A
```

Example

```
NAME

enterprise-ingress
```

---

## Step 2

Describe Ingress

```bash
kubectl describe ingress enterprise-ingress \
-n enterprise-devops
```

Review

- Rules
- Host
- Backend
- Events
- Address

---

## Step 3

Verify Address

Example

```bash
kubectl get ingress
```

Expected

```
ADDRESS

192.168.x.x
```

or

```
LoadBalancer DNS
```

If empty

Ingress Controller may not be functioning.

---

# 8. Detailed Investigation

## Step 1

Verify Ingress Controller

```bash
kubectl get pods \
-n ingress-nginx
```

Expected

```
Running
```

---

## Step 2

Verify Controller Logs

```bash
kubectl logs \
-n ingress-nginx \
<controller-pod>
```

Look for

- Configuration errors
- Backend failures
- TLS issues

---

## Step 3

Verify Backend Service

```bash
kubectl get svc \
-n enterprise-devops
```

Confirm

Service exists.

---

## Step 4

Verify Endpoints

```bash
kubectl get endpoints \
-n enterprise-devops
```

Endpoints must not be empty.

---

## Step 5

Verify Pods

```bash
kubectl get pods \
-n enterprise-devops
```

Pods must be

```
Running
```

---

## Step 6

Verify Service Port

```bash
kubectl describe svc api-gateway
```

Confirm

```
Port

TargetPort
```

match the Ingress backend configuration.

---

## Step 7

Verify DNS

```bash
nslookup app.company.com
```

or

```bash
dig app.company.com
```

DNS should resolve to the Ingress Load Balancer.

---

## Step 8

Verify TLS

```bash
kubectl describe secret tls-secret
```

Review

- Certificate
- Expiration
- Secret name

---

## Step 9

Verify Load Balancer

Cloud environments

Check

- Target Groups
- Health Checks
- Listener Rules
- Security Groups

---

# 9. Resolution Steps

Depending on findings

Ingress Controller Down

Recover controller Pods.

Wrong Backend

Update Ingress rule.

Wrong Service

Correct backend Service.

Empty Endpoints

Recover application Pods.

DNS Issue

Update DNS record.

TLS Failure

Replace certificate.

Load Balancer Issue

Recover cloud networking.

---

# 10. Validation Steps

Verify

```bash
kubectl get ingress

kubectl get svc

kubectl get endpoints
```

Test

```bash
curl http://app.company.com

curl https://app.company.com
```

Business Validation

- Login
- APIs
- Dashboard
- SSL
- Monitoring

---

# 11. Rollback Procedure

If the outage began after an Ingress change

Restore the previous Ingress manifest.

Apply

```bash
kubectl apply -f previous-ingress.yaml
```

Validate

- External connectivity
- Endpoints
- Business functionality

---

# 12. Escalation Matrix

L1

- Verify Ingress
- Verify Endpoints

↓

L2

- Verify Controller
- Verify Services
- Verify DNS

↓

Platform Team

- Ingress Controller
- Kubernetes Networking

↓

Cloud Team

- Load Balancer
- Security Groups
- DNS

---

# 13. Production Best Practices

- Monitor Ingress Controller health.
- Use automated TLS renewal.
- Monitor certificate expiration.
- Validate Ingress changes in staging.
- Monitor backend endpoint count.
- Keep DNS TTL reasonable.
- Test external access after every deployment.

---

# 14. Real Production Scenario

After a production release, customers received HTTP 503 errors.

Investigation

```bash
kubectl describe ingress
```

showed the backend Service was correctly configured.

However

```bash
kubectl get endpoints
```

returned

```
<none>
```

The Deployment label had changed, causing the Service to lose all backend Pods.

Correcting the Service selector restored Endpoints and external access.

Root Cause

Service selector mismatch.

---

# 15. Scenario Interview Questions

## Q1. Users report HTTP 503 from Ingress. What do you check first?

### Answer

Investigation order

```bash
kubectl describe ingress

kubectl get endpoints

kubectl get svc

kubectl get pods
```

Most production 503 errors are caused by missing backend Endpoints rather than Ingress itself.

---

## Q2. How do you verify the Ingress Controller?

### Answer

```bash
kubectl get pods -n ingress-nginx

kubectl logs -n ingress-nginx <controller-pod>
```

Review controller logs for routing and configuration errors.

---

## Q3. Why can an Ingress exist but still not route traffic?

### Answer

Because

- Backend Service missing
- Empty Endpoints
- Wrong Service port
- DNS issue
- TLS issue
- Controller unavailable

---

# 16. Architecture Interview Questions

## Q1. Explain Ingress request flow.

### Answer

```
Client

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

Pods
```

Every layer must function correctly for successful routing.

---

## Q2. Which Kubernetes components participate?

### Answer

- Ingress
- Ingress Controller
- Service
- Endpoints
- Pods
- kube-proxy
- CNI

---

# 17. Production Support Interview Questions

## Q1. External users cannot access the application. How do you investigate?

### Answer

Commands

```bash
kubectl get ingress

kubectl describe ingress

kubectl get svc

kubectl get endpoints

kubectl get pods

kubectl logs -n ingress-nginx <controller-pod>
```

Verify

- DNS
- TLS
- Load Balancer
- Backend Service
- Endpoints
- Pods

---

## Q2. How do you distinguish an Ingress issue from a Service issue?

### Answer

If internal Service access works but external access fails, investigate the Ingress layer.

If the Service has no Endpoints or Pods are unhealthy, the issue is in the application or Service layer.

---

# 18. Commands Reference

```bash
kubectl get ingress

kubectl describe ingress

kubectl get svc

kubectl get endpoints

kubectl get pods

kubectl logs -n ingress-nginx <controller-pod>

nslookup app.company.com

curl https://app.company.com
```

---

# 19. Marathi Quick Revision

- Ingress verify करा.
- Controller तपासा.
- Service verify करा.
- Endpoints तपासा.
- Pods Running आहेत का तपासा.
- DNS verify करा.
- TLS certificate तपासा.
- Load Balancer verify करा.

---

# 20. Related Runbooks

- 07-service-not-reachable.md
- 09-coredns-failure.md
- 16-health-probe-failures.md
- 17-api-server-unreachable.md

---

# 21. Marathi Summary (5+ Experience Revision)

## Interview Summary

Ingress काम करत नसेल तर प्रथम Ingress object पेक्षा **Ingress Controller आणि Endpoints** तपासावेत. Production मध्ये बहुतेक HTTP 503 समस्या backend Endpoints रिकामे असल्यामुळे किंवा Service configuration चुकीची असल्यामुळे येतात. त्यानंतर DNS, TLS certificate, Load Balancer आणि Controller logs तपासून Root Cause निश्चित करावा.

### Production Investigation Flow

```
Alert

↓

Ingress

↓

Ingress Controller

↓

Service

↓

Endpoints

↓

Pods

↓

DNS

↓

TLS

↓

Load Balancer

↓

Root Cause

↓

Fix

↓

Validation

↓

RCA
```

### Production Story

एका production retail platform मध्ये अचानक सर्व ग्राहकांना HTTP 503 दिसू लागले. सुरुवातीला Load Balancer failure असल्याचा संशय होता. DevOps team ने `kubectl get endpoints` तपासले आणि backend Service चे Endpoints रिकामे असल्याचे आढळले. Deployment दरम्यान label बदलल्यामुळे Service ला Pods सापडत नव्हत्या. Service selector दुरुस्त केल्यानंतर काही सेकंदांत Ingress पुन्हा traffic route करू लागला. Incident review नंतर deployment pipeline मध्ये Service-EndPoint validation जोडण्यात आली.

### 5+ Years Memory Trick

Interview मध्ये जर विचारले,

**"How do you troubleshoot an Ingress issue in production?"**

उत्तर:

"I verify the Ingress resource, then check the Ingress Controller, backend Service, Endpoints and Pods. After confirming the Kubernetes routing path, I validate DNS resolution, TLS certificates and Load Balancer health. Once connectivity is restored, I perform business validation and complete the RCA."

