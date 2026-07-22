# Kubernetes Health Probes

# 1. Purpose

The purpose of Kubernetes Health Probes is to automatically determine whether an application is healthy and capable of serving requests.

Health Probes help Kubernetes

- Detect unhealthy containers
- Restart failed applications
- Prevent traffic from reaching broken Pods
- Improve application availability

Health Probes are one of the most important Production Kubernetes features.

---

# 2. Introduction

Imagine our API Gateway starts successfully.

However,

after a few hours,

it becomes stuck because of

- Memory Leak
- Deadlock
- Database Timeout
- Thread Hang

The Pod is still Running.

But it is not responding.

Without Health Probes

```
Running Pod

↓

Users Receive Errors

↓

Production Incident
```

With Health Probes

```
Health Probe Fails

↓

Kubernetes Detects Failure

↓

Restart Container

↓

Application Recovers
```

---

# 3. Enterprise Usage

Almost every Production Deployment defines Health Probes.

Examples

- React Frontend
- Spring Boot APIs
- Flask APIs
- Node.js Applications
- Go Applications
- NGINX
- Prometheus
- Grafana

No Production Deployment should be created without Health Probes.

---

# 4. Usage in THIS Project

Our Enterprise DevOps Platform

```
Frontend

↓

GET /

----------------------------

API Gateway

↓

GET /health

----------------------------

Auth Service

↓

GET /health

----------------------------

Dashboard Service

↓

GET /health
```

Every backend service already exposes

```
/health
```

which Kubernetes will use.

---

# 5. Architecture

```
             Kubernetes

                   │

                   ▼

             Health Probe

                   │

      ┌────────────┼────────────┐

      ▼            ▼            ▼

 Healthy      Unhealthy     Starting

      │            │            │

      ▼            ▼            ▼

 Continue     Restart      Wait
```

---

# 6. Internal Workflow

```
Pod Starts

↓

Health Probe Executes

↓

Application Responds?

↓

YES

↓

Keep Running

------------------------

NO

↓

Failure Threshold

↓

Restart Container
```

---

# 7. Types of Health Probes

There are three probe types.

```
Startup Probe

↓

Liveness Probe

↓

Readiness Probe
```

Each has a different purpose.

---

# 8. Startup Probe

Purpose

Checks whether the application has started successfully.

Useful for

- Spring Boot
- Large Java Applications
- Slow Database Initialization

Without Startup Probe

```
Application

Still Starting

↓

Liveness Probe Fails

↓

Container Restart

↓

Infinite Loop
```

---

# 9. Liveness Probe

Purpose

Checks whether the application is still alive.

If Liveness fails

```
Restart Container
```

Example

Application is

- Deadlocked
- Frozen
- Hung

Kubernetes restarts it automatically.

---

# 10. Readiness Probe

Purpose

Checks whether the application is ready to receive traffic.

If Readiness fails

```
Pod

↓

Removed From Service Endpoints

↓

No User Traffic
```

The Pod continues running.

It simply stops receiving requests until it becomes healthy again.

---

# 11. Daily DevOps Activities

- Verify Probe Configuration
- Monitor Restart Count
- Review Probe Failures
- Investigate Health Endpoints
- Monitor Application Logs
- Tune Probe Timing

---

# 12. Production Best Practices

- Implement `/health` endpoints.
- Configure all three probes where appropriate.
- Avoid aggressive probe intervals.
- Test probe failures before Production.
- Keep health checks lightweight.
- Return proper HTTP status codes.

---

# 13. Security

- Do not expose sensitive data in health endpoints.
- Restrict external access if required.
- Avoid database dumps in health responses.
- Log probe failures.

---

# 14. Troubleshooting

Describe Pod

```bash
kubectl describe pod <pod-name>
```

View Events

```bash
kubectl get events
```

View Logs

```bash
kubectl logs <pod-name>
```

Check Restart Count

```bash
kubectl get pods
```

Test Health Endpoint

```bash
curl http://<pod-ip>:5000/health
```

---

# 15. Real Production Scenarios

## Scenario 1

### Memory Leak

Symptoms

Application became unresponsive.

Pod Status

```
Running
```

Users received

```
504 Gateway Timeout
```

Root Cause

Memory Leak.

Liveness Probe failed.

Kubernetes restarted the container automatically.

---

## Scenario 2

### Database Maintenance

Application

```
Running
```

Database

```
Offline
```

Readiness Probe failed.

Service removed Pod from Endpoints.

