# kubectl Commands

# 1. Purpose

The purpose of `kubectl` is to interact with the Kubernetes API Server and manage Kubernetes resources.

Every production activity performed by a DevOps Engineer—deployment, troubleshooting, debugging, monitoring, scaling, security verification, or incident investigation—starts with `kubectl`.

For a 5+ Years DevOps Engineer, knowing only the syntax is not enough. You should know **when**, **why**, and **in what order** to use each command during a production incident.

---

# 2. Introduction

```
Developer

↓

kubectl

↓

API Server

↓

Kubernetes Cluster
```

`kubectl` is the official Kubernetes CLI.

It communicates with the API Server using kubeconfig credentials.

Every command ultimately reaches the API Server.

---

# 3. Enterprise Usage

Production teams use kubectl for

- Daily deployments
- Production troubleshooting
- Incident response
- Cluster health verification
- Pod debugging
- Resource management
- Scaling applications
- Rollbacks
- Log collection
- Emergency fixes

---

# 4. Usage in THIS Project

For our Enterprise DevOps Platform, kubectl will be used to manage

```
Frontend Deployment

↓

API Gateway

↓

Auth Service

↓

Dashboard Service

↓

Services

↓

Ingress

↓

Monitoring Stack
```

Every future deployment in this repository will use kubectl.

---

# 5. Architecture

```
Engineer

↓

kubectl

↓

API Server

↓

Scheduler

↓

Worker Node

↓

Pod

↓

Application
```

---

# 6. Internal Workflow

Engineer Executes Command

↓

kubectl

↓

Authentication

↓

API Server

↓

Authorization

↓

Validation

↓

Cluster State Updated

↓

Desired State Maintained

---

# 7. Daily DevOps Activities

Typical daily commands

Check cluster

```bash
kubectl cluster-info
```

View nodes

```bash
kubectl get nodes
```

View pods

```bash
kubectl get pods -A
```

View deployments

```bash
kubectl get deployments -A
```

View services

```bash
kubectl get svc -A
```

View namespaces

```bash
kubectl get ns
```

---

# 8. Most Important Commands

## Cluster

```bash
kubectl cluster-info
```

---

## Nodes

```bash
kubectl get nodes

kubectl describe node <node-name>

kubectl top node
```

---

## Pods

```bash
kubectl get pods

kubectl get pods -A

kubectl get pods -o wide

kubectl describe pod <pod-name>

kubectl logs <pod-name>

kubectl logs -f <pod-name>

kubectl exec -it <pod-name> -- sh

kubectl delete pod <pod-name>
```

---

## Deployments

```bash
kubectl get deployments

kubectl describe deployment <deployment>

kubectl rollout status deployment/<deployment>

kubectl rollout history deployment/<deployment>

kubectl rollout undo deployment/<deployment>

kubectl scale deployment <deployment> --replicas=3
```

---

## Services

```bash
kubectl get svc

kubectl describe svc <service-name>
```

---

## ConfigMaps

```bash
kubectl get configmap

kubectl describe configmap
```

---

## Secrets

```bash
kubectl get secrets

kubectl describe secret
```

---

## Events

```bash
kubectl get events

kubectl get events -A

kubectl get events --sort-by=.metadata.creationTimestamp
```

---

## Resources

```bash
kubectl top pods

kubectl top nodes
```

---

## Apply

```bash
kubectl apply -f deployment.yaml
```

---

## Delete

```bash
kubectl delete -f deployment.yaml
```

---

## Explain Resource

```bash
kubectl explain deployment

kubectl explain pod.spec

kubectl explain service.spec
```

---

## API Resources

```bash
kubectl api-resources
```

---

## API Versions

```bash
kubectl api-versions
```

---

## Authentication

```bash
kubectl auth can-i create deployment

kubectl auth can-i delete pod
```

---

## Port Forward

```bash
kubectl port-forward pod/<pod-name> 8080:80
```

---

## Copy Files

```bash
kubectl cp file.txt pod-name:/tmp/
```

---

# 9. Production Best Practices

- Never edit production resources without change approval.
- Prefer declarative deployments.
- Use namespaces.
- Verify context before executing commands.
- Always review rollout status.
- Never delete production Pods without understanding the impact.
- Use labels while filtering resources.
- Record production changes.

---

# 10. Security

Before running any command verify

```bash
kubectl config current-context
```

Never

- Use cluster-admin unnecessarily.
- Execute destructive commands without validation.
- Modify production directly without approval.

Always follow RBAC policies.

---

# 11. Troubleshooting

Cluster unavailable

```bash
kubectl cluster-info
```

Pods not running

```bash
kubectl get pods -A

kubectl describe pod
```

Application failure

```bash
kubectl logs

kubectl exec
```

Deployment issue

```bash
kubectl rollout status

kubectl rollout history
```

Node issue

```bash
kubectl describe node

kubectl top node
```

---

