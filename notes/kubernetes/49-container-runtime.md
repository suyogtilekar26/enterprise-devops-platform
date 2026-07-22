# Kubernetes Container Runtime

# 1. Purpose

The purpose of the Container Runtime is to pull container images, create containers, start them, stop them and manage their lifecycle on Kubernetes Worker Nodes.

The Container Runtime is responsible for actually running containers.

Without a Container Runtime,

Pods cannot start.

---

# 2. Introduction

Imagine our Enterprise DevOps Platform.

Deployment

↓

Scheduler

↓

Worker Node

↓

Kubelet

↓

Question

Who actually starts the container?

Answer

```
Container Runtime
```

Example

```
Deployment

↓

API Server

↓

Scheduler

↓

Worker Node

↓

Kubelet

↓

Container Runtime

↓

Container Running
```

Without Container Runtime

```
Pod Scheduled

↓

No Runtime

↓

Container Never Starts

↓

Application Down
```

---

# 3. Enterprise Usage

Every Kubernetes Worker Node requires a Container Runtime.

Common Container Runtimes

- containerd
- CRI-O

Older Runtime

- Docker Engine (via Dockershim - Deprecated)

Production Kubernetes clusters primarily use

- containerd
- CRI-O

---

# 4. Usage in THIS Project

Enterprise DevOps Platform

```
Frontend

↓

Kubelet

↓

containerd

↓

React Container

------------------------

API Gateway

↓

containerd

↓

Flask Container

------------------------

Auth Service

↓

containerd

↓

Python Container

------------------------

Dashboard Service

↓

containerd

↓

Flask Container
```

Our Kubernetes implementation will use

```
containerd
```

---

# 5. Architecture

```
              API Server

                   │

                   ▼

               Scheduler

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

            OCI Image

                   │

                   ▼

             Running Container
```

---

# 6. Internal Workflow

```
Deployment Created

↓

Scheduler

↓

Worker Node Selected

↓

Kubelet Reads Pod

↓

Container Runtime Pulls Image

↓

Creates Container

↓

Starts Container

↓

Reports Status

↓

API Server
```

---

# 7. Responsibilities of Container Runtime

The Container Runtime

- Pulls Images
- Creates Containers
- Starts Containers
- Stops Containers
- Deletes Containers
- Reports Container Status
- Manages Image Cache

The Runtime does NOT

- Schedule Pods
- Manage Deployments
- Perform RBAC

Those responsibilities belong to other Kubernetes components.

---

# 8. Container Runtime Interface (CRI)

Kubernetes communicates with Container Runtimes through

```
CRI

(Container Runtime Interface)
```

Architecture

```
Kubelet

↓

CRI

↓

containerd

↓

Containers
```

CRI allows Kubernetes to support multiple runtimes.

---

# 9. OCI (Open Container Initiative)

Container images follow

```
OCI Standards
```

Examples

- Docker Images
- containerd Images
- CRI-O Images

OCI ensures portability across runtimes.

---

# 10. Daily DevOps Activities

- Check Runtime Health
- Pull Images
- Investigate Image Pull Failures
- Clean Old Images
- Verify Runtime Version
- Monitor Disk Usage

---

# 11. Production Best Practices

- Use containerd in Production.
- Keep Runtime Updated.
- Remove Unused Images.
- Enable Image Signature Verification.
- Monitor Runtime Logs.
- Use Trusted Image Registries.

---

# 12. Security

- Use Signed Images.
- Scan Images for Vulnerabilities.
- Restrict Privileged Containers.
- Use Private Registries.
- Rotate Registry Credentials.
- Monitor Runtime Activity.

---

# 13. Troubleshooting

Check Nodes

```bash
kubectl get nodes
```

Describe Pod

```bash
kubectl describe pod <pod-name>
```

Check Events

```bash
kubectl get events
```

For self-managed Kubernetes

```bash
systemctl status containerd
```

View Runtime Logs

```bash
journalctl -u containerd
```

List Images (containerd)

```bash
ctr images list
```

---

# 14. Real Production Scenarios

## Scenario 1

### ImagePullBackOff

Symptoms

```
Pod

↓

ImagePullBackOff
```

Root Cause

Image not found.

Wrong image tag.

Resolution

Corrected image name and tag.

Deployment succeeded.

---

## Scenario 2

### Runtime Service Stopped

Symptoms

```
Pods

↓

ContainerCreating

Forever
```

Investigation

```
systemctl status containerd
```

Result

