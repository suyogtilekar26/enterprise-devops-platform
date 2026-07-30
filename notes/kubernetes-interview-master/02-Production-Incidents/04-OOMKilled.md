# Kubernetes Interview Master Handbook

# Production Incident 04 - OOMKilled

---

# Incident

Application starts successfully.

Users begin sending requests.

Memory usage keeps increasing.

Container suddenly stops.

Pod restarts automatically.

Status

OOMKilled

---

# What is OOMKilled?

## English

OOMKilled means the container exceeded its memory limit.

The Linux Kernel's Out Of Memory (OOM) Killer terminated the container to protect the node.

---

## मराठी

OOMKilled म्हणजे Container ने त्याच्या Memory Limit पेक्षा जास्त Memory वापरली.

Linux Kernel ने Node वाचवण्यासाठी तो Container बंद केला.

---

# How It Happens

Container Starts

↓

Memory Usage Increases

↓

Memory Limit Reached

↓

Linux OOM Killer

↓

Container Killed

↓

Kubernetes Restarts Pod

↓

OOMKilled

---

# Example

resources:

  requests:

    memory: "256Mi"

  limits:

    memory: "512Mi"

Application uses

650Mi

↓

Container Killed

---

# Common Reasons

Memory Leak

Large File Processing

Large Cache

High Traffic

Wrong Memory Limit

Application Bug

Java Heap Too Large

Python Process Holding Objects

---

# Exit Code

Exit Code

137

Meaning

Container was terminated by the Linux Kernel because it exceeded its memory limit.

---

# Step 1

Check Pod Status

kubectl get pods

Example

frontend

0/1

OOMKilled

---

# Step 2

Describe Pod

kubectl describe pod POD_NAME

Look for

Last State

Reason

OOMKilled

Exit Code

137

---

# Step 3

Check Resource Configuration

kubectl get deployment frontend -o yaml

Verify

requests

limits

---

# Step 4

Check Memory Usage

kubectl top pod

Example

NAME

MEMORY

frontend

498Mi

Limit

512Mi

Memory usage is close to the limit.

---

# Step 5

Check Node Usage

kubectl top node

Determine whether the issue is

Container Memory

or

Node Memory

---

# Step 6

Check Application Logs

kubectl logs POD_NAME --previous

Look for

OutOfMemoryError

MemoryError

Heap Errors

Large Allocations

---

# Production Incident

Java Application

Memory Limit

512Mi

JVM Heap

768Mi

Application started.

Traffic increased.

OOMKilled.

Reason

Heap size larger than container limit.

Resolution

Reduce JVM Heap

OR

Increase Container Memory Limit.

---

# Another Incident

Python service loaded a 2 GB CSV file into memory.

Container Limit

1Gi

OOMKilled

Resolution

Process file in smaller chunks instead of loading the entire file.

---

# Troubleshooting Flow

OOMKilled

↓

Describe Pod

↓

Exit Code 137

↓

Check Memory Usage

↓

Check Limits

↓

Check Application Logs

↓

Identify Memory Leak

↓

Optimize Application

OR

Increase Memory Limit

↓

Deploy Again

---

# Best Practices

Always define Requests and Limits.

Monitor memory continuously.

Avoid unlimited caches.

Use streaming for large files.

Review application heap configuration.

Use Prometheus and Grafana for monitoring.

---

# Useful Commands

kubectl get pods

---

kubectl describe pod POD_NAME

---

kubectl top pod

---

kubectl top node

---

kubectl logs POD_NAME --previous

---

# Interview Questions

Q1

What is OOMKilled?

Answer

A container exceeded its memory limit and the Linux Kernel terminated it.

---

Q2

Which Exit Code indicates OOMKilled?

Answer

Exit Code

137

---

Q3

Which command shows current memory usage?

Answer

kubectl top pod

kubectl top node

---

Q4

How do you troubleshoot OOMKilled?

Answer

1. Describe Pod

2. Check Exit Code

3. Check Memory Usage

4. Verify Requests and Limits

5. Review Application Logs

6. Check for Memory Leaks

---

Q5

Will increasing memory always solve the problem?

Answer

No.

If the application has a memory leak, increasing memory only delays the failure.

The root cause must be identified and fixed.

---

# Production Troubleshooting Checklist

✔ kubectl get pods

✔ kubectl describe pod

✔ kubectl top pod

✔ kubectl top node

✔ kubectl logs --previous

✔ Verify Requests

✔ Verify Limits

✔ Check Exit Code 137

✔ Check Application Memory Usage

✔ Check for Memory Leak

---

# Senior Engineer Notes

Do not immediately increase memory limits.

First determine whether the issue is

Application Design

Memory Leak

Traffic Pattern

or

Incorrect Resource Sizing.

Good SRE teams use monitoring data before changing resource limits.

Increasing memory without analysis can hide the real problem and increase infrastructure cost.

