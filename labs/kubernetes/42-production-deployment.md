# Lab 42 - Production Deployment of Enterprise DevOps Platform

# 1. Objective

The objective of this lab is to deploy the complete Enterprise DevOps Platform on Kubernetes using production-ready manifests.

By the end of this lab you will be able to

- Deploy all microservices
- Configure ConfigMaps
- Configure Secrets
- Deploy Services
- Verify inter-service communication
- Validate application health
- Perform production deployment verification
- Follow enterprise deployment workflow

This lab combines everything learned in the previous Kubernetes labs into a single production deployment.

---

# 2. Prerequisites

Complete

- Lab 01 - Lab 41

Verify

```bash
kubectl get nodes

kubectl get pods -A

kubectl cluster-info
```

Cluster should be healthy.

---

# 3. Enterprise Usage

Typical production deployment

```
GitHub

↓

CI Pipeline

↓

Container Registry

↓

Kubernetes Deployment

↓

Services

↓

Ingress

↓

Production Traffic
```

---

# 4. Usage in THIS Project

Application Architecture

```
React Frontend

↓

API Gateway

↓

Authentication Service

↓

Dashboard Service
```

Each service runs independently with its own Deployment and Service.

---

# 5. Architecture

```
Ingress

↓

Frontend Service

↓

Frontend Pod

↓

API Gateway Service

↓

API Gateway Pod

↓

Auth Service

↓

Dashboard Service
```

---

# 6. Step-by-Step Implementation

## Step 1

Create Namespace

```bash
kubectl create namespace enterprise-devops
```

Verify

```bash
kubectl get namespaces
```

---

## Step 2

Create ConfigMap

```bash
kubectl create configmap app-config \
--from-literal=ENV=production \
-n enterprise-devops
```

Verify

```bash
kubectl get configmap -n enterprise-devops
```

---

## Step 3

Create Secret

```bash
kubectl create secret generic app-secret \
--from-literal=JWT_SECRET=enterprise-secret \
-n enterprise-devops
```

Verify

```bash
kubectl get secret -n enterprise-devops
```

---

## Step 4

Deploy Frontend

```bash
kubectl create deployment frontend \
--image=nginx:stable \
-n enterprise-devops
```

Expose

```bash
kubectl expose deployment frontend \
--port=80 \
--type=ClusterIP \
-n enterprise-devops
```

---

## Step 5

Deploy API Gateway

```bash
kubectl create deployment api-gateway \
--image=nginx:stable \
-n enterprise-devops
```

Expose

```bash
kubectl expose deployment api-gateway \
--port=80 \
--type=ClusterIP \
-n enterprise-devops
```

---

## Step 6

Deploy Authentication Service

```bash
kubectl create deployment auth-service \
--image=nginx:stable \
-n enterprise-devops
```

Expose

```bash
kubectl expose deployment auth-service \
--port=80 \
--type=ClusterIP \
-n enterprise-devops
```

---

## Step 7

Deploy Dashboard Service

```bash
kubectl create deployment dashboard-service \
--image=nginx:stable \
-n enterprise-devops
```

Expose

```bash
kubectl expose deployment dashboard-service \
--port=80 \
--type=ClusterIP \
-n enterprise-devops
```

---

## Step 8

Verify Deployments

```bash
kubectl get deployments -n enterprise-devops

kubectl get pods -n enterprise-devops

kubectl get svc -n enterprise-devops
```

Expected

```
All Pods Running

All Services Created
```

---

## Step 9

Verify DNS

Launch test Pod

```bash
kubectl run test-client \
--image=busybox \
-it --rm \
-n enterprise-devops \
--restart=Never -- sh
```

Inside container

```bash
wget -qO- http://frontend

wget -qO- http://api-gateway

wget -qO- http://auth-service

wget -qO- http://dashboard-service
```

All services should resolve successfully.

---

## Step 10

Final Validation

```bash
kubectl get all -n enterprise-devops

kubectl get endpoints -n enterprise-devops

kubectl get configmap -n enterprise-devops

kubectl get secret -n enterprise-devops
```

---

# 7. Verification

```bash
kubectl get all -n enterprise-devops

kubectl get endpoints -n enterprise-devops

kubectl get configmap -n enterprise-devops

kubectl get secret -n enterprise-devops
```

