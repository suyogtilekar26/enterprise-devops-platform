# Kubernetes Upgrades

# 1. Purpose

The purpose of this document is to understand how Kubernetes clusters are upgraded in enterprise production environments.

Upgrading a Kubernetes cluster is one of the highest-risk maintenance activities performed by a DevOps team. A poorly planned upgrade can cause application downtime, control plane instability, or node failures.

A Senior DevOps Engineer must understand not only **how** to upgrade a cluster, but also **how to minimize business impact and recover if something goes wrong.**

---

# 2. Introduction

Kubernetes releases new versions regularly.

Production clusters cannot remain on unsupported versions forever.

Cluster upgrades include

- Control Plane Upgrade
- Worker Node Upgrade
- kubelet Upgrade
- kubectl Upgrade
- CNI Compatibility Check
- CSI Compatibility Check
- Ingress Controller Compatibility
- Monitoring Stack Compatibility

Enterprise upgrades are always planned and tested before production.

---

# 3. Enterprise Usage

Production upgrades are performed for

- Security patches
- Bug fixes
- Performance improvements
- API deprecations
- Compliance requirements
- Vendor support

Typical environments

Development

↓

Testing

↓

UAT

↓

Staging

↓

Production

Production is always upgraded last.

---

# 4. Usage in THIS Project

For our Enterprise DevOps Platform

```
Kind Cluster

↓

Upgrade Kubernetes Version

↓

Verify Control Plane

↓

Verify Worker Nodes

↓

Verify Applications

↓

Verify Monitoring

↓

Production Validation
```

Later this same approach will be followed in

- EKS
- AKS
- GKE

---

# 5. Upgrade Architecture

```
Current Cluster

↓

Backup

↓

Compatibility Check

↓

Upgrade Control Plane

↓

Upgrade Worker Nodes

↓

Drain Nodes

↓

Move Workloads

↓

Upgrade kubelet

↓

Uncordon Nodes

↓

Validation

↓

Production Ready
```

---

# 6. Internal Workflow

Upgrade Planning

↓

Maintenance Window

↓

Backup etcd

↓

Check Cluster Health

↓

Upgrade Control Plane

↓

Verify API Server

↓

Drain Worker Node

↓

Upgrade Worker

↓

Uncordon Worker

↓

Validate Workloads

↓

Application Testing

↓

Monitoring Verification

↓

Close Change Request

---

# 7. Daily DevOps Activities

Before Upgrade

```bash
kubectl get nodes

kubectl get pods -A

kubectl get componentstatuses
```

Check Version

```bash
kubectl version
```

Check Node Version

```bash
kubectl get nodes -o wide
```

Verify Workloads

```bash
kubectl get deployments -A

kubectl get daemonsets -A

kubectl get statefulsets -A
```

---

# 8. Production Best Practices

- Always take etcd backup.
- Upgrade non-production first.
- Read Kubernetes Release Notes.
- Verify deprecated APIs.
- Perform upgrades during maintenance windows.
- Upgrade one worker node at a time.
- Monitor applications after every step.
- Keep rollback plan ready.

---

# 9. Security

Before upgrade

- Verify RBAC
- Backup Secrets
- Backup etcd
- Verify certificates
- Validate admission controllers

After upgrade

- Verify authentication
- Verify authorization
- Verify audit logs

---

# 10. Upgrade Procedure

## Step 1

Check Version

```bash
kubectl version
```

---

## Step 2

Verify Cluster

```bash
kubectl get nodes

kubectl get pods -A
```

---

## Step 3

Backup

- etcd
- manifests
- configuration

---

## Step 4

Drain Node

```bash
kubectl drain <node-name> --ignore-daemonsets
```

---

## Step 5

Upgrade Node

Vendor-specific process

---

## Step 6

Uncordon

```bash
kubectl uncordon <node-name>
```

---

## Step 7

Verify

```bash
kubectl get nodes

kubectl get pods -A
```

---

## Step 8

Application Testing

- Login
- API
- Dashboard
- Monitoring

---

# 11. Real Production Scenarios

## Scenario 1

Worker node upgrade failed.

Investigation

```bash
kubectl describe node
```

Root Cause

Container runtime version mismatch.

---

## Scenario 2

Pods stuck Pending after upgrade.

