# Lab 43 - End-to-End Enterprise Kubernetes Production Lab

# 1. Objective

The objective of this final Kubernetes lab is to simulate a complete enterprise production environment where a DevOps Engineer performs deployment, validation, troubleshooting, scaling, maintenance, recovery and production verification.

This lab combines everything learned throughout the Kubernetes learning journey.

By the end of this lab you will be able to

- Deploy a complete enterprise application
- Validate application health
- Perform rolling updates
- Scale workloads
- Debug production failures
- Perform node maintenance
- Recover from failures
- Verify application functionality
- Follow an enterprise deployment checklist
- Handle a complete production incident

---

# 2. Prerequisites

Complete

- Lab 01 - Lab 42

Cluster must be healthy.

Verify

```bash
kubectl cluster-info

kubectl get nodes

kubectl get pods -A
```

---

# 3. Enterprise Scenario

Today is the production deployment day.

Application

```
Enterprise DevOps Platform
```

Components

```
Frontend

↓

API Gateway

↓

Authentication Service

↓

Dashboard Service
```

Production requirements

- Zero downtime
- Rolling deployment
- Health verification
- Monitoring
- Incident readiness
- Rollback capability

---

# 4. Enterprise Architecture

```
GitHub

↓

CI Pipeline

↓

Container Registry

↓

Kubernetes

↓

Namespace

↓

Deployments

↓

ReplicaSets

↓

Pods

↓

Services

↓

Ingress

↓

Users
```

---

# 5. Lab Workflow

```
Namespace

↓

Configuration

↓

Deploy Applications

↓

Verify

↓

Scale

↓

Upgrade

↓

Failure

↓

Troubleshoot

↓

Recovery

↓

Node Maintenance

↓

Final Validation
```

---

# 6. Step-by-Step Implementation

## Step 1

Create Namespace

```bash
kubectl create namespace enterprise
```

Verify

```bash
kubectl get ns
```

---

## Step 2

Create ConfigMap

```bash
kubectl create configmap enterprise-config \
--from-literal=ENV=production \
-n enterprise
```

---

## Step 3

Create Secret

```bash
kubectl create secret generic enterprise-secret \
--from-literal=JWT_SECRET=my-secret \
-n enterprise
```

---

## Step 4

Deploy Frontend

```bash
kubectl create deployment frontend \
--image=nginx:stable \
-n enterprise
```

Scale

```bash
kubectl scale deployment frontend \
--replicas=3 \
-n enterprise
```

Expose

```bash
kubectl expose deployment frontend \
--port=80 \
--type=ClusterIP \
-n enterprise
```

---

## Step 5

Deploy API Gateway

```bash
kubectl create deployment api-gateway \
--image=nginx:stable \
-n enterprise
```

Scale

```bash
kubectl scale deployment api-gateway \
--replicas=3 \
-n enterprise
```

Expose

```bash
kubectl expose deployment api-gateway \
--port=80 \
--type=ClusterIP \
-n enterprise
```

---

## Step 6

Deploy Authentication Service

```bash
kubectl create deployment auth-service \
--image=nginx:stable \
-n enterprise
```

Scale

```bash
kubectl scale deployment auth-service \
--replicas=2 \
-n enterprise
```

Expose

```bash
kubectl expose deployment auth-service \
--port=80 \
--type=ClusterIP \
-n enterprise
```

---

## Step 7

Deploy Dashboard Service

```bash
kubectl create deployment dashboard-service \
--image=nginx:stable \
-n enterprise
```

Scale

```bash
kubectl scale deployment dashboard-service \
--replicas=2 \
-n enterprise
```

Expose

```bash
kubectl expose deployment dashboard-service \
--port=80 \
--type=ClusterIP \
-n enterprise
```

---

## Step 8

Validate Deployment

```bash
kubectl get all -n enterprise
```

Expected

- All Pods Running
- All Deployments Available
- All Services Created

---

## Step 9

Perform Rolling Update

```bash
kubectl set image deployment/frontend \
frontend=nginx:1.27 \
-n enterprise
```

Verify

```bash
kubectl rollout status deployment/frontend \
-n enterprise
```

---

## Step 10

Scale API Gateway

```bash
kubectl scale deployment api-gateway \
--replicas=5 \
-n enterprise
```

Verify

```bash
kubectl get pods -n enterprise
```

---

## Step 11

Simulate Failure

Delete one Pod

```bash
kubectl delete pod \
-l app=frontend \
-n enterprise
```

Expected

Deployment recreates the Pod automatically.

---

## Step 12

Debug Application

Commands

```bash
kubectl describe pod <pod>

kubectl logs <pod>

kubectl get events \
-n enterprise
```

---

## Step 13

Node Maintenance

Choose one worker node

```bash
kubectl cordon <worker-node>

kubectl drain <worker-node> \
--ignore-daemonsets \
--delete-emptydir-data

kubectl uncordon <worker-node>
```

Verify Pods are rescheduled.

---

## Step 14

Application Validation

Run

```bash
kubectl get deployments \
-n enterprise

kubectl get svc \
-n enterprise

kubectl get endpoints \
-n enterprise
```

---

