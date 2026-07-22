# Lab 40 - Kubernetes Cluster Debugging

# 1. Objective

The objective of this lab is to learn a structured enterprise approach to debugging Kubernetes cluster-wide issues affecting multiple applications, nodes or control plane components.

By the end of this lab you will be able to

- Investigate cluster-wide incidents
- Debug Node failures
- Troubleshoot DNS issues
- Verify networking
- Debug API Server connectivity
- Investigate etcd health
- Validate control plane components
- Follow enterprise incident response

Unlike Pod debugging, Cluster Debugging focuses on infrastructure problems impacting multiple workloads simultaneously.

---

# 2. Prerequisites

Complete

- Lab 01 - Lab 39

Verify

```bash
kubectl get nodes

kubectl get pods -A

kubectl cluster-info

kubectl version
```

---

# 3. Enterprise Usage

Typical production incident

```
Monitoring Alert

↓

Multiple Applications Down

↓

Cluster Investigation

↓

Control Plane

↓

Worker Nodes

↓

Networking

↓

Storage

↓

Root Cause

↓

Recovery
```

Cluster incidents are usually Severity-1 (P1) because multiple applications are affected.

---

# 4. Usage in THIS Project

Possible enterprise failures

```
Frontend

↓

Cannot Reach API Gateway
```

```
API Gateway

↓

DNS Failure
```

```
Authentication Service

↓

API Server Connectivity Issue
```

```
Monitoring

↓

Entire Cluster Unhealthy
```

---

# 5. Architecture

```
Users

↓

Ingress

↓

Services

↓

Pods

↓

Worker Nodes

↓

Control Plane

↓

etcd
```

---

# 6. Step-by-Step Implementation

## Step 1

Verify Cluster Health

```bash
kubectl cluster-info
```

Expected

```
Kubernetes control plane is running
```

---

## Step 2

Verify Nodes

```bash
kubectl get nodes
```

Expected

```
STATUS

Ready
```

If a node is

```
NotReady
```

begin node investigation.

---

## Step 3

Check System Pods

```bash
kubectl get pods -n kube-system
```

Verify

- CoreDNS
- kube-proxy
- etcd
- kube-apiserver
- kube-controller-manager
- kube-scheduler

Expected

```
Running
```

---

## Step 4

Verify CoreDNS

```bash
kubectl get pods -n kube-system -l k8s-app=kube-dns
```

or

```bash
kubectl get pods -n kube-system
```

Look for

```
coredns
```

---

## Step 5

Verify API Server

```bash
kubectl cluster-info
```

If unavailable

Investigate

- API Server
- Network
- Certificates

---

## Step 6

Verify Node Resources

```bash
kubectl top nodes

kubectl describe node <node>
```

Review

- CPU
- Memory
- Disk Pressure
- PID Pressure

---

## Step 7

Verify Events

```bash
kubectl get events -A \
--sort-by=.metadata.creationTimestamp
```

Events often reveal

- Scheduling failures
- Network failures
- Storage failures
- Authentication failures

---

## Step 8

Verify DNS

Launch test Pod

```bash
kubectl run dns-test \
--image=busybox \
-it --rm --restart=Never -- sh
```

Inside container

```bash
nslookup kubernetes.default

nslookup google.com
```

Expected

Successful resolution.

---

## Step 9

Verify Workloads

```bash
kubectl get deployments -A

kubectl get pods -A

kubectl get svc -A
```

Identify

- Pending Pods
- CrashLoopBackOff
- ImagePullBackOff
- Failed Services

---

## Step 10

Review Cluster

```bash
kubectl get nodes

kubectl get pods -A

kubectl get events -A

kubectl cluster-info
```

---

# 7. Verification

```bash
kubectl cluster-info

kubectl get nodes

kubectl get pods -A

kubectl get events -A
```

Expected

- Control Plane healthy
- Worker Nodes Ready
- DNS healthy
- System Pods Running

---

# 8. Failure Simulation

## Scenario 1

Worker Node NotReady

Expected

Pods stop scheduling.

Investigate

```bash
kubectl describe node
```

---

## Scenario 2

CoreDNS Failure

Expected

Applications fail DNS lookups.

Symptoms

