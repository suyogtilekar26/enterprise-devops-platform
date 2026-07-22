# Kubernetes Production Incident 07 - DNS Resolution Failure During Production

# 1. Incident Overview

## Incident ID

INC-K8S-007

## Severity

SEV-1

## Environment

Production

## Reported By

Prometheus Alertmanager

## Incident Time

01:05 PM

## Resolved Time

01:47 PM

## Duration

42 Minutes

## Affected Component

CoreDNS

## Affected Services

- API Gateway
- Auth Service
- Dashboard Service

## Impacted Application

Enterprise DevOps Platform

```
Frontend

↓

API Gateway

↓

DNS Resolution ❌

↓

Auth Service

Dashboard Service
```

---

# 2. Business Impact

Customer Impact

- Login requests failed
- Internal API communication stopped
- Dashboard unavailable
- HTTP 500 errors increased

Business Impact

- Service-to-service communication interrupted
- Authentication unavailable
- Production transactions delayed
- SLA violation risk

Estimated Revenue Impact

Critical

---

# 3. Alert Received

Prometheus Alert

```
CoreDNSDown

Severity

Critical

Namespace

kube-system
```

Grafana Dashboard

```
DNS Errors ↑

Service Discovery Failures ↑

Application Errors ↑
```

Application Logs

```
dial tcp:

lookup auth-service:

no such host
```

---

# 4. Production Architecture

```
Frontend

↓

API Gateway

↓

CoreDNS

↓

Auth Service

↓

Dashboard Service
```

---

# 5. Symptoms

Observed

- Pods Running
- Services Running
- DNS lookups failed
- Internal API communication failed

Users observed

- Login failed
- Dashboard unavailable
- HTTP 500 responses

---

# 6. Initial Investigation

Objective

Determine whether issue is related to

- CoreDNS
- Service Discovery
- Networking
- Kubernetes Services
- Network Policies

Commands

```bash
kubectl get pods -n kube-system

kubectl get svc

kubectl get events \
--sort-by=.metadata.creationTimestamp
```

Observation

Applications healthy.

DNS resolution failed.

---

# 7. Investigation Timeline

## 01:05

Critical alert received.

---

## 01:08

Verified Nodes.

```bash
kubectl get nodes
```

Healthy.

---

## 01:10

Verified Application Pods.

```bash
kubectl get pods -A
```

Pods Running.

---

## 01:12

Executed DNS test.

```bash
kubectl exec \
-it api-gateway-pod \
-- nslookup auth-service
```

Result

```
no such host
```

---

## 01:15

Verified CoreDNS Pods.

```bash
kubectl get pods \
-n kube-system
```

Observed

```
CrashLoopBackOff
```

---

## 01:18

Collected logs.

```bash
kubectl logs \
-n kube-system \
deployment/coredns
```

Observed

```
Corefile parse error
```

---

## 01:22

Reviewed ConfigMap.

```bash
kubectl describe configmap coredns \
-n kube-system
```

Recent manual modification detected.

---

## 01:27

Root Cause confirmed.

Invalid CoreDNS configuration.

---

## 01:31

Restored previous ConfigMap.

```bash
kubectl apply \
-f coredns-backup.yaml
```

---

## 01:34

Restarted CoreDNS.

```bash
kubectl rollout restart \
deployment/coredns \
-n kube-system
```

---

## 01:40

DNS resolution successful.

---

## 01:47

Business validation completed.

Incident closed.

---

# 8. Commands Executed

Cluster

```bash
kubectl get nodes
```

CoreDNS

```bash
kubectl get pods \
-n kube-system

kubectl logs \
deployment/coredns \
-n kube-system

kubectl rollout restart \
deployment/coredns \
-n kube-system
```

DNS

```bash
kubectl exec \
-it api-gateway-pod \
-- nslookup auth-service

kubectl exec \
-it api-gateway-pod \
-- dig auth-service
```

Configuration

```bash
kubectl describe configmap coredns \
-n kube-system
```

Events

```bash
kubectl get events \
--sort-by=.metadata.creationTimestamp
```

---

# 9. Findings

Infrastructure

Healthy

Worker Nodes

Healthy

Pods

Healthy

Services

Healthy

CoreDNS

Configuration failure

Root Issue

Invalid CoreDNS ConfigMap

---

# 10. Root Cause

A manual update introduced an invalid CoreDNS Corefile configuration.

CoreDNS failed to load the configuration and repeatedly crashed.

Without CoreDNS, Kubernetes service discovery stopped functioning.

---

# 11. Resolution

Restored validated CoreDNS configuration.

Restarted CoreDNS deployment.

Verified DNS resolution.

Validated application communication.

---

# 12. Validation

DNS

```bash
kubectl exec \
-it api-gateway-pod \
-- nslookup auth-service
```

Business

- Login successful
- Internal APIs reachable
- Dashboard available
- Service discovery restored

Monitoring

