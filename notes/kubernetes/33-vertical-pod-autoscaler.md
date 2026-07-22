# Kubernetes Vertical Pod Autoscaler (VPA)

# 1. Purpose

The purpose of Vertical Pod Autoscaler (VPA) is to automatically adjust the CPU and Memory allocated to Pods.

Instead of increasing the number of Pods like HPA, VPA increases or decreases the resources assigned to each Pod.

VPA helps applications that need more CPU or Memory rather than more replicas.

---

# 2. Introduction

Consider an API Gateway Deployment.

Current Configuration

```
CPU

500m

Memory

512Mi
```

After several weeks,

Monitoring shows

```
CPU Usage

150m

Memory Usage

180Mi
```

Resources are overallocated.

VPA recommends

```
CPU

250m

Memory

256Mi
```

This reduces infrastructure cost.

---

# 3. Enterprise Usage

VPA is commonly used for

- Internal APIs
- Batch Processing
- Machine Learning Jobs
- Reporting Services
- Long-running Backend Services

VPA is generally **not** combined with HPA on the same CPU/Memory metrics because both can interfere with each other.

---

# 4. Usage in THIS Project

```
Dashboard Service

↓

Vertical Pod Autoscaler

↓

CPU Recommendation

↓

Memory Recommendation

↓

Pod Restart

↓

Updated Resources
```

Initially, our Enterprise DevOps Platform will primarily use HPA.

VPA will be evaluated for backend services where resource optimization is more beneficial than horizontal scaling.

---

# 5. Architecture

```
            Application Pods

                   │

                   ▼

           Metrics Collection

                   │

                   ▼

                  VPA

                   │

        Resource Recommendation

                   │

                   ▼

         Update Pod Resources

                   │

                   ▼

             Restart Pod
```

---

# 6. Internal Workflow

```
Application Running

↓

Collect CPU & Memory Metrics

↓

VPA Analyzer

↓

Generate Recommendation

↓

VPA Updater

↓

Restart Pod

↓

Apply New Resources
```

---

# 7. Components of VPA

```
VPA Recommender

↓

Analyzes Usage

------------------------

VPA Updater

↓

Evicts Pod

------------------------

Admission Controller

↓

Applies New Requests
```

---

# 8. HPA vs VPA

Horizontal Pod Autoscaler

```
3 Pods

↓

8 Pods

↓

15 Pods
```

More Pods.

---

Vertical Pod Autoscaler

```
CPU

500m

↓

1000m

------------------

Memory

512Mi

↓

1Gi
```

Bigger Pods.

---

# 9. Update Modes

## Off

Only recommendations are generated.

No automatic updates.

---

## Initial

Recommendations are applied only when new Pods are created.

Existing Pods are not restarted.

---

## Auto

VPA automatically updates resources by restarting Pods when required.

---

# 10. Daily DevOps Activities

- Review VPA Recommendations
- Compare Actual vs Requested Resources
- Monitor Pod Restarts
- Tune Resource Allocation
- Validate Application Performance
- Monitor Cost Optimization

---

# 11. Production Best Practices

- Start with Recommendation Mode.
- Review recommendations before enabling Auto mode.
- Avoid using VPA Auto together with HPA for CPU/Memory scaling.
- Monitor restart frequency.
- Test changes in lower environments first.

---

# 12. Security

- Restrict VPA configuration changes.
- Audit resource modifications.
- Monitor unexpected restarts.
- Apply RBAC.
- Review recommendation history.

---

# 13. Troubleshooting

List VPA

```bash
kubectl get vpa
```

Describe VPA

```bash
kubectl describe vpa
```

Check Pod Resources

```bash
kubectl describe pod <pod-name>
```

View Resource Usage

```bash
kubectl top pods
```

---

# 14. Real Production Scenarios

## Scenario 1

### Over-Provisioned API

CPU Request

```
2000m
```

Actual Usage

```
250m
```

VPA recommended

```
300m
```

Infrastructure cost decreased significantly.

---

## Scenario 2

### Frequent OOMKilled

Application repeatedly failed.

VPA recommended

```
Memory

512Mi

↓

1Gi
```

After updating resources,

