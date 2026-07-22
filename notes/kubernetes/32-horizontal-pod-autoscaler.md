# Kubernetes Horizontal Pod Autoscaler (HPA)

# 1. Purpose

The purpose of Horizontal Pod Autoscaler (HPA) is to automatically increase or decrease the number of Pods based on application load.

Instead of manually scaling Deployments, Kubernetes automatically adjusts the number of replicas according to resource utilization.

HPA helps applications handle changing traffic while optimizing infrastructure costs.

---

# 2. Introduction

Imagine our API Gateway normally receives

```
100 Requests/Minute
```

Suddenly during a sale,

traffic increases to

```
10,000 Requests/Minute
```

Without HPA

```
API Pods

↓

High CPU

↓

Slow Response

↓

503 Errors
```

With HPA

```
CPU Usage High

↓

HPA Detects

↓

Increase Pods

↓

Traffic Distributed

↓

Application Stable
```

---

# 3. Enterprise Usage

Horizontal Pod Autoscaler is widely used for

- API Gateway
- Frontend Applications
- Authentication Services
- Payment Services
- Microservices
- E-commerce Applications
- Banking Applications

It is generally **not** used for Stateful applications like databases.

---

# 4. Usage in THIS Project

```
Internet

↓

Ingress

↓

API Gateway Deployment

↓

HPA

↓

3 Pods

↓

8 Pods

↓

15 Pods
```

Frontend, API Gateway, Auth Service and Dashboard Service will all use HPA.

---

# 5. Architecture

```
             Users

               │

               ▼

        API Gateway Service

               │

               ▼

        Horizontal Pod Autoscaler

               │

       CPU / Memory Metrics

               │

        ┌──────┼──────┐

        ▼      ▼      ▼

      Pod-1  Pod-2  Pod-3

               │

          High CPU?

               │

               ▼

        Create More Pods
```

---

# 6. Internal Workflow

```
Application Running

↓

Metrics Server

↓

Collect CPU Metrics

↓

HPA Reads Metrics

↓

Above Target?

↓

YES

↓

Increase Replicas

------------------------

NO

↓

Reduce Replicas
```

---

# 7. How HPA Works

Step 1

Metrics Server collects CPU and Memory metrics.

↓

Step 2

HPA checks target utilization.

↓

Step 3

If utilization exceeds threshold,

new Pods are created.

↓

Step 4

When traffic decreases,

extra Pods are removed.

---

# 8. Scaling Example

```
09:00 AM

CPU

25%

Pods

3

--------------------------

11:00 AM

CPU

85%

Pods

8

--------------------------

02:00 PM

CPU

90%

Pods

12

--------------------------

08:00 PM

CPU

20%

Pods

3
```

Scaling happens automatically.

---

# 9. Daily DevOps Activities

- Monitor HPA Status
- Verify Metrics Server
- Review Scaling Events
- Tune Target CPU
- Monitor Replica Count
- Investigate Scaling Failures

---

# 10. Production Best Practices

- Always configure Resource Requests.
- Install Metrics Server.
- Define minimum replicas.
- Define maximum replicas.
- Avoid frequent scaling.
- Monitor scaling events.

---

# 11. Security

- Restrict HPA modification.
- Monitor scaling events.
- Secure Metrics Server.
- Enable RBAC.
- Audit configuration changes.

---

# 12. Troubleshooting

List HPAs

```bash
kubectl get hpa
```

Describe HPA

```bash
kubectl describe hpa
```

Check Metrics

```bash
kubectl top pods
```

Check Nodes

```bash
kubectl top nodes
```

Verify Metrics Server

```bash
kubectl get pods -n kube-system
```

---

# 13. Real Production Scenarios

## Scenario 1

### Black Friday Sale

Traffic increased

```
20 Times
```

HPA scaled API Pods

```
5

↓

40
```

Application remained responsive.

---

## Scenario 2

### HPA Not Scaling

Symptoms

CPU

```
95%
```

Pods

```
2
```

Investigation

```bash
kubectl describe hpa
```

