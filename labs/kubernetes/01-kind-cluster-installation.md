# Lab 01 - Kind Cluster Installation

# 1. Objective

The objective of this lab is to build a local Kubernetes cluster using Kind (Kubernetes IN Docker).

This cluster will be used throughout the entire Enterprise DevOps Platform for

- Kubernetes
- Helm
- Argo CD
- Monitoring
- Terraform
- GitOps
- Enterprise Live Project

This is the foundation lab.

---

# 2. Prerequisites

The following should already be installed

- Ubuntu 22.04+
- Docker
- Docker Compose
- kubectl
- Git
- GitHub Repository

Verify

```bash
docker --version

kubectl version --client

git --version
```

Docker must be running.

```bash
docker ps
```

---

# 3. Enterprise Usage

Enterprise organizations rarely perform experiments directly on production clusters.

Typical environments

```
Developer Laptop

↓

Local Kubernetes

↓

Dev Cluster

↓

QA

↓

UAT

↓

Production
```

Kind allows engineers to safely practice deployments before using managed Kubernetes services such as

- AWS EKS
- Azure AKS
- Google GKE

---

# 4. Usage in THIS Project

Kind Cluster

```
GitHub

↓

Docker

↓

Kind Cluster

↓

Frontend

↓

API Gateway

↓

Auth Service

↓

Dashboard Service

↓

Monitoring

↓

Helm

↓

Argo CD
```

Everything from this point forward depends on this cluster.

---

# 5. Architecture

```
Ubuntu

↓

Docker Engine

↓

Kind

↓

Control Plane Node

↓

Worker Node

↓

kubectl

↓

Kubernetes API Server
```

Later

```
Kind

↓

Ingress

↓

Applications

↓

Prometheus

↓

Grafana

↓

Argo CD
```

---

# 6. Step-by-Step Implementation

## Step 1

Verify Docker

```bash
docker ps
```

Expected

No Docker errors.

---

## Step 2

Download Kind

```bash
curl -Lo ./kind https://kind.sigs.k8s.io/dl/latest/kind-linux-amd64
```

---

## Step 3

Make executable

```bash
chmod +x kind
```

---

## Step 4

Move binary

```bash
sudo mv kind /usr/local/bin/
```

---

## Step 5

Verify installation

```bash
kind version
```

Expected

```
kind v0.x.x
```

---

## Step 6

Create cluster

```bash
kind create cluster --name enterprise-devops
```

Expected

```
Creating cluster ...

Installing CNI

Installing StorageClass

Ready
```

---

## Step 7

Verify cluster

```bash
kubectl cluster-info
```

Expected

```
Kubernetes control plane is running...
```

---

## Step 8

Verify nodes

```bash
kubectl get nodes
```

Expected

```
NAME

STATUS

ROLES

control-plane

Ready
```

---

## Step 9

Verify system pods

```bash
kubectl get pods -A
```

Expected

Pods in

- kube-system

should be

```
Running
```

---

## Step 10

Verify Docker containers

```bash
docker ps
```

You should see

```
kind-control-plane
```

---

# 7. Verification

Verify

```bash
kind get clusters
```

Expected

```
enterprise-devops
```

Verify

```bash
kubectl get nodes
```

Status

```
Ready
```

Verify

```bash
kubectl get pods -A
```

All system pods

```
Running
```

---

# 8. Failure Simulation

## Scenario 1

Docker stopped.

```bash
sudo systemctl stop docker
```

Try

```bash
kind create cluster
```

Expected

Cluster creation fails.

Investigation

```bash
systemctl status docker
```

Resolution

```bash
sudo systemctl start docker
```

---

## Scenario 2

kubectl cannot connect.

```bash
kubectl get nodes
```

Error

```
connection refused
```

Investigation

```bash
kind get clusters

kubectl config current-context
```

Root Cause

Wrong kubeconfig or cluster deleted.

---

## Scenario 3

Cluster deleted accidentally.

Check

```bash
kind get clusters
```

No clusters found.

Resolution

```bash
kind create cluster --name enterprise-devops
```

---

# 9. Troubleshooting

Cluster list

```bash
kind get clusters
```

Delete cluster

```bash
kind delete cluster --name enterprise-devops
```

Cluster info

```bash
kubectl cluster-info
```