Expected

- All Deployments Available
- All Pods Running
- All Services Healthy
- ConfigMap Present
- Secret Present

---

# 8. Failure Simulation

## Scenario 1

Delete API Gateway Pod

```bash
kubectl delete pod <api-gateway-pod> \
-n enterprise-devops
```

Expected

Deployment recreates Pod automatically.

---

## Scenario 2

Delete Service

```bash
kubectl delete svc api-gateway \
-n enterprise-devops
```

Expected

Frontend cannot reach API Gateway.

---

## Scenario 3

Delete ConfigMap

```bash
kubectl delete configmap app-config \
-n enterprise-devops
```

Expected

Future Pods depending on ConfigMap fail to start.

---

## Scenario 4

Delete Secret

```bash
kubectl delete secret app-secret \
-n enterprise-devops
```

Expected

Applications depending on Secret fail during startup.

---

# 9. Troubleshooting

Deployments

```bash
kubectl get deployments -n enterprise-devops

kubectl describe deployment frontend \
-n enterprise-devops
```

Pods

```bash
kubectl get pods -n enterprise-devops

kubectl logs <pod> \
-n enterprise-devops
```

Services

```bash
kubectl get svc -n enterprise-devops

kubectl get endpoints -n enterprise-devops
```

Configuration

```bash
kubectl get configmap -n enterprise-devops

kubectl get secret -n enterprise-devops
```

---

# 10. Production Deployment Workflow

```
Git Commit

↓

CI Pipeline

↓

Container Images

↓

Deployment

↓

Pods

↓

Readiness

↓

Services

↓

Ingress

↓

Production Traffic
```

---

# 11. Production Best Practices

- Use dedicated namespaces.
- Configure Requests and Limits.
- Configure Liveness and Readiness Probes.
- Store configuration in ConfigMaps.
- Store sensitive data in Secrets.
- Use rolling updates.
- Validate deployment before exposing traffic.
- Monitor deployment after release.

---

# 12. Real Production Scenario

A financial application deployment introduced a configuration change.

Deployment completed successfully, but Pods never became Ready.

Investigation showed

- Images were correct.
- Services were healthy.
- Readiness Probe passed.

The ConfigMap contained an incorrect backend URL.

After updating the ConfigMap and restarting the Deployment, all services became healthy.

Root Cause

Configuration error.

---

# 13. Scenario Interview Questions

## Q1. What should be validated after every production deployment?

### Answer

Validate

- Pods
- Deployments
- Services
- Endpoints
- Logs
- Readiness
- Business functionality

Commands

```bash
kubectl get all

kubectl get endpoints

kubectl logs
```

---

## Q2. Why are ConfigMaps and Secrets separated?

### Answer

ConfigMaps store non-sensitive configuration.

Secrets store sensitive information such as

- Passwords
- Tokens
- Certificates
- API Keys

This separation improves security and operational management.

---

## Q3. Why are Services required?

### Answer

Services provide stable networking for Pods.

Even if Pods are recreated, the Service IP and DNS name remain constant.

---

## Q4. What should be checked if deployment succeeds but users still report issues?

### Answer

Investigate

- Readiness Probes
- Service Endpoints
- DNS
- Ingress
- Application Logs
- ConfigMaps
- Secrets

---

## Q5. Why should deployments be verified after rollout?

### Answer

A successful rollout only confirms Kubernetes completed the deployment.

It does not guarantee the application is functioning correctly from a business perspective.

---

# 14. Architecture Interview Questions

## Q1. Explain the enterprise deployment architecture.

### Answer

```
GitHub

↓

CI

↓

Registry

↓

Deployment

↓

ReplicaSet

↓

Pods

↓

Service

↓

Ingress

↓

Users
```

This provides automated, repeatable and highly available deployments.

---

## Q2. Why use Deployments instead of Pods?

### Answer

Deployments provide

- Self-healing
- Rolling updates
- Rollbacks
- Replica management
- Declarative state

Standalone Pods lack these enterprise capabilities.

---

## Q3. How do Services enable microservice communication?

### Answer

Services provide stable DNS names and virtual IP addresses.

Applications communicate with Services instead of directly communicating with changing Pod IP addresses.

---

## Q4. Why is namespace isolation important?