Root Cause

Metrics Server was unavailable.

Resolution

Restore Metrics Server.

---

## Scenario 3

### Scaling Too Frequently

Pods kept increasing and decreasing every few minutes.

Reason

Target CPU was configured too low.

Resolution

Adjust HPA thresholds.

---

# 14. Scenario Interview Questions

Q1. What is HPA?

Answer

HPA automatically scales Pods based on metrics such as CPU or Memory utilization.

---

Q2. Which component provides metrics to HPA?

Answer

Metrics Server.

---

Q3. Can HPA scale StatefulSets?

Answer

Technically yes in some cases, but HPA is primarily intended for stateless workloads such as Deployments.

---

Q4. What happens if CPU utilization decreases?

Answer

HPA reduces the number of Pods, respecting the configured minimum replica count.

---

# 15. Architecture Interview Questions

Explain the scaling flow.

```
Users

↓

CPU Increase

↓

Metrics Server

↓

HPA

↓

Deployment

↓

More Pods
```

---

Q2.

Why are Resource Requests important for HPA?

Answer

HPA calculates utilization based on requested resources. Without Requests, autoscaling may not behave correctly.

---

# 16. Production Support Interview Questions

Production Investigation Flow

```
Application Slow

↓

kubectl top pods

↓

CPU High?

↓

Describe HPA

↓

Metrics Server

↓

Deployment

↓

Scaling Events

↓

Resolved
```

Manager Question

"Traffic doubled but the application did not scale."

Expected Answer

- Verify Metrics Server
- Check HPA Status
- Review CPU Metrics
- Verify Resource Requests
- Check Deployment
- Review HPA Events

---

# 17. Related Runbooks

- hpa-not-scaling.md
- metrics-server-down.md
- cpu-high.md

---

# 18. Common Incidents

- Metrics Server Down
- HPA Not Scaling
- Incorrect Target CPU
- Maximum Replicas Reached
- Frequent Scale In/Out

---

# 19. Commands

```bash
kubectl get hpa

kubectl describe hpa

kubectl top pods

kubectl top nodes

kubectl get deployment

kubectl get events
```

---

# 20. YAML Deep Dive

Example

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: api-gateway-hpa

spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: api-gateway

  minReplicas: 3

  maxReplicas: 10

  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
```

Explanation

```
scaleTargetRef
```

Deployment that HPA will scale.

```
minReplicas
```

Minimum number of Pods.

```
maxReplicas
```

Maximum number of Pods.

```
averageUtilization
```

Target CPU utilization percentage.

When CPU exceeds 70%, Kubernetes increases replicas.

---

# 21. Marathi Quick Revision

- HPA म्हणजे Automatic Pod Scaling.
- Metrics Server CPU आणि Memory Metrics देतो.
- Traffic वाढला की Pods वाढतात.
- Traffic कमी झाला की Pods कमी होतात.
- HPA मुख्यतः Stateless Applications साठी वापरतात.

---

# 22. Marathi Summary (5+ Years Experience Revision)

## Interview Summary

Horizontal Pod Autoscaler हा Kubernetes मधील Automatic Scaling Component आहे.

तो Metrics Server कडून CPU/Memory Metrics घेऊन Deployment चे Replicas आपोआप वाढवतो किंवा कमी करतो.

## Production Investigation Flow

```
Application Slow

↓

kubectl top

↓

Describe HPA

↓

Metrics Server

↓

Deployment

↓

Events

↓

Resolved
```

## Production Story

Production मध्ये Marketing Campaign सुरू झाल्यानंतर API Gateway वर अचानक Traffic वाढला.

CPU Usage 95% झाली.

HPA ने 4 Pods वरून 16 Pods पर्यंत Scaling केली.

Users ना कोणताही Downtime जाणवला नाही आणि Campaign यशस्वीपणे पूर्ण झाली.

## Memory Trick

**Metrics Server → HPA → Deployment → Pods**

Remember

**High CPU = More Pods**

**Low CPU = Fewer Pods**