Users were routed to healthy Pods.

No outage occurred.

---

## Scenario 3

### Slow Startup

Spring Boot application required

```
120 Seconds
```

to start.

Without Startup Probe,

Liveness Probe restarted it repeatedly.

Startup Probe solved the issue.

---

# 16. Scenario Interview Questions

Q1. What is a Liveness Probe?

Answer

It checks whether the application is alive.

If it fails, Kubernetes restarts the container.

---

Q2. What is a Readiness Probe?

Answer

It checks whether the application is ready to receive traffic.

If it fails, the Pod remains running but is removed from Service Endpoints.

---

Q3. What is a Startup Probe?

Answer

It verifies that slow-starting applications have completed startup before other probes begin.

---

Q4. Which probe restarts a container?

Answer

Liveness Probe.

---

# 17. Architecture Interview Questions

Explain the flow.

```
User

↓

Service

↓

Ready Pods Only

↓

Application

↓

Health Probe

↓

Healthy?
```

---

Q2.

Why should Readiness and Liveness be different?

Answer

An application may still be alive but temporarily unable to serve requests.

Restarting it would be unnecessary.

Readiness simply removes it from traffic until recovery.

---

# 18. Production Support Interview Questions

Production Investigation Flow

```
Application Error

↓

kubectl describe pod

↓

Events

↓

Probe Failure?

↓

Health Endpoint

↓

Logs

↓

Restart Count

↓

Resolved
```

Manager Question

"Our API Pods are Running, but users still receive 503 errors."

Expected Answer

- Check Readiness Probe
- Verify Service Endpoints
- Verify Health Endpoint
- Check Application Logs
- Confirm Database Connectivity
- Validate Recovery

---

# 19. Related Runbooks

- liveness-probe-failure.md
- readiness-probe-failure.md
- startup-probe-timeout.md

---

# 20. Common Incidents

- CrashLoopBackOff
- Probe Timeout
- Readiness Failure
- Liveness Failure
- Startup Failure

---

# 21. Commands

```bash
kubectl describe pod <pod-name>

kubectl get events

kubectl logs <pod-name>

kubectl get endpoints

kubectl get pods

curl http://<pod-ip>:5000/health
```

---

# 22. YAML Deep Dive

Example

```yaml
livenessProbe:
  httpGet:
    path: /health
    port: 5000
  initialDelaySeconds: 30
  periodSeconds: 10

readinessProbe:
  httpGet:
    path: /health
    port: 5000
  initialDelaySeconds: 10
  periodSeconds: 5

startupProbe:
  httpGet:
    path: /health
    port: 5000
  failureThreshold: 30
  periodSeconds: 10
```

Explanation

```
livenessProbe
```

Restarts unhealthy containers.

```
readinessProbe
```

Controls whether traffic reaches the Pod.

```
startupProbe
```

Protects slow-starting applications.

```
initialDelaySeconds
```

Wait before the first probe.

```
periodSeconds
```

How frequently Kubernetes checks the application.

```
failureThreshold
```

Number of failed attempts before considering the probe failed.

---

# 23. Marathi Quick Revision

- Liveness Probe Application जिवंत आहे का ते तपासतो.
- Readiness Probe Traffic घ्यायला तयार आहे का ते तपासतो.
- Startup Probe Slow Applications साठी वापरतात.
- Liveness Fail → Container Restart.
- Readiness Fail → Traffic बंद, Pod चालूच राहतो.

---

# 24. Marathi Summary (5+ Years Experience Revision)

## Interview Summary

Health Probes हे Production Kubernetes मधील अत्यंत महत्त्वाचे Feature आहे.

Liveness, Readiness आणि Startup Probes मिळून Application High Availability सुनिश्चित करतात.

## Production Investigation Flow

```
503 Error

↓

Describe Pod

↓

Probe Events

↓

Health Endpoint

↓

Logs

↓

Restart Count

↓

Resolved
```

## Production Story

Production API Gateway Running होता, पण Users ना 503 Errors येत होते.

Pods Restart होत नव्हते.

Investigation मध्ये Readiness Probe Fail होत होता कारण Database Maintenance चालू होती.

Service ने त्या Pod ला Endpoints मधून काढले आणि Traffic इतर Healthy Pods कडे गेला.

Production Down झाला नाही.

## Memory Trick

**Startup = Can I Start?**

**Liveness = Am I Alive?**

**Readiness = Am I Ready?**

Remember

**Start → Live → Ready**

