# Kubernetes Interview Master Handbook

# Production Incident 01 - Pod Pending

---

# Incident

Application deployment completed successfully.

Deployment object exists.

ReplicaSet exists.

Pods are created.

But Pods remain in

Pending

state.

Application is unavailable.

---

# What does Pending mean?

## English

Pending means Kubernetes has accepted the Pod but has not started it yet.

The Scheduler or Kubelet cannot complete the next step.

---

## मराठी

Pending म्हणजे Pod तयार झाला आहे पण अजून Running झालेला नाही.

Kubernetes ला Pod कुठे चालवायचा किंवा कसा सुरू करायचा यामध्ये काही समस्या आली आहे.

---

# Pod Lifecycle

Deployment

↓

ReplicaSet

↓

Pod Created

↓

Pending

↓

Scheduler selects Node

↓

Container Created

↓

Running

---

# Common Reasons

Insufficient CPU

Insufficient Memory

No Available Node

Node Not Ready

Taints

Affinity Rules

PVC Not Bound

Image Pull Delay

Scheduler Failure

---

# Step 1

Check Pod Status

kubectl get pods

Example

NAME            READY   STATUS    RESTARTS   AGE

frontend-abc    0/1     Pending   0          2m

---

# Step 2

Describe Pod

kubectl describe pod frontend-abc

This is the MOST IMPORTANT command.

Always check Events at the bottom.

---

# Example Event

Warning

FailedScheduling

0/3 nodes are available

Insufficient memory

Meaning

Scheduler cannot find a suitable Node.

---

# Another Example

0/2 nodes are available

Insufficient cpu

Meaning

CPU Requests cannot be satisfied.

---

# Check Node Capacity

kubectl describe node

Look for

Allocated Resources

CPU

Memory

Pods

---

# Check Resource Requests

kubectl get pod frontend-abc -o yaml

Verify

resources:

requests:

limits:

---

# Check Cluster Resources

kubectl top node

kubectl top pod

---

# Check Node Status

kubectl get nodes

Healthy Example

NAME

STATUS

worker-1

Ready

worker-2

Ready

Problem Example

worker-2

NotReady

---

# Check Taints

kubectl describe node

Search

Taints

Example

NoSchedule

Meaning

Scheduler cannot place Pods unless tolerations exist.

---

# Check PVC

kubectl get pvc

Pending PVC

↓

Pod also remains Pending.

---

# Troubleshooting Flow

Pod Pending

↓

Describe Pod

↓

Check Events

↓

FailedScheduling?

↓

Yes

↓

Check CPU

↓

Check Memory

↓

Check Node

↓

Check Taints

↓

Check PVC

↓

Resolve

↓

Pod Running

---

# Production Incident

Cluster

3 Worker Nodes

Developer increased

requests:

cpu: "8"

Node Capacity

4 CPU

Scheduler

↓

No Suitable Node

↓

Pending

Root Cause

Request larger than available Node capacity.

Resolution

Reduce Requests

OR

Add Bigger Worker Nodes.

---

# Another Incident

One Worker Node crashed.

Remaining Nodes reached maximum capacity.

Every new Deployment stayed Pending.

Resolution

Cluster Autoscaler added a new Node.

Pods automatically became Running.

---

# Best Practices

Always define realistic Requests.

Monitor Node Capacity.

Avoid oversized Requests.

Use Cluster Autoscaler.

Review Scheduler Events first.

---

# Interview Questions

Q1

What does Pending mean?

Answer

The Pod has been accepted but has not yet been scheduled or started.

---

Q2

Which command do you use first?

Answer

kubectl describe pod POD_NAME

---

Q3

What usually causes Pending Pods?

Answer

Insufficient CPU

Insufficient Memory

Node issues

Taints

PVC Pending

Affinity constraints

---

Q4

How do you identify the root cause?

Answer

Check Events section in

kubectl describe pod

---

# Production Troubleshooting Checklist

✔ kubectl get pods

✔ kubectl describe pod

✔ kubectl get events

✔ kubectl describe node

✔ kubectl top node

✔ kubectl get pvc

✔ kubectl get nodes

✔ Check Requests

✔ Check Taints

✔ Check Scheduler Events

---

# Senior Engineer Notes

Never guess why a Pod is Pending.

Always start with

kubectl describe pod

The Events section almost always points directly to the root cause.

Production engineers troubleshoot using evidence, not assumptions.

