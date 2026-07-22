# Kubernetes Production Best Practices

# 1. Purpose

The purpose of this document is to understand the production best practices followed by enterprise organizations while designing, deploying, operating, and maintaining Kubernetes clusters.

Knowing Kubernetes concepts is not enough.

A 5+ Years DevOps Engineer is expected to build secure, scalable, highly available, and maintainable production platforms.

This document consolidates the most important Kubernetes production practices used in real-world environments.

---

# 2. Introduction

Production Kubernetes environments are different from learning environments.

Production clusters require

- High Availability
- Scalability
- Security
- Monitoring
- Disaster Recovery
- Compliance
- Automation
- Standardization

Every deployment should follow predefined standards.

---

# 3. Enterprise Usage

Large organizations like

- Google
- Netflix
- Amazon
- Microsoft
- Uber
- Airbnb

follow production standards such as

- GitOps
- Immutable Infrastructure
- Infrastructure as Code
- Automated CI/CD
- Continuous Monitoring
- Least Privilege Access
- Zero Trust Security

---

# 4. Usage in THIS Project

Our Enterprise DevOps Platform will follow

```
GitHub

↓

GitHub Actions

↓

Docker

↓

GHCR

↓

Kubernetes

↓

Helm

↓

Argo CD

↓

Monitoring

↓

AWS
```

Every deployment in this repository will follow production standards from Day 1.

---

# 5. Production Architecture

```
Developer

↓

GitHub

↓

GitHub Actions

↓

Container Registry

↓

Kubernetes Cluster

├── Frontend
├── API Gateway
├── Auth Service
├── Dashboard Service

↓

Monitoring

↓

Alerting

↓

DevOps Team

↓

Business Users
```

---

# 6. Internal Workflow

Developer Commit

↓

Code Review

↓

CI Pipeline

↓

Container Build

↓

Image Scan

↓

Deploy to Kubernetes

↓

Health Verification

↓

Monitoring

↓

Alerts

↓

Business Validation

---

# 7. Daily DevOps Activities

Daily production checks

```bash
kubectl get nodes

kubectl get pods -A

kubectl top nodes

kubectl top pods

kubectl get events -A
```

Verify

- Cluster Health
- Node Health
- Pod Health
- Deployments
- Services
- Ingress
- Alerts
- Monitoring

---

# 8. Production Best Practices

## Cluster

- Use High Availability Control Plane.
- Use multiple Worker Nodes.
- Enable monitoring.
- Enable audit logging.

---

## Namespaces

Separate workloads

```
production

staging

testing

monitoring

ingress

argocd
```

Never deploy everything into the default namespace.

---

## Labels

Use consistent labels.

Example

```yaml
app: auth-service

environment: production

team: platform

version: v1
```

---

## Resource Requests & Limits

Always define

```yaml
resources:
  requests:
    cpu:
    memory:

  limits:
    cpu:
    memory:
```

Never deploy Pods without limits.

---

## Health Probes

Always configure

- Startup Probe
- Readiness Probe
- Liveness Probe

Never expose traffic before readiness succeeds.

---

## Images

- Use trusted images.
- Pin image versions.
- Avoid latest tag.
- Scan images.
- Remove unused packages.

---

## Deployments

Prefer

Rolling Updates

Avoid

Recreate Strategy

unless absolutely necessary.

---

## Secrets

Never hardcode

- Passwords
- Tokens
- Certificates

Use Kubernetes Secrets or External Secret Managers.

---

## Networking

- Use Ingress
- Use Network Policies
- Restrict communication
- Enable TLS

---

## Storage

- Use StorageClass
- Backup Persistent Volumes
- Monitor disk usage

---

## RBAC

Grant minimum permissions.

Never use cluster-admin for applications.

---

## Monitoring

Deploy

- Prometheus
- Grafana
- Loki
- Alertmanager

---

## Logging

Centralize logs.

Never depend on local container logs.

---

## Backup

Regularly backup

- etcd
- PVs
- ConfigMaps
- Secrets

---

## Disaster Recovery

Perform recovery drills regularly.

A backup is useless if restore has never been tested.

---

## GitOps

Deploy only through Git.

Avoid manual production changes.

---

# 9. Security

Production security checklist

- RBAC
- Pod Security Standards
- Image Scanning
- Secret Encryption
- TLS Everywhere
- Network Policies
- Audit Logs
- MFA
- Least Privilege

---

# 10. Troubleshooting

Daily verification

```bash
kubectl get nodes

kubectl get pods

kubectl get events

kubectl describe pod

kubectl logs

kubectl top nodes

kubectl top pods
```

Never troubleshoot by deleting resources immediately.

Investigate first.

---

# 11. Real Production Scenarios

## Scenario 1

Developer deployed latest image.

Unexpected behavior after deployment.

Root Cause

latest tag pulled a newer image.

Best Practice

Always pin image versions.

---

## Scenario 2