Runtime service stopped.

Resolution

Restarted containerd.

---

## Scenario 3

### Disk Full

Symptoms

```
Image Pull Failed
```

Root Cause

Old images consumed disk space.

Resolution

Removed unused images.

Expanded disk.

---

# 15. Scenario Interview Questions

Q1. What is a Container Runtime?

Answer

A Container Runtime is responsible for pulling images, creating containers and managing their lifecycle.

---

Q2. Does Kubernetes still use Docker?

Answer

Modern Kubernetes uses containerd or CRI-O.

Dockershim has been removed from Kubernetes.

---

Q3. What is CRI?

Answer

CRI is the Container Runtime Interface used by Kubelet to communicate with the Container Runtime.

---

Q4. Does the Scheduler communicate with the Runtime?

Answer

No.

Scheduler selects the Node.

Kubelet communicates with the Runtime.

---

# 16. Architecture Interview Questions

Explain Container Startup.

```
Deployment

↓

Scheduler

↓

Worker Node

↓

Kubelet

↓

CRI

↓

Container Runtime

↓

Container Started
```

---

Q2.

Difference between Kubelet and Container Runtime?

Answer

Kubelet manages Pods on the Worker Node.

The Container Runtime actually creates and runs containers.

---

# 17. Production Support Interview Questions

Production Investigation Flow

```
Pod Failed

↓

Describe Pod

↓

Events

↓

Image Pull

↓

Container Runtime

↓

Runtime Logs

↓

Resolved
```

Manager Question

"Our Pods are stuck in ContainerCreating."

Expected Answer

- Check Pod Events
- Verify Image Availability
- Check Container Runtime Service
- Review Runtime Logs
- Verify Registry Connectivity
- Restart Runtime if required

---

# 18. Related Runbooks

- imagepullbackoff.md
- containerd-service-failed.md
- container-runtime-disk-full.md

---

# 19. Common Incidents

- ImagePullBackOff
- ErrImagePull
- ContainerCreating
- Runtime Service Failure
- Image Cache Full

---

# 20. Commands

```bash
kubectl describe pod <pod-name>

kubectl get events

systemctl status containerd

systemctl restart containerd

journalctl -u containerd

ctr images list

crictl ps
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
    image: myregistry/api-gateway:v1.0.0
```

Container Startup Flow

```
Pod YAML

↓

API Server

↓

Scheduler

↓

Worker Node

↓

Kubelet

↓

CRI

↓

containerd

↓

Pull Image

↓

Create Container

↓

Start Container

↓

Running
```

Explanation

```
image
```

Specifies the OCI-compliant container image.

The Container Runtime checks whether the image exists locally.

If not,

it pulls the image from the configured registry before creating and starting the container.

---

# 22. Marathi Quick Revision

- Container Runtime म्हणजे Container चालवणारा Component.
- Kubernetes मध्ये containerd सर्वाधिक वापरले जाते.
- Kubelet Runtime शी CRI वापरून संवाद साधतो.
- Runtime Image Pull करून Container Start करतो.
- Runtime नसल्यास Pods सुरू होत नाहीत.

---

# 23. Marathi Summary (5+ Years Experience Revision)

## Interview Summary

Container Runtime हा Worker Node वरील Component आहे जो Container Images Pull करतो, Containers तयार करतो आणि त्यांचे Lifecycle Manage करतो.

Kubelet CRI (Container Runtime Interface) वापरून Runtime शी संवाद साधतो.

Production मध्ये containerd हा सर्वाधिक वापरला जाणारा Runtime आहे.

## Production Investigation Flow

```
Pod Failed

↓

Describe Pod

↓

Events

↓

Image Pull

↓

Container Runtime

↓

Runtime Logs

↓

Resolved
```

## Production Story

Production EKS Cluster मध्ये नवीन Deployment `ContainerCreating` अवस्थेत अडकली.

`kubectl describe pod` मध्ये कोणतीही Scheduling Error नव्हती.

`systemctl status containerd` तपासल्यावर containerd Service Crash झाल्याचे आढळले.

Service Restart केल्यानंतर Kubelet ने पुन्हा Runtime शी संवाद साधला आणि सर्व Containers यशस्वीपणे सुरू झाले.

## Memory Trick

**Scheduler = Select Node**

↓

**Kubelet = Manage Pod**

↓

**CRI = Communication Layer**

↓

**Container Runtime = Run Container**

Remember

**Pod → Kubelet → CRI → containerd → Running Container**

