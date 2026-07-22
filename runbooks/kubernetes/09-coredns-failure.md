# Kubernetes Runbook 09 - CoreDNS Failure

# 1. Purpose

This runbook explains how to investigate and recover CoreDNS failures in a Kubernetes cluster.

CoreDNS is responsible for service discovery inside the cluster. If it becomes unavailable, microservices may fail to communicate even though all Pods are healthy.

The objective is to restore DNS resolution quickly, minimize application downtime, and document the Root Cause Analysis (RCA).

---

# 2. Scope

Applicable to

- CoreDNS
- kube-dns
- Internal Service Discovery
- Production Clusters
- Staging Clusters

Platforms

- Kind
- EKS
- AKS
- GKE
- OpenShift
- On-Prem Kubernetes

---

# 3. Symptoms

Users may report

- Login failures
- APIs timing out
- Dashboard unavailable
- Random communication failures between services

Monitoring may report

- DNS resolution failures
- Increased application latency
- Health check failures
- Service unavailable alerts

Example

```
Frontend

↓

API Gateway

↓

DNS Failure

↓

Authentication Service
```

---

# 4. Business Impact

Critical

- Complete microservice communication failure
- Authentication unavailable
- Customer outage

Medium

- One namespace affected
- Partial service degradation

Low

- Internal applications affected

---

# 5. Possible Root Causes

- CoreDNS Pods crashed
- CoreDNS Pods Pending
- Incorrect CoreDNS ConfigMap
- Worker Node failure
- CNI networking issue
- kube-proxy issue
- Resource exhaustion
- Upstream DNS unavailable
- NetworkPolicy blocking DNS
- Node DNS configuration issue

---

# 6. Prerequisites

Required

- kubectl
- kube-system namespace access
- Node access
- Cluster administrator privileges

Verify

```bash
kubectl auth can-i get pods -n kube-system

kubectl auth can-i get configmap -n kube-system
```

---

# 7. Initial Investigation

## Step 1

Verify CoreDNS Pods

```bash
kubectl get pods -n kube-system
```

Expected

```
coredns-xxxxx

Running
```

---

## Step 2

Describe Pod

```bash
kubectl describe pod <coredns-pod> \
-n kube-system
```

Review

- Events
- Restart Count
- Scheduling
- Resource usage

---

## Step 3

Verify DNS Resolution

From any application Pod

```bash
kubectl exec -it <pod> -- nslookup kubernetes.default
```

Expected

```
Server:

Name:

Address:
```

---

# 8. Detailed Investigation

## Step 1

Review CoreDNS Logs

```bash
kubectl logs <coredns-pod> \
-n kube-system
```

Look for

- plugin errors
- upstream failures
- timeout errors
- configuration issues

---

## Step 2

Verify Deployment

```bash
kubectl describe deployment coredns \
-n kube-system
```

Review

- Replica count
- Image
- Events
- Conditions

---

## Step 3

Verify ConfigMap

```bash
kubectl get configmap coredns \
-n kube-system

kubectl describe configmap coredns \
-n kube-system
```

Review Corefile configuration.

---

## Step 4

Verify Service

```bash
kubectl get svc \
-n kube-system
```

Expected

```
kube-dns
```

---

## Step 5

Verify Endpoints

```bash
kubectl get endpoints kube-dns \
-n kube-system
```

Endpoints must exist.

---

## Step 6

Verify Resources

```bash
kubectl top pod \
-n kube-system
```

Review

- CPU
- Memory

---

## Step 7

Verify Networking

From a Pod

```bash
kubectl exec -it <pod> -- ping <coredns-ip>
```

Verify

- CNI
- kube-proxy
- NetworkPolicy

---

## Step 8

Verify Upstream DNS

Check

```
/etc/resolv.conf
```

inside CoreDNS Pods if upstream resolution is failing.

---

# 9. Resolution Steps

Depending on findings

CoreDNS Crash

Recover Deployment.

ConfigMap Error

Restore previous CoreDNS configuration.

Resource Issue

Increase CPU or Memory.

Node Failure

Recover worker node.

Network Issue

Restore CNI or kube-proxy.

Upstream DNS

Correct upstream resolver configuration.

---

# 10. Validation Steps

Verify

```bash
kubectl get pods -n kube-system

kubectl get svc -n kube-system
```

Test

```bash
kubectl exec -it <pod> -- nslookup kubernetes.default

kubectl exec -it <pod> -- nslookup api-gateway
```

Business Validation

- Login
- APIs
- Dashboard
- Internal service communication

---

# 11. Rollback Procedure

If DNS failed after a configuration change

Restore previous ConfigMap

```bash
kubectl apply -f previous-coredns-config.yaml
```

Restart Deployment

```bash
kubectl rollout restart deployment coredns \
-n kube-system
```

Validate DNS resolution.

---

# 12. Escalation Matrix

L1

- Verify CoreDNS Pods
- Verify DNS resolution

↓

L2

- Review Logs
- Review ConfigMap

↓

Platform Team

- Kubernetes Networking
- CoreDNS

↓

Infrastructure Team

- Network
- DNS
- Firewall

---

# 13. Production Best Practices

- Run multiple CoreDNS replicas.
- Monitor DNS latency.
- Alert on CoreDNS restart count.
- Backup CoreDNS ConfigMap.
- Monitor resource utilization.
- Validate DNS after cluster upgrades.
- Avoid unnecessary CoreDNS configuration changes.