One Pod consumed all memory.

Other applications became unstable.

Root Cause

No resource limits.

Best Practice

Always define Requests and Limits.

---

## Scenario 3

Compromised Pod accessed another application.

Root Cause

No Network Policies.

Best Practice

Restrict east-west traffic.

---

## Scenario 4

Application restarted continuously.

Root Cause

No Readiness Probe.

Traffic reached application before startup completed.

---

# 12. Scenario Interview Q&A

### Q1. Why should latest image tag be avoided?

Because deployments become unpredictable.

---

### Q2. Why define resource limits?

To prevent one workload from consuming all node resources.

---

### Q3. Why use namespaces?

To isolate workloads and simplify management.

---

### Q4. Why use GitOps?

To maintain version control, approvals, and rollback capability.

---

# 13. Architecture Interview Q&A

### Q1. How do enterprises design Kubernetes clusters?

Using

- HA Control Plane
- Multiple Worker Nodes
- Monitoring
- GitOps
- Secure Networking
- RBAC
- Automated CI/CD

---

### Q2. Why is Kubernetes called declarative?

Because engineers define the desired state and Kubernetes continuously works to maintain it.

---

# 14. Production Support Interview Q&A

### Q1. What are the first checks every morning?

```bash
kubectl get nodes

kubectl get pods -A

kubectl top nodes

kubectl get events

Grafana Dashboard

Alertmanager
```

---

### Q2. How do you reduce production incidents?

- Monitoring
- Alerting
- Image Scanning
- Automated Testing
- Resource Limits
- Health Probes
- GitOps
- Regular Backups

---

# 15. Related Runbooks

- Cluster Health Check
- Node Failure
- Pod CrashLoopBackOff
- ImagePullBackOff
- Deployment Failure
- Backup & Restore
- High CPU
- High Memory
- Ingress Failure

---

# 16. Common Incidents

- OOMKilled
- CrashLoopBackOff
- ImagePullBackOff
- Pending Pods
- Node Failure
- DNS Failure
- Storage Failure
- Secret Misconfiguration
- High CPU
- High Memory

---

# 17. Commands

```bash
kubectl get nodes

kubectl get pods -A

kubectl get deployments

kubectl get svc

kubectl get ingress

kubectl describe pod

kubectl logs

kubectl get events -A

kubectl top nodes

kubectl top pods
```

---

# 18. Marathi Quick Revision

- Namespace वापरा.
- latest image वापरू नका.
- Requests आणि Limits नेहमी द्या.
- Health Probes configure करा.
- Secrets hardcode करू नका.
- GitOps वापरा.
- Monitoring आणि Backup अनिवार्य आहेत.

---

# 19. Production Readiness Checklist

- High Availability
- RBAC Enabled
- Monitoring Enabled
- Logging Enabled
- Backup Configured
- Disaster Recovery Tested
- Resource Limits Configured
- Health Probes Configured
- GitOps Enabled
- Image Scanning Enabled

---

# 20. Production Deployment Flow

```
Developer

↓

Pull Request

↓

Code Review

↓

CI Pipeline

↓

Image Scan

↓

Container Registry

↓

GitOps

↓

Kubernetes

↓

Health Checks

↓

Monitoring

↓

Business Validation
```

---

# 21. Marathi Summary (5+ Experience Revision)

## Interview Summary

Production Kubernetes म्हणजे Pods चालवणे नाही; तर सुरक्षित, scalable, observable आणि highly available platform तयार करणे.

Senior DevOps Engineer प्रत्येक deployment मध्ये security, monitoring, backup, disaster recovery, automation आणि GitOps यांचा विचार करतो.

### Production Investigation Flow

```
Alert

↓

Cluster Health

↓

Nodes

↓

Pods

↓

Services

↓

Ingress

↓

Logs

↓

Metrics

↓

Root Cause

↓

Permanent Fix
```

### Production Story

एका production cluster मध्ये सर्व deployments व्यवस्थित चालू होते, पण एका microservice ने पूर्ण node memory वापरली आणि इतर applications वर परिणाम झाला. Investigation मध्ये त्या deployment मध्ये resource limits नसल्याचे आढळले. Requests आणि Limits configure करून HPA enable करण्यात आला. त्यानंतर अशा प्रकारचा incident पुन्हा झाला नाही. यानंतर संस्थेने policy केली की कोणतेही deployment resource limits शिवाय production मध्ये जाऊ शकत नाही.

### 5+ Years Memory Trick

जर interviewer विचारेल,

**"Production Kubernetes मध्ये सर्वात महत्त्वाच्या best practices कोणत्या?"**

उत्तर:

"मी नेहमी High Availability, Namespaces, RBAC, Resource Requests & Limits, Health Probes, GitOps, Monitoring, Centralized Logging, Secure Secrets, Network Policies, Regular Backups आणि Disaster Recovery Testing यांना production readiness चे मुख्य pillars मानतो."

