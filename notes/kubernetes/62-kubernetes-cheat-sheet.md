# Kubernetes Cheat Sheet (5+ Years DevOps)

# 1. Purpose

This document serves as a quick revision guide for Kubernetes.

It is designed for

- Daily Production Work
- On-Call Support
- Incident Handling
- Interview Preparation
- Production Deployments

This is **not** a replacement for the detailed notes. It is a high-speed reference for experienced DevOps Engineers.

---

# 2. Kubernetes Architecture (30 Seconds Revision)

```
Developer

↓

kubectl

↓

API Server

↓

Authentication

↓

Authorization

↓

Admission Controllers

↓

etcd

↓

Scheduler

↓

Worker Node

↓

kubelet

↓

Container Runtime

↓

Pod

↓

Service

↓

CoreDNS

↓

Ingress

↓

Users
```

---

# 3. Kubernetes Core Objects

| Resource | Purpose |
|----------|---------|
| Pod | Smallest Deployable Unit |
| ReplicaSet | Maintains Replica Count |
| Deployment | Manages Stateless Applications |
| StatefulSet | Stateful Applications |
| DaemonSet | One Pod Per Node |
| Job | One-Time Task |
| CronJob | Scheduled Job |
| Service | Stable Network Endpoint |
| Ingress | HTTP/HTTPS Routing |
| ConfigMap | Non-sensitive Configuration |
| Secret | Sensitive Configuration |
| PV | Persistent Storage |
| PVC | Storage Request |
| Namespace | Logical Isolation |

---

# 4. kubectl Commands

Cluster

```bash
kubectl cluster-info

kubectl version
```

---

Nodes

```bash
kubectl get nodes

kubectl describe node

kubectl top nodes
```

---

Pods

```bash
kubectl get pods -A

kubectl describe pod

kubectl logs

kubectl logs --previous

kubectl exec -it POD -- sh

kubectl top pods
```

---

Deployments

```bash
kubectl get deployments

kubectl rollout status

kubectl rollout history

kubectl rollout undo
```

---

Services

```bash
kubectl get svc

kubectl describe svc
```

---

Ingress

```bash
kubectl get ingress

kubectl describe ingress
```

---

Events

```bash
kubectl get events -A --sort-by=.metadata.creationTimestamp
```

---

Namespaces

```bash
kubectl get ns
```

---

# 5. Common Pod Status

| Status | Meaning |
|---------|---------|
| Running | Healthy |
| Pending | Waiting for Scheduling |
| CrashLoopBackOff | Container Crashing |
| ImagePullBackOff | Image Download Failed |
| ErrImagePull | Wrong Image |
| Completed | Job Finished |
| Terminating | Pod Deleting |
| OOMKilled | Memory Limit Exceeded |

---

# 6. Investigation Flow

```
Alert

↓

Business Impact

↓

Nodes

↓

Pods

↓

Events

↓

Describe

↓

Logs

↓

Exec

↓

Service

↓

Endpoints

↓

Ingress

↓

Application

↓

RCA
```

---

# 7. CrashLoopBackOff Checklist

```bash
kubectl get pods

kubectl describe pod

kubectl logs

kubectl logs --previous

kubectl exec
```

Check

- Environment Variables
- ConfigMaps
- Secrets
- Startup Errors
- Database Connectivity

---

# 8. Pending Pod Checklist

```bash
kubectl describe pod
```

Check

- CPU
- Memory
- Node Availability
- Affinity
- Taints
- PVC
- Scheduler Events

---

# 9. ImagePullBackOff Checklist

Check

- Image Name
- Image Tag
- Registry Access
- Secret
- Internet Access

Commands

```bash
kubectl describe pod
```

---

# 10. Service Not Reachable

Verify

```bash
kubectl get svc

kubectl get endpoints

kubectl get pods --show-labels
```

Most Common Cause

Service Selector Mismatch

---

# 11. Ingress Failure

