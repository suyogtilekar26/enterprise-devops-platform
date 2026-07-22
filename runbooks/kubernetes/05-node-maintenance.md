# Kubernetes Runbook 05 - Production Node Maintenance

# 1. Purpose

This runbook explains the standard enterprise procedure for performing planned maintenance on Kubernetes worker nodes without causing unnecessary application downtime.

The objective is to safely drain workloads, perform maintenance, validate cluster health, and return the node to production.

---

# 2. Scope

Applicable to

- Kubernetes Worker Nodes
- Production Clusters
- Staging Clusters
- EKS
- AKS
- GKE
- On-Prem Kubernetes

Maintenance Examples

- OS patching
- Kernel upgrade
- Disk replacement
- VM maintenance
- Hardware replacement
- Security updates
- Node resizing

---

# 3. Symptoms

Maintenance may be required due to

- Scheduled patch window
- Hardware alerts
- Security vulnerabilities
- Disk replacement
- Infrastructure upgrade
- Performance degradation

---

# 4. Business Impact

If maintenance is not performed correctly

- Application downtime
- Pod eviction failures
- Service interruption
- Data loss
- Reduced cluster capacity

If performed correctly

- Minimal customer impact
- Zero or near-zero downtime
- Controlled workload migration

---

# 5. Prerequisites

Required access

- kubectl
- SSH access
- Infrastructure access
- Monitoring dashboard
- Change approval

Verify permissions

```bash
kubectl auth can-i get nodes

kubectl auth can-i drain nodes
```

---

# 6. Pre-Maintenance Checklist

Before beginning

- Maintenance window approved
- Stakeholders notified
- Backup completed (if applicable)
- Cluster healthy
- No active P1/P2 incidents
- Monitoring operational
- Sufficient cluster capacity available

Verify

```bash
kubectl get nodes

kubectl get pods -A
```

---

# 7. Initial Investigation

## Step 1

Verify Node Health

```bash
kubectl get nodes
```

Expected

```
STATUS

Ready
```

---

## Step 2

Check Workloads

```bash
kubectl get pods -A -o wide
```

Identify workloads currently running on the node.

---

## Step 3

Check Cluster Capacity

```bash
kubectl top nodes
```

Ensure remaining nodes can accommodate migrated Pods.

---

# 8. Maintenance Procedure

## Step 1

Mark Node Unschedulable

```bash
kubectl cordon <node-name>
```

Verify

```bash
kubectl get nodes
```

Expected

```
SchedulingDisabled
```

No new Pods will be scheduled.

---

## Step 2

Drain Node

```bash
kubectl drain <node-name> \
--ignore-daemonsets \
--delete-emptydir-data
```

Observe Pod migration.

---

## Step 3

Verify Workloads

```bash
kubectl get pods -A -o wide
```

Ensure workloads have moved to healthy nodes.

---

## Step 4

Perform Maintenance

Examples

- OS updates
- Kernel patch
- Disk replacement
- VM resize
- Security patch
- Reboot

---

## Step 5

Verify Node

After maintenance

```bash
kubectl get nodes
```

Expected

```
Ready
```

---

## Step 6

Enable Scheduling

```bash
kubectl uncordon <node-name>
```

Verify

```bash
kubectl get nodes
```

Expected

```
Ready
```

Scheduling is enabled.

---

# 9. Validation Steps

Verify

```bash
kubectl get nodes

kubectl get pods -A

kubectl rollout status deployment/<deployment>
```

Business Validation

- Login
- APIs
- Dashboard
- Monitoring
- Alerts cleared

---

# 10. Rollback Procedure

If maintenance fails

- Keep node cordoned.
- Restore previous configuration.
- Recover VM or OS.
- Rejoin node after validation.

If node cannot recover

- Replace node.
- Join new worker node.
- Remove failed node from cluster.

---

# 11. Escalation Matrix

L1

- Verify maintenance checklist

↓

L2

- Drain workloads
- Validate cluster

↓

Platform Team

- Kubernetes issues
- Scheduling issues

↓

Infrastructure Team

- OS
- Hardware
- Cloud VM
- Hypervisor

---

# 12. Production Best Practices

- Always cordon before draining.
- Never power off a node without draining.
- Verify PodDisruptionBudgets.
- Perform maintenance during approved windows.
- Monitor workload migration.
- Maintain spare cluster capacity.
- Validate applications after maintenance.

---

# 13. Real Production Scenario

A production worker node required a kernel upgrade.

The engineer

```bash
kubectl cordon worker-02

kubectl drain worker-02 \
--ignore-daemonsets \
--delete-emptydir-data
```

All workloads migrated successfully.

The node was rebooted after patching.

Once Ready