Docker

```bash
docker ps

docker logs <container-id>
```

Context

```bash
kubectl config get-contexts

kubectl config current-context
```

---

# 10. Production Discussion

Kind is **not** used in production.

Production platforms generally use

- Amazon EKS
- Azure AKS
- Google GKE
- OpenShift
- Rancher

Why are we using Kind?

Because it allows

- Safe experimentation
- Fast cluster creation
- Offline development
- CI testing
- Local troubleshooting

The Kubernetes concepts remain exactly the same.

---

# 11. Production Best Practices

- Never test directly in production.
- Validate cluster health before deployments.
- Keep kubectl version compatible.
- Maintain consistent cluster naming.
- Version control cluster configuration.
- Monitor cluster health after creation.

---

# 12. Real Production Scenario

A new engineer deployed directly to a shared development cluster while testing RBAC changes. The changes accidentally blocked other developers from deploying applications.

After this incident, the organization made local Kind testing mandatory before pushing infrastructure changes to shared environments.

---

# 13. Scenario Interview Questions

Q1. Why use Kind instead of Minikube?

Q2. Why is Kind popular for CI pipelines?

Q3. Can Kind simulate production Kubernetes?

Q4. Why should engineers practice locally first?

---

# 14. Architecture Interview Questions

Q1. Explain the architecture of Kind.

Q2. How does Kind use Docker internally?

Q3. Where does the Kubernetes Control Plane run in Kind?

---

# 15. Production Support Interview Questions

Q1. kubectl cannot connect to the cluster. What will you check first?

Q2. Docker is running but Kind cluster is unavailable. How will you investigate?

Q3. Why is verifying cluster health important before deployments?

---

# 16. Cleanup

Delete cluster

```bash
kind delete cluster --name enterprise-devops
```

Verify

```bash
kind get clusters
```

Expected

No clusters listed.

---

# 17. Important Commands

```bash
kind version

kind create cluster --name enterprise-devops

kind get clusters

kind delete cluster --name enterprise-devops

kubectl cluster-info

kubectl get nodes

kubectl get pods -A

docker ps
```

---

# 18. Marathi Quick Revision

- Kind म्हणजे Kubernetes IN Docker.
- हा local Kubernetes cluster आहे.
- Production साठी वापरत नाही.
- Helm, Argo CD आणि Monitoring याच cluster वर शिकणार आहोत.
- Docker चालू असणे आवश्यक आहे.

---

# 19. Enterprise Learning Outcome

After this lab you should be able to

- Install Kind
- Create Cluster
- Verify Cluster
- Troubleshoot Basic Issues
- Delete and Recreate Cluster
- Understand Local Kubernetes Architecture

---

# 20. Next Lab

```
02-kubectl-configuration.md
```

In the next lab we will understand

- kubeconfig
- contexts
- namespaces
- kubectl configuration
- switching clusters
- production kubectl practices

---

# 21. Marathi Summary (5+ Experience Revision)

## Interview Summary

Kind हा local Kubernetes cluster तयार करण्यासाठी वापरला जाणारा tool आहे. Enterprise मध्ये तो production साठी वापरला जात नाही, पण development, testing, CI pipelines आणि learning साठी खूप लोकप्रिय आहे.

### Production Investigation Flow

```
Docker Running?

↓

Kind Cluster Exists?

↓

kubectl Context Correct?

↓

API Server Reachable?

↓

Nodes Ready?

↓

System Pods Running?

↓

Cluster Ready
```

### Production Story

एका CI pipeline मध्ये प्रत्येक build साठी नवीन Kind cluster तयार करून integration tests चालवले जात होते. एका दिवशी सर्व builds fail झाले. Investigation मध्ये Docker daemon बंद असल्याचे आढळले. Docker service सुरू केल्यानंतर Kind clusters पुन्हा तयार झाले आणि pipeline यशस्वी झाली. Root Cause Kubernetes नव्हता, तर underlying Docker service होती.

### 5+ Years Memory Trick

Interview मध्ये जर विचारले,

**"Why Kind?"**

उत्तर:

"Kind provides a lightweight Kubernetes environment running inside Docker, making it ideal for local development, CI pipelines and safe experimentation before deploying to managed Kubernetes platforms like EKS, AKS or GKE."

