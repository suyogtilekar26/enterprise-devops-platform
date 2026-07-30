# Kubernetes Interview Master Handbook

# Chapter 04 - kind

---

# What is kind?

## English

The "kind" field tells Kubernetes what type of resource should be created.

Every Kubernetes YAML must specify a resource type.

---

## मराठी

kind म्हणजे Kubernetes ला सांगणे की कोणता Resource तयार करायचा आहे.

Kubernetes सर्वप्रथम kind वाचतो आणि त्यानुसार योग्य Controller वापरतो.

---

# Syntax

kind: Deployment

---

# Why is kind Required?

Without kind Kubernetes cannot determine which object to create.

Example

Should it create

Pod?

Deployment?

Service?

Namespace?

Ingress?

It cannot decide without kind.

---

# Common Resource Types

kind: Pod

Creates a single Pod.

---

kind: Deployment

Creates Deployment.

Deployment manages ReplicaSets.

ReplicaSets manage Pods.

---

kind: Service

Creates a Service.

Used to expose Pods.

---

kind: ConfigMap

Stores non-sensitive configuration.

---

kind: Secret

Stores sensitive information.

Password

API Keys

Tokens

Certificates

---

kind: Namespace

Creates logical isolation.

---

kind: ReplicaSet

Maintains desired Pod count.

Normally managed by Deployment.

---

kind: StatefulSet

Used for databases.

Examples

MySQL

PostgreSQL

MongoDB

Kafka

---

kind: DaemonSet

Runs one Pod on every Node.

Examples

Fluentd

Prometheus Node Exporter

Security Agents

---

kind: Job

Runs once.

Example

Database Migration

Backup

---

kind: CronJob

Runs on schedule.

Example

Daily Backup

Nightly Cleanup

Monthly Reports

---

kind: Ingress

Routes external HTTP/HTTPS traffic.

---

# Real Production Example

Developer wants to deploy frontend.

Correct

kind: Deployment

Wrong

kind: Pod

Result

No rolling updates

No ReplicaSet

No self healing

Manual management

---

# Internal Flow

Read YAML

↓

Read apiVersion

↓

Read kind

↓

Load Resource Schema

↓

Validate YAML

↓

Store in etcd

↓

Controller Creates Resource

---

# Production Example

Frontend

Deployment

Backend

Deployment

Redis

StatefulSet

Node Exporter

DaemonSet

Daily Backup

CronJob

External Access

Ingress

Each workload uses a different kind.

---

# Common Mistakes

Using Pod instead of Deployment

Using Deployment for Database

Using Job instead of CronJob

Using ReplicaSet directly

Using Secret for normal configuration

---

# Best Practices

Application

Deployment

Database

StatefulSet

Agent

DaemonSet

One-time Task

Job

Scheduled Task

CronJob

Configuration

ConfigMap

Sensitive Data

Secret

---

# Useful Commands

kubectl api-resources

Lists supported resource types.

---

kubectl get deployment

kubectl get pod

kubectl get service

kubectl get ingress

kubectl get statefulset

kubectl get daemonset

---

kubectl explain deployment

Shows documentation.

---

# Production Incident

Company deployed MongoDB as Deployment.

Pod restarted.

Database volume was recreated incorrectly.

Application data became unavailable.

Solution

Use StatefulSet for databases.

---

# Interview Questions

Q1 What is kind?

Answer

kind specifies the Kubernetes resource type that should be created.

---

Q2 Can Kubernetes create a resource without kind?

Answer

No.

Both apiVersion and kind are mandatory.

---

Q3 Difference between Pod and Deployment?

Answer

Pod runs containers.

Deployment manages Pods, supports rolling updates, scaling and self-healing.

---

Q4 Which kind is used for databases?

Answer

StatefulSet

---

Q5 Which kind is used for monitoring agents?

Answer

DaemonSet

---

Q6 Which kind is used for scheduled tasks?

Answer

CronJob

---

# Scenario Based Interview

Question

Your application needs automatic scaling, rolling updates and self healing.

Which kind will you choose?

Answer

Deployment

Reason

Deployment manages ReplicaSets and Pods automatically.

---

# Senior Engineer Notes

Choose the correct kind before writing YAML.

Wrong resource type causes production issues.

Do not deploy production applications as standalone Pods.

Prefer Deployment unless there is a strong architectural reason.

---

# Cheat Sheet

✔ Pod → Single Container Workload

✔ Deployment → Applications

✔ Service → Networking

✔ ConfigMap → Configuration

✔ Secret → Sensitive Data

✔ StatefulSet → Databases

✔ DaemonSet → One Pod Per Node

✔ Job → Run Once

✔ CronJob → Scheduled Tasks

✔ Ingress → External Access

