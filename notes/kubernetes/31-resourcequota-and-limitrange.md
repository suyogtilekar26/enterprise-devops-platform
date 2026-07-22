# Kubernetes ResourceQuota and LimitRange

# 1. Purpose

The purpose of ResourceQuota and LimitRange is to control resource consumption inside a Kubernetes Namespace.

These resources prevent a single team or application from consuming all cluster resources.

They are essential for multi-team Production Kubernetes environments.

---

# 2. Introduction

Imagine three teams sharing one Kubernetes Cluster.

```
Development Team

Testing Team

Production Team
```

Without restrictions

```
Development Team

↓

Creates 500 Pods

↓

Consumes Entire Cluster

↓

Production Pods Cannot Start
```

This creates a Production Incident.

ResourceQuota and LimitRange prevent this.

---

# 3. Enterprise Usage

Every Enterprise Kubernetes Cluster uses

- ResourceQuota
- LimitRange

These are especially important in

- Shared Clusters
- Multi-Team Environments
- Platform Engineering
- Internal Developer Platforms

---

# 4. Usage in THIS Project

Namespaces

```
Development

↓

ResourceQuota

------------------------

Testing

↓

ResourceQuota

------------------------

Production

↓

ResourceQuota
```

Example

```
Development

Maximum

20 Pods

4 CPU

8Gi Memory

------------------------

Production

Maximum

200 Pods

64 CPU

128Gi Memory
```

---

# 5. Architecture

```
             Namespace

                  │

        ┌─────────┴─────────┐

        ▼                   ▼

  ResourceQuota        LimitRange

        │                   │

 Controls Total      Controls Per Pod

        ▼                   ▼

      Deployments

            ▼

          Pods
```

---

# 6. Internal Workflow

```
Deployment Created

↓

Admission Controller

↓

Check ResourceQuota

↓

Check LimitRange

↓

Allowed?

↓

YES

↓

Pod Created

----------------------

NO

↓

Rejected
```

---

# 7. ResourceQuota

Purpose

Limits total resource usage inside a Namespace.

Examples

- Maximum Pods
- Maximum CPU
- Maximum Memory
- Maximum PVC
- Maximum Services
- Maximum ConfigMaps

---

Example

```
Namespace

↓

Maximum Pods

20
```

Developer tries

```
Create Pod 21
```

Result

```
Rejected
```

---

# 8. LimitRange

Purpose

Defines minimum, maximum and default resources for individual containers.

Example

```
Minimum Memory

128Mi

Maximum Memory

1Gi

Default Memory

256Mi
```

Every Pod inside the Namespace follows these rules.

---

# 9. ResourceQuota vs LimitRange

ResourceQuota

```
Entire Namespace
```

LimitRange

```
Single Pod

Single Container
```

Simple Rule

```
Quota

↓

Namespace

---------------------

LimitRange

↓

Container
```

---

# 10. Daily DevOps Activities

- Monitor Namespace Usage
- Review Resource Consumption
- Adjust Quotas
- Review Failed Deployments
- Investigate Admission Errors
- Capacity Planning

---

# 11. Production Best Practices

- Every Namespace should have ResourceQuota.
- Configure LimitRanges.
- Monitor quota utilization.
- Avoid unlimited resource allocation.
- Review quotas periodically.
- Allocate resources based on business priority.

---

# 12. Security

- Prevent resource abuse.
- Restrict noisy applications.
- Separate Production and Development.
- Audit quota changes.
- Apply RBAC.

---

# 13. Troubleshooting

List ResourceQuotas

```bash
kubectl get resourcequota
```

Describe ResourceQuota

```bash
kubectl describe resourcequota
```

List LimitRanges

```bash
kubectl get limitrange
```

Describe LimitRange

```bash
kubectl describe limitrange
```

Describe Namespace

```bash
kubectl describe namespace
```

---

# 14. Real Production Scenarios

## Scenario 1

### Pod Creation Failed

Developer deployed application.

Pods remained

```
Pending
```

Investigation

```bash
kubectl describe resourcequota
```

Root Cause

Namespace exceeded CPU quota.

Resolution

Increase quota or reduce application resources.

---

## Scenario 2

### Memory Limit Exceeded

Application requested

```
4Gi
```

LimitRange Maximum

```
2Gi
```

Deployment rejected.

Resolution

Adjust LimitRange or application requirements.

---

## Scenario 3

### Development Team Filled Cluster

Without ResourceQuota

Development Team created hundreds of Pods.

Production deployments failed.

