# Kubernetes Networking

# 1. Purpose

The purpose of Kubernetes Networking is to enable communication between Pods, Services, Nodes and external clients.

Kubernetes networking provides a flat network where every Pod can communicate with every other Pod without NAT.

Networking is one of the most important concepts in Kubernetes because every application depends on it.

Without networking,

Applications cannot communicate.

---

# 2. Introduction

Imagine our Enterprise DevOps Platform.

```
Frontend

↓

API Gateway

↓

Auth Service

↓

Dashboard Service
```

Question

How do these Pods communicate?

Answer

```
Kubernetes Networking
```

Example

```
Frontend Pod

↓

Service

↓

API Gateway Pod

↓

Service

↓

Auth Pod
```

---

# 3. Enterprise Usage

Kubernetes Networking is used in

- AWS EKS
- Azure AKS
- Google GKE
- OpenShift
- Rancher
- On-Prem Kubernetes

Every Production Kubernetes Cluster requires a networking solution.

Common CNI Plugins

- Calico
- Cilium
- Flannel
- Weave Net
- Amazon VPC CNI
- Azure CNI

---

# 4. Usage in THIS Project

Enterprise DevOps Platform

```
React Frontend

↓

API Gateway

↓

Authentication Service

↓

Dashboard Service

↓

Database
```

All communication will occur over the Kubernetes network.

---

# 5. Architecture

```
                Internet

                    │

                    ▼

               LoadBalancer

                    │

                    ▼

                 Ingress

                    │

                    ▼

                 Service

                    │

                    ▼

        ┌───────────┼───────────┐

        ▼           ▼           ▼

      Pod-1       Pod-2       Pod-3

                    │

                    ▼

              Pod-to-Pod Network

                    │

                    ▼

               Worker Nodes

                    │

                    ▼

               CNI Plugin
```

---

# 6. Internal Workflow

```
Client Request

↓

Ingress

↓

Service

↓

Pod

↓

Application

↓

Response

↓

Client
```

For Internal Communication

```
Pod

↓

Cluster DNS

↓

Service

↓

Target Pod
```

---

# 7. Kubernetes Networking Model

Kubernetes follows four fundamental networking rules.

---

## Rule 1

Every Pod receives

```
One Unique IP Address
```

Example

```
Frontend Pod

↓

10.244.1.10
```

---

## Rule 2

Pods communicate directly.

```
Pod A

↓

Pod B

No NAT
```

---

## Rule 3

Nodes communicate without NAT.

---

## Rule 4

Applications should communicate through Services instead of Pod IPs.

---

# 8. Components of Kubernetes Networking

Major components

- Pod Network
- Service Network
- Cluster DNS
- CNI Plugin
- Ingress
- Network Policies

---

# 9. Why Kubernetes Networking?

Without Kubernetes Networking

```
Frontend

×

API Gateway

×

Auth Service
```

Applications become isolated.

With Kubernetes Networking

```
Frontend

↓

API Gateway

↓

Auth

↓

Dashboard
```

Applications communicate seamlessly.

---

# 10. Daily DevOps Activities

- Investigate Network Failures
- Verify Pod Connectivity
- Troubleshoot DNS Issues
- Check Service Endpoints
- Verify Network Policies
- Monitor CNI Health

---

# 11. Production Best Practices

- Use Services instead of Pod IPs.
- Use Network Policies.
- Monitor CNI Plugin.
- Enable DNS Monitoring.
- Use Ingress for HTTP Traffic.
- Use Dedicated CIDR Planning.

---

# 12. Security

- Apply Network Policies.
- Restrict Cross-Namespace Traffic.
- Encrypt External Traffic using TLS.
- Monitor East-West Traffic.
- Audit Network Rules.

---

# 13. Troubleshooting

Check Pods

```bash
kubectl get pods -o wide
```

Check Services

```bash
kubectl get svc
```

Check Endpoints

```bash
kubectl get endpoints
```

Check DNS

```bash
kubectl exec -it <pod-name> -- nslookup kubernetes.default
```

Describe Service

```bash
kubectl describe svc <service-name>
```

---

# 14. Real Production Scenarios

## Scenario 1

### Frontend Cannot Reach API

Symptoms

```
Frontend

↓

Timeout
```

Investigation

```
Service

↓

Endpoints

↓

DNS

↓

Network Policy
```

Root Cause

Service selector mismatch.

