# Kubernetes API Server

# 1. Purpose

The Kubernetes API Server is the central management component of the Kubernetes Control Plane.

Every request made to the Kubernetes Cluster passes through the API Server.

The API Server acts as the front door of Kubernetes.

Its responsibilities include

- Authentication
- Authorization
- Admission Control
- Request Validation
- Communication with etcd
- Communication with Control Plane Components

Without the API Server, Kubernetes cannot function.

---

# 2. Introduction

Imagine a Developer executes

```bash
kubectl apply -f deployment.yaml
```

What happens?

```
Developer

↓

kubectl

↓

API Server

↓

Authentication

↓

Authorization

↓

Admission Controllers

↓

etcd

↓

Scheduler

↓

Worker Nodes
```

Every Kubernetes operation starts with the API Server.

---

# 3. Enterprise Usage

The Kubernetes API Server is used by

- Developers
- DevOps Engineers
- Platform Teams
- Argo CD
- Helm
- Operators
- CI/CD Pipelines
- Monitoring Tools

Every Production Kubernetes request reaches the API Server.

---

# 4. Usage in THIS Project

Enterprise DevOps Platform

```
GitHub Actions

↓

kubectl

↓

API Server

↓

Deployment

------------------------

Argo CD

↓

API Server

↓

GitOps Deployment

------------------------

Monitoring

↓

API Server

↓

Read Metrics
```

The API Server will be the communication hub for all Kubernetes operations.

---

# 5. Architecture

```
             kubectl

                │

                ▼

         Kubernetes API Server

        ┌────────┼─────────┐

        ▼        ▼         ▼

 Authentication RBAC Admission

                │

                ▼

              etcd

        ┌────────┼─────────┐

        ▼        ▼         ▼

 Scheduler Controller Kubelet
```

---

# 6. Internal Workflow

```
kubectl apply

↓

API Server

↓

Authentication

↓

Authorization

↓

Admission Controllers

↓

Validation

↓

Store Object in etcd

↓

Notify Scheduler

↓

Notify Controllers

↓

Pod Created
```

---

# 7. Responsibilities of API Server

The API Server performs the following tasks.

## Authentication

Verifies

```
Who is making the request?
```

Examples

- Certificate
- Token
- Service Account
- OIDC

---

## Authorization

Determines

```
Is this request allowed?
```

Uses

- RBAC
- ABAC
- Webhooks

---

## Admission Control

Validates or modifies requests before storing them.

Examples

- Resource Limits
- Security Policies
- Namespace Policies

---

## Validation

Checks

- YAML Syntax
- Object Structure
- Required Fields

---

## Store Objects

Stores the final object in

```
etcd
```

---

## Notify Other Components

After storing the object,

API Server informs

- Scheduler
- Controller Manager
- Kubelet

---

# 8. API Server Communication

API Server communicates with

```
kubectl

↓

etcd

↓

Scheduler

↓

Controller Manager

↓

Kubelets

↓

Controllers

↓

Operators

↓

Argo CD
```

Everything communicates through the API Server.

---

# 9. Why API Server?

Without API Server

```
kubectl

↓

No Communication

↓

Cluster Stops
```

With API Server

```
Every Request

↓

Validated

↓

Stored

↓

Processed

↓

Cluster Works
```

---

# 10. Daily DevOps Activities

- Verify API Server Health
- Check API Server Logs
- Troubleshoot Authentication Issues
- Review Authorization Failures
- Monitor API Latency
- Verify Control Plane Health

---

# 11. Production Best Practices

- Deploy Multiple API Server instances.
- Protect API Server with TLS.
- Enable Audit Logs.
- Monitor API Latency.
- Restrict Public Access.
- Secure Certificates.

---

# 12. Security

- TLS Encryption
- RBAC Authorization
- Audit Logging
- Certificate Rotation
- Secure API Endpoints
- Authentication Enforcement

---

# 13. Troubleshooting

Check Cluster

```bash
kubectl cluster-info
```

View Component Status

```bash
kubectl get componentstatuses
```

Check API Health

```bash
kubectl get --raw='/healthz'
```

View API Resources

```bash
kubectl api-resources
```

View API Versions

```bash
kubectl api-versions
```

---

# 14. Real Production Scenarios

## Scenario 1

### API Server Down

Symptoms

```
kubectl

↓

Connection Refused
```

Business Impact

No deployments.

No scaling.

No updates.

Investigation

