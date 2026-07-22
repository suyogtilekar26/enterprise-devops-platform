# ArgoCD Runbooks

# Enterprise DevOps Platform

---

# Purpose

This directory contains operational runbooks for ArgoCD used by DevOps Engineers, SREs and Platform Engineers.

Unlike learning notes, these runbooks are designed for production support, deployments, incident response and recovery.

Every runbook follows a standard operating procedure (SOP) so that any engineer can quickly diagnose and resolve issues during production incidents.

---

# Runbook Index

| Runbook | Purpose |
|----------|---------|
| 01-production-deployment-runbook.md | Standard production deployment procedure |
| 02-rollback-runbook.md | Rollback to a previous stable version |
| 03-application-failure-runbook.md | Troubleshoot failed applications |
| 04-outofsync-runbook.md | Resolve OutOfSync applications |
| 05-degraded-application-runbook.md | Resolve Degraded applications |
| 06-crashloopbackoff-runbook.md | Troubleshoot CrashLoopBackOff |
| 07-imagepullbackoff-runbook.md | Troubleshoot image pull failures |
| 08-repository-failure-runbook.md | Resolve Git repository connectivity issues |
| 09-rbac-runbook.md | Resolve RBAC and permission issues |
| 10-secret-configmap-runbook.md | Resolve Secret and ConfigMap issues |
| 11-cluster-failure-runbook.md | Kubernetes cluster troubleshooting |
| 12-disaster-recovery-runbook.md | Recover ArgoCD after major failures |

---

# Enterprise Application

```
React + Vite Frontend

↓

Flask API Gateway

↓

Flask Auth Service

↓

Flask Dashboard Service

↓

Redis

↓

PostgreSQL
```

---

# Standard Troubleshooting Flow

```
Incident Reported

↓

Check ArgoCD Application

↓

Check Sync Status

↓

Check Health Status

↓

Check Pods

↓

Check Logs

↓

Check Events

↓

Fix Issue

↓

Verify Health

↓

Close Incident
```

---

# General Rules

- Never modify Production directly using kubectl.
- Git is always the source of truth.
- Follow change management procedures.
- Record every incident.
- Perform Root Cause Analysis (RCA) after recovery.
- Update documentation after major incidents.

---

# Marathi Quick Revision

- Runbook म्हणजे Production SOP.
- प्रत्येक Incident साठी Standard Procedure.
- GitOps Follow करा.
- प्रथम Service Restore करा.
- नंतर RCA करा.

