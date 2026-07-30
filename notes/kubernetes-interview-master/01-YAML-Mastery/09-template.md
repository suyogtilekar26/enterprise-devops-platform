# Kubernetes Interview Master Handbook

# Chapter 09 - Template

---

# What is Template?

## English

A Template is a blueprint used by Kubernetes to create Pods.

Deployment never creates Pods directly.

Deployment creates a ReplicaSet.

ReplicaSet uses the Pod Template to create Pods.

---

## मराठी

Template म्हणजे Pod तयार करण्याचा आराखडा (Blueprint).

Deployment स्वतः Pod तयार करत नाही.

Deployment → ReplicaSet तयार करतो.

ReplicaSet → Template वापरून Pods तयार करतो.

---

# Architecture

Developer

↓

Deployment

↓

ReplicaSet

↓

Pod Template

↓

Pod-1

Pod-2

Pod-3

---

# Basic Syntax

template:

  metadata:

    labels:

      app: frontend

  spec:

    containers:

    - name: frontend

      image: nginx

---

# Why Template?

Imagine you want

10 Pods

Should you write

10 Pod YAML files?

No.

Write only ONE template.

ReplicaSet creates all Pods automatically.

---

# Template Contains

metadata

↓

labels

↓

spec

↓

containers

↓

image

↓

ports

↓

resources

Everything required to create a Pod.

---

# template.metadata

Used to define Pod Labels.

Example

template:

  metadata:

    labels:

      app: frontend

These labels are copied to every Pod.

---

# template.spec

Defines how Pods should run.

Contains

Containers

Image

Ports

Volumes

Secrets

ConfigMaps

Resources

SecurityContext

Affinity

NodeSelector

Tolerations

Probes

Everything related to Pod execution.

---

# Real Production Example

Deployment

replicas: 5

Template

image=v1

ReplicaSet creates

5 Pods

All Pods use image v1.

---

Developer changes

image=v2

Template changes.

Deployment creates a new ReplicaSet.

New Pods use image v2.

Old Pods are terminated gradually.

This is Rolling Update.

---

# Internal Flow

Deployment

↓

Pod Template

↓

ReplicaSet

↓

Pod

↓

Container

↓

Application

---

# Production Example

Application

Frontend

Version

v1

Traffic Running

Developer changes

image=v2

Deployment notices Template changed.

Creates New ReplicaSet.

Creates New Pods.

Deletes Old Pods gradually.

No Downtime.

---

# Common Mistakes

Changing Pod directly

Instead of Deployment.

Editing running Pods.

Forgetting to update Template.

Changing Labels incorrectly.

Wrong Image.

---

# Best Practices

Always update Deployment.

Never edit Pods manually.

Keep Pod Template under Git.

Review Template changes before Production deployment.

---

# Useful Commands

kubectl get deployment

kubectl get rs

kubectl get pods

kubectl rollout history deployment frontend

kubectl rollout status deployment frontend

kubectl describe deployment frontend

---

# Production Incident

Developer manually edits a Pod.

Pod works.

Later Deployment performs reconciliation.

Old Pod deleted.

Manual changes disappear.

Reason

Deployment only trusts the Template.

---

# Interview Questions

Q1 What is a Pod Template?

Answer

A Pod Template is a blueprint used by ReplicaSets to create Pods.

---

Q2 Does Deployment create Pods directly?

Answer

No.

Deployment creates ReplicaSets.

ReplicaSets create Pods using the Pod Template.

---

Q3 Where is the Template located?

Answer

Inside Deployment YAML.

template:

  metadata:

  spec:

---

Q4 What happens if Template changes?

Answer

Deployment creates a new ReplicaSet and starts a Rolling Update.

---

Q5 Can we edit a running Pod?

Answer

Technically yes.

Practically no.

Deployment reconciliation removes manual changes.

Always update the Deployment YAML.

---

# Scenario Based Interview

Question

Developer changes

image:v1

↓

image:v2

How are new Pods created?

Answer

Deployment detects Template change.

Creates a new ReplicaSet.

New ReplicaSet creates Pods using image v2.

Old ReplicaSet gradually scales down.

---

# Senior Engineer Notes

Never treat Pods as permanent.

Pods are disposable.

Template is the single source of truth.

Production changes should always happen through Deployment YAML.

---

# Cheat Sheet

✔ Template = Pod Blueprint

✔ ReplicaSet uses Template

✔ Deployment never creates Pods directly

✔ Template change = New ReplicaSet

✔ New ReplicaSet = Rolling Update

✔ Never edit Pods manually

✔ Always update Deployment YAML