---

# 14. Real Production Scenario

A production banking application suddenly experienced intermittent login failures.

Application Pods were healthy.

Investigation

```bash
kubectl exec -it api-gateway -- nslookup auth-service
```

failed.

Further investigation showed CoreDNS Pods were repeatedly restarting due to an invalid Corefile configuration introduced during maintenance.

The previous ConfigMap was restored and CoreDNS restarted.

DNS resolution recovered immediately.

Root Cause

Incorrect CoreDNS configuration.

---

# 15. Scenario Interview Questions

## Q1. Applications cannot resolve service names. What is your first step?

### Answer

Verify CoreDNS Pods

```bash
kubectl get pods -n kube-system
```

Then test

```bash
kubectl exec -it <pod> -- nslookup kubernetes.default
```

---

## Q2. Which command helps determine whether DNS itself is failing?

### Answer

```bash
kubectl exec -it <pod> -- nslookup <service-name>
```

If name resolution fails while Pods are healthy, investigate CoreDNS.

---

## Q3. Can healthy Pods still fail to communicate?

### Answer

Yes.

If DNS resolution fails, healthy Pods cannot locate backend Services.

---

# 16. Architecture Interview Questions

## Q1. Explain Kubernetes DNS architecture.

### Answer

```
Application Pod

↓

DNS Query

↓

CoreDNS Service

↓

CoreDNS Pods

↓

API Server

↓

Service Records

↓

Resolved IP

↓

Backend Service
```

---

## Q2. Which Kubernetes components participate?

### Answer

- CoreDNS
- kube-dns Service
- API Server
- kube-proxy
- CNI
- Pods

---

# 17. Production Support Interview Questions

## Q1. Internal communication suddenly fails across multiple microservices. How do you investigate?

### Answer

Commands

```bash
kubectl get pods -n kube-system

kubectl logs <coredns-pod> -n kube-system

kubectl exec -it <pod> -- nslookup kubernetes.default

kubectl get endpoints kube-dns -n kube-system

kubectl describe deployment coredns -n kube-system
```

Verify

- CoreDNS Pods
- Logs
- ConfigMap
- Networking
- Resource usage

---

## Q2. Why is CoreDNS considered a critical production component?

### Answer

Almost every Kubernetes application depends on internal DNS for service discovery.

If CoreDNS becomes unavailable, healthy applications may still become unreachable because they cannot resolve Service names.

---

# 18. Commands Reference

```bash
kubectl get pods -n kube-system

kubectl describe pod <coredns-pod> -n kube-system

kubectl logs <coredns-pod> -n kube-system

kubectl describe deployment coredns -n kube-system

kubectl get configmap coredns -n kube-system

kubectl describe configmap coredns -n kube-system

kubectl get svc -n kube-system

kubectl get endpoints kube-dns -n kube-system

kubectl exec -it <pod> -- nslookup kubernetes.default

kubectl rollout restart deployment coredns -n kube-system
```

---

# 19. Marathi Quick Revision

- CoreDNS Pods तपासा.
- Logs तपासा.
- nslookup वापरून DNS verify करा.
- ConfigMap तपासा.
- kube-dns Service आणि Endpoints verify करा.
- Resource usage तपासा.
- Root Cause सापडल्यानंतरच restart करा.

---

# 20. Related Runbooks

- 07-service-not-reachable.md
- 08-ingress-not-working.md
- 17-api-server-unreachable.md
- 19-cluster-disaster-recovery.md

---

# 21. Marathi Summary (5+ Experience Revision)

## Interview Summary

CoreDNS fail झाल्यास Kubernetes मधील service discovery बंद होते. त्यामुळे Pods Running असले तरी applications एकमेकांशी communicate करू शकत नाहीत. Production मध्ये प्रथम CoreDNS Pods, logs, ConfigMap आणि `nslookup` वापरून DNS resolution verify करावी. त्यानंतर kube-dns Service, Endpoints आणि networking तपासून Root Cause निश्चित करावा.

### Production Investigation Flow

```
Alert

↓

CoreDNS Pods

↓

Logs

↓

nslookup

↓

ConfigMap

↓

kube-dns Service

↓

Endpoints

↓

Networking

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

एका production insurance platform मध्ये सर्व microservices अचानक timeout देऊ लागल्या. सुरुवातीला application bug असल्याचा संशय होता, पण `kubectl exec -- nslookup auth-service` fail झाले. CoreDNS ConfigMap मध्ये चुकीचा upstream DNS server configure झालेला होता. Previous ConfigMap restore करून CoreDNS restart केल्यावर सर्व services काही सेकंदांत पुन्हा communicate करू लागल्या. Incident नंतर CoreDNS configuration changes साठी mandatory peer review लागू करण्यात आला.

### 5+ Years Memory Trick

Interview मध्ये जर विचारले,

**"How do you troubleshoot a CoreDNS failure in production?"**

उत्तर:

"I verify CoreDNS Pods, inspect their logs, test DNS resolution using `nslookup` from an application Pod, review the CoreDNS ConfigMap, validate the kube-dns Service and Endpoints, and then investigate networking if required. After restoring DNS, I validate application communication and document the RCA."

