# Incident 04 - CrashLoopBackOff

# Enterprise DevOps Platform

---

# Incident Summary

A production deployment completed successfully, but one or more application Pods entered the **CrashLoopBackOff** state.

The application continuously starts, crashes and restarts, making the service unavailable or unstable.

---

# Severity

```
SEV-1
```

Critical production incident affecting application availability.

---

# Business Impact

- Application unavailable
- User requests fail
- Increased latency
- Continuous pod restarts
- High CPU usage
- Failed deployments
- Revenue loss
- SLA violation

---

# Environment

- Kubernetes
- ArgoCD
- Production Cluster
- Git Repository

---

# Symptoms

ArgoCD Dashboard

```
Health

Degraded
```

Pods

```bash
kubectl get pods -n guestbook
```

Output

```
NAME

guestbook-xxxxx

STATUS

CrashLoopBackOff
```

---

# Common Causes

- Application Crash
- Missing Environment Variables
- Invalid Configuration
- Missing Secret
- Missing ConfigMap
- Database Connection Failure
- Invalid Startup Command
- Incorrect Image
- Out Of Memory
- Failed Dependency
- Port Configuration Error

---

# Detection

Check Application

```bash
argocd app get guestbook
```

Check Pods

```bash
kubectl get pods -n guestbook
```

---

# Investigation

## Step 1

List Pods

```bash
kubectl get pods -n guestbook
```

---

## Step 2

Describe Pod

```bash
kubectl describe pod <pod-name> \
-n guestbook
```

Look for

```
Restart Count

Last State

Events
```

---

## Step 3

View Logs

```bash
kubectl logs <pod-name> \
-n guestbook
```

If restarting rapidly

```bash
kubectl logs <pod-name> \
--previous \
-n guestbook
```

---

## Step 4

Check Events

```bash
kubectl get events \
-n guestbook \
--sort-by=.lastTimestamp
```

---

## Step 5

Verify Deployment

```bash
kubectl describe deployment guestbook \
-n guestbook
```

---

## Step 6

Check Environment Variables

```bash
kubectl describe pod <pod-name>
```

Verify

```
ConfigMap

Secret

Environment Variables
```

---

## Step 7

Check Resource Usage

```bash
kubectl top pod \
-n guestbook
```

---

# Root Cause Analysis

Example

Developer updated the application.

The new version expected

```
DATABASE_URL
```

The Secret was missing.

Application exited immediately.

Kubernetes restarted the container repeatedly.

Pod entered

```
CrashLoopBackOff
```

---

# Resolution

Create the missing Secret.

Example

```bash
kubectl create secret generic database-secret \
--from-literal=DATABASE_URL=postgres://user:password@db:5432/app
```

Or

Fix the Deployment manifest in Git.

Commit

```bash
git add .
```

```bash
git commit -m "Fixed application configuration"
```

```bash
git push origin main
```

Synchronize

```bash
argocd app sync guestbook
```

---

# Validation

Check Pods

```bash
kubectl get pods -n guestbook
```

Expected

```
Running

READY 1/1
```

---

Verify Logs

```bash
kubectl logs <pod-name>
```

No crash messages.

---

Verify Application

```bash
argocd app get guestbook
```

Expected

```
Healthy

Synced
```

---

# Commands Used

Application

```bash
argocd app get guestbook
```

Pods

```bash
kubectl get pods
```

Describe Pod

```bash
kubectl describe pod <pod-name>
```

Logs

```bash
kubectl logs <pod-name>
```

Previous Logs

```bash
kubectl logs <pod-name> --previous
```

Events

```bash
kubectl get events
```

---

# Timeline Example

```
15:00

Deployment Completed

↓

15:01

Application Started

↓

15:02

Application Crashed

↓

15:03

Kubernetes Restarted Container

↓

15:05

CrashLoopBackOff

↓

15:08

Engineer Reviewed Logs

↓

15:12

Configuration Fixed

↓

15:14

Git Updated

↓

15:15

ArgoCD Synced

↓

15:17

Application Healthy
```

---

# Prevention

- Validate configuration before deployment.
- Test Secrets and ConfigMaps.
- Add startup validation.
- Implement health checks.
- Monitor restart counts.
- Use CI testing.
- Perform smoke tests before production.

---

# Best Practices

- Always check logs before restarting Pods.
- Use structured logging.
- Keep Secrets under version-controlled management practices.
- Monitor CrashLoopBackOff alerts.
- Never ignore increasing restart counts.

---

# Interview Questions

## 1. What is CrashLoopBackOff?

A Kubernetes state where a container repeatedly starts, crashes and is restarted.

---

## 2. Which command is most useful for investigation?

```bash
kubectl logs <pod-name> --previous
```

---

## 3. What commonly causes CrashLoopBackOff?

- Missing Secrets
- Application bugs
- Invalid configuration
- Database failures
- Memory issues

---

## 4. How do you verify restart information?

```bash
kubectl describe pod <pod-name>
```

---

## 5. How can CrashLoopBackOff incidents be prevented?

- Configuration validation
- Automated testing
- Health checks
- Monitoring
- Proper Secret management

---

# Incident Success Criteria

The incident is resolved when:

- Pods are Running.
- Restart count stops increasing.
- Application is Healthy.
- Application is Synced.
- Root cause is documented.
- Preventive actions are implemented.

---

# Marathi Quick Revision

- CrashLoopBackOff म्हणजे Application वारंवार Crash होऊन Kubernetes ती पुन्हा सुरू करत आहे.
- `kubectl logs --previous` हा सर्वात महत्त्वाचा Debugging Command आहे.
- Missing Secrets, चुकीचे Configuration किंवा Application Bugs ही सामान्य कारणे आहेत.
- Git मध्ये बदल करून ArgoCD Sync करणे ही योग्य पद्धत आहे.
- Production मध्ये Restart Count सतत Monitor करावा.

