# Kubernetes Interview Master Handbook

# Chapter 06 - spec

---

# What is spec?

## English

The "spec" section defines the desired state of a Kubernetes resource.

You tell Kubernetes what you want.

Kubernetes continuously works to make the actual state match the desired state.

---

## मराठी

spec म्हणजे Kubernetes ला दिलेली इच्छा (Desired State).

तुम्ही Kubernetes ला सांगता की मला काय हवे आहे.

Kubernetes सतत प्रयत्न करत राहतो की Cluster ची सध्याची स्थिती (Actual State) आणि तुम्ही सांगितलेली स्थिती (Desired State) सारखी राहावी.

---

# Example

spec:

  replicas: 2

This means

"I always want 2 Pods running."

---

# Desired State vs Actual State

Desired State

2 Pods

Actual State

2 Pods

Everything is healthy.

---

Scenario

Desired State

2 Pods

Actual State

1 Pod

Kubernetes immediately creates another Pod.

This process is called Reconciliation.

---

# Kubernetes Reconciliation Loop

Developer

↓

Writes YAML

↓

kubectl apply

↓

API Server

↓

etcd

↓

Controller Manager

↓

Compare Desired State

↓

Compare Actual State

↓

If Different

↓

Take Action

↓

Cluster becomes Healthy

---

# Real Production Example

Deployment

replicas: 5

One worker node crashes.

Running Pods become

3

Desired State

5

Deployment Controller creates

2 new Pods

Application remains available.

---

# Why spec is Important?

Everything inside spec tells Kubernetes

How many Pods

Which Image

Which Ports

Which Resources

Which Strategy

How to Deploy

How to Update

---

# Example Deployment

spec:

  replicas: 2

  selector:

    matchLabels:

      app: frontend

  template:

    spec:

      containers:

      - image: nginx

---

# Common spec Sections

Deployment

replicas

selector

strategy

template

containers

resources

---

Service

selector

ports

type

---

Ingress

rules

tls

backend

---

StatefulSet

serviceName

volumeClaimTemplates

replicas

---

# Production Incident

Developer changes

replicas

2

↓

0

Deployment succeeds.

All Pods terminate.

Website becomes unavailable.

Root Cause

Desired State was changed to zero replicas.

---

# Common Mistakes

Wrong replica count

Wrong selector

Wrong image

Wrong resource limits

Wrong rolling update strategy

Wrong container port

---

# Best Practices

Always review spec before deployment.

Use Pull Requests.

Never change production spec directly.

Validate manifests in lower environments.

Keep spec under Git version control.

---

# Useful Commands

kubectl explain deployment.spec

kubectl describe deployment frontend

kubectl get deployment

kubectl get rs

kubectl get pods

---

# Troubleshooting

Pods are not starting

↓

Check Deployment Spec

↓

Check Image

↓

Check Events

↓

Check Logs

↓

Check Resource Limits

↓

Check Scheduling

---

# Interview Questions

Q1 What is spec?

Answer

spec defines the desired state of a Kubernetes resource.

---

Q2 What is Desired State?

Answer

Desired State is the configuration defined inside spec.

---

Q3 What is Actual State?

Answer

Actual State is the current running state of the cluster.

---

Q4 What happens if Desired State and Actual State are different?

Answer

Kubernetes controllers automatically reconcile the difference.

---

Q5 Which Kubernetes component performs reconciliation?

Answer

Controllers running inside the Controller Manager.

---

# Scenario Based Interview

Question

One Pod crashes.

Nobody manually creates a new Pod.

Still the application returns to normal.

How?

Answer

Deployment Controller compares Desired State with Actual State.

It notices only one Pod is running instead of two.

ReplicaSet automatically creates another Pod.

This is Kubernetes Self-Healing.

---

# Senior Engineer Notes

Everything in Kubernetes revolves around Desired State.

Never manually fix production Pods.

Update the YAML.

Apply the manifest.

Let Kubernetes perform reconciliation.

This follows the Infrastructure as Code principle.

---

# Cheat Sheet

✔ spec = Desired State

✔ Controllers maintain Desired State

✔ Actual State is continuously monitored

✔ Difference triggers Reconciliation

✔ Reconciliation provides Self-Healing

✔ Never edit running Pods manually

✔ Update YAML and apply changes

