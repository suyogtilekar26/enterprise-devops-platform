# Kubernetes Runbook 16 - Health Probe Failures

# 1. Purpose

This runbook explains how to investigate and recover Kubernetes Health Probe failures affecting application availability.

Health probes determine whether Kubernetes should start routing traffic to Pods, restart containers, or delay application startup. Incorrect probe configuration or application behavior can cause continuous Pod restarts and production outages.

The objective is to identify the failing probe, restore application stability, minimize customer impact, and complete the Root Cause Analysis (RCA).

---

# 2. Scope

Applicable to

- Liveness Probe
- Readiness Probe
- Startup Probe
- Deployments
- StatefulSets
- DaemonSets
- Production Kubernetes Clusters

Supported Platforms

- Kind
- EKS
- AKS
- GKE
- OpenShift
- On-Prem Kubernetes

---

# 3. Symptoms

Users may report

- Login failures
- Website unavailable
- API timeouts
- Random application failures
- Slow responses

Monitoring may report

- Pod Restart
- Unhealthy Pods
- Readiness failures
- Liveness failures
- HTTP 503
- Increased restart count

Example

```
Application

↓

Health Probe Fails

↓

Pod Restart

↓

Traffic Removed

↓

Customer Impact
```

---

# 4. Business Impact

Critical

- Production outage
- Customer transactions fail
- Complete service unavailable

Medium

- One service unavailable
- Increased response time

Low

- Internal application degradation

---

# 5. Possible Root Causes

- Incorrect probe path
- Wrong port
- Slow application startup
- Database unavailable
- External dependency timeout
- CPU starvation
- Memory exhaustion
- Application bug
- Network issue
- Wrong probe timing configuration

---

# 6. Prerequisites

Required

- kubectl
- Metrics Server
- Namespace access
- Deployment permissions

Verify

```bash
kubectl auth can-i get pods

kubectl auth can-i describe pods

kubectl auth can-i logs pods
```

---

# 7. Initial Investigation

## Step 1

Verify Pods

```bash
kubectl get pods -A
```

Look for

```
Running

CrashLoopBackOff

Error
```

---

## Step 2

Describe Pod

```bash
kubectl describe pod <pod-name> \
-n <namespace>
```

Review

```
Events
```

Example

```
Readiness probe failed

Liveness probe failed
```

---

## Step 3

Review Restart Count

```bash
kubectl get pods
```

Example

```
RESTARTS

18
```

---

## Step 4

Review Logs

```bash
kubectl logs <pod-name> \
-n <namespace>

kubectl logs <pod-name> \
--previous \
-n <namespace>
```

---

# 8. Detailed Investigation

## Step 1

Review Deployment

```bash
kubectl describe deployment <deployment-name>
```

Verify

- Liveness Probe
- Readiness Probe
- Startup Probe

---

## Step 2

Verify Probe Configuration

Review

```
Path

Port

Initial Delay

Timeout

Period

Failure Threshold
```

---

## Step 3

Verify Application Endpoint

Inside Pod

```bash
kubectl exec -it <pod-name> \
-- curl http://localhost:8080/health
```

Expected

```
HTTP 200
```

---

## Step 4

Verify Service Dependency

Check

- Database
- Redis
- Kafka
- External API

Application may fail probes because dependencies are unavailable.

---

## Step 5

Verify Resource Usage

```bash
kubectl top pod <pod-name>
```

Review

- CPU
- Memory

---

## Step 6

Review Events

```bash
kubectl get events \
-n <namespace> \
--sort-by=.metadata.creationTimestamp
```

---

## Step 7

Review Recent Changes

Verify

- Deployment
- ConfigMap
- Secret
- Helm Release
- Argo CD Sync
- CI/CD Pipeline

---

# 9. Resolution Steps

Depending on findings

Incorrect Probe Path

Update Deployment.

Wrong Port

Correct probe configuration.

Application Slow Startup

Increase

```
initialDelaySeconds
```

or configure Startup Probe.

Dependency Failure

Recover backend service.

Application Bug

Rollback Deployment.

CPU/Memory Issue

Increase resources after investigation.

---

# 10. Validation Steps

Verify

```bash
kubectl get pods

kubectl describe pod
```

Expected

```
READY

1/1
```

Business Validation

- Login successful
- APIs healthy
- Dashboard available
- Monitoring green
- No restart increase

---

# 11. Rollback Procedure

If issue started after deployment

```bash
kubectl rollout undo deployment/<deployment>
```

If caused by probe configuration

Restore previous Deployment manifest.

Validate

- Pods healthy
- Probes successful
- Business functionality restored

---

# 12. Escalation Matrix

L1

- Verify Pods
- Collect Events
- Review Logs

↓

L2

- Verify Probe Configuration
- Verify Dependencies

↓

Development Team

- Application issue
- Health endpoint

↓

Platform Team

- Kubernetes configuration

---

# 13. Production Best Practices

- Implement dedicated health endpoints.
- Separate readiness and liveness logic.
- Use Startup Probe for slow applications.
- Never use business logic inside health endpoints.
- Monitor restart count.
- Test probe configuration before production.
- Avoid aggressive timeout values.

