# Kubernetes Interview Master Handbook

# Chapter 08 - Selector

---

# What is Selector?

## English

A Selector tells Kubernetes which resources it should manage or communicate with.

It works by matching Labels.

Without a Selector, Kubernetes cannot identify the correct Pods.

---

## मराठी

Selector म्हणजे Kubernetes ला सांगणे की कोणत्या Pods सोबत काम करायचे.

Selector Labels वर आधारित Pods शोधतो.

Labels नसतील किंवा जुळले नाहीत तर Kubernetes योग्य Pods शोधू शकत नाही.

---

# Basic Syntax

selector:

  matchLabels:

    app: frontend

Meaning

Find every Pod having

app=frontend

---

# How Selector Works

Pod

↓

Label

app=frontend

↓

Service

↓

Selector

app=frontend

↓

Traffic Sent

---

# Real Life Example

Imagine a Company.

Employees have ID Cards.

Department = HR

Department = Finance

Department = IT

Manager wants only IT employees.

He filters

Department=IT

This filter is Selector.

---

# Kubernetes Flow

Deployment

↓

Selector

↓

ReplicaSet

↓

Pods

---

Service

↓

Selector

↓

Matching Pods

↓

Traffic

---

# matchLabels

Example

selector:

  matchLabels:

    app: frontend

    environment: dev

Both labels must match.

---

Pod

app=frontend

environment=dev

Selected

---

Pod

app=frontend

environment=prod

Not Selected

---

# matchExpressions

More Advanced Selection.

Example

selector:

  matchExpressions:

  - key: environment

    operator: In

    values:

    - dev

    - qa

Meaning

Select Pods

environment=dev

OR

environment=qa

---

Available Operators

In

NotIn

Exists

DoesNotExist

---

Production Example

Application

Frontend

app=frontend

version=v1

Service

Selector

app=frontend

Only frontend Pods receive traffic.

Backend Pods never receive frontend traffic.

---

Blue Green Deployment

Old Version

version=v1

New Version

version=v2

Service Selector

version=v2

Traffic immediately moves to new Pods.

---

Can Selector be Changed?

Deployment Selector

Normally NO.

Changing Deployment selectors usually requires recreating the Deployment.

Reason

ReplicaSet ownership changes.

---

Service Selector

Can be changed.

Traffic immediately shifts to matching Pods.

---

Useful Commands

Show Labels

kubectl get pods --show-labels

---

Describe Service

kubectl describe service frontend

---

Show Endpoints

kubectl get endpoints

---

Show Deployment

kubectl describe deployment frontend

---

Production Incident

Developer accidentally changes

Service Selector

app=frontend

↓

app=frontend-v2

No Pods match.

Endpoints become empty.

Website returns

503 Service Unavailable

Root Cause

Selector mismatch.

---

Troubleshooting Flow

Application Down

↓

Check Pod Status

↓

Check Labels

↓

Check Service Selector

↓

Check Endpoints

↓

Check Deployment Selector

↓

Fix Label Mismatch

---

Common Mistakes

Wrong Label

Wrong Namespace

Changing Deployment Selector

Typo in Labels

Extra Spaces

Different Labels in Pod Template

---

Best Practices

Keep Labels Consistent.

Never change Deployment selectors in Production.

Use meaningful label names.

Always verify Endpoints after deployment.

---

Interview Questions

Q1 What is Selector?

Answer

Selector is used to identify Kubernetes resources using Labels.

---

Q2 What is matchLabels?

Answer

matchLabels performs exact key-value matching.

---

Q3 What is matchExpressions?

Answer

matchExpressions provides advanced filtering using operators like In, NotIn and Exists.

---

Q4 Does Service use Selector?

Answer

Yes.

Service uses Selectors to discover matching Pods.

---

Q5 Does Deployment use Selector?

Answer

Yes.

Deployment uses Selectors to identify Pods managed by its ReplicaSet.

---

Scenario Based Interview

Question

Pods are Running.

Service exists.

Still website returns 503.

What will you check?

Answer

1. Pod Labels

2. Service Selector

3. Endpoints

4. Namespace

5. Deployment Selector

Most common cause

Label/Selector mismatch.

---

Senior Engineer Notes

Selectors are one of the most important concepts in Kubernetes.

A single incorrect selector can disconnect Services from Pods even when Pods are healthy.

Always validate selectors during code review.

---

Cheat Sheet

✔ Selector works using Labels

✔ Service uses Selector

✔ Deployment uses Selector

✔ matchLabels = Exact Match

✔ matchExpressions = Advanced Match

✔ Wrong Selector = No Endpoints

✔ Check using

kubectl describe service

kubectl get endpoints

kubectl get pods --show-labels

