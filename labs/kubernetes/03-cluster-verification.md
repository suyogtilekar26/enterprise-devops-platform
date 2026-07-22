# Lab 03 - Kubernetes Cluster Verification

# 1. Objective

The objective of this lab is to perform a complete Kubernetes cluster health verification similar to what a DevOps Engineer performs every morning in production.

By the end of this lab you will be able to

- Verify cluster health
- Verify control plane connectivity
- Verify worker node health
- Verify system namespaces
- Verify Kubernetes system pods
- Verify cluster events
- Detect common issues before deployments

This lab simulates the first activity of an on-call DevOps Engineer.

---

# 2. Prerequisites

Complete

- Lab 01 - Kind Cluster Installation
- Lab 02 - kubectl Configuration

Verify

```bash
kind get clusters

kubectl cluster-info
```

Expected

```
enterprise-devops
```

---

# 3. Enterprise Usage

Every production team begins the day by verifying Kubernetes cluster health.

Typical Morning Checklist

```
Cluster

↓

Nodes

↓

Control Plane

↓

System Pods

↓

Events

↓

Storage

↓

Networking

↓

Application Health
```

Deployments should never begin without cluster verification.

---

# 4. Usage in THIS Project

Before deploying our applications

```
Frontend

API Gateway

Auth Service

Dashboard Service
```

we will verify

```
Cluster

↓

Nodes

↓

Namespaces

↓

CoreDNS

↓

Storage

↓

Events

↓

Ready for Deployment
```

---

# 5. Architecture

```
kubectl

↓

API Server

↓

Control Plane

↓

Worker Nodes

↓

System Pods

↓

Namespaces

↓

Storage

↓

Networking
```

Healthy infrastructure is required before application deployment.

---

# 6. Step-by-Step Implementation

## Step 1

Verify cluster connectivity

```bash
kubectl cluster-info
```

Expected

```
Kubernetes control plane is running...
```

---

## Step 2

Verify nodes

```bash
kubectl get nodes
```

Expected

```
STATUS

Ready
```

---

## Step 3

Display detailed node information

```bash
kubectl describe nodes
```

Review

- Conditions
- Capacity
- Allocatable Resources
- Labels
- Events

---

## Step 4

Verify namespaces

```bash
kubectl get namespaces
```

Expected

```
default

kube-system

kube-public

kube-node-lease
```

---

## Step 5

Verify Kubernetes system pods

```bash
kubectl get pods -n kube-system
```

Expected

All pods should be

```
Running
```

or

```
Completed
```

---

## Step 6

Display all pods

```bash
kubectl get pods -A
```

Verify

- STATUS
- READY
- RESTARTS

---

## Step 7

Verify services

```bash
kubectl get svc -A
```

Important services

- kubernetes
- kube-dns (CoreDNS)

---

## Step 8

Verify events

```bash
kubectl get events -A --sort-by=.metadata.creationTimestamp
```

Look for

- Failed Scheduling
- Image Pull Errors
- Warning Events

---

## Step 9

Verify component status

```bash
kubectl get componentstatuses
```

> Note: This command is deprecated in newer Kubernetes versions. In production, rely on control plane health endpoints and monitoring instead.

---

## Step 10

Verify API resources

```bash
kubectl api-resources
```

Ensure the API server responds correctly.

---

## Step 11

Verify current context

```bash
kubectl config current-context
```

---

## Step 12

Verify cluster information

```bash
kubectl cluster-info dump | head
```

This confirms the API server is responding with cluster details.

---

# 7. Verification

Run

```bash
kubectl get nodes

kubectl get pods -A

kubectl get svc -A

kubectl get events -A

kubectl cluster-info
```

Cluster is healthy when

- Nodes are Ready
- System Pods are Running
- No critical Warning events
- API Server is reachable

---

# 8. Failure Simulation

## Scenario 1

Stop Docker

```bash
sudo systemctl stop docker
```

Run

```bash
kubectl get nodes
```

Expected

Connection failure.

Resolution

```bash
sudo systemctl start docker
```

---

## Scenario 2

Delete the cluster

```bash
kind delete cluster --name enterprise-devops
```

Run

```bash
kubectl cluster-info
```

Expected

Connection refused.

Investigation

```bash
kind get clusters
```

---

## Scenario 3

System Pod Failure

Identify unhealthy pods

```bash
kubectl get pods -n kube-system
```

Investigate

```bash
kubectl describe pod <pod-name> -n kube-system

kubectl logs <pod-name> -n kube-system
```

