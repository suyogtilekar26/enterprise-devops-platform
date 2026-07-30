# Kubernetes Interview Master Handbook

# Production Incident 08 - Readiness, Liveness & Startup Probe Failures

---

# Incident

Deployment completed successfully.

Pods are Running.

Users cannot access the application.

OR

Pods keep restarting.

Reason

Health Probe Failure.

---

# What are Health Probes?

## English

Health Probes help Kubernetes determine whether a container is healthy and ready to receive traffic.

---

## मराठी

Health Probes Kubernetes ला सांगतात की Application व्यवस्थित चालत आहे का आणि User Traffic स्वीकारण्यासाठी तयार आहे का.

---

# Types of Probes

Readiness Probe

↓

Checks if the application is Ready to receive traffic.

---

Liveness Probe

↓

Checks if the application is Alive.

If failed

↓

Container Restart

---

Startup Probe

↓

Checks whether the application has started successfully.

Useful for slow-starting applications.

---

# Readiness Probe

Purpose

Ready for User Traffic?

YES

↓

Service sends traffic.

NO

↓

Service removes Pod from Endpoints.

Container continues running.

---

# Liveness Probe

Purpose

Is the Application Still Alive?

YES

↓

Continue Running.

NO

↓

Restart Container.

---

# Startup Probe

Purpose

Application Startup Complete?

YES

↓

Enable Readiness and Liveness Probes.

NO

↓

Keep Waiting.

Ideal for Java, Spring Boot and other slow-starting applications.

---

# Probe Flow

Container Starts

↓

Startup Probe

↓

Readiness Probe

↓

Traffic Begins

↓

Liveness Probe

↓

Continuous Health Monitoring

---

# HTTP Probe Example

readinessProbe:

  httpGet:

    path: /health

    port: 8080

---

# TCP Probe Example

livenessProbe:

  tcpSocket:

    port: 8080

---

# Exec Probe Example

livenessProbe:

  exec:

    command:

    - cat

    - /tmp/healthy

---

# Important Parameters

initialDelaySeconds

Delay before first probe.

---

periodSeconds

Time between probe checks.

---

timeoutSeconds

Maximum wait time for probe response.

---

failureThreshold

Failures allowed before marking unhealthy.

---

successThreshold

Successful checks required before becoming healthy.

Usually

1

---

# Common Reasons for Failure

Wrong Health Endpoint

Application Startup Delay

Database Dependency

Port Misconfiguration

Network Delay

Application Bug

High CPU Usage

High Memory Usage

---

# Step 1

Check Pod Status

kubectl get pods

---

# Step 2

Describe Pod

kubectl describe pod POD_NAME

Look for

Readiness Probe Failed

Liveness Probe Failed

Startup Probe Failed

---

# Step 3

Check Events

kubectl get events

---

# Step 4

Check Logs

kubectl logs POD_NAME

kubectl logs POD_NAME --previous

---

# Step 5

Verify Health Endpoint

curl http://localhost:8080/health

---

# Troubleshooting Flow

Probe Failure

↓

Describe Pod

↓

Events

↓

Logs

↓

Health Endpoint

↓

Application Startup Time

↓

Configuration

↓

Fix

↓

Redeploy

---

# Production Incident

Spring Boot application

Startup Time

90 seconds

Readiness Probe

Started after

10 seconds

Result

Probe Failed

Traffic never reached Pods.

Resolution

Increase

initialDelaySeconds

OR

Use Startup Probe.

---

# Another Incident

Health endpoint changed

Old

/health

New

/actuator/health

Probe still checked

/health

Pods continuously restarted.

Resolution

Update Probe configuration.

---

# Best Practices

Use Readiness for Traffic Control.

Use Liveness for Deadlock Recovery.

Use Startup Probe for Slow Applications.

Keep Health Endpoints Lightweight.

Never perform Database Queries inside Health Endpoints.

Monitor Probe Failures.

---

# Useful Commands

kubectl describe pod POD_NAME

---

kubectl get events

---

kubectl logs POD_NAME

---

kubectl logs POD_NAME --previous

---

kubectl exec -it POD_NAME -- curl localhost:8080/health

---

# Interview Questions

Q1

Difference between Readiness and Liveness?

Answer

Readiness determines whether the application can receive traffic.

Liveness determines whether the application should be restarted.

---

Q2

What happens if Readiness Probe fails?

Answer

The Pod is removed from Service Endpoints.

No user traffic reaches the Pod.

The container is NOT restarted.

---

Q3

What happens if Liveness Probe fails?

Answer

Kubernetes restarts the container.

---

Q4

When should Startup Probe be used?

Answer

For applications that take a long time to start.

Example

Spring Boot

Java Applications

Large ML Models

---

Q5

Which command helps identify probe failures?

Answer

kubectl describe pod POD_NAME

Review the Events section.

---

# Scenario Based Interview

Question

Pods are Running.

Users receive 503 errors.

What will you check?

Answer

1. Readiness Probe

2. Service Endpoints

3. Health Endpoint

4. Application Logs

5. Probe Events

---

Question

Pods restart every minute.

Logs look normal.

What could be the reason?

Answer

Liveness Probe may be failing due to an incorrect endpoint, timeout, or probe configuration.

---

# Production Troubleshooting Checklist

✔ kubectl get pods

✔ kubectl describe pod

✔ kubectl get events

✔ kubectl logs

✔ kubectl logs --previous

✔ Verify Health Endpoint

✔ Verify Probe Configuration

✔ Check initialDelaySeconds

✔ Check timeoutSeconds

✔ Check failureThreshold

---

# Senior Engineer Notes

Health Probes should validate application health—not external dependencies.

A failing database should not always cause a Liveness Probe failure.

Use:

Readiness → Traffic Management

Liveness → Automatic Recovery

Startup → Slow Application Startup

Design probes carefully to avoid unnecessary restarts and production outages.

