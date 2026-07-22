# Helm Notes 63 - Real Production Incidents (5+ Years Interview)

# Enterprise DevOps Platform

---

# 1. Purpose

The purpose of this document is to understand real production incidents related to Helm deployments and learn how experienced DevOps Engineers investigate and resolve them.

Interviewers love these questions because they test production experience instead of theoretical knowledge.

---

# 2. Production Mindset

Interviewer doesn't want to hear

```
I know helm install

I know helm upgrade
```

They want to hear

```
A deployment failed.

How did you investigate?

How did you recover production?
```

Always answer in

```
Problem

↓

Investigation

↓

Root Cause

↓

Solution

↓

Prevention
```

---

# Incident 1 - Wrong values.yaml Deployed ⭐⭐⭐⭐⭐

## Problem

Production application started with wrong configuration.

Developer accidentally used

```
dev-values.yaml
```

instead of

```
prod-values.yaml
```

---

## Symptoms

```
Wrong Database

Wrong URLs

Wrong Replica Count

Wrong Secrets
```

---

## Investigation

```bash
helm get values frontend
```

Compare with Git

```
Wrong values file
```

found immediately.

---

## Solution

```bash
helm upgrade frontend . \
-f prod-values.yaml
```

---

## Prevention

- Separate values files
- CI Validation
- Pull Request Review
- GitOps

---

# Incident 2 - Upgrade Failed ⭐⭐⭐⭐⭐

## Problem

Deployment stopped during

```
helm upgrade
```

---

## Investigation

```bash
helm status frontend
```

```bash
helm history frontend
```

```bash
kubectl get pods
```

One Pod

```
CrashLoopBackOff
```

---

## Root Cause

Application Bug

NOT Helm.

---

## Solution

Fix application.

Deploy again.

---

# Incident 3 - Release Stuck (pending-upgrade)

## Problem

```
STATUS

pending-upgrade
```

Pipeline stopped.

Next deployment also failed.

---

## Investigation

```bash
helm history frontend
```

Found

```
Upgrade Interrupted
```

---

## Solution

```bash
helm rollback frontend 5
```

Production recovered.

---

## Prevention

Use

```bash
--atomic
```

during upgrades.

---

# Incident 4 - Secret Changed

## Problem

Developer updated

```
Secret
```

Application restarted.

Pods failed.

---

## Investigation

```bash
kubectl describe pod
```

```bash
kubectl logs
```

Wrong password.

---

## Solution

Correct Secret

↓

Helm Upgrade

↓

Recovered

---

## Prevention

Never edit production Secrets manually.

---

# Incident 5 - Resource Already Exists

## Problem

```
helm install

FAILED

resource already exists
```

---

## Investigation

```bash
kubectl get configmap
```

Found

```
Manual ConfigMap
```

created by another engineer.

---

## Solution

Delete

OR

Import properly.

---

## Prevention

No manual kubectl apply.

Only Helm.

---

# Incident 6 - ImagePullBackOff

## Problem

Deployment completed.

Pods never started.

---

## Investigation

```bash
kubectl describe pod
```

Found

```
Image Not Found
```

---

## Root Cause

Developer pushed

```
v2

instead of

v2.0.0
```

---

## Solution

Correct image tag.

Deploy again.

---

# Incident 7 - Rollback Required ⭐⭐⭐⭐⭐

## Problem

Production deployment successful.

Five minutes later

Customers unable to login.

---

## Investigation

Logs

↓

Application Bug

Not Infrastructure.

---

## Solution

Immediate rollback

```bash
helm rollback frontend 12
```

Production restored within minutes.

---

## Prevention

Blue/Green

Canary

Testing

---

# Incident 8 - Helm Success but Application Down

## Problem

Pipeline

GREEN

Helm

SUCCESS

Users

FAILED

---

## Investigation

```bash
kubectl get pods
```

Pods

Running.

Logs

```
Database Connection Refused
```

Infrastructure OK.

Application issue.

---

## Lesson

Helm Success

≠

Application Success

---

# Incident 9 - Immutable Field

## Problem

Upgrade failed.

```
Field is immutable
```

---

## Root Cause

Developer changed

```
PVC

Label Selector

Service Type
```

