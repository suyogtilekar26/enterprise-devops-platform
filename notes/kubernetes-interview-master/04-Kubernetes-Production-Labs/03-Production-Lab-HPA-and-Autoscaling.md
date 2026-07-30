# Kubernetes Interview Master Handbook

# Production Lab 03 - Horizontal Pod Autoscaler (HPA)

---

# Objective

Learn how Kubernetes automatically scales Pods based on workload.

Topics

Metrics Server

HPA

CPU Autoscaling

Memory Autoscaling

Scale Up

Scale Down

Production Monitoring

---

# Production Scenario

An e-commerce website receives heavy traffic during a sale.

Requirements

Application should automatically scale.

No manual intervention.

When traffic decreases,

unused Pods should be removed.

---

# Architecture

Users

↓

Ingress

↓

Service

↓

Deployment

↓

HPA

↓

Pods

↓

Metrics Server

---

# Autoscaling Flow

High CPU Usage

↓

Metrics Server

↓

HPA

↓

Increase Replicas

↓

Service

↓

Traffic Distributed

---

Low CPU Usage

↓

Metrics Server

↓

HPA

↓

Reduce Replicas

↓

Lower Resource Usage

---

# Step 1

Verify Metrics Server

kubectl get deployment metrics-server -n kube-system

---

Verify

kubectl top nodes

kubectl top pods

---

# Step 2

Create Deployment

kubectl apply -f deployment.yaml

---

Verify

kubectl get deployment

kubectl get pods

---

# Step 3

Create HPA

kubectl autoscale deployment app \
--cpu-percent=70 \
--min=2 \
--max=10

---

Verify

kubectl get hpa

---

Describe HPA

kubectl describe hpa app

---

# Step 4

Generate Load

Use

busybox

curl

hey

wrk

ApacheBench (ab)

---

Example

kubectl run load-generator \
--rm -it \
--image=busybox \
-- sh

---

# Step 5

Observe Scaling

kubectl get hpa -w

---

kubectl get pods -w

---

Expected Flow

CPU > 70%

↓

HPA Detects

↓

Replicas Increase

↓

Traffic Distributed

---

# Step 6

Stop Load

Observe

CPU Drops

↓

HPA Waits

↓

Replicas Reduced

---

# HPA Decision Flow

Metrics Server

↓

CPU Metrics

↓

HPA Controller

↓

Desired Replicas

↓

Deployment

↓

ReplicaSet

↓

Pods

---

# Common Problems

Metrics Server Missing

No CPU Metrics

Pods Not Scaling

CPU Requests Missing

Pending Pods

Insufficient Node Resources

---

# Troubleshooting Flow

HPA Not Working

↓

Metrics Server

↓

kubectl top

↓

CPU Requests

↓

Describe HPA

↓

Events

↓

Deployment

↓

Pods

---

# Production Incident

Traffic increased.

CPU reached 95%.

HPA scaled

3 Pods

↓

8 Pods

Application remained available.

---

# Another Incident

HPA did not scale.

Reason

CPU Requests were not configured.

Resolution

Configure CPU Requests.

Redeploy.

---

# Best Practices

Always configure CPU Requests.

Set realistic minReplicas.

Avoid very high maxReplicas without capacity planning.

Monitor scaling events.

Combine HPA with Cluster Autoscaler.

Test autoscaling before production.

---

# Useful Commands

kubectl get hpa

---

kubectl describe hpa app

---

kubectl top pods

---

kubectl top nodes

---

kubectl get deployment

---

kubectl get events

---

kubectl get pods -w

---

# Interview Questions

Q1

What is HPA?

Answer

Horizontal Pod Autoscaler automatically adjusts the number of Pod replicas based on observed metrics such as CPU or Memory.

---

Q2

Does HPA work without Metrics Server?

Answer

No.

Metrics Server is required to provide CPU and Memory metrics.

---

Q3

Why are CPU Requests required for HPA?

Answer

HPA calculates utilization based on CPU Requests.

Without CPU Requests, utilization cannot be calculated correctly.

---

Q4

Difference between HPA and Cluster Autoscaler?

Answer

HPA scales Pods.

Cluster Autoscaler scales Worker Nodes.

---

Q5

What happens if HPA wants more Pods but the cluster has no free resources?

Answer

The new Pods remain Pending until capacity is available or the Cluster Autoscaler adds more Worker Nodes.

---

# Scenario Based Interview

Question

CPU is above 90% but HPA is not scaling.

How will you troubleshoot?

Answer

1. Verify Metrics Server.

2. Check kubectl top.

3. Verify CPU Requests.

4. Describe HPA.

5. Check Events.

6. Verify Deployment.

---

Question

Pods scaled successfully but users still experience slow responses.

Answer

1. Check database performance.

2. Verify application bottlenecks.

3. Review network latency.

4. Check resource limits.

5. Analyze logs and metrics.

---

# Production Checklist

✔ Metrics Server

✔ CPU Requests

✔ HPA

✔ Deployment

✔ ReplicaSet

✔ Pods

✔ Events

✔ Metrics

✔ Cluster Capacity

✔ Monitoring

---

# Assignment

Deploy an application with

minReplicas = 2

maxReplicas = 8

Target CPU = 70%

Generate CPU load.

Observe scale-up.

Stop the load.

Observe scale-down.

Document every scaling event and explain why it occurred.

