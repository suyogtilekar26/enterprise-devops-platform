# Kubernetes CoreDNS

# 1. Purpose

The purpose of CoreDNS is to provide DNS-based service discovery inside the Kubernetes Cluster.

CoreDNS allows Pods to communicate using Service Names instead of Pod IP addresses.

Since Pod IP addresses change frequently, DNS provides a stable way for applications to locate each other.

Without CoreDNS,

applications would need to know changing Pod IP addresses.

---

# 2. Introduction

Imagine our Enterprise DevOps Platform.

```
Frontend

↓

Needs API Gateway
```

Question

Should the Frontend use

```
10.244.1.15
```

No.

Because Pod IP changes.

Instead,

Frontend uses

```
api-gateway.default.svc.cluster.local
```

CoreDNS resolves the name into the correct Service IP.

---

# 3. Enterprise Usage

CoreDNS is used in every Kubernetes Distribution.

Examples

- AWS EKS
- Azure AKS
- Google GKE
- OpenShift
- Rancher
- On-Prem Kubernetes

Every Production Kubernetes application depends on CoreDNS.

---

# 4. Usage in THIS Project

Enterprise DevOps Platform

```
Frontend

↓

api-gateway.default.svc.cluster.local

↓

API Gateway

↓

auth-service.default.svc.cluster.local

↓

Auth Service

↓

dashboard-service.default.svc.cluster.local

↓

Dashboard Service
```

Every microservice communicates using Kubernetes DNS names.

---

# 5. Architecture

```
              Frontend Pod

                    │

                    ▼

             DNS Query

                    │

                    ▼

               CoreDNS

                    │

                    ▼

               Kubernetes API

                    │

                    ▼

             Service ClusterIP

                    │

                    ▼

                 Target Pod
```

---

# 6. Internal Workflow

```
Application

↓

DNS Request

↓

CoreDNS

↓

Lookup Service

↓

ClusterIP

↓

Service

↓

Pod

↓

Response
```

---

# 7. What is CoreDNS?

CoreDNS is the DNS Server running inside Kubernetes.

It provides

- Service Discovery
- DNS Resolution
- Internal Name Resolution

Applications communicate using

```
Service Names

NOT

Pod IPs
```

---

# 8. Kubernetes DNS Naming Convention

Example

```
api-gateway.default.svc.cluster.local
```

Breakdown

```
api-gateway

↓

Service Name

-----------------------

default

↓

Namespace

-----------------------

svc

↓

Service

-----------------------

cluster.local

↓

Cluster Domain
```

---

# 9. Why CoreDNS?

Without CoreDNS

```
Frontend

↓

Hardcoded Pod IP

↓

Pod Restart

↓

IP Changes

↓

Application Failure
```

With CoreDNS

```
Frontend

↓

DNS Name

↓

CoreDNS

↓

Current Service IP

↓

Application Works
```

---

# 10. Daily DevOps Activities

- Monitor CoreDNS Pods
- Troubleshoot DNS Failures
- Verify Service Resolution
- Check DNS Latency
- Monitor CoreDNS Logs
- Verify Cluster DNS

---

# 11. Production Best Practices

- Run multiple CoreDNS replicas.
- Monitor DNS latency.
- Use Services instead of Pod IPs.
- Keep CoreDNS updated.
- Monitor DNS errors.
- Protect CoreDNS from resource exhaustion.

---

# 12. Security

- Restrict DNS access if required.
- Monitor DNS traffic.
- Protect CoreDNS Pods.
- Audit DNS configuration.
- Secure Cluster DNS.

---

# 13. Troubleshooting

Check CoreDNS Pods

```bash
kubectl get pods -n kube-system
```

Describe CoreDNS

```bash
kubectl describe deployment coredns -n kube-system
```

Check DNS Resolution

```bash
kubectl exec -it <pod-name> -- nslookup kubernetes.default
```

Check Service

```bash
kubectl get svc
```

View Logs

```bash
kubectl logs -n kube-system -l k8s-app=kube-dns
```

---

# 14. Real Production Scenarios

## Scenario 1

### Frontend Cannot Reach API

Symptoms

```
DNS Lookup Failed
```

Investigation

```
CoreDNS Pods

↓

Logs

↓

Service

↓

Endpoints
```

Root Cause

CoreDNS Pods crashed.

Resolution

Restarted CoreDNS.

---

## Scenario 2

### Slow Application

Symptoms

```
High Response Time
```

Root Cause

DNS resolution latency.

Resolution

Scaled CoreDNS replicas.

---