---

## Solution

Create new resource.

Redeploy.

---

# Incident 10 - Hook Failure

## Problem

```
pre-install hook failed
```

Deployment stopped.

---

## Investigation

```bash
kubectl logs JOB
```

Migration script failed.

---

## Solution

Fix migration.

Run again.

---

# 3. Golden Incident Investigation Flow

```
Incident

↓

Read CI Logs

↓

helm status

↓

helm history

↓

helm get values

↓

helm template

↓

kubectl get pods

↓

kubectl describe

↓

kubectl logs

↓

Events

↓

Root Cause

↓

Rollback OR Fix

↓

Production Restored
```

---

# 4. Interview Questions

## Q1

Tell me one production Helm incident.

Answer

Talk about

```
Wrong values.yaml

OR

Pending Upgrade

OR

Rollback
```

---

## Q2

Have you ever performed rollback?

Expected Answer

Yes.

Explain

```
Issue

↓

Investigation

↓

Rollback

↓

Root Cause

↓

Permanent Fix
```

---

## Q3

Deployment successful but application unavailable.

Where will you investigate?

Answer

```
Pods

Logs

Events

Secrets

Database Connectivity
```

---

## Q4

When should rollback be performed?

Answer

Only when

- Production impact exists
- Root cause needs more time
- Previous version is stable

---

## Q5

Can Helm fix application bugs?

Answer

No.

Helm deploys applications.

Application bugs must be fixed by developers.

---

# 5. Best Practices

- Never panic during production incidents.
- Follow a fixed investigation process.
- Rollback only when required.
- Never guess the root cause.
- Document every incident.
- Perform RCA after recovery.
- Automate validations in CI/CD.

---

# 6. Common Mistakes

❌ Immediate rollback without investigation

❌ Blaming Helm for application bugs

❌ Editing production resources manually

❌ Ignoring Events

❌ Skipping logs

❌ No RCA

---

# 7. Marathi Quick Revision

- Wrong values file हा common issue आहे.
- Pending Upgrade → rollback.
- ImagePullBackOff → image tag तपासा.
- Helm Success म्हणजे application success नाही.
- Hook fail → Job logs तपासा.
- Secret change → application crash होऊ शकतो.
- नेहमी RCA करा.

---

# 8. Marathi Summary (5+ Years)

## Simple Explanation

Production मध्ये Helm संबंधित issues बहुतेक वेळा Helm मुळे नसतात. चुकीचे values, image tag, Secret, application bug किंवा Kubernetes resources हे खरे कारण असते.

### Project Usage

आपल्या Enterprise DevOps Platform मध्ये GitHub Actions deployment fail झाला तर प्रथम Helm release तपासू. त्यानंतर Pods, Logs, Events आणि Secrets verify करून root cause शोधू. Production impact असल्यास rollback करू आणि नंतर permanent fix release करू.

### Production Best Practice

Incident handling मध्ये structured investigation follow करावी. Rollback हा recovery mechanism आहे, solution नाही. प्रत्येक incident नंतर Root Cause Analysis (RCA) करणे आवश्यक आहे.

### Production Story

एका production release मध्ये Backend Helm deployment successful झाला, पण users login करू शकत नव्हते. `kubectl logs` मध्ये database password mismatch दिसला. Immediate rollback करून service restore केली. नंतर Secret management process सुधारली आणि GitHub Actions मध्ये validation step add करण्यात आली.

### Investigation Flow

```
Incident

↓

CI Logs

↓

helm status

↓

helm history

↓

helm get values

↓

kubectl logs

↓

Events

↓

Root Cause

↓

Rollback / Fix

↓

RCA
```

### 5+ Years Memory Trick

**Interview Question**

Tell me about a production Helm incident you handled.

**Answer**

"In one deployment, Helm upgrade completed successfully but the application was unavailable. I first checked the Helm release status and history, then investigated the Kubernetes Pods, logs and events. The issue turned out to be an incorrect Secret value rather than a Helm problem. Since production users were impacted, I immediately rolled back to the previous stable revision using `helm rollback`. After restoring the service, we corrected the Secret, validated it in staging and deployed the permanent fix. We also added CI/CD validation to prevent the issue from recurring."