Verify

```bash
kubectl get ingress

kubectl describe ingress

kubectl get svc
```

Check

- Host
- Path
- TLS
- Backend

---

# 12. High CPU Investigation

```bash
kubectl top nodes

kubectl top pods
```

Check

- Infinite Loop
- Traffic Spike
- Memory Leak
- Resource Limits

---

# 13. High Memory Investigation

```bash
kubectl top pods

kubectl describe pod
```

Check

- Memory Leak
- JVM Heap
- Resource Limits
- OOMKilled

---

# 14. Daily Production Commands

```bash
kubectl get nodes

kubectl get pods -A

kubectl get deployments -A

kubectl get svc -A

kubectl get ingress -A

kubectl top nodes

kubectl top pods

kubectl get events -A
```

---

# 15. Security Checklist

✔ RBAC

✔ Network Policies

✔ Secrets

✔ TLS

✔ Image Scanning

✔ Pod Security Standards

✔ Audit Logging

✔ Least Privilege

---

# 16. Production Best Practices

- Never use latest image.
- Always configure Requests & Limits.
- Configure Health Probes.
- Use Namespaces.
- Use Labels.
- Use GitOps.
- Enable Monitoring.
- Backup etcd.
- Test Disaster Recovery.
- Document Runbooks.

---

# 17. Most Asked Interview Questions

- Explain Kubernetes Architecture.
- Difference between Deployment and StatefulSet.
- Explain Service Types.
- Explain Ingress.
- Explain RBAC.
- Explain HPA.
- Explain ConfigMaps vs Secrets.
- Explain Network Policies.
- Explain CrashLoopBackOff.
- Explain Pending Pods.
- Explain ImagePullBackOff.
- Explain OOMKilled.

---

# 18. Marathi Quick Revision

- kubectl → API Server
- Scheduler → Node निवडतो
- kubelet → Pod तयार करतो
- Service → Stable IP
- Ingress → HTTP Routing
- ConfigMap → Configuration
- Secret → Sensitive Data
- HPA → Auto Scaling
- RBAC → Permissions

---

# 19. Manager Round Revision

Manager expects answers covering

- Architecture
- Production Usage
- Business Impact
- Investigation
- RCA
- Rollback
- Prevention

Do not answer only with definitions.

---

# 20. One-Minute Production Flow

```
Developer

↓

GitHub

↓

CI

↓

Docker Image

↓

Registry

↓

Kubernetes

↓

Deployment

↓

Pods

↓

Service

↓

Ingress

↓

Monitoring

↓

Users
```

---

# 21. Marathi Summary (5+ Experience Revision)

## Interview Summary

ही Cheat Sheet Kubernetes ची जलद revision करण्यासाठी आहे. Production Incident किंवा Interview आधी ही एकदा वाचल्यास संपूर्ण flow आठवतो.

### Production Investigation Flow

```
Alert

↓

Nodes

↓

Pods

↓

Events

↓

Describe

↓

Logs

↓

Service

↓

Ingress

↓

RCA
```

### Production Story

एका Sev-1 incident दरम्यान API बंद झाली होती. Investigation करताना Engineer ने थेट logs न पाहता Nodes → Pods → Events → Describe → Service → Endpoints → Logs हा flow वापरला. Service selector चुकीचा असल्यामुळे traffic Pods पर्यंत पोहोचत नव्हता. Configuration दुरुस्त केल्यावर service लगेच restore झाली. Structured investigation मुळे RCA काही मिनिटांत पूर्ण झाले.

### 5+ Years Memory Trick

Production मध्ये नेहमी हा sequence लक्षात ठेवा:

**Node → Pod → Events → Describe → Logs → Service → Endpoints → Ingress → RCA**

हा sequence जवळजवळ प्रत्येक Kubernetes production incident मध्ये उपयोगी पडतो आणि Senior DevOps Engineer ची thought process दर्शवतो.

