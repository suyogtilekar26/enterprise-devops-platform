# Kubernetes Ingress Controller

# 1. Purpose

The purpose of an Ingress Controller is to implement the Ingress rules defined inside Kubernetes.

An Ingress resource only contains routing rules.

It cannot route traffic by itself.

The actual routing is performed by the Ingress Controller.

Without an Ingress Controller, an Ingress resource does nothing.

---

# 2. Introduction

Think of it this way.

```
Ingress

↓

Rule Book

-----------------------

Ingress Controller

↓

Traffic Manager
```

Ingress contains instructions.

Ingress Controller executes those instructions.

---

# 3. Enterprise Usage

Every Production Kubernetes Cluster using Ingress must have an Ingress Controller.

Popular Controllers

- NGINX Ingress Controller
- AWS Load Balancer Controller
- Traefik
- HAProxy
- Kong

NGINX Ingress Controller is the most commonly used.

---

# 4. Usage in THIS Project

```
Internet

↓

AWS Load Balancer

↓

NGINX Ingress Controller

↓

Ingress Rules

↓

Frontend Service

↓

API Gateway Service

↓

Auth Service

↓

Dashboard Service
```

This is exactly how our Enterprise DevOps Platform will work.

---

# 5. Architecture

```
                 Internet

                     │

                     ▼

          AWS Load Balancer

                     │

                     ▼

     NGINX Ingress Controller Pods

                     │

              Reads Ingress

                     │

        ┌────────────┼────────────┐

        ▼            ▼            ▼

   Frontend      API Gateway      Auth

    Service         Service      Service

        ▼            ▼            ▼

      Pods         Pods         Pods
```

---

# 6. Internal Workflow

```
Browser Request

↓

Load Balancer

↓

Ingress Controller

↓

Reads Ingress Rules

↓

Find Matching Service

↓

Find Healthy Pods

↓

Response Returned
```

---

# 7. How Ingress Controller Works

Step 1

User sends request.

↓

Step 2

Traffic reaches Load Balancer.

↓

Step 3

Load Balancer forwards traffic to the Ingress Controller.

↓

Step 4

Ingress Controller checks Ingress Rules.

↓

Step 5

Correct Service is selected.

↓

Step 6

Traffic reaches healthy Pods.

---

# 8. Why Do We Need It?

Without Ingress Controller

```
Internet

↓

Ingress

×

Nothing Happens
```

With Ingress Controller

```
Internet

↓

Ingress Controller

↓

Services

↓

Pods
```

---

# 9. Daily DevOps Activities

- Verify Controller Pods
- Monitor Controller Logs
- Check Routing Rules
- Verify TLS
- Monitor Load Balancer
- Investigate HTTP Errors

---

# 10. Production Best Practices

- Deploy multiple Controller replicas.
- Enable High Availability.
- Monitor Controller CPU and Memory.
- Enable HTTPS.
- Store TLS certificates securely.
- Keep Controller updated.

---

# 11. Security

- Enable HTTPS only.
- Configure TLS Secrets.
- Enable WAF.
- Restrict Public Access.
- Use RBAC.
- Monitor Access Logs.

---

# 12. Troubleshooting

Check Controller Pods

```bash
kubectl get pods -n ingress-nginx
```

Describe Controller

```bash
kubectl describe pod <pod-name> -n ingress-nginx
```

Check Logs

```bash
kubectl logs <pod-name> -n ingress-nginx
```

List Ingress

```bash
kubectl get ingress
```

---

# 13. Real Production Scenarios

## Scenario 1

### Ingress Exists But Website Is Down

Symptoms

- DNS is correct.
- Load Balancer is healthy.
- Website is unavailable.

Investigation

```bash
kubectl get pods -n ingress-nginx
```

Root Cause

Ingress Controller Pods were CrashLoopBackOff.

Resolution

Restart Controller Pods and investigate logs.

---

## Scenario 2

### Wrong Routing

Users opened

```
https://company.com/api
```

but reached the Frontend instead of the API.

Root Cause

Incorrect Ingress Rule.

Resolution

Correct the routing configuration.

---

## Scenario 3

### Controller Crash

One Ingress Controller Pod crashed.

Another replica immediately handled traffic.

Users experienced no downtime.

---

# 14. Scenario Interview Questions

Q1. What is an Ingress Controller?

Answer

It is a Kubernetes application that reads Ingress resources and routes traffic accordingly.

---

Q2. Can Ingress work without an Ingress Controller?

Answer

No.

Ingress is only a configuration object.

The Controller performs the routing.

---

Q3. Which Ingress Controller is most commonly used?

Answer

NGINX Ingress Controller.

---

Q4. Where does the Ingress Controller run?

Answer

Inside the Kubernetes Cluster as Pods.

---

# 15. Architecture Interview Questions

Explain the request flow.

```
Internet

↓

Load Balancer

↓

Ingress Controller

↓

Ingress Rules

↓

Service

↓

Pods
```

---

Q2.

Who actually routes the traffic?

Answer

The Ingress Controller.

Not the Ingress resource itself.

---

# 16. Production Support Interview Questions

Production Investigation Flow

```
Website Down

↓

DNS

↓

Load Balancer

↓

Ingress Controller Pods

↓

Ingress Rules

↓

Service

↓

Endpoints

↓

Pods

↓

Resolved
```

Manager Question

"Our website is down even though all application Pods are healthy."

Expected Answer

- Check Ingress Controller Pods
- Review Controller Logs
- Verify Ingress Rules
- Check Services
- Validate Endpoints
- Confirm Routing

---

# 17. Related Runbooks

- ingress-controller-crash.md
- ingress-routing-failure.md
- ingress-controller-high-cpu.md

---

# 18. Common Incidents

- Controller CrashLoopBackOff
- Wrong Routing Rules
- TLS Failure
- High CPU Usage
- 404 Errors

---

# 19. Commands

```bash
kubectl get pods -n ingress-nginx

kubectl logs <pod-name> -n ingress-nginx

kubectl describe ingress

kubectl get ingress

kubectl get svc -n ingress-nginx
```

---

# 20. Marathi Quick Revision

- Ingress Controller हा Ingress Rules Execute करतो.
- Ingress स्वतः Traffic Route करत नाही.
- NGINX Ingress Controller सर्वात जास्त वापरतात.
- Controller Pods Down झाले तर Website Down होऊ शकते.

---

# 21. Marathi Summary (5+ Years Experience Revision)

## Interview Summary

Ingress हा फक्त Rule असतो.

Ingress Controller त्या Rules वापरून Traffic Route करतो.

Production मध्ये NGINX Ingress Controller सर्वाधिक वापरला जातो.

## Production Investigation Flow

```
Website Down

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

Pods

↓

Resolved
```

## Production Story

Production Website Down झाली.

Application Pods Running होते.

Load Balancer Healthy होता.

Investigation मध्ये Ingress Controller CrashLoopBackOff मध्ये होता.

Controller Restart आणि Root Cause Fix केल्यानंतर Website पुन्हा सुरू झाली.

## Memory Trick

**Ingress = Rules**

**Ingress Controller = Traffic Manager**

Remember

**No Controller = No Routing**

