# Kubernetes Cluster

# 1. Purpose

The purpose of this document is to understand what a Kubernetes Cluster is and how all Kubernetes components work together.

A Cluster is the complete environment where containerized applications are deployed and managed.

---

# 2. Introduction

A Kubernetes Cluster is a collection of machines working together.

A Cluster always contains

- Control Plane
- One or More Worker Nodes

The Control Plane manages the cluster.

Worker Nodes run applications.

Without a Cluster, Kubernetes cannot function.

---

# 3. Enterprise Usage

Every company deploys applications inside a Kubernetes Cluster.

Examples

- Banking Applications
- E-Commerce Websites
- OTT Platforms
- Healthcare Systems
- Insurance Applications
- AI Platforms

A Production Cluster may contain

- 3 Control Plane Nodes
- 10 Worker Nodes
- 500+ Pods

Large companies may have hundreds of clusters.

---

# 4. Usage in THIS Project

```
Developer

↓

GitHub

↓

GitHub Actions

↓

GHCR

↓

Kind Kubernetes Cluster

↓

Frontend

↓

API Gateway

↓

Auth Service

↓

Dashboard Service

↓

Users
```

---

# 5. Architecture

```
                 Kubernetes Cluster

+------------------------------------------------+

              Control Plane

 API Server

 Scheduler

 Controller Manager

 etcd

--------------------------------------------------

 Worker Node-1

 Frontend Pod

 API Gateway Pod

--------------------------------------------------

 Worker Node-2

 Auth Pod

 Dashboard Pod

+------------------------------------------------+
```

---

# 6. Internal Workflow

```
Developer

↓

Push Code

↓

GitHub Actions

↓

Docker Image

↓

Container Registry

↓

Kubernetes Cluster

↓

Scheduler

↓

Worker Node

↓

Pod Running

↓

Users
```

---

# 7. Cluster Components

A Kubernetes Cluster contains

- Control Plane
- Worker Nodes
- Pods
- Services
- Networking
- Storage

Everything inside Kubernetes belongs to a Cluster.

---

# 8. Types of Kubernetes Clusters

Development Cluster

- Local Machine
- Kind
- Minikube

Testing Cluster

- QA
- UAT

Production Cluster

- Amazon EKS
- Azure AKS
- Google GKE
- OpenShift

---

# 9. Daily DevOps Activities

- Check Cluster Health
- Monitor Nodes
- Review Pod Status
- Check Events
- Deploy Applications
- Scale Applications
- Upgrade Cluster
- Monitor Resource Usage

---

# 10. Production Best Practices

- Always use multiple Worker Nodes.
- Monitor Cluster continuously.
- Keep backups of etcd.
- Separate Dev, QA and Production Clusters.
- Never test directly in Production.
- Enable Monitoring and Logging.

---

# 11. Security

- RBAC
- TLS
- Secrets
- Network Policies
- Image Scanning
- Least Privilege
- Audit Logs

---

# 12. Troubleshooting

Cluster Information

```bash
kubectl cluster-info
```

Cluster Nodes

```bash
kubectl get nodes
```

All Pods

```bash
kubectl get pods -A
```

Events

```bash
kubectl get events -A
```

---

# 13. Real Production Scenarios

## Scenario 1

### Entire Worker Node Lost

```
Worker Node

↓

Power Failure

↓

Node Not Ready

↓

Scheduler

↓

Healthy Worker Node

↓

Pods Recreated

↓

Application Running
```

Production Story

A cloud VM hosting one Worker Node suddenly stopped due to an infrastructure issue.

The Control Plane marked the node as NotReady.

Scheduler moved workloads to healthy Worker Nodes.

Application remained available.

---

## Scenario 2

### Cluster Upgrade

Production clusters are upgraded one Worker Node at a time.

Reason

Avoid downtime.

Pods move automatically to healthy nodes during upgrade.

---

## Scenario 3

### Cluster Scaling

Traffic increased from 10,000 users to 100,000 users.

DevOps team added more Worker Nodes.

Scheduler automatically started using the new Nodes.

---

# 14. Scenario Interview Q&A

Q. What is a Kubernetes Cluster?

Answer

A Kubernetes Cluster is a collection of Control Plane and Worker Nodes working together to run containerized applications.

---

Q. Can a Cluster have only one Worker Node?

Answer

Yes.

Development clusters can.

Production clusters should have multiple Worker Nodes.

---

# 15. Architecture Interview Q&A

Explain Kubernetes Cluster Architecture.

```
Developer

↓

API Server

↓

Scheduler

↓

Worker Nodes

↓

Pods

↓

Services

↓

Ingress

↓

Users
```

---

# 16. Production Support Interview Q&A

Cluster Investigation

```
Alert

↓

kubectl cluster-info

↓

kubectl get nodes

↓

kubectl get pods -A

↓

kubectl get events

↓

Root Cause

↓

Resolution

↓

Verification
```

---

# 17. Related Runbooks

- cluster-health-check.md
- node-not-ready.md
- cluster-upgrade.md
- cluster-backup.md

---

# 18. Common Incidents

- Cluster Unreachable
- Node Not Ready
- Pod Pending
- API Server Failure
- Scheduler Failure
- etcd Failure

---

# 19. Commands

```bash
kubectl cluster-info

kubectl get nodes

kubectl get pods -A

kubectl get namespaces

kubectl get events -A

kubectl top nodes

kubectl top pods
```

---

# 20. Marathi Quick Revision

- Cluster म्हणजे पूर्ण Kubernetes Environment.
- Cluster मध्ये Control Plane आणि Worker Nodes असतात.
- Worker Nodes वर Applications चालतात.
- Control Plane पूर्ण Cluster Manage करतो.

---

# 21. Marathi Summary (5+ Experience Revision)

## Interview Summary

Cluster म्हणजे Kubernetes मधील सर्वात मोठा Logical Unit.

त्यामध्ये Control Plane आणि Worker Nodes असतात.

Applications Cluster मध्ये Deploy होतात.

## Production Investigation Flow

```
Alert

↓

Cluster Reachable?

↓

Yes

↓

Node Healthy?

↓

Pods Running?

↓

Events

↓

Logs

↓

Root Cause
```

## Production Story

Production मध्ये एका Worker Node ला Hardware Failure झाला.

Cluster Down झाला नाही.

कारण Scheduler ने Pods दुसऱ्या Worker Node वर Shift केले.

यालाच High Availability म्हणतात.

## Memory Trick

Remember

**Cluster = Control Plane + Worker Nodes + Pods + Services**

