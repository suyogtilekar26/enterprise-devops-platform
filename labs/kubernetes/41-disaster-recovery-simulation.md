# Lab 41 - Kubernetes Disaster Recovery Simulation

# 1. Objective

The objective of this lab is to simulate enterprise disaster recovery (DR) scenarios and learn how production teams recover Kubernetes workloads after infrastructure failures.

By the end of this lab you will be able to

- Simulate worker node failures
- Recover failed workloads
- Validate Deployment recovery
- Verify Persistent Volume recovery
- Validate cluster health after recovery
- Follow enterprise disaster recovery procedures
- Understand Recovery Time Objective (RTO) and Recovery Point Objective (RPO)

Disaster Recovery is one of the most critical responsibilities of production DevOps and SRE teams.

---

# 2. Prerequisites

Complete

- Lab 01 - Lab 40

Verify

```bash
kubectl get nodes

kubectl get pods -A

kubectl get deployments -A

kubectl cluster-info
```

---

# 3. Enterprise Usage

Typical disaster recovery workflow

```
Production Incident

↓

Incident Declared

↓

Impact Assessment

↓

Recover Infrastructure

↓

Recover Applications

↓

Validate Services

↓

Business Verification

↓

Close Incident

↓

RCA
```

---

# 4. Usage in THIS Project

Possible disaster scenarios

```
Frontend

↓

Node Failure

↓

Automatic Rescheduling
```

```
API Gateway

↓

Deployment Recovery
```

```
Authentication Service

↓

Persistent Volume Validation
```

```
Monitoring Stack

↓

Cluster Health Verification
```

---

# 5. Architecture

```
Worker Node Failure

↓

Pods Lost

↓

Deployment

↓

ReplicaSet

↓

Scheduler

↓

Healthy Worker Node

↓

Pods Recreated
```

---

# 6. Step-by-Step Implementation

## Step 1

Create Demo Deployment

```bash
kubectl create deployment dr-demo \
--image=nginx:stable
```

Scale

```bash
kubectl scale deployment dr-demo \
--replicas=6
```

Verify

```bash
kubectl get pods -o wide
```

---

## Step 2

Verify Distribution

```bash
kubectl get pods -o wide
```

Observe Pods distributed across worker nodes.

---

## Step 3

Simulate Worker Maintenance

Choose one worker node.

Prevent new scheduling

```bash
kubectl cordon <worker-node>
```

Drain

```bash
kubectl drain <worker-node> \
--ignore-daemonsets \
--delete-emptydir-data
```

---

## Step 4

Observe Recovery

```bash
kubectl get pods -w
```

Expected

Pods terminate and are recreated on healthy worker nodes.

---

## Step 5

Validate Deployment

```bash
kubectl rollout status deployment dr-demo

kubectl get deployment
```

Expected

```
Available Replicas = Desired Replicas
```

---

## Step 6

Validate Services

```bash
kubectl get svc

kubectl get endpoints
```

Ensure endpoints are available.

---

## Step 7

Validate Node Health

```bash
kubectl get nodes

kubectl describe node <worker-node>
```

---

## Step 8

Restore Node

```bash
kubectl uncordon <worker-node>
```

Verify

```bash
kubectl get nodes
```

Expected

```
Ready
```

---

## Step 9

Cluster Validation

```bash
kubectl get pods -A

kubectl get deployments -A

kubectl cluster-info
```

---

## Step 10

Recovery Verification

Verify

- Applications
- Nodes
- Services
- DNS
- Events

```bash
kubectl get events -A
```

---

# 7. Verification

```bash
kubectl get nodes

kubectl get pods -A

kubectl get deployments

kubectl get svc

kubectl get endpoints
```

Expected

- All Nodes Ready
- Deployments Healthy
- Services Available
- Pods Running

---

# 8. Failure Simulation

## Scenario 1

Single Worker Node Failure

Expected

Pods automatically move to healthy nodes.

---

## Scenario 2

Single Replica Deployment

Expected

Temporary application downtime.

Lesson

Always deploy multiple replicas.

---

## Scenario 3

Persistent Volume Failure

Expected

