# Kubernetes Interview Master Handbook

# Production Incident 05 - Node NotReady

---

# Incident

Users report application issues.

Some Pods are unavailable.

Running

kubectl get nodes

shows

STATUS

NotReady

One worker node is unhealthy.

---

# What is Node NotReady?

## English

Node NotReady means the Kubernetes Control Plane cannot communicate properly with the worker node.

The Scheduler avoids placing new Pods on that node.

Existing Pods may become unavailable.

---

## मराठी

Node NotReady म्हणजे Kubernetes ला त्या Worker Node कडून योग्य प्रतिसाद मिळत नाही.

त्या Node वर नवीन Pods schedule होत नाहीत.

त्यावरील Applications प्रभावित होऊ शकतात.

---

# Node Lifecycle

Node Boots

↓

Kubelet Starts

↓

Registers with API Server

↓

Ready

↓

Problem Occurs

↓

Heartbeat Missing

↓

Node becomes

NotReady

---

# Common Reasons

Kubelet Stopped

Container Runtime Down

Disk Full

Memory Pressure

PID Pressure

Network Failure

Node Reboot

Kernel Panic

Cloud VM Failure

Certificate Expired

---

# Step 1

Check Nodes

kubectl get nodes

Example

NAME          STATUS

worker-1      Ready

worker-2      NotReady

---

# Step 2

Describe Node

kubectl describe node worker-2

Look for

Conditions

Events

Taints

Allocated Resources

---

# Node Conditions

Ready

MemoryPressure

DiskPressure

PIDPressure

NetworkUnavailable

---

# MemoryPressure

Meaning

Available memory is very low.

Linux starts reclaiming memory.

New Pods may not be scheduled.

---

# DiskPressure

Meaning

Disk usage is too high.

Image pulls may fail.

Containers may fail to start.

---

# PIDPressure

Meaning

Too many processes are running.

The node cannot create additional processes.

---

# NetworkUnavailable

Meaning

The node cannot communicate properly with the cluster network.

Pods may lose connectivity.

---

# Step 3

Check Kubelet

systemctl status kubelet

Healthy

Active (running)

Problem

Inactive

Failed

Restarting

---

Restart Kubelet

sudo systemctl restart kubelet

---

# Step 4

Check Container Runtime

Docker

systemctl status docker

OR

containerd

systemctl status containerd

If runtime is down

Pods cannot start.

---

# Step 5

Check Disk Space

df -h

If disk usage is nearly 100%

Images cannot be downloaded.

Logs cannot be written.

---

# Step 6

Check Memory

free -h

High memory usage may trigger

MemoryPressure.

---

# Step 7

Check Node Logs

journalctl -u kubelet

Review recent errors.

---

# Troubleshooting Flow

Node NotReady

↓

kubectl describe node

↓

Check Conditions

↓

Check Kubelet

↓

Check Container Runtime

↓

Check Disk

↓

Check Memory

↓

Check Network

↓

Recover Node

↓

Node Ready

---

# Cordon

kubectl cordon worker-2

Meaning

No new Pods will be scheduled.

Existing Pods continue running.

---

# Drain

kubectl drain worker-2 --ignore-daemonsets

Meaning

Safely evicts workloads.

Used before maintenance.

---

# Uncordon

kubectl uncordon worker-2

Meaning

Node becomes available for scheduling again.

---

# Production Incident

Disk reached

100%

Container runtime stopped.

Node became

NotReady.

Applications failed.

Resolution

Delete unused images.

Clean logs.

Restart container runtime.

Restart kubelet.

Node became Ready.

---

# Another Incident

Cloud VM restarted unexpectedly.

Kubelet failed to start after reboot.

Node remained NotReady.

Resolution

Start kubelet.

Verify certificates.

Verify networking.

---

# Best Practices

Monitor node health.

Monitor disk usage.

Monitor memory usage.

Rotate logs.

Upgrade nodes regularly.

Drain before maintenance.

Never reboot production nodes without draining.

---

# Useful Commands

kubectl get nodes

---

kubectl describe node NODE_NAME

---

kubectl top node

---

systemctl status kubelet

---

systemctl status containerd

---

journalctl -u kubelet

---

df -h

---

free -h

---

# Interview Questions

Q1

What does Node NotReady mean?

Answer

The control plane cannot properly communicate with the worker node.

---

Q2

Which command do you run first?

Answer

kubectl get nodes

followed by

kubectl describe node NODE_NAME

---

Q3

What is the difference between cordon and drain?

Answer

Cordon prevents new Pods from being scheduled.

Drain safely evicts existing Pods before maintenance.

---

Q4

What causes DiskPressure?

Answer

Node disk usage becomes critically high.

---

Q5

Can Pods be scheduled on a NotReady node?

Answer

No.

The Scheduler does not place new Pods on a NotReady node.

---

# Production Troubleshooting Checklist

✔ kubectl get nodes

✔ kubectl describe node

✔ kubectl top node

✔ systemctl status kubelet

✔ systemctl status containerd

✔ journalctl -u kubelet

✔ df -h

✔ free -h

✔ Check Node Conditions

✔ Check Events

---

# Senior Engineer Notes

Node issues affect multiple applications simultaneously.

Always investigate node health before debugging individual Pods.

Use cordon and drain for planned maintenance.

Never restart production nodes without understanding workload impact.

