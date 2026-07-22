# Kubernetes Runbook 20 - Production Maintenance Checklist

# 1. Purpose

This runbook provides a standardized production maintenance checklist for Kubernetes clusters.

Routine maintenance is essential for ensuring cluster stability, security, performance, compliance, and business continuity. This checklist helps DevOps engineers execute planned maintenance activities with minimal customer impact while maintaining complete operational visibility.

The objective is to perform production maintenance safely, validate every change, maintain rollback readiness, and document all activities for audit and RCA purposes.

---

# 2. Scope

Applicable to

- Production Kubernetes Clusters
- Planned Maintenance
- Patch Windows
- Version Upgrades
- Security Updates
- Node Maintenance
- Storage Maintenance
- Network Maintenance

Supported Platforms

- Kind (Lab)
- kubeadm
- EKS
- AKS
- GKE
- OpenShift
- Rancher

---

# 3. Maintenance Activities

Typical maintenance includes

- Kubernetes Upgrade
- Worker Node Upgrade
- Control Plane Upgrade
- Security Patching
- Certificate Renewal
- Secret Rotation
- Storage Maintenance
- Node Replacement
- Cluster Scaling
- Monitoring Updates
- Backup Validation

---

# 4. Business Impact

Potential Risks

Critical

- Production outage
- Failed deployments
- Authentication failures

Medium

- Temporary service degradation
- Increased response time

Low

- Internal monitoring interruption

---

# 5. Prerequisites

Before maintenance ensure

- Approved Change Request (CR)
- CAB Approval (if applicable)
- Maintenance Window Approved
- Business Notification Completed
- Rollback Plan Ready
- etcd Backup Verified
- Infrastructure Backup Available
- Monitoring Operational
- On-call Teams Available

---

# 6. Pre-Maintenance Checklist

## Change Management

Verify

- Change approved
- Risk assessment completed
- Rollback documented
- Stakeholders informed

---

## Cluster Health

Verify

```bash
kubectl get nodes

kubectl get pods -A

kubectl get events

kubectl top nodes

kubectl top pods -A
```

Expected

- All Nodes Ready
- No CrashLoopBackOff
- No Pending Pods
- No Critical Alerts

---

## Control Plane

Verify

```bash
kubectl cluster-info
```

---

## Backup Verification

Verify

```bash
etcdctl snapshot status backup.db
```

Confirm

- Latest snapshot available
- Backup integrity verified

---

## Monitoring

Verify

- Prometheus healthy
- Grafana healthy
- Alertmanager healthy
- Logging operational

---

## Storage

Verify

```bash
kubectl get pvc -A

kubectl get pv
```

---

## Network

Verify

```bash
kubectl get svc -A

kubectl get ingress -A
```

---

## Application Health

Verify

- Login
- APIs
- Dashboard
- Database connectivity
- Authentication
- Customer transactions

---

# 7. Maintenance Execution

Follow approved sequence.

Example

```
Change Window

↓

Disable Deployments

↓

Verify Backup

↓

Perform Maintenance

↓

Validate

↓

Enable Traffic
```

Examples

- Upgrade worker nodes
- Upgrade control plane
- Rotate certificates
- Patch operating systems
- Upgrade Kubernetes version
- Replace nodes

---

# 8. During Maintenance

Continuously monitor

```bash
kubectl get nodes -w
```

Monitor

```bash
kubectl get pods -A -w
```

Watch

- Restart count
- Node readiness
- Failed scheduling
- OOMKilled
- CrashLoopBackOff

Monitor dashboards

- CPU
- Memory
- Disk
- Network
- API Server
- etcd

---

# 9. Post-Maintenance Validation

Cluster Validation

```bash
kubectl get nodes

kubectl get pods -A

kubectl get deployments -A

kubectl get ingress -A
```

Verify

- All Nodes Ready
- All Pods Running
- No Pending Pods
- No Failed Deployments

---

Business Validation

Validate

- User Login
- API Gateway
- Auth Service
- Dashboard Service
- Database Connectivity
- Payment Flow
- Internal APIs
- Monitoring Dashboards

---

Enterprise DevOps Project Validation

Verify

Frontend

```text
React + Vite
```

↓

API Gateway

↓

Auth Service

↓

Dashboard Service

Health Endpoints

```text
Frontend

API Gateway
/health

Auth Service
/health

Dashboard Service
/health
```

---

Monitoring Validation

Verify

- Prometheus Targets
- Grafana Dashboards
- Alert Rules
- Logs
- Metrics

---

Security Validation

Verify

- TLS Certificates
- Secrets
- RBAC
- Network Policies

---

# 10. Rollback Procedure

Immediately rollback if

- Customer impact observed
- Production outage
- Failed validation
- Critical monitoring alerts
- Business approval withdrawn

Rollback

- Restore previous version
- Restore configuration
- Restore etcd if required
- Restore infrastructure if required

Validate production before closing the incident.

---

# 11. Escalation Matrix

L1