After implementing ResourceQuota,

each Namespace received dedicated resources.

Production remained stable.

---

# 15. Scenario Interview Questions

Q1. What is ResourceQuota?

Answer

ResourceQuota limits the total amount of resources a Namespace can consume.

---

Q2. What is LimitRange?

Answer

LimitRange defines minimum, maximum and default resource values for Pods and Containers.

---

Q3. Why do Enterprises use ResourceQuota?

Answer

To prevent one Namespace from consuming all cluster resources.

---

Q4. Can a Pod bypass LimitRange?

Answer

No.

The Admission Controller validates requests before creating the Pod.

---

# 16. Architecture Interview Questions

Explain the admission flow.

```
Deployment

↓

Admission Controller

↓

ResourceQuota

↓

LimitRange

↓

Pod Created
```

---

Q2.

What happens if ResourceQuota is exceeded?

Answer

The Deployment or Pod creation request is rejected.

---

# 17. Production Support Interview Questions

Production Investigation Flow

```
Pod Not Created

↓

Describe Namespace

↓

ResourceQuota

↓

LimitRange

↓

Events

↓

Adjust Resources

↓

Resolved
```

Manager Question

"Our application deployment suddenly started failing even though the cluster has free resources."

Expected Answer

- Check Namespace ResourceQuota
- Verify LimitRange
- Review Events
- Check Resource Requests
- Increase Quota if approved
- Redeploy

---

# 18. Related Runbooks

- namespace-resourcequota-exceeded.md
- limitrange-validation-failure.md
- pod-admission-failed.md

---

# 19. Common Incidents

- ResourceQuota Exceeded
- LimitRange Validation Failure
- Pod Admission Rejected
- Namespace CPU Exhausted
- Namespace Memory Exhausted

---

# 20. Commands

```bash
kubectl get resourcequota

kubectl describe resourcequota

kubectl get limitrange

kubectl describe limitrange

kubectl describe namespace

kubectl get events
```

---

# 21. YAML Deep Dive

## ResourceQuota Example

```yaml
apiVersion: v1
kind: ResourceQuota
metadata:
  name: dev-quota

spec:
  hard:
    pods: "20"
    requests.cpu: "4"
    requests.memory: 8Gi
    limits.cpu: "8"
    limits.memory: 16Gi
```

Explanation

```
hard
```

Defines the maximum total resources allowed inside the Namespace.

```
pods
```

Maximum number of Pods.

```
requests.cpu
```

Total guaranteed CPU.

```
limits.cpu
```

Maximum CPU that all Pods together can consume.

---

## LimitRange Example

```yaml
apiVersion: v1
kind: LimitRange
metadata:
  name: default-limits

spec:
  limits:
  - default:
      cpu: "500m"
      memory: "512Mi"
    defaultRequest:
      cpu: "250m"
      memory: "256Mi"
    type: Container
```

Explanation

```
default
```

Automatically applied Limits.

```
defaultRequest
```

Automatically applied Requests.

```
type
```

Applies these limits to Containers.

---

# 22. Marathi Quick Revision

- ResourceQuota संपूर्ण Namespace साठी असतो.
- LimitRange प्रत्येक Container साठी असतो.
- ResourceQuota मुळे एक Team पूर्ण Cluster वापरू शकत नाही.
- LimitRange Default Requests आणि Limits सेट करतो.
- Production Shared Clusters मध्ये दोन्ही आवश्यक आहेत.

---

# 23. Marathi Summary (5+ Years Experience Revision)

## Interview Summary

ResourceQuota आणि LimitRange हे Enterprise Kubernetes Governance चे महत्त्वाचे Components आहेत.

ResourceQuota Namespace Level वर Resource Control करतो.

LimitRange Container Level वर Default आणि Maximum Resource Values लागू करतो.

## Production Investigation Flow

```
Deployment Failed

↓

Namespace

↓

ResourceQuota

↓

LimitRange

↓

Events

↓

Adjust Resources

↓

Resolved
```

## Production Story

Development Team ने Load Testing दरम्यान शेकडो Pods तयार केले.

Production Team चे Deployments Fail होऊ लागले.

RCA मध्ये ResourceQuota लागू नव्हता.

प्रत्येक Namespace ला ResourceQuota आणि LimitRange लागू केल्यानंतर Cluster पुन्हा Stable झाला.

## Memory Trick

**ResourceQuota = Namespace Control**

**LimitRange = Container Control**

Remember

**Quota = Total**

**LimitRange = Individual**