Resolution

Updated selector labels.

---

## Scenario 2

### DNS Failure

Pods could not resolve

```
api-gateway.default.svc.cluster.local
```

Root Cause

CoreDNS Pods unhealthy.

Resolution

Restarted CoreDNS.

---

## Scenario 3

### Pod Communication Blocked

Application failed.

Root Cause

Network Policy blocked traffic.

Resolution

Updated Network Policy.

---

# 15. Scenario Interview Questions

Q1. What is Kubernetes Networking?

Answer

It is the networking model that enables communication between Pods, Services and external clients.

---

Q2. Does every Pod get its own IP?

Answer

Yes.

Every Pod receives a unique IP address.

---

Q3. Should applications communicate using Pod IPs?

Answer

No.

Applications should communicate using Kubernetes Services.

---

Q4. What provides networking in Kubernetes?

Answer

CNI Plugins such as Calico, Cilium, Flannel or Amazon VPC CNI.

---

# 16. Architecture Interview Questions

Explain Kubernetes Networking.

```
Client

↓

Ingress

↓

Service

↓

Pod

↓

Application
```

---

Q2.

Why should Services be used instead of Pod IPs?

Answer

Because Pod IPs change whenever Pods are recreated, while Services provide stable endpoints.

---

# 17. Production Support Interview Questions

Production Investigation Flow

```
Application Failure

↓

Pod

↓

Service

↓

Endpoints

↓

DNS

↓

Network Policy

↓

CNI Plugin

↓

Resolved
```

Manager Question

"Our Frontend cannot communicate with the API."

Expected Answer

- Verify Pod Status
- Verify Service
- Verify Endpoints
- Check DNS Resolution
- Review Network Policies
- Verify CNI Plugin

---

# 18. Related Runbooks

- pod-network-failure.md
- service-connectivity.md
- coredns-failure.md

---

# 19. Common Incidents

- DNS Failure
- Service Selector Mismatch
- Endpoint Missing
- CNI Failure
- Network Policy Blocked
- Pod Communication Failure

---

# 20. Commands

```bash
kubectl get pods -o wide

kubectl get svc

kubectl get endpoints

kubectl describe svc <service-name>

kubectl exec -it <pod-name> -- nslookup kubernetes.default

kubectl get networkpolicies
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

Explanation

```
selector
```

Matches Pods using Labels.

```
port
```

Service Port exposed inside the Cluster.

```
targetPort
```

Container Port receiving traffic.

Communication Flow

```
Frontend Pod

↓

Service DNS

↓

ClusterIP

↓

Target Pod

↓

Response
```

Applications should always communicate through the Service instead of directly using Pod IP addresses.

---

# 22. Marathi Quick Revision

- Kubernetes Networking सर्व Pods ला जोडते.
- प्रत्येक Pod ला Unique IP मिळतो.
- Pod-to-Pod Communication NAT शिवाय होते.
- Applications ने Pod IP ऐवजी Service वापरावी.
- Networking CNI Plugin द्वारे उपलब्ध होते.

---

# 23. Marathi Summary (5+ Years Experience Revision)

## Interview Summary

Kubernetes Networking हे Pods, Services, Nodes आणि बाहेरील Clients यांच्यातील Communication Framework आहे.

प्रत्येक Pod ला स्वतंत्र IP Address मिळतो.

Applications ने नेहमी Services वापरून Communication करावे कारण Pod IP बदलू शकतो.

Production मध्ये Calico, Cilium किंवा Cloud Provider CNI Plugin वापरले जातात.

## Production Investigation Flow

```
Application Failure

↓

Pod

↓

Service

↓

Endpoints

↓

DNS

↓

Network Policy

↓

CNI

↓

Resolved
```

## Production Story

Production EKS Cluster मध्ये Frontend API Gateway शी Connect होत नव्हते.

Frontend Pods Healthy होते पण Requests Timeout होत होत्या.

Investigation मध्ये Service Selector चुकीचा असल्यामुळे Endpoints तयार झाले नव्हते.

Selector Labels दुरुस्त केल्यानंतर Endpoints तयार झाले आणि सर्व Applications पुन्हा एकमेकांशी यशस्वीपणे Communicate करू लागले.

## Memory Trick

**Pod**

↓

**Service**

↓

**DNS**

↓

**Network**

↓

**Application**

Remember

**Every Pod Has IP**

**Applications Use Services**