Investigation

```bash
kubectl get events

kubectl describe pod
```

Root Cause

Scheduler compatibility issue.

---

## Scenario 3

Ingress stopped routing traffic.

Investigation

```bash
kubectl get ingress

kubectl logs -n ingress-nginx
```

Root Cause

Ingress Controller version incompatible.

---

## Scenario 4

Application unavailable after upgrade.

Investigation

- Readiness
- Services
- Endpoints

Root Cause

Deprecated API version used by Deployment.

---

# 12. Scenario Interview Q&A

### Q1. Which component should be upgraded first?

Control Plane.

---

### Q2. Why drain a node?

To safely move workloads before maintenance.

---

### Q3. Why not upgrade all worker nodes together?

To avoid application downtime.

---

# 13. Architecture Interview Q&A

### Q1. Why is the Control Plane upgraded before Workers?

Workers communicate with the Control Plane.

The Control Plane must support the new API version first.

---

### Q2. Why are workloads rescheduled during upgrades?

Because drained nodes cannot run application Pods.

---

# 14. Production Support Interview Q&A

### Q1. Production upgrade completed but application is unavailable.

Investigation order

- Nodes
- Pods
- Events
- Services
- Endpoints
- Ingress
- Logs

---

### Q2. What should always be available before starting an upgrade?

- Backup
- Rollback Plan
- Maintenance Window
- Monitoring
- Change Approval

---

# 15. Related Runbooks

- Kubernetes Cluster Upgrade
- Node Maintenance
- Node Drain
- Control Plane Recovery
- etcd Backup & Restore

---

# 16. Common Incidents

- Failed Upgrade
- Node Not Ready
- API Version Mismatch
- Scheduler Failure
- Ingress Failure
- Monitoring Failure
- kubelet Failure
- Container Runtime Failure

---

# 17. Commands

```bash
kubectl version

kubectl get nodes

kubectl get pods -A

kubectl drain <node>

kubectl uncordon <node>

kubectl describe node

kubectl get events -A
```

---

# 18. Marathi Quick Revision

- Upgrade आधी Backup घ्या.
- Control Plane आधी Upgrade करा.
- Worker Nodes एक-एक करून Upgrade करा.
- Drain आणि Uncordon वापरा.
- प्रत्येक Upgrade नंतर Application Verify करा.

---

# 19. Production Upgrade Flow

```
Planning

↓

Approval

↓

Backup

↓

Control Plane Upgrade

↓

Validation

↓

Drain Worker

↓

Upgrade Worker

↓

Uncordon

↓

Validation

↓

Monitoring

↓

Business Verification
```

---

# 20. Upgrade Checklist

- Maintenance Window Approved
- Change Request Approved
- etcd Backup Completed
- Cluster Healthy
- Release Notes Reviewed
- Rollback Plan Ready
- Monitoring Active
- Team Available
- Business Informed

---

# 21. Marathi Summary (5+ Experience Revision)

## Interview Summary

Production Kubernetes Upgrade म्हणजे फक्त version बदलणे नाही. हा controlled, low-risk maintenance process आहे ज्यामध्ये planning, backup, validation आणि rollback हे चार pillars असतात.

### Production Investigation Flow

```
Maintenance Window

↓

Backup

↓

Upgrade

↓

Node Validation

↓

Pod Validation

↓

Application Testing

↓

Monitoring

↓

Business Confirmation
```

### Production Story

एका production cluster upgrade दरम्यान एका worker node वर kubelet upgrade नंतर Pods schedule होत नव्हते. `kubectl describe node` मध्ये kubelet आणि container runtime version mismatch दिसला. Runtime upgrade करून node uncordon केल्यानंतर workloads पुन्हा schedule झाले आणि कोणताही business downtime झाला नाही.

### 5+ Years Memory Trick

जर interviewer विचारेल,

**"Production Kubernetes Upgrade कसा कराल?"**

उत्तर:

"मी प्रथम maintenance window, change approval आणि etcd backup verify करतो. त्यानंतर Control Plane upgrade करतो. मग प्रत्येक worker node ला drain करून upgrade करतो, uncordon करतो आणि प्रत्येक टप्प्यावर Pods, Services, Ingress आणि application validate करतो. शेवटी monitoring आणि business verification करून change close करतो."

