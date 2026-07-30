# Kubernetes Interview Master Handbook

# Chapter 10 - Containers

---

# What is a Container?

## English

A Container is the smallest runnable unit inside a Pod.

It packages an application along with its dependencies, libraries and runtime.

Containers are lightweight and isolated.

---

## मराठी

Container म्हणजे Pod मध्ये चालणारा Application.

त्यामध्ये Application, Libraries, Dependencies आणि Runtime असतो.

Container हा VM नाही.

तो Host Kernel share करतो.

---

# Kubernetes Architecture

Deployment

↓

ReplicaSet

↓

Pod

↓

Container

↓

Application

---

# Example

Pod

↓

frontend-container

↓

Nginx

---

# Multiple Containers

A Pod can contain

One Container

or

Multiple Containers

Example

Pod

├── Application Container

├── Log Collector

└── Monitoring Agent

All containers share

Network

Storage

Lifecycle

---

# Why Multiple Containers?

Real Production Example

Application

↓

Writes Logs

↓

Sidecar Container

↓

Reads Logs

↓

Sends Logs

↓

Splunk

Application never communicates directly with Splunk.

Sidecar handles logging.

---

Another Example

Application

↓

Sidecar

↓

Prometheus Metrics Exporter

---

# Init Container

Init Container runs BEFORE the application starts.

Example

Download Configuration

↓

Verify Database

↓

Create Directory

↓

Application Starts

If Init Container fails

Application never starts.

---

Example

initContainers:

- name: init-db

---

# Main Container

The actual application.

Example

Frontend

Backend

API

Microservice

---

# Sidecar Container

Runs together with the application.

Examples

Fluent Bit

Log Collector

Envoy Proxy

Service Mesh

Metrics Exporter

---

# Shared Network

Containers inside one Pod

Share

localhost

Example

Application

localhost:8080

↓

Sidecar

localhost:8080

Communication is very fast.

---

# Shared Storage

Containers inside the same Pod

Can share Volumes.

Example

Application

↓

Write Logs

↓

Volume

↓

Sidecar

↓

Read Logs

↓

Upload to Splunk

---

# Container Lifecycle

Image

↓

Container Created

↓

Started

↓

Running

↓

Stopped

↓

Removed

---

# Restart Policy

Always

Default for Deployments

OnFailure

Never

Mostly used for Jobs.

---

# Production Example

Frontend Pod

Main Container

↓

Nginx

Sidecar

↓

Fluent Bit

↓

Splunk

If Fluent Bit crashes

Kubernetes restarts only that container.

Application continues.

---

# Useful Commands

Show Pods

kubectl get pods

---

Describe Pod

kubectl describe pod POD_NAME

---

Container Logs

kubectl logs POD_NAME

---

Specific Container

kubectl logs POD_NAME -c CONTAINER_NAME

---

Execute Inside Container

kubectl exec -it POD_NAME -- bash

---

Multiple Containers

kubectl describe pod POD_NAME

---

# Common Mistakes

One Pod for every application unnecessarily.

Too many containers in one Pod.

Editing containers manually.

Running database inside application Pod.

Not defining resource limits.

---

# Best Practices

One main application per Pod.

Use Sidecar only when required.

Use Init Containers for initialization.

Define CPU and Memory limits.

Keep containers stateless.

---

# Production Incident

Developer stores uploaded files inside container.

Container restarts.

All uploaded files disappear.

Reason

Container filesystem is temporary.

Solution

Use Persistent Volume.

---

# Interview Questions

Q1 What is a Container?

Answer

A Container is the smallest runnable unit inside a Pod that packages an application with its dependencies.

---

Q2 Can a Pod have multiple Containers?

Answer

Yes.

Multiple containers can run inside a single Pod.

They share Network and Storage.

---

Q3 What is an Init Container?

Answer

Init Container runs before the main application starts.

Used for initialization tasks.

---

Q4 What is a Sidecar Container?

Answer

A Sidecar is an additional container running alongside the main application.

Used for logging, monitoring, proxies and service mesh.

---

Q5 What resources are shared inside a Pod?

Answer

Network

Volumes

Lifecycle

Namespace

---

# Scenario Based Interview

Question

Application logs must be sent to Splunk.

Would you modify the application?

Answer

No.

Deploy a Sidecar Container like Fluent Bit.

The Sidecar collects logs and forwards them to Splunk.

---

Question

Application needs configuration before startup.

Which Kubernetes feature will you use?

Answer

Init Container.

---

# Senior Engineer Notes

Containers should remain stateless.

Do not store business data inside container filesystem.

Use Persistent Volumes for storage.

Use Sidecars only when they provide clear operational value.

Always define resource requests and limits.

---

# Cheat Sheet

✔ Container = Running Application

✔ Pod can have Multiple Containers

✔ Init Container runs First

✔ Main Container runs Application

✔ Sidecar supports Main Container

✔ Containers share Network

✔ Containers share Volumes

✔ Use Persistent Volume for Data

✔ Keep Containers Stateless