```
Temporary failure in name resolution
```

---

## Scenario 3

API Server Unavailable

Expected

```
kubectl

Unable to connect to server
```

---

## Scenario 4

Node Disk Pressure

Expected

Pods remain Pending.

---

# 9. Troubleshooting Checklist

Cluster

```bash
kubectl cluster-info
```

Nodes

```bash
kubectl get nodes

kubectl describe node
```

System Pods

```bash
kubectl get pods -n kube-system
```

Events

```bash
kubectl get events -A
```

DNS

```bash
kubectl exec <pod> -- nslookup kubernetes.default
```

Resources

```bash
kubectl top nodes

kubectl top pods -A
```

---

# 10. Production Investigation Workflow

```
P1 Alert

↓

Cluster Health

↓

API Server

↓

Nodes

↓

System Pods

↓

DNS

↓

Networking

↓

Storage

↓

Applications

↓

Root Cause

↓

Recovery

↓

RCA
```

Never assume the application is the problem during cluster-wide outages.

---

# 11. Production Best Practices

- Always check cluster health first.
- Investigate kube-system before application namespaces.
- Verify API Server connectivity.
- Monitor Node conditions continuously.
- Monitor etcd health.
- Validate CoreDNS.
- Capture evidence before restarting components.

---

# 12. Real Production Scenario

A production Kubernetes cluster suddenly experienced failures across every application.

Users reported

- Login failures
- API timeouts
- Monitoring unavailable

Investigation showed

- Worker Nodes healthy
- Pods healthy
- Services healthy

However

CoreDNS Pods were continuously restarting because of an incorrect ConfigMap update.

After restoring the CoreDNS configuration

- DNS recovered
- Applications resumed communication
- No application deployments required changes

Root Cause

Cluster DNS failure.

---

# 13. Scenario Interview Questions

## Q1. Multiple applications fail simultaneously. Where do you begin?

### Answer

Investigation order

1. Cluster Health
2. API Server
3. Worker Nodes
4. kube-system Pods
5. Events
6. DNS
7. Networking
8. Applications

Commands

```bash
kubectl cluster-info

kubectl get nodes

kubectl get pods -A

kubectl get events -A
```

---

## Q2. How do you identify whether the problem is cluster-wide?

### Answer

Indicators

- Multiple namespaces affected
- Multiple applications failing
- Node failures
- CoreDNS failures
- API Server issues
- Control plane alerts

---

## Q3. What does Node NotReady indicate?

### Answer

The kubelet is unable to report healthy status to the API Server.

Possible causes

- Network failure
- kubelet stopped
- High resource utilization
- Disk failure
- OS issue

---

## Q4. Why should kube-system be investigated first?

### Answer

Core infrastructure components run inside the kube-system namespace.

If they fail, application namespaces are affected even when application Pods are healthy.

---

## Q5. Which components are most critical during cluster debugging?

### Answer

- API Server
- etcd
- CoreDNS
- kube-proxy
- Scheduler
- Controller Manager
- Worker Nodes

---

# 14. Architecture Interview Questions

## Q1. Explain Cluster Debugging Architecture.

### Answer

```
Users

↓

Ingress

↓

Services

↓

Pods

↓

Nodes

↓

API Server

↓

etcd
```

Cluster debugging proceeds from the infrastructure layer downward rather than starting with individual applications.

---

## Q2. Why is etcd important?

### Answer

etcd stores the entire Kubernetes cluster state.

If etcd becomes unavailable, Kubernetes cannot reliably process cluster operations.

---

## Q3. How does CoreDNS affect applications?

### Answer

Applications communicate using Kubernetes Service names.

If CoreDNS fails

- Service discovery fails
- Internal communication stops
- Applications appear unavailable

---

## Q4. Why are Events important during cluster incidents?

### Answer

Events provide a timeline of failures including

- Scheduling
- Storage
- Authentication
- Networking
- Node failures

Events often identify the first failing component.

---

# 15. Production Support Interview Questions

## Q1. Every application is timing out. How will you investigate?

### Answer

Commands

```bash
kubectl cluster-info

kubectl get nodes

kubectl get pods -A

kubectl get events -A

kubectl get pods -n kube-system
```

Investigate

