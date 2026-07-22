# Kubernetes Resource Requests and Limits

# 1. Purpose

The purpose of Resource Requests and Limits is to control how much CPU and Memory a container can request and consume.

They help Kubernetes make scheduling decisions and prevent one application from consuming all available cluster resources.

Without Requests and Limits, one misbehaving container can impact every application running on the same Worker Node.

---

# 2. Introduction

Imagine three applications running on one Worker Node.

```
Frontend

API Gateway

Dashboard
```

If Dashboard suddenly starts consuming all CPU and Memory,

then

- Frontend becomes slow.
- API Gateway starts timing out.
- Users experience failures.

Resource Requests and Limits prevent this situation.

---

# 3. Enterprise Usage

Every Production Kubernetes Cluster uses Requests and Limits.

Examples

- Frontend Applications
- Backend APIs
- Databases
- Monitoring Stack
- CI/CD Tools
- Kafka
- Redis
- Elasticsearch

Most Production clusters reject workloads that do not define Requests and Limits.

---

# 4. Usage in THIS Project

```
Frontend

CPU Request

↓

200m

CPU Limit

↓

500m

----------------------------

API Gateway

CPU Request

↓

500m

CPU Limit

↓

1000m

----------------------------

Dashboard

Memory Request

↓

256Mi

Memory Limit

↓

512Mi
```

Each application receives guaranteed resources while preventing excessive usage.

---

# 5. Architecture

```
             Deployment

                  │

                  ▼

          Resource Requests

                  │

          CPU = 500m

       Memory = 256Mi

                  │

                  ▼

          Resource Limits

                  │

        CPU = 1000m

      Memory = 512Mi

                  │

                  ▼

             Kubernetes Scheduler

                  │

                  ▼

              Worker Node
```

---

# 6. Internal Workflow

```
Deployment Created

↓

Scheduler Reads Requests

↓

Find Suitable Worker Node

↓

Pod Scheduled

↓

Application Starts

↓

Limits Enforced During Runtime
```

---

# 7. Requests vs Limits

## Request

Minimum resources guaranteed.

Example

```
CPU

500m
```

Scheduler ensures the Node has at least this much CPU available before placing the Pod.

---

## Limit

Maximum resources the container may use.

Example

```
CPU

1000m
```

The container cannot exceed this CPU limit.

---

# 8. CPU and Memory Units

CPU

```
1000m = 1 CPU

500m = 0.5 CPU

250m = 0.25 CPU
```

Memory

```
128Mi

256Mi

512Mi

1Gi

2Gi
```

---

# 9. Why Requests and Limits?

Without Limits

```
Application

↓

Consumes Entire Node

↓

Other Pods Starve

↓

Production Incident
```

With Limits

```
Application

↓

Maximum Usage Controlled

↓

Cluster Stable
```

---

# 10. Daily DevOps Activities

- Monitor CPU Usage
- Monitor Memory Usage
- Tune Requests
- Tune Limits
- Review Resource Consumption
- Investigate OOMKilled Pods

---

# 11. Production Best Practices

- Always define Requests.
- Always define Limits.
- Monitor utilization using Prometheus.
- Avoid setting Limits too low.
- Review usage periodically.
- Right-size workloads based on production metrics.

---

# 12. Security

- Prevent noisy neighbors.
- Restrict excessive resource consumption.
- Enable Resource Quotas.
- Use LimitRanges.
- Monitor unusual spikes.

---

# 13. Troubleshooting

Check Pod Resource Usage

```bash
kubectl top pods
```

Check Node Usage

```bash
kubectl top nodes
```

Describe Pod

```bash
kubectl describe pod <pod-name>
```

View Events

```bash
kubectl get events
```

---

# 14. Real Production Scenarios

## Scenario 1

### CPU Spike

API Gateway suddenly reached 100% CPU.

Because CPU Limit was configured,

other applications continued running normally.

---

## Scenario 2

### OOMKilled

Application restarted repeatedly.

Investigation

```bash
kubectl describe pod
```

Reason

```
OOMKilled
```

Memory Limit was too small.

Resolution

Increase Memory Limit.

---

## Scenario 3

