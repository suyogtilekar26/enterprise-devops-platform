# Kubernetes Network Policies

# 1. Purpose

The purpose of Kubernetes Network Policies is to control communication between Pods, Namespaces and external networks.

By default, Kubernetes allows all Pods to communicate with each other.

Network Policies implement a Zero Trust networking model by explicitly allowing only required traffic.

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

↓

Database
```

Only specific services should communicate with each other.

Example

```
Frontend

↓

API Gateway

✓ Allowed

--------------------------

Frontend

↓

Database

✗ Blocked
```

Network Policies enforce these communication rules.

---

# 3. Enterprise Usage

Production Kubernetes clusters use Network Policies for

- Zero Trust Security
- PCI-DSS Compliance
- HIPAA Compliance
- Banking Applications
- Healthcare Applications
- Government Projects
- Multi-Tenant Clusters

Most enterprise security audits require Network Policies.

---

# 4. Usage in THIS Project

```
Frontend

↓

API Gateway

↓

Auth Service

↓

Dashboard Service

↓

PostgreSQL
```

Allowed Communication

```
Frontend

↓

API Gateway

✓

--------------------------

API Gateway

↓

Auth Service

✓

--------------------------

Dashboard

↓

PostgreSQL

✓
```

Blocked Communication

```
Frontend

↓

PostgreSQL

✗

--------------------------

Auth Service

↓

Frontend

✗
```

---

# 5. Architecture

```
                 Frontend

                     │

                     ▼

               API Gateway

               /         \

              ▼           ▼

      Auth Service   Dashboard

                          │

                          ▼

                     PostgreSQL

------------------------------------------------

Blocked

Frontend

↓

PostgreSQL

✗

Dashboard

↓

Frontend

✗
```

---

# 6. Internal Workflow

```
Packet Generated

↓

Network Policy Checked

↓

Rule Exists?

↓

YES

↓

Allow Traffic

------------------------

NO

↓

Drop Packet
```

---

# 7. Types of Network Policies

Ingress Policy

```
Incoming Traffic
```

Example

```
API Gateway

↓

Auth Service
```

---

Egress Policy

```
Outgoing Traffic
```

Example

```
Dashboard

↓

Database
```

---

Both

```
Control Both Directions
```

Recommended for Production.

---

# 8. Why Network Policies?

Without Network Policies

```
Every Pod

↓

Every Pod

✓
```

Security Risk

---

With Network Policies

```
Frontend

↓

API

✓

--------------------

Frontend

↓

Database

✗
```

Only required traffic is allowed.

---

# 9. Daily DevOps Activities

- Verify Network Policies
- Validate Allowed Traffic
- Investigate Blocked Traffic
- Review Namespace Isolation
- Monitor Security Events
- Update Policies During Releases

---

# 10. Production Best Practices

- Follow Zero Trust.
- Allow only required traffic.
- Deny everything else.
- Separate environments using Namespaces.
- Review policies regularly.
- Test policies before Production deployment.

---

# 11. Security

- Restrict east-west traffic.
- Prevent lateral movement.
- Isolate sensitive workloads.
- Enable audit logging.
- Use RBAC with Network Policies.

---

# 12. Troubleshooting

List Network Policies

```bash
kubectl get networkpolicy
```

Describe Policy

```bash
kubectl describe networkpolicy
```

List Pods

```bash
kubectl get pods --show-labels
```

Test Connectivity

```bash
kubectl exec -it <pod-name> -- curl http://service-name
```

---

# 13. Real Production Scenarios

## Scenario 1

### Database Accessible from Frontend

Security Team discovered

```
Frontend

↓

Database

