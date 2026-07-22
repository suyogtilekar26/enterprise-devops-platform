# Kubernetes Admission Controllers

# 1. Purpose

The purpose of Kubernetes Admission Controllers is to validate and modify requests before Kubernetes creates or updates resources.

Admission Controllers act as gatekeepers of the Kubernetes API Server.

They help enforce

- Security
- Compliance
- Governance
- Best Practices
- Organizational Policies

Without Admission Controllers, Kubernetes would accept almost every valid API request.

---

# 2. Introduction

Imagine a Developer deploys the following Pod.

```
Pod

↓

No Resource Limits

↓

Runs as Root

↓

Latest Image Tag

↓

Production
```

Although the YAML syntax is correct,

it violates enterprise security policies.

Admission Controllers stop such deployments.

---

Without Admission Controllers

```
Developer

↓

kubectl apply

↓

API Server

↓

Pod Created

↓

Production Risk
```

---

With Admission Controllers

```
Developer

↓

kubectl apply

↓

API Server

↓

Admission Controller

↓

Policy Check

↓

Approved?

↓

YES

↓

Create Resource

----------------------

NO

↓

Reject Request
```

---

# 3. Enterprise Usage

Admission Controllers are heavily used in

- AWS EKS
- Azure AKS
- Google GKE
- OpenShift

Enterprise Security Teams use them to enforce

- Image Policies
- Namespace Policies
- Resource Limits
- Security Standards
- Compliance Requirements

---

# 4. Usage in THIS Project

Our Enterprise DevOps Platform will enforce

```
API Gateway

↓

Must Have

CPU Requests

Memory Requests

Health Probes

-------------------------

Auth Service

↓

Must Not Run

As Root

-------------------------

Dashboard Service

↓

Trusted Images Only
```

Admission Controllers ensure every deployment follows organizational standards.

---

# 5. Architecture

```
Developer

↓

kubectl apply

↓

Authentication

↓

Authorization (RBAC)

↓

Admission Controllers

↓

Validation

↓

Mutation

↓

etcd

↓

Pod Created
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

Mutating Admission

↓

Validating Admission

↓

Store in etcd

↓

Scheduler

↓

Pod Running
```

---

# 7. Types of Admission Controllers

There are two major categories.

## Mutating Admission Controller

Can modify the request.

Example

```
Developer

↓

No Label

↓

Automatically Add Label
```

Another Example

```
No Sidecar

↓

Inject Istio Sidecar
```

---

## Validating Admission Controller

Cannot modify.

Can only

```
Allow

or

Reject
```

Example

```
Container Running As Root

↓

Reject Deployment
```

---

# 8. Common Built-in Admission Controllers

Examples

- NamespaceLifecycle
- LimitRanger
- ResourceQuota
- DefaultStorageClass
- ServiceAccount
- PodSecurity
- ValidatingAdmissionPolicy

Enterprise clusters enable many of these by default.

---

# 9. Why Admission Controllers?

Without Governance

```
Developer

↓

Unlimited CPU

↓

Unlimited Memory

↓

Production Cluster Impact
```

With Admission Controllers

```
Deployment

↓

Policy Validation

↓

Approved

↓

Production Safe
```

---

# 10. Daily DevOps Activities

- Review Admission Policies
- Validate Deployments
- Monitor Rejected Requests
- Update Security Policies
- Review Audit Logs
- Test Policy Changes

---

# 11. Production Best Practices

- Enforce Resource Limits.
- Enforce Health Probes.
- Block Privileged Containers.
- Block Latest Image Tags.
- Require Labels and Annotations.
- Test policies before Production rollout.

---

# 12. Security

- Enforce Pod Security Standards.
- Block privileged containers.
- Restrict HostPath volumes.
- Restrict Host Networking.
- Validate trusted container images.
- Enable Audit Logging.

---

# 13. Troubleshooting

View Events

```bash
kubectl get events
```

Describe Pod

```bash
kubectl describe pod <pod-name>
```

Describe Deployment

```bash
kubectl describe deployment <deployment-name>
```

Check API Server Logs

```bash
kubectl logs -n kube-system kube-apiserver
```

Review Validation Errors

```bash
kubectl apply -f deployment.yaml
```

---

# 14. Real Production Scenarios

## Scenario 1

### Missing Resource Limits

Developer deployed

```
100 Pods

↓

No CPU Limits

↓

Cluster CPU Exhausted
```

Admission Controller rejected the deployment.

Problem avoided.

---

## Scenario 2

### Root Container

Security Team discovered

```
runAsRoot

Enabled
```