## Scenario 3

### Service Not Found

Application attempted

```
auth-service.production.svc.cluster.local
```

Actual Namespace

```
default
```

Resolution

Corrected DNS Name.

---

# 15. Scenario Interview Questions

Q1. What is CoreDNS?

Answer

CoreDNS is the DNS Server used by Kubernetes for internal service discovery.

---

Q2. Why should applications use Service Names instead of Pod IPs?

Answer

Because Pod IPs change whenever Pods are recreated, while Service DNS names remain stable.

---

Q3. Where does CoreDNS get Service information?

Answer

CoreDNS watches the Kubernetes API Server for Services and Endpoints.

---

Q4. What is the default Kubernetes cluster domain?

Answer

```
cluster.local
```

---

# 16. Architecture Interview Questions

Explain DNS Resolution.

```
Application

↓

CoreDNS

↓

Service

↓

ClusterIP

↓

Target Pod
```

---

Q2.

What happens if CoreDNS fails?

Answer

Applications may fail to resolve Service Names, causing communication failures between services.

---

# 17. Production Support Interview Questions

Production Investigation Flow

```
Application Failure

↓

nslookup

↓

CoreDNS Pods

↓

Service

↓

Endpoints

↓

Logs

↓

Resolved
```

Manager Question

"Our Frontend cannot resolve the API Service."

Expected Answer

- Verify CoreDNS Pods
- Test nslookup
- Check Service
- Verify Endpoints
- Review CoreDNS Logs
- Restart CoreDNS if required

---

# 18. Related Runbooks

- coredns-crash.md
- dns-resolution-failure.md
- service-name-not-found.md

---

# 19. Common Incidents

- CoreDNS CrashLoopBackOff
- DNS Resolution Failure
- High DNS Latency
- Incorrect Service Name
- Missing Service Endpoints

---

# 20. Commands

```bash
kubectl get pods -n kube-system

kubectl describe deployment coredns -n kube-system

kubectl exec -it <pod-name> -- nslookup kubernetes.default

kubectl get svc

kubectl get endpoints

kubectl logs -n kube-system -l k8s-app=kube-dns
```

---

# 21. YAML Deep Dive

Example Service

```yaml
apiVersion: v1
kind: Service

metadata:
  name: api-gateway

spec:
  selector:
    app: api-gateway

  ports:
  - port: 80
    targetPort: 8080
```

DNS Name Generated

```
api-gateway.default.svc.cluster.local
```

Resolution Flow

```
Frontend

↓

DNS Query

↓

CoreDNS

↓

API Server

↓

Service

↓

ClusterIP

↓

API Gateway Pod
```

CoreDNS resolves the Service Name to the Service's ClusterIP, after which Kubernetes forwards traffic to one of the matching Pods.

---

# 22. Marathi Quick Revision

- CoreDNS म्हणजे Kubernetes चा DNS Server.
- Applications ने Pod IP ऐवजी Service Name वापरावा.
- CoreDNS Service Name ला ClusterIP मध्ये Resolve करतो.
- प्रत्येक Kubernetes Cluster मध्ये CoreDNS असतो.
- DNS Fail झाल्यास Microservices एकमेकांशी बोलू शकत नाहीत.

---

# 23. Marathi Summary (5+ Years Experience Revision)

## Interview Summary

CoreDNS हा Kubernetes मधील Internal DNS Server आहे.

तो Services साठी DNS Resolution आणि Service Discovery उपलब्ध करून देतो.

Applications ने नेहमी Service Name वापरावा कारण Pod IP बदलू शकतो.

Production मध्ये CoreDNS ची High Availability आणि Monitoring अत्यंत महत्त्वाची असते.

## Production Investigation Flow

```
Application Error

↓

nslookup

↓

CoreDNS

↓

Service

↓

Endpoints

↓

Logs

↓

Resolved
```

## Production Story

Production AKS Cluster मध्ये Frontend ला API Gateway Resolve होत नव्हता.

`nslookup api-gateway.default.svc.cluster.local` Fail होत होता.

Investigation मध्ये CoreDNS Pods CrashLoopBackOff मध्ये असल्याचे आढळले.

CoreDNS Deployment Restart करून आणि Resource Limits वाढवल्यानंतर DNS Resolution पुन्हा सुरू झाली आणि सर्व Microservices Normal झाल्या.

## Memory Trick

**Pod IP Changes**

↓

**Service Stays**

↓

**CoreDNS Resolves**

↓

**Application Connects**

Remember

**Application → CoreDNS → Service → Pod**

