# Incident 17 - Production Rollback

# Enterprise DevOps Platform

---

# Incident Summary

A new production deployment introduced a critical application issue immediately after synchronization.

The deployment completed successfully from ArgoCD's perspective, but the new application version caused production failures.

A rollback to the previous stable Git revision was required to restore service.

---

# Severity

```
SEV-1
```

Critical production outage requiring immediate rollback.

---

# Business Impact

- Production outage
- Customer-facing errors
- Revenue impact
- SLA violation
- Increased operational effort
- Emergency rollback initiated

---

# Environment

- ArgoCD
- Kubernetes
- Git Repository
- Production Cluster

---

# Symptoms

Application

```bash
argocd app get guestbook
```

Output

```
Healthy

Synced
```

Despite the Healthy status

- Users receive HTTP 500 errors
- Login failures occur
- API requests fail
- Increased latency
- Error rates spike

---

# Common Causes

- Application Bug
- Incorrect Configuration
- Invalid Feature Flag
- Database Migration Failure
- Incorrect Image Version
- Dependency Upgrade Failure
- Incompatible API Changes
- Helm Values Error
- Kustomize Overlay Error
- Missing Secret

---

# Detection

Verify Deployment

```bash
argocd app history guestbook
```

---

Check Monitoring

- Prometheus
- Grafana
- Application Logs
- Error Rate
- Latency
- Availability

---

# Investigation

## Step 1

Review Deployment History

```bash
argocd app history guestbook
```

Identify

```
Latest Revision
```

---

## Step 2

Compare Previous Revision

```bash
argocd app diff guestbook
```

---

## Step 3

Review Application Logs

```bash
kubectl logs deployment/guestbook \
-n guestbook
```

---

## Step 4

Review Recent Git Commits

```bash
git log --oneline
```

---

## Step 5

Verify Metrics

Check

- CPU
- Memory
- Error Rate
- Request Success Rate
- Response Time

---

## Step 6

Determine Rollback Candidate

Select the most recent stable Git revision.

---

## Step 7

Notify Stakeholders

Inform

- DevOps Team
- Developers
- Product Team
- Incident Commander

---

# Root Cause Analysis

Example

A new application version introduced an incompatible API change.

The deployment completed successfully.

Health checks continued to pass.

Production traffic generated HTTP 500 errors.

An immediate rollback restored the previous stable version.

---

# Resolution

Rollback to previous revision.

CLI

```bash
argocd app history guestbook
```

Identify the stable revision.

Rollback

```bash
argocd app rollback guestbook <ID>
```

Alternatively

Revert the Git commit.

```bash
git revert <commit-id>
```

Push

```bash
git push origin main
```

Allow ArgoCD to synchronize automatically.

---

# Validation

Verify Application

```bash
argocd app get guestbook
```

Expected

```
Healthy

Synced
```

---

Verify Pods

```bash
kubectl get pods \
-n guestbook
```

Expected

```
Running
```

---

Verify Metrics

Ensure

- Error rate normal
- Latency normal
- User requests successful
- Monitoring alerts cleared

---

# Commands Used

History

```bash
argocd app history guestbook
```

Rollback

```bash
argocd app rollback guestbook <ID>
```

Application

```bash
argocd app get guestbook
```

Diff

```bash
argocd app diff guestbook
```

Logs

```bash
kubectl logs deployment/guestbook \
-n guestbook
```

Pods

```bash
kubectl get pods \
-n guestbook
```

---

# Timeline Example

```
18:00

Production Deployment Started

↓

18:03

Deployment Completed

↓

18:05

Customer Errors Increase

↓

18:07

Monitoring Alerts Triggered

↓

18:10

Incident Declared

↓

18:12

Deployment History Reviewed

↓

18:15

Rollback Initiated

↓

18:18

Previous Version Restored

↓

18:20

Application Healthy

↓

18:25

Incident Closed
```

---

# Prevention

- Perform canary deployments.
- Validate production readiness.
- Run smoke tests.
- Use feature flags.
- Review pull requests carefully.
- Test rollback procedures regularly.
- Monitor deployments in real time.

---

# Best Practices

- Keep Git as the source of truth.
- Roll back quickly instead of troubleshooting during outages.
- Maintain immutable releases.
- Monitor deployment metrics continuously.
- Document rollback decisions.
- Conduct post-incident reviews.

---

# Interview Questions

## 1. When should a production rollback be performed?

When a deployment causes production issues that cannot be resolved quickly.

---

## 2. Which command shows deployment history?

```bash
argocd app history guestbook
```

---

## 3. Which command performs a rollback?

```bash
argocd app rollback guestbook <ID>
```

---

## 4. Is Git revert preferred over manual cluster changes?

Yes.

Git should remain the single source of truth in GitOps.

---

## 5. How can production rollback incidents be minimized?

- Canary deployments
- Feature flags
- Automated testing
- Monitoring
- Rollback rehearsals

---

# Incident Success Criteria

The incident is resolved when:

- Stable version is restored.
- Error rate returns to normal.
- Application is Healthy.
- Application is Synced.
- Customer impact ends.
- Root cause and lessons learned are documented.

---

# Marathi Quick Revision

- Production Rollback म्हणजे नवीन Deployment मुळे समस्या आल्यास मागील Stable Version वर परत जाणे.
- `argocd app history` वापरून Stable Revision शोधा.
- `argocd app rollback` वापरून Rollback करता येतो.
- GitOps मध्ये शक्य असल्यास `git revert` करून ArgoCD Sync होऊ द्या.
- Production मध्ये Canary Deployment, Feature Flags आणि Monitoring वापरल्यास Rollback ची गरज कमी होते.