# 12. Real Production Scenarios

## Scenario 1

Users report API failure.

Investigation

```bash
kubectl get pods

kubectl describe pod

kubectl logs
```

Root Cause

CrashLoopBackOff due to invalid environment variable.

---

## Scenario 2

Deployment stuck.

Investigation

```bash
kubectl rollout status

kubectl get events
```

Root Cause

ImagePullBackOff.

---

## Scenario 3

Node under high CPU.

Investigation

```bash
kubectl top node

kubectl top pods
```

Root Cause

One application consuming excessive CPU.

---

## Scenario 4

Developer reports access denied.

Investigation

```bash
kubectl auth can-i create deployment
```

Root Cause

RBAC permission missing.

---

# 13. Scenario Interview Q&A

**Q1. Which command do you execute first during a Kubernetes incident?**

```bash
kubectl get pods -A
```

followed by

```bash
kubectl get events -A
```

---

**Q2. How do you investigate a crashing Pod?**

```bash
kubectl describe pod

kubectl logs

kubectl exec
```

---

**Q3. How do you verify deployment rollout?**

```bash
kubectl rollout status deployment/<deployment>
```

---

# 14. Architecture Interview Q&A

**Q1. Does kubectl communicate directly with Pods?**

No.

Flow

```
kubectl

↓

API Server

↓

Cluster Components

↓

Pods
```

---

**Q2. Why is kubectl considered a client?**

Because it sends authenticated REST API requests to the Kubernetes API Server.

---

# 15. Production Support Interview Q&A

**Q1. Production application is down. Investigation order?**

1.

```bash
kubectl get pods -A
```

2.

```bash
kubectl get events -A
```

3.

```bash
kubectl describe pod
```

4.

```bash
kubectl logs
```

5.

```bash
kubectl rollout status
```

6.

Root Cause Analysis

---

**Q2. Which kubectl commands do you use every day?**

- get
- describe
- logs
- exec
- top
- rollout
- apply
- delete
- auth can-i
- explain

---

# 16. Related Runbooks

- kubernetes-pod-crashloop.md
- kubernetes-imagepullbackoff.md
- kubernetes-node-not-ready.md
- kubernetes-deployment-failure.md

---

# 17. Common Incidents

- CrashLoopBackOff
- ImagePullBackOff
- Pending Pods
- OOMKilled
- Failed Rollout
- RBAC Permission Denied
- Node Not Ready
- API Server Unavailable

---

# 18. Commands Summary

```bash
kubectl get pods -A
kubectl describe pod
kubectl logs
kubectl exec
kubectl rollout status
kubectl rollout undo
kubectl top node
kubectl top pods
kubectl get events
kubectl auth can-i
kubectl explain
kubectl api-resources
```

---

# 19. Production Investigation Order

```
Alert

↓

kubectl get pods

↓

kubectl get events

↓

kubectl describe pod

↓

kubectl logs

↓

kubectl exec

↓

kubectl rollout status

↓

kubectl top

↓

Root Cause Analysis
```

---

# 20. Marathi Quick Revision

- kubectl हा Kubernetes चा CLI आहे.
- प्रत्येक command API Server कडे जाते.
- Incident मध्ये get → describe → logs → exec हा flow वापरा.
- rollout commands deployment साठी खूप महत्त्वाचे आहेत.
- auth can-i ने RBAC verify करता येते.

---

# 21. Marathi Summary (5+ Experience Revision)

## Interview Summary

kubectl हा Kubernetes चा सर्वात महत्त्वाचा production tool आहे. Senior DevOps Engineer commands पाठ करत नाही; तो production incident मध्ये योग्य command योग्य क्रमाने वापरतो.

### Production Investigation Flow

```
Alert

↓

kubectl get pods -A

↓

kubectl get events -A

↓

kubectl describe pod

↓

kubectl logs

↓

kubectl exec

↓

kubectl rollout status

↓

kubectl top

↓

RCA
```

### Production Story

एका production release नंतर API responses थांबले. प्रथम `kubectl get pods -A` मध्ये Pods CrashLoopBackOff मध्ये दिसले. `kubectl describe pod` मध्ये readiness probe failures दिसल्या आणि `kubectl logs` मध्ये चुकीचा database connection string आढळला. ConfigMap दुरुस्त करून rollout restart केल्यानंतर service पुन्हा Healthy झाली.

### 5+ Years Memory Trick

जर interviewer विचारेल,

**"Production Kubernetes issue investigate करण्यासाठी पहिल्या commands कोणत्या?"**

उत्तर:

"मी नेहमी `kubectl get pods`, `kubectl get events`, `kubectl describe pod`, `kubectl logs`, `kubectl exec`, `kubectl rollout status` आणि `kubectl top` या क्रमाने investigation सुरू करतो. हा sequence मला infrastructure, deployment आणि application या तिन्ही स्तरांवरील root cause लवकर शोधायला मदत करतो."

