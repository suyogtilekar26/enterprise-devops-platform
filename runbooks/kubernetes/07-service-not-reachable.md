# Kubernetes Runbook 07 - Service Not Reachable

# 1. Purpose

This runbook explains how to investigate and recover Kubernetes Services that are not reachable from inside or outside the cluster.

The objective is to restore application connectivity while identifying the exact networking failure and documenting the Root Cause Analysis (RCA).

---

# 2. Scope

Applicable to

- ClusterIP Services
- NodePort Services
- LoadBalancer Services
- ExternalName Services
- Internal Service Communication
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

- Application unavailable
- Login page not loading
- API timeout
- 503 Service Unavailable
- Internal microservice communication failure

Monitoring may report

- Endpoint unavailable
- Health check failures
- Service latency increase
- HTTP 5xx errors

Example

```
Frontend

↓

API Gateway

↓

Timeout
```

---

# 4. Business Impact

Critical

- Complete application outage
- Customer login unavailable
- Payment failures

Medium

- One microservice unavailable
- Dashboard inaccessible

Low

- Internal communication issue

---

# 5. Possible Root Causes

- Service selector mismatch
- Pods not Ready
- No Endpoints
- Wrong targetPort
- Wrong port
- NetworkPolicy
- DNS failure
- Pod crash
- Endpoint controller delay
- kube-proxy issue
- CNI issue
- Ingress issue

---

# 6. Prerequisites

Required

- kubectl
- Namespace access
- Service access
- Pod access

Verify

```bash
kubectl auth can-i get svc

kubectl auth can-i get endpoints

kubectl auth can-i get pods
```

---

# 7. Initial Investigation

## Step 1

Verify Service

```bash
kubectl get svc -A
```

Example

```
NAME

api-gateway
```

---

## Step 2

Describe Service

```bash
kubectl describe svc api-gateway \
-n enterprise-devops
```

Review

- Selector
- Port
- TargetPort
- Endpoints

---

## Step 3

Verify Endpoints

```bash
kubectl get endpoints \
-n enterprise-devops
```

Example

```
api-gateway
```

If Endpoints are

```
<none>
```

the Service cannot route traffic.

---

# 8. Detailed Investigation

## Step 1

Verify Pods

```bash
kubectl get pods \
-n enterprise-devops \
-o wide
```

Pods should be

```
Running
```

---

## Step 2

Verify Labels

```bash
kubectl get pods \
--show-labels \
-n enterprise-devops
```

Compare labels with

```bash
kubectl describe svc api-gateway
```

Service selector must match Pod labels exactly.

---

## Step 3

Verify Endpoint Objects

```bash
kubectl describe endpoints api-gateway \
-n enterprise-devops
```

Expected

```
IP addresses
```

If empty

Investigate

- Labels
- Readiness
- Pod health

---

## Step 4

Verify Readiness

```bash
kubectl get pods
```

Pods must be

```
READY

1/1
```

Pods failing readiness probes are removed from Service endpoints.

---

## Step 5

Verify Service Ports

Check

```
Port

TargetPort
```

Example

```
Service Port

80

↓

TargetPort

8080
```

---

## Step 6

Verify DNS

Inside cluster

```bash
kubectl exec -it <pod> -- nslookup api-gateway
```

or

```bash
kubectl exec -it <pod> -- curl http://api-gateway:8080/health
```

---

## Step 7

Verify NetworkPolicy

```bash
kubectl get networkpolicy

kubectl describe networkpolicy
```

---

## Step 8

Verify kube-proxy

Worker node

```bash
kubectl get pods -n kube-system
```

Check

```
kube-proxy
```

---

## Step 9

Verify CNI

Check

- Calico
- Cilium
- Flannel
- Weave

Ensure networking components are healthy.

---

# 9. Resolution Steps

Depending on findings

Wrong Selector

Update Service selector.

Pods Not Ready

Recover Pods.

Wrong Port

Correct

```
targetPort
```

DNS Failure

Recover CoreDNS.

NetworkPolicy

Update policy.

Pod Crash

Recover application.

---

# 10. Validation Steps

Verify

```bash
kubectl get svc

kubectl get endpoints

kubectl get pods
```

Connectivity

```bash
kubectl exec -it <pod> \
-- curl http://api-gateway:8080/health
```

Business Validation

- Login
- Dashboard
- API
- Monitoring

---

# 11. Rollback Procedure

If Service configuration caused outage

Restore previous manifest

or

```bash
kubectl rollout undo deployment
```

Validate

- Endpoints
- Connectivity
- Business functionality

---

# 12. Escalation Matrix

L1

- Verify Service
- Verify Endpoints

↓

L2

- Verify Pods
- Verify Labels
- Verify Ports

↓

Platform Team

- DNS
- kube-proxy
- CNI

↓

Network Team

- Firewall
- Routing
- Load Balancer

---

# 13. Production Best Practices