---

# 9. Troubleshooting

Check cluster

```bash
kubectl cluster-info
```

Check nodes

```bash
kubectl get nodes
```

Describe node

```bash
kubectl describe node
```

System pods

```bash
kubectl get pods -n kube-system
```

Events

```bash
kubectl get events -A
```

Logs

```bash
kubectl logs <pod-name> -n kube-system
```

---

# 10. Production Discussion

In enterprise environments, cluster verification is usually automated using

- Prometheus
- Grafana
- Alertmanager
- Kubernetes Health Checks
- Managed Kubernetes Monitoring

However, DevOps Engineers must still know how to manually verify cluster health during incidents.

---

# 11. Production Best Practices

- Verify cluster before deployments.
- Investigate warning events immediately.
- Monitor node resource utilization.
- Monitor CoreDNS health.
- Verify storage availability.
- Review restart counts daily.
- Keep cluster monitoring dashboards available.

---

# 12. Real Production Scenario

A scheduled deployment failed because one worker node had entered the `NotReady` state after disk exhaustion.

The issue was identified during the morning health verification before deployment. The node was drained, cleaned, and restored before the release window opened, avoiding customer impact.

Routine verification prevented a production outage.

---

# 13. Scenario Interview Questions

Q1. What do you verify every morning in a Kubernetes cluster?

Q2. How do you determine whether a cluster is healthy?

Q3. What is the first command you execute during an incident?

Q4. Why should warning events never be ignored?

---

# 14. Architecture Interview Questions

Q1. Why is API Server availability critical?

Q2. Why are kube-system pods important?

Q3. What happens if CoreDNS becomes unavailable?

Q4. Why should nodes always remain in the Ready state?

---

# 15. Production Support Interview Questions

Q1. A node is NotReady. What will you investigate?

Q2. System pods are restarting continuously. What is your approach?

Q3. A deployment is scheduled in 30 minutes. What health checks will you perform first?

---

# 16. Cleanup

No cleanup is required.

This lab performs only verification activities.

---

# 17. Important Commands

```bash
kubectl cluster-info

kubectl get nodes

kubectl describe nodes

kubectl get namespaces

kubectl get pods -A

kubectl get pods -n kube-system

kubectl get svc -A

kubectl get events -A

kubectl api-resources

kubectl config current-context
```

---

# 18. Marathi Quick Revision

- Deployment आधी Cluster verify करा.
- Nodes Ready असले पाहिजेत.
- kube-system Pods Running असले पाहिजेत.
- Events तपासा.
- CoreDNS आणि API Server healthy असले पाहिजेत.
- Warning Events दुर्लक्ष करू नका.

---

# 19. Enterprise Learning Outcome

After completing this lab you should be able to

- Perform a production-style health check
- Verify Kubernetes infrastructure
- Detect unhealthy nodes
- Detect unhealthy system pods
- Review cluster events
- Decide whether the cluster is ready for deployments

---

# 20. Next Lab

```
04-create-first-pod.md
```

In the next lab we will deploy our first Kubernetes Pod, inspect its lifecycle, verify scheduling, and begin interacting with workloads running inside the cluster.

---

# 21. Marathi Summary (5+ Experience Revision)

## Interview Summary

Production मध्ये कोणतेही deployment सुरू करण्यापूर्वी Kubernetes cluster health verify करणे ही अनिवार्य प्रक्रिया आहे. Senior DevOps Engineer फक्त `kubectl get pods` चालवत नाही; तो Nodes, System Pods, Events, Services आणि API Server यांची एकत्रित पडताळणी करतो.

### Production Investigation Flow

```
API Server

↓

Nodes

↓

System Pods

↓

Services

↓

Events

↓

Resource Health

↓

Deployment Decision
```

### Production Story

एका Financial Production Cluster मध्ये release window सुरू होण्याच्या आधी routine cluster verification केली जात होती. त्या वेळी एका node वर DiskPressure condition दिसली आणि काही system pods restart होत असल्याचे आढळले. Deployment थांबवून node दुरुस्त करण्यात आला. Release दोन तास उशिरा झाला, पण production outage टळला. Morning verification मुळे मोठा business impact टाळता आला.

### 5+ Years Memory Trick

Interview मध्ये जर विचारले,

**"What do you verify before every production deployment?"**

उत्तर:

"I verify API Server connectivity, node health, kube-system pods, cluster events, services, resource availability and ensure there are no critical warnings before approving any production deployment."

