# Kubernetes Control Plane Components

# 1. Purpose

The purpose of this document is to understand the Control Plane, which is the brain of Kubernetes.

Every decision inside a Kubernetes cluster is made by the Control Plane.

If the Control Plane is unavailable, new deployments, scaling operations, and cluster management stop working.

---

# 2. Introduction

The Control Plane manages the complete Kubernetes cluster.

It is responsible for

- Receiving requests
- Scheduling Pods
- Maintaining Desired State
- Storing Cluster Information
- Monitoring Cluster Health

Main Components

- API Server
- etcd
- Scheduler
- Controller Manager

---

# 3. Enterprise Usage

In Production

- Amazon EKS manages the Control Plane.
- Azure AKS manages the Control Plane.
- Google GKE manages the Control Plane.

Self-managed Kubernetes clusters require DevOps Engineers to manage the Control Plane.

---

# 4. Usage in THIS Project

```
Developer

↓

kubectl apply

↓

API Server

↓

etcd

↓

Scheduler

↓

Controller Manager

↓

Worker Nodes

↓

Pods
```

---

# 5. Architecture

```
                 CONTROL PLANE

+--------------------------------------+

        API Server

             │

             ▼

           etcd

             ▲

             │

        Scheduler

             │

             ▼

   Controller Manager

             │

             ▼

       Worker Nodes
```

---

# 6. Internal Workflow

```
Developer

↓

kubectl apply

↓

API Server

↓

Validate Request

↓

Store Desired State

↓

etcd

↓

Scheduler

↓

Worker Node Selected

↓

Controller Manager

↓

Pod Running
```

---

# 7. API Server

The API Server is the main entry point of Kubernetes.

Every request passes through the API Server.

Responsibilities

- Authentication
- Authorization
- Validation
- API Requests
- Communication with etcd

Example

```
kubectl get pods

↓

API Server

↓

etcd

↓

Pod Information Returned
```

---

# 8. etcd

etcd is the database of Kubernetes.

Stores

- Pods
- Nodes
- Deployments
- Secrets
- ConfigMaps
- Cluster State

```
API Server

↓

etcd

↓

Cluster Data
```

Production Rule

If etcd data is lost,

the cluster configuration is lost.

Always backup etcd.

---

# 9. Scheduler

Scheduler decides

"Which Worker Node should run the Pod?"

Scheduler does NOT create Pods.

Responsibilities

- Select Best Node
- Check CPU
- Check Memory
- Check Affinity
- Check Taints

```
Pending Pod

↓

Scheduler

↓

Worker Node Selected
```

---

# 10. Controller Manager

Controller Manager maintains Desired State.

Example

Desired Replicas = 3

Running Replicas = 2

Controller Manager immediately creates one more Pod.

```
Desired = 3

↓

Current = 2

↓

Create New Pod

↓

Desired Achieved
```

---

# 11. Production Best Practices

- Keep Control Plane Highly Available.
- Backup etcd regularly.
- Restrict API Server access.
- Enable TLS.
- Enable RBAC.
- Monitor Scheduler.
- Monitor Controller Manager.

---

# 12. Troubleshooting

Check Control Plane Pods

```bash
kubectl get pods -n kube-system
```

Check API Server

```bash
kubectl cluster-info
```

Check Events

```bash
kubectl get events -A
```

Check Component Status

```bash
kubectl get componentstatuses
```

---

# 13. Real Production Scenarios

## Scenario 1

API Server Down

Symptoms

- kubectl stops working
- CI/CD deployment fails

Existing Pods continue running.

---

## Scenario 2

Scheduler Failure

Symptoms

New Pods remain Pending.

Existing Pods continue serving traffic.

---

## Scenario 3

etcd Corruption

Business Impact

Entire cluster configuration becomes unavailable.

Resolution

Restore etcd backup.

---

# 14. Scenario Interview Q&A

Q. Does Scheduler create Pods?

No.

Scheduler only selects the Worker Node.

kubelet creates the Pod.

---

Q. Which component stores Kubernetes information?

etcd.

---

# 15. Architecture Interview Q&A

Explain Control Plane.

```
API Server

↓

Authentication

↓

Authorization

↓

etcd

↓

Scheduler

↓

Controller Manager

↓

Worker Nodes
```

---

# 16. Production Support Interview Q&A

Investigation Flow

```
Alert

↓

kubectl cluster-info

↓

kubectl get nodes

↓

kubectl get pods -n kube-system

↓

kubectl get events

↓

Logs

↓

Root Cause
```

---

# 17. Related Runbooks

- api-server-down.md
- etcd-backup.md
- scheduler-failure.md
- controller-manager-down.md

---

# 18. Common Incidents

- API Server Crash
- Scheduler Failure
- etcd Corruption
- Controller Manager Failure
- Authentication Failure

---

# 19. Commands

```bash
kubectl cluster-info

kubectl get componentstatuses

kubectl get pods -n kube-system

kubectl logs -n kube-system <pod-name>

kubectl get events -A
```

---

# 20. Marathi Quick Revision

- API Server म्हणजे Kubernetes चा Entry Point.
- etcd म्हणजे Database.
- Scheduler Node निवडतो.
- Controller Manager Desired State Maintain करतो.

---

# 21. Marathi Summary (5+ Experience Revision)

## Interview Summary

Control Plane हा Kubernetes चा Brain आहे.

API Server सर्व Request स्वीकारतो.

Scheduler योग्य Worker Node निवडतो.

etcd सर्व माहिती साठवतो.

Controller Manager Desired State कायम ठेवतो.

## Production Story

Production मध्ये Scheduler process crash झाला.

Running Pods चालू होते.

पण नवीन Pods Pending राहिले.

Scheduler restart केल्यानंतर सर्व Pending Pods लगेच Running झाले.

## Memory Trick

**ASEC**

A → API Server

S → Scheduler

E → etcd

C → Controller Manager

Remember

**API accepts → etcd stores → Scheduler selects → Controller Manager maintains.**

