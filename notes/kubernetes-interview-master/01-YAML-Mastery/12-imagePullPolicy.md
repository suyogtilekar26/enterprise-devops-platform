# Kubernetes Interview Master Handbook

# Chapter 12 - imagePullPolicy

---

# What is imagePullPolicy?

## English

imagePullPolicy tells Kubernetes when it should pull the container image from the registry.

It decides whether to

Use Local Image

OR

Download a New Image

---

## मराठी

imagePullPolicy म्हणजे Kubernetes ला सांगणे की Image Registry मधून नवीन Image घ्यायची की Node वर आधीपासून असलेली Image वापरायची.

---

# Syntax

containers:

- name: frontend

  image: frontend:v1.0.0

  imagePullPolicy: IfNotPresent

---

# Available Values

Always

IfNotPresent

Never

---

# 1. Always

Meaning

Every time a Pod starts

↓

Kubernetes contacts the Registry

↓

Downloads the latest matching Image

↓

Creates Container

---

Production Example

Image

frontend:v1.0.0

Even if the image exists locally

Kubernetes checks the Registry.

---

Use Cases

Development

CI Testing

Rapid Image Updates

---

Advantages

Always gets newest Image.

---

Disadvantages

Slower startup.

Registry dependency.

More network usage.

---

# 2. IfNotPresent

Meaning

Check Local Image

↓

Found

↓

Use Local Image

↓

Not Found

↓

Download From Registry

---

Production Example

EKS Worker Node

Already contains

frontend:v1.0.0

Pod starts immediately.

No Image Download.

---

Advantages

Fast Startup

Less Network

Production Recommended

---

Disadvantages

If image tag is reused,

Old Image may continue.

---

# 3. Never

Meaning

Do not contact Registry.

Only use Local Image.

If Image does not exist

↓

Pod fails.

---

Production Example

Kind Cluster

kind load docker-image frontend:v1.0.0

imagePullPolicy: Never

Kubernetes uses the locally loaded image.

---

When do we use Never?

Local Labs

Kind

Air-Gapped Environment

Offline Cluster

---

# How Kubernetes Decides

Pod Starts

↓

Check imagePullPolicy

↓

Always

↓

Download

OR

↓

IfNotPresent

↓

Check Local

↓

Download if Missing

OR

↓

Never

↓

Use Local Only

---

# Default Behaviour

Image Tag

latest

↓

Default

Always

---

Versioned Tag

v1.0.0

↓

Default

IfNotPresent

---

Always specify imagePullPolicy explicitly.

Never depend on defaults.

---

# Production Example

Developer pushes

frontend:latest

Production Pod Restarts

Always

↓

Downloads New Image

↓

Unexpected Behaviour

Solution

Use Version Tags

Use IfNotPresent

---

# Common Errors

ErrImagePull

Reason

Image not found.

Wrong repository.

Wrong tag.

Private registry authentication failed.

---

ImagePullBackOff

Reason

Kubernetes keeps retrying.

Image still unavailable.

---

# Troubleshooting

Describe Pod

kubectl describe pod POD_NAME

---

Check Events

kubectl get events

---

Verify Image

docker images

---

Verify Registry

Check repository.

Check image tag.

Check authentication.

---

# Best Practices

Never use latest in Production.

Use Versioned Images.

Use IfNotPresent for Production.

Use Always only when necessary.

Store Images in Private Registry.

Scan Images before deployment.

---

# Production Incident

Developer

image: frontend:latest

imagePullPolicy: Always

Production Pod restarted.

Downloaded newly pushed image.

Application behaviour changed.

Root Cause

Mutable latest tag.

---

# Interview Questions

Q1 What is imagePullPolicy?

Answer

It defines when Kubernetes should pull an image from the registry.

---

Q2 Available imagePullPolicy values?

Answer

Always

IfNotPresent

Never

---

Q3 Which policy is commonly used in Production?

Answer

IfNotPresent with versioned image tags.

---

Q4 What causes ImagePullBackOff?

Answer

Image cannot be downloaded.

Kubernetes retries repeatedly.

---

Q5 Difference between ErrImagePull and ImagePullBackOff?

Answer

ErrImagePull is the initial image download failure.

ImagePullBackOff means Kubernetes is repeatedly retrying after the failure.

---

# Scenario Based Interview

Question

Pods are stuck in ImagePullBackOff.

How will you troubleshoot?

Answer

1. kubectl describe pod

2. Check Events

3. Verify Image Name

4. Verify Image Tag

5. Verify Registry

6. Verify ImagePullSecrets

7. Verify Network Connectivity

---

Question

Why does Kind usually use IfNotPresent or Never?

Answer

Because images are already loaded locally using

kind load docker-image

No registry download is required.

---

# Senior Engineer Notes

Never use latest in Production.

Always version container images.

Always specify imagePullPolicy explicitly.

Keep registry highly available.

Use immutable image tags.

---

# Cheat Sheet

✔ Always = Always Download

✔ IfNotPresent = Use Local, Download if Missing

✔ Never = Local Image Only

✔ Production = IfNotPresent

✔ Kind = Never or IfNotPresent

✔ ImagePullBackOff = Retry after Pull Failure

✔ ErrImagePull = Initial Pull Failure