- Always verify Service selectors.
- Use readiness probes.
- Monitor Endpoint count.
- Test connectivity after deployments.
- Validate DNS resolution.
- Avoid manual Service edits in production.
- Keep NetworkPolicies documented.

---

# 14. Real Production Scenario

The frontend suddenly could not communicate with the API Gateway.

Investigation

```bash
kubectl get endpoints
```

returned

```
<none>
```

Pods were healthy.

Further investigation showed that a Deployment label had changed during a release, but the Service selector still referenced the old label.

Updating the Service selector immediately restored communication.

Root Cause

Selector mismatch after deployment.

---

# 15. Scenario Interview Questions

## Q1. A Service exists but requests timeout. What is your first step?

### Answer

Verify

```bash
kubectl describe svc

kubectl get endpoints
```

If Endpoints are empty, the Service cannot forward traffic.

---

## Q2. Why can a healthy Pod still receive no traffic?

### Answer

Possible reasons

- Label mismatch
- Readiness failure
- Wrong selector
- NetworkPolicy

Healthy Pods are only added to Service Endpoints after passing readiness checks.

---

## Q3. Which command immediately shows whether a Service has backend Pods?

### Answer

```bash
kubectl get endpoints

kubectl describe endpoints
```

---

# 16. Architecture Interview Questions

## Q1. Explain Service routing architecture.

### Answer

```
Client

↓

Service

↓

Endpoints

↓

Pods

↓

Container
```

Service never communicates directly with Deployments.

It routes traffic through Endpoint objects.

---

## Q2. Which Kubernetes components participate?

### Answer

- API Server
- Service
- Endpoint Controller
- kube-proxy
- CNI
- Pods

---

# 17. Production Support Interview Questions

## Q1. Users cannot access the API although Pods are Running. How do you investigate?

### Answer

Commands

```bash
kubectl get svc

kubectl describe svc

kubectl get endpoints

kubectl describe endpoints

kubectl get pods --show-labels

kubectl exec -it <pod> -- curl http://service:port
```

Verify

- Labels
- Selector
- Readiness
- Ports
- DNS
- NetworkPolicy

---

## Q2. Why are Endpoints more important than Services during troubleshooting?

### Answer

Because Services only define routing rules.

Actual traffic is forwarded only to Pods listed in the Endpoint object.

If Endpoints are empty, the Service cannot deliver requests.

---

# 18. Commands Reference

```bash
kubectl get svc

kubectl describe svc

kubectl get endpoints

kubectl describe endpoints

kubectl get pods --show-labels

kubectl exec -it <pod> -- curl http://service:port

kubectl exec -it <pod> -- nslookup service

kubectl get networkpolicy
```

---

# 19. Marathi Quick Revision

- Service verify करा.
- Endpoints तपासा.
- Labels आणि Selector compare करा.
- Pods Ready आहेत का तपासा.
- targetPort verify करा.
- DNS तपासा.
- NetworkPolicy तपासा.

---

# 20. Related Runbooks

- 01-pod-crashloopbackoff.md
- 03-pod-pending.md
- 08-ingress-not-working.md
- 09-coredns-failure.md
- 16-health-probe-failures.md

---

# 21. Marathi Summary (5+ Experience Revision)

## Interview Summary

Service reachable नसल्यास प्रथम Service नाही तर **Endpoints** तपासावेत. Endpoints रिकामे असल्यास सामान्यतः selector mismatch, readiness failure किंवा Pod labels चुकीचे असतात. त्यानंतर targetPort, DNS, NetworkPolicy आणि kube-proxy तपासावे. Root Cause निश्चित झाल्यावरच configuration बदलावी.

### Production Investigation Flow

```
Alert

↓

Service

↓

Endpoints

↓

Pods

↓

Labels

↓

Selector

↓

Readiness

↓

Ports

↓

DNS

↓

NetworkPolicy

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

एका production microservices platform मध्ये Frontend API Gateway ला connect होत नव्हता. सुरुवातीला Network समस्या असल्याचा संशय होता. `kubectl get endpoints` मध्ये `<none>` दिसले. Deployment मध्ये नवीन label (`app=v2`) वापरले गेले होते, पण Service अजूनही `app=v1` selector वापरत होती. Selector update केल्यानंतर Endpoints तयार झाले आणि application काही सेकंदांत पुन्हा कार्यरत झाली. Incident नंतर deployment pipeline मध्ये Service selector validation check जोडण्यात आला.

### 5+ Years Memory Trick

Interview मध्ये जर विचारले,

**"How do you troubleshoot a Kubernetes Service that is not reachable?"**

उत्तर:

"I first verify the Service and its Endpoints. If the Endpoints are empty, I check Pod labels, Service selectors and readiness probes. Then I validate targetPort, DNS resolution, NetworkPolicies and kube-proxy. After restoring connectivity, I verify business functionality and document the RCA."

