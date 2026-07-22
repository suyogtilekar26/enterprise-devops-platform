# Kubernetes Kubelet

# 1. Purpose

The purpose of Kubelet is to act as the primary agent running on every Kubernetes Worker Node.

Kubelet communicates with the Kubernetes API Server and ensures that Pods assigned to its Worker Node are running correctly.

Kubelet is responsible for maintaining the desired state of Pods on an individual Worker Node.

Without Kubelet, Worker Nodes cannot run Kubernetes workloads.

---

# 2. Introduction

Imagine our Enterprise DevOps Platform.

Scheduler selects

```
Worker Node-2
```

Question

Who actually starts the Pod?

Answer

```
Kubelet
```

Example

```
Deployment

↓

Scheduler

↓

Worker Node

↓

Kubelet

↓

Container Runtime

↓

Pod Running
```

---

# 3. Enterprise Usage

Every Kubernetes Worker Node runs one Kubelet process.

Used in

- AWS EKS
- Azure AKS
- Google GKE
- OpenShift
- Rancher
- On-Prem Kubernetes

No Worker Node can function without Kubelet.

---

# 4. Usage in THIS Project

Enterprise DevOps Platform

```
Frontend Deployment

↓

Scheduler

↓

Worker Node-1

↓

Kubelet

↓

Frontend Running

------------------------

API Gateway

↓

Worker Node-2

↓

Kubelet

↓

API Gateway Running

------------------------

Auth Service

↓

Worker Node-3

↓

Kubelet

↓

Application Running
```

Every Worker Node in our platform will have one Kubelet.

---

# 5. Architecture

```
              API Server

                  │

                  ▼

              Worker Node

                  │

                  ▼

               Kubelet

                  │

                  ▼

         Container Runtime

                  │

                  ▼

                 Pod
```

---

# 6. Internal Workflow

```
Scheduler Assigns Pod

↓

API Server Updates Pod

↓

Kubelet Watches API Server

↓

Reads Pod Specification

↓

Calls Container Runtime

↓

Creates Containers

↓

Monitors Pod Health

↓

Reports Status

↓

API Server
```

---

# 7. Responsibilities of Kubelet

Kubelet performs

- Watches API Server
- Reads Pod Specifications
- Starts Containers
- Restarts Failed Containers
- Executes Health Probes
- Reports Pod Status
- Reports Node Status

Kubelet does NOT decide which Node runs the Pod.

That responsibility belongs to

```
Scheduler
```

---

# 8. Kubelet Communication

Kubelet communicates with

```
API Server

↓

Container Runtime

↓

Pods

↓

CSI Drivers

↓

CNI Plugins
```

It continuously synchronizes the Worker Node with the desired state.

---

# 9. Why Kubelet?

Without Kubelet

```
Pod Assigned

↓

Nothing Starts

↓

Application Down
```

With Kubelet

```
Pod Assigned

↓

Container Started

↓

Health Checked

↓

Running
```

---

# 10. Daily DevOps Activities

- Check Kubelet Status
- Investigate Node Issues
- Review Pod Status
- Check Health Probes
- Review Worker Node Logs
- Restart Kubelet if required

---

# 11. Production Best Practices

- Monitor Kubelet Health.
- Enable TLS Communication.
- Protect Kubelet API.
- Monitor Node Resources.
- Keep Kubernetes Versions Updated.
- Rotate Certificates regularly.

---

# 12. Security

- Enable Mutual TLS.
- Protect Kubelet Endpoint.
- Restrict Anonymous Access.
- Rotate Certificates.
- Monitor Node Authentication.
- Review Audit Logs.

---

# 13. Troubleshooting

Check Nodes

```bash
kubectl get nodes
```

Describe Node

```bash
kubectl describe node <node-name>
```

Check Pods

```bash
kubectl get pods -A
```

View Events

```bash
kubectl get events
```

For self-managed Kubernetes

```bash
systemctl status kubelet
```

View Logs

```bash
journalctl -u kubelet
```

---

# 14. Real Production Scenarios

## Scenario 1

### Kubelet Service Stopped

Symptoms

```
Node

↓

NotReady
```

Pods stopped receiving updates.

Investigation

```
systemctl status kubelet
```

Root Cause

Kubelet service crashed.

Resolution

Restarted Kubelet.

Node became Ready.

---

## Scenario 2

### Health Probe Failure

Kubelet continuously restarted the Pod.

Reason

```
Liveness Probe Failed
```

Resolution

Application Health Endpoint fixed.