## Step 15

Final Cluster Validation

```bash
kubectl cluster-info

kubectl get nodes

kubectl get pods -A

kubectl get events -A
```

---

# 7. Verification Checklist

Infrastructure

```bash
kubectl get nodes
```

Applications

```bash
kubectl get deployments \
-n enterprise
```

Pods

```bash
kubectl get pods \
-n enterprise
```

Services

```bash
kubectl get svc \
-n enterprise
```

Endpoints

```bash
kubectl get endpoints \
-n enterprise
```

Expected

- Nodes Ready
- Deployments Available
- Pods Running
- Services Healthy
- Endpoints Populated

---

# 8. Failure Simulation

## Scenario 1

Wrong Image

Expected

```
ImagePullBackOff
```

Investigate

```bash
kubectl describe pod
```

---

## Scenario 2

CrashLoopBackOff

Investigate

```bash
kubectl logs

kubectl logs --previous
```

---

## Scenario 3

Node Failure

Investigate

```bash
kubectl get nodes

kubectl describe node
```

Verify automatic rescheduling.

---

## Scenario 4

Missing Secret

Expected

Application startup failure.

Investigate

```bash
kubectl get secret
```

---

## Scenario 5

Missing ConfigMap

Expected

Configuration failure.

Investigate

```bash
kubectl get configmap
```

---

# 9. Enterprise Troubleshooting Workflow

```
Alert

↓

Cluster Health

↓

Nodes

↓

Deployments

↓

Pods

↓

Logs

↓

Events

↓

Services

↓

Endpoints

↓

Configuration

↓

Root Cause

↓

Recovery

↓

Monitoring

↓

RCA
```

---

# 10. Production Deployment Checklist

Before Deployment

- Images verified
- Secrets verified
- ConfigMaps verified
- Resources verified

During Deployment

- Rollout monitored
- Pods becoming Ready
- Logs monitored

After Deployment

- Services validated
- Endpoints validated
- Business validation completed
- Monitoring green
- No critical alerts

---

# 11. Production Best Practices

- Always use rolling updates.
- Never deploy directly to production without validation.
- Keep multiple replicas.
- Configure health probes.
- Use Requests and Limits.
- Store configuration outside images.
- Test rollback procedures.
- Document every production deployment.

---

# 12. Real Production Scenario

A global e-commerce company scheduled a weekend Kubernetes production release.

Deployment completed successfully.

Monitoring detected increased HTTP 503 errors.

Investigation

```
Pods Healthy

↓

Services Healthy

↓

Endpoints Healthy

↓

Ingress Healthy

↓

Application Logs

↓

Configuration Error
```

The API Gateway ConfigMap referenced an old authentication endpoint.

The ConfigMap was corrected and a rollout restart performed.

Production recovered within ten minutes.

Root Cause

Incorrect deployment configuration.

Lesson

Infrastructure health alone does not guarantee business functionality.

---

# 13. Scenario Interview Questions

## Q1. Explain your complete production deployment workflow.

### Answer

Workflow

```
Code Freeze

↓

CI Pipeline

↓

Container Build

↓

Image Scan

↓

Deployment

↓

Rollout Monitoring

↓

Infrastructure Validation

↓

Business Validation

↓

Monitoring

↓

Release Completion
```

Commands

```bash
kubectl rollout status

kubectl get pods

kubectl get svc

kubectl get endpoints
```

---

## Q2. A deployment succeeds but customers cannot log in. What will you investigate?

### Answer

Investigation order

- Pod health
- Logs
- Services
- Endpoints
- ConfigMaps
- Secrets
- Authentication Service
- Business transactions

Commands

```bash
kubectl logs

kubectl describe pod

kubectl get endpoints
```

Infrastructure success does not always mean business success.

---

## Q3. What are the final production validation steps?

### Answer

Validate

- Nodes
- Deployments
- Pods
- Services
- DNS
- Monitoring
- Application functionality
- Business transactions

Only after successful business validation is the deployment considered complete.

---

## Q4. What should be documented after every production deployment?

### Answer

- Deployment version
- Deployment time
- Engineer
- Validation evidence
- Issues encountered
- Resolution
- Rollback details (if any)
- Lessons learned

---

# 14. Architecture Interview Questions

## Q1. Explain the complete Kubernetes production architecture.

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

Services

↓

Ingress

↓

Users
```

This architecture provides scalability, high availability and repeatable deployments.

---

## Q2. Why are Deployments the preferred controller?

### Answer

Deployments provide

- Self-healing
- Rolling updates
- Rollbacks
- Scaling
- Replica management
- Declarative configuration

---

## Q3. How do Kubernetes components work together?

### Answer

- API Server receives requests.
- etcd stores desired state.
- Scheduler assigns Pods.
- Controller Manager maintains desired state.
- Kubelet runs containers.
- Services provide networking.
- CoreDNS enables service discovery.

---

## Q4. What makes this architecture production ready?

### Answer

- Multiple replicas
- Rolling updates
- Self-healing
- Health probes
- Stable networking
- Namespace isolation
- Secret management
- Operational monitoring

---

# 15. Production Support Interview Questions

## Q1. A P1 incident is declared immediately after deployment. What is your approach?

### Answer

Workflow

```
Declare Incident