Application may start but storage-dependent functionality fails.

Investigate

- PVC
- PV
- StorageClass

---

## Scenario 4

Multiple Worker Node Failure

Expected

Insufficient capacity.

Some Pods remain Pending until additional capacity becomes available.

---

# 9. Troubleshooting

Nodes

```bash
kubectl get nodes

kubectl describe node
```

Pods

```bash
kubectl get pods -A

kubectl describe pod <pod>
```

Deployments

```bash
kubectl rollout status deployment dr-demo

kubectl describe deployment dr-demo
```

Storage

```bash
kubectl get pvc

kubectl get pv
```

Events

```bash
kubectl get events -A
```

---

# 10. Production Disaster Recovery Workflow

```
P1 Incident

↓

War Room

↓

Incident Commander Assigned

↓

Infrastructure Recovery

↓

Cluster Recovery

↓

Application Recovery

↓

Business Validation

↓

Monitoring

↓

Incident Closure

↓

RCA
```

Recovery activities should follow documented runbooks.

---

# 11. Production Best Practices

- Define RTO and RPO.
- Test disaster recovery regularly.
- Keep multiple worker nodes.
- Maintain infrastructure as code.
- Backup etcd regularly.
- Validate backups through restore testing.
- Automate recovery where possible.
- Maintain detailed recovery runbooks.

---

# 12. Real Production Scenario

A cloud provider experienced a hardware failure affecting multiple Kubernetes worker nodes.

Production impact

- Several application Pods terminated.
- Monitoring generated P1 alerts.

Response

- Cluster automatically rescheduled stateless workloads.
- Stateful workloads were restored after storage validation.
- Platform engineers added replacement worker nodes.
- Service availability was restored within the defined RTO.

Root Cause

Infrastructure hardware failure.

Lesson Learned

Well-designed Kubernetes deployments recover automatically when sufficient healthy nodes exist.

---

# 13. Scenario Interview Questions

## Q1. What is Disaster Recovery?

### Answer

Disaster Recovery (DR) is the process of restoring infrastructure, applications and services after a major failure while meeting business recovery objectives.

---

## Q2. What is RTO?

### Answer

Recovery Time Objective (RTO) is the maximum acceptable time required to restore services after an outage.

Example

```
Business Requirement

↓

Application must recover

↓

Within 30 minutes
```

---

## Q3. What is RPO?

### Answer

Recovery Point Objective (RPO) defines the maximum acceptable amount of data loss.

Example

```
Backup every 15 minutes

↓

Maximum data loss

↓

15 minutes
```

---

## Q4. What happens when a worker node fails?

### Answer

If Deployments have multiple replicas and healthy worker nodes are available,

Kubernetes automatically

- Detects Pod failures
- Schedules replacement Pods
- Restores desired state

---

## Q5. Why should DR be tested regularly?

### Answer

Backups alone are not sufficient.

Recovery procedures must be validated through periodic disaster recovery exercises to ensure successful restoration during real incidents.

---

# 14. Architecture Interview Questions

## Q1. Explain Kubernetes Disaster Recovery Architecture.

### Answer

```
Node Failure

↓

Deployment

↓

ReplicaSet

↓

Scheduler

↓

Healthy Node

↓

Pods Recreated
```

Stateless workloads recover automatically when sufficient cluster capacity exists.

---

## Q2. Which components require backup?

### Answer

Critical components

- etcd
- Persistent Volumes
- Git repositories
- Helm values
- Secrets
- ConfigMaps
- Terraform state
- CI/CD configuration

---

## Q3. Why is etcd backup important?

### Answer

etcd stores the entire Kubernetes cluster state.

Without a valid etcd backup, complete cluster recovery becomes significantly more difficult.

---

## Q4. How do enterprises perform DR?

### Answer

Typical strategy

- Multi-node clusters
- etcd backups
- GitOps
- Infrastructure as Code
- Automated rebuilds
- Regular DR testing

---

# 15. Production Support Interview Questions

## Q1. A worker node suddenly fails. How will you investigate?

### Answer

Commands

```bash
kubectl get nodes

kubectl get pods -A

kubectl describe node <node>

kubectl get events -A
```

