# Kubernetes Controller Manager

# 1. Purpose

The purpose of the Kubernetes Controller Manager is to continuously monitor the cluster and ensure that the actual state matches the desired state stored in etcd.

The Controller Manager is responsible for reconciliation.

If the actual state differs from the desired state, Controllers automatically take corrective action.

Without the Controller Manager, Kubernetes cannot automatically recover from failures.

---

# 2. Introduction

Imagine our Enterprise DevOps Platform.

Deployment

```
Replicas

3
```

Current State

```
Running Pods

2
```

Question

Who creates the missing Pod?

Answer

```
Controller Manager
```

Example

```
Deployment

↓

Desired State

3 Pods

↓

Controller Manager

↓

Creates Missing Pod

↓

Cluster Healthy
```

---

# 3. Enterprise Usage

Every Kubernetes Distribution uses Controller Manager.

Examples

- AWS EKS
- Azure AKS
- Google GKE
- OpenShift
- Rancher
- Self-Managed Kubernetes

Production clusters continuously reconcile thousands of objects every second.

---

# 4. Usage in THIS Project

Enterprise DevOps Platform

```
Frontend

↓

3 Replicas

↓

Controller Manager

↓

Always Maintain 3 Pods

------------------------

API Gateway

↓

2 Replicas

↓

One Pod Crashed

↓

Controller Creates New Pod

------------------------

Auth Service

↓

Deployment Updated

↓

Rolling Update Managed
```

Controller Manager ensures application availability.

---

# 5. Architecture

```
                kubectl

                   │

                   ▼

              API Server

                   │

                   ▼

                 etcd

                   │

                   ▼

          Controller Manager

        ┌──────────┼──────────┐

        ▼          ▼          ▼

 Deployment   ReplicaSet   Node

 Controller   Controller   Controller

        ▼          ▼          ▼

             Worker Nodes

                   ▼

                  Pods
```

---

# 6. Internal Workflow

```
Desired State Stored

↓

Controller Watches API Server

↓

Compare Desired State

↓

Compare Actual State

↓

Mismatch?

↓

YES

↓

Take Corrective Action

↓

Cluster Healthy
```

---

# 7. What is Reconciliation?

Reconciliation means

```
Desired State

=

Actual State
```

Example

Desired

```
3 Pods
```

Actual

```
2 Pods
```

Controller

```
Creates

1 New Pod
```

Result

```
3 Pods Running
```

---

# 8. Major Controllers

## Deployment Controller

Maintains Deployments.

---

## ReplicaSet Controller

Maintains desired number of Pods.

---

## Node Controller

Monitors Worker Nodes.

Detects

- Node Failure
- Node Recovery

---

## Job Controller

Monitors Jobs.

Creates replacement Pods when Jobs fail.

---

## StatefulSet Controller

Maintains Stateful Applications.

---

## DaemonSet Controller

Ensures one Pod runs on every Worker Node.

---

## Endpoint Controller

Updates Service Endpoints.

---

# 9. Why Controller Manager?

Without Controller Manager

```
Pod Crashed

↓

No Recovery

↓

Application Down
```

With Controller Manager

```
Pod Crashed

↓

Controller Detects Failure

↓

Creates Replacement

↓

Application Restored
```

---

# 10. Daily DevOps Activities

- Monitor Controller Health
- Investigate CrashLoopBackOff
- Review Deployment Status
- Verify Replica Count
- Troubleshoot Failed Rollouts
- Review Events

---

# 11. Production Best Practices

- Monitor Controller Manager.
- Enable High Availability.
- Monitor Reconciliation Failures.
- Use Health Checks.
- Avoid Manual Pod Management.
- Let Controllers manage workloads.

---

# 12. Security

- Protect Control Plane.
- Restrict API Access.
- Enable Audit Logs.
- Secure Certificates.
- Monitor Controller Permissions.

---

# 13. Troubleshooting

Check Deployments

```bash
kubectl get deployments
```

Check ReplicaSets

```bash
kubectl get replicasets
```

Check Pods

```bash
kubectl get pods
```

Describe Deployment

```bash
kubectl describe deployment <deployment-name>
```

View Events

```bash
kubectl get events
```

---

# 14. Real Production Scenarios

## Scenario 1

### Pod Crash

Application Pod crashed.

Desired

```
3 Pods
```

Actual

```
2 Pods
```

Controller Manager created a replacement Pod automatically.

Application availability maintained.

---

## Scenario 2

### Worker Node Failure

Worker Node became

```
NotReady
```

Node Controller detected failure.

Pods were rescheduled to healthy Worker Nodes.

---

