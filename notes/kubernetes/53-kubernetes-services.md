# Kubernetes Services

# 1. Purpose

The purpose of a Kubernetes Service is to provide a stable network endpoint for accessing Pods.

Pods are temporary resources.

Whenever a Pod is recreated,

its IP Address changes.

A Kubernetes Service provides

- Stable IP Address
- Stable DNS Name
- Load Balancing
- Service Discovery

Applications should always communicate through Services instead of Pod IP addresses.

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

Frontend should not communicate directly with Pod IPs.

Wrong

```
10.244.2.18
```

Correct

```
api-gateway.default.svc.cluster.local
```

Service always forwards traffic to healthy Pods.

---

# 3. Enterprise Usage

Every Enterprise Kubernetes application uses Services.

Examples

- AWS EKS
- Azure AKS
- Google GKE
- OpenShift
- Rancher

Services are used for

- Microservices
- APIs
- Internal Communication
- Load Balancing
- Service Discovery

---

# 4. Usage in THIS Project

Enterprise DevOps Platform

```
Internet

↓

Ingress

↓

Frontend Service

↓

Frontend Pods

--------------------

Frontend

↓

API Gateway Service

↓

API Gateway Pods

--------------------

API Gateway

↓

Auth Service

↓

Auth Pods

--------------------

API Gateway

↓

Dashboard Service

↓

Dashboard Pods
```

Every component communicates through Kubernetes Services.

---

# 5. Architecture

```
Client

↓

Ingress

↓

Service

↓

Endpoints

↓

Pod-1

Pod-2

Pod-3
```

---

# 6. Internal Workflow

```
Application Request

↓

Service DNS

↓

ClusterIP

↓

Endpoints

↓

Healthy Pod

↓

Response
```

---

# 7. Why Services?

Without Service

```
Frontend

↓

Pod IP

↓

Pod Restart

↓

IP Changed

↓

Application Failure
```

With Service

```
Frontend

↓

Service

↓

Current Healthy Pod

↓

Application Running
```

---

# 8. Components of Service

Service consists of

- Selector
- Labels
- Endpoints
- ClusterIP
- Ports

Flow

```
Service

↓

Selector

↓

Matching Pods

↓

Endpoints

↓

Traffic Forwarded
```

---

# 9. Types of Kubernetes Services

Kubernetes provides four primary Service types.

### ClusterIP

Default Service Type.

Accessible only inside the Kubernetes Cluster.

Example

```
Frontend

↓

API Gateway
```

Most commonly used.

---

### NodePort

Exposes the Service on every Worker Node.

Example

```
NodeIP:30080
```

Useful for Labs.

Rarely used directly in Production.

---

### LoadBalancer

Creates an external Load Balancer.

Supported by Cloud Providers.

Example

AWS

↓

Application Load Balancer

↓

Service

↓

Pods

---

### ExternalName

Maps the Service to an external DNS Name.

Example

```
database.company.com
```

---

# 10. Daily DevOps Activities

- Verify Service Health
- Check Endpoints
- Troubleshoot Connectivity
- Validate DNS Resolution
- Review Labels
- Monitor Load Balancing

---

# 11. Production Best Practices

- Never use Pod IPs.
- Always use Services.
- Use meaningful Labels.
- Monitor Service Endpoints.
- Remove unused Services.
- Use Ingress for HTTP Applications.

---

# 12. Security

- Use Network Policies.
- Restrict External Exposure.
- Protect LoadBalancer Services.
- Encrypt Traffic using TLS.
- Review Service Access.

---

# 13. Troubleshooting

View Services

```bash
kubectl get svc
```

Describe Service

```bash
kubectl describe svc api-gateway
```

View Endpoints

```bash
kubectl get endpoints
```

View Pods

```bash
kubectl get pods --show-labels
```

Test DNS

```bash
kubectl exec -it frontend-pod -- nslookup api-gateway
```

---

# 14. Real Production Scenarios

## Scenario 1

### Service Has No Endpoints

Symptoms

```
Application Timeout
```

Investigation

```
kubectl get endpoints
```

Result

```
<none>
```

Root Cause

Selector Labels mismatch.

Resolution

Updated Labels.

Endpoints created.

