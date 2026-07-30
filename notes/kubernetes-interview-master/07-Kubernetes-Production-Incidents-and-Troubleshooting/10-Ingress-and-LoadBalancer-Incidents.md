# Kubernetes Interview Master Handbook

# Section 07 - Kubernetes Production Incidents & Troubleshooting

# Chapter 10 - Ingress and LoadBalancer Incidents

---

# Objective

Learn how to investigate, troubleshoot, recover and permanently prevent Ingress and LoadBalancer incidents in Kubernetes production environments.

Ingress failures are among the highest-impact production incidents because they prevent external users from accessing applications.

---

# Interview Scenario

Time: 10:05 AM

PagerDuty Alert

"Checkout Application Unreachable"

Impact

- Customers receive HTTP 502 and 503 errors.
- Login page inaccessible.
- Revenue loss.
- External traffic completely blocked.

You are the on-call SRE.

Restore external connectivity immediately.

---

# What is an Ingress Incident?

An Ingress incident occurs when external traffic cannot reach Kubernetes applications because of failures in the LoadBalancer, Ingress Controller, Ingress resources, backend Services or networking.

---

# External Traffic Flow

Client

↓

DNS

↓

LoadBalancer

↓

Ingress Controller

↓

Ingress Resource

↓

Service

↓

Endpoints

↓

Application Pod

OR

↓

Traffic Failure

↓

HTTP Errors

↓

Application Unavailable

---

# Common Root Causes

Ingress Controller Down

LoadBalancer Failure

Invalid Ingress Rules

Incorrect Hostname

Incorrect Path Rules

TLS Certificate Expired

Backend Service Missing

Empty Endpoints

Firewall Rules

Cloud LoadBalancer Failure

NetworkPolicy Blocking Traffic

Ingress Controller Upgrade Failure

---

# Step 1 - Verify Pods

```bash
kubectl get pods -A
```

Confirm

Ingress Controller Running.

---

# Step 2 - Verify Ingress

```bash
kubectl get ingress -A
```

---

# Step 3 - Describe Ingress

```bash
kubectl describe ingress checkout
```

Verify

- Host
- Paths
- Backend Service
- TLS
- Events

---

# Step 4 - Verify Service

```bash
kubectl get svc -A
```

---

# Step 5 - Verify Endpoints

```bash
kubectl get endpoints -A
```

Ensure

Backend Pods exist.

---

# Step 6 - Verify LoadBalancer

```bash
kubectl get svc -n ingress-nginx
```

Check

EXTERNAL-IP

---

# Step 7 - Verify Ingress Controller

```bash
kubectl get pods -n ingress-nginx
```

---

# Step 8 - Check Logs

```bash
kubectl logs deployment/ingress-nginx-controller -n ingress-nginx
```

Look for

- Backend Errors
- TLS Errors
- Routing Failures

---

# Step 9 - Verify TLS Secret

```bash
kubectl get secrets
```

Describe

```bash
kubectl describe secret <tls-secret>
```

---

# Step 10 - Verify Events

```bash
kubectl get events -A --sort-by=.metadata.creationTimestamp
```

---

# Investigation Flow

Client

↓

DNS

↓

LoadBalancer

↓

Ingress Controller

↓

Ingress

↓

Service

↓

Endpoints

↓

Application

↓

Recovery

---

# Scenario 1

Ingress Controller Crash

Pods

CrashLoopBackOff

Resolution

Recover controller deployment.

---

# Scenario 2

Incorrect Backend Service

Ingress

Routes traffic to

```text
payment-service
```

Actual Service

```text
checkout-service
```

Resolution

Update Ingress.

---

# Scenario 3

No Endpoints

Service exists.

Endpoints empty.

Resolution

Recover backend Pods.

---

# Scenario 4

TLS Certificate Expired

Browser

Certificate Error

Resolution

Renew certificate.

Update TLS Secret.

---

# Scenario 5

LoadBalancer Pending

```text
EXTERNAL-IP

<pending>
```

Resolution

Verify cloud provider.

Verify Service configuration.

---

# Scenario 6

Incorrect Host Rule

Ingress

