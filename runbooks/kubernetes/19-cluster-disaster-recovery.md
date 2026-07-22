# Kubernetes Runbook 19 - Cluster Disaster Recovery

# 1. Purpose

This runbook explains how to perform Disaster Recovery (DR) for a Kubernetes production cluster after a catastrophic failure.

Disaster Recovery covers scenarios where the Kubernetes cluster becomes partially or completely unavailable due to infrastructure failures, storage corruption, accidental deletion, ransomware, cloud outages, or major control plane failures.

The objective is to restore critical production services within the agreed Recovery Time Objective (RTO) and Recovery Point Objective (RPO), minimize business impact, and complete the Root Cause Analysis (RCA).

---

# 2. Scope

Applicable to

- Complete Cluster Failure
- Control Plane Failure
- Multiple Worker Node Failure
- etcd Corruption
- Datacenter Failure
- Cloud Region Failure
- Disaster Recovery Sites

Supported Platforms

- kubeadm
- EKS
- AKS
- GKE
- OpenShift
- Rancher
- On-Prem Kubernetes

---

# 3. Symptoms

Users may report

- Entire application unavailable
- Website inaccessible
- Login failures
- Payment failures
- API unavailable

Monitoring may report

- Cluster unreachable
- API Server unavailable
- Node unavailable
- All workloads down
- etcd failure
- Monitoring offline

Example

```
Infrastructure Failure

↓

Control Plane Down

↓

Worker Nodes Lost

↓

Applications Down

↓

Business Outage
```

---

# 4. Business Impact

Critical

- Complete production outage
- Customer transactions stopped
- Revenue loss
- SLA violation

Medium

- Regional outage
- Partial business impact

Low

- Development cluster unavailable

---

# 5. Possible Root Causes

- Datacenter outage
- Cloud region failure
- etcd corruption
- Storage failure
- Control Plane failure
- Ransomware attack
- Human error
- Network outage
- DNS failure
- Power failure

---

# 6. Prerequisites

Required

- Approved Disaster Recovery Plan
- Latest etcd Backup
- Infrastructure Backup
- Kubernetes Manifests
- Helm Charts
- Container Images
- DNS Access
- Load Balancer Access
- Cloud Credentials

Verify

```bash
kubectl cluster-info

etcdctl snapshot status backup.db
```

---

# 7. Initial Investigation

## Step 1

Determine Scope

Questions

- Single Pod?
- Single Node?
- Entire Cluster?
- Entire Region?
- Complete Datacenter?

---

## Step 2

Verify Infrastructure

Check

- Virtual Machines
- Worker Nodes
- Storage
- Networking
- DNS
- Load Balancer

---

## Step 3

Verify Control Plane

Attempt

```bash
kubectl cluster-info
```

---

## Step 4

Verify Backup Availability

Check

- etcd Snapshot
- Infrastructure Backup
- Git Repository
- Helm Charts
- Container Registry

---

# 8. Detailed Investigation

## Step 1

Review Incident Timeline

Determine

- When failure started
- Recent deployments
- Infrastructure changes
- Maintenance activity

---

## Step 2

Determine Recovery Strategy

Options

- Recover existing cluster
- Restore from backup
- Build new cluster
- Fail over to DR site

---

## Step 3

Validate Backup Integrity

```bash
etcdctl snapshot status backup.db
```

---

## Step 4

Provision Infrastructure

Recover

- Control Plane
- Worker Nodes
- Storage
- Networking

---

## Step 5

Restore Cluster State

Restore

- etcd
- Kubernetes manifests
- Helm releases
- Secrets
- ConfigMaps

---

## Step 6

Restore Applications

Deploy

- Frontend
- API Gateway
- Auth Service
- Dashboard Service

Verify

- Images
- PVCs
- Services
- Ingress

---

## Step 7

Restore External Dependencies

Verify

- Database
- Redis
- Kafka
- DNS
- Object Storage
- Cloud Services

---

## Step 8

Switch Production Traffic

Update

- DNS
- Load Balancer
- Ingress
- Traffic Manager

---

# 9. Resolution Steps

Recover infrastructure.

Restore etcd.

Restore Kubernetes resources.

Deploy applications.

Restore storage.

Restore networking.

Validate workloads.

Enable production traffic.

---

# 10. Validation Steps

Cluster

```bash
kubectl get nodes

kubectl get pods -A

kubectl get deployments -A

kubectl get ingress -A
```

Business Validation

- Login
- APIs
- Dashboard
- Database
- Authentication
- Monitoring
- Customer transactions

Monitoring

- CPU
- Memory
- Alerts
- Logs

---

# 11. Rollback Procedure

If DR recovery fails

- Stop production cutover.
- Redirect traffic to previous environment if available.
- Restore previous infrastructure.
- Recover latest verified backup.
- Escalate to Disaster Recovery Team.

Never expose customers to a partially restored environment.

---

# 12. Escalation Matrix

L1

- Declare incident
- Notify stakeholders

↓

L2

- Verify cluster
- Verify backups

↓

Platform Team

- Kubernetes recovery

↓

Infrastructure Team

- Compute
- Storage
- Networking

↓

Database Team

- Database recovery

↓

Security Team

- Security validation

↓

Management

- Business communication

---

