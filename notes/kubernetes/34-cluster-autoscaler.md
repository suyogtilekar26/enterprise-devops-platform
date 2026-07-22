# Kubernetes Cluster Autoscaler

# 1. Purpose

The purpose of Cluster Autoscaler is to automatically increase or decrease the number of Kubernetes Worker Nodes based on resource demand.

While HPA scales Pods,

Cluster Autoscaler scales Nodes.

This ensures that Pods always have enough infrastructure to run.

---

# 2. Introduction

Imagine our API Gateway Deployment scales

```
3 Pods

↓

25 Pods
```

using HPA.

However,

the Kubernetes Cluster only has

```
2 Worker Nodes
```

There is no space to schedule new Pods.

Result

```
Pods

↓

Pending
```

Cluster Autoscaler solves this problem.

---

# 3. Enterprise Usage

Cluster Autoscaler is used in

- AWS EKS
- Azure AKS
- Google GKE
- OpenShift

Large Production Clusters automatically add or remove Worker Nodes throughout the day based on application demand.

---

# 4. Usage in THIS Project

```
Internet Traffic

↓

HPA

↓

Pods Increase

↓

Worker Nodes Full

↓

Cluster Autoscaler

↓

New Worker Node

↓

Pending Pods Scheduled
```

Our Enterprise DevOps Platform will use HPA together with Cluster Autoscaler on AWS EKS.

---

# 5. Architecture

```
              Users

                │

                ▼

               HPA

                │

        More Pods Created

                │

                ▼

      Scheduler Cannot Place Pods

                │

                ▼

      Cluster Autoscaler Detects

                │

                ▼

        AWS Auto Scaling Group

                │

                ▼

        New Worker Node Added

                │

                ▼

       Pending Pods Scheduled
```

---

# 6. Internal Workflow

```
Traffic Increases

↓

CPU High

↓

HPA Creates Pods

↓

Pods Pending

↓

Cluster Autoscaler

↓

Creates Worker Node

↓

Node Joins Cluster

↓

Pods Running
```

---

# 7. How Cluster Autoscaler Works

Step 1

Pods remain

```
Pending
```

↓

Step 2

Cluster Autoscaler checks why.

↓

Step 3

Reason

```
Insufficient CPU

or

Insufficient Memory
```

↓

Step 4

Cloud Provider creates a new VM.

↓

Step 5

Worker Node joins the cluster.

↓

Step 6

Pending Pods are scheduled automatically.

---

# 8. HPA vs Cluster Autoscaler

Horizontal Pod Autoscaler

```
Scale

Pods
```

Cluster Autoscaler

```
Scale

Nodes
```

Together

```
Users

↓

HPA

↓

Pods

↓

Cluster Autoscaler

↓

Nodes
```

---

# 9. Scale Down Process

When traffic decreases

```
Pods Reduced

↓

Worker Node Empty

↓

Cluster Autoscaler

↓

Remove Worker Node

↓

Lower Cloud Cost
```

---

# 10. Daily DevOps Activities

- Monitor Pending Pods
- Monitor Worker Node Count
- Verify Auto Scaling Events
- Check Cloud Auto Scaling Group
- Review Cluster Capacity
- Monitor Infrastructure Cost

---

# 11. Production Best Practices

- Configure minimum Node count.
- Configure maximum Node count.
- Use Multiple Availability Zones.
- Monitor Node utilization.
- Avoid aggressive scale-down.
- Enable Node health monitoring.

---

# 12. Security

- Restrict IAM permissions.
- Secure Auto Scaling Groups.
- Enable Cloud Audit Logs.
- Monitor scaling events.
- Apply least privilege.

---

# 13. Troubleshooting

Check Nodes

```bash
kubectl get nodes
```

Check Pending Pods

```bash
kubectl get pods
```

Describe Pod

```bash
kubectl describe pod <pod-name>
```

Check Cluster Autoscaler Logs

```bash
kubectl logs -n kube-system deployment/cluster-autoscaler
```

View Events

```bash
kubectl get events
```

---

# 14. Real Production Scenarios

## Scenario 1

### Pods Pending

Symptoms

```
Pending Pods
```

Reason

```
Insufficient CPU
```

Investigation

```bash
kubectl describe pod
```

Resolution

Cluster Autoscaler added two Worker Nodes.

Pods became Running.

---

## Scenario 2

### Auto Scaling Failed

