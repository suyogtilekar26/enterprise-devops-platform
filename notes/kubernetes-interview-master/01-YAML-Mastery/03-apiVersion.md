# Kubernetes Interview Master Handbook

# Chapter 03 - apiVersion

---

# What is apiVersion?

## English

apiVersion tells Kubernetes which API group and version should be used to understand and create the resource.

Without apiVersion Kubernetes does not know how to process the YAML.

---

## मराठी

apiVersion म्हणजे Kubernetes ला सांगणे की हा resource कोणत्या API Group आणि Version चा आहे.

जर apiVersion चुकीचा असेल तर Kubernetes resource तयार करू शकत नाही.

---

# Syntax

apiVersion: apps/v1

---

# Why apiVersion is Required?

Kubernetes has many resource types.

Example

Deployment

Service

Pod

Namespace

ConfigMap

Secret

Each belongs to an API Group.

apiVersion tells Kubernetes which API definition to use.

---

# API Groups

Core API

v1

Examples

Pod

Service

Namespace

ConfigMap

Secret

---

Apps API

apps/v1

Examples

Deployment

ReplicaSet

StatefulSet

DaemonSet

---

Batch API

batch/v1

Examples

Job

CronJob

---

Networking API

networking.k8s.io/v1

Examples

Ingress

NetworkPolicy

---

# Common apiVersion Values

Pod

apiVersion: v1

Service

apiVersion: v1

Namespace

apiVersion: v1

Deployment

apiVersion: apps/v1

ReplicaSet

apiVersion: apps/v1

DaemonSet

apiVersion: apps/v1

StatefulSet

apiVersion: apps/v1

Job

apiVersion: batch/v1

CronJob

apiVersion: batch/v1

Ingress

apiVersion: networking.k8s.io/v1

---

# Real Production Example

Developer writes

apiVersion: apps/v2

Deployment fails.

Reason

apps/v2 does not exist.

---

Another Example

Developer copies an old YAML

extensions/v1beta1

Ingress deployment fails.

Reason

API is deprecated.

Production deployment stops.

---

# How Kubernetes Uses apiVersion

Read YAML

↓

Check apiVersion

↓

Find Matching API

↓

Validate Resource

↓

Store in etcd

↓

Create Resource

---

# Common Mistakes

Wrong API Group

Wrong Version

Using Deprecated APIs

Copying Old YAML from Internet

Ignoring Kubernetes Version Compatibility

---

# Best Practices

Always check Kubernetes version.

Use stable APIs.

Avoid beta APIs in production.

Read release notes before upgrading clusters.

---

# Useful Commands

kubectl api-resources

Shows all available resources.

---

kubectl api-versions

Shows supported API versions.

---

kubectl explain deployment

Shows Deployment documentation.

---

kubectl explain deployment.spec

Shows Deployment spec.

---

# Production Incident

Company upgraded Kubernetes from 1.21 to 1.30.

Old Ingress YAML

extensions/v1beta1

Deployment failed.

Entire release was blocked.

Lesson

Always verify apiVersion before cluster upgrade.

---

# Interview Questions

Q1 What is apiVersion?

Answer

apiVersion tells Kubernetes which API group and version should be used to process a resource.

---

Q2 Why is apiVersion important?

Answer

Without apiVersion Kubernetes cannot identify the correct schema for the resource.

---

Q3 What is the apiVersion of Deployment?

Answer

apps/v1

---

Q4 What is the apiVersion of Service?

Answer

v1

---

Q5 Which command shows supported APIs?

Answer

kubectl api-versions

---

# Scenario Based Interview

Question

You upgraded your cluster and Deployment YAML stopped working.

What will you check first?

Answer

1. Kubernetes version

2. apiVersion

3. Deprecated APIs

4. Release Notes

5. Resource Compatibility

---

# Senior Engineer Notes

Never copy production YAML blindly.

Validate API compatibility before upgrades.

Review deprecated APIs before every Kubernetes version upgrade.

Always test manifests in a lower environment before production deployment.

---

# Cheat Sheet

✔ apiVersion identifies API Group and Version

✔ Deployment -> apps/v1

✔ Service -> v1

✔ Job -> batch/v1

✔ Ingress -> networking.k8s.io/v1

✔ Check APIs using

kubectl api-versions

kubectl api-resources

kubectl explain deployment