- Health verification
- Monitoring

↓

L2

- Kubernetes validation
- Rollback

↓

Platform Team

- Cluster recovery

↓

Development Team

- Application validation

↓

Database Team

- Database recovery

↓

Security Team

- Certificate issues
- RBAC

↓

Management

- Business communication

---

# 12. Production Best Practices

- Never skip backups.
- Never perform production changes without rollback.
- Validate before and after every change.
- Perform maintenance during approved windows.
- Use GitOps where possible.
- Automate validation checks.
- Document every maintenance activity.
- Conduct post-maintenance review.

---

# 13. Real Production Scenario

A production banking platform planned a quarterly Kubernetes upgrade.

Before maintenance

- etcd backup verified
- Monitoring validated
- Rollback documented
- Business approved maintenance

During maintenance

- Worker nodes upgraded one at a time
- Pod disruption minimized
- Continuous monitoring enabled

After maintenance

- All applications validated
- Customer transactions tested
- Monitoring confirmed healthy

Maintenance completed without customer impact.

---

# 14. Scenario Interview Questions

## Q1. What should always happen before production maintenance?

### Answer

- Approved Change Request
- Verified backup
- Rollback plan
- Business notification
- Cluster health validation

---

## Q2. Why is business validation mandatory?

### Answer

Technical success does not guarantee business success.

Applications may appear healthy while customer transactions still fail.

---

## Q3. What is the biggest production maintenance mistake?

### Answer

Starting maintenance without

- Backup
- Rollback
- Validation
- Monitoring

---

# 15. Architecture Interview Questions

## Q1. Explain enterprise production maintenance workflow.

### Answer

```
Planning

↓

Approval

↓

Backup

↓

Validation

↓

Maintenance

↓

Technical Validation

↓

Business Validation

↓

Monitoring

↓

Closure
```

---

## Q2. Which enterprise teams participate?

### Answer

- DevOps
- Platform Engineering
- Development
- Database
- Security
- Infrastructure
- Networking
- Business Owners
- Change Management

---

# 16. Production Support Interview Questions

## Q1. Walk through a Kubernetes production maintenance window.

### Answer

Sequence

- Verify approvals
- Validate cluster health
- Verify backups
- Execute approved changes
- Monitor continuously
- Validate infrastructure
- Validate applications
- Validate business transactions
- Close change after successful verification

---

## Q2. What production mistakes commonly happen?

### Answer

- No backup verification
- No rollback testing
- Ignoring monitoring alerts
- Upgrading all nodes simultaneously
- No business validation
- Poor communication
- Incomplete documentation

---

# 17. Commands Reference

```bash
kubectl cluster-info

kubectl get nodes

kubectl get pods -A

kubectl get deployments -A

kubectl get ingress -A

kubectl get svc -A

kubectl get pvc -A

kubectl get pv

kubectl top nodes

kubectl top pods -A

kubectl get events

etcdctl snapshot status backup.db
```

---

# 18. Marathi Quick Revision

- Change approve आहे का तपासा.
- Backup verify करा.
- Cluster health तपासा.
- Monitoring verify करा.
- Maintenance करा.
- Technical validation करा.
- Business validation करा.
- Rollback तयार ठेवा.

---

# 19. Related Runbooks

- 17-api-server-unreachable.md
- 18-etcd-backup-and-restore.md
- 19-cluster-disaster-recovery.md
- incidents/kubernetes/

---

# 20. Marathi Summary (5+ Experience Revision)

## Interview Summary

Production maintenance सुरू करण्यापूर्वी Change Request, maintenance window, rollback plan, etcd backup आणि cluster health verify करणे अनिवार्य आहे. Maintenance दरम्यान सतत monitoring करावी. Maintenance पूर्ण झाल्यानंतर infrastructure validation, application validation आणि business transaction validation करूनच change close करावा.

### Production Maintenance Flow

```
Change Approval

↓

Backup Verification

↓

Cluster Health Check

↓

Maintenance Execution

↓

Infrastructure Validation

↓

Application Validation

↓

Business Validation

↓

Monitoring

↓

Change Closure
```

### Production Story

एका multinational banking platform मध्ये quarterly Kubernetes upgrade दरम्यान प्रत्येक worker node sequentially drain करून upgrade करण्यात आला. प्रत्येक node upgrade नंतर application health, login flow, payment processing आणि monitoring validate करण्यात आले. संपूर्ण upgrade दरम्यान एकही customer-facing outage झाला नाही कारण rollback plan, backup verification आणि maintenance checklist आधीच पूर्ण करण्यात आली होती.

### 5+ Years Memory Trick

Interview मध्ये जर विचारले,

**"What is your production Kubernetes maintenance checklist?"**

उत्तर:

"I begin with approved change management, verify cluster health and backups, ensure rollback readiness, execute maintenance in a controlled sequence, continuously monitor the cluster, validate infrastructure, applications and business transactions after completion, and document the maintenance with lessons learned and RCA if required."