Pod stabilized.

---

## Scenario 3

### Container Runtime Failure

Symptoms

```
Pod

↓

ContainerCreating

Forever
```

Investigation

Container Runtime unavailable.

Resolution

Restarted container runtime.

Kubelet created containers successfully.

---

# 15. Scenario Interview Questions

Q1. What is Kubelet?

Answer

Kubelet is the primary Kubernetes agent running on every Worker Node.

---

Q2. Does Kubelet schedule Pods?

Answer

No.

Scheduler selects the Worker Node.

Kubelet starts and manages Pods on that Node.

---

Q3. What happens if Kubelet stops?

Answer

The Worker Node becomes NotReady and Pods cannot be managed properly.

---

Q4. Does Kubelet communicate directly with etcd?

Answer

No.

Kubelet communicates with the Kubernetes API Server.

---

# 16. Architecture Interview Questions

Explain Kubelet Workflow.

```
API Server

↓

Kubelet

↓

Container Runtime

↓

Container

↓

Pod Running
```

---

Q2.

Who starts containers?

Answer

The Container Runtime starts the containers after receiving instructions from Kubelet.

---

# 17. Production Support Interview Questions

Production Investigation Flow

```
Pod Not Running

↓

Worker Node

↓

Kubelet

↓

Container Runtime

↓

Events

↓

Logs

↓

Resolved
```

Manager Question

"Our Worker Node suddenly became NotReady."

Expected Answer

- Verify Node Status
- Check Kubelet Service
- Review Kubelet Logs
- Verify Container Runtime
- Check Network Connectivity
- Restart Services if required

---

# 18. Related Runbooks

- kubelet-notready.md
- kubelet-service-failed.md
- container-runtime-failure.md

---

# 19. Common Incidents

- Node NotReady
- Kubelet Service Crash
- Health Probe Failure
- Container Runtime Failure
- Pod Synchronization Failure

---

# 20. Commands

```bash
kubectl get nodes

kubectl describe node <node-name>

kubectl get events

systemctl status kubelet

systemctl restart kubelet

journalctl -u kubelet
```

---

# 21. YAML Deep Dive

Example

```yaml
apiVersion: v1
kind: Pod

metadata:
  name: api-gateway

spec:
  containers:
  - name: api-gateway
    image: api-gateway:v1
```

Kubelet Processing Flow

```
Pod YAML

↓

API Server

↓

Scheduler

↓

Worker Node

↓

Kubelet Reads Spec

↓

Container Runtime

↓

Container Starts

↓

Health Probe

↓

Pod Running
```

Kubelet continuously compares the running Pod with the desired Pod specification.

If a container exits unexpectedly,

Kubelet requests the Container Runtime to restart it according to the restart policy.

---

# 22. Marathi Quick Revision

- Kubelet हा प्रत्येक Worker Node वर चालणारा Agent आहे.
- Scheduler Node निवडतो, Kubelet Pod चालवतो.
- Kubelet API Server शी संवाद साधतो.
- Kubelet Health Probes चालवतो.
- Node NotReady झाल्यास Kubelet तपासणे आवश्यक असते.

---

# 23. Marathi Summary (5+ Years Experience Revision)

## Interview Summary

Kubelet हा प्रत्येक Kubernetes Worker Node वरील मुख्य Agent आहे.

तो API Server कडून Pod Specification मिळवतो आणि Container Runtime च्या मदतीने Containers सुरू करतो.

तो Pods ची Health Monitor करतो, Status API Server ला Report करतो आणि आवश्यक असल्यास Containers Restart करतो.

## Production Investigation Flow

```
Pod Failed

↓

Node Status

↓

Kubelet

↓

Container Runtime

↓

Events

↓

Logs

↓

Resolved
```

## Production Story

एका Production AKS Cluster मध्ये अचानक एक Worker Node `NotReady` झाला.

त्या Node वरील सर्व Pods नवीन Status Report करत नव्हते.

`systemctl status kubelet` तपासल्यावर Kubelet Service Crash झाल्याचे आढळले.

Logs तपासून Configuration Issue दुरुस्त करण्यात आली आणि Kubelet Restart करण्यात आला.

Node पुन्हा `Ready` झाला आणि Pods सामान्यपणे चालू झाले.

## Memory Trick

**Scheduler = Selects Node**

↓

**Kubelet = Runs Pod**

↓

**Container Runtime = Starts Container**

Remember

**API Server**

↓

**Kubelet**

↓

**Container Runtime**

↓

**Running Pod**