```bash
kubectl uncordon worker-02
```

No customer downtime occurred.

Root Cause

Planned security maintenance.

---

# 14. Scenario Interview Questions

## Q1. Why use cordon before drain?

### Answer

`cordon`

- Prevents new Pods from being scheduled.

`drain`

- Safely migrates existing Pods.

This prevents workloads from returning to the node during maintenance.

---

## Q2. What does drain do?

### Answer

It

- Evicts Pods
- Respects PodDisruptionBudgets
- Moves workloads
- Leaves DaemonSets running unless ignored

Command

```bash
kubectl drain <node> \
--ignore-daemonsets \
--delete-emptydir-data
```

---

## Q3. Can you reboot a production node without draining it?

### Answer

No.

Doing so may abruptly terminate application Pods, causing avoidable outages.

---

# 15. Architecture Interview Questions

## Q1. Explain node maintenance workflow.

### Answer

```
Node Ready

↓

Cordon

↓

Drain

↓

Pod Migration

↓

Maintenance

↓

Node Ready

↓

Uncordon

↓

Scheduling Resumes
```

---

## Q2. Which Kubernetes components participate?

### Answer

- API Server
- Scheduler
- kubelet
- Controller Manager
- ReplicaSet
- Deployment

---

# 16. Production Support Interview Questions

## Q1. A worker node requires an urgent security patch. How will you perform maintenance?

### Answer

Investigation order

```bash
kubectl get nodes

kubectl get pods -A

kubectl cordon <node>

kubectl drain <node>

Perform maintenance

kubectl uncordon <node>
```

Finally

- Verify Pods
- Verify business functionality
- Verify monitoring

---

## Q2. What if drain fails?

### Answer

Investigate

- PodDisruptionBudgets
- Stateful workloads
- Stuck Pods
- Finalizers
- DaemonSets

Never force Pod deletion without understanding the impact.

---

# 17. Commands Reference

```bash
kubectl get nodes

kubectl get pods -A -o wide

kubectl cordon <node>

kubectl drain <node> \
--ignore-daemonsets \
--delete-emptydir-data

kubectl uncordon <node>

kubectl top nodes

kubectl rollout status deployment
```

---

# 18. Marathi Quick Revision

- Maintenance पूर्वी cluster healthy आहे का तपासा.
- Node cordon करा.
- Drain करा.
- Pods migrate झाल्या का verify करा.
- Maintenance पूर्ण करा.
- Node Ready झाल्यावर uncordon करा.
- Business validation करा.

---

# 19. Related Runbooks

- 04-node-notready.md
- 06-deployment-rollback.md
- 19-cluster-disaster-recovery.md
- 20-production-maintenance-checklist.md

---

# 20. Common Mistakes

- Node reboot without drain
- Skipping cordon
- Ignoring PodDisruptionBudget
- Not verifying workload migration
- Performing maintenance during production peak hours
- Forgetting to uncordon the node after maintenance

---

# 21. Marathi Summary (5+ Experience Revision)

## Interview Summary

Production मध्ये worker node maintenance करताना प्रथम cluster health verify करावी. त्यानंतर node ला `cordon` करून नवीन Pods schedule होणे थांबवावे. मग `drain` करून existing Pods इतर healthy nodes वर migrate कराव्यात. Maintenance पूर्ण झाल्यानंतर node Ready आहे याची खात्री करून `uncordon` करावे. शेवटी application आणि monitoring दोन्ही validate करून maintenance बंद करावी.

### Production Investigation Flow

```
Maintenance Window

↓

Cluster Health

↓

Node Ready

↓

Cordon

↓

Drain

↓

Pod Migration

↓

Maintenance

↓

Node Ready

↓

Uncordon

↓

Application Validation

↓

Monitoring

↓

Close Change
```

### Production Story

एका production financial cluster मध्ये quarterly kernel patching करायची होती. Senior DevOps engineer ने प्रत्येक worker node एकावेळी cordon आणि drain करून workloads इतर nodes वर migrate केल्या. प्रत्येक reboot नंतर node Ready झाल्यावर uncordon करण्यात आला. संपूर्ण maintenance दरम्यान ग्राहकांना कोणताही downtime जाणवला नाही. Change review मध्ये या प्रक्रियेला standard operating procedure (SOP) म्हणून स्वीकारण्यात आले.

### 5+ Years Memory Trick

Interview मध्ये जर विचारले,

**"How do you perform production Kubernetes node maintenance?"**

उत्तर:

"I verify cluster health, cordon the node to stop new scheduling, drain existing workloads safely, perform the maintenance, validate that the node returns to the Ready state, uncordon it, and finally verify application health and monitoring before closing the change."

