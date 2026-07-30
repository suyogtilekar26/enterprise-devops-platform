# Kubernetes Interview Master Handbook

# Chapter 07 - Labels

---

# What are Labels?

## English

Labels are key-value pairs attached to Kubernetes resources.

They are used to identify, organize, filter and select resources.

Think of Labels as Tags.

---

## मराठी

Labels म्हणजे Kubernetes Resource ला लावलेले Tags.

हे Resource ओळखण्यासाठी, Group करण्यासाठी आणि Select करण्यासाठी वापरले जातात.

---

# Syntax

metadata:

  labels:

    app: frontend

    environment: dev

    version: v1

---

# Key-Value Pair

Key

↓

app

Value

↓

frontend

Another Example

team: platform

owner: devops

tier: frontend

release: stable

---

# Why Labels?

Without Labels

Kubernetes cannot identify related resources.

With Labels

Deployment

↓

ReplicaSet

↓

Pods

↓

Service

Everything becomes connected.

---

# Real World Example

Imagine a Parking Lot.

Cars

BMW

Audi

Mercedes

Each car has a Sticker.

Color = Black

Owner = John

Floor = P2

These Stickers are Labels.

---

# Kubernetes Example

Frontend Pods

app=frontend

Backend Pods

app=backend

Database

app=mysql

Service uses

selector

app=frontend

Traffic goes only to frontend Pods.

---

# Production Example

E-Commerce Application

Frontend

app=frontend

tier=web

env=prod

Backend

app=backend

tier=api

env=prod

Database

app=mysql

tier=db

env=prod

Monitoring can filter

env=prod

Application can filter

tier=api

Operations can filter

team=platform

---

# Standard Labels

app

version

environment

team

owner

tier

release

component

managed-by

---

# Labels in Deployment

metadata:

  labels:

    app: frontend

template:

  metadata:

    labels:

      app: frontend

These labels are copied to Pods.

---

# Service Uses Labels

Service

↓

Selector

↓

app=frontend

↓

Find Matching Pods

↓

Send Traffic

If Labels don't match

↓

No Endpoints

↓

Application Down

---

# Useful Commands

Show Labels

kubectl get pods --show-labels

---

Filter Pods

kubectl get pods -l app=frontend

---

Multiple Labels

kubectl get pods -l app=frontend,environment=dev

---

Show Deployments

kubectl get deploy --show-labels

---

Add Label

kubectl label pod pod-name version=v2

---

Remove Label

kubectl label pod pod-name version-

---

Production Incident

Developer changes

app=frontend

↓

app=frontend-v2

Service selector remains

app=frontend

Result

No matching Pods

Website Down

Root Cause

Label mismatch

---

Best Practices

Use meaningful names.

Use lowercase.

Keep labels consistent.

Never randomly rename labels.

Follow organization standards.

---

Common Mistakes

Changing labels in Production

Different labels in Deployment and Pod Template

Using spaces

Using duplicate meanings

Random naming

---

Interview Questions

Q1 What are Labels?

Answer

Labels are key-value pairs used to identify and organize Kubernetes resources.

---

Q2 Why are Labels important?

Answer

They allow Kubernetes resources like Services and Deployments to locate and manage Pods.

---

Q3 Can multiple Labels exist?

Answer

Yes.

One resource can have many Labels.

Example

app=frontend

environment=prod

team=platform

version=v1

---

Q4 Can Labels be changed?

Answer

Yes.

But changing Labels can affect Services, Deployments and NetworkPolicies.

Always verify impact before modifying them.

---

Q5 Where are Labels used?

Deployment

Service

ReplicaSet

Pod

Helm

ArgoCD

Prometheus

NetworkPolicy

---

Scenario Based Interview

Question

Pods are Running.

Service exists.

Application is not accessible.

What is your first check?

Answer

Check Labels and Service Selector.

Most production outages are caused by Label mismatch.

Commands

kubectl get pods --show-labels

kubectl describe service frontend

kubectl get endpoints

---

Senior Engineer Notes

Labels are one of the most critical design decisions in Kubernetes.

A poor labeling strategy creates monitoring, deployment and troubleshooting problems.

Always define organization-wide label standards before creating workloads.

---

Cheat Sheet

✔ Labels = Tags

✔ Labels are Key-Value pairs

✔ Used for Selection

✔ Used for Filtering

✔ Used by Service

✔ Used by Deployment

✔ Used by Helm

✔ Used by ArgoCD

✔ Used by Prometheus

✔ Used by NetworkPolicy

