# Kubernetes Interview Master Handbook

# Production Incident 02 - CrashLoopBackOff

---

# Incident

Deployment created successfully.

Pod gets scheduled.

Container starts.

After a few seconds

Container crashes.

Kubernetes restarts it.

Again it crashes.

This cycle continues.

Status

CrashLoopBackOff

---

# What is CrashLoopBackOff?

## English

CrashLoopBackOff means the container starts, crashes, and Kubernetes keeps restarting it with increasing delays.

---

## मराठी

CrashLoopBackOff म्हणजे Container सुरू होतो पण लगेच बंद पडतो.

Kubernetes त्याला पुन्हा सुरू करण्याचा प्रयत्न करते.

वारंवार Crash झाल्यामुळे Restart मध्ये Delay वाढत जातो.

---

# Restart Flow

Container Starts

↓

Application Crashes

↓

Container Stops

↓

Kubelet Restarts

↓

Application Crashes Again

↓

Back-off Delay

↓

Restart Again

↓

CrashLoopBackOff

---

# Common Reasons

Application Bug

Wrong Command

Missing Environment Variable

ConfigMap Error

Secret Missing

Database Connection Failure

Port Conflict

Dependency Failure

Permission Denied

Wrong File Path

OOMKilled

---

# Step 1

Check Pod Status

kubectl get pods

Example

NAME

READY

STATUS

frontend

0/1

CrashLoopBackOff

---

# Step 2

Check Logs

kubectl logs POD_NAME

If multiple containers

kubectl logs POD_NAME -c CONTAINER_NAME

---

# Previous Logs

Container may restart before logs are visible.

Use

kubectl logs POD_NAME --previous

Very important command.

---

# Step 3

Describe Pod

kubectl describe pod POD_NAME

Always read Events.

---

# Common Error

Error

Connection refused

Meaning

Application cannot reach Database.

---

Another Example

Config file not found

Meaning

ConfigMap not mounted correctly.

---

Another Example

Secret not found

Meaning

Application cannot read credentials.

---

# Exit Codes

Exit Code 0

Application finished successfully.

Usually not expected for long-running services.

---

Exit Code 1

General Application Error.

Most common.

---

Exit Code 126

Permission problem.

Cannot execute command.

---

Exit Code 127

Command not found.

Wrong ENTRYPOINT or CMD.

---

Exit Code 137

Killed by Linux.

Usually OOMKilled.

---

Exit Code 139

Segmentation Fault.

Application crash.

---

Exit Code 143

Graceful termination.

Usually during rollout or scale down.

---

# Troubleshooting Flow

CrashLoopBackOff

↓

kubectl logs

↓

kubectl logs --previous

↓

kubectl describe pod

↓

Check Exit Code

↓

Check ConfigMap

↓

Check Secret

↓

Check Database

↓

Check Resources

↓

Fix

↓

Redeploy

---

# Check Environment Variables

kubectl describe pod POD_NAME

Verify

Environment

Variables

ConfigMaps

Secrets

---

# Check ConfigMap

kubectl get configmap

kubectl describe configmap

---

# Check Secret

kubectl get secret

kubectl describe secret

---

# Check Resources

kubectl describe pod

Search

OOMKilled

Memory Limit

Restart Count

---

# Production Incident

Developer changed

DATABASE_HOST

Old

db-service

New

database-service

Deployment successful.

Container started.

Application failed.

CrashLoopBackOff.

Reason

Wrong hostname.

---

# Another Incident

ConfigMap updated.

Pods were not restarted.

Application still used old configuration.

Engineer restarted Deployment.

Problem solved.

---

# Best Practices

Always check logs first.

Never guess.

Validate ConfigMaps.

Validate Secrets.

Monitor Restart Count.

Use Health Probes.

Version configuration.

---

# Interview Questions

Q1

What is CrashLoopBackOff?

Answer

The container repeatedly starts, crashes, and Kubernetes restarts it with increasing delay.

---

Q2

Which command do you run first?

Answer

kubectl logs POD_NAME

---

Q3

Why use

--previous

?

Answer

To view logs from the previous crashed container instance.

---

Q4

Difference between OOMKilled and CrashLoopBackOff?

Answer

OOMKilled means the container exceeded its memory limit.

CrashLoopBackOff is the restart state caused by repeated container failures.

OOMKilled can be one reason for CrashLoopBackOff.

---

Q5

How do you troubleshoot CrashLoopBackOff?

Answer

1. kubectl logs

2. kubectl logs --previous

3. kubectl describe pod

4. Check Exit Code

5. Verify ConfigMaps

6. Verify Secrets

7. Verify Database Connectivity

8. Check Resource Limits

---

# Production Troubleshooting Checklist

✔ kubectl get pods

✔ kubectl logs

✔ kubectl logs --previous

✔ kubectl describe pod

✔ Check Exit Code

✔ Check ConfigMaps

✔ Check Secrets

✔ Check Database

✔ Check Memory

✔ Check Restart Count

---

# Senior Engineer Notes

Logs are the first source of truth.

Do not restart Pods immediately.

Understand why the application crashed.

Always collect evidence before making changes.

A good DevOps engineer fixes the root cause, not just the symptom.