# 13. Production Best Practices

- Maintain documented DR procedures.
- Test DR quarterly.
- Automate infrastructure provisioning.
- Store backups in separate locations.
- Monitor backup success.
- Define RTO and RPO.
- Maintain secondary region if business requires high availability.
- Document every recovery exercise.

---

# 14. Real Production Scenario

A financial services company lost an entire on-premises datacenter because of a power distribution failure.

The primary Kubernetes cluster became completely unavailable.

The DR team restored infrastructure in the secondary datacenter, recovered etcd from the latest verified snapshot, redeployed workloads through GitOps, restored databases from replicated storage, and redirected DNS traffic.

Total Recovery Time

```
42 Minutes
```

Business Impact

Minimal because quarterly DR drills had been practiced.

Root Cause

Primary datacenter power failure.

---

# 15. Scenario Interview Questions

## Q1. What are RTO and RPO?

### Answer

RTO

Maximum acceptable recovery time.

RPO

Maximum acceptable amount of data loss.

---

## Q2. What should be restored first during cluster recovery?

### Answer

1. Infrastructure
2. Control Plane
3. etcd
4. Worker Nodes
5. Applications
6. Business validation

---

## Q3. Why should Disaster Recovery be tested regularly?

### Answer

Backups are only valuable if successful restoration has been verified.

Regular DR drills identify documentation gaps, automation failures and recovery delays before a real disaster occurs.

---

# 16. Architecture Interview Questions

## Q1. Explain Disaster Recovery architecture.

### Answer

```
Primary Cluster

↓

Backup Storage

↓

Secondary Region

↓

Infrastructure

↓

Control Plane

↓

etcd Restore

↓

Applications

↓

DNS Cutover

↓

Customer Traffic
```

---

## Q2. Which production systems participate?

### Answer

- Kubernetes
- etcd
- DNS
- Load Balancer
- Container Registry
- Databases
- Monitoring
- Git Repository
- Helm
- Argo CD

---

# 17. Production Support Interview Questions

## Q1. Walk through a production Kubernetes Disaster Recovery.

### Answer

Commands

```bash
kubectl cluster-info

etcdctl snapshot status backup.db

kubectl get nodes

kubectl get pods -A

kubectl get ingress -A
```

Recovery Order

- Infrastructure
- Control Plane
- etcd
- Worker Nodes
- Applications
- Storage
- Networking
- Business validation
- Monitoring validation

---

## Q2. What production mistakes commonly cause DR failures?

### Answer

- Backup never tested
- Missing etcd snapshot
- Images unavailable
- Secrets missing
- DNS forgotten
- Database not synchronized
- No DR documentation
- No recovery rehearsal
- No ownership matrix

---

# 18. Commands Reference

```bash
kubectl cluster-info

kubectl get nodes

kubectl get pods -A

kubectl get deployments -A

kubectl get ingress -A

etcdctl snapshot status backup.db

etcdctl snapshot restore backup.db

kubectl apply -f

helm install

helm upgrade
```

---

# 19. Marathi Quick Revision

- Disaster ची scope ठरवा.
- Infrastructure verify करा.
- etcd backup verify करा.
- Cluster restore करा.
- Applications restore करा.
- Database verify करा.
- DNS switch करा.
- Business validation करा.

---

# 20. Related Runbooks

- 17-api-server-unreachable.md
- 18-etcd-backup-and-restore.md
- 20-production-maintenance-checklist.md
- incidents/kubernetes/

---

# 21. Marathi Summary (5+ Experience Revision)

## Interview Summary

Production Disaster Recovery मध्ये प्रथम incident ची व्याप्ती (scope) निश्चित केली जाते. त्यानंतर infrastructure, control plane आणि etcd restore केले जाते. Worker nodes, applications, storage, networking आणि external dependencies recover करून शेवटी DNS किंवा Load Balancer द्वारे production traffic cutover केली जाते. प्रत्येक टप्प्यानंतर technical validation आणि business validation आवश्यक असते.

### Production Investigation Flow

```
Disaster

↓

Incident Declaration

↓

Infrastructure Assessment

↓

Backup Verification

↓

Control Plane Recovery

↓

etcd Restore

↓

Worker Nodes

↓

Applications

↓

External Dependencies

↓

DNS Cutover

↓

Business Validation

↓

RCA
```

### Production Story

एका production retail कंपनीमध्ये storage SAN failure मुळे संपूर्ण Kubernetes cluster inaccessible झाला. DR team ने पूर्वनियोजित runbook वापरून नवीन control plane उभा केला, verified etcd snapshot restore केली, GitOps द्वारे सर्व workloads deploy केले आणि replicated database वर traffic switch केले. संपूर्ण production 45 मिनिटांत recover झाली. Incident review मध्ये automated DR validation pipeline आणि monthly restore testing लागू करण्यात आले.

### 5+ Years Memory Trick

Interview मध्ये जर विचारले,

**"How do you perform Kubernetes Disaster Recovery in production?"**

उत्तर:

"I first assess the disaster scope, verify infrastructure and backup availability, recover the control plane, restore etcd, rebuild worker nodes if required, restore Kubernetes resources and applications, validate external dependencies, perform business validation, switch production traffic, monitor system stability, and complete the RCA with lessons learned."