---

# 14. Real Production Scenario

A production authentication service started restarting continuously after deployment.

Investigation

```bash
kubectl describe pod
```

showed

```
Liveness probe failed
```

Application startup had increased from

```
10 seconds

to

65 seconds
```

after enabling encryption.

The configured

```
initialDelaySeconds

10
```

was insufficient.

Updating the Startup Probe and increasing the initial delay resolved the issue.

Root Cause

Incorrect health probe timing after application enhancement.

---

# 15. Scenario Interview Questions

## Q1. What is the difference between Readiness and Liveness Probe?

### Answer

Readiness Probe

Determines whether a Pod should receive traffic.

Liveness Probe

Determines whether Kubernetes should restart the container.

---

## Q2. When should Startup Probe be used?

### Answer

Startup Probe should be used for applications with long startup times.

It prevents Liveness Probe from restarting containers before initialization completes.

---

## Q3. Why can a healthy application still fail Readiness Probe?

### Answer

Possible reasons

- Wrong path
- Wrong port
- Database unavailable
- Dependency timeout
- Incorrect probe configuration

---

# 16. Architecture Interview Questions

## Q1. Explain Kubernetes Health Probe architecture.

### Answer

```
Application

↓

Health Endpoint

↓

kubelet

↓

Readiness Probe

↓

Service Endpoint

↓

Customer Traffic
```

```
Application

↓

Liveness Probe

↓

Failure

↓

Container Restart
```

---

## Q2. Which Kubernetes components participate?

### Answer

- kubelet
- Deployment
- Pod
- Service
- Endpoint Controller
- Application

---

# 17. Production Support Interview Questions

## Q1. Pods continuously restart because of probe failures. Walk through your investigation.

### Answer

Commands

```bash
kubectl describe pod

kubectl logs --previous

kubectl describe deployment

kubectl exec -it <pod> -- curl localhost:8080/health

kubectl top pod

kubectl get events
```

Verify

- Probe configuration
- Health endpoint
- Dependencies
- Resources
- Recent deployment

---

## Q2. What production mistakes commonly cause probe failures?

### Answer

- Wrong endpoint path
- Wrong port
- Startup time ignored
- Dependency checks inside health endpoint
- Very short timeout
- Low failure threshold
- Application bug

---

# 18. Commands Reference

```bash
kubectl get pods

kubectl describe pod

kubectl describe deployment

kubectl logs <pod>

kubectl logs <pod> --previous

kubectl exec -it <pod> -- curl localhost:8080/health

kubectl top pod

kubectl get events

kubectl rollout undo deployment/<deployment>
```

---

# 19. Marathi Quick Revision

- Pod describe करा.
- Probe failure तपासा.
- Previous logs तपासा.
- Health endpoint verify करा.
- Resource usage तपासा.
- Dependencies तपासा.
- Probe configuration verify करा.
- आवश्यक असल्यास rollback करा.

---

# 20. Related Runbooks

- 06-deployment-rollback.md
- 07-service-not-reachable.md
- 12-configmap-update.md
- 13-secret-rotation.md
- 14-resource-exhaustion.md
- 15-oomkilled.md

---

# 21. Marathi Summary (5+ Experience Revision)

## Interview Summary

Production मध्ये Health Probe failures आल्यास प्रथम `kubectl describe pod` वापरून कोणती probe fail होत आहे (Readiness, Liveness किंवा Startup) हे ओळखावे. त्यानंतर logs, health endpoint, dependencies, resource usage आणि probe configuration तपासावी. Startup वेळ वाढल्यास Startup Probe किंवा `initialDelaySeconds` योग्यरित्या configure करावी. Root Cause निश्चित झाल्यानंतरच probe configuration बदलावी.

### Production Investigation Flow

```
Alert

↓

Pod Restart

↓

Describe Pod

↓

Probe Failure

↓

Logs

↓

Health Endpoint

↓

Dependencies

↓

Resources

↓

Probe Configuration

↓

Root Cause

↓

Fix / Rollback

↓

Validation

↓

RCA
```

### Production Story

एका production insurance platform मध्ये नवीन security library जोडल्यामुळे application startup वेळ 15 सेकंदांवरून 70 सेकंद झाली. Liveness Probe अजूनही `initialDelaySeconds: 10` वापरत होती. त्यामुळे kubelet प्रत्येक वेळी application पूर्ण सुरू होण्यापूर्वी container restart करत होता. Startup Probe जोडून आणि probe timing सुधारल्यानंतर application पूर्णपणे स्थिर झाली. Incident review नंतर प्रत्येक major release साठी startup time validation CI/CD pipeline मध्ये अनिवार्य करण्यात आले.

### 5+ Years Memory Trick

Interview मध्ये जर विचारले,

**"How do you troubleshoot Kubernetes Health Probe failures in production?"**

उत्तर:

"I first identify whether the failure is related to the Readiness, Liveness, or Startup Probe using `kubectl describe pod`. I then review application logs, validate the health endpoint, check dependencies and resource utilization, verify probe configuration, determine whether the issue is configuration or application related, apply the appropriate fix or rollback, validate business functionality, and complete the RCA."

