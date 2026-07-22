# Incident 20 - Production Postmortem Template

# Enterprise DevOps Platform

---

# Incident Summary

| Field | Details |
|--------|---------|
| Incident ID | |
| Incident Title | |
| Date | |
| Start Time | |
| End Time | |
| Duration | |
| Severity | SEV-1 / SEV-2 / SEV-3 |
| Status | Closed |
| Incident Commander | |
| Report Author | |

---

# Executive Summary

Provide a brief summary of the incident.

Example

```
A production deployment introduced an application failure that caused
customer-facing API requests to fail.

The issue was detected by monitoring within three minutes.

The application was rolled back using ArgoCD.

Service was restored after 18 minutes.
```

---

# Business Impact

Describe the business impact.

Example

- Customer Login Failed
- API Unavailable
- Increased Error Rate
- Revenue Impact
- SLA Breach
- Delayed Deployments

---

# Customer Impact

Document

- Number of customers affected
- Regions affected
- Services affected
- Business processes interrupted

---

# Systems Affected

Example

- Kubernetes Cluster
- ArgoCD
- API Gateway
- Auth Service
- Dashboard Service
- PostgreSQL
- Redis
- Ingress Controller

---

# Timeline

| Time | Event |
|------|-------|
| | Incident Started |
| | Alert Triggered |
| | Engineer Assigned |
| | Investigation Started |
| | Root Cause Identified |
| | Recovery Started |
| | Service Restored |
| | Incident Closed |

---

# Detection

How was the incident detected?

Example

- Prometheus Alert
- Grafana Dashboard
- PagerDuty
- Customer Report
- Synthetic Monitoring
- Application Logs

---

# Root Cause

Describe the technical root cause.

Example

```
A configuration change introduced an invalid database connection string.

The application started successfully but failed all runtime database
connections.

Health checks were insufficient to detect the failure.

Production traffic immediately experienced HTTP 500 errors.
```

---

# Contributing Factors

Examples

- Missing Validation
- Human Error
- Incomplete Testing
- Configuration Drift
- Missing Monitoring
- Insufficient Documentation
- Deployment Process Gap

---

# Resolution

Document every action taken.

Example

1. Incident declared
2. Logs reviewed
3. Deployment history checked
4. Previous Git revision identified
5. ArgoCD rollback performed
6. Monitoring verified
7. Service restored

---

# Commands Executed

Example

Application

```bash
argocd app get guestbook
```

History

```bash
argocd app history guestbook
```

Rollback

```bash
argocd app rollback guestbook <ID>
```

Pods

```bash
kubectl get pods -n guestbook
```

Logs

```bash
kubectl logs deployment/guestbook \
-n guestbook
```

Events

```bash
kubectl get events \
-n guestbook
```

---

# Recovery Metrics

| Metric | Value |
|---------|------|
| Detection Time | |
| Response Time | |
| Mitigation Time | |
| Recovery Time | |
| Total Downtime | |
| RTO Target | |
| RPO Target | |

---

# Root Cause Category

Select one

```
Configuration

Deployment

Infrastructure

Application Bug

Database

Networking

Security

RBAC

Storage

Certificate

Human Error

Cloud Provider

Other
```

---

# Five Whys

## Why 1

Why did the incident occur?

Answer

_____________________

---

## Why 2

Why did that happen?

Answer

_____________________

---

## Why 3

Answer

_____________________

---

## Why 4

Answer

_____________________

---

## Why 5

Answer

_____________________

---

# Corrective Actions

## Immediate

- Restore Service
- Rollback Deployment
- Notify Stakeholders
- Validate Monitoring

---

## Short-Term

- Improve Validation
- Add Monitoring
- Improve Documentation
- Increase Testing

---

## Long-Term

- Automate Validation
- Improve CI/CD
- Disaster Recovery Improvements
- Better Observability
- Security Improvements
- Infrastructure Automation

---

# Preventive Actions

Examples

- Add Smoke Tests
- Enable Canary Deployments
- Improve Monitoring
- Enable Feature Flags
- Add Runbooks
- Increase Test Coverage
- Improve RBAC
- Review Deployment Process

---

# Lessons Learned

## What Went Well

Example

- Monitoring detected issue quickly
- Rollback procedure worked
- Team communication was effective

---

## What Went Poorly

Example

- Health checks missed runtime issue
- Documentation incomplete
- Recovery required manual steps

---

## What Should Improve

Example

- Better deployment validation
- Faster rollback automation
- Improved alert quality

---

# Ownership

| Action | Owner | Due Date | Status |
|---------|-------|----------|--------|
| | | | |
| | | | |
| | | | |

---

# Communication Summary

Document

- Internal communication
- Customer communication
- Executive updates
- Incident bridge timeline

---

# Evidence Collected

Examples

- ArgoCD Logs
- Kubernetes Events
- Pod Logs
- Grafana Screenshots
- Prometheus Alerts
- Git Commits
- Audit Logs
- Incident Timeline

---

# Final Validation Checklist

- [ ] Root Cause Identified
- [ ] Service Restored
- [ ] Monitoring Normal
- [ ] Documentation Updated
- [ ] Git Repository Corrected
- [ ] Preventive Actions Created
- [ ] Owners Assigned
- [ ] Postmortem Reviewed
- [ ] Stakeholders Notified
- [ ] Incident Closed

---

# Interview Questions

## 1. What is a Postmortem?

A structured analysis of an incident that identifies the root cause, impact, resolution, and preventive actions to avoid recurrence.

---

## 2. Why should Postmortems be blameless?

They focus on improving systems and processes rather than assigning personal blame, encouraging honest reporting and learning.

---

## 3. What are the Five Whys?

A root cause analysis technique that repeatedly asks "Why?" until the underlying cause is identified.

---

## 4. What metrics are commonly captured?

- Detection Time
- Response Time
- Recovery Time
- Downtime
- RTO
- RPO

---

## 5. What is the most important outcome of a Postmortem?

Actionable improvements that reduce the likelihood and impact of future incidents.

---

# Marathi Quick Revision

- Postmortem म्हणजे Incident नंतर केलेले सविस्तर विश्लेषण.
- यात Root Cause, Timeline, Impact, Resolution आणि Preventive Actions नोंदवले जातात.
- Blameless Postmortem मुळे टीम प्रामाणिकपणे चुका समजून सुधारणा करू शकते.
- Five Whys वापरून खरे Root Cause शोधले जाते.
- प्रत्येक Production Incident नंतर Action Items निश्चित करून त्यांची जबाबदारी ठरवणे आवश्यक आहे.

