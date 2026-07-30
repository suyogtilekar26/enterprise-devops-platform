# Kubernetes Interview Master Handbook

# Chapter 14 - Resources (CPU & Memory)

---

# What are Resources?

## English

Resources define how much CPU and Memory a container needs.

Kubernetes Scheduler uses these values to decide where a Pod should run.

Resources also prevent one application from consuming the entire Node.

---

## मराठी

Resources म्हणजे Container ला किती CPU आणि Memory लागेल हे Kubernetes ला सांगणे.

Scheduler याच माहितीवरून Pod कोणत्या Node वर चालवायचा ते ठरवतो.

---

# Resource Types

resources:

  requests:

  limits:

---

# Requests

Requests define the minimum resources required by a container.

Example

requests:

  cpu: "100m"

  memory: "128Mi"

Meaning

Reserve

0.1 CPU

128 MB RAM

for this container.

---

## Marathi

Request म्हणजे Kubernetes ला सांगणे

"मला किमान एवढे Resources लागतील."

Scheduler हे Resources उपलब्ध असलेल्या Node वरच Pod schedule करतो.

---

# Limits

Limits define the maximum resources a container can use.

Example

limits:

  cpu: "500m"

  memory: "512Mi"

Meaning

Container cannot use more than

0.5 CPU

512 MB Memory

---

# CPU

1000m = 1 CPU Core

Examples

100m = 0.1 CPU

250m = 0.25 CPU

500m = 0.5 CPU

1000m = 1 CPU

2000m = 2 CPU

---

# Memory

Ki

Mi

Gi

Examples

128Mi

256Mi

512Mi

1Gi

2Gi

---

# Scheduler Flow

Developer

↓

Deployment YAML

↓

Requests

↓

Scheduler

↓

Find Node

↓

Pod Scheduled

---

# Example

Node

2 CPU

4Gi RAM

Pod A

Request

500m

512Mi

Pod B

Request

500m

1Gi

Pod C

Request

1000m

2Gi

Total fits

Pod Scheduled

---

# What if Requests are Too High?

Node

2 CPU

Pod Request

4 CPU

Scheduler

↓

No Suitable Node

↓

Pod Pending

---

# OOMKilled

OOM

Out Of Memory

Example

Memory Limit

256Mi

Application Uses

500Mi

Linux Kernel

↓

Kills Container

↓

Pod Restart

Status

OOMKilled

---

# CPU Throttling

Limit

500m

Application Needs

2 CPU

Container is not killed.

Instead

CPU speed is restricted.

Application becomes slow.

---

# QoS Classes

Guaranteed

Requests = Limits

Highest Priority

---

Burstable

Requests < Limits

Most Common

---

BestEffort

No Requests

No Limits

Lowest Priority

---

# Production Example

Frontend

Requests

100m

128Mi

Limits

500m

512Mi

Database

Requests

2 CPU

4Gi

Limits

4 CPU

8Gi

Different workloads require different sizing.

---

# Common Mistakes

No Requests

No Limits

Very High Requests

Very Low Limits

Copy-Paste Values

Ignoring Application Metrics

---

# Best Practices

Always define Requests.

Always define Limits.

Use Monitoring.

Review Resource Usage Monthly.

Size workloads using production metrics.

Avoid Guessing.

---

# Useful Commands

kubectl top pod

---

kubectl top node

---

kubectl describe pod POD_NAME

---

kubectl get events

---

kubectl describe node

---

# Troubleshooting

Pod Pending

↓

Check Requests

↓

Check Node Capacity

↓

Check Scheduler Events

---

Container Restarting

↓

Check OOMKilled

↓

Increase Memory

OR

Optimize Application

---

Application Slow

↓

Check CPU Throttling

↓

Increase CPU Limit

OR

Optimize Code

---

# Production Incident

Developer

No Limits

Memory Leak

Application Consumes

Entire Node Memory

Other Pods Crash.

Root Cause

No Resource Limits.

---

Another Incident

Request

8 CPU

Cluster Node

4 CPU

Pod

Pending Forever

Reason

No Node can satisfy the request.

---

# Interview Questions

Q1 What are Requests?

Answer

Minimum resources required for scheduling.

---

Q2 What are Limits?

Answer

Maximum resources a container can consume.

---

Q3 Difference between Requests and Limits?

Answer

Requests are used for scheduling.

Limits restrict maximum resource usage.

---

Q4 What is OOMKilled?

Answer

Container exceeded its memory limit.

Linux Kernel terminated it.

---

Q5 What is CPU Throttling?

Answer

CPU usage exceeds the limit.

Container is slowed down instead of being killed.

---

Q6 Which command shows CPU and Memory usage?

Answer

kubectl top pod

kubectl top node

---

# Scenario Based Interview

Question

Pod is Pending.

What will you check?

Answer

1. Requests

2. Node Capacity

3. Scheduler Events

4. Node Status

5. Taints

---

Question

Pod keeps restarting.

Status

OOMKilled

How will you solve it?

Answer

Check memory usage.

Increase memory limit if required.

Optimize application memory consumption.

Monitor after deployment.

---

Question

Application is slow but Pods are Running.

What will you check?

Answer

CPU Throttling

Resource Limits

Application Metrics

Node Utilization

---

# Senior Engineer Notes

Resources directly affect scheduling, stability and cost.

Never deploy production workloads without Requests and Limits.

Use Prometheus and Grafana to monitor resource utilization.

Review sizing periodically based on real production traffic.

---

# Cheat Sheet

✔ Requests = Minimum Resources

✔ Limits = Maximum Resources

✔ Requests used by Scheduler

✔ Limits enforced by Kernel

✔ OOMKilled = Memory Limit Exceeded

✔ CPU Throttling = CPU Limit Reached

✔ Guaranteed = Requests == Limits

✔ Burstable = Requests < Limits

✔ BestEffort = No Requests/Limits

✔ Monitor using

kubectl top pod

kubectl top node