↓

Assess Business Impact

↓

Verify Cluster

↓

Verify Nodes

↓

Verify Pods

↓

Check Logs

↓

Check Events

↓

Validate Services

↓

Restore Service

↓

Communicate Status

↓

Complete RCA
```

Commands

```bash
kubectl get nodes

kubectl get pods -A

kubectl get events -A

kubectl logs
```

---

## Q2. How do you determine whether the issue is application or infrastructure related?

### Answer

Infrastructure indicators

- Node failures
- DNS failures
- API Server issues
- Multiple applications affected

Application indicators

- Single Deployment affected
- Application exceptions
- Configuration errors

Investigate infrastructure first when multiple services fail simultaneously.

---

## Q3. During production support, which evidence do you collect before making changes?

### Answer

Collect

- Pod descriptions
- Logs
- Previous logs
- Events
- Deployment YAML
- Resource usage
- Node status
- Timeline of changes

Evidence-driven troubleshooting reduces recovery time and avoids unnecessary changes.

---

## Q4. Describe your end-to-end enterprise operational workflow.

### Answer

```
Deployment

↓

Validation

↓

Monitoring

↓

Alert

↓

Investigation

↓

Recovery

↓

Business Validation

↓

Incident Closure

↓

RCA

↓

Runbook Improvement
```

This lifecycle reflects how mature DevOps and SRE teams manage production environments.

---

# 16. Cleanup

```bash
kubectl delete namespace enterprise
```

---

# 17. Important Commands

```bash
kubectl get all -A

kubectl cluster-info

kubectl get nodes

kubectl describe pod <pod>

kubectl logs <pod>

kubectl get events -A

kubectl rollout status deployment/<deployment>

kubectl cordon <node>

kubectl drain <node> \
--ignore-daemonsets \
--delete-emptydir-data

kubectl uncordon <node>
```

---

# 18. Marathi Quick Revision

- पूर्ण application deploy करा.
- Deployment verify करा.
- Scaling करा.
- Rolling update करा.
- Pod delete करून self-healing verify करा.
- Node maintenance करा.
- Business validation करा.
- RCA तयार करा.

---

# 19. Enterprise Learning Outcome

After completing this lab you should be able to

- Deploy enterprise Kubernetes applications
- Perform production verification
- Handle production incidents
- Debug infrastructure and applications
- Perform node maintenance
- Execute disaster recovery
- Follow enterprise operational workflows
- Explain Kubernetes production architecture confidently in interviews

---

# 20. Kubernetes Learning Completion

Congratulations!

You have completed the Kubernetes learning path covering

- Kubernetes Fundamentals
- Architecture
- Workloads
- Networking
- Storage
- Security
- Scheduling
- Observability
- Production Best Practices
- Troubleshooting
- Disaster Recovery
- Enterprise Deployments
- End-to-End Production Operations

Next phase of the Enterprise DevOps Platform roadmap

```
Helm

↓

Argo CD

↓

GitOps

↓

Terraform

↓

Monitoring

↓

AWS Production Deployment
```

---

# 21. Marathi Summary (5+ Experience Revision)

## Interview Summary

हा End-to-End Lab म्हणजे एका अनुभवी DevOps Engineer च्या दैनंदिन production workflow चे simulation आहे. यात deployment, scaling, rolling updates, troubleshooting, node maintenance, disaster recovery आणि business validation या सर्व गोष्टी एका सलग workflow मध्ये येतात. Enterprise मध्ये deployment पूर्ण झाल्यावर infrastructure health पुरेशी नसते; business functionality verify झाल्यावरच release यशस्वी मानली जाते.

### Production Investigation Flow

```
Deployment

↓

Infrastructure Validation

↓

Business Validation

↓

Monitoring

↓

Alert

↓

Investigation

↓

Recovery

↓

RCA

↓

Continuous Improvement
```

### Production Story

एका multinational fintech कंपनीमध्ये नवीन Kubernetes release deploy केल्यानंतर सर्व Pods Ready होत्या आणि monitoring मध्ये कोणतीही infrastructure alert नव्हती. तरीही ग्राहकांना payments करता येत नव्हते. War room मध्ये SRE, DevOps आणि Application टीमने मिळून investigation केली. API Gateway ConfigMap मधील चुकीचा backend endpoint हा root cause असल्याचे आढळले. ConfigMap update करून controlled rollout restart करण्यात आला आणि business transactions पुन्हा सुरू झाल्या. Incident review नंतर deployment process मध्ये mandatory business validation, rollback readiness आणि production sign-off जोडण्यात आले.

### 5+ Years Memory Trick

Interview मध्ये जर विचारले,

**"Explain how you manage an end-to-end Kubernetes production deployment."**

उत्तर:

"I follow a structured enterprise workflow: validate prerequisites, deploy using rolling updates, monitor rollout status, verify Pods, Services, Endpoints and infrastructure health, perform business validation, monitor production after release, investigate any alerts using evidence-driven troubleshooting, recover services if required, complete RCA and update operational runbooks for continuous improvement."

