# Kubernetes Interview Master Handbook

# Chapter 01 - What is YAML?

---

# Introduction

## English

YAML stands for **YAML Ain't Markup Language**.

It is a human-readable data serialization language used to define infrastructure, application configuration, and Kubernetes resources.

---

## मराठी

YAML म्हणजे **YAML Ain't Markup Language**.

YAML ही माणसाला सहज वाचता येणारी configuration language आहे. Kubernetes मध्ये Pod, Deployment, Service, ConfigMap, Secret, Ingress यांसारखे resources तयार करण्यासाठी YAML वापरली जाते.

---

# Why YAML?

Without YAML:

- Manual configuration
- Error-prone
- Difficult to maintain
- Not version controlled

With YAML:

- Infrastructure as Code
- Version Control
- Easy Review
- Automation
- Repeatable Deployment

---

# Real World Example

Suppose you want two Nginx servers.

Without Kubernetes:

- Install Linux
- Install Nginx
- Configure
- Start service

With Kubernetes YAML:

replicas: 2

Kubernetes automatically creates two Pods.

---

# Production Example

Company:

Amazon

Deployment:

frontend

Replicas:

5

If one Pod crashes,

ReplicaSet automatically creates another Pod.

No manual intervention required.

---

# YAML Example

apiVersion: apps/v1
kind: Deployment

metadata:
  name: frontend

spec:
  replicas: 2

---

# Advantages

- Human Readable
- Easy to Modify
- Declarative
- Version Controlled
- Git Friendly
- Automation Friendly

---

# Common Mistakes

- Wrong Indentation
- Wrong apiVersion
- Wrong Labels
- Wrong Selector
- Wrong Namespace

---

# Interview Questions

## Q1 What is YAML?

Answer:

YAML is a human-readable data serialization language used to define Kubernetes resources declaratively.

---

## Q2 Why Kubernetes uses YAML?

Answer:

Because YAML is simple, version controllable, declarative, and easy to automate.

---

## Q3 Why YAML instead of Commands?

Answer:

Commands are imperative.

YAML is declarative.

Production always prefers declarative configuration.

---

# Senior Engineer Notes

Always store YAML in Git.

Never edit Production resources manually.

Always use Pull Requests.

Always review YAML before deployment.

---

# Key Takeaways

✔ YAML is declarative

✔ YAML is Human Readable

✔ Kubernetes uses YAML to create resources

✔ YAML supports GitOps

✔ YAML is the foundation of Kubernetes