- API Server
- Nodes
- CoreDNS
- Networking
- Ingress
- Load Balancer

---

## Q2. Worker Node becomes NotReady. What will you check?

### Answer

Commands

```bash
kubectl describe node <node>

kubectl get events

kubectl top node
```

Investigate

- Kubelet
- Container Runtime
- CPU
- Memory
- Disk
- Network connectivity

---

## Q3. Internal service names are not resolving. What will you investigate?

### Answer

Commands

```bash
kubectl get pods -n kube-system

kubectl logs -n kube-system <coredns-pod>

kubectl exec <pod> -- nslookup kubernetes.default
```

Investigate

- CoreDNS
- DNS ConfigMap
- Network Policies
- CNI

---

## Q4. What is your enterprise P1 cluster debugging workflow?

### Answer

```
Incident Declared

↓

War Room

↓

Cluster Health

↓

Control Plane

↓

Nodes

↓

Networking

↓

Storage

↓

Applications

↓

Recovery

↓

Monitoring

↓

RCA
```

Production incidents require structured communication alongside technical troubleshooting.

---

# 16. Cleanup

```bash
kubectl delete pod dns-test --ignore-not-found=true
```

---

# 17. Important Commands

```bash
kubectl cluster-info

kubectl get nodes

kubectl describe node <node>

kubectl get pods -A

kubectl get pods -n kube-system

kubectl get events -A

kubectl top nodes

kubectl top pods -A
```

---

# 18. Marathi Quick Revision

- प्रथम Cluster Health तपासा.
- kube-system namespace तपासा.
- CoreDNS आणि API Server verify करा.
- Nodes Ready आहेत का ते तपासा.
- Events नेहमी तपासा.
- Application वर दोष देण्यापूर्वी infrastructure verify करा.

---

# 19. Enterprise Learning Outcome

After completing this lab you should be able to

- Debug cluster-wide failures
- Investigate control plane issues
- Troubleshoot DNS failures
- Validate node health
- Follow enterprise P1 incident workflow
- Perform structured cluster investigation

---

# 20. Next Lab

```
41-disaster-recovery-simulation.md
```

In the next lab we will simulate production disaster recovery scenarios including node failures, backup validation, workload restoration and cluster recovery procedures.

---

# 21. Marathi Summary (5+ Experience Revision)

## Interview Summary

Cluster Debugging म्हणजे संपूर्ण Kubernetes infrastructure ची तपासणी. जर अनेक applications एकाच वेळी fail होत असतील तर समस्या बहुधा application मध्ये नसून Control Plane, Worker Nodes, CoreDNS, CNI किंवा etcd मध्ये असते. Enterprise production मध्ये troubleshooting नेहमी Cluster Health → Control Plane → Nodes → Networking → Applications या क्रमाने केली जाते.

### Production Investigation Flow

```
P1 Alert

↓

Cluster Health

↓

API Server

↓

kube-system

↓

CoreDNS

↓

Worker Nodes

↓

Networking

↓

Applications

↓

Root Cause

↓

Recovery

↓

RCA
```

### Production Story

एका production insurance platform मध्ये अचानक सर्व microservices timeout देऊ लागल्या. सुरुवातीला प्रत्येक application टीमने स्वतःच्या services troubleshoot करण्यास सुरुवात केली. Platform SRE टीमने cluster-level investigation केली आणि CoreDNS ConfigMap मध्ये चुकीचा change deploy झाल्याचे आढळले. CoreDNS Pods restart होत असल्यामुळे service discovery पूर्णपणे बंद झाली होती. ConfigMap rollback केल्यानंतर काही मिनिटांत संपूर्ण cluster पूर्ववत झाला. Incident review मध्ये cluster-first investigation हा standard operating procedure बनवण्यात आला.

### 5+ Years Memory Trick

Interview मध्ये जर विचारले,

**"How do you debug a Kubernetes cluster-wide outage?"**

उत्तर:

"I first determine whether the issue affects multiple applications. Then I verify cluster health, API Server availability, worker node status, kube-system components, CoreDNS, networking and events. Only after confirming that the infrastructure is healthy do I move to application-level debugging. This structured approach is the standard enterprise practice for handling P1 Kubernetes incidents."

