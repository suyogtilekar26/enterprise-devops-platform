# Kubernetes Interview Master Handbook

# Architecture 05 - Pod Lifecycle Deep Dive

---

# What is Pod Lifecycle?

## English

A Pod Lifecycle describes every stage from Pod creation until Pod termination.

Understanding this lifecycle is essential for troubleshooting production issues.

---

## मराठी

Pod Lifecycle म्हणजे Pod तयार होण्यापासून delete होईपर्यंतचा संपूर्ण प्रवास.

Production troubleshooting साठी हा flow समजणे अत्यंत महत्त्वाचे आहे.

---

# Complete Pod Lifecycle

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

Worker Node Selected

↓

kubelet

↓

Container Runtime

↓

Image Pull

↓

Volumes Mounted

↓

Network Configured

↓

Init Containers

↓

Application Containers

↓

Readiness Probe

↓

Service Traffic

↓

Running

↓

Termination Signal

↓

PreStop Hook

↓

SIGTERM

↓

Grace Period

↓

SIGKILL

↓

Pod Deleted

---

# Pod Phases

Pending

↓

Running

↓

Succeeded

↓

Failed

↓

Unknown

---

# Pending

Meaning

Pod accepted by Kubernetes.

Container has not started.

Possible Reasons

Image Pull

PVC Pending

Scheduler Delay

Insufficient Resources

---

# Running

Meaning

Containers are running.

Readiness may still be false.

---

# Succeeded

Meaning

All containers completed successfully.

Usually

Jobs

CronJobs

---

# Failed

Meaning

One or more containers exited with failure.

---

# Unknown

Meaning

Node communication lost.

Usually

Node Failure

Network Failure

---

# Image Pull Process

Pod Created

↓

Image Exists?

↓

Yes

↓

Start Container

---

No

↓

Pull Image

↓

Registry

↓

Image Download

↓

Container Starts

---

# Init Containers

Purpose

Run before application containers.

Use Cases

Database Migration

Configuration Download

Secrets Preparation

Dependency Checks

Application starts only after all Init Containers complete successfully.

---

# Sidecar Containers

Purpose

Provide supporting functionality.

Examples

Logging

Monitoring

Service Mesh Proxy

File Sync

---

# Readiness Probe

Purpose

Checks if application is ready to receive traffic.

If it fails

Service will not send traffic.

---

# Liveness Probe

Purpose

Checks whether the application is alive.

If it fails

Container is restarted.

---

# Startup Probe

Purpose

Provides extra startup time for slow applications.

Useful for

Java

Spring Boot

Large Applications

---

# Restart Policies

Always

Default for Deployments

---

OnFailure

Used for Jobs

---

Never

No restart

---

# Graceful Shutdown

Pod Delete

↓

PreStop Hook

↓

SIGTERM

↓

Application Cleanup

↓

Grace Period

↓

SIGKILL

↓

Pod Removed

---

# Termination Grace Period

Default

30 Seconds

Application should complete cleanup before SIGKILL.

---

# Common Lifecycle Problems

ImagePullBackOff

CrashLoopBackOff

Readiness Failure

Liveness Failure

ContainerCreating

Pending

OOMKilled

PVC Pending

---

# Troubleshooting Flow

Pod Not Running

↓

Describe Pod

↓

Events

↓

Image

↓

Volumes

↓

Network

↓

Init Containers

↓

Readiness

↓

Liveness

↓

Logs

↓

Application

---

# Production Incident

Application started.

Readiness Probe failed.

Users received

503 Service Unavailable.

Reason

Application was not yet ready.

Resolution

Increase initialDelaySeconds.

Tune readiness probe.

---

# Another Incident

Database migration Init Container failed.

Main application never started.

Resolution

Fix migration script.

Restart Pod.

---

# Best Practices

Use Readiness Probes.

Use Liveness Probes carefully.

Use Startup Probe for slow applications.

Keep Init Containers lightweight.

Handle SIGTERM gracefully.

Avoid long shutdown times.

---

# Useful Commands

kubectl get pods

---

kubectl describe pod POD_NAME

---

kubectl logs POD_NAME

---

kubectl logs POD_NAME -c CONTAINER_NAME

---

kubectl get events --sort-by=.metadata.creationTimestamp

---

kubectl delete pod POD_NAME

---

# Interview Questions

Q1

What are the Pod phases?

Answer

Pending

Running

Succeeded

Failed

Unknown

---

Q2

Difference between Readiness and Liveness Probe?

Answer

Readiness controls traffic.

Liveness detects unhealthy applications and restarts containers.

---

Q3

What is an Init Container?

Answer

A container that completes before the main application starts.

---

Q4

What happens when a Pod is deleted?

Answer

Kubernetes sends SIGTERM, executes the PreStop hook, waits for the grace period, then sends SIGKILL if needed.

---

Q5

What is the purpose of Startup Probe?

Answer

It prevents premature restarts while slow-starting applications initialize.

---

# Scenario Based Interview

Question

Pod is Running.

Service returns 503.

How will you troubleshoot?

Answer

1. Check Readiness Probe.

2. Verify Endpoints.

3. Describe Pod.

4. Check Application Logs.

5. Verify Startup Delay.

---

Question

Pod remains in Pending.

How will you troubleshoot?

Answer

1. Check Scheduler.

2. Check Events.

3. Verify PVC.

4. Verify Resources.

5. Verify Node Status.

---

# Production Troubleshooting Checklist

✔ Pod Phase

✔ Events

✔ Image Pull

✔ Init Containers

✔ Readiness Probe

✔ Liveness Probe

✔ Startup Probe

✔ Logs

✔ Resource Limits

✔ Graceful Shutdown

---

# Senior Engineer Notes

Always remember the complete Pod Lifecycle:

Developer

↓

API Server

↓

Scheduler

↓

Worker Node

↓

kubelet

↓

Container Runtime

↓

Image Pull

↓

Volumes

↓

Network

↓

Init Containers

↓

Application Containers

↓

Readiness

↓

Running

↓

SIGTERM

↓

Grace Period

↓

SIGKILL

↓

Pod Deleted

This complete lifecycle is one of the most frequently asked architecture topics in Senior DevOps, SRE and Kubernetes interviews.