Pods remained Pending.

Root Cause

AWS Auto Scaling Group reached

```
Maximum Nodes
```

Resolution

Increase maximum Node count.

---

## Scenario 3

### Night Time

Traffic reduced significantly.

Cluster Autoscaler reduced

```
12 Nodes

↓

4 Nodes
```

Infrastructure cost dropped automatically.

---

# 15. Scenario Interview Questions

Q1. What is Cluster Autoscaler?

Answer

Cluster Autoscaler automatically adds or removes Worker Nodes based on scheduling requirements.

---

Q2. What triggers Cluster Autoscaler?

Answer

Pending Pods that cannot be scheduled due to insufficient cluster resources.

---

Q3. Does Cluster Autoscaler scale Pods?

Answer

No.

It scales Worker Nodes.

---

Q4. Can Cluster Autoscaler reduce cloud costs?

Answer

Yes.

It removes underutilized Worker Nodes when demand decreases.

---

# 16. Architecture Interview Questions

Explain the complete scaling flow.

```
Traffic

↓

HPA

↓

Pods

↓

Pending

↓

Cluster Autoscaler

↓

Worker Nodes

↓

Pods Running
```

---

Q2.

Why do HPA and Cluster Autoscaler work together?

Answer

HPA creates additional Pods.

Cluster Autoscaler provides the infrastructure required to run those Pods.

---

# 17. Production Support Interview Questions

Production Investigation Flow

```
Pods Pending

↓

Describe Pod

↓

Insufficient Resources

↓

Cluster Autoscaler Logs

↓

Cloud Auto Scaling Group

↓

New Node

↓

Resolved
```

Manager Question

"Pods are Pending even though HPA created additional replicas."

Expected Answer

- Verify Pending Pod Events
- Check Cluster Autoscaler
- Review Auto Scaling Group
- Verify Maximum Node Count
- Confirm New Node Registration
- Validate Pod Scheduling

---

# 18. Related Runbooks

- cluster-autoscaler-not-scaling.md
- pending-pods.md
- node-capacity-exhausted.md

---

# 19. Common Incidents

- Pending Pods
- Maximum Node Limit Reached
- Worker Node Not Joining
- Cloud API Permission Failure
- Autoscaler Not Running

---

# 20. Commands

```bash
kubectl get nodes

kubectl get pods

kubectl describe pod <pod-name>

kubectl logs -n kube-system deployment/cluster-autoscaler

kubectl get events
```

---

# 21. YAML Deep Dive

Example

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: cluster-autoscaler
```

Important Configuration Parameters

```
--nodes=3:10:eks-node-group
```

Explanation

```
3
```

Minimum Worker Nodes.

```
10
```

Maximum Worker Nodes.

```
eks-node-group
```

AWS Auto Scaling Group managed by Cluster Autoscaler.

---

# 22. Marathi Quick Revision

- HPA Pods वाढवतो.
- Cluster Autoscaler Worker Nodes वाढवतो.
- Pending Pods आल्यावर Cluster Autoscaler काम करतो.
- Traffic कमी झाला की Nodes कमी करतो.
- AWS EKS मध्ये Auto Scaling Group वापरतो.

---

# 23. Marathi Summary (5+ Years Experience Revision)

## Interview Summary

Cluster Autoscaler हा Kubernetes Cluster चा Infrastructure Scaling Component आहे.

HPA Pods Scale करतो, तर Cluster Autoscaler त्या Pods साठी Worker Nodes तयार करतो किंवा हटवतो.

Production मध्ये दोन्ही एकत्र वापरले जातात.

## Production Investigation Flow

```
Pods Pending

↓

Describe Pod

↓

Insufficient Resources

↓

Cluster Autoscaler

↓

Auto Scaling Group

↓

Worker Node

↓

Resolved
```

## Production Story

Production मध्ये Marketing Campaign दरम्यान HPA ने 50 Pods तयार केले.

त्यापैकी 20 Pods Pending राहिले कारण Cluster मध्ये Nodes कमी होते.

Cluster Autoscaler ने AWS Auto Scaling Group वापरून 4 नवीन Worker Nodes तयार केले.

काही मिनिटांत सर्व Pods Running झाले आणि Users ना Downtime जाणवला नाही.

## Memory Trick

**HPA = Scale Pods**

**Cluster Autoscaler = Scale Nodes**

Remember

**No Nodes = No Pods**