Investigate

- Node health
- Pod rescheduling
- Deployment replicas
- Storage
- Networking

---

## Q2. Applications did not recover automatically. What will you check?

### Answer

Verify

- Replica count
- Available worker nodes
- Resource capacity
- PVC binding
- Pod Events
- Scheduler logs (if required)

Commands

```bash
kubectl describe deployment

kubectl describe pod

kubectl get pvc

kubectl get nodes
```

---

## Q3. How do you validate successful disaster recovery?

### Answer

Validate

- Nodes Ready
- Pods Running
- Services Available
- Endpoints Healthy
- Business transactions successful
- Monitoring green
- Alerts cleared

---

## Q4. Describe your enterprise disaster recovery workflow.

### Answer

```
Incident

↓

Impact Assessment

↓

Recover Infrastructure

↓

Recover Cluster

↓

Recover Applications

↓

Business Validation

↓

Monitoring

↓

RCA

↓

Improve Runbooks
```

Recovery is not complete until business functionality is verified.

---

# 16. Cleanup

```bash
kubectl delete deployment dr-demo
```

---

# 17. Important Commands

```bash
kubectl cordon <node>

kubectl drain <node> \
--ignore-daemonsets \
--delete-emptydir-data

kubectl uncordon <node>

kubectl get nodes

kubectl get deployments

kubectl rollout status deployment dr-demo

kubectl get events -A

kubectl get pvc

kubectl get pv
```

---

# 18. Marathi Quick Revision

- DR म्हणजे disaster नंतर services restore करणे.
- RTO म्हणजे recovery साठी लागणारा वेळ.
- RPO म्हणजे स्वीकारण्याजोगा data loss.
- Worker node fail झाली तरी Deployments Pods पुन्हा तयार करतात.
- etcd backup हा सर्वात महत्त्वाचा backup आहे.

---

# 19. Enterprise Learning Outcome

After completing this lab you should be able to

- Simulate disaster recovery
- Recover Deployments
- Validate cluster health
- Explain RTO and RPO
- Investigate infrastructure failures
- Follow enterprise DR procedures

---

# 20. Next Lab

```
42-production-deployment.md
```

In the next lab we will deploy the complete enterprise application using Kubernetes Deployments, Services, ConfigMaps, Secrets and Ingress following production best practices.

---

# 21. Marathi Summary (5+ Experience Revision)

## Interview Summary

Disaster Recovery म्हणजे production failure नंतर infrastructure, Kubernetes cluster आणि applications सुरक्षितपणे restore करण्याची प्रक्रिया. Kubernetes मध्ये stateless workloads सामान्यतः Deployments आणि ReplicaSets मुळे आपोआप recover होतात, तर stateful workloads साठी Persistent Volumes आणि backups महत्त्वाचे असतात. Enterprise मध्ये RTO, RPO, etcd backups, GitOps आणि नियमित DR drills या सर्व गोष्टी अत्यावश्यक असतात.

### Production Investigation Flow

```
P1 Incident

↓

Impact Assessment

↓

Node Health

↓

Cluster Health

↓

Application Recovery

↓

Storage Validation

↓

Business Validation

↓

Monitoring

↓

RCA
```

### Production Story

एका production SaaS platform मध्ये cloud availability zone outage मुळे दोन worker nodes अचानक unavailable झाले. Stateless services काही मिनिटांत इतर healthy nodes वर reschedule झाल्या, पण reporting service चे Persistent Volume attach होण्यास विलंब झाला. Platform टीमने storage health verify करून replacement node तयार केला आणि workload restore केला. Incident review नंतर multi-zone node pools आणि नियमित DR simulation अनिवार्य करण्यात आले.

### 5+ Years Memory Trick

Interview मध्ये जर विचारले,

**"How do you perform Kubernetes disaster recovery?"**

उत्तर:

"I first assess the business impact, verify cluster and node health, recover infrastructure if required, ensure Deployments and Stateful workloads are restored, validate Services, DNS and storage, confirm business functionality, monitor the environment and finally complete the RCA with improvements to the disaster recovery runbooks."

