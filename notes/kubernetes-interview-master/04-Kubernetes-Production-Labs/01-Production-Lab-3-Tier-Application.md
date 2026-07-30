# Kubernetes Interview Master Handbook

# Production Lab 01 - Deploy a Production 3-Tier Application

---

# Objective

Deploy a production-style 3-tier application on Kubernetes.

Architecture

Frontend

↓

Backend API

↓

Database

This lab teaches how multiple Kubernetes resources work together in a real production deployment.

---

# Production Scenario

A company is deploying an internal web application.

Requirements

Frontend should be accessible to users.

Backend should only be accessible internally.

Database should not be exposed outside the cluster.

Application should survive Pod failures.

Traffic should be load balanced.

---

# Architecture

Internet

↓

Ingress

↓

Frontend Service

↓

Frontend Pods

↓

Backend Service

↓

Backend Pods

↓

Database Service

↓

MySQL Pod

↓

Persistent Volume

---

# Kubernetes Resources Used

Namespace

Deployment

Service

ConfigMap

Secret

PersistentVolumeClaim

Ingress

---

# Step 1

Create Namespace

kubectl create namespace production-app

---

# Verify

kubectl get ns

---

# Step 2

Deploy MySQL

Resources

Deployment

PVC

Secret

ClusterIP Service

---

# Verify

kubectl get pods -n production-app

kubectl get pvc -n production-app

---

# Step 3

Deploy Backend API

Resources

Deployment

ClusterIP Service

ConfigMap

Secret

---

# Verify

kubectl get deployments -n production-app

kubectl get svc -n production-app

---

# Step 4

Deploy Frontend

Resources

Deployment

ClusterIP Service

---

# Verify

kubectl get pods -n production-app

---

# Step 5

Deploy Ingress

Internet

↓

Ingress

↓

Frontend

---

# Verify

kubectl get ingress -n production-app

---

# Complete Request Flow

Browser

↓

Ingress

↓

Frontend Service

↓

Frontend Pod

↓

Backend Service

↓

Backend Pod

↓

MySQL Service

↓

Database

---

# Production Checks

Verify all Pods are Running.

Verify Services have Endpoints.

Verify PVC is Bound.

Verify Ingress is Ready.

Verify application works.

---

# Common Problems

ImagePullBackOff

CrashLoopBackOff

PVC Pending

Ingress Not Working

503 Errors

Database Connection Failed

---

# Troubleshooting

Check Pods

kubectl get pods -n production-app

---

Describe Pod

kubectl describe pod POD_NAME -n production-app

---

Logs

kubectl logs POD_NAME -n production-app

---

Services

kubectl get svc -n production-app

---

Endpoints

kubectl get endpoints -n production-app

---

Ingress

kubectl describe ingress -n production-app

---

PVC

kubectl get pvc -n production-app

---

Interview Questions

Q1

Why is Backend exposed using ClusterIP instead of LoadBalancer?

Answer

Because Backend should only be accessible from inside the cluster.

---

Q2

Why does MySQL use a PersistentVolumeClaim?

Answer

To preserve database data even if the Pod is recreated.

---

Q3

Why is Ingress placed only in front of the Frontend?

Answer

External users should only access the Frontend. Backend and Database remain internal for security.

---

Q4

What happens if one Frontend Pod crashes?

Answer

The Deployment creates a replacement Pod, and the Service continues routing traffic to healthy Pods.

---

Q5

How would you troubleshoot a 503 error from Ingress?

Answer

1. Check Ingress.

2. Check Service.

3. Verify Endpoints.

4. Check Pod Readiness.

5. Review Application Logs.

---

Production Checklist

✔ Namespace

✔ Deployments

✔ Services

✔ PVC

✔ Secrets

✔ ConfigMaps

✔ Ingress

✔ Endpoints

✔ Pods

✔ Logs

---

Assignment

Draw the request flow from:

Browser

↓

Ingress

↓

Frontend

↓

Backend

↓

Database

and explain where each Kubernetes resource participates in the flow.