### Answer

Namespaces provide

- Resource isolation
- Security boundaries
- RBAC separation
- Environment segregation
- Operational simplicity

---

# 15. Production Support Interview Questions

## Q1. Deployment completed but application is unavailable. How will you investigate?

### Answer

Commands

```bash
kubectl get pods

kubectl describe pod

kubectl logs

kubectl get svc

kubectl get endpoints
```

Investigate

- Readiness
- Service endpoints
- DNS
- ConfigMaps
- Secrets
- Ingress

---

## Q2. Users receive 503 errors after deployment. What will you check?

### Answer

Verify

- Readiness Probe
- Service Endpoints
- Ingress
- Application Logs
- Deployment rollout
- Network connectivity

---

## Q3. Pods restart continuously after deployment. What will you investigate?

### Answer

Possible causes

- Missing Secret
- Missing ConfigMap
- OOMKilled
- Liveness Probe
- Application crash

Commands

```bash
kubectl logs --previous

kubectl describe pod

kubectl get events
```

---

## Q4. Describe your production deployment checklist.

### Answer

```
Deployment

↓

Pods Running

↓

Readiness

↓

Services

↓

Endpoints

↓

DNS

↓

Business Validation

↓

Monitoring

↓

Release Complete
```

Deployment is complete only after business validation.

---

# 16. Cleanup

```bash
kubectl delete namespace enterprise-devops
```

---

# 17. Important Commands

```bash
kubectl get all -n enterprise-devops

kubectl get endpoints -n enterprise-devops

kubectl logs <pod> -n enterprise-devops

kubectl describe deployment frontend -n enterprise-devops

kubectl rollout status deployment frontend -n enterprise-devops

kubectl delete namespace enterprise-devops
```

---

# 18. Marathi Quick Revision

- Namespace वापरा.
- ConfigMaps आणि Secrets वेगळे ठेवा.
- Services शिवाय microservices communicate करू शकत नाहीत.
- Deployment नंतर business validation आवश्यक आहे.
- Readiness तपासल्याशिवाय deployment complete समजू नका.

---

# 19. Enterprise Learning Outcome

After completing this lab you should be able to

- Deploy a complete enterprise application
- Validate production deployments
- Troubleshoot deployment failures
- Verify service communication
- Follow enterprise deployment workflow
- Perform post-deployment validation

---

# 20. Next Lab

```
43-end-to-end-enterprise-lab.md
```

In the final Kubernetes lab we will combine everything learned throughout the Kubernetes journey into a complete end-to-end enterprise deployment, troubleshooting, scaling, maintenance and recovery exercise that closely mirrors real production operations.

---

# 21. Marathi Summary (5+ Experience Revision)

## Interview Summary

Production deployment म्हणजे फक्त Pods तयार करणे नाही. योग्य Namespace, Deployments, Services, ConfigMaps, Secrets, Readiness Probes, Endpoints आणि Business Validation या सर्व गोष्टी पूर्ण झाल्यावरच deployment यशस्वी मानला जातो. Enterprise मध्ये deployment verification हा deployment इतकाच महत्त्वाचा असतो.

### Production Investigation Flow

```
Deployment

↓

Pods

↓

Readiness

↓

Services

↓

Endpoints

↓

DNS

↓

Business Validation

↓

Monitoring

↓

Release Complete
```

### Production Story

एका production release मध्ये सर्व Pods Running आणि Ready होत्या, पण ग्राहकांना login करता येत नव्हते. Infrastructure पूर्णपणे healthy होती. Investigation मध्ये API Gateway ConfigMap मध्ये चुकीचा Authentication Service URL configure झाल्याचे आढळले. ConfigMap update करून rollout restart केल्यानंतर login सेवा पुन्हा सुरू झाली. या incident नंतर deployment checklist मध्ये end-to-end business validation अनिवार्य करण्यात आली.

### 5+ Years Memory Trick

Interview मध्ये जर विचारले,

**"How do you validate a production Kubernetes deployment?"**

उत्तर:

"I validate infrastructure first by checking Deployments, Pods, Services, Endpoints and Readiness. Then I verify application logs, configuration, Secrets, DNS and finally perform business-level validation such as login, API calls and user workflows. A deployment is considered successful only after both infrastructure and business validation are complete."