## Scenario 3

### Replica Mismatch

Deployment

```
Replicas

5
```

Only

```
4 Pods
```

were running.

ReplicaSet Controller created one additional Pod.

---

# 15. Scenario Interview Questions

Q1. What is Kubernetes Controller Manager?

Answer

Controller Manager continuously monitors the cluster and ensures the actual state matches the desired state.

---

Q2. What is Reconciliation?

Answer

Reconciliation is the process of continuously comparing desired state with actual state and correcting differences.

---

Q3. Does Controller Manager schedule Pods?

Answer

No.

Scheduler selects the Worker Node.

Controller Manager ensures the required number of Pods exist.

---

Q4. What happens if a Pod crashes?

Answer

The Controller Manager detects the difference and creates a replacement Pod.

---

# 16. Architecture Interview Questions

Explain Controller Workflow.

```
Desired State

↓

etcd

↓

Controller Watches

↓

Difference Found

↓

Corrective Action

↓

Cluster Healthy
```

---

Q2.

Difference between Scheduler and Controller Manager?

Answer

Scheduler chooses the Worker Node.

Controller Manager ensures the desired number of Pods and cluster objects are maintained.

---

# 17. Production Support Interview Questions

Production Investigation Flow

```
Pod Missing

↓

Deployment

↓

ReplicaSet

↓

Events

↓

Controller Logs

↓

Resolved
```

Manager Question

"Our application suddenly lost one Pod."

Expected Answer

- Check Deployment
- Verify ReplicaSet
- Review Events
- Confirm Controller Reconciliation
- Verify New Pod Creation
- Investigate Root Cause of Original Pod Failure

---

# 18. Related Runbooks

- deployment-pod-missing.md
- replicaset-recovery.md
- node-notready.md

---

# 19. Common Incidents

- Replica Mismatch
- Pod Not Recreated
- Node NotReady
- Failed Rollout
- Deployment Not Progressing

---

# 20. Commands

```bash
kubectl get deployments

kubectl get replicasets

kubectl get pods

kubectl describe deployment <deployment-name>

kubectl rollout status deployment <deployment-name>

kubectl get events
```

---

# 21. YAML Deep Dive

Example

```yaml
apiVersion: apps/v1
kind: Deployment

metadata:
  name: api-gateway

spec:
  replicas: 3

  selector:
    matchLabels:
      app: api-gateway

  template:
    metadata:
      labels:
        app: api-gateway
```

Explanation

```
replicas
```

Desired number of Pods.

The Deployment Controller continuously watches this value.

If the running Pod count becomes less than three,

the Controller Manager automatically creates additional Pods until the desired state is restored.

Reconciliation Flow

```
Desired State

↓

3 Pods

↓

Actual State

↓

2 Pods

↓

Controller Manager

↓

Creates New Pod

↓

3 Pods Running
```

---

# 22. Marathi Quick Revision

- Controller Manager म्हणजे Kubernetes चा Reconciliation Engine.
- Desired State आणि Actual State सतत तुलना करतो.
- Pod Crash झाला तर नवीन Pod तयार करतो.
- Scheduler Node निवडतो, Controller Manager Pods Maintain करतो.
- Production मध्ये Self-Healing Controller Manager मुळेच शक्य होते.

---

# 23. Marathi Summary (5+ Years Experience Revision)

## Interview Summary

Controller Manager हा Kubernetes Control Plane मधील अत्यंत महत्त्वाचा Component आहे.

तो सतत Desired State आणि Actual State यांची तुलना करतो.

फरक आढळल्यास ReplicaSet, Deployment, Node Controller, StatefulSet Controller इत्यादी Controllers द्वारे Cluster पुन्हा Desired State मध्ये आणतो.

यालाच Kubernetes Self-Healing म्हणतात.

## Production Investigation Flow

```
Application Issue

↓

Deployment

↓

ReplicaSet

↓

Pod Count

↓

Events

↓

Controller Reconciliation

↓

Resolved
```

## Production Story

Production EKS Cluster मध्ये API Gateway चा एक Pod OOMKilled झाला.

Deployment मध्ये `replicas: 3` असल्यामुळे ReplicaSet Controller ने लगेच नवीन Pod तयार केला.

Users ना कोणताही Downtime जाणवला नाही.

नंतर Root Cause Analysis मध्ये Memory Limit कमी असल्याचे आढळले आणि Resource Limits अपडेट करण्यात आले.

## Memory Trick

**Scheduler = Where?**

**Controller Manager = How Many?**

Remember

**Desired State**

↓

**Controller Manager**

↓

**Reconciliation**

↓

**Self-Healing**