application became stable.

---

## Scenario 3

### Automatic Restart

VPA Auto mode restarted an application Pod during business hours.

Lesson Learned

Enable maintenance windows or use Recommendation mode before enabling Auto mode in Production.

---

# 15. Scenario Interview Questions

Q1. What is Vertical Pod Autoscaler?

Answer

VPA automatically adjusts CPU and Memory requests for Pods based on historical resource usage.

---

Q2. How is VPA different from HPA?

Answer

HPA increases or decreases the number of Pods.

VPA increases or decreases the resources assigned to each Pod.

---

Q3. Does VPA restart Pods?

Answer

Yes.

In Auto mode, Pods are typically restarted so the updated resource requests can take effect.

---

Q4. Should HPA and VPA always be used together?

Answer

No.

Using both on the same CPU/Memory metrics can lead to conflicting scaling decisions.

---

# 16. Architecture Interview Questions

Explain the flow.

```
Pod

↓

Metrics

↓

VPA

↓

Recommendation

↓

Restart

↓

Updated Resources
```

---

Q2.

Why is Recommendation mode useful?

Answer

It allows engineers to review suggested CPU and Memory values before automatically applying them in Production.

---

# 17. Production Support Interview Questions

Production Investigation Flow

```
Application Slow

↓

kubectl top

↓

Describe VPA

↓

Recommendations

↓

Pod Restart?

↓

Application Logs

↓

Resolved
```

Manager Question

"Our application keeps restarting after enabling VPA."

Expected Answer

- Check VPA Update Mode
- Review Recommendation History
- Verify Restart Events
- Confirm Resource Changes
- Switch to Recommendation Mode if necessary
- Validate Application Stability

---

# 18. Related Runbooks

- vpa-pod-restarts.md
- resource-optimization.md
- oomkilled-analysis.md

---

# 19. Common Incidents

- Frequent Pod Restarts
- Incorrect Recommendations
- OOMKilled
- CPU Over-Allocation
- Resource Waste

---

# 20. Commands

```bash
kubectl get vpa

kubectl describe vpa

kubectl top pods

kubectl describe pod <pod-name>

kubectl get events
```

---

# 21. YAML Deep Dive

Example

```yaml
apiVersion: autoscaling.k8s.io/v1
kind: VerticalPodAutoscaler
metadata:
  name: dashboard-vpa

spec:
  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: dashboard

  updatePolicy:
    updateMode: "Auto"
```

Explanation

```
targetRef
```

Specifies the Deployment managed by VPA.

```
updatePolicy
```

Defines how recommendations are applied.

```
updateMode: Auto
```

VPA automatically updates Pod resources by recreating Pods when required.

Other supported modes include

- Off
- Initial
- Auto

---

# 22. Marathi Quick Revision

- VPA म्हणजे Pod चे CPU आणि Memory आपोआप बदलणे.
- HPA Pods वाढवतो, VPA Resources वाढवतो.
- Auto Mode मध्ये Pod Restart होऊ शकतो.
- Recommendation Mode Production साठी सुरक्षित सुरुवात आहे.
- Resource Optimization साठी VPA वापरतात.

---

# 23. Marathi Summary (5+ Years Experience Revision)

## Interview Summary

Vertical Pod Autoscaler हा Kubernetes मधील Resource Optimization Component आहे.

तो CPU आणि Memory Usage चे विश्लेषण करून योग्य Resource Requests सुचवतो किंवा Auto Mode मध्ये लागू करतो.

## Production Investigation Flow

```
Application Slow

↓

kubectl top

↓

VPA

↓

Recommendations

↓

Pod Restart

↓

Logs

↓

Resolved
```

## Production Story

Production Reporting Service सतत OOMKilled होत होती.

Monitoring मध्ये Memory Usage Request पेक्षा जास्त दिसत होती.

VPA ने 512Mi वरून 1Gi Memory Recommendation दिली.

Resources Update केल्यानंतर OOMKilled थांबले आणि Application Stable झाली.

## Memory Trick

**HPA = More Pods**

**VPA = Bigger Pods**

Remember

**Horizontal = Scale Out**

**Vertical = Scale Up**