```text
shop.company.com
```

DNS

```text
store.company.com
```

Resolution

Correct host rule.

---

# Production Incident

Issue

Customers receive HTTP 503.

Investigation

LoadBalancer healthy.

Ingress healthy.

Service exists.

Endpoints empty.

Application Deployment failed.

Root Cause

All backend Pods crashed after deployment.

Resolution

Rollback Deployment.

Endpoints restored.

Application available.

---

# Recovery Commands

Check Ingress

```bash
kubectl get ingress -A
```

---

Describe Ingress

```bash
kubectl describe ingress checkout
```

---

Check Services

```bash
kubectl get svc -A
```

---

Check Endpoints

```bash
kubectl get endpoints -A
```

---

Restart Ingress Controller

```bash
kubectl rollout restart deployment ingress-nginx-controller -n ingress-nginx
```

---

Restart Deployment

```bash
kubectl rollout restart deployment checkout
```

---

# Validation Checklist

LoadBalancer Healthy

Ingress Healthy

TLS Valid

Service Reachable

Endpoints Healthy

Application Accessible

Customer Transactions Successful

---

# RCA Template

Incident

Ingress Failure

Root Cause

Backend Pods unavailable

Business Impact

External application unavailable

Detection

HTTP 503 Alert

Resolution

Recovered Deployment

Preventive Action

Ingress Monitoring

Deployment Validation

---

# Interview Questions

## Q1. What is the purpose of Ingress?

Answer

Ingress provides HTTP and HTTPS routing from external clients to Kubernetes Services based on hostnames and paths.

---

## Q2. Which command verifies Ingress resources?

Answer

```bash
kubectl get ingress -A
```

---

## Q3. Why verify Endpoints during an Ingress incident?

Answer

An Ingress may be healthy, but without backend Endpoints the Service cannot forward traffic to application Pods.

---

## Q4. What causes HTTP 503 from Ingress?

Answer

Missing backend Pods, empty Endpoints, Service failures, application crashes or routing configuration errors.

---

## Q5. How do you troubleshoot an Ingress incident?

Answer

Verify DNS, LoadBalancer, Ingress Controller, Ingress rules, Services, Endpoints, backend Pods and TLS configuration before identifying the root cause.

---

# Assignment

Production users cannot access the application through the Ingress.

Prepare

- Investigation Plan
- Commands
- Evidence Collection
- Root Cause Analysis
- Recovery
- Validation
- Preventive Actions

---

# Assignment Solution

## Step 1

Verify Ingress.

```bash
kubectl get ingress -A
```

---

## Step 2

Describe Ingress.

```bash
kubectl describe ingress <ingress-name>
```

---

## Step 3

Verify

- Services
- Endpoints
- Ingress Controller
- TLS
- LoadBalancer
- Events

---

## Step 4

Identify root cause.

---

## Step 5

Recover affected component.

---

## Step 6

Validate

- External Access
- HTTP Response
- Application Health
- Customer Transactions

---

## Step 7

Complete RCA.

---

# Production Best Practices

✔ Deploy Highly Available Ingress Controllers

✔ Monitor HTTP Error Rates

✔ Validate Ingress Rules

✔ Monitor TLS Certificate Expiry

✔ Monitor LoadBalancer Health

✔ Validate DNS Configuration

✔ Alert on Empty Endpoints

✔ Test Ingress After Every Deployment

✔ Automate Certificate Renewal

✔ Maintain Ingress Runbooks

---

# Runbook Checklist

□ DNS Verified

□ LoadBalancer Healthy

□ Ingress Verified

□ Ingress Controller Healthy

□ Services Verified

□ Endpoints Verified

□ TLS Verified

□ Root Cause Confirmed

□ Recovery Completed

□ Validation Successful

□ RCA Completed

---

# Common Mistakes

❌ Ignoring Endpoints

❌ Assuming LoadBalancer Is Faulty

❌ Forgetting TLS Validation

❌ Incorrect Host or Path Rules

❌ Ignoring Ingress Controller Logs

❌ Not Testing External Access

❌ Closing Incident Without Validation

❌ Skipping RCA