```
API Server Logs

↓

Control Plane

↓

Certificates
```

Resolution

Restarted API Server.

---

## Scenario 2

### Authentication Failure

Developer received

```
Unauthorized
```

Root Cause

Expired Certificate.

Resolution

Renewed Client Certificate.

---

## Scenario 3

### High API Latency

Symptoms

```
kubectl apply

↓

Very Slow
```

Root Cause

API Server overloaded.

Resolution

Scaled Control Plane.

---

# 15. Scenario Interview Questions

Q1. What is Kubernetes API Server?

Answer

The Kubernetes API Server is the central communication component of the Kubernetes Control Plane.

---

Q2. Does kubectl communicate directly with Worker Nodes?

Answer

No.

kubectl always communicates with the API Server.

---

Q3. Where are Kubernetes objects stored?

Answer

All Kubernetes objects are stored in etcd through the API Server.

---

Q4. Which component performs Authentication and Authorization?

Answer

The API Server.

---

# 16. Architecture Interview Questions

Explain API Server Workflow.

```
kubectl

↓

API Server

↓

Authentication

↓

Authorization

↓

Admission

↓

etcd

↓

Scheduler

↓

Worker Nodes
```

---

Q2.

Why is the API Server called the Front Door of Kubernetes?

Answer

Because every request entering the cluster must pass through it.

---

# 17. Production Support Interview Questions

Production Investigation Flow

```
kubectl Failed

↓

API Server

↓

Authentication

↓

Authorization

↓

Admission

↓

Logs

↓

Resolved
```

Manager Question

"Our deployment pipeline suddenly cannot deploy to Kubernetes."

Expected Answer

- Verify API Server Health
- Check Authentication
- Verify Certificates
- Check API Server Logs
- Validate RBAC
- Verify Control Plane

---

# 18. Related Runbooks

- api-server-down.md
- authentication-failure.md
- control-plane-health.md

---

# 19. Common Incidents

- API Server Down
- Authentication Failure
- Authorization Failure
- Certificate Expired
- High API Latency

---

# 20. Commands

```bash
kubectl cluster-info

kubectl get componentstatuses

kubectl get --raw='/healthz'

kubectl api-resources

kubectl api-versions

kubectl version
```

---

# 21. YAML Deep Dive

Example Deployment Request

```yaml
apiVersion: apps/v1
kind: Deployment

metadata:
  name: api-gateway

spec:
  replicas: 3
```

API Server Processing

```
Step 1

Authentication

↓

Step 2

Authorization

↓

Step 3

Admission Controllers

↓

Step 4

Validation

↓

Step 5

Store in etcd

↓

Step 6

Notify Scheduler
```

The API Server does not run Pods itself.

It validates and stores the desired state, then other Control Plane components act on that state.

---

# 22. Marathi Quick Revision

- API Server म्हणजे Kubernetes चे Front Door.
- प्रत्येक Request API Server मधून जाते.
- Authentication, Authorization आणि Admission Controller इथेच चालतात.
- API Server etcd मध्ये Data Store करतो.
- Scheduler आणि Controller Manager ला API Server माहिती देतो.

---

# 23. Marathi Summary (5+ Years Experience Revision)

## Interview Summary

Kubernetes API Server हा Control Plane चा सर्वात महत्त्वाचा Component आहे.

kubectl, Argo CD, Helm, Controllers, Kubelets आणि इतर सर्व Components API Server मार्फतच Cluster शी संवाद साधतात.

API Server Authentication, Authorization, Admission Validation आणि Object Validation पूर्ण करून डेटा etcd मध्ये Store करतो.

## Production Investigation Flow

```
kubectl Failed

↓

API Server Health

↓

Authentication

↓

RBAC

↓

Admission

↓

etcd

↓

Control Plane

↓

Resolved
```

## Production Story

एका Production EKS Cluster मध्ये GitHub Actions Pipeline अचानक Fail झाली.

`kubectl apply` करताना `Unable to connect to the server` Error येत होती.

Investigation मध्ये API Server Certificate Expire झाल्याचे आढळले.

Certificate Renew करून API Server Restart करण्यात आला.

Pipeline पुन्हा यशस्वीपणे Deploy करू लागली.

## Memory Trick

**API Server = Front Door**

Remember

**kubectl**

↓

**API Server**

↓

**Authentication**

↓

**Authorization**

↓

**Admission**

↓

**etcd**

↓

**Scheduler**

↓

**Pods**