- DNS alerts cleared
- CoreDNS healthy
- HTTP 500 errors disappeared

---

# 13. Rollback

Restore previous CoreDNS ConfigMap.

```bash
kubectl apply \
-f coredns-backup.yaml
```

Restart deployment.

```bash
kubectl rollout restart \
deployment/coredns \
-n kube-system
```

Validate DNS.

---

# 14. Customer Communication

Initial Update

> We are investigating an internal networking issue affecting platform availability.

Progress Update

> Root cause has been identified within the Kubernetes DNS configuration. Recovery is underway.

Resolution

> Internal service communication has been restored successfully. Monitoring continues.

---

# 15. Incident Timeline

```
01:05

Alert

↓

01:12

DNS Failure Confirmed

↓

01:15

CoreDNS Investigation

↓

01:22

Configuration Review

↓

01:27

Root Cause

↓

01:31

Configuration Restored

↓

01:34

CoreDNS Restarted

↓

01:40

DNS Restored

↓

01:47

Incident Closed
```

---

# 16. Root Cause Analysis (RCA)

## What Happened?

Internal DNS stopped resolving Kubernetes Services.

## Why?

Invalid CoreDNS configuration.

## Why wasn't it detected?

Configuration changes bypassed automated validation.

## Customer Impact

Application communication failed.

## Preventive Action

Validate CoreDNS configuration before deployment.

---

# 17. Preventive Actions

- GitOps management for CoreDNS.
- Automated Corefile validation.
- Restrict manual edits.
- Monitor DNS latency.
- Alert on CoreDNS restarts.
- Backup CoreDNS configuration before changes.

---

# 18. Production Best Practices

- Never edit CoreDNS directly in production.
- Use GitOps for DNS configuration.
- Validate Corefile syntax before deployment.
- Test DNS from application Pods.
- Monitor CoreDNS continuously.
- Keep rollback configuration ready.

---

# 19. Production Support Interview Questions

## Q1. Applications are Running but cannot communicate internally. What do you investigate?

### Answer

1. Verify Pods.
2. Verify Services.
3. Test DNS resolution.
4. Check CoreDNS.
5. Review CoreDNS logs.
6. Validate CoreDNS ConfigMap.
7. Restore DNS.
8. Validate business functionality.

---

## Q2. Which command confirms Kubernetes DNS problems?

### Answer

```bash
kubectl exec \
-it <pod> \
-- nslookup <service-name>
```

or

```bash
kubectl exec \
-it <pod> \
-- dig <service-name>
```

---

## Q3. Why can all Pods be Running while the application still fails?

### Answer

Because service discovery depends on CoreDNS. Pods can be healthy, but if DNS resolution fails, applications cannot communicate with each other.

---

# 20. Marathi Quick Revision

- Pods तपासा.
- Services तपासा.
- nslookup करा.
- CoreDNS Pods तपासा.
- CoreDNS logs पहा.
- ConfigMap verify करा.
- Root Cause शोधा.
- DNS restore करा.
- Business validation करा.
- RCA तयार करा.

---

# 21. Marathi Summary (5+ Experience Revision)

## Interview Summary

Production मध्ये DNS resolution failure आल्यास प्रथम Pods आणि Services verify करावेत. त्यानंतर `nslookup` किंवा `dig` वापरून DNS resolution तपासावी. CoreDNS Pods, logs आणि ConfigMap verify करून Root Cause शोधावा. योग्य configuration restore करून CoreDNS restart करावा. शेवटी business validation, monitoring validation आणि RCA पूर्ण करावी.

### Production Investigation Flow

```
Alert

↓

Pods

↓

Services

↓

DNS Test

↓

CoreDNS

↓

Logs

↓

ConfigMap

↓

Root Cause

↓

Fix

↓

Business Validation

↓

RCA
```

### Production Story

एका production healthcare platform मध्ये सर्व application Pods Running होते, पण API Gateway ला Auth Service resolve होत नव्हती. `nslookup auth-service` ने `no such host` error दिला. Investigation मध्ये CoreDNS CrashLoopBackOff मध्ये असल्याचे दिसले. मागील maintenance दरम्यान CoreDNS ConfigMap मध्ये चुकीचा Corefile commit झाला होता. Backup configuration restore करून CoreDNS restart केल्यानंतर काही मिनिटांत सर्व services पुन्हा communicate करू लागल्या. Incident नंतर CoreDNS configuration GitOps द्वारे manage करण्याचा निर्णय घेण्यात आला.

### 5+ Years Memory Trick

Interview मध्ये जर विचारले,

**"How do you troubleshoot a Kubernetes DNS resolution failure in production?"**

उत्तर:

"I first verify that Pods and Services are healthy, test DNS resolution using `nslookup` or `dig`, inspect CoreDNS Pods, logs and configuration, identify the configuration or infrastructure issue, restore DNS functionality, validate business communication between services, monitor stability, and complete the RCA."