### Pod Pending

Deployment could not start.

Reason

Requested CPU

```
4 CPU
```

No Worker Node had sufficient available CPU.

Resolution

- Reduce Request
- Add Worker Nodes
- Enable Cluster Autoscaler

---

# 15. Scenario Interview Questions

Q1. What is a Resource Request?

Answer

The minimum amount of CPU or Memory guaranteed for a container.

---

Q2. What is a Resource Limit?

Answer

The maximum amount of CPU or Memory a container is allowed to consume.

---

Q3. What happens if Memory exceeds the Limit?

Answer

The container is terminated and usually enters an OOMKilled state.

---

Q4. What happens if CPU exceeds the Limit?

Answer

CPU usage is throttled rather than killing the container.

---

# 16. Architecture Interview Questions

Explain scheduling.

```
Deployment

↓

Scheduler

↓

Requests

↓

Suitable Node

↓

Pod Running
```

---

Q2.

Why does Kubernetes use Requests during scheduling?

Answer

Because the Scheduler must ensure sufficient resources exist before placing a Pod.

---

# 17. Production Support Interview Questions

Production Investigation Flow

```
Application Slow

↓

kubectl top

↓

CPU Usage

↓

Memory Usage

↓

Describe Pod

↓

Events

↓

Adjust Requests/Limits

↓

Resolved
```

Manager Question

"Our API Pods are restarting every few minutes."

Expected Answer

- Check Pod Events
- Verify OOMKilled
- Review Memory Usage
- Review Requests/Limits
- Tune Resources
- Validate Application

---

# 18. Related Runbooks

- oomkilled.md
- cpu-throttling.md
- pod-pending-insufficient-resources.md

---

# 19. Common Incidents

- OOMKilled
- CPU Throttling
- Pod Pending
- High Memory Usage
- High CPU Usage

---

# 20. Commands

```bash
kubectl top pods

kubectl top nodes

kubectl describe pod <pod-name>

kubectl get events

kubectl describe node <node-name>
```

---

# 21. Marathi Quick Revision

- Request म्हणजे Guaranteed Resource.
- Limit म्हणजे Maximum Resource.
- Memory Limit Cross झाली तर OOMKilled.
- CPU Limit Cross झाली तर CPU Throttling होते.
- Production मध्ये प्रत्येक Deployment ला Requests आणि Limits असणे आवश्यक आहे.

---

# 22. YAML Deep Dive

Example

```yaml
resources:
  requests:
    cpu: "500m"
    memory: "256Mi"

  limits:
    cpu: "1000m"
    memory: "512Mi"
```

Explanation

```
resources
```

Defines container resource allocation.

```
requests
```

Minimum resources guaranteed.

```
cpu: 500m
```

Guarantees 0.5 CPU.

```
memory: 256Mi
```

Guarantees 256 MB RAM.

```
limits
```

Maximum resources allowed.

```
cpu: 1000m
```

Container cannot consume more than one CPU.

```
memory: 512Mi
```

If the application exceeds this memory, Kubernetes terminates the container with OOMKilled.

---

# 23. Marathi Summary (5+ Years Experience Revision)

## Interview Summary

Requests आणि Limits हे Kubernetes Scheduling आणि Runtime Resource Control चे सर्वात महत्त्वाचे Components आहेत.

Scheduler Requests वापरून Pod कुठे Deploy करायचा ते ठरवतो.

Limits Runtime मध्ये Resource वापर नियंत्रित करतात.

## Production Investigation Flow

```
Application Slow

↓

kubectl top

↓

Describe Pod

↓

Events

↓

OOMKilled?

↓

CPU Throttling?

↓

Adjust Resources

↓

Resolved
```

## Production Story

Production API Gateway सतत Restart होत होता.

`kubectl describe pod` मध्ये

```
OOMKilled
```

दिसत होते.

Application ची Memory Usage 700Mi होती, पण Limit फक्त 512Mi होती.

Limit 1Gi केल्यावर Restart थांबले आणि Application Stable झाली.

## Memory Trick

**Request = Reservation**

**Limit = Restriction**

Remember

**Scheduler Reads Request**

**Kernel Enforces Limit**

