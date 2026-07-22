# Health Check Failure Runbook

# Enterprise DevOps Platform

---

# Purpose

This runbook describes the Standard Operating Procedure (SOP) for troubleshooting Kubernetes Health Check failures in applications deployed using ArgoCD.

Health Check failures commonly occur due to incorrect Readiness Probes, Liveness Probes, application startup delays, dependency failures, or configuration issues.

---

# Scope

Applications

- React + Vite Frontend
- Flask API Gateway
- Flask Auth Service
- Flask Dashboard Service

Supporting Services

- PostgreSQL
- Redis

Infrastructure

- Kubernetes
- ArgoCD

---

# Symptoms

- Application Health = Degraded
- Pod Status = Running but Not Ready
- Readiness Probe Failed
- Liveness Probe Failed
- Continuous Restarts
- Application Unavailable

---

# Common Causes

| Cause | Example |
|--------|----------|
| Wrong Probe Path | `/health` does not exist |
| Wrong Port | Probe checks incorrect port |
| Slow Application Startup | Initialization delay |
| Database Dependency | DB unavailable |
| Redis Dependency | Cache unavailable |
| High CPU Usage | Probe timeout |
| Low Memory | OOM before probe succeeds |
| Incorrect Initial Delay | Probe starts too early |

---

# Troubleshooting Workflow

```
Health Failure

↓

Verify Pod

↓

Describe Pod

↓

Review Probe

↓

Check Logs

↓

Verify Dependencies

↓

Fix

↓

Sync

↓

Healthy
```

---

# Step 1 - Verify Application

```bash
argocd app get frontend
```

Expected

```
Health

↓

Degraded
```

---

# Step 2 - Verify Pods

```bash
kubectl get pods
```

Example

```
Running

0/1 Ready
```

or

```
CrashLoopBackOff
```

---

# Step 3 - Describe Pod

```bash
kubectl describe pod <pod-name>
```

Look for

```
Readiness probe failed

Liveness probe failed
```

Also review

- Events
- Restart Count
- Exit Codes

---

# Step 4 - Verify Probe Configuration

```bash
kubectl describe deployment frontend
```

Check

- HTTP Path
- Port
- Scheme
- Initial Delay Seconds
- Timeout Seconds
- Period Seconds
- Failure Threshold

---

# Step 5 - Review Application Logs

```bash
kubectl logs <pod-name>
```

Check for

- Startup exceptions
- Missing environment variables
- Database errors
- Redis errors
- Flask startup failures

---

# Step 6 - Verify Endpoint

Example

```
GET /health

↓

HTTP 200
```

Ensure the configured endpoint actually exists.

---

# Step 7 - Verify Port

Application

```
5000
```

Probe

```
5000
```

Ensure both match.

---

# Step 8 - Verify Dependencies

Check

```
Frontend

↓

API Gateway

↓

Auth Service

↓

Redis

↓

PostgreSQL
```

If dependencies are unavailable, health checks may fail.

---

# Step 9 - Verify Resource Usage

```bash
kubectl top pod
```

Check

- CPU Usage
- Memory Usage

High utilization may cause probe timeouts.

---

# Step 10 - Verify Events

```bash
kubectl get events --sort-by=.metadata.creationTimestamp
```

Look for

- Probe Failures
- OOMKilled
- Failed Scheduling
- Resource Pressure

---

# Step 11 - Fix the Root Cause

Possible actions

- Correct probe path
- Correct probe port
- Increase Initial Delay
- Increase Timeout
- Restore dependencies
- Optimize startup process

Commit the changes to Git.

---

# Step 12 - Synchronize

```bash
argocd app sync frontend
```

---

# Validation

Verify

```bash
kubectl get pods
```

Expected

```
Running

1/1 Ready
```

Application

```bash
argocd app get frontend
```

Expected

```
Synced

Healthy
```

---

# Functional Testing

Verify

- Login
- Dashboard
- API Gateway
- Authentication
- Redis
- PostgreSQL

---

# Important Commands

Application

```bash
argocd app get frontend
```

Pods

```bash
kubectl get pods
```

Describe

```bash
kubectl describe pod <pod-name>
```

Logs

```bash
kubectl logs <pod-name>
```

Deployment

```bash
kubectl describe deployment frontend
```

Events

```bash
kubectl get events
```

Metrics

```bash
kubectl top pod
```

---

# Success Criteria

- Health = Healthy
- Sync = Synced
- Pods Ready
- No Probe Failures
- APIs Reachable
- No Critical Alerts

---

# Interview Questions

## Q1. What is the difference between Readiness and Liveness Probes?

### Answer

A Readiness Probe determines whether a Pod is ready to receive traffic, while a Liveness Probe determines whether the application is still running correctly. If the Liveness Probe fails repeatedly, Kubernetes restarts the container.

---

## Q2. Why would a Pod be Running but Not Ready?

### Answer

The container is running, but the Readiness Probe is failing due to application startup delays, dependency failures, incorrect probe configuration, or unavailable services.

---

## Q3. How do you troubleshoot Health Check failures?

### Answer

Review Pod events, inspect probe configuration, analyze application logs, verify dependencies, check resource utilization, correct the root cause and synchronize the application through ArgoCD.

---

# Marathi Quick Revision

- Running पण Ready नाही = Health Check Failure.
- `kubectl describe pod` तपासा.
- Readiness/Liveness Probe Verify करा.
- Logs तपासा.
- Port आणि Path Verify करा.
- Database/Redis तपासा.
- Fix → Git Commit → ArgoCD Sync → Healthy.

