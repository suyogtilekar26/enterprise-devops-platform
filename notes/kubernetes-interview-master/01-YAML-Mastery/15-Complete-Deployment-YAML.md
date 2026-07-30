# Kubernetes Interview Master Handbook

# Chapter 15 - Complete Deployment YAML (Line by Line Explanation)

---

# Complete Deployment YAML

apiVersion: apps/v1

kind: Deployment

metadata:

  name: frontend

  namespace: enterprise-dev

  labels:

    app: frontend

    project: enterprise-devops-platform

    environment: dev

spec:

  replicas: 2

  selector:

    matchLabels:

      app: frontend

  strategy:

    type: RollingUpdate

    rollingUpdate:

      maxSurge: 1

      maxUnavailable: 0

  template:

    metadata:

      labels:

        app: frontend

        project: enterprise-devops-platform

        environment: dev

    spec:

      containers:

      - name: frontend

        image: enterprise-devops-platform-frontend:v1.0.0

        imagePullPolicy: IfNotPresent

        ports:

        - containerPort: 80

        resources:

          requests:

            cpu: "100m"

            memory: "128Mi"

          limits:

            cpu: "250m"

            memory: "256Mi"

---

# How Kubernetes Reads This YAML

Step 1

API Server receives YAML

↓

Step 2

Validates apiVersion

↓

Step 3

Validates kind

↓

Step 4

Stores object inside etcd

↓

Step 5

Deployment Controller notices new Deployment

↓

Step 6

ReplicaSet is created

↓

Step 7

ReplicaSet creates Pods

↓

Step 8

Scheduler selects Node

↓

Step 9

Kubelet starts Containers

↓

Application becomes Running

---

# Line by Line Explanation

--------------------------------------------------

apiVersion: apps/v1

Meaning

Deployment belongs to Apps API Group.

Without this Kubernetes cannot understand Deployment schema.

Interview Point

Deployment always uses apps/v1.

--------------------------------------------------

kind: Deployment

Meaning

Create a Deployment resource.

Deployment manages ReplicaSets.

ReplicaSets manage Pods.

Interview Point

Never deploy production applications using standalone Pods.

--------------------------------------------------

metadata

Contains identity of the resource.

Includes

Name

Namespace

Labels

Annotations

--------------------------------------------------

name: frontend

Deployment Name.

Commands

kubectl get deployment

kubectl describe deployment frontend

--------------------------------------------------

namespace: enterprise-dev

Deployment will be created inside

enterprise-dev namespace.

Without namespace

Deployment goes into default namespace.

--------------------------------------------------

labels

Used for

Filtering

Selection

Monitoring

Helm

ArgoCD

Prometheus

NetworkPolicy

--------------------------------------------------

spec

Desired State.

Everything Kubernetes should maintain is written here.

--------------------------------------------------

replicas: 2

Always maintain

2 Running Pods.

If one Pod crashes

ReplicaSet creates another.

--------------------------------------------------

selector

Deployment manages Pods having

app=frontend

If labels don't match

Deployment cannot manage Pods.

--------------------------------------------------

strategy

RollingUpdate

Production deployment strategy.

No downtime deployment.

--------------------------------------------------

maxSurge: 1

One additional Pod may be created during update.

Example

Old Pods

2

New Pods

1

Total

3

Temporary

--------------------------------------------------

maxUnavailable: 0

No Pod should become unavailable.

Application remains online during update.

Production Recommended.

--------------------------------------------------

template

Blueprint used to create Pods.

Changing Template

↓

Creates New ReplicaSet

↓

Starts Rolling Update

--------------------------------------------------

template.metadata.labels

Labels copied into every Pod.

Service uses these labels.

Deployment uses these labels.

ReplicaSet uses these labels.

--------------------------------------------------

containers

Defines application containers.

Pod can contain

One Container

or

Multiple Containers

--------------------------------------------------

name: frontend

Container Name.

Useful while checking logs.

Example

kubectl logs POD_NAME -c frontend

--------------------------------------------------

image

Container Image.

Example

enterprise-devops-platform-frontend:v1.0.0

Changing image

↓

Rolling Update

--------------------------------------------------

imagePullPolicy

IfNotPresent

Use Local Image

Download only if missing.

Perfect for our Kind Lab.

--------------------------------------------------

containerPort

Internal application port.

Browser never connects directly.

Service forwards traffic here.

--------------------------------------------------

requests

Minimum CPU and Memory.

Used by Scheduler.

--------------------------------------------------

limits

Maximum CPU and Memory.

Protects Node resources.

--------------------------------------------------

# Deployment Architecture

Developer

↓

Deployment YAML

↓

API Server

↓

etcd

↓

Deployment Controller

↓

ReplicaSet

↓

Pods

↓

Containers

↓

Application

---

# Production Deployment Flow

Git Push

↓

CI Pipeline

↓

Docker Build

↓

Image Scan

↓

Image Registry

↓

Deployment YAML Updated

↓

Git Commit

↓

ArgoCD

↓

Kubernetes

↓

Rolling Update

↓

Production

---

# Production Incident

Developer accidentally changed

selector

app=frontend

↓

app=frontend-v2

Deployment created successfully.

ReplicaSet created.

Pods already existed.

Deployment could not manage existing Pods.

Result

Unexpected rollout behaviour.

Lesson

Never change Deployment selectors after creation.

---

# Troubleshooting Checklist

Deployment Not Created

↓

kubectl describe deployment

↓

Check Events

↓

Validate YAML

---

Pods Pending

↓

kubectl describe pod

↓

Check Scheduler Events

↓

Check Resources

---

Pods CrashLoopBackOff

↓

kubectl logs

↓

kubectl describe pod

↓

Check Image

↓

Check Environment Variables

---

Service Not Working

↓

Check Labels

↓

Check Selector

↓

Check Endpoints

↓

Check TargetPort

---

# Interview Questions

Q1 Why do we use Deployment instead of Pod?

Answer

Deployment provides

Rolling Updates

Self-Healing

Scaling

Replica Management

Rollback

---

Q2 Which object actually creates Pods?

Answer

ReplicaSet.

Deployment creates ReplicaSet.

ReplicaSet creates Pods.

---

Q3 What happens when Image changes?

Answer

Deployment creates a new ReplicaSet.

Rolling Update starts automatically.

---

Q4 Why do we define Requests and Limits?

Answer

Requests are used for scheduling.

Limits prevent resource overuse.

---

Q5 Why is Template important?

Answer

Template is the blueprint for Pod creation.

Every new Pod is created using this Template.

---

# Senior Engineer Notes

Production Deployments should always include

Versioned Images

Resource Requests

Resource Limits

RollingUpdate Strategy

Labels

Namespaces

Proper Naming Standards

Everything should be managed through GitOps.

Never edit Production Pods manually.

---

# Final Cheat Sheet

✔ Deployment manages ReplicaSets

✔ ReplicaSets manage Pods

✔ Template creates Pods

✔ Selector finds Pods

✔ Labels identify Pods

✔ Image creates Containers

✔ Requests help Scheduler

✔ Limits protect Nodes

✔ RollingUpdate avoids downtime

✔ GitOps is the recommended production approach

