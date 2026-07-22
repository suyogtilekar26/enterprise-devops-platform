# Kubernetes Labels and Selectors

# 1. Purpose

The purpose of Labels and Selectors is to identify and group Kubernetes resources.

Without Labels and Selectors, Kubernetes cannot determine which Pods belong to a Deployment or a Service.

They are one of the most important concepts in Kubernetes.

---

# 2. Introduction

Labels are key-value pairs attached to Kubernetes resources.

Example

```
app=frontend

environment=production

version=v1

team=devops
```

Selectors use these Labels to find matching resources.

Simple Rule

Label = Identity

Selector = Search Condition

---

# 3. Enterprise Usage

Production environments use Labels for

- Services
- Deployments
- Monitoring
- Logging
- RBAC
- Cost Allocation
- Team Ownership

Example

```
app=frontend

env=production

team=payments

version=v2
```

---

# 4. Usage in THIS Project

```
Frontend Deployment

↓

Label

app=frontend

↓

Frontend Pods

---------------------

API Deployment

↓

Label

app=api

↓

API Pods

---------------------

Auth Deployment

↓

Label

app=auth

↓

Auth Pods
```

---

# 5. Architecture

```
Deployment

Label

app=frontend

        │

        ▼

+----------------+

Frontend Pod

Label

app=frontend

+----------------+

        ▲

        │

Service

Selector

app=frontend
```

---

# 6. Internal Workflow

```
Deployment

↓

Creates Pods

↓

Adds Labels

↓

Service Searches Labels

↓

Matching Pods Found

↓

Traffic Sent
```

---

# 7. Labels

Labels identify Kubernetes objects.

Examples

```
app=frontend

app=backend

version=v1

environment=dev

environment=prod

team=platform
```

One resource can have multiple Labels.

Example

```
app=frontend

version=v2

team=devops

environment=production
```

---

# 8. Selectors

Selectors search Labels.

Example

Service Selector

```
app=frontend
```

Kubernetes finds

```
Pod-1

app=frontend

------------

Pod-2

app=frontend

------------

Pod-3

app=frontend
```

Traffic goes only to matching Pods.

---

# 9. Daily DevOps Activities

- Verify Labels
- Verify Selectors
- Check Service Mapping
- Debug Missing Endpoints
- Update Labels
- Monitor Resources

---

# 10. Production Best Practices

- Follow Label Naming Standards.
- Never use random Labels.
- Keep Label names consistent.
- Always verify Service Selectors.
- Include environment Labels.
- Include application version Labels.

---

# 11. Security

Labels should never contain

- Passwords
- API Keys
- Tokens
- Secrets

Labels are visible to everyone with cluster access.

---

# 12. Troubleshooting

List Labels

```bash
kubectl get pods --show-labels
```

Describe Pod

```bash
kubectl describe pod <pod-name>
```

Check Services

```bash
kubectl get svc
```

Check Endpoints

```bash
kubectl get endpoints
```

---

# 13. Real Production Scenarios

## Scenario 1

### Service Not Working

Application Pods

```
app=frontend
```

Service Selector

```
app=front-end
```

Result

No matching Pods.

Users receive

503 Service Unavailable.

Investigation

```bash
kubectl get pods --show-labels

kubectl describe svc frontend
```

Resolution

Correct the Selector.

---

## Scenario 2

### Wrong Version

Production Service accidentally pointed to

```
version=v1
```

instead of

```
version=v2
```

Old application continued serving traffic.

Updating Selector fixed the issue.

---

## Scenario 3

### Monitoring

Prometheus monitored only

```
team=payments
```

Pods using Label Selectors.

Monitoring became easier without changing application code.

---

# 14. Scenario Interview Q&A

Q. What is a Label?

Answer

A Label is a key-value pair attached to Kubernetes resources for identification.

---

Q. What is a Selector?

Answer

A Selector searches Kubernetes resources using Labels.

---

Q. Can one Pod have multiple Labels?

Answer

Yes.

Production Pods usually have many Labels.

---

# 15. Architecture Interview Q&A

```
Deployment

↓

Labels

↓

Pods

↑

Selectors

↑

Service
```

Deployment creates Labels.

Service uses Selectors.

---

# 16. Production Support Interview Q&A

Application Not Reachable

```
Alert

↓

kubectl get svc

↓

kubectl get endpoints

↓

Endpoints Empty?

↓

kubectl get pods --show-labels

↓

Compare Labels

↓

Fix Selector

↓

Verify
```

---

# 17. Related Runbooks

- service-no-endpoints.md
- wrong-selector.md
- deployment-label-mismatch.md

---

# 18. Common Incidents

- Wrong Label
- Wrong Selector
- No Endpoints
- Traffic Not Reaching Pods
- Version Mismatch

---

# 19. Commands

```bash
kubectl get pods --show-labels

kubectl label pod <pod-name> env=dev

kubectl get svc

kubectl describe svc frontend

kubectl get endpoints

kubectl describe pod <pod-name>
```

---

# 20. Marathi Quick Revision

- Label म्हणजे ओळख.
- Selector म्हणजे शोध.
- Service Labels वापरून Pods शोधते.
- चुकीचा Selector असेल तर Application चालणार नाही.

---

# 21. Marathi Summary (5+ Experience Revision)

## Interview Summary

Labels हे Kubernetes Resources ची ओळख असतात.

Selectors त्या Labels वापरून योग्य Pods शोधतात.

Service आणि Deployment Labels/Selectors वर अवलंबून असतात.

## Production Investigation Flow

```
Alert

↓

Service Down

↓

kubectl get endpoints

↓

Endpoints Empty?

↓

kubectl get pods --show-labels

↓

Selector Match?

↓

Fix

↓

Verify
```

## Production Story

Production मध्ये Frontend Application 503 Error देत होती.

Pods Running होते.

Service Endpoints Empty होते.

Reason

Service Selector मध्ये

app=front-end

होते,

पण Pods वर

app=frontend

होते.

Selector Update केल्यानंतर Application लगेच चालू झाली.

## Memory Trick

**Label = Identity**

**Selector = Search**

Remember

**No Matching Labels = No Traffic**

