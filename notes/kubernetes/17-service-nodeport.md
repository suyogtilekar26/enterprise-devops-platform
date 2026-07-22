# Kubernetes NodePort Service

# 1. Purpose

The purpose of a NodePort Service is to expose an application outside the Kubernetes Cluster.

Unlike ClusterIP, a NodePort Service can be accessed using the IP address of any Worker Node and a specific port.

NodePort is mainly used for

- Learning
- Testing
- Internal Lab Environments
- Small On-Premise Clusters

Large Production environments generally use LoadBalancer or Ingress instead.

---

# 2. Introduction

By default,

Pods are private.

ClusterIP is also private.

If an external user wants to access the application,

Kubernetes needs a Service that exposes the application outside the cluster.

That Service is called NodePort.

---

# 3. Enterprise Usage

Real Production usage

✓ Internal Applications

✓ Development Environment

✓ QA Environment

✓ On-Prem Kubernetes

Not Recommended

✗ Internet-facing Enterprise Applications

Those generally use

LoadBalancer

or

Ingress Controller.

---

# 4. Usage in THIS Project

```
Browser

↓

Worker Node IP

↓

NodePort

↓

Frontend Service

↓

Frontend Pods
```

Example

```
http://192.168.1.50:30080
```

---

# 5. Architecture

```
              Internet

                  │

                  ▼

        Worker Node IP

        192.168.1.50

                  │

           NodePort 30080

                  │

        Frontend Service

                  │

      ┌────────┼─────────┐

      ▼        ▼         ▼

   Pod-1    Pod-2     Pod-3
```

---

# 6. Internal Workflow

```
Browser

↓

Worker Node

↓

NodePort

↓

Service

↓

Selector

↓

Matching Pods

↓

Application Response
```

---

# 7. NodePort Range

Default Port Range

```
30000

↓

32767
```

Example

```
30080

30090

32000

32500
```

These ports are opened on every Worker Node.

---

# 8. How NodePort Works

```
User

↓

Worker Node IP

↓

NodePort

↓

ClusterIP

↓

Pods
```

Important

NodePort internally forwards traffic to the ClusterIP Service.

---

# 9. Daily DevOps Activities

- Verify NodePort
- Check Worker Node IP
- Test Browser Access
- Verify Endpoints
- Check Firewall Rules
- Verify Service Type

---

# 10. Production Best Practices

- Use NodePort only when necessary.
- Prefer Ingress for HTTP applications.
- Prefer LoadBalancer in Cloud.
- Avoid exposing unnecessary ports.
- Secure Worker Nodes using Firewalls.

---

# 11. Security

- Restrict NodePort access.
- Allow only required IPs.
- Use TLS whenever possible.
- Close unused NodePorts.
- Apply Network Policies.

---

# 12. Troubleshooting

List Services

```bash
kubectl get svc
```

Describe Service

```bash
kubectl describe svc frontend
```

Check Endpoints

```bash
kubectl get endpoints
```

Verify Node IP

```bash
kubectl get nodes -o wide
```

---

# 13. Real Production Scenarios

## Scenario 1

### NodePort Not Accessible

Symptoms

Browser cannot access

```
http://WorkerNodeIP:30080
```

Investigation

```bash
kubectl get svc

kubectl get nodes -o wide

kubectl get endpoints
```

Root Cause

Firewall blocked NodePort.

Resolution

Allow the NodePort in firewall/security rules.

---

## Scenario 2

### Wrong NodePort

Developer configured

```
30090
```

Browser accessed

```
30080
```

Application appeared down.

Correct NodePort resolved the issue.

---

## Scenario 3

### Pod Restart

One Frontend Pod crashed.

ReplicaSet created another Pod.

NodePort continued routing traffic automatically through the Service.

Users experienced no downtime.

---

# 14. Scenario Interview Questions

Q1. What is NodePort?

Answer

NodePort exposes a Kubernetes Service outside the cluster using a Worker Node IP and a port.

---

Q2. What is the default NodePort range?

Answer

30000–32767.

---

Q3. Is NodePort recommended for Internet-facing Production applications?

Answer

No.

LoadBalancer or Ingress is preferred.

---

Q4. Does NodePort perform Load Balancing?

Answer

Yes.

Traffic is forwarded to the Service, which distributes requests among healthy Pods.

---

# 15. Architecture Interview Questions

Explain the complete request flow.

```
Browser

↓

Worker Node IP

↓

NodePort

↓

ClusterIP Service

↓

Pods
```

---

Q2.

Does NodePort directly send traffic to Pods?

Answer

No.

Traffic first reaches the Service and then matching Pods.

---

# 16. Production Support Interview Questions

Production Investigation Flow

```
Browser Failed

↓

Check Worker Node IP

↓

kubectl get svc

↓

NodePort Correct?

↓

Endpoints Available?

↓

Firewall Open?

↓

Pods Running?

↓

Resolved
```

Manager Question

"Our QA team cannot access the application using NodePort."

How will you investigate?

Expected Answer

- Verify Service Type
- Verify NodePort
- Verify Worker Node IP
- Verify Firewall
- Verify Endpoints
- Verify Pods

---

# 17. Related Runbooks

- nodeport-not-accessible.md
- firewall-blocked.md
- service-no-endpoints.md

---

# 18. Common Incidents

- Wrong NodePort
- Firewall Blocked
- Empty Endpoints
- Wrong Worker Node IP
- Incorrect Service Type

---

# 19. Commands

```bash
kubectl get svc

kubectl describe svc frontend

kubectl get endpoints

kubectl get nodes -o wide

kubectl get pods
```

---

# 20. Marathi Quick Revision

- NodePort बाहेरून Application Access करण्यासाठी वापरतात.
- Worker Node IP + Port वापरून Application Access होते.
- Default Range 30000–32767 आहे.
- Production मध्ये Ingress किंवा LoadBalancer जास्त वापरतात.

---

# 21. Marathi Summary (5+ Years Experience Revision)

## Interview Summary

NodePort हा External Access साठी वापरला जाणारा Service Type आहे.

तो Worker Node IP आणि Port वापरतो.

Cloud Production मध्ये LoadBalancer किंवा Ingress अधिक वापरले जातात.

## Production Investigation Flow

```
Browser

↓

Node IP

↓

NodePort

↓

Service

↓

Endpoints

↓

Pods

↓

Firewall

↓

Resolved
```

## Production Story

QA Team ने Application Down असल्याची तक्रार केली.

Pods Running होते.

Service Healthy होता.

Investigation मध्ये Firewall ने NodePort Block केला होता.

Firewall Rule Update केल्यानंतर Application लगेच Access झाली.

## Memory Trick

**NodePort = Node IP + Port**

Remember

**External User → Worker Node → NodePort → Service → Pods**