Admission Controller blocked deployment.

Application team fixed the Security Context.

Deployment succeeded.

---

## Scenario 3

### Latest Image Tag

Developer deployed

```
image: nginx:latest
```

Company policy required immutable image tags.

Admission Controller rejected deployment.

Developer changed image to

```
nginx:1.30.1
```

Deployment approved.

---

# 15. Scenario Interview Questions

Q1. What are Admission Controllers?

Answer

Admission Controllers intercept Kubernetes API requests after Authentication and Authorization and before objects are stored in etcd.

---

Q2. Difference between Mutating and Validating Admission Controllers?

Answer

Mutating Admission Controllers modify requests.

Validating Admission Controllers only approve or reject requests.

---

Q3. Do Admission Controllers run before RBAC?

Answer

No.

Authentication and Authorization occur first.

Admission Controllers execute afterward.

---

Q4. Why are Admission Controllers important?

Answer

They enforce enterprise governance, security and compliance policies.

---

# 16. Architecture Interview Questions

Explain Kubernetes Request Flow.

```
kubectl apply

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

Pod
```

---

Q2.

Can Admission Controllers automatically modify objects?

Answer

Yes.

Mutating Admission Controllers can inject labels, annotations, sidecars and default values.

---

# 17. Production Support Interview Questions

Production Investigation Flow

```
Deployment Failed

↓

kubectl apply Output

↓

Events

↓

Admission Policy

↓

Validation Error

↓

Fix YAML

↓

Redeploy

↓

Resolved
```

Manager Question

"Our deployment is valid YAML but Kubernetes is rejecting it."

Expected Answer

- Review Admission Controller error
- Verify Security Policies
- Check Resource Limits
- Check Image Policy
- Review Audit Logs
- Update Deployment

---

# 18. Related Runbooks

- admission-policy-failure.md
- deployment-validation-failed.md
- pod-security-policy-violation.md

---

# 19. Common Incidents

- Deployment Rejected
- Missing Resource Limits
- Privileged Container Blocked
- Invalid Image Policy
- Missing Required Labels

---

# 20. Commands

```bash
kubectl get events

kubectl describe pod <pod-name>

kubectl describe deployment <deployment-name>

kubectl apply -f deployment.yaml

kubectl logs -n kube-system kube-apiserver
```

---

# 21. YAML Deep Dive

Example

```yaml
apiVersion: admissionregistration.k8s.io/v1
kind: ValidatingWebhookConfiguration

metadata:
  name: validate-deployments
```

Explanation

```
apiVersion
```

Admission Registration API used to register admission webhooks.

```
kind
```

Defines a Validating Admission Webhook.

```
metadata
```

Stores object metadata.

```
name
```

Unique name of the admission configuration.

Enterprise examples

- Validate image registry
- Enforce resource limits
- Require labels
- Block privileged containers

---

# 22. Marathi Quick Revision

- Admission Controller म्हणजे Kubernetes API चा Gatekeeper.
- Authentication आणि RBAC नंतर चालतो.
- Mutating Controller Request बदलू शकतो.
- Validating Controller फक्त Allow किंवा Reject करतो.
- Production मध्ये Security आणि Compliance साठी वापरतात.

---

# 23. Marathi Summary (5+ Years Experience Revision)

## Interview Summary

Admission Controllers Kubernetes API Server मधील Governance Layer आहेत.

Authentication आणि Authorization पूर्ण झाल्यानंतर ते प्रत्येक Request तपासतात.

Mutating Controllers Request मध्ये बदल करू शकतात.

Validating Controllers Request Allow किंवा Reject करतात.

Enterprise Production मध्ये Security Policies, Resource Limits, Image Policies आणि Compliance लागू करण्यासाठी त्यांचा मोठ्या प्रमाणावर वापर होतो.

## Production Investigation Flow

```
Deployment Failed

↓

Events

↓

Admission Controller Error

↓

Policy Check

↓

Fix Deployment

↓

Redeploy

↓

Resolved
```

## Production Story

एका Production EKS Cluster मध्ये Developer ने `nginx:latest` Image वापरून Deployment केले.

Company Policy नुसार Immutable Version Tags आवश्यक होते.

Admission Controller ने Deployment Reject केले.

Developer ने Versioned Image वापरली.

Deployment यशस्वी झाले आणि Production मध्ये Uncontrolled Image Updates टाळल्या गेल्या.

## Memory Trick

**Authentication = Who?**

**RBAC = Allowed?**

**Admission Controller = Policy Check**

Remember

**Login → RBAC → Admission → etcd → Scheduler**

