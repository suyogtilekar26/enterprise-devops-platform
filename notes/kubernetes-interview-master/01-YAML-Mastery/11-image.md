# Kubernetes Interview Master Handbook

# Chapter 11 - Image

---

# What is an Image?

## English

A Container Image is a read-only package that contains everything required to run an application.

It includes

Application

Libraries

Dependencies

Runtime

Configuration

Kubernetes creates Containers using Images.

---

## मराठी

Image म्हणजे Application चालवण्यासाठी लागणाऱ्या सर्व गोष्टींचा Read-Only Package.

Container हा Image पासून तयार होतो.

Image मध्ये

Application

Libraries

Dependencies

Runtime

Configuration

असते.

---

# Kubernetes Flow

Developer

↓

Dockerfile

↓

Docker Build

↓

Docker Image

↓

Docker Registry

↓

Kubernetes

↓

Container

---

# Example

image: nginx:1.27

Meaning

Repository

↓

nginx

Tag

↓

1.27

---

# Another Example

image: enterprise-devops-platform-frontend:v1.0.0

Repository

↓

enterprise-devops-platform-frontend

Tag

↓

v1.0.0

---

# Why Images are Important?

Image guarantees

Same Application

Same Dependencies

Same Runtime

Everywhere

Developer Laptop

↓

Testing

↓

QA

↓

Production

Everything remains identical.

---

# Container vs Image

Image

Blueprint

Read Only

Reusable

Container

Running Instance

Read Write Layer

Temporary

Example

Image

↓

Ubuntu

Container

↓

Running Ubuntu

---

# Image Tags

image: nginx:latest

Not Recommended

Reason

Latest changes automatically.

Version becomes unpredictable.

---

Better

image: nginx:1.27

Even Better

image: enterprise:v1.0.3

Production always uses fixed versions.

---

# Image Registry

Docker Hub

Amazon ECR

Azure ACR

Google GAR

JFrog Artifactory

Harbor

Private Registry

Kubernetes downloads images from these registries.

---

# Production Flow

Developer

↓

Git Push

↓

CI Pipeline

↓

Docker Build

↓

Security Scan

↓

Push to Registry

↓

Deployment YAML Updated

↓

ArgoCD

↓

Production Deployment

---

# Production Example

Frontend

v1.0.0

↓

Bug Found

↓

Build

v1.0.1

↓

Deploy

No code changes required.

Only Image changes.

---

# Image Update

Old

image: frontend:v1.0.0

New

image: frontend:v1.0.1

Deployment performs Rolling Update.

---

# Common Mistakes

Using latest tag.

Using wrong registry.

Deleting old images.

Not scanning images.

Using mutable tags.

---

# Best Practices

Use Semantic Versioning.

Scan Images.

Store Images in Private Registry.

Never use latest in Production.

Sign Images.

Keep Image Size Small.

---

# Useful Commands

docker images

---

kubectl describe pod POD_NAME

---

kubectl get pods

---

kubectl rollout history deployment frontend

---

kubectl rollout undo deployment frontend

---

# Production Incident

Developer pushed

frontend:latest

New build replaced old image.

Production unexpectedly changed.

Rollback became difficult.

Root Cause

Using latest tag.

---

# Interview Questions

Q1 What is a Container Image?

Answer

A Container Image is a packaged application with all required dependencies used to create Containers.

---

Q2 Difference between Image and Container?

Answer

Image is read-only.

Container is a running instance of an Image.

---

Q3 Why should latest tag be avoided?

Answer

Because latest is mutable and unpredictable.

Production deployments should always use versioned images.

---

Q4 Name some Image Registries.

Answer

Docker Hub

Amazon ECR

Azure ACR

Google Artifact Registry

JFrog Artifactory

Harbor

---

Q5 What happens when Image changes in Deployment?

Answer

Deployment creates a new ReplicaSet and performs a Rolling Update.

---

# Scenario Based Interview

Question

Production deployment suddenly changed although nobody modified the YAML.

Possible reason?

Answer

Someone pushed a new Image with the latest tag.

---

Question

A vulnerability is found in your container image.

What will you do?

Answer

Rebuild the Image with patched dependencies.

Scan it.

Push a new version.

Deploy the new Image.

Never patch running containers.

---

# Senior Engineer Notes

Treat Images as immutable artifacts.

Never modify containers directly.

Always rebuild and redeploy.

Version every image.

Maintain rollback history.

---

# Cheat Sheet

✔ Image = Application Package

✔ Container = Running Image

✔ Avoid latest

✔ Use Version Tags

✔ Store Images in Registry

✔ Scan Images

✔ Rebuild instead of modifying Containers

✔ Rolling Update happens when Image changes