✓
```

This violated company policy.

Resolution

Created a Network Policy allowing only Dashboard Service to access PostgreSQL.

---

## Scenario 2

### Application Not Working

Symptoms

API Gateway could not call Auth Service.

Investigation

```bash
kubectl describe networkpolicy
```

Root Cause

Incorrect Pod Selector.

Resolution

Correct Labels.

Traffic restored.

---

## Scenario 3

### Ransomware Simulation

Security Team attempted lateral movement.

Network Policies blocked unauthorized Pod-to-Pod communication.

Attack contained successfully.

---

# 14. Scenario Interview Questions

Q1. What is a Network Policy?

Answer

A Network Policy controls which Pods can communicate with other Pods or external networks.

---

Q2. Why are Network Policies important?

Answer

They implement Zero Trust networking and restrict unnecessary communication between workloads.

---

Q3. What is the difference between Ingress and Egress Policy?

Answer

Ingress controls incoming traffic.

Egress controls outgoing traffic.

---

Q4. Are Network Policies enabled by default?

Answer

Network Policies require a compatible CNI plugin (such as Calico or Cilium) that enforces them.

---

# 15. Architecture Interview Questions

Explain the traffic flow.

```
Frontend

↓

API Gateway

↓

Auth

↓

Dashboard

↓

Database
```

Only explicitly permitted paths are allowed.

---

Q2.

What happens if no matching allow rule exists?

Answer

Traffic is denied for Pods selected by the policy.

---

# 16. Production Support Interview Questions

Production Investigation Flow

```
Application Cannot Connect

↓

Network Policy

↓

Pod Labels

↓

Namespace

↓

Service

↓

Application Logs

↓

Resolved
```

Manager Question

"Frontend suddenly cannot access the API after today's deployment."

Expected Answer

- Check Network Policies
- Verify Pod Labels
- Verify Namespace
- Test Connectivity
- Review Recent Changes
- Restore Correct Policy

---

# 17. Related Runbooks

- network-policy-blocking-traffic.md
- pod-to-pod-connectivity.md
- namespace-isolation.md

---

# 18. Common Incidents

- Incorrect Pod Selector
- Namespace Selector Error
- Blocked API Calls
- Database Access Denied
- Missing CNI Support

---

# 19. Commands

```bash
kubectl get networkpolicy

kubectl describe networkpolicy

kubectl get pods --show-labels

kubectl exec -it <pod-name> -- curl http://service-name

kubectl get events
```

---

# 20. YAML Deep Dive

Example

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-api-to-auth

spec:
  podSelector:
    matchLabels:
      app: auth-service

  policyTypes:
  - Ingress

  ingress:
  - from:
    - podSelector:
        matchLabels:
          app: api-gateway
```

Explanation

```
podSelector
```

Specifies which Pods the policy applies to.

```
policyTypes
```

Defines whether the policy controls Ingress, Egress or both.

```
Ingress
```

Controls incoming traffic.

```
from
```

Specifies which Pods are allowed to connect.

```
matchLabels
```

Uses Pod labels to identify trusted workloads.

---

# 21. Marathi Quick Revision

- Network Policy Pod-to-Pod Communication नियंत्रित करते.
- Ingress म्हणजे Incoming Traffic.
- Egress म्हणजे Outgoing Traffic.
- Production मध्ये Zero Trust Security साठी वापरतात.
- Calico किंवा Cilium सारखा CNI Plugin आवश्यक असतो.

---

# 22. Marathi Summary (5+ Years Experience Revision)

## Interview Summary

Network Policy Kubernetes मधील Network Security Component आहे.

ती Pods मधील Communication नियंत्रित करते आणि Zero Trust Networking लागू करते.

Production मध्ये Database, Authentication आणि Internal APIs सुरक्षित ठेवण्यासाठी याचा मोठ्या प्रमाणावर वापर होतो.

## Production Investigation Flow

```
Connection Failed

↓

Network Policy

↓

Pod Labels

↓

Namespace

↓

Service

↓

Logs

↓

Resolved
```

## Production Story

Security Audit दरम्यान Frontend Pod थेट PostgreSQL Database ला Connect होत असल्याचे आढळले.

ही गंभीर Security Issue होती.

Network Policy लागू करून फक्त Dashboard Service ला Database Access दिला.

Audit यशस्वी झाला आणि Production Security मजबूत झाली.

## Memory Trick

**Ingress = Incoming**

**Egress = Outgoing**

Remember

**Default Enterprise Goal = Allow Only Required Traffic**

