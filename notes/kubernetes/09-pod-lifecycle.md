# Kubernetes Pod Lifecycle

# 1. Purpose

The purpose of this document is to understand how a Pod moves through different states from creation until deletion.

Understanding the Pod Lifecycle is essential for troubleshooting production issues.

---

# 2. Introduction

A Pod does not remain Running forever.

Whenever Kubernetes creates a Pod, it passes through multiple phases.

Every DevOps Engineer should know these phases because production incidents often occur during Pod startup.

---

# 3. Enterprise Usage

Production engineers monitor Pod Lifecycle continuously.

Common scenarios

- New Deployment
- Rolling Update
- Auto Scaling
- Node Failure
- Application Crash
- Cluster Upgrade

Understanding Pod phases helps identify failures quickly.

---

# 4. Usage in THIS Project

```
Developer

↓

GitHub

↓

GitHub Actions

↓

Container Image

↓

Deployment

↓

Pod Created

↓

Application Running
```

---

# 5. Pod Lifecycle Architecture

```
          Pod Creation

                │

                ▼

            Pending

                │

                ▼

      ContainerCreating

                │

                ▼

            Running

         /            \

        /              \

Succeeded           Failed

        \              /

         \            /

             Deleted
```

---

# 6. Internal Workflow

```
Deployment Created

↓

Scheduler Selects Node

↓

Worker Node

↓

Image Pull

↓

Container Starts

↓

Readiness Check

↓

Running

↓

Application Serves Traffic
```

---

# 7. Pod Phases

## Pending

Pod has been accepted.

Container has not started.

Possible Reasons

- No Worker Node
- Image Download
- Resource Shortage

---

## ContainerCreating

Container Runtime is

- Pulling Image
- Creating Container
- Mounting Volumes
- Configuring Network

---

## Running

Application is successfully running.

Users can access the application.

This is the normal production state.

---

## Succeeded

Container completed successfully.

Mostly seen with

- Jobs
- CronJobs

---

## Failed

Application terminated unexpectedly.

Examples

- Application Crash
- Wrong Configuration
- Missing Files

---

## Deleted

Pod removed from the cluster.

---

# 8. Lifecycle Flow

```
Pending

↓

ContainerCreating

↓

Running

↓

Crash

↓

Restart

↓

Running

↓

Delete

↓

Pod Removed
```

---

# 9. Daily DevOps Activities

- Check Pod Status
- Monitor Restarts
- Verify Running Pods
- Investigate Pending Pods
- Review Events
- Analyze Logs

---

# 10. Production Best Practices

- Always use Readiness Probe.
- Configure Liveness Probe.
- Set CPU Limits.
- Set Memory Limits.
- Never deploy standalone Pods.
- Monitor Restart Count.

---

# 11. Security

- Scan Images.
- Use Secrets.
- Avoid Root User.
- Use RBAC.
- Enable Network Policies.

---

# 12. Troubleshooting

Pod Status

```bash
kubectl get pods
```

Describe Pod

```bash
kubectl describe pod <pod-name>
```

Logs

```bash
kubectl logs <pod-name>
```

Events

```bash
kubectl get events
```

---

# 13. Real Production Scenarios

## Scenario 1

### Pod Stuck in Pending

```
Deployment

↓

Pending

↓

No Worker Node Available

↓

Scheduler Waiting

↓

New Node Added

↓

Running
```

Production Story

During Black Friday traffic, all Worker Nodes reached 100% CPU.

New Pods remained Pending.

Cluster Autoscaler added new Worker Nodes.

Scheduler placed Pods on new Nodes.

Application became healthy.

---

## Scenario 2

### ContainerCreating for Long Time

Symptoms

- Pod never starts.
- Status remains ContainerCreating.

Possible Reasons

- Large Image
- Slow Registry
- Storage Mount Delay

Investigation

```bash
kubectl describe pod <pod-name>
```

---

## Scenario 3

### Failed State

Reason

Application exits immediately after startup.

Common Causes

- Wrong Configuration
- Missing Secret
- Invalid Environment Variable

---

# 14. Scenario Interview Q&A

Q. What is the first Pod phase?

Answer

Pending.

---

Q. What is the normal production state?

Answer

Running.

---

Q. What causes Pending Pods?

Answer

- Resource Shortage
- Scheduler Waiting
- Node Unavailable

---

# 15. Architecture Interview Q&A

Explain Pod Lifecycle.

```
Pending

↓

ContainerCreating

↓

Running

↓

Succeeded / Failed

↓

Deleted
```

---

# 16. Production Support Interview Q&A

Investigation Flow

```
Alert

↓

kubectl get pods

↓

Pending?

↓

Describe Pod

↓

Events

↓

Logs

↓

Root Cause

↓

Resolution
```

---

# 17. Related Runbooks

- pod-pending.md
- imagepullbackoff.md
- crashloopbackoff.md
- oomkilled.md

---

# 18. Common Incidents

- Pending
- ContainerCreating
- CrashLoopBackOff
- Failed
- OOMKilled
- ImagePullBackOff

---

# 19. Commands

```bash
kubectl get pods

kubectl describe pod <pod-name>

kubectl logs <pod-name>

kubectl get events

kubectl delete pod <pod-name>
```

---

# 20. Marathi Quick Revision

- Pod Pending म्हणजे अजून सुरू झालेला नाही.
- ContainerCreating म्हणजे Image Pull सुरू आहे.
- Running म्हणजे Application चालू आहे.
- Failed म्हणजे Application Crash झाली.
- Deleted म्हणजे Pod हटवला गेला.

---

# 21. Marathi Summary (5+ Experience Revision)

## Interview Summary

Production मध्ये Pod चा सर्वात महत्त्वाचा State म्हणजे Running आहे.

Pending, ContainerCreating आणि Failed States troubleshooting साठी महत्त्वाच्या आहेत.

## Production Investigation Flow

```
Alert

↓

kubectl get pods

↓

Status Check

↓

Describe

↓

Logs

↓

Events

↓

Root Cause

↓

Fix
```

## Production Story

एका Production Deployment मध्ये Image Size 4 GB होती.

नवीन Pods 15 मिनिटे ContainerCreating मध्ये अडकले.

Image Optimize करून Size 450 MB केली.

Deployment Time 15 मिनिटांवरून 40 सेकंदांवर आला.

## Memory Trick

**P C R F D**

Pending

↓

ContainerCreating

↓

Running

↓

Failed

↓

Deleted

