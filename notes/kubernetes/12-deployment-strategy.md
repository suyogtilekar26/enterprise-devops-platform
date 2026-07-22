# Kubernetes Deployment Strategies

# 1. Purpose

The purpose of Deployment Strategies is to deploy new application versions with minimum or zero downtime.

A Deployment Strategy decides how Kubernetes replaces old Pods with new Pods.

Choosing the wrong strategy may cause downtime.

---

# 2. Introduction

Whenever a new application version is released, Kubernetes needs to answer one question.

"How should old Pods be replaced?"

Deployment Strategy defines this process.

The most common strategy in Kubernetes is

- Rolling Update

Other enterprise strategies include

- Recreate
- Blue-Green
- Canary
- A/B Testing (using Service Mesh)

---

# 3. Enterprise Usage

Companies like

- Netflix
- Amazon
- Google
- Microsoft

rarely stop applications completely.

Instead, they gradually release new versions to reduce business risk.

---

# 4. Usage in THIS Project

```
Developer

↓

GitHub

↓

GitHub Actions

↓

Docker Image

↓

Deployment

↓

Rolling Update

↓

Users
```

---

# 5. Architecture

```
Current Version

Pod-v1

Pod-v1

Pod-v1

        │

Rolling Update

        ▼

Pod-v2

Pod-v1

Pod-v1

        ▼

Pod-v2

Pod-v2

Pod-v1

        ▼

Pod-v2

Pod-v2

Pod-v2
```

Users continue accessing the application during deployment.

---

# 6. Internal Workflow

```
Developer

↓

New Image

↓

Deployment Updated

↓

ReplicaSet Created

↓

One New Pod Created

↓

Health Check

↓

Old Pod Deleted

↓

Repeat

↓

Deployment Complete
```

---

# 7. Rolling Update

This is the default Kubernetes Deployment Strategy.

Old Pods are replaced one by one.

Advantages

- Zero Downtime
- Safer Deployment
- Easy Rollback

Production Example

```
Version-1

3 Pods

↓

Update Starts

↓

1 New Pod

↓

Health Check

↓

Delete 1 Old Pod

↓

Repeat

↓

Version-2 Ready
```

---

# 8. Recreate Strategy

Old Pods are deleted first.

New Pods are created later.

```
Version-1

↓↓↓

Delete All Pods

↓↓↓

Create Version-2
```

Advantages

- Simple

Disadvantages

- Downtime

Mostly used for

- Internal Applications
- Development

---

# 9. Blue-Green Deployment

Two environments exist.

Blue = Current Production

Green = New Version

```
Users

↓

Blue

Running

↓

Deploy Green

↓

Testing

↓

Switch Traffic

↓

Green
```

Advantages

- Instant Rollback
- Near Zero Downtime

Disadvantages

- Double Infrastructure Cost

---

# 10. Canary Deployment

Only a small percentage of users receive the new version.

```
100 Users

↓

95 Users

Version-1

↓

5 Users

Version-2

↓

Monitor

↓

Increase Traffic

↓

100% Version-2
```

Advantages

- Low Risk
- Easy Monitoring

---

# 11. Security

- Scan Images
- Verify Image Tags
- Deploy Signed Images
- Use RBAC
- Validate Health Checks

---

# 12. Troubleshooting

Deployment Status

```bash
kubectl rollout status deployment frontend
```

Deployment History

```bash
kubectl rollout history deployment frontend
```

Rollback

```bash
kubectl rollout undo deployment frontend
```

Pods

```bash
kubectl get pods
```

---

# 13. Real Production Scenarios

## Scenario 1

### Failed Rolling Update

A developer deployed Version-2.

Health Checks failed.

Deployment automatically stopped replacing Pods.

Old Pods continued serving users.

Business Impact

No downtime.

---

## Scenario 2

### Blue-Green Release

A Banking Application deployed Version-2.

QA team tested Green environment.

Traffic switched only after successful validation.

Rollback took less than 10 seconds.

---

## Scenario 3

### Canary Release

New Payment Service released to only 5% users.

Error rate increased.

Traffic immediately shifted back to Version-1.

Business users were unaffected.

---

# 14. Scenario Interview Q&A

Q. Which Deployment Strategy is default in Kubernetes?

Answer

Rolling Update.

---

Q. Which strategy causes downtime?

Answer

Recreate.

---

Q. Which strategy gives easiest rollback?

Answer

Blue-Green.

---

Q. Which strategy is safest for Production?

Answer

Rolling Update or Canary depending on business requirements.

---

# 15. Architecture Interview Q&A

```
Developer

↓

Deployment

↓

ReplicaSet

↓

Pods

↓

Rolling Update

↓

Users
```

---

# 16. Production Support Interview Q&A

Deployment Failure Investigation

```
Alert

↓

Rollout Status

↓

Deployment

↓

ReplicaSet

↓

Pods

↓

Logs

↓

Health Check

↓

Rollback

↓

Verify
```

---

# 17. Related Runbooks

- rollout-failure.md
- rollback.md
- deployment-failure.md
- readiness-probe.md

---

# 18. Common Incidents

- Failed Rollout
- Health Check Failure
- ImagePullBackOff
- CrashLoopBackOff
- Wrong Image Version

---

# 19. Commands

```bash
kubectl rollout status deployment frontend

kubectl rollout history deployment frontend

kubectl rollout undo deployment frontend

kubectl get deployments

kubectl get rs

kubectl get pods
```

---

# 20. Marathi Quick Revision

- Rolling Update म्हणजे एकावेळी एक Pod Update होतो.
- Recreate मध्ये आधी सर्व Pods Delete होतात.
- Blue-Green मध्ये दोन Environment असतात.
- Canary मध्ये काही User ना नवीन Version दिली जाते.
- Production मध्ये Rolling Update सर्वात जास्त वापरला जातो.

---

# 21. Marathi Summary (5+ Experience Revision)

## Interview Summary

Deployment Strategy ठरवते की नवीन Version Production मध्ये कशी Deploy करायची.

Rolling Update हा Default Strategy आहे.

Blue-Green Fast Rollback साठी वापरतात.

Canary कमी Risk साठी वापरतात.

## Production Investigation Flow

```
Alert

↓

kubectl rollout status

↓

Pods Healthy?

↓

No

↓

Logs

↓

Readiness Probe

↓

Rollback

↓

Verify
```

## Production Story

एका Production Release मध्ये नवीन Version Deploy झाली.

Readiness Probe Fail झाली.

Deployment ने Rollout थांबवला.

Team ने Rollback केला.

Users ना Downtime जाणवला नाही.

## Memory Trick

**R R B C**

Rolling Update

↓

Recreate

↓

Blue-Green

↓

Canary

Remember

**Rolling = Default**

**Recreate = Downtime**

**Blue-Green = Instant Switch**

**Canary = Few Users First**