---

## Scenario 2

### Wrong TargetPort

Symptoms

Application unavailable.

Root Cause

Service forwarding traffic to the wrong container port.

Resolution

Corrected targetPort.

---

## Scenario 3

### Pod Restart

Pods recreated.

Pod IP changed.

Applications continued working because communication occurred through the Service.

---

# 15. Scenario Interview Questions

Q1. Why do we need a Kubernetes Service?

Answer

Services provide stable networking and load balancing for Pods.

---

Q2. Why should we never use Pod IPs?

Answer

Pod IPs change whenever Pods are recreated.

---

Q3. Which Service type is most commonly used internally?

Answer

ClusterIP.

---

Q4. Which Service type creates a Cloud Load Balancer?

Answer

LoadBalancer.

---

# 16. Architecture Interview Questions

Explain Service Flow.

```
Application

↓

Service

↓

Endpoints

↓

Pod
```

---

Q2.

Difference between Service and Pod?

Answer

Pod runs the application.

Service provides stable access to Pods.

---

# 17. Production Support Interview Questions

Production Investigation Flow

```
Application Error

↓

Service

↓

Endpoints

↓

Labels

↓

Pods

↓

Logs

↓

Resolved
```

Manager Question

"Our Frontend cannot communicate with the API."

Expected Answer

- Verify Service
- Verify Endpoints
- Check Labels
- Check TargetPort
- Verify Pods
- Test DNS Resolution

---

# 18. Related Runbooks

- service-no-endpoints.md
- service-selector-mismatch.md
- wrong-targetport.md

---

# 19. Common Incidents

- Service without Endpoints
- Wrong Selector
- Wrong TargetPort
- DNS Failure
- LoadBalancer Pending
- Application Timeout

---

# 20. Commands

```bash
kubectl get svc

kubectl describe svc

kubectl get endpoints

kubectl get pods --show-labels

kubectl get endpointslices

kubectl exec -it <pod-name> -- nslookup <service-name>
```

---

# 21. YAML Deep Dive

Example

```yaml
apiVersion: v1
kind: Service

metadata:
  name: api-gateway

spec:
  selector:
    app: api-gateway

  ports:
    - protocol: TCP
      port: 80
      targetPort: 8080

  type: ClusterIP
```

Explanation

```
selector
```

Matches Pods having

```
app=api-gateway
```

```
port
```

Port exposed by the Service.

```
targetPort
```

Container Port.

```
type
```

Defines how the Service is exposed.

Traffic Flow

```
Client

↓

Service

↓

ClusterIP

↓

Endpoints

↓

Healthy Pod
```

---

# 22. Marathi Quick Revision

- Service म्हणजे Pods साठी Stable Network Endpoint.
- Pod IP बदलतो पण Service बदलत नाही.
- ClusterIP सर्वात जास्त वापरला जातो.
- Service Load Balancing करते.
- Applications ने Pod IP ऐवजी Service वापरावी.

---

# 23. Marathi Summary (5+ Years Experience Revision)

## Interview Summary

Kubernetes Service हा Pods साठी Stable Network Layer आहे.

तो Stable IP, DNS Name आणि Load Balancing उपलब्ध करून देतो.

Applications ने नेहमी Service वापरून Communication करावे.

Production मध्ये ClusterIP सर्वाधिक वापरला जातो तर External Access साठी LoadBalancer आणि Ingress वापरले जातात.

## Production Investigation Flow

```
Application Timeout

↓

Service

↓

Endpoints

↓

Labels

↓

Pods

↓

DNS

↓

Resolved
```

## Production Story

Production EKS Cluster मध्ये Frontend ला API Gateway Timeout येत होता.

`kubectl get svc` मध्ये Service Healthy होती.

`kubectl get endpoints` मध्ये `<none>` दिसत होते.

Deployment मधील Label `app=api` होता पण Service Selector `app=api-gateway` होता.

Selector दुरुस्त केल्यानंतर Endpoints तयार झाले आणि Application पुन्हा Normal झाली.

## Memory Trick

**Pod Changes**

↓

**Service Stays**

↓

**Endpoints Update**

↓

**Application Never Notices**

Remember

**Client → Service → Endpoints → Pod**

